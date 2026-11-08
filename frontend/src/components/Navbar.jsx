import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, role, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDashboardPath = () => {
    if (role === "admin") return "/admin/verifikasi";
    if (role === "team_branch") return "/cabang";
    return "/laporan";
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-black tracking-tight text-black">
          LAPORIN YUK!
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-semibold tracking-wide text-black hover:text-sky-600 transition-colors"
          >
            BERANDA
          </Link>
          <Link
            to="/laporan"
            className="text-sm font-semibold tracking-wide text-black hover:text-sky-600 transition-colors"
          >
            LAPORAN
          </Link>
          <Link
            to="/status"
            className="text-sm font-semibold tracking-wide text-black hover:text-sky-600 transition-colors"
          >
            STATUS
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link
                to={getDashboardPath()}
                className="flex items-center space-x-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md transition-colors"
                title="Menuju Dashboard"
              >
                <FaUserCircle className="text-sky-600 text-sm" />
                <span className="max-w-[120px] truncate">
                  {user?.email?.split("@")[0] || "Akun"}
                </span>
                <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-mono uppercase">
                  {role || "user"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center space-x-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md transition-colors cursor-pointer"
                title="Keluar dari akun"
              >
                <FaSignOutAlt />
                <span>KELUAR</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors"
            >
              LOGIN
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
