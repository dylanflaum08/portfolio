// src/app/page.tsx
'use client'

import Nav from '@/components/Nav'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import RemixThemeButton from '@/components/RemixThemeButton'
import { renderLayout, type LayoutId } from '@/lib/layouts'
import LenisProvider from '@/components/LenisProvider'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ContinuousArt from '@/components/ContinuousArt'
import SideDecor from '@/components/SideDecor'

type Pos = 'left'|'right'|'both'
const pickPos = (): Pos => (['left','right','both'])[Math.floor(Math.random()*3)] as Pos
type BehaviorId = 'scroll' | 'tabbed'

// Order for tabbed wheel navigation
const TAB_ORDER = ['remix', 'about', 'projects', 'experience', 'contact'] as const
type TabId = typeof TAB_ORDER[number]

export default function Page() {
  const [layout, setLayout] = useState<LayoutId>('centered')
  const [behavior, setBehavior] = useState<BehaviorId>('scroll')
  const [activeId, setActiveId] = useState<TabId>('remix')
  const [sidePos, setSidePos] = useState<Pos>(pickPos())
  const [designVariant, setDesignVariant] = useState<number | null>(null);

  const [remixDesc, setRemixDesc] = useState<string>('')



  const computeRemixDesc = useCallback(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const mode = (root.dataset.mode as 'dark' | 'light' | undefined) ?? 'dark';
    const cs = getComputedStyle(root);
    const accent = cs.getPropertyValue('--color-accent')?.trim() || '#5de4c7';
    const accent2 = cs.getPropertyValue('--color-accent-2')?.trim() || '#7a9cff';

    const layoutLabel =
      layout === 'centered' ? 'a centered layout'
      : layout === 'splitHero' ? 'a split hero layout'
      : 'a left rail layout';

    const behaviorLabel =
      behavior === 'scroll' ? 'continuous scroll mode' : 'tabbed navigation mode';

    // Only describe side art when it's actually visible: scroll + light + variant present
    let sideLine = '';
    if (behavior === 'scroll' && mode === 'light' && designVariant != null) {
      const variantLabel =
        designVariant === 0 ? 'clean bordered edges'
        : designVariant === 1 ? 'wave-like side accents'
        : designVariant === 2 ? 'subtle fade panels'
        : designVariant === 3 ? 'tech grid lines'
        : 'glowing trails';
      sideLine = ` The current side design features ${variantLabel}.`;
    }

    const transitionLine =
      behavior === 'scroll'
        ? ' with a visible fade transition between sections.'
        : ' with discrete, click-to-view sections.';

    const sentence =
      `This remix is in ${behaviorLabel} using ${layoutLabel}${transitionLine} `
      + `The theme is ${mode}.${sideLine} `
      + `Main accents: ${accent} and ${accent2}.`;

    setRemixDesc(sentence);
  }, [layout, behavior, designVariant]);



  useEffect(() => { computeRemixDesc() }, [computeRemixDesc])
  useEffect(() => {
    const fn = () => computeRemixDesc()
    window.addEventListener('theme:applied', fn as EventListener)
    return () => window.removeEventListener('theme:applied', fn as EventListener)
  }, [computeRemixDesc])

  // Load persisted choices (layout/behavior)
  useEffect(() => {
    try {
      const L = localStorage.getItem('layoutId') as LayoutId | null
      const B = localStorage.getItem('behaviorId') as BehaviorId | null
      if (L) setLayout(L)
      if (B) setBehavior(B)
      // If we switch to tabbed and currently not on a valid tab, reset to 'remix'
      setActiveId((prev) => (TAB_ORDER.includes(prev as TabId) ? prev : 'remix'))
    } catch {}
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<number | null>;
      setDesignVariant(ce.detail ?? null);
    };
    window.addEventListener('design:variant', handler as EventListener);
    return () => window.removeEventListener('design:variant', handler as EventListener);
  }, []);

  useEffect(() => {
    const update = () => setSidePos(pickPos())
    window.addEventListener('theme:applied', update as EventListener)
    return () => window.removeEventListener('theme:applied', update as EventListener)
  }, [])


  const effectiveLayout =
          behavior === 'scroll' && layout === 'leftRail' ? 'centered' : layout

  // Content
const about =
  "Hi my name is Dylan Flaum. I graduated from the University of Florida with a major in Computer Science, a minor in Sales Engineering, and UF's Artificial Intelligence Certification." +
  "I currently work as a Full Stack Developer at a startup called Spark Rewards, where my day-to-day can vary from translating Figma designs into responsive front-end pages, to configuring APIs on the backend, to managing our AWS infrastructure.\n\n" +
  "I’m passionate about exploring emerging technologies, especially in artificial intelligence and automation, and I really enjoy applying those tools to build efficient, user-focused systems." +
  "I’m excited to bring that same curiosity and problem-solving mindset to a larger engineering team where I can continue to grow and make an impact.";


  const projects = useMemo(
  () => [
    {
      title: 'Spark Rewards',
      blurb: 'Rewards platform for small businesses – web/mobile UI and AWS serverless backend.',
      tags: ['Next.js', 'Tailwind', 'AWS', 'DynamoDB'],
      href: 'https://getsparkrewards.com',
    },
    {
      title: 'Slothful Trading',
      blurb: 'Experimental trading toolkit with dashboards and automation playground.',
      tags: ['TypeScript', 'CrewAI', 'Alpaca'],
      href: 'https://github.com/dylanflaum08/slothful-trading',
    },
    {
      title: 'Movie Predictor',
      blurb: 'ML model that predicts movie ratings; end-to-end data pipeline & inference UI.',
      tags: ['Python', 'scikit-learn', 'Machine Learning'],
      href: 'https://github.com/dylanflaum08/movie-predictor',
    },
    {
      title: 'Chain Reaction',
      blurb: 'Web game where players must write words that begin with the ending letter of the previous word',
      tags: ['Typescript', 'PHP', 'CSS'],
      href: 'https://www.cise.ufl.edu/~menghuahuang/chain_reaction/',
    },
  ],
  []
)


  const experience = useMemo(
    () => [
      {
        org: 'SparkRewards',
        role: 'Full-Stack Software Engineer',
        when: '12/2024 – Present',
        bullets: [
          'Deployed business sign-up site and landing page (React/TypeScript + Node/TypeScript on AWS).',
          'Built 4+ REST APIs between UI and DynamoDB, cutting backend request failures by ~50%.',
          'Implemented SEO (sitemap.xml, robots.txt, metadata, keywords), boosting organic traffic by ~85%.',
          'Agile sprints; CI/CD with Git for reliable releases across environments.',
        ],
      },
      {
        org: 'Wipro HealthPlan Services',
        role: 'Intern',
        when: '05/2024 – 08/2024',
        bullets: [
          'Compiled BRDs for data migration affecting 100K+ records.',
          'Supported incident/defect management with SQL queries and lifecycle tracking.',
          'Built Excel widgets for ticket tracking; enabled ~98% on-time delivery.',
        ],
      },
      {
        org: 'ADA Site Compliance',
        role: 'Intern',
        when: '05/2023 – 08/2023',
        bullets: [
          'Provided CRM requirements & use cases to improve sales efficiency.',
          'Fixed clients’ React front-ends for screen-reader compatibility.',
          'Audited sites for ADA and followed up; increased potential client engagement by ~20%.',
        ],
      },
      {
        org: 'Code Ninjas',
        role: 'Instructor',
        when: '04/2019 – 04/2021',
        bullets: [
          'Taught Scratch, JavaScript, HTML, and 3D modeling in hands-on STEM activities.',
        ],
      },
    ],
    []
  )

  return (
    <main id="top" className="flex flex-col min-h-screen" suppressHydrationWarning>
      {/* Smooth scrolling only in scroll mode */}
      {behavior === 'scroll' && <LenisProvider active />}

      {behavior === 'scroll' && <ContinuousArt active />}

      {behavior === 'tabbed' && (
        <Nav
          mode="tabbed"
          onNavigate={(id) => setActiveId(id as TabId)}
          activeId={activeId}
        />
      )}

      {behavior === 'tabbed' && <SideDecor position={sidePos} align="edge"/>}

      {/* HERO / REMIX */}
      {(behavior === 'scroll' || (behavior === 'tabbed' && activeId === 'remix')) && (
        <section id="remix" className="min-h-dvh flex items-center justify-center text-center px-6">
          <div className="relative z-10">
            <p className="text-[13px] md:text-sm uppercase tracking-[0.25em] font-semibold text-(--color-ink)">
              FULL-STACK SOFTWARE ENGINEER
            </p>
            <h1 className="mt-3 font-extrabold leading-[0.95] tracking-tight text-[clamp(56px,8.5vw,140px)] text-(--color-ink)">
              Dylan Flaum
            </h1>

            {/* 👇 This replaces the old static sentence */}
            <p className="mt-5 text-(--color-ink-dim) max-w-[900px] mx-auto md:text-lg">
              {remixDesc}
            </p>

            {/* 👇 Remix button sits directly under the description */}
            <div className="mt-6 flex items-center justify-center">
              <RemixThemeButton onLayout={setLayout} onBehavior={(b) => setBehavior(b)} />
            </div>
          </div>
        </section>
      )}

      {/* ========== CONTENT AREA ========== */}
      {behavior === 'scroll' ? (
        <>
          {/* Continuous sections */}
          

          {renderLayout(effectiveLayout, { about, projects, experience })}

          {/* CONTACT (bottom) */}
          <Section id="contact">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact</h2>
            <form className="max-w-[720px] space-y-3">
              <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-ring" placeholder="Name" />
              <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-ring" placeholder="Email" type="email" />
              <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-ring" rows={5} placeholder="Message" />
              <button className="rounded-(--radius) bg-(--color-accent) text-black font-semibold px-6 py-3 shadow-(--elev-soft) hover:opacity-90 transition">
                Send
              </button>
            </form>
          </Section>
        </>
      ) : (
        // TAB MODE: render ONLY the active section (no hero unless 'remix' is active)
        <div className="px-6 py-16">
          {/* ABOUT */}
          {activeId === 'about' && (
            <div id="about" className="max-w-[1000px] mx-auto mt-24 md:mt-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About</h2>
              <p className="text-ink max-w-[860px] md:text-lg leading-relaxed">
                {about}
              </p>
            </div>
          )}

          {/* PROJECTS */}
          {activeId === 'projects' && (
            <div id="projects" className="max-w-[1000px] mx-auto mt-24 md:mt-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((p) => (
                  <ProjectCard
                    key={p.title}
                    title={p.title}
                    blurb={p.blurb}
                    tags={p.tags}
                  />
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {activeId === 'experience' && (
            <div id="experience" className="max-w-[1000px] mx-auto mt-24 md:mt-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience</h2>
              <div className="space-y-8">
                {experience.map((e, i) => (
                  <div key={i}>
                    <div className="flex flex-wrap items-end gap-2">
                      <h3 className="text-2xl md:text-3xl font-semibold">{e.org}</h3>
                      <span className="text-sm md:text-base opacity-80">
                        {e.role} · {e.when}
                      </span>
                    </div>
                    <ul className="mt-3 list-disc pl-6 space-y-2 text-(--color-ink-dim)">
                      {e.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeId === 'contact' && (
            <div id="contact" className="max-w-[1000px] mx-auto mt-24 md:mt-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact</h2>
              <form className="max-w-[720px] space-y-3">
                <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-ring" placeholder="Name" />
                <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-ring" placeholder="Email" type="email" />
                <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-ring" rows={5} placeholder="Message" />
                <button className="rounded-(--radius) bg-(--color-accent) text-black font-semibold px-6 py-3 shadow-(--elev-soft) hover:opacity-90 transition">
                  Send
                </button>
              </form>
            </div>
          )}

        </div>
      )}

      <footer className="mt-auto py-10 text-center text-sm text-(--color-ink-dim)">
        © Dylan Flaum
      </footer>
    </main>
  )
}
