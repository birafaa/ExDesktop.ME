import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import CheckIcon from "@mui/icons-material/Check"
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined"
import LaptopMacIcon from "@mui/icons-material/LaptopMac"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined"
import TerminalIcon from "@mui/icons-material/Terminal"
import type { SvgIconComponent } from "@mui/icons-material"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import { home } from "../../content/home.ts"
import { Logo } from "../brand/Logo.tsx"
import { SectionHeading } from "../SectionHeading.tsx"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function useCardMotion<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [entered, setEntered] = useState(true)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const node = ref.current
    document.documentElement.classList.add("js")
    if (!node || prefersReducedMotion() || typeof IntersectionObserver !== "function") return

    setEntered(false)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEntered(true)
        setLive(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, entered, live }
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
      <div className="port-board">
        <div className="vig-plugin">
          <span className="vig-ico" data-tone="pink">
            <ExtensionOutlinedIcon fontSize="small" />
          </span>
          <b translate="no">exteraGram</b>
        </div>
        <div className="port-lane">
          <span className="vig-track">
            <i />
          </span>
          <span className="vig-mover">
            <ExtensionOutlinedIcon fontSize="inherit" />
          </span>
        </div>
        <div className="vig-plugin vig-plugin--dest">
          <Logo size={26} />
          <b translate="no">exDesktop</b>
          <CheckIcon className="vig-check" fontSize="inherit" />
        </div>
      </div>
      <span className="vig-port">
        <AutoAwesomeIcon className="vig-spark" fontSize="small" />
        Перенести с помощью ИИ
      </span>
    </div>
  )
}

const systems: Array<{ label: string; icon: SvgIconComponent }> = [
  { label: "Windows", icon: DesktopWindowsIcon },
  { label: "Linux", icon: TerminalIcon },
  { label: "macOS", icon: LaptopMacIcon },
]

function SystemsVignette() {
  return (
    <div className="vignette vignette--systems" aria-hidden="true">
      {systems.map((system, index) => {
        const Icon = system.icon
        return (
          <div key={system.label} className="os-frame" style={{ "--n": index } as CSSProperties}>
            <div className="os-frame__bar">
              <Icon fontSize="small" />
              <span className="ok-dot" />
              <CheckIcon className="os-check" fontSize="inherit" />
            </div>
            <span className="os-frame__name">{system.label}</span>
          </div>
        )
      })}
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
  const { ref, entered, live } = useCardMotion<HTMLElement>()
  const View = views[title]
  const classes = ["diff-row", entered ? "is-in" : "", live ? "is-live" : ""].filter(Boolean).join(" ")
  return (
    <article ref={ref} className={classes} style={{ "--i": index } as CSSProperties}>
      <div className="diff-copy">
        <span className="diff-index">{String(index + 1).padStart(2, "0")}</span>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className="diff-panel">
        <View />
      </div>
    </article>
  )
}

export function FeatureRows() {
  const block = home.difference
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
