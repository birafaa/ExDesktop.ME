import { useState } from "react"
import { home } from "../../content/home.ts"
import { install, type OsId } from "../../content/install.ts"
import { useDetectedOs } from "../../hooks/useOs.ts"
import { useReveal } from "../../hooks/useReveal.ts"
import { InstallAction } from "../install/InstallAction.tsx"
import { OsTabs } from "../install/OsTabs.tsx"
import { SectionHeading } from "../SectionHeading.tsx"

export function HomeInstall() {
  const detected = useDetectedOs()
  const [os, setOs] = useState<OsId | null>(null)
  const active = os ?? detected
  const { ref, shown } = useReveal<HTMLDivElement>()
  const block = home.cta

  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="wrap install-block">
        <SectionHeading id="install-home" titleId="cta-title" title={block.title} />
        <div ref={ref} className={shown ? "install-panel is-in" : "install-panel"}>
          <OsTabs os={active} label={install.osLabel} onChange={setOs} />
          <InstallAction os={active} />
        </div>
      </div>
    </section>
  )
}
