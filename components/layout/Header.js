import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import LocaleLink from "@/components/ui/LocaleLink";
import NavLink from "@/components/ui/NavLink";
import { palette } from "@/theme/palette";
import { site } from "@/content/site";
import HeaderShell from "./HeaderShell";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

const pages = [
  { key: "home", href: "/" },
  { key: "menu", href: "/menu" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

export default async function Header() {
  const t = await getTranslations("nav");
  const hours = await getTranslations("hours");
  const locale = await getLocale();

  return (
    <HeaderShell
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backgroundColor: palette.veilHeader,
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        component="a"
        href="#content"
        sx={{
          position: "absolute",
          left: 16,
          top: 8,
          px: 2,
          py: 1,
          borderRadius: 999,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          fontSize: 14,
          transform: "translateY(-200%)",
          "&:focus-visible": { transform: "translateY(0)" },
        }}
      >
        {t("skipToContent")}
      </Box>

      <Container>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            py: { xs: 1.5, md: 2 },
          }}
        >
          <Logo />

          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
            }}
          >
            {pages.map((page) => (
              <NavLink key={page.key} href={page.href}>
                {t(page.key)}
              </NavLink>
            ))}
          </Box>

          <Stack
            direction="row"
            sx={{ alignItems: "center", gap: { xs: 1, md: 2 } }}
          >
            <Stack
              direction="row"
              aria-label={t("language")}
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
              }}
            >
              {routing.locales.map((code, index) => (
                <Box key={code} sx={{ display: "flex", gap: 1 }}>
                  {index > 0 && (
                    <Box component="span" sx={{ color: "divider" }}>
                      /
                    </Box>
                  )}
                  <LocaleLink
                    href="/"
                    locale={code}
                    sx={{
                      textDecoration: "none",
                      textTransform: "uppercase",
                      color:
                        code === locale ? palette.accent : "text.secondary",
                    }}
                  >
                    {code}
                  </LocaleLink>
                </Box>
              ))}
            </Stack>

            <Button
              variant="contained"
              color="primary"
              component={LocaleLink}
              href="/contact"
              sx={{
                minHeight: 46,
                paddingInline: 3,
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              {t("reserve")}
            </Button>

            <MobileNav
              pages={pages.map((page) => ({ ...page, label: t(page.key) }))}
              locales={routing.locales}
              locale={locale}
              labels={{
                open: t("openMenu"),
                close: t("closeMenu"),
                reserve: t("reserve"),
                language: t("language"),
                contactLabel: t("contact"),
              }}
              contact={{
                name: site.name,
                phone: site.phone,
                phoneHref: site.phoneHref,
                hours: `${hours("days")} · ${hours("time")}`,
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </HeaderShell>
  );
}
