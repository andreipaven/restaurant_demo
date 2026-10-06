import Box from "@mui/material/Box";
import { palette } from "@/theme/palette";

/** The house diamond, cut like the stone the restaurant is named after. */
export default function Logomark({ size = 28, color = palette.accent, sx }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      sx={{ width: size, height: size, flex: `0 0 ${size}px`, display: "block", ...sx }}
    >
      <path d="M16 3l10 13-10 16L6 16Z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M16 3l10 13H6Z" fill={color} opacity="0.9" />
    </Box>
  );
}
