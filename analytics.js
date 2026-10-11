(function () {
  "use strict";

  var CONSENT_KEY = "tiberiu_consent_v1";
  var SOCIAL_HOSTS = [
    "tiktok.com",
    "instagram.com",
    "youtube.com",
    "youtu.be",
    "snapchat.com",
    "pinterest.com",
    "t.me",
    "telegram.org",
    "famousbirthdays.com",
    "amazon.",
    "wishlist",
  ];

  var state = {
    config: Object.assign({}, window.__TIBERIU_ANALYTICS__ || {}),
    consent: null,
    posthogReady: false,
    posthogLoading: false,
    cfLoaded: false,
    fired: Object.create(null),
    scrollMarks: Object.create(null),
    sectionsSeen: Object.create(null),
    galleryLastId: null,
    engaged: false,
    sessionStartedAt: Date.now(),
    interactionCount: 0,
  };

  function once(key) {
    if (state.fired[key]) return false;
    state.fired[key] = true;
    return true;
  }

  function isProductionHost() {
    var hosts = state.config.productionHosts || ["www.tiberiu.online", "tiberiu.online"];
    var host = (location.hostname || "").toLowerCase();
    if (!host || host === "localhost" || host === "127.0.0.1") return false;
    if (host.endsWith(".pages.dev") || host.endsWith(".vercel.app") || host.endsWith(".netlify.app")) {
      return false;
    }
    return hosts.indexOf(host) !== -1;
  }

  function readConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (typeof parsed.analytics !== "boolean") return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(analytics) {
    var payload = {
      analytics: !!analytics,
      updatedAt: new Date().toISOString(),
      version: 1,
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    } catch (e) {
      /* private mode */
    }
    state.consent = payload;
    return payload;
  }

  function analyticsAllowed() {
    return !!(state.consent && state.consent.analytics);
  }

  function mergeConfig(partial) {
    if (!partial || typeof partial !== "object") return;
    Object.keys(partial).forEach(function (key) {
      if (partial[key] !== undefined && partial[key] !== null && partial[key] !== "") {
        state.config[key] = partial[key];
      }
    });
  }

  function loadConfigFromApi() {
    return fetch("/api/analytics-config", { credentials: "omit", cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("config unavailable");
        return res.json();
      })
      .then(mergeConfig)
      .catch(function () {
        /* fall back to analytics-config.js */
      });
  }

  /* ---------- PostHog ---------- */

  function track(eventName, properties) {
    if (!isProductionHost() || !analyticsAllowed()) return;
    if (!window.posthog || typeof window.posthog.capture !== "function") return;
    var props = Object.assign(
      {
        path: location.pathname + location.hash,
        host: location.hostname,
      },
      properties || {}
    );
    window.posthog.capture(eventName, props);
  }

  function loadPostHog() {
    if (!isProductionHost() || !analyticsAllowed()) return;
    if (state.posthogReady || state.posthogLoading) return;
    var key = state.config.posthogKey;
    if (!key) return;

    state.posthogLoading = true;
    var apiHost = state.config.posthogApiHost || "https://eu.i.posthog.com";
    var uiHost = state.config.posthogUiHost || "https://eu.posthog.com";

    !function (t, e) {
      var o, n, p, r;
      e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) {
        function g(t, e) {
          var o = e.split(".");
          2 == o.length && (t = t[o[0]], e = o[1]);
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        (p = t.createElement("script")).type = "text/javascript";
        p.crossOrigin = "anonymous";
        p.async = true;
        p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js";
        r = t.getElementsByTagName("script")[0];
        r.parentNode.insertBefore(p, r);
        var u = e;
        void 0 !== a ? u = e[a] = [] : a = "posthog";
        u.people = u.people || [];
        u.toString = function (t) {
          var e = "posthog";
          return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
        };
        u.people.toString = function () {
          return u.toString(1) + ".people (stub)";
        };
        o = "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" ");
        for (n = 0; n < o.length; n++) g(u, o[n]);
        e._i.push([i, s, a]);
      }, e.__SV = 1);
    }(document, window.posthog || []);

    window.posthog.init(key, {
      api_host: apiHost,
      ui_host: uiHost,
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
      persistence: "localStorage+cookie",
      disable_session_recording: false,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "[data-ph-mask], input, textarea",
        blockSelector: "[data-ph-block]",
        recordCrossOriginIframes: false,
      },
      loaded: function (ph) {
        state.posthogReady = true;
        state.posthogLoading = false;
        ph.register({
          site: "tiberiu.online",
          analytics_surface: "production_static",
        });
        ph.capture("$pageview", {
          path: location.pathname + location.hash,
        });
        bindBehavioralTracking();
        maybeEngage("posthog_ready");
      },
    });
  }

  function optOutPostHog() {
    try {
      if (window.posthog && typeof window.posthog.opt_out_capturing === "function") {
        window.posthog.opt_out_capturing();
      }
      if (window.posthog && typeof window.posthog.stopSessionRecording === "function") {
        window.posthog.stopSessionRecording();
      }
    } catch (e) {
      /* ignore */
    }
  }

  /* ---------- Cloudflare Web Analytics ---------- */

  function loadCloudflareBeacon() {
    if (!isProductionHost() || !analyticsAllowed()) return;
    if (state.cfLoaded) return;

    /* Avoid duplicate if dashboard auto-injection already present */
    if (document.querySelector("script[src*='cloudflareinsights.com/beacon']")) {
      state.cfLoaded = true;
      return;
    }

    var token = state.config.cloudflareBeaconToken;
    if (!token) return;

    var s = document.createElement("script");
    s.defer = true;
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.setAttribute("data-cf-beacon", JSON.stringify({ token: token }));
    document.head.appendChild(s);
    state.cfLoaded = true;
  }

  /* ---------- Custom events ---------- */

  function sectionNameFromEl(el) {
    if (!el) return "unknown";
    return el.id || (el.getAttribute("aria-label") || el.className || "section").toString().split(" ")[0];
  }

  function platformFromUrl(href) {
    try {
      var u = new URL(href, location.href);
      var host = u.hostname.replace(/^www\./, "");
      if (host.indexOf("tiktok") !== -1) return "tiktok";
      if (host.indexOf("instagram") !== -1) return "instagram";
      if (host.indexOf("youtube") !== -1 || host === "youtu.be") return "youtube";
      if (host.indexOf("snapchat") !== -1) return "snapchat";
      if (host.indexOf("pinterest") !== -1) return "pinterest";
      if (host.indexOf("t.me") !== -1 || host.indexOf("telegram") !== -1) return "telegram";
      if (host.indexOf("famousbirthdays") !== -1) return "famous_birthdays";
      if (host.indexOf("amazon") !== -1) return "amazon";
      if (u.protocol === "mailto:") return "email";
      return host || "unknown";
    } catch (e) {
      return "unknown";
    }
  }

  function isSocialUrl(href) {
    var lower = (href || "").toLowerCase();
    if (lower.indexOf("mailto:") === 0) return false;
    return SOCIAL_HOSTS.some(function (part) {
      return lower.indexOf(part) !== -1;
    });
  }

  function galleryIdFromShot(shot) {
    if (!shot) return "unknown";
    var index = shot.querySelector(".shot-index");
    if (index && index.textContent) {
      return index.textContent.trim().replace(/\s+/g, " ");
    }
    var img = shot.querySelector("img");
    if (img && img.getAttribute("src")) {
      var parts = img.getAttribute("src").split("/");
      return parts[parts.length - 1] || "image";
    }
    return "image";
  }

  function markEngagement(reason) {
    if (state.engaged) return;
    state.engaged = true;
    track("session_engaged", {
      reason: reason,
      engaged_after_ms: Date.now() - state.sessionStartedAt,
      interaction_count: state.interactionCount,
      max_scroll_pct: Math.round((window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100),
    });
  }

  function maybeEngage(reason) {
    state.interactionCount += 1;
    if (state.interactionCount >= 2) markEngagement(reason || "interaction");
  }

  function bindBehavioralTracking() {
    if (state.fired.__bound) return;
    state.fired.__bound = true;

    /* Sections */
    var sections = document.querySelectorAll("main section[id]");
    if ("IntersectionObserver" in window) {
      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var name = sectionNameFromEl(entry.target);
            if (state.sectionsSeen[name]) return;
            state.sectionsSeen[name] = true;
            track("section_viewed", {
              section: name,
              section_id: entry.target.id,
            });
            maybeEngage("section_view");
          });
        },
        { threshold: 0.35 }
      );
      sections.forEach(function (section) {
        sectionObserver.observe(section);
      });
    }

    /* Scroll depth */
    var depths = [25, 50, 75, 100];
    function onScroll() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 100;
      depths.forEach(function (mark) {
        if (pct < mark || state.scrollMarks[mark]) return;
        state.scrollMarks[mark] = true;
        track("scroll_depth_reached", { depth: mark });
        if (mark >= 50) markEngagement("scroll_depth_" + mark);
      });
    }
    var scrollTick = false;
    window.addEventListener(
      "scroll",
      function () {
        if (scrollTick) return;
        scrollTick = true;
        requestAnimationFrame(function () {
          onScroll();
          scrollTick = false;
        });
      },
      { passive: true }
    );
    onScroll();

    /* Time-based engagement */
    window.setTimeout(function () {
      markEngagement("time_15s");
    }, 15000);

    /* Click delegation */
    document.addEventListener(
      "click",
      function (event) {
        var target = event.target;
        if (!(target instanceof Element)) return;

        var menuTrigger = target.closest("#menuTrigger");
        if (menuTrigger) {
          track("navigation_clicked", {
            target: "menu_toggle",
            label: menuTrigger.textContent ? menuTrigger.textContent.trim() : "Menu",
          });
          maybeEngage("nav");
          return;
        }

        var brand = target.closest("a.brand");
        if (brand) {
          track("navigation_clicked", {
            target: "brand",
            href: brand.getAttribute("href") || "",
          });
          maybeEngage("nav");
          return;
        }

        var scrollNote = target.closest(".scroll-note");
        if (scrollNote) {
          track("navigation_clicked", { target: "scroll_cue" });
          maybeEngage("nav");
          return;
        }

        var shot = target.closest(".model-shot");
        if (shot) {
          var imageId = galleryIdFromShot(shot);
          track("gallery_image_opened", {
            image_id: imageId,
            section: "modelling",
          });
          if (state.galleryLastId && state.galleryLastId !== imageId) {
            track("gallery_navigation_clicked", {
              from_image_id: state.galleryLastId,
              to_image_id: imageId,
              section: "modelling",
            });
          }
          state.galleryLastId = imageId;
          maybeEngage("gallery");
          return;
        }

        var anchor = target.closest("a[href]");
        if (!anchor) return;
        var href = anchor.getAttribute("href") || "";

        if (href.indexOf("mailto:") === 0 || anchor.classList.contains("contact-email") || (anchor.textContent || "").trim().toLowerCase() === "contact me") {
          track("contact_clicked", {
            href: href,
            label: (anchor.textContent || "").trim().slice(0, 80),
            location: anchor.closest("#menu") ? "menu" : anchor.closest("#contact") ? "contact" : "other",
          });
          maybeEngage("contact");
          return;
        }

        if (href.charAt(0) === "#") {
          track("navigation_clicked", {
            target: "in_page",
            href: href,
            label: (anchor.textContent || "").trim().slice(0, 80),
            in_menu: !!anchor.closest("#menu"),
          });
          maybeEngage("nav");
          return;
        }

        if (/^https?:/i.test(href) || href.indexOf("//") === 0) {
          var platform = platformFromUrl(href);
          var props = {
            href: href,
            platform: platform,
            label: (anchor.textContent || "").trim().slice(0, 80),
            location: anchor.closest(".hero-actions")
              ? "hero"
              : anchor.closest(".link-stack")
                ? "around_the_web"
                : anchor.closest("#menu")
                  ? "menu"
                  : "other",
          };
          if (isSocialUrl(href)) {
            track("social_link_clicked", props);
          } else {
            track("external_link_clicked", props);
          }
          maybeEngage("outbound");
        }
      },
      true
    );
  }

  /* ---------- Consent UI ---------- */

  function ensureStyles() {
    if (document.getElementById("tiberiu-consent-styles")) return;
    var style = document.createElement("style");
    style.id = "tiberiu-consent-styles";
    style.textContent = [
      "#tiberiu-consent{position:fixed;inset:auto 0 0 0;z-index:120;padding:16px var(--pad,20px) max(16px,env(safe-area-inset-bottom));background:rgba(9,9,9,.96);color:var(--text,#f5f3ee);border-top:1px solid var(--line,rgba(245,243,238,.18));font-family:var(--body,system-ui,sans-serif)}",
      "#tiberiu-consent[hidden]{display:none!important}",
      "#tiberiu-consent .tc-inner{width:min(100%,var(--max,1240px));margin:0 auto;display:flex;flex-wrap:wrap;gap:14px 20px;align-items:flex-end;justify-content:space-between}",
      "#tiberiu-consent p{margin:0;max-width:52ch;font-size:13px;line-height:1.45;color:var(--muted,rgba(245,243,238,.7))}",
      "#tiberiu-consent strong{color:var(--text,#f5f3ee);font-weight:600}",
      "#tiberiu-consent .tc-actions{display:flex;flex-wrap:wrap;gap:8px}",
      "#tiberiu-consent button{appearance:none;border:1px solid var(--line,rgba(245,243,238,.18));background:transparent;color:inherit;padding:10px 14px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}",
      "#tiberiu-consent button.tc-accept{background:var(--text,#f5f3ee);color:var(--bg,#090909);border-color:transparent}",
      "#tiberiu-consent button:focus-visible{outline:1px solid var(--text,#f5f3ee);outline-offset:2px}",
      "#tiberiu-privacy{position:fixed;right:max(12px,env(safe-area-inset-right));bottom:max(12px,env(safe-area-inset-bottom));z-index:110;border:1px solid var(--line,rgba(245,243,238,.18));background:rgba(9,9,9,.9);color:var(--muted,rgba(245,243,238,.7));padding:8px 10px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}",
      "#tiberiu-privacy:focus-visible{outline:1px solid var(--text,#f5f3ee);outline-offset:2px}",
      "#tiberiu-privacy[hidden]{display:none!important}",
      "body.tc-banner-open #tiberiu-privacy{display:none!important}",
    ].join("");
    document.head.appendChild(style);
  }

  function renderConsentUi() {
    ensureStyles();

    var banner = document.getElementById("tiberiu-consent");
    if (!banner) {
      banner = document.createElement("aside");
      banner.id = "tiberiu-consent";
      banner.setAttribute("role", "dialog");
      banner.setAttribute("aria-label", "Analytics preferences");
      banner.setAttribute("aria-live", "polite");
      banner.innerHTML =
        '<div class="tc-inner">' +
        "<p><strong>Analytics</strong> — Optional tools help me understand visits, popular sections and referrals. Session replay masks inputs. Reject anytime; necessary site features still work.</p>" +
        '<div class="tc-actions">' +
        '<button type="button" class="tc-reject">Reject</button>' +
        '<button type="button" class="tc-accept">Accept</button>' +
        "</div></div>";
      document.body.appendChild(banner);

      banner.querySelector(".tc-accept").addEventListener("click", function () {
        applyConsent(true);
      });
      banner.querySelector(".tc-reject").addEventListener("click", function () {
        applyConsent(false);
      });
    }

    var privacy = document.getElementById("tiberiu-privacy");
    if (!privacy) {
      privacy = document.createElement("button");
      privacy.id = "tiberiu-privacy";
      privacy.type = "button";
      privacy.textContent = "Privacy";
      privacy.addEventListener("click", function () {
        showBanner(true);
      });
      document.body.appendChild(privacy);
    }

    if (state.consent) {
      showBanner(false);
    } else {
      showBanner(true);
    }
  }

  function showBanner(open) {
    var banner = document.getElementById("tiberiu-consent");
    var privacy = document.getElementById("tiberiu-privacy");
    if (!banner) return;
    if (open) {
      banner.hidden = false;
      document.body.classList.add("tc-banner-open");
      if (privacy) privacy.hidden = true;
    } else {
      banner.hidden = true;
      document.body.classList.remove("tc-banner-open");
      if (privacy) privacy.hidden = false;
    }
  }

  function applyConsent(analytics) {
    writeConsent(analytics);
    showBanner(false);

    if (analytics) {
      loadCloudflareBeacon();
      loadPostHog();
    } else {
      optOutPostHog();
    }
  }

  function startTrackingIfAllowed() {
    if (!isProductionHost()) return;
    if (!analyticsAllowed()) return;
    loadCloudflareBeacon();
    loadPostHog();
  }

  /* ---------- Boot ---------- */

  function boot() {
    state.consent = readConsent();
    renderConsentUi();

    loadConfigFromApi().finally(function () {
      mergeConfig(window.__TIBERIU_ANALYTICS__ || {});
      if (!isProductionHost()) return;
      startTrackingIfAllowed();
    });
  }

  /* Expose minimal API for debugging / preference changes */
  window.TiberiuAnalytics = {
    track: track,
    openPreferences: function () {
      showBanner(true);
    },
    getConsent: function () {
      return state.consent;
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
