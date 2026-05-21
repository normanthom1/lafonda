import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Briefcase, Music, CheckCircle } from 'lucide-react'
import CTAButton from '../components/CTAButton'
import Section from '../components/Section'
import Footer from '../components/Footer'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import { photo } from '../utils/photo'

const icons = [Briefcase, Users, Music]
const inputCls = 'border-2 border-amber/30 bg-parchment rounded-sm px-4 py-3 text-sm font-body text-brown outline-none focus:border-amber transition-colors w-full'
const labelCls = 'font-slab text-[11px] uppercase tracking-widest text-navy/70'

export default function Events() {
  const { lang } = useLang()
  const tx = t[lang].events
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', type:'', date:'', guests:'', message:'' })
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Event Enquiry — ${form.type} for ${form.guests} guests`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nEvent Type: ${form.type}\nDate: ${form.date}\nGuests: ${form.guests}\n\nMessage:\n${form.message}`)
    window.location.href = `mailto:Hola@lafonda.co.nz?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <div className="relative navy-banner bg-navy pt-28 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={photo('bandeja.jpg')} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative">
          <div className="inline-block ribbon mb-5 text-xs font-slab tracking-[0.25em] uppercase">
            {tx.eyebrow}
          </div>
          <h1 className="font-slab text-5xl md:text-7xl text-parchment uppercase text-shadow leading-none mb-2 whitespace-pre-line">
            {tx.title.split('\n')[0]}
          </h1>
          <h2 className="font-script text-4xl text-amber mb-5">{tx.title.split('\n')[1]}</h2>
          <div className="ornament text-amber/30 text-xs mb-5 max-w-xs mx-auto">✦</div>
          <p className="font-body italic text-parchment/65 max-w-md mx-auto">{tx.sub}</p>
        </div>
      </div>

      {/* Offerings */}
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {tx.offerings.map((offering, i) => {
            const Icon = icons[i]
            return (
              <motion.div key={offering.title} whileHover={{ y: -4 }} className="vintage-card p-7">
                <div className="w-11 h-11 rounded-sm bg-navy/10 border border-navy/20 flex items-center justify-center mb-5">
                  <Icon className="text-navy" size={20} />
                </div>
                <div className="ornament text-amber text-xs mb-3">
                  <span className="font-slab text-xs uppercase tracking-wider text-navy">{offering.title}</span>
                </div>
                <p className="font-body text-brown/65 text-sm leading-relaxed mb-5">{offering.description}</p>
                <ul className="flex flex-col gap-2">
                  {offering.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs font-body text-brown/70">
                      <span className="text-amber font-bold">✦</span> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Enquiry form */}
      <div className="navy-banner bg-navy py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-slab text-3xl text-parchment uppercase text-shadow mb-2">{tx.form.title}</h2>
            <div className="ornament text-amber/40 text-xs mb-3 max-w-xs mx-auto">✦</div>
            <p className="font-body italic text-parchment/60">{tx.form.sub}</p>
          </div>

          {submitted ? (
            <div className="vintage-card text-center py-12 px-6">
              <CheckCircle className="text-olive mx-auto mb-4" size={48} />
              <h3 className="font-slab text-2xl text-navy uppercase mb-2">{tx.success.title}</h3>
              <p className="font-body text-brown/70">{tx.success.sub}</p>
            </div>
          ) : (
            <div className="vintage-card p-6 md:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5"><label className={labelCls}>{tx.form.name} *</label><input required type="text" value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Jane Smith" className={inputCls}/></div>
                  <div className="flex flex-col gap-1.5"><label className={labelCls}>{tx.form.email} *</label><input required type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="jane@company.com" className={inputCls}/></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>{tx.form.type} *</label>
                    <select required value={form.type} onChange={e=>update('type',e.target.value)} className={inputCls}>
                      <option value="">{tx.form.selectType}</option>
                      {tx.form.types.map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5"><label className={labelCls}>{tx.form.guests}</label><input type="number" min="1" value={form.guests} onChange={e=>update('guests',e.target.value)} placeholder={tx.form.guestsPlaceholder} className={inputCls}/></div>
                </div>
                <div className="flex flex-col gap-1.5"><label className={labelCls}>{tx.form.date}</label><input type="date" value={form.date} onChange={e=>update('date',e.target.value)} className={inputCls}/></div>
                <div className="flex flex-col gap-1.5"><label className={labelCls}>{tx.form.message} *</label><textarea required rows={4} value={form.message} onChange={e=>update('message',e.target.value)} placeholder={tx.form.messagePlaceholder} className={inputCls+' resize-none'}/></div>
                <div className="ornament text-amber/40 text-xs">✦</div>
                <button type="submit" className="stamp-btn w-full py-4 bg-scarlet text-parchment font-slab uppercase tracking-widest text-sm rounded-sm hover:bg-red-800 transition-colors border-2 border-scarlet">{tx.form.submit}</button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
