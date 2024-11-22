import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { client } from '../api/client';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(-1);
    const navigate = useNavigate();

    function setAuthToken(token: string) {
        localStorage.setItem('authToken', token);
    }

    async function login(email: string, password: string) {
        try {
            const token = await client.login(email, password);
            if (token) {
                setAuthToken(token);
                const decoded: { sub: number } = jwtDecode(token);
                setUserId(decoded.sub);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
        }
    }

    async function register(email: string, password: string) {
        try {
            await client.register(email, password);
            await login(email, password);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    async function logout() {
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
        navigate('/login');
    }

    async function validateToken() {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                await client.validateToken();
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Token validation failed:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('authToken');
            }
        }
    }

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, userId, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
