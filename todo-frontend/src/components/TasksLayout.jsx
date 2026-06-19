import { Trash2, Edit3 } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TasksLayout({ title, tasks, selectedTask }) {
  return (
    <div className="dashboard-content">
      <div className="vital-tasks-layout">
        
        <div className="panel" style={{overflowY: 'auto'}}>
          <div className="panel-header" style={{color: '#333'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
               <span style={{borderBottom: '3px solid #ff6b6b', paddingBottom: '4px'}}>{title}</span>
            </div>
          </div>
          
          {tasks && tasks.length > 0 ? (
            tasks.map((task, idx) => (
              <TaskCard key={task.id} task={task} isSelected={idx === 0} />
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
              <img src={selectedTask.image} className="task-detail-image" alt="Task Detail" />
              
              <div className="task-detail-header">
                <div style={{flex: 1}}>
                  <h2 className="task-detail-title">{selectedTask.title}</h2>
                  <div className="task-detail-meta">
                    <span><strong>Priority:</strong> <span style={{color: selectedTask.priorityColor}}>{selectedTask.priority}</span></span>
                    <span><strong>Status:</strong> <span style={{color: selectedTask.statusColor}}>{selectedTask.status}</span></span>
                    <span style={{color: '#aaa', marginTop: '4px'}}>Created on: {selectedTask.date}</span>
                  </div>
                </div>
              </div>

              <div className="task-detail-body">
                {selectedTask.details && selectedTask.details.map((par, i) => {
                  if (par.type === 'text') {
                    return <p key={i}>{par.content}</p>;
                  } else if (par.type === 'list') {
                    return (
                      <ul key={i}>
                        {par.items.map((li, j) => <li key={j}>{li}</li>)}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>

              <div className="action-buttons">
                <button className="btn-icon btn-delete">
                  <Trash2 size={20} />
                </button>
                <button className="btn-icon btn-edit">
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
    </div>
  );
}
