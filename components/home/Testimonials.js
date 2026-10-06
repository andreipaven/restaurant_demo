import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import { palette } from "@/theme/palette";

const ids = ["one", "two", "three"];

function Star() {
  return (
    <Box component="svg" viewBox="0 0 20 20" aria-hidden="true" sx={{ width: 18, height: 18 }}>
      <path
        d="M10 1.6l2.5 5.3 5.6.8-4.1 4 1 5.7L10 14.7 4.9 17.4l1-5.7-4.1-4 5.6-.8Z"
        fill={palette.accent}
      />
    </Box>
  );
}

export default async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <Box id="recenzii" sx={{ borderTop: "1px solid", borderColor: "divider", scrollMarginTop: 80 }}>
      <Container sx={{ py: { xs: 8, md: 14 } }}>
        <Reveal
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 7 },
            justifyContent: "space-between",
            alignItems: { md: "flex-end" },
            mb: { xs: 5, md: 8 },
          }}
        >
          <Stack sx={{ gap: 2.5, maxWidth: 620 }}>
            <Typography variant="overline" component="p">
              {t("eyebrow")}
            </Typography>
            <Typography variant="h2" component="h2" sx={{ textWrap: "balance" }}>
              {t("title")}
            </Typography>
          </Stack>

          <Stack sx={{ gap: 1.5, maxWidth: 260 }}>
            <Stack direction="row" sx={{ gap: 0.6 }} role="img" aria-label={t("ratingLabel")}>
              {[0, 1, 2, 3, 4].map((index) => (
                <Star key={index} />
              ))}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {t("rating")}
            </Typography>
          </Stack>
        </Reveal>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" },
          }}
        >
          {ids.map((id, index) => (
            <Reveal
              key={id}
              component="figure"
              sx={{
                m: 0,
                gap: 2.75,
                p: { xs: 3.5, md: 4 },
                borderRadius: "26px",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: index === 1 ? palette.accentLine : "divider",
                boxShadow: palette.gloss,
              }}
            >
              <Box
                component="svg"
                viewBox="0 0 40 28"
                aria-hidden="true"
                sx={{ width: 34, height: 24, opacity: index === 1 ? 1 : 0.5 }}
              >
                <path
                  d="M0 28V15C0 6.7 5.2 1 13.6 0l1.7 5.3C10.8 6.6 8.4 9.3 8.4 13H15v15Zm24.7 0V15C24.7 6.7 29.9 1 38.3 0L40 5.3c-4.5 1.3-6.9 4-6.9 7.7h6.6v15Z"
                  fill={palette.accent}
                />
              </Box>

              <Typography
                component="blockquote"
                sx={{
                  m: 0,
                  fontFamily: "var(--font-display), Didot, Georgia, serif",
                  fontSize: 20,
                  lineHeight: 1.45,
                }}
              >
                {`„${t(`items.${id}.quote`)}”`}
              </Typography>

              <Stack
                component="figcaption"
                direction="row"
                // The grid already makes the cards equal height; `mt: auto`
                // drops every footer to the bottom, so the rules and the
                // avatars line up across the row however long the quote is.
                sx={{
                  gap: 1.75,
                  mt: "auto",
                  alignItems: "center",
                  pt: 2.5,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    flex: "0 0 44px",
                    borderRadius: "50%",
                    border: "1px solid",
                    borderColor: palette.accent,
                    color: palette.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display), Didot, Georgia, serif",
                    fontSize: 16,
                  }}
                >
                  {t(`items.${id}.initials`)}
                </Box>
                <Box sx={{ fontSize: 15, fontWeight: 600, minWidth: 0 }}>
                  {t(`items.${id}.name`)}
                </Box>
              </Stack>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
