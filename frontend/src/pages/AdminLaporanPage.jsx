import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaSearch,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
  FaCamera,
  FaClock,
} from "react-icons/fa";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import Footer from "../components/Footer";
import { useAdminStore } from "../stores/useAdminStore";

export default function AdminLaporanPage() {
  const { statusFilter } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    adminReports,
    fetchAdminReports,
    isLoading,
    error,
    successMessage,
  } = useAdminStore();

  const getBackendStatus = () => {
    if (statusFilter === "menunggu") return "pending";
    if (statusFilter === "valid") return "valid";
    if (statusFilter === "ditolak") return "invalid";
    return "";
  };

  useEffect(() => {
    const status = getBackendStatus();
    fetchAdminReports(status ? { status } : {});
  }, [statusFilter, fetchAdminReports]);

  const getActiveMenuName = () => {
    if (statusFilter === "menunggu") return "menunggu";
    if (statusFilter === "valid") return "valid";
    if (statusFilter === "ditolak") return "ditolak";
    return "semua";
  };

  const getPageTitle = () => {
    if (statusFilter === "menunggu") return "Laporan Menunggu Verifikasi";
    if (statusFilter === "valid") return "Laporan Terverifikasi Valid";
    if (statusFilter === "ditolak") return "Laporan Ditolak (Invalid)";
    return "Semua Antrean Laporan Publik";
  };

  const renderBadge = (status) => {
    switch (status) {
      case "valid":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
            <FaCheck className="text-[10px]" /> Laporan Valid
          </span>
        );
      case "invalid":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold px-3 py-1 rounded-full">
            <FaTimes className="text-[10px]" /> Laporan Ditolak
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-3 py-1 rounded-full">
            <FaClock className="text-[10px]" /> Menunggu Verifikasi
          </span>
        );
    }
  };

  const filteredReports = adminReports.filter((report) => {
    const q = searchTerm.toLowerCase();
    const title = (report.title || "").toLowerCase();
    const desc = (report.deskripsi || "").toLowerCase();
    const pelapor = (report.pelapor?.nama_lengkap || "").toLowerCase();
    const tim = (report.team_branch?.nama_tim || "").toLowerCase();
    const kec = (report.team_branch?.kecamatan?.nama_kecamatan || "").toLowerCase();
    return title.includes(q) || desc.includes(q) || pelapor.includes(q) || tim.includes(q) || kec.includes(q);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#e5e7eb] font-sans text-black antialiased">
      <NavbarAdmin searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-grow flex flex-col lg:flex-row bg-[#e5e7eb]">
        <SidebarAdmin activeMenu={getActiveMenuName()} />

        <main className="flex-1 p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                {getPageTitle()}
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
                Pantau dan lihat data pengaduan dari seluruh masyarakat
              </p>
            </div>

            <span className="text-xs font-bold text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-300 shadow-sm">
              Total {filteredReports.length} Laporan
            </span>
          </div>

          {error && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-semibold">
              <FaExclamationCircle className="flex-shrink-0 text-red-500 text-base" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
              <FaCheckCircle className="flex-shrink-0 text-emerald-500 text-base" />
              <span>{successMessage}</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-500">
              <FaSpinner className="w-8 h-8 animate-spin text-[#0284c7] mb-3" />
              <p className="text-sm font-medium">Memuat antrean laporan...</p>
            </div>
          ) : filteredReports.length > 0 ? (
            <div className="space-y-6">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    <div className="lg:col-span-4 bg-[#e5e7eb] h-56 sm:h-64 rounded-lg w-full overflow-hidden flex items-center justify-center border border-gray-200">
                      {report.foto_url ? (
                        <img
                          src={report.foto_url}
                          alt={report.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-xs flex flex-col items-center">
                          <FaCamera className="w-10 h-10 mb-2 opacity-40" />
                          <span>Tidak ada foto bukti</span>
                        </div>
                      )}
                    </div>

                    
                    <div className="lg:col-span-8 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-wide">
                          {report.title}
                        </h3>
                        {renderBadge(report.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                        <span>
                          <strong>Pelapor:</strong> {report.pelapor?.nama_lengkap || "Masyarakat"}
                        </span>
                        <span>•</span>
                        <span>
                          <strong>Tim:</strong> {report.team_branch?.nama_tim || "Belum Ditentukan"}
                        </span>
                        {report.team_branch?.kecamatan?.nama_kecamatan && (
                          <>
                            <span>•</span>
                            <span>
                              <strong>Wilayah:</strong> {report.team_branch.kecamatan.nama_kecamatan}
                            </span>
                          </>
                        )}
                        <span>•</span>
                        <span>
                          {new Date(report.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="pt-2">
                        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Deskripsi Laporan :
                        </p>
                        <div className="bg-[#f9fafb] border border-gray-200 p-4 rounded-lg text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                          {report.deskripsi}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-16 text-center border border-gray-200 shadow-sm text-gray-500">
              <p className="text-sm font-medium">
                {searchTerm
                  ? `Tidak ada laporan yang sesuai dengan pencarian "${searchTerm}".`
                  : "Belum ada laporan dalam antrean ini."}
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

