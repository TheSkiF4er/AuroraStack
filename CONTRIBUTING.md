# Contributing to AuroraStack

Thanks for your interest in contributing.

## Quick Start
1. Fork the repo and create a feature branch.
2. Install dependencies:
   - Node.js >= 18
   - pnpm >= 9
   - `pnpm install`
3. Run the workspace:
   - `pnpm dev`
4. Validate changes:
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm test`

## Code Style
- TypeScript strict mode.
- Prefer small, composable modules.
- Public APIs must be documented and covered by tests.

## Changesets (required for user-facing changes)
We use Changesets to manage versioning and release notes.

- Add a changeset: `pnpm changeset`
- Version packages (maintainers): `pnpm release`

## Commit & PR Guidelines
- Keep PRs focused and small.
- Include a clear description and motivation.
- Add or update tests where applicable.
- Update docs for API changes.

## Reporting Issues
Use GitHub Issues for bugs and feature requests.
For security issues, use: security@cajeer.com
