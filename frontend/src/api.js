import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({ baseURL });

// Ako postoji token u localStorage, šaljemo ga u Authorization hederu
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ========== AUTH ========== */
export async function loginReq({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // { token, user? }
}

export async function registerReq({ name, email, password }) {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data; // { token, user? } ili { message }
}

export async function meReq() {
  const { data } = await api.get('/auth/me');
  return data; // { user }
}

/* ========== FORMS CRUD ========== */
/* Ako backend koristi drugi prefix (npr. /questions), zameni dole /forms → /questions */

export async function listForms() {
  const { data } = await api.get('/forms');
  return data; // array
}

export async function getForm(id) {
  const { data } = await api.get(`/forms/${id}`);
  return data; // single form object
}

export async function createForm(payload) {
  const { data } = await api.post('/forms', payload);
  return data; // created form
}

export async function updateForm(id, payload) {
  const { data } = await api.put(`/forms/${id}`, payload);
  return data; // updated form
}

export async function deleteForm(id) {
  const { data } = await api.delete(`/forms/${id}`);
  return data; // { ok: true } ili sl.
}
