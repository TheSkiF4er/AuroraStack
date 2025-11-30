# Contributing to AuroraStack

First of all: **thank you** for your interest in contributing to AuroraStack! 💫  
This document explains how to work with the repository, propose changes, and submit pull requests in a way that keeps the project healthy and fun for everyone.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Bug Reports](#bug-reports)
  - [Feature Requests](#feature-requests)
  - [Documentation Improvements](#documentation-improvements)
  - [Code Contributions](#code-contributions)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Installing Dependencies](#installing-dependencies)
  - [Running the Monorepo](#running-the-monorepo)
- [Working on Changes](#working-on-changes)
  - [Branching Model](#branching-model)
  - [Running Tests, Lint, and Typecheck](#running-tests-lint-and-typecheck)
  - [Working on a Specific Package or App](#working-on-a-specific-package-or-app)
- [Coding Guidelines](#coding-guidelines)
  - [Languages & Style](#languages--style)
  - [TypeScript & Types](#typescript--types)
  - [Testing](#testing)
  - [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
  - [PR Checklist](#pr-checklist)
  - [Reviews and Feedback](#reviews-and-feedback)
- [Documentation & Examples](#documentation--examples)
- [Releases & Versioning](#releases--versioning)
- [Security](#security)
- [Questions & Discussions](#questions--discussions)

---

## Code of Conduct

AuroraStack uses a **Code of Conduct** to help maintain a welcoming and inclusive community.

By participating in this project, you agree to abide by the rules described in:

- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) (once present in the repo)

If you witness or experience any unacceptable behavior, please report it using the contact methods described there.

---

## How Can I Contribute?

There are many ways to help:

### Bug Reports

If you find a bug:

1. Search existing issues:  
   https://github.com/TheSkiF4er/AuroraStack/issues  
   to see if it’s already reported.
2. If not, open a new issue:
   - Use the **“Bug report”** template (if available).
   - Include:
     - AuroraStack version(s)
     - Node.js version
     - OS and environment
     - Steps to reproduce
     - Expected vs actual behavior
     - Any logs or minimal repro code

> Please **do not** report security vulnerabilities publicly.  
> See [Security](#security) below.

### Feature Requests

For new features or changes to existing behavior:

1. Check existing issues and **Discussions**.
2. If not found, open a **“Feature request”** issue:
   - Describe the problem you’re trying to solve (not just the proposed solution).
   - Explain why this belongs in AuroraStack core (and not just in user land).
   - Add any alternatives you considered.
3. Larger or breaking changes should start as a **Discussion** first.

### Documentation Improvements

We love documentation contributions:

- Fix typos and broken links.
- Improve explanations, add diagrams, or clarify confusing sections.
- Add guides or “How to” sections based on real usage.

Documentation lives primarily under:

- `apps/docs/` – docs site.
- README files in:
  - `./README.md` (root)
  - `packages/**/README.md`
  - `examples/**/README.md`

### Code Contributions

Code changes can include:

- New features
- Bug fixes
- Refactors and internal improvements
- New examples and templates
- Test coverage improvements

Please open an issue or join a discussion for **larger changes** before investing a lot of work, so we can align on direction.

---

## Project Structure

AuroraStack is a **pnpm + Turborepo** monorepo. The main folders:

```txt
AuroraStack/
  apps/
    docs/             # Documentation site
    playground/       # Interactive playground

  packages/
    core/             # @aurora/core
    router/           # @aurora/router
    runtime-server/   # @aurora/runtime-server
    runtime-client/   # @aurora/runtime-client
    schema/           # @aurora/schema
    db/               # @aurora/db
    validation/       # @aurora/validation
    react/            # @aurora/react
    auth/             # @aurora/auth
    jobs/             # @aurora/jobs
    ai/               # @aurora/ai
    ai-observability/ # @aurora/ai-observability
    ai-tools/         # @aurora/ai-tools
    cli/              # @aurora/cli
    devtools/         # @aurora/devtools
    testing/          # @aurora/testing

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
````

---

## Development Setup

### Prerequisites

* **Node.js**: `>= 18`
* **pnpm**: `>= 9`
* Git
* A modern editor with TypeScript support (VS Code is recommended)

Install pnpm globally if you don’t have it yet:

```bash
npm install -g pnpm
```

### Cloning the Repository

```bash
git clone https://github.com/TheSkiF4er/AuroraStack.git
cd AuroraStack
```

### Installing Dependencies

From the repository root:

```bash
pnpm install
```

This will:

* install all dependencies
* link all workspaces (apps, packages, examples, templates)

### Running the Monorepo

Start development for all relevant apps (docs, playground, etc.):

```bash
pnpm dev
```

Build everything:

```bash
pnpm build
```

---

## Working on Changes

### Branching Model

Please avoid committing directly to `main`. Use feature branches:

* For features: `feat/<short-description>`
* For fixes: `fix/<short-description>`
* For docs: `docs/<short-description>`
* For chores/refactors: `chore/<short-description>`

Example:

```bash
git checkout -b feat/schema-relations
```

### Running Tests, Lint, and Typecheck

Before you push or open a pull request, **please run**:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

These commands are orchestrated by **Turborepo**, and only re-run where necessary.

### Working on a Specific Package or App

Thanks to workspaces, you can run scripts scoped to a package:

```bash
# Run tests for @aurora/core only
pnpm --filter @aurora/core test

# Build the docs app
pnpm --filter docs build

# Run dev server for docs only
pnpm --filter docs dev
```

For example projects:

```bash
# Run the minimal example
pnpm --filter @aurora-example/minimal dev
```

(Exact package names may vary; check each package’s `package.json`.)

---

## Coding Guidelines

### Languages & Style

* **Language**: TypeScript for all core packages and most apps.
* **Style**:

  * Use the configured **ESLint** rules.
  * Use **Prettier** for formatting.
  * No custom formatting rules in editors; rely on `.eslintrc` and `.prettierrc`.

Typical workflow:

```bash
pnpm format:fix   # format with Prettier
pnpm lint         # enforce ESLint rules
```

### TypeScript & Types

* Use **strict TypeScript**: all packages inherit from `tsconfig.base.json` with `"strict": true`.
* Prefer **explicit return types** on exported functions and public APIs.
* Avoid `any` where possible. If absolutely necessary, prefer:

  * `unknown` (and narrow it)
  * well-typed generics
* Treat types as part of the **public API** for packages: changes to types can be breaking changes.

### Testing

* Use **Vitest** (or the configured test runner) for unit tests.
* For new features:

  * add tests that cover the new behavior;
  * update or remove tests when behavior changes intentionally.
* For bug fixes:

  * add a regression test that fails without the fix and passes with it.

Example commands:

```bash
pnpm test
pnpm --filter @aurora/core test
```

### Commit Messages

We don’t enforce a strict commit convention, but **clear, descriptive commits** make review easier. Examples:

* `fix(schema): handle null relations in generator`
* `feat(router): support optional catch-all routes`
* `docs: add quickstart for SaaS template`
* `refactor(runtime-server): extract request handler`

Avoid commits like `fix stuff` or `work in progress` in the final PR history.

If the project later adopts a stricter convention (e.g. Conventional Commits), this section will be updated.

---

## Pull Request Process

### PR Checklist

Before opening a PR, please ensure:

* [ ] The code builds: `pnpm build`
* [ ] Tests pass: `pnpm test`
* [ ] Lint and type checks pass: `pnpm lint` and `pnpm typecheck`
* [ ] New or changed behavior is covered by tests (where appropriate)
* [ ] Public APIs (types, exports) are documented
* [ ] Docs and examples are updated if necessary
* [ ] A **Changeset** is added if the change affects published packages

To add a Changeset (for versioning):

```bash
pnpm changeset
```

Follow the prompts to select packages and change type (patch/minor/major).

### Reviews and Feedback

* All PRs must be reviewed before merging.
* The review may request:

  * changes to align with architecture / design,
  * additional tests,
  * improvements to naming or structure.
* Please be patient and respectful in review discussions; we’re all working towards the same goal.

Small PRs are easier to review than very large ones. If possible, break big changes into smaller, focused steps.

---

## Documentation & Examples

Documentation and examples are a critical part of AuroraStack.

* **Docs**:

  * Live under `apps/docs/`.
  * Are written in Markdown/MDX (depending on the docs framework).
  * Should include code snippets and links to relevant packages.

* **Examples**:

  * Live under `examples/`.
  * Should be **small but realistic**.
  * Each example should have its own `README.md` explaining what it demonstrates.

When you add a new feature, consider:

* Does it need a docs page (guide, reference)?
* Would a small example app help users understand it?

---

## Releases & Versioning

AuroraStack uses:

* **Semantic Versioning (SemVer)** for all published packages.
* **Changesets** (`.changeset/` folder) to manage version bumps and changelogs.

As a contributor:

* You usually don’t run the full release pipeline.
* But you **should** create a Changeset if your PR affects public APIs or behavior of a package.

The maintainers will:

* Review the Changesets,
* Run the release workflow,
* Publish packages to npm,
* Tag releases in Git and update changelogs.

---

## Security

If you suspect you’ve found a **security vulnerability**:

* **Do not** open a public issue.
* Follow the process described in [`SECURITY.md`](./SECURITY.md).

In short:

* Use GitHub’s **“Report a vulnerability”** flow under the repo’s **Security** tab, or
* Use other private contact methods described in `SECURITY.md`.

We follow a responsible disclosure process:

* triage the report,
* develop and release a fix,
* then disclose details when safe.

---

## Questions & Discussions

Not sure where to start, or want to discuss an idea?

* Use **GitHub Discussions** in the repo (when enabled) for:

  * design discussions,
  * usage questions,
  * “show & tell” (projects built with AuroraStack),
  * roadmap ideas.
* Use **Issues** for concrete bugs and feature requests.

---

Thank you again for contributing to **AuroraStack** 💜
Your feedback, ideas, and code help shape the future of this framework.

**Author:** [TheSkiF4er](https://github.com/TheSkiF4er)
**Repository:** [github.com/TheSkiF4er/AuroraStack](https://github.com/TheSkiF4er/AuroraStack)
