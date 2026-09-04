# Phase Clinical Research — 3D Landing Page

Production-grade, scroll-driven 3D landing page built with Next.js (App
Router), React Three Fiber, GSAP ScrollTrigger, and Lenis.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

- **`components/SmoothScroll.tsx`** — Wraps the app in Lenis for inertial
  scroll, and feeds every Lenis tick into GSAP's `ScrollTrigger.update` so
  scroll-linked animation stays in sync with the eased scroll position.
- **`components/ScrollDriver.tsx`** — A single `ScrollTrigger` spanning the
  whole document (`top top` → `bottom bottom`) that writes overall scroll
  progress into `lib/scrollState.ts`.
- **`lib/scrollState.ts`** — A plain mutable object (not React state) read
  every frame inside the R3F render loop via `useFrame`. Scroll progress
  changes on every tick during a scrub; routing that through React state
  would trigger unnecessary re-renders, so the Canvas reads it directly.
- **`components/canvas/Scene.tsx`** — The single fixed, `pointer-events: none`
  Canvas (`dpr={[1,2]}`) that sits behind all HTML content. Composes:
  - `ParticleCore.tsx` — hero molecular-receptor point cloud, custom
    vertex/fragment shaders, pointer-raycast swell.
  - `DualHubGlobe.tsx` — wireframe globe with India/Australia beacons and
    a dashed telemetry arc between them.
  - `RiskLattice.tsx` — instanced-mesh risk points that scatter, then align
    into a compliant plane as the RBQM section scrolls into view.
  - `CameraRig.tsx` — lerps camera position/lookAt between named waypoints
    keyed to global scroll progress.
  - Post-processing: selective `Bloom`, `DepthOfField`, `Vignette`.
- **`components/sections/*`** — The accessible HTML content layer
  (`z-index: 10`) that scrolls normally on top of the fixed canvas.

## Performance & cleanup notes

- All 3D primitives are mounted once for the session and toggle
  `visible`/opacity rather than mount-unmount, since their geometry is
  reused continuously as the user scrolls back and forth. If you split any
  of these into route-level or conditionally-mounted components, React
  Three Fiber disposes their geometries/materials automatically on
  unmount (`dispose` defaults to `true` on every object3D) — no manual
  `geometry.dispose()` calls are needed unless you set `dispose={null}`.
- `dpr={[1, 2]}` caps device pixel ratio so high-DPI displays don't force
  4x fragment shader cost.
- Reduced-motion users get a near-instant Lenis duration and CSS
  transitions are globally capped via the `prefers-reduced-motion` query
  in `globals.css`.

## Content

Placeholder copy throughout (therapeutic area descriptions, stat values,
regulatory disclaimer) should be reviewed by the founders before launch —
particularly the "0 critical audit findings" and "15+ years" stats, which
are structured as editable constants at the top of
`components/sections/FounderContact.tsx`.
