# Release Guide

This repository uses Changesets.

## Creating a release
1. Ensure main is green (CI passing).
2. Add changesets for user-facing changes:
   - `pnpm changeset`
3. Version packages:
   - `pnpm changeset version`
4. Build and publish:
   - `pnpm -r build`
   - `pnpm changeset publish`

## GitHub Releases
- Tag format: `v1.0.0`
- Release title: `AuroraStack v1.0.0`
- Attach source archive and (optionally) generated SBOMs.
