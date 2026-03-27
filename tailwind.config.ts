import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        accent: 'hsl(var(--accent))',
        positive: 'hsl(var(--positive))',
        warning: 'hsl(var(--warning))',
        danger: 'hsl(var(--danger))'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #e20055 0%, #9e11cd 100%)',
        'panel-gradient': 'radial-gradient(circle at top, rgba(162, 0, 182, 0.18), transparent 45%)'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.04), 0 16px 60px rgba(9, 10, 16, 0.48)',
        soft: '0 10px 40px rgba(0,0,0,0.24)'
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        display: ['var(--font-display)']
      }
    }
  },
  plugins: []
}

export default config
