import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

export default function RegisterCabang() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const initialForm = {
    domisili: "",
    namaTim: "",
    noTelepon: "",
    password: "",
    confirmPassword: "",
    anggota: [
      { rolePlaceholder: "Ketua tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
    ],
  };

  const [formData, setFormData] = useState(initialForm);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAnggotaChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedAnggota = [...prev.anggota];
      updatedAnggota[index] = {
        ...updatedAnggota[index],
        [field]: value,
      };
      return { ...prev, anggota: updatedAnggota };
    });
  };

  const handleAddAnggota = () => {
    setFormData((prev) => ({
      ...prev,
      anggota: [
        ...prev.anggota,
        {
          rolePlaceholder: "Anggota tim",
          nama: "",
          nik: "",
          gender: "Laki-laki",
          umur: "",
        },
      ],
    }));
  };

  const handleReset = () => {
    setFormData(initialForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center antialiased">
        <div className="max-w-md w-full flex flex-col items-center">
          <svg
            viewBox="0 0 100 100"
            className="w-36 h-36 sm:w-40 sm:h-40 mb-8"
            fill="none"
          >
            <circle cx="34" cy="34" r="11" fill="#0c1322" />
            <path
              d="M20 70c0-12 9-20 20-22-6 3-10 10-10 18v7H20v-3z"
              fill="#0c1322"
            />
            <circle cx="66" cy="34" r="11" fill="#0c1322" />
            <path
              d="M80 70v-3c0-8-4-15-10-18 11 2 20 10 20 22v4h-10z"
              fill="#0c1322"
            />
            <circle cx="50" cy="27" r="14" fill="#0c1322" />
            <path
              d="M28 72c0-16 11-28 26-28 11 0 20 6 24 15-4 0-8 2-11 5-9 0-16 6-18 15H28v-7z"
              fill="#0c1322"
            />
            <circle cx="67" cy="65" r="18" fill="white" />
            <circle cx="67" cy="65" r="15" fill="#0c1322" />
            <path
              d="M67 56v18M58 65h18"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <h1 className="text-2xl sm:text-3xl font-black text-black leading-tight mb-3">
            Pendaftaran Tim Cabang & Petugas <br /> Lapangan
          </h1>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
            Lengkapi data pengajuan hak akses penanganan laporan wilayah.
          </p>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="bg-[#0082c8] hover:bg-[#0274b3] text-white font-bold px-12 py-3 rounded-lg text-sm shadow-sm transition-all active:scale-[0.98]"
          >
            Daftar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0082c8] flex items-center justify-center p-4 sm:p-8 lg:p-12 antialiased">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 sm:p-10 border border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Formulir Pendaftaran Tim Cabang
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
            Lengkapi identitas anggota dan informasi wilayah operasional
          </p>
        </div>

        <hr className="border-gray-200 mb-8" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                Domisili :
              </label>
              <div className="relative">
                <select
                  value={formData.domisili}
                  onChange={(e) => handleFieldChange("domisili", e.target.value)}
                  className="w-full border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 outline-none appearance-none pr-8 bg-white focus:border-[#0082c8] transition-all cursor-pointer"
                >
                  <option value="">Pilih Kecamatan</option>
                  <option value="Pasar Kemis">Pasar Kemis</option>
                  <option value="Cikupa">Cikupa</option>
                  <option value="Balaraja">Balaraja</option>
                  <option value="Curug">Curug</option>
                  <option value="Kelapa Dua">Kelapa Dua</option>
                  <option value="Rajeg">Rajeg</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs" />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                Nama Tim Cabang :
              </label>
              <input
                type="text"
                value={formData.namaTim}
                onChange={(e) => handleFieldChange("namaTim", e.target.value)}
                placeholder="Contoh : Tim Cabang A"
                className="w-full border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                No. Telepon Ketua :
              </label>
              <input
                type="text"
                value={formData.noTelepon}
                onChange={(e) => handleFieldChange("noTelepon", e.target.value)}
                placeholder="08xxxxxxxxxx (Aktif)"
                className="w-full border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                Password :
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                Konfirmasi Password :
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleFieldChange("confirmPassword", e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 pb-2 border-b border-gray-300 text-xs sm:text-sm font-bold text-black">
              <div className="col-span-4">Anggota Tim</div>
              <div className="col-span-3">NIK</div>
              <div className="col-span-3">Gender</div>
              <div className="col-span-2">Umur</div>
            </div>

            <div className="space-y-3">
              {formData.anggota.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-3 sm:gap-4 items-center"
                >
                  <div className="col-span-4">
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

                  <div className="col-span-3">
                    <input
                      type="text"
                      value={item.nik}
                      onChange={(e) =>
                        handleAnggotaChange(index, "nik", e.target.value)
                      }
                      placeholder="360xxxxxxxxx"
                      className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
                    />
                  </div>

                  <div className="col-span-3 relative">
                    <select
                      value={item.gender}
                      onChange={(e) =>
                        handleAnggotaChange(index, "gender", e.target.value)
                      }
                      className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0082c8] appearance-none pr-7 bg-white cursor-pointer"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    <FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]" />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="text"
                      value={item.umur}
                      onChange={(e) =>
                        handleAnggotaChange(index, "umur", e.target.value)
                      }
                      className="w-full sm:w-16 border border-gray-400 rounded-md px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0082c8] transition-all bg-white text-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <button
              type="button"
              onClick={handleAddAnggota}
              className="w-full sm:w-auto border border-dashed border-gray-800 hover:border-black text-black text-xs font-bold px-4 py-2 rounded-lg transition-all active:scale-[0.98]"
            >
              + Tambah Anggota
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto border border-gray-400 text-gray-800 hover:bg-gray-50 text-xs font-semibold px-6 py-2 rounded-md transition-all active:scale-[0.98]"
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold px-7 py-2 rounded-md transition-all active:scale-[0.98]"
              >
                Kirim
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}