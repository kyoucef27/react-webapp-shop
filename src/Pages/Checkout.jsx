import React, { useEffect, useRef } from "react";
import { usePop } from '../Hooks/PopOverHook'
import { useNavigate } from 'react-router-dom';
import { PiArrowBendUpLeftFill } from "react-icons/pi";
import { useCart } from '../Hooks/Hooks';
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlus, FiMinus } from "react-icons/fi";

const Checkout = ({ cartItems }) => {
    const navigate = useNavigate();
    const gotoMain = () => {
        navigate('/');
    }
    const { calculateTotal } = usePop();
    const {
        ClearCart,
        clearCartItem,
        handleAddToCart,
        decreaseQuantity
    } = useCart();

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        
        try {
            const form = document.getElementById('checkout-form');
            const userInfo = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                city: form.city.value,
                address: form.address.value
            };
            
            const cartTotal = calculateTotal(cartItems);
            
            const res = await fetch("/.netlify/functions/place-order", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    order: {
                        items: cartItems.map(item => ({
                            productId: item._id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity || 1,
                            specid: item.specid
                        })),   
                        total: cartTotal + 550,
                        customer: userInfo,
                        timestamp: new Date().toISOString(),
                    }
                }),
            });
            
            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`);
            }
            
            const data = await res.json();
            if (data.success) {
                alert("Order placed successfully!");
                ClearCart();
                navigate('/');
            } else {
                alert("Failed to place order: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order: " + error.message);
        }
    };

    const handleDel = (id) => {
        clearCartItem(id);
    }

    const groupedItems = cartItems.reduce((acc, item) => {
        const existingItemIndex = acc.findIndex(i => i.id === item.id);
        if (existingItemIndex >= 0) {
            return acc;
        } else {
            acc.push(item);
        }
        return acc;
    }, []);

    return (
        <div className="max-w-4xl mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <button className="font-bold text-gray-800 flex items-center hover:text-indigo-600 transition-colors" onClick={gotoMain}>
                    <PiArrowBendUpLeftFill className="mr-2" size={20} />
                    Continue Shopping
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="bg-white rounded-lg mb-6">
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Your Cart ({cartItems.length} items)</h3>

                        {cartItems.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">Your cart is empty</p>
                                <button
                                    onClick={gotoMain}
                                    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                                >
                                    Shop Now
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {groupedItems.map((item) => (
                                    <div key={item.id} className="flex border-b pb-4 mb-4">
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <img
                                                src={`https://res.cloudinary.com/dvdvzl5r1/image/upload/v1755538855/${item.specid}.avif`}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                        <div className="ml-4 flex-grow">
                                            <div className="flex justify-between">
                                                <h4 className="text-gray-800 font-medium">{item.name}</h4>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDel(item.id)}
                                                >
                                                    <FaRegTrashAlt />
                                                </button>
                                            </div>
                                            <p className="text-indigo-600 font-medium mt-1">{item.price} DA</p>

                                            <div className="flex items-center mt-2">
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
                                            </div>
                                        </div>
                                        <div className="ml-4 flex items-center">
                                            <span className="font-semibold">{item.price * (item.quantity || 1)} DA</span>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-end">
                                    <button
                                        onClick={ClearCart}
                                        type="button"
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                        <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                rows="3"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            ></textarea>
                        </div>
                    </form>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-6">
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Order Summary</h3>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>{calculateTotal(cartItems)} DA</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span>500 DA</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span className="text-gray-600">Total</span>
                                <span className="text-lg">{calculateTotal(cartItems) + 500} DA</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={cartItems.length === 0}
                            className={`w-full py-3 px-4 rounded-md font-medium text-white ${cartItems.length === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            By placing your order, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;