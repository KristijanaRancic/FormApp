import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({ baseURL });

// Ako postoji token u localStorage, šaljemo ga u Authorization hederu
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// === AUTH pozivi (prilagodi putanje ako backend drugačije zove) ===
export async function loginReq({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // očekuje { token, user? }
}

export async function registerReq({ name, email, password }) {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
}

export async function meReq() {
  const { data } = await api.get('/auth/me');
  return data; // očekuje { user }
}
