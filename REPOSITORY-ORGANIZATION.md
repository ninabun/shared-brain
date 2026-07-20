# Wing Yee AI Lab Repository Organization

## 1. Purpose

This document identifies the authoritative repository for each Wing Yee AI Lab product. Its purpose is to prevent portfolio presentation work from being confused with standalone application development.

- This document governs repository ownership and task routing.
- `apps/portfolio-3d/AGENTS.md` governs the operational editing workflow inside the portfolio.
- Audit findings such as dead files, duplicate assets, and unused packages do not authorize deletion, cleanup, or dependency removal.

## 2. Architecture Model

Wing Yee AI Lab uses a hybrid repository architecture.

Portfolio presentation:

- Repository: `ninabun/shared-brain`
- Path: `apps/portfolio-3d`

Standalone applications remain in independent repositories. Those repositories own their real product functionality, integrations, persistence, testing, release configuration, and deployment code.

Do not recommend moving every product into `shared-brain` or converting the current system into a monorepo unless the user separately requests an architecture review.

## 3. Authoritative Repository Registry

| Product | Repository or authoritative path | Status | Owns |
|---|---|---|---|
| Portfolio / Wing Yee AI Lab website | Repository: `ninabun/shared-brain`<br>Path: `apps/portfolio-3d` | Active | Portfolio pages, narratives, screenshots, architecture diagrams, demo links, and portfolio-specific interactive experiences |
| Smart Reception | `ninabun/smart-reception` | Active standalone application | Visitor panel, staff panel, alert logic, n8n integration, persistence, application UI, business logic, and application deployment |
| Pregnancy Companion | `ninabun/pregnancy-companion` | Active standalone application | Real application logic, patient-facing experience, integrations, data handling, and application deployment |
| Roster Automation | `ninabun/Rostering-Automation` | Active standalone application | Roster engine, validation logic, application workflows, product UI, and application deployment |
| Earth Observatory | `ninabun/earth-observatory` | Active standalone application | Interactive application code, 3D experience, assets, and application deployment |
| Medication Verification | GitHub repository: **Not confirmed**<br>Local prototype: `ninabun/shared-brain/apps/medication-verification` | Unresolved | Stop and confirm the authoritative repository before modifying application functionality |

## 4. Shared Brain Repository Map

### `apps/portfolio-3d`

The authoritative source for the Wing Yee AI Lab portfolio presentation layer.

### `apps/medication-verification`

A local prototype only. It is not a confirmed standalone source of truth. Do not assume that it is the authoritative Medication Verification application.

### `src`, `desktop`, `functions`, `ios`, and `workers`

These areas belong to the root Shared Brain product. They are outside the normal scope of portfolio work.

### `docs`

This directory may contain both authored documentation and generated hosting output. Do not assume every file in `docs` is portfolio-owned.

### Generated and local state

`node_modules`, `.next`, `out`, `dist`, caches, logs, `.vercel`, and `.firebase` are generated or local state. Do not treat them as authored source and do not hand-edit them.

## 5. Portfolio Ownership Boundary

The portfolio may contain:

- Product narratives and case studies.
- Screenshots, diagrams, videos, and presentation assets.
- Architecture and workflow explanations.
- Links to standalone applications.
- Embedded demonstrations built specifically for presentation.
- Portfolio-specific WebGL and interactive experiences.

The portfolio must not become a second full implementation of:

- Authentication.
- Databases.
- Operational workflows.
- n8n production integrations.
- Application backend services.
- Product persistence.
- Standalone product business logic.

## 6. Standalone Application Ownership

Standalone repositories own:

- Real application features.
- Business logic.
- Authentication and authorization.
- Databases and persistence.
- External integrations.
- n8n workflows connected to the actual product.
- Product-specific APIs.
- Application testing and release configuration.
- Standalone deployment.

A portfolio task does not authorize changes to a standalone repository.

A standalone application task does not authorize changes to the portfolio.

## 7. Codex Task-Routing Rules

Before editing, Codex must classify the request by both product and change type.

| Request classification | Authoritative destination |
|---|---|
| Portfolio presentation or case-study change | `ninabun/shared-brain/apps/portfolio-3d` |
| Smart Reception application functionality | `ninabun/smart-reception` |
| Pregnancy Companion application functionality | `ninabun/pregnancy-companion` |
| Roster Automation application functionality | `ninabun/Rostering-Automation` |
| Earth Observatory application functionality | `ninabun/earth-observatory` |
| Medication Verification application functionality | Stop and confirm the authoritative repository |

- Naming a product is not enough to identify the repository.
- Codex must distinguish “update the portfolio page about Smart Reception” from “update the Smart Reception app.”
- Never infer authorization to modify two repositories from one task.
- Coordinated cross-repository changes require each repository and file scope to be explicitly approved.
- If repository ownership is uncertain, stop before editing.

## 8. Portfolio Deployment Registry

- Repository: `ninabun/shared-brain`
- Application path: `apps/portfolio-3d`
- Production branch: `main`
- Hosting: Vercel
- Vercel Root Directory: `apps/portfolio-3d`
- Framework: Next.js
- Production source: GitHub `main`
- Production deployment occurs automatically from GitHub `main`.
- Manual Vercel deployment must not be used.
- `outputDirectory` must not be changed to `dist` or `out`.

The root Shared Brain Vercel configuration and the portfolio Vercel configuration are separate concerns. A portfolio task does not authorize changes to the root Vercel configuration.

## 9. Protected Boundaries

During portfolio work, do not modify:

- Root Shared Brain product areas.
- Standalone product repositories.
- `apps/medication-verification` unless specifically approved after ownership confirmation.
- Secrets or environment files.
- Generated output.
- Local deployment metadata.
- Caches or dependency folders.
- Unrelated lockfiles, manifests, or deployment configuration.

For operational editing, approval, Git, validation, and deployment rules inside the portfolio, follow `apps/portfolio-3d/AGENTS.md`.

## 10. Known Unresolved Items

- Medication Verification has no confirmed authoritative GitHub repository.
- The canonical route decision between `antenatal-companion` and `antenatal-care-companion` remains unresolved.
- Historical branch deployment information must be treated as historical until verified.
- Dead-file, duplicate-asset, and unused-package findings require a separate cleanup task and explicit approval.

## 11. Maintenance Rule

- Update this document when a repository is created, renamed, archived, transferred, or becomes the new source of truth.
- Do not update this document for ordinary UI, content, or product feature work.
- Confirm repository URLs and deployment ownership before changing registry entries.
