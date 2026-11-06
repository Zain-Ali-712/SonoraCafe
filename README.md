# Sonora Community Café: website (home page)

```
frontend/   Next.js 16 app. Home page + coming-soon routes (/menu, /happenings, /the-wall, /visit, /order, /cinema)
research/   Sourced facts (scraped-data.md), raw IG media, contact sheets, clip segment lists
PLAN.md     Enhanced brief, tokens and section-by-section plan
```

## Run

```bash
cd frontend
npm install
npm run dev
```

Stack: Next.js 16 (App Router, Turbopack, Cache Components), Tailwind v4, GSAP and ScrollTrigger, Lenis, Motion, lucide-react.
Frontend only, with no backend. Pinned notes and the torn ticket live in the visitor's browser only.

## Media

- `public/video/reel-*.mp4` are seamless crossfade montages. `clip-*.mp4` are boomerang single-shot loops. All are cut from Sonora's own reels and creator reels about Sonora: re-cropped to remove caption overlays, slowed about 2.8× with motion-interpolated frames, and muted.
- `public/img/` holds Sonora's own event posters plus stills pulled from the reels.
- The logo in `lib/logo-paths.ts` is traced from Sonora's reel end card.

Every fact on the page is sourced in `research/scraped-data.md`. Foodpanda blocked automated access, so menu prices come from Sonora's printed Winter Specials card and dated creator posts.

## Deploy

Live at https://sonora-cafe.vercel.app. The Vercel project `sonora-cafe` is connected to this GitHub repo with Root Directory `frontend`, so every push to `main` deploys to production. For a manual deploy, run `vercel deploy --prod` from the repo root (not from `frontend/`, since the root directory is already applied).
