# AuroraStack – Changesets

AuroraStack uses **[Changesets](https://github.com/changesets/changesets)** to manage versioning and changelogs for all packages in the monorepo.

This directory (`.changeset/`) contains:

- `config.json` – the Changesets configuration for AuroraStack.
- `*.md` files – individual change entries authored by contributors.

Each `*.md` file represents a **logical change** that may affect one or more published packages and will be included in the next release.

---

## Why Changesets?

AuroraStack is a **multi-package monorepo** (framework core, adapters, CLI, devtools, etc.). We need:

- **Consistent SemVer** across many packages.
- **Clear changelogs** for each package.
- The ability to **accumulate changes over time** and release them together.

Changesets lets us:

- Describe **what changed** and **how it affects versioning** (patch/minor/major).
- Release packages in a controlled way using CI + `changesets/action`.
- Generate changelogs automatically when versions are bumped.

---

## When to Create a Changeset

Create a Changeset when your PR:

- Changes a **published package** (in `packages/`), and:
  - adds a new feature,
  - fixes a bug,
  - alters behavior,
  - modifies public types or exports,
- Or otherwise results in a **visible change for users** of that package.

You generally **do not** need a Changeset when:

- Only documentation changes (no code).
- Changes affect **examples** or **internal tooling** only.
- Purely internal refactors that do not affect public APIs or behavior.

If you’re unsure, it’s better to **add a Changeset** and let the maintainer adjust the release type during review.

---

## How to Create a Changeset

From the root of the AuroraStack repo:

```bash
pnpm changeset
````

This launches an interactive prompt.

### Step 1 – Select changed packages

You’ll see a list of packages like:

* `@aurora/core`
* `@aurora/router`
* `@aurora/runtime-server`
* `@aurora/runtime-client`
* `@aurora/schema`
* `@aurora/db`
* `@aurora/validation`
* `@aurora/react`
* `@aurora/auth`
* `@aurora/jobs`
* `@aurora/ai`
* `@aurora/ai-observability`
* `@aurora/ai-tools`
* `@aurora/cli`
* `@aurora/devtools`
* `@aurora/testing`

Select **all** packages that your PR affects (in terms of public behavior or types).

### Step 2 – Choose the bump type

For each selected package, you’ll be asked to choose one of:

* `patch` – backwards-compatible bug fixes or very small enhancements.
* `minor` – backwards-compatible new features, significant new capabilities.
* `major` – breaking changes; the public API or behavior is not compatible.

Quick guide:

* **Patch**: “Fixes a bug” / “Small DX improvement” / “Perf tweak without API change”.
* **Minor**: “Adds new optional feature” / “New API that doesn’t break old ones”.
* **Major**: “Removed/renamed/moved APIs” / “Changed signatures or behavior”.

### Step 3 – Write a summary

Changesets will then ask for a summary message.
Write a **human-readable, one-line description** of the change:

```text
Fix loader re-run behavior when actions redirect.
```

or

```text
Add AI chat session helper to @aurora/ai-tools.
```

This message will appear in generated changelogs.

A new file like `.changeset/clever-koalas-dance.md` will be created.

---

## Changeset File Structure

A typical Changeset file looks like this:

```markdown
---
"@aurora/core": minor
"@aurora/router": patch
---

Improve route matching performance and add new hooks to @aurora/core.
Fix a bug in nested route matching in @aurora/router.
```

* The YAML frontmatter (`---`) lists version bumps per package.
* The body contains a **short explanation** of what changed.

You can edit this file manually if needed (before merging the PR).

---

## How Releases Work

In CI, the `Release` workflow uses Changesets to manage publishing:

1. **Developers**:

   * Create Changesets in their PRs using `pnpm changeset`.
   * Commit changeset files into the PR.

2. **On `main` branch**, the release workflow:

   * Runs tests, lint, typecheck, build via `pnpm release:prepare`.
   * Uses `changesets/action` with:

     * `pnpm release:version` – bumps versions and updates changelogs.
     * `pnpm release:publish` – publishes packages to npm.

3. **Changelogs & versions**:

   * Each affected package gets version bumps in `package.json`.
   * Changelogs are updated using the information from Changeset files.
   * Human-friendly summary goes into the project’s `CHANGELOG.md`.

---

## Best Practices for Writing Changesets

* **Group logically related changes** into a single Changeset.

  * Example: If a PR updates both `@aurora/core` and `@aurora/router` as part of one feature, use one Changeset that touches both.
* **Be concise but clear** in the summary.

  * Aim for 1–3 sentences.
* **Use user-facing language**.

  * Think: “What would I want to read in the changelog as a user?”.
* **Avoid implementation details** unless they matter to consumers.

  * Focus on behavior, APIs, and breaking changes.

---

## Common Scenarios

### 1. Bug fix in a single package

You changed code in `@aurora/router` to fix a bug, no API changes.

* Run: `pnpm changeset`
* Select: `@aurora/router`
* Choose: `patch`
* Summary: `Fix route matching when trailing slashes are present.`

### 2. New feature in multiple packages

You added a new schema feature that touches `@aurora/schema` and `@aurora/db`.

* Run: `pnpm changeset`
* Select: `@aurora/schema`, `@aurora/db`
* Choose: `minor` for each
* Summary: `Add enum field support to schema and db codegen.`

### 3. Breaking change

You changed the signature of `loader` context or removed an old API.

* Run: `pnpm changeset`
* Select the affected package(s)
* Choose: `major`
* Summary: `Refactor loader context to use async resources and remove legacy fetch API.`
* In your PR, update:

  * `CHANGELOG.md` if needed with more detail,
  * docs and migration guidance.

---

## Cleanup and Maintenance

* **Do not remove** Changeset files that are still needed for unreleased changes.
* After a release:

  * The Changeset files for that release will be automatically consumed (and removed)
    by `changeset version`.
* If a PR is closed without being merged, it’s safe to delete its associated Changeset files.

---

## FAQ

**Q: I forgot to add a Changeset before opening a PR. What now?**
A: No problem — just run `pnpm changeset` in a new commit on the same branch.
Maintainers may also guide you during review.

**Q: My change only affects documentation and tests. Do I need a Changeset?**
A: Usually **no**, unless it’s tied to a user-visible change or we explicitly request one.

**Q: I’m not sure what bump type (patch/minor/major) to choose.**
A: Choose your best guess and mention it in the PR. Maintainers can adjust during review.

---

If you have any questions about using Changesets in AuroraStack, feel free to:

* Open a **Discussion** in the repository, or
* Ask in your pull request, and we’ll help you choose the right approach.

Thanks for helping keep AuroraStack’s releases clean, consistent, and transparent! 🚀
