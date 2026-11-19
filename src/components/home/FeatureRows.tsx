import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import LaptopMacIcon from "@mui/icons-material/LaptopMac"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined"
import TerminalIcon from "@mui/icons-material/Terminal"
import type { SvgIconComponent } from "@mui/icons-material"
import type { CSSProperties } from "react"
import { home } from "../../content/home.ts"
import { useReveal } from "../../hooks/useReveal.ts"
import { Logo } from "../brand/Logo.tsx"
import { SectionHeading } from "../SectionHeading.tsx"

const tones = ["violet", "blue", "pink", "teal"] as const

function PluginsVignette() {
  return (
    <div className="vignette" aria-hidden="true">
      <span className="vig-badge" translate="no">
        SDK 1.4.6.2
      </span>
      <ul className="vig-list">
        {tones.map((tone, index) => (
          <li key={tone}>
            <span className="vig-ico" data-tone={tone}>
              <ExtensionOutlinedIcon fontSize="small" />
            </span>
            <span className="vig-lines">
              <i />
              <i />
            </span>
            <span className={index === 1 ? "vig-switch vig-switch--live" : "vig-switch"}>
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
      <div className="vig-plugin">
        <span className="vig-ico" data-tone="pink">
          <ExtensionOutlinedIcon fontSize="small" />
        </span>
        <span>
          <b translate="no">exteraGram</b>
          <i />
        </span>
      </div>
      <div className="vig-flow">
        <span className="vig-track">
          <i />
        </span>
        <span className="vig-port">
          <AutoAwesomeIcon fontSize="small" />
          Перенести с помощью ИИ
        </span>
      </div>
      <div className="vig-plugin">
        <Logo size={28} />
        <span>
          <b translate="no">exDesktop</b>
          <i />
        </span>
      </div>
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
      {systems.map((system) => {
        const Icon = system.icon
        return (
          <div key={system.label} className="os-frame">
            <div className="os-frame__bar">
              <Icon fontSize="small" />
              <span className="ok-dot" />
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
        {blocked.map((label) => (
          <li key={label}>
            <LockOutlinedIcon fontSize="inherit" />
            {label}
          </li>
        ))}
      </ul>
      <div className="vig-sandbox">
        <ShieldOutlinedIcon />
        <span className="vig-ico" data-tone="violet">
          <ExtensionOutlinedIcon fontSize="small" />
        </span>
        <span className="vig-lines">
          <i />
          <i />
        </span>
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

function Row({
  title,
  body,
  index,
}: {
  title: keyof typeof views
  body: string
  index: number
}) {
  const { ref, shown } = useReveal<HTMLElement>()
  const View = views[title]
  return (
    <article
      ref={ref}
      className={shown ? "diff-row is-in" : "diff-row"}
      style={{ "--i": index } as CSSProperties}
    >
      <div className="diff-row__copy">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <View />
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
            <Row key={item.title} title={item.title} body={item.body} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
