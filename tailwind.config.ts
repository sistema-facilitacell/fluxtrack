import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy-deep':  '#081120',
        'navy-mid':   '#0c1a35',
        'navy-dark':  '#060f28',
        'navy-card':  '#0a1628',
        'neon-blue':  '#0EA5FF',
        'cyan-bright':'#06B6D4',
        'glass-border': 'rgba(14,165,255,0.18)',
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-neon':   'linear-gradient(135deg, #0EA5FF 0%, #06B6D4 100%)',
        'gradient-dark':   'linear-gradient(180deg, #081120 0%, #060f28 100%)',
        'gradient-card':   'linear-gradient(135deg, rgba(14,165,255,0.08) 0%, rgba(6,182,212,0.04) 100%)',
        'gradient-shimmer':'linear-gradient(90deg, transparent 0%, rgba(14,165,255,0.3) 50%, transparent 100%)',
      },
      animation: {
        'float':       'float 4s ease-in-out infinite',
        'float-slow':  'float 6s ease-in-out infinite',
        'pulse-neon':  'pulseNeon 2.5s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'scan-line':   'scanLine 3s linear infinite',
        'spin-slow':   'spin 8s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(14,165,255,0.3), 0 0 30px rgba(14,165,255,0.1)' },
          '50%':      { boxShadow: '0 0 20px rgba(14,165,255,0.6), 0 0 60px rgba(14,165,255,0.2)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanLine: {
          '0%':   { top: '0%' },
          '100%': { top: '100%' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'neon':       '0 0 20px rgba(14,165,255,0.4), 0 0 60px rgba(14,165,255,0.15)',
        'neon-sm':    '0 0 10px rgba(14,165,255,0.3)',
        'neon-cyan':  '0 0 20px rgba(6,182,212,0.4)',
        'card-dark':  '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
        'glass':      '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'btn-neon':   '0 4px 24px rgba(14,165,255,0.5), 0 0 40px rgba(14,165,255,0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
export default config
