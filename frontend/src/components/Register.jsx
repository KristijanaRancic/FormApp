import React, { useState } from 'react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    // API ide u sledećem commitu (Frontend-3)
    console.log('register', { name, email, password })
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
      <h2>Registracija</h2>

      <label style={{ display: 'block', marginTop: 12 }}>
        <span style={{ fontSize: 12, opacity: 0.8 }}>Ime</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8 }}
        />
      </label>

      <label style={{ display: 'block', marginTop: 12 }}>
        <span style={{ fontSize: 12, opacity: 0.8 }}>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8 }}
        />
      </label>

      <label style={{ display: 'block', marginTop: 12 }}>
        <span style={{ fontSize: 12, opacity: 0.8 }}>Lozinka</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8 }}
        />
      </label>

      <button type="submit" style={{ marginTop: 16, padding: '10px 14px', borderRadius: 8 }}>
        Kreiraj nalog
      </button>
    </form>
  )
}
