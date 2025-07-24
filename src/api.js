import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-backend-url.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

export const employeeAPI = {
  getAll: () => api.get('/employees'),
  create: (employee) => api.post('/employees', employee),
  // Add other CRUD operations
};