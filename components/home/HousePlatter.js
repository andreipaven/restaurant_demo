import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import ContactLink from "@/components/ui/ContactLink";
import LocaleLink from "@/components/ui/LocaleLink";
import Reveal from "@/components/ui/Reveal";
import TurningPlatter from "./TurningPlatter";
import { platterImage, platterStats } from "@/content/dishes";
import { site } from "@/content/site";
import { palette } from "@/theme/palette";

export default async function HousePlatter() {
  const t = await getTranslations("platter");

  return (
    <Container sx={{ py: { xs: 9, md: 16 }, scrollMarginTop: 96 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ gap: { xs: 6, md: 9 }, alignItems: "center" }}
      >
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "1 1 0" },
            minWidth: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Reveal variant="settle" amount={0.35} sx={{ width: "100%", maxWidth: 520 }}>
            <TurningPlatter image={platterImage} alt={t("alt")} />
          </Reveal>
        </Box>

        <Reveal sx={{ display: "flex", flexDirection: "column", flex: "1 1 0", minWidth: 0, gap: 3 }}>
          <Typography variant="overline" component="p">
            {t("eyebrow")}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ textWrap: "balance" }}>
            {t("title")}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "50ch" }}>
            {t("bodyOne")}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "50ch" }}>
            {t("bodyTwo")}
          </Typography>

          <Box
            component="dl"
            sx={{
              m: 0,
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))" },
              pt: 3,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            {platterStats.map((stat) => (
              <Stack key={stat.id} sx={{ gap: 0.5, minWidth: 0 }}>
                <Box
                  component="dt"
                  sx={{
                    fontFamily: "var(--font-display), Didot, Georgia, serif",
                    fontSize: 32,
                    color: palette.accent,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stat.value}
                </Box>
                <Box
                  component="dd"
                  sx={{
                    m: 0,
                    fontFamily: "var(--font-mono), ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                  }}
                >
                  {t(stat.id)}
                </Box>
              </Stack>
            ))}
          </Box>

          <Stack direction="row" sx={{ gap: 3, flexWrap: "wrap", alignItems: "center", pt: 1 }}>
            <Button
              variant="contained"
              component={LocaleLink}
              href="/menu"
              sx={{ bgcolor: "text.primary", color: palette.ink, "&:hover": { bgcolor: palette.accent } }}
            >
              {t("cta")}
            </Button>
            <ContactLink
              kind="phone"
              href={site.phoneHref}
              sx={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: 14,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {site.phone}
            </ContactLink>
          </Stack>
        </Reveal>
      </Stack>
    </Container>
  );
}
