import React from 'react'
import { useCart } from '../Hooks/Hooks'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'

const Favorites = () => {
  const { favorites, toggleFavorite, handleAddToCart } = useCart()

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 border-b pb-4">My Favorites</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto text-gray-300" size={64} />
            <p className="mt-4 text-xl text-gray-500">Your favorites list is empty</p>
            <Link to="/Products" className="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <Link to={`/Product/${product.id}`}>
                    <img 
                      src={`https://res.cloudinary.com/dvdvzl5r1/image/upload/v1755538855/${product.id}.jpg`} 
                      alt={product.name} 
                      className="w-full h-64 object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                  >
                    <Heart fill="#ef4444" color="#ef4444" size={20} />
                  </button>
                </div>
                
                <div className="p-4">
                  <Link to={`/Product/${product.id}`} className="text-lg font-semibold text-gray-900 hover:text-indigo-600">
                    {product.name}
                  </Link>
                  <p className="text-indigo-600 font-medium mt-1">{product.price} DA</p>
                  
                  <div className="mt-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites