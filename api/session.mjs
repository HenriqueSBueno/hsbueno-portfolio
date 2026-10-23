import { stripeClient } from '../lib/stripe.mjs';
import { failure, json, method } from '../lib/http.mjs';

export default async function handler(req, res) {
  if (!method(req, res, 'GET')) return;
  const id = new URL(req.url, 'https://local').searchParams.get('session_id');
  if (!/^cs_(test_|live_)?[A-Za-z0-9]{20,250}$/.test(id || '')) return json(res, 400, { error: 'Link de confirmação inválido.' });
  try {
    const session = await stripeClient().checkout.sessions.retrieve(id);
    if (session.metadata?.source !== 'hbueno.online') return json(res, 404, { error: 'Pagamento não encontrado.' });
    const email = session.customer_details?.email || session.customer_email;
    const maskedEmail = email?.replace(/^(.)(.*)(@.*)$/, '$1***$3');
    json(res, 200, { paid: session.payment_status === 'paid', status: session.status, email: maskedEmail, testMode: !session.livemode });
  } catch (error) { failure(res, error); }
}
