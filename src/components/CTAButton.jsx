import { Link } from 'react-router-dom'

export default function CTAButton({ to, href, children, variant = 'primary', className = '', onClick }) {
  const base = 'inline-flex items-center justify-center gap-2 px-7 py-3 font-slab uppercase tracking-wider text-sm transition-all duration-200 active:scale-95 rounded-sm stamp-btn'
  const variants = {
    primary:   'bg-scarlet text-parchment border-scarlet hover:bg-red-800',
    secondary: 'bg-transparent text-parchment border-parchment/50 hover:border-parchment hover:text-parchment',
    outline:   'bg-transparent text-navy border-navy hover:bg-navy hover:text-parchment',
    navy:      'bg-navy text-parchment border-navy hover:bg-navy/80',
    amber:     'bg-amber text-brown border-amber hover:bg-yellow-600',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) return <a href={href} className={cls} onClick={onClick}>{children}</a>
  if (to)   return <Link to={to}   className={cls} onClick={onClick}>{children}</Link>
  return          <button         className={cls} onClick={onClick}>{children}</button>
}
