import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import ContactLink from "@/components/ui/ContactLink";
import NavLink from "@/components/ui/NavLink";
import Logomark from "@/components/ui/Logomark";
import { addressLine, author, mailHref, site } from "@/content/site";
import { palette } from "@/theme/palette";

const pages = [
  { key: "home", href: "/" },
  { key: "menu", href: "/menu" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

const labelSx = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: 10,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: palette.accent,
};

const linkSx = {
  color: "text.secondary",
  textDecoration: "none",
  fontSize: 14,
  transition: "color 200ms ease",
  "&:hover": { color: "text.primary" },
};

export default async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const hours = await getTranslations("hours");

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: palette.ink,
        borderTop: "1px solid",
        borderColor: palette.accentLine,
      }}
    >
      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ gap: { xs: 6, md: 8 }, justifyContent: "space-between" }}
        >
          <Stack sx={{ gap: 2.5, maxWidth: 320 }}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
              <Logomark size={40} />
              <Typography
                component="p"
                sx={{
                  fontFamily: "var(--font-display), Didot, Georgia, serif",
                  fontSize: 30,
                  letterSpacing: "0.02em",
                }}
              >
                {site.name}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {t("tagline")}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ gap: { xs: 5, sm: 7, md: 9 }, flexWrap: "wrap" }}
          >
            <Stack component="nav" sx={{ gap: 1.75, minWidth: 120 }}>
              <Box sx={labelSx}>{t("navigation")}</Box>
              {pages.map((page) => (
                <NavLink
                  key={page.key}
                  href={page.href}
                  sx={{ py: 0, borderBottom: "none" }}
                >
                  {nav(page.key)}
                </NavLink>
              ))}
            </Stack>

            <Stack sx={{ gap: 1.75, minWidth: 170, maxWidth: 210 }}>
              <Box sx={labelSx}>{t("contact")}</Box>
              <Typography
                sx={{ fontSize: 14, color: "text.secondary", lineHeight: 1.6 }}
              >
                {addressLine}
                <br />
                {site.address.detail}
              </Typography>
              <ContactLink
                kind="phone"
                href={site.phoneHref}
                iconSize={15}
                sx={{ ...linkSx, fontVariantNumeric: "tabular-nums" }}
              >
                {site.phone}
              </ContactLink>
              <ContactLink kind="email" href={mailHref} iconSize={15} sx={linkSx}>
                {site.email}
              </ContactLink>
            </Stack>

            <Stack sx={{ gap: 1.75, minWidth: 150 }}>
              <Box sx={labelSx}>{t("hours")}</Box>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "text.secondary",
                  lineHeight: 1.7,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {hours("days")}
                <br />
                {hours("time")}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {hours("note")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            mt: { xs: 6, md: 9 },
            pt: 3,
            gap: 2,
            alignItems: { sm: "center" },
            justifyContent: "space-between",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ ...labelSx, color: "text.secondary" }}>
            {t("rights", { year: new Date().getFullYear() })}
          </Box>

          <Box sx={{ ...labelSx, color: "text.secondary" }}>
            {t("credit")}{" "}
            <Box
              component="a"
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: palette.accent,
                textDecoration: "none",
                transition: "color 200ms ease",
                "&:hover": { color: palette.bone },
              }}
            >
              {author.name}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
