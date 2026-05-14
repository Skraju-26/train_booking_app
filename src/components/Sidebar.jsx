import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Briefcase, Phone, LogOut, Train } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout, redirect to login
    navigate('/login');
  };

  return (
    <div className="sidebar animate-fade-in">
      <div className="sidebar-logo">
        <Train size={32} />
        <span>TrainBooker</span>
      </div>
      
      <div className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <User size={20} />
          <span>Profile / Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/services" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Briefcase size={20} />
          <span>Services</span>
        </NavLink>
        
        <NavLink 
          to="/contact" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Phone size={20} />
          <span>Contact</span>
        </NavLink>

        <div style={{ marginTop: 'auto', padding: '0 16px', position: 'absolute', bottom: '32px', width: '100%' }}>
          <button 
            className="nav-item" 
            style={{ width: 'calc(100% - 32px)', border: 'none', background: 'transparent', cursor: 'pointer' }}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
