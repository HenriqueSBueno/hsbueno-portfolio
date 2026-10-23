import { catalog, invoiceDetails, siteUrl } from './stripe.mjs';

export async function checkoutParams(stripe, item, input = {}) {
  const entry = catalog[item];
  if (!entry) throw new Error('Item inválido');
  const prices = await stripe.prices.list({ lookup_keys: [entry.lookup], active: true, limit: 1 });
  const price = prices.data[0];
  if (!price || price.currency !== 'brl' || price.unit_amount !== entry.amount || (entry.mode === 'subscription' && (price.recurring?.interval !== 'month' || price.recurring.interval_count !== 1))) throw new Error('Catálogo inválido');
  const coupon = await stripe.coupons.retrieve(entry.coupon);
  if (!coupon.valid || coupon.currency !== 'brl' || coupon.amount_off !== entry.discount || coupon.duration !== (item === 'suporte' ? 'forever' : 'once')) throw new Error('Cupom inválido');
  const metadata = { source: 'hbueno.online', item };
  const params = {
    mode: entry.mode,
    line_items: [{ price: price.id, quantity: 1 }],
    discounts: [{ coupon: entry.coupon }],
    locale: 'pt-BR',
    name_collection: { individual: { enabled: true } },
    phone_number_collection: { enabled: true },
    billing_address_collection: 'required',
    tax_id_collection: { enabled: true, required: 'if_supported' },
    custom_fields: [{ key: 'documento', label: { type: 'custom', custom: 'CPF ou CNPJ (somente números)' }, type: 'text', text: { minimum_length: 11, maximum_length: 14 }, optional: false }],
    metadata,
    success_url: `${siteUrl()}/pagar/obrigado?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/pagar/${item}`,
  };
  if (input.email) {
    if (typeof input.email !== 'string' || input.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) throw new Error('E-mail inválido');
    params.customer_email = input.email;
  }
  if (input.nome) {
    if (typeof input.nome !== 'string' || input.nome.length > 120 || /[\x00-\x1f]/.test(input.nome)) throw new Error('Nome inválido');
    params.custom_fields.push({ key: 'nome', label: { type: 'custom', custom: 'Nome do comprador' }, type: 'text', text: { default_value: input.nome.trim(), maximum_length: 120 }, optional: false });
  }
  if (item === 'pagina') {
    params.customer_creation = 'always';
    params.payment_method_options = { card: { installments: { enabled: true } } };
    params.invoice_creation = { enabled: true, invoice_data: { ...invoiceDetails, metadata } };
    params.payment_intent_data = { metadata };
  } else {
    params.subscription_data = { metadata, description: 'Suporte mensal · R$49,90/mês até cancelamento.' };
  }
  return params;
}
