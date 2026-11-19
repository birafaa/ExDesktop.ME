import { useState } from "react"
import { site } from "../../content/site.ts"
import { useReveal } from "../../hooks/useReveal.ts"

export function PortDemo() {
  const [moved, setMoved] = useState(false)
  const { ref, shown } = useReveal<HTMLElement>()

  return (
    <section className="section" aria-labelledby="port-title">
      <div className="wrap">
        <h2 id="port-title" className="section-title">
          {site.placeholders.interactive}
        </h2>
        <article ref={ref} className={shown ? "port is-in" : "port"}>
          <div className={moved ? "port-well" : "port-well is-holding"}>
            <span className="port-label" translate="no">
              exteraGram
            </span>
            {moved ? null : <span className="port-chip" />}
          </div>
          <button
            type="button"
            className="port-go"
            aria-pressed={moved}
            onClick={() => setMoved((value) => !value)}
          >
            Перенести
          </button>
          <div className={moved ? "port-well is-holding" : "port-well"}>
            <span className="port-label" translate="no">
              exDesktop
            </span>
            {moved ? <span className="port-chip" /> : null}
          </div>
        </article>
      </div>
    </section>
  )
}
