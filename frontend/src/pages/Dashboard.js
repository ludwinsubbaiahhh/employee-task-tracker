import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getStats();
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return null;

  const statCards = [
    { label: 'Total Tasks', value: stats.total_tasks, color: '#007bff' },
    { label: 'Completed', value: stats.completed_tasks, color: '#28a745' },
    { label: 'In Progress', value: stats.in_progress_tasks, color: '#17a2b8' },
    { label: 'Pending', value: stats.pending_tasks, color: '#ffc107' },
    { label: 'Cancelled', value: stats.cancelled_tasks, color: '#dc3545' },
    { label: 'Completion Rate', value: `${stats.completion_rate || 0}%`, color: '#6f42c1' },
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard Summary</h2>
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

