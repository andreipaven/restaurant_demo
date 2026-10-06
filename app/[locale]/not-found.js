import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import LocaleLink from "@/components/ui/LocaleLink";
import OvenScene from "@/components/ui/OvenScene";
import Reveal from "@/components/ui/Reveal";
import Rule from "@/components/ui/Rule";
import { palette } from "@/theme/palette";

const links = [
  { key: "menu", href: "/menu" },
  { key: "contact", href: "/contact" },
];

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container sx={{ py: { xs: 7, md: 12 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ gap: { xs: 6, md: 9 }, alignItems: "center" }}
      >
        <Reveal
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            flex: "1 1 0",
            minWidth: 0,
          }}
        >
          <Typography variant="overline" component="p">
            {t("eyebrow")}
          </Typography>

          <Typography variant="h1" component="h1" sx={{ textWrap: "balance" }}>
            {t("title")}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "46ch" }}>
            {t("lead")}
          </Typography>

          <Rule color={palette.accentLine} sx={{ mt: 1 }} />

          <Box
            sx={{
              fontFamily: "var(--font-mono), ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            {t("suggestion")}
          </Box>

          <Stack component="nav" sx={{ gap: 0 }}>
            {links.map((link) => (
              <LocaleLink
                key={link.key}
                href={link.href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  py: 1.75,
                  textDecoration: "none",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  fontFamily: "var(--font-display), Didot, Georgia, serif",
                  fontSize: { xs: 22, md: 26 },
                  color: "text.primary",
                  transition: "color 200ms ease",
                  "&:hover": { color: palette.accent },
                }}
              >
                {t(link.key)}
                <Box component="svg" viewBox="0 0 16 16" aria-hidden="true" sx={{ width: 14 }}>
                  <path
                    d="M4 12L12 4M12 4H6M12 4v6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Box>
              </LocaleLink>
            ))}
          </Stack>

          <Stack direction="row" sx={{ pt: 1 }}>
            <Button variant="contained" color="primary" component={LocaleLink} href="/">
              {t("home")}
            </Button>
          </Stack>
        </Reveal>

        <Reveal
          variant="settle"
          amount={0.35}
          sx={{
            flex: { xs: "0 0 auto", md: "1 1 0" },
            minWidth: 0,
            width: "100%",
            maxWidth: 520,
            mx: "auto",
          }}
        >
          <OvenScene label={t("ovenAlt")} />
        </Reveal>
      </Stack>
    </Container>
  );
}
