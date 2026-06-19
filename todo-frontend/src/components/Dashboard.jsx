import { useState, useEffect } from 'react';
import { Plus, Clock, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard';
import ProgressRing from './ProgressRing';
import TaskModal from './TaskModal';

export default function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Sundar';

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchCategories();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:3000/tasks?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`http://localhost:3000/categories?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleSaveTask = async (taskData) => {
    const url = taskData.id 
      ? `http://localhost:3000/tasks/${taskData.id}`
      : 'http://localhost:3000/tasks';
    
    const method = taskData.id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...taskData, userId: user.id })
      });

      if (res.ok) {
        fetchTasks();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to save task", err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
      if (res.ok) fetchTasks();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const openAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleInvite = () => {
    navigator.clipboard.writeText(window.location.origin + "/invite");
    alert("Invite link copied to clipboard!");
  };

  const todoTasks = tasks.filter(t => t.status !== 'Completed');
  const completedTasksList = tasks.filter(t => t.status === 'Completed');

  // Calculate progress stats dynamically based on status categories
  const statusCats = categories.filter(c => c.type === 'Status');
  const progressStats = statusCats.map(cat => {
    const count = tasks.filter(t => t.status === cat.name).length;
    const percentage = tasks.length === 0 ? 0 : Math.round((count / tasks.length) * 100);
    // Assign a color class loosely based on name
    let statusClass = 'not-started';
    if (cat.name.toLowerCase().includes('progress')) statusClass = 'in-progress';
    if (cat.name.toLowerCase().includes('complet')) statusClass = 'completed';
    
    return { label: cat.name, percentage, statusClass };
  });

  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome back, {firstName} 👋
        </h1>
        <div className="team-members">
          <button className="invite-btn" onClick={handleInvite}>
            <Plus size={16} /> Invite
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* To-Do Section */}
        <div className="panel" style={{gridRow: 'span 2', overflowY: 'auto'}}>
          <div className="panel-header">
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b6b'}}>
              <Clock size={20} /> To-Do
            </div>
            <div style={{color: '#ff6b6b', fontSize: '14px', cursor: 'pointer'}} onClick={openAddModal}>+ Add task</div>
          </div>
          <div style={{fontSize: '14px', color: '#888', marginBottom: '16px'}}>
            {new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'long'})} • Today
          </div>
          
          {todoTasks.length === 0 ? (
            <div style={{textAlign: 'center', color: '#aaa', padding: '40px 0'}}>
              <p>No tasks yet. Add a new task!</p>
            </div>
          ) : (
            todoTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={() => openEditModal(task)} 
                onDelete={() => handleDeleteTask(task.id)} 
              />
            ))
          )}
        </div>

        {/* Task Status Section */}
        <div className="panel">
          <div className="panel-header">
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b6b'}}>
              <Clock size={20} /> Task Status
            </div>
          </div>
          <div className="progress-section">
            {progressStats.length === 0 ? (
              <div style={{color: '#888', fontSize: '14px'}}>Add status categories to see stats.</div>
            ) : (
              progressStats.map(stat => (
                <ProgressRing 
                  key={stat.label} 
                  label={stat.label} 
                  percentage={stat.percentage} 
                  statusClass={stat.statusClass} 
                />
              ))
            )}
          </div>
        </div>

        {/* Completed Task Section */}
        <div className="panel" style={{ overflowY: 'auto' }}>
          <div className="panel-header">
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b6b'}}>
              <CheckCircle2 size={20} /> Completed Task
            </div>
          </div>
          
          {completedTasksList.length === 0 ? (
            <div style={{textAlign: 'center', color: '#aaa', padding: '20px 0'}}>
              <p>No completed tasks.</p>
            </div>
          ) : (
            completedTasksList.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onEdit={() => openEditModal(task)} 
                onDelete={() => handleDeleteTask(task.id)} 
              />
            ))
          )}
        </div>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask} 
        taskToEdit={taskToEdit} 
        categories={categories}
      />
    </div>
  );
}
