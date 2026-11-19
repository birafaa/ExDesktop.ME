import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import { useEffect, useId, useRef, useState, type MouseEvent } from "react"
import { Link } from "react-router-dom"
import { home } from "../../content/home.ts"
import { install, type OsId } from "../../content/install.ts"
import { site } from "../../content/site.ts"
import { useDetectedOs } from "../../hooks/useOs.ts"
import { Logo } from "../brand/Logo.tsx"
import { OsTabs } from "../install/OsTabs.tsx"
import { ChannelWindow } from "./ChannelWindow.tsx"
import { SettingsPeek } from "./SettingsPeek.tsx"

function shiftPeek(event: MouseEvent<HTMLDivElement>, reset = false) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  const node = event.currentTarget
  if (reset) {
    node.style.setProperty("--px", "0px")
    node.style.setProperty("--py", "0px")
    return
  }
  const rect = node.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10
  node.style.setProperty("--px", `${x.toFixed(1)}px`)
  node.style.setProperty("--py", `${y.toFixed(1)}px`)
}

function PlatformDialog({
  os,
  onClose,
  onPick,
}: {
  os: OsId
  onClose: () => void
  onPick: (id: OsId) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    const node = ref.current
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    node?.querySelector<HTMLButtonElement>("button")?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== "Tab" || !node) return
      const items = [...node.querySelectorAll<HTMLButtonElement>("button")]
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      previous?.focus()
    }
  }, [onClose])

  return (
    <div className="picker-backdrop" onMouseDown={onClose}>
      <div
        ref={ref}
        className="picker"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id={titleId}>{site.otherPlatforms}</h2>
        <OsTabs os={os} label={install.osLabel} onChange={onPick} />
      </div>
    </div>
  )
}

export function Hero() {
  const detected = useDetectedOs()
  const [os, setOs] = useState<OsId>(detected)
  const [picked, setPicked] = useState(false)
  const [open, setOpen] = useState(false)
  const active = picked ? os : detected

  const download =
    active === "windows" ? (
      <a className="hero-download" href={site.windows.href}>
        <DownloadOutlinedIcon />
        {site.downloadLabel.windows}
      </a>
    ) : (
      <Link className="hero-download" to={`/install?os=${active}`}>
        <DownloadOutlinedIcon />
        {site.downloadLabel[active]}
      </Link>
    )

  return (
    <>
      <section className="hero section" aria-labelledby="hero-title">
        <span className="hero__shape hero__shape--a" aria-hidden="true" />
        <span className="hero__shape hero__shape--b" aria-hidden="true" />
        <div className="wrap hero__copy">
          <Logo size={56} />
          <h1 id="hero-title" translate="no">
            {site.name}
          </h1>
          <p className="section-intro">{home.hero.extra}</p>
          <div className="hero__actions">{download}</div>
          <button type="button" className="hero__other" onClick={() => setOpen(true)}>
            {site.otherPlatforms}
          </button>
          <p className="hero__meta">
            <span translate="no">{site.version}</span>
            {active === "windows" ? (
              <>
                {" · "}
                <span translate="no">{site.windows.size}</span>
              </>
            ) : null}
            {" · "}
            {site.placeholders.requirements}
          </p>
        </div>
      </section>
      {open ? (
        <PlatformDialog
          os={active}
          onClose={() => setOpen(false)}
          onPick={(id) => {
            setOs(id)
            setPicked(true)
            setOpen(false)
          }}
        />
      ) : null}
      <section className="preview" aria-hidden="true">
        <div className="wrap">
          <div
            className="hero__stage"
            onMouseMove={(event) => shiftPeek(event)}
            onMouseLeave={(event) => shiftPeek(event, true)}
          >
            <div className="hero__back">
              <SettingsPeek />
            </div>
            <div className="hero__front">
              <ChannelWindow />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
