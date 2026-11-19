import { Link } from "react-router-dom"
import { site } from "../../content/site.ts"
import { ui } from "../../content/ui.ts"
import { Logo } from "../brand/Logo.tsx"

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__bar">
        <div className="site-footer__brand">
          <Logo />
          <strong translate="no">{site.name}</strong>
          <p className="site-footer__note">{ui.footer.note}</p>
        </div>
        <nav aria-label={ui.nav.primary}>
          <Link to="/">{ui.nav.home}</Link>
          <Link to="/install">{ui.nav.install}</Link>
          <Link to="/docs">{ui.nav.docs}</Link>
        </nav>
        <nav aria-label={ui.nav.footer}>
          <a href={site.githubUrl} target="_blank" rel="noreferrer">
            {ui.nav.github}
          </a>
          <a href={site.telegramUrl} target="_blank" rel="noreferrer">
            {ui.nav.telegram}
          </a>
          <a href={site.licenseUrl}>{site.license}</a>
        </nav>
      </div>
    </footer>
  )
}
