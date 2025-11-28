import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { employeesAPI } from '../services/api';

/**
 * EmployeeModal Component
 * Modal form for creating and editing employees
 * Uses React Portal to render at document body level for proper z-index stacking
 */
const EmployeeModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        position: employee.position || '',
        department: employee.department || '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (employee) {
        await employeesAPI.update(employee.id, formData);
      } else {
        await employeesAPI.create(formData);
      }

      onSave();
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.details?.join(', ') || 'Failed to save employee';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{employee ? 'Edit Employee' : 'Create New Employee'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={255}
              placeholder="Enter employee name"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={255}
              placeholder="employee@company.com"
            />
          </div>

          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              maxLength={255}
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              maxLength={255}
              placeholder="e.g., Engineering"
            />
          </div>

          {error && (
            <div className="error" style={{ marginBottom: '15px', padding: '12px', borderRadius: '8px' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : employee ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render modal using portal at document body level to ensure proper z-index stacking
  return createPortal(modalContent, document.body);
};

export default EmployeeModal;

