import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/api";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/validate");
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const setAuthToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/users/login", { email, password });
      const token = response.data.token;
      if (token) {
        setAuthToken(token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await api.post("/users/register", { email, password });
      await login(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
