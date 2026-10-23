import { stripeClient } from '../lib/stripe.mjs';
import { checkoutParams } from '../lib/checkout.mjs';
import { body, failure, json, method, rateLimit, sameOrigin } from '../lib/http.mjs';

export default async function handler(req, res) {
  if (!method(req, res, 'POST') || !sameOrigin(req, res)) return;
  if (!rateLimit(req, 'checkout', 20, 60000)) return json(res, 429, { error: 'Muitas tentativas. Aguarde um minuto.' });
  try {
    const item = new URL(req.url, 'https://local').searchParams.get('item');
    if (!['pagina', 'suporte'].includes(item)) return json(res, 400, { error: 'Item inválido.' });
    const input = await body(req);
    if (!/^[a-f0-9-]{36}$/.test(input.requestId || '')) return json(res, 400, { error: 'Identificador da tentativa inválido.' });
    const stripe = stripeClient();
    const params = await checkoutParams(stripe, item, input);
    const session = await stripe.checkout.sessions.create(params, { idempotencyKey: `checkout-${item}-${input.requestId}` });
    json(res, 200, { url: session.url });
  } catch (error) { failure(res, error); }
}
