import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { siteUrl } from "./siteUrl";

/** The picture social networks show when a page is shared. */
export const socialImage = {
  url: "/images/social.jpg",
  width: 1200,
  height: 630,
};

/** Absolute URL of one page, in one language, with that language's path. */
export function urlFor(locale, href = "/") {
  return `${siteUrl}${getPathname({ href, locale })}`;
}

/**
 * Canonical URL, hreflang alternates, Open Graph and Twitter card for one page.
 * `href` is the internal route, e.g. "/" or "/menu".
 */
export function pageMetadata({ locale, href = "/", title, description }) {
  const languages = {};
  for (const other of routing.locales) {
    languages[other] = urlFor(other, href);
  }
  // Tells a search engine which version to show when it knows no better.
  languages["x-default"] = urlFor(routing.defaultLocale, href);

  const image = { ...socialImage, alt: site.name };

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      // canonical: urlFor(locale, href),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale,
      url: urlFor(locale, href),
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
