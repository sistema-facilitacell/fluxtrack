'use client'

import { motion } from 'framer-motion'
import { Bell, CreditCard, Handshake, BarChart3 } from 'lucide-react'

const FEATURES = [
  {
    icon:  Bell,
    label: 'Acompanhe pendências',
    color: '#0EA5FF',
    bg:    'rgba(14,165,255,0.1)',
    border:'rgba(14,165,255,0.2)',
  },
  {
    icon:  CreditCard,
    label: 'Gerencie cobranças',
    color: '#06B6D4',
    bg:    'rgba(6,182,212,0.1)',
    border:'rgba(6,182,212,0.2)',
  },
  {
    icon:  Handshake,
    label: 'Controle acordos',
    color: '#818cf8',
    bg:    'rgba(129,140,248,0.1)',
    border:'rgba(129,140,248,0.2)',
  },
  {
    icon:  BarChart3,
    label: 'Relatórios completos',
    color: '#34d399',
    bg:    'rgba(52,211,153,0.1)',
    border:'rgba(52,211,153,0.2)',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function FeatureCards() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-2 w-full"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {FEATURES.map((feat, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 cursor-default"
          style={{
            background: feat.bg,
            border: `1px solid ${feat.border}`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Icon badge */}
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${feat.color}22` }}
          >
            <feat.icon size={13} style={{ color: feat.color }} />
          </div>

          {/* Label */}
          <span className="text-[11px] font-semibold text-white/70 leading-tight">
            {feat.label}
          </span>

          {/* Check mark */}
          <div className="ml-auto flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" fill={`${feat.color}22`} stroke={feat.color} strokeWidth="1.2" />
              <polyline
                points="4,7 6,9 10,5"
                stroke={feat.color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
