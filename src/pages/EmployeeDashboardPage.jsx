import React, { useState } from 'react';
import Layout from '../components/UI/Layout';
import MyAttendanceTable from '../components/Dashboard/EmployeeDashboard/MyAttendanceTable';

const EmployeeDashboard = () => {
  const [filters, setFilters] = useState({
    month: '',
    date: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
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
              <h1 className="text-2xl font-bold text-accent">Appalo Employee Dashboard</h1>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => {}}
                className="px-4 py-2 bg-primary-300 text-accent rounded-lg hover:bg-secondary-300 transition-colors"
              >
                My Attendance
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-secondary-300 text-accent rounded-lg hover:bg-primary-200 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-4 mb-6">
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
          </div>

          {/* Attendance Table */}
          <div className="bg-primary-300 rounded-lg border border-secondary-300">
            <MyAttendanceTable filters={filters} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard; 