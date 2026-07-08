# Wing Yee AI Lab 3D Portfolio Architecture

## Product Positioning

Wing Yee AI Lab should feel less like a portfolio page and more like a private data planetarium: a premium observatory where clinical experience, AI systems, learning velocity, and creative AI communication orbit one mission.

Brand line:

**Transforming Healthcare Through AI, Automation and Intelligent Workflows.**

Mission:

I build practical AI systems that bridge clinical knowledge, workflow automation, intelligent agents and human-centered design.

## User Journey

1. **Arrival: Observatory Gate**
   - The visitor lands inside a quiet orbital field.
   - The hero establishes Wing Yee AI Lab as an AI operating system, not a generic portfolio.
   - Primary actions: Explore Projects, AI Lab, Healthcare, About Me.

2. **Featured Systems**
   - The camera pushes toward a central data planet.
   - Five featured projects appear as museum-grade plaques: Healthcare AI Operating System, Nursing Roster Automation, Hermes AI Intelligence Agent, Shared Brain, Earth Observatory.

3. **Projects Constellation**
   - The scene opens into four constellations: Healthcare AI, AI Systems, Interactive Applications, AI Product Communication.
   - Each project keeps structured fields such as Problem, Solution, Technology, Demo, GitHub, Reflection.

4. **AI Lab Orbit**
   - The visitor enters a tool taxonomy ring.
   - AI Foundation, Automation, AI Agents, Development, Creative AI, Healthcare AI, and Core Skills become categorized orbital panels.

5. **Learning Trajectory**
   - The camera tilts through a vertical timeline from 2024 to 2026.
   - This section communicates speed of learning and strategic direction.

6. **Hermes / AI Daily**
   - Daily intelligence is represented as a live signal station.
   - Topics include OpenAI, Claude, Google, Meta, Open Source, Daily Update.

7. **Ecosystem Map**
   - The final scene resolves into the Wing Yee AI Ecosystem.
   - Clinical work and AI systems merge into Knowledge Brain, Interactive Apps, and AI Creativity.

8. **About / Closing**
   - The experience ends with a confident personal statement and current interests.

## Scene Structure

The 3D layer should be persistent across the whole page. The site should not remount a canvas for every section.

- **Scene 01: Observatory Gate**
  - Central data planet, faint grid floor, slow particle drift.
  - Camera starts wide and frontal.

- **Scene 02: Featured Orbit**
  - Five luminous project nodes orbit the planet.
  - The selected node subtly enlarges as the matching overlay enters.

- **Scene 03: Project Constellations**
  - Four constellation arms unfold around the core.
  - Healthcare AI sits closest to the camera and carries the strongest glow.

- **Scene 04: AI Lab Rings**
  - Tool categories become nested orbit rings.
  - The rings rotate at different speeds to imply a working knowledge system.

- **Scene 05: Learning Trajectory**
  - Timeline nodes stack vertically in depth.
  - The camera performs a gentle crane movement upward.

- **Scene 06: Signal Station**
  - Daily intelligence appears as pulsing data beacons.
  - UI panels use compact terminal-like signal states.

- **Scene 07: Ecosystem Reveal**
  - The camera pulls back and all systems align into a map.
  - Final position is stable and presentation-ready.

## Scroll Behavior

- Use GSAP ScrollTrigger as the master scroll conductor.
- Keep a single pinned WebGL canvas behind all sections.
- Overlay sections scroll above the canvas using sticky editorial panels.
- The camera timeline should be scrubbed by scroll, not time alone.
- UI panels can fade and translate independently from the 3D objects.
- Interactive hover states should not change the camera position; they should only highlight nodes and panels.

Recommended scroll ranges:

- 0-12%: hero reveal and planet activation.
- 12-28%: featured project orbit.
- 28-48%: project constellations.
- 48-64%: AI Lab taxonomy rings.
- 64-76%: learning timeline.
- 76-88%: AI Daily signal station.
- 88-100%: ecosystem and about closing.

## Overlay Content Structure

- **Top navigation:** Projects, AI Lab, Learning Journey, AI Daily, About Me, My AI Ecosystem.
- **Hero overlay:** mission, credentials, brand statement, four CTA buttons.
- **Pinned chapter panels:** each major section gets one sticky text panel.
- **Project panels:** repeated cards with structured metadata fields.
- **Lab panels:** category chips grouped by purpose.
- **Timeline panels:** year, skills, short interpretation.
- **Ecosystem panel:** diagram-style system explanation.

Overlay rules:

- Keep text short, high-contrast, and editorial.
- Avoid dense dashboard language.
- Treat panels like museum labels beside a luxury object.
- All important content must remain readable without WebGL.

## Mobile Fallback Strategy

Mobile should not attempt the full desktop 3D choreography.

- Disable heavy WebGL on narrow screens below 820px.
- Show a lightweight CSS data-planet visual instead.
- Replace scrubbed camera choreography with stacked sections.
- Keep the same content, navigation, project cards, and taxonomy.
- Respect `prefers-reduced-motion` by disabling ScrollTrigger scrub animation and particle motion.
- Cap expensive visual effects on tablets.

## Performance Constraints

- One persistent canvas only.
- Target 60 FPS desktop, 30 FPS low-power fallback.
- Device pixel ratio capped at 1.6.
- No large GLTF dependency in the first frontend architecture.
- Prefer procedural geometry, instancing, and Drei helpers.
- Keep draw calls low; target under 80.
- Keep total texture weight under 2 MB for the first release.
- Lazy-load the WebGL layer with Next dynamic import.
- Avoid layout-triggering animation in scroll callbacks.
- Canvas must render meaningful content within the first 2 seconds.

## Frontend / Backend Boundary

The 3D portfolio frontend is presentation-first:

- Next.js owns routing, static content, metadata, and deployment.
- React Three Fiber owns scene composition.
- GSAP ScrollTrigger owns scroll timeline and pinning logic.
- Content should live in typed, reusable data modules first.
- Backend should only be introduced when editing, search, analytics, or dynamic project publishing becomes a real operational need.

## Reusable Component Structure

```text
apps/portfolio-3d/
  app/
    layout.jsx
    page.jsx
    globals.css
  components/
    PersistentCanvas.jsx
    SceneManager.jsx
    CameraRig.jsx
    OverlaySystem.jsx
    MobileFallback.jsx
    DataPlanet.jsx
    OrbitingNodes.jsx
    SignalField.jsx
  lib/
    content.js
    breakpoints.js
    useReducedMotion.js
```

## Art Direction

Theme:

**Data planetarium / space observatory / luxury product / virtual museum / fashion editorial.**

Visual language:

- Deep ink-blue space background.
- Cyan, glacier white, soft violet, aurora green, and restrained gold accents.
- Thin orbital lines, precise grids, luminous project nodes.
- Dark translucent panels with glass edges.
- Typography should feel technical but refined.
- Large editorial headings; compact data plaques.

## Section Copy

Hero:

**Wing Yee AI Lab**

Building AI-powered Healthcare Systems

RN | MSc Computer Science | AI Workflow Designer

I design AI solutions that reduce healthcare workload through AI agents, workflow automation and intelligent systems.

Featured:

These are not experiments. They are system prototypes for healthcare, automation, intelligence and communication.

Projects:

Each project is documented as a practical system: the problem, the solution, the technology, the result and the reflection.

AI Lab:

A living taxonomy of models, agents, automations, healthcare AI and creative tools.

Learning Journey:

The timeline shows learning speed, technical growth and the direction of the lab.

AI Daily:

Hermes tracks the movement of frontier AI and turns signals into practical intelligence.

Ecosystem:

Clinical knowledge and AI systems merge into a single operating system for practical healthcare innovation.

## 3D Object Behavior

- Data planet rotates slowly at all times.
- Project nodes orbit and pulse when their section is active.
- Healthcare AI nodes use the closest orbit and highest brightness.
- AI Lab rings expand when the lab section enters.
- Learning nodes rise in sequence with scroll progress.
- Signal beacons pulse in the AI Daily section.
- Ecosystem objects align into a map for the final reveal.

## Camera Choreography

- Hero: wide, centered, slow push.
- Featured: slight orbit around the data planet.
- Projects: dolly left and tilt toward constellation arms.
- AI Lab: top-down movement through nested rings.
- Learning: vertical crane movement through timeline depth.
- AI Daily: close-up on pulsing signal beacons.
- Ecosystem: pull back and settle into a composed final map.

## UI Panels

- Panels should look like luxury instrument labels.
- Use thin borders, glass depth, high-contrast type and precise spacing.
- CTA buttons should feel like command controls, not generic pills.
- Project cards should expose structured fields but remain visually calm.
- Hovering a panel should highlight the related 3D node.

## Interaction Details

- Scroll drives major motion.
- Hover highlights project nodes.
- Keyboard navigation must remain usable through normal document flow.
- Reduced motion users get instant scene states and no camera scrub.
- Mobile users get the same content in a faster editorial layout.

## Backend Evaluation

No backend is required for the first 3D portfolio release.

Why static frontend is sufficient:

- Portfolio content is curated and changes infrequently.
- The requested experience is visual storytelling, not user-generated data.
- Authentication, Firestore, Storage, and agent access belong to the older Shared Brain app, not the public portfolio layer.
- Static content is faster, cheaper, easier to cache, and easier to deploy on Vercel or GitHub Pages.
- Search/filter can be handled client-side because the project and lab datasets are small.

Future backend triggers:

- Non-technical editing of projects.
- Publishing daily Hermes updates from an admin panel.
- Full-text search across many articles or logs.
- Private team-only project areas.
- Analytics dashboards.

If a backend is added later:

- **CMS/API schema:** Projects, LabTools, DailySignals, TimelineItems, MediaAssets, Pages.
- **Data models:** title, slug, category, summary, body sections, technology tags, demo URL, GitHub URL, reflection, featured flag, display order, createdAt, updatedAt.
- **Asset delivery:** store optimized images and lightweight GLB assets on Vercel Blob, Cloudflare R2, or Firebase Storage with CDN caching.
- **Admin workflow:** editor signs in, edits CMS entries, preview deploy opens, production publish triggers rebuild.
- **Search/filter:** client-side Fuse.js first; server search only if content grows beyond a few hundred records.
- **Analytics events:** hero viewed, CTA clicked, project opened, demo clicked, GitHub clicked, section reached, mobile fallback used.
- **Caching:** static generation with ISR, CDN cache for assets, stale-while-revalidate for daily signals.
