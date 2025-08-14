import React from 'react';
import {useAuthForm} from "../hooks/useAuthForm";
import { useAuth } from "../contexts/AuthContext";

export default function AuthForm({mode = 'login', onSuccess}) {
    const {formData, error,  setError, handleChange} = useAuthForm({
        email: '',
        password: '',
    });
    
    const { login, register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            let result;
            if (mode === 'login') {
                result = await login({email: formData.email, password: formData.password});
            } else {
                result = await register({
                    email: formData.email,
                    password: formData.password,
                });
            }

            if (result.success) {
                onSuccess?.(result);
            } else {
                setError(result.error || 'Authentication failed');
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.message || 'Authentication failed');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full space-y-8"
        >
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/80 tracking-wide uppercase">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-500 text-white placeholder-white/40 font-medium tracking-wide"
                    placeholder="Enter your email"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/80 tracking-wide uppercase">Password</label>
                <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-500 text-white placeholder-white/40 font-medium tracking-wide"
                    placeholder="Enter your password"
                />
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-red-300 text-center font-medium tracking-wide">{error}</p>
                </div>
            )}

            <button
                type="submit"
                className="w-full py-4 bg-white text-black rounded-2xl font-black text-lg tracking-wide shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:bg-white/90 border border-white/20"
            >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
        </form>
    );
}
