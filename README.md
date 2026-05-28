# N7 — The new foundation of modern banking

A single-page marketing site for **N7 / CB7**, a modern banking platform. Built with React 19, Vite 8, TypeScript, Tailwind v4, and Motion (Framer Motion v12). The page tells the product story across nine scroll-snapped sections, each with its own hand-tuned entrance, hover and micro-interaction animations, plus a fixed glassy navbar that tracks the active section in real time.

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`, `@theme` tokens in CSS) |
| Animation | `motion/react` (Motion v12) — replaces `framer-motion` |
| Icons | `lucide-react` |
| Font | Archivo (Google Fonts) |

---

## Getting started

```bash
npm install
npm run dev          # vite dev server
npm run build        # tsc -b && vite build
npm run preview      # serve the production build
npm run lint         # eslint .
```

The dev server runs on the default Vite port (5173 unless overridden).

---

## Project structure

```
n7-/
├── index.html                       # Google Fonts (Archivo) loaded here
├── public/                          # Static assets, served at site root
│   ├── BannerThings/                # Marquee assets (N7.png, CB7.png, bannerStar.png)
│   ├── companiesVectors/            # Trusted-by logos
│   ├── Dasboards/                   # Laptop dashboard screenshots (Frame 90, Frame 98)
│   ├── Iphones/                     # iPhone mockup screens for the LightShowcase section
│   ├── SolutionsVectors/            # Per-solution icons
│   ├── CB7.png, CB7full.png, N7.png # Brand watermarks
│   ├── Transistion.png              # Featured-article / case-study artwork
│   ├── hero.png, heroside1.png, heroside2.png
│   └── favicon.svg
└── src/
    ├── App.tsx                      # Composition root — wires sections + modal state
    ├── index.css                    # Tailwind v4 @theme tokens + global styles
    └── components/
        ├── layout/
        │   ├── FixedNavbar.tsx      # Glass nav with dropdowns + active-section tracking
        │   ├── Footer.tsx           # Three-column link footer with scroll-on-click
        │   ├── DemoBox.tsx          # "Request Demo" modal
        │   ├── ScrollToTop.tsx      # Floating back-to-top button with scroll-progress ring
        │   └── Toast.tsx            # Bottom-right toast notification
        ├── n7-portfolio/
        │   ├── HeroSection.tsx
        │   ├── SolutionsSection.tsx
        │   ├── SystemSection.tsx
        │   ├── BannerSection.tsx    # CtaBanner + CtaLightBanner
        │   ├── PartnerBar.tsx
        │   ├── LightShowcaseSection.tsx
        │   ├── CoreInsights.tsx
        │   └── CaseStudies.tsx
        └── constants/
            └── sectionData.tsx      # Solutions + case-study seed data
```

---

## Features

### Global navigation

- **Fixed glass navbar** ([FixedNavbar.tsx](src/components/layout/FixedNavbar.tsx)) — pill-shaped, blurred background, scrolls with the page but stays pinned to the top.
- **Real dropdown menus** for **Solutions** (Solutions Overview, Core Banking, Digital Banking, Case Studies) and **Resources** (Insights, Partners).
- **Active section underline** — an `IntersectionObserver` watches every section id; the matching nav item gets a cyan underline that *slides* between items using Motion's `layoutId`.
- **Click-outside-to-close** on open dropdowns.
- **Chevron rotates 180°** when its dropdown opens.
- **Toast on every navigation** — `"Jumping to <section>"` fires through the shared toast system.
- **Mobile hamburger menu** mirrors the desktop structure with the same active-state highlighting.

### Smooth scrolling

- `html { scroll-behavior: smooth }` in [index.css](src/index.css) so both anchor jumps and `scrollIntoView` animate.
- `scroll-margin-top: 96px` on every tracked section id so the fixed navbar never covers the heading after a jump.

### Hero section ([HeroSection.tsx](src/components/n7-portfolio/HeroSection.tsx))

- Two-column layout — copy + CTAs on the left, layered hero artwork on the right.
- **Inline-SVG trusted-by logos** (SHELLS, SmartFinder, Zoomerr, ArtVenue, kontrastr, WAVESMARATHON) — no external image dependencies.
- **Interactive modals** triggered from the hero:
  - **Fund Transfer** — recipient + amount form with balance validation, updates the in-memory account state and prepends the transaction list.
  - **Add Money** — instant deposit form that credits the balance.
  - **More** — account-management overlay with live stat widgets.
  - **Demo / Contact** — captures an email and fires the parent `onRequestDemo` / `onStartNow` callbacks.
- **Floating staggered entrance** for the headline, body, CTAs and trust row.

### Solutions section ([SolutionsSection.tsx](src/components/n7-portfolio/SolutionsSection.tsx))

- Five solution cards driven by [sectionData.tsx](src/components/constants/sectionData.tsx) — each gets its own icon from `/public/SolutionsVectors/`.
- **`NBFC` tag** rendered top-right on cards that opt in via the data file (currently Loan Origination + Loan Management).
- **Subtle card hover** — card lifts `y: -6`, faint white background tint, icon scales `1.1`, "Learn More" text turns white.

### Core banking showcase ([SystemSection.tsx](src/components/n7-portfolio/SystemSection.tsx))

- Two alternating rows: copy on one side, **laptop mockup** on the other.
- **Continuous float** animation on each laptop (offset 1.5s so they're not in sync), 3D tilt on hover, blue glow shadow grows on hover.
- **Pulsing neon baseline** under each laptop for a "powered-on" feel.
- **Breathing CB7 watermark** as the section background (opacity 0.04 → 0.08 over 9s).
- **Feature checklist** with hover-driven scale + glow on each check badge, and a smooth `translate-x` on hover.
- **Learn More** button uses an underline that grows from the left on hover, plus arrow that nudges further right.
- **Built-in toast notifier** at the section level for any feature-bullet or CTA click.

### CTA banners ([BannerSection.tsx](src/components/n7-portfolio/BannerSection.tsx))

- Two exports: `CtaBanner` and `CtaLightBanner` (light variant currently delegates to `CtaBanner`).
- **`background?: 'CB7' | 'N7'` prop** toggles a faded brand watermark behind the content; absent prop = no watermark.
- **Rounded inset card** (`rounded-3xl mx-4 md:mx-6 lg:mx-8`) so the banner reads as a contained card rather than a full-bleed strip.

### Partner marquee ([PartnerBar.tsx](src/components/n7-portfolio/PartnerBar.tsx))

- Infinite-scrolling marquee.
- Alternates **N7 / CB7 brand mark images** (from `/public/BannerThings/`) with the tagline `Say 👋 to the new way of banking`.
- Star separator between every item.

### Digital banking showcase ([LightShowcaseSection.tsx](src/components/n7-portfolio/LightShowcaseSection.tsx))

- Light-themed section with three alternating rows.
- **iPhone mockups** from `/public/Iphones/` — each phone *floats* with a per-row staggered loop.
- **Ambient glow** behind each phone, intensifies on hover.
- **CSS-only fallback dashboards** drawn inside the phone bezel if the local PNG fails to load — keeps the layout solid in any environment.
- **N7 watermark** faded behind the first row only.

### Insights ([CoreInsights.tsx](src/components/n7-portfolio/CoreInsights.tsx))

- One **featured article card** (image + content) plus two smaller cards.
- **`background?: 'CB7' | 'N7'` prop** toggles a faded brand watermark behind the section.
- **"Read All Insights" modal** — opens a centered grid of every article with a thumbnail, tag, byline and chevron-on-hover. Backdrop click and X close it. Selecting a card closes the modal and calls `onReadArticle`.

### Case studies ([CaseStudies.tsx](src/components/n7-portfolio/CaseStudies.tsx))

- **Peek carousel** — every case study is absolutely positioned in the same stack. The active one is centered at full scale; the previous and next sit at `x: ±8%`, `scale: 0.92`, `opacity: 0.35`, with a 2px blur (the "peek" effect).
- **Wraparound** — clicking next from the last item peeks the first; clicking prev from the first peeks the last.
- **Prev / Next / dots** controls with active-dot widening to `w-10` and turning cyan.
- **`View All` modal** — mirrors the Insights modal pattern: grid of every case study, click one to jump the carousel to that index and close the modal.
- **Read More** uses an outlined pill button matching the featured-card design language.

### Footer ([Footer.tsx](src/components/layout/Footer.tsx))

- **Giant gradient `N7`** type with a sweeping `moving-shadow` overlay (CSS keyframes).
- **Three address cards** (London, Dubai, Pune).
- **Three link columns** — every link is functional:
  - Each entry is `{ label, target }`; clicking it scrolls to `#<target>` and fires a toast with the label.
  - Items with no dedicated section (Contact, Careers, Company, etc.) point at `#about` (the footer itself); the toast still names the click so context isn't lost.
  - The `Our Socials` column targets `'social'`, which skips scrolling and fires an `Opening <label>` toast instead.
- **Hover state** — arrow icon slides in from the left, text turns cyan.
- **Responsive layout** — single-column stack on mobile, two-column at `sm`, full three-column + side-by-side `N7` block at `lg`. The giant `N7` scales `140px → 220px → 360px` across breakpoints; padding, gaps, and text sizes step up at `sm`/`lg` to match.
- **Copyright line** centered under a hairline divider at the bottom.

### Toast & Demo modal

- **`Toast`** — bottom-right notification, auto-dismisses after 3.5s. Driven from `App.tsx` via `triggerToast(message)`.
- **`DemoBox`** — controlled modal opened by any "Request Demo" CTA across the page.

### Scroll-to-top button ([ScrollToTop.tsx](src/components/layout/ScrollToTop.tsx))

> Reused from my personal portfolio site — same component, dropped in here as the page got long.

- **Floating circular button** pinned bottom-right; appears only after the user scrolls past 500px.
- **Animated scroll-progress ring** drawn around the button using Motion's `useScroll().scrollYProgress` mapped to an SVG circle's `pathLength`. The ring fills as you scroll down, so the user can see how far through the page they are at a glance.
- **`isDark` prop** toggles between a dark pill (white arrow on `zinc-900`) and a light pill (dark arrow on white). Currently set to `true` for this dark-themed site.
- **Smooth scroll** to top on click via `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- **Arrow nudge** — the `ArrowUp` icon lifts on hover (`group-hover:-translate-y-1`).
- Fades in / out via `AnimatePresence` so it doesn't pop suddenly when crossing the 500px threshold.

### Theming & tokens

All brand colors and the font are defined as CSS custom properties inside an `@theme { … }` block in [index.css](src/index.css), making them available to both Tailwind utilities (e.g. `text-primary`, `bg-bg`) and raw CSS:

```css
@theme {
  --color-bg:           #000D12;
  --color-primary:      #00B4FD;
  --color-primary-dark: #003ACE;
  --color-cyan:         #5BC2E7;
  --font-sans:          'Archivo', system-ui, sans-serif;
}
```

**Typography** — Archivo is loaded once from Google Fonts in [index.html](index.html); the rest of the codebase just references `var(--font-sans)`.

---

## Section IDs (for deep links)

Every navigable section is wrapped in App.tsx with an `id`:

| ID | Section |
|---|---|
| `home` | Hero |
| `solutions` | Solutions cards |
| `core-banking` | System / cloud banking |
| `partners` | Partner marquee |
| `digital-banking` | Light showcase (phones) |
| `insights` | Core insights |
| `case-studies` | Case study carousel |
| `about` | Footer |

Use them anywhere as `#solutions`, `#case-studies`, etc.

---

## Conventions

- **No `framer-motion` imports.** Use `motion/react` instead — the project has standardized on the new Motion v12 package.
- **Tailwind arbitrary values are fine** when no token exists, but check the `@theme` block first — `text-primary` is preferred over `text-[#00B4FD]`.
- **All public assets are referenced from `/`**, not `/public/`. Vite serves the `public/` directory at the site root, so `<img src="/CB7.png" />` is correct.
- **Filenames with spaces or parentheses** (e.g. `Vector (1).png`, `Frame 90.png`) must be wrapped with `encodeURI()` at the image src.

---

## Adding a new section

1. Build the component under `src/components/n7-portfolio/`.
2. Import and render it in `App.tsx`, wrapped in `<div id="<your-id>">…</div>`.
3. Add the new id to the `scroll-margin-top` rule in [index.css](src/index.css) so the fixed navbar doesn't cover it after a jump.
4. (Optional) Add a link to it in [FixedNavbar.tsx](src/components/layout/FixedNavbar.tsx)'s `navGroups` array — the IntersectionObserver will pick it up automatically as long as the id is in `allTrackedIds`.
