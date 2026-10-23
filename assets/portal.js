document.querySelector('#portal-button').addEventListener('click', async event => {
  event.target.disabled = true;
  const status = document.querySelector('#portal-status');
  status.textContent = 'Abrindo seu portal…';
  try {
    const response = await fetch('/api/portal');
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    const url = new URL(data.url);
    if (url.protocol !== 'https:' || url.hostname !== 'billing.stripe.com') throw new Error('Destino inválido.');
    location.assign(url.href);
  } catch (error) { status.textContent = error.message; event.target.disabled = false; }
});
