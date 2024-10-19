import React, { useState, ReactNode, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import client from "../api/client";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setAuthToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const login = async (email: string, password: string) => {
    try {
      const token = await client.login(email, password);
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
      await client.register(email, password);
      await login(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = async () => {
    try {
      await client.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const validateToken = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        await client.validateToken();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsAuthenticated(false);
        localStorage.removeItem("authToken");
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
