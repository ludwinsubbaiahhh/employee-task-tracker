/**
 * Validation Middleware
 * Provides input validation for employee and task endpoints
 */

/**
 * Validates employee data
 */
const validateEmployee = (req, res, next) => {
  const { name, email, position, department } = req.body;
  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (name.trim().length > 255) {
    errors.push('Name must not exceed 255 characters');
  }

  // Email validation
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email is required and must be a non-empty string');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Email must be a valid email address');
    } else if (email.trim().length > 255) {
      errors.push('Email must not exceed 255 characters');
    }
  }

  // Position validation (optional)
  if (position && (typeof position !== 'string' || position.trim().length > 255)) {
    errors.push('Position must be a string not exceeding 255 characters');
  }

  // Department validation (optional)
  if (department && (typeof department !== 'string' || department.trim().length > 255)) {
    errors.push('Department must be a string not exceeding 255 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize input
  req.body = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    position: position ? position.trim() : null,
    department: department ? department.trim() : null
  };

  next();
};

/**
 * Validates task data
 */
const validateTask = (req, res, next) => {
  const { title, description, status, priority, employee_id, due_date } = req.body;
  const errors = [];

  // Title validation
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  } else if (title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  } else if (title.trim().length > 255) {
    errors.push('Title must not exceed 255 characters');
  }

  // Description validation (optional)
  if (description && typeof description !== 'string') {
    errors.push('Description must be a string');
  }

  // Status validation
  const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
  if (status && !validStatuses.includes(status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  // Priority validation
  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
  }

  // Employee ID validation (optional)
  if (employee_id !== undefined && employee_id !== null) {
    const employeeId = parseInt(employee_id);
    if (isNaN(employeeId) || employeeId <= 0) {
      errors.push('Employee ID must be a positive integer');
    } else {
      req.body.employee_id = employeeId;
    }
  }

  // Due date validation (optional)
  if (due_date) {
    const date = new Date(due_date);
    if (isNaN(date.getTime())) {
      errors.push('Due date must be a valid date');
    } else {
      req.body.due_date = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize input
  req.body = {
    title: title.trim(),
    description: description ? description.trim() : null,
    status: status || 'pending',
    priority: priority || 'medium',
    employee_id: req.body.employee_id || null,
    due_date: req.body.due_date || null
  };

  next();
};

/**
 * Validates ID parameter
 */
const validateId = (req, res, next) => {
  const { id } = req.params;
  const idNum = parseInt(id);

  if (isNaN(idNum) || idNum <= 0) {
    return res.status(400).json({
      error: 'Invalid ID',
      details: 'ID must be a positive integer'
    });
  }

  req.params.id = idNum;
  next();
};

module.exports = {
  validateEmployee,
  validateTask,
  validateId
};

