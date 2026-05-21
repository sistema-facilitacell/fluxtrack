'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Shield,
  AlertCircle,
} from 'lucide-react'

/* ─── Data for charts ───────────────────────── */
const BAR_DATA = [
  { label: 'Jan', value: 62, color: '#0EA5FF' },
  { label: 'Fev', value: 78, color: '#0EA5FF' },
  { label: 'Mar', value: 55, color: '#0EA5FF' },
  { label: 'Abr', value: 90, color: '#06B6D4' },
  { label: 'Mai', value: 70, color: '#0EA5FF' },
  { label: 'Jun', value: 85, color: '#06B6D4' },
]

const LINE_POINTS = [
  { x: 0,   y: 72 },
  { x: 36,  y: 54 },
  { x: 72,  y: 66 },
  { x: 108, y: 38 },
  { x: 144, y: 50 },
  { x: 180, y: 26 },
  { x: 216, y: 40 },
]

/* ─── Build smooth SVG path from points ──────── */
function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cp1x = prev.x + (curr.x - prev.x) * 0.4
    const cp1y = prev.y
    const cp2x = curr.x - (curr.x - prev.x) * 0.4
    const cp2y = curr.y
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`
  }
  return d
}

/* ─── Build area fill path ────────────────────── */
function buildAreaPath(points: { x: number; y: number }[], chartHeight: number): string {
  const linePath = buildSmoothPath(points)
  const lastPoint = points[points.length - 1]
  const firstPoint = points[0]
  return `${linePath} L ${lastPoint.x},${chartHeight} L ${firstPoint.x},${chartHeight} Z`
}

const linePath = buildSmoothPath(LINE_POINTS)
const areaPath = buildAreaPath(LINE_POINTS, 90)

/* ─── Metric cards data ───────────────────────── */
const METRICS = [
  {
    icon: DollarSign,
    label: 'Recuperado',
    value: 'R$ 284K',
    change: '+18.2%',
    up: true,
    color: '#0EA5FF',
    delay: 0.2,
  },
  {
    icon: Users,
    label: 'Clientes Ativos',
    value: '1.847',
    change: '+6.4%',
    up: true,
    color: '#06B6D4',
    delay: 0.35,
  },
  {
    icon: AlertCircle,
    label: 'Inadimplentes',
    value: '312',
    change: '-4.1%',
    up: false,
    color: '#f59e0b',
    delay: 0.5,
  },
]

/* ─── Floating info cards ─────────────────────── */
const FLOATING_CARDS = [
  {
    icon: Shield,
    text: 'Dados protegidos',
    sub: 'SSL 256-bit',
    x: '-right-2',
    y: 'top-6',
    delay: 0.6,
  },
  {
    icon: TrendingUp,
    text: 'Taxa de recuperação',
    sub: '76.4%',
    x: '-left-4',
    y: 'bottom-16',
    delay: 0.8,
  },
]

/* ─── Animation variants ──────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } },
}

export default function DashboardIllustration() {
  const BAR_HEIGHT = 100

  return (
    <motion.div
      className="relative w-full max-w-[500px] mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* ── MAIN DASHBOARD CARD ── */}
      <motion.div
        variants={fadeUp}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10, 22, 40, 0.85)',
          border: '1px solid rgba(14,165,255,0.18)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(14,165,255,0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid rgba(14,165,255,0.1)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span
            className="text-[10px] font-mono tracking-widest uppercase"
            style={{ color: 'rgba(14,165,255,0.6)' }}
          >
            FluxTrack · Dashboard
          </span>
          <div
            className="flex items-center gap-1.5 text-[10px] font-mono"
            style={{ color: 'rgba(14,165,255,0.5)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Metric row */}
        <div className="grid grid-cols-3 gap-px" style={{ background: 'rgba(14,165,255,0.06)' }}>
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col gap-1 p-3"
              style={{ background: 'rgba(8, 17, 32, 0.9)' }}
            >
              <div className="flex items-center gap-1.5">
                <m.icon size={11} style={{ color: m.color }} />
                <span className="text-[9px] text-white/40 font-medium uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
              <div
                className="text-base font-extrabold leading-none"
                style={{ color: m.color }}
              >
                {m.value}
              </div>
              <div
                className={`text-[9px] font-semibold ${m.up ? 'text-emerald-400' : 'text-amber-400'}`}
              >
                {m.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts area */}
        <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(14,165,255,0.06)' }}>

          {/* ── BAR CHART ── */}
          <div className="p-4" style={{ background: 'rgba(8, 17, 32, 0.9)' }}>
            <p className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mb-3">
              Cobranças / Mês
            </p>
            <svg width="100%" viewBox={`0 0 ${BAR_DATA.length * 34} ${BAR_HEIGHT + 20}`}>
              <defs>
                <linearGradient id="barGradBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#0EA5FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0EA5FF" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="barGradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#06B6D4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[25, 50, 75, 100].map((pct) => (
                <line
                  key={pct}
                  x1="0" y1={BAR_HEIGHT - (pct / 100) * BAR_HEIGHT}
                  x2={BAR_DATA.length * 34} y2={BAR_HEIGHT - (pct / 100) * BAR_HEIGHT}
                  stroke="rgba(14,165,255,0.08)"
                  strokeWidth="1"
                />
              ))}

              {BAR_DATA.map((bar, i) => {
                const h = (bar.value / 100) * BAR_HEIGHT
                const x = i * 34 + 4
                const isEven = i % 2 === 0
                return (
                  <g key={i}>
                    <motion.rect
                      x={x}
                      y={BAR_HEIGHT - h}
                      width={22}
                      height={h}
                      rx={4}
                      fill={isEven ? 'url(#barGradBlue)' : 'url(#barGradCyan)'}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        delay: 0.4 + i * 0.08,
                        duration: 0.6,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      style={{ transformOrigin: `${x + 11}px ${BAR_HEIGHT}px` }}
                    />
                    <text
                      x={x + 11}
                      y={BAR_HEIGHT + 14}
                      textAnchor="middle"
                      fontSize="7"
                      fill="rgba(255,255,255,0.35)"
                      fontFamily="var(--font-jakarta)"
                    >
                      {bar.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* ── LINE CHART ── */}
          <div className="p-4" style={{ background: 'rgba(8, 17, 32, 0.9)' }}>
            <p className="text-[9px] text-white/40 uppercase tracking-widest font-semibold mb-3">
              Recuperação (%)
            </p>
            <svg width="100%" viewBox="0 0 216 110">
              <defs>
                <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#0EA5FF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0EA5FF" stopOpacity="0" />
                </linearGradient>
                <filter id="lineGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid */}
              {[30, 60, 90].map((y) => (
                <line
                  key={y} x1="0" y1={y} x2="216" y2={y}
                  stroke="rgba(14,165,255,0.07)" strokeWidth="1"
                />
              ))}

              {/* Area fill */}
              <motion.path
                d={areaPath}
                fill="url(#lineAreaGrad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />

              {/* Line */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="#0EA5FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#lineGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.2, ease: 'easeInOut' }}
              />

              {/* Data points */}
              {LINE_POINTS.map((pt, i) => (
                <motion.circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r={3}
                  fill="#0EA5FF"
                  stroke="#081120"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                />
              ))}

              {/* Current value label */}
              <motion.g
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.4 }}
              >
                <rect x="180" y="10" width="32" height="16" rx="4"
                  fill="rgba(14,165,255,0.2)"
                  stroke="rgba(14,165,255,0.4)"
                  strokeWidth="1"
                />
                <text x="196" y="21" textAnchor="middle" fontSize="8"
                  fill="#0EA5FF" fontWeight="700" fontFamily="var(--font-jakarta)"
                >
                  76.4%
                </text>
              </motion.g>
            </svg>
          </div>
        </div>

        {/* Bottom status bar */}
        <motion.div
          variants={fadeIn}
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderTop: '1px solid rgba(14,165,255,0.08)' }}
        >
          <div className="flex items-center gap-2">
            <FileText size={10} style={{ color: 'rgba(14,165,255,0.5)' }} />
            <span className="text-[9px] font-mono text-white/30">
              Último relatório: 21/05/2026 · 08:34
            </span>
          </div>
          <div
            className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded"
            style={{
              color: '#0EA5FF',
              background: 'rgba(14,165,255,0.1)',
              border: '1px solid rgba(14,165,255,0.2)',
            }}
          >
            PRO
          </div>
        </motion.div>
      </motion.div>

      {/* ── FLOATING CARD — Shield ── */}
      <motion.div
        className="absolute -right-3 top-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="flex items-center gap-2 rounded-xl px-3 py-2"
          style={{
            background: 'rgba(10, 22, 40, 0.9)',
            border: '1px solid rgba(14,165,255,0.25)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(14,165,255,0.15)' }}
          >
            <Shield size={14} style={{ color: '#0EA5FF' }} />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-white/80 leading-tight">Dados protegidos</div>
            <div className="text-[9px] text-white/40 font-mono">SSL 256-bit</div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── FLOATING CARD — TrendingUp ── */}
      <motion.div
        className="absolute -left-3 bottom-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
          className="flex items-center gap-2 rounded-xl px-3 py-2"
          style={{
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6,182,212,0.3)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(6,182,212,0.2)' }}
          >
            <TrendingUp size={14} style={{ color: '#06B6D4' }} />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-white/80 leading-tight">Recuperação</div>
            <div className="text-[9px] font-extrabold" style={{ color: '#06B6D4' }}>76.4% este mês</div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
