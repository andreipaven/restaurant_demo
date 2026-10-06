import Box from "@mui/material/Box";
import { palette } from "@/theme/palette";

const icons = {
  phone: (
    <path
      d="M5 3h3.4l1.6 4.2-2.1 1.6a12 12 0 0 0 5.3 5.3l1.6-2.1L19 13.6V17a2 2 0 0 1-2.2 2A15.4 15.4 0 0 1 3 5.2 2 2 0 0 1 5 3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  email: (
    <>
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.8 8.2 12 13.6l8.2-5.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

/**
 * A phone number or an address, with the matching mark in front. One component
 * so the two look the same wherever they appear.
 */
export default function ContactLink({ kind, href, children, iconSize = 17, sx }) {
  return (
    <Box
      component="a"
      href={href}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        textDecoration: "none",
        color: "text.primary",
        transition: "color 200ms ease",
        "&:hover": { color: palette.accent },
        ...sx,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        sx={{
          width: iconSize,
          height: iconSize,
          flex: `0 0 ${iconSize}px`,
          color: palette.accent,
        }}
      >
        {icons[kind]}
      </Box>
      <Box component="span" sx={{ minWidth: 0 }}>
        {children}
      </Box>
    </Box>
  );
}
