import { createContext, useContext } from "react"

export type ThemeMode = "light" | "dark"
export type ThemePreference = ThemeMode | "system"

export type ThemeModeValue = {
  mode: ThemeMode
  preference: ThemePreference
  toggle: (origin?: { x: number; y: number }) => void
}

export const ThemeModeContext = createContext<ThemeModeValue | null>(null)

export function useThemeMode(): ThemeModeValue {
  const value = useContext(ThemeModeContext)
  if (!value) {
    throw new Error("useThemeMode must be used within ThemeModeProvider")
  }
  return value
}
