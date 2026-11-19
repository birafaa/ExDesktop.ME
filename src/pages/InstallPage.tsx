import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import { useState, type CSSProperties } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { CopyButton } from "../components/CopyButton.tsx"
import { install, type OsId } from "../content/install.ts"
import { site } from "../content/site.ts"
import { ui } from "../content/ui.ts"
import { useCopy } from "../hooks/useCopy.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"

const order: OsId[] = ["windows", "linux", "macos"]

function detectOs(): OsId | null {
  const ua = navigator.userAgent
  if (/Windows/i.test(ua)) return "windows"
  if (/Macintosh|Mac OS X/i.test(ua)) return "macos"
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return "linux"
  return null
}

function osFromQuery(value: string | null): OsId | null {
  if (value === "windows" || value === "linux" || value === "macos") return value
  return null
}

export function InstallPage() {
  usePageTitle(`${install.title} — ${site.name}`)
  const [params, setParams] = useSearchParams()
  const queried = osFromQuery(params.get("os"))
  const detected = detectOs()
  const os = queried ?? detected ?? "windows"
  const system = install.systems[os]
  const [started, setStarted] = useState(false)
  const { copy } = useCopy()
  function choose(next: OsId) {
    setStarted(false)
    setParams({ os: next }, { replace: true })
  }

  return (
    <article className="install-page">
      <div className="wrap">
        <header className="install-hero">
          <p className="install-hero__os">{system.label}</p>
          <h1>{install.title}</h1>
          <p>{install.intro}</p>
          {!queried && detected && os === detected ? <p className="install-note">{install.detected}</p> : null}
          {os === "windows" ? (
            <a className="install-go" href={site.windows.href} onClick={() => setStarted(true)}>
              <DownloadOutlinedIcon />
              {install.download}
            </a>
          ) : (
            <button
              type="button"
              className="install-go"
              onClick={() => {
                void copy(site.installCommand)
                setStarted(true)
              }}
            >
              {ui.actions.copy}
            </button>
          )}
          <div className="install-switch" role="radiogroup" aria-label={install.osLabel}>
            {order.map((id) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={os === id}
                className={os === id ? "is-selected" : undefined}
                onClick={() => choose(id)}
              >
                {install.systems[id].label}
              </button>
            ))}
          </div>
        </header>

        {started ? (
          <section className="next-steps" aria-label={install.title}>
            {os !== "windows" ? (
              <div className="install-command__row">
                <code translate="no">{site.installCommand}</code>
                <CopyButton text={site.installCommand} />
              </div>
            ) : (
              <p className="install-file__name" translate="no">
                {site.windows.file} · {site.windows.size}
              </p>
            )}
            <ol className="steps is-in">
              {system.steps.map((step, index) => (
                <li key={step.title} style={{ "--i": index } as CSSProperties}>
                  <span className="steps__index">{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="install-req" aria-labelledby="req-title">
          <h2 id="req-title">{install.requirementsTitle}</h2>
          <ul>
            {system.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

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
          <p>
            <Link to="/docs">{install.docsLink}</Link>
          </p>
        </section>
      </div>
    </article>
  )
}
