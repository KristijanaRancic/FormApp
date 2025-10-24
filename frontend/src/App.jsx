import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

// Inline protected wrapper (bez posebnog fajla)
function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Učitavanje…</div>;
  return user ? children : <div style={{ padding: 16 }}>Prijavite se da pristupite ovoj stranici.</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <nav style={{ padding: 16, borderBottom: '1px solid #eee', display: 'flex', gap: 12 }}>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <main style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
