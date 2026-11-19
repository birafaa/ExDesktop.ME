import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"
import { Link } from "react-router-dom"
import { site } from "../../content/site.ts"
import { ui } from "../../content/ui.ts"
import { BrandIcon, brandPaths } from "../brand/BrandIcon.tsx"
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
          <Link to="/">
            <HomeOutlinedIcon fontSize="inherit" />
            {ui.nav.home}
          </Link>
          <Link to="/install">
            <DownloadOutlinedIcon fontSize="inherit" />
            {ui.nav.install}
          </Link>
          <Link to="/docs">
            <MenuBookOutlinedIcon fontSize="inherit" />
            {ui.nav.docs}
          </Link>
        </nav>
        <nav aria-label={ui.nav.footer}>
          <a href={site.githubUrl} target="_blank" rel="noreferrer">
            <BrandIcon path={brandPaths.github} size={16} />
            {ui.nav.github}
          </a>
          <a href={site.telegramUrl} target="_blank" rel="noreferrer">
            <BrandIcon path={brandPaths.telegram} size={16} />
            {ui.nav.telegram}
          </a>
          <a href={site.licenseUrl}>
            <GavelOutlinedIcon fontSize="inherit" />
            {site.license}
          </a>
        </nav>
      </div>
    </footer>
  )
}
