const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats,
} = require('../controllers/taskController');
const { validateTask, validateId } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// Public routes - anyone can view tasks
router.get('/', getAllTasks);
router.get('/stats', getDashboardStats);
router.get('/:id', validateId, getTaskById);

// Protected routes - require authentication for create/update/delete
router.post('/', authenticate, validateTask, createTask);
router.put('/:id', authenticate, validateId, validateTask, updateTask);
router.delete('/:id', authenticate, validateId, deleteTask);

module.exports = router;

