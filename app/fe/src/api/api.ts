import axios, { isAxiosError } from 'axios';

export const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
        } else {
            console.error('Non-Axios error:', error);
        }
        return Promise.reject(error);
    },
);
