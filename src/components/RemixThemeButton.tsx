// src/components/RemixThemeButton.tsx
'use client'
import { useEffect, useState } from 'react'
import { applyTheme, defaultTheme, loadTheme, saveTheme, type ThemeTokens } from '@/lib/theme'

type LayoutId = 'centered'|'splitHero'|'leftRail'
type BehaviorId = 'scroll'|'tabbed'



export default function RemixThemeButton({
  onLayout,
  onBehavior,
}: {
  onLayout: (id: LayoutId) => void
  onBehavior: (b: BehaviorId) => void
}) {
  const [loading, setLoading] = useState(false)
  const [vibe, setVibe] = useState('Clean + Playful')

  useEffect(() => {
  const t = loadTheme() ?? defaultTheme; // ✅ never null now
  applyTheme(t);
  document.documentElement.dataset.mode = t.mode;
  document.documentElement.dataset.theme = t.mode; // optional alias
}, [])

  async function remix() {
    setLoading(true)
    try {
      const res = await fetch('/api/remix-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vibe }),
      })
      const txt = await res.text()
      const data = JSON.parse(txt)

      if (!res.ok) throw new Error(data?.error || 'Request failed')

      const theme = data.theme as ThemeTokens
      const layout = data.layout as LayoutId
      const behavior = data.behavior as BehaviorId

      applyTheme(theme); saveTheme(theme)
      document.documentElement.dataset.mode = theme.mode
      document.documentElement.dataset.theme = theme.mode
      onLayout(layout); onBehavior(behavior)
      try {
        localStorage.setItem('layoutId', layout)
        localStorage.setItem('behaviorId', behavior)
      } catch {}
      // 🔔 let the page recompute the description
      window.dispatchEvent(new CustomEvent('theme:applied'))
    } catch (e) {
      console.error(e)
      applyTheme(defaultTheme); saveTheme(defaultTheme)
      alert('Remix failed. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={remix}
        disabled={loading}
        className="rounded-(--radius) bg-(--color-accent) text-black font-semibold px-4 py-2 shadow-(--elev-soft) hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? 'Remixing…' : 'Remix Theme'}
      </button>
    </div>
  )
}
