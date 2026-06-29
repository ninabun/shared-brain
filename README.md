# Shared Brain

A private visual second brain for video ideas, built with React, Firebase Auth, Firestore, and Firebase Storage.

This repo also includes an Electron desktop shell and native SwiftUI iOS source. See [PLATFORM_APPS.md](./PLATFORM_APPS.md).

## What it does

- Google sign-in
- Private workspace-based idea library
- Masonry grid of visual cards
- YouTube thumbnail detection
- Tweet-style preview cards
- Instagram, article, screenshot, and loose idea support
- Categories added manually or by agents
- Film category and planned film date fields
- Firebase Storage uploads for screenshots and reference images
- Profile panel with agent access token generation
- AI title suggestions through a server-side Cloudflare Worker
- Deployable Firestore and Storage rules

## Run locally

```bash
npm install --cache ./.npm-cache
npm run dev -- --port 5173
```

Open `http://127.0.0.1:5173`.

Desktop app:

```bash
npm run desktop
```

Local preview link:

- `http://127.0.0.1:5173`

Expected public app links after Firebase Hosting deploy:

- `https://sharedbrain-92f19.web.app`
- `https://sharedbrain-92f19.firebaseapp.com`

## Firebase setup

Google sign-in should be enabled in Firebase Authentication.

The app uses a private workspace at `workspaces/main`. After your first Google sign-in, add yourself as the first admin member in the Firebase console:

- Collection: `workspaces`
- Document: `main`
- Subcollection: `members`
- Document ID: your Firebase Auth user UID
- Fields:
  - `email`: your email address
  - `role`: `admin`
  - `createdAt`: current timestamp

Deploy rules with:

```bash
firebase deploy --only firestore:rules,storage
```

Deploy hosting with:

```bash
npm run build
firebase deploy --only hosting
```

If Firebase says you are not logged in, run:

```bash
npx --cache ./.npm-cache firebase-tools login
npx --cache ./.npm-cache firebase-tools deploy --only hosting --project sharedbrain-92f19
```

## AI title suggestions

The OpenAI API key must be stored in the Cloudflare Worker, not in frontend code.

Set up the Worker:

```bash
cd "C:\Users\ninad\Documents\Shared brain\workers\title-suggestor"
npm install
npx wrangler login
npx wrangler secret put OPENAI_API_KEY
npx wrangler deploy
```

Paste the OpenAI key only when `wrangler secret put OPENAI_API_KEY` asks for it.

Copy the Worker URL, then create `.env.local` in the main app folder:

```text
VITE_TITLE_WORKER_URL=https://shared-brain-title-suggestor.YOUR_SUBDOMAIN.workers.dev
```

Rebuild and deploy hosting:

```bash
npm run build
npx --cache ./.npm-cache firebase-tools deploy --only hosting --project sharedbrain-92f19
```

The app shows **Suggest title** in the idea editor. It sends the current link, notes, attribution, and embedded screenshot thumbnail when available. The Worker asks for a conservative title under six words.
