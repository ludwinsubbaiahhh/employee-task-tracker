import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import EmployeeList from '../components/EmployeeList';

const Tasks = () => {
  const [filters, setFilters] = useState({
    status: null,
    employee_id: null,
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSelectEmployee = (employeeId) => {
    const newEmployeeId = selectedEmployeeId === employeeId ? null : employeeId;
    setSelectedEmployeeId(newEmployeeId);
    setFilters((prev) => ({
      ...prev,
      employee_id: newEmployeeId,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ status: null, employee_id: null });
    setSelectedEmployeeId(null);
  };

  return (
    <div className="tasks-page">
      <div className="page-layout">
        <div className="sidebar">
          <EmployeeList
            onSelectEmployee={handleSelectEmployee}
            selectedEmployeeId={selectedEmployeeId}
          />
          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-secondary" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
        <div className="main-content">
          <TaskList filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;

