// Soft wavy SVG strokes on both sides, animating slowly.
export default function Wave({
  accent,
  accent2,
}: { accent: string; accent2?: string }) {
  const a2 = accent2 ?? accent;

  return (
    <>
      <style>{`
        @keyframes waveSlideLeft {
          from { transform: translateY(0); }
          to   { transform: translateY(-40%); }
        }
        @keyframes waveSlideRight {
          from { transform: translateY(-20%); }
          to   { transform: translateY(20%); }
        }
      `}</style>

      {/* Left waves */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 200 1000"
        style={{
          position: 'fixed',
          top: '-20vh',
          bottom: '-20vh',
          left: 0,
          width: '180px',
          height: '140vh',
          opacity: 0.35,
          filter: 'blur(0.2px)',
          animation: 'waveSlideLeft 22s linear infinite alternate',
        }}
      >
        <defs>
          <linearGradient id="wL" x1="0" x2="1">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={`${accent}00`} />
          </linearGradient>
        </defs>
        {[0, 120, 240, 360, 480, 600, 720, 840].map((y) => (
          <path
            key={y}
            d={`M 10 ${y} C 70 ${y + 40}, 120 ${y - 40}, 180 ${y} `}
            fill="none"
            stroke="url(#wL)"
            strokeWidth={6}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Right waves */}
      <svg
        aria-hidden
        viewBox="0 0 200 1000"
        style={{
          position: 'fixed',
          top: '-20vh',
          bottom: '-20vh',
          right: 0,
          width: '180px',
          height: '140vh',
          opacity: 0.35,
          filter: 'blur(0.2px)',
          animation: 'waveSlideRight 26s linear infinite alternate',
        }}
      >
        <defs>
          <linearGradient id="wR" x1="1" x2="0">
            <stop offset="0%" stopColor={a2} />
            <stop offset="100%" stopColor={`${a2}00`} />
          </linearGradient>
        </defs>
        {[60, 180, 300, 420, 540, 660, 780, 900].map((y) => (
          <path
            key={y}
            d={`M 190 ${y} C 130 ${y - 40}, 80 ${y + 40}, 20 ${y} `}
            fill="none"
            stroke="url(#wR)"
            strokeWidth={6}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </>
  );
}
