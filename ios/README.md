# Shared Brain iOS

Native SwiftUI iOS app for the same Shared Brain Firebase backend.

This folder contains the app source code and setup notes. Final compilation, signing, and TestFlight/App Store distribution must be done on a Mac with Xcode.

## Firebase

Use the same Firebase project:

```text
sharedbrain-92f19
```

Create an iOS app in Firebase with a bundle id such as:

```text
com.ninad.sharedbrain
```

Download:

```text
GoogleService-Info.plist
```

Add it to the Xcode target.

## Swift Packages

Add these packages in Xcode:

```text
https://github.com/firebase/firebase-ios-sdk
https://github.com/google/GoogleSignIn-iOS
```

Firebase products:

- FirebaseAuth
- FirebaseFirestore
- FirebaseFirestoreSwift

Google package:

- GoogleSignIn

## Files

Copy everything inside:

```text
ios/SharedBrain/
```

into the Xcode app target.

## Required URL Scheme

Open `GoogleService-Info.plist`, copy `REVERSED_CLIENT_ID`, then add it as a URL scheme in Xcode:

```text
Target > Info > URL Types
```

## Behavior

The iOS app uses:

```text
workspaces/main/ideas
workspaces/main/members/{uid}
profiles/{uid}
```

It reads and writes the same idea records as the web and desktop apps.

## Current Image Strategy

Images are compressed on-device and stored as embedded JPEG data URLs in `uploadUrl`, matching the current web app behavior without Firebase Storage.
