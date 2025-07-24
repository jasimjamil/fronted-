import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import AdminPanel from '../components/Dashboard/AdminPanel';
import EmployeeManager from '../components/Dashboard/EmployeeManager';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 bg-white p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2">
              <img 
                src="https://via.placeholder.com/40" 
                alt="User" 
                className="w-10 h-10 rounded-full" 
              />
              <span className="text-sm font-medium text-neutral-700">Admin User</span>
            </div>
          </div>
        </header>
        
        <div className="dashboard-content">
          {activeTab === 'dashboard' && <AdminPanel />}
          {activeTab === 'employees' && <EmployeeManager />}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;