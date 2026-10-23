import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { json } from './http.mjs';

const COOKIE = '__Host-hb_dashboard';
export const TTL = 12 * 60 * 60;
function digest(value) {
  if (!process.env.DASHBOARD_SENHA) throw new Error('Dashboard não configurado');
  return createHmac('sha256', process.env.DASHBOARD_SENHA).update(value).digest();
}
export function passwordMatches(value) {
  return typeof value === 'string' && value.length < 1024 && timingSafeEqual(digest(value), digest(process.env.DASHBOARD_SENHA));
}
export function signedToken(now = Date.now()) {
  const payload = `${Math.floor(now / 1000) + TTL}.${randomBytes(24).toString('hex')}`;
  return `${payload}.${digest(payload).toString('hex')}`;
}
export function authenticated(req, now = Date.now()) {
  const token = req.headers.cookie?.split(';').map(v => v.trim()).find(v => v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!token || !/^\d{10}\.[a-f0-9]{48}\.[a-f0-9]{64}$/.test(token)) return false;
  const [expires, nonce, signature] = token.split('.');
  const remaining = Number(expires) - Math.floor(now / 1000);
  return remaining > 0 && remaining <= TTL && timingSafeEqual(Buffer.from(signature, 'hex'), digest(`${expires}.${nonce}`));
}
export function requireAuth(req, res) {
  if (authenticated(req)) return true;
  json(res, 401, { error: 'Entre para acessar o painel.' });
  return false;
}
export function setSession(res, token) {
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${token ? TTL : 0}`);
}
