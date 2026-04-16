# CLAUDE.md — portfolio/

Data science portfolio site.
Live at: https://nicolaswilches.github.io/portfolio

## Stack

- **Framework:** Astro 6 + MDX
- **Styling:** Tailwind CSS v4 (config in `src/styles/global.css` via `@theme`)
- **Content:** MDX files in `src/content/projects/` with Zod schema validation
- **Hosting:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Design:** Warm paper palette, single-column editorial layout, no project icons

## GitHub Repo

- **Remote:** https://github.com/nicolaswilches/portfolio.git
- **Visibility:** Public
- **Branch:** main
- **Deploys via:** GitHub Actions → GitHub Pages (auto on push to main)

## Local Development

```bash
npm install       # Install dependencies
npm run dev       # Dev server at localhost:4321/portfolio/
npm run build     # Production build to dist/
```

Requires Node.js >= 22.

## Project Structure

```
portfolio/
├── .github/workflows/deploy.yml   # GitHub Actions deploy
├── public/
│   ├── embeds/                     # Plotly HTML files, screenshots
│   ├── favicon.svg                 # Pixel art favicon
│   └── robots.txt
├── src/
│   ├── content.config.ts           # Zod schema for projects collection
│   ├── content/projects/           # MDX case studies (one per project)
│   │   ├── daily-trading-system.mdx
│   │   ├── spain-energy-risk-index.mdx
│   │   ├── iberdrola-ev-network.mdx
│   │   └── madrid-rental-market.mdx
│   ├── components/
│   │   ├── Nav.astro               # Static header (name + links)
│   │   ├── Footer.astro            # Copyright + social links
│   │   ├── ProjectRow.astro        # Project list item (icon + title + tags)
│   │   ├── MetricCard.astro        # Key result display
│   │   ├── PlotlyEmbed.astro       # Responsive iframe for charts
│   │   ├── DemoButton.astro        # "Live app" / "Source" links
│   │   └── icons/                  # Pixel art SVG icons per project
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML head, nav, footer wrapper
│   │   └── ProjectLayout.astro     # Case study page template
│   ├── pages/
│   │   ├── index.astro             # Homepage (intro + project list)
│   │   ├── about.astro             # Bio, skills, education, contact
│   │   └── projects/[...slug].astro # Dynamic route for case studies
│   └── styles/global.css           # Tailwind config + prose styles
├── astro.config.mjs                # Site URL, base path, integrations
├── CLAUDE.md                       # This file
└── README.md
```

## Content Schema

Each project MDX file requires this frontmatter (validated at build time):

```yaml
title: string          # Project name
tagline: string        # One-line description
date: date             # Project date
status: complete | in-progress | coming-soon
featured: boolean
sortOrder: number      # Display order on homepage
heroImage: string      # Path to hero image/placeholder
techStack: string[]    # Technologies used
tags: string[]         # Category tags
githubUrl?: string     # GitHub repo URL
liveUrl?: string       # Live demo URL
demoEmbed?: string     # Path to embeddable HTML
teamSize?: number
duration?: string
```

## Adding a New Project

1. Copy an existing `.mdx` file in `src/content/projects/`, update frontmatter and content
2. Add screenshots/embeds to `public/embeds/` if needed
3. Push to main — auto-deploys

## Design Tokens

Defined in `src/styles/global.css` under `@theme`:

- **Background:** `paper` (#FFFCF0), `paper-dark` (#F2F0E5)
- **Text:** `ink-900` (#100F0F) through `ink-50` (#F2F0E5)
- **Nature accents:** `forest` (#4A7C59), `earth` (#8B6914), `clay` (#BC5215), `water` (#24837B)
- **Fonts:** Inter (sans), JetBrains Mono (mono)
- **Content width:** 40em max
