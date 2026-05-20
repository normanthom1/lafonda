import { Link } from 'react-router-dom'
import CTAButton from './CTAButton'
import { location } from '../data/location'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'

export default function Footer() {
  const { lang } = useLang()
  const tx = t[lang].footer
  const nav = t[lang].nav

  const navLinks = [
    ['/', nav.home],
    ['/menu', nav.menu],
    ['/book', nav.bookTable],
    ['/events', nav.events],
    ['/about', nav.about],
    ['/contact', nav.contact],
  ]

  return (
    <footer className="bg-navy navy-banner text-parchment">
      {/* Top ornamental band */}
      <div className="border-b border-amber/20 py-3 px-4 text-center">
        <span className="font-body text-amber/60 text-xs tracking-[0.4em] uppercase">
          ✦ &nbsp; Auténticos Sabores de Colombia &nbsp; ✦
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-slab text-amber text-2xl uppercase tracking-wide mb-1">La Fonda</h3>
          <p className="font-body text-parchment/40 text-[10px] uppercase tracking-[0.3em] mb-4">{tx.tagline}</p>
          <p className="font-body text-parchment/60 text-sm leading-relaxed">{tx.sub}</p>
        </div>

        <div>
          <div className="ornament text-amber/40 text-xs mb-4">
            <span className="font-slab text-[10px] tracking-[0.3em] text-amber/60 uppercase">{tx.navigate}</span>
          </div>
          <ul className="flex flex-col gap-2">
            {navLinks.map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="font-body text-parchment/50 hover:text-amber text-sm uppercase tracking-wider transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="ornament text-amber/40 text-xs mb-4">
            <span className="font-slab text-[10px] tracking-[0.3em] text-amber/60 uppercase">{tx.visit}</span>
          </div>
          <p className="font-body text-parchment/60 text-sm mb-1">{location.address}</p>
          <p className="font-body text-parchment/60 text-sm mb-4">Wellington, New Zealand</p>
          <a href={`tel:${location.phone}`} className="font-body text-parchment/50 text-sm hover:text-amber block mb-1 transition-colors">
            {location.phone}
          </a>
          <a href={`mailto:${location.email}`} className="font-body text-parchment/50 text-sm hover:text-amber block mb-6 transition-colors">
            {location.email}
          </a>
          <CTAButton to="/book" variant="amber">{nav.bookTable}</CTAButton>
        </div>
      </div>

      <div className="border-t border-amber/15 px-4 py-4 text-center">
        <p className="font-body text-parchment/25 text-xs tracking-wider">
          {tx.rights.replace('{year}', new Date().getFullYear())}
        </p>
      </div>
    </footer>
  )
}
