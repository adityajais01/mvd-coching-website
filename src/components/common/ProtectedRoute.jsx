import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, userData, isAdmin } = useAuth();

  // 1. Not logged in -> Redirect to Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 2. Requires Admin but user is Student -> Redirect to Student Dashboard
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;