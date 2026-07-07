# Wing Yee AI Lab 3D Portfolio

This is the frontend-only 3D portfolio architecture for the data planetarium version of Wing Yee AI Lab.

## Stack

- Next.js
- React
- React Three Fiber
- Drei
- Three.js
- GSAP ScrollTrigger

## Run

From the repository root:

```bash
npm run portfolio3d:dev -- --port 3100
```

Shortcut:

```bash
npm run portfolio3d:dev:3100
```

Or from this folder:

```bash
npm install
npm run dev -- --port 3100
```

## Build

```bash
npm run portfolio3d:build
```

## Architecture Notes

- `PersistentCanvas` owns the single WebGL canvas.
- `SceneManager` owns the 3D scene, lighting, and object groups.
- `CameraRig` owns scroll-driven camera choreography.
- `OverlaySystem` owns pinned editorial content and UI panels.
- `MobileFallback` replaces heavy WebGL on small screens.
- Content lives in `lib/content.js` so it can later move into a CMS without changing the scene architecture.
