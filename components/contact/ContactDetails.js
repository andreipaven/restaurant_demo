import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import ReservationForm from "@/components/contact/ReservationForm";
import ContactLink from "@/components/ui/ContactLink";
import Reveal from "@/components/ui/Reveal";
import Rule from "@/components/ui/Rule";
import {
  bookingSlots,
  eventsMailHref,
  mailHref,
  partySizes,
  site,
} from "@/content/site";
import { palette } from "@/theme/palette";

const labelSx = {
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: 10,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: palette.accent,
};

const linkSx = {
  color: "text.primary",
  textDecoration: "none",
  transition: "color 200ms ease",
  "&:hover": { color: palette.accent },
};

const notes = ["entrance", "parking", "events"];

export default async function ContactDetails() {
  const t = await getTranslations("contact");
  const hours = await getTranslations("hours");

  return (
    <>
      <Container sx={{ pb: { xs: 7, md: 11 } }}>
        <Rule color={palette.accentLine} />
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 5 },
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            pt: { xs: 4, md: 5 },
          }}
        >
          <Reveal
            delay={0.0}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minWidth: 0,
            }}
          >
            <Box sx={labelSx}>{t("labels.phone")}</Box>
            <ContactLink
              kind="phone"
              href={site.phoneHref}
              iconSize={22}
              sx={{
                ...linkSx,
                fontFamily: "var(--font-display), Didot, Georgia, serif",
                fontSize: 26,
                letterSpacing: "0.03em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {site.phone}
            </ContactLink>
            <Typography variant="body2" color="text.secondary">
              {t("phoneNote")}
            </Typography>
          </Reveal>

          <Reveal
            delay={0.1}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minWidth: 0,
            }}
          >
            <Box sx={labelSx}>{t("labels.email")}</Box>
            <ContactLink
              kind="email"
              href={mailHref}
              iconSize={16}
              sx={{ ...linkSx, fontSize: 15, overflowWrap: "anywhere" }}
            >
              {site.email}
            </ContactLink>
            <Typography variant="body2" color="text.secondary">
              {t("emailNote")}
            </Typography>
          </Reveal>

          <Reveal
            delay={0.2}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minWidth: 0,
            }}
          >
            <Box sx={labelSx}>{t("labels.address")}</Box>
            <Typography sx={{ fontSize: 15, lineHeight: 1.7 }}>
              {site.address.street}
              <br />
              {site.address.detail}
              <br />
              {site.address.postcode} {site.address.city}
            </Typography>
          </Reveal>

          <Reveal
            delay={0.3}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minWidth: 0,
            }}
          >
            <Box sx={labelSx}>{t("labels.hours")}</Box>
            <Typography
              sx={{
                fontSize: 15,
                lineHeight: 1.7,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {hours("days")}
              <br />
              {hours("time")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hours("note")}
            </Typography>
          </Reveal>
        </Box>
      </Container>

      <Container sx={{ pb: { xs: 7, md: 11 } }}>
        <Stack sx={{ gap: { xs: 3, md: 4 } }}>
          <Reveal
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              maxWidth: 560,
            }}
          >
            <Typography variant="h2" component="h2">
              {t("form.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("form.lead")}
            </Typography>
          </Reveal>

          <Reveal amount={0.2}>
            <ReservationForm
              slots={bookingSlots}
              sizes={partySizes}
              labels={{
                name: t("form.name"),
                phone: t("form.phone"),
                email: t("form.email"),
                date: t("form.date"),
                time: t("form.time"),
                guests: t("form.guests"),
                message: t("form.message"),
                messagePlaceholder: t("form.messagePlaceholder"),
                submit: t("form.submit"),
                demoNotice: t("form.demoNotice"),
                openCalendar: t("form.openCalendar"),
                errors: t.raw("form.errors"),
              }}
            />
          </Reveal>
        </Stack>
      </Container>

      <Box
        sx={{
          bgcolor: palette.ink,
          borderBlock: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container sx={{ py: { xs: 7, md: 11 } }}>
          <Stack sx={{ gap: { xs: 4, md: 6 } }}>
            <Typography variant="h2" component="h2" sx={{ maxWidth: "18ch" }}>
              {t("findUsTitle")}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: { xs: 4, md: 5 },
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(3, minmax(0, 1fr))",
                },
              }}
            >
              {notes.map((key) => (
                <Reveal
                  key={key}
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Typography variant="h4" component="h3">
                    {t(`notes.${key}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`notes.${key}.body`)}
                  </Typography>
                  {key === "events" && (
                    <ContactLink
                      kind="email"
                      href={eventsMailHref}
                      iconSize={14}
                      sx={{
                        ...linkSx,
                        color: palette.accent,
                        fontFamily: "var(--font-mono), ui-monospace, monospace",
                        fontSize: 12,
                        letterSpacing: "0.1em",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {site.eventsEmail}
                    </ContactLink>
                  )}
                </Reveal>
              ))}
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
