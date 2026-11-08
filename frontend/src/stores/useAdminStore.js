import { create } from "zustand";
import adminService from "../services/adminService";

export const useAdminStore = create((set, get) => ({
  kecamatanList: [],
  teamsList: [],
  membersList: [],
  adminReports: [],
  pagination: {},
  isLoading: false,
  isSubmitting: false,
  error: null,
  successMessage: null,

  // === KECAMATAN ACTIONS ===
  fetchKecamatan: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await adminService.getAllKecamatan(params);
      set({ kecamatanList: res.data || [], isLoading: false });
      return res.data;
    } catch (err) {
      set({ error: err.message || "Gagal memuat daftar kecamatan", isLoading: false });
      throw err;
    }
  },

  createKecamatan: async (data) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await adminService.createKecamatan(data);
      await get().fetchKecamatan();
      set({ isSubmitting: false, successMessage: "Kecamatan berhasil ditambahkan" });
      return res;
    } catch (err) {
      set({ error: err.message || "Gagal menambahkan kecamatan", isSubmitting: false });
      throw err;
    }
  },

  updateKecamatan: async (id, data) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await adminService.updateKecamatan(id, data);
      await get().fetchKecamatan();
      set({ isSubmitting: false, successMessage: "Kecamatan berhasil diperbarui" });
      return res;
    } catch (err) {
      set({ error: err.message || "Gagal memperbarui kecamatan", isSubmitting: false });
      throw err;
    }
  },

  deleteKecamatan: async (id) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await adminService.deleteKecamatan(id);
      await get().fetchKecamatan();
      set({ isSubmitting: false, successMessage: "Kecamatan berhasil dihapus" });
      return res;
    } catch (err) {
      set({ error: err.message || "Gagal menghapus kecamatan", isSubmitting: false });
      throw err;
    }
  },

  // === TEAM BRANCH ACTIONS ===
  fetchTeams: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await adminService.getAllTeamBranch(params);
      set({ teamsList: res.data || [], isLoading: false });
      return res.data;
    } catch (err) {
      set({ error: err.message || "Gagal memuat data tim cabang", isLoading: false });
      throw err;
    }
  },

  verifyTeam: async (id, is_verified = true) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await adminService.verifyTeamBranch(id, is_verified);
      await get().fetchTeams();
      set({
        isSubmitting: false,
        successMessage: `Tim cabang berhasil di-${is_verified ? "verifikasi" : "batalkan verifikasinya"}`,
      });
      return res;
    } catch (err) {
      set({ error: err.message || "Gagal mengubah status verifikasi", isSubmitting: false });
      throw err;
    }
  },

  updateTeam: async (id, data) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await adminService.updateTeamBranch(id, data);
      await get().fetchTeams();
      set({ isSubmitting: false, successMessage: "Data tim cabang berhasil diperbarui" });
      return res;
    } catch (err) {
      set({ error: err.message || "Gagal memperbarui data tim cabang", isSubmitting: false });
      throw err;
    }
  },

  deleteTeam: async (id) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await adminService.deleteTeamBranch(id);
      await get().fetchTeams();
      set({ isSubmitting: false, successMessage: "Tim cabang berhasil dihapus" });
      return res;
    } catch (err) {
      set({ error: err.message || "Gagal menghapus tim cabang", isSubmitting: false });
      throw err;
    }
  },

  // === ANGGOTA ACTIONS ===
  fetchAnggota: async (params = {}) => {
    try {
      const res = await adminService.getAllAnggota(params);
      set({ membersList: res.data || [] });
      return res.data;
    } catch (err) {
      console.warn("Gagal memuat anggota:", err.message);
      return [];
    }
  },

  // === LAPORAN ACTIONS (ADMIN) ===
  fetchAdminReports: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await adminService.getAllLaporan(params);
      set({
        adminReports: res.data || [],
        pagination: res.pagination || {},
        isLoading: false,
      });
      return res.data;
    } catch (err) {
      set({ error: err.message || "Gagal memuat antrean laporan", isLoading: false });
      throw err;
    }
  },

  updateReportStatus: async (id, status) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await adminService.updateStatusLaporan(id, status);
      // Update local state
      set((state) => ({
        adminReports: state.adminReports.map((r) =>
          r.id === id ? { ...r, status } : r
        ),
        isSubmitting: false,
        successMessage: `Status laporan berhasil diubah menjadi ${status}`,
      }));
      return res;
    } catch (err) {
      set({ error: err.message || "Gagal mengubah status laporan", isSubmitting: false });
      throw err;
    }
  },

  deleteReport: async (id) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await adminService.deleteLaporan(id);
      set((state) => ({
        adminReports: state.adminReports.filter((r) => r.id !== id),
        isSubmitting: false,
        successMessage: "Laporan berhasil dihapus",
      }));
      return res;
    } catch (err) {
      set({ error: err.message || "Gagal menghapus laporan", isSubmitting: false });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ successMessage: null }),
}));

