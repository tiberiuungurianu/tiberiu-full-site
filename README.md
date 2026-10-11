# TIBERIU — full personal site

A static, mobile-first personal site designed to replace Linktree while also working as a creator and modelling portfolio.

## Sections

- Home / hero
- About
- Modelling
- Around the web
- Email

There is intentionally no software-engineering section.

## Photos

The site serves compressed `.webp` files from `images/`. Original JPGs in the same folder are source files only.

- `tiberiu-ungurianu-portrait.webp` — homepage hero
- `tiberiu-ungurianu-beauty-editorial.webp` — tall modelling shot
- `tiberiu-ungurianu-editorial-closeup.webp`
- `tiberiu-ungurianu-sunglasses-editorial.webp`
- `tiberiu-ungurianu-leather-editorial.webp`
- `tiberiu-ungurianu-back-to-roots.webp`

WebP versions are resized to ~1600–2000 px on the long side. Keep originals if you need to re-export.

## Links

Edit **`links.json`** only (not `index.html`).

- `"hero": true` — shows in the hero buttons  
- omit `hero` (or `false`) — shows under Around the web / menu  
- **`"visible": false`** — hides the link everywhere (keeps it in the file for later)

Example — hide Snapchat without deleting it:

```json
{
  "label": "Snapchat",
  "detail": "tiberiungurianu",
  "href": "https://www.snapchat.com/add/tiberiungurianu",
  "visible": false
}
```

Then deploy (`npm run deploy`) so production picks up the change.

## Deploy

No build step is required. Upload the folder directly to:

- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages
- Any standard static web host

For a custom domain, point the domain at whichever host you choose.

Production analytics (Cloudflare Web Analytics + PostHog EU, consent-gated) are documented in [`docs/analytics.md`](docs/analytics.md).
