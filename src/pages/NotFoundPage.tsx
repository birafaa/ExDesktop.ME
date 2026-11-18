import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { ui } from "../content/ui.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"

export function NotFoundPage() {
  usePageTitle(`${ui.notFound.title} — exDesktop`)
  return (
    <section className="not-found wrap">
      <h1>{ui.notFound.title}</h1>
      <p>{ui.notFound.body}</p>
      <Button variant="contained" component={Link} to="/">
        {ui.actions.home}
      </Button>
    </section>
  )
}
