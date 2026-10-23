import { stripeClient } from '../lib/stripe.mjs';
import { failure, json, method } from '../lib/http.mjs';

export default async function handler(req, res) {
  if (!method(req, res, 'GET')) return;
  try {
    const configs = await stripeClient().billingPortal.configurations.list({ active: true, limit: 100 });
    const config = configs.data.find(c => c.metadata?.source === 'hbueno.online');
    if (!config?.login_page?.url) return json(res, 503, { error: 'Portal indisponível. Fale com o vendedor pelo WhatsApp.' });
    json(res, 200, { url: `${config.login_page.url}?locale=pt-BR` });
  } catch (error) { failure(res, error); }
}
