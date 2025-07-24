import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on initial load
    const checkAuth = async () => {
      try {
        // const user = await authAPI.getCurrentUser();
        // Mock user - replace with actual API call
        const mockUser = { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' };
        setCurrentUser(mockUser);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // const user = await authAPI.login(credentials);
      // Mock login - replace with actual API call
      const mockUser = { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' };
      setCurrentUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // await authAPI.logout();
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};