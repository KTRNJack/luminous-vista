# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

白光流域 Luminous Vista — a static website for a spiritual healing / tarot business. Deployed to Netlify at `https://luminous-vista.netlify.app/`. No build step, no package manager, no framework — all files are plain HTML/CSS/JS.

## Development

Open any `.html` file directly in a browser, or use a local static server:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

There is no linting, no test suite, and no CI pipeline.

## Architecture

### Shared UI Injection (`assets/js/components.js`)

Every page includes `components.js`, which runs on `DOMContentLoaded` and replaces placeholder `<div>` elements with dynamically built HTML:

| Placeholder element          | What gets injected              |
|------------------------------|---------------------------------|
| `<div id="navbar-placeholder">` | Full `<nav>` with active-page detection |
| `<div id="footer-placeholder">` | `<footer>` with nav links and social icons |
| `<div id="reviews-placeholder">` | Review cards from `REVIEWS_DATA` |

It also injects a loading screen (`#lvLoading`) at `body` start and a back-to-top button at `body` end.

The page registry (`PAGES` / `PRODUCT_PAGES` arrays at the top of `components.js`) controls which pages appear in the navbar and dropdown. Update those arrays when adding pages.

**Note:** `assets/js/script.js` is an older file with duplicate star/navbar/reveal logic — `components.js` is authoritative. New pages should only load `components.js`.

### Review Data (`assets/js/data/reviews.js`)

Exports a global `REVIEWS_DATA` array. Pages that need reviews must load `reviews.js` before `components.js`. The `buildReviews()` function in `components.js` renders cards from this array.

### Scroll Reveal

Any element with class `reveal` is automatically animated in by an `IntersectionObserver` in `components.js`. The observer adds the `visible` class when the element enters the viewport; CSS handles the transition.

### Star Canvas Animation

The hero star field is a `<canvas id="starCanvas">` element. For pages that need a star canvas with a different ID, call `window.LV.initStars('canvasId')` after `components.js` loads.

### Design System (CSS Variables in `assets/css/style.css`)

All color, spacing, typography, and shadow values are CSS custom properties defined in `:root`. Key tokens:

- Colors: `--clr-bg`, `--clr-accent` (#8a6830 warm gold-brown), `--clr-gold`, `--clr-text` (#2e2640 deep navy-purple)
- Fonts: `--font-serif` (Noto Serif TC), `--font-sans` (Noto Sans TC) — loaded from Google Fonts CDN
- Icons: Font Awesome 6.5.1 (CDN)
- Utility: `.container`, `.section`, `.section__header`, `.reveal`

### Adding a New Page

1. Copy the `<head>` boilerplate from an existing page (update `<title>`, `<meta>`, canonical URL, OG tags).
2. Place `<div id="navbar-placeholder"></div>` as the first child of `<body>`.
3. Place `<div id="footer-placeholder"></div>` before the closing `</body>`.
4. Load scripts in this order at the bottom of `<body>`:
   ```html
   <script src="assets/js/data/reviews.js"></script>  <!-- only if page shows reviews -->
   <script src="assets/js/components.js"></script>
   ```
5. Add the page to the `PAGES` (or `PRODUCT_PAGES`) array in `components.js` so it appears in the navbar.
6. Add a `<url>` entry to `sitemap.xml`.

## Pending Placeholders

These values in the source need to be replaced with real credentials before going live:

- `G-XXXXXXXXXX` — Google Analytics 4 Measurement ID (appears in every HTML file's `<head>`)
- `YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE` — GSC verification meta tag (`index.html`)
- `KTRNJack` — GitHub username in `sitemap.xml` canonical URLs (already correctly set in HTML `<link rel="canonical">`)
