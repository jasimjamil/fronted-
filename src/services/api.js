import axios from 'axios';

// Base URL for your backend API
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  
  logout: () => {
    return api.post('/auth/logout');
  },
};

// Example of other services
export const employeeService = {
  getEmployees: () => {
    return api.get('/employees');
  },
  
  createEmployee: (employeeData) => {
    return api.post('/employees', employeeData);
  },
};

export const attendanceService = {
  getAttendance: () => {
    return api.get('/attendance');
  },
  
  markAttendance: (attendanceData) => {
    return api.post('/attendance', attendanceData);
  },
};

export default api; 