// src/app/page.tsx
'use client'

import Nav from '@/components/Nav'
import Section from '@/components/Section'
import ProjectCard from '@/components/ProjectCard'
import { useLenis } from '@/lib/useLenis'

export default function Page() {
  // Smooth scrolling only; safe for hydration
  useLenis()

  return (
    <main id="top">
      <Nav />

      {/* HERO — static markup (no motion) to avoid hydration mismatches */}
      <section className="min-h-dvh flex items-center justify-center text-center px-6">
        <div className="relative z-10">
          <p className="text-[13px] md:text-sm uppercase tracking-[0.25em] font-semibold text-[#EAEAF0]">
            FULL-STACK SOFTWARE ENGINEER
          </p>

          <h1 className="mt-3 font-extrabold leading-[0.95] tracking-tight [font-size:clamp(56px,8.5vw,140px)] text-[#EAEAF0]">
            Dylan Flaum
          </h1>

          <p className="mt-5 text-[#DFE3EC] max-w-[760px] mx-auto text-lg md:text-xl">
            I build smooth, performant web/mobile experiences and reliable cloud backends.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href="#projects"
              className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm md:text-base text-black font-semibold
                         shadow-[0_0_28px_rgba(93,228,199,.35)] hover:opacity-90 transition"
            >
              View Projects
            </a>

            {/* Always-visible secondary button */}
            <a
              href="#contact"
              className="rounded-full px-6 py-3 text-sm font-semibold
                         text-white border border-[rgba(255,255,255,0.35)]
                         bg-[rgba(255,255,255,0.06)]
                         hover:bg-[rgba(93,228,199,0.15)]
                         hover:shadow-[0_0_18px_rgba(93,228,199,0.28)]
                         transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">About</h2>
        <p className="relative z-10 text-[#EAEAF0] max-w-[860px] md:text-lg leading-relaxed">
          I’m a full-stack engineer focused on React/Next.js, TypeScript, and AWS. I love crafting animated
          interfaces and smooth UX using Framer Motion and Lenis, and I deploy production services with
          serverless architectures.
        </p>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard
            title="Spark Rewards"
            blurb="Rewards platform for small businesses – web/mobile UI and AWS serverless backend."
            tags={['Next.js', 'Tailwind', 'AWS', 'DynamoDB']}
          />
          <ProjectCard
            title="BusyPing"
            blurb="Mobile app that auto-responds while driving or in the office with customizable toggles."
            tags={['React Native', 'Amplify', 'Cognito']}
          />
          <ProjectCard
            title="Slothful Trading"
            blurb="Experimental trading toolkit with dashboards and automation playground."
            tags={['TypeScript', 'WebSockets', 'Alpaca']}
          />
          <ProjectCard
            title="Movie Predictor"
            blurb="ML model that predicts movie ratings; end-to-end data pipeline & inference UI."
            tags={['Python', 'scikit-learn', 'FastAPI']}
          />
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience</h2>

        <div className="space-y-10 max-w-[1000px]">
          {/* SparkRewards */}
          <div>
            <div className="flex flex-wrap items-end gap-2">
              <h3 className="text-2xl md:text-3xl font-semibold">SparkRewards</h3>
              <span className="text-sm md:text-base opacity-80">Full-Stack Software Engineer · 12/2024 – Present</span>
            </div>
            <p className="mt-1 opacity-90">
              React/TypeScript · Node/TypeScript · AWS (API Gateway, Lambda, CloudFormation, S3, CloudWatch) · DynamoDB · CI/CD · SEO
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-[#DFE3EC]">
              <li>Deployed business sign-up site and landing page using React/TypeScript (front-end) and Node/TypeScript (back-end) on AWS.</li>
              <li>Designed and implemented <strong>4+ REST APIs</strong> between the UI and DynamoDB, reducing backend request failures by <strong>50%</strong>.</li>
              <li>Implemented SEO best practices (sitemap.xml, robots.txt, structured metadata, keyword optimization), improving organic traffic by <strong>~85%</strong>.</li>
              <li>Worked in Agile sprints (planning, demos, retros) to ensure on-time delivery.</li>
              <li>Used Git and CI/CD to ship reliable releases across development and production.</li>
            </ul>
          </div>

          {/* Wipro HealthPlan Services */}
          <div>
            <div className="flex flex-wrap items-end gap-2">
              <h3 className="text-2xl md:text-3xl font-semibold">Wipro HealthPlan Services</h3>
              <span className="text-sm md:text-base opacity-80">Intern · 05/2024 – 08/2024</span>
            </div>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-[#DFE3EC]">
              <li>Compiled Business Requirements Documents for a large-scale data migration affecting <strong>100K+ records</strong>.</li>
              <li>Supported incident/defect management with targeted <strong>SQL</strong> queries; ensured items moved through the correct lifecycle.</li>
              <li>Built Excel-based widgets to track ticket resolution, enabling <strong>98% on-time</strong> delivery.</li>
            </ul>
          </div>

          {/* ADA Site Compliance */}
          <div>
            <div className="flex flex-wrap items-end gap-2">
              <h3 className="text-2xl md:text-3xl font-semibold">ADA Site Compliance</h3>
              <span className="text-sm md:text-base opacity-80">Intern · 05/2023 – 08/2023</span>
            </div>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-[#DFE3EC]">
              <li>Provided CRM requirements & use cases to improve sales team efficiency.</li>
              <li>Fixed customers’ React front-ends to ensure screen-reader compatibility.</li>
              <li>Audited sites for ADA compliance and ran follow-ups; increased potential customer engagement by <strong>~20%</strong>.</li>
            </ul>
          </div>

          {/* Code Ninjas */}
          <div>
            <div className="flex flex-wrap items-end gap-2">
              <h3 className="text-2xl md:text-3xl font-semibold">Code Ninjas</h3>
              <span className="text-sm md:text-base opacity-80">Instructor · 04/2019 – 04/2021</span>
            </div>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-[#DFE3EC]">
              <li>Taught students <strong>Scratch</strong>, <strong>JavaScript</strong>, <strong>HTML</strong>, and <strong>3D Modeling</strong> in hands-on STEM activities.</li>
            </ul>
          </div>
        </div>
      </Section>


      {/* CONTACT */}
      <Section id="contact">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact</h2>
        <form className="max-w-[720px] space-y-3">
          <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-ring" placeholder="Name" />
          <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-ring" placeholder="Email" type="email" />
          <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-ring" rows={5} placeholder="Message" />
          <button className="rounded-full bg-[var(--color-accent)] text-black font-semibold px-6 py-3 shadow-[0_0_28px_rgba(93,228,199,.35)] hover:opacity-90 transition">
            Send
          </button>
        </form>
        <p className="mt-3 text-sm text-[#DFE3EC]">For production, wire this to an API route (SES/Formspree).</p>
      </Section>

      <footer className="py-16 text-center text-[color:color-mix(in_oklab,#eaeaf0_40%,transparent)] text-sm">
        © {new Date().getFullYear()} Dylan Flaum
      </footer>
    </main>
  )
}
