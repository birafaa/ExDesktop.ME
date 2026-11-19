import { useState } from "react"
import type { OsId } from "../content/install.ts"

type UserAgentData = { platform?: string }

export function detectOs(): OsId {
  const nav = navigator as Navigator & { userAgentData?: UserAgentData }
  const platform = nav.userAgentData?.platform ?? ""
  const ua = navigator.userAgent
  if (/win/i.test(platform) || /Windows/i.test(ua)) return "windows"
  if (/mac/i.test(platform) || /Macintosh|Mac OS X/i.test(ua)) return "macos"
  if (/linux|cros|chrome os/i.test(platform) || (/Linux/i.test(ua) && !/Android/i.test(ua))) return "linux"
  return "windows"
}

export function useDetectedOs(): OsId {
  const [os] = useState(detectOs)
  return os
}
