import React, { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa';
import { Heart, ShoppingBag, CheckCircle, Maximize2 } from 'lucide-react';
import { useCart } from '../Hooks/Hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

const StarGen = (starNumber) => {
    const starArray = [];
    const totalStars = 5;

    for (let i = 0; i < totalStars; i++) {
        starArray.push(
            <FaStar
                key={i}
                color={i < starNumber ? "#ffc107" : "#e4e5e9"}
                className="mr-1"
                size={20}
            />
        );
    }
    return starArray;
}

const reviewsGen = (reviews) => {
    return reviews.map((review, index) => (
        <div key={index} className='mt-3 p-3 border-b border-gray-100 last:border-b-0'>
            <div className="flex items-center mb-1">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-2">
                    {review.name[0]}
                </div>
                <span className='font-semibold text-gray-800'>{review.name}</span>
            </div>
            <p className="text-gray-600 ml-10">{review.comment}</p>
        </div>
    ));
};

const ProductDetails = ({
    productName,
    productPrice,
    onAddToCart,
    ID,
    views,
    fullDesc,
    numberStars,
    reviews,
    sold,
    onImageClick,
    productImages = []
}) => {
    const { toggleFavorite, isProductFavorite, selectedSize, handleSizeSelect } = useCart();
    const product = { id: ID, name: productName, price: productPrice };
    const isFavorite = isProductFavorite(ID);
    const [mainImg, setMainImg] = useState(`../assets/img${ID}.jpg`);
    const [addedToCart, setAddedToCart] = useState(false);

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const displayImages = productImages && productImages.length > 0 
        ? productImages 
        : [`../assets/img${ID}.jpg`];

    const handleAddToCart = () => {
        const productWithSize = {
            ...product,
            selectedSize: selectedSize
        };
        
        onAddToCart(productWithSize);
        
        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
        }, 2000);
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-full lg:w-3/5">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-xl overflow-hidden mb-4 border-2 border-indigo-100 shadow-md"
                    >
                        <Swiper
                            effect={'cube'}
                            grabCursor={true}
                            cubeEffect={{
                                shadow: true,
                                slideShadows: true,
                                shadowOffset: 20,
                                shadowScale: 0.94,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[EffectCube, Pagination]}
                            className="product-detail-swiper"
                        >
                            {displayImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div 
                                        className="relative cursor-pointer group"
                                        onClick={() => onImageClick && onImageClick()}
                                    >
                                        <img
                                            src={img}
                                            alt={`${productName} - view ${index + 1}`}
                                            className="w-full h-auto object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full">
                                                <Maximize2 size={24} className="text-gray-800" />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                    
                    {displayImages.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {displayImages.map((img, index) => (
                                <motion.div 
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-16 h-16 border-2 rounded-md overflow-hidden cursor-pointer"
                                    onClick={() => setMainImg(img)}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full lg:w-2/5 space-y-6"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{productName}</h1>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {StarGen(numberStars)}
                                </div>
                                <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
                            </div>
                            <span className="text-sm text-gray-500">{views} views • {sold} sold</span>
                        </div>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-bold text-indigo-600"
                    >
                        {productPrice} DA
                        {productPrice >= 5000 && (
                            <span className="ml-2 text-sm text-green-600 font-normal bg-green-50 px-2 py-1 rounded-full">
                                Free Shipping
                            </span>
                        )}
                    </motion.div>
                    
                    <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Product Description</h3>
                        <p className="text-gray-600">{fullDesc}</p>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Select Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {sizes.map(size => (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={size}
                                    className={`h-10 w-10 rounded-md flex items-center justify-center border ${
                                        selectedSize === size 
                                            ? 'bg-indigo-600 text-white border-indigo-600' 
                                            : 'border-gray-300 text-gray-700 hover:border-indigo-400'
                                    } transition-colors`}
                                    onClick={() => handleSizeSelect(size)}
                                >
                                    {size}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex space-x-3"
                    >
                        <button
                            onClick={handleAddToCart}
                            className={`flex-grow py-3 px-4 flex items-center justify-center rounded-md font-semibold text-white transition-all duration-300 ${
                                addedToCart 
                                    ? 'bg-green-600'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
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
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleFavorite(product)}
                            className={`p-3 rounded-md border flex items-center justify-center ${
                                isFavorite 
                                    ? 'bg-red-50 border-red-200' 
                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            } transition-colors`}
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Heart 
                                fill={isFavorite ? "#ef4444" : "none"}
                                color={isFavorite ? "#ef4444" : "#71717a"}
                                size={24} 
                            />
                        </motion.button>
                    </motion.div>
                    
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center mb-2">
                            <div className="w-5 h-5 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm text-gray-600">In Stock</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-yellow-500 mr-2"></div>
                            <span className="text-sm text-gray-600">Ships within 24 hours</span>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Customer Reviews</h3>
                        <div className="max-h-60 overflow-y-auto pr-2 -mr-2">
                            {reviewsGen(reviews)}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetails;