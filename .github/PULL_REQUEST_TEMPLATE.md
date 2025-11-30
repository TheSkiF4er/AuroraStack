# Pull Request Template – AuroraStack

Thank you for contributing to **AuroraStack**! 💜  
Please fill out the sections below to help us review your PR efficiently.

---

## Summary

> A short description of what this PR does.

- What problem does this PR solve?
- Is it a bug fix, feature, refactor, docs change, or something else?

Example:

> Fixes loader re-run behavior when actions redirect, and adds tests for nested routes.

---

## Type of Change

Select all that apply:

- [ ] 🐞 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that changes existing APIs or behavior)
- [ ] 📚 Documentation update
- [ ] 🧰 Refactor / internal improvement
- [ ] ✅ Tests / CI only
- [ ] Other (please describe):

---

## Affected Area(s)

Which parts of AuroraStack are affected?

- [ ] `@aurora/core`
- [ ] `@aurora/router`
- [ ] `@aurora/runtime-server`
- [ ] `@aurora/runtime-client`
- [ ] `@aurora/schema`
- [ ] `@aurora/db`
- [ ] `@aurora/validation`
- [ ] `@aurora/react`
- [ ] `@aurora/auth`
- [ ] `@aurora/jobs`
- [ ] `@aurora/ai`
- [ ] `@aurora/ai-observability`
- [ ] `@aurora/ai-tools`
- [ ] `@aurora/cli`
- [ ] `@aurora/devtools`
- [ ] `@aurora/testing`
- [ ] Templates
- [ ] Examples
- [ ] Docs
- [ ] Other (explain below)

---

## Details / Motivation

> Explain the motivation and context behind this change.

- Why is this change needed?
- How does it improve AuroraStack (DX, performance, security, maintainability, etc.)?
- If this is a bug fix, what was the root cause?

---

## Implementation Notes

> Briefly explain how you implemented the change.

- Key design decisions:
- Important new functions / APIs:
- Any trade-offs or limitations:

If helpful, include diagrams or pseudocode, or link to related issues/discussions.

---

## Breaking Changes

- Does this PR include **breaking changes**?
  - [ ] No
  - [ ] Yes (explain below)

If **yes**, describe:

- What is breaking?
- Who is affected?
- Migration steps for users:

---

## How Has This Been Tested?

> Describe how you tested your changes. Be as specific as possible.

- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing in example app(s)
- [ ] Other (describe):

Examples:

```bash
# Example commands
pnpm test
pnpm --filter @aurora/core test
pnpm --filter saas-demo dev
````

What scenarios did you test?

---

## Screenshots / Demos (Optional)

If this PR affects the UI, DX, or Devtools, please include screenshots, GIFs, or short explanations.

* Before:
* After:

---

## Documentation

* [ ] Not needed (internal-only change)
* [ ] Included in this PR
* [ ] I will open a follow-up docs PR
* [ ] Needs docs, but I’m not sure where (please advise)

If docs are included, list the files/sections you updated:

* `apps/docs/...`
* `README.md` / package README
* `examples/...`

---

## Changeset

AuroraStack uses **Changesets** for versioning.

* [ ] This change **does not** affect published packages (no Changeset needed)
* [ ] I added a Changeset for this PR (`pnpm changeset`)
* [ ] I’m not sure if a Changeset is needed (please advise)

If you added a Changeset, paste the filename(s) from `.changeset/`:

* `.changeset/your-changeset-name.md`

---

## Related Issues / Discussions

Link any related items:

* Issues: `#123`, `#456`
* Discussions:
* External references (e.g. blog posts, specs, prior art):

---

## Checklist

Please confirm the following:

* [ ] I have read the [Contributing Guidelines](./CONTRIBUTING.md).
* [ ] I have run `pnpm lint` and fixed any issues.
* [ ] I have run `pnpm typecheck` and fixed any issues.
* [ ] I have run `pnpm test` (and added/updated tests where appropriate).
* [ ] I have run `pnpm build` or verified that builds pass.
* [ ] I have updated documentation as needed (or noted that it’s pending).
* [ ] I have added a Changeset if this affects published packages.

---

Thank you for helping improve **AuroraStack**! 🚀
