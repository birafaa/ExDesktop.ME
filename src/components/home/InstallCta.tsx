import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { home } from "../../content/home.ts"
import { useReveal } from "../../hooks/useReveal.ts"

export function InstallCta() {
  const block = home.cta
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="wrap">
        <div ref={ref} className={shown ? "cta-band is-in" : "cta-band"}>
          <div>
            <h2 id="cta-title">{block.title}</h2>
            <p>{block.body}</p>
          </div>
          <div className="cta-band__actions">
            <Button variant="contained" component={Link} to="/install" startIcon={<DownloadOutlinedIcon />}>
              {block.install}
            </Button>
            <Button variant="outlined" component={Link} to="/docs" startIcon={<MenuBookOutlinedIcon />}>
              {block.docs}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
