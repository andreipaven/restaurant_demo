import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import LocaleLink from "@/components/ui/LocaleLink";
import Reveal from "@/components/ui/Reveal";
import { dishes, heroDishes, priceOf } from "@/content/dishes";
import { palette } from "@/theme/palette";
import DishCarousel from "./DishCarousel";

export default async function Hero() {
  const t = await getTranslations("hero");
  const d = await getTranslations("dishes");

  const cards = heroDishes.map((id) => ({
    id,
    image: dishes[id].image,
    tag: d(`${id}.tag`),
    name: d(`${id}.name`),
    desc: d(`${id}.desc`),
    alt: d(`${id}.alt`),
    price: priceOf(id),
  }));

  return (
    <Container sx={{ pt: { xs: 5, md: 9 }, pb: { xs: 7, md: 11 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ gap: { xs: 6, md: 8 }, alignItems: "center" }}
      >
        <Reveal sx={{ display: "flex", flexDirection: "column", gap: 3.5, flex: "1 1 0", minWidth: 0, maxWidth: { md: 560 } }}>
          <Typography variant="overline" component="p">
            {t("eyebrow")}
          </Typography>

          <Typography variant="h1" component="h1" sx={{ textWrap: "balance" }}>
            {t("titleStart")}{" "}
            <Box
              component="em"
              sx={{ fontStyle: "italic", color: palette.accent, whiteSpace: "nowrap" }}
            >
              {t("titleAccent")}
            </Box>
            .
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "46ch" }}>
            {t("lead")}
          </Typography>

          <Stack direction="row" sx={{ gap: 1.5, flexWrap: "wrap", pt: 0.5 }}>
            <Button variant="contained" color="primary" component={LocaleLink} href="/contact">
              {t("ctaPrimary")}
            </Button>
            <Button variant="outlined" component={LocaleLink} href="/menu">
              {t("ctaSecondary")}
            </Button>
          </Stack>
        </Reveal>

        <Reveal
          delay={0.12}
          sx={{ flex: { xs: "0 0 auto", md: "1 1 0" }, minWidth: 0, width: "100%" }}
        >
          <DishCarousel
            dishes={cards}
            labels={{ advance: t("advance"), pick: t("pickDish", { name: "{name}" }) }}
          />
        </Reveal>
      </Stack>
    </Container>
  );
}
