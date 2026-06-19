import { useState, useEffect } from 'react';
import { Search, Bell, Calendar as CalendarIcon, CornerUpLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Header({ user }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user && showNotifications) {
      fetchUpcomingTasks();
    }
  }, [user, showNotifications]);

  const fetchUpcomingTasks = async () => {
    try {
      const res = await fetch(`http://localhost:3000/tasks?userId=${user.id}`);
      if (res.ok) {
        const tasks = await res.json();
        const now = new Date();
        const upcoming = tasks.filter(t => {
          if (t.status === 'Completed' || !t.deadline) return false;
          const deadlineDate = new Date(t.deadline);
          const diffTime = deadlineDate - now;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          // Show tasks that are due in the next 3 days or overdue
          return diffDays <= 3;
        });
        setNotifications(upcoming);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="logo">
        <span className="highlight">Dash</span>board
      </div>

      <div className="search-bar">
        <Search size={18} color="#8A92A6" />
        <input 
          type="text" 
          placeholder="Search your task here..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" onClick={() => alert(`Searching for: ${searchQuery}`)}>
          <Search size={16} />
        </button>
      </div>

      <div className="header-actions" style={{ position: 'relative' }}>
        <button className="action-icon" onClick={() => { setShowNotifications(!showNotifications); setShowCalendar(false); }} style={{ position: 'relative' }}>
          <Bell size={20} />
          {notifications.length > 0 && <span style={{position: 'absolute', top: 4, right: 6, width: 8, height: 8, backgroundColor: '#ff474d', borderRadius: '50%'}}></span>}
        </button>
        <button className="action-icon" onClick={() => { setShowCalendar(!showCalendar); setShowNotifications(false); }}>
          <CalendarIcon size={20} />
        </button>

        {showNotifications && (
          <div className="popup-dropdown notification-dropdown">
            <div className="popup-header">
              <h3>Notifications</h3>
              <CornerUpLeft size={16} color="#ff474d" style={{cursor: 'pointer'}} onClick={() => setShowNotifications(false)} />
            </div>
            <div className="popup-subtitle">Approaching Deadlines</div>
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div style={{fontSize: '13px', color: '#888', textAlign: 'center'}}>No approaching deadlines!</div>
              ) : (
                notifications.map(notif => {
                  let priorityColor = '#ff474d';
                  if (notif.priority?.toLowerCase() === 'moderate') priorityColor = '#4e95ff';
                  
                  return (
                    <div key={notif.id} className="notification-item">
                      <div className="notif-content">
                        <p><strong>{notif.title}</strong> is due soon! <span className="notif-time">{new Date(notif.deadline).toLocaleDateString()}</span></p>
                        <div className="notif-priority">Priority: <span style={{color: priorityColor}}>{notif.priority}</span></div>
                      </div>
                      <div className="notif-placeholder-img"></div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {showCalendar && (
          <div className="popup-dropdown calendar-dropdown">
            <div className="popup-header">
              <h3>Calendar</h3>
              <CornerUpLeft size={16} color="#ff474d" style={{cursor: 'pointer'}} onClick={() => setShowCalendar(false)} />
            </div>
            <div className="calendar-input">
              <input type="text" value="June 6, 2023" readOnly />
              <span>x</span>
            </div>
            <div className="calendar-nav">
              <button><ChevronLeft size={16} /></button>
              <span>June 2023</span>
              <button><ChevronRight size={16} /></button>
            </div>
            <div className="calendar-grid">
              <div className="day-name">MON</div><div className="day-name">TUE</div><div className="day-name">WED</div><div className="day-name">THU</div><div className="day-name">FRI</div><div className="day-name">SAT</div><div className="day-name">SUN</div>
              
              <div className="day">1</div><div className="day">2</div><div className="day">3</div><div className="day">4</div><div className="day">5</div><div className="day active">6</div>
              <div className="day">7</div><div className="day">8</div><div className="day">9</div><div className="day">10</div><div className="day">11</div><div className="day">12</div><div className="day">13</div>
              <div className="day">14</div><div className="day">15</div><div className="day">16</div><div className="day">17</div><div className="day">18</div><div className="day">19</div><div className="day">20</div>
              <div className="day">21</div><div className="day">22</div><div className="day">23</div><div className="day">24</div><div className="day">25</div><div className="day">26</div><div className="day">27</div>
              <div className="day">28</div><div className="day">29</div><div className="day">30</div><div className="day">31</div>
            </div>
          </div>
        )}

        <div className="date-display">
          <div className="day">Tuesday</div>
          <div className="date">20/06/2023</div>
        </div>
      </div>
    </header>
  );
}
