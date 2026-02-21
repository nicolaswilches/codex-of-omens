# CLAUDE.md — portfolio/

GitHub Pages portfolio site: **"Codex of inference"**
Live at: https://nicolaswilches.github.io/portfolio

## Purpose

Public-facing data science portfolio. Showcases processed notebooks, interactive
Plotly charts, and project write-ups for potential employers and collaborators.

## Structure

```
portfolio/
├── index.md              # Homepage
├── _config.yml           # Jekyll config (GitHub Pages)
├── assets/
│   ├── scripts/
│   │   ├── export_plotly_charts.py   # Export charts as standalone HTML
│   │   └── convert_notebook.py       # Process notebooks for display
│   └── ...
├── notebooks/            # Processed notebooks for display
└── projects/             # Project subdirectories
```

## GitHub Repo

- **Remote:** https://github.com/nicolaswilches/portfolio.git
- **Visibility:** Public
- **Branch:** main
- **Deploys via:** GitHub Pages (auto-deploy on push to main)

## Key Workflows

```bash
# Push and deploy
git add . && git commit -m "..." && git push

# Export Plotly charts from a notebook
python assets/scripts/export_plotly_charts.py

# Process a notebook for portfolio display
python assets/scripts/convert_notebook.py notebooks/my_notebook.ipynb
```

## Notes

- Keep notebooks outputs clean before committing (strip large cell outputs if needed)
- Plotly charts should be exported as standalone HTML files (not embedded in notebooks)
- `.DS_Store` is gitignored — don't force-add it
- Source notebooks live in `mbds/` and `projects/` — portfolio only has processed versions
