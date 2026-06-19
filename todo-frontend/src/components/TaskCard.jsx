import { MoreHorizontal } from 'lucide-react';

export default function TaskCard({ task, isSelected }) {
  // Check if it's a dashboard task vs completed task vs vital task
  const hasPriority = Boolean(task.priority);
  const isCompleted = task.status === 'Completed';

  return (
    <div className="task-card" style={{ backgroundColor: isSelected ? '#f8f9fa' : 'white' }}>
      <div className="task-info">
        <div className="task-title">
          <span style={{ color: task.statusColor }}>⭕</span> {task.title}
        </div>
        <div className="task-desc">
          {task.desc}
        </div>
        
        <div className="task-meta">
          {hasPriority && (
            <span>Priority: <span style={{ color: task.priorityColor }}>{task.priority}</span></span>
          )}
          <span>Status: <span style={{ color: task.statusColor }}>{task.status}</span></span>
          
          {/* Dashboard vs detail layout handle dates slightly differently in UI, but we can standardize */}
          {task.date && !isCompleted && (
             <span style={{ color: '#aaa', marginLeft: 'auto' }}>Created on: {task.date}</span>
          )}
          {isCompleted && task.completedTime && (
             <span style={{ color: '#aaa', marginLeft: 'auto' }}>{task.completedTime}</span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <MoreHorizontal size={20} color="#ccc" />
        <img src={task.image} className="task-image" alt="Task" />
      </div>
    </div>
  );
}
