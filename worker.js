/**
 * Production Worker for tiberiu.online.
 * Serves static assets and public analytics config from env vars.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/analytics-config") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, OPTIONS",
          },
        });
      }

      if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      const body = {
        posthogKey: env.POSTHOG_PROJECT_API_KEY || "",
        posthogApiHost: env.POSTHOG_API_HOST || "https://eu.i.posthog.com",
        posthogUiHost: env.POSTHOG_UI_HOST || "https://eu.posthog.com",
        cloudflareBeaconToken: env.CF_WEB_ANALYTICS_TOKEN || "",
      };

      return Response.json(body, {
        headers: {
          "cache-control": "public, max-age=300",
          "access-control-allow-origin": "*",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
