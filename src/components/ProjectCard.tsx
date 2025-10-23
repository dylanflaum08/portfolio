'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = { title: string; blurb: string; tags: string[]; href?: string }

export default function ProjectCard({ title, blurb, tags, href }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(600px 200px at 80% -20%, rgba(122,156,255,0.25), transparent 60%)' }}
      />
      <div className="flex items-start justify-between relative z-10">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
      </div>
      <p className="mt-2 text-sm/6 text-[var(--color-ink-dim)] relative z-10">{blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2 relative z-10">
        {tags.map(t => (
          <span key={t} className="text-[11px] rounded-full border border-white/15 bg-white/10/50 backdrop-blur px-2.5 py-1">
            {t}
          </span>
        ))}
      </div>
      {href && (
        <Link href={href} className="mt-5 inline-block text-sm font-medium underline hover:opacity-80 relative z-10">
          View
        </Link>
      )}
    </motion.div>
  )
}
