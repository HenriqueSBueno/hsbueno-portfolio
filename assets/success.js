async function check() {
  const title = document.querySelector('#status-title');
  const text = document.querySelector('#payment-status');
  try {
    const id = new URLSearchParams(location.search).get('session_id');
    const response = await fetch(`/api/session?session_id=${encodeURIComponent(id || '')}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    document.querySelector('#test-mode').hidden = !data.testMode;
    if (data.paid) {
      title.textContent = 'Pagamento confirmado.';
      text.textContent = `Seu pagamento foi confirmado. A fatura fica disponível na Stripe${data.email ? ` para ${data.email}` : ''}. O envio por e-mail depende das configurações de envio da conta.`;
    } else if (data.status === 'complete') {
      title.textContent = 'Pagamento em processamento.';
      text.textContent = 'Assim que o pagamento compensar, sua fatura ficará disponível. Com o envio automático habilitado, você recebe a fatura por e-mail.';
    } else {
      title.textContent = 'Pagamento ainda não concluído.';
      text.textContent = 'Conclua o pagamento na Stripe. Se já pagou, consulte novamente em instantes.';
    }
  } catch (error) { title.textContent = 'Não conseguimos confirmar.'; text.textContent = `${error.message} Confira o link recebido ou fale pelo WhatsApp.`; }
}
check();
