import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authocontex";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { authData } = useContext(AuthContext);

  if (!authData) {
    return <Navigate to="/" />;
  }

  if (requiredRole && authData.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
