import React from 'react';
import Layout from '../components/UI/Layout';

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-accent">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-secondary-300 p-6 rounded-lg shadow-custom text-accent">
            <h2 className="text-2xl font-semibold mb-4">Total Employees</h2>
            <p className="text-4xl font-bold">250</p>
          </div>
          <div className="bg-secondary-300 p-6 rounded-lg shadow-custom text-accent">
            <h2 className="text-2xl font-semibold mb-4">Active Teams</h2>
            <p className="text-4xl font-bold">12</p>
          </div>
          <div className="bg-secondary-300 p-6 rounded-lg shadow-custom text-accent">
            <h2 className="text-2xl font-semibold mb-4">Attendance Rate</h2>
            <p className="text-4xl font-bold">95%</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard; 