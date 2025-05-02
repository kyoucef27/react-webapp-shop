import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../Hooks/Hooks';
import { FaStar } from 'react-icons/fa';

const QuickView = ({ product, isOpen, onClose }) => {
    const { handleAddToCart, toggleFavorite, isProductFavorite, selectedSize, handleSizeSelect } = useCart();
    const [addedToCart, setAddedToCart] = useState(false);
    const isFavorite = isProductFavorite(product?.id || 0);
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    if (!product) return null;

    const handleAddToCartClick = () => {
        const productWithSize = {
            ...product,
            selectedSize: selectedSize
        };

        handleAddToCart(productWithSize);

        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
        }, 2000);
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 500 } }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div
                        className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="flex flex-col md:flex-row h-full">
                            <div className="w-full md:w-1/2 relative">
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={`../assets/img${product.id}.jpg`}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-full hover:bg-white/90 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="w-full md:w-1/2 p-6 overflow-y-auto">
                                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

                                <div className="flex items-center mb-4">
                                    <div className="flex mr-2">
                                        {Array(5).fill().map((_, i) => (
                                            <FaStar
                                                key={i}
                                                color={i < product.stars ? "#ffc107" : "#e4e5e9"}
                                                size={16}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">({product.reviews?.length || 0} reviews)</span>
                                </div>

                                <p className="text-xl font-bold text-indigo-600 mb-4">{product.price} DA</p>

                                <p className="text-gray-600 mb-6">{product.desc}</p>

                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Select Size</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map(size => (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                key={size}
                                                className={`h-9 w-9 rounded-md flex items-center justify-center border ${selectedSize === size
                                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                                        : 'border-gray-300 text-gray-700 hover:border-indigo-400'
                                                    } transition-colors`}
                                                onClick={() => handleSizeSelect(size)}
                                            >
                                                {size}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 mb-6">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleAddToCartClick}
                                        className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-md font-medium text-white ${addedToCart ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
                                            } transition-colors`}
                                    >
                                        <ShoppingBag size={16} />
                                        {addedToCart ? 'Added!' : 'Add to Cart'}
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggleFavorite(product)}
                                        className={`p-3 rounded-md border ${isFavorite ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                                            } transition-colors`}
                                    >
                                        <Heart
                                            fill={isFavorite ? "#ef4444" : "none"}
                                            color={isFavorite ? "#ef4444" : "#71717a"}
                                            size={18}
                                        />
                                    </motion.button>
                                </div>

                                <Link
                                    to={`/Product/${product.id}`}
                                    className="block text-center w-full py-3 border border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors"
                                >
                                    View Full Details
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuickView;