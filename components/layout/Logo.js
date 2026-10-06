import Box from "@mui/material/Box";
import LocaleLink from "@/components/ui/LocaleLink";
import Logomark from "@/components/ui/Logomark";
import { site } from "@/content/site";
import { palette } from "@/theme/palette";

export default function Logo({ withMark = false, size = 26 }) {
  return (
    <LocaleLink
      href="/"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: withMark ? 1.75 : 1.25,
        textDecoration: "none",
        color: "text.primary",
      }}
    >
      {withMark && <Logomark size={size + 6} />}
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.25 }}>
        <Box
          component="span"
          sx={{
            fontFamily: "var(--font-display), Didot, Georgia, serif",
            fontSize: { xs: size - 4, sm: size },
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {site.name}
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: "none", sm: "block" },
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: palette.accent,
          }}
        >
          {site.established}
        </Box>
      </Box>
    </LocaleLink>
  );
}
