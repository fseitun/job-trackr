import { createContext } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userId: number;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userId: 0,
    login: async () => {},
    register: async () => {},
    logout: () => {},
});
