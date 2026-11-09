import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaBriefcase,
  FaChevronDown,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAlertStore } from "../../stores/useAlertStore";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const { login, isLoading, error, clearError } = useAuthStore();
  const { showAlert } = useAlertStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    if (localError) setLocalError("");
    if (error) clearError();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (!formData.email || !formData.password) {
      setLocalError("Email dan password wajib diisi.");
      showAlert({
        type: "error",
        title: "Login gagal",
        message: "Email dan password wajib diisi.",
        buttonText: "OKE",
      });
      return;
    }

    try {
      const data = await login({
        email: formData.email,
        password: formData.password,
      });

      const actualRole = data.user?.user_metadata?.role;

      showAlert({
        type: "success",
        title: "Login berhasil",
        message: "Anda berhasil login",
        buttonText: "OKE",
        onConfirm: () => {
          if (actualRole === "admin") {
            navigate("/admin/verifikasi", { replace: true });
          } else if (actualRole === "team_branch") {
            navigate("/cabang", { replace: true });
          } else if (actualRole === "pelapor") {
            if (from && (from === "/laporan" || from === "/status")) {
              navigate(from, { replace: true });
            } else {
              navigate("/laporan", { replace: true });
            }
          } else {
            navigate("/", { replace: true });
          }
        },
      });
    } catch (err) {
      const errMsg =
        err.response?.data?.error ||
        err.message ||
        "Email atau password yang anda masukan salah";
      showAlert({
        type: "error",
        title: "Login gagal",
        message: errMsg,
        buttonText: "OKE",
      });
    }
  };

  const errorMessage = localError || error;

  return (
    <div className="w-full max-w-md bg-[#0c1322] rounded-2xl p-8 shadow-2xl border border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-white tracking-wide">
          SELAMAT DATANG
          <br />
          KEMBALI
        </h2>
        <p className="text-gray-300 text-sm mt-1">
          Masukan email dan password anda untuk masuk
        </p>
      </div>

      {from && (
        <div className="mb-4 p-3 bg-sky-500/15 border border-sky-500/40 rounded-xl flex items-center gap-2 text-sky-200 text-xs">
          <FaInfoCircle className="flex-shrink-0 text-sky-400 text-sm" />
          <span>Silakan login terlebih dahulu untuk mengakses halaman tersebut.</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/15 border border-red-500/40 rounded-xl flex items-center gap-2 text-red-300 text-xs">
          <FaExclamationCircle className="flex-shrink-0 text-red-400 text-sm" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-bold text-sm mb-1.5">
            Email :
          </label>
          <div className="flex items-center bg-[#cfd3d8] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0082c8] transition-all">
            <FaEnvelope className="text-gray-600 mr-3 text-base flex-shrink-0" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="account@gmail.com"
              className="bg-transparent w-full text-sm font-medium text-gray-800 placeholder-gray-500 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-bold text-sm mb-1.5">
            Password :
          </label>
          <div className="flex items-center bg-[#cfd3d8] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0082c8] transition-all">
            <FaLock className="text-gray-600 mr-3 text-base flex-shrink-0" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-transparent w-full text-sm font-medium text-gray-800 placeholder-gray-500 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-bold text-sm mb-1.5">
            Masuk Sebagai :
          </label>
          <div className="relative flex items-center bg-[#cfd3d8] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0082c8] transition-all">
            <FaBriefcase className="text-gray-600 mr-3 text-base flex-shrink-0" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-transparent w-full text-sm font-medium text-gray-800 outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="">Deteksi Otomatis Sesuai Akun</option>
              <option value="pelapor">Pelapor / Masyarakat</option>
              <option value="tim_cabang">Tim Cabang</option>
              <option value="admin_pusat">Admin Pusat</option>
            </select>
            <FaChevronDown className="absolute right-4 text-gray-600 pointer-events-none text-xs" />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0082c8] hover:bg-[#0274b3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </div>
      </form>

      <p className="text-center text-xs sm:text-sm text-gray-300 mt-6">
        Belum memiliki akun?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-[#0082c8] font-semibold hover:underline cursor-pointer"
        >
          Buat akun
        </button>
      </p>
    </div>
  );
}
