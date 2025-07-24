import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-primary-300">
      <Sidebar />
      <main className="flex-1 ml-20 md:ml-64 p-6 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default Layout; 