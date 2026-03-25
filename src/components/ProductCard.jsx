import { Link } from 'react-router-dom'
import StarRating from './StarRating'
import { addToCart } from '../utils/cart'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'

function ProductCard({ game, setCart }) {
  const { lang } = useApp()
  const t = translations[lang].common
  const price = game.price || (game.metacritic ? (game.metacritic * 0.7).toFixed(2) : (Math.random() * 50 + 19.99).toFixed(2))
  const image = game.background_image || 'https://via.placeholder.com/400x533?text=No+Image'
  const rating = game.rating || 0
  const ratingsCount = game.ratings_count || 0
  const genres = game.genres?.map(g => g.name).join(' / ') || 'Action'
  const isRare = game.metacritic && game.metacritic >= 90

  function handleAddToCart(e) {
    e.preventDefault()
    const item = { id: game.id, name: game.name, image, price: parseFloat(price), genre: genres }
    const newCart = addToCart(item)
    setCart(newCart)
  }

  return (
    <Link to={`/products/${game.id}`} className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,209,255,0.08)] hover:-translate-y-2">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={image} alt={game.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {isRare && (
          <div className="absolute top-4 start-4">
            <span className="bg-secondary-container text-on-secondary-container text-[0.625rem] font-black px-2 py-1 rounded uppercase tracking-[0.15em] glass-panel">Rare</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <StarRating rating={rating} count={ratingsCount} />
        <h3 className="text-lg font-bold tracking-tight text-on-surface mb-1 mt-2 group-hover:text-primary transition-colors line-clamp-1">{game.name}</h3>
        <p className="text-[0.6875rem] text-outline uppercase tracking-widest mb-4 line-clamp-1">{genres}</p>
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant/10">
          <span className="text-xl font-black text-primary-container tracking-tighter">${parseFloat(price).toFixed(2)}</span>
          <button onClick={handleAddToCart} className="bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed p-2 rounded-lg hover:brightness-110 active:scale-95 transition-all" title={t.addToCart}>
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
