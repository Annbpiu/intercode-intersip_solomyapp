import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-black/90 backdrop-blur border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
  
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/" className="text-2xl italic font-bold tracking-tight text-white">
              INTERCODE INTERSHIP
            </Link>
            <span className="hidden sm:inline text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white/60">beta</span>
          </div>


          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/recipes"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors"
            >
              Recipes
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/my-recipes"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors"
                >
                  My Recipes
                </Link>
                <Link
                  to="/create-recipe"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-black bg-white hover:bg-white/90 transition-colors"
                >
                  Create Recipe
                </Link>
              </>
            )}
          </nav>


          <div className="flex items-center space-x-2">
            <button
              type="button"
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-white/80 hover:bg-white/10 border border-white/10"
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
            {!isAuthenticated ? (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center gap-3 pr-2 text-white/70 text-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {user?.email?.charAt(0) || 'U'}
                  </div>
                  <span className="truncate max-w-[140px]">{user?.email || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden md:inline-flex px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black/90 border-b border-white/10">
          <div className="px-4 py-3 space-y-2">
            <Link onClick={() => setMenuOpen(false)} to="/recipes" className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10">Recipes</Link>
            {isAuthenticated && (
              <>
                <Link onClick={() => setMenuOpen(false)} to="/my-recipes" className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10">My Recipes</Link>
                <Link onClick={() => setMenuOpen(false)} to="/create-recipe" className="block px-3 py-2 rounded-lg text-black bg-white hover:bg-white/90">Create Recipe</Link>
                <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="w-full text-left px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10">Logout</button>
              </>
            )}
            {!isAuthenticated && (
              <Link onClick={() => setMenuOpen(false)} to="/auth" className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

