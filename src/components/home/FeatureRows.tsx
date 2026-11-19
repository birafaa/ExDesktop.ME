import type { CSSProperties } from "react"
import { home } from "../../content/home.ts"
import { useReveal } from "../../hooks/useReveal.ts"
import { SectionHeading } from "../SectionHeading.tsx"

function PluginsArt() {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true">
      <rect className="diff-fill" x="28" y="46" width="132" height="96" rx="28" />
      <rect className="diff-fill" x="160" y="34" width="132" height="96" rx="28" />
      <rect className="diff-accent" x="94" y="62" width="132" height="96" rx="30" />
      <rect className="diff-mark" x="142" y="94" width="36" height="36" rx="12" />
    </svg>
  )
}

function PortArt() {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true">
      <rect className="diff-fill" x="24" y="40" width="100" height="100" rx="32" />
      <circle className="diff-mark" cx="74" cy="90" r="16" />
      <rect className="diff-accent" x="136" y="82" width="48" height="16" rx="8" />
      <rect className="diff-accent" x="196" y="40" width="100" height="100" rx="32" />
      <circle className="diff-on" cx="246" cy="90" r="16" />
    </svg>
  )
}

function SystemsArt() {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true">
      <rect className="diff-fill" x="36" y="40" width="68" height="112" rx="22" />
      <rect className="diff-accent" x="126" y="24" width="68" height="128" rx="22" />
      <rect className="diff-fill" x="216" y="52" width="68" height="100" rx="22" />
      <rect className="diff-mark" x="148" y="48" width="24" height="8" rx="4" />
    </svg>
  )
}

function SandboxArt() {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true">
      <rect className="diff-fill" x="36" y="22" width="248" height="136" rx="40" />
      <rect className="diff-surface" x="78" y="48" width="164" height="84" rx="24" />
      <circle className="diff-accent" cx="160" cy="90" r="14" />
      <circle className="diff-mark" cx="58" cy="40" r="8" />
      <circle className="diff-mark" cx="262" cy="140" r="8" />
    </svg>
  )
}

const art = {
  Плагины: PluginsArt,
  Перенос: PortArt,
  Системы: SystemsArt,
  Среда: SandboxArt,
} as const

function Card({
  title,
  body,
  index,
}: {
  title: keyof typeof art
  body: string
  index: number
}) {
  const { ref, shown } = useReveal<HTMLElement>()
  const Art = art[title]
  return (
    <article
      ref={ref}
      className={shown ? "diff-card is-in" : "diff-card"}
      style={{ "--i": index } as CSSProperties}
    >
      <div className="diff-card__art">
        <Art />
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  )
}

export function FeatureRows() {
  const block = home.difference
  return (
    <section className="section features" aria-labelledby="difference-title">
      <div className="wrap">
        <SectionHeading id={block.id} titleId="difference-title" title={block.title} />
        <div className="diff-bento">
          {block.items.map((item, index) => (
            <Card key={item.title} title={item.title} body={item.body} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
