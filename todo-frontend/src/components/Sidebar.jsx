import { NavLink } from 'react-router-dom';
import { LayoutDashboard, AlertCircle, CheckSquare, List, LogOut } from 'lucide-react';

export default function Sidebar({ user, onLogout }) {
  const profileName = user?.name || "Sundar Gurung";
  const profileEmail = user?.email || "sundargurung360@gmail.com";
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="profile-name" style={{marginTop: '20px'}}>{profileName}</div>
        <div className="profile-email">{profileEmail}</div>
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
