import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

/**
 * Middleware untuk halaman publik khusus tamu (Guest), seperti /login dan /register.
 * Jika pengguna sudah dalam keadaan login, tidak perlu mengakses halaman login lagi
 * dan langsung diarahkan ke halaman utama atau dashboard sesuai role.
 */
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

