import api from './api';

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await api.put('/users/password', passwordData);
  return response.data;
};