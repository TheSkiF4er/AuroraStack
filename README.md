# AuroraStack

> **AuroraStack** – a full-stack TypeScript framework with a **unified data schema**, **universal rendering**, and **built-in AI support**.

AuroraStack aims to be the **product-first web framework**: opinionated enough to move fast, flexible enough to scale, and modern enough to treat **AI**, **DX**, and **performance** as first-class citizens.

---

## Table of Contents

- [Features](#features)
- [Project Status](#project-status)
- [Monorepo Layout](#monorepo-layout)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Cloning and Installing](#cloning-and-installing)
  - [Running the Monorepo](#running-the-monorepo)
- [Creating a New Aurora App](#creating-a-new-aurora-app)
- [Architecture Overview](#architecture-overview)
  - [Core Concepts](#core-concepts)
  - [Official Packages](#official-packages)
- [Quick Code Examples](#quick-code-examples)
  - [1. Unified Schema](#1-unified-schema)
  - [2. Full-stack Page (loader + action + React)](#2-fullstack-page-loader--action--react)
  - [3. AI-powered Route](#3-ai-powered-route)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Security](#security)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- 🧩 **Full-stack TypeScript**  
  One language, end-to-end typing – from database to browser.

- 📚 **Unified data schema**  
  Define your domain **once** and generate:
  - database migrations,
  - TypeScript models,
  - validation schemas,
  - API contracts.

- 🌀 **Universal rendering**  
  SSR by default, SPA-style navigation where it matters, and **islands/partial hydration** for interactive components.

- 🤖 **AI-native**  
  Built-in abstraction for LLMs (chat, embeddings, moderation), observability for AI calls, and helpers for agents / RAG.

- ⚙️ **Product-ready from day one**  
  Official templates for SaaS, admin dashboards, and more: auth, roles, billing, and common patterns **baked in**.

- 🧪 **Batteries included DX**  
  Turborepo, pnpm workspaces, strict TypeScript, Vitest, Prettier, ESLint, Husky, lint-staged.

- 🧱 **Modular design**  
  Core is small; almost everything is a package or plugin:
  `@aurora/core`, `@aurora/router`, `@aurora/runtime-*`, `@aurora/schema`, `@aurora/ai`, `@aurora/cli`, etc.

---

## Project Status

> ⚠️ **Early stage / experimental.**  
> APIs and package names are subject to change until `v1.0.0`.

If you’re interested in shaping the framework, this is a great time to get involved via issues, discussions, and PRs.

---

## Monorepo Layout

AuroraStack is a **pnpm + Turborepo** monorepo:

```txt
AuroraStack/
  README.md
  LICENSE
  SECURITY.md
  package.json
  pnpm-workspace.yaml
  turbo.json
  tsconfig.base.json

  .github/
    workflows/
    ISSUE_TEMPLATE/
    PULL_REQUEST_TEMPLATE.md
    CODEOWNERS

  apps/
    docs/             # Documentation site
    playground/       # Interactive playground / demo

  packages/
    core/             # @aurora/core – kernel, config, plugins
    router/           # @aurora/router – routing primitives
    runtime-server/   # @aurora/runtime-server – HTTP + SSR runtime
    runtime-client/   # @aurora/runtime-client – client hydration/runtime
    schema/           # @aurora/schema – domain/schema DSL + codegen
    db/               # @aurora/db – DB/ORM adapters
    validation/       # @aurora/validation – validation from schema
    react/            # @aurora/react – React bindings (hooks, components)
    auth/             # @aurora/auth – auth/session/guards
    jobs/             # @aurora/jobs – background jobs/queues
    ai/               # @aurora/ai – LLM provider abstraction
    ai-observability/ # @aurora/ai-observability – tracing & metrics
    ai-tools/         # @aurora/ai-tools – agents, chat sessions, RAG
    cli/              # @aurora/cli – `aurora` CLI
    devtools/         # @aurora/devtools – in-browser DevTools overlay
    testing/          # @aurora/testing – test helpers

  templates/
    app-basic/
    app-saas/
    app-admin/
    app-marketplace/

  tooling/
    eslint-config/
    ts-config/
    jest-config/
    playwright-config/

  examples/
    minimal/
    saas-demo/
    admin-dashboard/

  .changeset/
    config.json
    ...
````

---

## Getting Started

### Prerequisites

* **Node.js** `>= 18`
* **pnpm** `>= 9`
* Git

Install pnpm:

```bash
npm install -g pnpm
```

### Cloning and Installing

```bash
git clone https://github.com/TheSkiF4er/AuroraStack.git
cd AuroraStack
pnpm install
```

### Running the Monorepo

Start development (docs, playground, and any dev apps):

```bash
pnpm dev
```

Build everything:

```bash
pnpm build
```

Run tests across the monorepo:

```bash
pnpm test
```

Lint and typecheck:

```bash
pnpm lint
pnpm typecheck
```

For more scripts, see [Scripts](#scripts).

---

## Creating a New Aurora App

> ⚠️ CLI is in progress; interface may change before `v1.0.0`.

Once `@aurora/cli` is released, you’ll be able to scaffold a new app like this:

```bash
pnpm dlx create-aurora-app my-app

# or (if installed globally)
pnpm dlx @aurora/cli new my-app
```

Templates:

* `app-basic` – minimal app with a couple of routes.
* `app-saas` – SaaS starter (auth, billing, dashboard).
* `app-admin` – admin panel / CRUD starter.
* `app-marketplace` – marketplace/e-commerce starter.

---

## Architecture Overview

### Core Concepts

AuroraStack’s application model is intentionally simple:

* **Schema**:
  Domain defined once using `@aurora/schema`, generating DB migrations, TS models, and validation.

* **Route pages** (`*.page.tsx`):
  Each route is a file that can export:

  * `default` React component (UI),
  * `loader(ctx)` – fetch data (SSR + client revalidation),
  * `action(ctx)` – handle mutations (forms, writes).

* **Resources**:
  Declarative data sources that know how to load/cache/invalidate data on client & server.

* **Jobs**:
  Background tasks and queues powered by `@aurora/jobs`.

* **AI**:
  Centralized LLM API + observability through `@aurora/ai` and `@aurora/ai-observability`.

### Official Packages

Some of the main packages (names may evolve before `v1.0.0`):

| Package                    | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `@aurora/core`             | Core kernel, config & plugins                    |
| `@aurora/router`           | Router & route matching                          |
| `@aurora/runtime-server`   | HTTP server, SSR runtime                         |
| `@aurora/runtime-client`   | Client runtime & navigation                      |
| `@aurora/schema`           | Schema DSL & code generation                     |
| `@aurora/db`               | Database/ORM abstractions                        |
| `@aurora/validation`       | Validation from schema (e.g. Zod)                |
| `@aurora/react`            | React bindings (hooks, `<Form>`, `<Link>`, etc.) |
| `@aurora/auth`             | Auth/session/role helpers                        |
| `@aurora/jobs`             | Background jobs, schedulers, queues              |
| `@aurora/ai`               | LLM abstraction (chat, embeddings, moderation)   |
| `@aurora/ai-observability` | AI tracing, metrics, logging                     |
| `@aurora/ai-tools`         | Chat sessions, agents, RAG helpers               |
| `@aurora/cli`              | CLI: `aurora new`, `aurora dev`, `aurora build`  |
| `@aurora/devtools`         | Devtools overlay for debugging                   |
| `@aurora/testing`          | Test utilities for apps and packages             |

---

## Quick Code Examples

> These examples show the *design* of AuroraStack APIs.
> Exact signatures may still change while the framework is pre-`1.0.0`.

### 1. Unified Schema

```ts
// schema/app.schema.ts
import {
  defineSchema,
  model,
  string,
  int,
  relation
} from '@aurora/schema';

export default defineSchema({
  User: model({
    id: int().primary().autoIncrement(),
    email: string().email().unique(),
    name: string().min(2).max(50),
    role: string().enum(['user', 'admin']).default('user')
  }),

  Project: model({
    id: int().primary().autoIncrement(),
    name: string().min(2),
    owner: relation('User').belongsTo()
  })
});
```

From this schema, AuroraStack can generate:

* DB migrations,
* typed models,
* validation schemas,
* (optionally) CRUD API endpoints.

Run codegen:

```bash
pnpm codegen
```

---

### 2. Full-stack Page (loader + action + React)

```tsx
// app/routes/projects/index.page.tsx
import { useLoaderData, Form } from '@aurora/react';
import db from '@aurora/db';

export async function loader(ctx: any) {
  const { user } = ctx.auth.requireUser();
  const projects = await db.project.findMany({
    where: { ownerId: user.id }
  });

  return { projects };
}

export async function action(ctx: any) {
  const { user } = ctx.auth.requireUser();
  const data = await ctx.request.formData();
  const name = String(data.get('name') ?? '');

  // Validate using schema-derived rules
  ctx.validate('Project', { name });

  await db.project.create({
    data: { name, ownerId: user.id }
  });

  return ctx.redirect('/projects');
}

export default function ProjectsPage() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>My Projects</h1>

      <ul>
        {projects.map((p: any) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <Form method="post">
        <input name="name" placeholder="Project name" />
        <button type="submit">Create</button>
      </Form>
    </div>
  );
}
```

This one file defines:

* **SSR data loading** (`loader`),
* **mutations** (`action`),
* **UI** (`default` React component),
* **auth and validation rules** via `ctx.auth` and `ctx.validate`.

---

### 3. AI-powered Route

```tsx
// app/routes/assistant.page.tsx
import { Form, useActionData } from '@aurora/react';
import { llm } from '@aurora/ai';

export async function action(ctx: any) {
  const data = await ctx.request.formData();
  const question = String(data.get('q') ?? '');

  const result = await llm.chat({
    model: 'gpt-5.1-mini',
    system: 'You are an assistant for our AuroraStack app.',
    messages: [{ role: 'user', content: question }],
    user: ctx.auth.user?.id,
    tags: ['assistant', 'support']
  });

  return {
    question,
    answer: result.text
  };
}

export default function AssistantPage() {
  const res = useActionData<typeof action>();

  return (
    <div>
      <h1>AuroraStack Assistant</h1>
      <Form method="post">
        <textarea name="q" placeholder="Ask me anything…" />
        <button type="submit">Ask</button>
      </Form>

      {res && (
        <section>
          <h2>Answer</h2>
          <p>{res.answer}</p>
        </section>
      )}
    </div>
  );
}
```

The **AI layer** is treated like any other service: accessible through the context and instrumented via observability tools.

---

## Scripts

From the root of the repo:

```bash
# Start dev mode for apps (docs, playground, etc.)
pnpm dev

# Build all packages and apps
pnpm build

# Run tests across the monorepo
pnpm test

# Lint all projects
pnpm lint

# Typecheck all projects
pnpm typecheck

# Run schema/code generation
pnpm codegen

# Apply database migrations (implementation depends on DB adapter)
pnpm db:migrate

# Prepare & publish a release (Changesets)
pnpm release
```

Scripts are driven by **Turborepo** pipelines defined in `turbo.json`.

---

## Contributing

Contributions are very welcome!

* Check out [`CONTRIBUTING.md`](./CONTRIBUTING.md) (once created) for:

  * how to set up your dev environment,
  * branch/PR guidelines,
  * coding style and testing.

You can help by:

* filing **issues** (bugs, feature requests),
* participating in **Discussions** (ideas, design feedback),
* sending **pull requests** (docs, examples, core features).

---

## Security

Please **do not** report security vulnerabilities via public issues.

See [`SECURITY.md`](./SECURITY.md) for:

* how to report a vulnerability privately,
* which versions are supported,
* how we handle security advisories and fixes.

---

## Roadmap

High-level goals (subject to change):

1. **v0.1.x – Core MVP**

   * Basic router (file-system routes, `.page.tsx`),
   * SSR + client hydration,
   * `@aurora/core`, `@aurora/router`, `@aurora/runtime-*`,
   * minimal `@aurora/schema` + types/codegen.

2. **v0.2.x – Schema & Data**

   * Full schema pipeline (migrations, validation),
   * `@aurora/db` adapters (Postgres + 1–2 ORMs),
   * `@aurora/validation` integration.

3. **v0.3.x – AI & Devtools**

   * `@aurora/ai`, `@aurora/ai-observability`, `@aurora/ai-tools`,
   * Devtools overlay (`@aurora/devtools`),
   * examples for AI-powered apps.

4. **v0.4.x – Templates & CLI**

   * `@aurora/cli` with `create-aurora-app`,
   * official templates: basic, SaaS, admin, marketplace.

5. **v1.0.0 – Stable**

   * Stable public APIs for core packages,
   * documentation coverage & migration guides,
   * production-ready story for Node/Serverless deployments.

You can track progress and discuss ideas via GitHub **Issues**, **Projects**, and **Discussions** on the repo.

---

## License

AuroraStack is licensed under the **Apache License, Version 2.0**.

See the [LICENSE](./LICENSE) file for the full text.

---

## Acknowledgements

AuroraStack is inspired by and learns from many great tools and communities in the ecosystem, including (but not limited to):

* modern full-stack frameworks,
* schema-driven ORMs and validation libraries,
* React and its ecosystem,
* the broader AI tooling community.

---

**Author:** [TheSkiF4er](https://github.com/TheSkiF4er)
**Repository:** [github.com/TheSkiF4er/AuroraStack](https://github.com/TheSkiF4er/AuroraStack)
