import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DUMMY_REPORTS } from "../constants";

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

  const filteredReports = DUMMY_REPORTS.filter((report) => {
    const query = searchTerm.toLowerCase();
    return (
      report.judul.toLowerCase().includes(query) ||
      report.kategori.toLowerCase().includes(query) ||
      report.lokasi.toLowerCase().includes(query) ||
      report.deskripsi.toLowerCase().includes(query)
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
            placeholder="Cari Laporan....."
            className="w-full pl-11 pr-4 py-2 border border-gray-400 rounded-md text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0284c7] transition-all"
          />
        </div>

        {filteredReports.length > 0 ? (
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-300 rounded-md p-6 bg-white shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 bg-[#d1d5db] h-64 sm:h-72 rounded-sm w-full" />

                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-wide">
                      {report.judul}
                    </h3>
                    <p className="text-sm text-gray-800 font-medium">
                      {report.tanggal}
                    </p>

                    <div>
                      <span className="inline-block bg-[#e5e7eb] text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                        {report.kategori}
                      </span>
                    </div>

                    <p className="text-sm text-gray-800">
                      <span className="font-medium">Lokasi: </span>
                      {report.lokasi}
                    </p>

                    <div className="pt-1">
                      <p className="text-sm font-semibold text-gray-800 mb-1.5">
                        Deskripsi Laporan :
                      </p>
                      <div className="bg-[#d1d5db] p-4 rounded-sm min-h-[110px] text-sm text-gray-800 leading-relaxed">
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
              TIDAK DI TEMUKAN LAPORAN APA PUN
            </h2>

            <p className="text-gray-700 text-sm sm:text-base max-w-md mt-2">
              Semua laporan dan progres laporan yang anda kirim akan muncul
              disini
            </p>

            <Link
              to="/laporan"
              className="mt-6 inline-block bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-sm px-8 py-2.5 rounded-lg shadow-sm transition-all"
            >
              Buat Laporan
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}