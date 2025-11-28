const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAll();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    
    // Handle connection errors specifically
    if (error.code === 'XX000' || error.message.includes('termination') || error.message.includes('shutdown')) {
      return res.status(503).json({ 
        error: 'Database connection issue. Please try again in a moment.',
        retry: true 
      });
    }
    
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.getById(id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, position, department } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const employee = await Employee.create({ name, email, position, department });
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, position, department } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const employee = await Employee.update(id, { name, email, position, department });
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.delete(id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ message: 'Employee deleted successfully', employee });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

