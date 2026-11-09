import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/admin/verifikasi" replace />;
    }
    if (role === "team_branch") {
      return <Navigate to="/cabang" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

