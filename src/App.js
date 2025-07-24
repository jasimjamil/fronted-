import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboardPage'));
const ManagerDashboard = lazy(() => import('./pages/ManagerDashboardPage'));
const EmployeeDashboard = lazy(() => import('./pages/EmployeeDashboardPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-primary-300">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-secondary-300"></div>
  </div>
);

// Enhanced authentication context
const PrivateRoute = ({ children, requiredRole }) => {
  const tokenData = localStorage.getItem('token');
  
  if (!tokenData) {
    return <Navigate to="/login" replace />;
  }

  const { role, timestamp } = JSON.parse(tokenData);
  
  // Optional: Add token expiration logic (e.g., 24 hours)
  const isTokenExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
  
  if (isTokenExpired) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    switch(role) {
      case 'admin': return <Navigate to="/dashboard/admin" replace />;
      case 'manager': return <Navigate to="/dashboard/manager" replace />;
      case 'employee': return <Navigate to="/dashboard/employee" replace />;
      default: return <Navigate to="/login" replace />;
    }
  }

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          <Route 
            path="/dashboard/admin" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/manager" 
            element={
              <PrivateRoute requiredRole="manager">
                <ManagerDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/employee" 
            element={
              <PrivateRoute requiredRole="employee">
                <EmployeeDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />} 
          />
          <Route 
            path="*" 
            element={
              <div className="flex items-center justify-center min-h-screen bg-primary-300">
                <h1 className="text-2xl text-accent">404 - Page Not Found</h1>
              </div>
            } 
          />
        </Routes>
      </Suspense>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#1A1C22',
              color: '#A7ABB2',
            },
          },
          error: {
            style: {
              background: '#5A5C6A',
              color: '#A7ABB2',
            },
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;