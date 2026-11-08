import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "../stores/useAuthStore";

export default function NavbarAdmin({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">
        <Link to="/" className="text-xl font-black tracking-tight text-black flex-shrink-0">
          LAPORIN YUK!
        </Link>

        <div className="flex-1 max-w-lg">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3.5 text-gray-400 text-xs" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari...."
              className="w-full bg-white border border-gray-400 rounded-md pl-9 pr-4 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="relative cursor-pointer">
            <FaBell className="w-5 h-5 text-black hover:text-gray-700 transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#b91c1c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700">
            <FaUserCircle className="w-6 h-6 text-gray-500" />
            <span className="hidden sm:inline">{user?.email || "Admin"}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Keluar"
            className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer p-1"
          >
            <FaSignOutAlt className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
