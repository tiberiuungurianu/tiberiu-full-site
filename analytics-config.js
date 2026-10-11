/**
 * Public analytics configuration for tiberiu.online.
 *
 * PostHog project API keys are designed to be public (write-only).
 * Prefer setting secrets via Cloudflare Pages → Settings → Environment variables
 * and the /api/analytics-config Function. Values here are fallbacks for local/static use.
 *
 * Never put private API keys, personal API keys, or service account secrets here.
 */
window.__TIBERIU_ANALYTICS__ = {
  /* PostHog EU project API key (phc_…) — set in Cloudflare as POSTHOG_PROJECT_API_KEY */
  posthogKey: "",
  posthogApiHost: "https://eu.i.posthog.com",
  posthogUiHost: "https://eu.posthog.com",

  /* Cloudflare Web Analytics beacon token — set as CF_WEB_ANALYTICS_TOKEN */
  /* Leave empty if Web Analytics is already injected automatically in the CF dashboard */
  cloudflareBeaconToken: "",

  /* Hosts allowed to send analytics (production + pre-prod). */
  productionHosts: [
    "www.tiberiu.online",
    "tiberiu.online",
    "ppd.tiberiu.online",
  ],
};
