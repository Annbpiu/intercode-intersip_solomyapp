export const saveToken = (token: string) => {
    localStorage.setItem('access_token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('access_token');
};

export const removeToken = () => {
    localStorage.removeItem('access_token');
};

export const saveUserEmail = (email: string) => {
    localStorage.setItem('userEmail', email);
};

export const getUserEmail = (): string | null => {
    return localStorage.getItem('userEmail');
};

export const removeUserEmail = () => {
    localStorage.removeItem('userEmail');
};