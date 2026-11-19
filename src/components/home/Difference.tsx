import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined"
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined"
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined"
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined"
import type { SvgIconComponent } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { home } from "../../content/home.ts"

const icons: Record<(typeof home.difference.items)[number]["title"], SvgIconComponent> = {
  Плагины: ExtensionOutlinedIcon,
  Перенос: AutoFixHighOutlinedIcon,
  Системы: DevicesOutlinedIcon,
  Среда: ShieldOutlinedIcon,
}

export function Difference() {
  const block = home.difference
  const [active, setActive] = useState(0)
  const current = block.items[active] ?? block.items[0]
  const ActiveIcon = icons[current.title]

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const narrow = window.matchMedia("(max-width: 899px)")
    if (reduce.matches || narrow.matches || typeof IntersectionObserver !== "function") return
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-story-step]")]
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!best) return
        const index = Number(best.target.getAttribute("data-story-step"))
        if (!Number.isNaN(index)) setActive(index)
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.2, 0.45, 0.7] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [block.items.length])

  return (
    <section className="section story" aria-labelledby="difference-title">
      <div className="wrap">
        <h2 id="difference-title" className="section-title story__title">
          {block.title}
        </h2>
        <div className="story__grid">
          <div className="story__pin" aria-hidden="true">
            <div className="story__card" key={current.title}>
              <span className="diff-tile__icon story__icon">
                <ActiveIcon />
              </span>
              <p>{current.title}</p>
            </div>
          </div>
          <div className="story__steps">
            {block.items.map((item, index) => {
              const Icon = icons[item.title]
              return (
                <article
                  key={item.title}
                  className={index === active ? "story__step is-active" : "story__step"}
                  data-story-step={index}
                >
                  <span className="diff-tile__icon story__step-icon">
                    <Icon />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
