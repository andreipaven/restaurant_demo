import path from "node:path";

/**
 * next-intl ships a config plugin, but it loads `@swc/core` at import time and
 * that native binding refuses to start on this machine (it rejects its cache
 * directory over Windows ACLs). The only thing the plugin does for a setup
 * without its experimental features is alias `next-intl/config` to the request
 * config, so we set that alias ourselves and keep the build off @swc/core.
 */
const requestConfig = "./i18n/request.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    // AVIF first, WebP for anything that cannot take it. The photos on this
    // site are large and dark, where AVIF saves the most.
    formats: ["image/avif", "image/webp"],
    // The widest an image is ever drawn is the 520px platter, so there is no
    // point generating 2048 or 3840 variants.
    deviceSizes: [360, 414, 640, 828, 1080, 1200],
    imageSizes: [128, 168, 256, 352, 384, 520],
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
