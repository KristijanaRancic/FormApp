import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginReq, registerReq, meReq } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    meReq()
      .then((res) => setUser(res.user ?? null))
      .catch(() => { localStorage.removeItem('token'); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  async function login({ email, password }) {
    setError(null);
    try {
      const res = await loginReq({ email, password });
      if (res.token) localStorage.setItem('token', res.token);
      setUser(res.user ?? null);
      navigate('/dashboard');
      return true;
    } catch {
      setError('Neuspešna prijava');
      return false;
    }
  }

  async function register({ name, email, password }) {
    setError(null);
    try {
      const res = await registerReq({ name, email, password });
      if (res.token) localStorage.setItem('token', res.token);
      setUser(res.user ?? { name, email });
      navigate('/dashboard');
      return true;
    } catch {
      setError('Neuspešna registracija');
      return false;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }

  const value = useMemo(() => ({ user, loading, error, login, register, logout }), [user, loading, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
