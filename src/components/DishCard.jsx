import { motion } from 'framer-motion'

export default function DishCard({ name, description, price, image, highlight, signatureLabel }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className={`vintage-card flex flex-col overflow-hidden ${highlight ? 'ring-2 ring-amber ring-offset-1 ring-offset-paper' : ''}`}
    >
      {image && (
        <div className="aspect-[4/3] overflow-hidden bg-navy/10">
          <img src={image} alt={name} loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        {/* Ornamental top rule */}
        <div className="ornament text-amber text-xs mb-3">✦</div>

        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-slab text-base text-navy leading-snug uppercase tracking-wide">{name}</h3>
          {price && (
            <span className="shrink-0 font-slab text-sm text-parchment bg-scarlet px-2.5 py-0.5 rounded-sm border border-red-800 shadow-sm">
              {price}
            </span>
          )}
        </div>

        <p className="font-body text-sm text-brown/70 leading-relaxed flex-1">{description}</p>

        {highlight && (
          <div className="mt-3 ornament text-amber text-xs">
            <span className="font-slab text-[10px] tracking-[0.2em] text-amber uppercase whitespace-nowrap">
              {signatureLabel || '★ La Fonda Signature'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
