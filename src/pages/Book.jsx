import { useState } from 'react'
import { CalendarDays, Clock, Users, CheckCircle, Mail, PartyPopper } from 'lucide-react'
import CTAButton from '../components/CTAButton'
import Footer from '../components/Footer'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'

const timeSlots = ['12:00 pm','12:30 pm','1:00 pm','1:30 pm','2:00 pm','5:00 pm','5:30 pm','6:00 pm','6:30 pm','7:00 pm','7:30 pm','8:00 pm','8:30 pm','9:00 pm']

const inputCls = 'border-2 border-amber/30 bg-parchment rounded-sm px-4 py-3 text-sm font-body text-brown outline-none focus:border-amber transition-colors w-full'
const labelCls = 'font-slab text-[11px] uppercase tracking-widest text-navy/70'

export default function Book() {
  const { lang } = useLang()
  const tx = t[lang].book
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', phone:'', date:'', time:'', guests:'2', notes:'' })
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const guestLabel = (n) => n===1||n==='1' ? `1 ${tx.form.guestSuffix}` : `${n} ${tx.form.guestsSuffix}`

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Table Reservation — ${form.date} at ${form.time} (${form.guests} guests)`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\n\nNotes:\n${form.notes}`)
    window.location.href = `mailto:hello@lafonda.co.nz?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 text-center">
      <CheckCircle className="text-olive mb-4" size={56} />
      <h1 className="font-slab text-4xl text-navy uppercase mb-3">{tx.success.title}</h1>
      <div className="ornament text-amber text-xs mb-4 max-w-xs mx-auto">✦</div>
      <p className="font-body text-brown/70 max-w-sm mb-8">{tx.success.sub}</p>
      <CTAButton to="/" variant="outline">{tx.success.back}</CTAButton>
    </div>
  )

  return (
    <>
      <div className="navy-banner bg-navy pt-28 pb-14 px-4 text-center">
        <div className="ornament text-amber/40 text-xs mb-3 max-w-xs mx-auto">
          <span className="font-slab text-[10px] tracking-[0.35em] text-amber uppercase">{tx.eyebrow}</span>
        </div>
        <h1 className="font-slab text-5xl md:text-6xl text-parchment uppercase text-shadow mb-3">{tx.title}</h1>
        <p className="font-body italic text-parchment/60 max-w-md mx-auto">{tx.sub}</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-14">
        {/* Badges */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[{ Icon: Users, label: tx.badges.walkIn }, { Icon: Mail, label: tx.badges.confirm }, { Icon: PartyPopper, label: tx.badges.events }].map(({ Icon, label }) => (
            <div key={label} className="vintage-card text-center p-4">
              <div className="flex justify-center mb-2"><Icon size={22} className="text-scarlet" /></div>
              <p className="font-slab text-[9px] uppercase tracking-wider text-navy/70">{label}</p>
            </div>
          ))}
        </div>

        <div className="vintage-card p-6 md:p-8">
          <div className="ornament text-amber text-xs mb-6">
            <span className="font-slab text-[10px] tracking-[0.3em] text-navy uppercase">Reservation Form</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>{tx.form.name} *</label>
                <input required type="text" value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Jane Smith" className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>{tx.form.email} *</label>
                <input required type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="jane@email.com" className={inputCls} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>{tx.form.phone}</label>
                <input type="tel" value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="+64 21 000 0000" className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls + ' flex items-center gap-1'}><Users size={11}/> {tx.form.guests} *</label>
                <select required value={form.guests} onChange={e=>update('guests',e.target.value)} className={inputCls}>
                  {[1,2,3,4,5,6,7,8,'9+'].map(n=><option key={n} value={n}>{guestLabel(n)}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls + ' flex items-center gap-1'}><CalendarDays size={11}/> {tx.form.date} *</label>
                <input required type="date" value={form.date} onChange={e=>update('date',e.target.value)} min={new Date().toISOString().split('T')[0]} className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls + ' flex items-center gap-1'}><Clock size={11}/> {tx.form.time} *</label>
                <select required value={form.time} onChange={e=>update('time',e.target.value)} className={inputCls}>
                  <option value="">{tx.form.selectTime}</option>
                  {timeSlots.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>{tx.form.notes}</label>
              <textarea rows={3} value={form.notes} onChange={e=>update('notes',e.target.value)} placeholder={tx.form.notesPlaceholder} className={inputCls + ' resize-none'} />
            </div>

            <div className="ornament text-amber/50 text-xs my-1">✦</div>

            <button type="submit"
              className="stamp-btn w-full py-4 bg-navy text-parchment font-slab uppercase tracking-widest text-sm rounded-sm hover:bg-navy/80 transition-colors border-2 border-navy">
              {tx.form.submit}
            </button>
            <p className="text-center font-body text-xs text-brown/40">{tx.form.hint}</p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
