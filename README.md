# Psdfolio Festival Greetings

A lightweight, responsive one-page greeting for Diwali and Bandi Chhor Divas from Psdfolio founder Pavit Singh. Both celebrations share one editorial page, with dedicated story sections and distinct generated WebP imagery.

## Run locally

```sh
npm start
```

Open <http://localhost:3000>. The dependency-free Node.js server supports Brotli/gzip for text assets and long-lived caching for the WebP images.

## Build for Vercel

```sh
npm ci
npm run build
```

The build copies the static site into `dist/`. There are no frontend runtime dependencies or remote image/font requests.
