const express = require('express');
const cors = require('cors');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const { optionalAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Employee Task Tracker API',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        verify: 'GET /api/auth/verify (protected)'
      },
      employees: {
        getAll: 'GET /api/employees',
        getWithTasks: 'GET /api/employees/with-tasks',
        getById: 'GET /api/employees/:id',
        create: 'POST /api/employees (protected)',
        update: 'PUT /api/employees/:id (protected)',
        delete: 'DELETE /api/employees/:id (protected)'
      },
      tasks: {
        getAll: 'GET /api/tasks (public)',
        getById: 'GET /api/tasks/:id (public)',
        create: 'POST /api/tasks (protected)',
        update: 'PUT /api/tasks/:id (protected)',
        delete: 'DELETE /api/tasks/:id (protected)',
        stats: 'GET /api/tasks/stats (public)'
      }
    },
    note: 'Endpoints marked as (protected) require JWT authentication'
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Employee routes (public GET, protected POST/PUT/DELETE)
app.use('/api/employees', employeeRoutes);

// Task routes (public GET, protected POST/PUT/DELETE)
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

