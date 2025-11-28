import React, { useState, useEffect } from 'react';
import { employeesAPI } from '../services/api';
import EmployeeModal from './EmployeeModal';

/**
 * EmployeeList Component
 * Displays a list of employees with their assigned tasks
 * Features: Interactive cards, task previews, status indicators, CRUD operations
 */
const EmployeeList = ({ onSelectEmployee, selectedEmployeeId, onEmployeeUpdate }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

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

  /**
   * Handles creating a new employee
   */
  const handleCreateEmployee = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  /**
   * Handles editing an existing employee
   */
  const handleEditEmployee = (employee, e) => {
    e.stopPropagation();
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  /**
   * Handles deleting an employee
   */
  const handleDeleteEmployee = async (employeeId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this employee? This will unassign all their tasks.')) {
      try {
        await employeesAPI.delete(employeeId);
        fetchEmployees();
        if (onEmployeeUpdate) {
          onEmployeeUpdate();
        }
      } catch (err) {
        const errorMessage = err.response?.data?.error || 'Failed to delete employee';
        alert(errorMessage);
        console.error(err);
      }
    }
  };

  /**
   * Handles successful employee save
   */
  const handleEmployeeSaved = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    fetchEmployees();
    if (onEmployeeUpdate) {
      onEmployeeUpdate();
    }
  };

  return (
    <div className="employee-list">
      <div className="employee-list-header">
        <h3 className="employee-list-title">
          <span className="icon">👥</span>
          Employees
        </h3>
        <button 
          className="btn btn-primary btn-small" 
          onClick={handleCreateEmployee}
          title="Add new employee"
        >
          <span className="icon-small">➕</span> Add
        </button>
      </div>
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
                </div>

                {/* Action Buttons - Bottom Row */}
                <div className="employee-actions-bottom">
                  <button
                    className="action-btn edit-btn"
                    onClick={(e) => handleEditEmployee(employee, e)}
                    title="Edit employee"
                  >
                    <span className="icon-small">✏️</span>
                    <span>Edit</span>
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={(e) => handleDeleteEmployee(employee.id, e)}
                    title="Delete employee"
                  >
                    <span className="icon-small">🗑️</span>
                    <span>Delete</span>
                  </button>
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

      {/* Employee Modal */}
      {isModalOpen && (
        <EmployeeModal
          employee={editingEmployee}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEmployee(null);
          }}
          onSave={handleEmployeeSaved}
        />
      )}
    </div>
  );
};

export default EmployeeList;

