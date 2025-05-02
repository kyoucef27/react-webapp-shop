import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from './SearchHooks';
const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [checkout, setCheckout] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsNumber, setCartItemsNumber] = useState(0);
    const [ProductNumber, setProductNumber] = useState(0);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [activeLink, setActiveLink] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [selectedSize, setSelectedSize] = useState('M');
    
    const [notification, setNotification] = useState({
        isVisible: false,
        message: '',
        product: null,
        type: 'success'
    });
    
    const {
        clearSearch
    } = useSearch();
    
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        const savedFavorites = localStorage.getItem('favorites');
        
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            setCartItems(parsedCart);
            setCartItemsNumber(parsedCart.length);
            setProductNumber(parsedCart.length);
        }
        
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
    
    const showNotification = (message, product, type = 'success') => {
        setNotification({
            isVisible: true,
            message,
            product,
            type
        });
        
        setTimeout(() => {
            setNotification(prev => ({ ...prev, isVisible: false }));
        }, 3000);
    };
    
    const handleClickLink = (e, category, name) => {
        e.preventDefault();
        handleFilter(category);
        setActiveLink(name); 
    };
    
    const clearCartItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        const removedCount = cartItems.length - updatedCartItems.length;
        setCartItemsNumber(cartItemsNumber - removedCount);
        setProductNumber(ProductNumber - removedCount);
    }

    const ClearCart = () => {
        setCartItems([]);
        setCartItemsNumber(0);
    }   
    
    const handleAddToCart = (product) => {
        const existingItemIndex = cartItems.findIndex(
            item => item.id === product.id && item.selectedSize === (product.selectedSize || selectedSize)
        );
        
        if (existingItemIndex >= 0) {
            const updatedCartItems = [...cartItems];
            if (!updatedCartItems[existingItemIndex].quantity) {
                updatedCartItems[existingItemIndex].quantity = 1;
            }
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
            
            showNotification('Added one more to your cart!', product, 'cart');
        } else {
            setCartItems([...cartItems, { 
                ...product, 
                quantity: 1, 
                selectedSize: product.selectedSize || selectedSize 
            }]);
            
            showNotification('Added to your cart!', product, 'cart');
        }
        
        setCartItemsNumber(cartItemsNumber + 1);
        setProductNumber(ProductNumber + 1);
    };
    
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };
    
    const decreaseQuantity = (productId) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === productId);
        
        if (existingItemIndex >= 0) {
            const updatedCartItems = [...cartItems];
            if (updatedCartItems[existingItemIndex].quantity > 1) {
                updatedCartItems[existingItemIndex].quantity -= 1;
                setCartItems(updatedCartItems);
                setCartItemsNumber(cartItemsNumber - 1);
                setProductNumber(ProductNumber - 1);
            } else {
                clearCartItem(productId);
            }
        }
    };
    
    const toggleFavorite = (product) => {
        const isFavorite = favorites.some(item => item.id === product.id);
        
        if (isFavorite) {
            setFavorites(favorites.filter(item => item.id !== product.id));
            showNotification('Removed from favorites', product, 'success');
        } else {
            setFavorites([...favorites, product]);
            showNotification('Added to favorites', product, 'success');
        }
    };
    
    const isProductFavorite = (productId) => {
        return favorites.some(item => item.id === productId);
    };
    
    const handleFilter = (filter) => {
        setCurrentFilter(filter);
    }
    
    const handleCheckout = (checkout) => {
        setCheckout(!checkout);
    }
    
    const getCurrentProductId = () => {
        const path = window.location.pathname;
        const match = path.match(/\/Product\/(\d+)/);
        return match ? parseInt(match[1], 10) : null;
    }
    
    const value = {
        checkout,
        cartItems,
        cartItemsNumber,
        ProductNumber,
        currentFilter,
        handleAddToCart,
        decreaseQuantity,
        handleFilter,
        handleCheckout,
        getCurrentProductId,
        ClearCart,
        clearCartItem,
        handleClickLink,
        activeLink,
        favorites,
        toggleFavorite,
        isProductFavorite,
        selectedSize,
        handleSizeSelect,
        notification,
        showNotification
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

export default CartProvider;