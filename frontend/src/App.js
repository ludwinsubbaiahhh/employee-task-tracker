import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1>Employee Task Tracker</h1>
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'tasks' && <Tasks />}
        </div>
      </main>
    </div>
  );
}

export default App;

