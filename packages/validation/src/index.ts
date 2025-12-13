import type { FieldDef, ModelDef } from '@aurora/schema';

export type ValidationError = { path: string; message: string };

export function validateModel(input: unknown, model: ModelDef): { ok: true; value: any } | { ok: false; errors: ValidationError[] } {
  if (typeof input !== 'object' || input === null) {
    return { ok: false, errors: [{ path: '', message: 'Expected an object' }] };
  }

  const obj = input as Record<string, unknown>;
  const errors: ValidationError[] = [];

  for (const [key, def] of Object.entries(model)) {
    const v = obj[key];

    if (v === undefined || v === null) {
      if (!def.optional) errors.push({ path: key, message: 'Required' });
      continue;
    }

    const kindOk = checkKind(v, def);
    if (!kindOk) errors.push({ path: key, message: `Expected ${def.kind}` });

    if (def.constraints?.email && typeof v === 'string') {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) errors.push({ path: key, message: 'Invalid email' });
    }
    if (typeof v === 'string') {
      const min = def.constraints?.min as number | undefined;
      const max = def.constraints?.max as number | undefined;
      if (typeof min === 'number' && v.length < min) errors.push({ path: key, message: `Min length ${min}` });
      if (typeof max === 'number' && v.length > max) errors.push({ path: key, message: `Max length ${max}` });
    }
  }

  return errors.length ? { ok: false, errors } : { ok: true, value: obj };
}

function checkKind(v: unknown, def: FieldDef): boolean {
  switch (def.kind) {
    case 'string':
      return typeof v === 'string';
    case 'number':
      return typeof v === 'number' && Number.isFinite(v);
    case 'boolean':
      return typeof v === 'boolean';
    case 'datetime':
      return typeof v === 'string' || v instanceof Date;
    case 'id':
      return typeof v === 'string';
    default:
      return false;
  }
}
