import type { CSSProperties } from "react"
import { home } from "../../content/home.ts"
import { site } from "../../content/site.ts"
import { useReveal } from "../../hooks/useReveal.ts"
import { Logo } from "../brand/Logo.tsx"
import { SectionHeading } from "../SectionHeading.tsx"

const chats = [
  { time: "чт", badge: true, active: false },
  { time: "18:34:30", badge: false, active: true },
  { time: "29.10.2026", badge: false, active: false },
  { time: "12:02", badge: true, active: false },
  { time: "вчера", badge: false, active: false },
]

function TileGlyph({ tone }: { tone: string }) {
  const common = { viewBox: "0 0 24 24", width: 18, height: 18, "aria-hidden": true as const }
  if (tone === "violet") {
    return (
      <svg {...common}>
        <circle cx="7" cy="8" r="2.2" fill="currentColor" />
        <circle cx="12" cy="8" r="2.2" fill="currentColor" />
        <circle cx="17" cy="8" r="2.2" fill="currentColor" />
        <rect x="5" y="13" width="14" height="6" rx="2" fill="currentColor" />
      </svg>
    )
  }
  if (tone === "blue") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H11l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      </svg>
    )
  }
  if (tone === "teal") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M4 7h7v2H6.8l2.4 2.4-1.4 1.4L5 10v4h2v2H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm16 10h-7v-2h4.2l-2.4-2.4 1.4-1.4L19 14v-4h-2V8h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1Z" />
      </svg>
    )
  }
  if (tone === "indigo") {
    return (
      <svg {...common}>
        <rect x="6" y="10" width="12" height="9" rx="2" fill="currentColor" />
        <path fill="none" stroke="currentColor" strokeWidth="2" d="M8 10V8a4 4 0 0 1 8 0v2" />
      </svg>
    )
  }
  if (tone === "orange") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M12 18.5a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM7.2 16.2a7 7 0 0 1 9.6 0l-1.4 1.5a5 5 0 0 0-6.8 0l-1.4-1.5Zm-2.6-2.7a10.5 10.5 0 0 1 14.8 0l-1.4 1.4a8.5 8.5 0 0 0-12 0L4.6 13.5Z" />
      </svg>
    )
  }
  if (tone === "pink") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M9 3h2v3h2V3h2v3h3v2h-3v2h3v2h-3v3h-2v-3h-2v3H9v-3H6v-2h3V8H6V6h3V3Z" />
      </svg>
    )
  }
  if (tone === "green") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M12 5V2l4 4-4 4V7a5 5 0 1 0 4.9 6h2.1A7 7 0 1 1 12 5Z" />
      </svg>
    )
  }
  if (tone === "red") {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M12 19s-6.2-3.8-6.2-8A3.4 3.4 0 0 1 12 8a3.4 3.4 0 0 1 6.2 3c0 4.2-6.2 8-6.2 8Z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path fill="currentColor" d="m12 3 2.1 4.6 5 .6-3.7 3.4.9 5L12 14.8 7.7 16.6l.9-5L4.9 8.2l5-.6L12 3Z" />
    </svg>
  )
}

export function SettingsShowcase() {
  const block = home.showcase
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <section className="section" aria-labelledby="showcase-title">
      <div className="wrap">
        <SectionHeading id={block.id} titleId="showcase-title" title={block.title} intro={block.intro} />
        <div ref={ref} className={shown ? "show-stage is-in" : "show-stage"}>
          <div className="show-win" aria-hidden="true">
            <div className="show-rail">
              <span className="show-rail__btn is-on" />
              <span className="show-rail__btn" />
              <span className="show-rail__btn" />
            </div>
            <div className="show-chats">
              <div className="show-search">{block.search}</div>
              {chats.map((chat) => (
                <div key={chat.time} className={chat.active ? "show-chat is-active" : "show-chat"}>
                  <Logo size={36} />
                  <span className="show-chat__lines">
                    <span />
                    <span />
                  </span>
                  <span className="show-chat__time">
                    {chat.time}
                    {chat.badge ? <i>{block.badge}</i> : null}
                  </span>
                </div>
              ))}
            </div>
            <div className="show-main">
              <div className="show-top">
                <Logo size={36} />
                <div>
                  <strong translate="no">{site.name}</strong>
                  <p>
                    {block.role}
                    <span>{block.subscribers}</span>
                  </p>
                </div>
                <span className="show-pill" />
              </div>
              <div className="show-pin">
                <span />
              </div>
              <div className="show-feed">
                <div className="show-post">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="show-react">
                  <i />
                  <i />
                  <em>{block.comments}</em>
                </div>
                <div className="show-modal">
                  <div className="show-modal__bar">
                    <span className="show-back" />
                    <strong>{block.settings}</strong>
                    <span className="show-x">×</span>
                  </div>
                  <Logo size={64} />
                  <p className="show-modal__name" translate="no">
                    {site.name}
                  </p>
                  <p className="show-modal__ver" translate="no">
                    {block.version}
                  </p>
                  <div className="show-search">{block.search}</div>
                  <div className="show-tiles">
                    {block.tiles.map((tile, index) => (
                      <div
                        key={tile.title}
                        className={tile.title === "Другое" ? "show-tile is-wide" : "show-tile"}
                        data-tone={tile.tone}
                        style={{ "--i": index } as CSSProperties}
                      >
                        <span className="show-tile__icon">
                          <TileGlyph tone={tile.tone} />
                        </span>
                        <span>
                          <strong>{tile.title}</strong>
                          <small>{tile.body}</small>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
