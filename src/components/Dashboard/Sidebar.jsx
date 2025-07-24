import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  CogIcon, 
  LogoutIcon 
} from '@heroicons/react/24/solid';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Get company name from localStorage
  const authData = JSON.parse(localStorage.getItem('token') || '{}');
  const companyName = authData.companyName || 'AttendancePro';

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  const menuItems = [
    { 
      icon: <HomeIcon className="h-5 w-5" />, 
      label: 'Dashboard', 
      tab: 'dashboard' 
    },
    { 
      icon: <UserIcon className="h-5 w-5" />, 
      label: 'Profile', 
      tab: 'profile' 
    },
    { 
      icon: <CogIcon className="h-5 w-5" />, 
      label: 'Settings', 
      tab: 'settings' 
    }
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-primary-300 text-accent border-r border-secondary-300 shadow-custom">
      <div className="p-6 border-b border-secondary-300">
        <h2 className="text-2xl font-bold text-accent tracking-tight">
          {companyName}
        </h2>
        <p className="text-sm text-secondary-50">Workforce Management</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`
              w-full flex items-center p-3 text-left 
              ${activeTab === item.tab 
                ? 'bg-secondary-300 text-accent' 
                : 'text-secondary-50 hover:bg-secondary-300/50'}
              transition-colors duration-200
            `}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </button>
        ))}
        
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center p-3 text-left 
            text-secondary-50 hover:bg-secondary-300/50 
            transition-colors duration-200 mt-auto
          "
        >
          <LogoutIcon className="h-5 w-5" />
          <span className="ml-3">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
