"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollTriggerProps {
  children: ReactNode
  className?: string
  animation?: "fade-in" | "fade-in-up" | "fade-in-left" | "fade-in-right" | "slide-in-up"
  delay?: number
}

export default function ScrollTrigger({
  children,
  className = "",
  animation = "fade-in-up",
  delay = 0,
}: ScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          ref.current.style.animationDelay = `${delay}ms`
          ref.current.classList.add(animation)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animation, delay])

  return (
    <div ref={ref} className={`${className} opacity-0`}>
      {children}
    </div>
  )
}
