import axios from 'axios';
import { Customer, Pet, Appointment } from '@/types';

// Configure base URL - update this to your backend API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Customer API
export const customerApi = {
  getAll: () => api.get<Customer[]>('/customers'),
  getById: (id: string) => api.get<Customer>(`/customers/${id}`),
  create: (data: Omit<Customer, 'id' | 'createdAt'>) => api.post<Customer>('/customers', data),
  update: (id: string, data: Partial<Customer>) => api.put<Customer>(`/customers/${id}`, data),
  delete: (id: string) => api.delete(`/customers/${id}`),
};

// Pet API
export const petApi = {
  getAll: () => api.get<Pet[]>('/pets'),
  getById: (id: string) => api.get<Pet>(`/pets/${id}`),
  getByCustomerId: (customerId: string) => api.get<Pet[]>(`/pets/customer/${customerId}`),
  create: (data: Omit<Pet, 'id' | 'createdAt'>) => api.post<Pet>('/pets', data),
  update: (id: string, data: Partial<Pet>) => api.put<Pet>(`/pets/${id}`, data),
  delete: (id: string) => api.delete(`/pets/${id}`),
};

// Appointment API
export const appointmentApi = {
  getAll: () => api.get<Appointment[]>('/appointments'),
  getById: (id: string) => api.get<Appointment>(`/appointments/${id}`),
  getByDate: (date: string) => api.get<Appointment[]>(`/appointments/date/${date}`),
  create: (data: Omit<Appointment, 'id' | 'createdAt'>) => api.post<Appointment>('/appointments', data),
  update: (id: string, data: Partial<Appointment>) => api.put<Appointment>(`/appointments/${id}`, data),
  updateStatus: (id: string, status: Appointment['status']) => api.patch<Appointment>(`/appointments/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/appointments/${id}`),
};

export default api;
