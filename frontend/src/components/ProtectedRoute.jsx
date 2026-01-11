// import React from 'react';
// import "../pages/payment.css";
// import { Navigate, useLocation } from 'react-router-dom';


// export default function ProtectedRoute({ children }) {
// const token = localStorage.getItem('admin_token');
// const location = useLocation();


// if (!token) return <Navigate to="/admin/login" state={{ from: location }} replace />;


// return children;
// }
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
