import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "en"],
  defaultLocale: "ro",
  // Left side: the folder under app/[locale]. Right side: what the visitor
  // sees in the address bar, per language.
  pathnames: {
    "/": "/",
    "/menu": { ro: "/meniu", en: "/menu" },
    "/about": { ro: "/despre", en: "/about" },
    "/contact": { ro: "/contact", en: "/contact" },
  },
});
