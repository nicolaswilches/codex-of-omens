# Portfolio Design Language

The rulebook for every visual and structural decision on this site. New projects, components, and pages must follow it. If a new need doesn't fit, extend the rulebook first — don't fork the look.

## 1. Principles

- **Flat editorial.** No shadows, gradients, glow, or skeuomorphism. No parallax or movement-based animation. Transitions are color-only and ≤150ms.
- **Paper-first.** Flexoki paper is the default background across the site. Project color only tints the project hero.
- **One accent per project.** Exactly one of the four brand accents is assigned at creation time and used everywhere that project is represented (row marker, hero tint, progress bar, TOC hover).
- **Identity through motif, not chrome.** A small geometric motif, not iconography or stylization, carries each project's identity.
- **One typeface.** Inter is used for every surface — prose, UI, nav, headings. No serif, no display face.

## 2. Color system

### Base (Flexoki paper)

Defined in `src/styles/global.css` under `@theme`. Do not hand-pick grays outside the `--color-ink-{n}` scale.

- `--color-paper` — page background (light: `#FFFCF0`)
- `--color-paper-dark` — subtle secondary surface
- `--color-ink-900` … `--color-ink-50` — text and borders

### Accents (fixed four)

| Token | Light | Dark | Assigned to |
|---|---|---|---|
| `--color-accent-orange` | `#F9582B` | `#FF7A52` | Trading |
| `--color-accent-lavender` | `#BCB6ED` | `#D1CCF2` | Rental market |
| `--color-accent-green` | `#4B8C5E` | `#6BA57E` | Energy |
| `--color-accent-blue` | `#9EB7E6` | `#B4C6EC` | EV network |

Each accent has a precomputed `*-tint` variant (accent mixed ~12% into paper) for large hero backgrounds. Tints are not derived at runtime — if the hero tint looks off against new content, adjust the token, not the usage site.

### Accent usage rules

- **Project hero**: full accent background, paper-colored text (`#FFFCF0`). Only the title is bold (600); tagline, meta, and tags use normal weight. Buttons are outlined in paper with paper text on the accent fill; hover inverts to paper fill with accent text.
- **Row-hover background, chart fill tints**: `*-tint`.
- **Progress bar, motif, project-row marker, TOC hover border**: full `accent`.
- **Inline prose links, pull quotes, drop caps**: full `accent` (authors' discretion, one element at a time — don't paint the whole paragraph).
- **Do not** use an accent as a general page background or as body text color.

### Per-project overrides

When a project needs a one-off brand color outside the four accents, add these optional frontmatter fields instead of extending the enum:

- `accentColor: "#HEX"` — replaces `--accent` for this project only. Tint is auto-computed via `color-mix`.
- `bodyColor: "#HEX"` — replaces prose body/heading/strong color for this project only.

Use sparingly — the four-accent system is the default. Madrid rental market is the current example.

### Adding a fifth accent

1. Pick a hue that's ≥30° separated from each existing accent on HSL.
2. Tune saturation/lightness until body text (`--color-ink-700`) meets WCAG AA (4.5:1) on the tint, and the full accent meets 3:1 against paper.
3. Add `--color-accent-{name}` and `--color-accent-{name}-tint` under `@theme` and under both dark blocks (`@media prefers-color-scheme: dark` + `html[data-theme="dark"]`) with a calibrated twin.
4. Extend the Zod `accent` enum in `src/content.config.ts`.
5. Update this file's table.

## 3. Typography

| Use | Family | Weight | Size |
|---|---|---|---|
| Body prose | Inter | 400 | 1rem / 1.75 |
| Headings H1 | Inter | 600 | 1.875–2rem |
| Headings H2 | Inter | 600 | 1.375rem / 1.3 |
| Headings H3 | Inter | 600 | 1.125rem / 1.4 |
| Nav, buttons, tags, captions, TOC, meta | Inter | 400–500 | 0.75–0.875rem |
| Code | JetBrains Mono | 400 | 0.85em |

- Do not introduce a new font. If you need emphasis, use weight or the mono family.

## 4. Layout canvases

Three widths, defined as `--width-body`, `--width-wide`, `--width-full`:

| Canvas | Width | Use |
|---|---|---|
| `body` | 46em | All prose, the homepage list, nav, about |
| `wide` | 46em | Same as body — charts and figures stay flush with prose. No break-out. |
| `full` | 46em | Same as body — kept for token stability. |

The TOC is pinned to the far left of the viewport (`left: 1rem`) so wide-break figures never collide with it.

Prose content breaks out to `wide` via the `.wide` utility (defined in `global.css`).

```mdx
<figure class="wide">
  <PlotlyEmbed src="..." />
  <figcaption>Caption stays narrow by default.</figcaption>
</figure>
```

## 5. Motif grammar

Per-project SVG built from 2–3 flat geometric primitives (circle, triangle, rectangle, arc, line). The composition hints at the project's domain.

- **Canvas**: 64×64, `viewBox="0 0 64 64"`, no padding baked in.
- **Fill**: single accent. Use `fill="currentColor"` so the SVG inherits the scope's accent via CSS.
- **Stroke**: none, or 1.5px in the same accent. No mixed colors.
- **No gradients, shadows, filters, or animation.** No rotation, no hover transforms.
- **Reuse**: the same SVG is placed in
  - the homepage row marker (28×28),
  - the project hero (large, left-aligned inside the hero block),
  - the project favicon / OG image.

Store motifs in `public/motifs/{project-slug}.svg`. Reference via the optional `motif` frontmatter field. Until motifs exist, the row marker and hero fall back to a plain accent square.

### Domain hints (current projects)

- **Trading** → two bars + a tick line (candlestick abstraction)
- **Energy** → three vertical lines crossed by a horizontal arc (grid)
- **EV network** → three circles connected by lines (network nodes)
- **Rental market** → stacked rectangles at varying heights (buildings / histogram)

## 6. Component rules

### Nav (`src/components/Nav.astro`)
Paper background, Inter, no tint. Theme toggle is the only interactive element; no other icons.

### Project row (`src/components/ProjectRow.astro`)
- Accent marker on the left (motif SVG when present, flat square fallback).
- Hover background is the row's accent tint — no lift, no shadow, no scale.
- `coming-soon` rows are 50% opacity, non-interactive.

### Hero block (in `ProjectLayout.astro`)
- Full-bleed band at the top of every project page.
- Background: `--accent-tint`.
- Inner container: `max-w-[56em]`, padding `py-10 sm:py-14`.
- Order: back link → title → tagline → meta → actions → tech tags → (motif, optional).
- No border beneath. The tint-to-paper transition is the divider.

### Reading progress bar
`height: 2px`, color `--accent`, fixed top, no shadow.

### TOC sidebar
Desktop only (`lg`), fixed at `left: 1rem`, vertically centered on the viewport (`top: 50%; translateY(-50%)`). Hidden while the project hero is in view; revealed via IntersectionObserver once the hero scrolls out. The section currently in view is highlighted with full-ink color and an accent-colored left border via a second IntersectionObserver on the H2s. Hover-border color = `--accent`. Font Inter.

### Section numbering
Every H2 inside a project case study is auto-numbered (CSS counter). The number sits in a circle (~31×31, `border-radius: 9999px`) filled with `--accent` and paper text. The TOC remains unchanged (no numbers there — keeps the rail quiet).

### Metric cards
`MetricCard` uses `--accent` as its full background with paper text, matching the hero's color language. Labels use 85% opacity on paper for hierarchy.

### Prev/Next footer
Paper background, Inter, underlined link color = `--color-ink-900`. No accent here.

### Charts (Plotly)
Chart authors must pass the four-accent categorical palette as `colorway`:

```js
colorway: ['#F9582B', '#4B8C5E', '#9EB7E6', '#BCB6ED']
```

Axes, gridlines, tick labels use `--color-ink-300` / `--color-ink-500`. Backgrounds transparent so the embed inherits paper or tint.

## 7. Light-only

The site is light-mode only. No dark palette, no theme toggle, no `prefers-color-scheme` handling. Tokens are defined once in `@theme`.

## 8. Adding a new project — checklist

1. Copy `src/content/projects/_template.mdx` → `{slug}.mdx`.
2. Fill required frontmatter including `accent: orange | lavender | green | blue`.
3. (Optional, can defer) Author the motif SVG per §5 and save to `public/motifs/{slug}.svg`; set `motif: "/portfolio/motifs/{slug}.svg"`.
4. Write the case study in prose (serif applies automatically). Use `.wide` on figures that need to break out.
5. If the project introduces a Plotly chart, set the palette per §6.
6. Run `npm run dev` — verify: hero tint matches the accent, progress bar matches, TOC hover matches, row marker matches on homepage.
7. Run `npm run build`. Schema validation will fail if `accent` is missing or invalid.

## 9. Out of scope (by design)

- Material surfaces, elevation, ripples, FABs.
- Decorative icons outside the motif system.
- More than one accent active on a single page.
- Per-project custom typography or spacing.

Changes to these rules happen in this file first — the code follows.
