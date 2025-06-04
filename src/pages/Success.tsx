import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">Thanks for shopping with us. Your groceries will arrive shortly.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Go Back to Home
      </Link>
    </div>
  )
}

export default Success
