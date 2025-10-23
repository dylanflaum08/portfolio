// tailwind.config.ts
// Purpose: Tailwind setup + content globs for the App Router.
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0a0b10',
        ink: '#eaeaf0',
        accent: '#5de4c7',
        glow: '#7a9cff',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(122,156,255,0.35)',
      },
    },
  },
  plugins: [],
}

export default config
