import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCamera, FaSpinner, FaRedo } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLaporanStore } from "../stores/useLaporanStore";

function EmptyReportBox() {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-48 h-48 mx-auto"
    >
      <rect
        x="36"
        y="50"
        width="88"
        height="76"
        rx="4"
        stroke="black"
        strokeWidth="7"
        fill="white"
      />
      <path
        d="M30 50L46 32H114L130 50"
        stroke="black"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d="M66 78H94V90H66V78Z"
        stroke="black"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <circle cx="118" cy="42" r="22" fill="black" />
      <text
        x="118"
        y="51"
        textAnchor="middle"
        fill="white"
        fontSize="26"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        ?
      </text>
    </svg>
  );
}

export default function StatusPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { reports, fetchMyReports, isLoading, error } = useLaporanStore();

  useEffect(() => {
    fetchMyReports();
  }, [fetchMyReports]);

  // Format tanggal ke Bahasa Indonesia yang rapi
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // Badge status sesuai status laporan dari backend
  const renderStatusBadge = (status) => {
    switch (status) {
      case "valid":
        return (
          <span className="inline-block bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded">
            Laporan Valid / Diterima
          </span>
        );
      case "invalid":
        return (
          <span className="inline-block bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold px-3 py-1 rounded">
            Laporan Ditolak
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-block bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-3 py-1 rounded">
            Menunggu Verifikasi
          </span>
        );
    }
  };

  const filteredReports = reports.filter((report) => {
    const query = searchTerm.toLowerCase();
    const title = (report.title || "").toLowerCase();
    const desc = (report.deskripsi || "").toLowerCase();
    const team = (report.team_branch?.nama_tim || "").toLowerCase();
    const kec = (
      report.team_branch?.kecamatan?.nama_kecamatan || ""
    ).toLowerCase();
    const kat = (report.kategori?.nama_kategori || "").toLowerCase();
    const stat = (report.status || "").toLowerCase();
    return (
      title.includes(query) ||
      desc.includes(query) ||
      team.includes(query) ||
      kec.includes(query) ||
      kat.includes(query) ||
      stat.includes(query)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-black antialiased">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-8">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari Laporan berdasarkan judul, wilayah, atau status..."
            className="w-full pl-11 pr-4 py-2 border border-gray-400 rounded-md text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0284c7] transition-all"
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-red-700 text-sm">
            <span>{error}</span>
            <button
              onClick={() => fetchMyReports()}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
            >
              <FaRedo className="text-xs" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <FaSpinner className="w-8 h-8 animate-spin text-[#0284c7] mb-3" />
            <p className="text-sm font-medium">Memuat riwayat laporan Anda...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-300 rounded-md p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Foto Bukti Laporan */}
                  <div className="lg:col-span-5 bg-[#e5e7eb] h-64 sm:h-72 rounded-sm w-full overflow-hidden flex items-center justify-center border border-gray-200">
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

                  {/* Detail Informasi Laporan */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-wide">
                        {report.title}
                      </h3>
                      {renderStatusBadge(report.status)}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      {formatDate(report.created_at)}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {report.kategori?.nama_kategori && (
                        <span className="inline-block bg-[#e5e7eb] text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                          {report.kategori.nama_kategori}
                        </span>
                      )}
                      {report.team_branch?.nama_tim && (
                        <span className="inline-block bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1 rounded">
                          Tim: {report.team_branch.nama_tim}
                        </span>
                      )}
                      {report.team_branch?.kecamatan?.nama_kecamatan && (
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded">
                          Kecamatan: {report.team_branch.kecamatan.nama_kecamatan}
                        </span>
                      )}
                    </div>

                    <div className="pt-2">
                      <p className="text-sm font-semibold text-gray-800 mb-1.5">
                        Deskripsi Laporan :
                      </p>
                      <div className="bg-[#f3f4f6] border border-gray-200 p-4 rounded-md min-h-[110px] text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                        {report.deskripsi}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <EmptyReportBox />

            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-wide mt-6 uppercase">
              {searchTerm
                ? "TIDAK ADA LAPORAN YANG COCOK"
                : "TIDAK DITEMUKAN LAPORAN APA PUN"}
            </h2>

            <p className="text-gray-700 text-sm sm:text-base max-w-md mt-2">
              {searchTerm
                ? `Tidak ditemukan hasil untuk "${searchTerm}". Silakan coba kata kunci lain.`
                : "Semua laporan dan progres laporan yang anda kirim akan muncul disini."}
            </p>

            <Link
              to="/laporan"
              className="mt-6 inline-block bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-sm px-8 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Buat Laporan Baru
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
