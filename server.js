import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { createGzip, createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream';

const root = resolve('public');
const port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
};

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(body);
}

const server = createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed');
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { return send(res, 400, 'Bad request'); }
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) return send(res, 403, 'Forbidden');

  let stat;
  try { stat = statSync(file); if (!stat.isFile()) throw new Error('not a file'); }
  catch { return send(res, 404, 'Not found'); }

  const ext = extname(file).toLowerCase();
  const compressible = /\.(html|css|js|svg|json)$/.test(ext);
  const accepts = req.headers['accept-encoding'] || '';
  const encoding = compressible && accepts.includes('br') ? 'br' : compressible && accepts.includes('gzip') ? 'gzip' : '';
  const immutable = /\.[a-f0-9]{8,}\./i.test(file);
  const headers = {
    'Content-Type': types[ext] || 'application/octet-stream',
    'Cache-Control': ext === '.webp' || immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=3600',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Length': stat.size,
  };
  if (encoding) {
    headers['Content-Encoding'] = encoding;
    headers.Vary = 'Accept-Encoding';
    delete headers['Content-Length'];
  }
  res.writeHead(200, headers);
  if (req.method === 'HEAD') return res.end();
  const stream = createReadStream(file);
  if (!encoding) return pipeline(stream, res, (error) => { if (error && !res.headersSent) send(res, 500, 'Server error'); });
  const compressor = encoding === 'br' ? createBrotliCompress() : createGzip({ level: 6 });
  pipeline(stream, compressor, res, (error) => { if (error && !res.headersSent) send(res, 500, 'Server error'); });
});

server.listen(port, '0.0.0.0', () => console.log(`Psdfolio festival greetings listening on http://0.0.0.0:${port}`));
