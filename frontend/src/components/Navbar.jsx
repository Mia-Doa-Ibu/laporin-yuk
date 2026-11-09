import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Home, FilePlus, Inbox, User, Menu, X, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, role, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-semibold tracking-wide text-black hover:text-sky-600 transition-colors"
          >
            BERANDA
          </Link>

          {(!isAuthenticated || role === "pelapor") && (
            <>
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
            </>
          )}

          {isAuthenticated && role === "admin" && (
            <Link
              to="/admin/verifikasi"
              className="text-sm font-semibold tracking-wide text-[#0082c8] hover:underline transition-colors"
            >
              PANEL ADMIN
            </Link>
          )}

          {isAuthenticated && role === "team_branch" && (
            <Link
              to="/cabang"
              className="text-sm font-semibold tracking-wide text-[#0082c8] hover:underline transition-colors"
            >
              PANEL CABANG
            </Link>
          )}

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

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-800 hover:text-black focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0c1322] flex flex-col justify-between p-6 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-3 mb-8">
            <div>
              <h2 className="text-white font-extrabold text-base tracking-wider">
                MENU
              </h2>
              <div className="w-14 h-[2px] bg-gray-500/50 mt-1.5" />
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-400 hover:text-white p-1 cursor-pointer"
              aria-label="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-4 text-gray-200 hover:text-white text-sm font-semibold tracking-wider transition-colors"
            >
              <Home className="w-5 h-5 text-gray-300 flex-shrink-0" />
              <span>BERANDA</span>
            </Link>

            <Link
              to="/laporan"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-4 text-gray-200 hover:text-white text-sm font-semibold tracking-wider transition-colors"
            >
              <FilePlus className="w-5 h-5 text-gray-300 flex-shrink-0" />
              <span>LAPORAN</span>
            </Link>

            <Link
              to="/status"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-4 text-gray-200 hover:text-white text-sm font-semibold tracking-wider transition-colors"
            >
              <Inbox className="w-5 h-5 text-gray-300 flex-shrink-0" />
              <span>STATUS</span>
            </Link>

            <Link
              to={isAuthenticated ? getDashboardPath() : "/login"}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-4 text-gray-200 hover:text-white text-sm font-semibold tracking-wider transition-colors"
            >
              <User className="w-5 h-5 text-gray-300 flex-shrink-0" />
              <span>PROFIL</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-800">
          {isAuthenticated ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <FaUserCircle className="text-sky-400 text-base flex-shrink-0" />
                <span className="truncate">{user?.email || "Pengguna"}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>KELUAR</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center justify-center bg-[#0284c7] hover:bg-[#0369a1] text-white py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors"
            >
              LOGIN
            </Link>
          )}
        </div>
      </aside>
    </header>
  );
}
