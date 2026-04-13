import { useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, logout as logoutService, login as loginService } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const userData = getCurrentUser();
      const authStatus = isAuthenticated();
      setUser(userData);
      setIsAuthenticated(authStatus);
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setIsAuthenticated(false);
  };

  return { user, isAuthenticated, loading, login, logout };
};