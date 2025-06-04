import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-placeholder"></div>
      </div>
      <nav className="nav-menu">
        <button className="nav-item active" onClick={() => navigate('/dashboard')}>
          <div className="nav-icon home-icon"></div>
        </button>
        <button className="nav-item" onClick={() => navigate('/school')}>
          <div className="nav-icon school-icon"></div>
        </button>
        <button className="nav-item" onClick={() => navigate('/campus')}>
          <div className="nav-icon campus-icon"></div>
        </button>
        <button className="nav-item" onClick={() => navigate('/profile')}>
          <div className="nav-icon profile-icon"></div>
        </button>
      </nav>
      <div className="sidebar-footer">
        <button className="nav-item" onClick={() => navigate('/settings')}>
          <div className="nav-icon settings-icon"></div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
