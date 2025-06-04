// This matches what the API actually returns
export type APIProduct = {
  id: number
  name: string
  description: string
  price: string  // e.g. "£2"
  available: number
  img: string
  type: string
}

// This is the normalized version used across the app
export type Product = {
  id: string       // use string for consistency in Zustand
  title: string
  description: string
  price: number
  stock: number
  image: string
  category: string
}

