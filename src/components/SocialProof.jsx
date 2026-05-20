import { Star } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'

export default function SocialProof() {
  const { lang } = useLang()
  const tx = t[lang].home.social

  return (
    <div className="bg-navy navy-banner py-5 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center">

        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-amber fill-amber" />
            ))}
          </div>
          <span className="font-slab text-xl text-amber">5.0</span>
          <span className="font-body text-parchment/50 text-xs uppercase tracking-wider">{tx.rating}</span>
        </div>

        <div className="w-px h-8 bg-amber/30 hidden sm:block" />

        <p className="font-body italic text-parchment/70 text-sm max-w-xs">{tx.quote}</p>

        <div className="w-px h-8 bg-amber/30 hidden sm:block" />

        <div className="flex flex-col items-center">
          <span className="font-slab text-lg text-amber uppercase tracking-wide">{tx.ranked}</span>
          <span className="font-body text-parchment/50 text-[10px] uppercase tracking-[0.2em]">{tx.rankedSub}</span>
        </div>

      </div>
    </div>
  )
}
