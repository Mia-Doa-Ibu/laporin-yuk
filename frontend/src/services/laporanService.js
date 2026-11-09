import api from "./api";

const laporanService = {
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

  getLaporan: async (params = {}) => {
    const response = await api.get("/laporan", { params });
    return response.data;
  },

  getLaporanById: async (id) => {
    const response = await api.get(`/laporan/${id}`);
    return response.data;
  },

  getTeamBranches: async () => {
    const response = await api.get("/team-branch");
    return response.data;
  },
};

export default laporanService;

