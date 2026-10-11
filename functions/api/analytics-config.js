/**
 * Cloudflare Pages Function — serves public analytics config from env vars.
 * Bind in Pages: POSTHOG_PROJECT_API_KEY, CF_WEB_ANALYTICS_TOKEN (optional).
 */
export async function onRequestGet(context) {
  const env = context.env || {};
  const body = {
    posthogKey: env.POSTHOG_PROJECT_API_KEY || "",
    posthogApiHost: env.POSTHOG_API_HOST || "https://eu.i.posthog.com",
    posthogUiHost: env.POSTHOG_UI_HOST || "https://eu.posthog.com",
    cloudflareBeaconToken: env.CF_WEB_ANALYTICS_TOKEN || "",
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300",
      "access-control-allow-origin": "*",
    },
  });
}
