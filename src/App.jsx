import React from 'react'
import Checkout from './Pages/Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useCart } from './Hooks/Hooks'
import Products from './Pages/Products'
import Product from './Pages/Product'
import Homepage from './Pages/Homepage'
import Favorites from './Pages/Favorites'
import CartNotification from './components/CartNotification'

const App = () => {
    const { cartItems, notification } = useCart();
    
    return (
        <div className="overflow-x-hidden w-full">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/Products" element={<Products/>} />
                    <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
                    <Route path="/Product/:id" element={<Product />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
                
                <CartNotification 
                    isVisible={notification.isVisible}
                    message={notification.message}
                    product={notification.product}
                    type={notification.type}
                />
            </BrowserRouter>
        </div>
    )
}

export default App