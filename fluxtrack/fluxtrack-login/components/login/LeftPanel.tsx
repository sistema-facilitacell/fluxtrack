'use client'

import { motion } from 'framer-motion'
import FluxTrackLogo       from './FluxTrackLogo'
import DashboardIllustration from './DashboardIllustration'
import FeatureCards        from './FeatureCards'

/* ── Animation presets ─────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  animate:   { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

const fadeIn = (delay = 0) => ({
  initial:   { opacity: 0 },
  animate:   { opacity: 1 },
  transition: { delay, duration: 0.6 },
})

export default function LeftPanel() {
  return (
    <div
      className="relative flex flex-col justify-between h-full px-10 py-10 overflow-hidden"
      style={{ minWidth: 0 }}
    >
      {/* ── BACKGROUND LAYERS ── */}

      {/* Dot grid */}
      <div className="absolute inset-0 dot-bg pointer-events-none opacity-40" />

      {/* Large radial glow - top left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,255,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Large radial glow - bottom right */}
      <div
        className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #0EA5FF 30%, #06B6D4 70%, transparent 100%)',
          top: '35%',
        }}
      />

      {/* ── LOGO + HEADLINE ── */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Logo */}
        <motion.div {...fadeUp(0.1)}>
          <FluxTrackLogo size={52} showText />
        </motion.div>

        {/* Headline */}
        <motion.div {...fadeUp(0.2)} className="flex flex-col gap-2">
          <h1
            className="text-3xl xl:text-4xl font-extrabold leading-tight tracking-tight text-white"
            style={{ maxWidth: 420 }}
          >
            Controle inteligente de{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0EA5FF 0%, #06B6D4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              cobranças e inadimplência
            </span>
          </h1>

          <p className="text-sm text-white/40 font-medium leading-relaxed" style={{ maxWidth: 380 }}>
            Acompanhe, gerencie e recupere valores em atraso com
            painéis em tempo real e relatórios automatizados.
          </p>
        </motion.div>

        {/* Stat pills */}
        <motion.div {...fadeIn(0.35)} className="flex items-center gap-3 flex-wrap">
          {[
            { label: '+R$ 12M recuperados',  color: '#0EA5FF' },
            { label: '3.200+ empresas',       color: '#06B6D4' },
            { label: '99.9% uptime',          color: '#818cf8' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-full px-3 py-1"
              style={{
                background: `${stat.color}15`,
                border:     `1px solid ${stat.color}30`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: stat.color }} />
              <span className="text-[11px] font-semibold" style={{ color: stat.color }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── DASHBOARD ILLUSTRATION ── */}
      <motion.div
        className="relative z-10 flex-1 flex items-center justify-center py-8"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <DashboardIllustration />
      </motion.div>

      {/* ── FEATURE CARDS ── */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <FeatureCards />
      </motion.div>

      {/* ── BOTTOM COPYRIGHT ── */}
      <motion.p
        {...fadeIn(0.8)}
        className="relative z-10 text-[10px] text-white/20 font-mono mt-4"
      >
        © 2026 FluxTrack · Todos os direitos reservados
      </motion.p>
    </div>
  )
}
