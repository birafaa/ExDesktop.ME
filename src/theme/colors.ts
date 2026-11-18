/**
 * Тональная палитра Material 3 от оранжевого exdesktop.xyz (`--brand: #EA5846`).
 * Primary зафиксирован на этом цвете. Остальные роли — tonal spot, hue 27.
 * Hex совпадают с переменными в src/styles/global.css.
 */
export const lightColors = {
  bg: "#FFF8F6",
  surface: "#FFFFFF",
  ink: "#231918",
  inkMuted: "#534341",
  primary: "#EA5846",
  onPrimary: "#FFFFFF",
  primaryContainer: "#FFDAD5",
  onPrimaryContainer: "#73342B",
  secondary: "#775651",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#FFDAD5",
  onSecondaryContainer: "#5D3F3B",
  outline: "#857370",
  outlineVariant: "#D8C2BE",
} as const

export const darkColors = {
  bg: "#1A1110",
  surface: "#231918",
  ink: "#F1DFDC",
  inkMuted: "#D8C2BE",
  primary: "#EA5846",
  onPrimary: "#FFFFFF",
  primaryContainer: "#73342B",
  onPrimaryContainer: "#FFDAD5",
  secondary: "#E7BDB6",
  onSecondary: "#442925",
  secondaryContainer: "#5D3F3B",
  onSecondaryContainer: "#FFDAD5",
  outline: "#A08C89",
  outlineVariant: "#534341",
} as const
