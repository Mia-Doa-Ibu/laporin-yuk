import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import cabangService from "../services/cabangService";

export const useCabangStore = create(
  persist(
    (set, get) => ({
      reports: [],
      selectedReport: null,
      anggotaList: [],
      verificationData: {},
      isLoading: false,
      isSubmitting: false,
      error: null,
      successMessage: null,
      counts: {
        total: 0,
        pending: 0,
        valid: 0,
        invalid: 0,
      },

      fetchReports: async (params = {}) => {
        set({ isLoading: true, error: null });
        try {
          const res = await cabangService.getLaporan({ limit: 100, ...params });
          const reportData = res.data || [];

          const counts = {
            total: reportData.length,
            pending: reportData.filter((r) => r.status === "pending").length,
            valid: reportData.filter((r) => r.status === "valid").length,
            invalid: reportData.filter((r) => r.status === "invalid").length,
          };

          const currentSelected = get().selectedReport;
          let nextSelected = null;

          if (currentSelected) {
            nextSelected = reportData.find((r) => r.id === currentSelected.id) || reportData[0] || null;
          } else {
            nextSelected = reportData[0] || null;
          }

          set({
            reports: reportData,
            counts,
            selectedReport: nextSelected,
            isLoading: false,
          });

          return reportData;
        } catch (err) {
          set({
            error: err.response?.data?.error || err.message || "Gagal memuat antrean laporan",
            isLoading: false,
          });
          throw err;
        }
      },

      setSelectedReport: (report) => {
        set({ selectedReport: report, error: null, successMessage: null });
      },

      fetchAnggota: async () => {
        try {
          const res = await cabangService.getAnggota({ limit: 50 });
          const anggota = res.data || [];
          set({ anggotaList: anggota });
          return anggota;
        } catch (err) {
          console.warn("Gagal mengambil anggota tim cabang:", err.message);
          return [];
        }
      },

      verifyReport: async (id, status, formData = {}) => {
        set({ isSubmitting: true, error: null, successMessage: null });
        try {
          const res = await cabangService.updateStatusLaporan(id, status);
          const updatedReport = res.data;

          const existingVerification = get().verificationData || {};
          const updatedVerification = {
            ...existingVerification,
            [id]: {
              status,
              ...(formData || {}),
              submittedAt: new Date().toISOString(),
            },
          };

          const updatedReports = get().reports.map((r) =>
            r.id === id ? { ...r, status, ...(updatedReport || {}) } : r
          );

          const counts = {
            total: updatedReports.length,
            pending: updatedReports.filter((r) => r.status === "pending").length,
            valid: updatedReports.filter((r) => r.status === "valid").length,
            invalid: updatedReports.filter((r) => r.status === "invalid").length,
          };

          const currentSelected = get().selectedReport;
          const nextSelected =
            currentSelected?.id === id
              ? { ...currentSelected, status, ...(updatedReport || {}) }
              : currentSelected;

          const statusText =
            status === "valid"
              ? "Valid (Diterima)"
              : status === "invalid"
              ? "Ditolak (Tidak Valid)"
              : "Menunggu Verifikasi";

          set({
            reports: updatedReports,
            selectedReport: nextSelected,
            verificationData: updatedVerification,
            counts,
            isSubmitting: false,
            successMessage: `Laporan berhasil diubah menjadi ${statusText} dan data penanganan berhasil disimpan.`,
          });

          return res;
        } catch (err) {
          const errorMsg =
            err.response?.data?.error || err.message || "Gagal memperbarui status laporan";
          set({
            error: errorMsg,
            isSubmitting: false,
          });
          throw err;
        }
      },

      clearMessage: () => {
        set({ error: null, successMessage: null });
      },
    }),
    {
      name: "cabang-verification-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        verificationData: state.verificationData,
      }),
    }
  )
);
