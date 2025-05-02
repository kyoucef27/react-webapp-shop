import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

const CartNotification = ({ isVisible, message, product, type = 'success' }) => {
  const icons = {
    success: <Check size={18} className="text-green-500" />,
    cart: <ShoppingCart size={18} className="text-indigo-500" />
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-20 right-4 z-50"
        >
          <div className="bg-white shadow-lg rounded-lg p-4 flex items-center border-l-4 border-indigo-500 max-w-xs">
            <div className="mr-3 bg-indigo-50 rounded-full p-2">
              {icons[type]}
            </div>
            <div>
              <p className="font-medium text-gray-900">{message}</p>
              {product && (
                <p className="text-sm text-gray-500 truncate">{product.name}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotification;