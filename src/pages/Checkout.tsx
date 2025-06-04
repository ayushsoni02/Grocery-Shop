// src/pages/Checkout.tsx
import { useCartStore } from '../store/cartStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const navigate = useNavigate()
    const cart = useCartStore(state => state.cart)
    const updateQuantity = useCartStore(state => state.updateQuantity)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const getSubtotal = useCartStore(state => state.getSubtotal)
    const getDiscount = useCartStore(state => state.getDiscount)

    const [subtotal, setSubtotal] = useState(0)
    const [discount, setDiscount] = useState(0)

    useEffect(() => {
        setSubtotal(getSubtotal())
        setDiscount(getDiscount())
    }, [cart, getSubtotal, getDiscount])

    const handleCheckout = () => {
        // Optionally clear the cart here
        // useCartStore.setState({ cart: [] })
        navigate('/success')
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div
                            key={item.id + (item.isFree ? '-free' : '')}
                            className="flex items-center justify-between bg-white shadow p-4 rounded mb-4"
                        >
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                                <div>
                                    <div className="font-semibold">{item.title}</div>
                                    <div className="text-sm text-gray-500">Product code: {item.id}</div>
                                    {!item.isFree && item.stock < 10 && (
                                        <div className="text-orange-500 text-xs">Only {item.stock} left</div>
                                    )}
                                    {item.isFree && (
                                        <div className="text-green-600 text-xs italic flex items-center gap-1">
                                            <span>🎁</span> <span>Free Item (Offer Applied)</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {!item.isFree && (
                                <div className="flex items-center gap-3">
                                    <button
                                        className="px-2 bg-red-500 text-white rounded"
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}  // Decrease qty
                                    >
                                        −
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="px-2 bg-green-500 text-white rounded"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}  // Increase qty
                                    >
                                        +
                                    </button>
                                </div>
                            )}

                            <div className="font-semibold">£{(item.price * item.quantity).toFixed(2)}</div>

                            <button
                                onClick={() => removeFromCart(item.id)}  // Remove item from cart
                                className="text-red-500 hover:text-red-700 text-xl"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    <div className="bg-white rounded p-4 shadow mt-6">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>£{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2 text-green-600">
                            <span>Discount</span>
                            <span>−£{discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>£{(subtotal - discount).toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Checkout


