import React, { useState, useEffect } from 'react';
import { employeesAPI } from '../services/api';

const EmployeeList = ({ onSelectEmployee, selectedEmployeeId }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeesAPI.getAll();
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="employee-list">
      <h3>Employees</h3>
      <div className="list-container">
        {employees.length === 0 ? (
          <p>No employees found</p>
        ) : (
          employees.map((employee) => (
            <div
              key={employee.id}
              className={`employee-card ${selectedEmployeeId === employee.id ? 'selected' : ''}`}
              onClick={() => onSelectEmployee(employee.id)}
            >
              <div className="employee-info">
                <h4>{employee.name}</h4>
                <p className="employee-email">{employee.email}</p>
                <p className="employee-position">{employee.position} - {employee.department}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;

