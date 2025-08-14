import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getRecipeById, updateRecipe } from '../services/recipeService';
import { useAuth } from '../contexts/AuthContext';

export default function EditRecipePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        difficulty: 'medium',
        cookingTime: 30,
        servings: 4,
        ingredients: [{ name: '', amount: '', unit: 'g' }],
        instructions: '',
        isPrivate: false
    });

    useEffect(() => {
        if (!user) {
            navigate('/auth');
            return;
        }
        fetchRecipe();
    }, [id, user, navigate]);

    const fetchRecipe = async () => {
        try {
            setIsLoading(true);
            const data = await getRecipeById(id);
            

            if (data.author?.id !== user.id) {
                setError('You can only edit your own recipes');
                return;
            }

            setRecipe(data);
            setFormData({
                title: data.title || '',
                content: data.content || '',
                difficulty: data.difficulty || 'medium',
                cookingTime: data.cookingTime || 30,
                servings: data.servings || 4,
                ingredients: data.ingredients?.length > 0 ? data.ingredients : [{ name: '', amount: '', unit: 'g' }],
                instructions: data.instructions || '',
                isPrivate: data.isPrivate || false,
                image: data.image || ''
            });
        } catch (err) {
            setError('Failed to fetch recipe');
            console.error('Error fetching recipe:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleIngredientChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            ingredients: prev.ingredients.map((ingredient, i) => 
                i === index ? { ...ingredient, [field]: value } : ingredient
            )
        }));
    };

    const addIngredient = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: '', amount: '', unit: 'g' }]
        }));
    };

    const removeIngredient = (index) => {
        setFormData(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'intership_upload');
      data.append('cloud_name', 'dzgs4jbqp');

      const res = await fetch(`https://api.cloudinary.com/v1_1/dzgs4jbqp/image/upload`, {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.secure_url) {
        setFormData(prev => ({ ...prev, image: json.secure_url }));
      }
    } catch (err) {
      console.error('Image upload error:', err);
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');


        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        if (!formData.content.trim()) {
            setError('Recipe content is required');
            return;
        }


        const validIngredients = formData.ingredients.filter(ing => ing.name.trim() && ing.amount.trim());

        try {
            setIsSaving(true);
            const normalizedIngredients = validIngredients.map(ing => ({
                name: String(ing.name || '').trim(),
                amount: String(ing.amount || '').trim(),
                unit: ing.unit || 'g'
            }));

            const updatedRecipe = await updateRecipe(id, {
                title: formData.title,
                content: formData.content,
                difficulty: formData.difficulty,
                cookingTime: Number(formData.cookingTime) || 0,
                servings: Number(formData.servings) || 0,
                instructions: formData.instructions,
                image: formData.image,
                ingredients: normalizedIngredients
            });

            navigate(`/recipes/${id}`);
        } catch (err) {
            setError(err.message || 'Failed to update recipe');
            console.error('Error updating recipe:', err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/60 text-lg">Loading recipe...</p>
                </motion.div>
            </div>
        );
    }

    if (error && error.includes('own recipes')) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h2>
                    <p className="text-white/60 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/recipes')}
                        className="px-6 py-3 bg-white text-black rounded-xl hover:bg-white/90 transition-colors"
                    >
                        Back to Recipes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 rounded-2xl border border-white/20 p-8"
                >
    
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-4">Edit Recipe</h1>
                        <p className="text-white/60">Update your recipe details</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-center mb-6"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Recipe Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                                    placeholder="Enter recipe title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Difficulty
                                </label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Cooking Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    name="cookingTime"
                                    value={formData.cookingTime}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Servings
                                </label>
                                <input
                                    type="number"
                                    name="servings"
                                    value={formData.servings}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                                />
                            </div>
                        </div>

        
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Description
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                                placeholder="Brief description of your recipe"
                            />
                        </div>

        
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-4">
                                Ingredients
                            </label>
                            <div className="space-y-3">
                                {formData.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex gap-3">
                                        <input
                                            type="text"
                                            value={ingredient.name}
                                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                            placeholder="Ingredient name"
                                            className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                                        />
                                        <input
                                            type="text"
                                            value={ingredient.amount}
                                            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                                            placeholder="Amount"
                                            className="w-24 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                                        />
                                        <select
                                            value={ingredient.unit}
                                            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                            className="w-20 px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white"
                                        >
                                            <option value="g">g</option>
                                            <option value="kg">kg</option>
                                            <option value="ml">ml</option>
                                            <option value="l">l</option>
                                            <option value="tbsp">tbsp</option>
                                            <option value="tsp">tsp</option>
                                            <option value="cup">cup</option>
                                            <option value="pcs">pcs</option>
                                        </select>
                                        {formData.ingredients.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeIngredient(index)}
                                                className="px-3 py-3 text-red-300 hover:text-red-400 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addIngredient}
                                    className="px-4 py-2 text-white hover:text-white/80 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Ingredient
                                </button>
                            </div>
                        </div>

        
        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
            Image
          </label>
          <div className="flex items-center gap-3">
            <input
              id="edit-recipe-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="edit-recipe-image-input"
                                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg cursor-pointer hover:bg-white/20"
            >
              Upload Image
            </label>
                            {formData.image && (
                              <span className="text-white/60 text-sm truncate max-w-xs">{formData.image}</span>
                            )}
          </div>
          {formData.image && (
            <img
              src={formData.image}
              alt="Recipe"
              className="w-full h-32 object-cover mt-2 rounded"
            />
          )}
        </div>

        
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Instructions
                            </label>
                            <textarea
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                                rows="8"
                                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                                placeholder="Step-by-step cooking instructions..."
                            />
                        </div>

        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isPrivate"
                                checked={formData.isPrivate}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Make this recipe private (only visible to you)
                            </label>
                        </div>

        
                        <div className="flex gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate(`/recipes/${id}`)}
                            className="px-6 py-3 border-2 border-white/30 text-white rounded-xl hover:bg-white hover:text-black transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-6 py-3 bg-white text-black rounded-xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
