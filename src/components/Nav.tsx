'use client'
import Link from 'next/link'

type Mode = 'scroll' | 'tabbed'

const links = [
  { label: 'Remix', href: '#remix', id: 'remix' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Nav({
  mode = 'scroll',
  onNavigate,
  activeId,
}: {
  mode?: Mode
  onNavigate?: (id: string) => void
  activeId?: string
}) {
  return (
    <nav
      suppressHydrationWarning
      className="fixed z-50 left-1/2 -translate-x-1/2 top-4 w-[92%] md:w-[760px] lg:w-[980px] backdrop-blur bg-white/5 border border-white/10 rounded-2xl px-5 py-3"
    >
      <div className="flex items-center justify-between">
        <Link href="#top" className="text-lg font-bold tracking-tight hover:opacity-80">DF</Link>
        <ul className="flex items-center gap-2 md:gap-3">
          {links.map(l => {
            const isActive = activeId === l.id
            const base =
              "px-3 py-1.5 text-sm rounded-full border border-white/10 transition " +
              (isActive ? "bg-(--color-accent) text-black" : "bg-white/5 hover:bg-white/10")
            return (
              <li key={l.id}>
                {mode === 'scroll' ? (
                  <a href={l.href} className={base}>{l.label}</a>
                ) : (
                  <button
                    type="button"
                    className={base}
                    onClick={() => onNavigate?.(l.id)}
                  >
                    {l.label}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
