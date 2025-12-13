# AuroraStack

AuroraStack is a full-stack TypeScript framework with a unified data schema, universal rendering, and built-in support for AI and product-ready patterns.

- Author: **TheSkiF4er**
- License: **Apache-2.0**
- Contact: **opensource@cajeer.com**
- Security: **security@cajeer.com**
- Version: **1.0.0**

---

## Why AuroraStack

AuroraStack aims to be a product-first framework:
- Opinionated enough to move fast
- Flexible enough to scale
- Modern enough to treat AI, DX, and performance as first-class citizens

## Features
- **Full-stack TypeScript**: end-to-end typing from database to browser.
- **Unified Schema**: define your domain once and generate migrations, models, validation, and API contracts.
- **Universal Rendering**: SSR by default, SPA navigation where it matters, optional islands for interactive components.
- **AI-native**: provider abstraction, tracing/metrics hooks, helpers for agents and RAG.
- **Modular design**: core stays small; functionality ships as packages and plugins.

## Monorepo Layout

```
AuroraStack/
  apps/
    docs/               # Documentation site (placeholder)
    playground/         # Demo app
  packages/
    core/               # @aurora/core
    router/             # @aurora/router
    runtime-server/     # @aurora/runtime-server
    runtime-client/     # @aurora/runtime-client
    schema/             # @aurora/schema
    db/                 # @aurora/db
    validation/         # @aurora/validation
    react/              # @aurora/react
    auth/               # @aurora/auth
    jobs/               # @aurora/jobs
    ai/                 # @aurora/ai
    ai-observability/   # @aurora/ai-observability
    ai-tools/           # @aurora/ai-tools
    cli/                # @aurora/cli
    devtools/           # @aurora/devtools
    testing/            # @aurora/testing
  templates/
    app-basic/          # starter template
```

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 9

### Install
```bash
pnpm install
```

### Run the playground
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

## Quick Examples

### 1) Unified Schema
```ts
import { defineSchema, model, t } from '@aurora/schema';

export const schema = defineSchema({
  models: {
    User: model({
      id: t.id(),
      email: t.string().email().unique(),
      name: t.string().min(2).max(128),
      createdAt: t.datetime().defaultNow(),
    }),
  },
});
```

### 2) Full-stack page (loader + action + React)
```tsx
import * as React from 'react';
import { json, redirect } from '@aurora/runtime-server';
import { useLoaderData } from '@aurora/react';

export async function loader(ctx: any) {
  const user = await ctx.db.user.findById(ctx.params.id);
  if (!user) return redirect('/users');
  return json({ user });
}

export async function action(ctx: any) {
  const body = await ctx.request.json();
  const input = ctx.validate(body, ctx.schema.User);
  await ctx.db.user.update(ctx.params.id, input);
  return redirect(`/users/${ctx.params.id}`);
}

export default function UserPage() {
  const { user } = useLoaderData<typeof loader>();
  return <div>Hello, {user.name}</div>;
}
```

### 3) AI-powered route
```ts
import { llm } from '@aurora/ai';

export async function loader(ctx: any) {
  const res = await llm.chat({
    model: 'gpt-5.1-mini',
    messages: [
      { role: 'system', content: 'You are an assistant.' },
      { role: 'user', content: 'Summarize AuroraStack in one sentence.' },
    ],
  });

  return { summary: res.text };
}
```

## Scripts
- `pnpm dev` — run workspace dev servers
- `pnpm build` — build all packages/apps
- `pnpm test` — run tests
- `pnpm lint` — lint
- `pnpm typecheck` — TypeScript checks
- `pnpm release` — Changesets versioning + publish (maintainers)

## License
Apache License 2.0. See `LICENSE`.

## Acknowledgements
AuroraStack is inspired by modern full-stack frameworks and the broader TypeScript ecosystem.
