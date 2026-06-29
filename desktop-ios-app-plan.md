# Shared Brain Desktop and iOS App Plan

## Goal

Turn Shared Brain into a multi-platform product:

- Web app: existing React + Firebase app
- Desktop app: Electron app
- iOS app: native Swift app

All versions should use the same backend:

- Firebase Authentication
- Cloud Firestore
- Firebase Storage if enabled later
- Existing `workspaces/main/ideas` data model
- Existing workspace membership rules

The goal is that a team can save, edit, search, and organize the same shared idea library from web, desktop, and iPhone.

## Current Backend

The current app already uses Firebase:

- Project: `sharedbrain-92f19`
- Auth: Google sign-in
- Firestore:
  - `workspaces/main`
  - `workspaces/main/members/{uid}`
  - `workspaces/main/ideas/{ideaId}`
  - `profiles/{uid}`
- Storage path, if enabled later:
  - `workspaces/main/idea-assets/`

This backend should remain the source of truth. No platform should have its own separate database.

## Shared Data Model

Each idea should keep using the same fields:

- `url`
- `source`
- `title`
- `description`
- `attribution`
- `thumbnailUrl`
- `uploadUrl`
- `categories`
- `filmCategory`
- `filmDate`
- `createdAt`
- `updatedAt`
- `createdBy`

The desktop and iOS apps should read and write this exact structure.

## Phase 1: Stabilize The Web App As The Shared Core

Before building the new apps:

1. Clean up labels and data naming.
2. Decide whether the app is about:
   - video ideas,
   - AI applications,
   - AI tools,
   - agentic AI references,
   - or all of the above.
3. Finalize source types.
4. Finalize category behavior.
5. Keep the Firebase rules stable.
6. Keep embedded thumbnails working without Firebase Storage.
7. Keep Firebase Storage optional for the future.

Recommended source types:

- `youtube`
- `instagram`
- `aiTool`
- `agenticAi`
- `note`
- `article`

The current app can keep old values internally for compatibility, but the UI should use clearer labels.

## Phase 2: Desktop App With Electron

### Recommended Approach

Use Electron as a wrapper around the existing React app.

This is the fastest and safest path because:

- The current app already works.
- Firebase Web SDK already handles auth and Firestore.
- The same UI can be reused.
- Desktop can ship sooner.
- Updates are easier.

### Desktop Architecture

Electron app structure:

```text
desktop/
  main/
    main.js
    preload.js
  package.json
  electron-builder.yml
```

The Electron app should load the built React app from local files:

```text
dist/index.html
```

The desktop app should use:

- Electron main process for window management
- React renderer for the existing UI
- Firebase Web SDK inside the renderer
- System file picker for screenshots/images

### Desktop Features

Minimum desktop version:

- Google sign-in
- View shared library
- Add links
- Edit items
- Delete items
- Upload embedded thumbnails
- Search
- Filter by source
- Filter by categories

Desktop-specific improvements:

- Global shortcut for quick save
- Menu bar command: `New Idea`
- Drag-and-drop image upload
- Paste image from clipboard
- Open source links in the default browser
- Auto-update later with `electron-updater`

### Desktop Authentication

Use Firebase Web Auth with Google sign-in.

Potential issue:

- Google sign-in popups can be awkward inside Electron.

Recommended solution:

- Start with Firebase Google popup/redirect.
- If it is unreliable, switch to system-browser OAuth:
  - Open Google login in the default browser.
  - Return to the app through a custom protocol link.

Custom protocol example:

```text
sharedbrain://auth
```

### Desktop Packaging

Use `electron-builder`.

Targets:

- Windows: `.exe`
- macOS: `.dmg`
- Optional later: Linux AppImage

Package scripts:

```json
{
  "desktop:dev": "vite --host 127.0.0.1",
  "desktop:build": "npm run build && electron-builder"
}
```

### Desktop Risks

- Google auth flow inside Electron may need extra work.
- Packaging and code signing may be needed for smooth installation.
- macOS notarization is required for a polished public release.

## Phase 3: iOS App With Swift

### Recommended Approach

Build a native SwiftUI app using Firebase iOS SDK.

Do not use a WebView wrapper for the iOS app unless speed matters more than quality.

SwiftUI is better because:

- Native performance
- Better image picker
- Better sign-in experience
- Better share sheet support
- Better long-term App Store readiness

### iOS Architecture

Use:

- SwiftUI for UI
- FirebaseAuth for authentication
- FirebaseFirestore for data
- FirebaseStorage later if Storage is enabled
- PhotosUI for image picking
- UIKit share extension later

Recommended structure:

```text
ios/SharedBrain/
  App/
    SharedBrainApp.swift
  Auth/
    AuthViewModel.swift
  Firebase/
    FirebaseService.swift
  Ideas/
    Idea.swift
    IdeaRepository.swift
    IdeaListView.swift
    IdeaCardView.swift
    IdeaEditorView.swift
  Profile/
    ProfileView.swift
  Assets/
```

### iOS Firebase Setup

1. Create an iOS app inside Firebase project `sharedbrain-92f19`.
2. Bundle ID example:

```text
com.ninad.sharedbrain
```

3. Download `GoogleService-Info.plist`.
4. Add it to the Xcode project.
5. Install Firebase SDK through Swift Package Manager.

Required Firebase packages:

- FirebaseAuth
- FirebaseFirestore
- FirebaseFirestoreSwift
- FirebaseStorage if Storage is enabled

### iOS Authentication

Use Google Sign-In with Firebase Auth.

Setup required:

- Add URL scheme from `GoogleService-Info.plist`
- Configure Google Sign-In
- Connect result to Firebase credential

The signed-in user must still exist in:

```text
workspaces/main/members/{uid}
```

Otherwise, the iOS app should show the same access-needed state.

### iOS Features

Minimum iOS version:

- Google sign-in
- View idea grid/list
- Add idea manually
- Paste link
- Edit title/notes/categories
- Add film date
- Upload embedded thumbnail from photo library
- Search
- Delete item

iOS-specific improvements:

- Share sheet extension: save links from Safari, YouTube, Instagram, X, etc.
- Camera/photo import
- Quick capture widget later
- Offline draft queue
- Push notifications later for planned film dates

### iOS Data Sync

Use Firestore snapshot listeners.

All platforms should update in near real time:

- Web saves an idea.
- Desktop sees it.
- iOS sees it.
- iOS edits it.
- Web and desktop update.

Conflict rule:

- Last write wins for simple fields.
- Later, add edit history if needed.

### iOS Thumbnail Strategy

Because Firebase Storage is not enabled right now:

- Compress selected images on-device.
- Store small thumbnails as base64/data URLs in `uploadUrl`.

Later, if Firebase Storage is enabled:

- Upload images to Storage.
- Save the download URL in `uploadUrl`.
- Migrate large embedded thumbnails gradually.

## Phase 4: Shared Rules and Security

The same Firebase security model should apply to every platform.

Firestore rules should remain workspace-based:

```text
workspaces/main/members/{uid}
```

Only members can:

- Read ideas
- Create ideas
- Update ideas
- Delete ideas

Only admins should:

- Add members
- Remove members
- Change roles

Recommended roles:

- `admin`
- `editor`
- `viewer`

Future rule behavior:

- `viewer`: read only
- `editor`: create/update/delete ideas
- `admin`: manage members and everything else

## Phase 5: Team Use

Add a simple member management screen.

Admin should be able to:

- See current members
- Add a member by email
- Assign role
- Remove member

Important:

Firestore rules work by UID, not email. A user may need to sign in once before they can be added easily.

Suggested flow:

1. User signs in.
2. App creates/updates `profiles/{uid}`.
3. Admin sees pending profile.
4. Admin adds user to `workspaces/main/members/{uid}`.

## Phase 6: Optional AI Features Later

The OpenAI title suggestion feature was removed because API billing was not active.

If added later, use Cloudflare Workers or another backend.

Do not put the OpenAI API key in:

- React frontend
- Electron renderer
- iOS app bundle
- GitHub repo

Safe AI architecture:

```text
Web/Desktop/iOS -> Cloudflare Worker -> OpenAI API
```

The Worker should:

- Verify Firebase ID token
- Check allowed workspace membership
- Call OpenAI
- Return short title or metadata

Possible AI features later:

- Suggest title
- Suggest categories
- Summarize screenshots
- Extract hooks
- Detect source type
- Find duplicates

## Phase 7: Development Order

Recommended order:

1. Clean current web app naming and data model.
2. Add member management in web app.
3. Create Electron wrapper.
4. Ship desktop internal build.
5. Create iOS SwiftUI project.
6. Implement iOS auth.
7. Implement iOS idea list.
8. Implement iOS editor.
9. Implement iOS image import.
10. Add iOS share extension.
11. Polish cross-platform sync.

## Phase 8: Deployment

### Web

Current hosting:

- Firebase Hosting
- GitHub Pages backup

### Desktop

Internal distribution:

- Windows `.exe`
- macOS `.dmg`

Later:

- Code signing
- Auto-update

### iOS

Internal testing:

- TestFlight

Production:

- App Store

Requirements:

- Apple Developer account
- Bundle ID
- App icons
- Privacy policy
- App Store screenshots

## Key Decisions Needed

Before building:

1. Should the app name stay `Shared Brain`?
2. Should the domain be video ideas, AI apps, or creative research?
3. Should old categories be renamed or migrated?
4. Should iOS be native SwiftUI only, or should the first version be a WebView wrapper?
5. Should Firebase Storage be enabled later?
6. Should team member management be built before desktop/iOS?

## Recommended MVP Scope

### Electron MVP

- Existing UI inside Electron
- Google sign-in
- Firestore sync
- Add/edit/delete ideas
- Embedded thumbnail upload
- Search/filter

### iOS MVP

- Native SwiftUI
- Google sign-in
- Shared Firestore library
- Add/edit/delete ideas
- Photo picker thumbnail upload
- Search/filter

## Success Criteria

The project is successful when:

- A user can save an idea on web and see it on desktop and iOS.
- A user can edit an item on iOS and see the update on web.
- Team members share the same library.
- Auth and permissions work consistently across platforms.
- No secrets are exposed in client apps.
- The app feels fast, visual, and useful on every platform.
