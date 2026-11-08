import { useState, useEffect } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import Footer from "../components/Footer";
import { useAdminStore } from "../stores/useAdminStore";
import { FaSpinner, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

export default function AdminWilayahPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    kecamatanList,
    fetchKecamatan,
    createKecamatan,
    updateKecamatan,
    deleteKecamatan,
    isLoading,
    isSubmitting,
    error,
    successMessage,
    clearError,
    clearSuccess,
  } = useAdminStore();

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    id: null,
    nama: "",
  });

  useEffect(() => {
    fetchKecamatan();
  }, [fetchKecamatan]);

  const filteredKecamatan = kecamatanList.filter((item) =>
    (item.nama_kecamatan || item.nama || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    clearError();
    clearSuccess();
    setModalState({
      isOpen: true,
      mode: "add",
      id: null,
      nama: "",
    });
  };

  const handleOpenEdit = (item) => {
    clearError();
    clearSuccess();
    setModalState({
      isOpen: true,
      mode: "edit",
      id: item.id,
      nama: item.nama_kecamatan || item.nama || "",
    });
  };

  const handleDelete = async (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus kecamatan "${nama}"?`)) {
      try {
        await deleteKecamatan(id);
      } catch {
        // Error sudah ditangani di store
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!modalState.nama.trim()) return;

    try {
      if (modalState.mode === "add") {
        await createKecamatan({ nama_kecamatan: modalState.nama.trim() });
      } else {
        await updateKecamatan(modalState.id, {
          nama_kecamatan: modalState.nama.trim(),
        });
      }
      setModalState({ isOpen: false, mode: "add", id: null, nama: "" });
    } catch {
      // Error sudah ditangani di store
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#d1d5db] font-sans text-black antialiased">
      <NavbarAdmin searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex-grow flex flex-col lg:flex-row bg-[#d1d5db]">
        <SidebarAdmin activeMenu="wilayah" />

        <main className="flex-1 p-6 lg:p-10">
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200 min-h-[480px] flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  Daftar Kecamatan
                </h1>
                <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
                  Tambah, hapus, dan perbarui wilayah kecamatan
                </p>
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

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <FaSpinner className="w-8 h-8 animate-spin text-[#0284c7] mb-3" />
                  <p className="text-sm font-medium">Memuat data kecamatan...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200 text-xs sm:text-sm font-bold text-black">
                        <th className="pb-3 w-16 sm:w-24">No</th>
                        <th className="pb-3">Nama Kecamatan</th>
                        <th className="pb-3 text-right pr-6 sm:pr-12 w-48 sm:w-64">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs sm:text-sm font-semibold text-black">
                      {filteredKecamatan.length > 0 ? (
                        filteredKecamatan.map((item, index) => (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-50/60 transition-colors"
                          >
                            <td className="py-4 font-bold">{index + 1}</td>
                            <td className="py-4">
                              {item.nama_kecamatan || item.nama}
                            </td>
                            <td className="py-4 text-right pr-2 sm:pr-8">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(item)}
                                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold px-5 py-1.5 rounded-md transition-all active:scale-[0.98] cursor-pointer"
                                >
                                  Ubah
                                </button>
                                <button
                                  type="button"
                                  disabled={isSubmitting}
                                  onClick={() =>
                                    handleDelete(
                                      item.id,
                                      item.nama_kecamatan || item.nama
                                    )
                                  }
                                  className="bg-[#b91c1c] hover:bg-[#991b1b] disabled:opacity-50 text-white text-xs font-semibold px-5 py-1.5 rounded-md transition-all active:scale-[0.98] cursor-pointer"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-12 text-center text-gray-500 font-normal"
                          >
                            {searchTerm
                              ? "Kecamatan tidak ditemukan."
                              : "Belum ada data kecamatan. Klik tombol Tambah di bawah untuk menambahkan."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="border border-dashed border-gray-800 hover:border-black hover:bg-gray-50 text-black text-xs font-bold px-4 py-2 rounded-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                + Tambah
              </button>
            </div>
          </div>
        </main>
      </div>

      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm border border-gray-200">
            <h3 className="text-base font-bold text-black mb-4">
              {modalState.mode === "add"
                ? "Tambah Kecamatan"
                : "Ubah Nama Kecamatan"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Nama Kecamatan
                </label>
                <input
                  type="text"
                  autoFocus
                  value={modalState.nama}
                  onChange={(e) =>
                    setModalState((prev) => ({ ...prev, nama: e.target.value }))
                  }
                  placeholder="Contoh: Pasar Kemis"
                  className="w-full border border-gray-400 rounded-md px-3 py-2 text-xs text-gray-800 outline-none focus:border-[#0284c7] transition-all bg-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setModalState({
                      isOpen: false,
                      mode: "add",
                      id: null,
                      nama: "",
                    })
                  }
                  className="border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-semibold px-4 py-2 rounded-md transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
