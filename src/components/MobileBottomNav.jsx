import { Link, useLocation } from 'react-router-dom'
import { UtensilsCrossed, CalendarDays, MapPin } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'

export default function MobileBottomNav() {
  const location = useLocation()
  const { lang } = useLang()
  const tx = t[lang].bottomNav

  const tabs = [
    { to: '/menu',    label: tx.menu,       Icon: UtensilsCrossed },
    { to: '/book',    label: tx.book,       Icon: CalendarDays },
    { to: '/contact', label: tx.directions, Icon: MapPin },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy border-t-2 border-amber/40 pb-safe">
      <div className="flex">
        {tabs.map(({ to, label, Icon }) => {
          const active = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center gap-1 py-3 font-body text-[10px] font-bold uppercase tracking-widest transition-colors ${
                active ? 'text-amber' : 'text-parchment/50'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
