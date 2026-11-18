export function Logo({ size = 32 }: { size?: number }) {
  return (
    <img
      className="logo"
      src="/favicon.svg"
      width={size}
      height={size}
      alt=""
      draggable={false}
    />
  )
}
