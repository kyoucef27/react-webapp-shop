import React from 'react'
import { useCart } from '../Hooks/Hooks'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { usePop } from '../Hooks/PopOverHook'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
const Cart = () => {

    const navigate = useNavigate();
    const {
        PopOverGen,
        calculateTotal
    }=usePop()
    const {
        cartItems,
        cartItemsNumber,
        ClearCart,
        clearCartItem
    } = useCart();

    return (
        <div >
            <Popover className="relative">
                <PopoverButton className="relative focus:outline-none">
                    <ShoppingCart className="text-gray-700 hover:text-indigo-600 cursor-pointer" size={24} />
                    {cartItemsNumber > 0 && (
                        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                            {cartItemsNumber}
                        </span>
                    )}
                </PopoverButton>
                <PopoverPanel
                    transition
                    anchor="bottom"
                    className="absolute right-0 z-10 mt-2 w-72 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                    <div className='p-4'>
                        {PopOverGen(cartItems)}
                        {cartItems.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-200">
                                <div className="flex justify-between text-sm font-medium mb-3">
                                    <span>Total:</span>
                                    <span>{calculateTotal(cartItems)}DA</span>
                                </div>
                                <button
                                type='button'
                                onClick={ClearCart}
                                className='block w-full bg-red-600 text-white text-center rounded-md px-4 py-2 hover:bg-red-700 transition-colors'
                                >
                                    Clear Cart 
                                </button>
                                <Link
                                    to="/checkout"
                                    className="mt-2 block w-full bg-indigo-600 text-white text-center rounded-md px-4 py-2  hover:bg-indigo-700 transition-colors"
                                >
                                    Checkout
                                </Link>
                                
                            </div>
                        )}
                    </div>
                </PopoverPanel>
            </Popover>
        </div>
    )
}

export default Cart