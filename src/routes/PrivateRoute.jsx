// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// A wrapper to protect private routes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected page
  return children;
};

export default PrivateRoute;
