'use client';

import { useMemo } from 'react';

type Props = { accent: string; accent2: string };

// Tweak these if you want:
const USE_MASK = true;       // soft edge fade into the page
const DEBUG_OUTLINE = false; // dashed outline on columns for quick visual debug

export default function Trails({ accent, accent2 }: Props) {
  const left = useTrailDrops('left', accent, accent2, 16);
  const right = useTrailDrops('right', accent, accent2, 16);

  return (
    <>
      {/* LEFT COLUMN */}
      <div
        className="trail trail--left"
        aria-hidden
        style={{
          ...(USE_MASK
            ? {
                maskImage:
                  'linear-gradient(to right, black 85%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, black 85%, transparent 100%)',
              }
            : {}),
          ...(DEBUG_OUTLINE ? { outline: '1px dashed rgba(0,0,0,.25)' } : {}),
        }}
      >
        {left.map((d, i) => (
          <span
            key={`l-${i}`}
            className="trail__dot"
            style={{
              left: `${d.x}%`,
              width: d.size,
              height: d.size,

              // animation (longhand only to avoid console warning)
              animationName: 'floatY',
              animationDuration: `${d.duration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: `${d.delay}s`,

              // visible core + soft glow; works with hsl()/var()
              background: `radial-gradient(circle at 50% 50%, ${d.color} 0 55%, transparent 60%)`,
              boxShadow: `
                0 0 ${Math.round(d.size * 1.8)}px ${withAlpha(d.color, 0.6)},
                0 0 ${Math.round(d.size * 3.6)}px ${withAlpha(d.color, 0.35)}
              `,
              opacity: d.opacity,
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* RIGHT COLUMN */}
      <div
        className="trail trail--right"
        aria-hidden
        style={{
          ...(USE_MASK
            ? {
                maskImage:
                  'linear-gradient(to left, black 85%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to left, black 85%, transparent 100%)',
              }
            : {}),
          ...(DEBUG_OUTLINE ? { outline: '1px dashed rgba(0,0,0,.25)' } : {}),
        }}
      >
        {right.map((d, i) => (
          <span
            key={`r-${i}`}
            className="trail__dot"
            style={{
              left: `${d.x}%`,
              width: d.size,
              height: d.size,

              animationName: 'floatY',
              animationDuration: `${d.duration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: `${d.delay}s`,

              background: `radial-gradient(circle at 50% 50%, ${d.color} 0 55%, transparent 60%)`,
              boxShadow: `
                0 0 ${Math.round(d.size * 1.8)}px ${withAlpha(d.color, 0.6)},
                0 0 ${Math.round(d.size * 3.6)}px ${withAlpha(d.color, 0.35)}
              `,
              opacity: d.opacity,
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
    </>
  );
}

type Drop = {
  x: number;        // % across ribbon
  size: number;     // px
  duration: number; // s
  delay: number;    // s
  color: string;    // accent or accent2
  opacity: number;  // 0–1
};

function useTrailDrops(
  side: 'left' | 'right',
  a: string,
  b: string,
  count: number
) {
  // deterministic per mount (SSR-safe)
  return useMemo<Drop[]>(() => {
    const rng = seededRandom(side === 'left' ? 11 : 29);
    const drops: Drop[] = [];

    for (let i = 0; i < count; i++) {
      const size = Math.round(10 + rng() * 18);     // 10–28px
      const x = Math.round(8 + rng() * 84);         // avoid extreme edge
      const duration = 14 + rng() * 16;             // 14–30s
      const delay = -rng() * duration;              // start mid-fall
      const color = rng() < 0.55 ? a : b;
      const opacity = 0.55 + rng() * 0.35;          // 0.55–0.9
      drops.push({ x, size, duration, delay, color, opacity });
    }
    return drops;
  }, [a, b, side, count]);
}

function seededRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t ^= t << 13;
    t ^= t >>> 17;
    t ^= t << 5;
    return ((t >>> 0) % 1000) / 1000;
  };
}

// Works for hsl(...), oklch(...), and var(--token)
function withAlpha(color: string, alpha: number) {
  const a = Math.max(0, Math.min(1, alpha));
  return `${color} / ${a}`;
}
