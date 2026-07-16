# Portfolio Deployment Handover

Verified 2026-07-16. No Vercel setting or deployment was changed.

- Production URL: `https://portfolio-3d-neon-eight.vercel.app/`
- Owning Vercel project: `portfolio-3d` (`prj_fnvvCdIQ0hndbdC0tEuxkXxlqjIc`), linked by `apps/portfolio-3d/.vercel/project.json`.
- Correct repository working/root directory for portfolio Vercel commands: `apps/portfolio-3d`.
- Repository-root `.vercel/project.json` instead links `wing-yee-ai-lab` (`prj_Ag6bCxuAhKAuFYAOBVT2E4ckbUVx`), an unrelated root application.

> **Deployment warning:** Never run portfolio Vercel link, build, or deploy commands from the repository root. The root targets a different Vercel project and also contains the unrelated root Vite configuration. Enter `apps/portfolio-3d` first and verify the local project name is `portfolio-3d`.
