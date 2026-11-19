import { site } from "../../content/site.ts"
import { useReveal } from "../../hooks/useReveal.ts"

export function Roadmap() {
  const { ref, shown } = useReveal<HTMLOListElement>()

  return (
    <section className="section roadmap-section" aria-labelledby="roadmap-title">
      <div className="wrap">
        <h2 id="roadmap-title" className="section-title">
          Roadmap
        </h2>
        <ol ref={ref} className={shown ? "roadmap is-in" : "roadmap"}>
          {site.placeholders.roadmap.map((item, index) => (
            <li key={item}>
              <span>{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
