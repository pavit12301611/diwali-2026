# Axon — Digital Workers for Mundane Workflows

A single-page, full-viewport hero landing page for **Axon**, a platform that deploys digital workers for mundane workflows. Looping background video, glassy navigation pill, Instrument Serif display type and Inter body type over a deep-navy (`#1B133C`) palette. The Psdfolio circle mark ships as the site logo and favicon.

The previous Diwali / Bandi Chhor Divas greeting is preserved untouched at [`/greetings/`](public/greetings/index.html).

## Structure

- `public/index.html` — the Axon hero (nav pill, YC badge, headline, subtitle, CTA, background video). No other sections or pages.
- `public/index.css` — base reset (`body { font-family: 'Inter', sans-serif; color: #1B133C; }`) plus a hand-rolled utility layer that implements the Tailwind-style class names used in the markup (arbitrary values, `sm:`/`md:`/`lg:` and `hover:` variants included), the video scrim, and the logo-inspired floating glow dots.
- `public/images/axon-logo.png` — site logo / favicon / og:image.
- `public/greetings/` — the earlier festival greeting page and its assets (`/styles.css`, `/app.js`, `/images/*.webp`).

Fonts (Instrument Serif regular + italic, Inter 400/500/600) load from Google Fonts and the hero background video streams from CloudFront; everything else is served locally with no frontend runtime dependencies.

## Run locally

```sh
npm start
```

Open <http://localhost:3000>. The dependency-free Node.js server supports Brotli/gzip for text assets and long-lived caching for images.

## Build for Vercel

```sh
npm ci
npm run build
```

The build copies the static site into `dist/`.
