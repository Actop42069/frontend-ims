'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { LoginResponse } from '../services/auth.service';

interface AuthContextType {
  user: LoginResponse | null;
  token: string | null;
  login: (userData: LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user data exists in localStorage on component mount
    const storedUser = localStorage.getItem('user');
    const storedToken = Cookies.get('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: LoginResponse) => {
    setUser(userData);
    setToken(userData.token);
    setIsAuthenticated(true);
    
    // Store user data in localStorage and cookies
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Set cookie with token for middleware authentication
    Cookies.set('token', userData.token, { 
      expires: 7, // 7 days
      path: '/',
      secure: true, // Always use secure cookies
      sameSite: 'strict'
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    // Remove user data from localStorage and cookies
    localStorage.removeItem('user');
    Cookies.remove('token', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 