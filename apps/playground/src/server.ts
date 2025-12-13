import { createAuroraServer, json } from '@aurora/runtime-server';

const srv = createAuroraServer({ port: Number(process.env.PORT ?? 3000) });

srv.router.register({
  id: 'home',
  path: '/',
  module: {
    loader: async () => json({ name: 'AuroraStack', version: '1.0.0', ok: true }),
  },
});

await srv.listen();
console.log(`Playground listening on http://localhost:${srv.port}`);
