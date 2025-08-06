import {useEffect, useState} from 'react';
import { getToken, removeToken, saveToken, getUserName, saveUserName, removeUserName } from "../services/authStorageService.ts";
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
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const savedToken = getToken();
        const savedName = getUserName();

        if (savedToken) {
            setToken(savedToken);
            if (savedName) {
                setUserName(savedName);
            }
        }
    }, []);

    const login = (token: string, name?: string) => {
        saveToken(token);
        setToken(token);

        if (name) {
            saveUserName(name);
            setUserName(name);
        } else {
            const savedName = getUserName();
            if (savedName) setUserName(savedName);
        }
    };

    const logout = () => {
        removeToken();
        removeUserName();
        setToken(null);
        setUserName(null);
    };

    return { token, userName, setUserName, login, logout };
}