import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
    const [mode, setMode] = useState('login');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSuccess = (data) => {
        navigate('/');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
    };

    if (isAuthenticated) {
        navigate('/');
        return null;
    }

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center p-8 relative overflow-hidden"
            style={{
                background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #0f0f0f 50%, #1a1a1a 75%, #0a0a0a 100%)`,
                backgroundSize: '400% 400%',
                animation: 'subtleGradient 20s ease infinite',
            }}
        >

            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-white/5 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-b from-white/3 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            <style>
                {`
                    @keyframes subtleGradient {
                        0% {background-position:0% 50%}
                        50% {background-position:100% 50%}
                        100% {background-position:0% 50%}
                    }
                `}
            </style>

            <AnimatePresence mode="wait">
                <motion.div
                    key="auth"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full max-w-lg bg-black/40 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white/10 relative z-10"
                >

                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
                            {mode === 'login' ? 'Welcome Back' : 'Join Us'}
                        </h1>
                        <p className="text-white/60 text-lg font-light tracking-wide">
                            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
                        </p>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    >
                        <AuthForm mode={mode} onSuccess={handleSuccess} />
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                        className="mt-12 text-center"
                    >
                        <motion.button
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            whileTap={{ scale: 0.98 }}
                            whileHover={{ scale: 1.02 }}
                            className="px-8 py-4 bg-white/5 text-white/80 rounded-2xl hover:bg-white/10 transition-all duration-500 border border-white/20 font-medium tracking-wide hover:text-white hover:border-white/30"
                        >
                            {mode === 'login' ? "Don't have an account? Register" : "Already have an account? Login"}
                        </motion.button>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
