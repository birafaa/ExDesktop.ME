import { useEffect, useState } from "react"

export type CopyStatus = "idle" | "copied" | "error"

export function useCopy(): { status: CopyStatus; copy: (text: string) => Promise<void> } {
  const [status, setStatus] = useState<CopyStatus>("idle")

  useEffect(() => {
    if (status === "idle") return
    const timer = window.setTimeout(() => setStatus("idle"), 2000)
    return () => window.clearTimeout(timer)
  }, [status])

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setStatus("copied")
      return
    } catch {
      try {
        const area = document.createElement("textarea")
        area.value = text
        area.setAttribute("readonly", "")
        area.style.position = "fixed"
        area.style.left = "-9999px"
        document.body.append(area)
        area.select()
        const ok = document.execCommand("copy")
        area.remove()
        setStatus(ok ? "copied" : "error")
      } catch {
        setStatus("error")
      }
    }
  }

  return { status, copy }
}
