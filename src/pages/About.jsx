import { motion } from 'framer-motion'
import { Leaf, Users, Globe, Mountain } from 'lucide-react'
import { photo } from '../utils/photo'
import Section from '../components/Section'
import CTAButton from '../components/CTAButton'
import Footer from '../components/Footer'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'

const valueIcons = [Leaf, Users, Mountain]

export default function About() {
  const { lang } = useLang()
  const tx = t[lang].about

  return (
    <>
      <div className="navy-banner bg-navy pt-28 pb-16 px-4 text-center">
        <div className="ornament text-amber/40 text-xs mb-3 max-w-xs mx-auto">
          <span className="font-slab text-[10px] tracking-[0.35em] text-amber uppercase">{tx.eyebrow}</span>
        </div>
        <h1 className="font-slab text-5xl md:text-7xl text-parchment uppercase text-shadow">{tx.title}</h1>
        <div className="ornament text-amber/30 text-xs mt-4 max-w-xs mx-auto">✦</div>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="rounded-sm overflow-hidden aspect-[3/4] border-2 border-amber/30 shadow-lg">
            <img src={photo('sugarcane.jpg')} alt="La Fonda story" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="ornament text-amber text-xs mb-5">
              <span className="font-slab text-sm uppercase tracking-wider text-navy">{tx.h2}</span>
            </div>
            <div className="flex flex-col gap-4 font-body text-brown/70 leading-relaxed">
              <p className="italic">{tx.p1}</p>
              <p>{tx.p2}</p>
              <p>{tx.p3}</p>
              <p className="font-bold text-navy">{tx.p4}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <div className="navy-banner bg-navy py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-slab text-4xl text-parchment uppercase text-shadow">{tx.valuesTitle}</h2>
            <div className="ornament text-amber/40 text-xs mt-3 max-w-xs mx-auto">✦</div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tx.values.map((value, i) => (
              <motion.div
                key={value.title}
                whileHover={{ y: -4 }}
                className="vintage-card p-7 text-center"
              >
                {(() => { const Icon = valueIcons[i]; return <div className="flex justify-center mb-4"><Icon size={32} className="text-scarlet" /></div> })()}
                <div className="ornament text-amber text-xs mb-3">
                  <span className="font-slab text-sm uppercase tracking-wide text-navy">{value.title}</span>
                </div>
                <p className="font-body text-brown/65 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 h-56 md:h-72">
        {[photo('bandeja.jpg'),photo('steak.jpg'),photo('menu.jpg'),photo('sugarcane.jpg')].map((src,i)=>(
          <div key={i} className="overflow-hidden relative">
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-navy/20" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-scarlet py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:'120px'}} />
        <div className="relative">
          <div className="ornament text-parchment/30 text-xs mb-4 max-w-xs mx-auto">✦</div>
          <h2 className="font-slab text-4xl text-parchment uppercase text-shadow mb-3">{tx.cta.title}</h2>
          <p className="font-body italic text-parchment/70 mb-8 max-w-xs mx-auto">{tx.cta.sub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/book" variant="navy">{tx.cta.primary}</CTAButton>
            <CTAButton to="/menu" variant="secondary">{tx.cta.secondary}</CTAButton>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
