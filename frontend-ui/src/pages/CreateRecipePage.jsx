import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createRecipe } from '../services/recipeService';

export default function CreateRecipePage() {
    useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        ingredients: [{ name: '', amount: '', unit: 'g' }],
        instructions: '',
        cookingTime: '',
        difficulty: 'medium',
        servings: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index][field] = value;
        setFormData(prev => ({
            ...prev,
            ingredients: newIngredients
        }));
    };

    const addIngredient = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: '', amount: '', unit: 'g' }]
        }));
    };

    const removeIngredient = (index) => {
        if (formData.ingredients.length > 1) {
            setFormData(prev => ({
                ...prev,
                ingredients: prev.ingredients.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const recipeData = {
                ...formData,
                cookingTime: parseInt(formData.cookingTime) || 0,
                servings: parseInt(formData.servings) || 0
            };

            await createRecipe(recipeData);
            navigate('/recipes');
        } catch (err) {
            setError(err.message || 'Failed to create recipe');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "intership_upload");
        formData.append("cloud_name", "dzgs4jbqp");

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/dzgs4jbqp/image/upload`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (data.secure_url) {
                setFormData(prev => ({
                    ...prev,
                    image: data.secure_url
                }));
            }
        } catch (err) {
            console.error("Помилка завантаження:", err);
        }
    };

    return (
        <motion.div 
            className="min-h-screen bg-black text-white py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Create New Recipe
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Share your culinary masterpiece with the my RecipeHub community
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-2">Recipe Title *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-white placeholder-white/40"
                                placeholder="Enter recipe title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-2">Cooking Time (minutes)</label>
                            <input
                                type="number"
                                name="cookingTime"
                                value={formData.cookingTime}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-white placeholder-white/40"
                                placeholder="30"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-2">Difficulty</label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-white"
                            >
                                <option className="text-black" value="easy">Easy</option>
                                <option className="text-black" value="medium">Medium</option>
                                <option className="text-black" value="hard">Hard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white/80 mb-2">Servings</label>
                            <input
                                type="number"
                                name="servings"
                                value={formData.servings}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-white placeholder-white/40"
                                placeholder="4"
                            />
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">Description</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-white placeholder-white/40"
                            placeholder="Describe your recipe..."
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-white/80 mb-4">Ingredients *</label>
                        <div className="space-y-3">
                            {formData.ingredients.map((ingredient, index) => (
                                <div key={index} className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="Ingredient name"
                                        value={ingredient.name}
                                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                        className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-white placeholder-white/40"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Amount"
                                        value={ingredient.amount}
                                        onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                                        className="w-24 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-white placeholder-white/40"
                                    />
                                    <select
                                        value={ingredient.unit}
                                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                        className="w-20 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-white"
                                    >
                                        <option className="text-black" value="g">g</option>
                                        <option className="text-black" value="kg">kg</option>
                                        <option className="text-black" value="ml">ml</option>
                                        <option className="text-black" value="l">l</option>
                                        <option className="text-black" value="pcs">pcs</option>
                                        <option className="text-black" value="tbsp">tbsp</option>
                                        <option className="text-black" value="tsp">tsp</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => removeIngredient(index)}
                                        className="px-4 py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addIngredient}
                            className="mt-4 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                        >
                            + Add Ingredient
                        </button>
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">Instructions *</label>
                        <textarea
                            name="instructions"
                            required
                            value={formData.instructions}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 text-white placeholder-white/40"
                            placeholder="Step-by-step cooking instructions..."
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">Image</label>
                        <div className="flex items-center gap-4">
                            <input
                                id="recipe-image-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <label
                                htmlFor="recipe-image-input"
                                className="cursor-pointer px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                            >
                                Upload Image
                            </label>
                            {formData.image && (
                                <span className="text-white/60 text-sm truncate max-w-xs">{formData.image}</span>
                            )}
                        </div>
                    </div>

                    {formData.image && (
                        <img
                            src={formData.image}
                            alt="Recipe"
                            className="w-full h-32 object-cover mt-2"
                        />
                    )}


                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                            <p className="text-red-300 text-center">{error}</p>
                        </div>
                    )}

                    <div className="flex gap-4 justify-center">
                        <button
                            type="button"
                            onClick={() => navigate('/recipes')}
                            className="px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Creating...' : 'Create Recipe'}
                        </button>
                    </div>
                </motion.form>
            </div>
        </motion.div>
    );
}
