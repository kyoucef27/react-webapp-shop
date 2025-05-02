import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Hooks/Hooks';
import { Heart, ShoppingBag, Eye, TrendingUp, Maximize2 } from 'lucide-react';
import data from './data';
import { motion } from 'framer-motion';

const Card = ({ 
    productName, 
    productPrice, 
    ProductDisc, 
    ID, 
    onAddToCart, 
    ProductNumber, 
    imgLink, 
    views, 
    FullDesc, 
    starNumber, 
    onQuickView,
    onToggleCompare,
    isInCompare 
}) => {
    const navigate = useNavigate();
    const { toggleFavorite, isProductFavorite } = useCart();
    const product = { id: ID, name: productName, price: productPrice, desc: ProductDisc };
    const isFavorite = isProductFavorite(ID);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const updateViews = (id) => {
        const currentViews = parseInt(localStorage.getItem(`product_${id}_views`)) || views;
        const newViews = currentViews + 1;
        localStorage.setItem(`product_${id}_views`, newViews);
        console.log(`Views updated for product ${id}: ${newViews}`);
        const productIndex = data.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            data[productIndex].views = newViews;
        }
    }

    const goToProduct = () => {
        navigate(`/product/${ID}`);
    }

    const checkLess10 = (views) => {
        if (views < 10) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleClick = (ID) => {
        goToProduct();
        updateViews(ID)
    }

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <div 
                    onClick={() => handleClick(ID)}
                    className="cursor-pointer w-full h-full"
                >
                    <div className={`absolute inset-0 bg-gray-200 ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>
                    <img
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                        src={`../assets/img${ID}.jpg`}
                        alt={productName}
                        style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>

                <div 
                    className={`absolute inset-0 bg-black/5 flex items-center justify-center ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-300 pointer-events-none`}
                >
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-20"></div>
                </div>

                {/* Quick View Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onQuickView && onQuickView();
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-md shadow-lg text-sm font-medium flex items-center z-20"
                >
                    <Maximize2 size={16} className="mr-1" />
                    Quick View
                </motion.button>

                <div className="absolute top-0 left-0 p-2 flex flex-col gap-2">
                    {checkLess10(views) && (
                        <div className="bg-red-500 text-white px-3 py-1 text-xs font-medium rounded-full shadow-md flex items-center">
                            <TrendingUp size={14} className="mr-1" />
                            New Arrival
                        </div>
                    )}
                    {productPrice >= 10000 && (
                        <div className="bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-full shadow-md">
                            Free Shipping
                        </div>
                    )}
                </div>

                <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product);
                        }}
                        className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all z-10"
                    >
                        <Heart
                            fill={isFavorite ? "#ef4444" : "none"}
                            color={isFavorite ? "#ef4444" : "#71717a"}
                            size={18}
                        />
                    </button>
                    
                    
                </div>

                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 text-xs rounded-full shadow-md flex items-center">
                    <Eye size={14} className="mr-1" />
                    {views}
                </div>
            </div>

            <div className="p-4">
                <div onClick={() => handleClick(ID)} className="cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{productName}</h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{ProductDisc}</p>
                    <div className="font-bold text-indigo-600 mb-3">{productPrice} DA</div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart();
                    }}
                    className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 transition-colors flex items-center justify-center"
                >
                    <ShoppingBag size={16} className="mr-2" />
                    Add to cart
                </button>
            </div>
        </motion.div>
    );
}

export default Card;