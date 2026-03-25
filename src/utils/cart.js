const CART_KEY = 'nagypro_cart'

export function getCart() {
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event('storage'))
  return cart
}

export function addToCart(product) {
  const cart = getCart()
  const existing = cart.find(item => item.id === product.id)
  if (existing) {
    existing.quantity += (product.quantity || 1)
  } else {
    cart.push({ ...product, quantity: product.quantity || 1 })
  }
  return saveCart(cart)
}

export function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id)
  return saveCart(cart)
}

export function updateQuantity(id, quantity) {
  const cart = getCart()
  const item = cart.find(item => item.id === id)
  if (item) {
    item.quantity = Math.max(0, quantity)
    if (item.quantity === 0) return removeFromCart(id)
  }
  return saveCart(cart)
}

export function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

export function getCartCount(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

export function clearCart() {
  return saveCart([])
}
