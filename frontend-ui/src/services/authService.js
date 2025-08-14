const API_BASE_URL = '/auth';

class AuthService {
    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        return response.json();
    }

    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        return response.json();
    }

    async refreshToken(refreshToken) {
        const response = await fetch(`${API_BASE_URL}/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Token refresh failed');
        }

        return response.json();
    }

    async logout() {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
            return;
        }

        try {
            await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    getToken() {
        return localStorage.getItem('accessToken');
    }

    getAuthHeaders() {
        const token = localStorage.getItem('accessToken');
        return {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        };
    }
}

export const authService = new AuthService();


export const login = (credentials) => authService.login(credentials);
export const register = (userData) => authService.register(userData);
export const refreshToken = (refreshToken) => authService.refreshToken(refreshToken);
export const logout = () => authService.logout();
export const getToken = () => authService.getToken();
export const getAuthHeaders = () => authService.getAuthHeaders();
