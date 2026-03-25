import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import { getCartCount } from '../utils/cart'

function Navbar({ cart }) {
  const { lang, toggleLang } = useApp()
  const t = translations[lang]
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const cartCount = getCartCount(cart)

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/products', label: t.nav.games },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ]

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMobileOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131317]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(103,0,181,0.06)]">
      <div className="flex justify-between items-center px-8 h-20 w-full mx-auto max-w-[1440px]">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a4e6ff] to-[#00d1ff] flex items-center justify-center shadow-[0_0_12px_rgba(0,209,255,0.4)] group-hover:shadow-[0_0_20px_rgba(0,209,255,0.6)] transition-all">
            <span className="text-[#001f28] font-black text-sm leading-none">N</span>
          </div>
          <span className="text-xl font-black tracking-[-0.03em] uppercase">
            <span className="text-[#A4E6FF]">NAGY</span><span className="text-[#00D1FF]">-PRO</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center font-semibold tracking-tight text-sm">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#A4E6FF] border-b-2 border-[#00D1FF] pb-1'
                  : 'text-[#E4E1E7] opacity-70 hover:text-[#00D1FF] hover:opacity-100 transition-all duration-300'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-surface-container-lowest px-4 py-2 rounded-lg border-b border-transparent focus-within:border-primary-container transition-all">
            <span className="material-symbols-outlined text-outline mr-2" style={{ fontSize: '16px' }}>search</span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xs tracking-widest uppercase text-on-surface-variant placeholder:opacity-50 outline-none w-36"
              placeholder={t.nav.search}
              type="text"
            />
          </form>

          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-outline-variant/10 border border-outline-variant/15 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all text-xs font-bold uppercase tracking-widest"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          <Link to="/cart" className="relative text-[#E4E1E7] opacity-70 hover:text-[#00D1FF] hover:opacity-100 active:scale-95 transition-all">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#00D1FF] text-[#001f28] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#E4E1E7] opacity-70 hover:text-[#00D1FF] hover:opacity-100 transition-all"
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#131317]/95 backdrop-blur-xl border-t border-outline-variant/20 px-8 py-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#A4E6FF] font-semibold uppercase tracking-widest text-sm'
                  : 'text-[#E4E1E7]/70 font-semibold uppercase tracking-widest text-sm hover:text-[#00D1FF] transition-colors'
              }
            >
              {link.label}
            </NavLink>
          ))}
          <form onSubmit={handleSearch} className="flex items-center bg-surface-container-lowest px-4 py-2 rounded-lg mt-2">
            <span className="material-symbols-outlined text-outline mr-2" style={{ fontSize: '16px' }}>search</span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xs tracking-widest uppercase text-on-surface-variant placeholder:opacity-50 outline-none flex-1"
              placeholder={t.nav.search}
              type="text"
            />
          </form>
          <div className="flex gap-3 pt-2">
            <button onClick={toggleLang} className="flex-1 py-2 rounded-lg bg-outline-variant/10 border border-outline-variant/15 text-on-surface-variant text-xs font-bold uppercase tracking-widest hover:text-primary transition-all">
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
