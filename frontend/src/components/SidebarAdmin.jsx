import { Link } from "react-router-dom";
import {
  FaRegFileAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaInbox,
  FaClock,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export default function SidebarAdmin({ activeMenu = "wilayah" }) {
  return (
    <aside className="w-full lg:w-72 bg-[#0c1322] text-white p-6 flex-shrink-0">
      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-bold tracking-wider uppercase text-gray-200 mb-4">
            MANAJEMEN TIM
          </h2>
          <ul className="space-y-3.5 text-xs font-medium">
            <li>
              <Link
                to="/admin/verifikasi"
                className={`flex items-center space-x-3 w-full text-left transition-colors ${
                  activeMenu === "verifikasi"
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaRegFileAlt className="w-4 h-4 text-gray-300" />
                <span>Verifikasi Pendaftar</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/wilayah"
                className={`flex items-center space-x-3 w-full text-left transition-colors ${
                  activeMenu === "wilayah"
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaMapMarkerAlt className="w-4 h-4 text-gray-300" />
                <span>Kelola Wilayah</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/data-tim"
                className={`flex items-center space-x-3 w-full text-left transition-colors ${
                  activeMenu === "data-tim"
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaUsers className="w-4 h-4 text-gray-300" />
                <span>Data tim cabang</span>
              </Link>
            </li>
          </ul>
        </div>

        <hr className="border-gray-800" />

        <div>
          <h2 className="text-xs font-bold tracking-wider uppercase text-gray-200 mb-4">
            MENU ANTREAN
          </h2>
          <ul className="space-y-3.5 text-xs font-medium">
            <li>
              <Link
                to="/admin/laporan"
                className={`flex items-center space-x-3 w-full text-left transition-colors ${
                  activeMenu === "semua"
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaInbox className="w-4 h-4 text-gray-300" />
                <span>Semua laporan</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/laporan/menunggu"
                className={`flex items-center space-x-3 w-full text-left transition-colors ${
                  activeMenu === "menunggu"
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaClock className="w-3.5 h-3.5 text-sky-400" />
                <span>Menunggu verifikasi</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/laporan/valid"
                className={`flex items-center space-x-3 w-full text-left transition-colors ${
                  activeMenu === "valid"
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Laporan Valid</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/laporan/ditolak"
                className={`flex items-center space-x-3 w-full text-left transition-colors ${
                  activeMenu === "ditolak"
                    ? "text-white font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <FaTimes className="w-3.5 h-3.5 text-rose-400" />
                <span>Laporan Ditolak</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}