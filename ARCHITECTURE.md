# Architecture

AuroraStack is a modular monorepo where each major concern is a separate package.

## Layers
- **Schema layer** (`@aurora/schema`, `@aurora/validation`): domain definition and validation.
- **Data layer** (`@aurora/db`): adapters (in-memory in scaffold; extend for SQL/NoSQL).
- **Runtime** (`@aurora/runtime-server`, `@aurora/runtime-client`): request lifecycle, data loading, rendering.
- **Router** (`@aurora/router`): routing primitives and matching.
- **DX** (`@aurora/cli`, `@aurora/devtools`, `@aurora/testing`): tooling.

## Request Lifecycle (conceptual)
1. Router matches the incoming URL.
2. Loader runs (GET) or Action runs (mutations).
3. Result is returned as JSON (scaffold) or rendered output (future).
