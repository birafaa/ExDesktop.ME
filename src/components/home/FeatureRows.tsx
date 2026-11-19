import { home } from "../../content/home.ts"
import { useReveal } from "../../hooks/useReveal.ts"
import { SectionHeading } from "../SectionHeading.tsx"

const kinds = ["plugins", "port", "systems", "sandbox"] as const

function Art({ kind }: { kind: (typeof kinds)[number] }) {
  if (kind === "plugins") {
    return (
      <svg className="feature-art" viewBox="0 0 640 440" aria-hidden="true">
        <rect className="art-soft" x="36" y="78" width="250" height="250" rx="48" />
        <rect className="art-card" x="150" y="40" width="280" height="200" rx="40" />
        <rect className="art-accent" x="250" y="170" width="300" height="210" rx="46" />
        <rect className="art-mark" x="292" y="214" width="72" height="72" rx="20" />
      </svg>
    )
  }
  if (kind === "port") {
    return (
      <svg className="feature-art" viewBox="0 0 640 440" aria-hidden="true">
        <rect className="art-card" x="36" y="90" width="220" height="260" rx="40" />
        <rect className="art-accent" x="384" y="90" width="220" height="260" rx="40" />
        <rect className="art-strong" x="268" y="198" width="104" height="28" rx="14" />
        <circle className="art-mark" cx="146" cy="220" r="36" />
        <circle className="art-soft" cx="494" cy="220" r="36" />
      </svg>
    )
  }
  if (kind === "systems") {
    return (
      <svg className="feature-art" viewBox="0 0 640 440" aria-hidden="true">
        <rect className="art-card" x="48" y="70" width="170" height="250" rx="28" />
        <rect className="art-accent" x="236" y="120" width="170" height="200" rx="36" />
        <rect className="art-soft" x="424" y="48" width="170" height="280" rx="24" />
        <rect className="art-mark" x="86" y="108" width="94" height="12" rx="6" />
      </svg>
    )
  }
  return (
    <svg className="feature-art" viewBox="0 0 640 440" aria-hidden="true">
      <rect className="art-soft" x="70" y="40" width="500" height="360" rx="72" />
      <rect className="art-card" x="150" y="100" width="340" height="240" rx="40" />
      <circle className="art-accent" cx="120" cy="90" r="18" />
      <circle className="art-accent" cx="530" cy="340" r="22" />
      <circle className="art-mark" cx="320" cy="220" r="28" />
    </svg>
  )
}

function Feature({
  title,
  body,
  kind,
  flip,
}: {
  title: string
  body: string
  kind: (typeof kinds)[number]
  flip: boolean
}) {
  const { ref, shown } = useReveal<HTMLElement>()
  return (
    <article ref={ref} className={shown ? `feature is-in${flip ? " feature--flip" : ""}` : `feature${flip ? " feature--flip" : ""}`}>
      <div className="feature__copy">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <Art kind={kind} />
    </article>
  )
}

export function FeatureRows() {
  const block = home.difference
  return (
    <section className="section features" aria-labelledby="difference-title">
      <div className="wrap">
        <SectionHeading id={block.id} titleId="difference-title" title={block.title} />
        <div className="feature-list">
          {block.items.map((item, index) => (
            <Feature
              key={item.title}
              title={item.title}
              body={item.body}
              kind={kinds[index] ?? "plugins"}
              flip={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
