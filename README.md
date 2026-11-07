# Psdfolio Festival Greetings

A lightweight, responsive one-page greeting for Diwali and Bandi Chhor Divas from Psdfolio founder Pavit Singh. Both celebrations share one editorial page, with dedicated story sections and distinct generated WebP imagery.

Design refresh: Instrument Serif display type + Inter body, deep-navy `#1B133C` ink, a floating glass navigation pill, rounded soft-shadow buttons, and the Psdfolio circle mark as the site logo and favicon.

## Structure

- `public/` — the festival greeting site (served at `/` locally and on the psdfolio Vercel project).
- `axon/` — a separate Axon hero landing page (self-contained: `index.html`, `index.css`, `images/`). It is **not** part of this site's build and deploys only to its own Vercel project (`rootDirectory: axon`).

## Run locally

```sh
npm start
```

Open <http://localhost:3000>. The dependency-free Node.js server supports Brotli/gzip for text assets and long-lived caching for images. Google Fonts (Instrument Serif + Inter) load remotely.

## Build for Vercel

```sh
npm ci
npm run build
```

The build copies the static site into `dist/`. There are no frontend runtime dependencies beyond the Google Fonts request.
