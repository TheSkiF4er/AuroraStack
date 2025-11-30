# AuroraStack Security Policy

Thank you for taking the time to help keep AuroraStack and its users safe.  
This document explains **how to report security issues** and **how we handle them**.

---

## Supported Versions

AuroraStack follows semantic versioning (`MAJOR.MINOR.PATCH`) and keeps security support focused on **actively maintained versions**.

The following versions are **eligible to receive security fixes**:

- The latest **major** version (e.g. `1.x.x`)
- The latest **minor** within that major (e.g. `1.4.x` if current is `1.4.3`)

Older major versions are **not guaranteed** to receive security patches.

If you’re unsure whether your version is supported, the safest option is to **upgrade to the latest release** listed on:

- GitHub Releases: `https://github.com/TheSkiF4er/AuroraStack/releases`
- npm packages: (per-package status will be documented in their READMEs)

---

## Reporting a Vulnerability

### Please **do not** open public issues for security problems

To avoid exposing users to unnecessary risk, **never** disclose security vulnerabilities in:

- GitHub Issues  
- Pull Requests  
- Public Discussions  
- Social media / blogs / chat, etc.

Instead, please use one of the **private channels** below.

### Preferred: GitHub Security Advisories

If you have found a vulnerability in AuroraStack:

1. Go to the repository:  
   `https://github.com/TheSkiF4er/AuroraStack`
2. Open the **“Security”** tab.
3. Click **“Report a vulnerability”**.
4. Provide:
   - A clear description of the issue.
   - Exact versions affected (if known).
   - Steps to reproduce (ideally a minimal example).
   - Impact assessment (what an attacker can do).
   - Any suggested fixes or workarounds.

GitHub’s private advisory workflow allows us to **coordinate, fix, and disclose** responsibly.

### If GitHub Security Advisories are not available

If for some reason you cannot use GitHub’s advisory system, you may instead:

- Create a **private communication channel** by reaching out via GitHub (e.g. opening an issue that contains *no* sensitive details and asks for a private contact method), and we’ll follow up.
- Or, if a dedicated security email is later published in this file or in the repository’s README, use that address.

---

## What to Include in Your Report

To help us investigate efficiently, please include as much of the following as possible:

- **Summary**: Short description of the vulnerability.
- **Component / Package**: Which package(s) are affected (e.g. `@aurora/core`, `@aurora/router`, `@aurora/cli`, etc.).
- **Version(s)**: The AuroraStack and Node.js versions you tested with.
- **Environment**:
  - OS (e.g. Ubuntu 22.04, macOS Sonoma, Windows 11)
  - Node.js version
  - Any relevant framework/browser/runtime details
- **Steps to Reproduce**:
  - Minimal configuration or sample code that demonstrates the issue
  - Exact commands to run
- **Impact**:
  - What an attacker can do (RCE, data leak, privilege escalation, etc.)
  - Whether auth is required
- **Workarounds (if any)**:
  - Temporary mitigations you have identified.

The more detail you provide, the faster we can understand and fix the issue.

---

## Our Security Response Process

When you report a vulnerability through a private channel:

1. **Acknowledgement**

   - We aim to acknowledge your report **within 3 business days**.
   - We may ask clarifying questions to fully understand the issue.

2. **Triage & Assessment**

   - We validate the report and classify severity (e.g. Low / Medium / High / Critical).
   - We identify affected packages, versions, and potential impact.

3. **Fix Development**

   - We work on a fix or mitigation.
   - Where possible, we add tests to prevent regressions.
   - For critical issues, we may provide **temporary workarounds** while a full patch is prepared.

4. **Coordinated Release**

   - We release patched versions of affected packages.
   - For important vulnerabilities, we publish a **security advisory** summarizing:
     - Impact
     - Affected versions
     - Fixed versions
     - Recommended upgrade path

5. **Public Disclosure**

   - Once a fix is available, we will **publicly disclose** the vulnerability details in a responsible manner (typically via GitHub Security Advisory and/or release notes).
   - We will credit reporters who wish to be acknowledged, subject to their preference.

---

## Scope

This security policy applies to:

- The core AuroraStack repository:  
  `https://github.com/TheSkiF4er/AuroraStack`
- Official packages published under the AuroraStack organization or namespace, for example:
  - `@aurora/core`
  - `@aurora/router`
  - `@aurora/runtime-server`
  - `@aurora/runtime-client`
  - `@aurora/schema`
  - `@aurora/db`
  - `@aurora/validation`
  - `@aurora/react`
  - `@aurora/auth`
  - `@aurora/jobs`
  - `@aurora/ai`
  - `@aurora/ai-observability`
  - `@aurora/ai-tools`
  - `@aurora/cli`
  - `@aurora/devtools`
  - `@aurora/testing`
- Official starter templates and example apps that are part of this repository.

This policy **does not** cover:

- Third-party dependencies (libraries, tools, runtimes) not maintained by the AuroraStack project.
- Applications built by others **using** AuroraStack (unless the vulnerability lies within AuroraStack itself).

If you believe you’ve found an issue in a third-party package used by AuroraStack, please also consider reporting it to the **upstream project**.

---

## Security Best Practices When Using AuroraStack

While we strive to ship secure defaults, we **strongly recommend** that users:

- Keep **AuroraStack packages updated** to the latest versions.
- Run **Node.js LTS** or newer, which includes security patches for the runtime.
- Follow least-privilege principles:
  - Limit access tokens and API keys.
  - Restrict database credentials and network access.
- Use HTTPS/TLS in production.
- Enable additional security tooling where appropriate:
  - Dependency scanning (e.g. `npm audit`, GitHub Dependabot).
  - Static analysis / linting.
  - Web application firewalls and reverse proxies.

---

## Responsible Disclosure

We ask all security researchers and users to follow **responsible disclosure** principles:

- Report vulnerabilities **privately** first.
- Allow reasonable time for analysis and remediation.
- Avoid exploiting the vulnerability beyond what is strictly necessary to demonstrate the issue.
- Do not access, modify, or destroy data that you don’t own.

We are grateful to everyone who invests time and effort to improve the security of AuroraStack.

---

## Thank You

Security is a shared responsibility.  
If you have questions or suggestions about this policy itself, you can open a **“Docs / Security”** issue in:

`https://github.com/TheSkiF4er/AuroraStack/issues`

Please **do not** include sensitive vulnerability details in that public issue; use the private reporting methods described above for actual security flaws.
