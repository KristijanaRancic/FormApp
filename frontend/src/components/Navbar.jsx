import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: 16, borderBottom: '1px solid #eee', display: 'flex', gap: 12 }}>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/forms">Forms</Link>
      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>{user.email || user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </nav>
  );
}
