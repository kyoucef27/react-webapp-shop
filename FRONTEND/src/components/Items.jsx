import React, { useState } from 'react'
import Card from './Card'
import Products from './data'
import { useSearch } from '../Hooks/SearchHooks'
import QuickView from './QuickView'

const Items = ({ onAddToCart, filter, ProductNumber, onToggleCompare, isProductInCompare }) => {
    const filteredProducts = Products.filter(Product => filter === 'all' || Product.gender === filter);
    const {
        searchFilter,
        filteredData,
        clearSearch
    } = useSearch();

    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const handleOpenQuickView = (product) => {
        setQuickViewProduct(product);
        setIsQuickViewOpen(true);
    };

    const handleCloseQuickView = () => {
        setIsQuickViewOpen(false);
    };

    return (
        <>
            {searchFilter ? (
                <div>
                    {filteredData.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
                            {filteredData.map(Product => (
                                <div key={Product.id}>
                                    <Card
                                        productName={Product.name}
                                        productPrice={Product.price}
                                        ProductDisc={Product.desc}
                                        ID={Product.id}
                                        onAddToCart={() => onAddToCart(Product)}
                                        ProductNumber={ProductNumber}
                                        views={Product.views}
                                        onQuickView={() => handleOpenQuickView(Product)}
                                        onToggleCompare={() => onToggleCompare && onToggleCompare(Product)}
                                        isInCompare={isProductInCompare && isProductInCompare(Product.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-500">No products found</p>
                            <button 
                                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                                onClick={clearSearch}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
                    {filteredProducts.map(Product => (
                        <div key={Product.id}>
                            <Card
                                productName={Product.name}
                                productPrice={Product.price}
                                ProductDisc={Product.desc}
                                ID={Product.id}
                                onAddToCart={() => onAddToCart(Product)}
                                ProductNumber={ProductNumber}
                                views={Product.views}
                                onQuickView={() => handleOpenQuickView(Product)}
                                onToggleCompare={() => onToggleCompare && onToggleCompare(Product)}
                                isInCompare={isProductInCompare && isProductInCompare(Product.id)}
                            />
                        </div>
                    ))}
                </div>
            )}

            <QuickView 
                product={quickViewProduct} 
                isOpen={isQuickViewOpen} 
                onClose={handleCloseQuickView} 
            />
        </>
    );
};

export default Items