/** Роли темы читают токены из src/styles/tokens.css. */
export const lightColors = {
  bg: "var(--bg)",
  surface: "var(--surface)",
  ink: "var(--ink)",
  inkMuted: "var(--ink-muted)",
  primary: "var(--primary)",
  onPrimary: "var(--on-primary)",
  primaryContainer: "var(--primary-container)",
  onPrimaryContainer: "var(--on-primary-container)",
  secondary: "var(--secondary)",
  onSecondary: "var(--on-primary)",
  secondaryContainer: "var(--secondary-container)",
  onSecondaryContainer: "var(--on-secondary-container)",
  outline: "var(--outline)",
  outlineVariant: "var(--outline-variant)",
} as const

export const darkColors = lightColors
