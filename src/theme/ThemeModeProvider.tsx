import { useEffect, useMemo, useState, type ReactNode } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { flushSync } from "react-dom"
import { useReducedMotion } from "../hooks/useReducedMotion.ts"
import { createAppTheme } from "./theme.ts"
import { ThemeModeContext, type ThemeMode, type ThemePreference } from "./theme-mode.ts"

const STORAGE_KEY = "exdesktop-color-scheme"

function systemMode(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {
    /* storage can be blocked */
  }
  return "system"
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(readPreference)
  const [system, setSystem] = useState<ThemeMode>(systemMode)
  const reducedMotion = useReducedMotion()
  const mode: ThemeMode = preference === "system" ? system : preference

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const apply = () => setSystem(query.matches ? "dark" : "light")
    apply()
    query.addEventListener("change", apply)
    return () => query.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    document.documentElement.style.colorScheme = mode
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute("content", getComputedStyle(document.documentElement).getPropertyValue("--bg").trim())
  }, [mode])

  const toggle = (origin?: { x: number; y: number }) => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark"
    const apply = () => {
      setPreference(next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
    }

    const view = document as Document & {
      startViewTransition?: (callback: () => void) => void
    }
    if (reducedMotion || !view.startViewTransition) {
      apply()
      return
    }
    if (origin) {
      document.documentElement.style.setProperty("--theme-x", `${origin.x}px`)
      document.documentElement.style.setProperty("--theme-y", `${origin.y}px`)
    }
    view.startViewTransition(() => {
      flushSync(apply)
    })
  }

  const theme = useMemo(() => createAppTheme(mode, reducedMotion), [mode, reducedMotion])

  return (
    <ThemeModeContext.Provider value={{ mode, preference, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
