# Portfolio

Data science portfolio — [nicolaswilches.github.io/portfolio](https://nicolaswilches.github.io/portfolio)

Built with Astro, Tailwind CSS, and MDX. Warm paper palette with pixel art project icons.

## Local development

```bash
npm install
npm run dev       # localhost:4321/portfolio/
npm run build     # Production build to dist/
```

Requires Node.js >= 22.

## Adding a project

1. Create `src/content/projects/my-project.mdx` with frontmatter (see existing files for schema)
2. Create a pixel art icon in `src/components/icons/`
3. Add the icon to `iconMap` in `src/pages/index.astro`
4. Push to `main` — deploys automatically via GitHub Actions
