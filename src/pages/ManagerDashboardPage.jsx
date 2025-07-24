import React, { useState } from 'react';
import Layout from '../components/UI/Layout';
import MyAttendanceTable from '../components/Dashboard/ManagerDashboard/MyAttendanceTable';
import TeamAttendanceTable from '../components/Dashboard/ManagerDashboard/TeamAttendanceTable';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('myAttendance');
  const [filters, setFilters] = useState({
    month: '',
    date: '',
    employee: '',
    project: ''
  });

  const renderContent = () => {
    switch(activeTab) {
      case 'myAttendance':
        return <MyAttendanceTable filters={filters} />;
      case 'teamAttendance':
        return <TeamAttendanceTable filters={filters} />;
      default:
        return <MyAttendanceTable filters={filters} />;
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="bg-primary-300 min-h-screen p-6">
        <div className="bg-secondary-300 rounded-lg shadow-custom p-6">
          {/* Header with Logo and Navigation */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-primary-300 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-accent">A</span>
              </div>
              <h1 className="text-2xl font-bold text-accent">Appalo Manager Dashboard</h1>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('myAttendance')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'myAttendance' 
                    ? 'bg-primary-300 text-accent' 
                    : 'text-secondary-50 hover:bg-primary-200'
                }`}
              >
                My Attendance
              </button>
              <button 
                onClick={() => setActiveTab('teamAttendance')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'teamAttendance' 
                    ? 'bg-primary-300 text-accent' 
                    : 'text-secondary-50 hover:bg-primary-200'
                }`}
              >
                Team Attendance
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="px-4 py-2 bg-secondary-300 text-accent rounded-lg hover:bg-primary-200 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <select 
              name="month"
              value={filters.month}
              onChange={handleFilterChange}
              className="bg-primary-300 text-accent border border-secondary-300 rounded-lg px-3 py-2"
            >
              <option value="">Month</option>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>

            <select 
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="bg-primary-300 text-accent border border-secondary-300 rounded-lg px-3 py-2"
            >
              <option value="">Date</option>
              {Array.from({length: 31}, (_, i) => i + 1).map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>

            <select 
              name="employee"
              value={filters.employee}
              onChange={handleFilterChange}
              className="bg-primary-300 text-accent border border-secondary-300 rounded-lg px-3 py-2"
            >
              <option value="">Employee</option>
              <option value="john">John Doe</option>
              <option value="jane">Jane Smith</option>
            </select>

            <select 
              name="project"
              value={filters.project}
              onChange={handleFilterChange}
              className="bg-primary-300 text-accent border border-secondary-300 rounded-lg px-3 py-2"
            >
              <option value="">Project</option>
              <option value="project1">Project Alpha</option>
              <option value="project2">Project Beta</option>
            </select>
          </div>

          {/* Attendance Table */}
          <div className="bg-primary-300 rounded-lg border border-secondary-300">
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerDashboard; 