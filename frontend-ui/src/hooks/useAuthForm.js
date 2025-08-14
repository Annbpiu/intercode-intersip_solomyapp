import {useEffect, useState} from 'react';
import { getToken, removeToken, saveToken, getUserEmail, saveUserEmail, removeUserEmail } from "../services/authStorageService.ts";

export function useAuthForm(initialData) {
    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return { formData, setFormData, error, setError, handleChange };
}

export function useAuth() {
    const [token, setToken] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const savedToken = getToken();
        const savedEmail = getUserEmail();

        if (savedToken) {
            setToken(savedToken);
            if (savedEmail) {
                setUserEmail(savedEmail);
            }
        }
    }, []);

    const login = (token, email) => {
        saveToken(token);
        setToken(token);

        if (email) {
            saveUserEmail(email);
            setUserEmail(email);
        } else {
            const savedEmail = getUserEmail();
            if (savedEmail) setUserEmail(savedEmail);
        }
    };

    const logout = () => {
        removeToken();
        removeUserEmail();
        setToken(null);
        setUserEmail(null);
    };

    return { token, userEmail, setUserEmail, login, logout };
}