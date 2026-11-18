import { Difference } from "../components/home/Difference.tsx"
import { Hero } from "../components/home/Hero.tsx"
import { InstallCta } from "../components/home/InstallCta.tsx"
import { SettingsShowcase } from "../components/home/SettingsShowcase.tsx"
import { LinkGrid } from "../components/home/LinkGrid.tsx"
import { site } from "../content/site.ts"
import { usePageTitle } from "../hooks/usePageTitle.ts"

export function HomePage() {
  usePageTitle(site.name)

  return (
    <>
      <Hero />
      <SettingsShowcase />
      <Difference />
      <InstallCta />
      <LinkGrid />
    </>
  )
}
