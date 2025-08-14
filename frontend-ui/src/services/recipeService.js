import { authService } from './authService';

const API_BASE_URL = '/recipes';

class RecipeService {
    async getAllRecipes(includePrivate = false) {
        const token = authService.getToken();
        const res = await fetch(`${API_BASE_URL}?includePrivate=${includePrivate}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to fetch recipes');
        return res.json();
    }

    async getRecipeById(id) {
        const token = authService.getToken();
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Recipe not found');
        return res.json();
    }

    async createRecipe(recipeData) {
        const token = authService.getToken();
        if (!token) {
            throw new Error('You must be logged in to create a recipe');
        }

        const doRequest = async (bearer) => fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearer}`
            },
            body: JSON.stringify(recipeData)
        });

        let res = await doRequest(token);
        if (res.status === 401) {
            try {
                const savedRefresh = localStorage.getItem('refreshToken');
                if (savedRefresh) {
                    const refreshed = await authService.refreshToken(savedRefresh);
                    localStorage.setItem('accessToken', refreshed.accessToken);
                    localStorage.setItem('refreshToken', refreshed.refreshToken);
                    res = await doRequest(refreshed.accessToken);
                }
            } catch (_) {}
        }

        if (!res.ok) {
            let message = 'Failed to create recipe';
            try {
                const err = await res.json();
                if (err && (err.message || err.error)) {
                    message = Array.isArray(err.message) ? err.message.join(', ') : (err.message || err.error);
                }
            } catch (_) {}
            throw new Error(message);
        }
        return res.json();
    }

    async updateRecipe(id, recipeData) {
        const token = authService.getToken();
        if (!token) {
            throw new Error('You must be logged in to update a recipe');
        }

        const doRequest = async (bearer) => fetch(`${API_BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearer}`
            },
            body: JSON.stringify(recipeData)
        });

        let res = await doRequest(token);
        if (res.status === 401) {
            try {
                const savedRefresh = localStorage.getItem('refreshToken');
                if (savedRefresh) {
                    const refreshed = await authService.refreshToken(savedRefresh);
                    localStorage.setItem('accessToken', refreshed.accessToken);
                    localStorage.setItem('refreshToken', refreshed.refreshToken);
                    res = await doRequest(refreshed.accessToken);
                }
            } catch (_) {}
        }

        if (!res.ok) {
            let message = 'Failed to update recipe';
            try {
                const err = await res.json();
                if (err && (err.message || err.error)) {
                    message = Array.isArray(err.message) ? err.message.join(', ') : (err.message || err.error);
                }
            } catch (_) {}
            throw new Error(message);
        }
        return res.json();
    }

    async deleteRecipe(id) {
        const token = authService.getToken();
        const res = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to delete recipe');
        return true;
    }

    async getMyRecipes() {
        const token = authService.getToken();
        const res = await fetch(`${API_BASE_URL}/my-recipes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to fetch my recipes');
        return res.json();
    }

    async likeRecipe(id) {
        const token = authService.getToken();
        const res = await fetch(`${API_BASE_URL}/${id}/like`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to like recipe');
        return res.json();
    }

    async searchRecipes(query, filters = {}) {
        const token = authService.getToken();
        const params = new URLSearchParams({ query, ...filters }).toString();
        const res = await fetch(`${API_BASE_URL}/search?${params}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to search recipes');
        return res.json();
    }
}

export const recipeService = new RecipeService();

export const getAllRecipes = (includePrivate = false) => recipeService.getAllRecipes(includePrivate);
export const getRecipeById = (id) => recipeService.getRecipeById(id);
export const createRecipe = (recipeData) => recipeService.createRecipe(recipeData);
export const updateRecipe = (id, recipeData) => recipeService.updateRecipe(id, recipeData);
export const deleteRecipe = (id) => recipeService.deleteRecipe(id);
export const getMyRecipes = () => recipeService.getMyRecipes();
export const likeRecipe = (id) => recipeService.likeRecipe(id);
export const searchRecipes = (query, filters = {}) => recipeService.searchRecipes(query, filters);
