import { requireAuth } from '../../lib/auth.mjs';
import { stripeClient } from '../../lib/stripe.mjs';
import { invalidateDashboard } from '../../lib/dashboard.mjs';
import { body, failure, json, method, rateLimit, sameOrigin } from '../../lib/http.mjs';

export default async function handler(req, res) {
  if (!requireAuth(req, res) || !method(req, res, 'POST') || !sameOrigin(req, res)) return;
  if (!rateLimit(req, 'action', 20, 60000)) return json(res, 429, { error: 'Aguarde um minuto.' });
  try {
    const input = await body(req);
    const stripe = stripeClient();
    if (input.action === 'cancel' && /^sub_[A-Za-z0-9]{10,100}$/.test(input.id || '')) {
      await stripe.subscriptions.update(input.id, { cancel_at_period_end: true }, { idempotencyKey: `cancel-period-${input.id}` });
    } else if (input.action === 'resend' && /^in_[A-Za-z0-9]{10,100}$/.test(input.id || '') && /^[a-f0-9-]{36}$/.test(input.requestId || '')) {
      const invoice = await stripe.invoices.retrieve(input.id);
      if (invoice.status !== 'open' || invoice.collection_method !== 'send_invoice') return json(res, 409, { error: 'A Stripe só permite reenviar faturas abertas com cobrança por e-mail. Compartilhe o link da fatura paga.' });
      await stripe.invoices.sendInvoice(input.id, {}, { idempotencyKey: `resend-${input.id}-${input.requestId}` });
    } else return json(res, 400, { error: 'Ação inválida.' });
    invalidateDashboard();
    json(res, 200, { ok: true });
  } catch (error) { failure(res, error); }
}
