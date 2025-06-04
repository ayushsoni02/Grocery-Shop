import { useCartStore } from '../store/cartStore'
import type { Product } from '../types/product'


const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore(state => state.addToCart)

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2">
      <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto" />
      <div className="font-semibold text-lg">{product.title}</div>
      <div className="text-sm text-gray-500">{product.description}</div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xl font-bold">£{product.price.toFixed(2)}</div>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>
      <div className="mt-1 text-sm">
        {product.stock >= 10 ? (
          <span className="text-green-600">Available</span>
        ) : (
          <span className="text-orange-500">Only {product.stock} left</span>
        )}
      </div>
    </div>
  )
}




export default ProductCard
