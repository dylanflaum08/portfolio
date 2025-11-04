// src/components/Section.tsx
'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PropsWithChildren, useRef } from 'react'

export default function Section({
  id,
  className = '',
  children,
}: PropsWithChildren<{ id?: string; className?: string }>) {
  const ref = useRef<HTMLDivElement | null>(null)

  // Make the effect kick in well before the edges:
  // - Enters when the section's top hits ~80% of viewport
  // - Exits when the section's bottom reaches ~20% of viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  })

  // More obvious fade + slide
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0.6, 1, 0.6, 0])
  const y       = useTransform(scrollYProgress, [0, 0.5, 1], [48, 0, -48])
  const scale   = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])

  return (
    <section id={id} className={`relative w-full max-w-[1000px] mx-auto px-6 py-28 md:py-36 ${className}`}>
      <motion.div
        ref={ref}
        style={{ opacity, y, scale }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  )
}
