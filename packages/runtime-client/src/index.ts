export type LoaderResult<T> = T;

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

// This is intentionally minimal; in a real implementation this would integrate with
// a client router, data cache, and React bindings.
