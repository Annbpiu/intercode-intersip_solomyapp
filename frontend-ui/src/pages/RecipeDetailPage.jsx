import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, deleteRecipe } from '../services/recipeService';
import { useAuth } from '../contexts/AuthContext';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setIsLoading(true);
      const fetchedRecipe = await getRecipeById(id);
      setRecipe(fetchedRecipe);
    } catch (err) {
      setError('Failed to fetch recipe');
      console.error('Error fetching recipe:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      try {
        await deleteRecipe(id);
        navigate('/recipes');
      } catch (err) {
        setError('Failed to delete recipe');
        console.error('Error deleting recipe:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/60">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Recipe Not Found</h3>
          <p className="text-white/60 mb-6">
            {error || 'The recipe you are looking for does not exist or has been removed.'}
          </p>
          <button
            onClick={() => navigate('/recipes')}
            className="px-6 py-3 bg-white text-black rounded-lg font-medium transition-colors hover:bg-white/90"
          >
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      hard: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[difficulty] || colors.medium;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="bg-white/10 rounded-xl border border-white/20 overflow-hidden mb-8">
          {recipe.image ? (
            <div>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover"
              />
            </div>
          ) : (
            <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <svg className="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-4">{recipe.title}</h1>
                <p className="text-lg text-white/60 mb-6">{recipe.content}</p>
                
  
                <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 mb-6">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {recipe.cookingTime} minutes
                  </span>
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {recipe.servings} servings
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                  {recipe.isPrivate && (
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-300 text-xs font-semibold rounded-full border border-yellow-300/30">
                      Private
                    </span>
                  )}
                </div>

    
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {recipe.author?.email?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Created by</p>
                    <p className="font-medium text-white">{recipe.author?.email || 'Unknown Author'}</p>
                  </div>
                </div>
              </div>

  
              {user && recipe.author?.id === user.id && (
                <div className="flex flex-col space-y-3 ml-6">
                  <button
                    onClick={() => navigate(`/recipes/${id}/edit`)}
                    className="px-6 py-3 bg-white text-black rounded-lg font-medium transition-colors hover:bg-white/90"
                  >
                    Edit Recipe
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium transition-colors hover:bg-red-600"
                  >
                    Delete Recipe
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        
        <div className="bg-white/10 rounded-xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Ingredients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipe.ingredients?.map((ingredient, index) => (
              <div key={index} className="flex items-center p-4 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="font-medium text-white">{ingredient.name}</span>
                <span className="ml-auto text-white/70">
                  {ingredient.amount} {ingredient.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="bg-white/10 rounded-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Instructions</h2>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-white/80 leading-relaxed">
              {recipe.instructions}
            </div>
          </div>
        </div>

        
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/recipes')}
            className="px-6 py-3 bg-white text-black rounded-lg font-medium transition-colors hover:bg-white/90"
          >
            ← Back to Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;

