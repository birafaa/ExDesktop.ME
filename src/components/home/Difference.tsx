import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined"
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined"
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined"
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined"
import type { SvgIconComponent } from "@mui/icons-material"
import { home } from "../../content/home.ts"
import { useReveal } from "../../hooks/useReveal.ts"
import { SectionHeading } from "../SectionHeading.tsx"

const icons: Record<(typeof home.difference.items)[number]["title"], SvgIconComponent> = {
  Плагины: ExtensionOutlinedIcon,
  Перенос: AutoFixHighOutlinedIcon,
  Системы: DevicesOutlinedIcon,
  Среда: ShieldOutlinedIcon,
}

export function Difference() {
  const block = home.difference
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <section className="section" aria-labelledby="difference-title">
      <div className="wrap">
        <SectionHeading id={block.id} titleId="difference-title" title={block.title} />
        <div ref={ref} className={shown ? "diff-grid is-in" : "diff-grid"}>
          {block.items.map((item) => {
            const Icon = icons[item.title]
            return (
              <article key={item.title} className="diff-tile">
                <span className="diff-tile__icon">
                  <Icon />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
