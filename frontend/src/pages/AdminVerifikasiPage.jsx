import { useState, useEffect } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import Footer from "../components/Footer";
import { useAdminStore } from "../stores/useAdminStore";
import { useAlertStore } from "../stores/useAlertStore";
import {
  FaCheck,
  FaTimes,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

export default function AdminVerifikasiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    teamsList,
    membersList,
    fetchTeams,
    fetchAnggota,
    verifyTeam,
    deleteTeam,
    isLoading,
    isSubmitting,
    error,
    successMessage,
  } = useAdminStore();

  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const pendingTeams = teamsList.filter((team) => !team.is_verified);
  const verifiedTeams = teamsList.filter((team) => team.is_verified);

  useEffect(() => {
    if (pendingTeams.length > 0 && !selectedTeamId) {
      setSelectedTeamId(pendingTeams[0].id);
    } else if (pendingTeams.length === 0 && verifiedTeams.length > 0 && !selectedTeamId) {
      setSelectedTeamId(verifiedTeams[0].id);
    }
  }, [pendingTeams, verifiedTeams, selectedTeamId]);

  useEffect(() => {
    if (selectedTeamId) {
      fetchAnggota({ id_team_branch: selectedTeamId });
    }
  }, [selectedTeamId, fetchAnggota]);

  const selectedTeam = teamsList.find((t) => t.id === selectedTeamId);
  const teamMembers = membersList.filter(
    (m) =>
      m.id_team_branch === selectedTeamId ||
      m.team_branch?.id === selectedTeamId
  );

  const { showAlert } = useAlertStore();

  const handleVerify = async (id) => {
    try {
      await verifyTeam(id, true);
      setSelectedTeamId(null);
      showAlert({
        type: "success",
        title: "Verifikasi Berhasil",
        message: "Akun tim cabang berhasil diverifikasi dan sekarang dapat login.",
        buttonText: "OKE",
      });
    } catch (err) {
      showAlert({
        type: "error",
        title: "Verifikasi Gagal",
        message: err.response?.data?.error || err.message || "Gagal memverifikasi akun tim cabang.",
        buttonText: "OKE",
      });
    }
  };

  const handleReject = async (id, nama) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menolak & menghapus pendaftaran tim "${nama}"?`
      )
    ) {
      try {
        await deleteTeam(id);
        setSelectedTeamId(null);
        showAlert({
          type: "success",
          title: "Pendaftaran Ditolak",
          message: `Pendaftaran tim "${nama}" telah berhasil ditolak dan dihapus.`,
          buttonText: "OKE",
        });
      } catch (err) {
        showAlert({
          type: "error",
          title: "Gagal Menolak",
          message: err.response?.data?.error || err.message || "Gagal menghapus pendaftaran.",
          buttonText: "OKE",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c1322] font-sans text-black antialiased">
      <NavbarAdmin searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-grow flex flex-col lg:flex-row bg-[#0c1322]">
        <SidebarAdmin activeMenu="verifikasi" />

        <main className="flex-1 bg-[#e5e7eb] p-6 lg:p-8">
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl w-full border border-gray-100">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  Verifikasi Pendaftar Tim Cabang
                </h1>
                <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
                  Admin memeriksa dan memproses persetujuan hak akses operasional tim cabang
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-300">
                  {pendingTeams.length} Menunggu Verifikasi
                </span>
              </div>
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

            <hr className="border-gray-200 mb-6" />

            
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Pilih Antrean Pendaftar Tim :
              </label>
              <div className="flex flex-wrap gap-2">
                {pendingTeams.map((team) => (
                  <button
                    key={team.id}
                    type="button"
                    onClick={() => setSelectedTeamId(team.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedTeamId === team.id
                        ? "bg-[#0082c8] text-white shadow-md"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {team.nama_tim} (
                    {team.kecamatan?.nama_kecamatan || "Tanpa Wilayah"})
                  </button>
                ))}

                {pendingTeams.length === 0 && (
                  <p className="text-xs text-gray-500 italic py-2">
                    Tidak ada pendaftar baru yang menunggu verifikasi saat ini.
                  </p>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <FaSpinner className="w-8 h-8 animate-spin text-[#0284c7] mb-3" />
                <p className="text-sm font-medium">Memuat data pendaftar...</p>
              </div>
            ) : selectedTeam ? (
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                      Domisili / Wilayah Kecamatan :
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={
                        selectedTeam.kecamatan?.nama_kecamatan ||
                        "Tidak Terpilih"
                      }
                      className="w-full border border-gray-300 rounded-md px-3.5 py-2 text-xs text-gray-800 bg-gray-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                      Nama Tim Cabang :
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={selectedTeam.nama_tim || ""}
                      className="w-full border border-gray-300 rounded-md px-3.5 py-2 text-xs text-gray-800 bg-gray-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-black mb-2">
                      No. Telepon Ketua :
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={selectedTeam.nomor_ketua || "-"}
                      className="w-full border border-gray-300 rounded-md px-3.5 py-2 text-xs text-gray-800 bg-gray-100 outline-none"
                    />
                  </div>
                </div>

                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-300 text-xs sm:text-sm font-bold text-black">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-gray-600" />
                      <span>Daftar Anggota Tim Terdaftar</span>
                    </div>
                    <span className="text-xs text-gray-500 font-normal">
                      {teamMembers.length} Anggota
                    </span>
                  </div>

                  {teamMembers.length > 0 ? (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-12 gap-3 text-xs font-bold text-gray-600 px-3">
                        <div className="col-span-4">Nama Lengkap</div>
                        <div className="col-span-3">NIK</div>
                        <div className="col-span-3">Role / Gender</div>
                        <div className="col-span-2 text-center">Umur</div>
                      </div>

                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-lg border border-gray-200 text-xs"
                        >
                          <div className="col-span-4 font-semibold text-gray-900">
                            {member.nama}
                          </div>
                          <div className="col-span-3 text-gray-600 font-mono">
                            {member.nik}
                          </div>
                          <div className="col-span-3 text-gray-600">
                            <span className="capitalize font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded mr-1">
                              {member.role || "Anggota"}
                            </span>
                            ({member.gender})
                          </div>
                          <div className="col-span-2 text-center text-gray-700">
                            {member.umur} thn
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-lg border border-dashed border-gray-300 text-center text-xs text-gray-500">
                      Belum ada data anggota yang tersimpan untuk tim cabang ini.
                    </div>
                  )}
                </div>

                
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() =>
                      handleReject(selectedTeam.id, selectedTeam.nama_tim)
                    }
                    className="inline-flex items-center gap-1.5 bg-[#b91c1c] hover:bg-[#991b1b] disabled:opacity-50 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <FaTimes />
                    <span>Tolak / Hapus</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleVerify(selectedTeam.id)}
                    className="inline-flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] disabled:opacity-50 text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <FaCheck />
                    <span>
                      {selectedTeam.is_verified
                        ? "Sudah Terverifikasi"
                        : "Verifikasi & Setujui Tim"}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <p className="text-sm">Pilih tim pendaftar untuk melihat detail.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
