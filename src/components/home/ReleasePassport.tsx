import { home } from "../../content/home.ts"
import { site } from "../../content/site.ts"
import { SectionHeading } from "../SectionHeading.tsx"

const facts = [
  { term: "Версия", value: site.version },
  { term: "Лицензия", value: site.license, href: site.licenseUrl },
  { term: "Платформы", value: site.platforms.join(" · ") },
  { term: "Установщик", value: site.windows.file, href: site.windows.href },
  { term: "Размер", value: site.windows.size },
]

export function ReleasePassport() {
  const block = home.passport
  return (
    <section className="section" aria-labelledby="passport-title">
      <div className="wrap">
        <SectionHeading id={block.id} titleId="passport-title" title={block.title} />
        <div className="passport">
          <div>
            <p className="passport__label">Версия</p>
            <p className="passport__version" translate="no">
              {site.version}
            </p>
            <p>{block.note}</p>
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
        </div>
      </div>
    </section>
  )
}
