import { useState, useEffect } from "react";
import { FaChevronDown, FaSpinner, FaExclamationCircle, FaCheckCircle, FaTrash, FaSave } from "react-icons/fa";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import Footer from "../components/Footer";
import { useAdminStore } from "../stores/useAdminStore";

export default function AdminDataTimPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    teamsList,
    kecamatanList,
    membersList,
    fetchTeams,
    fetchKecamatan,
    fetchAnggota,
    updateTeam,
    deleteTeam,
    isLoading,
    isSubmitting,
    error,
    successMessage,
    clearError,
    clearSuccess,
  } = useAdminStore();

  const [editForms, setEditForms] = useState({});

  useEffect(() => {
    fetchTeams();
    fetchKecamatan();
    fetchAnggota();
  }, [fetchTeams, fetchKecamatan, fetchAnggota]);

  useEffect(() => {
    const initialForms = {};
    teamsList.forEach((team) => {
      initialForms[team.id] = {
        nama_tim: team.nama_tim || "",
        id_kecamatan: team.kecamatan?.id || team.id_kecamatan || "",
        nomor_ketua: team.nomor_ketua || "",
      };
    });
    setEditForms(initialForms);
  }, [teamsList]);

  const handleFieldChange = (teamId, field, value) => {
    setEditForms((prev) => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        [field]: value,
      },
    }));
  };

  const handleSaveTeam = async (teamId) => {
    clearError();
    clearSuccess();
    const current = editForms[teamId];
    if (!current) return;

    try {
      await updateTeam(teamId, {
        nama_tim: current.nama_tim,
        id_kecamatan: current.id_kecamatan || undefined,
      });
    } catch {
    }
  };

  const handleDeleteTeam = async (teamId, namaTim) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data tim cabang "${namaTim}"?`)) {
      try {
        await deleteTeam(teamId);
      } catch {
      }
    }
  };

  const filteredTeams = teamsList.filter((team) => {
    const q = searchTerm.toLowerCase();
    const nama = (team.nama_tim || "").toLowerCase();
    const kec = (team.kecamatan?.nama_kecamatan || "").toLowerCase();
    const telp = (team.nomor_ketua || "").toLowerCase();
    return nama.includes(q) || kec.includes(q) || telp.includes(q);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#e5e7eb] font-sans text-black antialiased">
      <NavbarAdmin searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-grow flex flex-col lg:flex-row bg-[#e5e7eb]">
        <SidebarAdmin activeMenu="data-tim" />

        <main className="flex-1 p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              DATA TIM CABANG
            </h1>
            <span className="text-xs font-bold text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-300 shadow-sm">
              Total {teamsList.length} Tim Terdaftar
            </span>
          </div>

          {error && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-semibold">
              <FaExclamationCircle className="flex-shrink-0 text-red-500 text-base" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
              <FaCheckCircle className="flex-shrink-0 text-emerald-500 text-base" />
              <span>{successMessage}</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-500">
              <FaSpinner className="w-8 h-8 animate-spin text-[#0284c7] mb-3" />
              <p className="text-sm font-medium">Memuat data tim cabang...</p>
            </div>
          ) : filteredTeams.length > 0 ? (
            <div className="space-y-8">
              {filteredTeams.map((team) => {
                const currentForm = editForms[team.id] || {
                  nama_tim: team.nama_tim || "",
                  id_kecamatan: team.kecamatan?.id || team.id_kecamatan || "",
                  nomor_ketua: team.nomor_ketua || "",
                };

                const teamAnggota = membersList.filter(
                  (m) =>
                    m.id_team_branch === team.id ||
                    m.team_branch?.id === team.id
                );

                return (
                  <div
                    key={team.id}
                    className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                          Domisili Kecamatan :
                        </label>
                        <div className="relative">
                          <select
                            value={currentForm.id_kecamatan}
                            onChange={(e) =>
                              handleFieldChange(
                                team.id,
                                "id_kecamatan",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-400 rounded-md px-3.5 py-2 text-xs text-gray-800 outline-none appearance-none pr-8 bg-white focus:border-[#0082c8] transition-all cursor-pointer"
                          >
                            <option value="">Pilih Kecamatan</option>
                            {kecamatanList.map((kec) => (
                              <option key={kec.id} value={kec.id}>
                                {kec.nama_kecamatan || kec.nama}
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
                          value={currentForm.nama_tim}
                          onChange={(e) =>
                            handleFieldChange(
                              team.id,
                              "nama_tim",
                              e.target.value
                            )
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
                          readOnly
                          value={currentForm.nomor_ketua}
                          className="w-full border border-gray-300 rounded-md px-3.5 py-2 text-xs text-gray-700 bg-gray-100 outline-none"
                        />
                      </div>
                    </div>

                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-12 gap-3 sm:gap-4 pb-2 border-b border-gray-300 text-xs sm:text-sm font-bold text-black">
                        <div className="col-span-4">Anggota Tim</div>
                        <div className="col-span-3">NIK</div>
                        <div className="col-span-3">Role / Gender</div>
                        <div className="col-span-2 text-center">Umur</div>
                      </div>

                      <div className="space-y-3">
                        {teamAnggota.length > 0 ? (
                          teamAnggota.map((member) => (
                            <div
                              key={member.id}
                              className="grid grid-cols-12 gap-3 sm:gap-4 items-center bg-gray-50/70 p-2.5 rounded-md border border-gray-200 text-xs"
                            >
                              <div className="col-span-4 font-semibold text-gray-900">
                                {member.nama}
                              </div>
                              <div className="col-span-3 font-mono text-gray-700">
                                {member.nik}
                              </div>
                              <div className="col-span-3 text-gray-700">
                                <span className="bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded mr-1">
                                  {member.role || "Anggota"}
                                </span>
                                ({member.gender})
                              </div>
                              <div className="col-span-2 text-center text-gray-700">
                                {member.umur} thn
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 italic py-3 text-center border border-dashed border-gray-200 rounded-md">
                            Belum ada anggota terdaftar untuk tim ini.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-100 mt-6">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleDeleteTeam(team.id, team.nama_tim)}
                        className="inline-flex items-center gap-1.5 bg-[#b91c1c] hover:bg-[#991b1b] disabled:opacity-50 text-white text-xs font-semibold px-6 py-2 rounded-md transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <FaTrash className="text-xs" />
                        <span>Hapus Tim</span>
                      </button>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleSaveTeam(team.id)}
                        className="inline-flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] disabled:opacity-50 text-white text-xs font-semibold px-6 py-2 rounded-md transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <FaSave className="text-xs" />
                        <span>Simpan Perubahan</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200 shadow-sm text-gray-500">
              <p className="text-sm font-medium">
                {searchTerm
                  ? "Tidak ada data tim yang sesuai dengan pencarian."
                  : "Belum ada tim cabang yang terdaftar."}
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
