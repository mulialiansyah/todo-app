import { Search, Bell, Calendar } from 'lucide-react';

export default function Header() {
  return (
    <header className="dashboard-header">
      <div className="logo">
        <span className="highlight">Dash</span>board
      </div>

      <div className="search-bar">
        <Search size={18} color="#8A92A6" />
        <input type="text" placeholder="Search your task here..." />
        <button className="search-btn">
          <Search size={16} />
        </button>
      </div>

      <div className="header-actions">
        <button className="action-icon">
          <Bell size={20} />
        </button>
        <button className="action-icon">
          <Calendar size={20} />
        </button>
        <div className="date-display">
          <div className="day">Tuesday</div>
          <div className="date">20/06/2023</div>
        </div>
      </div>
    </header>
  );
}
