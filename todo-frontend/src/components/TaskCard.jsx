import { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';

export default function TaskCard({ task, isSelected, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  
  const hasPriority = Boolean(task.priority);
  const isCompleted = task.status === 'Completed';

  // Fallback colors for status/priority since we fetch from DB now
  let statusColor = '#000';
  if (task.status?.toLowerCase().includes('progress')) statusColor = '#4e95ff';
  else if (task.status?.toLowerCase().includes('complet')) statusColor = '#28c76f';
  else statusColor = '#ff474d';

  let priorityColor = '#000';
  if (task.priority?.toLowerCase() === 'extreme') priorityColor = '#ff474d';
  else if (task.priority?.toLowerCase() === 'moderate') priorityColor = '#4e95ff';
  else priorityColor = '#888';

  return (
    <div className="task-card" style={{ backgroundColor: isSelected ? '#f8f9fa' : 'white', position: 'relative' }}>
      <div className="task-info">
        <div className="task-title">
          <span style={{ color: statusColor }}>⭕</span> {task.title}
        </div>
        <div className="task-desc">
          {task.description || task.desc}
        </div>
        
        <div className="task-meta">
          {hasPriority && (
            <span>Priority: <span style={{ color: priorityColor }}>{task.priority}</span></span>
          )}
          <span>Status: <span style={{ color: statusColor }}>{task.status}</span></span>
          
          {(task.date || task.createdAt) && !isCompleted && (
             <span style={{ color: '#aaa', marginLeft: 'auto' }}>
               Created on: {new Date(task.createdAt || task.date).toLocaleDateString()}
             </span>
          )}
          {isCompleted && task.updatedAt && (
             <span style={{ color: '#aaa', marginLeft: 'auto' }}>
               {new Date(task.updatedAt).toLocaleDateString()}
             </span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', position: 'relative' }}>
        <MoreHorizontal 
          size={20} 
          color="#ccc" 
          style={{ cursor: 'pointer' }}
          onClick={() => setShowMenu(!showMenu)}
        />
        
        {showMenu && (
          <div className="task-menu-dropdown">
            <div className="task-menu-item" onClick={() => { setShowMenu(false); onEdit?.(); }}>
              <Edit2 size={14} /> Edit
            </div>
            <div className="task-menu-item" style={{color: '#ff474d'}} onClick={() => { setShowMenu(false); onDelete?.(); }}>
              <Trash2 size={14} /> Delete
            </div>
          </div>
        )}

        {(task.image || task.id % 2 === 0) && (
          <img 
            src={task.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100"} 
            className="task-image" 
            alt="Task" 
          />
        )}
      </div>
    </div>
  );
}
