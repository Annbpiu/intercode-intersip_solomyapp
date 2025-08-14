import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RecipeCard = ({ recipe }) => {
  const { user, isAuthenticated } = useAuth();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-400/10 text-green-300 border border-green-300/30';
      case 'medium': return 'bg-yellow-400/10 text-yellow-300 border border-yellow-300/30';
      case 'hard': return 'bg-red-400/10 text-red-300 border border-red-300/30';
      default: return 'bg-white/10 text-white border border-white/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isAuthor = isAuthenticated && user && recipe.author?.id === user.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden border border-white/20 text-white"
    >
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
      <div className="p-6 flex flex-col">

        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
            {recipe.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>


        <p className="text-white/60 flex-1 mb-4 line-clamp-3">
          {recipe.content}
        </p>


        <div className="flex items-center justify-between mb-4 text-sm text-white/60">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
              </svg>
              {recipe.cookingTime} min
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {recipe.servings} servings
            </span>
          </div>
          <span className="text-white/50">{formatDate(recipe.createdAt)}</span>
        </div>


        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white/80 mb-2">Ingredients:</h4>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients?.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full"
              >
                {ingredient.name}
              </span>
            ))}
            {recipe.ingredients?.length > 3 && (
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                +{recipe.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>


        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
              {recipe.author?.email?.charAt(0) || 'U'}
            </div>
            <span className="text-sm text-white/70">
              {recipe.author?.email || 'Unknown Author'}
            </span>
          </div>
          {recipe.isPrivate && (
            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-300 text-xs rounded-full border border-yellow-300/30">
              Private
            </span>
          )}
        </div>


        <div className="flex items-center justify-between pt-4 border-t border-white/10">

          <div className="flex gap-2">

            {isAuthor && (
              <Link to={`/recipes/${recipe.id}/edit`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-200"
                >
                  Edit
                </motion.button>
              </Link>
            )}


            <Link to={`/recipes/${recipe.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-200"
              >
                View Recipe
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;

