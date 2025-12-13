import { createAuroraServer, json } from '@aurora/runtime-server';

const srv = createAuroraServer({ port: Number(process.env.PORT ?? 3000) });

srv.router.register({
  id: 'home',
  path: '/',
  module: { loader: async () => json({ message: 'Hello from AuroraStack template!' }) },
});

await srv.listen();
console.log(`Server running: http://localhost:${srv.port}`);
