import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows"
import LaptopMacIcon from "@mui/icons-material/LaptopMac"
import TerminalIcon from "@mui/icons-material/Terminal"
import type { SvgIconComponent } from "@mui/icons-material"
import type { CSSProperties } from "react"
import { install, type OsId } from "../../content/install.ts"

const order: OsId[] = ["windows", "linux", "macos"]

const icons: Record<OsId, SvgIconComponent> = {
  windows: DesktopWindowsIcon,
  linux: TerminalIcon,
  macos: LaptopMacIcon,
}

export function OsTabs({
  os,
  onChange,
  label,
}: {
  os: OsId
  onChange: (id: OsId) => void
  label: string
}) {
  return (
    <div
      className="os-cards"
      role="radiogroup"
      aria-label={label}
      style={{ "--os-index": order.indexOf(os) } as CSSProperties}
    >
      <span className="os-cards__indicator" aria-hidden="true" />
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
            onClick={() => onChange(id)}
          >
            <Icon />
            {install.systems[id].label}
          </button>
        )
      })}
    </div>
  )
}
