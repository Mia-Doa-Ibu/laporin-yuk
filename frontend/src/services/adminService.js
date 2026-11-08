import api from "./api";

const adminService = {
  // === 1. KELOLA WILAYAH (KECAMATAN) ===
  getAllKecamatan: async (params = {}) => {
    const response = await api.get("/kecamatan", { params });
    return response.data;
  },

  createKecamatan: async ({ nama_kecamatan, kabupaten = "Tangerang", provinsi = "Banten" }) => {
    const response = await api.post("/kecamatan", {
      nama_kecamatan,
      kabupaten,
      provinsi,
    });
    return response.data;
  },

  updateKecamatan: async (id, { nama_kecamatan, kabupaten = "Tangerang", provinsi = "Banten" }) => {
    const response = await api.put(`/kecamatan/${id}`, {
      nama_kecamatan,
      kabupaten,
      provinsi,
    });
    return response.data;
  },

  deleteKecamatan: async (id) => {
    const response = await api.delete(`/kecamatan/${id}`);
    return response.data;
  },

  // === 2. VERIFIKASI & DATA TIM CABANG ===
  getAllTeamBranch: async (params = {}) => {
    const response = await api.get("/team-branch", { params });
    return response.data;
  },

  getTeamBranchById: async (id) => {
    const response = await api.get(`/team-branch/${id}`);
    return response.data;
  },

  updateTeamBranch: async (id, { nama_tim, id_kecamatan }) => {
    const response = await api.put(`/team-branch/${id}`, {
      nama_tim,
      id_kecamatan,
    });
    return response.data;
  },

  verifyTeamBranch: async (id, is_verified = true) => {
    const response = await api.patch(`/team-branch/${id}/verify`, {
      is_verified,
    });
    return response.data;
  },

  deleteTeamBranch: async (id) => {
    const response = await api.delete(`/team-branch/${id}`);
    return response.data;
  },

  // === 3. KELOLA ANGGOTA TIM ===
  getAllAnggota: async (params = {}) => {
    const response = await api.get("/anggota", { params });
    return response.data;
  },

  createAnggota: async ({ nik, id_team_branch, gender, umur, nama, role = "anggota" }) => {
    const response = await api.post("/anggota", {
      nik,
      id_team_branch,
      gender,
      umur: parseInt(umur),
      nama,
      role,
    });
    return response.data;
  },

  updateAnggota: async (id, data) => {
    const response = await api.put(`/anggota/${id}`, data);
    return response.data;
  },

  deleteAnggota: async (id) => {
    const response = await api.delete(`/anggota/${id}`);
    return response.data;
  },

  // === 4. KELOLA ANTREAN LAPORAN (ROLE ADMIN) ===
  getAllLaporan: async (params = {}) => {
    const response = await api.get("/laporan", { params });
    return response.data;
  },

  updateStatusLaporan: async (id, status) => {
    const response = await api.patch(`/laporan/${id}/status`, { status });
    return response.data;
  },

  deleteLaporan: async (id) => {
    const response = await api.delete(`/laporan/${id}`);
    return response.data;
  },
};

export default adminService;

