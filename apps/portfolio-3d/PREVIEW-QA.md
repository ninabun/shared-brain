# Phase 3A — Vercel Preview QA

## Deployment

- Preview URL: https://portfolio-3d-poiqi3xvt-earth-observatory.vercel.app
- Source branch: `chore/portfolio-production-reconciliation`
- Source commit: `99cd0e8924945e1f78870a7ff6581a373e954e6e`
- Deployment ID: `dpl_6bVJZfGprkkXeUHdoJKyQLGPr7K1`
- Vercel project: `portfolio-3d` (`prj_fnvvCdIQ0hndbdC0tEuxkXxlqjIc`)
- Deployment target: Preview
- Deployment status: `READY`
- Preview access: Vercel Authentication protected

Vercel deployment metadata confirms the source branch, full source commit, project ID, Preview target, and `READY` state. No production flag was used.

## Route tests

Authenticated requests were made through Vercel's deployment-protection-aware request path. Every response contained a non-empty HTML document.

| Route | HTTP result | Response bytes | Result |
| --- | ---: | ---: | --- |
| `/` | 200 | 49,940 | Pass |
| `/projects/smart-reception` | 200 | 51,371 | Pass |
| `/projects/ai-music-video` | 200 | 41,882 | Pass |
| `/projects/antenatal-companion` | 200 | 20,939 | Pass |
| `/projects/antenatal-care-companion` | 200 | 6,110 | Pass; redirect document |
| `/projects/roster-automation` | 200 | 59,261 | Pass |
| `/projects/medication-verification` | 200 | 18,944 | Pass |
| `/projects/projection-mapping` | 200 | 27,976 | Pass |
| `/projects/immersive-medical-ux` | 200 | 28,015 | Pass |
| `/projects/earth-observatory` | 200 | 39,723 | Pass |
| `/projects/healthcare-ai-agents` | 200 | 17,059 | Pass |
| `/projects/workflow-orchestration` | 200 | 16,998 | Pass |
| `/projects/system-integration` | 200 | 16,998 | Pass |

Direct requests and repeat requests (refresh-equivalent document loads) returned content rather than a 404 for every listed path.

## Redirect tests

- Canonical antenatal route: `/projects/antenatal-companion`
- Legacy route: `/projects/antenatal-care-companion`
- The legacy document declares canonical `/projects/antenatal-companion` and contains Next.js redirect digest `NEXT_REDIRECT;replace;/projects/antenatal-companion;307;`.
- Because the application is statically exported, the legacy document itself is delivered with HTTP 200 and the redirect is executed client-side. Browser execution of this redirect remains a manual check because the Preview is Vercel Authentication protected and no signed-in controllable browser session was available.

## Missing assets and links

- Active WebP sequence: 300 local frames present.
- Representative deployed frames verified:
  - `frame-001.webp`: HTTP 200, `image/webp`, 75,588 bytes
  - `frame-150.webp`: HTTP 200, `image/webp`, 72,354 bytes
  - `frame-300.webp`: HTTP 200, `image/webp`, 75,234 bytes
- PNG sequence: 300 local frames present and no PNG frame is modified or deleted.
- Audio: no audio-file references were found in the application or rendered route documents, so no missing-audio request was identified. Browser network confirmation remains manual.
- All internal page links extracted from rendered documents resolve to routes covered by the successful route checks. Home-page fragment links (`#platform`, `#capabilities`, `#about`, `#contact`, `#demo`, and `#demo-gallery`) are present; scrolling/target behavior remains manual.
- External demo/contact checks returned HTTP 200 for the antenatal demo, Earth Observatory, both roster demos, Smart Reception home/outside/ward, staging demo, and WhatsApp contact redirect.

## Deployment-log findings

- Build completed successfully with Next.js 15.5.20.
- Compilation, type/lint validation, page-data collection, static generation (16/16), trace collection, and export completed successfully.
- No build errors or route-generation errors were reported.
- Build output reported the expected static home route and statically generated project routes.
- Runtime error-log query returned no logs for this static Preview deployment.
- No runtime errors, missing-static-asset errors, route errors, image/media 404s, or hydration warnings were present in the available Vercel logs.
- Browser console and hydration observation could not be completed automatically because Vercel Authentication redirected the available browser to login. These are manual checks below.

## Issues and limitations

1. The Preview requires Vercel Authentication. Anonymous requests resolve to Vercel login, while authenticated Vercel requests successfully reach the deployment.
2. The legacy antenatal redirect is client-side in the static export: initial HTTP status is 200, with a Next.js replace redirect carrying 307 semantics. Confirm the address bar changes to `/projects/antenatal-companion` in a signed-in browser.
3. Browser-only checks still required: console errors/warnings, hydration warnings, failed network requests, animation motion/continuity, fragment navigation, link click behavior, and visual/layout review.

No application-code or configuration change was made during Phase 3A.

## Manual visual QA matrix

Do not infer visual approval from the automated checks. Inspect **every page below at every viewport below** while signed in to Vercel Preview protection.

Pages:

1. `/`
2. `/projects/smart-reception`
3. `/projects/ai-music-video`
4. `/projects/antenatal-companion`
5. `/projects/antenatal-care-companion` (verify redirect and refresh)
6. `/projects/roster-automation`
7. `/projects/medication-verification`
8. `/projects/projection-mapping`
9. `/projects/immersive-medical-ux`
10. `/projects/earth-observatory`
11. `/projects/healthcare-ai-agents`
12. `/projects/workflow-orchestration`
13. `/projects/system-integration`

Viewports:

- Desktop: 1440 × 900
- Desktop: 1920 × 1080
- Tablet: 1024 × 1366
- Tablet: 768 × 1024
- Mobile: 390 × 844
- Mobile: 393 × 852

At each page/viewport combination, check initial load and refresh, non-empty rendering, clipping/overflow, typography and spacing, navigation, external links, console errors/warnings, failed network requests, missing audio requests, and image/media 404s. On `/`, also verify the active WebP sequence animates continuously and no PNG fallback is unexpectedly requested.

## Readiness

The Preview deployment is technically ready for manual visual comparison. Automated deployment, route, representative asset, external-link, and Vercel-log checks passed. Final visual approval requires the signed-in manual matrix and browser-console/network checks above.
