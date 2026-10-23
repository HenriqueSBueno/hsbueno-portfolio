import { events, stripeClient } from '../lib/stripe.mjs';
import { Logger } from '../lib/http.mjs';
import { syncCheckoutTaxId } from '../lib/customer-tax.mjs';

const reply = (status, data) => Response.json(data, { status, headers: { 'Cache-Control': 'private, no-store' } });
export default {
  async fetch(request) {
    if (request.method !== 'POST') return reply(405, { error: 'Método não permitido.' });
    if (!process.env.STRIPE_WEBHOOK_SECRET) return reply(503, { error: 'Webhook não configurado.' });
    let event;
    try {
      const payload = Buffer.from(await request.arrayBuffer());
      if (payload.length > 1048576) return reply(413, { error: 'Evento muito grande.' });
      event = stripeClient().webhooks.constructEvent(payload, request.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
      Logger.warn({ event: 'stripe.webhook.signature_failed', type: error.type || error.name });
      return reply(400, { error: 'Assinatura inválida.' });
    }
    // A API Stripe mantém a chave idempotente; a leitura evita duplicações após 24h.
    if (['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type)) {
      try { await syncCheckoutTaxId(stripeClient(), event.data.object); }
      catch (error) {
        Logger.warn({ event: 'stripe.webhook.tax_id_failed', eventId: event.id, code: error.code || 'invalid_document' });
        return reply(500, { error: 'Não foi possível salvar o documento. O evento será repetido.' });
      }
    }
    if (events.includes(event.type)) Logger.info({ event: 'stripe.webhook', eventId: event.id, type: event.type, created: event.created, livemode: event.livemode });
    return reply(200, { received: true });
  },
};
