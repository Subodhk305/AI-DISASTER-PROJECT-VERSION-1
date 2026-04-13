const API_URL = 'http://localhost:8001/api';

export const getPredictions = async (lat, lng, location) => {
  const response = await fetch(`${API_URL}/predictions/unified`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng, location })
  });
  if (!response.ok) throw new Error('Prediction failed');
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};