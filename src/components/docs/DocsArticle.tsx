import { Fragment, type ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  inlineText,
  type DocBlock,
  type DocPage,
  type DocSection,
  type Inline,
} from "../../content/docs.ts"
import { CopyButton } from "../CopyButton.tsx"
import { Highlight } from "../Highlight.tsx"

function DocLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/")) return <Link to={href}>{children}</Link>
  if (href.startsWith("#")) return <a href={href}>{children}</a>
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function Inlines({ parts, query }: { parts: Inline[]; query: string }) {
  return (
    <>
      {parts.map((part, index) => {
        if (part.t === "code") {
          return (
            <code key={index} className="inline-code" translate="no">
              <Highlight text={part.v} query={query} />
            </code>
          )
        }
        if (part.t === "link") {
          return (
            <DocLink key={index} href={part.href}>
              <Highlight text={part.v} query={query} />
            </DocLink>
          )
        }
        return <Highlight key={index} text={part.v} query={query} />
      })}
    </>
  )
}

function Block({ block, query }: { block: DocBlock; query: string }) {
  switch (block.type) {
    case "p":
      return (
        <p className={block.lead ? "lead" : undefined}>
          <Inlines parts={block.inlines} query={query} />
        </p>
      )
    case "note":
      return (
        <aside className="note">
          <Inlines parts={block.inlines} query={query} />
        </aside>
      )
    case "h3":
      return (
        <h3 id={block.id}>
          <Highlight text={block.text} query={query} />
        </h3>
      )
    case "ul":
    case "ol": {
      const Tag = block.type
      return (
        <Tag>
          {block.items.map((item, index) => (
            <li key={`${index}-${inlineText(item).slice(0, 24)}`}>
              <Inlines parts={item} query={query} />
            </li>
          ))}
        </Tag>
      )
    }
    case "code":
      return (
        <figure className="codeblock">
          <pre>
            <code translate="no">{block.code}</code>
          </pre>
          <CopyButton text={block.code} />
        </figure>
      )
    case "table":
      return (
        <div className="docs-table-wrap">
          <table>
            {block.headers.length > 0 ? (
              <thead>
                <tr>
                  {block.headers.map((cell, index) => (
                    <th key={index} scope="col">
                      <Inlines parts={cell} query={query} />
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <Inlines parts={cell} query={query} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "links":
      return (
        <ul className="docs-links">
          {block.items.map((item) => (
            <li key={item.href}>
              <DocLink href={item.href}>{item.label}</DocLink>
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

export function DocsArticle({
  page,
  sections,
  showIntro,
  query,
}: {
  page: DocPage
  sections: DocSection[]
  showIntro: boolean
  query: string
}) {
  return (
    <div id="docs-results" className="prose">
      <h1>{page.title}</h1>
      {showIntro
        ? page.intro.map((block, index) => (
            <Fragment key={`intro-${index}`}>
              <Block block={block} query={query} />
            </Fragment>
          ))
        : null}
      {sections.map((section) => (
        <section
          key={section.id}
          data-docs-section={section.id}
          aria-labelledby={section.id}
          className="docs-section"
        >
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
