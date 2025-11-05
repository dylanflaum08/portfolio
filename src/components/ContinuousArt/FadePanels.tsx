'use client';

type Props = { accent: string; accent2?: string };

/** Subtle side fades using theme accents passed from ContinuousArt. */
export default function FadePanels({ accent, accent2 }: Props) {
  const a2 = accent2 ?? accent;
  const width = 'clamp(160px, 12vw, 260px)';

  const left: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width,
    pointerEvents: 'none',
    zIndex: 60, // bump if something covers it
    background: `linear-gradient(
      to right,
      ${withAlpha(accent, 0.35)} 0%,
      ${withAlpha(accent, 0.20)} 55%,
      ${withAlpha(accent, 0.08)} 80%,
      transparent 100%
    )`,
  };

  const right: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    width,
    pointerEvents: 'none',
    zIndex: 60,
    background: `linear-gradient(
      to left,
      ${withAlpha(a2, 0.22)} 0%,
      ${withAlpha(a2, 0.10)} 55%,
      ${withAlpha(a2, 0.04)} 75%,
      transparent 100%
    )`,
  };

  return (
    <>
      <div aria-hidden style={left} />
      <div aria-hidden style={right} />
    </>
  );
}

// Works with hsl(...), oklch(...), and var(--token)
function withAlpha(color: string, alpha: number) {
  const a = Math.max(0, Math.min(1, alpha));
  return `${color} / ${a}`;
}
