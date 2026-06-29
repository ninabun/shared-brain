# Shared Brain Platform Apps

Shared Brain now has one shared backend and three client surfaces:

- Web: React + Firebase
- Desktop: Electron shell
- iOS: SwiftUI native app source

## One Backend

All platforms use the same Firebase project:

```text
sharedbrain-92f19
```

Shared collections:

```text
profiles/{uid}
workspaces/main
workspaces/main/members/{uid}
workspaces/main/ideas/{ideaId}
```

Every team member must sign in with Google and must have a member document:

```text
workspaces/main/members/{FIREBASE_AUTH_UID}
```

Required fields:

```text
email: user email
role: admin | editor | viewer
createdAt: timestamp
```

## Shared Idea Fields

All clients should preserve this structure:

```text
url
source
title
description
attribution
thumbnailUrl
uploadUrl
categories
filmCategory
filmDate
createdAt
updatedAt
createdBy
```

## Source Labels

Current source values and labels:

```text
youtube   -> YouTube
tweet     -> AI Tools
instagram -> Instagram
article   -> Agentic AI
note      -> Loose ideas
```

The internal values are kept for compatibility with existing saved ideas.

## Thumbnail Strategy

Firebase Storage is optional. The current app supports embedded thumbnails:

```text
uploadUrl = data:image/jpeg;base64,...
```

This works on web, desktop, and iOS without Firebase Storage.

For large team usage, enable Firebase Storage later and migrate `uploadUrl` to hosted download URLs.

## Web

Run:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Deploy Firebase Hosting:

```bash
npx --cache ./.npm-cache firebase-tools deploy --only hosting --project sharedbrain-92f19
```

## Desktop

Run Electron shell:

```bash
npm run desktop
```

Package:

```bash
npm run build
npm run desktop:package
```

The desktop app loads:

```text
https://sharedbrain-92f19.web.app
```

by default, so it uses the same auth domain and Firestore data as the web app.

## iOS

The iOS source lives in:

```text
ios/SharedBrain
```

Open Xcode on a Mac, create an iOS SwiftUI project, add Firebase and Google Sign-In packages, then copy these source files into the app target.

The iOS app uses native Firebase SDKs and the same Firestore paths.

## Team Readiness Checklist

- Web app deployed
- Desktop package generated for Windows/macOS
- iOS app compiled in Xcode
- Firebase Google sign-in enabled
- Every team member added to `workspaces/main/members/{uid}`
- Firestore rules deployed
- Storage either enabled or embedded thumbnails used
