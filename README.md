# ASLE Pharmaceuticals — Immersive Scroll Website

An immersive, scroll-driven rebuild of the ASLE Pharmaceuticals homepage.
Scrolling is treated as a **camera control**: as you scroll, the "camera"
travels, objects transform, and the brand story unfolds —
**Science → Quality → Healthcare → Global Delivery**.

Concept: **SCROLL TO DISCOVER ASLE**.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling (ASLE brand palette: teal / aqua / navy / white)
- **GSAP + ScrollTrigger** for scroll-synchronised animation
- **Lenis** for smooth scrolling (synced to the GSAP ticker)
- **lucide-react** for icons
- SVG + CSS 3D transforms for the capsule, molecule and human visuals
  (GPU-friendly `transform` / `opacity`; a reliable, performant alternative
  to WebGL that also serves as the low-power / reduced-motion path)

## Scene structure (`app/page.tsx`)

| # | Scene | Motion technique |
|---|-------|------------------|
| 01 | Hero | Sticky pin · capsule scale/rotate · camera pull-back · glow |
| 02 | Capsule Break | Halves split · granule burst |
| 03 | Ingredients | Molecule reveal · 3-layer parallax |
| 04 | To Human | Molecule → human silhouette morph · core glow |
| 05 | Therapeutic Areas | Horizontal scroll · focus-carousel scale/opacity |
| 06 | Capabilities | Horizontal 3D carousel of dosage forms |
| 07 | Quality | Panel zoom · staggered pillar reveal (WHO-GMP etc.) |
| 08 | R&D | Real world → digital world split transition |
| 09 | Global Partnership | Conceptual network arcs radiate from the hub |
| 10 | Manufacturing | Horizontal "camera travel" through the facility |
| 11 | Global Delivery | Journey → *Delivering Health. Delivering Hope.* |
| 12 | Why ASLE | Calm close — 5 values, minimal motion |

## Design principles

- **Motion hierarchy** — micro-particles → parallax → scale/fade → horizontal
  scroll. Big moves are reserved for key beats; the site is never "all moving".
- **Scroll rhythm** — MOVE → STOP → REVEAL, with a deliberately calm finish.
- **Accessibility** — full `prefers-reduced-motion` support: Lenis and all
  transform-heavy scenes are disabled and content renders statically, so no
  information is lost.
- **Performance** — static prerender, transform/opacity-only animation,
  `will-change` hints, and `IntersectionObserver` for the progress rail.
- **Content integrity** — only ASLE's stated facts are used (Third-Party /
  OEM manufacturing, drop shipping, global export, GMP-WHO, US-FDA, No MOQ,
  Jaipur, India). No fabricated statistics, certifications, countries or SKUs.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Docker (auto-start)

A production image (Next.js **standalone** output) with an auto-restart
container is provided. The host port is the first free 3000-range port found at
setup time (**3000**); override it with `HOST_PORT`.

```bash
docker compose up -d --build     # build + start in the background
# open http://localhost:3000

HOST_PORT=3005 docker compose up -d --build   # use a different host port
docker compose logs -f           # tail logs
docker compose down              # stop & remove
```

- `restart: unless-stopped` — the container starts automatically on Docker
  daemon boot and after a crash, until you explicitly stop it.
- The container listens on `3000` internally (`PORT` / `HOSTNAME=0.0.0.0`);
  compose maps `${HOST_PORT:-3000}` → `3000`.
- A `healthcheck` polls the app so orchestration can see readiness.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build (static prerender)
npm start          # serve the production build
npm run lint       # eslint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
```

## Project layout

```
app/
  layout.tsx        # metadata / SEO, fonts, root
  page.tsx          # scene composition
  globals.css       # theme tokens, Lenis + reduced-motion styles
components/
  Navigation.tsx  ScrollProgress.tsx  Footer.tsx
  HeroScene.tsx  CapsuleScene.tsx  IngredientScene.tsx  HumanScene.tsx
  TherapeuticAreasScene.tsx  ProductsScene.tsx  QualityScene.tsx
  RnDScene.tsx  GlobalScene.tsx  ManufacturingScene.tsx  DeliveryScene.tsx
  FinalValues.tsx  MotionText.tsx  ParallaxLayer.tsx
  visuals/          # Capsule / Molecule / HumanSilhouette SVGs
lib/
  SmoothScroll.tsx  gsap.ts  useReducedMotion.ts  sections.ts
```
