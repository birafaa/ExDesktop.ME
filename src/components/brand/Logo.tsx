export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1.5" y="8" width="18" height="18" rx="5" fill="currentColor" />
      <rect
        x="12"
        y="3.5"
        width="17"
        height="15"
        rx="4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
    </svg>
  )
}
