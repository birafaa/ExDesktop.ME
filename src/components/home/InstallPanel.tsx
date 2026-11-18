import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import Button from "@mui/material/Button"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useState } from "react"
import { home } from "../../content/home.ts"
import { site } from "../../content/site.ts"
import { ui } from "../../content/ui.ts"
import { CopyButton } from "../CopyButton.tsx"
import { SectionHeading } from "../SectionHeading.tsx"

type Platform = "windows" | "linux" | "macos"

export function InstallPanel() {
  const block = home.install
  const [platform, setPlatform] = useState<Platform>("windows")

  return (
    <section className="section" aria-labelledby="install-title">
      <div className="wrap">
        <SectionHeading
          id={block.id}
          titleId="install-title"
          kicker={block.kicker}
          title={block.title}
          intro={block.intro}
        />
        <div className="install">
          <Tabs
            value={platform}
            onChange={(_event, value: Platform) => setPlatform(value)}
            aria-label={ui.install.tabsLabel}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="Windows" value="windows" id="tab-windows" aria-controls="panel-windows" />
            <Tab label="Linux" value="linux" id="tab-linux" aria-controls="panel-linux" />
            <Tab label="macOS" value="macos" id="tab-macos" aria-controls="panel-macos" />
          </Tabs>
          <div
            role="tabpanel"
            id="panel-windows"
            aria-labelledby="tab-windows"
            hidden={platform !== "windows"}
            className="install__panel"
          >
            {platform === "windows" ? (
              <>
                <p className="install__file" translate="no">
                  {site.windows.file}
                </p>
                <p className="install__size">{site.windows.size}</p>
                <Button variant="contained" href={site.windows.href} startIcon={<DownloadOutlinedIcon />}>
                  {ui.actions.download}
                </Button>
                <p>
                  <a href={site.releasesUrl} target="_blank" rel="noreferrer">
                    {ui.actions.releases}
                  </a>
                </p>
                <p>{block.windowsNote}</p>
              </>
            ) : null}
          </div>
          <div
            role="tabpanel"
            id="panel-linux"
            aria-labelledby="tab-linux"
            hidden={platform !== "linux"}
            className="install__panel"
          >
            {platform === "linux" ? (
              <>
                <p>{ui.install.sharedCommand}</p>
                <div className="command">
                  <code translate="no">{site.installCommand}</code>
                  <CopyButton text={site.installCommand} />
                </div>
                <p>{block.linuxNote}</p>
              </>
            ) : null}
          </div>
          <div
            role="tabpanel"
            id="panel-macos"
            aria-labelledby="tab-macos"
            hidden={platform !== "macos"}
            className="install__panel"
          >
            {platform === "macos" ? (
              <>
                <p>{ui.install.sharedCommand}</p>
                <div className="command">
                  <code translate="no">{site.installCommand}</code>
                  <CopyButton text={site.installCommand} />
                </div>
                <p>{block.macosNote}</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
