import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api' });

export const getRecipes = (page = 1, limit = 15) =>
  api.get('/recipes', { params: { page, limit } });

export const searchRecipes = (q: {
  title?: string; cuisine?: string; rating?: string; total_time?: string; calories?: string;
}) => api.get('/recipes/search', { params: q });
