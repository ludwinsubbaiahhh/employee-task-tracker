const pool = require('../config/database');

class Task {
  static async getAll(filters = {}) {
    let query = 'SELECT t.*, e.name as employee_name, e.email as employee_email FROM tasks t LEFT JOIN employees e ON t.employee_id = e.id';
    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (filters.status) {
      conditions.push(`t.status = $${paramCount}`);
      values.push(filters.status);
      paramCount++;
    }

    if (filters.employee_id) {
      conditions.push(`t.employee_id = $${paramCount}`);
      values.push(filters.employee_id);
      paramCount++;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY t.created_at DESC';

    const result = await pool.query(query, values);
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT t.*, e.name as employee_name, e.email as employee_email FROM tasks t LEFT JOIN employees e ON t.employee_id = e.id WHERE t.id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async create(taskData) {
    const { title, description, status, priority, employee_id, due_date } = taskData;
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, priority, employee_id, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, status || 'pending', priority || 'medium', employee_id || null, due_date || null]
    );
    return result.rows[0];
  }

  static async update(id, taskData) {
    const { title, description, status, priority, employee_id, due_date } = taskData;
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, employee_id = $5, due_date = $6 WHERE id = $7 RETURNING *',
      [title, description, status, priority, employee_id || null, due_date || null, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async getStats() {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_tasks,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_tasks,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_tasks,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_tasks,
        ROUND(COUNT(CASE WHEN status = 'completed' THEN 1 END)::numeric / NULLIF(COUNT(*), 0) * 100, 2) as completion_rate
      FROM tasks
    `);
    return result.rows[0];
  }
}

module.exports = Task;

