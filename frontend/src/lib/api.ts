import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (credentials: any) => api.post('/auth/login/', credentials),
};

export const ordersApi = {
  list: (params?: any) => api.get('/orders/', { params }),
  get: (id: string) => api.get(`/orders/${id}/`),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/`, { status }),
};

export const staffApi = {
  list: (params?: any) => api.get('/staff/', { params }),
  create: (data: any) => api.post('/staff/', data),
  update: (id: number, data: any) => api.patch(`/staff/${id}/`, data),
  delete: (id: number) => api.delete(`/staff/${id}/`),
  resetPassword: (id: number, data: any) => api.post(`/staff/${id}/reset_password/`, data),
};

export const customersApi = {
  list: (params?: any) => api.get('/customers/', { params }),
  get: (id: string) => api.get(`/customers/${id}/`),
  create: (data: any) => api.post('/customers/', data),
  update: (id: string, data: any) => api.patch(`/customers/${id}/`, data),
  delete: (id: string) => api.delete(`/customers/${id}/`),
};

export const productsApi = {
  list: (params?: any) => api.get('/products/', { params }),
  get: (id: string) => api.get(`/products/${id}/`),
  create: (data: any) => api.post('/products/', data),
  update: (id: string, data: any) => api.patch(`/products/${id}/`, data),
  delete: (id: string) => api.delete(`/products/${id}/`),
  
  categories: {
    list: (params?: any) => api.get('/categories/', { params }),
    get: (id: string) => api.get(`/categories/${id}/`),
    create: (data: any) => api.post('/categories/', data),
    update: (id: string, data: any) => api.patch(`/categories/${id}/`, data),
    delete: (id: string) => api.delete(`/categories/${id}/`),
  }
};

export const inventoryApi = {
  list: (params?: any) => api.get('/stock-records/', { params }),
  update: (id: number, data: any) => api.patch(`/stock-records/${id}/`, data),
  showrooms: {
    list: (params?: any) => api.get('/showrooms/', { params }),
    get: (id: number) => api.get(`/showrooms/${id}/`),
  }
};

export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats/'),
  getCharts: () => api.get('/dashboard/charts/'),
  getTopProducts: () => api.get('/dashboard/top-products/'),
  getActivityFeed: () => api.get('/dashboard/activity-feed/'),
  getFinancials: () => api.get('/dashboard/financials/summary/'),
  getReports: () => api.get('/dashboard/reports/overview/'),
  getReviews: () => api.get('/dashboard/reviews/summary/'),
  getSettings: () => api.get('/dashboard/settings/'),
};

export default api;
