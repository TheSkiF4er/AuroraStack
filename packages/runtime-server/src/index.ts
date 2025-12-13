import http from 'node:http';
import { URL } from 'node:url';
import { createApp, type AuroraApp } from '@aurora/core';
import { createRouter, type Router } from '@aurora/router';

export type JsonResponse<T> = { status: number; headers: Record<string, string>; body: T };

export function json<T>(body: T, init: Partial<Pick<JsonResponse<T>, 'status' | 'headers'>> = {}): JsonResponse<T> {
  return { status: init.status ?? 200, headers: { 'content-type': 'application/json', ...(init.headers ?? {}) }, body };
}

export function redirect(location: string, status = 302): JsonResponse<null> {
  return { status, headers: { location }, body: null };
}

export type RequestContext = {
  app: AuroraApp;
  router: Router;
  request: http.IncomingMessage;
  response: http.ServerResponse;
  url: URL;
  params: Record<string, string>;
};

export type ServerOptions = {
  port?: number;
};

export function createAuroraServer(options: ServerOptions = {}) {
  const app = createApp();
  const router = createRouter();
  const port = options.port ?? 3000;

  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
      const match = router.match(url.pathname);

      if (!match) {
        res.statusCode = 404;
        res.setHeader('content-type', 'text/plain; charset=utf-8');
        res.end('Not Found');
        return;
      }

      const ctx: RequestContext = { app, router, request: req, response: res, url, params: match.params };

      const isMutation = (req.method ?? 'GET').toUpperCase() !== 'GET';
      const handler = isMutation ? match.route.module.action : match.route.module.loader;

      if (!handler) {
        res.statusCode = 405;
        res.setHeader('content-type', 'text/plain; charset=utf-8');
        res.end('Method Not Allowed');
        return;
      }

      const result = await handler(ctx);

      if (result && typeof result === 'object' && 'status' in result && 'headers' in result && 'body' in result) {
        res.statusCode = (result as any).status;
        for (const [k, v] of Object.entries((result as any).headers)) res.setHeader(k, v);
        res.end(JSON.stringify((result as any).body));
        return;
      }

      res.statusCode = 200;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(result ?? null));
    } catch (e: any) {
      res.statusCode = 500;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.end(`Internal Server Error\n${e?.message ?? e}`);
    }
  });

  return {
    app,
    router,
    listen: () =>
      new Promise<void>((resolve) => {
        server.listen(port, () => resolve());
      }),
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }),
    port,
  };
}
