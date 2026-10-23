import { stripeClient, catalog } from '../lib/stripe.mjs';

const stripe = stripeClient();
for (const [item, entry] of Object.entries(catalog)) {
  const name = item === 'pagina' ? 'Landing page profissional' : 'Suporte mensal';
  const description = item === 'pagina' ? 'Página pronta em até 1 dia + domínio grátis no primeiro ano.' : 'Suporte mensal recorrente até cancelamento, sem prazo final.';
  let product;
  for await (const p of stripe.products.list({ active: true, limit: 100 })) if (p.metadata.source === 'hbueno.online' && p.metadata.item === item) { product = p; break; }
  if (!product) product = await stripe.products.create({ name, description, metadata: { source: 'hbueno.online', item } }, { idempotencyKey: `hb-product-${item}-v1` });
  let price = (await stripe.prices.list({ lookup_keys: [entry.lookup], limit: 1 })).data[0];
  if (!price) price = await stripe.prices.create({ product: product.id, currency: 'brl', unit_amount: entry.amount, lookup_key: entry.lookup, ...(item === 'suporte' ? { recurring: { interval: 'month' } } : {}), metadata: { source: 'hbueno.online', item } }, { idempotencyKey: `hb-price-${entry.lookup}-v1` });
  if (!price.active || price.unit_amount !== entry.amount || price.currency !== 'brl' || price.product !== product.id || (item === 'suporte' && (price.recurring?.interval !== 'month' || price.recurring?.interval_count !== 1))) throw new Error(`Preço divergente: ${entry.lookup}`);
  let coupon;
  try { coupon = await stripe.coupons.retrieve(entry.coupon); } catch (error) { if (error.code !== 'resource_missing') throw error; }
  if (!coupon) coupon = await stripe.coupons.create({ id: entry.coupon, name: item === 'pagina' ? 'Oferta de lançamento' : 'Desconto suporte mensal', currency: 'brl', amount_off: entry.discount, duration: item === 'suporte' ? 'forever' : 'once', applies_to: { products: [product.id] }, metadata: { source: 'hbueno.online', item } }, { idempotencyKey: `hb-coupon-${item}-v1` });
  if (!coupon.valid || coupon.amount_off !== entry.discount || coupon.currency !== 'brl' || coupon.duration !== (item === 'suporte' ? 'forever' : 'once') || coupon.metadata.item !== item || (coupon.applies_to && !coupon.applies_to.products.includes(product.id))) throw new Error(`Cupom divergente: ${entry.coupon}`);
  process.stdout.write(`${product.id} ${price.id} ${entry.lookup} ${coupon.id}\n`);
}
