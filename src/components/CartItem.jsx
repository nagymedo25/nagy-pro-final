import { removeFromCart, updateQuantity } from '../utils/cart'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'

function CartItem({ item, setCart }) {
  const { lang } = useApp()
  const t = translations[lang].common

  function handleRemove() { setCart(removeFromCart(item.id)) }
  function handleIncrease() { setCart(updateQuantity(item.id, item.quantity + 1)) }
  function handleDecrease() { setCart(updateQuantity(item.id, item.quantity - 1)) }

  return (
    <div className="group relative flex flex-col md:flex-row items-center gap-8 bg-surface-container-low p-6 rounded-lg transition-all duration-300 hover:bg-surface-container-high shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
      <div className="w-full md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container-lowest">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-grow flex flex-col justify-between py-2 w-full">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-on-surface tracking-tight">{item.name}</h3>
            <button onClick={handleRemove} className="text-outline-variant hover:text-error transition-colors ms-4">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
          <p className="text-on-surface-variant text-[0.6875rem] uppercase tracking-[0.1em] mt-1">{item.genre}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between mt-8">
          <div className="flex items-center bg-surface-container-lowest rounded-lg p-1 border border-outline-variant/15">
            <button onClick={handleDecrease} className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>remove</span>
            </button>
            <span className="px-4 font-mono font-medium text-on-surface w-8 text-center">{String(item.quantity).padStart(2, '0')}</span>
            <button onClick={handleIncrease} className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            </button>
          </div>
          <div className="text-2xl font-bold text-primary tracking-tighter">${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
