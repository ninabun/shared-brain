# Shared Brain Agent Access

Agents can operate the app as structured memory after a human grants access.

1. Sign in to Firebase with an approved Google account that is a member of `workspaces/main`.
2. Ask the human user to open Profile > Agent access and generate the current token.
3. Hash the token with SHA-256.
4. Compare it with `profiles/{uid}.agentTokenHash`.
5. Only after the hash matches, read and write documents in `workspaces/main/ideas`.
6. Store uploaded screenshots or visual references in Firebase Storage under `workspaces/main/idea-assets/`.

Idea documents support:

- `url`
- `source`: `youtube`, `tweet`, `instagram`, `article`, or `note`
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

To bootstrap the first human admin, create this Firestore document in the Firebase console after the first Google sign-in:

- Path: `workspaces/main/members/{USER_UID}`
- Fields: `email` string, `role` string set to `admin`, `createdAt` timestamp
