import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'

function Contact() {
  const { lang } = useApp()
  const t = translations[lang].contact
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <main className="pt-32 pb-24 px-8 max-w-[1440px] mx-auto min-h-screen">
      <h1 className="text-4xl font-black tracking-tighter mb-3 uppercase">{t.title}</h1>
      <p className="text-on-surface-variant mb-16 max-w-lg text-base">{t.desc}</p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 bg-surface-container-high p-12 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 start-0 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-60"></div>

          {sent && (
            <div className="mb-8 px-6 py-4 bg-primary/10 border border-primary/30 rounded-lg text-primary font-semibold text-sm">
              {t.sent}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="relative">
              <input
                name="name" value={form.name} onChange={handleChange} required
                id="c-name" placeholder=" " type="text"
                className="peer w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-4 px-0 text-lg outline-none text-on-surface"
              />
              <label htmlFor="c-name" className="absolute start-0 top-4 text-outline-variant uppercase text-xs tracking-widest transition-all peer-focus:-top-4 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4">
                {t.name}
              </label>
            </div>
            <div className="relative">
              <input
                name="email" value={form.email} onChange={handleChange} required
                id="c-email" placeholder=" " type="email"
                className="peer w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-4 px-0 text-lg outline-none text-on-surface"
              />
              <label htmlFor="c-email" className="absolute start-0 top-4 text-outline-variant uppercase text-xs tracking-widest transition-all peer-focus:-top-4 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4">
                {t.email}
              </label>
            </div>
            <div className="relative">
              <textarea
                name="message" value={form.message} onChange={handleChange} required
                id="c-message" placeholder=" " rows="4"
                className="peer w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-4 px-0 text-lg resize-none outline-none text-on-surface"
              />
              <label htmlFor="c-message" className="absolute start-0 top-4 text-outline-variant uppercase text-xs tracking-widest transition-all peer-focus:-top-4 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-4">
                {t.message}
              </label>
            </div>

            <button type="submit" className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-black uppercase tracking-widest rounded-lg hover:shadow-[0_0_30px_rgba(0,209,255,0.4)] transition-all active:scale-[0.98]">
              {t.send}
            </button>
          </form>
        </div>

        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="rounded-xl overflow-hidden border border-outline-variant/15 h-64 relative">
            <iframe
              title="Cairo Egypt Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=31.0,30.0,31.6,30.3&layer=mapnik&marker=30.0444,31.2357"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.85)' }}
              loading="lazy"
            />
            <div className="absolute bottom-3 start-1/2 -translate-x-1/2 bg-surface-container-high/90 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface whitespace-nowrap">Cairo, Egypt</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-primary-fixed" style={{ fontSize: '18px' }}>person</span>
              </div>
              <div>
                <div className="text-[0.6875rem] uppercase tracking-widest text-outline mb-1">{t.developer}</div>
                <div className="text-on-surface font-semibold">{t.developerValue}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 border border-outline-variant/15">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>location_on</span>
              </div>
              <div>
                <div className="text-[0.6875rem] uppercase tracking-widest text-outline mb-1">{t.location}</div>
                <div className="text-on-surface font-semibold">{t.locationValue}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 border border-outline-variant/15">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>language</span>
              </div>
              <div>
                <div className="text-[0.6875rem] uppercase tracking-widest text-outline mb-1">{t.website}</div>
                <a href="https://nagy-pro.dev" target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline">
                  {t.websiteValue}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact
