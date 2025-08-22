import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { ArrowRight, ShoppingBag, ArrowDownCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useCart } from '../Hooks/Hooks';

const Homepage = () => {
    const location = useLocation();
    const [loaded, setLoaded] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const { data } = useCart();
    const Products = data;
    useEffect(() => {
        setLoaded(true);
        if (location.pathname !== "/") return;
        const featured = [...Products]
            .sort((a, b) => b.stars - a.stars)
            .slice(0, 5);
        setFeaturedProducts(featured);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => {
            document.querySelectorAll('.reveal').forEach(el => observer.unobserve(el));
        };
    }, [location.pathname]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <NavBar />

            <div className="relative bg-gradient-to-b from-indigo-900 to-indigo-600 overflow-hidden h-[80vh]">
                <div className="absolute inset-0 bg-grid-pattern opacity-5 z-[1]"></div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                    className="absolute inset-0 bg-[url('')] bg-cover bg-center z-[2]"
                    style={{ backgroundAttachment: "fixed" }}
                ></motion.div>

                <div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-600/40 z-[3]"
                ></div>

                <div className="container mx-auto px-4 h-full relative z-[5] flex flex-col justify-center">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                            className="mb-8 mx-auto"
                        >
                            <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-xl">
                                <ShoppingBag size={48} className="text-indigo-600" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-5xl md:text-7xl font-extrabold mb-6 text-white"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                                NadiaLuxe
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto"
                        >
                            Discover a curated collection of fashion that speaks to your unique style and personality.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.div variants={itemVariants}>
                                <Link
                                    to="/Products"
                                    className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-50 transition-all transform hover:scale-105"
                                >
                                    Shop Now
                                    <ArrowRight size={18} />
                                </Link>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Link
                                    to="/favorites"
                                    className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold border-2 border-white flex items-center justify-center shadow-lg hover:bg-white/10 transition-all transform hover:scale-105"
                                >
                                    View Favorites
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white z-[5]"
                    style={{ marginTop: '20px' }}
                >
                    <p className="mb-2 text-sm font-medium text-indigo-200">Scroll Down</p>
                    <ArrowDownCircle className="animate-bounce mx-auto" size={32} />
                </motion.div>
            </div>

            <div className="bg-gradient-to-b from-gray-100 to-white py-16 overflow-x-hidden">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular items loved by customers</p>
                    </motion.div>

                    <Swiper
                        modules={[Autoplay, Pagination, EffectFade]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        breakpoints={{
                            480: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 }
                        }}
                        className="featured-products-swiper pb-12"
                    >
                        {featuredProducts.map((product) => (
                            <SwiperSlide key={product.specid} className="h-auto">
                                <motion.div
                                    whileHover={{ y: -10, scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg h-full"
                                >
                                    <Link to={`/Product/${product.specid}`} className="block relative">
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={`https://res.cloudinary.com/dvdvzl5r1/image/upload/v1755538855/${product.specid}.jpg`}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>
                                        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
                                            TOP RATED
                                        </div>
                                    </Link>

                                    <div className="p-5">
                                        <Link to={`/Product/${product.specid}`} className="block">
                                            <h3 className="font-bold text-lg mb-1 text-gray-900 hover:text-indigo-600 transition-colors">{product.name}</h3>
                                        </Link>
                                        <div className="flex items-center mb-2">
                                            {Array(5).fill().map((_, i) => (
                                                <span key={i} className={`text-sm ${i < product.stars ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                            ))}
                                            <span className="ml-1 text-xs text-gray-500">({product.reviews.length} reviews)</span>
                                        </div>
                                        <p className="font-semibold text-indigo-600 text-lg">{product.price} DA</p>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>


            <div className="bg-gray-100 py-20 px-4 overflow-x-hidden">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 reveal transform translate-y-10 opacity-0 transition-all duration-1000">
                        Why Choose Our Collections
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Premium Quality",
                                description: "Crafted with the finest materials for exceptional comfort and durability.",
                                icon: "👑"
                            },
                            {
                                title: "Unique Designs",
                                description: "Stand out with exclusive styles that can't be found elsewhere.",
                                icon: "✨"
                            },
                            {
                                title: "Sustainable Fashion",
                                description: "Environmentally conscious clothing that looks good and feels good.",
                                icon: "🌱"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-lg text-center reveal transform translate-y-10 opacity-0 transition-all duration-1000"
                                style={{ transitionDelay: `${0.2 * index}s` }}
                                whileHover={{
                                    y: -10,
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                }}
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-indigo-600 bg-[url('../assets/pattern-dots.svg')] bg-fixed text-white py-16 px-4 overflow-x-hidden">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '100+', label: 'Happy Customers' },
                            { value: '50+', label: 'Products' },
                            { value: '30+', label: 'Brands' },
                            { value: '4.8/5', label: 'Customer Rating' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="p-6"
                            >
                                <div className="text-3xl md:text-5xl font-bold mb-2">{stat.value}</div>
                                <p className="text-indigo-200">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-indigo-600 text-white py-16 px-4 overflow-x-hidden reveal transform translate-y-10 opacity-0 transition-all duration-1000">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Redefine Your Style?</h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
                        Join hundreds of satisfied customers who have transformed their wardrobe with our collections.
                    </p>
                    <Link
                        to="/Products"
                        className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg inline-block"
                    >
                        Explore Collection
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .reveal {
                    transition: all 1s cubic-bezier(0.5, 0, 0, 1);
                }
                .reveal.show {
                    transform: translateY(0);
                    opacity: 1;
                }
                .bg-grid-pattern {
                    background-image: linear-gradient(to right, rgba(255,255,255,.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}</style>
        </div>
    )
}

export default Homepage