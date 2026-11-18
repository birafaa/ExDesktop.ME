import { Hero } from "../components/home/Hero.tsx"
import { LinkGrid } from "../components/home/LinkGrid.tsx"
import { ReleasePassport } from "../components/home/ReleasePassport.tsx"
import { site } from "../content/site.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"

export function HomePage() {
  usePageTitle(site.name)

  return (
    <>
      <Hero />
      <ReleasePassport />
      <LinkGrid />
    </>
  )
}
