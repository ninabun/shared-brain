# Repository Audit — `apps/portfolio-3d`

Audit date: 2026-07-16 (Asia/Shanghai)  
Scope: Phase 1, read-only except for this report. No files were deleted, moved, renamed, or otherwise changed; no imports, routes, branches, Vercel settings, dependencies, or deployments were changed.

## Repository Identity

- Repository: `https://github.com/ninabun/shared-brain.git`.
- Local root: `C:\Users\ninad\Documents\Shared brain`.
- Portfolio app: `apps/portfolio-3d` (`wing-yee-ai-lab-3d`, private package, version `0.1.0`).
- Production URL: `https://portfolio-3d-neon-eight.vercel.app/`.
- Vercel project: `portfolio-3d`, ID `prj_fnvvCdIQ0hndbdC0tEuxkXxlqjIc`, team `team_JcKfgaQDLOuLpXLmD1uBTiOi`.
- Current application stack: Next.js 15 App Router, React 19, TypeScript/JavaScript, Tailwind CSS 4, Framer Motion, Three.js/React Three Fiber/Drei, GSAP.

## Monorepo Structure

This is an npm repository with a root `package-lock.json` and app-level npm lock files. It is a **multi-package repository but not an npm workspace**: root `package.json` has no `workspaces`, and there is no `pnpm-workspace.yaml`, Yarn lock, or Turborepo configuration. Root scripts proxy to the portfolio with `npm --prefix apps/portfolio-3d ...`.

Related applications are the root Vite/Firebase/Electron application, `apps/medication-verification`, Firebase `functions`, iOS, and a worker. The portfolio does not import their source. The separately merged medication application is not a package dependency of the portfolio; its relevant UI was copied/implemented within the portfolio's own healthcare components.

The root `vercel.json` configures the unrelated root Vite app (`npm run build`, `dist`, SPA rewrite). It must not be used to deploy the Next.js portfolio.

### Repository root tree, depth 2

Excluded: `node_modules`, `.next`, `.git`.

```text
Shared brain
├── .agents/
├── .codex/
├── .config/configstore/
├── .electron-cache/<cache>/
├── .firebase/hosting.ZGlzdA.cache
├── .github/workflows/
├── .npm-cache/{_cacache,_logs,_npx}/
├── .vercel/{project.json,README.txt}
├── apps/{medication-verification,portfolio-3d}/
├── desktop/{main.cjs,README.md}
├── dist/{assets,index.html}
├── docs/{assets,3d-portfolio-production-architecture.md,index.html}
├── functions/{index.js,package.json,package-lock.json}
├── ios/{SharedBrain,README.md}
├── src/{App.jsx,firebase.js,main.jsx,styles.css,utils.js}
├── workers/title-suggestor/
├── .env.local
├── .firebaserc
├── .gitignore
├── .vercelignore
├── agent-access.md
├── desktop-ios-app-plan.md
├── firebase information.md
├── firebase.json
├── firestore.rules
├── index.html
├── MULTIPLATFORM_RUNBOOK.md
├── my idea.md
├── package.json
├── package-lock.json
├── PLATFORM_APPS.md
├── README.md
├── serve-portfolio3d.cmd
├── start-portfolio3d.cmd
├── start-portfolio3d.ps1
├── storage.rules
└── vercel.json
```

### `apps/portfolio-3d` tree, depth 4

Repeated numbered frame files are represented as inclusive ranges; every local range is stated. Excluded: `node_modules`, `.next`, `.git`.

```text
portfolio-3d
├── .tmp-water-frames-20260707224222/ezgif-frame-001.jpg … ezgif-frame-291.jpg
├── .vercel/{project.json,README.txt}
├── app
│   ├── components
│   │   ├── healthcare
│   │   │   ├── AntenatalCareCompanionPage.tsx
│   │   │   ├── data.ts
│   │   │   ├── Healthcare.module.css
│   │   │   ├── HealthcareApplicationPage.tsx
│   │   │   ├── medication-cases.ts
│   │   │   ├── medication-engine.ts
│   │   │   ├── MedicationIntegrationArchitecture.tsx
│   │   │   ├── MedicationProductStory3D.tsx
│   │   │   ├── MedicationStaffDemo.tsx
│   │   │   ├── MedicationVerification.module.css
│   │   │   ├── MedicationVerificationPage.tsx
│   │   │   └── Shared.tsx
│   │   ├── AIAudioProjectPage.jsx
│   │   ├── EarthObservatoryPage.jsx
│   │   ├── HealthcareIntelligencePage.jsx
│   │   ├── HeroBackground.tsx
│   │   ├── HeroMotionBar.jsx
│   │   ├── LabExperience.jsx
│   │   ├── ProjectPageTemplate.jsx
│   │   ├── ProjectShowcase3D.tsx
│   │   ├── RosterAutomationPage.jsx
│   │   └── SmartReceptionPage.jsx
│   ├── data/{lab.json,projects.js}
│   ├── projects
│   │   ├── [slug]/page.jsx
│   │   └── healthcare-workflow-intelligence/[application]/ (empty)
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── out/ (generated static export; contains `_next`, copied assets, route HTML/TXT, `404.html`, `index.html`, `index.txt`)
├── public
│   ├── animations/healthcare-crystal-loop
│   │   ├── frames/frame-001.png … frame-300.png
│   │   ├── webp/frame-001.webp … frame-300.webp
│   │   ├── manifest.json
│   │   └── webp-manifest.json
│   ├── images
│   │   ├── crystal-animation/ezgif-frame-001.jpg … ezgif-frame-152.jpg (ignored)
│   │   ├── hero-water-sequence/frame-001.jpg … frame-030.jpg
│   │   └── hero-ai-healthcare.png
│   └── logo/ai-lab.png
├── scripts/{generate-crystal-loop.mjs,optimize-crystal-web-frames.mjs}
├── .gitignore
├── .tmp-water-current.txt
├── .vercelignore
├── next.config.mjs
├── next-dev.err.log
├── next-dev.log
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── serve-static.mjs
├── static-detached.err.log
├── static-detached.log
├── static-server.err.log
├── static-server.log
└── tsconfig.json
```

## Current Git Status

Before creating this report: branch `main`, tracking `origin/main`, clean working tree. `main` and `origin/main` both pointed to `26b40b6`. After this audit the only intended change is the untracked report itself.

## Branch Comparison

| Branch | Head | Relationship / portfolio result |
|---|---|---|
| `main` | `26b40b6` | Current integration branch. Four commits ahead of `codex/add-medication-verification`; contains all of that branch plus later medication workflow fixes. |
| `codex/add-medication-verification` | `9b66274` | Merge base with `main` is its own head; 0 commits ahead and 4 behind main. No portfolio changes missing from main. |
| `codex/antenatal-hero-only` | `dbcc9d8` | Diverged at `d530889`; main is 6 commits ahead on its side and this branch is 17 commits ahead on its side. It has 18 portfolio path changes relative to main: 15 modified files and 2 added components plus route changes. |

`codex/antenatal-hero-only` contains portfolio work missing from `main`, including homepage/product polish, WhatsApp contact CTA, responsive refinements, `TechnologyExplainer.jsx`, and `MedicationClinicalHeader.tsx`. `codex/add-medication-verification` does not contain portfolio work absent from `main`.

The branch closest to production is not merely an estimate: the active production deployment metadata reports branch `codex/antenatal-hero-only`, commit `dbcc9d8163a5e85a93dc5d48a6367269bd8d7a2e`, message `Refine homepage accordion spacing`. Therefore production differs materially from `main`.

## Vercel Connection

- Exact repository app directory used for the portfolio deployment: **`apps/portfolio-3d`**. Evidence: its ignored `.vercel/project.json` matches the supplied project ID; the production deployment is a CLI deployment of the app-local Next.js project. For that CLI upload, Vercel's project root is `.` relative to the upload, equivalent to `apps/portfolio-3d` in this repository.
- The repository-root `.vercel/project.json` points to a different project, `wing-yee-ai-lab` (`prj_Ag6bCxuAhKAuFYAOBVT2E4ckbUVx`). Running a portfolio deploy from the repository root would target/configure the wrong project and pick up the root Vite `vercel.json`.
- Production deployment: `dpl_3RmRdqeAoRUGCjPS8PnMHUxF88s6`, `READY`, production target, CLI source, created from `dbcc9d8` on `codex/antenatal-hero-only`.
- Project framework is Next.js; Vercel project Node runtime is `24.x`. `next.config.mjs` sets `output: "export"`.
- No deployment or setting change was made.

## Portfolio Dependency Boundary

The **runtime/build application is self-contained inside `apps/portfolio-3d`**: all relative imports remain under `app`, all runtime public assets are under its `public`, it has its own `package.json` and lock file, and `next.config.mjs` deliberately sets `outputFileTracingRoot` to the app directory.

It is not fully operationally self-contained in documentation/convenience terms:

- root scripts provide `portfolio3d:*` aliases, but they are optional; install/build/run work from the app directory using its own npm files;
- root CMD/PowerShell launchers contain local workspace paths and are optional developer conveniences;
- Vercel linkage lives in ignored `apps/portfolio-3d/.vercel/project.json`, so a clean clone must be linked or configured independently;
- production lineage currently depends on a non-main branch;
- `README.md` is stale (references removed architecture such as `PersistentCanvas`, `SceneManager`, `lib/content.js`) and does not document Vercel.

No source code or required asset outside `apps/portfolio-3d` is imported. No portfolio asset outside that directory was found.

## Route Inventory

Router: **App Router only**. There is an `app/` directory and no `pages/` directory.

| URL | Source | Result on `main` |
|---|---|---|
| `/` | `app/page.jsx` → `components/LabExperience.jsx` | Homepage |
| `/projects/[slug]` | `app/projects/[slug]/page.jsx` | Single dynamic product route, statically exported for the slugs below |
| `/projects/projection-mapping` | same dynamic source | Deliberately blank page (`clearedProjectSlugs`) |
| `/projects/earth-observatory` | same → `EarthObservatoryPage.jsx` | Active custom product page |
| `/projects/ai-music-video` | same → `AIAudioProjectPage.jsx` | Active custom product page; seven referenced audio files are absent |
| `/projects/immersive-medical-ux` | same dynamic source | Deliberately blank page |
| `/projects/roster-automation` | same → `RosterAutomationPage.jsx` | Active custom product page |
| `/projects/smart-reception` | same → `SmartReceptionPage.jsx` | Active custom product page |
| `/projects/medication-verification` | same → `HealthcareApplicationPage.tsx` | Active healthcare product page |
| `/projects/antenatal-companion` | same → `HealthcareApplicationPage.tsx` | Active alias/product route |
| `/projects/antenatal-care-companion` | same → `HealthcareApplicationPage.tsx` | Duplicate canonical-content alias, explicitly added to static params |
| `/projects/healthcare-ai-agents` | same → `HealthcareIntelligencePage.jsx` | Active generic intelligence page |
| `/projects/workflow-orchestration` | same → `HealthcareIntelligencePage.jsx` | Active generic intelligence page |
| `/projects/system-integration` | same → `HealthcareIntelligencePage.jsx` | Active generic intelligence page |

`app/projects/healthcare-workflow-intelligence/[application]/` is an empty directory and creates **no route**. `generateStaticParams()` includes all 11 `projects.js` slugs plus the extra antenatal alias (12 static product URLs).

## Product Inventory

Homepage content in `lab.json` names 13 cards: AI Antenatal Companion, Smart Reception, AI Music & Video, Projection Mapping, Earth Observatory, Immersive Medical UX, Interactive Education, Future Yoga Room Experience, Roster Automation, Medication Verification, Healthcare AI Agents, Workflow Orchestration, and System Integration.

Reachability behavior is controlled by `getProjectSlug()`. The first 11 matching/aliased items resolve to product slugs; **Interactive Education** and **Future Yoga Room Experience** have no `projects.js` entry or alias and become `#contact`, so their homepage cards are intentionally not product links.

Obsolete/incomplete product versions on `main`:

- `projection-mapping` and `immersive-medical-ux` contain full content records but their routes are explicitly cleared to blank pages.
- `AntenatalCareCompanionPage.tsx` exists and is imported by `HealthcareApplicationPage.tsx`, but main's branch logic returns the generic `HealthcareApplicationPage` implementation for the antenatal slug; inspect before deciding whether it is obsolete.
- `MedicationStaffDemo.tsx` and lazy `MedicationProductStory3D.tsx` exist, but reachability depends on parent component conditions/lazy rendering; retain pending interaction review.
- `HeroBackground.tsx` and `ProjectShowcase3D.tsx` have no inbound application import on `main`; they are orphan component candidates.

## Homepage Dependency Map

Exact source chain:

```text
app/layout.jsx
├── app/globals.css
└── app/page.jsx
    └── app/components/LabExperience.jsx
        ├── app/data/lab.json
        ├── app/data/projects.js (getProjectSlug)
        ├── framer-motion
        ├── lucide-react
        ├── react
        ├── public/logo/ai-lab.png
        └── public/animations/healthcare-crystal-loop/webp/frame-001.webp … frame-300.webp
```

The homepage does not import `HeroBackground.tsx`, `ProjectShowcase3D.tsx`, the PNG crystal frames, either manifest, the water sequence, or the ignored crystal JPG sequence.

## Product Component Dependency Map

All product routes also depend on `app/layout.jsx` and `app/globals.css`; the route dispatcher depends on `app/data/projects.js`, `healthcare/data.ts`, and `next/navigation`.

| Products | Local components/data/styles/assets | Package dependencies |
|---|---|---|
| AI Music & Video | `AIAudioProjectPage.jsx`; missing `/public/audio/*.mp3` paths (7) | `framer-motion`, `lucide-react` |
| Earth Observatory | `EarthObservatoryPage.jsx`, `HeroMotionBar.jsx` | `framer-motion`, `lucide-react` |
| Roster Automation | `RosterAutomationPage.jsx` | `framer-motion`, `lucide-react` |
| Smart Reception | `SmartReceptionPage.jsx`, `HeroMotionBar.jsx` | `framer-motion`, `lucide-react` |
| Medication Verification | `HealthcareApplicationPage.tsx`, `healthcare/data.ts`, `Shared.tsx`, `Healthcare.module.css`, `MedicationVerificationPage.tsx`, `medication-cases.ts`, `medication-engine.ts`, `MedicationVerification.module.css`, `MedicationIntegrationArchitecture.tsx`; lazy product story may add `MedicationProductStory3D.tsx` | React, `lucide-react`; lazy 3D story adds `@react-three/fiber`, `@react-three/drei`, `three`, `gsap` |
| Antenatal Companion (both URLs) | `HealthcareApplicationPage.tsx`, `AntenatalCareCompanionPage.tsx`, `healthcare/data.ts`, `Shared.tsx`, `Healthcare.module.css` | React, `lucide-react` |
| Healthcare AI Agents, Workflow Orchestration, System Integration | `HealthcareIntelligencePage.jsx`, content from `app/data/projects.js` | `framer-motion`, `lucide-react` |
| Projection Mapping, Immersive Medical UX | dispatcher and `projects.js`; output is an empty `<main>` | none beyond React/Next runtime |
| Generic fallback (currently no remaining generated slug) | `ProjectPageTemplate.jsx`, theme/content from `projects.js` | `framer-motion`, `lucide-react` |

`MedicationStaffDemo.tsx` imports `MedicationVerificationPage.tsx` and its CSS but is not imported by the main dispatcher. `MedicationProductStory3D.tsx` is lazy-imported from `MedicationVerificationPage.tsx`.

## Navigation Audit

- Homepage project-card routing derives from titles, not stable slug fields in `lab.json`; title drift silently changes links to `#contact`.
- The two content-only homepage products route to `#contact`, not missing URLs: Interactive Education and Future Yoga Room Experience.
- Two homepage-linked product slugs render blank pages: `/projects/projection-mapping` and `/projects/immersive-medical-ux`. These are obsolete/broken user journeys even though the paths technically exist.
- `/projects/antenatal-companion` and `/projects/antenatal-care-companion` duplicate the same content. Navigation primarily uses the former; internal healthcare data uses the latter. Consolidation requires a deliberate canonical URL and redirect in Phase 2.
- AI Music & Video renders audio players pointing to seven missing public MP3 assets, producing 404 media requests.
- Header fragment links `/#platform`, `/#about`, and `/#contact` correspond to homepage section navigation. Product internal anchors found in custom pages appear locally defined.
- External destinations are hard-coded: Earth Observatory Vercel site, rostering GitHub Pages demo, n8n rostering workflow extension. They should be link-checked periodically; no code ownership guarantee exists here.

## Asset Inventory

Local `public` total at audit time: approximately **233.85 MB**, 786 files: 302 PNG (207.34 MB), 300 WebP (20.78 MB), 182 JPG (5.73 MB), 2 JSON. Git tracks 634 public files; the 152 ignored crystal JPGs account for the difference.

Runtime-used assets:

- `public/logo/ai-lab.png` (1.46 MB), homepage.
- `public/animations/healthcare-crystal-loop/webp/frame-001.webp` through `frame-300.webp` (20.78 MB aggregate), homepage animation.
- `public/images/hero-ai-healthcare.png` (1.16 MB), referenced only by orphan `HeroBackground.tsx`; not in the active homepage dependency chain.

Present but no active source reference found:

- 300 PNG crystal frames (about 207 MB), their manifest, and WebP manifest. PNGs are generator/source output duplicates of the deployed WebP animation and dominate repository/deployment size.
- `public/images/hero-water-sequence/frame-001.jpg` … `frame-030.jpg`.
- ignored `public/images/crystal-animation/ezgif-frame-001.jpg` … `152.jpg`.
- ignored `.tmp-water-frames-20260707224222` (291 JPGs) and `.tmp-water-current.txt`.

There are no video, audio, or 3D model files in the portfolio tree. Risk comes from image sequences rather than individual giant files: the largest individual file is 1.46 MB; PNG sequence files are about 0.7 MB each. GitHub risk is repository weight/history and clone time; Vercel risk is upload/build bandwidth, cache churn, and static output size. No single file approaches GitHub's 100 MB hard limit.

No asset used by the portfolio was found outside `apps/portfolio-3d`. No untracked, non-ignored portfolio file existed before this report. Local-only assets/logs/temp/output exist but are ignored.

## Duplicate Files

- Duplicate visual representations: 300 PNG frames and 300 optimized WebP frames depict the same crystal loop; only WebP is actively loaded.
- Two additional local source sequences (`crystal-animation` 152 JPGs and `.tmp-water-frames...` 291 JPGs) look like obsolete/intermediate animation versions and are ignored.
- `out/` duplicates compiled application code and copied public assets; it is generated and ignored.
- Antenatal duplicate routes: `antenatal-companion` and `antenatal-care-companion`.
- Product content is duplicated between `lab.json`, `projects.js`, and `healthcare/data.ts`, with aliases bridging title differences (`Roster Automation`, `Medication Verification`). This creates drift risk.
- Repeated header/card/section UI exists in custom product components and `healthcare/Shared.tsx`; these are semantic duplicates but not safe mechanical deletions.
- Orphan/obsolete candidates: empty `app/projects/healthcare-workflow-intelligence/[application]/`, `HeroBackground.tsx`, `ProjectShowcase3D.tsx`, blank-route content, stale README architecture.

## Environment Variables

No required build-time or runtime environment variable is referenced by the Next.js application source.

The optional static server reads names only: `HOST`, `PORT`, `AUTO_OPEN`. Vercel CLI/CI linking may use `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`, but those are deployment credentials/configuration, not application runtime requirements. No values are included here.

There is no app-local `.env.example`. Root `.env.local` is ignored and belongs to the broader repository; it is not imported by the portfolio and was not inspected for values.

## External Dependencies

- App-local production packages are declared completely in `apps/portfolio-3d/package.json`; app-local `package-lock.json` supports reproducible npm install.
- Root scripts are not required. From the app directory, `npm install`, `npm run dev`, and `npm run build` are sufficient. Root aliases and launchers are convenience only.
- External product integrations are presentation links rather than imported packages/APIs: Earth Observatory, Rostering Automation, n8n workflow extension, and (on production branch) WhatsApp contact.
- The app has its own `package.json`, lock file, README, and `.gitignore`. It lacks an environment example and dedicated deployment documentation. Its README is partially obsolete.
- It has an ignored app-local Vercel link, but no tracked app-level `vercel.json` is needed for the current Next.js export.

## Safe to Delete

Nothing should be deleted during Phase 1. Subject to a Phase 2 verification/build and explicit approval, these are high-confidence generated/local-only cleanup candidates:

- `apps/portfolio-3d/out/` (generated static export).
- app-local `*.log` files.
- `.tmp-water-current.txt` and `.tmp-water-frames-20260707224222/` after confirming no source-generation need.
- empty `app/projects/healthcare-workflow-intelligence/[application]/` directories (Git does not track empty directories).

The report intentionally does **not** classify tracked source or public assets as immediately safe to delete without Phase 2 visual verification.

## Requires Manual Review

- 300 tracked PNG crystal frames and `manifest.json`: apparently unused at runtime but large and potentially retained as generation masters.
- ignored `public/images/crystal-animation/` and tracked water sequence: confirm artistic/source provenance.
- `HeroBackground.tsx`, `ProjectShowcase3D.tsx`, `AntenatalCareCompanionPage.tsx`, `MedicationStaffDemo.tsx`, `ProjectPageTemplate.jsx`: orphan/conditional/fallback status needs product intent and branch reconciliation.
- blank product routes and their rich content: decide publish, remove from navigation, or retire with redirects.
- canonical antenatal route.
- `codex/antenatal-hero-only` versus main: production contains 17 branch-only portfolio commits, while main contains later medication changes. Reconcile deliberately; do not merge blindly.
- seven absent audio assets: either add licensed/approved files or remove/disable players.
- stale `README.md` and absent deployment/environment docs.

## Must Keep

- `app/layout.jsx`, `app/globals.css`, `app/page.jsx`, `LabExperience.jsx`, `app/data/lab.json`, `app/data/projects.js`.
- `app/projects/[slug]/page.jsx` and all components/data/styles used by active product pages listed in the dependency map.
- `public/logo/ai-lab.png`, the 300 WebP crystal frames, and any active product assets.
- app-local `package.json`, `package-lock.json`, `next.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, and `next-env.d.ts`.
- `.gitignore`; retain `.vercel/project.json` locally but do not commit it.
- branch history until production/main reconciliation is completed.

## Recommended Target Structure

Target only; do not move files yet:

```text
apps/portfolio-3d/
├── app/
│   ├── (site)/page.jsx
│   ├── projects/[slug]/page.jsx
│   ├── components/
│   │   ├── layout/        # shared header/nav/section primitives
│   │   ├── home/
│   │   ├── projects/      # one folder per genuinely custom case study
│   │   └── healthcare/
│   ├── data/
│   │   └── projects.*     # one canonical typed product registry
│   └── globals.css
├── public/
│   ├── animations/        # deployed optimized formats only
│   ├── audio/
│   ├── images/
│   └── logo/
├── scripts/
├── docs/{DEPLOYMENT.md,ASSETS.md}
├── .env.example
├── README.md
├── package.json
├── package-lock.json
└── next.config.mjs
```

Use a single canonical product registry containing slug, navigation visibility, status (`live`, `coming-soon`, `retired`), component key, metadata, external demo, and content. Generate navigation/static params from it. Use redirects for aliases, never two independent content identities.

## Monorepo vs Standalone Recommendation

**Recommendation: extract the portfolio into a standalone repository after branch reconciliation and asset cleanup.** It is already technically self-contained, has its own lock file, and has independent product/deployment cadence. A standalone repository would eliminate wrong-root Vercel risk, unrelated root Vite/Firebase settings, huge unrelated clone/build context, and ambiguity about which app/branch is production.

Extraction risks:

- preserving Git history and production commit provenance;
- relinking Vercel/Git integration without changing the production domain prematurely;
- migrating ignored project linkage and documenting environment/deploy setup;
- deciding whether root convenience scripts/docs remain or move;
- ensuring all tracked runtime assets and licenses move;
- reconciling production branch changes with main first;
- avoiding broken external links and redirects.

Keeping it in the monorepo risks:

- accidental deployment from root to the wrong Vercel project/framework;
- two lockfile/dependency worlds without formal workspace tooling;
- unrelated app changes triggering noisy history and potentially deployments;
- production branch drift hidden among other product commits;
- repository bloat from portfolio animation assets affecting every collaborator;
- unclear ownership and cleanup boundaries.

If shared packages are planned soon, formalizing npm workspaces and keeping the app may become reasonable. Today there are no shared code imports, so the monorepo provides little technical benefit.

## Risks Before Reorganization

1. Production is deployed from `codex/antenatal-hero-only`, not `main`; reorganizing main now could regress the visible site.
2. The production branch and main each contain unique desired work. A content-aware reconciliation is required.
3. Large duplicated animation sequences make moves expensive and increase accidental loss risk.
4. Several routes are blank or duplicated; moving them before defining canonical behavior can preserve or amplify broken navigation.
5. Missing audio means a clean clone cannot provide the advertised audio experience.
6. Ignored artistic source files may be locally valuable even though they are not deployment requirements.
7. Root and app Vercel links point to different projects; running commands from the wrong directory is hazardous.
8. No app deployment runbook or environment example exists.
9. README architecture claims do not match the current source tree.
10. Static export means route/redirect decisions need validation against Vercel behavior.

## Proposed Phase 2 Plan

1. Freeze and tag the current production commit; record screenshots and a route/link baseline.
2. Reconcile `dbcc9d8` production changes with main's later medication commits on a dedicated `codex/` branch, resolving files intentionally rather than bulk merging.
3. Establish one canonical product registry and decide status/canonical URL for every product, especially antenatal, projection mapping, and immersive medical UX.
4. Add route/link/media verification and a clean-clone build check.
5. Confirm asset provenance, then remove only approved generated/duplicate sequences; retain optimized WebP runtime frames.
6. Remove confirmed orphan components and generated local files.
7. Update README; add `.env.example` (documenting no app vars unless that changes), deployment runbook, Vercel project/root warning, and asset policy.
8. Decide extraction timing; if extracting, use history-preserving filtering and attach the existing Vercel project only after preview verification.
9. Deploy a preview, compare against the recorded production baseline, then request explicit approval for production changes.

Stop here pending review. No Phase 2 action has begun.

## Required command outputs

These are the exact outputs captured **before this report was created**.

### `git status`

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

### `git remote -v`

```text
origin  https://github.com/ninabun/shared-brain.git (fetch)
origin  https://github.com/ninabun/shared-brain.git (push)
```

### `git branch --show-current`

```text
main
```

### `git branch -a`

```text
  codex/add-medication-verification
  codex/antenatal-hero-only
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/codex/add-medication-verification
  remotes/origin/codex/antenatal-hero-only
  remotes/origin/main
```

### `git log --oneline -15`

```text
26b40b6 Move resolved doctor exceptions to completed
43a1fb3 Preserve medication during amendment review
05f16a3 Clarify review frequency differences
f914cc5 Remove nurse alert metadata strip
9b66274 Merge commit 'f85079c3cd6470be12f45b7a49121eb6999fde10' as 'apps/medication-verification'
f85079c Squashed 'apps/medication-verification/' content from commit d943e7c
d530889 Update homepage project links
42f9ed9 Restore AI Music and Video homepage card
ebd6289 Restructure healthcare intelligence portfolio
0d137ef Update portfolio project hero navigation
abb0fa2 Add project detail pages and AI audio case study
4c3894b Add Earth Observatory patient experience case study
60248b4 Render hero crystal animation on canvas
b30d425 Keep hero crystal animation running
60ce17b Optimize crystal hero animation for deployment
```
