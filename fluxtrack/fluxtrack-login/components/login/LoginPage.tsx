'use client'

import { useEffect, useState, useRef } from 'react'
import { motion }  from 'framer-motion'
import LeftPanel   from './LeftPanel'
import RightPanel  from './RightPanel'

/* ── Particle type ─────────────────────────────── */
interface Particle {
  id:     number
  x:      number
  y:      number
  size:   number
  opacity: number
  speed:  number
  color:  string
}

const PARTICLE_COLORS = [
  'rgba(14,165,255,0.6)',
  'rgba(6,182,212,0.5)',
  'rgba(14,165,255,0.4)',
  'rgba(129,140,248,0.4)',
]

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id:      i,
    x:       Math.random() * 100,
    y:       Math.random() * 100,
    size:    Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    speed:   Math.random() * 0.3 + 0.1,
    color:   PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
  }))
}

/* ── Animated particle dot ─────────────────────── */
function FloatingParticle({ p }: { p: Particle }) {
  const duration = 8 + p.speed * 20
  const yDelta   = -(15 + p.speed * 25)

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left:    `${p.x}%`,
        top:     `${p.y}%`,
        width:   p.size,
        height:  p.size,
        background: p.color,
        boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
      }}
      animate={{
        y:       [0, yDelta, 0],
        opacity: [p.opacity, p.opacity * 1.5, p.opacity],
      }}
      transition={{
        duration,
        repeat:     Infinity,
        ease:       'easeInOut',
        delay:      Math.random() * 8,
      }}
    />
  )
}

/* ── Main page ─────────────────────────────────── */
export default function LoginPage() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMobile, setIsMobile]   = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  /* Detect viewport on mount & resize */
  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* Generate particles once */
  useEffect(() => {
    setParticles(generateParticles(isMobile ? 18 : 36))
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex"
      style={{ background: '#081120' }}
    >
      {/* ── GLOBAL AMBIENT GLOW ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 50%, rgba(14,165,255,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 80% 20%, rgba(6,182,212,0.05) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── ANIMATED PARTICLES ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map(p => (
          <FloatingParticle key={p.id} p={p} />
        ))}
      </div>

      {/* ── VERTICAL SEPARATOR LINE ── */}
      {!isMobile && (
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            right:  480,
            width:  1,
            background: 'linear-gradient(180deg, transparent 0%, rgba(14,165,255,0.15) 30%, rgba(14,165,255,0.15) 70%, transparent 100%)',
          }}
        />
      )}

      {/* ══════════════════════════════════════════
          LAYOUT: Left + Right panels
      ══════════════════════════════════════════ */}

      {/* MOBILE: Stack vertically */}
      {isMobile ? (
        <div className="w-full h-full overflow-y-auto flex flex-col">
          {/* Mobile header — compact logo + tagline */}
          <motion.div
            className="flex flex-col items-center gap-3 pt-10 pb-6 px-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
                <defs>
                  <linearGradient id="mLogoGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0EA5FF" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <linearGradient id="mLogoBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0c1e42" />
                    <stop offset="100%" stopColor="#060f28" />
                  </linearGradient>
                </defs>
                <rect x="1" y="1" width="62" height="62" rx="16" fill="none" stroke="url(#mLogoGrad)" strokeWidth="1.5" opacity="0.5" />
                <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#mLogoBg)" />
                <rect x="13" y="14" width="7" height="36" rx="3" fill="url(#mLogoGrad)" />
                <rect x="13" y="14" width="25" height="7" rx="3" fill="url(#mLogoGrad)" />
                <rect x="13" y="28.5" width="19" height="6" rx="3" fill="url(#mLogoGrad)" />
                <line x1="38" y1="40" x2="52" y2="24" stroke="white" strokeWidth="2.8" strokeLinecap="round" opacity="0.9" />
                <polyline points="43,22 52,22 52,31" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
              </svg>
              <div>
                <div
                  className="text-xl font-extrabold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #0EA5FF, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  FluxTrack
                </div>
                <div className="text-[10px] text-white/40 font-medium">
                  Gestão de Cobranças
                </div>
              </div>
            </div>

            <p className="text-xs text-white/40 max-w-xs">
              Controle inteligente de cobranças e inadimplência
            </p>
          </motion.div>

          {/* Mobile right panel (form) */}
          <div className="flex-1 flex items-start justify-center px-4 pb-10">
            <div className="w-full max-w-sm">
              <RightPanel />
            </div>
          </div>
        </div>
      ) : (
        /* DESKTOP: Split layout */
        <>
          {/* LEFT — takes remaining width */}
          <div className="flex-1 min-w-0 h-full overflow-hidden">
            <LeftPanel />
          </div>

          {/* RIGHT — fixed width */}
          <div className="h-full overflow-y-auto flex-shrink-0" style={{ width: 480 }}>
            <RightPanel />
          </div>
        </>
      )}

      {/* ── SCAN LINE EFFECT ── */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(14,165,255,0.15) 50%, transparent 100%)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
