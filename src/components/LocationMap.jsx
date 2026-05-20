import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react'
import { location } from '../data/location'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import CTAButton from './CTAButton'
import EsriMap from './EsriMap'

export default function LocationMap({ compact = false }) {
  const { lang } = useLang()
  const tx = t[lang].location
  const mapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`

  return (
    <div className={`grid ${compact ? '' : 'md:grid-cols-2'} gap-8 items-start`}>
      {/* Esri Map via Leaflet */}
      <EsriMap
        lat={location.lat}
        lng={location.lng}
        label="La Fonda"
        address={location.address}
      />

      {/* Details */}
      <div className="vintage-card p-6 flex flex-col gap-5">
        <div className="ornament text-amber text-sm">✦</div>

        <div className="flex gap-3">
          <MapPin className="text-scarlet shrink-0 mt-0.5" size={18} />
          <div>
            <p className="font-slab text-navy text-sm uppercase tracking-wide">{location.address}</p>
            <p className="font-body text-xs text-brown/60 mt-0.5">{tx.city}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Phone className="text-scarlet shrink-0 mt-0.5" size={18} />
          <a href={`tel:${location.phone}`} className="font-body text-brown hover:text-navy text-sm">
            {location.phone}
          </a>
        </div>

        <div className="flex gap-3">
          <Mail className="text-scarlet shrink-0 mt-0.5" size={18} />
          <a href={`mailto:${location.email}`} className="font-body text-brown hover:text-navy text-sm">
            {location.email}
          </a>
        </div>

        <div className="flex gap-3">
          <Clock className="text-scarlet shrink-0 mt-0.5" size={18} />
          <div className="flex flex-col gap-1">
            {location.hours.map(({ day, time }) => (
              <div key={day} className="flex gap-3 text-xs font-body">
                <span className="text-brown/60 w-40 shrink-0">{day}</span>
                <span className={`font-bold ${time === 'Closed' ? 'text-scarlet' : 'text-navy'}`}>{time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ornament text-amber text-sm">✦</div>

        <CTAButton href={mapsUrl} variant="navy" className="self-start">
          <Navigation size={14} />
          {tx.directions}
        </CTAButton>
      </div>
    </div>
  )
}
