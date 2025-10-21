import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './models/initDb.js'; // inicijalizacija baze

// Učitavanje .env promenljivih
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// ------------------------
// Middleware
// ------------------------
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ------------------------
// Health check
// ------------------------
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ------------------------
// Start server after DB init
// ------------------------
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 CORS enabled for: ${FRONTEND_URL}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  });
}).catch(error => {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1);
});

export default app;
