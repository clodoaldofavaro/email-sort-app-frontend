 // Authentication context and hooks for managing user state
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';
import { storage } from '../utils/storage';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const token = storage.getToken();
      const savedUser = storage.getUser();

      if (token && savedUser) {
        setUser(savedUser);
        // Verify token is still valid
        try {
          const response = await api.get('/api/auth/me');
          setUser(response.data.user);
          storage.setUser(response.data.user);
        } catch (error) {
          console.error('Token validation failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (token, userData) => {
    try {
      storage.setToken(token);
      storage.setUser(userData);
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}!`);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    }
  };

  const logout = () => {
    storage.removeToken();
    storage.removeUser();
    setUser(null);
    router.push('/login');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};