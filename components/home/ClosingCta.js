import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import ContactLink from "@/components/ui/ContactLink";
import { mailHref, site } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import { palette } from "@/theme/palette";

export default async function ClosingCta() {
  const t = await getTranslations("closing");

  return (
    <Box
      id="rezerva"
      sx={{ borderTop: "1px solid", borderColor: palette.accentLine, scrollMarginTop: 80 }}
    >
      <Container sx={{ py: { xs: 6, md: 9 } }}>
        {/* Two columns across the full width rather than a narrow centred
            stack: the band stays short and the margins stop sitting empty. */}
        <Reveal
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 8 },
            alignItems: { md: "center" },
            justifyContent: "space-between",
          }}
        >
          <Stack sx={{ gap: 2, flex: "1 1 0", minWidth: 0 }}>
            <Typography variant="overline" component="p">
              {t("eyebrow")}
            </Typography>
            <Typography variant="h2" component="h2" sx={{ maxWidth: "18ch", textWrap: "balance" }}>
              {t("title")}
            </Typography>
          </Stack>

          <Stack
            sx={{
              gap: 1.5,
              flex: "0 1 auto",
              alignItems: { xs: "flex-start", md: "flex-end" },
              textAlign: { md: "right" },
              borderLeft: { md: "1px solid" },
              borderColor: { md: palette.accentLine },
              pl: { md: 8 },
            }}
          >
            <ContactLink
              kind="phone"
              href={site.phoneHref}
              iconSize={24}
              sx={{
                fontFamily: "var(--font-display), Didot, Georgia, serif",
                fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
                letterSpacing: "0.04em",
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
                color: "text.primary",
                textDecoration: "none",
                transition: "color 240ms ease",
                "&:hover": { color: palette.accent },
              }}
            >
              {site.phone}
            </ContactLink>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "34ch" }}>
              {t("note")}
            </Typography>

            <ContactLink
              kind="email"
              href={mailHref}
              iconSize={14}
              sx={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: 12,
                letterSpacing: "0.12em",
                color: palette.accent,
                textDecoration: "none",
                borderBottom: "1px solid",
                borderColor: palette.accentLine,
                pb: 0.5,
                transition: "border-color 240ms ease",
                "&:hover": { borderColor: palette.accent },
              }}
            >
              {site.email}
            </ContactLink>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
