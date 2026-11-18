import { useEffect, useRef } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { ui } from "../../content/ui.ts"
import { Footer } from "./Footer.tsx"
import { Header } from "./Header.tsx"

export function SiteLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const id = window.location.hash.replace("#", "")
    const target = id ? document.getElementById(id) : null
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <a className="skip" href="#content">
        {ui.skip}
      </a>
      <Header />
      <main id="content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
