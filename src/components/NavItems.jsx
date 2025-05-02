import React, { useState, useEffect } from 'react';
import { useCart } from '../Hooks/Hooks';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSearch } from '../Hooks/SearchHooks';
import { Menu, X } from 'lucide-react';

const NavItems = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { handleFilter, handleClickLink, activeLink } = useCart();
    const { clearSearch } = useSearch();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);
    
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    const handleNavigation = (filter, linkName, path) => (e) => {
        e.preventDefault();
        handleFilter(filter);
        handleClickLink(e, filter, linkName);
        clearSearch();
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className="md:hidden relative">
                <button
                    onClick={toggleMenu}
                    className="flex items-center p-2 text-gray-700 hover:text-indigo-600 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>
            </div>

            {isMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0"
                    onClick={toggleMenu}
                >
                    <div 
                        className="absolute top-16 left-4 right-4 bg-white rounded-lg shadow-xl py-3 px-4 max-h-[80vh] overflow-y-auto transition-all duration-300 ease-in-out transform"
                        onClick={e => e.stopPropagation()}
                    >
                        <nav className="flex flex-col space-y-2">
                            <Link
                                to="/"
                                onClick={handleNavigation('all', 'home', '/')}
                                className={`py-3 px-4 font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${activeLink === 'home' ? 'bg-indigo-50 text-indigo-600' : ''}`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/Products"
                                onClick={handleNavigation('all', 'products', '/Products')}
                                className={`py-3 px-4 font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${activeLink === 'products' ? 'bg-indigo-50 text-indigo-600' : ''}`}
                            >
                                Products
                            </Link>
                            <Link
                                to="/Products"
                                onClick={handleNavigation('Woman', 'women', '/Products')}
                                className={`py-3 px-4 font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${activeLink === 'women' ? 'bg-indigo-50 text-indigo-600' : ''}`}
                            >
                                Women
                            </Link>
                            <Link
                                to="/Products"
                                onClick={handleNavigation('Man', 'men', '/Products')}
                                className={`py-3 px-4 font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${activeLink === 'men' ? 'bg-indigo-50 text-indigo-600' : ''}`}
                            >
                                Men
                            </Link>
                            <Link
                                to="/Products"
                                onClick={handleNavigation('Kid', 'kids', '/Products')}
                                className={`py-3 px-4 font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${activeLink === 'kids' ? 'bg-indigo-50 text-indigo-600' : ''}`}
                            >
                                Kids
                            </Link>
                            <Link
                                to="/Products"
                                onClick={handleNavigation('Parfume', 'parfumes', '/Products')}
                                className={`py-3 px-4 font-medium rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${activeLink === 'parfumes' ? 'bg-indigo-50 text-indigo-600' : ''}`}
                            >
                                Parfumes
                            </Link>
                        </nav>
                    </div>
                </div>
            )}

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6">
                <Link
                    to="/"
                    onClick={handleNavigation('all', 'home', '/')}
                    className={`font-medium hover:text-indigo-600 transition-colors ${activeLink === 'home' ? 'underline text-indigo-600' : ''}`}
                >
                    Home
                </Link>
                <Link
                    to="/Products"
                    onClick={handleNavigation('all', 'products', '/Products')}
                    className={`font-medium hover:text-indigo-600 transition-colors ${activeLink === 'products' ? 'underline text-indigo-600 ' : ''}`}
                >
                    Products
                </Link>
                <Link
                    to="/Products"
                    onClick={handleNavigation('Woman', 'women', '/Products')}
                    className={`font-medium hover:text-indigo-600 transition-colors ${activeLink === 'women' ? 'underline text-indigo-600' : ''}`}
                >
                    Women
                </Link>
                <Link
                    to="/Products"
                    onClick={handleNavigation('Man', 'men', '/Products')}
                    className={`font-medium hover:text-indigo-600 transition-colors ${activeLink === 'men' ? 'underline text-indigo-600' : ''}`}
                >
                    Men
                </Link>
                <Link
                    to="/Products"
                    onClick={handleNavigation('Kid', 'kids', '/Products')}
                    className={`font-medium hover:text-indigo-600 transition-colors ${activeLink === 'kids' ? 'underline text-indigo-600' : ''}`}
                >
                    Kids
                </Link>
                <Link
                    to="/Products"
                    onClick={handleNavigation('Parfume', 'parfumes', '/Products')}
                    className={`font-medium hover:text-indigo-600 transition-colors ${activeLink === 'parfumes' ? 'underline text-indigo-600' : ''}`}
                >
                    Parfumes
                </Link>
            </div>
        </>
    );
};

export default NavItems;