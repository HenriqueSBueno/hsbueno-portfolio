# Pagamentos e financeiro

As rotas de pagamento e o painel são independentes da home. A oferta de suporte
destas rotas continua mensalmente até cancelamento, conforme o briefing Stripe.
O texto histórico de `PRODUCT.md` sobre um ano não define a assinatura.

## Configuração

Node 22, ESM, Stripe 23.0.1, API `2026-09-30.endive`. Execute `npm ci` e
`npm test`. Com `STRIPE_SECRET_KEY` no ambiente, rode `npm run stripe:setup`.
O script reutiliza produtos por metadados, preços por `lookup_key` e cupons por
identificador. Divergências falham explicitamente. Não há banco de dados.

Variáveis: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`,
`STRIPE_WEBHOOK_SECRET`, `DASHBOARD_SENHA`, `SITE_URL`.
Segredos ficam na Vercel, nunca em arquivos versionados.

## Rotas

- `/pagar/pagina`, `/pagar/suporte`: oferta e início do Checkout hospedado.
- `/pagar/obrigado`: consulta mínima da Session; e-mail mascarado.
- `/pagar/gerenciar`: acesso ao login do Customer Portal em pt-BR.
- `/dashboard`: login e painel privado.
- `POST /api/checkout?item=pagina|suporte`: preço e cupom do servidor.
- `GET /api/session?session_id=...`: situação do pagamento, sem dados fiscais.
- `GET /api/portal`: endereço público do login Stripe.
- `POST /api/webhook`: Web Request, corpo bruto, assinatura Stripe.
- `POST /api/dashboard/login`, `POST /api/dashboard/logout`: sessão de 12h.
- `GET /api/dashboard/data?resource=...&cursor=...`: indicadores/listas.
- `POST /api/dashboard/action`: cancelamento no fim do período ou reenvio
  quando a Stripe permite. Login é a única exceção pública da família privada.

## Comportamentos e limites

Pagamento único: R$999,90 menos R$500,00, com criação de fatura e cliente.
Suporte: R$99,90 menos R$50,00 permanentemente, sem data final.
Métodos dinâmicos; parcelamento habilitado apenas no pagamento único.
Elegibilidade depende da Stripe. O resumo não promete Pix ou boleto ativos.

O nome opcional do link preenche um campo adicional do Checkout, pois a Stripe
não permite pré-preencher o nome nativo sem fornecer um cliente existente,
incompatível com `customer_creation: always`. E-mail usa o campo nativo.
Os parâmetros pessoais são removidos do histórico da página após leitura.

O Checkout nativo atual coleta apenas documentos fiscais empresariais de países
suportados, sem CPF/CNPJ brasileiro. Um campo obrigatório na página hospedada
coleta o documento, e o webhook o salva como `br_cpf`/`br_cnpj` no cliente Stripe.
A escrita usa chave idempotente por Session e verifica documentos existentes
para tolerar repetições após 24h. Não há validação cadastral ou de titularidade.
Erros fiscais provocam HTTP 500 e nova tentativa Stripe; investigar o evento
`stripe.webhook.tax_id_failed`, sem registrar o documento. Os outros eventos
geram apenas logs estruturados com identificador, tipo, data e modo.

O painel usa cache em memória de 20s e paginação de dez registros. Receita e
taxas vêm das balance transactions BRL, incluindo estornos e taxas separadas;
repasse usa a previsão Stripe. MRR aplica os descontos às assinaturas ativas
do suporte. Totais de clientes agregam cobranças pagas menos reembolsos.
A aba Falhas navega PaymentIntents, inclusive tentativas sem Charge; páginas
podem estar vazias quando as dez tentativas daquele intervalo não falharam.
Históricos grandes podem exigir armazenamento/agregação futura.

Senha comparada por HMAC em tempo constante, cookie assinado HttpOnly/Secure/
SameSite=Strict e mutações com verificação de origem. Limitação de tentativas
por IP é simples e em memória: não é global entre instâncias nem sobrevive a
reinicializações. Para endurecer o acesso, aplicar regras da plataforma ou
substituir por autenticação completa. Trocar a senha invalida todos os cookies.

Faturas pagas não podem ser reenviadas arbitrariamente pela API de envio;
o painel oferece links hospedados/PDF e reenvio somente para fatura aberta
com `collection_method=send_invoice`. E-mails automáticos, marca e dados
públicos dependem do painel Stripe. Não há emissão de NF-e nesta integração.

## Publicação e reversão

O briefing autorizou produção em modo teste e `main`. O repositório tinha
`master`; `main` preserva seu histórico. Antes de publicar, executar testes e
fluxos reais de teste no Chrome. Depois validar domínio, webhook e home.
Reverter pelo deploy anterior da Vercel ou por `git revert` do commit relevante.
Remover variáveis/endpoint somente após interromper novos pagamentos e drenar
eventos pendentes. Migração para live exige catálogo e webhook independentes,
novos segredos e atualização de ambos os ambientes. Nunca misturar catálogos.
