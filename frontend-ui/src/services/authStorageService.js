export const saveToken = (token) => {
    localStorage.setItem('access_token', token);
};

export const getToken = () => {
    return localStorage.getItem('access_token');
};

export const removeToken = () => {
    localStorage.removeItem('access_token');
};

export const saveUserName = (name) => {
    localStorage.setItem('userName', name);
};

export const getUserName = () => {
    return localStorage.getItem('userName');
};

export const removeUserName = () => {
    localStorage.removeItem('userName');
};
