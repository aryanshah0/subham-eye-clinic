# Design system

**Principles:** genuine, calm and precise. No warning banners, no filler, no stock or AI images. English comes first, Gujarati second.

## Tokens (`src/styles/tokens.css`)
| Token | Value | Use |
|---|---|---|
| `--bg` | #FBF7EF ivory | page background |
| `--card` | #FFFDF8 | cards |
| `--soft` | #EEF1E8 sage | photo placeholders, the language switch |
| `--green` | #2F5D4A forest | brand, buttons, links, "open now" |
| `--gold` / `--gold-text` | #B8893A / #87621F | the eye drawing and small labels only |
| `--ink` / `--body` / `--mute` | warm browns | headings, body text, secondary text |
| `--r` 16px · `--pad` 24px · `--gap` 16px · `--sec` 80px | | radius, card padding, grid gap, space between sections |

Every text colour pair passes WCAG AA (lowest is 5.18:1). There is no red anywhere: emergency information is a plain bold-label line.

## Type
Anek Gujarati Variable, self-hosted, covering both scripts.
- h1: 32–50px
- h2: 26–34px
- h3: 19.5px
- body: 18.5px

Gujarati text gets more line-height (h1 1.32, body 1.75) so vowel signs are never clipped.

## Components
- **Card:** one style everywhere.
- **Section:** an h2 plus an optional one-line intro.
- **Buttons:** call (filled) and directions (outline).
- **OpenStatus**
- **EyeDiagram:** interactive on the home page, a fixed part on treatment pages.
- **Photo / placeholder**
- **Treatment card**
- **FAQ:** native details/summary.
- **Footer, header** (with the language switch) and the **phone dock**.

## Layout
- Container: 1120px.
- Grids: 3 columns for treatments and steps (2 on tablet), 4 for photos (2 on tablet), 2 for equipment and for timings/map.
- Breakpoints: 600px and 940px.
- Tap targets: at least 44px.

## Stability rules (2026-11-25)

- **Nothing moves by itself.** Fonts are handed to the browser by a blocking script before layout (scripts/prerender.mjs); all notes under the eye drawing share one grid cell, so the card has a fixed height; the menu panel floats; FAQ answers slide (src/components/Faq.tsx).
- **Arriving at a section from another page is instant.** Smooth scrolling applies only after `html.ready` is set by entry-client.
- **One name per treatment.** Card, menu, breadcrumb, page heading and footer all use `t.name`. The longer `t.title` (with "Jamnagar") is only the browser and Google title.
- **No empty photo slots.** Portrait and building photos appear when `SITE.photos` is switched on in src/content/site.ts.
