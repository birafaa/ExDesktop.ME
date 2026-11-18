import { Link } from "react-router-dom"
import { site } from "../../content/site.ts"
import { ui } from "../../content/ui.ts"
import { Logo } from "../brand/Logo.tsx"

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <Logo />
          <div>
            <strong translate="no">{site.name}</strong>
            <p translate="no">{site.version}</p>
          </div>
        </div>
        <nav aria-label={ui.nav.footer}>
          <Link to="/">{ui.nav.home}</Link>
          <Link to="/docs">{ui.nav.docs}</Link>
          <a href={site.githubUrl} target="_blank" rel="noreferrer">
            {ui.nav.github}
          </a>
          <a href={site.telegramUrl} target="_blank" rel="noreferrer">
            {ui.nav.telegram}
          </a>
          <a href={site.licenseUrl} target="_blank" rel="noreferrer">
            {site.license}
          </a>
        </nav>
        <p className="site-footer__note">{ui.footer.note}</p>
      </div>
    </footer>
  )
}
