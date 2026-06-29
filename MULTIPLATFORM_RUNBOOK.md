# Shared Brain Multiplatform Runbook

This repo now contains:

- Web app: React/Firebase
- Desktop app: Electron shell
- iOS app: SwiftUI native source

All three use the same Firebase backend and the same team library.

## Web

Run locally:

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

Public link:

```text
https://sharedbrain-92f19.web.app
```

## Desktop

The desktop app lives in:

```text
desktop/
```

It loads the live web app by default:

```text
https://sharedbrain-92f19.web.app
```

Run:

```bash
npm run desktop
```

Package:

```bash
npm run build
npm run desktop:package
```

Package output:

```text
release/
```

### If Electron Says It Failed To Install

Run:

```bash
$env:force_no_cache="true"
$env:electron_config_cache="C:\Users\ninad\Documents\Shared brain\.electron-cache"
node node_modules\electron\install.js
```

Then test:

```bash
npx electron --version
```

If the local machine still only shows `LICENSES.chromium.html` under `node_modules/electron/dist`, the Electron binary download is being blocked or extracted incorrectly on that machine. The source files are still correct; try a fresh terminal, temporarily disable aggressive antivirus scanning for the project folder, or run the install on another machine.

## iOS

The native iOS source lives in:

```text
ios/SharedBrain/
```

Final build requires:

- macOS
- Xcode
- Apple Developer account for device/TestFlight distribution

Setup:

1. In Firebase Console, add an iOS app to project `sharedbrain-92f19`.
2. Use bundle id:

```text
com.ninad.sharedbrain
```

3. Download `GoogleService-Info.plist`.
4. Create a SwiftUI iOS app in Xcode.
5. Add `GoogleService-Info.plist` to the app target.
6. Add Swift packages:

```text
https://github.com/firebase/firebase-ios-sdk
https://github.com/google/GoogleSignIn-iOS
```

7. Add Firebase products:

```text
FirebaseAuth
FirebaseFirestore
FirebaseFirestoreSwift
```

8. Add Google product:

```text
GoogleSignIn
```

9. Copy the files from `ios/SharedBrain/` into the Xcode app target.
10. Add the `REVERSED_CLIENT_ID` from `GoogleService-Info.plist` as a URL scheme.
11. Build and run.

## Team Access

Every user needs a Firebase Auth account and a member document:

```text
workspaces/main/members/{uid}
```

Fields:

```text
email: user email
role: admin | editor | viewer
createdAt: timestamp
```

## Current Limitations

- Firebase Storage is not enabled, so thumbnails are embedded as compressed data URLs.
- The iOS app source cannot be compiled on this Windows machine.
- Electron source/config is present, but this local machine currently has an incomplete Electron binary install. Web build verification passes.
