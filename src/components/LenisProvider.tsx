'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider({ active = true }: { active?: boolean }) {
  useEffect(() => {
    if (!active) return

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      gestureMode: 'all', 
    } as any) 

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => cancelAnimationFrame(rafId)
  }, [active])

  return null
}
