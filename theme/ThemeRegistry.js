"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { cssVariables } from "./palette";
import theme from "./theme";

export default function ThemeRegistry({ children }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Publishes the palette as CSS variables so globals.css can use the
            same tokens the components do. */}
        <GlobalStyles styles={{ ":root": cssVariables }} />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
