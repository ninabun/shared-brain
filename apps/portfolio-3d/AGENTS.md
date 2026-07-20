# Wing Yee AI Lab Portfolio Engineering Operating System v2

## 1. Purpose and Scope

These instructions apply only to `apps/portfolio-3d` in the `ninabun/shared-brain` repository.

This directory contains the Wing Yee AI Lab portfolio presentation layer. It may contain:

- Product case studies and narratives.
- Workflow and architecture explanations.
- Screenshots, diagrams, videos, audio, and 3D assets.
- Links to standalone product demonstrations.
- Embedded demonstrations built specifically for portfolio presentation.
- Portfolio-specific interactive and WebGL experiences.

Standalone application functionality must remain in each product’s own repository. Do not treat the portfolio as the source repository for a standalone product.

Instructions outside this file continue to apply when they impose stricter safety, authorization, or repository rules.

## 2. Portfolio vs Standalone Application Boundary

### Portfolio

- Repository: `ninabun/shared-brain`
- Scope: `apps/portfolio-3d`
- Purpose: product presentation, case studies, workflow explanations, screenshots, architecture diagrams, demo links, and portfolio-specific interactive experiences.

A portfolio-specific interactive experience may illustrate a product workflow, but it must remain presentation-oriented. It must not become a second implementation of the standalone product’s authentication, persistence, operational workflows, integrations, backend services, or production business logic.

### Standalone applications

- Smart Reception: `ninabun/smart-reception`
- Pregnancy Companion: `ninabun/pregnancy-companion`
- Roster Automation: `ninabun/Rostering-Automation`
- Earth Observatory: `ninabun/earth-observatory`

Do not copy, recreate, or maintain a complete standalone application inside the portfolio.

Do not modify another repository as part of a portfolio task. If the requested outcome requires a standalone application change, stop and identify the repository and work that fall outside the portfolio task.

Portfolio route links and standalone demo links must remain clearly distinguishable in code, content, and navigation.

## 3. Mandatory Impact Analysis Before Editing

Before modifying, creating, moving, renaming, replacing, or deleting any file, Codex must provide an impact analysis containing:

1. A restatement of the requested outcome.
2. Every existing file proposed for modification.
3. Every file proposed for creation.
4. Every file proposed for deletion, movement, replacement, or renaming.
5. The reason each proposed file operation is required.
6. The files, routes, applications, repositories, and systems that will not be modified.
7. Expected route impact.
8. Risks and possible regressions.
9. A validation plan appropriate to the change type.
10. The current branch and working-tree state required by Section 8.

Codex must then wait for explicit user approval.

No file modification is allowed before the user approves the impact analysis. Approval to inspect or analyze is not approval to edit. Approval applies only to the files and operations listed in the approved impact analysis.

If the required scope changes after approval, stop and present a revised impact analysis. Wait for new approval before performing the additional work.

## 4. Change Scope

- Make only the approved changes.
- Do not introduce unrelated refactoring, cleanup, formatting, dependency updates, or documentation changes.
- Do not rename, move, replace, or delete files unless the exact operation was approved.
- Preserve unrelated user changes and untracked files.
- Do not reset, clean, overwrite, revert, stash, or discard unrelated work.
- Do not resolve unrelated merge conflicts or repository problems.
- Stop and report unexpected repository changes, including files changing after the impact analysis, unrecognized modifications, or a branch change.
- If an approved file contains unrelated user changes, preserve them. If safe separation is uncertain, stop and report the overlap.
- Keep changes inside `apps/portfolio-3d` unless the user separately approves exact repository-level files.

## 5. Protected Files and Configuration

Do not modify any of the following unless the user explicitly approves the exact file in the impact analysis:

- `apps/portfolio-3d/AGENTS.md`
- `apps/portfolio-3d/package.json`
- `apps/portfolio-3d/package-lock.json`
- `apps/portfolio-3d/next.config.mjs`
- `apps/portfolio-3d/vercel.json`
- `apps/portfolio-3d/.vercelignore`
- `apps/portfolio-3d/.gitignore`
- Any environment file.
- Any lockfile.
- Any deployment configuration.
- The repository-root `package.json` or its npm scripts.
- Any repository-root build, hosting, CI, or deployment configuration.

Do not add, remove, replace, or upgrade dependencies without explicit approval naming the affected manifest and lockfile.

Do not expose, print, copy, edit, or commit secrets. Environment files may be inspected only when the user explicitly requests it and applicable security rules allow it.

## 6. Asset Safety

- Do not delete or replace existing images, videos, 3D assets, audio, or generated frame sets without explicit approval naming the affected paths.
- Do not regenerate media sets unless the user explicitly requests the regeneration and approves the output paths.
- Before creating any binary asset larger than 5 MB, list its expected path, format, approximate size, source, and purpose in the impact analysis.
- Before creating more than 20 generated asset files in one task, list the expected output directory and approximate file count.
- Do not create near-duplicate assets when an existing asset can meet the requirement without degrading the approved result.
- Prefer optimized WebP or AVIF for raster images when browser compatibility permits.
- Prefer appropriately compressed video and audio formats for delivery assets.
- Confirm that asset filenames, casing, paths, dimensions, and file sizes are suitable for web delivery.
- Never commit secrets, local environment files, temporary renders, cache directories, or local-only media-processing outputs.
- Treat outputs produced by `scripts` as generated artifacts. Do not hand-edit generated frame sequences.

## 7. Git Governance

Codex must never automatically:

- Commit.
- Push.
- Merge.
- Rebase.
- Force-push.
- Create or delete branches.
- Create pull requests.
- Deploy to Vercel.
- Promote a preview deployment to production.

Required workflow:

A. Inspect and analyze the repository.

B. Present the mandatory impact analysis.

C. Wait for explicit approval to edit.

D. Make only the approved edits.

E. Run the approved validation.

F. Show `git status` and summarize the diff, including changed, created, deleted, renamed, and untracked files relevant to the task.

G. Wait for separate explicit approval to commit.

H. After committing, wait for separate explicit approval to push.

I. Wait for separate explicit approval before merging or initiating any production release action.

Approval to edit does not authorize a commit. Approval to commit does not authorize a push. Approval to push does not authorize a merge, pull request, deployment, promotion, or production release.

Do not work directly on `main` for changes involving application logic, routing, shared project data, dependencies, deployment configuration, or substantial design changes.

Small approved content, copy, or isolated styling corrections may remain on `main`, but commit and push still require separate approval.

Do not create or switch branches without explicit approval.

## 8. Cross-Device Synchronization

The repository may be used from Windows and macOS. Before editing:

1. Check the current branch.
2. Check the complete working-tree status, including untracked files.
3. Fetch remote references.
4. Determine whether the current local branch is behind, ahead of, synchronized with, or diverged from its upstream branch.
5. Include the result in the impact analysis.

Fetching remote references is a read-oriented synchronization check; it does not authorize pulling or changing working-tree files.

Do not pull, merge, rebase, stash, reset, clean, switch branches, or discard changes without explicit approval.

If the working tree is dirty, report the affected paths and determine whether they overlap with the approved task.

- If there is no overlap, Codex may continue after clearly stating that the unrelated changes will be preserved.
- If there is overlap or safe separation is uncertain, stop and wait for user direction.

If the local and upstream branches have diverged, stop and report the exact state. Do not choose a reconciliation strategy for the user.

Do not assume files created or changed on another computer have been synchronized.

If fetching cannot be completed, report the failure and do not claim that the repository is synchronized.

If fetching fails because remote access is unavailable, Codex may continue with read-only inspection or explicitly approved local edits only after warning that synchronization could not be confirmed.

Do not commit or push until the remote state has been verified.

## 9. Architecture

Maintain the existing Next.js App Router architecture:

- `app/page.jsx` is the portfolio homepage entry point.
- `app/projects/[slug]/page.jsx` resolves portfolio project routes.
- `app/data/projects.js` is the source of project metadata and slug mappings.
- Reusable portfolio page experiences live in `app/components`.
- Healthcare-specific portfolio components, data, logic, and CSS modules live in `app/components/healthcare`.
- Global styling lives in `app/globals.css`.
- Component-specific styles should remain colocated with their component or feature unless the approved change explicitly restructures styling.
- Static delivery assets belong in `public`.
- Asset-generation and optimization utilities belong in `scripts`.

Maintain App Router server/client boundaries. Browser APIs, animation libraries requiring the DOM, and interactive Three.js behavior must remain behind client-component boundaries.

Preserve the existing persistent WebGL architecture:

- Do not introduce a second persistent WebGL canvas.
- Do not duplicate render or animation loops.
- Do not create competing scroll-control systems.
- Preserve lightweight and mobile fallback behavior.
- Dispose of Three.js resources when their owning components unmount.

## 10. Product Page Governance

When adding, removing, renaming, or modifying a product page:

- Confirm the intended slug with the user or existing approved product metadata.
- Confirm that metadata, navigation, route rendering, calls to action, and related links remain synchronized.
- Verify that the slug is unique.
- Do not reuse an existing route for a different product.
- Do not remove, hide, redirect, or alter another product page unless that exact route is approved.
- Preserve AI Music & Video, Earth Observatory, and all unrelated project pages.
- Keep internal portfolio routes distinct from links to standalone applications or external demonstrations.
- Label standalone demo links clearly so users are not led to believe the standalone product runs inside the portfolio.
- Confirm that direct navigation and refresh work for every affected `/projects/<slug>` route.
- When renaming a slug, include the old route, new route, inbound links, metadata changes, and redirect decision in the impact analysis.

## 11. UI and Content Principles

- Maintain Apple/OpenAI-inspired clarity: concise, bold, visually focused, and evidence-led.
- Avoid excessive text, repeated claims, and sequences of disconnected one-line paragraphs.
- Prefer clear sections, concise paragraphs, diagrams, demonstrations, screenshots, and measurable evidence.
- Maintain consistent typography, spacing, hierarchy, and interaction patterns.
- Preserve mobile usability at narrow viewport widths.
- Respect `prefers-reduced-motion` for nonessential motion.
- Preserve keyboard access, semantic headings, visible focus states, useful alt text, and adequate color contrast.
- Avoid layout shifts by reserving dimensions for images, videos, canvases, and asynchronously loaded content.
- Do not sacrifice mobile loading, rendering, interaction, or thermal performance for desktop-only visual effects.
- New visual effects must degrade safely when WebGL, motion, bandwidth, or device capability is limited.

## 12. Engineering Quality

- Follow existing component, data, routing, and styling patterns.
- Prefer edits limited to the components and data directly responsible for the approved outcome.
- Do not rewrite an entire component when a smaller change can produce the approved result without increasing maintenance risk.
- Clean up timers, event listeners, animation frames, GSAP timelines, observers, subscriptions, and Three.js resources on unmount.
- Avoid a second persistent WebGL canvas.
- Avoid duplicated render, animation, resize, pointer, and scroll loops.
- Reuse existing components and assets when they meet the requirement.
- Do not leave dead code, unused imports, broken links, missing assets, console errors, or unreachable routes.
- Keep browser-only code behind client-component boundaries.
- Do not suppress errors solely to make validation pass.
- Do not weaken TypeScript, linting, build, accessibility, or runtime checks without explicit approval.

## 13. Validation

Validation must match the approved change type.

### Code or component changes

- Run `npm run portfolio3d:build` from the repository root.
- Test the homepage.
- Test every affected project route.
- Check a desktop viewport and a narrow mobile viewport.
- Check the browser console for new errors or warnings caused by the change.
- Test reduced-motion behavior when animation or motion changed.
- Exercise affected keyboard interactions.
- Confirm that unrelated project routes remain available when shared routing, navigation, or project data changed.

### Content or metadata changes

- Verify affected routes, navigation, slugs, internal links, external demo links, and rendered content.
- Run `npm run portfolio3d:build` when the change affects JavaScript, JSX, TypeScript, TSX, imported data, route generation, metadata generation, or compilation.
- Confirm that unrelated product entries remain present when shared project data changed.

### Asset-only changes

- Confirm filenames, casing, import or URL paths, successful loading, dimensions, format, and file size.
- Check affected desktop and mobile layouts.
- Do not regenerate or optimize unrelated assets.
- Confirm that removed or replaced assets have no remaining references.

### Documentation-only changes

- Confirm that no application code, asset, dependency, lockfile, or configuration file changed.
- Review the documentation diff for scope and accuracy.
- A full application build is not mandatory unless documentation contributes to generated output or changes executable examples used by automation.

If validation cannot be completed, state exactly:

- Which checks were not run.
- Why they were not run.
- What risk remains.
- What the user should verify before commit, merge, or release.

Do not describe validation as successful when required checks failed or were not run.

## 14. Deployment

- Production is deployed by Vercel from the GitHub `main` branch.
- The Vercel Root Directory must remain `apps/portfolio-3d`.
- Keep the application configured as Next.js.
- Do not set `outputDirectory` to `dist` or `out`.
- Do not manually run `vercel deploy`.
- Do not change Vercel project settings, framework settings, domains, environment variables, build settings, or deployment configuration without exact approval.
- Codex may inspect an existing Vercel preview for validation when the user has approved the related edits.
- Codex must not promote, redeploy, modify settings, or trigger production actions without separate explicit approval.
- Merging requires separate explicit approval.
- Production release or promotion requires separate explicit approval.
- Do not promote an untested preview or deployment.

## 15. Documentation

- Do not automatically update `README.md` or `DEPLOYMENT.md` for ordinary product-page, content, styling, or asset changes.
- Update documentation only when the approved task changes setup, architecture, scripts, contributor workflow, validation procedures, or deployment processes.
- Name each proposed documentation file in the impact analysis.
- Keep temporary investigation notes, command output, local paths, and one-off troubleshooting records out of permanent documentation unless the user explicitly approves their lasting inclusion.

## 16. Final Reporting

After approved edits, provide a final report containing:

- Files changed.
- Files created.
- Files deleted.
- Files renamed or moved.
- A concise implementation summary.
- Validation performed and results.
- Validation not performed and the remaining risk.
- Known limitations.
- Current branch.
- Git status.
- A summary of the relevant git diff.
- Any unexpected repository state encountered.
- Confirmation that no commit occurred unless separately approved.
- Confirmation that no push occurred unless separately approved.
- Confirmation that no merge, pull request, branch operation, rebase, force-push, Vercel deployment, promotion, or production release occurred unless each action was separately approved.
