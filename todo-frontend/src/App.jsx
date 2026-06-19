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
  const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <Login onLogin={(user) => setCurrentUser(user)} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar user={currentUser} onLogout={() => setCurrentUser(null)} />
        <main className="main-content">
          <Header user={currentUser} />
          <Routes>
            <Route path="/" element={<Dashboard user={currentUser} />} />
            <Route path="/vital" element={<TasksLayout title="Vital Tasks" user={currentUser} />} />
            <Route path="/my-tasks" element={<TasksLayout title="My Tasks" user={currentUser} />} />
            <Route path="/categories" element={<TaskCategories />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
