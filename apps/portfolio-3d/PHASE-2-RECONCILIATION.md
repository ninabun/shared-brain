# Phase 2 Production Reconciliation

Date: 2026-07-16 (Asia/Shanghai)

## Git states compared

- `origin/main`: `26b40b6202236c195a5ad2fa125ee7905d58b395`
- `origin/codex/antenatal-hero-only`: `dbcc9d8163a5e85a93dc5d48a6367269bd8d7a2e`
- Reported production commit: `dbcc9d8163a5e85a93dc5d48a6367269bd8d7a2e`
- Merge base: `d530889d6c4c0299731abd5725eb7b91d0fa0229`

The reported production commit is still the exact tip of `origin/codex/antenatal-hero-only` after a fresh fetch.

## Commit-level comparison

Production has 17 portfolio commits after the merge base, from `7e068fb` through `dbcc9d8`. They add and refine the production homepage, product navigation, demos, responsive layouts, healthcare presentation, Earth Observatory story, WhatsApp contact action, and accordion spacing.

Main has six commits after the merge base: `f85079c`, `9b66274`, `f914cc5`, `05f16a3`, `43a1fb3`, and `26b40b6`. These add and refine the separate `apps/medication-verification` application. None changes `apps/portfolio-3d`.

## File-level comparison

Production-only portfolio changes affect 18 paths:

- Modified: `AIAudioProjectPage.jsx`, `EarthObservatoryPage.jsx`, `HealthcareIntelligencePage.jsx`, `HeroMotionBar.jsx`, `LabExperience.jsx`, `ProjectPageTemplate.jsx`, `RosterAutomationPage.jsx`, `SmartReceptionPage.jsx`, `healthcare/AntenatalCareCompanionPage.tsx`, `healthcare/MedicationStaffDemo.tsx`, `healthcare/MedicationVerification.module.css`, `healthcare/MedicationVerificationPage.tsx`, `healthcare/Shared.tsx`, `data/lab.json`, `data/projects.js`, and `projects/[slug]/page.jsx`.
- Added: `TechnologyExplainer.jsx` and `healthcare/MedicationClinicalHeader.tsx`.

There are no main-only changes inside `apps/portfolio-3d` after the merge base. Main-only changes are the 34 files belonging to the separate `apps/medication-verification` application. Those unrelated files remain untouched on this branch.

## Reconciliation decision

Use the production branch version of the 18 portfolio paths as the visual and functional baseline. Do not merge either monorepo branch wholesale. Main has no newer portfolio-path edit to reconcile, so this does not overwrite a newer main portfolio change. The separate medication application remains exactly as present on main.

## Known behavior conflicts and repairs

- Main intentionally clears four custom routes. Production already restores `roster-automation` and `smart-reception`; Phase 2 will retain those production components and restore the remaining `projection-mapping` and `immersive-medical-ux` routes through their existing shared `ProjectPageTemplate` content.
- Both antenatal slugs currently dispatch to the same component. `/projects/antenatal-companion` is the homepage/production-navigation slug and will be canonical. `/projects/antenatal-care-companion` will become a compatibility redirect.
- Seven audio paths point to files absent from the repository. No substitute will be invented; unavailable playback controls will be gracefully disabled while preserving the visual case study.

## Deployment-content caveat

Git proves that the named production branch tip and reported commit are identical. The Phase 1 deployment metadata identifies the deployment as a CLI upload associated with that branch and commit. A CLI upload can technically include uncommitted local files, and GitHub alone cannot prove the uploaded bytes were clean. No evidence of extra production-only content has been found; this limitation is retained as a manual preview-comparison risk.
