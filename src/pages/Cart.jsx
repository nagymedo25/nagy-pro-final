import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { getCartTotal } from '../utils/cart'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'

function Cart({ cart, setCart }) {
  const { lang } = useApp()
  const t = translations[lang].cart
  const subtotal = getCartTotal(cart)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  if (cart.length === 0) {
    return (
      <main className="pt-32 pb-24 px-8 max-w-[1440px] mx-auto min-h-screen">
        <h1 className="text-[3.5rem] font-semibold tracking-tighter text-on-surface leading-none mb-2">{t.title}</h1>
        <p className="text-on-surface-variant text-[0.6875rem] uppercase tracking-[0.1em] mb-16">{t.subtitle}</p>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-6">shopping_bag</span>
          <h2 className="text-2xl font-semibold mb-2 text-on-surface">{t.emptyTitle}</h2>
          <p className="text-on-surface-variant mb-8 max-w-xs">{t.emptyDesc}</p>
          <Link to="/products" className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-semibold rounded-lg hover:brightness-110 transition-all">{t.explore}</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-24 px-8 max-w-[1440px] mx-auto">
      <div className="mb-12">
        <h1 className="text-[3.5rem] font-semibold tracking-tighter text-on-surface leading-none mb-2">{t.title}</h1>
        <p className="text-on-surface-variant text-[0.6875rem] uppercase tracking-[0.1em]">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          {cart.map(item => <CartItem key={item.id} item={item} setCart={setCart} />)}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-32 p-8 bg-surface-container-high rounded-lg shadow-[0_40px_60px_rgba(103,0,181,0.06)] border border-outline-variant/10">
            <h2 className="text-lg font-black text-primary uppercase tracking-widest mb-8">{t.summary}</h2>
            <div className="space-y-6 mb-8">
              <div className="flex justify-between text-sm uppercase tracking-wider font-medium text-on-surface-variant">
                <span>{t.subtotal}</span><span className="text-on-surface font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm uppercase tracking-wider font-medium text-on-surface-variant">
                <span>{t.shipping}</span><span className="text-on-surface font-mono">{t.free}</span>
              </div>
              <div className="flex justify-between text-sm uppercase tracking-wider font-medium text-on-surface-variant">
                <span>{t.tax}</span><span className="text-on-surface font-mono">${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-8 border-t border-outline-variant/20 mb-10">
              <div className="flex justify-between items-end">
                <span className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-on-surface-variant">{t.total}</span>
                <span className="text-3xl font-black text-on-surface tracking-tighter font-mono">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-4">
              <Link to="/checkout" className="block w-full py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold rounded-lg uppercase tracking-widest text-center shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all">{t.checkout}</Link>
              <Link to="/products" className="block w-full py-4 bg-transparent border border-outline-variant/30 text-on-surface font-semibold rounded-lg uppercase text-[0.6875rem] tracking-widest text-center hover:bg-surface-container-highest transition-colors">{t.continue}</Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4 text-outline-variant/60">
              <span className="material-symbols-outlined text-xl">encrypted</span>
              <span className="text-[0.6875rem] font-medium uppercase tracking-widest">{t.secure}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cart
