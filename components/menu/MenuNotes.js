import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import LocaleLink from "@/components/ui/LocaleLink";
import Reveal from "@/components/ui/Reveal";
import Rule from "@/components/ui/Rule";
import { palette } from "@/theme/palette";

const notes = ["allergies", "groups", "prices"];

export default async function MenuNotes() {
  const t = await getTranslations("menu");

  return (
    <Box>
      <Rule color={palette.accentLine} />
      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ gap: { xs: 4, md: 7 }, justifyContent: "space-between" }}
        >
          {notes.map((key, index) => (
            <Reveal
              key={key}
              delay={index * 0.1}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.25,
                flex: "1 1 0",
                minWidth: 0,
                maxWidth: 320,
              }}
            >
              <Box
                sx={{
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: palette.accent,
                }}
              >
                {t(`notes.${key}.title`)}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {t(`notes.${key}.body`)}
              </Typography>
            </Reveal>
          ))}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 4, md: 6 } }}>
          {t.rich("askUs", {
            link: (chunks) => (
              <LocaleLink href="/contact" sx={{ color: palette.accent }}>
                {chunks}
              </LocaleLink>
            ),
          })}
        </Typography>
      </Container>
    </Box>
  );
}
