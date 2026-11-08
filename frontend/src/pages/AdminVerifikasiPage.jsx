import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import Footer from "../components/Footer";

export default function AdminVerifikasiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [domisili, setDomisili] = useState("");
  const [namaTim, setNamaTim] = useState("");
  const [noTelepon, setNoTelepon] = useState("");

  const [anggotaList, setAnggotaList] = useState([
    { rolePlaceholder: "Ketua tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
    { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
    { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
    { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
    { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
  ]);

  const handleAnggotaChange = (index, field, value) => {
    setAnggotaList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c1322] font-sans text-black antialiased">
      <NavbarAdmin searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-grow flex flex-col lg:flex-row bg-[#0c1322]">
        <SidebarAdmin activeMenu="verifikasi" />

        <main className="flex-1 bg-[#e5e7eb] p-6 lg:p-8">
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl w-full border border-gray-100">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Verifikasi Pendaftar
              </h1>
              <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
                Admin hanya menerima dan memproses pendaftaran tim cabang yang telah ditentukan
              </p>
            </div>

            <hr className="border-gray-200 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                  Domisili :
                </label>
                <div className="relative">
                  <select
                    value={domisili}
                    onChange={(e) => setDomisili(e.target.value)}
                    className="w-full border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 outline-none appearance-none pr-8 bg-white focus:border-[#0082c8] transition-all cursor-pointer"
                  >
                    <option value="">Pilih Kecamatan</option>
                    <option value="Pasar Kemis">Pasar Kemis</option>
                    <option value="Cikupa">Cikupa</option>
                    <option value="Balaraja">Balaraja</option>
                    <option value="Curug">Curug</option>
                    <option value="Kelapa Dua">Kelapa Dua</option>
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
                  value={namaTim}
                  onChange={(e) => setNamaTim(e.target.value)}
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
                  value={noTelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                  placeholder="08xxxxxxxxxx (Aktif)"
                  className="w-full border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-3 sm:gap-4 pb-2 border-b border-gray-300 text-xs sm:text-sm font-bold text-black">
                <div className="col-span-4">Anggota Tim</div>
                <div className="col-span-3">NIK</div>
                <div className="col-span-3">Gender</div>
                <div className="col-span-2">Umur</div>
              </div>

              <div className="space-y-3">
                {anggotaList.map((item, index) => (
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
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}