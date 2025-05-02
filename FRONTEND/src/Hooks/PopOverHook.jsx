import React, { createContext, useContext } from 'react';
import { useCart } from './Hooks';
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Link } from 'react-router-dom';

const PopContext = createContext();

const PopOverHook = ({ children }) => {
    const { clearCartItem, handleAddToCart, decreaseQuantity } = useCart();
    
    const calculateTotal = (items) => {
        return items.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
    };

    const PopOverGen = (items) => {
        if (items.length === 0) {
            return <div className="px-2 py-1 text-gray-500">Cart is empty</div>
        }
        
        const groupedItems = items.reduce((acc, item) => {
            const existingItemIndex = acc.findIndex(i => i.id === item.id);
            if (existingItemIndex >= 0) {
                return acc;
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
        
        return groupedItems.map((item, index) => (
            <div key={index} className="px-2 py-2 border-b last:border-b-0 flex items-center space-x-2">
                <Link to={`/Product/${item.id}`} className="flex-shrink-0">
                    <img 
                        src={`/assets/img${item.id}.jpg`} 
                        alt={item.name} 
                        className="w-14 h-14 object-cover rounded"
                    />
                </Link>
                
                <div className="flex flex-col flex-grow min-w-0">
                    <Link to={`/Product/${item.id}`} className="font-medium text-gray-800 truncate">
                        {item.name}
                    </Link>
                    <span className="text-indigo-600 font-medium">{item.price}DA</span>
                    
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center border rounded">
                            <button 
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                onClick={() => decreaseQuantity(item.id)}
                            >
                                <FiMinus size={14} />
                            </button>
                            <span className="px-2 py-1 font-medium">{item.quantity || 1}</span>
                            <button 
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                onClick={() => handleAddToCart(item)}
                            >
                                <FiPlus size={14} />
                            </button>
                        </div>
                        
                        <button 
                            className="text-red-500 hover:text-red-700" 
                            onClick={() => clearCartItem(item.id)}
                        >
                            <FaRegTrashAlt size={14} />
                        </button>
                    </div>
                </div>
            </div>
        ));
    }

    const value = {
        PopOverGen,
        calculateTotal,
    };

    return <PopContext.Provider value={value}>{children}</PopContext.Provider>;
}

export const usePop = () => useContext(PopContext);
export default PopOverHook;