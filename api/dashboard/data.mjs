import { requireAuth } from '../../lib/auth.mjs';
import { stripeClient } from '../../lib/stripe.mjs';
import { cached, listResource, summary } from '../../lib/dashboard.mjs';
import { failure, json, method } from '../../lib/http.mjs';

export default async function handler(req, res) {
  if (!requireAuth(req, res) || !method(req, res, 'GET')) return;
  try {
    const query = new URL(req.url, 'https://local').searchParams;
    const resource = query.get('resource') || 'summary';
    const cursor = query.get('cursor');
    if (!['summary', 'payments', 'failures', 'invoices', 'subscriptions', 'customers'].includes(resource) || (cursor && !/^[a-z]+_[A-Za-z0-9]{10,100}$/.test(cursor))) return json(res, 400, { error: 'Consulta inválida.' });
    const stripe = stripeClient();
    json(res, 200, resource === 'summary' ? await summary(stripe) : await cached(`list:${resource}:${cursor || ''}`, () => listResource(stripe, resource, cursor)));
  } catch (error) { failure(res, error); }
}
