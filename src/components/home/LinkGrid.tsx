import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward"
import { Link } from "react-router-dom"
import { home } from "../../content/home.ts"
import { SectionHeading } from "../SectionHeading.tsx"

export function LinkGrid() {
  const block = home.links
  return (
    <section className="section" aria-labelledby="links-title">
      <div className="wrap">
        <SectionHeading
          id={block.id}
          titleId="links-title"
          kicker={block.kicker}
          title={block.title}
        />
        <div className="link-grid">
          {block.items.map((item) => {
            const body = (
              <>
                <span className="kicker">{item.kicker}</span>
                <span className="link-card__title">
                  {item.title}
                  <ArrowOutwardIcon className="arrow" fontSize="small" />
                </span>
                <span className="link-card__body">{item.body}</span>
              </>
            )
            if ("internal" in item && item.internal) {
              return (
                <Link key={item.title} to={item.href} className="link-card">
                  {body}
                </Link>
              )
            }
            return (
              <a key={item.title} href={item.href} className="link-card" target="_blank" rel="noreferrer">
                {body}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
