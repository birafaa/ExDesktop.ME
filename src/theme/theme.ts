import { createTheme } from "@mui/material/styles"
import { darkColors, lightColors } from "./colors.ts"

export function createAppTheme(mode: "light" | "dark", reducedMotion: boolean) {
  const colors = mode === "dark" ? darkColors : lightColors
  const duration = reducedMotion
    ? {
        shortest: 0,
        shorter: 0,
        short: 0,
        standard: 0,
        complex: 0,
        enteringScreen: 0,
        leavingScreen: 0,
      }
    : undefined

  return createTheme({
    cssVariables: { nativeColor: true, colorSchemeSelector: "data-theme" },
    palette: {
      mode,
      primary: { main: colors.primary, contrastText: colors.onPrimary },
      secondary: { main: colors.secondary, contrastText: colors.onSecondary },
      background: { default: colors.bg, paper: colors.surface },
      text: { primary: colors.ink, secondary: colors.inkMuted },
      divider: colors.outlineVariant,
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: '"Manrope Variable", Manrope, sans-serif',
      button: {
        textTransform: "none",
        fontWeight: 700,
        fontFamily: '"Manrope Variable", Manrope, sans-serif',
      },
    },
    transitions: duration ? { duration } : {},
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "var(--bg)",
            color: "var(--ink)",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true, disableRipple: reducedMotion },
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
            padding: "12px 22px",
            minHeight: 48,
            boxShadow: "none",
            transition: reducedMotion
              ? "none"
              : "transform 420ms cubic-bezier(0.34, 1.45, 0.64, 1), background-color 180ms ease, border-color 180ms ease",
            "&:active": { transform: "scale(0.97)" },
          },
          contained: {
            backgroundColor: "var(--primary)",
            color: "var(--on-primary)",
            "&:hover": {
              backgroundColor: "var(--primary-hover)",
              boxShadow: "none",
            },
          },
          outlined: {
            borderColor: "var(--outline)",
            borderWidth: 1.5,
            color: "var(--ink)",
            "&:hover": {
              borderColor: "var(--primary)",
              borderWidth: 1.5,
              backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
            },
          },
        },
      },
      MuiIconButton: {
        defaultProps: { disableRipple: reducedMotion },
        styleOverrides: {
          root: {
            width: 48,
            height: 48,
            color: "var(--ink)",
            "&:hover": {
              backgroundColor: "color-mix(in srgb, var(--primary) 12%, transparent)",
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 700,
            minHeight: 48,
            fontSize: "1rem",
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: { height: 3, borderRadius: 99 },
        },
      },
    },
  })
}
