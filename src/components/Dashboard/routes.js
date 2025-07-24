import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './services/auth';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export { PrivateRoute, PublicRoute };