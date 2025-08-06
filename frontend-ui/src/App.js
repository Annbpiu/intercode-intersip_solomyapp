import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from './components/AuthForm';
import { useAuth } from './hooks/useAuthForm';

function App() {
    const [mode, setMode] = useState('login');
    const { token, userName, login, logout } = useAuth();

    const handleSuccess = (data) => {
        const token = data.access_token || data.token;

        if (!token) {
            console.error('No token received in response:', data);
            return;
        }

        const userNameFromResponse = data.user?.name || data.name;
        login(token, userNameFromResponse);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
    };

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center p-4"
            style={{
                background: `linear-gradient(270deg, #ff6ec4, #7873f5, #4ade80, #facc15)`,
                backgroundSize: '800% 800%',
                animation: 'gradientAnimation 15s ease infinite',
            }}
        >
            <style>
                {`
          @keyframes gradientAnimation {
            0% {background-position:0% 50%}
            50% {background-position:100% 50%}
            100% {background-position:0% 50%}
          }
        `}
            </style>

            <AnimatePresence mode="wait">
                {!token ? (
                    <motion.div
                        key="auth"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-md"
                    >
                        <AuthForm mode={mode} onSuccess={handleSuccess} />

                        <motion.button
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.03 }}
                            className="mt-6 w-full py-3 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 transition-colors duration-300 shadow-lg"
                        >
                            Switch to {mode === 'login' ? 'Register' : 'Login'}
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-md w-full text-center text-gray-800 space-y-6"
                    >
                        <p
                            className="text-4xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent font-['Pacifico'] truncate"
                            title={`Welcome, ${userName}!`}
                        >
                            Welcome, {userName}!
                        </p>

                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mx-auto max-w-[80%] sm:max-w-[75%] p-6"
                            src="./undraw_welcome-cats_tw36.svg"
                            alt="Welcome Cat"
                        />

                        <motion.button
                            onClick={logout}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            className="py-3 px-6 bg-red-600 text-white text-lg font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Logout
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
