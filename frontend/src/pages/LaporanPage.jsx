import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaCamera,
  FaEdit,
  FaSearch,
  FaFileAlt,
  FaCommentDots,
  FaCheck,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  KATEGORI_LAPORAN_OPTIONS,
  ALUR_PELAPORAN_STEPS,
} from "../constants";
import { useLaporanStore } from "../stores/useLaporanStore";

export default function LaporanPage() {
  const navigate = useNavigate();
  const {
    teamBranches,
    fetchTeamBranches,
    createReport,
    isSubmitting,
    error,
    clearError,
  } = useLaporanStore();

  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    lokasi: "",
    kategori: "",
    timLapangan: "",
    fileBukti: null,
  });

  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");

  // Ambil daftar tim cabang yang tersedia di backend saat komponen dimuat
  useEffect(() => {
    fetchTeamBranches();
  }, [fetchTeamBranches]);

  const handleChange = (e) => {
    if (localError) setLocalError("");
    if (error) clearError();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        fileBukti: file,
      }));
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Mengubah file gambar ke base64 agar dapat disimpan di foto_url
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccess("");
    clearError();

    if (!formData.judul.trim()) {
      setLocalError("Judul laporan wajib diisi.");
      return;
    }

    if (!formData.deskripsi.trim()) {
      setLocalError("Deskripsi laporan wajib diisi.");
      return;
    }

    if (!formData.timLapangan) {
      setLocalError("Pilih tim lapangan untuk memproses laporan.");
      return;
    }

    try {
      let fotoUrl = null;
      if (formData.fileBukti) {
        fotoUrl = await convertToBase64(formData.fileBukti);
      }

      // Gabungkan informasi lokasi dan kategori ke deskripsi agar lengkap
      let fullDeskripsi = formData.deskripsi.trim();
      if (formData.lokasi.trim()) {
        fullDeskripsi += `\n\nLokasi: ${formData.lokasi.trim()}`;
      }
      if (formData.kategori) {
        const katObj = KATEGORI_LAPORAN_OPTIONS.find(
          (k) => k.value === formData.kategori
        );
        if (katObj) {
          fullDeskripsi += `\nKategori: ${katObj.label}`;
        }
      }

      await createReport({
        id_team_branch: formData.timLapangan,
        title: formData.judul.trim(),
        deskripsi: fullDeskripsi,
        foto_url: fotoUrl,
      });

      setSuccess("Laporan Anda berhasil dikirim! Mengalihkan ke halaman status...");
      setTimeout(() => {
        navigate("/status");
      }, 1500);
    } catch {
      // Error sudah ditangani di store
    }
  };

  const errorMessage = localError || error;

  const getStepIcon = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return <FaEdit className="w-5 h-5 text-black" />;
      case 2:
        return <FaSearch className="w-5 h-5 text-black" />;
      case 3:
        return <FaFileAlt className="w-5 h-5 text-black" />;
      case 4:
        return <FaCommentDots className="w-5 h-5 text-black" />;
      case 5:
        return <FaCheck className="w-5 h-5 text-black" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-black antialiased">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-[#0082c8] via-[#0082c8] via-[65%] to-white pt-12 pb-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center text-white space-y-3 mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Layanan Pengaduan dan Pemantauan
              <br />
              Infrastruktur Publik
            </h1>
            <p className="text-sm sm:text-base font-medium text-sky-100 max-w-xl mx-auto">
              Laporkan kerusakan fasilitas, isu lingkungan,
              <br />
              hingga indikasi penyimpangan dana
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-black text-center text-black tracking-wider uppercase mb-8">
              LAPORAN ANDA
            </h2>

            {errorMessage && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-semibold">
                <FaExclamationCircle className="flex-shrink-0 text-red-500 text-base" />
                <span>{errorMessage}</span>
              </div>
            )}

            {success && (
              <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
                <FaCheckCircle className="flex-shrink-0 text-emerald-500 text-base" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Judul Laporan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  placeholder="Ketik judul laporan anda"
                  className="w-full bg-[#e9ecef] border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0082c8] focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Deskripsi Laporan <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="deskripsi"
                  rows={4}
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Ketik deskripsi laporan anda secara detail"
                  className="w-full bg-[#e9ecef] border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0082c8] focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Lokasi
                </label>
                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  placeholder="Ketik lokasi spesifik laporan"
                  className="w-full bg-[#e9ecef] border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0082c8] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Kategori Laporan
                </label>
                <div className="relative">
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleChange}
                    className="w-full bg-[#e9ecef] border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none appearance-none cursor-pointer pr-10 focus:ring-2 focus:ring-[#0082c8] focus:border-transparent transition-all"
                  >
                    <option value="">Pilih kategori laporan</option>
                    {KATEGORI_LAPORAN_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Tim Lapangan Dituju <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="timLapangan"
                    value={formData.timLapangan}
                    onChange={handleChange}
                    className="w-full bg-[#e9ecef] border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none appearance-none cursor-pointer pr-10 focus:ring-2 focus:ring-[#0082c8] focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Pilih tim cabang / lapangan</option>
                    {teamBranches.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama_tim}{" "}
                        {item.kecamatan?.nama_kecamatan
                          ? `(${item.kecamatan.nama_kecamatan})`
                          : ""}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs" />
                </div>
                {teamBranches.length === 0 && (
                  <p className="text-[11px] text-amber-600 mt-1">
                    * Belum ada tim cabang yang terdaftar di database.
                  </p>
                )}
              </div>

              <div className="pt-1">
                <input
                  type="file"
                  id="upload-bukti"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="upload-bukti"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-500 rounded-md text-xs font-semibold text-gray-800 bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-sm"
                >
                  <FaCamera className="text-gray-700 text-sm" />
                  <span>{fileName ? fileName : "Upload Bukti Foto"}</span>
                </label>
                {previewUrl && (
                  <div className="mt-3">
                    <img
                      src={previewUrl}
                      alt="Preview Bukti"
                      className="w-32 h-24 object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !!success}
                  className="w-full bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg shadow-sm transition-all uppercase tracking-wider text-sm active:scale-[0.99] cursor-pointer"
                >
                  {isSubmitting ? "Mengirim Laporan..." : "KIRIM LAPORAN"}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="py-20 px-6 max-w-6xl mx-auto bg-white">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-black tracking-widest uppercase mb-16">
            ALUR PELAPORAN
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute top-7 left-12 right-12 h-[2px] bg-black -z-0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative z-10">
              {ALUR_PELAPORAN_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-black bg-white flex items-center justify-center mb-4 shadow-sm">
                    {getStepIcon(step.step)}
                  </div>
                  <h3 className="font-bold text-sm text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-[170px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
