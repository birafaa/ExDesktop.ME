import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined"
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded"
import TerminalOutlinedIcon from "@mui/icons-material/TerminalOutlined"
import type { SvgIconComponent } from "@mui/icons-material"
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import { CopyButton } from "../CopyButton.tsx"
import { install, type OsId } from "../../content/install.ts"
import { site } from "../../content/site.ts"

const order: OsId[] = ["windows", "linux", "macos"]

const stepIcons: Record<OsId, SvgIconComponent[]> = {
  windows: [DownloadOutlinedIcon, PlayArrowRoundedIcon, DesktopWindowsOutlinedIcon],
  linux: [TerminalOutlinedIcon, ContentPasteOutlinedIcon, PlayArrowRoundedIcon],
  macos: [TerminalOutlinedIcon, ContentPasteOutlinedIcon, DesktopWindowsOutlinedIcon],
}

function titleFor(id: OsId) {
  if (id === "windows") return site.windows.file
  return install.systems[id].label
}

function useActiveHeight(index: number) {
  const refs = useRef<Array<HTMLElement | null>>([])
  const [height, setHeight] = useState<number>()
  const setRef = (slot: number) => (node: HTMLElement | null) => {
    refs.current[slot] = node
  }

  useLayoutEffect(() => {
    const node = refs.current[index]
    if (!node) return
    const apply = () => setHeight(node.offsetHeight)
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(node)
    return () => observer.disconnect()
  }, [index])

  return { setRef, height }
}

export function InstallStage({ os }: { os: OsId }) {
  const index = order.indexOf(os)
  const motion = { "--i": index } as CSSProperties
  const body = useActiveHeight(index)
  const steps = useActiveHeight(index)

  return (
    <div className="install-stage">
      <div className="install-frame">
        <div className="install-frame__bar">
          <span className="install-dots" style={motion} aria-hidden="true">
            <span className="install-dots__lights">
              <span className="install-dots__mark" />
            </span>
            <i className={index === 0 ? "is-lit" : undefined} />
            <i className={index === 1 ? "is-lit" : undefined} />
            <i className={index === 2 ? "is-lit" : undefined} />
          </span>
          <div className="install-frame__title">
            <div className="install-track" style={motion}>
              {order.map((id) => (
                <b key={id} translate="no" aria-hidden={id !== os}>
                  {titleFor(id)}
                </b>
              ))}
            </div>
          </div>
        </div>
        <div className="install-frame__view" style={body.height ? { height: body.height } : undefined}>
          <div className="install-track" style={motion}>
            <div
              className="install-pane install-pane--windows"
              ref={body.setRef(0)}
              inert={os !== "windows"}
              aria-hidden={os !== "windows"}
            >
              <a className="install-go" href={site.windows.href}>
                <DownloadOutlinedIcon />
                {install.download}
              </a>
              <p className="install-caption" translate="no">
                {site.windows.size}
              </p>
            </div>
            {(["linux", "macos"] as const).map((id, offset) => (
              <div
                key={id}
                className="install-pane"
                ref={body.setRef(offset + 1)}
                inert={os !== id}
                aria-hidden={os !== id}
              >
                <div className="install-command__row">
                  <code translate="no">{site.installCommand}</code>
                  <CopyButton text={site.installCommand} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="install-steps-view" style={steps.height ? { height: steps.height } : undefined}>
        <div className="install-track" style={motion}>
          {order.map((id, pane) => (
            <ol
              key={id}
              className={os === id ? "install-steps is-current" : "install-steps"}
              ref={steps.setRef(pane)}
              inert={os !== id}
              aria-hidden={os !== id}
            >
              {install.systems[id].steps.map((step, stepIndex) => {
                const Icon = stepIcons[id][stepIndex]
                return (
                  <li key={step.title} style={{ "--step": stepIndex } as CSSProperties}>
                    <span className="install-steps__n" aria-hidden="true">
                      {stepIndex + 1}
                    </span>
                    <span className="install-steps__title">
                      <Icon aria-hidden="true" />
                      {step.title}
                    </span>
                  </li>
                )
              })}
            </ol>
          ))}
        </div>
      </div>
    </div>
  )
}
