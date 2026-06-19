import { NavLink } from 'react-router-dom';
import { LayoutDashboard, AlertCircle, CheckSquare, List, LogOut } from 'lucide-react';

export default function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <img 
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" 
          alt="Profile" 
          className="profile-img"
        />
        <div className="profile-name">Sundar Gurung</div>
        <div className="profile-email">sundargurung360@gmail.com</div>
      </div>

      <nav className="nav-menu">
        <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/vital" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <AlertCircle size={20} />
          Vital Task
        </NavLink>
        <NavLink to="/my-tasks" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <CheckSquare size={20} />
          My Task
        </NavLink>
        <NavLink to="/categories" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <List size={20} />
          Task Categories
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}
