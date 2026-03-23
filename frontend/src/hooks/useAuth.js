import { useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, logout as logoutService } from '../services/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const userData = getCurrentUser();
      setUser(userData);
      setIsAuthenticated(!!userData);
      setLoading(false);
    };
    loadUser();
  }, []);

  const logout = () => {
    logoutService();
    setUser(null);
    setIsAuthenticated(false);
  };

  return { user, isAuthenticated, loading, logout };
};