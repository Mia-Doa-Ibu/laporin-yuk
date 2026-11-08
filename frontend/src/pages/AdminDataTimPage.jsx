import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import Footer from "../components/Footer";

export default function AdminDataTimPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const initialTeams = [
    {
      id: 1,
      domisili: "",
      namaTim: "",
      noTelepon: "",
      anggota: [
        { rolePlaceholder: "Ketua tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
        { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
        { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
        { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
        { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      ],
    },
    {
      id: 2,
      domisili: "",
      namaTim: "",
      noTelepon: "",
      anggota: [
        { rolePlaceholder: "Ketua tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
        { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
        { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
        { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
        { rolePlaceholder: "Anggota tim", nama: "", nik: "", gender: "Laki-laki", umur: "" },
      ],
    },
  ];

  const [teams, setTeams] = useState(initialTeams);

  const handleFieldChange = (teamIndex, field, value) => {
    setTeams((prev) => {
      const updated = [...prev];
      updated[teamIndex] = { ...updated[teamIndex], [field]: value };
      return updated;
    });
  };

  const handleAnggotaChange = (teamIndex, memberIndex, field, value) => {
    setTeams((prev) => {
      const updated = [...prev];
      const updatedAnggota = [...updated[teamIndex].anggota];
      updatedAnggota[memberIndex] = {
        ...updatedAnggota[memberIndex],
        [field]: value,
      };
      updated[teamIndex] = {
        ...updated[teamIndex],
        anggota: updatedAnggota,
      };
      return updated;
    });
  };

  const handleDeleteTeam = (teamId) => {
    setTeams((prev) => prev.filter((team) => team.id !== teamId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e5e7eb] font-sans text-black antialiased">
      <NavbarAdmin searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-grow flex flex-col lg:flex-row bg-[#e5e7eb]">
        <SidebarAdmin activeMenu="data-tim" />

        <main className="flex-1 p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-8">
            DATA TIM CABANG
          </h1>

          <div className="space-y-8">
            {teams.map((team, teamIndex) => (
              <div
                key={team.id}
                className="bg-white rounded-md p-6 sm:p-8 shadow-sm border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                      Domisili :
                    </label>
                    <div className="relative">
                      <select
                        value={team.domisili}
                        onChange={(e) =>
                          handleFieldChange(teamIndex, "domisili", e.target.value)
                        }
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
                      value={team.namaTim}
                      onChange={(e) =>
                        handleFieldChange(teamIndex, "namaTim", e.target.value)
                      }
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
                      value={team.noTelepon}
                      onChange={(e) =>
                        handleFieldChange(teamIndex, "noTelepon", e.target.value)
                      }
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
                    {team.anggota.map((member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className="grid grid-cols-12 gap-3 sm:gap-4 items-center"
                      >
                        <div className="col-span-4">
                          <input
                            type="text"
                            value={member.nama}
                            onChange={(e) =>
                              handleAnggotaChange(
                                teamIndex,
                                memberIndex,
                                "nama",
                                e.target.value
                              )
                            }
                            placeholder={member.rolePlaceholder}
                            className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
                          />
                        </div>

                        <div className="col-span-3">
                          <input
                            type="text"
                            value={member.nik}
                            onChange={(e) =>
                              handleAnggotaChange(
                                teamIndex,
                                memberIndex,
                                "nik",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-400 rounded-md px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#0082c8] transition-all bg-white"
                          />
                        </div>

                        <div className="col-span-3 relative">
                          <select
                            value={member.gender}
                            onChange={(e) =>
                              handleAnggotaChange(
                                teamIndex,
                                memberIndex,
                                "gender",
                                e.target.value
                              )
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
                            value={member.umur}
                            onChange={(e) =>
                              handleAnggotaChange(
                                teamIndex,
                                memberIndex,
                                "umur",
                                e.target.value
                              )
                            }
                            className="w-full sm:w-16 border border-gray-400 rounded-md px-2 py-1.5 text-xs text-gray-800 outline-none focus:border-[#0082c8] transition-all bg-white text-center"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => handleDeleteTeam(team.id)}
                    className="bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold px-7 py-2 rounded-md transition-all active:scale-[0.98]"
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold px-7 py-2 rounded-md transition-all active:scale-[0.98]"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}