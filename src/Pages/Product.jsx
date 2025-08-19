import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../Hooks/Hooks'
import NavBar from '../components/NavBar'
import { FaStar } from 'react-icons/fa'
import { Heart, ShoppingBag, CheckCircle, Maximize2 } from 'lucide-react'

const Product = () => {
  const { id } = useParams();
  console.log(id)
  const { handleAddToCart, toggleFavorite, isProductFavorite, selectedSize, handleSizeSelect, data } = useCart();
  const Products = data;
  const currentProduct = Products.find(product => product.specid === id);
  const [showFullImage, setShowFullImage] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const isFavorite = isProductFavorite(currentProduct);

  if (!currentProduct) {
    return (
      <div>
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const handleAddProductToCart = () => {
    const productWithSize = {
      ...currentProduct,
      selectedSize: selectedSize
    };

    handleAddToCart(productWithSize);

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i < rating ? "#ffc107" : "#e4e5e9"}
          className="mr-1"
          size={20}
        />
      );
    }
    return stars;
  };

  return (
    <div className="relative bg-white min-h-screen">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <nav className="flex mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-500 hover:text-indigo-600">Home</a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <a href="/products" className="text-gray-500 hover:text-indigo-600">Products</a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li className="font-medium text-indigo-600">{currentProduct.name}</li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <div className="relative">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 border-indigo-100 shadow-lg">
              <img
                src={`https://res.cloudinary.com/dvdvzl5r1/image/upload/v1755538855/${currentProduct.specid}.avif`}
                alt={currentProduct.name}
                className="w-full h-full object-center object-cover cursor-pointer"
                onClick={() => setShowFullImage(true)}
              />
              <button
                className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                onClick={() => setShowFullImage(true)}
                aria-label="View full image"
              >
                <Maximize2 size={18} className="text-gray-800" />
              </button>
            </div>
          </div>

          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full mb-4">
              {currentProduct.gender}
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{currentProduct.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-bold text-indigo-600">{currentProduct.price} DA</p>

              {currentProduct.price >= 5000 && (
                <span className="ml-2 text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                  Free Shipping
                </span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {renderStars(currentProduct.stars)}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {currentProduct.views} views • {currentProduct.sold} sold
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <div className="mt-2 text-base text-gray-700 space-y-6">
                <p>{currentProduct.fullDesc}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Size guide
                </a>
              </div>

              <div className="mt-3 grid grid-cols-6 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`
                      ${selectedSize === size
                        ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      } 
                      col-span-1 py-2 px-4 border rounded-md text-sm font-medium transition-colors
                    `}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex space-x-3">
              <button
                onClick={handleAddProductToCart}
                className={`
                  flex-grow py-3 px-6 flex items-center justify-center rounded-md font-medium text-white transition-colors
                  ${addedToCart
                    ? 'bg-green-600'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                  }
                `}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle className="mr-2" size={20} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2" size={20} />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={() => toggleFavorite(currentProduct)}
                className={`
                  p-3 rounded-md border flex items-center justify-center transition-colors
                  ${isFavorite
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }
                `}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  fill={isFavorite ? "#ef4444" : "none"}
                  color={isFavorite ? "#ef4444" : "#71717a"}
                  size={24}
                />
              </button>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">In Stock</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-600">Ships within 24 hours</span>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {showFullImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-pointer"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <img
              src={`https://res.cloudinary.com/dvdvzl5r1/image/upload/v1755538855/${currentProduct.specid}.avif`}
              alt={currentProduct.name}
              className="w-full h-full object-contain"
            />
            <button
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullImage(false);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product