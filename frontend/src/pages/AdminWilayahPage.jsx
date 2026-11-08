import { useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import Footer from "../components/Footer";

export default function AdminWilayahPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [kecamatanList, setKecamatanList] = useState([
    { id: 1, nama: "Pasar Kemis" },
    { id: 2, nama: "Rajeg" },
  ]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    id: null,
    nama: "",
  });

  const filteredKecamatan = kecamatanList.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setModalState({
      isOpen: true,
      mode: "add",
      id: null,
      nama: "",
    });
  };

  const handleOpenEdit = (item) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      id: item.id,
      nama: item.nama,
    });
  };

  const handleDelete = (id) => {
    setKecamatanList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!modalState.nama.trim()) return;

    if (modalState.mode === "add") {
      const nextId =
        kecamatanList.length > 0
          ? Math.max(...kecamatanList.map((k) => k.id)) + 1
          : 1;
      setKecamatanList((prev) => [
        ...prev,
        { id: nextId, nama: modalState.nama.trim() },
      ]);
    } else {
      setKecamatanList((prev) =>
        prev.map((k) =>
          k.id === modalState.id ? { ...k, nama: modalState.nama.trim() } : k
        )
      );
    }

    setModalState({ isOpen: false, mode: "add", id: null, nama: "" });
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

              <hr className="border-gray-200 mb-6" />

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
                    {filteredKecamatan.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="py-4 font-bold">{index + 1}</td>
                        <td className="py-4">{item.nama}</td>
                        <td className="py-4 text-right pr-2 sm:pr-8">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item)}
                              className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold px-5 py-1.5 rounded-md transition-all active:scale-[0.98]"
                            >
                              Ubah
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold px-5 py-1.5 rounded-md transition-all active:scale-[0.98]"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="border border-dashed border-gray-800 hover:border-black hover:bg-gray-50 text-black text-xs font-bold px-4 py-2 rounded-lg transition-all active:scale-[0.98]"
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
                  className="w-full border border-gray-400 rounded-md px-3 py-2 text-xs text-gray-800 outline-none focus:border-[#0284c7] transition-all"
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
                  className="border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-semibold px-4 py-2 rounded-md transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold px-4 py-2 rounded-md transition-all active:scale-[0.98]"
                >
                  Simpan
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