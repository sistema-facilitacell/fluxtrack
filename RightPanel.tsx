'use client'

import { motion } from 'framer-motion'
import { Lock, Sparkles } from 'lucide-react'
import FluxTrackLogo from './FluxTrackLogo'
import LoginForm     from './LoginForm'

export default function RightPanel() {
  return (
    <div
      className="relative flex items-center justify-center h-full px-6 py-10 overflow-hidden"
      style={{
        width: '100%',
        maxWidth: 480,
        minWidth: 340,
        flexShrink: 0,
        background: 'linear-gradient(180deg, #060f28 0%, #081120 100%)',
        borderLeft: '1px solid rgba(14,165,255,0.12)',
      }}
    >
      {/* ── BACKGROUND GLOW ── */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(14,165,255,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      />

      {/* ── GLASS CARD ── */}
      <motion.div
        className="relative w-full z-10"
        initial={{ opacity: 0, x: 40, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Card container */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background:     'rgba(10, 20, 45, 0.7)',
            border:         '1px solid rgba(14,165,255,0.18)',
            boxShadow:      '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)',
            backdropFilter: 'blur(28px)',
          }}
        >
          {/* ── TOP ACCENT BAR ── */}
          <div
            className="h-0.5 w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #0EA5FF 40%, #06B6D4 60%, transparent 100%)',
            }}
          />

          {/* ── CARD HEADER ── */}
          <div className="px-8 pt-8 pb-6 text-center flex flex-col items-center gap-4">
            {/* Logo — visible only on mobile / when left panel hidden */}
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FluxTrackLogo size={48} />
            </motion.div>

            {/* Sparkle badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: 'rgba(14,165,255,0.12)',
                border:     '1px solid rgba(14,165,255,0.25)',
              }}
            >
              <Sparkles size={11} style={{ color: '#0EA5FF' }} />
              <span className="text-[10px] font-semibold tracking-wider uppercase"
                style={{ color: '#0EA5FF' }}>
                Sistema Seguro
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Bem-vindo ao{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0EA5FF, #06B6D4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  FluxTrack
                </span>
              </h2>
              <p className="text-sm text-white/40 font-medium">
                Faça login para continuar
              </p>
            </motion.div>
          </div>

          {/* ── DIVIDER ── */}
          <div
            className="mx-8"
            style={{ height: 1, background: 'rgba(14,165,255,0.08)' }}
          />

          {/* ── FORM AREA ── */}
          <motion.div
            className="px-8 py-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <LoginForm />
          </motion.div>

          {/* ── FOOTER ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="px-8 pb-7"
          >
            {/* Secure access badge */}
            <div
              className="flex items-center justify-center gap-2 rounded-xl py-2.5"
              style={{
                background: 'rgba(6, 182, 212, 0.05)',
                border:     '1px solid rgba(6,182,212,0.12)',
              }}
            >
              <Lock size={12} style={{ color: 'rgba(6,182,212,0.6)' }} />
              <span className="text-[11px] font-semibold tracking-wide"
                style={{ color: 'rgba(6,182,212,0.5)' }}>
                🔒 Acesso seguro e protegido
              </span>
            </div>

            {/* Privacy note */}
            <p className="text-center text-[10px] text-white/20 mt-3 font-mono leading-relaxed">
              Ao entrar, você concorda com nossa{' '}
              <button
                type="button"
                className="underline underline-offset-2 hover:text-white/40 transition-colors"
              >
                Política de Privacidade
              </button>{' '}
              e{' '}
              <button
                type="button"
                className="underline underline-offset-2 hover:text-white/40 transition-colors"
              >
                Termos de Uso
              </button>
            </p>
          </motion.div>
        </div>

        {/* ── FLOATING GLOW UNDER CARD ── */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-8 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(14,165,255,0.2), transparent)',
            filter:     'blur(12px)',
          }}
        />
      </motion.div>
    </div>
  )
}
