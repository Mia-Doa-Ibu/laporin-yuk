import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function GuestRoute({ children }) {
  const { isAuthenticated, role } = useAuthStore();

  if (isAuthenticated) {
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

