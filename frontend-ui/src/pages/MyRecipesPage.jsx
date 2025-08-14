import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getMyRecipes, deleteRecipe } from '../services/recipeService';

export default function MyRecipesPage() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
            return;
        }

        let isMounted = true;
        
        const fetchMyRecipesSafe = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getMyRecipes();
                if (isMounted) {
                    setRecipes(data);
                }
            } catch (err) {
                if (isMounted) {
                    if (err.message.includes('Authentication required') || err.message.includes('Authentication failed')) {
                        navigate('/auth');
                        return;
                    }
                    setError(err.message || 'Failed to fetch recipes');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        
        fetchMyRecipesSafe();
        
        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, navigate]);

    const handleDelete = async (recipeId) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await deleteRecipe(recipeId);
                setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
                setError(null);
            } catch (err) {
                if (err.message.includes('Authentication required') || err.message.includes('Authentication failed')) {
                    navigate('/auth');
                    return;
                }
                setError(err.message || 'Failed to delete recipe');
            }
        }
    };

    const handleEdit = (recipeId) => {
        navigate(`/recipes/${recipeId}/edit`);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <motion.div 
            className="min-h-screen bg-black text-white py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        My Recipes
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Manage and edit your culinary creations
                    </p>
                </motion.div>

                <div className="flex justify-center mb-8">
                    <Link to="/create-recipe">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all duration-300"
                        >
                            + Create New Recipe
                        </motion.button>
                    </Link>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8"
                    >
                        <p className="text-red-300 text-center">{error}</p>
                    </motion.div>
                )}

                {recipes.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center py-16"
                    >
                        <div className="text-8xl mb-6">🍳</div>
                        <h3 className="text-2xl font-bold text-white mb-4">No recipes yet</h3>
                        <p className="text-white/60 mb-8">Start creating your first recipe to share with the community!</p>
                        <Link to="/create-recipe">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all duration-300"
                            >
                                Create Your First Recipe
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {recipes.map((recipe, index) => (
                            <motion.div
                                key={recipe.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
                            >
                                {recipe.image && (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                                        {recipe.title}
                                    </h3>
                                    
                                    {recipe.content && (
                                        <p className="text-white/60 text-sm mb-4 line-clamp-3">
                                            {recipe.content}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {recipe.cookingTime && (
                                            <span className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                                                ⏱️ {recipe.cookingTime} min
                                            </span>
                                        )}
                                        {recipe.difficulty && (
                                            <span className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                                                🎯 {recipe.difficulty}
                                            </span>
                                        )}
                                        {recipe.servings && (
                                            <span className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                                                👥 {recipe.servings} servings
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(recipe.id)}
                                            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(recipe.id)}
                                            className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
