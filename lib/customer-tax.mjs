export async function syncCheckoutTaxId(stripe, session) {
  if (session.metadata?.source !== 'hbueno.online' || !session.customer) return;
  const value = session.custom_fields?.find(f => f.key === 'documento')?.text?.value;
  if (!value) return;
  const digits = value.replace(/\D/g, '');
  if (![11, 14].includes(digits.length)) throw new Error('Documento com formato inválido');
  const type = digits.length === 11 ? 'br_cpf' : 'br_cnpj';
  const customer = typeof session.customer === 'string' ? session.customer : session.customer.id;
  const existing = await stripe.customers.listTaxIds(customer, { limit: 100 });
  if (existing.data.some(t => t.type === type && t.value.replace(/\D/g, '') === digits)) return;
  await stripe.customers.createTaxId(customer, { type, value: digits }, { idempotencyKey: `tax-id-${session.id}` });
}
