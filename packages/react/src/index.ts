// Minimal bindings for React integrations.
// In a full implementation, this package would provide a router provider, hooks, and
// data cache integration. Here we provide types + a small runtime shim.

export type LoaderFunction = (...args: any[]) => any;

declare global {
  // eslint-disable-next-line no-var
  var __AURORA_LOADER_DATA__: unknown | undefined;
}

export function __setLoaderData(value: unknown): void {
  globalThis.__AURORA_LOADER_DATA__ = value;
}

/**
 * Minimal loader data hook.
 * In real React apps, you would integrate with context and rerendering.
 */
export function useLoaderData<T = unknown>(): T {
  return globalThis.__AURORA_LOADER_DATA__ as T;
}
