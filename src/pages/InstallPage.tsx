import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { InstallStage } from "../components/install/InstallStage.tsx"
import { OsTabs } from "../components/install/OsTabs.tsx"
import { install, type OsId } from "../content/install.ts"
import { site } from "../content/site.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"
import { detectOs } from "../hooks/useOs.ts"

function osFromQuery(value: string | null): OsId | null {
  if (value === "windows" || value === "linux" || value === "macos") return value
  return null
}

export function InstallPage() {
  usePageTitle(`${install.title} — ${site.name}`)
  const [params, setParams] = useSearchParams()
  const queried = osFromQuery(params.get("os"))
  const [fallback] = useState(detectOs)
  const os = queried ?? fallback

  return (
    <article className="install-page">
      <span className="hero__shape hero__shape--a" aria-hidden="true" />
      <span className="hero__shape hero__shape--b" aria-hidden="true" />
      <div className="wrap install-hero">
        <h1>{install.title}</h1>
        <OsTabs
          os={os}
          variant="pills"
          label={install.osLabel}
          onChange={(id) => setParams({ os: id }, { replace: true })}
        />
        <InstallStage os={os} />
      </div>
    </article>
  )
}
