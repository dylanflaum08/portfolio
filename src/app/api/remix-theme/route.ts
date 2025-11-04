import { NextResponse } from 'next/server'
import { z } from 'zod'
import type { ThemeTokens } from '@/lib/theme'

const Req = z.object({ vibe: z.string().default('Clean') })
const Layout = z.enum(['centered', 'splitHero', 'leftRail'])
const Behavior = z.enum(['scroll', 'tabbed'])
type LayoutId = z.infer<typeof Layout>
type BehaviorId = z.infer<typeof Behavior>

function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function clamp01(x: number) { return Math.max(0, Math.min(1, x)) }
function randomAccent(hStart=120,hEnd=260) {
  const L = clamp01(rand(0.70, 0.88))
  const C = clamp01(rand(0.12, 0.22))
  const H = rand(hStart, hEnd)
  const lightness = Math.round(L * 100)
  const saturation = Math.round(C * 480)
  const hue = Math.round(H)
  return `hsl(${hue} ${saturation}% ${lightness}%)`
}
function pickLayout(vibe: string): LayoutId {
  if (/left|sidebar|toc/i.test(vibe)) return 'leftRail'
  if (/split|hero|two[- ]col|magazine/i.test(vibe)) return 'splitHero'
  const ids: LayoutId[] = ['centered', 'splitHero', 'leftRail']
  return ids[Math.floor(Math.random() * ids.length)]
}
function pickBehavior(vibe: string): BehaviorId {
  if (/tab|click|no scroll|paged/i.test(vibe)) return 'tabbed'
  // 50/50 otherwise
  return Math.random() < 0.5 ? 'tabbed' : 'scroll'
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { vibe } = Req.parse(body)

    // 40% chance to go LIGHT
    const goLight = /light|pastel|paper|white/i.test(vibe) || Math.random() < 0.4

    const baseDark = ['#0a0b10','#0b0c12','#0c0d14','#0a0a0f'][Math.floor(Math.random()*4)]
    const baseLight = ['#f7f7fb','#f5f7fa','#fbfbfd','#f6f8ff'][Math.floor(Math.random()*4)]

    const accent = randomAccent()
    const accent2 = randomAccent(260,340) // blues/purples as secondary

    const theme: ThemeTokens = {
      base: goLight ? baseLight : baseDark,
      ink: goLight ? '#111318' : '#eaeaf0',
      inkDim: goLight ? '#303640' : '#cfd3de',
      accent,
      accent2,
      radius: /sharp|brut/i.test(vibe) ? '10px' : /soft|neo/i.test(vibe) ? '24px' : '9999px',
      elevSoft: `0 0 28px color-mix(in oklab, ${accent} 30%, transparent)`,
      elevCard: goLight ? '0 10px 30px rgba(0,0,0,.08)' : '0 10px 36px rgba(0,0,0,.45)',
      fontSans: /serif|editorial/i.test(vibe)
        ? 'Georgia, ui-serif, serif'
        : /mono|terminal/i.test(vibe)
        ? 'ui-monospace, SFMono-Regular, Menlo, monospace'
        : 'Inter, ui-sans-serif, system-ui, sans-serif',
      bg: goLight
        ? `linear-gradient(180deg, white, ${baseLight})`
        : `radial-gradient(1200px 600px at 10% -10%, color-mix(in oklab, ${accent} 22%, transparent), transparent 40%),
           radial-gradient(900px 500px at 90% 10%, color-mix(in oklab, ${accent2} 16%, transparent), transparent 40%),
           ${baseDark}`,
      mode: goLight ? 'light' : 'dark',
    }

    const layout = pickLayout(vibe)
    const behavior = pickBehavior(vibe)
    return NextResponse.json({ theme, layout, behavior })
  } catch (err) {
    console.error('remix-theme error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
