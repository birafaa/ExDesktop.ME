import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import LaptopMacIcon from "@mui/icons-material/LaptopMac"
import TerminalIcon from "@mui/icons-material/Terminal"
import type { SvgIconComponent } from "@mui/icons-material"
import { useSearchParams } from "react-router-dom"
import { CopyButton } from "../components/CopyButton.tsx"
import { install, type OsId } from "../content/install.ts"
import { site } from "../content/site.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"

const order: OsId[] = ["windows", "linux", "macos"]

const icons: Record<OsId, SvgIconComponent> = {
  windows: DesktopWindowsIcon,
  linux: TerminalIcon,
  macos: LaptopMacIcon,
}

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
  const os = queried ?? detectOs() ?? "windows"
  const system = install.systems[os]

  return (
    <article className="install-page">
      <div className="wrap install-simple">
        <h1>{install.title}</h1>
        <div className="os-cards" role="radiogroup" aria-label={install.osLabel}>
          {order.map((id) => {
            const Icon = icons[id]
            const selected = os === id
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={selected ? "os-card is-selected" : "os-card"}
                onClick={() => setParams({ os: id }, { replace: true })}
              >
                <Icon />
                {install.systems[id].label}
              </button>
            )
          })}
        </div>

        {os === "windows" ? (
          <div className="install-action">
            <a className="install-go" href={site.windows.href}>
              <DownloadOutlinedIcon />
              {install.download}
            </a>
            <p className="install-caption" translate="no">
              {site.windows.file} · {site.windows.size}
            </p>
          </div>
        ) : (
          <div className="install-action">
            <div className="install-command__row">
              <code translate="no">{site.installCommand}</code>
              <CopyButton text={site.installCommand} />
            </div>
          </div>
        )}

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
