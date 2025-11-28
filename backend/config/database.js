const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  // Connection pool settings
  max: 10, // Maximum number of clients in the pool
  min: 2, // Minimum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection cannot be established
  allowExitOnIdle: false, // Don't allow the pool to close all connections
});

// Test connection
pool.on('connect', (client) => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err.message);
  // Don't exit the process - just log the error
  // The pool will handle reconnection automatically
});

// Handle pool errors gracefully
pool.on('remove', (client) => {
  console.log('Client removed from pool');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down database pool...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down database pool...');
  await pool.end();
  process.exit(0);
});

module.exports = pool;

