export type ThemeTokens = {
  base: string
  ink: string
  inkDim: string
  accent: string
  accent2: string
  radius: string
  elevSoft: string
  elevCard: string
  fontSans: string
  bg: string
  mode: 'dark' | 'light'
}

export const defaultTheme: ThemeTokens = {
  base: '#0a0b10',
  ink: '#eaeaf0',
  inkDim: '#cfd3de',
  accent: '#5de4c7',
  accent2: '#7a9cff',
  radius: '9999px',
  elevSoft: '0 0 28px rgba(93,228,199,.35)',
  elevCard: '0 8px 30px rgba(0,0,0,.35)',
  fontSans: 'Inter, ui-sans-serif, system-ui, sans-serif',
  bg:
    'radial-gradient(1200px 600px at 10% -10%, color-mix(in oklab, var(--color-accent) 25%, transparent), transparent 40%),' +
    'radial-gradient(900px 500px at 90% 10%, color-mix(in oklab, var(--color-accent-2) 18%, transparent), transparent 40%),' +
    '#0a0b10',
  mode: 'dark',
}


function hexToRgb(hex: string) {
  const m = hex.trim().replace('#','')
  const v = m.length === 3
    ? m.split('').map(c => parseInt(c + c, 16))
    : [parseInt(m.slice(0,2),16), parseInt(m.slice(2,4),16), parseInt(m.slice(4,6),16)]
  return { r: v[0], g: v[1], b: v[2] }
}

function relLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const toLin = (u: number) => {
    const s = u / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  const R = toLin(r), G = toLin(g), B = toLin(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function pickMode(tokens: ThemeTokens): 'light' | 'dark' {
  // If a theme forgets to set mode, infer from base color brightness
  try {
    return relLuminance(tokens.base) >= 0.6 ? 'light' : 'dark'
  } catch {
    return tokens.mode
  }
}

export function saveTheme(tokens: ThemeTokens) {
  try { localStorage.setItem('themeTokens', JSON.stringify(tokens)) } catch {}
}

export function loadTheme(): ThemeTokens | null {
  try {
    const raw = localStorage.getItem('themeTokens')
    return raw ? (JSON.parse(raw) as ThemeTokens) : null
  } catch { return null }
}

// theme.ts

function hexToHsl(hex: string) {
  let r = 0, g = 0, b = 0
  const m = hex.replace('#','')
  if (m.length === 3) {
    r = parseInt(m[0]+m[0],16); g = parseInt(m[1]+m[1],16); b = parseInt(m[2]+m[2],16)
  } else {
    r = parseInt(m.slice(0,2),16); g = parseInt(m.slice(2,4),16); b = parseInt(m.slice(4,6),16)
  }
  r/=255; g/=255; b/=255
  const max = Math.max(r,g,b), min = Math.min(r,g,b)
  let h = 0, s = 0, l = (max+min)/2
  if (max !== min) {
    const d = max - min
    s = l > .5 ? d/(2-max-min) : d/(max+min)
    switch(max){
      case r: h = (g-b)/d + (g<b?6:0); break
      case g: h = (b-r)/d + 2; break
      case b: h = (r-g)/d + 4; break
    }
    h *= 60
  }
  return { h, s, l }
}
const hslToCss = (h:number,s:number,l:number) => `hsl(${Math.round(h)}deg ${Math.round(s*100)}% ${Math.round(l*100)}%)`



// --- tiny HSL utils (you already have hexToHsl/hslToCss; reuse if present) ---
function clamp(n: number, a = 0, b = 1) { return Math.max(a, Math.min(b, n)) }

export function deriveAccent2(accentHex: string) {
  const { h, s, l } = hexToHsl(accentHex)

  // Randomly pick a relationship so it isn’t always “blue/purple”
  const r = Math.random()
  let h2 = h
  if (r < 0.34)       h2 = (h + 30) % 360        // analogous
  else if (r < 0.67)  h2 = (h + 180) % 360       // complementary
  else                h2 = (h + 120) % 360       // triadic

  // Slight tweaks so the color is vivid but readable
  const s2 = clamp(s * 0.95 + 0.06, 0.35, 0.98)
  const l2 = clamp(l * 0.92 + 0.04, 0.30, 0.82)

  return hslToCss(h2, s2, l2)
}

function pickCompanionHsl(h: number, s: number, l: number) {

  const r = Math.random()
  let h2 = h
  if (r < 0.34)       h2 = (h + 30) % 360         
  else if (r < 0.67)  h2 = (h + 180) % 360         
  else                h2 = (h + 120) % 360         

  
  const s2 = clamp(s * 0.95 + 0.06, 0, 1)
  const l2 = clamp(l * 0.95 + 0.02, 0.25, 0.82)
  return { h: h2, s: s2, l: l2 }
}

export function setRibbonPairFromAccent(accentHex: string) {
  const r = document.documentElement
  const { h, s, l } = hexToHsl(accentHex)
  const { h: h2, s: s2, l: l2 } = pickCompanionHsl(h, s, l)
  const a = hslToCss(h,  s,  l)    // main accent as-is
  const b = hslToCss(h2, s2, l2)   // companion color
  r.style.setProperty('--side-a', a)
  r.style.setProperty('--side-b', b)
}


export function applyTheme(tokens: ThemeTokens) {
  const r = document.documentElement

  const accent2 = tokens.accent2 || deriveAccent2(tokens.accent)

  r.style.setProperty('--color-base', tokens.base)
  r.style.setProperty('--color-accent', tokens.accent)
  r.style.setProperty('--color-accent-2', accent2)
  r.style.setProperty('--radius', tokens.radius)
  r.style.setProperty('--elev-soft', tokens.elevSoft)
  r.style.setProperty('--elev-card', tokens.elevCard)
  r.style.setProperty('--font-sans', tokens.fontSans)
  r.style.setProperty('--bg', tokens.bg)

  r.style.setProperty('--color-accent-2', accent2)

  r.style.setProperty('--side-a', tokens.accent)
  r.style.setProperty('--side-b', accent2)
  setRibbonPairFromAccent(tokens.accent)

  const mode = tokens.mode
  r.dataset.mode = mode
  r.dataset.theme = mode

  // ensure stylesheet controls ink colors
  r.style.removeProperty('--color-ink')
  r.style.removeProperty('--color-ink-dim')
}
