import { home, type Fact } from "../../content/home.ts"
import { SectionHeading } from "../SectionHeading.tsx"

function FactLine({ fact }: { fact: Fact }) {
  if (!fact.href) return <li>{fact.text}</li>
  const external = fact.href.startsWith("http")
  return (
    <li>
      <a href={fact.href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {fact.text}
      </a>
    </li>
  )
}

export function Features() {
  const block = home.features
  return (
    <section className="section" aria-labelledby="features-title">
      <div className="wrap">
        <SectionHeading
          id={block.id}
          titleId="features-title"
          kicker={block.kicker}
          title={block.title}
          intro={block.intro}
        />
        <div className="bento">
          {block.cards.map((card) => (
            <article key={card.title} className={card.emphasis ? "card card--lead" : "card"}>
              <h3>{card.title}</h3>
              {card.chips ? (
                <ul className="chips">
                  {card.chips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
              ) : null}
              {card.facts ? (
                <ul className="facts">
                  {card.facts.map((fact) => (
                    <FactLine key={fact.text} fact={fact} />
                  ))}
                </ul>
              ) : null}
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
