import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaRegBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "../stores/useAuthStore";
import { useCabangStore } from "../stores/useCabangStore";

export default function NavbarCabang({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { counts } = useCabangStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="w-full px-6 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        
        <Link
          to="/"
          className="text-xl sm:text-2xl font-black italic tracking-wide text-black flex-shrink-0"
        >
          LAPORIN YUK!
        </Link>

        
        <div className="flex-1 max-w-xl mx-2 sm:mx-6">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3.5 text-gray-500 text-xs pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari...."
              className="w-full bg-white border border-gray-400 rounded-md pl-9 pr-4 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all"
            />
          </div>
        </div>

        
        <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
          
          <div
            className="relative cursor-pointer"
            title={`${counts?.pending || 0} laporan menunggu verifikasi`}
          >
            <FaRegBell className="w-6 h-6 text-black hover:text-gray-700 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-[#b91c1c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {counts?.pending ?? 0}
            </span>
          </div>

          
          <div
            className="w-8 h-8 rounded-full bg-[#a39e9e] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm cursor-pointer"
            title="Profil Tim Cabang"
          >
            <FaUser className="text-white w-4 h-4 mt-0.5" />
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
