'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      touchMultiplier: 1.1,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // @ts-expect-error debug hook
    window.lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      // @ts-ignore
      lenis.destroy?.()
    }
  }, [])
}
