# Subham Eye Clinic: website

The website of Subham Eye Clinic, Jamnagar (Dr. Rajeev Shah, MBBS, DOMS). It is in English first (`/`), with Gujarati under `/gu/` (Dr. Shah's choice, 2026-11-25; old `/en/` addresses redirect via `public/_redirects`).

React 19 and Vite. Every page is **pre-rendered to static HTML** at build time, so search engines and slow phones get the full content without JavaScript. React then hydrates the page for the live open/closed status and the interactive eye drawing.

## Live
- Production: https://subhameyeclinic.pages.dev/ (Cloudflare Pages project `subhameyeclinic`), deployed with `scripts/deploy.sh`
- Staging (noindex): https://aryanshah0.github.io/subham-eye-clinic/, deployed with `scripts/deploy-staging.sh`
- `public/_headers`: noindex on per-deployment copies, one-year cache for /assets/*, security headers
- Every production deploy is built from `main`; staging (`gh-pages`) is rebuilt by its script. Check that staging serves the new build before testing: GitHub Pages builds sometimes fail silently.

## Commands
```bash
npm install
npm run dev        # local development (http://127.0.0.1:5190)
npm run build      # typecheck → client bundle → SSR bundle → prerender all pages → checks
npm run preview    # serve dist/ (http://127.0.0.1:4180)

# production build with the Google Search Console verification tag
GSC_VERIFY=<token> npm run build

# staging copy for GitHub Pages (noindex, under /subham-eye-clinic/)
BASE=/subham-eye-clinic/ STAGING=1 npm run build
```

`scripts/check-dist.mjs` also blocks private phone numbers listed in `.private-numbers` (one per line, git-ignored, never committed). Without that file the check is skipped with a warning.

Fonts: Anek Gujarati (SIL Open Font License, `src/fonts/OFL.txt`), rebuilt by `tools/build-fonts.py`.

## Where things live
| What | File |
|---|---|
| Clinic facts (phone, address, hours, registration, map) | `src/content/site.ts` |
| Interface text, Gujarati and English | `src/content/ui.ts` |
| The 6 treatment pages and their FAQs | `src/content/treatments.ts` |
| Pages and URLs | `src/routes.ts` |
| Design tokens (colours, type, spacing) | `src/styles/tokens.css` |
| Fonts (built, committed) | `src/fonts/`, `tools/build-fonts.py` |
| Share images and icons (rendered with headless Chrome) | `tools/og.html`, `tools/og-gu.html`, `tools/icon.html` |
| Components | `src/components/`, `src/styles/components.css` |
| SEO: titles, canonical, hreflang, Open Graph, JSON-LD, sitemap, robots | `scripts/prerender.mjs` |
| Build checks (titles, single h1, descriptions, alt text, links) | `scripts/check-dist.mjs` |

See `docs/design-system.md`.
