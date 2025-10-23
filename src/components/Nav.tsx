'use client'
import Link from 'next/link'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <nav className="fixed z-50 left-1/2 -translate-x-1/2 top-4 w-[92%] md:w-[760px] lg:w-[980px] backdrop-blur bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
      <div className="flex items-center justify-between">
        <Link href="#top" className="text-lg font-bold tracking-tight hover:opacity-80">DF</Link>
        <ul className="flex items-center gap-2 md:gap-3">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-1.5 text-sm rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition focus-ring"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
