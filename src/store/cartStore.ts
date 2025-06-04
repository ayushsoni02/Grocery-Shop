import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types/product'

type CartItem = Product & { quantity: number; isFree?: boolean }

type CartStore = {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, qty: number) => void
    getSubtotal: () => number
    getDiscount: () => number
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product) => {
                let cart = [...get().cart]
                const existing = cart.find(p => p.id === product.id && !p.isFree)

                if (existing) {
                    existing.quantity++
                } else {
                    cart.push({ ...product, quantity: 1 })
                }

                // === Coca-Cola Offer: Buy 6 get 1 free ===
                const coke = cart.find(p => p.title.includes('Coca-Cola') && !p.isFree)
                const cokeFreeIndex = cart.findIndex(p => p.title.includes('Coca-Cola') && p.isFree)
                if (coke && coke.quantity >= 6) {
                    if (cokeFreeIndex === -1) {
                        const freeCoke: CartItem = {
                            id: coke.id,
                            title: coke.title,
                            description: coke.description,
                            price: coke.price,
                            stock: coke.stock,
                            image: coke.image,
                            category: coke.category,
                            quantity: 1,
                            isFree: true
                        }
                        cart.push(freeCoke)
                    }
                } else {
                    if (cokeFreeIndex !== -1) {
                        cart.splice(cokeFreeIndex, 1)
                    }
                }

                // === Croissant Offer: Buy 3 get Coffee free ===
                const croissant = cart.find(p => p.title.toLowerCase().includes('croissant') && !p.isFree)
                const coffee = cart.find(p => p.title.toLowerCase().includes('coffee') && !p.isFree)
                const coffeeFreeIndex = cart.findIndex(p => p.title.toLowerCase().includes('coffee') && p.isFree)

                if (croissant && croissant.quantity >= 3 && coffee) {
                    if (coffeeFreeIndex === -1) {
                        const freeCoffee: CartItem = {
                            id: coffee.id,
                            title: coffee.title,
                            description: coffee.description,
                            price: coffee.price,
                            stock: coffee.stock,
                            image: coffee.image,
                            category: coffee.category,
                            quantity: 1,
                            isFree: true
                        }
                        cart.push(freeCoffee)
                    }
                }
                else {
                    if (coffeeFreeIndex !== -1) {
                        cart.splice(coffeeFreeIndex, 1)
                    }
                }

                set({ cart })
            },

            removeFromCart: (id: string) => {
                const cart = get().cart.filter(item => item.id !== id || item.isFree)
                set({ cart })
            },

            updateQuantity: (id: string, qty: number) => {
                let cart = get().cart.map(item =>
                    item.id === id && !item.isFree ? { ...item, quantity: qty } : item
                )

                // Re-run offer logic to update free items based on new quantity
                const coke = cart.find(p => p.title.includes('Coca-Cola') && !p.isFree)
                const cokeFreeIndex = cart.findIndex(p => p.title.includes('Coca-Cola') && p.isFree)
                if (coke && coke.quantity >= 6) {
                    if (cokeFreeIndex === -1) {
                        const freeCoke: CartItem = {
                            id: coke.id,
                            title: coke.title,
                            description: coke.description,
                            price: coke.price,
                            stock: coke.stock,
                            image: coke.image,
                            category: coke.category,
                            quantity: 1,
                            isFree: true
                        }
                        cart.push(freeCoke)
                    }
                } else {
                    if (cokeFreeIndex !== -1) {
                        cart.splice(cokeFreeIndex, 1)
                    }
                }

                const croissant = cart.find(p => p.title.toLowerCase().includes('croissant') && !p.isFree)
                const coffee = cart.find(p => p.title.toLowerCase().includes('coffee') && !p.isFree)
                const coffeeFreeIndex = cart.findIndex(p => p.title.toLowerCase().includes('coffee') && p.isFree)

                if (croissant && croissant.quantity >= 3 && coffee) {
                    if (coffeeFreeIndex === -1) {
                        const freeCoffee: CartItem = {
                            id: coffee.id,
                            title: coffee.title,
                            description: coffee.description,
                            price: coffee.price,
                            stock: coffee.stock,
                            image: coffee.image,
                            category: coffee.category,
                            quantity: 1,
                            isFree: true
                        }
                        cart.push(freeCoffee)
                    }
                }
                else {
                    if (coffeeFreeIndex !== -1) {
                        cart.splice(coffeeFreeIndex, 1)
                    }
                }

                set({ cart })
            },

            getSubtotal: () => get().cart.reduce((sum, item) => {
                if (item.isFree) return sum
                return sum + item.price * item.quantity
            }, 0),

            getDiscount: () => {
                const cart = get().cart
                let discount = 0

                const cocaColaItems = cart.find(i => i.title.includes('Coca-Cola'))
                if (cocaColaItems && cocaColaItems.quantity >= 6) {
                    discount += cocaColaItems.price
                }

                const croissantItems = cart.find(i => i.title.toLowerCase().includes('croissant'))
                const coffeeItems = cart.find(i => i.title.toLowerCase().includes('coffee'))
                if (croissantItems && croissantItems.quantity >= 3 && coffeeItems) {
                    discount += coffeeItems.price
                }

                return discount
            }
        }),
        {
            name: 'grocery-cart-storage', // localStorage key
        }
    )
)
