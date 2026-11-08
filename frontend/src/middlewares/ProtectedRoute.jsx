import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

/**
 * Middleware untuk memproteksi halaman yang membutuhkan autentikasi.
 * Jika pengguna belum login, akan otomatis diarahkan ke /login dengan menyimpan
 * lokasi halaman asal (location) sehingga setelah login bisa diarahkan kembali.
 *
 * @param {React.ReactNode} children - Komponen halaman yang dilindungi
 * @param {Array<string>} [allowedRoles] - Daftar role yang diizinkan (opsional)
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  // 1. Cek apakah user sudah login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Cek apakah user memiliki role yang sesuai (jika ditentukan)
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

