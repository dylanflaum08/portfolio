'use client';

import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark';

function readVar(name: string, fallback: string) {
  try {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return v || fallback;
  } catch {
    return fallback;
  }
}

function readMode(): Mode {
  const m = document.documentElement.dataset.mode;
  return m === 'light' ? 'light' : 'dark';
}

// ---- Your visual variants (import or keep as-is) ----
import Borders from './ContinuousArt/Borders';
import Wave from './ContinuousArt/Wave';
import FadePanels from './ContinuousArt/FadePanels';
import Grid from './ContinuousArt/Grid';
import Trails from './ContinuousArt/Trails';
// -----------------------------------------------------

export default function ContinuousArt({ active = true }: { active?: boolean }) {
  const [accent, setAccent] = useState('#5de4c7');
  const [accent2, setAccent2] = useState('#7a9cff');
  const [mode, setMode] = useState<Mode>('dark');
  const [variant, setVariant] = useState<number | null>(null); // null means “not visible”

  // Emit the current variant (or null) so page.tsx can describe it
  const emitVariant = (v: number | null) => {
    setVariant(v);
    window.dispatchEvent(
      new CustomEvent<number | null>('design:variant', { detail: v })
    );
  };

  useEffect(() => {
    const sync = () => {
      setAccent(readVar('--color-accent', '#5de4c7'));
      setAccent2(readVar('--color-accent-2', '#7a9cff'));
      const m = readMode();
      setMode(m);

      // show only in LIGHT mode AND when `active` is true
      if (active && m === 'light') {
        emitVariant(Math.floor(Math.random() * 5)); // 0..4
      } else {
        emitVariant(null); // tell the page there’s no side art
      }
    };

    sync();
    const onTheme = () => sync();
    window.addEventListener('theme:applied', onTheme as EventListener);
    return () => window.removeEventListener('theme:applied', onTheme as EventListener);
  }, [active]);

  // Don’t render any JSX unless it should be visible
  if (!active || mode !== 'light' || variant == null) return null;

  switch (variant) {
    case 0:
      return <Borders accent={accent} accent2={accent2} />;
    case 1:
      return <Wave accent={accent} accent2={accent2} />;
    case 2:
      return <FadePanels accent={accent} accent2={accent2} />;
    case 3:
      return <Grid />;
    case 4:
    default:
      return <Trails accent={accent} accent2={accent2} />;
  }
}
