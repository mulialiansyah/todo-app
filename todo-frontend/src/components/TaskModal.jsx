import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, taskToEdit, categories }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Not Started',
    priority: 'Moderate',
    deadline: ''
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        ...taskToEdit,
        deadline: taskToEdit.deadline ? taskToEdit.deadline.split('T')[0] : ''
      });
    } else {
      setTask({ title: '', description: '', status: 'Not Started', priority: 'Moderate', deadline: '' });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
  };

  const statusCategories = categories.filter(c => c.type === 'Status');
  const priorityCategories = categories.filter(c => c.type === 'Priority');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h3>
          <X size={20} style={{cursor: 'pointer'}} onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Task Title</label>
            <input 
              type="text" 
              className="modal-input"
              value={task.title}
              onChange={(e) => setTask({...task, title: e.target.value})}
              required
            />
          </div>
          
          <div className="input-group" style={{marginTop: '16px'}}>
            <label>Description</label>
            <textarea 
              className="modal-input"
              rows="3"
              value={task.description}
              onChange={(e) => setTask({...task, description: e.target.value})}
            ></textarea>
          </div>

          <div style={{display: 'flex', gap: '16px', marginTop: '16px'}}>
            <div className="input-group" style={{flex: 1}}>
              <label>Status</label>
              <select 
                className="modal-input"
                value={task.status}
                onChange={(e) => setTask({...task, status: e.target.value})}
              >
                {statusCategories.length === 0 && <option value="Not Started">Not Started</option>}
                {statusCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="input-group" style={{flex: 1}}>
              <label>Priority</label>
              <select 
                className="modal-input"
                value={task.priority}
                onChange={(e) => setTask({...task, priority: e.target.value})}
              >
                {priorityCategories.length === 0 && <option value="Moderate">Moderate</option>}
                {priorityCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="input-group" style={{marginTop: '16px'}}>
            <label>Deadline</label>
            <input 
              type="date" 
              className="modal-input"
              value={task.deadline}
              onChange={(e) => setTask({...task, deadline: e.target.value})}
            />
          </div>

          <div style={{marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
