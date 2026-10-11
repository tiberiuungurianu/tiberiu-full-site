# Advanced analytics — tiberiu.online (production)

This documents analytics for the **current static production site** on Cloudflare Pages. It is independent of the `live2.0` / editorial redesign.

## What is installed

| Layer | Purpose | Consent |
|---|---|---|
| **Cloudflare Web Analytics** | Page views, visits, locations, referrers, Core Web Vitals (cookieless beacon) | Loaded only after analytics consent when a beacon token is configured |
| **PostHog EU Cloud** | Behaviour, custom events, funnels, heatmaps, session replay | Loaded only after analytics consent |

Localhost, `*.pages.dev`, `*.vercel.app` and similar preview hosts **do not** send analytics.

## Cloudflare environment variables

In **Cloudflare Pages → Project → Settings → Environment variables** (Production):

| Variable | Required | Notes |
|---|---|---|
| `POSTHOG_PROJECT_API_KEY` | Yes | Public project API key (`phc_…`) from PostHog EU |
| `POSTHOG_API_HOST` | No | Default `https://eu.i.posthog.com` |
| `POSTHOG_UI_HOST` | No | Default `https://eu.posthog.com` |
| `CF_WEB_ANALYTICS_TOKEN` | Recommended | Token from Cloudflare Web Analytics site |

The Pages Function `functions/api/analytics-config.js` exposes these values as JSON at `/api/analytics-config` (public keys only).

Fallback: set the same public values in `analytics-config.js` if the Function is unavailable.

**Never** store PostHog personal API keys, private keys, or Cloudflare API tokens in the repo.

## Cloudflare Web Analytics setup

1. Cloudflare Dashboard → **Analytics & logs → Web Analytics** (or the Pages project analytics).
2. Add site `https://www.tiberiu.online` if needed and copy the **beacon token**.
3. Set `CF_WEB_ANALYTICS_TOKEN` in Pages env vars.
4. **Prevent duplicates:** if Cloudflare is already auto-injecting the beacon for the host, leave `CF_WEB_ANALYTICS_TOKEN` empty **or** disable automatic injection and use only the token-driven script from `analytics.js`.
5. Confirm in the Web Analytics dashboard after deploy: page views, visits, countries, referrers, and performance.

## PostHog EU setup

1. Create a project at [https://eu.posthog.com](https://eu.posthog.com) (EU Cloud).
2. Copy the **Project API Key** (`phc_…`).
3. Set `POSTHOG_PROJECT_API_KEY` on Cloudflare Pages (Production).
4. Project settings recommendations:
   - Session replay: **on** for consented traffic
   - Mask all inputs (already enforced in `analytics.js`)
   - Autocapture can stay on; custom events below are the product vocabulary
5. Deploy this branch / PR, accept consent on production, then verify live events in PostHog → Activity.

### Session replay masking

Configured in code:

- `maskAllInputs: true`
- masks `input`, `textarea`, and `[data-ph-mask]`
- blocks `[data-ph-block]`
- no form fields exist on the site today; still never capture form contents if added later

## Consent behaviour

- Banner on first visit: **Accept** / **Reject**
- Choice stored in `localStorage` key `tiberiu_consent_v1`
- **Privacy** control (bottom-right) reopens preferences
- Reject → PostHog opted out; Cloudflare beacon not loaded by our script
- Accept → PostHog + optional CF beacon load asynchronously

## Custom events

| Event | When | Useful properties |
|---|---|---|
| `navigation_clicked` | Brand, menu toggle, in-page `#` links, scroll cue | `target`, `href`, `label`, `in_menu` |
| `section_viewed` | Section ≥35% visible (once per section / page load) | `section`, `section_id` |
| `scroll_depth_reached` | 25 / 50 / 75 / 100% (once each) | `depth` |
| `gallery_image_opened` | Click on a modelling shot | `image_id`, `section` |
| `gallery_navigation_clicked` | Click a different shot after another | `from_image_id`, `to_image_id` |
| `social_link_clicked` | Outbound social / known platforms | `platform`, `href`, `location` |
| `external_link_clicked` | Other outbound http(s) links | `platform`, `href`, `location` |
| `contact_clicked` | Mailto / Contact me / contact email | `href`, `location` |
| `session_engaged` | Once: 15s **or** ≥50% scroll **or** ≥2 interactions | `reason`, `engaged_after_ms` |

Deduping: scroll depths and section views fire once per load; `session_engaged` once per load.

Debug helper (production, after accept): `window.TiberiuAnalytics.getConsent()`, `window.TiberiuAnalytics.openPreferences()`.

## Recommended PostHog dashboards

Create these insights in the EU project (human traffic; exclude known bots via PostHog filters where available):

1. **Audience overview** — unique users, sessions, pageviews, returning users; note bot/request inflation separately from Cloudflare request analytics.
2. **Geographic distribution** — countries / cities (approximate).
3. **Traffic sources & referrals** — `$referring_domain`, UTM (`utm_source`, `utm_medium`, `utm_campaign`).
4. **Popular sections** — `section_viewed` broken down by `section`.
5. **Engaged photographs** — `gallery_image_opened` by `image_id`.
6. **Social CTR** — `social_link_clicked` by `platform` and `location` (hero / menu / around_the_web).
7. **Journeys & funnels** — e.g. `section_viewed` (home) → modelling → `gallery_image_opened` → `social_link_clicked` or `contact_clicked`.
8. **Heatmaps & session replay** — enable toolbar / recordings for consented sessions only.
9. **Mobile vs desktop** — breakdown by `$device_type` / viewport properties.

### Humans vs automated traffic

- Prefer PostHog **unique users / sessions** for behaviour.
- Cloudflare Web Analytics is cookieless and still includes some non-human traffic — treat it as directional.
- Cloudflare **request / bot** analytics (Security / Traffic) are separate from visitor estimates — do not mix them into “unique visitors” without labelling.

## Files

- `analytics-config.js` — public fallback config
- `analytics.js` — consent, CF beacon, PostHog, events
- `functions/api/analytics-config.js` — Pages Function for env-based public config
- `index.html` — script tags only (no visual redesign)

## Manual test checklist

- [ ] Localhost: no PostHog / CF network calls after Accept
- [ ] Production preview with keys: Accept loads PostHog EU; Reject does not
- [ ] Privacy button reopens banner; Reject after Accept opts out
- [ ] Click Menu, gallery shot, TikTok, contact email → matching events in PostHog
- [ ] Scroll to 50%+ → `scroll_depth_reached` + eventually `session_engaged`
- [ ] Site look/layout unchanged; menu, links.json, gallery still work
- [ ] Only one CF beacon script in the document
