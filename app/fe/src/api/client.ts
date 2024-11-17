import { api } from './api';

async function fetchAll<T>(url: string): Promise<T[]> {
    const response = await api.get<T[]>(url);
    return response.data;
}

async function login(email: string, password: string): Promise<string> {
    const response = await api.post<{ token: string }>('/users/login', {
        email,
        password,
    });
    return response.data.token;
}

async function register(email: string, password: string): Promise<void> {
    await api.post('/users/register', { email, password });
}

async function validateToken(): Promise<void> {
    await api.get('/auth/validate-token');
}

async function logout(): Promise<void> {
    await api.post('/users/logout');
}

async function get<T>(url: string): Promise<T> {
    const response = await api.get<T>(url);
    return response.data;
}

async function post<T>(url: string, data: T): Promise<void> {
    await api.post(url, data);
}

async function patch<T>(url: string, data: T): Promise<void> {
    await api.patch(url, data);
}

export const client = {
    fetchAll,
    get,
    post,
    patch,
    login,
    register,
    logout,
    validateToken,
};
