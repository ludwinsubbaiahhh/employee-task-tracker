const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesWithTasks,
} = require('../controllers/employeeController');
const { validateEmployee, validateId } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// Public routes - anyone can view
router.get('/with-tasks', getEmployeesWithTasks);
router.get('/', getAllEmployees);
router.get('/:id', validateId, getEmployeeById);

// Protected routes - require authentication for create/update/delete
router.post('/', authenticate, validateEmployee, createEmployee);
router.put('/:id', authenticate, validateId, validateEmployee, updateEmployee);
router.delete('/:id', authenticate, validateId, deleteEmployee);

module.exports = router;

