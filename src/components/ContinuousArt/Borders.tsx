// Edged gradient borders on the far left/right with soft inner glow.
export default function Borders({
  accent,
  accent2,
}: { accent: string; accent2?: string }) {
  const a2 = accent2 ?? accent;

  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Left strip */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: 'clamp(12px, 2vw, 48px)',
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `linear-gradient(${accent}, ${accent})`,
          boxShadow: `inset -8px 0 24px 0 ${accent}33`,
          opacity: 0.55,
        }}
      />
      {/* Right strip */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          width: 'clamp(12px, 2vw, 48px)',
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `linear-gradient(${a2}, ${a2})`,
          boxShadow: `inset 8px 0 24px 0 ${a2}33`,
          opacity: 0.55,
        }}
      />
    </>
  );
}
