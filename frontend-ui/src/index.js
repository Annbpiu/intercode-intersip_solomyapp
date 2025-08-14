import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './index.css';

import Header from './components/Header';
import Footer from './components/Footer';
import AuthLayout from './components/AuthLayout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';
import MyRecipesPage from './pages/MyRecipesPage';
import EditRecipePage from './pages/EditRecipePage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import reportWebVitals from './reportWebVitals';

function Layout({ children }) {
    return (
        <motion.div 
            className="min-h-screen flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </motion.div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout><HomePage /></Layout>} />
                    <Route path="/auth" element={<AuthLayout><AuthPage /></AuthLayout>} />
                    <Route path="/recipes" element={<Layout><RecipesPage /></Layout>} />
                    <Route path="/recipes/:id" element={<Layout><RecipeDetailPage /></Layout>} />
                    <Route path="/recipes/:id/edit" element={
                        <ProtectedRoute>
                            <Layout><EditRecipePage /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/create-recipe" element={
                        <ProtectedRoute>
                            <Layout><CreateRecipePage /></Layout>
                        </ProtectedRoute>
                    } />
                    <Route path="/my-recipes" element={
                        <ProtectedRoute>
                            <Layout><MyRecipesPage /></Layout>
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    </React.StrictMode>
);


reportWebVitals();