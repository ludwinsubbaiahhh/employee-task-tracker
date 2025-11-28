import React, { useState, useEffect } from 'react';
import { employeesAPI } from '../services/api';

/**
 * EmployeeList Component
 * Displays a list of employees with their assigned tasks
 * Features: Interactive cards, task previews, status indicators
 */
const EmployeeList = ({ onSelectEmployee, selectedEmployeeId }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedEmployee, setExpandedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  /**
   * Fetches employees with their assigned tasks from the API
   * Falls back to regular getAll if with-tasks endpoint fails
   */
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      // Try to get employees with tasks first
      try {
        const response = await employeesAPI.getAllWithTasks();
        setEmployees(response.data);
        setError(null);
      } catch (withTasksError) {
        // If with-tasks fails, fall back to regular endpoint
        console.warn('Failed to load employees with tasks, falling back to regular endpoint:', withTasksError);
        const response = await employeesAPI.getAll();
        // Add empty tasks array to each employee for consistency
        const employeesWithEmptyTasks = response.data.map(emp => ({
          ...emp,
          tasks: [],
          task_count: 0
        }));
        setEmployees(employeesWithEmptyTasks);
        setError(null);
      }
    } catch (err) {
      setError('Failed to load employees');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggles the expanded state of an employee card to show/hide tasks
   */
  const toggleExpand = (employeeId, e) => {
    e.stopPropagation();
    setExpandedEmployee(expandedEmployee === employeeId ? null : employeeId);
  };

  /**
   * Gets the status color for task badges
   */
  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      in_progress: '#17a2b8',
      completed: '#28a745',
      cancelled: '#dc3545',
    };
    return colors[status] || '#6c757d';
  };

  /**
   * Formats date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="employee-list">
      <h3 className="employee-list-title">
        <span className="icon">👥</span>
        Employees
      </h3>
      <div className="list-container">
        {employees.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No employees found</p>
          </div>
        ) : (
          employees.map((employee) => {
            const isSelected = selectedEmployeeId === employee.id;
            const isExpanded = expandedEmployee === employee.id;
            const taskCount = employee.tasks?.length || 0;
            const completedTasks = employee.tasks?.filter(t => t.status === 'completed').length || 0;

            return (
              <div
                key={employee.id}
                className={`employee-card ${isSelected ? 'selected' : ''} ${isExpanded ? 'expanded' : ''}`}
                onClick={() => onSelectEmployee(employee.id)}
              >
                <div className="employee-info">
                  <div className="employee-header">
                    <div className="employee-avatar">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="employee-details">
                      <h4>{employee.name}</h4>
                      <p className="employee-email">{employee.email}</p>
                      <p className="employee-position">
                        <span className="icon-small">💼</span>
                        {employee.position} • {employee.department}
                      </p>
                    </div>
                  </div>

                  {/* Task Summary */}
                  {taskCount > 0 && (
                    <div className="task-summary">
                      <div className="task-count-badge">
                        <span className="icon-small">📋</span>
                        <span className="task-count-number">{taskCount}</span>
                        <span className="task-count-label">
                          {taskCount === 1 ? 'task' : 'tasks'}
                        </span>
                      </div>
                      {completedTasks > 0 && (
                        <div className="completed-badge">
                          <span className="icon-small">✅</span>
                          {completedTasks} completed
                        </div>
                      )}
                    </div>
                  )}

                  {/* Expand/Collapse Button */}
                  {taskCount > 0 && (
                    <button
                      className="expand-btn"
                      onClick={(e) => toggleExpand(employee.id, e)}
                      aria-label={isExpanded ? 'Collapse tasks' : 'Expand tasks'}
                    >
                      <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </button>
                  )}
                </div>

                {/* Expanded Tasks List */}
                {isExpanded && taskCount > 0 && (
                  <div className="employee-tasks">
                    <div className="tasks-header">
                      <span className="icon-small">📝</span>
                      <strong>Assigned Tasks</strong>
                    </div>
                    <div className="tasks-list">
                      {employee.tasks.map((task) => (
                        <div key={task.id} className="task-item">
                          <div className="task-item-header">
                            <span className="task-title">{task.title}</span>
                            <span
                              className="task-status-badge"
                              style={{ backgroundColor: getStatusColor(task.status) }}
                            >
                              {task.status.replace('_', ' ')}
                            </span>
                          </div>
                          {task.description && (
                            <p className="task-item-description">{task.description}</p>
                          )}
                          <div className="task-item-footer">
                            {task.due_date && (
                              <span className="task-due-date">
                                <span className="icon-small">📅</span>
                                {formatDate(task.due_date)}
                              </span>
                            )}
                            <span
                              className="task-priority"
                              style={{
                                color: task.priority === 'high' ? '#dc3545' : 
                                       task.priority === 'medium' ? '#ffc107' : '#28a745'
                              }}
                            >
                              {task.priority} priority
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EmployeeList;

