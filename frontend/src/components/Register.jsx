import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    await register({ name, email, password });
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
      <h2>Registracija</h2>
      {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}

      <label>Ime</label>
      <input value={name} onChange={e => setName(e.target.value)} required />

      <label style={{ marginTop: 8 }}>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label style={{ marginTop: 8 }}>Lozinka</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <button type="submit" style={{ marginTop: 12 }}>Kreiraj nalog</button>
    </form>
  );
}
