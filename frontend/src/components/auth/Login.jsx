import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaBriefcase, FaChevronDown } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
              <option value="" disabled>
                Masukan peran anda
              </option>
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
            className="w-full bg-[#0082c8] hover:bg-[#0274b3] text-white font-bold py-3.5 rounded-2xl shadow-md transition-all active:scale-[0.99]"
          >
            Masuk
          </button>
        </div>
      </form>

      <p className="text-center text-xs sm:text-sm text-gray-300 mt-6">
        Belum memiliki akun?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-[#0082c8] font-semibold hover:underline"
        >
          Buat akun
        </button>
      </p>
    </div>
  );
}