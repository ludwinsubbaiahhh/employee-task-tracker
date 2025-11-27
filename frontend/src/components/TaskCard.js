import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, statusColor }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      low: '#28a745',
      medium: '#ffc107',
      high: '#dc3545',
    };
    return colors[priority] || '#6c757d';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h4>{task.title}</h4>
        <span
          className="status-badge"
          style={{ backgroundColor: statusColor }}
        >
          {task.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-details">
        <div className="task-detail-item">
          <strong>Priority:</strong>
          <span
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority.toUpperCase()}
          </span>
        </div>

        {task.employee_name && (
          <div className="task-detail-item">
            <strong>Assigned to:</strong>
            <span>{task.employee_name}</span>
          </div>
        )}

        <div className="task-detail-item">
          <strong>Due Date:</strong>
          <span>{formatDate(task.due_date)}</span>
        </div>
      </div>

      <div className="task-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

