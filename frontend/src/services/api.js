import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (userData) => api.post('/auth/register', userData);
export const logout = () => api.post('/auth/logout');
export const getCurrentUser = () => api.get('/auth/me');

// Predictions
export const getPredictions = (lat, lng, location) => 
  api.post('/predictions/unified', { lat, lng, location });

// Alerts
export const getAlerts = () => api.get('/alerts');
export const getUserAlerts = () => api.get('/alerts/user');
export const markAlertRead = (id) => api.put(`/alerts/${id}/read`);
export const triggerManualAlert = (data) => api.post('/alerts/manual', data);

// Resources
export const getResources = () => api.get('/resources');
export const allocateResources = (resourceId, quantity) => 
  api.post(`/resources/${resourceId}/allocate`, { quantity });
export const updateResource = (resource) => api.post('/resources', resource);

// Volunteers
export const getVolunteers = () => api.get('/volunteers');
export const registerVolunteer = (data) => api.post('/volunteers/register', data);
export const assignVolunteer = (id, task) => api.post(`/volunteers/${id}/assign`, { task });

export default api;