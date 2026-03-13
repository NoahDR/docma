"use client"

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react"

import { cn } from "@/lib/utils"

type MotionVariant = "up" | "soft" | "scale" | "left" | "right"

type MotionRevealProps = HTMLAttributes<HTMLDivElement> & {
  variant?: MotionVariant
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  threshold?: number
  rootMargin?: string
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

export function MotionReveal({
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 720,
  distance = 1,
  once = true,
  threshold = 0.22,
  rootMargin = "0px 0px -12% 0px",
  style,
  ...props
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    const applyMotionState = (state: "hidden" | "visible") => {
      node.dataset.motionReady = "true"
      node.dataset.motionState = state
    }

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      applyMotionState("visible")
      return
    }

    const rect = node.getBoundingClientRect()
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const inViewport = rect.top <= viewportHeight * 0.88 && rect.bottom >= viewportHeight * 0.12

    applyMotionState(inViewport ? "visible" : "hidden")

    if (inViewport && once) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return
        }

        if (entry.isIntersecting) {
          applyMotionState("visible")

          if (once) {
            observer.disconnect()
          }

          return
        }

        if (!once) {
          applyMotionState("hidden")
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  const motionStyle = {
    ...style,
    "--motion-delay": `${delay}ms`,
    "--motion-duration": `${duration}ms`,
    "--motion-distance": `${distance}rem`,
  } as CSSProperties

  return (
    <div
      ref={ref}
      className={cn("motion-reveal", className)}
      data-motion-ready="false"
      data-motion-state="visible"
      data-motion-variant={variant}
      style={motionStyle}
      {...props}
    >
      {children}
    </div>
  )
}
