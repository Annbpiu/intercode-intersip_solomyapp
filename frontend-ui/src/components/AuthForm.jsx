import React from 'react';
import {useAuthForm} from "../hooks/useAuthForm";
import {login, register} from "../services/authService";

export default function AuthForm({mode = 'login', onSuccess}) {
    const {formData, error, setUserName,  setError, handleChange} = useAuthForm({
        email: '',
        password: '',
        name: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (mode === 'register' && !formData.name.trim()) {

            setError('Name is required');
            return;
        }

        try {
            const data = mode === 'login'
                ? await login({email: formData.email, password: formData.password})
                : await register({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name.trim()
                });

            onSuccess?.({
                ...data,
                name: formData.name.trim()
            });
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.message || 'Authentication failed');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white/30 backdrop-blur-md rounded-lg shadow-lg border border-white/30"
        >
            <h2
                className="
                    text-5xl uppercase font-semibold text-center mt-2 mb-8
                    bg-gradient-to-r from-white/70 via-white/30 to-white/70
                    bg-clip-text text-purple-100
                    drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]
                  "
            >
                {mode === 'login' ? 'Login' : 'Register'}
            </h2>

            <label className="block mb-2 text-sm font-semibold text-gray-800">Email</label>
            <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 mb-4 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            />

            <label className="block mb-2 text-sm font-semibold text-gray-800">Password</label>
            <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 mb-4 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            />

            {mode === 'register' && (
                <>
                    <label className="block mb-2 text-sm font-semibold text-gray-800">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        minLength={1}
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 mb-4 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
                    />
                </>
            )}

            {error && (
                <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
            )}

            <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-colors duration-300"
            >
                {mode === 'login' ? 'Login' : 'Register'}
            </button>
        </form>
    );
}
