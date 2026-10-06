"use client";

import Box from "@mui/material/Box";
import { Link, usePathname } from "@/i18n/navigation";
import { palette } from "@/theme/palette";

export default function NavLink({ href, children, sx }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Box
      component={Link}
      href={href}
      aria-current={active ? "page" : undefined}
      sx={{
        py: 1.5,
        fontSize: 14,
        textDecoration: "none",
        color: active ? "text.primary" : "text.secondary",
        borderBottom: "1px solid",
        borderColor: active ? palette.accent : "transparent",
        transition: "color 200ms ease, border-color 200ms ease",
        "&:hover": { color: "text.primary" },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
