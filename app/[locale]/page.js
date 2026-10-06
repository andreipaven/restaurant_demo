import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import Strip from "@/components/home/Strip";
import HousePlatter from "@/components/home/HousePlatter";
import SignatureDishes from "@/components/home/SignatureDishes";
import Testimonials from "@/components/home/Testimonials";
import ClosingCta from "@/components/home/ClosingCta";

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Strip />
      <HousePlatter />
      <SignatureDishes />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
