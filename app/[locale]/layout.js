import { notFound } from "next/navigation";
import { Bodoni_Moda, DM_Mono, Hanken_Grotesk } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { pageMetadata } from "../pageMetadata";
import { restaurantSchema } from "../structuredData";
import "../globals.css";

const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return pageMetadata({
    locale,
    href: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const meta = await getTranslations({ locale, namespace: "metadata" });
  const schema = restaurantSchema({
    locale,
    description: meta("description"),
    // The hours live in one place; Schema.org wants them in 24-hour form.
    hours: { opens: "10:00", closes: "23:30" },
  });

  return (
    <html
      lang={locale}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          // The value is built from our own data, never from user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <NextIntlClientProvider>
          <ThemeRegistry>
            <Header />
            <main id="content">{children}</main>
            <Footer />
          </ThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
