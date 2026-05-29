import { motion } from 'framer-motion'
import { CalendarDays, ChevronDown, UtensilsCrossed, Flame, Drumstick, Star, Phone } from 'lucide-react'
import CTAButton from '../components/CTAButton'
import { location } from '../data/location'
import { photo } from '../utils/photo'
import SocialProof from '../components/SocialProof'
import DishCard from '../components/DishCard'
import Section from '../components/Section'
import LocationMap from '../components/LocationMap'
import Footer from '../components/Footer'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'

const signatureDishes = [
  { name: 'Parrillada La Fonda', descriptionEs: 'La parrillada colombiana definitiva para dos — lomo, chuletas de cerdo, cordero, chorizo, morcilla, costillas de res y todos los acompañamientos.', description: 'The ultimate Colombian BBQ feast for two — sirloin, pork chops, lamb, chorizo, morcilla, beef ribs and all the trimmings.', price: '$110', image: photo('bandeja.jpg'), highlight: true },
  { name: 'Churrasco', descriptionEs: 'Clásico lomo de res a la parrilla con arepa, papas al horno o fritas, ensalada y chimichurri.', description: 'Classic sirloin steak, grilled to perfection, with arepa, baked potatoes or fries, salad and chimichurri.', price: '$40', image: photo('steak.jpg') },
  { name: '500g Slow-Cook Beef Ribs', descriptionEs: 'Marinadas en cerveza y cocidas a fuego lento hasta que la carne se desprende del hueso.', description: 'Beer-marinated and slow-cooked until the meat falls off the bone. Served with all the Colombian sides.', price: '$60', image: photo('menu.jpg') },
  { name: 'Pork Belly', descriptionEs: 'Panza de cerdo cocida a fuego lento con frijoles al estilo colombiano, arroz, ensalada y arepa.', description: 'Slow-cooked pork belly with Colombian-style kidney beans, rice, salad and arepa.', price: '$40', image: photo('sugarcane.jpg') },
]

const menuCategories = {
  en: [
    { label: 'Street Classics', Icon: UtensilsCrossed, desc: 'Arepas · Pinchos · Empanadas' },
    { label: 'From the Grill',  Icon: Flame,           desc: 'Parrilladas · Churrasco · Ribs' },
    { label: 'Poultry & Pork',  Icon: Drumstick,       desc: 'Lamb · Chicken · Pork Belly' },
    { label: "Kids' Menu",      Icon: Star,            desc: 'Little Rebels Meal' },
  ],
  es: [
    { label: 'Clásicos',    Icon: UtensilsCrossed, desc: 'Arepas · Pinchos · Empanadas' },
    { label: 'Parrilla',    Icon: Flame,           desc: 'Parrilladas · Churrasco · Costillas' },
    { label: 'Aves y Cerdo', Icon: Drumstick,      desc: 'Cordero · Pollo · Panza de Cerdo' },
    { label: 'Infantil',    Icon: Star,            desc: 'Little Rebels' },
  ],
}

function VintageHeading({ eyebrow, title, light = false }) {
  return (
    <div className="text-center mb-12">
      <div className={`ornament text-xs mb-3 ${light ? 'text-amber' : 'text-amber'}`}>
        <span className={`font-slab text-[10px] tracking-[0.3em] uppercase ${light ? 'text-amber' : 'text-scarlet'}`}>
          {eyebrow}
        </span>
      </div>
      <h2 className={`font-slab text-4xl md:text-5xl uppercase tracking-wide text-shadow ${light ? 'text-parchment' : 'text-navy'}`}>
        {title}
      </h2>
      <div className={`ornament text-xs mt-3 ${light ? 'text-amber/50' : 'text-amber'}`}>✦</div>
    </div>
  )
}

export default function Home() {
  const { lang } = useLang()
  const tx = t[lang].home

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={photo('bandeja.jpg')}
            alt="La Fonda Colombian food"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="ken-burns w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/65 to-navy/90" />
          {/* Grain on hero */}
          <div className="absolute inset-0 opacity-20"
            style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:'160px'}} />
        </div>

        {/* Amber top/bottom rules on hero */}
        <div className="absolute top-[68px] md:top-[84px] left-0 right-0 h-px bg-amber/30" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber/40" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-slab text-amber text-xs tracking-[0.35em] uppercase mb-5"
          >
            {tx.hero.location}
          </motion.p>

          {/* Ribbon banner */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.3 }}
            className="inline-block ribbon mb-4 text-xs font-slab tracking-[0.25em] uppercase"
          >
            Colombian Restaurant · Wellington
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-slab text-4xl md:text-7xl uppercase text-parchment text-shadow leading-none mb-2"
          >
            {tx.hero.headline1}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-script text-4xl md:text-6xl text-amber text-shadow leading-none mb-6"
          >
            {tx.hero.headline2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            className="font-body text-parchment/75 text-base md:text-lg mb-10 max-w-lg mx-auto italic"
          >
            {tx.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CTAButton to="/book" variant="primary">
              <CalendarDays size={16} />
              {tx.hero.bookBtn}
            </CTAButton>
            <CTAButton to="/menu" variant="secondary">{tx.hero.menuBtn}</CTAButton>
          </motion.div>

          {/* Bottom ornamental text strip */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="mt-10 font-body text-amber/80 text-[10px] tracking-[0.4em] uppercase"
          >
            ✦ &nbsp; Natural &nbsp; · &nbsp; Authentic &nbsp; · &nbsp; Delicious &nbsp; ✦
          </motion.p>
        </div>

        <motion.a
          href="#dishes"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber/50 hover:text-amber transition-colors"
        >
          <ChevronDown size={28} className="animate-bounce" />
        </motion.a>
      </section>

      <SocialProof />

      {/* ── Signature Dishes ── */}
      <Section id="dishes">
        <VintageHeading eyebrow={tx.dishes.eyebrow} title={tx.dishes.title} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureDishes.map((dish) => (
            <DishCard
              key={dish.name}
              name={dish.name}
              description={lang === 'es' ? dish.descriptionEs : dish.description}
              price={dish.price}
              image={dish.image}
              highlight={dish.highlight}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <CTAButton to="/menu" variant="outline">{tx.dishes.cta}</CTAButton>
        </div>
      </Section>

      {/* ── Sunday Special ── */}
      <div className="bg-paper border-y-2 border-amber/30 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block ribbon text-xs font-slab tracking-[0.25em] uppercase mb-5">
            Every Sunday
          </div>
          <div className="ornament text-amber text-xs mt-1 mb-6">
            <span className="font-slab text-[10px] tracking-[0.35em] text-scarlet uppercase">Weekly Feature</span>
          </div>
          <div className="vintage-card overflow-hidden p-0 mb-7">
            <img
              src={photo('sunday-lechon.jpg')}
              alt="Sunday Special — Lechón Colombian Style"
              loading="lazy"
              className="w-full block"
            />
          </div>
          <p className="font-body italic text-brown/55 text-sm mb-6">
            Available Sundays only — table bookings recommended
          </p>
          <CTAButton to="/book" variant="navy">
            <CalendarDays size={16} />
            Reserve Your Sunday Table
          </CTAButton>
        </div>
      </div>

      {/* ── Urgency block ── */}
      <div className="navy-banner bg-navy py-14 px-4 text-center">
        <p className="font-slab text-amber text-xs tracking-[0.3em] uppercase mb-3">{tx.urgency.eyebrow}</p>
        <h2 className="font-slab text-3xl md:text-4xl text-parchment uppercase text-shadow mb-2">{tx.urgency.title}</h2>
        <div className="ornament text-amber/40 text-xs mb-4 max-w-xs mx-auto">✦</div>
        <p className="font-body italic text-parchment/60 mb-7 max-w-sm mx-auto">{tx.urgency.sub}</p>
        <CTAButton to="/book" variant="primary">
          <CalendarDays size={16} />
          {tx.urgency.cta}
        </CTAButton>
      </div>

      {/* ── Menu Preview ── */}
      <Section>
        <VintageHeading eyebrow={tx.menuPreview.eyebrow} title={tx.menuPreview.title} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuCategories[lang].map(({ label, Icon, desc }) => (
            <a
              key={label}
              href="#/menu"
              className="vintage-card p-6 text-center hover:ring-2 hover:ring-amber/60 transition-all group"
            >
              <div className="flex justify-center mb-3"><Icon size={32} className="text-scarlet group-hover:text-amber transition-colors" /></div>
              <div className="ornament text-amber/50 text-xs mb-2">✦</div>
              <h3 className="font-slab text-base text-navy uppercase tracking-wide mb-1 group-hover:text-scarlet transition-colors">{label}</h3>
              <p className="font-body text-brown/60 text-xs uppercase tracking-wider">{desc}</p>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <CTAButton to="/menu" variant="navy">{tx.menuPreview.cta}</CTAButton>
        </div>
      </Section>

      {/* ── Takeaway ── */}
      <div className="bg-parchment border-y-2 border-amber/30 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-stretch">
          <div className="flex flex-col justify-center px-8 py-14 order-2 md:order-1">
            <div className="ornament text-amber text-xs mb-5">
              <span className="font-slab text-[10px] tracking-[0.35em] text-scarlet uppercase">Now Available</span>
            </div>
            <h2 className="font-slab text-4xl md:text-5xl text-navy uppercase text-shadow leading-tight mb-4">
              Colombian<br />Food To Go
            </h2>
            <p className="font-body text-brown/65 leading-relaxed mb-8 max-w-sm">
              All the flavours of La Fonda, packed fresh and ready when you are. Call ahead or walk in — we'll have it waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <CTAButton href={`tel:${location.phone}`} variant="primary">
                <Phone size={14} />
                Call to Order
              </CTAButton>
              <CTAButton to="/menu" variant="outline">View Menu</CTAButton>
            </div>
          </div>
          <div className="overflow-hidden order-1 md:order-2 min-h-[280px]">
            <img
              src={photo('takeaway.jpg')}
              alt="La Fonda Takeaway — Colombian food to go"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* ── Story Teaser ── */}
      <div className="bg-navy navy-banner py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-sm overflow-hidden aspect-square border-2 border-amber/30">
            <img src={photo('sugarcane.jpg')} alt="Colombian culture" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="ornament text-amber/50 text-xs mb-4">
              <span className="font-slab text-[10px] tracking-[0.3em] text-amber/70 uppercase">{tx.story.eyebrow}</span>
            </div>
            <h2 className="font-slab text-3xl md:text-4xl text-parchment uppercase text-shadow mb-1 whitespace-pre-line leading-tight">
              {tx.story.title.split('\n')[0]}
            </h2>
            <h2 className="font-script text-3xl text-amber mb-6">{tx.story.title.split('\n')[1]}</h2>
            <p className="font-body text-parchment/65 leading-relaxed mb-4 italic">{tx.story.p1}</p>
            <p className="font-body text-parchment/65 leading-relaxed mb-8">{tx.story.p2}</p>
            <CTAButton to="/about" variant="amber">{tx.story.cta}</CTAButton>
          </div>
        </div>
      </div>

      {/* ── Location ── */}
      <Section>
        <VintageHeading eyebrow={tx.locationSection.eyebrow} title={tx.locationSection.title} />
        <LocationMap />
      </Section>

      {/* ── Final CTA ── */}
      <div className="bg-scarlet py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:'120px'}} />
        <div className="relative">
          <div className="ornament text-parchment/30 text-xs mb-4 max-w-xs mx-auto">✦</div>
          <h2 className="font-slab text-4xl md:text-5xl text-parchment uppercase text-shadow mb-3">{tx.finalCta.title}</h2>
          <p className="font-body italic text-parchment/70 mb-8 max-w-md mx-auto">{tx.finalCta.sub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/book" variant="navy">
              <CalendarDays size={16} />
              {tx.finalCta.primary}
            </CTAButton>
            <CTAButton to="/contact" variant="secondary">{tx.finalCta.secondary}</CTAButton>
          </div>
          <div className="ornament text-parchment/20 text-xs mt-8 max-w-xs mx-auto">✦</div>
        </div>
      </div>

      <Footer />
    </>
  )
}
