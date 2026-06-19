import { Plus, Clock, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard';
import ProgressRing from './ProgressRing';
import { dashboardTasks, completedTasks, progressStats } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome back, Sundar 👋
        </h1>
        <div className="team-members">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="team-avatar" alt="Team" />
          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100" className="team-avatar" alt="Team" />
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="team-avatar" alt="Team" />
          <div className="team-avatar" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#333', color: 'white', zIndex: 1}}>+4</div>
          <button className="invite-btn">
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
            <div style={{color: '#ff6b6b', fontSize: '14px', cursor: 'pointer'}}>+ Add task</div>
          </div>
          <div style={{fontSize: '14px', color: '#888', marginBottom: '16px'}}>20 June • Today</div>
          
          {dashboardTasks.length === 0 ? (
            <div style={{textAlign: 'center', color: '#aaa', padding: '40px 0'}}>
              <p>No tasks yet. Add a new task!</p>
            </div>
          ) : (
            dashboardTasks.map(task => (
              <TaskCard key={task.id} task={task} />
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
            {progressStats.map(stat => (
              <ProgressRing 
                key={stat.label} 
                label={stat.label} 
                percentage={stat.percentage} 
                statusClass={stat.statusClass} 
              />
            ))}
          </div>
        </div>

        {/* Completed Task Section */}
        <div className="panel">
          <div className="panel-header">
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b6b'}}>
              <CheckCircle2 size={20} /> Completed Task
            </div>
          </div>
          
          {completedTasks.length === 0 ? (
            <div style={{textAlign: 'center', color: '#aaa', padding: '20px 0'}}>
              <p>No completed tasks.</p>
            </div>
          ) : (
            completedTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
