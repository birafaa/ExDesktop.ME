import { useEffect, useRef, useState } from "react"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function inView(node: HTMLElement) {
  const rect = node.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const node = ref.current
    document.documentElement.classList.add("js")
    if (!node || prefersReducedMotion() || typeof IntersectionObserver !== "function") return
    if (inView(node)) return

    setShown(false)
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      setShown(true)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          finish()
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 48px 0px" },
    )
    observer.observe(node)
    const timer = window.setTimeout(finish, 1200)
    return () => {
      settled = true
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return { ref, shown }
}
