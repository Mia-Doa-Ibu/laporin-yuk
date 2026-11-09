import api from "./api";

const cabangService = {
  getLaporan: async (params = {}) => {
    const response = await api.get("/laporan", { params });
    return response.data;
  },

  getLaporanById: async (id) => {
    const response = await api.get(`/laporan/${id}`);
    return response.data;
  },

  updateStatusLaporan: async (id, status) => {
    const response = await api.patch(`/laporan/${id}/status`, { status });
    return response.data;
  },

  getAnggota: async (params = {}) => {
    const response = await api.get("/anggota", { params });
    return response.data;
  },
};

export default cabangService;

