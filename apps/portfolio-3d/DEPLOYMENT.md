# Portfolio Deployment

## Production Setup

- Repository: `ninabun/shared-brain`
- Production branch: `main`
- Portfolio application: `apps/portfolio-3d`
- Vercel project: `portfolio-3d`
- Vercel Root Directory: `apps/portfolio-3d`
- Framework: Next.js
- Production deployment source: GitHub `main` branch
- Current stable production commit: `582ec0ef86505db493702d18f4a55f97e6cec5a3`

## Required Workflow

1. Open the Shared brain repository in Codex.
2. Pull and synchronize `main` before starting work.
3. Create a new feature branch for every meaningful website change.
4. Make changes only inside the relevant application folder.
5. Run the local production build.
6. Commit and push the feature branch.
7. Review the Vercel preview deployment.
8. Test the homepage and project routes.
9. Merge into `main` only after the preview is confirmed.
10. Vercel deploys `main` to Production automatically.

## Do Not Do

- Do not run `vercel deploy` manually.
- Do not deploy from random Codex workspaces.
- Do not edit the Vercel Root Directory.
- Do not change the framework from Next.js.
- Do not set `outputDirectory` to `dist` or `out`.
- Do not develop directly on `main`.
- Do not create multiple copies of the portfolio repository.
- Do not promote an untested deployment.

## Troubleshooting

### Homepage works but project routes return 404

Verify that `apps/portfolio-3d/vercel.json` contains:

```json
{
  "framework": "nextjs"
}
```

### Deployment builds the wrong application

Verify that the Vercel Root Directory is `apps/portfolio-3d`.
