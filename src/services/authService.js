import axios from 'axios';

// Base URL for your backend API
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token expired or invalid, logout user
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  // Login method
  async login(username, password) {
    try {
      const response = await this.api.post('/auth/login', { username, password });
      
      if (response.data.token) {
        // Store user details and token
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout method
  logout() {
    // Remove user from local storage
    localStorage.removeItem('user');
    // Optionally call backend logout endpoint
    return this.api.post('/auth/logout');
  }

  // Get current authentication token
  getToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token;
  }

  // Check if user is authenticated
  isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user && !this.isTokenExpired(user.token);
  }

  // Get current user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Check if token is expired
  isTokenExpired(token) {
    if (!token) return true;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const payload = JSON.parse(window.atob(base64));
      
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }

  // Register new user
  async register(userData) {
    return this.api.post('/auth/register', userData);
  }

  // Forgot password
  async forgotPassword(email) {
    return this.api.post('/auth/forgot-password', { email });
  }

  // Reset password
  async resetPassword(token, newPassword) {
    return this.api.post('/auth/reset-password', { token, newPassword });
  }
}

export default new AuthService();