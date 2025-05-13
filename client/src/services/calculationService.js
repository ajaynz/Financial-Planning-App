import api from './api';

export const saveCalculation = async (calculationData) => {
  const response = await api.post('/calculations', calculationData);
  return response.data;
};

export const getCalculations = async () => {
  const response = await api.get('/calculations');
  return response.data;
};

export const getCalculationById = async (id) => {
  const response = await api.get(`/calculations/${id}`);
  return response.data;
};

export const getCalculationsByType = async (type) => {
  const response = await api.get(`/calculations/type/${type}`);
  return response.data;
};

export const updateCalculation = async (id, calculationData) => {
  const response = await api.put(`/calculations/${id}`, calculationData);
  return response.data;
};

export const deleteCalculation = async (id) => {
  const response = await api.delete(`/calculations/${id}`);
  return response.data;
};