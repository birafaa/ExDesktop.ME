import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { InstallAction } from "../components/install/InstallAction.tsx"
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
  const system = install.systems[os]

  return (
    <article className="install-page">
      <div className="wrap install-simple">
        <h1>{install.title}</h1>
        <OsTabs
          os={os}
          label={install.osLabel}
          onChange={(id) => setParams({ os: id }, { replace: true })}
        />
        <InstallAction os={os} />
        <ol className="install-steps">
          {system.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <section className="install-faq" aria-labelledby="faq-title">
          <h2 id="faq-title">{install.faqTitle}</h2>
          <div className="install-faq__list">
            {install.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
