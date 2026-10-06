import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";

const display = "var(--font-display), Didot, Georgia, serif";
const body = "var(--font-body), system-ui, 'Segoe UI', sans-serif";
const mono = "var(--font-mono), ui-monospace, monospace";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: palette.ink, paper: palette.surfaceRaised },
    primary: { main: palette.accent, contrastText: palette.ink },
    secondary: { main: palette.wine, contrastText: palette.bone },
    text: { primary: palette.bone, secondary: palette.muted },
    divider: palette.line,
  },
  shape: { borderRadius: 24 },
  typography: {
    fontFamily: body,
    h1: {
      fontFamily: display,
      fontWeight: 400,
      lineHeight: 1.02,
      letterSpacing: "-0.015em",
      fontSize: "clamp(2.75rem, 6vw, 5rem)",
    },
    h2: {
      fontFamily: display,
      fontWeight: 400,
      lineHeight: 1.06,
      letterSpacing: "-0.015em",
      fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
    },
    h3: {
      fontFamily: display,
      fontWeight: 400,
      lineHeight: 1.15,
      fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)",
    },
    h4: { fontFamily: display, fontWeight: 400, lineHeight: 1.2, fontSize: "1.3rem" },
    body1: { fontSize: "1.0625rem", lineHeight: 1.65, fontWeight: 300 },
    body2: { fontSize: "0.9375rem", lineHeight: 1.6, fontWeight: 300 },
    overline: {
      fontFamily: mono,
      fontSize: "0.625rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      lineHeight: 1.6,
      color: palette.accent,
    },
    button: { textTransform: "none", fontWeight: 600, fontSize: "0.9375rem" },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, minHeight: 52, paddingInline: 30 },
        outlined: { borderColor: palette.lineStrong, color: palette.bone },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: 8,
          borderRadius: 14,
          backgroundColor: palette.surfaceRaised,
          backgroundImage: "none",
          border: `1px solid ${palette.accentLine}`,
          boxShadow: palette.shadowMenu,
        },
        list: { paddingBlock: 6 },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 15,
          minHeight: 42,
          "&:hover": { backgroundColor: palette.line },
          "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: palette.accentFill,
            color: palette.accent,
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: "lg" },
      styleOverrides: {
        root: {
          paddingInline: 20,
          "@media (min-width:600px)": { paddingInline: 40 },
          "@media (min-width:900px)": { paddingInline: 56 },
        },
      },
    },
  },
});

export default theme;
