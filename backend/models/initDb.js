import pool from '../config/database.js';

export const initDb = async () => {
  try {
    // Test konekcije s bazom
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully at:', result.rows[0].now);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};
