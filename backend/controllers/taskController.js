const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const filters = {};
    
    if (req.query.status) {
      filters.status = req.query.status;
    }
    
    if (req.query.employee_id) {
      filters.employee_id = parseInt(req.query.employee_id);
    }

    const tasks = await Task.getAll(filters);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    
    // Handle connection errors specifically
    if (error.code === 'XX000' || error.message.includes('termination') || error.message.includes('shutdown')) {
      return res.status(503).json({ 
        error: 'Database connection issue. Please try again in a moment.',
        retry: true 
      });
    }
    
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.getById(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, employee_id, due_date } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Validate status if provided
    const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Validate priority if provided
    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }

    const task = await Task.create({ title, description, status, priority, employee_id, due_date });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, employee_id, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Validate status if provided
    const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Validate priority if provided
    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }

    const task = await Task.update(id, { title, description, status, priority, employee_id, due_date });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.delete(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully', task });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const stats = await Task.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error.message);
    
    // Handle connection errors specifically
    if (error.code === 'XX000' || error.message.includes('termination') || error.message.includes('shutdown')) {
      return res.status(503).json({ 
        error: 'Database connection issue. Please try again in a moment.',
        retry: true 
      });
    }
    
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats,
};

