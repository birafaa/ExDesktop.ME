import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined"
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded"
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined"
import type { SvgIconComponent } from "@mui/icons-material"
import { CopyButton } from "../CopyButton.tsx"
import { install, type OsId } from "../../content/install.ts"
import { site } from "../../content/site.ts"

const stepIcons: Record<OsId, SvgIconComponent[]> = {
  windows: [DownloadOutlinedIcon, PlayArrowRoundedIcon, DesktopWindowsOutlinedIcon],
  linux: [TerminalOutlinedIcon, ContentPasteOutlinedIcon, PlayArrowRoundedIcon],
  macos: [TerminalOutlinedIcon, ContentPasteOutlinedIcon, DesktopWindowsOutlinedIcon],
}

export function InstallStage({ os }: { os: OsId }) {
  const icons = stepIcons[os]
  return (
    <div className="install-stage" key={os}>
      {os === "windows" ? (
        <div className="install-win">
          <div className="install-win__bar">
            <i />
            <i />
            <i />
            <b translate="no">{site.windows.file}</b>
          </div>
          <a className="install-go" href={site.windows.href}>
            <DownloadOutlinedIcon />
            {install.download}
          </a>
          <p className="install-caption" translate="no">
            {site.windows.file} · {site.windows.size}
          </p>
        </div>
      ) : (
        <div className="install-term">
          <div className="install-term__bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="install-command__row">
            <code translate="no">{site.installCommand}</code>
            <CopyButton text={site.installCommand} />
          </div>
        </div>
      )}
      <ol className="install-steps">
        {install.systems[os].steps.map((step, index) => {
          const Icon = icons[index]
          return (
            <li key={step}>
              <span className="install-steps__n" aria-hidden="true">
                {index + 1}
              </span>
              <Icon aria-hidden="true" />
              <span>{step}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
