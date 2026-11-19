import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import { type MouseEvent } from "react"
import { Link } from "react-router-dom"
import { home } from "../../content/home.ts"
import { site } from "../../content/site.ts"
import { useDetectedOs } from "../../hooks/useOs.ts"
import { Logo } from "../brand/Logo.tsx"
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

export function Hero() {
  const active = useDetectedOs()

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
        </div>
      </section>
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
