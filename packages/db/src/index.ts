export type RecordId = string;

export class InMemoryTable<T extends { id: RecordId }> {
  private map = new Map<RecordId, T>();

  all(): T[] {
    return [...this.map.values()];
  }

  findById(id: RecordId): T | null {
    return this.map.get(id) ?? null;
  }

  upsert(row: T): T {
    this.map.set(row.id, row);
    return row;
  }

  delete(id: RecordId): boolean {
    return this.map.delete(id);
  }
}

export class InMemoryDB {
  private tables = new Map<string, InMemoryTable<any>>();

  table<T extends { id: RecordId }>(name: string): InMemoryTable<T> {
    const existing = this.tables.get(name);
    if (existing) return existing as InMemoryTable<T>;
    const t = new InMemoryTable<T>();
    this.tables.set(name, t);
    return t;
  }
}

export type DbAdapter = {
  query: (sql: string, params?: unknown[]) => Promise<unknown>;
};
