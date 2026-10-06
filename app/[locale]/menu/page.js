import { getTranslations, setRequestLocale } from "next-intl/server";
import MenuBrowser from "@/components/menu/MenuBrowser";
import MenuNotes from "@/components/menu/MenuNotes";
import PageHeader from "@/components/ui/PageHeader";
import { dishes, menuCategories, priceOf } from "@/content/dishes";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "../../pageMetadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu" });

  return pageMetadata({
    locale,
    href: "/menu",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function MenuPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "menu" });
  const d = await getTranslations({ locale, namespace: "dishes" });

  const categories = menuCategories.map((category) => ({
    id: category.id,
    label: t(`categories.${category.id}`),
    tablistLabel: t("tablistLabel"),
    items: category.items.map((id) => {
      const nutrition = dishes[id].nutrition;

      return {
        id,
        name: d(`${id}.name`),
        desc: d(`${id}.desc`),
        alt: d(`${id}.alt`),
        ingredients: d.raw(`${id}.ingredients`),
        nutrition: nutrition ? t("nutrition", nutrition) : null,
        price: priceOf(id),
        image: dishes[id].image,
      };
    }),
  }));

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      <MenuBrowser categories={categories} legend={t("nutritionLegend")} />
      <MenuNotes />
    </>
  );
}
