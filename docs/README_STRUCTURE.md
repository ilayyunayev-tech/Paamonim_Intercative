# Project Structure (recommended)

This project keeps static assets and future app files separated by purpose.

## Folders

- `assets/branding/` - logos, favicons, app icons, `site.webmanifest`
- `assets/images/` - page illustrations and content images
- `assets/icons/` - icon packs or SVG icon sets (non-brand)
- `styles/` - extracted CSS files (future step)
- `scripts/` - extracted JavaScript files (future step)
- `pages/` - future multi-file page templates/components

## Notes

- Keep the project root minimal (`index.html`, docs, config files).
- New logos/favicons should be added to `assets/branding/` only.
- If you add new image references in HTML/CSS, prefer paths under `assets/`.
