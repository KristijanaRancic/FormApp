import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Inline “Protected route”
function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Učitavanje…</div>;
  return user ? children : <Navigate to="/" replace />;
}

// Inline Dashboard (placeholder)
function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: 16 }}>
      <h2>Dashboard</h2>
      <p>Korisnik: {user?.email || user?.name || '—'}</p>
      <button onClick={logout} style={{ marginTop: 12 }}>Odjava</button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <nav style={{ padding: 16, borderBottom: '1px solid #eee' }}>
          <Link to="/" style={{ marginRight: 12 }}>Login</Link>
          <Link to="/register" style={{ marginRight: 12 }}>Register</Link>
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
