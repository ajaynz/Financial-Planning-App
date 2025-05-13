import React, { createContext, useState, useEffect } from 'react';
import { registerUser, loginUser, getCurrentUser } from '../services/userService';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await getCurrentUser();
      setCurrentUser(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user data:', err);
      logout(); // If token is invalid, logout
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      localStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      setError('');
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      setError('');
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};