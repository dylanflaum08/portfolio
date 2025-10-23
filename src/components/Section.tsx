'use client'

import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export default function Section({
  id,
  children,
}: PropsWithChildren<{ id?: string }>) {
  return (
    <section id={id} className="min-h-dvh flex items-center justify-center px-6 py-16">
      <motion.div
        // Start slightly down & transparent
        initial={{ opacity: 0, y: 24 }}
        // Once in view, be fully readable (opacity: 1)
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        // Trigger when ~35% of the section is visible
        viewport={{ amount: 0.35, margin: '0px 0px -10% 0px' }}
        className="w-full max-w-[1000px]"
      >
        {children}
      </motion.div>
    </section>
  )
}
