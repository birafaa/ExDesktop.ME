import CloseIcon from "@mui/icons-material/Close"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import { useState, type MouseEvent } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { site } from "../../content/site.ts"
import { ui } from "../../content/ui.ts"
import { useThemeMode } from "../../theme/theme-mode.ts"
import { Logo } from "../brand/Logo.tsx"

const internal = [
  { to: "/", label: ui.nav.home, end: true },
  { to: "/install", label: ui.nav.install, end: true },
  { to: "/docs", label: ui.nav.docs, end: false },
]

const external = [
  { href: site.githubUrl, label: ui.nav.github },
  { href: site.telegramUrl, label: ui.nav.telegram },
]

function themeOrigin(event: MouseEvent<HTMLButtonElement>) {
  if (event.detail === 0) {
    const rect = event.currentTarget.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }
  return { x: event.clientX, y: event.clientY }
}

export function Header() {
  const { mode, toggle } = useThemeMode()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [openPath, setOpenPath] = useState(location.pathname)
  if (openPath !== location.pathname) {
    setOpenPath(location.pathname)
    setOpen(false)
  }

  const themeLabel = mode === "dark" ? ui.theme.toLight : ui.theme.toDark

  return (
    <header className="site-header">
      <div className="wrap site-header__bar">
        <NavLink to="/" className="brand" end>
          <Logo />
          <span translate="no">{site.name}</span>
        </NavLink>
        <nav className="nav-desktop" aria-label={ui.nav.primary}>
          {internal.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
          {external.map((item) => (
            <a key={item.href} className="nav-link" href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </nav>
        <IconButton aria-label={themeLabel} onClick={(event) => toggle(themeOrigin(event))}>
          {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
        <IconButton
          className="burger"
          aria-label={open ? ui.nav.close : ui.nav.open}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            id: "site-menu",
            sx: {
              width: "min(100vw - 48px, 340px)",
              background: "var(--surface)",
              color: "var(--ink)",
              padding: "16px",
            },
          },
        }}
      >
        <div className="nav-drawer__head">
          <span className="brand">
            <Logo />
            <span translate="no">{site.name}</span>
          </span>
          <IconButton aria-label={ui.nav.close} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <nav aria-label={ui.nav.mobile} className="nav-drawer">
          {internal.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link nav-link--block${isActive ? " is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          {external.map((item) => (
            <a
              key={item.href}
              className="nav-link nav-link--block"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Drawer>
    </header>
  )
}
