import CheckIcon from "@mui/icons-material/Check"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import Button from "@mui/material/Button"
import { ui } from "../content/ui.ts"
import { useCopy } from "../hooks/useCopy.ts"

export function CopyButton({ text }: { text: string }) {
  const { status, copy } = useCopy()
  const label =
    status === "copied" ? ui.actions.copied : status === "error" ? ui.actions.copyFailed : ui.actions.copy

  return (
    <Button
      type="button"
      variant="contained"
      startIcon={status === "copied" ? <CheckIcon /> : <ContentCopyIcon />}
      onClick={() => void copy(text)}
    >
      {label}
    </Button>
  )
}
