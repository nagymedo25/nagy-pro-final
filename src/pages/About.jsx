import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'

function About() {
  const { lang } = useApp()
  const t = translations[lang].about

  return (
    <main className="pt-20">
      <section className="relative h-[716px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface z-10"></div>
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm2MI24VNifgCBuarWRDZ3bjUxtw66q0D8bcZUq1Hw_Ucfvh8Wz6p85UiGmSNYPvfOBaoYpzNmw_8FxLaxk1K5GTQKABvXl0qYB8bdWRoCdejQNmzi7i8UMDarj5kYQoCLPus7LE3cOduP26fqdk6E1AbCfRUq0lJAJdq_yGsPE9k1Kr2-ba8Uokdsp3nSpm6rY6FKm4wIKlaSDKQSFZGY30DruBKUbdrll7cnidsWm2f4NgmJmeGXmtt5v49WNT7_ybcCax-XrWGE"
          alt="Gaming lounge"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-8 text-center">
          <span className="uppercase tracking-[0.2em] text-secondary mb-4 font-bold text-sm">{t.badge}</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-on-surface mb-6 max-w-4xl">{t.title}</h1>
          <p className="text-xl text-on-surface-variant max-w-2xl font-light">{t.desc}</p>
        </div>
      </section>

      <section className="py-32 px-8 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-primary">{t.mission}</h2>
            <p className="text-2xl leading-relaxed text-on-surface font-light">{t.missionText}</p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="text-4xl font-black text-secondary mb-2">0.1ms</div>
                <div className="text-xs uppercase tracking-widest text-outline">{t.response}</div>
              </div>
              <div>
                <div className="text-4xl font-black text-secondary mb-2">24/7</div>
                <div className="text-xs uppercase tracking-widest text-outline">{t.support}</div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-secondary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="aspect-square bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/10">
              <img
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT5b1UXRF3hiF0nK3WUxr_CbHHEv7o2AcRCHjCuD0UjtcUGAby8eo4sqfnFpusoUi49jIJG6Hc11neC-4UJ0UjKwNKnJnUceYwZLVepLtJjEDU2lSfMCCVj_yoXpmvg2-01IQT5ZdXpzURTtsOB-cndjAQgEYF2-_3mmjOjZHIBD2hUZO8euuoNUC1Ls_EF9pJB2neJcIXYtR5oNaozxUMyvXJYgVUz3cgv9Lh_8bV-1W1z-ZNQp-YIOz9_qc54gM-7KVIW8o5fRF-"
                alt="GPU detail"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 text-center">
        <h2 className="text-3xl font-black tracking-tighter mb-6 text-on-surface">{t.ready}</h2>
        <p className="text-on-surface-variant mb-8 max-w-md mx-auto">{t.readyDesc}</p>
        <Link to="/products" className="inline-block px-12 py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-black uppercase tracking-widest rounded-lg hover:brightness-110 active:scale-[0.98] transition-all">
          {t.enter}
        </Link>
      </section>
    </main>
  )
}

export default About
