import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  if (!token) {
    // If there's no token and the route is a user route, redirect to user login
    if (allowedRoles.includes('user')) {
      return <Navigate to="/user-login" replace />;
    }
    // For non-user routes, redirect to home
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoute;