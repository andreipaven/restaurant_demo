import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { getTranslations } from "next-intl/server";
import { addressLine } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import { palette } from "@/theme/palette";

export default async function Strip() {
  const t = await getTranslations("strip");
  const hours = await getTranslations("hours");

  const items = [`${hours("days")} · ${hours("time")}`, addressLine, t("highlight")];

  return (
    <Box sx={{ bgcolor: palette.ink, borderBlock: "1px solid", borderColor: "divider" }}>
      <Container>
        <Reveal
          duration={0.7}
          sx={{
            display: "flex",
            flexDirection: "row",
            py: 2.5,
            gap: { xs: 1.5, sm: 3.5 },
            flexWrap: "wrap",
            alignItems: "center",
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {items.map((item, index) => (
            <Stack
              key={item}
              direction="row"
              sx={{ gap: { xs: 1.5, sm: 3.5 }, alignItems: "center" }}
            >
              {index > 0 && (
                <Box component="span" aria-hidden="true" sx={{ color: "text.secondary", opacity: 0.5 }}>
                  /
                </Box>
              )}
              <Box component="span">{item}</Box>
            </Stack>
          ))}
          <Box component="span" sx={{ color: palette.accent }}>
            {t("events")}
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
