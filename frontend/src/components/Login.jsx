import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    await login({ email, password });
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
      <h2>Prijava</h2>
      {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}

      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label style={{ marginTop: 8 }}>Lozinka</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <button type="submit" style={{ marginTop: 12 }}>Uđi</button>
    </form>
  );
}
