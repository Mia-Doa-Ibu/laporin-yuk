import { useState, useEffect } from "react";
import {
  FaInbox,
  FaClock,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import NavbarCabang from "../components/NavbarCabang";
import Footer from "../components/Footer";
import { useCabangStore } from "../stores/useCabangStore";
import { useAlertStore } from "../stores/useAlertStore";

function ReportVerificationCard({ report, anggotaList, onVerify, isSubmitting, savedData }) {
  const [tanggalPemeriksaan, setTanggalPemeriksaan] = useState(
    () => savedData?.tanggalPemeriksaan || new Date().toISOString().split("T")[0]
  );
  const [catatanPenanganan, setCatatanPenanganan] = useState(
    () => savedData?.catatanPenanganan || ""
  );
  const [buktiFoto, setBuktiFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(() => savedData?.buktiFoto || null);
  const [fotoDataUrl, setFotoDataUrl] = useState(() => savedData?.buktiFoto || null);
  const [fotoName, setFotoName] = useState(() => savedData?.fotoName || "");

  const [anggotaState, setAnggotaState] = useState(() => {
    if (savedData?.anggota && savedData.anggota.length > 0) {
      return savedData.anggota;
    }

    const defaultRows = [
      { id: 1, checked: false, role: "ketua", placeholder: "Ketua tim", nama: "" },
      { id: 2, checked: false, role: "anggota", placeholder: "Anggota tim", nama: "" },
      { id: 3, checked: false, role: "anggota", placeholder: "Anggota tim", nama: "" },
      { id: 4, checked: false, role: "anggota", placeholder: "Anggota tim", nama: "" },
      { id: 5, checked: false, role: "anggota", placeholder: "Anggota tim", nama: "" },
    ];

    if (anggotaList && anggotaList.length > 0) {
      const ketua = anggotaList.find((a) => a.role === "ketua");
      const regularAnggota = anggotaList.filter((a) => a.role !== "ketua");

      if (ketua) {
        defaultRows[0].nama = ketua.nama;
      }

      regularAnggota.forEach((item, idx) => {
        if (idx + 1 < defaultRows.length) {
          defaultRows[idx + 1].nama = item.nama;
        }
      });
    }

    return defaultRows;
  });

  useEffect(() => {
    if (!savedData?.anggota && anggotaList && anggotaList.length > 0) {
      setAnggotaState((prev) => {
        const updated = [...prev];
        const ketua = anggotaList.find((a) => a.role === "ketua");
        const regularAnggota = anggotaList.filter((a) => a.role !== "ketua");

        if (ketua && !updated[0].nama) {
          updated[0].nama = ketua.nama;
        }

        regularAnggota.forEach((item, idx) => {
          if (idx + 1 < updated.length && !updated[idx + 1].nama) {
            updated[idx + 1].nama = item.nama;
          }
        });

        return updated;
      });
    }
  }, [anggotaList, savedData]);

  const handleAnggotaChange = (index, field, value) => {
    setAnggotaState((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBuktiFoto(file);
      setFotoName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        setFotoPreview(reader.result);
        setFotoDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFoto = (e) => {
    e.stopPropagation();
    setBuktiFoto(null);
    setFotoPreview(null);
    setFotoDataUrl(null);
    setFotoName("");
  };

  const handleAction = (status) => {
    const formData = {
      tanggalPemeriksaan,
      anggota: anggotaState,
      catatanPenanganan,
      buktiFoto: fotoDataUrl,
      fotoName,
    };
    onVerify(report.id, status, formData);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal Laporan";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-8 shadow-sm space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-5 bg-[#d9d9d9] h-64 sm:h-72 rounded-sm w-full overflow-hidden flex items-center justify-center">
          {report.foto_url ? (
            <img
              src={report.foto_url}
              alt={report.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#d9d9d9]" />
          )}
        </div>

        
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-black tracking-tight">
              {report.title || "Judul Laporan"}
            </h2>
            <p className="text-sm text-gray-700">
              {formatDate(report.created_at)}
            </p>

            <div className="pt-2">
              <span className="inline-block bg-[#d9d9d9] text-gray-800 text-xs font-medium px-3 py-1 rounded">
                {report.kategori?.nama_kategori || "Kategori Laporan"}
              </span>
            </div>

            <p className="text-xs text-gray-700 pt-1">
              <span className="font-medium">Lokasi: </span>
              {report.team_branch?.kecamatan
                ? `${report.team_branch.kecamatan.nama_kecamatan}, ${report.team_branch.kecamatan.kabupaten}`
                : report.team_branch?.nama_tim || "Lokasi"}
            </p>

            <div className="pt-1">
              <p className="text-xs font-semibold text-gray-800 mb-1.5">
                Deskripsi Laporan :
              </p>
              <div className="bg-[#d9d9d9] p-4 rounded-sm min-h-[100px] text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">
                {report.deskripsi}
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="pt-2 space-y-6">
        <h3 className="text-2xl font-bold text-black tracking-tight">
          Verifikasi Laporan
        </h3>

        
        <div className="space-y-2">
          <label className="block text-sm font-bold text-black">
            1. Tanggal Pemeriksaan
          </label>
          <div className="relative w-64">
            <input
              type="date"
              value={tanggalPemeriksaan}
              onChange={(e) => setTanggalPemeriksaan(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3.5 py-2 text-xs text-gray-800 outline-none focus:border-[#0082c8] bg-white cursor-pointer"
            />
          </div>
        </div>

        
        <div className="space-y-2.5">
          <label className="block text-sm font-bold text-black">
            2. Anggota yang bertugas
          </label>
          <div className="space-y-2">
            {anggotaState.map((item, index) => (
              <div key={item.id || index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) =>
                    handleAnggotaChange(index, "checked", e.target.checked)
                  }
                  className="w-5 h-5 rounded-md border border-gray-400 text-[#0082c8] focus:ring-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={item.nama}
                  onChange={(e) =>
                    handleAnggotaChange(index, "nama", e.target.value)
                  }
                  placeholder={item.placeholder}
                  className="border border-gray-300 rounded-md px-4 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] w-72 sm:w-80 bg-white"
                />
              </div>
            ))}
          </div>
        </div>

        
        <div className="space-y-2">
          <label className="block text-sm font-bold text-black">
            3. Catatan Penanganan di lapangan
          </label>
          <textarea
            rows={4}
            value={catatanPenanganan}
            onChange={(e) => setCatatanPenanganan(e.target.value)}
            placeholder="Tuliskan tindakan perbaikan atau kondisi di lokasi..."
            className="w-full border border-gray-300 rounded-md p-4 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] resize-none bg-white"
          />
        </div>

        
        <div className="space-y-2">
          <label className="block text-sm font-bold text-black">
            4. Bukti foto
          </label>

          <input
            type="file"
            id={`upload-verifikasi-${report.id}`}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {fotoPreview ? (
            <div className="relative w-56 sm:w-64 h-36 rounded-lg border border-gray-300 overflow-hidden group">
              <img
                src={fotoPreview}
                alt="Dokumentasi Lapangan"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <label
                  htmlFor={`upload-verifikasi-${report.id}`}
                  className="bg-white text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded cursor-pointer hover:bg-gray-100"
                >
                  Ganti Foto
                </label>
                <button
                  type="button"
                  onClick={handleRemoveFoto}
                  className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded cursor-pointer hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor={`upload-verifikasi-${report.id}`}
              className="border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg w-56 sm:w-64 h-36 flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition-all select-none"
            >
              <div className="relative mb-2">
                <svg
                  className="w-10 h-10 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-gray-400">
                  <svg
                    className="w-3.5 h-3.5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-800">
                Unggah dokumentasi
              </span>
            </label>
          )}
        </div>

        
        <div className="flex items-center space-x-3 pt-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleAction("invalid")}
            className="bg-[#b91c1c] hover:bg-[#991b1b] disabled:opacity-50 text-white text-xs font-semibold px-6 py-2 rounded shadow-sm transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
          >
            {isSubmitting && <FaSpinner className="animate-spin text-xs" />}
            <span>Tolak Laporan</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleAction("valid")}
            className="bg-[#059669] hover:bg-[#047857] disabled:opacity-50 text-white text-xs font-semibold px-6 py-2 rounded shadow-sm transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
          >
            {isSubmitting && <FaSpinner className="animate-spin text-xs" />}
            <span>Terima Laporan</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CabangPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeQueue, setActiveQueue] = useState("semua");
  const [selectedCategories, setSelectedCategories] = useState({
    fasum: true,
    dana: true,
    lingkungan: true,
  });

  const {
    reports,
    anggotaList,
    verificationData,
    isLoading,
    isSubmitting,
    error,
    successMessage,
    fetchReports,
    fetchAnggota,
    verifyReport,
    clearMessage,
  } = useCabangStore();

  useEffect(() => {
    fetchReports();
    fetchAnggota();
  }, [fetchReports, fetchAnggota]);

  const handleCategoryToggle = (key) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const { showAlert } = useAlertStore();

  const handleVerify = async (reportId, status, formData) => {
    const actionLabel =
      status === "valid"
        ? "Menerima (Valid)"
        : status === "invalid"
        ? "Menolak (Invalid)"
        : "Mengubah Status";

    if (
      !window.confirm(
        `Apakah Anda yakin ingin memverifikasi laporan ini menjadi ${actionLabel} dan menyimpan seluruh data pemeriksaan?`
      )
    ) {
      return;
    }

    try {
      await verifyReport(reportId, status, formData);
      showAlert({
        type: "success",
        title: "Verifikasi berhasil",
        message: `Laporan berhasil ${status === 'valid' ? 'diterima (Valid)' : 'ditolak (Invalid)'} dan data penanganan telah tersimpan.`,
        buttonText: "OKE",
      });
    } catch (err) {
      const errMsg =
        err.response?.data?.error ||
        err.message ||
        "Gagal memperbarui status laporan.";
      showAlert({
        type: "error",
        title: "Verifikasi gagal",
        message: errMsg,
        buttonText: "OKE",
      });
    }
  };

  const matchesCategory = (report) => {
    if (selectedCategories.fasum && selectedCategories.dana && selectedCategories.lingkungan) {
      return true;
    }
    if (!selectedCategories.fasum && !selectedCategories.dana && !selectedCategories.lingkungan) {
      return false;
    }

    const catName = (report.kategori?.nama_kategori || "").toLowerCase();
    const fullText = `${report.title || ""} ${report.deskripsi || ""} ${catName}`.toLowerCase();

    let matched = false;
    if (
      selectedCategories.fasum &&
      (catName.includes("fasum") ||
        catName.includes("fasilitas") ||
        fullText.includes("fasum") ||
        fullText.includes("jalan") ||
        fullText.includes("jembatan") ||
        fullText.includes("lampu") ||
        fullText.includes("trotoar") ||
        fullText.includes("saluran"))
    ) {
      matched = true;
    }
    if (
      selectedCategories.dana &&
      (catName.includes("dana") ||
        fullText.includes("dana") ||
        fullText.includes("korupsi") ||
        fullText.includes("penyimpangan") ||
        fullText.includes("anggaran") ||
        fullText.includes("bansos"))
    ) {
      matched = true;
    }
    if (
      selectedCategories.lingkungan &&
      (catName.includes("lingkungan") ||
        fullText.includes("lingkungan") ||
        fullText.includes("sampah") ||
        fullText.includes("sungai") ||
        fullText.includes("banjir") ||
        fullText.includes("polusi") ||
        fullText.includes("pohon"))
    ) {
      matched = true;
    }

    if (!matched && !catName.includes("dana") && !catName.includes("lingkungan") && selectedCategories.fasum) {
      matched = true;
    }

    return matched;
  };

  const filteredReports = reports.filter((report) => {
    if (activeQueue === "menunggu" && report.status !== "pending") return false;
    if (activeQueue === "valid" && report.status !== "valid") return false;
    if (activeQueue === "ditolak" && report.status !== "invalid") return false;

    if (!matchesCategory(report)) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const title = (report.title || "").toLowerCase();
      const desc = (report.deskripsi || "").toLowerCase();
      const pelapor = (report.pelapor?.nama_lengkap || "").toLowerCase();
      const cat = (report.kategori?.nama_kategori || "").toLowerCase();
      if (!title.includes(q) && !desc.includes(q) && !pelapor.includes(q) && !cat.includes(q)) {
        return false;
      }
    }

    return true;
  });

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
                    className={`flex items-center space-x-3 w-full text-left transition-colors cursor-pointer ${
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
                    className={`flex items-center space-x-3 w-full text-left transition-colors cursor-pointer ${
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
                    className={`flex items-center space-x-3 w-full text-left transition-colors cursor-pointer ${
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
                    className={`flex items-center space-x-3 w-full text-left transition-colors cursor-pointer ${
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

        
        <main className="flex-1 bg-[#d9d9d9] p-6 lg:p-10 min-h-screen">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between text-red-700 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <FaExclamationCircle className="flex-shrink-0 text-red-500 text-base" />
                  <span>{error}</span>
                </div>
                <button
                  type="button"
                  onClick={clearMessage}
                  className="text-red-500 hover:text-red-700 font-bold ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-emerald-800 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="flex-shrink-0 text-emerald-500 text-base" />
                  <span>{successMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={clearMessage}
                  className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-600 bg-white rounded-lg border border-gray-300">
                <FaSpinner className="w-8 h-8 animate-spin text-[#0082c8] mb-3" />
                <p className="text-sm font-medium">Memuat antrean laporan...</p>
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white border border-gray-300 rounded-lg p-6 text-center">
                <FaInbox className="w-12 h-12 text-gray-300 mb-3" />
                <h3 className="text-base font-bold text-gray-700 mb-1">
                  Tidak ada laporan dalam antrean
                </h3>
                <p className="text-xs text-gray-500 max-w-sm">
                  {searchTerm
                    ? `Tidak ada laporan yang cocok dengan kata kunci "${searchTerm}".`
                    : activeQueue !== "semua"
                    ? `Belum ada laporan dengan status "${activeQueue}".`
                    : "Belum ada laporan warga untuk wilayah tim cabang ini."}
                </p>
              </div>
            ) : (
              filteredReports.map((report) => (
                <ReportVerificationCard
                  key={report.id}
                  report={report}
                  anggotaList={anggotaList}
                  onVerify={handleVerify}
                  isSubmitting={isSubmitting}
                  savedData={verificationData?.[report.id]}
                />
              ))
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
