import { passwordMatches, setSession, signedToken } from '../../lib/auth.mjs';
import { body, failure, json, method, rateLimit, sameOrigin } from '../../lib/http.mjs';

export default async function handler(req, res) {
  if (!method(req, res, 'POST') || !sameOrigin(req, res)) return;
  if (!rateLimit(req, 'login', 5, 15 * 60000)) return json(res, 429, { error: 'Limite de tentativas. Aguarde 15 minutos.' });
  try {
    if (!passwordMatches((await body(req)).senha)) return json(res, 401, { error: 'Senha incorreta.' });
    setSession(res, signedToken());
    json(res, 200, { ok: true });
  } catch (error) { failure(res, error); }
}
