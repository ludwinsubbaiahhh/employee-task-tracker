const pool = require('../config/database');

class Employee {
  static async getAll() {
    const result = await pool.query(
      'SELECT * FROM employees ORDER BY created_at DESC'
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT * FROM employees WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async create(employeeData) {
    const { name, email, position, department } = employeeData;
    const result = await pool.query(
      'INSERT INTO employees (name, email, position, department) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, position, department]
    );
    return result.rows[0];
  }

  static async update(id, employeeData) {
    const { name, email, position, department } = employeeData;
    const result = await pool.query(
      'UPDATE employees SET name = $1, email = $2, position = $3, department = $4 WHERE id = $5 RETURNING *',
      [name, email, position, department, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM employees WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async getWithTaskCount() {
    const result = await pool.query(`
      SELECT 
        e.*,
        COUNT(t.id) as task_count,
        COUNT(CASE WHEN t.status = 'completed' THEN 1 END) as completed_tasks
      FROM employees e
      LEFT JOIN tasks t ON e.id = t.employee_id
      GROUP BY e.id
      ORDER BY e.created_at DESC
    `);
    return result.rows;
  }

  /**
   * Get all employees with their assigned tasks
   * Returns employees with nested task information
   */
  static async getAllWithTasks() {
    // First get all employees
    const employeesResult = await pool.query(
      'SELECT * FROM employees ORDER BY created_at DESC'
    );
    
    // Then get all tasks grouped by employee
    const tasksResult = await pool.query(`
      SELECT 
        t.*,
        t.employee_id
      FROM tasks t
      WHERE t.employee_id IS NOT NULL
      ORDER BY t.created_at DESC
    `);
    
    // Group tasks by employee_id
    const tasksByEmployee = {};
    tasksResult.rows.forEach(task => {
      if (!tasksByEmployee[task.employee_id]) {
        tasksByEmployee[task.employee_id] = [];
      }
      tasksByEmployee[task.employee_id].push(task);
    });
    
    // Combine employees with their tasks
    return employeesResult.rows.map(employee => ({
      ...employee,
      tasks: tasksByEmployee[employee.id] || [],
      task_count: (tasksByEmployee[employee.id] || []).length
    }));
  }
}

module.exports = Employee;

