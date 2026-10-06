import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import LocaleLink from "@/components/ui/LocaleLink";
import Reveal from "@/components/ui/Reveal";
import { dishes, priceOf, signatureDishes } from "@/content/dishes";
import { palette } from "@/theme/palette";

export default async function SignatureDishes() {
  const t = await getTranslations("signature");
  const d = await getTranslations("dishes");

  return (
    <Box sx={{ bgcolor: palette.ink, borderTop: "1px solid", borderColor: "divider" }}>
      <Container sx={{ py: { xs: 8, md: 13 } }}>
        <Reveal
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "space-between",
            alignItems: { sm: "flex-end" },
            mb: { xs: 4, md: 6 },
          }}
        >
          <Stack sx={{ gap: 2 }}>
            <Typography variant="overline" component="p">
              {t("eyebrow")}
            </Typography>
            <Typography variant="h2" component="h2">
              {t("title")}
            </Typography>
          </Stack>
          <LocaleLink
            href="/menu"
            sx={{ color: palette.accent, fontSize: 14, fontWeight: 600, textDecoration: "none" }}
          >
            {t("link")} →
          </LocaleLink>
        </Reveal>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" },
          }}
        >
          {signatureDishes.map((id) => (
            <Reveal key={id} component="article" sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  borderRadius: "26px",
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Image
                  src={dishes[id].image}
                  alt={d(`${id}.alt`)}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 600px) 92vw, (max-width: 900px) 46vw, 360px"
                  style={{ objectFit: "cover", filter: "saturate(0.94) contrast(1.05)" }}
                />
              </Box>

              <Stack direction="row" sx={{ gap: 2, justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                <Typography variant="h4" component="h3">
                  {d(`${id}.name`)}
                </Typography>
                <Box
                  sx={{
                    fontFamily: "var(--font-mono), ui-monospace, monospace",
                    fontSize: 14,
                    color: palette.accent,
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {priceOf(id)}
                </Box>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                {d(`${id}.desc`)}
              </Typography>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
