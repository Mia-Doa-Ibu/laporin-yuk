import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAlertStore } from "../../stores/useAlertStore";
import authService from "../../services/authService";

export default function RegisterCabang() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedData = location.state || {};

  const { registerTeamBranch, isLoading, error, clearError } = useAuthStore();
  const { showAlert } = useAlertStore();

  const [step, setStep] = useState(1);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");

  const initialForm = {
    domisili: "",
    namaTim: passedData.namaTim || "",
    noTelepon: "",
    email: passedData.email || "",
    password: passedData.password || "",
    confirmPassword: passedData.confirmPassword || "",
    anggota: [
      { rolePlaceholder: "Ketua tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
    ],
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (location.state) {
      setFormData((prev) => ({
        ...prev,
        namaTim: location.state.namaTim || prev.namaTim,
        email: location.state.email || prev.email,
        password: location.state.password || prev.password,
        confirmPassword: location.state.confirmPassword || prev.confirmPassword,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const fetchKecamatan = async () => {
      try {
        const res = await authService.getKecamatan();
        if (res.data && res.data.length > 0) {
          setKecamatanList(res.data);
        }
      } catch {
        setKecamatanList([
          { id: "Pasar Kemis", nama_kecamatan: "Pasar Kemis" },
          { id: "Cikupa", nama_kecamatan: "Cikupa" },
          { id: "Balaraja", nama_kecamatan: "Balaraja" },
          { id: "Curug", nama_kecamatan: "Curug" },
          { id: "Kelapa Dua", nama_kecamatan: "Kelapa Dua" },
          { id: "Rajeg", nama_kecamatan: "Rajeg" },
        ]);
      }
    };

    fetchKecamatan();
  }, []);

  const handleFieldChange = (field, value) => {
    if (localError) setLocalError("");
    if (error) clearError();
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
    setLocalError("");
    setSuccess("");
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccess("");
    clearError();

    if (!formData.domisili) {
      const msg = "Pilih domisili kecamatan.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Pendaftaran gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }
    if (!formData.namaTim.trim()) {
      const msg = "Nama tim cabang wajib diisi.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Pendaftaran gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }
    if (!formData.noTelepon.trim()) {
      const msg = "Nomor telepon ketua tim wajib diisi.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Pendaftaran gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }
    if (!formData.email.trim()) {
      const msg = "Email akun tim cabang wajib diisi.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Pendaftaran gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }
    if (!formData.password) {
      const msg = "Password wajib diisi.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Pendaftaran gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }
    if (formData.password.length < 6) {
      const msg = "Password minimal 6 karakter.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Pendaftaran gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      const msg = "Konfirmasi password tidak cocok dengan password.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Pendaftaran gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }

    try {
      await registerTeamBranch({
        namaTim: formData.namaTim,
        domisili: formData.domisili,
        noTelepon: formData.noTelepon,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      showAlert({
        type: "waiting",
        title: "Menunggu Verifikasi",
        message: "Admin sedang meninjau registrasi tim anda",
        buttonText: "OKE",
        onConfirm: () => {
          navigate("/login");
        },
      });
    } catch (err) {
      const errMsg =
        err.response?.data?.error ||
        err.message ||
        "Gagal mengajukan pendaftaran tim cabang.";
      showAlert({
        type: "error",
        title: "Pendaftaran gagal",
        message: errMsg,
        buttonText: "OKE",
      });
    }
  };

  const errorMessage = localError || error;

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
            className="bg-[#0082c8] hover:bg-[#0274b3] text-white font-bold px-12 py-3 rounded-lg text-sm shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            Daftar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 lg:p-12 antialiased">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 sm:p-10 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Formulir Pendaftaran Tim Cabang
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
            Lengkapi identitas akun tim dan informasi wilayah operasional
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-semibold">
            <FaExclamationCircle className="flex-shrink-0 text-red-500 text-base" />
            <span>{errorMessage}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
            <FaCheckCircle className="flex-shrink-0 text-emerald-500 text-base" />
            <span>{success}</span>
          </div>
        )}

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
                  required
                >
                  <option value="">Pilih Kecamatan</option>
                  {kecamatanList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_kecamatan || item.nama}
                    </option>
                  ))}
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
                required
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
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                Email Akun Tim :
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                placeholder="tim.cabang@mail.com"
                className="w-full border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
                required
              />
            </div>

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
                required
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
                required
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
              className="w-full sm:w-auto border border-dashed border-gray-800 hover:border-black text-black text-xs font-bold px-4 py-2 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              + Tambah Anggota
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto border border-gray-400 text-gray-800 hover:bg-gray-50 text-xs font-semibold px-6 py-2 rounded-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isLoading || !!success}
                className="w-full sm:w-auto bg-[#059669] hover:bg-[#047857] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold px-7 py-2 rounded-md transition-all active:scale-[0.98] cursor-pointer"
              >
                {isLoading ? "Mengirim Data..." : "Kirim"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
