import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TasksLayout from './components/TasksLayout';
import TaskCategories from './components/TaskCategories';
import Login from './components/Login';
import { vitalTasksData, vitalTaskDetail, myTasksData, myTaskDetail } from './data/mockData';
import './App.css';
import './components.css';

function App() {
  // Start with logged out state to show login page first
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar onLogout={() => setIsLoggedIn(false)} />
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vital" element={<TasksLayout title="Vital Tasks" tasks={vitalTasksData} selectedTask={vitalTaskDetail} />} />
            <Route path="/my-tasks" element={<TasksLayout title="My Tasks" tasks={myTasksData} selectedTask={myTaskDetail} />} />
            <Route path="/categories" element={<TaskCategories />} />
            {/* Fallback to Dashboard for other links for now */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
