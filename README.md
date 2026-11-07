# Psdfolio Festival Greetings

A lightweight, responsive, three-page greeting site with a home page plus dedicated Diwali and Bandi Chhor Divas greetings, signed by Psdfolio founder Pavit Singh. Large festival photography carries the title directly on image; mobile navigation uses normal vertical pages rather than a horizontal slider.

## Run locally

```sh
npm start
```

Open <http://localhost:3000>. The dependency-free Node.js server supports Brotli/gzip for text assets and long-lived browser caching for the locally generated WebP images.

## Build for Vercel

```sh
npm ci
npm run build
```

The build copies the static site into `dist/`. There are no runtime frontend dependencies or remote image/font requests.
