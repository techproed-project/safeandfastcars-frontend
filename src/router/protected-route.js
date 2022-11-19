import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, admin }) => {
  const { isUserLogin, user } = useSelector((state) => state.auth);

  if (!isUserLogin) return <Navigate to="/auth?type=login" />;
  if( admin && !user.roles.includes("Administrator")) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
