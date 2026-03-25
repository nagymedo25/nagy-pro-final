import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import { getCart } from './utils/cart'

function App() {
  const [cart, setCart] = useState(getCart())

  useEffect(() => {
    const handleStorage = () => setCart(getCart())
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen font-body">
          <Navbar cart={cart} />
          <Routes>
            <Route path="/" element={<Home setCart={setCart} />} />
            <Route path="/products" element={<Products setCart={setCart} cart={cart} />} />
            <Route path="/products/:id" element={<ProductDetails setCart={setCart} cart={cart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
