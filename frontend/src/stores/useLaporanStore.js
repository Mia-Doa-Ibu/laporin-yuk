import { create } from "zustand";
import laporanService from "../services/laporanService";

export const useLaporanStore = create((set, get) => ({
  reports: [],
  teamBranches: [],
  pagination: {
    total_data: 0,
    total_pages: 1,
    current_page: 1,
    per_page: 10,
    has_next_page: false,
    has_prev_page: false,
  },
  isLoading: false,
  isSubmitting: false,
  error: null,
  successMessage: null,

  fetchMyReports: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await laporanService.getLaporan(params);
      set({
        reports: res.data || [],
        pagination: res.pagination || {
          total_data: (res.data || []).length,
          total_pages: 1,
          current_page: 1,
          per_page: 10,
        },
        isLoading: false,
      });
      return res.data;
    } catch (err) {
      set({
        error: err.message || "Gagal mengambil data laporan",
        isLoading: false,
      });
      throw err;
    }
  },

  fetchTeamBranches: async () => {
    try {
      const res = await laporanService.getTeamBranches();
      set({ teamBranches: res.data || [] });
      return res.data;
    } catch (err) {
      console.warn("Gagal memuat tim cabang:", err.message);
      return [];
    }
  },

  createReport: async (reportData) => {
    set({ isSubmitting: true, error: null, successMessage: null });
    try {
      const res = await laporanService.createLaporan(reportData);
      set({
        isSubmitting: false,
        successMessage: res.message || "Laporan berhasil dikirim.",
      });
      return res;
    } catch (err) {
      set({
        error: err.message || "Gagal mengirim laporan",
        isSubmitting: false,
      });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ successMessage: null }),
}));

