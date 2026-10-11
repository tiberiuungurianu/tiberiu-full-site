# TIBERIU — PPD-changes (pre-prod)

Next.js editorial remake imported from [`live-2.1-remake`](https://github.com/tiberiuungurianu/live-2.1-remake), deployed to **pre-prod only**.

| | |
|---|---|
| Branch | `PPD-changes` |
| Cloudflare Worker | `tiberiu-full-site-ppd` |
| URL | https://ppd.tiberiu.online |
| Production (`tiberiu.online`) | stays on the static Worker `tiberiu-full-site` — do not deploy this branch there |

## Local

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy pre-prod

```bash
npm run deploy:ppd
```

Builds with OpenNext for Cloudflare, then deploys to `tiberiu-full-site-ppd`.

## Content

- `src/content/site.ts`
- `src/content/links.ts` — use `"visible": false` to hide links
- `src/content/gallery.ts`

## Legacy

Previous static site snapshot: `_legacy/`
