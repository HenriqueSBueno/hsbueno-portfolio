import Stripe from 'stripe';

export const API_VERSION = '2026-09-30.endive';
let client;
export function stripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('Stripe não configurada');
  return client ??= new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: API_VERSION, maxNetworkRetries: 2 });
}
export const catalog = Object.freeze({
  pagina: { lookup: 'pagina_unica', coupon: 'hb_lancamento_pagina_500', amount: 99990, discount: 50000, mode: 'payment' },
  suporte: { lookup: 'suporte_mensal', coupon: 'hb_suporte_50_forever', amount: 9990, discount: 5000, mode: 'subscription' },
});
export const events = ['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'checkout.session.async_payment_failed', 'invoice.paid', 'invoice.payment_failed', 'customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted'];
export const invoiceDetails = {
  description: 'Landing page profissional em até 1 dia + domínio grátis no primeiro ano.',
  custom_fields: [{ name: 'Vendedor', value: 'Henrique Bueno' }, { name: 'Site', value: 'hbueno.online' }, { name: 'WhatsApp', value: '(19) 95873-6939' }],
  footer: 'Henrique Bueno · hbueno.online · WhatsApp (19) 95873-6939. Fatura comercial; não substitui nota fiscal.',
};
export function siteUrl() {
  const url = new URL(process.env.SITE_URL || 'https://hbueno.online');
  if (url.protocol !== 'https:' && url.hostname !== 'localhost') throw new Error('SITE_URL inválida');
  return url.origin;
}
