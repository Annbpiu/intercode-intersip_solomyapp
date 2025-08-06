export const saveToken = (token: string) => {
    localStorage.setItem('access_token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('access_token');
};

export const removeToken = () => {
    localStorage.removeItem('access_token');
};

export const saveUserName = (name: string) => {
    localStorage.setItem('userName', name);
};

export const getUserName = (): string | null => {
    return localStorage.getItem('userName');
};

export const removeUserName = () => {
    localStorage.removeItem('userName');
};