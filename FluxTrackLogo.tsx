'use client'

interface FluxTrackLogoProps {
  size?: number
  showText?: boolean
  textSize?: 'sm' | 'md' | 'lg' | 'xl'
}

const textSizeMap = {
  sm: { name: 'text-xl',  sub: 'text-xs' },
  md: { name: 'text-2xl', sub: 'text-sm' },
  lg: { name: 'text-3xl', sub: 'text-base' },
  xl: { name: 'text-4xl', sub: 'text-lg' },
}

export default function FluxTrackLogo({
  size = 56,
  showText = false,
  textSize = 'md',
}: FluxTrackLogoProps) {
  const ts = textSizeMap[textSize]

  return (
    <div className="flex items-center gap-4">
      {/* ── SVG ICON ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FluxTrack Logo"
      >
        <defs>
          {/* Main gradient — neon blue to cyan */}
          <linearGradient id="logoGradMain" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#0EA5FF" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Inner highlight gradient */}
          <linearGradient id="logoHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Background gradient */}
          <linearGradient id="logoBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#0c1e42" />
            <stop offset="100%" stopColor="#060f28" />
          </linearGradient>
        </defs>

        {/* Outer glow ring */}
        <rect
          x="1" y="1" width="62" height="62" rx="16"
          fill="none"
          stroke="url(#logoGradMain)"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Background shape */}
        <rect
          x="2" y="2" width="60" height="60" rx="14"
          fill="url(#logoBg)"
        />

        {/* Inner highlight */}
        <rect
          x="2" y="2" width="60" height="30" rx="14"
          fill="url(#logoHighlight)"
        />

        {/* ── F LETTER ── bold geometric form */}
        {/* Vertical bar of F */}
        <rect x="13" y="14" width="7" height="36" rx="3" fill="url(#logoGradMain)" />

        {/* Top horizontal bar */}
        <rect x="13" y="14" width="25" height="7" rx="3" fill="url(#logoGradMain)" />

        {/* Middle horizontal bar */}
        <rect x="13" y="28.5" width="19" height="6" rx="3" fill="url(#logoGradMain)" />

        {/* ── GROWTH ARROW (top-right) ── */}
        {/* Arrow shaft — diagonal from bottom-left to top-right */}
        <line
          x1="38" y1="40"
          x2="52" y2="24"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
          filter="url(#logoGlow)"
          opacity="0.95"
        />

        {/* Arrow head */}
        <polyline
          points="43,22 52,22 52,31"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#logoGlow)"
          opacity="0.95"
        />

        {/* Accent dots at arrow start */}
        <circle cx="38" cy="40" r="2.5" fill="#0EA5FF" opacity="0.8" />

        {/* Subtle grid lines in background */}
        <line x1="2"  y1="32" x2="62" y2="32" stroke="rgba(14,165,255,0.06)" strokeWidth="1" />
        <line x1="32" y1="2"  x2="32" y2="62" stroke="rgba(14,165,255,0.06)" strokeWidth="1" />
      </svg>

      {/* ── TEXT BLOCK ── */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${ts.name} font-extrabold tracking-tight leading-none`}
            style={{
              background: 'linear-gradient(135deg, #0EA5FF 0%, #06B6D4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            FluxTrack
          </span>
          <span className={`${ts.sub} text-white/40 font-medium mt-0.5 tracking-wide`}>
            Gestão de Cobranças
          </span>
        </div>
      )}
    </div>
  )
}
