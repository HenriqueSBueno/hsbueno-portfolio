const $ = id => document.getElementById(id);
const money = n => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((n || 0) / 100);
const date = n => n ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(n * 1000) : '—';
const labels = { succeeded: 'Pago', paid: 'Paga', active: 'Ativa', open: 'Aberta', draft: 'Rascunho', void: 'Anulada', uncollectible: 'Incobrável', incomplete: 'Incompleta', incomplete_expired: 'Expirada', canceled: 'Cancelada', past_due: 'Em atraso', unpaid: 'Não paga', trialing: 'Em teste', failed: 'Falhou', pending: 'Pendente', refunded: 'Reembolsado', card: 'Cartão', pix: 'Pix', boleto: 'Boleto', processing: 'Processando', requires_payment_method: 'Requer novo pagamento' };
const label = value => labels[value] || value || '—';
let resource = 'payments';
let cursors = [undefined];
let next;
let generation = 0;
async function api(path, options) {
  const response = await fetch(`/api/dashboard/${path}`, options);
  const data = await response.json();
  if (response.status === 401) { $('dashboard').hidden = true; $('login-section').hidden = false; }
  if (!response.ok) throw new Error(data.error || 'Não foi possível carregar.');
  return data;
}
function post(path, payload) { return api(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); }
function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}
function link(url, text) {
  if (!url) return node('span', '—');
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' || !['invoice.stripe.com', 'pay.stripe.com', 'billing.stripe.com', 'files.stripe.com'].includes(parsed.hostname)) return node('span', 'Indisponível');
  const a = node('a', text); a.href = parsed.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
}
function metric(title, value, detail) {
  const block = node('div', undefined, 'metric');
  block.append(node('h2', title), node('strong', value), node('small', detail)); return block;
}
async function loadSummary() {
  const data = await api('data');
  $('login-section').hidden = true; $('dashboard').hidden = false;
  $('test-badge').hidden = !data.testMode;
  $('metrics').replaceChildren(
    metric('Receita do mês', money(data.month.gross), `Taxas ${money(data.month.fees)} · líquido ${money(data.month.net)}`),
    metric('Últimos 30 dias', money(data.last30.gross), `Taxas ${money(data.last30.fees)} · líquido ${money(data.last30.net)}`),
    metric('Suporte mensal · MRR', money(data.mrr), 'Receita recorrente com os descontos vigentes'),
    metric('Assinaturas ativas', String(data.activeSubscriptions), 'Suporte mensal'),
  );
  $('balances').replaceChildren(node('div', `Disponível: ${money(data.available)}`), node('div', `Pendente: ${money(data.pending)}`));
  $('payouts').textContent = data.payouts.length ? data.payouts.map(p => `Repasse previsto: ${money(p.amount)} em ${date(p.arrival)} (${label(p.status)})`).join(' · ') : 'Nenhum repasse pendente ou em trânsito na Stripe.';
  const failures = await api('data?resource=failures');
  $('failure-summary').replaceChildren(...(failures.rows.length ? failures.rows.map(f => node('p', `${f.client} · ${money(f.amount)} · ${label(f.reason)} · ${date(f.date)}`)) : [node('p', 'Nenhuma falha nas dez tentativas mais recentes. Consulte a aba Falhas para navegar pelo histórico.')]));
  $('dashboard-status').textContent = 'Dados da Stripe · cache de até 20 segundos · valores em reais · horário de Brasília.';
}
const titles = { payments: 'Pagamentos recentes', invoices: 'Faturas', subscriptions: 'Assinaturas', customers: 'Clientes', failures: 'Falhas de pagamento' };
async function actionButton(action, id, button) {
  const question = action === 'cancel' ? 'Cancelar esta assinatura ao fim do período já pago? Não haverá nova renovação.' : 'Reenviar esta fatura por e-mail ao cliente?';
  if (!window.confirm(question)) return;
  button.disabled = true;
  try { await post('action', { action, id, requestId: crypto.randomUUID() }); await Promise.all([loadSummary(), loadTable()]); $('dashboard-status').textContent = action === 'cancel' ? 'Cancelamento agendado para o fim do período.' : 'Envio solicitado à Stripe.'; }
  catch (error) { $('dashboard-status').textContent = error.message; button.disabled = false; }
}
function button(action, id, text) { const b = node('button', text, 'secondary'); b.addEventListener('click', () => actionButton(action, id, b)); return b; }
async function loadTable() {
  const current = ++generation;
  $('table-content').textContent = 'Carregando…';
  $('next-page').hidden = true; $('previous-page').hidden = true;
  const selected = resource;
  const data = await api(`data?resource=${selected}${cursors.at(-1) ? `&cursor=${encodeURIComponent(cursors.at(-1))}` : ''}`);
  if (current !== generation) return;
  next = data.next;
  $('section-title').textContent = titles[selected];
  if (!data.rows.length) { $('table-content').replaceChildren(node('p', 'Nenhum registro nesta página.', 'empty')); }
  else {
    const headers = { payments: ['Cliente', 'Item', 'Valor', 'Método', 'Status', 'Data', 'Recibo'], invoices: ['Número', 'Cliente', 'Valor', 'Status', 'Vencimento', 'Documentos', 'Ação'], subscriptions: ['Cliente', 'Status', 'Próximo vencimento', 'Ação'], customers: ['Nome', 'E-mail', 'Telefone', 'CPF/CNPJ', 'Total pago'], failures: ['Cliente', 'Valor', 'Status', 'Motivo', 'Data'] };
    const table = node('table'); const head = node('thead'); const hr = node('tr');
    for (const text of headers[selected]) { const th = node('th', text); th.scope = 'col'; hr.append(th); }
    head.append(hr); const body = node('tbody');
    for (const row of data.rows) {
      let cells;
      if (selected === 'payments') cells = [row.client, row.item, money(row.amount), label(row.method), label(row.status), date(row.date), link(row.receipt, 'Recibo')];
      if (selected === 'invoices') { const docs = node('div'); docs.append(link(row.url, 'Fatura'), link(row.pdf, 'PDF')); cells = [row.number, row.client, money(row.amount), label(row.status), date(row.due), docs, row.canSend ? button('resend', row.id, 'Reenviar por e-mail') : 'Envio indisponível pela API']; }
      if (selected === 'subscriptions') cells = [row.client, row.cancelling ? `${label(row.status)} · cancelamento agendado` : label(row.status), date(row.next), row.canCancel ? button('cancel', row.id, 'Cancelar ao fim do período') : '—'];
      if (selected === 'customers') cells = [row.name || '—', row.email || '—', row.phone || '—', row.taxId || '—', money(row.total)];
      if (selected === 'failures') cells = [row.client, money(row.amount), label(row.status), label(row.reason), date(row.date)];
      const tr = node('tr');
      for (const value of cells) { const td = node('td'); if (value instanceof Node) td.append(value); else td.textContent = value; tr.append(td); } body.append(tr);
    }
    table.append(head, body); const wrap = node('div', undefined, 'table-wrap'); wrap.tabIndex = 0; wrap.setAttribute('role', 'region'); wrap.setAttribute('aria-label', titles[selected]); wrap.append(table); $('table-content').replaceChildren(node('p', 'Deslize a tabela para ver todas as colunas.', 'table-hint'), wrap);
  }
  $('next-page').hidden = !next; $('previous-page').hidden = cursors.length < 2;
}
function showError(error) { $('dashboard-status').textContent = error.message; }
$('login-form').addEventListener('submit', async event => {
  event.preventDefault(); const b = event.target.querySelector('button'); b.disabled = true; $('login-status').textContent = 'Entrando…';
  try { await post('login', { senha: $('senha').value }); $('senha').value = ''; await loadSummary(); await loadTable(); $('login-status').textContent = ''; }
  catch (error) { $('login-status').textContent = error.message; } finally { b.disabled = false; }
});
$('logout').addEventListener('click', async () => { try { await post('logout', {}); $('dashboard').hidden = true; $('login-section').hidden = false; $('table-content').replaceChildren(); $('metrics').replaceChildren(); $('failure-summary').replaceChildren(); } catch (error) { showError(error); } });
$('refresh').addEventListener('click', async event => { event.target.disabled = true; try { await loadSummary(); if (resource !== 'links') await loadTable(); } catch (error) { showError(error); } finally { event.target.disabled = false; } });
document.querySelectorAll('[data-resource]').forEach(tab => tab.addEventListener('click', async () => {
  resource = tab.dataset.resource; cursors = [undefined]; generation++;
  document.querySelectorAll('[data-resource]').forEach(t => t.setAttribute('aria-pressed', String(t === tab)));
  $('links-section').hidden = resource !== 'links'; $('data-section').hidden = resource === 'links';
  try { if (resource !== 'links') await loadTable(); } catch (error) { showError(error); }
}));
$('next-page').addEventListener('click', async () => { if (next) cursors.push(next); try { await loadTable(); } catch (error) { showError(error); } });
$('previous-page').addEventListener('click', async () => { if (cursors.length > 1) cursors.pop(); try { await loadTable(); } catch (error) { showError(error); } });
$('link-form').addEventListener('submit', async event => {
  event.preventDefault(); const url = new URL(`/pagar/${$('link-item').value}`, location.origin);
  if ($('link-email').value.trim()) url.searchParams.set('email', $('link-email').value.trim());
  if ($('link-name').value.trim()) url.searchParams.set('nome', $('link-name').value.trim());
  try { await navigator.clipboard.writeText(url.href); $('link-result').textContent = `Link copiado: ${url.href}`; }
  catch { $('link-result').textContent = `Copie este link: ${url.href}`; }
});
(async () => { try { await loadSummary(); await loadTable(); } catch (error) { if (!$('dashboard').hidden) showError(error); } })();
