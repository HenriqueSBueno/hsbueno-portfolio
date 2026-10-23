import { catalog } from './stripe.mjs';

const cache = new Map();
export function invalidateDashboard() { cache.clear(); }
export async function cached(key, load) {
  const entry = cache.get(key);
  if (entry?.expires > Date.now()) return entry.value;
  const value = await load();
  if (cache.size > 100) cache.clear();
  cache.set(key, { value, expires: Date.now() + 20000 });
  return value;
}
const customerName = c => c && typeof c === 'object' ? c.name || c.email || 'Cliente' : 'Cliente';
async function collect(list) {
  const rows = [];
  for await (const row of list) rows.push(row);
  return rows;
}
function finance(rows, start) {
  return rows.filter(r => r.created >= start && ['charge', 'payment', 'refund', 'payment_refund', 'stripe_fee'].includes(r.type) && r.currency === 'brl').reduce((out, row) => row.type === 'stripe_fee'
    ? { gross: out.gross, fees: out.fees - row.net, net: out.net + row.net }
    : { gross: out.gross + row.amount, fees: out.fees + row.fee, net: out.net + row.net }, { gross: 0, fees: 0, net: 0 });
}
export async function summary(stripe) {
  return cached('summary', async () => {
    const now = new Date();
    const monthStart = Math.floor(new Date(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit' }).format(now) + '-01T00:00:00-03:00').getTime() / 1000);
    const daysStart = Math.floor(now.getTime() / 1000) - 30 * 86400;
    const [rows, subscriptions, balance, payouts] = await Promise.all([
      collect(stripe.balanceTransactions.list({ created: { gte: Math.min(monthStart, daysStart) }, limit: 100 })),
      collect(stripe.subscriptions.list({ status: 'active', limit: 100, expand: ['data.discounts'] })),
      stripe.balance.retrieve(),
      stripe.payouts.list({ limit: 10 }),
    ]);
    const support = subscriptions.filter(s => s.items.data.some(i => i.price.lookup_key === catalog.suporte.lookup));
    let mrr = 0;
    for (const sub of support) {
      let value = sub.items.data.filter(i => i.price.lookup_key === catalog.suporte.lookup).reduce((n, i) => n + (i.price.unit_amount || 0) * i.quantity, 0);
      for (const discount of sub.discounts || []) {
        const coupon = discount.source?.coupon || discount.coupon;
        if (coupon?.amount_off && coupon.currency === 'brl') value = Math.max(0, value - coupon.amount_off);
        else if (coupon?.percent_off) value *= (1 - coupon.percent_off / 100);
        else if (typeof coupon === 'string') {
          const c = await stripe.coupons.retrieve(coupon);
          if (c.amount_off && c.currency === 'brl') value = Math.max(0, value - c.amount_off);
          if (c.percent_off) value *= (1 - c.percent_off / 100);
        }
      }
      mrr += Math.round(value);
    }
    return {
      month: finance(rows, monthStart), last30: finance(rows, daysStart), mrr, activeSubscriptions: support.length,
      available: balance.available.filter(b => b.currency === 'brl').reduce((n, b) => n + b.amount, 0),
      pending: balance.pending.filter(b => b.currency === 'brl').reduce((n, b) => n + b.amount, 0),
      payouts: payouts.data.filter(p => p.currency === 'brl' && ['pending', 'in_transit'].includes(p.status)).map(p => ({ amount: p.amount, arrival: p.arrival_date, status: p.status })),
      testMode: process.env.STRIPE_SECRET_KEY.startsWith('sk_test_'),
    };
  });
}
export async function listResource(stripe, resource, cursor) {
  return cached(`${resource}:${cursor || ''}`, async () => {
    const params = { limit: 10, ...(cursor ? { starting_after: cursor } : {}) };
    let result;
    let rows;
    if (resource === 'payments' || resource === 'failures') {
      // Falhas usam PaymentIntents: tentativas sem Charge também precisam aparecer.
      if (resource === 'failures') {
        result = await stripe.paymentIntents.list({ ...params, expand: ['data.customer'] });
        rows = result.data.filter(p => p.last_payment_error).map(p => ({ client: customerName(p.customer), amount: p.amount, status: p.status, date: p.created, reason: p.last_payment_error?.decline_code || p.last_payment_error?.code || 'Falha no pagamento' }));
      } else {
        result = await stripe.charges.list({ ...params, expand: ['data.customer'] });
        rows = result.data.map(p => ({ client: customerName(p.customer), item: p.metadata?.item === 'pagina' ? 'Landing page' : p.metadata?.item === 'suporte' || p.invoice ? 'Suporte / fatura' : p.description || 'Pagamento', amount: p.amount, method: p.payment_method_details?.type, status: p.refunded ? 'refunded' : p.status, date: p.created, receipt: p.receipt_url }));
      }
    } else if (resource === 'invoices') {
      result = await stripe.invoices.list({ ...params, expand: ['data.customer'] });
      rows = result.data.map(i => ({ id: i.id, number: i.number || 'Rascunho', client: customerName(i.customer), amount: i.total, status: i.status, due: i.due_date, url: i.hosted_invoice_url, pdf: i.invoice_pdf, canSend: i.status === 'open' && i.collection_method === 'send_invoice' }));
    } else if (resource === 'subscriptions') {
      result = await stripe.subscriptions.list({ ...params, status: 'all', expand: ['data.customer'] });
      rows = result.data.map(s => ({ id: s.id, client: customerName(s.customer), status: s.status, next: s.items.data[0]?.current_period_end, cancelling: s.cancel_at_period_end, canCancel: ['active', 'trialing', 'past_due'].includes(s.status) && !s.cancel_at_period_end }));
    } else if (resource === 'customers') {
      const totals = await cached('customerTotals', async () => {
        const values = {};
        for await (const charge of stripe.charges.list({ limit: 100 })) if (charge.paid && charge.currency === 'brl' && charge.customer) values[charge.customer] = (values[charge.customer] || 0) + charge.amount - charge.amount_refunded;
        return values;
      });
      result = await stripe.customers.list({ ...params, expand: ['data.tax_ids'] });
      rows = result.data.map(c => ({ name: c.name, email: c.email, phone: c.phone, taxId: c.tax_ids?.data.filter(t => ['br_cpf', 'br_cnpj'].includes(t.type)).map(t => t.value).join(', '), total: totals[c.id] || 0 }));
    } else throw new Error('Recurso inválido');
    return { rows, next: result.has_more ? result.data.at(-1)?.id : undefined };
  });
}
