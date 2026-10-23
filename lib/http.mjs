import { createHash } from 'node:crypto';

export function json(res, status, data) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = status;
  res.end(JSON.stringify(data));
}
export function method(req, res, allowed) {
  if (req.method === allowed) return true;
  res.setHeader('Allow', allowed);
  json(res, 405, { error: 'Método não permitido.' });
  return false;
}
export function sameOrigin(req, res) {
  const origin = req.headers.origin;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  let valid = false;
  try { valid = !!origin && new URL(origin).host === host; } catch { /* Origem malformada é recusada. */ }
  if (!valid) {
    json(res, 403, { error: 'Origem não permitida.' });
    return false;
  }
  return true;
}
export async function body(req) {
  if (req.body && !Buffer.isBuffer(req.body)) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 8192) throw new Error('Requisição muito grande');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString() || '{}');
}
export const Logger = { info: data => process.stdout.write(`${JSON.stringify(data)}\n`), warn: data => process.stderr.write(`${JSON.stringify(data)}\n`) };
export function failure(res, error) {
  Logger.warn({ event: 'api.error', type: error.type || error.name, code: error.code || 'internal' });
  json(res, 500, { error: 'Não foi possível concluir. Tente novamente em instantes.' });
}
const windows = new Map();
export function rateLimit(req, scope, limit, windowMs) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
  const key = `${scope}:${createHash('sha256').update(ip).digest('hex')}`;
  const now = Date.now();
  for (const [id, entry] of windows) if (entry.until < now) windows.delete(id);
  if (windows.size > 10000) return false;
  const entry = windows.get(key) || { count: 0, until: now + windowMs };
  entry.count++;
  windows.set(key, entry);
  return entry.count <= limit;
}
