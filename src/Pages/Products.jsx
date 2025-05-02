import React, { useState } from 'react'
import Items from '../components/Items'
import NavBar from '../components/NavBar'
import { useCart } from '../Hooks/Hooks'
import productsData from '../components/data'

const Products = () => {
  const {
    ProductNumber,
    handleAddToCart,
    currentFilter
  } = useCart();
  
  
  return (          
    <div>
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {productsData.filter(product => currentFilter === 'all' || product.gender === currentFilter).length} products
            </span>
          </div>
        </div>
        
        <Items 
          onAddToCart={handleAddToCart} 
          filter={currentFilter} 
          ProductNumber={ProductNumber}
        />
      </div>
      
    
    </div>
  )
}

export default Products