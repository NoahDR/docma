"use client"

import { useEffect, useRef } from "react"

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const stateRef = useRef({
    reversing: false,
    seeking: false,
    lastTs: 0,
    pending: 0, // accumulated time waiting for seek to finish
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    function tick(ts: number) {
      const s = stateRef.current
      if (!s.reversing) return

      // accumulate elapsed wall-clock time
      if (s.lastTs > 0) s.pending += (ts - s.lastTs) / 1000
      s.lastTs = ts

      // only seek if the previous seek has landed
      if (!s.seeking && s.pending > 0) {
        const next = video!.currentTime - s.pending
        s.pending = 0

        if (next <= 0) {
          // reverse done — restart forward
          s.reversing = false
          s.seeking = false
          s.lastTs = 0
          video!.currentTime = 0
          video!.play()
          return
        }

        s.seeking = true
        video!.currentTime = next
      }

      requestAnimationFrame(tick)
    }

    function onSeeked() {
      stateRef.current.seeking = false
    }

    function onEnded() {
      const s = stateRef.current
      s.reversing = true
      s.seeking = false
      s.lastTs = 0
      s.pending = 0
      requestAnimationFrame(tick)
    }

    video.addEventListener("ended", onEnded)
    video.addEventListener("seeked", onSeeked)

    return () => {
      video.removeEventListener("ended", onEnded)
      video.removeEventListener("seeked", onSeeked)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      src="/hero-bg.mp4"
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  )
}
