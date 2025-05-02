import React from 'react'
import Cart from './Cart'
import Search from './Search'
import NavItems from './NavItems'
import { Heart } from 'lucide-react'
import { useCart } from '../Hooks/Hooks'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const { favorites } = useCart();
                
    return (
        <div className='bg-white shadow-md px-6 py-4 mb-4 sticky top-0 z-[100]'> 
            <div className="container mx-auto flex items-center justify-between">
                
                    <NavItems/>
                <div className="flex items-center space-x-6"> 
                    <Search/>
                    <Link to="/favorites" className="relative">
                        <Heart 
                            size={24} 
                            className={favorites.length > 0 ? "text-red-500" : "text-gray-400"}
                        />
                        {favorites.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {favorites.length}
                            </span>
                        )}
                    </Link>
                    <Cart/>
                </div>
            </div>
        </div>
    )
}

export default NavBar