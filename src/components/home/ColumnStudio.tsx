import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useState } from "react"
import { home, type MockLayoutId } from "../../content/home.ts"
import { ui } from "../../content/ui.ts"
import { SectionHeading } from "../SectionHeading.tsx"
import { DesktopMock } from "./DesktopMock.tsx"

export function ColumnStudio() {
  const block = home.studio
  const [layout, setLayout] = useState<MockLayoutId>("split")

  return (
    <section className="section" aria-labelledby="columns-title">
      <div className="wrap">
        <SectionHeading
          id={block.id}
          titleId="columns-title"
          kicker={block.kicker}
          title={block.title}
          intro={block.intro}
        />
        <ToggleButtonGroup
          exclusive
          value={layout}
          aria-label={ui.studio.groupLabel}
          className="layout-switch"
          onChange={(_event, value: MockLayoutId | null) => {
            if (value) setLayout(value)
          }}
        >
          {block.layouts.map((item) => (
            <ToggleButton key={item.id} value={item.id}>
              {item.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <div className="studio__stage">
          <DesktopMock layout={layout} />
        </div>
        <p className="scroll-hint">{ui.studio.scrollHint}</p>
      </div>
    </section>
  )
}
