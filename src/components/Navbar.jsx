import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { lang, toggle } = useLang()
  const tx = t[lang].nav

  const links = [
    { to: '/',        label: tx.home },
    { to: '/menu',    label: tx.menu },
    { to: '/book',    label: tx.book },
    { to: '/events',  label: tx.events },
    { to: '/about',   label: tx.about },
    { to: '/contact', label: tx.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top amber rule */}
      <div className="h-1 bg-amber" />
      <div className={`transition-colors duration-300 ${scrolled || open ? 'bg-navy' : 'bg-navy/95 backdrop-blur-sm'}`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo variant="horizontal" className="h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-body text-xs font-bold uppercase tracking-widest transition-colors ${
                  location.pathname === to ? 'text-amber' : 'text-parchment/70 hover:text-parchment'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggle}
              className="font-slab text-xs px-3 py-1 border border-amber/50 rounded-sm text-parchment/70 hover:text-amber hover:border-amber transition-all tracking-widest"
              aria-label="Toggle language"
            >
              <span className={lang === 'en' ? 'text-amber' : 'text-parchment/40'}>EN</span>
              <span className="text-parchment/30 mx-1">|</span>
              <span className={lang === 'es' ? 'text-amber' : 'text-parchment/40'}>ES</span>
            </button>

            <Link
              to="/book"
              className="stamp-btn bg-scarlet text-parchment px-5 py-2 text-xs rounded-sm hover:bg-red-700 transition-colors"
            >
              {tx.bookTable}
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggle}
              className="font-slab text-xs px-2.5 py-1 border border-amber/50 text-parchment/70 rounded-sm tracking-wider"
              aria-label="Toggle language"
            >
              <span className={lang === 'en' ? 'text-amber' : 'text-parchment/40'}>EN</span>
              <span className="text-parchment/30 mx-0.5">|</span>
              <span className={lang === 'es' ? 'text-amber' : 'text-parchment/40'}>ES</span>
            </button>
            <button onClick={() => setOpen(o => !o)} className="text-parchment p-1" aria-label="Toggle menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Bottom amber rule */}
        <div className="h-px bg-amber/40" />

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden bg-navy border-t border-amber/20 px-4 py-5 flex flex-col gap-4">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-body text-sm font-bold uppercase tracking-widest py-1 ${
                  location.pathname === to ? 'text-amber' : 'text-parchment/70'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/book"
              className="stamp-btn mt-2 py-3 bg-scarlet text-parchment text-center text-sm rounded-sm"
            >
              {tx.bookTable}
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
