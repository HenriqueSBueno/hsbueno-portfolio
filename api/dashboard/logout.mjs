import { requireAuth, setSession } from '../../lib/auth.mjs';
import { json, method, sameOrigin } from '../../lib/http.mjs';
export default function handler(req, res) {
  if (!requireAuth(req, res) || !method(req, res, 'POST') || !sameOrigin(req, res)) return;
  setSession(res, '');
  json(res, 200, { ok: true });
}
