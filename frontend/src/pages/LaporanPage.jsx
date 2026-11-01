import { useState } from "react";
import {
  FaChevronDown,
  FaCamera,
  FaEdit,
  FaSearch,
  FaFileAlt,
  FaCommentDots,
  FaCheck,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  KATEGORI_LAPORAN_OPTIONS,
  TIM_LAPANGAN_OPTIONS,
  ALUR_PELAPORAN_STEPS,
} from "../constants";

export default function LaporanPage() {
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    lokasi: "",
    kategori: "",
    timLapangan: "",
    fileBukti: null,
  });

  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        fileBukti: e.target.files[0],
      }));
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
              layanan Pengaduan dan Pemantauan
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Judul Laporan
                </label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  placeholder="Ketik judul laporan anda"
                  className="w-full bg-[#e9ecef] border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0082c8] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Deskripsi Laporan
                </label>
                <textarea
                  name="deskripsi"
                  rows={4}
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Ketik deskripsi laporan anda"
                  className="w-full bg-[#e9ecef] border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0082c8] focus:border-transparent transition-all resize-none"
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
                  placeholder="Ketik lokasi laporan"
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
                    <option value="" disabled>
                      Pilih kategori laporan
                    </option>
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
                  Tim Lapangan
                </label>
                <div className="relative">
                  <select
                    name="timLapangan"
                    value={formData.timLapangan}
                    onChange={handleChange}
                    className="w-full bg-[#e9ecef] border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none appearance-none cursor-pointer pr-10 focus:ring-2 focus:ring-[#0082c8] focus:border-transparent transition-all"
                  >
                    <option value="" disabled>
                      Pilih tim lapangan untuk verifikasi
                    </option>
                    {TIM_LAPANGAN_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs" />
                </div>
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
                  <span>{fileName ? fileName : "Upload Bukti"}</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-3 rounded-lg shadow-sm transition-all uppercase tracking-wider text-sm active:scale-[0.99]"
                >
                  KIRIM LAPORAN
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