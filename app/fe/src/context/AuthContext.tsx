import React, { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/validate"); // Create a validation endpoint
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await api.post("/users/login", { email, password });
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string) => {
    await api.post("/users/register", { email, password });
    await login(email, password);
  };

  const logout = async () => {
    await api.post("/users/logout"); // Create a logout endpoint
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
