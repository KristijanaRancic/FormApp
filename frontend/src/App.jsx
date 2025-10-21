import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ marginRight: 12 }}>Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
