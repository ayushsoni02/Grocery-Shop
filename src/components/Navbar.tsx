import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

const Navbar = () => {
  const cart = useCartStore(state => state.cart)
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">🛒 Grocery Shop</Link>
      <Link to="/checkout" className="relative">
        <span>Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {itemCount}
          </span>
        )}
      </Link>
    </nav>
  )
}

export default Navbar