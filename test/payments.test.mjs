import test from 'node:test';
import assert from 'node:assert/strict';
import Stripe from 'stripe';
import { checkoutParams } from '../lib/checkout.mjs';
import { authenticated, requireAuth, signedToken } from '../lib/auth.mjs';
import webhook from '../api/webhook.mjs';
import dataHandler from '../api/dashboard/data.mjs';
import actionHandler from '../api/dashboard/action.mjs';
import { syncCheckoutTaxId } from '../lib/customer-tax.mjs';
import { sameOrigin } from '../lib/http.mjs';

process.env.DASHBOARD_SENHA = 'test-only-password-do-not-use';
process.env.STRIPE_SECRET_KEY = 'sk_test_placeholder';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_only';
function response() {
  return { headers: {}, setHeader(k, v) { this.headers[k] = v; }, end(v) { this.data = JSON.parse(v); } };
}
const fakeStripe = {
  prices: { list: async ({ lookup_keys }) => ({ data: [{ id: 'price_server', currency: 'brl', lookup_key: lookup_keys[0], unit_amount: lookup_keys[0] === 'pagina_unica' ? 99990 : 9990, recurring: lookup_keys[0] === 'suporte_mensal' ? { interval: 'month', interval_count: 1 } : undefined }] }) },
  coupons: { retrieve: async id => ({ valid: true, currency: 'brl', amount_off: id.includes('pagina') ? 50000 : 5000, duration: id.includes('pagina') ? 'once' : 'forever' }) },
};
test('cliente não altera preço, cupom, quantidade ou modo', async () => {
  for (const item of ['pagina', 'suporte']) {
    const params = await checkoutParams(fakeStripe, item, { amount: 1, price: 'evil', coupon: 'evil', quantity: 100, mode: 'setup' });
    assert.deepEqual(params.line_items, [{ price: 'price_server', quantity: 1 }]);
    assert.equal(params.discounts[0].coupon, item === 'pagina' ? 'hb_lancamento_pagina_500' : 'hb_suporte_50_forever');
    assert.equal(params.mode, item === 'pagina' ? 'payment' : 'subscription');
    assert.equal(params.payment_method_types, undefined);
    assert.equal(params.tax_id_collection.required, 'if_supported');
    if (item === 'pagina') { assert.equal(params.customer_creation, 'always'); assert.equal(params.invoice_creation.enabled, true); }
    else assert.equal(params.subscription_data.cancel_at, undefined);
  }
});
test('nome opcional pré-preenchido não remove customer_creation always', async () => {
  const params = await checkoutParams(fakeStripe, 'pagina', { nome: 'Comprador Teste' });
  assert.equal(params.customer_creation, 'always');
  assert.equal(params.custom_fields.find(f => f.key === 'nome').text.default_value, 'Comprador Teste');
});
test('catálogo divergente e item desconhecido falham', async () => {
  await assert.rejects(checkoutParams(fakeStripe, 'invalido'));
  await assert.rejects(checkoutParams({ ...fakeStripe, prices: { list: async () => ({ data: [{ currency: 'brl', unit_amount: 1 }] }) } }, 'pagina'));
});
test('sem cookie e cookie adulterado → 401 em todas as rotas privadas', async () => {
  const valid = signedToken();
  for (const cookie of [undefined, `__Host-hb_dashboard=${valid.slice(0, -1)}${valid.endsWith('a') ? 'b' : 'a'}`]) {
    const req = { headers: { cookie }, method: 'GET' };
    assert.equal(authenticated(req), false);
    const res = response(); assert.equal(requireAuth(req, res), false); assert.equal(res.statusCode, 401);
    for (const handler of [dataHandler, actionHandler]) { const r = response(); await handler(req, r); assert.equal(r.statusCode, 401); }
  }
});
test('cookie válido aceito; expirado recusado', () => {
  assert.equal(authenticated({ headers: { cookie: `__Host-hb_dashboard=${signedToken()}` } }), true);
  assert.equal(authenticated({ headers: { cookie: `__Host-hb_dashboard=${signedToken(Date.now() - 13 * 3600000)}` } }), false);
});
test('origem externa e origem malformada recusadas', () => {
  for (const origin of ['https://other.example', 'inválida', undefined]) {
    const res = response();
    assert.equal(sameOrigin({ headers: { origin, host: 'example.com' } }, res), false);
    assert.equal(res.statusCode, 403);
  }
});
test('CPF persistido no cliente; evento repetido não duplica documento', async () => {
  const stored = [];
  const client = { customers: { listTaxIds: async () => ({ data: stored }), createTaxId: async (_id, data) => { stored.push(data); } } };
  const session = { id: 'cs_test_fixture', customer: 'cus_fixture', metadata: { source: 'hbueno.online' }, custom_fields: [{ key: 'documento', text: { value: '00000000000' } }] };
  await syncCheckoutTaxId(client, session);
  await syncCheckoutTaxId(client, session);
  assert.deepEqual(stored, [{ type: 'br_cpf', value: '00000000000' }]);
});
test('assinatura inválida → 400; evento válido e repetido → 200', async () => {
  const payload = JSON.stringify({ id: 'evt_test', type: 'checkout.session.completed', created: 1, livemode: false, data: { object: {} } });
  for (const signature of ['invalid', new Stripe('sk_test_placeholder').webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET })]) {
    for (let i = 0; i < 2; i++) {
      const req = new Request('https://example.com/api/webhook', { method: 'POST', headers: { 'stripe-signature': signature }, body: payload });
      const res = await webhook.fetch(req); assert.equal(res.status, signature === 'invalid' ? 400 : 200);
    }
  }
});
