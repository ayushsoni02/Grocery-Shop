// src/pages/Home.tsx
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import type { APIProduct, Product } from '../types/product'
// import { useCartStore } from '../store/cartStore'


// type Product = {
//   id: string
//   title: string
//   description: string
//   price: number
//   stock: number
//   image: string
//   category: string
// }

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

 useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(`https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=${category}`)
    const rawData: APIProduct[] = await res.json()

    const normalized: Product[] = rawData.map(item => ({
      id: item.id.toString(), // make sure it's a string
      title: item.name,
      description: item.description,
      price: parseFloat(item.price.replace(/[£₹$]/g, '')),
      stock: item.available,
      image: item.img,
      category: item.type
    }))

    setProducts(normalized)
  }
  fetchData()
}, [category])



  const filteredProducts = products.filter(p =>
  p.title?.toLowerCase().includes(search.toLowerCase())
)



  return (
    <div className="p-6 max-w-7xl mx-auto">
        {/* <Link to="/checkout" className="bg-blue-600 text-white px-4 py-2 rounded">
  Go to Checkout
    </Link> */}
      <h1 className="text-2xl font-bold mb-4">Groceries</h1>
      <input
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border px-4 py-2 rounded w-full mb-4"
      />
      <div className="flex gap-3 mb-4">
        {['all', 'drinks', 'fruit', 'bakery'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full ${
              category === cat ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            {cat[0].toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home
