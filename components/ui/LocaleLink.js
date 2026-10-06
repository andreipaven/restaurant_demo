"use client";

import { forwardRef } from "react";
import Box from "@mui/material/Box";
import { Link } from "@/i18n/navigation";

/**
 * next-intl's `Link` is built at module scope, so it cannot be handed to a MUI
 * component straight from a Server Component. This wrapper crosses that border
 * once, and forwards the ref so MUI can use it as a `component`.
 */
const LocaleLink = forwardRef(function LocaleLink(
  { href, locale, sx, children, ...rest },
  ref,
) {
  return (
    <Box component={Link} href={href} locale={locale} ref={ref} sx={sx} {...rest}>
      {children}
    </Box>
  );
});

export default LocaleLink;
