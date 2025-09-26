import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, token } = useContext(AuthContext);

  // If not logged in → redirect to login
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // If roles are provided → check user role
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />; // redirect unauthorized users
  }

  // Authorized → render child route
  return children;
}
