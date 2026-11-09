import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBriefcase,
  FaChevronDown,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAlertStore } from "../../stores/useAlertStore";

export default function RegisterPelapor() {
  const navigate = useNavigate();
  const { registerPelapor, isLoading, error, clearError } = useAuthStore();
  const { showAlert } = useAlertStore();

  const [role, setRole] = useState("pelapor");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (localError) setLocalError("");
    if (error) clearError();
  };

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
    setSuccess("");
    clearError();

    if (role === "team_branch") {
      if (!formData.name.trim()) {
        setLocalError("Nama tim cabang wajib diisi.");
        return;
      }
      if (!formData.email.trim() || !formData.password || !formData.confirmPassword) {
        setLocalError("Email dan password wajib diisi.");
        return;
      }
      if (formData.password.length < 6) {
        setLocalError("Password minimal terdiri dari 6 karakter.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setLocalError("Konfirmasi password tidak cocok dengan password.");
        return;
      }

      navigate("/register-cabang", {
        state: {
          namaTim: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
      });
      return;
    }

    if (role === "pelapor" && !formData.name.trim()) {
      const msg = "Nama lengkap wajib diisi.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Registrasi gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }

    if (!formData.email.trim() || !formData.password || !formData.confirmPassword) {
      const msg = "Email dan password wajib diisi.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Registrasi gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }

    if (formData.password.length < 6) {
      const msg = "Password minimal terdiri dari 6 karakter.";
      setLocalError(msg);
      showAlert({
        type: "error",
        title: "Registrasi gagal",
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
        title: "Registrasi gagal",
        message: msg,
        buttonText: "OKE",
      });
      return;
    }

    try {
      await registerPelapor(formData);

      showAlert({
        type: "success",
        title: "Registrasi berhasil",
        message: "Akun berhasil dibuat",
        buttonText: "OKE",
        onConfirm: () => {
          navigate("/login");
        },
      });
    } catch (err) {
      const errMsg =
        err.response?.data?.error ||
        err.message ||
        "Terjadi kesalahan saat registrasi.";
      showAlert({
        type: "error",
        title: "Registrasi gagal",
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
          BUAT AKUN
        </h2>
        <p className="text-gray-300 text-sm mt-1">
          Daftarkan akun Anda untuk mulai menggunakan sistem.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-500/15 border border-red-500/40 rounded-xl flex items-center gap-2 text-red-300 text-xs">
          <FaExclamationCircle className="flex-shrink-0 text-red-400 text-sm" />
          <span>{errorMessage}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-emerald-300 text-xs">
          <FaCheckCircle className="flex-shrink-0 text-emerald-400 text-sm" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-bold text-sm mb-1.5">
            Daftar Sebagai :
          </label>
          <div className="relative flex items-center bg-[#cfd3d8] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0082c8] transition-all">
            <FaBriefcase className="text-gray-600 mr-3 text-base flex-shrink-0" />
            <select
              value={role}
              onChange={handleRoleChange}
              className="bg-transparent w-full text-sm font-medium text-gray-800 outline-none appearance-none cursor-pointer pr-6"
            >
              <option value="pelapor">Pelapor / Masyarakat</option>
              <option value="team_branch">Tim Cabang</option>
            </select>
            <FaChevronDown className="absolute right-4 text-gray-600 pointer-events-none text-xs" />
          </div>
        </div>

        <div>
          <label className="block text-white font-bold text-sm mb-1.5">
            {role === "team_branch" ? "Nama Tim Cabang :" : "Nama Lengkap :"}
          </label>
          <div className="flex items-center bg-[#cfd3d8] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0082c8] transition-all">
            <FaUser className="text-gray-600 mr-3 text-base flex-shrink-0" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={
                role === "team_branch"
                  ? "Contoh : Tim Cabang A"
                  : "Nama lengkap anda"
              }
              className="bg-transparent w-full text-sm font-medium text-gray-800 placeholder-gray-500 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-bold text-sm mb-1.5">
            Email {role === "team_branch" ? "Akun Tim :" : ":"}
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
            Konfirmasi Password :
          </label>
          <div className="flex items-center bg-[#cfd3d8] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0082c8] transition-all">
            <FaLock className="text-gray-600 mr-3 text-base flex-shrink-0" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-transparent w-full text-sm font-medium text-gray-800 placeholder-gray-500 outline-none"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !!success}
            className="w-full bg-[#0082c8] hover:bg-[#0274b3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            {isLoading ? "Memproses..." : "Buat Akun"}
          </button>
        </div>
      </form>

      <div className="text-center text-xs sm:text-sm text-gray-300 mt-6 space-y-2">
        <p>
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#0082c8] font-semibold hover:underline cursor-pointer"
          >
            Masuk disini
          </button>
        </p>
      </div>
    </div>
  );
}
