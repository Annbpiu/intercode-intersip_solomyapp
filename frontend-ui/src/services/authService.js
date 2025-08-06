const API_BASE = '/auth';

export async function login(data) {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Login error');
    }

    return res.json();
}

export async function register(data) {
    // console.log(data);
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Register error');
    }

    return res.json();
}
