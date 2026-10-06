import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import { houseStats, kitchenImage } from "@/content/dishes";
import { palette } from "@/theme/palette";

const principles = ["fire", "pantry", "room"];

export default async function AboutStory() {
  const t = await getTranslations("about");

  return (
    <>
      <Container sx={{ pb: { xs: 7, md: 11 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ gap: { xs: 5, md: 8 }, alignItems: "flex-start" }}
        >
          <Reveal
            variant="settle"
            sx={{
              position: "relative",
              flex: { xs: "0 0 auto", md: "1 1 0" },
              minWidth: 0,
              width: "100%",
              aspectRatio: "4 / 5",
              borderRadius: "26px",
              overflow: "hidden",
              border: "1px solid",
              borderColor: palette.accentLine,
            }}
          >
            <Image
              src={kitchenImage}
              alt={t("imageAlt")}
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 92vw, 520px"
              style={{ objectFit: "cover", filter: "saturate(0.94) contrast(1.05)" }}
            />
          </Reveal>

          <Reveal sx={{ display: "flex", flexDirection: "column", flex: "1 1 0", minWidth: 0, gap: 3 }}>
            <Typography variant="body1" color="text.secondary">
              {t("storyOne")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t("storyTwo")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t("storyThree")}
            </Typography>

            <Box
              component="dl"
              sx={{
                m: 0,
                mt: 2,
                display: "grid",
                gap: 3,
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              {houseStats.map((stat) => (
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
          </Reveal>
        </Stack>
      </Container>

      <Box sx={{ bgcolor: palette.ink, borderBlock: "1px solid", borderColor: "divider" }}>
        <Container sx={{ py: { xs: 7, md: 11 } }}>
          <Stack sx={{ gap: { xs: 4, md: 6 } }}>
            <Typography variant="h2" component="h2" sx={{ maxWidth: "20ch" }}>
              {t("principlesTitle")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: { xs: 4, md: 5 },
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
              }}
            >
              {principles.map((key, index) => (
                <Reveal key={key} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Box
                    sx={{
                      fontFamily: "var(--font-mono), ui-monospace, monospace",
                      fontSize: 10,
                      letterSpacing: "0.24em",
                      color: palette.accent,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Box>
                  <Typography variant="h4" component="h3">
                    {t(`principles.${key}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`principles.${key}.body`)}
                  </Typography>
                </Reveal>
              ))}
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 8, md: 13 } }}>
        <Reveal
          component="blockquote"
          sx={{ m: 0, gap: 3, maxWidth: 820, mx: "auto", textAlign: "center", alignItems: "center" }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-display), Didot, Georgia, serif",
              fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)",
              fontStyle: "italic",
              lineHeight: 1.35,
              textWrap: "balance",
            }}
          >
            {`„${t("quote")}”`}
          </Typography>
          <Box
            component="footer"
            sx={{
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            {t("quoteAuthor")}
          </Box>
        </Reveal>
      </Container>
    </>
  );
}
