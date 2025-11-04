// src/lib/layouts.tsx
'use client'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'

export type LayoutId = 'centered' | 'splitHero' | 'leftRail'

type Content = {
  about: string
  projects: Array<{ title: string; blurb: string; tags: string[] }>
  experience: Array<{ role: string; org: string; when: string; bullets: string[] }>
}

export function CenteredLayout({ content }: { content: Content }) {
  return (
    <>
      {/* ABOUT */}
      <Section id="about">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">About</h2>
        <p className="text-ink max-w-[860px] md:text-lg leading-relaxed">{content.about}</p>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {content.projects.map(p => (
            <ProjectCard key={p.title} title={p.title} blurb={p.blurb} tags={p.tags} />
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience</h2>
        <div className="space-y-8">
          {content.experience.map((e, i) => (
            <div key={i}>
              <div className="flex flex-wrap items-end gap-2">
                <h3 className="text-2xl md:text-3xl font-semibold">{e.org}</h3>
                <span className="text-sm md:text-base opacity-80">{e.role} · {e.when}</span>
              </div>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-ink">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

export function SplitHeroLayout({ content }: { content: Content }) {
  return (
    <>
      {/* ABOUT (split) */}
      <Section id="about">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold">About</h2>
            <p className="mt-4 text-ink md:text-lg leading-relaxed">{content.about}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[var(--elev-card)]">
            <h3 className="text-xl font-semibold mb-2">Highlights</h3>
            <ul className="list-disc pl-6 space-y-1 text-ink">
              <li>Next.js + TypeScript</li>
              <li>AWS Serverless</li>
              <li>Framer Motion</li>
              <li>Data/ML projects</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* PROJECTS (masonry-ish) */}
      <Section id="projects">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Projects</h2>
        <div className="columns-1 md:columns-2 gap-6 [column-fill:balance]">
          {content.projects.map(p => (
            <div key={p.title} className="break-inside-avoid mb-6">
              <ProjectCard title={p.title} blurb={p.blurb} tags={p.tags} />
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE (cards) */}
      <Section id="experience">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {content.experience.map((e, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[var(--elev-card)]">
              <div className="flex flex-wrap items-end gap-2">
                <h3 className="text-xl font-semibold">{e.org}</h3>
                <span className="text-sm opacity-80">{e.role} · {e.when}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-ink">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

export function LeftRailLayout({ content }: { content: Content }) {
  return (
    <div className="grid md:grid-cols-[260px,1fr] gap-8 items-start">
      <aside className="hidden md:block sticky top-6 self-start rounded-2xl border border-white/10 bg-white/5 p-5">
        <nav className="space-y-2 text-sm">
          <a href="#about" className="block opacity-90 hover:opacity-100">About</a>
          <a href="#projects" className="block opacity-90 hover:opacity-100">Projects</a>
          <a href="#experience" className="block opacity-90 hover:opacity-100">Experience</a>
          <a href="#contact" className="block opacity-90 hover:opacity-100">Contact</a>
        </nav>
      </aside>
      <div>
        <Section id="about">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About</h2>
          <p className="text-ink max-w-[860px] md:text-lg leading-relaxed">{content.about}</p>
        </Section>
        <Section id="projects">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.projects.map(p => (
              <ProjectCard key={p.title} title={p.title} blurb={p.blurb} tags={p.tags} />
            ))}
          </div>
        </Section>
        <Section id="experience">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience</h2>
          <div className="space-y-8">
            {content.experience.map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-end gap-2">
                  <h3 className="text-2xl md:text-3xl font-semibold">{e.org}</h3>
                  <span className="text-sm md:text-base opacity-80">{e.role} · {e.when}</span>
                </div>
                <ul className="mt-3 list-disc pl-6 space-y-2 text-ink">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

export function renderLayout(id: LayoutId, content: Content) {
  switch (id) {
    case 'splitHero': return <SplitHeroLayout content={content} />
    case 'leftRail':  return <LeftRailLayout  content={content} />
    case 'centered':
    default:          return <CenteredLayout  content={content} />
  }
}
