import { createAuroraServer } from '@aurora/runtime-server';

export async function createTestServer() {
  const server = createAuroraServer({ port: 0 });
  return server;
}
