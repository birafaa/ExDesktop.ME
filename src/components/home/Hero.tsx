import GitHubIcon from "@mui/icons-material/GitHub"
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { home } from "../../content/home.ts"
import { site } from "../../content/site.ts"
import { ui } from "../../content/ui.ts"
import { Logo } from "../brand/Logo.tsx"
import { DesktopMock } from "./DesktopMock.tsx"

export function Hero() {
  return (
    <>
      <section className="hero section" aria-labelledby="hero-title">
        <div className="wrap hero__copy">
          <Logo size={72} />
          <h1 id="hero-title" translate="no">
            {site.name}
          </h1>
          <p className="hero__summary">{site.summary}</p>
          <p className="section-intro">{home.hero.extra}</p>
          <div className="hero__actions">
            <Button
              variant="contained"
              href={site.windows.href}
              target="_blank"
              rel="noreferrer"
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
      </section>
      <section className="preview" aria-label={ui.preview.label}>
        <div className="wrap preview__frame">
          <div className="blob" />
          <DesktopMock />
        </div>
      </section>
    </>
  )
}
