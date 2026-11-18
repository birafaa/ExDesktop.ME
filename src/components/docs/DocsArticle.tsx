import { Fragment, useState } from "react"
import { type DocBlock, type DocSection } from "../../content/docs.ts"
import { site } from "../../content/site.ts"
import { CopyButton } from "../CopyButton.tsx"
import { Highlight } from "../Highlight.tsx"

function FaqList({
  items,
  query,
}: {
  items: { id: string; q: string; a: string }[]
  query: string
}) {
  const [openIds, setOpenIds] = useState<string[]>([])
  const searching = query.trim().length > 0

  return (
    <div className="faq">
      {items.map((item) => {
        const expanded = searching || openIds.includes(item.id)
        return (
          <div key={item.id} className="faq__item">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={item.id}
                onClick={() => {
                  setOpenIds((current) =>
                    current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id],
                  )
                }}
              >
                <Highlight text={item.q} query={query} />
              </button>
            </h3>
            {expanded ? (
              <div id={item.id} role="region">
                <Highlight text={item.a} query={query} />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

function Block({ block, query }: { block: DocBlock; query: string }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Highlight text={block.text} query={query} />
        </p>
      )
    case "h3":
      return (
        <h3 id={block.id}>
          <Highlight text={block.text} query={query} />
        </h3>
      )
    case "ul":
      return (
        <ul>
          {block.items.map((item, index) => (
            <li key={`${index}-${item}`}>
              <Highlight text={item} query={query} />
            </li>
          ))}
        </ul>
      )
    case "platforms":
      return (
        <ul className="chips">
          {site.platforms.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      )
    case "code":
      return (
        <figure className="codeblock">
          <figcaption>{block.label}</figcaption>
          <pre>
            <code translate="no">{block.code}</code>
          </pre>
          <CopyButton text={block.code} />
        </figure>
      )
    case "note":
      return (
        <aside className="note">
          <Highlight text={block.text} query={query} />
        </aside>
      )
    case "faq":
      return <FaqList items={block.items} query={query} />
    case "links":
      return (
        <ul className="docs-links">
          {block.items.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )
    default: {
      const exhaustive: never = block
      return exhaustive
    }
  }
}

export function DocsArticle({ sections, query }: { sections: DocSection[]; query: string }) {
  return (
    <div id="docs-results" className="prose">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={`${section.id}-title`} className="docs-section">
          <h2 id={section.id}>
            <Highlight text={section.title} query={query} />
          </h2>
          {section.blocks.map((block, index) => (
            <Fragment key={`${section.id}-${index}`}>
              <Block block={block} query={query} />
            </Fragment>
          ))}
        </section>
      ))}
    </div>
  )
}
