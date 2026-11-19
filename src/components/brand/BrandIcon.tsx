export function BrandIcon({ path, size = 22 }: { path: string; size?: number }) {
  return (
    <svg className="brand-icon" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path fill="currentColor" d={path} />
    </svg>
  )
}
