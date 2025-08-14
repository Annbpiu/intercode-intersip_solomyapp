import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createRecipe } from '../services/recipeService';

const CreateRecipeModal = ({ isOpen, onClose, onRecipeCreated }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    cookingTime: '',
    servings: '',
    difficulty: 'medium',
    ingredients: [{ name: '', amount: '', unit: 'g' }],
    instructions: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
    }
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
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
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const recipeData = {
        ...formData,
        cookingTime: parseInt(formData.cookingTime),
        servings: parseInt(formData.servings)
      };

      const newRecipe = await createRecipe(recipeData);
      onRecipeCreated(newRecipe);
      onClose();
      setFormData({
        title: '',
        content: '',
        cookingTime: '',
        servings: '',
        difficulty: 'medium',
        ingredients: [{ name: '', amount: '', unit: 'g' }],
        instructions: '',
        image: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to create recipe');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {

    if (e.target === e.currentTarget) {

      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <style>{`#create-recipe-modal-panel::-webkit-scrollbar{display:none;}`}</style>
      <div
        id="create-recipe-modal-panel"
        className="bg-white/10 border border-white/20 backdrop-blur rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative text-white [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Create New Recipe</h2>
          <p className="text-white/60 mt-1">Share your culinary masterpiece with the world!</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                placeholder="e.g., Classic Margherita Pizza"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Difficulty *
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Image</label>
            <div className="flex items-center gap-3">
              <input id="modal-image-input" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <label htmlFor="modal-image-input" className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20">Upload Image</label>
              {formData.image && <span className="text-white/60 text-sm truncate max-w-xs">{formData.image}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Cooking Time (minutes) *
              </label>
              <input
                type="number"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Servings *
              </label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                placeholder="4"
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
              placeholder="Describe your recipe, what makes it special..."
            />
          </div>

          
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-white/80">
                Ingredients *
              </label>
              <button
                type="button"
                onClick={addIngredient}
                className="text-white hover:text-white/80 text-sm font-medium"
              >
                + Add Ingredient
              </button>
            </div>
            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    placeholder="Ingredient name"
                    required
                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                  />
                  <input
                    type="text"
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                    placeholder="Amount"
                    required
                    className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
                  />
                  <div className="flex items-stretch min-w-0 overflow-hidden rounded-lg border border-white/20">
                    <input
                      type="text"
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      placeholder="Unit"
                      className="flex-1 min-w-0 px-3 py-2 bg-white/5 focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40 border-0"
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="px-3 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors shrink-0"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Instructions *
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              required
              rows="6"
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/40 text-white placeholder-white/40"
              placeholder="Step-by-step cooking instructions..."
            />
          </div>

          
          <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border-2 border-white/30 text-white rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-white text-black rounded-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Creating...' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipeModal;


