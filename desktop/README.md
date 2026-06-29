# Shared Brain Desktop

The desktop app is an Electron shell for Shared Brain.

By default it loads the live Firebase-hosted app:

```text
https://sharedbrain-92f19.web.app
```

This keeps Google sign-in, Firestore, and shared team data consistent with the web app.

## Run

```bash
npm run desktop
```

## Package

Build the web app first:

```bash
npm run build
```

Then package:

```bash
npm run desktop:package
```

Output goes to:

```text
release/
```

## Local File Mode

This loads the local `dist/index.html`:

```bash
npm run desktop:local
```

Google sign-in may be less reliable in local file mode. The hosted URL mode is recommended for team use.
