import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
    const { user, isAuthenticated } = useAuth();

    return (
        <motion.div 
            className="min-h-screen bg-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
    
            <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-32">
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-center"
                    >
                        <h1 className="text-6xl md:text-7xl font-black mb-8 text-white tracking-tight">
                            Welcome to my RecipeHub
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
                            Discover, create, and share amazing recipes with our community of food enthusiasts.
                        </p>
                        {isAuthenticated && (
                            <p className="text-white/80 text-lg mb-4">
                                Welcome back, {user?.email || 'User'}!
                            </p>
                        )}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link to="/recipes">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-white/90 transition-all duration-500 text-lg tracking-wide shadow-2xl hover:shadow-white/20"
                                >
                                    Browse Recipes
                                </motion.button>
                            </Link>
                            {!isAuthenticated ? (
                                <Link to="/auth">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white hover:text-black transition-all duration-500 text-lg tracking-wide"
                                    >
                                        Get Started
                                    </motion.button>
                                </Link>
                            ) : (
                                <div className="text-center">
                                    <Link to="/recipes">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white hover:text-black transition-all duration-500 text-lg tracking-wide"
                                        >
                                            View Recipes
                                        </motion.button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

    
            <section className="py-24 bg-black/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            Why Choose my RecipeHub?
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🍳",
                                title: "Easy Recipe Creation",
                                description: "Create and share your favorite recipes with our intuitive interface."
                            },
                            {
                                icon: "🔍",
                                title: "Smart Search",
                                description: "Find exactly what you're looking for with our advanced search and filtering."
                            },
                            {
                                icon: "👥",
                                title: "Community Driven",
                                description: "Join thousands of food enthusiasts and discover new culinary adventures."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"
                            >
                                <div className="text-6xl mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-white/60 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
