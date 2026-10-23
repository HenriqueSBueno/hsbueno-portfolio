const form = document.querySelector('#checkout-form');
const status = document.querySelector('#checkout-status');
const query = new URLSearchParams(location.search);
for (const key of ['email', 'nome']) form.elements[key].value = (query.get(key) || '').slice(0, key === 'nome' ? 120 : 254);
// Remove dados pessoais da barra e do histórico antes de abrir o checkout.
if (query.has('email') || query.has('nome')) history.replaceState({}, '', location.pathname);
let requestId = crypto.randomUUID();
form.addEventListener('input', () => { requestId = crypto.randomUUID(); });
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  status.textContent = 'Preparando seu pagamento…';
  try {
    const response = await fetch(`/api/checkout?item=${document.querySelector('main').dataset.item}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestId, email: form.elements.email.value.trim(), nome: form.elements.nome.value.trim() }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    const url = new URL(data.url);
    if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com') throw new Error('Destino do pagamento inválido.');
    location.assign(url.href);
  } catch (error) {
    status.textContent = error.message || 'Não foi possível iniciar. Tente novamente.';
    status.classList.add('error');
    button.disabled = false;
  }
});
