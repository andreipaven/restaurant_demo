import { addressLine, site } from "@/content/site";
import { socialImage, urlFor } from "./pageMetadata";
import { siteUrl } from "./siteUrl";

/**
 * Schema.org description of the restaurant, for search engines and maps. It
 * reads the same data the pages do, so the hours and the address can never
 * drift apart from what a visitor sees.
 */
export function restaurantSchema({ locale, description, hours }) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}/#restaurant`,
    name: site.name,
    description,
    url: urlFor(locale, "/"),
    image: `${siteUrl}${socialImage.url}`,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$$",
    servesCuisine: ["Seasonal", "Romanian", "Seafood"],
    acceptsReservations: true,
    hasMenu: urlFor(locale, "/menu"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postcode,
      addressCountry: "RO",
      name: addressLine,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: hours.opens,
        closes: hours.closes,
      },
    ],
  };
}
