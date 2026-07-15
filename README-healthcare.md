## Healthcare Workflow Intelligence

New routes:

- `/projects/healthcare-workflow-intelligence`
- `/projects/healthcare-workflow-intelligence/medication-verification`
- `/projects/healthcare-workflow-intelligence/discharge-intelligence`
- `/projects/healthcare-workflow-intelligence/critical-result-escalation`

The feature lives in `app/components/healthcare`. `data.ts` contains typed repeated content; `Shared.tsx` contains the workflow, risk, audit, video and interaction primitives; the two page components compose the strategy and application experiences.

`MockWorkflowAdapter` runs deterministic browser-only simulations with fictional data. A future `N8nWebhookAdapter` should implement the same `WorkflowAdapter` interface through an authenticated server-side gateway. Never place n8n credentials or live clinical payloads in client code.

Place future posters and captioned demo videos in `public/healthcare-workflow-intelligence/video/`, then replace `DemoVideoSection` placeholders. The concept currently has no live Hospital Authority connection and is not intended for clinical use.
