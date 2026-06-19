import { useState, useEffect } from 'react';
import { Trash2, Edit3 } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

export default function TasksLayout({ title, user }) {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchCategories();
    }
  }, [user, title]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:3000/tasks?userId=${user.id}`);
      if (res.ok) {
        let data = await res.json();
        // Filter by title
        if (title === "Vital Tasks") {
          data = data.filter(t => t.priority?.toLowerCase() === 'extreme');
        }
        setTasks(data);
        if (data.length > 0) setSelectedTask(data[0]);
        else setSelectedTask(null);
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
      if (res.ok) {
        if (selectedTask?.id === id) setSelectedTask(null);
        fetchTasks();
      }
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  let statusColor = '#000';
  if (selectedTask?.status?.toLowerCase().includes('progress')) statusColor = '#4e95ff';
  else if (selectedTask?.status?.toLowerCase().includes('complet')) statusColor = '#28c76f';
  else statusColor = '#ff474d';

  let priorityColor = '#000';
  if (selectedTask?.priority?.toLowerCase() === 'extreme') priorityColor = '#ff474d';
  else if (selectedTask?.priority?.toLowerCase() === 'moderate') priorityColor = '#4e95ff';
  else priorityColor = '#888';

  return (
    <div className="dashboard-content">
      <div className="vital-tasks-layout">
        
        <div className="panel" style={{overflowY: 'auto'}}>
          <div className="panel-header" style={{color: '#333'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
               <span style={{borderBottom: '3px solid #ff6b6b', paddingBottom: '4px'}}>{title}</span>
            </div>
            <div style={{color: '#ff6b6b', fontSize: '14px', cursor: 'pointer'}} onClick={() => {setTaskToEdit(null); setIsModalOpen(true);}}>+ Add task</div>
          </div>
          
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} onClick={() => setSelectedTask(task)}>
                <TaskCard 
                  task={task} 
                  isSelected={selectedTask?.id === task.id} 
                  onEdit={() => openEditModal(task)}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              </div>
            ))
          ) : (
            <div style={{textAlign: 'center', color: '#aaa', padding: '40px 0'}}>
              <p>No tasks available.</p>
            </div>
          )}
        </div>

        <div className="panel task-detail-panel">
          {selectedTask ? (
            <>
              {selectedTask.image && <img src={selectedTask.image} className="task-detail-image" alt="Task Detail" />}
              
              <div className="task-detail-header">
                <div style={{flex: 1}}>
                  <h2 className="task-detail-title">{selectedTask.title}</h2>
                  <div className="task-detail-meta">
                    <span><strong>Priority:</strong> <span style={{color: priorityColor}}>{selectedTask.priority}</span></span>
                    <span><strong>Status:</strong> <span style={{color: statusColor}}>{selectedTask.status}</span></span>
                    <span style={{color: '#aaa', marginTop: '4px'}}>
                      Created on: {new Date(selectedTask.createdAt || selectedTask.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="task-detail-body">
                <p>{selectedTask.description || selectedTask.desc || 'No description provided.'}</p>
              </div>

              <div className="action-buttons">
                <button className="btn-icon btn-delete" onClick={() => handleDeleteTask(selectedTask.id)}>
                  <Trash2 size={20} />
                </button>
                <button className="btn-icon btn-edit" onClick={() => openEditModal(selectedTask)}>
                  <Edit3 size={20} />
                </button>
              </div>
            </>
          ) : (
             <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#aaa'}}>
                <p>Select a task to view details</p>
             </div>
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
