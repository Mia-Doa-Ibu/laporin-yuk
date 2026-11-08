import { useState } from "react";
import {
  FaInbox,
  FaClock,
  FaCheck,
  FaTimes,
  FaChevronDown,
  FaCamera,
} from "react-icons/fa";
import NavbarCabang from "../components/NavbarCabang";
import Footer from "../components/Footer";
import { DUMMY_REPORTS } from "../constants";

export default function CabangPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeQueue, setActiveQueue] = useState("semua");
  const [selectedCategories, setSelectedCategories] = useState({
    fasum: true,
    dana: true,
    lingkungan: true,
  });

  const activeReport = DUMMY_REPORTS[0] || {
    judul: "Judul Laporan",
    tanggal: "Tanggal Laporan",
    kategori: "Kategori Laporan",
    lokasi: "Lokasi",
    deskripsi: "Deskripsi Laporan :",
  };

  const [tanggalPemeriksaan, setTanggalPemeriksaan] = useState("");
  const [anggotaList, setAnggotaList] = useState([
    { id: 1, checked: false, rolePlaceholder: "Ketua tim", nama: "", gender: "Laki-laki", kontak: "" },
    { id: 2, checked: false, rolePlaceholder: "Anggota tim", nama: "", gender: "Laki-laki", kontak: "" },
    { id: 3, checked: false, rolePlaceholder: "Anggota tim", nama: "", gender: "Laki-laki", kontak: "" },
    { id: 4, checked: false, rolePlaceholder: "Anggota tim", nama: "", gender: "Laki-laki", kontak: "" },
    { id: 5, checked: false, rolePlaceholder: "Anggota tim", nama: "", gender: "Laki-laki", kontak: "" },
  ]);

  const [catatanPenanganan, setCatatanPenanganan] = useState("");
  const [buktiFoto, setBuktiFoto] = useState(null);
  const [fotoName, setFotoName] = useState("");

  const handleCategoryToggle = (key) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAnggotaChange = (index, field, value) => {
    setAnggotaList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBuktiFoto(e.target.files[0]);
      setFotoName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-black antialiased">
      <NavbarCabang searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-grow flex flex-col lg:flex-row">
        <aside className="w-full lg:w-72 bg-[#0c1322] text-white p-6 flex-shrink-0">
          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-bold tracking-wider uppercase text-gray-200 mb-4">
                MENU ANTREAN
              </h2>
              <ul className="space-y-3.5 text-xs font-medium">
                <li>
                  <button
                    onClick={() => setActiveQueue("semua")}
                    className={`flex items-center space-x-3 w-full text-left transition-colors ${
                      activeQueue === "semua"
                        ? "text-white font-bold"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <FaInbox className="w-4 h-4 text-gray-300" />
                    <span>Semua laporan</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveQueue("menunggu")}
                    className={`flex items-center space-x-3 w-full text-left transition-colors ${
                      activeQueue === "menunggu"
                        ? "text-white font-bold"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <FaClock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Menunggu verifikasi</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveQueue("valid")}
                    className={`flex items-center space-x-3 w-full text-left transition-colors ${
                      activeQueue === "valid"
                        ? "text-white font-bold"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Laporan Valid</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveQueue("ditolak")}
                    className={`flex items-center space-x-3 w-full text-left transition-colors ${
                      activeQueue === "ditolak"
                        ? "text-white font-bold"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <FaTimes className="w-3.5 h-3.5 text-rose-400" />
                    <span>Laporan Ditolak</span>
                  </button>
                </li>
              </ul>
            </div>

            <hr className="border-gray-800" />

            <div>
              <h2 className="text-xs font-bold tracking-wider text-gray-200 mb-4">
                Kategori Laporan
              </h2>
              <div className="space-y-3 text-xs text-gray-300">
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedCategories.fasum}
                    onChange={() => handleCategoryToggle("fasum")}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-sky-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Kerusakan Fasilitas Umum</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedCategories.dana}
                    onChange={() => handleCategoryToggle("dana")}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-sky-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Penyimpangan Dana</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedCategories.lingkungan}
                    onChange={() => handleCategoryToggle("lingkungan")}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-sky-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Isu Lingkungan</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-white p-6 lg:p-8">
          <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-[#d1d5db] h-64 sm:h-72 rounded-sm w-full" />

              <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-wide">
                    {activeReport.judul}
                  </h3>
                  <p className="text-sm text-gray-800 font-medium">
                    {activeReport.tanggal}
                  </p>

                  <div>
                    <span className="inline-block bg-[#e5e7eb] text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                      {activeReport.kategori}
                    </span>
                  </div>

                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Lokasi: </span>
                    {activeReport.lokasi}
                  </p>

                  <div className="pt-1">
                    <p className="text-sm font-semibold text-gray-800 mb-1.5">
                      Deskripsi Laporan :
                    </p>
                    <div className="bg-[#d1d5db] p-4 rounded-sm min-h-[110px] text-sm text-gray-800 leading-relaxed">
                      {activeReport.deskripsi}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-6">
              <div className="border-b-2 border-black pb-2 inline-block">
                <h2 className="text-xl font-black text-black tracking-wide">
                  Verifikasi Laporan
                </h2>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-black">
                  1. Tanggal Pemeriksaan
                </label>
                <input
                  type="date"
                  value={tanggalPemeriksaan}
                  onChange={(e) => setTanggalPemeriksaan(e.target.value)}
                  className="w-full sm:w-64 border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 outline-none focus:border-[#0082c8] transition-all bg-white"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-black">
                  2. Anggota yang bertugas
                </label>
                <div className="space-y-2.5">
                  {anggotaList.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
                    >
                      <div className="sm:col-span-1 flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={(e) =>
                            handleAnggotaChange(index, "checked", e.target.checked)
                          }
                          className="w-4 h-4 rounded border-gray-400 text-[#0082c8] focus:ring-0 cursor-pointer"
                        />
                      </div>

                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={item.nama}
                          onChange={(e) =>
                            handleAnggotaChange(index, "nama", e.target.value)
                          }
                          placeholder={item.rolePlaceholder}
                          className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
                        />
                      </div>

                      <div className="sm:col-span-3 relative">
                        <select
                          value={item.gender}
                          onChange={(e) =>
                            handleAnggotaChange(index, "gender", e.target.value)
                          }
                          className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0082c8] appearance-none pr-8 bg-white cursor-pointer"
                        >
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]" />
                      </div>

                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={item.kontak}
                          onChange={(e) =>
                            handleAnggotaChange(index, "kontak", e.target.value)
                          }
                          placeholder="No. HP / Keterangan"
                          className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-black">
                  3. Catatan Penanganan di lapangan
                </label>
                <textarea
                  rows={4}
                  value={catatanPenanganan}
                  onChange={(e) => setCatatanPenanganan(e.target.value)}
                  placeholder="Ketik catatan hasil peninjauan dan penanganan lapangan..."
                  className="w-full border border-gray-400 rounded-md p-3 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all resize-none bg-white"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-black">
                  4. Bukti foto
                </label>
                <div>
                  <input
                    type="file"
                    id="upload-verifikasi"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="upload-verifikasi"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-gray-500 rounded-md text-xs font-semibold text-gray-800 bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-sm"
                  >
                    <FaCamera className="text-gray-700 text-sm" />
                    <span>{fotoName ? fotoName : "Upload Bukti Lapangan"}</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  className="bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold px-5 py-2 rounded transition-all active:scale-[0.98]"
                >
                  Tolak Laporan
                </button>
                <button
                  type="button"
                  className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold px-5 py-2 rounded transition-all active:scale-[0.98]"
                >
                  Terima Laporan
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}