import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import CheckIcon from "@mui/icons-material/Check"
import ExtensionIcon from "@mui/icons-material/Extension"
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined"
import { useLayoutEffect, type CSSProperties } from "react"
import { home } from "../../content/home.ts"
import { BrandIcon } from "../brand/BrandIcon.tsx"
import { brandPaths } from "../brand/brand-paths.ts"
import { Logo } from "../brand/Logo.tsx"
import { SectionHeading } from "../SectionHeading.tsx"

function useScrollProgress() {
  useLayoutEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const root = document.documentElement
    const tracks = () => document.querySelectorAll<HTMLElement>(".diff-track")
    const shown = new WeakMap<HTMLElement, number>()
    let frame = 0
    let running = false

    const paint = () => {
      const view = window.innerHeight
      tracks().forEach((track) => {
        const row = track.querySelector<HTMLElement>(".diff-row")
        if (!row) return
        const rect = track.getBoundingClientRect()
        const pin = row.offsetHeight
        const top = Number.parseFloat(getComputedStyle(row).top) || 0
        const stuck = Math.max(1, track.offsetHeight - pin)
        const total = Math.max(1, view - top + stuck)
        const target = Math.min(1, Math.max(0, (view - rect.top) / total))
        const prev = shown.get(row)
        const from = prev ?? target
        const next = Math.abs(target - from) < 0.0006 ? target : from + (target - from) * 0.1
        shown.set(row, next)
        if (prev === undefined || Math.abs(next - prev) > 0.0004) {
          row.style.setProperty("--p", next.toFixed(4))
        }
      })
    }

    const tick = () => {
      frame = 0
      if (!running) return
      paint()
      frame = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (media.matches || running) return
      running = true
      root.classList.add("scroll-motion")
      paint()
      if (!document.hidden) frame = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      root.classList.remove("scroll-motion")
      document.querySelectorAll<HTMLElement>(".diff-row").forEach((row) => {
        shown.delete(row)
        row.style.removeProperty("--p")
      })
    }

    const onMedia = () => {
      stop()
      start()
    }

    const onHide = () => {
      if (document.hidden) {
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
        return
      }
      if (running && frame === 0) frame = window.requestAnimationFrame(tick)
    }

    start()
    media.addEventListener("change", onMedia)
    document.addEventListener("visibilitychange", onHide)
    return () => {
      media.removeEventListener("change", onMedia)
      document.removeEventListener("visibilitychange", onHide)
      stop()
    }
  }, [])
}

const tones = ["violet", "blue", "pink", "teal"] as const

function PluginsVignette() {
  return (
    <div className="vignette" aria-hidden="true">
      <span className="vig-badge" translate="no">
        SDK 1.4.6.2
      </span>
      <ul className="vig-list">
        {tones.map((tone, index) => (
          <li key={tone} style={{ "--n": index } as CSSProperties}>
            <span className="vig-ico" data-tone={tone}>
              <ExtensionOutlinedIcon fontSize="small" />
            </span>
            <span className="vig-lines">
              <i />
              <i />
            </span>
            <span className={index === 1 ? "vig-switch is-held" : "vig-switch"}>
              <span className="vig-switch__on" />
              <i />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PortVignette() {
  return (
    <div className="vignette vignette--port" aria-hidden="true">
      <div className="port-stage">
        <div className="port-end">
          <span className="port-app">
            <img className="extera-mark" src="/icons/exteragram.webp" alt="" width={44} height={44} />
          </span>
          <span className="port-name" translate="no">
            exteraGram
          </span>
        </div>
        <div className="port-gap" />
        <div className="port-end">
          <span className="port-app">
            <Logo size={44} />
          </span>
          <span className="port-name" translate="no">
            exDesktop
          </span>
          <CheckIcon className="vig-check" fontSize="inherit" />
        </div>
        <span className="vig-track">
          <i />
        </span>
        <span className="vig-mover">
          <ExtensionIcon fontSize="inherit" />
        </span>
      </div>
      <span className="vig-port">
        <AutoAwesomeIcon className="vig-spark" fontSize="small" />
        Перенести с помощью ИИ
      </span>
    </div>
  )
}

const systems = [
  { label: "Windows", path: brandPaths.windows },
  { label: "Linux", path: brandPaths.linux },
  { label: "macOS", path: brandPaths.apple },
] as const

function SystemsVignette() {
  return (
    <div className="vignette vignette--systems" aria-hidden="true">
      {systems.map((system, index) => (
        <div key={system.label} className="os-frame" style={{ "--n": index } as CSSProperties}>
          <div className="os-frame__bar">
            <BrandIcon path={system.path} size={28} />
            <span className="ok-dot" />
            <CheckIcon className="os-check" fontSize="inherit" />
          </div>
          <span className="os-frame__name">{system.label}</span>
        </div>
      ))}
    </div>
  )
}

const blocked = ["Файлы", "Сеть", "Система"]

function SandboxVignette() {
  return (
    <div className="vignette vignette--sandbox" aria-hidden="true">
      <ul className="vig-blocked">
        {blocked.map((label, index) => (
          <li key={label} style={{ "--n": index } as CSSProperties}>
            <LockOutlinedIcon fontSize="inherit" />
            {label}
          </li>
        ))}
      </ul>
      <div className="vig-field">
        {blocked.map((label, index) => (
          <span key={label} className="probe" style={{ "--n": index } as CSSProperties} />
        ))}
        <div className="vig-sandbox">
          <ShieldOutlinedIcon className="vig-shield" />
          <span className="vig-ico" data-tone="violet">
            <ExtensionOutlinedIcon fontSize="small" />
          </span>
          <span className="vig-lines">
            <i />
            <i />
          </span>
        </div>
      </div>
    </div>
  )
}

const views = {
  Плагины: PluginsVignette,
  Перенос: PortVignette,
  Системы: SystemsVignette,
  Среда: SandboxVignette,
} as const

function Feature({
  title,
  body,
  index,
}: {
  title: keyof typeof views
  body: string
  index: number
}) {
  const View = views[title]
  return (
    <div className="diff-track">
      <article className={`diff-row diff-row--${index}`} style={{ "--i": index } as CSSProperties}>
        <div className="diff-copy">
          <span className="diff-index">{String(index + 1).padStart(2, "0")}</span>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
        <div className="diff-panel">
          <View />
        </div>
      </article>
      <div className="diff-spacer" aria-hidden="true" />
    </div>
  )
}

export function FeatureRows() {
  const block = home.difference
  useScrollProgress()
  return (
    <section className="section features" aria-labelledby="difference-title">
      <div className="wrap">
        <SectionHeading id={block.id} titleId="difference-title" title={block.title} />
        <div className="diff-list">
          {block.items.map((item, index) => (
            <Feature key={item.title} title={item.title} body={item.body} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
