# Subham Eye Clinic: website

The website of Subham Eye Clinic, Jamnagar (Dr. Rajeev Shah, MBBS, DOMS). It is in English first (`/`), with Gujarati under `/gu/` (Dr. Shah's choice, 2026-11-25; old `/en/` addresses redirect via `public/_redirects`).

React 19 and Vite. Every page is **pre-rendered to static HTML** at build time, so search engines and slow phones get the full content without JavaScript. React then hydrates the page for the live open/closed status and the interactive eye drawing.

## Environments and branches

| Branch | On push or merge | Environment |
|---|---|---|
| `develop` | `.github/workflows/dev.yml` builds and deploys | **Dev**: https://aryanshah0.github.io/subham-eye-clinic/ (noindex, "development copy" strip) |
| `main` | `.github/workflows/prod.yml` builds and deploys | **Prod**: https://subhameyeclinic.pages.dev/ (Cloudflare Pages project `subhameyeclinic`) |
| pull request | `.github/workflows/check.yml` builds both and runs all checks | none |

How to change the site: work on `develop` (or a branch merged into it) → check the dev copy → open a pull request `develop` → `main` → merge. Nothing is deployed from a laptop, so the live site is always exactly `main`.

Repository settings this relies on:
- Secret `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with **Account › Cloudflare Pages › Edit**.
- Variable `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID.
- Secret `PRIVATE_NUMBERS` (optional but recommended): phone numbers that must never appear on the site, one per line.
- Settings › Pages › Source: **GitHub Actions**; the `github-pages` environment allows the `develop` branch.

`public/_headers` sets noindex on Cloudflare's per-deployment copies, a one-year cache for /assets/* and security headers.

## Commands
```bash
npm install
npm run dev        # local development (http://127.0.0.1:5190)
npm run build      # typecheck → client bundle → SSR bundle → prerender all pages → checks
npm run preview    # serve dist/ (http://127.0.0.1:4180)

# what the workflows build
GSC_VERIFY=<token> npm run build                     # prod (Search Console tag)
BASE=/subham-eye-clinic/ DEV=1 npm run build         # dev copy
```

`scripts/check-dist.mjs` also blocks private phone numbers listed in `.private-numbers` (git-ignored) or the `PRIVATE_NUMBERS` secret. Without either, the check is skipped with a warning.

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
