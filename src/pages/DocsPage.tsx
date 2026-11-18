import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { DocsArticle } from "../components/docs/DocsArticle.tsx"
import { docsSections, sectionMatches, sectionToc } from "../content/docs.ts"
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
  onNavigate,
}: {
  searchId: string
  query: string
  onChange: (value: string) => void
  active: string
  onNavigate: (id: string) => void
}) {
  const visible = docsSections.filter((section) => sectionMatches(section, query))
  return (
    <>
      <DocsSearch id={searchId} query={query} onChange={onChange} />
      <nav aria-label={ui.docs.sections} className="docs-nav">
        {visible.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={active === section.id ? "is-active" : undefined}
            aria-current={active === section.id ? "location" : undefined}
            onClick={() => onNavigate(section.id)}
          >
            {section.title}
          </a>
        ))}
      </nav>
    </>
  )
}

export function DocsPage() {
  const location = useLocation()
  const hashId = location.hash.replace("#", "")
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(docsSections.some((section) => section.id === hashId) ? hashId : (docsSections[0]?.id ?? ""))
  const [seenHash, setSeenHash] = useState(hashId)
  const [menuOpen, setMenuOpen] = useState(false)
  if (seenHash !== hashId) {
    setSeenHash(hashId)
    if (docsSections.some((section) => section.id === hashId)) setActive(hashId)
  }
  usePageTitle(`${ui.docs.title} — exDesktop`)

  const visible = useMemo(
    () => docsSections.filter((section) => sectionMatches(section, query)),
    [query],
  )
  const toc = visible.flatMap((section) => sectionToc(section))

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
        <h1>{ui.docs.title}</h1>
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
          {visible.length > 0 ? <DocsArticle sections={visible} query={query} /> : null}
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
          onNavigate={(id) => {
            setActive(id)
            setMenuOpen(false)
          }}
        />
      </Drawer>
    </div>
  )
}
