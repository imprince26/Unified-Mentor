import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const handleApiError = (error) => {
  console.error('API Error:', error);
  return error.response?.data || { message: 'An error occurred' };
};

export default api;