import axios from 'axios';
import { getToken, autoLogin } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    // For protected routes (POST, PUT, DELETE), add auth token
    if (['post', 'put', 'delete'].includes(config.method.toLowerCase())) {
      let token = getToken();
      
      // Auto-login if no token (for development convenience)
      if (!token) {
        token = await autoLogin();
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - try to re-authenticate
      try {
        const token = await autoLogin();
        if (token) {
          // Retry the original request
          error.config.headers.Authorization = `Bearer ${token}`;
          return api.request(error.config);
        }
      } catch (authError) {
        console.error('Re-authentication failed:', authError);
      }
    }
    return Promise.reject(error);
  }
);

// Employees API
export const employeesAPI = {
  getAll: () => api.get('/employees'),
  getAllWithTasks: () => api.get('/employees/with-tasks'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
};

// Tasks API
export const tasksAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.employee_id) params.append('employee_id', filters.employee_id);
    return api.get(`/tasks?${params.toString()}`);
  },
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  getStats: () => api.get('/tasks/stats'),
};

export default api;

