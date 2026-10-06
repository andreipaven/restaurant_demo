import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactDetails from "@/components/contact/ContactDetails";
import PageHeader from "@/components/ui/PageHeader";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "../../pageMetadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return pageMetadata({
    locale,
    href: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <ContactDetails />
    </>
  );
}
