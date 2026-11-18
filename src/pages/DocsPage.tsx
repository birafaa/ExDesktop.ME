import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { DocsArticle } from "../components/docs/DocsArticle.tsx"
import {
  docPages,
  introMatches,
  pageToc,
  sectionMatches,
  type DocPage,
} from "../content/docs.ts"
import { ui } from "../content/ui.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"

function DocsSearch({
  id,
  query,
  onChange,
}: {
  id: string
  query: string
  onChange: (value: string) => void
}) {
  return (
    <div className="docs-search-wrap">
      <label className="search" htmlFor={id}>
        <SearchIcon aria-hidden="true" />
        <span className="visually-hidden">{ui.docs.searchLabel}</span>
        <input
          id={id}
          data-docs-search=""
          type="search"
          placeholder={ui.docs.searchPlaceholder}
          value={query}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <p className="search-hint">
        <kbd>/</kbd> {ui.docs.searchHint}
      </p>
    </div>
  )
}

function DocsNav({
  searchId,
  query,
  onChange,
  active,
  current,
  onNavigate,
}: {
  searchId: string
  query: string
  onChange: (value: string) => void
  active: string
  current: DocPage
  onNavigate: (id: string) => void
}) {
  return (
    <>
      <DocsSearch id={searchId} query={query} onChange={onChange} />
      <nav aria-label={ui.docs.sections} className="docs-nav">
        {docPages.map((page) => {
          const sections = page.sections.filter((section) => sectionMatches(section, query))
          if (query.trim() && sections.length === 0 && !introMatches(page, query)) return null
          return (
            <div key={page.id} className="docs-nav-group">
              <p className="docs-nav-label">{page.group}</p>
              {page.id !== current.id ? (
                <a href={page.path}>{page.title}</a>
              ) : null}
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`${page.path}#${section.id}`}
                  className={page.id === current.id && active === section.id ? "is-active" : undefined}
                  aria-current={page.id === current.id && active === section.id ? "location" : undefined}
                  onClick={() => onNavigate(section.id)}
                >
                  {section.title}
                </a>
              ))}
            </div>
          )
        })}
      </nav>
    </>
  )
}

export function DocsPage() {
  const location = useLocation()
  const page = docPages.find((item) => item.path === location.pathname) ?? docPages[0]
  const hashId = location.hash.replace("#", "")
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(
    page.sections.some((section) => section.id === hashId) ? hashId : (page.sections[0]?.id ?? ""),
  )
  const navKey = `${location.pathname}#${hashId}`
  const [seenNav, setSeenNav] = useState(navKey)
  const [menuOpen, setMenuOpen] = useState(false)
  if (seenNav !== navKey) {
    setSeenNav(navKey)
    if (page.sections.some((section) => section.id === hashId)) setActive(hashId)
    else setActive(page.sections[0]?.id ?? "")
  }
  usePageTitle(`${page.title} — exDesktop`)

  const visible = useMemo(
    () => page.sections.filter((section) => sectionMatches(section, query)),
    [page, query],
  )
  const showIntro = introMatches(page, query)
  const toc = pageToc(page, visible, showIntro)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return
      }
      event.preventDefault()
      const fields = [...document.querySelectorAll<HTMLInputElement>("[data-docs-search]")]
      const field = fields.find((item) => item.offsetParent !== null) ?? fields[0]
      field?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const nodes = visible
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement)
    if (nodes.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.4, 0.8] },
    )
    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div className="wrap docs-page">
      <header className="docs-intro">
        <Button className="docs-menu-btn" variant="outlined" onClick={() => setMenuOpen(true)}>
          {ui.docs.openSections}
        </Button>
        <div className="docs-search-mobile">
          <DocsSearch id="docs-search-mobile" query={query} onChange={setQuery} />
        </div>
      </header>
      {query.trim() ? (
        <p className="docs-count" role="status">
          {visible.length === 0 ? ui.docs.noResults : ui.docs.count(visible.length)}
        </p>
      ) : null}
      <div className="docs-shell">
        <aside className="docs-side">
          <DocsNav
            searchId="docs-search-side"
            query={query}
            onChange={setQuery}
            active={active}
            current={page}
            onNavigate={setActive}
          />
        </aside>
        <article className="docs-article">
          {toc.length > 0 ? (
            <nav className="docs-toc docs-toc--bar" aria-label={ui.docs.toc}>
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={item.level === 3 ? "is-sub" : undefined}>
                  {item.text}
                </a>
              ))}
            </nav>
          ) : null}
          {visible.length > 0 || showIntro ? (
            <DocsArticle page={page} sections={visible} showIntro={showIntro} query={query} />
          ) : null}
        </article>
        <aside className="docs-toc docs-toc--side">
          <nav aria-label={ui.docs.toc}>
            <p className="kicker">{ui.docs.toc}</p>
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={item.level === 3 ? "is-sub" : undefined}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </aside>
      </div>
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "min(100vw - 32px, 360px)",
              background: "var(--surface)",
              color: "var(--ink)",
              padding: "16px",
            },
          },
        }}
      >
        <div className="nav-drawer__head">
          <strong>{ui.docs.sections}</strong>
          <IconButton aria-label={ui.docs.closeSections} onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <DocsNav
          searchId="docs-search-drawer"
          query={query}
          onChange={setQuery}
          active={active}
          current={page}
          onNavigate={(id) => {
            setActive(id)
            setMenuOpen(false)
          }}
        />
      </Drawer>
    </div>
  )
}
