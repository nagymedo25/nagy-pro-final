import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getGames, getGenres } from '../utils/api'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'

function Products({ setCart, cart }) {
  const { lang } = useApp()
  const t = translations[lang].products
  const [searchParams, setSearchParams] = useSearchParams()
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [genres, setGenres] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '')
  const [ordering, setOrdering] = useState('-rating')

  useEffect(() => {
    getGenres().then(data => setGenres(data.results || []))
  }, [])

  useEffect(() => {
    setLoading(true); setError(null)
    getGames({ search, page, genre: selectedGenre, ordering, pageSize: 12 })
      .then(data => { setGames(data.results || []); setTotalPages(Math.ceil((data.count || 0) / 12)) })
      .catch(() => setError('Failed to load games.'))
      .finally(() => setLoading(false))
  }, [search, page, selectedGenre, ordering])

  useEffect(() => {
    const s = searchParams.get('search') || ''
    setSearch(s); setSearchInput(s); setPage(1)
  }, [searchParams])

  function handleSearch(e) {
    e.preventDefault()
    setSearch(searchInput); setPage(1)
    setSearchParams(searchInput ? { search: searchInput } : {})
  }

  const orderOptions = [
    { value: '-rating', label: t.popularity },
    { value: '-released', label: t.newest },
    { value: 'name', label: t.nameAZ },
    { value: '-metacritic', label: t.metacritic },
  ]

  return (
    <main className="pt-32 pb-24 px-8 max-w-[1440px] mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-on-surface">{t.title}</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-outline-variant/15 pb-8">
          <p className="text-on-surface-variant max-w-xl text-lg">{t.subtitle}</p>
          <div className="flex items-center gap-4">
            <span className="text-[0.6875rem] uppercase tracking-[0.1em] font-medium text-outline">{t.sortBy}</span>
            <select value={ordering} onChange={e => { setOrdering(e.target.value); setPage(1) }} className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-semibold text-on-surface border-none focus:ring-1 focus:ring-primary outline-none cursor-pointer">
              {orderOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          <form onSubmit={handleSearch}>
            <h3 className="text-[0.6875rem] font-black uppercase tracking-[0.2em] text-primary mb-4">Search</h3>
            <div className="flex items-center bg-surface-container-lowest rounded-lg px-3 py-2 border border-outline-variant/15">
              <span className="material-symbols-outlined text-outline mr-2" style={{ fontSize: '16px' }}>search</span>
              <input value={searchInput} onChange={e => setSearchInput(e.target.value)} className="bg-transparent outline-none text-sm text-on-surface placeholder:text-outline/50 flex-1" placeholder={t.search} type="text" />
            </div>
            <button type="submit" className="mt-2 w-full py-2 bg-primary-container text-on-primary-fixed text-xs font-bold uppercase tracking-widest rounded-lg hover:brightness-110 transition-all">{t.searchBtn}</button>
          </form>

          <section>
            <h3 className="text-[0.6875rem] font-black uppercase tracking-[0.2em] text-primary mb-6">{t.category}</h3>
            <ul className="space-y-3">
              <li><button onClick={() => { setSelectedGenre(''); setPage(1) }} className={`text-sm font-medium transition-colors ${selectedGenre === '' ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>{t.allGames}</button></li>
              {genres.slice(0, 8).map(g => (
                <li key={g.id}><button onClick={() => { setSelectedGenre(g.slug); setPage(1) }} className={`text-sm font-medium transition-colors ${selectedGenre === g.slug ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>{g.name}</button></li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-[0.6875rem] font-black uppercase tracking-[0.2em] text-primary mb-6">{t.platform}</h3>
            <div className="grid grid-cols-2 gap-2">
              {['PC', 'PS5', 'Xbox', 'Switch'].map(p => (
                <button key={p} className="bg-surface-container-high text-on-surface font-bold text-[0.625rem] py-2 rounded uppercase tracking-wider hover:bg-surface-bright transition-colors">{p}</button>
              ))}
            </div>
          </section>
        </aside>

        <div className="flex-1">
          {error && <div className="text-error text-center py-16 font-semibold">{error}</div>}

          {!loading && !error && games.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-6">search_off</span>
              <h2 className="text-2xl font-semibold mb-2 text-on-surface">{t.noResults}</h2>
              <p className="text-on-surface-variant mb-8 max-w-xs">{t.noResultsDesc}</p>
              <button onClick={() => { setSearch(''); setSearchInput(''); setSelectedGenre(''); setPage(1) }} className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-semibold rounded-lg">
                {t.clearFilters}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {loading ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />) : games.map(g => <ProductCard key={g.id} game={g} setCart={setCart} />)}
          </div>

          {!loading && totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 text-outline hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                <button key={i + 1} onClick={() => setPage(i + 1)} className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${page === i + 1 ? 'bg-primary text-on-primary-fixed' : 'text-outline hover:bg-surface-container-high'}`}>{i + 1}</button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/20 text-outline hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Products
