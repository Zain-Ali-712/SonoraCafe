# Sonora: home page plan

## 1. Enhanced brief

Build the home page of **Sonora Community Café** (Gulberg III, Lahore; IG @drinksonora) as a frontend-only Next.js site.
Every other route shows only a branded "coming soon" message.

- **Truth first.** All copy, prices, dates, hours and the address come from Sonora's own Instagram, its creator coverage and its menu card (see `research/scraped-data.md`). No invented reviews, phone numbers or menu items.
- **Their media, their vibe.** The page is built around Sonora's real reels: the blue glass-block bar, the sticky-note cup wall, the backlit leaf arch, Sunday jam and paint sessions, the private cinema. Clips are re-cut without the creator text overlays, slowed about 2.3× with motion-interpolated frames, colour-lifted, and looped seamlessly (crossfade or boomerang). Every clip plays muted, inline, in arch frames.
- **Brand system from what we saw.** Cream crumpled-paper posters with sage botanicals, the periwinkle "sonora." brush wordmark plus Urdu سونورا, raspberry menu cards, red line-art cups, terrazzo, neon sticky notes, and the white curved arch façade. The **arch** is the site's signature shape.
- **Modern, but not a template.** It must not look like the reference Framer sites or our previous builds (NoFilter, Doubleshot, Tamp & Tide, Muffin House, portfolio). We keep their craft (GSAP scroll scenes, Lenis, Motion, careful type), but use new fonts, new interactions and a new story.
- **Story: day to night.** Sonora is open 8 AM to 1 AM, so the page scrolls from a bright, beachy morning (cream paper) into a late-night, glass-block-glow indigo (jams, cinema, 40% off till 12:30 AM). The hero also reads the real Lahore time and says what is happening at Sonora right now.
- **Quality bar.** 60 fps (transform and opacity only, videos lazy-played via IntersectionObserver), reduced-motion fallbacks, keyboard and touch support, no layout shift, mobile-first down to 360 px.

## 2. Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · GSAP and ScrollTrigger (scroll scenes) · Lenis (smooth scroll) · Motion (gestures, drag, springs) · lucide-react (icons).
Fonts: **Bricolage Grotesque** (display), **Figtree** (body), **Gochi Hand** (marker notes, like their posters), **Noto Nastaliq Urdu** (سونورا). None of these were used in previous projects.

## 3. Tokens

| Token | Hex | From |
| --- | --- | --- |
| paper | #F4EFE6 | crumpled-paper posters |
| ink | #1E2147 | deep indigo ink |
| peri | #5A6BD0 | façade wordmark |
| lilac | #A9B0E8 | leaf wreath |
| berry | #C2185B | Winter Specials card |
| cup-red | #D3263F | cup line-art and decals |
| sage | #8E9B8B | poster botanicals |
| celadon | #9DC9C3 | plates |
| night | #0E1030 | late-night section |
| glow | #3D8BFF | glass-block bar |
| notes | #F6F06A, #FF7AB6, #FFA552, #B9F27C | sticky-note wall |

## 4. Page, section by section

0. **Arch loader.** A cream arch rises like the façade, the "sonora." mark and سونورا settle in, then the arch opens into the hero. Under 1.8 s, and only once per session.
1. **Nav.** Floating paper pill: logo, Menu / Happenings / The Wall / Visit (coming soon), a **live open-status chip** (Lahore time vs. 8 AM–1 AM), and an "Order" button. It hides on scroll down and shows on scroll up. On mobile, a full-screen arch menu.
2. **Hero: "Peek inside."**
   - The headline is their bio: *the community café everyone can call their own.* "their own" gets a hand-drawn marker underline.
   - There are three arch windows with ambient reels (the space, the wall, Sundays) on mouse-parallax depth layers.
   - The main arch sits behind **frosted glass blocks** (their bar). The cursor or finger **wipes the glass clear**, and it slowly frosts back.
   - **Draggable sticky notes** carry real captions. "+ Pin a note" lets visitors write their own (saved locally), like the real wall.
   - A **"Right now at Sonora"** line changes with Lahore time: morning 40% off, afternoon, evening jam and late-night 40% off, or closed.
3. **Ticker.** A raspberry band reading "coffee · conversations · & everything in between · سونورا", tilted, with velocity-reactive speed.
4. **Third space.** The founder's idea scroll-reveals word by word, flanked by two slow arch clips (brushes, guitar) drifting on scroll, with four facts: 8 AM–1 AM daily, Ghalib Road address, in-house kitchen, private cinema.
5. **The Wall.** "Every cup on this wall has a name." A CSS cubby grid in wood frames, mixing clips, stills, cups and sticky notes. Rows drift opposite ways on scroll, and hovering a cubby lifts it.
6. **Winter Specials.** A recreation of their raspberry menu card in marker type, with real prices. Hovering a row brings a cursor-following preview. Next to it, the espresso-pour clip sits in an arch. Below, "From the kitchen" cards show verified items and prices.
7. **Day to night.** The background scrubs from paper to night with scroll. "Sundays at Sonora." is a **poster deck** of their real posters that you swipe or drag to shuffle, beside the Sundays reel and a list of recurring happenings.
8. **The ticket.** "No discount card? No problem." The deal is 40% off the entire menu, 8–11 AM and 8 PM–12:30 AM, until 30 November. You drag the perforated stub to tear it off.
9. **Life around here.** A slow, endless film strip of arch reels on the glowing glass-block night background. Hovering one makes it bloom and dims the rest.
10. **What people say.** Creator quotes on draggable sticky notes, each with its @handle.
11. **Visit.** The façade clip in an arch, plus address, hours, live status, a directions link (Google Maps search), and Instagram.
12. **Footer.** A giant "sonora." wordmark that inks in on scroll, with سونورا, links and © 2026.

Other routes (`/menu`, `/happenings`, `/the-wall`, `/visit`, `/order`, `/cinema`) render only a coming-soon message with a way back home.

## 5. Assets

- `public/video/reel-*.mp4`: seamless crossfade montages (space, wall, sundays, table).
- `public/video/clip-*.mp4`: boomerang single-shot loops.
- `public/img/`: posters (Sonora's own posts), stills pulled from the reels, and the logo keyed from the reel end card.
