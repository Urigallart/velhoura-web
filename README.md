# Velhoura

The studio site. Next.js 16 (App Router, Turbopack), React 19, Tailwind v4,
`motion` for anything scroll- or spring-driven, `three` + `@react-three/fiber`
for the hero globe, and Resend for the contact form.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Copy `.env.example` to `.env.local` and add a `RESEND_API_KEY` (free at
[resend.com](https://resend.com)) or the contact form will return a clear 500
instead of sending. The same variable has to exist in Vercel under Project
Settings → Environment Variables.

---

## Where things live

```
src/
  app/                     routes, metadata, the contact API
    opengraph-image.tsx    the social card, generated at build time
  components/
    3d/                    the hero globe (client-only, code-split)
    sections/              one file per band of the home page
    ui/                    the design system's moving parts
    visual/                artwork: the armature, the backdrop, the glyphs
  data/                    every editable string and number on the site
  lib/                     the shared observer, the modal channel, `cn`
```

**`src/data/` is the content layer.** Adding a product to `products.ts` adds a
card to the home page, a static route at `/products/<slug>`, an entry in the
sitemap and a figure to the studio's stat row. Nothing downstream is hardcoded
to a fixed count. The same is true of `plans.ts`, `process.ts` and `team.ts`.

## The design system

`src/app/globals.css` is the whole thing: one palette, one type scale, one
motion language.

- **Colour.** Ink on paper with exactly one accent — `--ember`, the signal
  blue. The accent is rationed: roughly once per screen, and never twice for
  the same reason. `--paper-off` is the alternate section ground that gives a
  long page its rhythm; `--patina` exists only for a live status dot.
- **Type.** Geist Sans for display and text, Geist Mono for every index, unit
  and status. Hierarchy comes from the scale, not from a second family.
  Wrapping a word in asterisks inside a `MaskedTitle` marks it as emphasised —
  `lines={["Two people.", "*No handoffs.*"]}` — and `.t-em` decides what that
  looks like, currently nothing.
- **Motion.** Three easing curves (`--e-out`, `--e-io`, `--e-spring`) and one
  rule: only `opacity`, `transform`, `clip-path` and `filter` ever animate.

### Reveals

One IntersectionObserver serves the entire page (`lib/observe.ts`). An element
reveals by carrying `data-reveal="rise|lift|wipe|blur|fade"`; the observer flips
`data-shown` and CSS does the rest. `<Reveal>` is the ergonomic wrapper.

`prefers-reduced-motion` is honoured centrally in `globals.css` — every
animated element resolves to its finished state — and a `<noscript>` block in
the root layout does the same when JavaScript never arrives. A reveal must
never be the reason content is missing.

## Notes for whoever picks this up next

- **`site.url` still needs a decision.** It currently points at
  `velhoura.com`, which is also the eyewear brand's shop in `products.ts`, so
  the "Visitar Velhoura" button on that product page links back to this site.
  One of the two needs its own domain.
- **The legal pages are scaffolding.** `/legal/[doc]` renders placeholders, not
  valid documents. They need real text before launch.
- **Social links are empty on purpose.** `contact.socials` entries with an
  empty `href` are filtered out rather than shipped as dead `#` links — fill
  one in and it appears in the footer and the contact section on its own.
- **The social card uses the runtime's default sans**, not Geist. Fetching a
  font at build time would make a deploy able to fail over an image; drop a
  static Geist `.ttf` into `assets/` and pass it to `ImageResponse` if
  brand-exact type there is worth the extra weight.
- **The globe's numbers live in `3d/scene-config.ts`.** They used to live in a
  Theatre.js sheet, which shipped an animation runtime to every visitor to hold
  nine constants. If the visual scrubbing panel is ever actually wanted, put it
  back behind the same `useHeroSceneValues()` signature.
