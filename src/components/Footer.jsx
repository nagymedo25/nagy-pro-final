import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'

function Footer() {
  const { lang } = useApp()
  const t = translations[lang].footer

  return (
    <footer className="w-full py-16 px-8 mt-24 bg-[#0E0E12] border-t border-[#3C494E]/15">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-[1440px] mx-auto">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a4e6ff] to-[#00d1ff] flex items-center justify-center">
              <span className="text-[#001f28] font-black text-sm">N</span>
            </div>
            <span className="text-lg font-black tracking-[-0.03em] uppercase">
              <span className="text-[#A4E6FF]">NAGY</span><span className="text-[#00D1FF]">-PRO</span>
            </span>
          </Link>
          <p className="text-[#E4E1E7]/60 text-[0.6875rem] uppercase tracking-[0.1em] font-medium leading-relaxed max-w-xs">
            {t.desc}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-[#00D1FF] font-black text-xs tracking-widest uppercase">{t.navigate}</h4>
          <ul className="space-y-3">
            <li><Link to="/products" className="text-[#E4E1E7]/60 text-[0.6875rem] uppercase tracking-[0.1em] hover:text-[#00D1FF] transition-colors">{translations[lang].nav.games}</Link></li>
            <li><Link to="/about" className="text-[#E4E1E7]/60 text-[0.6875rem] uppercase tracking-[0.1em] hover:text-[#00D1FF] transition-colors">{translations[lang].nav.about}</Link></li>
            <li><Link to="/contact" className="text-[#E4E1E7]/60 text-[0.6875rem] uppercase tracking-[0.1em] hover:text-[#00D1FF] transition-colors">{translations[lang].nav.contact}</Link></li>
            <li><Link to="/cart" className="text-[#E4E1E7]/60 text-[0.6875rem] uppercase tracking-[0.1em] hover:text-[#00D1FF] transition-colors">{translations[lang].nav.cart}</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[#00D1FF] font-black text-xs tracking-widest uppercase">{t.legals}</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-[#E4E1E7]/60 text-[0.6875rem] uppercase tracking-[0.1em] hover:text-[#00D1FF] transition-colors">{t.privacy}</a></li>
            <li><a href="#" className="text-[#E4E1E7]/60 text-[0.6875rem] uppercase tracking-[0.1em] hover:text-[#00D1FF] transition-colors">{t.terms}</a></li>
            <li><a href="#" className="text-[#E4E1E7]/60 text-[0.6875rem] uppercase tracking-[0.1em] hover:text-[#00D1FF] transition-colors">{t.shipping}</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-[#00D1FF] font-black text-xs tracking-widest uppercase">{t.support}</h4>
          <ul className="space-y-3">
            <li><Link to="/contact" className="text-[#E4E1E7]/60 text-[0.6875rem] uppercase tracking-[0.1em] hover:text-[#00D1FF] transition-colors">{t.support}</Link></li>
          </ul>
          <div className="mt-6 pt-4 border-t border-[#3C494E]/20">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-[#a4e6ff] to-[#00d1ff] flex items-center justify-center">
                <span className="text-[#001f28] font-black text-[8px]">N</span>
              </div>
              <span className="text-[#00D1FF]/80 text-[0.625rem] font-bold uppercase tracking-widest">Mahmoud Nagy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-[#3C494E]/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[#E4E1E7]/40 text-[0.6875rem] uppercase tracking-[0.1em]">{t.copyright}</span>
        <div className="flex items-center gap-2 text-[#E4E1E7]/30">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-[#a4e6ff]/30 to-[#00d1ff]/30 flex items-center justify-center">
            <span className="text-[#A4E6FF] font-black text-[7px]">N</span>
          </div>
          <span className="text-[0.625rem] uppercase tracking-widest">NAGY-PRO</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
