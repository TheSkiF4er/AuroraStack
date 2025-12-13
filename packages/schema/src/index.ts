export type ScalarKind = 'string' | 'number' | 'boolean' | 'datetime' | 'id';

export type FieldDef = {
  kind: ScalarKind;
  optional?: boolean;
  unique?: boolean;
  constraints?: Record<string, unknown>;
};

export type ModelDef = Record<string, FieldDef>;

export type SchemaDef = {
  models: Record<string, ModelDef>;
};

export function defineSchema(def: SchemaDef): SchemaDef {
  return def;
}

export function model(def: ModelDef): ModelDef {
  return def;
}

class FieldBuilder {
  constructor(private def: FieldDef) {}

  optional(): FieldDef {
    return { ...this.def, optional: true };
  }

  unique(): FieldDef {
    return { ...this.def, unique: true };
  }

  min(n: number): FieldDef {
    return { ...this.def, constraints: { ...(this.def.constraints ?? {}), min: n } };
  }

  max(n: number): FieldDef {
    return { ...this.def, constraints: { ...(this.def.constraints ?? {}), max: n } };
  }

  email(): FieldDef {
    return { ...this.def, constraints: { ...(this.def.constraints ?? {}), email: true } };
  }

  defaultNow(): FieldDef {
    return { ...this.def, constraints: { ...(this.def.constraints ?? {}), default: 'now' } };
  }
}

export const t = {
  id: () => new FieldBuilder({ kind: 'id' }),
  string: () => new FieldBuilder({ kind: 'string' }),
  number: () => new FieldBuilder({ kind: 'number' }),
  boolean: () => new FieldBuilder({ kind: 'boolean' }),
  datetime: () => new FieldBuilder({ kind: 'datetime' }),
};

// Placeholder: codegen hooks would live here in a production implementation.
export type CodegenTarget = 'migrations' | 'types' | 'validation' | 'contracts';

export function codegen(_schema: SchemaDef, _targets: CodegenTarget[]): void {
  // no-op in scaffold
}
