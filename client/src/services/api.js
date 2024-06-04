import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getCategories = () => api.get('/products/categories');
export const createCategory = (data) => api.post('/products/categories', data);

export const getProducts = () => api.get('/products');
export const createProduct = (data) => api.post('/products', data);

export const recordSale = (data) => api.post('/sales', data);
export const getSales = () => api.get('/sales');

export const getRevenue = (period) => api.get(`/revenue?period=${period}`);
