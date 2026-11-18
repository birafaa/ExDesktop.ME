import { home } from "../../content/home.ts"
import { site } from "../../content/site.ts"
import { useReveal } from "../../hooks/useReveal.ts"

const facts = [
  { term: "Версия", value: site.version },
  { term: "Файл", value: site.windows.file, href: site.windows.href },
  { term: "Размер", value: site.windows.size },
  { term: "Лицензия", value: site.license, href: site.licenseUrl },
  { term: "Исходный код", value: "github.com/metawka/exDesktop", href: site.githubUrl },
]

export function ReleasePassport() {
  const block = home.passport
  const { ref, shown } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id={block.id}
      className={shown ? "passport reveal is-in" : "passport reveal"}
      aria-labelledby="passport-title"
    >
      <div className="passport__lead">
        <span className="passport__mark" aria-hidden="true" />
        <h2 id="passport-title" className="passport__title">
          {block.title}
        </h2>
        <p className="passport__version" translate="no">
          {site.version}
        </p>
        <p className="passport__note">{block.note}</p>
      </div>
      <dl className="passport__facts">
        {facts.map((fact) => (
          <div key={fact.term}>
            <dt>{fact.term}</dt>
            <dd>
              {fact.href ? (
                <a href={fact.href} target="_blank" rel="noreferrer">
                  {fact.value}
                </a>
              ) : (
                fact.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
