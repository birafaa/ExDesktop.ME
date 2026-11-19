import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import { CopyButton } from "../CopyButton.tsx"
import { install, type OsId } from "../../content/install.ts"
import { site } from "../../content/site.ts"

export function InstallAction({ os }: { os: OsId }) {
  if (os === "windows") {
    return (
      <div className="install-action">
        <a className="install-go" href={site.windows.href}>
          <DownloadOutlinedIcon />
          {install.download}
        </a>
        <p className="install-caption" translate="no">
          {site.windows.file} · {site.windows.size}
        </p>
      </div>
    )
  }

  return (
    <div className="install-action">
      <div className="install-command__row">
        <code translate="no">{site.installCommand}</code>
        <CopyButton text={site.installCommand} />
      </div>
    </div>
  )
}
