// frontend/src/services/auth.js
import api from './api';

export const login = async (email, password) => {
  // Mock login for testing
  if (email === 'admin@disaster.com' && password === 'admin123') {
    const mockUser = {
      id: '1',
      name: 'Admin User',
      email: 'admin@disaster.com',
      role: 'admin'
    };
    localStorage.setItem('token', 'mock-token-123');
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { access_token: 'mock-token-123', user: mockUser };
  }
  
  if (email === 'user@example.com' && password === 'user123') {
    const mockUser = {
      id: '2',
      name: 'Test User',
      email: 'user@example.com',
      role: 'user'
    };
    localStorage.setItem('token', 'mock-token-456');
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { access_token: 'mock-token-456', user: mockUser };
  }
  
  // If no match, show error
  throw new Error('Invalid email or password. Try: admin@disaster.com / admin123');
};

export const register = async (userData) => {
  const mockUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    role: userData.role || 'user'
  };
  localStorage.setItem('user', JSON.stringify(mockUser));
  localStorage.setItem('token', 'mock-token-register');
  return mockUser;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};