import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGameById, getRelatedGames, getStablePrice } from '../utils/api'
import { addToCart } from '../utils/cart'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'
import StarRating from '../components/StarRating'
import ProductCard from '../components/ProductCard'

function ProductDetails({ setCart, cart }) {
  const { id } = useParams()
  const { lang } = useApp()
  const t = translations[lang].common
  const [game, setGame] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setLoading(true)
    Promise.all([getGameById(id), getRelatedGames(id)])
      .then(([g, r]) => {
        setGame(g)
        setRelated(r.results?.slice(0, 4) || [])
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="pt-40 text-center min-h-screen">
      <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!game) return <div className="pt-40 text-center min-h-screen">Game not found.</div>

  const price = getStablePrice(game)

  function handleAddToCart() {
    const item = { id: game.id, name: game.name, image: game.background_image, price: parseFloat(price), genre: game.genres?.[0]?.name || 'Game', quantity: qty }
    setCart(addToCart(item))
  }

  return (
    <main className="pt-32 pb-24 px-8 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div className="space-y-6">
          <div className="aspect-video rounded-2xl overflow-hidden bg-surface-container-high">
            <img src={game.background_image} alt={game.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {game.short_screenshots?.slice(1, 4).map((s, i) => (
              <div key={i} className="aspect-video rounded-xl overflow-hidden bg-surface-container-low">
                <img src={s.image} alt="screenshot" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex gap-2">
              {game.genres?.map(g => <span key={g.id} className="text-[0.625rem] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">{g.name}</span>)}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-on-surface">{game.name}</h1>
            <StarRating rating={game.rating} count={game.ratings_count} />
          </div>

          <div className="prose prose-invert max-w-none text-on-surface-variant text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: game.description }} />

          <div className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-widest text-outline block mb-1">Price</span>
                <span className="text-4xl font-black text-primary tracking-tighter">${price}</span>
              </div>
              <div className="flex items-center bg-surface-container-lowest rounded-lg p-1 border border-outline-variant/15">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined">remove</span></button>
                <span className="px-4 font-bold text-on-surface w-8 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined">add</span></button>
              </div>
            </div>
            <button onClick={handleAddToCart} className="w-full py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-black uppercase tracking-widest rounded-lg hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] transition-all active:scale-[0.98]">
              {t.addToCart}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-black tracking-tighter mb-12 uppercase">Related Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map(g => <ProductCard key={g.id} game={g} setCart={setCart} />)}
          </div>
        </section>
      )}
    </main>
  )
}

export default ProductDetails
