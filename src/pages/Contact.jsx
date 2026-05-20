import { Phone, Mail, Navigation } from 'lucide-react'
import Section from '../components/Section'
import LocationMap from '../components/LocationMap'
import CTAButton from '../components/CTAButton'
import Footer from '../components/Footer'
import { location } from '../data/location'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'

export default function Contact() {
  const { lang } = useLang()
  const tx = t[lang].contact
  const mapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`

  return (
    <>
      <div className="navy-banner bg-navy pt-28 pb-14 px-4 text-center">
        <div className="ornament text-amber/40 text-xs mb-3 max-w-xs mx-auto">
          <span className="font-slab text-[10px] tracking-[0.35em] text-amber uppercase">{tx.eyebrow}</span>
        </div>
        <h1 className="font-slab text-5xl md:text-7xl text-parchment uppercase text-shadow mb-3">{tx.title}</h1>
        <p className="font-body italic text-parchment/60 max-w-sm mx-auto">{tx.sub}</p>
        <div className="ornament text-amber/30 text-xs mt-4 max-w-xs mx-auto">✦</div>
      </div>

      {/* Quick action strip */}
      <div className="bg-amber py-5 px-4 border-y-2 border-amber/60">
        <div className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3 justify-center">
          <a href={`tel:${location.phone}`}
            className="stamp-btn flex items-center justify-center gap-2 bg-navy text-parchment px-6 py-3 rounded-sm text-xs border-2 border-navy hover:bg-navy/80 transition-colors font-slab uppercase tracking-wider">
            <Phone size={14}/> {tx.callBtn}
          </a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
            className="stamp-btn flex items-center justify-center gap-2 bg-navy text-parchment px-6 py-3 rounded-sm text-xs border-2 border-navy hover:bg-navy/80 transition-colors font-slab uppercase tracking-wider">
            <Navigation size={14}/> {tx.directionsBtn}
          </a>
          <a href={`mailto:${location.email}`}
            className="stamp-btn flex items-center justify-center gap-2 bg-parchment text-navy px-6 py-3 rounded-sm text-xs border-2 border-navy/30 hover:bg-cream transition-colors font-slab uppercase tracking-wider">
            <Mail size={14}/> {tx.emailBtn}
          </a>
        </div>
      </div>

      <Section>
        <LocationMap />
      </Section>

      {/* Hours */}
      <div className="py-12 px-4 bg-parchment">
        <div className="max-w-md mx-auto">
          <div className="ornament text-amber text-xs mb-6 text-center">
            <span className="font-slab text-sm uppercase tracking-[0.25em] text-navy">{tx.hours}</span>
          </div>
          <div className="vintage-card overflow-hidden">
            {location.hours.map(({ day, time }, i) => (
              <div key={day}
                className={`flex justify-between items-center px-6 py-4 text-sm ${i < location.hours.length-1 ? 'border-b border-amber/20' : ''}`}>
                <span className="font-body text-brown/65">{day}</span>
                <span className={`font-slab text-xs uppercase tracking-wider ${time==='Closed' ? 'text-scarlet' : 'text-navy'}`}>{time}</span>
              </div>
            ))}
          </div>
          <p className="text-center font-body text-xs text-brown/40 mt-4 uppercase tracking-wider">{tx.walkIn}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="navy-banner bg-navy py-14 px-4 text-center">
        <h2 className="font-slab text-3xl text-parchment uppercase text-shadow mb-2">{tx.cta.title}</h2>
        <div className="ornament text-amber/40 text-xs mb-5 max-w-xs mx-auto">✦</div>
        <p className="font-body italic text-parchment/60 mb-7">{tx.cta.sub}</p>
        <CTAButton to="/book" variant="primary">{tx.cta.btn}</CTAButton>
      </div>

      <Footer />
    </>
  )
}
