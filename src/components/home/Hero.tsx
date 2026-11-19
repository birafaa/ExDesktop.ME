import GitHubIcon from "@mui/icons-material/GitHub"
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { home } from "../../content/home.ts"
import { site } from "../../content/site.ts"
import { ui } from "../../content/ui.ts"
import type { MouseEvent } from "react"
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
  return (
    <>
      <section className="hero section" aria-labelledby="hero-title">
        <div className="wrap hero__grid">
        <div className="hero__copy">
          <Logo size={72} />
          <h1 id="hero-title" translate="no">
            {site.name}
          </h1>
          <p className="hero__summary">{site.summary}</p>
          <p className="section-intro">{home.hero.extra}</p>
          <div className="hero__actions">
            <Button
              variant="contained"
              component={Link}
              to="/install"
              startIcon={<DownloadOutlinedIcon />}
            >
              {ui.actions.download}
            </Button>
            <Button
              variant="contained"
              className="btn-tonal"
              component={Link}
              to="/docs"
              startIcon={<MenuBookOutlinedIcon />}
            >
              {ui.actions.docs}
            </Button>
            <Button
              variant="outlined"
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              startIcon={<GitHubIcon />}
            >
              {ui.actions.github}
            </Button>
          </div>
          <ul className="platform-row">
            {site.platforms.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
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
