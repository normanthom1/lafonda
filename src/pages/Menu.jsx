import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, Flame, Drumstick, Star } from 'lucide-react'
import { menu } from '../data/menu'
import DishCard from '../components/DishCard'
import CTAButton from '../components/CTAButton'
import Footer from '../components/Footer'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import { photo } from '../utils/photo'

const categoryEs = {
  'Parrilladas & Beef Cuts': 'Parrilladas y Cortes de Res',
  'Poultry, Pork & Grill':   'Aves, Cerdo y Parrilla',
  "Kids' Menu":              'Menú Infantil',
}

const categoryIcons = { flame: Flame, drumstick: Drumstick, star: Star }
const dishDescEs = {
  'Parrillada La Fonda':      'La parrillada colombiana definitiva para dos — lomo, chuletas de cerdo, cordero, chorizo de la casa, morcilla, costillas de res, chimichurri, arepa, papas al horno, ensalada y crema agria.',
  '500g Slow-Cook Beef Ribs': 'Marinadas a fuego lento en cerveza con hierbas y especias aromáticas. Con papas al horno, arepa, ensalada, chimichurri y crema agria.',
  'Lomitos de la Fonda':      'Puntas de lomo a la parrilla y horneadas en vino con crema fresca y champiñones. Con arepa y ensalada.',
  'Churrasco':                'Clásico lomo de res con arepa, papas al horno o fritas, ensalada y chimichurri.',
  'Beef Chorizo':             'Jugoso lomo de res con un chorizo artesanal, papas al horno, arepa y chimichurri.',
  'Lamb or Chicken Grilled':  'A elegir: tierno cordero o pollo de campo, con arepa, papas al horno o fritas, ensalada, chimichurri y crema agria.',
  'Skewers (Pincho)':         'Pinchos de pollo o res marinados en vinagre, aceite de oliva, aromáticos y especias.',
  'Pork Belly':               'Panza de cerdo cocida a fuego lento con frijoles al estilo colombiano, arroz, ensalada y arepa.',
  'Little Rebels Meal':       '4 filetes de pollo de campo a la parrilla con papas fritas, aioli, salsa de tomate y un jugo Keri o agua.',
}

export default function Menu() {
  const { lang } = useLang()
  const tx = t[lang].menu
  const categories = menu.map(c => c.category)
  const [active, setActive] = useState('All')
  const allCategories = ['All', ...categories]
  const getCategoryLabel = (cat) => lang === 'es' ? (categoryEs[cat] || cat) : cat
  const filtered = active === 'All' ? menu : menu.filter(c => c.category === active)

  return (
    <>
      {/* Header */}
      <div className="navy-banner bg-navy pt-28 pb-14 px-4 text-center">
        <div className="ornament text-amber/40 text-xs mb-3 max-w-xs mx-auto">
          <span className="font-slab text-[10px] tracking-[0.35em] text-amber uppercase">{tx.eyebrow}</span>
        </div>
        <h1 className="font-slab text-5xl md:text-7xl text-parchment uppercase text-shadow mb-3">{tx.title}</h1>
        <p className="font-body italic text-parchment/60 max-w-md mx-auto">{tx.sub}</p>
        <div className="ornament text-amber/30 text-xs mt-4 max-w-xs mx-auto">✦</div>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-[69px] md:top-[85px] z-30 bg-navy/95 backdrop-blur-sm border-b-2 border-amber/30 px-4 py-3">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {allCategories.map((cat) => {
            const label = cat === 'All' ? tx.all : getCategoryLabel(cat)
            const isActive = active === cat
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 px-5 py-2 rounded-sm font-slab text-xs uppercase tracking-wider transition-all border ${
                  isActive
                    ? 'bg-amber text-brown border-amber shadow-sm'
                    : 'bg-transparent text-parchment/60 border-parchment/20 hover:border-amber/50 hover:text-parchment'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Menu items */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <AnimatePresence mode="wait">
          {filtered.map(section => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-16"
            >
              {/* Category heading */}
              <div className="flex items-center gap-4 mb-8">
                {(() => { const Icon = categoryIcons[section.icon]; return Icon ? <Icon size={28} className="text-scarlet shrink-0" /> : null })()}
                <div>
                  <div className="ornament text-amber text-xs mb-1">
                    <span className="font-slab text-xs uppercase tracking-[0.25em] text-navy">
                      {getCategoryLabel(section.category)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {section.items.map(item => (
                  <DishCard
                    key={item.name}
                    name={item.name}
                    description={lang === 'es' ? (dishDescEs[item.name] || item.description) : item.description}
                    price={item.price}
                    highlight={item.highlight}
                    signatureLabel={tx.signature}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Lemonade Promo ── */}
      <div className="max-w-6xl mx-auto px-4 pb-14">
        <div className="vintage-card overflow-hidden grid sm:grid-cols-[240px_1fr] items-center">
          <img
            src={photo('lemonade.jpg')}
            alt="Sugar Cane Lemonade $3"
            loading="lazy"
            className="w-full block"
          />
          <div className="p-7 flex flex-col justify-center">
            <div className="ornament text-amber text-xs mb-3">
              <span className="font-slab text-[10px] tracking-[0.35em] text-scarlet uppercase">Beverages</span>
            </div>
            <h3 className="font-slab text-2xl text-navy uppercase tracking-wide leading-tight mb-2">
              Sugar Cane Lemonade
            </h3>
            <p className="font-body text-brown/65 text-sm leading-relaxed mb-5">
              Freshly squeezed and served over ice — the true taste of Colombia. Natural, refreshing, delicious.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-slab text-xl text-parchment bg-scarlet px-4 py-1 rounded-sm border border-red-800 shadow-sm">
                $3
              </span>
              <span className="font-body text-xs text-brown/50 uppercase tracking-wider">Ask your server</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="navy-banner bg-navy py-14 px-4 text-center">
        <h2 className="font-slab text-3xl text-parchment uppercase text-shadow mb-2">{tx.cta.title}</h2>
        <div className="ornament text-amber/40 text-xs mb-5 max-w-xs mx-auto">✦</div>
        <p className="font-body italic text-parchment/60 mb-7">{tx.cta.sub}</p>
        <CTAButton to="/book" variant="primary">
          <CalendarDays size={16} />
          {tx.cta.btn}
        </CTAButton>
      </div>

      <Footer />
    </>
  )
}
