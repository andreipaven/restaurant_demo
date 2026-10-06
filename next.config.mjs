import path from "node:path";

/**
 * next-intl ships a config plugin, but it loads `@swc/core` at import time and
 * that native binding refuses to start on this machine (it rejects its cache
 * directory over Windows ACLs). The only thing the plugin does for a setup
 * without its experimental features is alias `next-intl/config` to the request
 * config, so we set that alias ourselves and keep the build off @swc/core.
 */
const requestConfig = "./i18n/request.js";

const isDev = process.env.NODE_ENV !== "production";

/**
 * The site is self-contained: no third-party scripts, fonts, images or API
 * calls. `next/font` downloads the Google fonts at build time and serves them
 * from our own origin, so no external origin belongs in this policy. Anything
 * added here later must come with the feature that needs it.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // Next inlines the hydration and RSC payload scripts. Dropping
  // 'unsafe-inline' means minting a nonce per request, which opts every page
  // out of static rendering. This site renders no user-generated content and
  // its only inline script is the JSON-LD we build from our own constants, so
  // we keep the pages static and accept inline scripts from our own origin.
  // 'unsafe-eval' is the dev-only cost of Turbopack and React Refresh.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // Emotion, which MUI renders through, injects the stylesheet as <style> tags.
  "style-src 'self' 'unsafe-inline'",
  // `data:` covers the blur placeholders next/image inlines into the markup.
  "img-src 'self' data:",
  "font-src 'self'",
  // In development this also has to reach the Turbopack HMR socket.
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "manifest-src 'self'",
  // Pointless on http://localhost, and it would break the dev server.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

/** Browser capabilities the site never uses, switched off for every origin. */
const permissionsPolicy = [
  "accelerometer=()",
  "autoplay=()",
  "browsing-topics=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "fullscreen=(self)",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "picture-in-picture=()",
  "usb=()",
  "xr-spatial-tracking=()",
].join(", ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Kept alongside frame-ancestors for browsers that predate CSP level 2.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
  // Only in production: on localhost this would pin the dev server to HTTPS.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Do not announce the framework to anyone scanning for known versions.
  poweredByHeader: false,
  images: {
    // AVIF first, WebP for anything that cannot take it. The photos on this
    // site are large and dark, where AVIF saves the most.
    formats: ["image/avif", "image/webp"],
    // The widest an image is ever drawn is the 520px platter, so there is no
    // point generating 2048 or 3840 variants.
    deviceSizes: [360, 414, 640, 828, 1080, 1200],
    imageSizes: [128, 168, 256, 352, 384, 520],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    resolveAlias: {
      "next-intl/config": requestConfig,
    },
  },
  webpack(config, context) {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias["next-intl/config"] = path.resolve(
      context.dir,
      requestConfig,
    );
    return config;
  },
};

export default nextConfig;
