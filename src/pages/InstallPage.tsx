import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import Button from "@mui/material/Button"
import { type CSSProperties } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { CopyButton } from "../components/CopyButton.tsx"
import { install, type OsId } from "../content/install.ts"
import { site } from "../content/site.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"
import { useReveal } from "../hooks/useReveal.ts"

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

function Steps({ os }: { os: OsId }) {
  const system = install.systems[os]
  const { ref, shown } = useReveal<HTMLOListElement>()

  return (
    <ol ref={ref} className={shown ? "steps is-in" : "steps"}>
      <span className="steps__track" aria-hidden="true">
        <span />
      </span>
      {system.steps.map((step, index) => (
        <li key={step.title} style={{ "--i": index } as CSSProperties}>
          <span className="steps__index">{index + 1}</span>
          <div>
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function InstallPage() {
  usePageTitle(`${install.title} — ${site.name}`)
  const [params, setParams] = useSearchParams()
  const queried = osFromQuery(params.get("os"))
  const detected = detectOs()
  const os = queried ?? detected ?? "windows"
  const system = install.systems[os]
  function choose(next: OsId) {
    setParams({ os: next }, { replace: true })
  }

  return (
    <article className="install-page">
      <div className="wrap">
        <header className="install-page__intro">
          <h1>{install.title}</h1>
          <p>{install.intro}</p>
        </header>

        <div className="os-picker" role="radiogroup" aria-label={install.osLabel}>
          {order.map((id) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={os === id}
              className={os === id ? "os-picker__btn is-selected" : "os-picker__btn"}
              onClick={() => choose(id)}
            >
              {install.systems[id].label}
            </button>
          ))}
        </div>
        {!queried && detected && os === detected ? <p className="install-note">{install.detected}</p> : null}

        <Steps key={os} os={os} />

        {os === "windows" ? (
          <div className="install-file">
            <p className="install-file__name" translate="no">
              {site.windows.file}
            </p>
            <p className="install-file__size">{site.windows.size}</p>
            <Button variant="contained" href={site.windows.href} startIcon={<DownloadOutlinedIcon />}>
              {install.download}
            </Button>
          </div>
        ) : (
          <div className="install-command">
            <p className="install-command__label">{install.commandLabel}</p>
            <div className="install-command__row">
              <code translate="no">{site.installCommand}</code>
              <CopyButton text={site.installCommand} />
            </div>
          </div>
        )}

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
