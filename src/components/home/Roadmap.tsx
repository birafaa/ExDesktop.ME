import { home } from "../../content/home.ts"
import { SectionHeading } from "../SectionHeading.tsx"

export function Roadmap() {
  const block = home.roadmap
  return (
    <section className="section" aria-labelledby="roadmap-title">
      <div className="wrap">
        <SectionHeading
          id={block.id}
          titleId="roadmap-title"
          kicker={block.kicker}
          title={block.title}
          intro={block.intro}
        />
        <ol className="roadmap">
          {block.items.map((item, index) => (
            <li key={index}>
              <span className="roadmap__index">{String(index + 1).padStart(2, "0")}</span>
              <article className="card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
