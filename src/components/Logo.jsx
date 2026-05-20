const MARK = 'M50,2 L58,42 L98,50 L58,58 L50,98 L42,58 L2,50 L42,42 Z'

export default function Logo({ variant = 'horizontal', className = '' }) {
  if (variant === 'mark') {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-label="La Fonda" role="img">
        <path d={MARK} fill="currentColor" />
      </svg>
    )
  }

  if (variant === 'horizontal' || variant === 'horizontal-light') {
    const dark = variant === 'horizontal'
    const textFill = dark ? '#FEF3D0' : '#1B3564'
    return (
      <svg viewBox="0 0 240 52" className={className} aria-label="La Fonda — Colombian Restaurant" role="img">
        {/* Mark: 100x100 → 48px at scale 0.48, centred in 52px height */}
        <g transform="translate(2,2) scale(0.48)">
          <path d={MARK} fill="#C4880B" />
        </g>
        {/* Wordmark */}
        <text y="33" fill={textFill}>
          <tspan x="58" fontFamily="'Dancing Script', cursive" fontSize="24" fontWeight="700" fontStyle="italic">La</tspan>
          <tspan dx="5" fontFamily="'Alfa Slab One', serif" fontSize="23">FONDA</tspan>
        </text>
        {/* Tagline */}
        <text x="59" y="45" fontFamily="Lato, sans-serif" fontSize="7.5" fontWeight="300" letterSpacing="2.5" fill={textFill} fillOpacity="0.55">COLOMBIAN RESTAURANT</text>
      </svg>
    )
  }

  if (variant === 'stacked' || variant === 'stacked-light') {
    const dark = variant === 'stacked'
    const textFill = dark ? '#FEF3D0' : '#1B3564'
    return (
      <svg viewBox="0 0 200 126" className={className} aria-label="La Fonda — Colombian Restaurant" role="img">
        {/* Mark centred: translate(75,4) centres a 50px mark at x=100 */}
        <g transform="translate(75,4) scale(0.5)">
          <path d={MARK} fill="#C4880B" />
        </g>
        {/* Flanking ornament lines */}
        <line x1="68" y1="62" x2="90" y2="62" stroke="#C4880B" strokeWidth="0.75" opacity="0.4" />
        <line x1="110" y1="62" x2="132" y2="62" stroke="#C4880B" strokeWidth="0.75" opacity="0.4" />
        {/* Wordmark */}
        <text x="100" y="84" textAnchor="middle" fill={textFill}>
          <tspan fontFamily="'Dancing Script', cursive" fontSize="26" fontWeight="700" fontStyle="italic">La </tspan>
          <tspan fontFamily="'Alfa Slab One', serif" fontSize="25">FONDA</tspan>
        </text>
        {/* Tagline */}
        <text x="100" y="100" textAnchor="middle" fontFamily="Lato, sans-serif" fontSize="7.5" fontWeight="300" letterSpacing="3" fill={textFill} fillOpacity="0.55">COLOMBIAN RESTAURANT</text>
        {/* Bottom ornament */}
        <text x="100" y="118" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fill="#C4880B" opacity="0.65">✦</text>
      </svg>
    )
  }

  return null
}
