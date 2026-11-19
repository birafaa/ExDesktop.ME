import { FeatureRows } from "../components/home/FeatureRows.tsx"
import { Hero } from "../components/home/Hero.tsx"
import { HomeInstall } from "../components/home/HomeInstall.tsx"
import { LinkGrid } from "../components/home/LinkGrid.tsx"
import { PortDemo } from "../components/home/PortDemo.tsx"
import { Roadmap } from "../components/home/Roadmap.tsx"
import { site } from "../content/site.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"

export function HomePage() {
  usePageTitle(site.name)

  return (
    <>
      <Hero />
      <FeatureRows />
      <HomeInstall />
      <Roadmap />
      <LinkGrid />
      <PortDemo />
    </>
  )
}
