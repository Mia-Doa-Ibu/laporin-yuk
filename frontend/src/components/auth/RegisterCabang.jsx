import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaMapMarkerAlt,
  FaLock,
  FaChevronDown,
  FaUndo,
} from "react-icons/fa";

export default function RegisterCabang() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    domisili: "",
    password: "",
    confirmPassword: "",
  });

  const [stage, setStage] = useState("province");
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api-wilayah/provinces.json")
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (!value) return;

    if (value === "__BACK_TO_PROVINCE__") {
      setStage("province");
      setSelectedProvince(null);
      setRegencies([]);
      return;
    }

    if (value === "__BACK_TO_REGENCY__") {
      setStage("regency");
      setSelectedRegency(null);
      setDistricts([]);
      return;
    }

    if (stage === "province") {
      const prov = provinces.find((p) => p.id === value);
      if (!prov) return;
      setSelectedProvince(prov);
      setIsLoading(true);
      fetch(`/api-wilayah/regencies/${prov.id}.json`)
        .then((res) => res.json())
        .then((data) => {
          setRegencies(data);
          setStage("regency");
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else if (stage === "regency") {
      const reg = regencies.find((r) => r.id === value);
      if (!reg) return;
      setSelectedRegency(reg);
      setIsLoading(true);
      fetch(`/api-wilayah/districts/${reg.id}.json`)
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data);
          setStage("district");
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else if (stage === "district") {
      const dist = districts.find((d) => d.id === value);
      if (!dist) return;
      setSelectedDistrict(dist);
      const fullLocation = `Kec. ${dist.name}, ${selectedRegency.name}, ${selectedProvince.name}`;
      setFormData((prev) => ({
        ...prev,
        domisili: fullLocation,
      }));
      setStage("done");
    }
  };

  const resetDomisili = () => {
    setStage("province");
    setSelectedProvince(null);
    setSelectedRegency(null);
    setSelectedDistrict(null);
    setFormData((prev) => ({ ...prev, domisili: "" }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-md bg-[#0c1322] rounded-2xl p-8 shadow-2xl border border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-white tracking-wide">
          DAFTAR TIM CABANG
        </h2>
        <p className="text-gray-300 text-sm mt-1">
          Lengkapi data di bawah ini untuk mendaftar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-bold text-sm mb-1.5">
            Nama Lengkap :
          </label>
          <div className="flex items-center bg-[#cfd3d8] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0082c8] transition-all">
            <FaUser className="text-gray-600 mr-3 text-base flex-shrink-0" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama lengkap anda"
              className="bg-transparent w-full text-sm font-medium text-gray-800 placeholder-gray-500 outline-none"
            />
          </div>
        </div>

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
              <option value="koordinator">Koordinator Cabang</option>
              <option value="petugas_lapangan">Petugas Lapangan</option>
              <option value="verifikator">Verifikator Wilayah</option>
            </select>
            <FaChevronDown className="absolute right-4 text-gray-600 pointer-events-none text-xs" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-white font-bold text-sm">
              Domisili :
            </label>
            {stage === "done" && (
              <button
                type="button"
                onClick={resetDomisili}
                className="flex items-center gap-1 text-xs text-[#0082c8] hover:underline"
              >
                <FaUndo className="text-[10px]" /> Ubah Lokasi
              </button>
            )}
          </div>

          <div className="relative flex items-center bg-[#cfd3d8] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0082c8] transition-all">
            <FaMapMarkerAlt className="text-gray-600 mr-3 text-base flex-shrink-0" />

            {stage !== "done" ? (
              <select
                value=""
                onChange={handleSelectChange}
                disabled={isLoading}
                className="bg-transparent w-full text-sm font-medium text-gray-800 outline-none appearance-none cursor-pointer pr-6 disabled:opacity-60"
              >
                {stage === "province" && (
                  <>
                    <option value="" disabled>
                      {isLoading ? "Memuat data provinsi..." : "Pilih Provinsi"}
                    </option>
                    {provinces.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.name}
                      </option>
                    ))}
                  </>
                )}

                {stage === "regency" && (
                  <>
                    <option value="" disabled>
                      {isLoading
                        ? "Memuat Kota/Kabupaten..."
                        : `Pilih Kota/Kabupaten (${selectedProvince?.name})`}
                    </option>
                    <option value="__BACK_TO_PROVINCE__" className="font-bold text-blue-700">
                      ← Kembali ke Pilih Provinsi
                    </option>
                    {regencies.map((reg) => (
                      <option key={reg.id} value={reg.id}>
                        {reg.name}
                      </option>
                    ))}
                  </>
                )}

                {stage === "district" && (
                  <>
                    <option value="" disabled>
                      {isLoading
                        ? "Memuat Kecamatan..."
                        : `Pilih Kecamatan (${selectedRegency?.name})`}
                    </option>
                    <option value="__BACK_TO_REGENCY__" className="font-bold text-blue-700">
                      ← Kembali ke Pilih Kota/Kabupaten
                    </option>
                    {districts.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {dist.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            ) : (
              <input
                type="text"
                readOnly
                value={formData.domisili}
                className="bg-transparent w-full text-sm font-semibold text-gray-800 outline-none cursor-default truncate"
              />
            )}

            {stage !== "done" && (
              <FaChevronDown className="absolute right-4 text-gray-600 pointer-events-none text-xs" />
            )}
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
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#0082c8] hover:bg-[#0274b3] text-white font-bold py-3.5 rounded-2xl shadow-md transition-all active:scale-[0.99]"
          >
            Buat Akun
          </button>
        </div>
      </form>

      <p className="text-center text-xs sm:text-sm text-gray-300 mt-6">
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-[#0082c8] font-semibold hover:underline"
        >
          Masuk disini
        </button>
      </p>
    </div>
  );
}