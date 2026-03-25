import { createContext, useContext, useState, useEffect } from 'react'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('nagypro_lang') || 'en')

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    localStorage.setItem('nagypro_lang', lang)
  }, [lang])

  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en')

  return (
    <AppContext.Provider value={{ lang, toggleLang }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
