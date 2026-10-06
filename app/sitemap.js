import { routing } from "@/i18n/routing";
import { urlFor } from "./pageMetadata";

const routes = ["/", "/menu", "/about", "/contact"];

export default function sitemap() {
  const lastModified = new Date();

  return routes.flatMap((href) => {
    // Every entry points at its translations, so a search engine serves the
    // right language without guessing.
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, urlFor(locale, href)]),
    );

    return routing.locales.map((locale) => ({
      url: urlFor(locale, href),
      lastModified,
      changeFrequency: href === "/menu" ? "weekly" : "monthly",
      priority: href === "/" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
