import { useEffect, useRef, useState } from "react"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(prefersReducedMotion)

  useEffect(() => {
    const node = ref.current
    if (!node || shown) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        setShown(true)
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shown])

  return { ref, shown }
}
