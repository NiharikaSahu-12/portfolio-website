# Niharika Sahu — Portfolio

A personal portfolio for a frontend developer: one long editorial-style page
built with **React + Vite**, styled with **Tailwind CSS** and animated with
**Framer Motion**.

**Live:** [niharikasahu-12.github.io/portfolio-website](https://niharikasahu-12.github.io/portfolio-website/)

---

## What is on the page

| # | Section | Purpose |
|---|---------|---------|
| — | **Hero** | Status, name, typewriter roles, CTAs, quick stats, portrait, tech ticker |
| — | **Highlights** | Five figures, counted up on scroll, derived from real data |
| 01 | **About** | Bio, pull quote, "spec sheet" facts, three craft principles |
| 02 | **Services** | Four offerings with concrete deliverables |
| 03 | **Experience** | Timeline of roles with logos and responsibilities |
| 04 | **Work** | Projects, filterable by technology |
| 05 | **Skills** | Four categories + a "currently learning" note |
| 06 | **Process** | The four phases of a typical engagement |
| 07 | **Contact** | Validated form, direct contact rows, "what happens next" |
| — | **Footer** | Closing CTA, sitemap, live local-time clock |

## Features

### Interaction
- **⌘K / Ctrl+K command palette** — fuzzy search over sections and actions
  (copy email, write an email, résumé, GitHub, LinkedIn) with arrow-key
  navigation, a focus trap and focus restoration on close.
- **Reading progress** bar in the navbar, plus a fixed **section rail** with
  hover labels from `xl` up.
- **Back-to-top button** with a circular scroll-progress ring.
- **Tech filtering** on the work section — chips and counts are derived from the
  project data, never hand-maintained.
- **Copy-to-clipboard** with inline confirmation (hero, contact, footer, palette).
- Mobile drawer with scroll lock, Escape-to-close and staggered links.
- Every animation respects `prefers-reduced-motion`, including the typewriter.

### Correctness & robustness
- **Contact form validation** with per-field messages, `aria-invalid` /
  `aria-describedby` wiring and focus moved to the first invalid field.
- **Honeypot field** to absorb basic bots.
- **EmailJS fallback**: if the `VITE_EMAILJS_*` variables are missing the form
  opens a pre-filled `mailto:` instead of failing silently.
- **Error boundary** around the app, so a render error shows a usable page.
- **Print stylesheet** — decorative chrome is hidden and sections avoid breaking
  across pages.

### Content architecture
- All copy lives in `src/data/profile.js` (identity) and `src/data/content.js`
  (projects, skills, services, process, experience).
- Derived numbers are computed, not typed: years of experience come from a start
  date, skill counts from the skills array, filter chips from the projects.
- Design tokens are raw RGB channels in `src/index.css`, referenced from
  `tailwind.config.js`, so the whole palette is swappable in one place.

### SEO & accessibility
- Canonical URL, Open Graph + Twitter cards, `Person` JSON-LD, `noscript`
  fallback content, and `lang`/`theme-color`/`color-scheme` meta.
- Semantic landmarks, a skip link, described-if-needed labels on all icon
  buttons, `aria-live` regions for copy confirmations and filter results, and
  visible focus rings throughout.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 (token-driven, CSS variables) |
| Animation | Framer Motion 11 |
| Icons | `react-icons` (Font Awesome, Simple Icons, Lucide) + `@remixicon/react` |
| Forms | `emailjs-com` + `notiflix` toasts |

## Getting started

```bash
git clone https://github.com/NiharikaSahu-12/portfolio-website.git
cd portfolio-website
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run lint       # ESLint (JS + JSX)
npm run build      # production bundle in dist/
npm run preview    # serve the built bundle locally
npm run deploy     # build + publish to GitHub Pages
```

### Environment variables

The contact form needs three EmailJS values. Copy `.env.example` to `.env`:

```bash
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

If they are missing the page still works — the form falls back to opening the
visitor's mail client with the message pre-filled, and the UI says so.

> Deployment note: `vite.config.js` sets `base` to `/portfolio-website/` when
> `NODE_ENV=production` **and** `DEPLOY_PLATFORM=github` (what `npm run deploy`
> does). Leave those unset for Netlify/Vercel-style root deployments.

## Project structure

```
src/
├─ Components/
│  ├─ Navbar/ Home/ Highlights/ About/ Services/ Experience/
│  ├─ Projects/  Skills/ Process/ Contact/ Footer/
│  ├─ TextChange.jsx            # typewriter, reduced-motion aware
│  └─ ui/                       # shared primitives
│     ├─ SectionHeading.jsx     # editorial masthead (folio, title, meta)
│     ├─ Reveal.jsx             # scroll reveal wrapper
│     ├─ Marquee.jsx            # reusable infinite ticker
│     ├─ CopyButton.jsx         # copy + inline confirmation
│     ├─ CommandPalette.jsx     # ⌘K palette
│     ├─ ScrollToTop.jsx        # FAB with progress ring
│     ├─ SectionRail.jsx        # fixed section indicator (xl+)
│     └─ ErrorBoundary.jsx      # last-resort fallback UI
├─ data/
│  ├─ profile.js                # identity, contact, about copy, principles, nav
│  └─ content.js                # projects, skills, services, process, experience
├─ hooks/
│  ├─ useScrollSpy.js           # active section, scroll progress, scrolled flag
│  ├─ useGlobalShortcut.js      # key bindings + focus trap
│  ├─ useCopyToClipboard.js
│  ├─ useLockBodyScroll.js
│  └─ useLocalTime.js
├─ lib/
│  ├─ scroll.js                 # hash navigation without history spam
│  └─ platform.js               # ⌘ vs Ctrl labels
├─ index.css                    # design tokens + component classes + print styles
├─ App.jsx
└─ main.jsx
```

## Where to edit things

| I want to change… | Edit |
|---|---|
| Name, role, email, location, status pill | `src/data/profile.js` → `profile` |
| GitHub / LinkedIn URLs | `src/data/profile.js` → `socials` |
| Nav labels or order | `src/data/profile.js` → `navLinks`, `primaryNavIds` |
| Bio paragraphs, pull quote | `src/data/profile.js` → `about` |
| The three craft principles | `src/data/profile.js` → `principles` |
| Hero typewriter roles | `src/data/profile.js` → `roles` |
| Projects (and their filter tags) | `src/data/content.js` → `projects` + `techTags` |
| Skills, categories, "currently learning" | `src/data/content.js` → `skillCategories`, `learningNow` |
| Services and process steps | `src/data/content.js` → `services`, `processSteps` |
| Colours, type scale, shadows, animation | `src/index.css` (`:root`) + `tailwind.config.js` |
| Résumé link (currently `null`, so no dead button) | `src/data/profile.js` → `profile.resumeUrl` |

## Accessibility, performance & SEO notes

- **Reduced motion** is handled in three places: a global `@media
  (prefers-reduced-motion: reduce)` block, `useReducedMotion()` inside the
  animated components, and a CSS override that kills transitions.
- **Images** are lazy-loaded below the fold with explicit `width`/`height` and
  `decoding="async"`, so nothing shifts as the page loads.
- **Keyboard**: skip link, visible focus rings, Escape closes the drawer and
  palette, Tab is trapped inside the palette and focus returns to the trigger.
- **SEO**: canonical URL, Open Graph/Twitter description, and `Person` JSON-LD
  listing `knowsAbout` technologies.
- **Print**: `data-print="hide"` marks on-screen-only chrome; sections are kept
  from breaking mid-way.

## Known limitations / next steps

- **No dark theme yet.** The groundwork is deliberately in place — every colour
  resolves to a CSS variable, so a theme would be a `:root` override plus a
  toggle. It was left out of this pass because the page mixes light bands with
  dark "forest" bands; doing it properly means separating surface colours
  (`bg-cream`) from text-on-dark colours (`text-cream`) first, otherwise the
  toggle would be broken in one theme or the other.
- **Social share image is missing.** Add a 1200×630 PNG and wire up the
  `og:image` / `twitter:image` tags marked with a TODO in `index.html`.
- **No testimonials or case studies** — nothing here is invented, so those
  sections are absent rather than filled with placeholder praise.
- **No tests yet.** Vitest + React Testing Library would be the next step,
  starting with the contact-form validation rules and the palette's filtering.

## Credits

Type: [Fraunces](https://fonts.google.com/specimen/Fraunces),
[Manrope](https://fonts.google.com/specimen/Manrope) and
[IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono), served by
Google Fonts.
