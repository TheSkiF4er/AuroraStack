# AuroraStack Changelog

All notable changes to **AuroraStack** will be documented in this file.

This project follows **[Semantic Versioning](https://semver.org/)**:

- **MAJOR** – incompatible API changes,
- **MINOR** – backwards-compatible functionality,
- **PATCH** – backwards-compatible bug fixes.

> ℹ️ **Note:**  
> Actual version bumps and detailed per-package changelogs are managed by **[Changesets](https://github.com/changesets/changesets)** in the `.changeset/` directory.  
> This `CHANGELOG.md` is a human-friendly, high-level overview for the whole repository.

---

## [Unreleased]

> Changes that are planned or merged into `main`, but not yet released to npm.  
> Once a release is cut, these items move into a new version section.

### Added

- _TBD_

### Changed

- _TBD_

### Fixed

- _TBD_

### Deprecated

- _TBD_

### Removed

- _TBD_

---

## [0.1.0] – Initial Experimental Release

> 🧪 **Status:** Experimental, pre–1.0.0.  
> Expect breaking changes until core APIs stabilize.

### Highlights

- Introduces the **AuroraStack** monorepo structure with pnpm + Turborepo.
- Establishes the core philosophy:
  - Full-stack **TypeScript**,
  - **Unified data schema** as a single source of truth,
  - **Universal rendering** (SSR + SPA navigation + islands),
  - **AI-native** abstractions built into the framework.

### Monorepo & Tooling

- Set up **monorepo** with:
  - `pnpm-workspace.yaml`
  - `turbo.json`
  - `tsconfig.base.json`
- Added root tooling:
  - **TypeScript** (strict),
  - **ESLint** + **Prettier**,
  - **Vitest** for tests,
  - **Husky** + **lint-staged** for pre-commit hooks.
- Introduced **Changesets** (`.changeset/`) for multi-package versioning and release management.

### Core Packages (Scaffolding)

> These packages are introduced with initial scaffolding and design goals.  
> APIs are expected to evolve before `v1.0.0`.

- **`@aurora/core`**
  - Core kernel: configuration, plugin system, lifecycle hooks.
  - Shared application and request context primitives.

- **`@aurora/router`**
  - File-based routing model (`*.page.tsx`).
  - Route matching and parameter extraction interfaces.

- **`@aurora/runtime-server`**
  - HTTP server entry and SSR integration points.
  - Request → context → route handler pipeline.

- **`@aurora/runtime-client`**
  - Client-side runtime & hydration.
  - SPA-style navigation with history and loader integration.

### Data & Schema Layer

- **`@aurora/schema`**
  - Early DSL design:
    - `defineSchema`, `model`, `string`, `int`, `relation`, etc.
  - Planned codegen targets:
    - DB migrations,
    - TS models,
    - validation schemas,
    - optional CRUD API endpoints.

- **`@aurora/db`**
  - Base abstraction for database/ORM adapters (e.g., Prisma, Drizzle).
  - Early context integration (`ctx.db`).

- **`@aurora/validation`**
  - Validation engine placeholder (e.g., Zod integration).
  - Intended to consume `@aurora/schema` definitions.

### Application Layer

- **`@aurora/react`**
  - React bindings for AuroraStack:
    - `useLoaderData`, `useActionData`,
    - `<Form>`, `<Link>`, `<Outlet>`.
  - Route component contract (`loader`, `action`, `default` component).

- **`@aurora/auth`**
  - Auth/session abstraction design:
    - `ctx.auth.requireUser()`,
    - role-based guards.

- **`@aurora/jobs`**
  - Job + scheduler scaffolding (cron/interval/queue).
  - Intended to power background tasks and async workflows.

### AI Layer

- **`@aurora/ai`**
  - High-level API design:
    - `llm.chat`, `llm.embed`, `llm.moderate`.
  - Provider abstraction (OpenAI, others, local models – pluggable).

- **`@aurora/ai-observability`**
  - Planned tracing and metrics for AI calls:
    - latency,
    - token usage,
    - error tracking.

- **`@aurora/ai-tools`**
  - Higher-level helpers concept:
    - chat sessions,
    - agents/tools,
    - retrieval/RAG utilities.

### Tooling & DX Packages

- **`@aurora/cli`**
  - CLI scaffolding:
    - `aurora new` (planned),
    - `aurora dev`,
    - `aurora build`,
    - `aurora codegen`,
    - `aurora db` (migrations),
    - `aurora doctor`.

- **`@aurora/devtools`**
  - Initial design for devtools overlay:
    - route inspector,
    - loader/action timing,
    - AI call log panel.

- **`@aurora/testing`**
  - Testing utils blueprint:
    - `createTestApp`,
    - `mockRequest`,
    - `mockContext`.

### Apps, Templates & Examples

- **`apps/docs`** – documentation site scaffold.
- **`apps/playground`** – interactive playground (for quick experiments and demos).

- **Templates** (planned):
  - `app-basic` – minimal starter.
  - `app-saas` – SaaS starter (auth, billing, dashboard).
  - `app-admin` – admin/CRUD starter.
  - `app-marketplace` – marketplace/e-commerce starter.

- **Examples** (planned):
  - `minimal` – basic AuroraStack app.
  - `saas-demo` – sample SaaS app using `@aurora/ai`.
  - `admin-dashboard` – admin UI with filters & CRUD.

### Documentation & Governance

- Added:
  - [`README.md`](./README.md) – project overview and quick start.
  - [`CONTRIBUTING.md`](./CONTRIBUTING.md) – contribution guidelines.
  - [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) – community standards.
  - [`SECURITY.md`](./SECURITY.md) – security reporting policy.

- Established:
  - Monorepo layout conventions,
  - Initial roadmap for `v0.x` and `v1.0.0`.

---

## Changelog Format & Conventions

Going forward, each tagged release will:

- Include a new section in this file, in descending order (newest first).
- Group changes into categories where applicable:

  - `### Added` – new features.
  - `### Changed` – changes in existing functionality.
  - `### Fixed` – bug fixes.
  - `### Deprecated` – soon-to-be removed features.
  - `### Removed` – previously deprecated features removed.
  - `### Security` – security-impacting fixes or announcements.

- Summarize high-level changes for the **whole project**,  
  while **package-specific** changes are tracked more granularly via Changesets and package-level release notes when needed.

---

## Links

- **Repository:**  
  [`https://github.com/TheSkiF4er/AuroraStack`](https://github.com/TheSkiF4er/AuroraStack)

- **Issues:**  
  [`https://github.com/TheSkiF4er/AuroraStack/issues`](https://github.com/TheSkiF4er/AuroraStack/issues)

- **Security Policy:**  
  See [`SECURITY.md`](./SECURITY.md)

- **Contribution Guidelines:**  
  See [`CONTRIBUTING.md`](./CONTRIBUTING.md)
