# Shared Brain Title Suggestor Worker

This Cloudflare Worker keeps the OpenAI API key server-side and verifies the signed-in Firebase user before suggesting a title.

## Setup

Install and log in:

```bash
cd "C:\Users\ninad\Documents\Shared brain\workers\title-suggestor"
npm install
npx wrangler login
```

Set the OpenAI key as a Worker secret:

```bash
npx wrangler secret put OPENAI_API_KEY
```

Paste the OpenAI key when prompted.

Deploy:

```bash
npx wrangler deploy
```

Copy the deployed Worker URL, then create a frontend env file:

```bash
cd "C:\Users\ninad\Documents\Shared brain"
```

Create `.env.local`:

```text
VITE_TITLE_WORKER_URL=https://shared-brain-title-suggestor.YOUR_SUBDOMAIN.workers.dev
```

Then rebuild and deploy Firebase Hosting:

```bash
npm run build
npx --cache ./.npm-cache firebase-tools deploy --only hosting --project sharedbrain-92f19
```
