import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Wait until auth state is ready
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // User not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Wrong role
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;