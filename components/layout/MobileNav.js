"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link, usePathname } from "@/i18n/navigation";
import ContactLink from "@/components/ui/ContactLink";
import Logomark from "@/components/ui/Logomark";
import { palette } from "@/theme/palette";

const labelSx = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: 10,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: palette.accent,
};

export default function MobileNav({ pages, locales, locale, labels, contact }) {
  const pathname = usePathname();
  // Remember which page the drawer was opened on. Once the route changes it is
  // no longer open, so following a link — or going back — closes it without an
  // effect reaching in to reset state.
  const [openedOn, setOpenedOn] = useState(null);

  const open = openedOn === pathname;
  const close = () => setOpenedOn(null);

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        onClick={() => setOpenedOn(pathname)}
        aria-label={labels.open}
        aria-expanded={open}
        sx={{
          width: 44,
          height: 44,
          border: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Box component="svg" viewBox="0 0 24 24" aria-hidden="true" sx={{ width: 18 }}>
          <path
            d="M4 7h16M4 12h16M4 17h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </Box>
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={close}
        slotProps={{
          paper: {
            sx: {
              width: "min(380px, 88vw)",
              backgroundColor: palette.surface,
              backgroundImage: "none",
              borderLeft: "1px solid",
              borderColor: palette.accentLine,
            },
          },
          backdrop: { sx: { backgroundColor: palette.scrim, backdropFilter: "blur(3px)" } },
        }}
      >
        <Stack sx={{ height: "100%", p: 3, gap: 4 }}>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
              <Logomark size={28} />
              <Typography
                component="span"
                sx={{
                  fontFamily: "var(--font-display), Didot, Georgia, serif",
                  fontSize: 22,
                  letterSpacing: "0.02em",
                }}
              >
                {contact.name}
              </Typography>
            </Stack>

            <IconButton
              onClick={close}
              aria-label={labels.close}
              sx={{
                width: 40,
                height: 40,
                border: "1px solid",
                borderColor: "divider",
                color: "text.primary",
              }}
            >
              <Box component="svg" viewBox="0 0 24 24" aria-hidden="true" sx={{ width: 16 }}>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </Box>
            </IconButton>
          </Stack>

          <Stack component="nav" sx={{ gap: 0.5 }}>
            {pages.map((page) => {
              const active =
                page.href === "/" ? pathname === "/" : pathname.startsWith(page.href);

              return (
                <Box
                  key={page.key}
                  component={Link}
                  href={page.href}
                  aria-current={active ? "page" : undefined}
                  onClick={close}
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
                    fontSize: 26,
                    color: active ? palette.accent : "text.primary",
                    transition: "color 200ms ease",
                  }}
                >
                  {page.label}
                  {active && (
                    <Box
                      aria-hidden="true"
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: palette.accent,
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Stack>

          <Stack sx={{ gap: 1.5, mt: "auto" }}>
            <Box sx={labelSx}>{labels.contactLabel}</Box>
            <ContactLink
              kind="phone"
              href={contact.phoneHref}
              iconSize={22}
              sx={{
                fontFamily: "var(--font-display), Didot, Georgia, serif",
                fontSize: 26,
                letterSpacing: "0.03em",
                fontVariantNumeric: "tabular-nums",
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              {contact.phone}
            </ContactLink>
            <Typography variant="body2" color="text.secondary">
              {contact.hours}
            </Typography>
          </Stack>

          <Stack sx={{ gap: 2.5 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/contact"
              onClick={close}
              fullWidth
            >
              {labels.reserve}
            </Button>

            <Stack
              direction="row"
              aria-label={labels.language}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: 12,
                letterSpacing: "0.12em",
              }}
            >
              {locales.map((code, index) => (
                <Stack key={code} direction="row" sx={{ gap: 1.5, alignItems: "center" }}>
                  {index > 0 && (
                    <Box component="span" sx={{ color: "divider" }}>
                      /
                    </Box>
                  )}
                  <Box
                    component={Link}
                    href="/"
                    locale={code}
                    onClick={close}
                    sx={{
                      textDecoration: "none",
                      textTransform: "uppercase",
                      color: code === locale ? palette.accent : "text.secondary",
                    }}
                  >
                    {code}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Drawer>
    </Box>
  );
}
