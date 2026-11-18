import { ColumnStudio } from "../components/home/ColumnStudio.tsx"
import { Features } from "../components/home/Features.tsx"
import { Hero } from "../components/home/Hero.tsx"
import { InstallPanel } from "../components/home/InstallPanel.tsx"
import { LinkGrid } from "../components/home/LinkGrid.tsx"
import { ReleasePassport } from "../components/home/ReleasePassport.tsx"
import { Roadmap } from "../components/home/Roadmap.tsx"
import { site } from "../content/site.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"

export function HomePage() {
  usePageTitle(site.name)

  return (
    <>
      <Hero />
      <Features />
      <ColumnStudio />
      <InstallPanel />
      <Roadmap />
      <ReleasePassport />
      <LinkGrid />
    </>
  )
}
