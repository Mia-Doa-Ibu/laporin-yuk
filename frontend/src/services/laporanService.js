import api from "./api";

const laporanService = {
  // 1. Mengirim laporan baru (khusus pelapor yang login)
  createLaporan: async ({ id_team_branch, title, deskripsi, id_kategori, foto_url }) => {
    const payload = {
      id_team_branch,
      title,
      deskripsi,
      id_kategori: id_kategori || null,
      foto_url: foto_url || null,
    };
    const response = await api.post("/laporan", payload);
    return response.data;
  },

  // 2. Mengambil semua laporan (otomatis difilter milik pelapor yang login)
  getLaporan: async (params = {}) => {
    const response = await api.get("/laporan", { params });
    return response.data;
  },

  // 3. Mengambil detail laporan berdasarkan ID
  getLaporanById: async (id) => {
    const response = await api.get(`/laporan/${id}`);
    return response.data;
  },

  // 4. Mengambil daftar tim branch untuk opsi dropdown Tim Lapangan
  getTeamBranches: async () => {
    const response = await api.get("/team-branch");
    return response.data;
  },
};

export default laporanService;

