import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import authService from "../services/authService";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      successMessage: null,

      login: async ({ email, password }) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const data = await authService.login({ email, password });
          const userRole = data.user?.user_metadata?.role || null;

          set({
            user: data.user,
            token: data.access_token,
            role: userRole,
            isAuthenticated: true,
            isLoading: false,
            successMessage: data.message || "Login berhasil!",
          });

          if (data.access_token) {
            localStorage.setItem("token", data.access_token);
          }

          return data;
        } catch (err) {
          set({
            error: err.message || "Gagal masuk ke akun",
            isLoading: false,
          });
          throw err;
        }
      },

      register: async (payload) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const data = await authService.register(payload);
          set({
            isLoading: false,
            successMessage:
              data.message || `Registrasi ${payload.role} berhasil! Silakan masuk.`,
          });
          return data;
        } catch (err) {
          set({
            error: err.message || "Gagal melakukan registrasi",
            isLoading: false,
          });
          throw err;
        }
      },

      registerPelapor: async (formData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const data = await authService.registerPelapor(formData);
          set({
            isLoading: false,
            successMessage: data.message || "Registrasi berhasil! Silakan masuk.",
          });
          return data;
        } catch (err) {
          set({
            error: err.message || "Gagal melakukan registrasi pelapor",
            isLoading: false,
          });
          throw err;
        }
      },

      registerTeamBranch: async (formData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const data = await authService.registerTeamBranch(formData);
          set({
            isLoading: false,
            successMessage:
              data.message ||
              "Pendaftaran tim cabang berhasil! Akun Anda sedang menunggu verifikasi.",
          });
          return data;
        } catch (err) {
          set({
            error: err.message || "Gagal melakukan pendaftaran tim cabang",
            isLoading: false,
          });
          throw err;
        }
      },

      registerAdmin: async (formData) => {
        set({ isLoading: true, error: null, successMessage: null });
        try {
          const data = await authService.registerAdmin(formData);
          set({
            isLoading: false,
            successMessage:
              data.message || "Registrasi admin berhasil! Silakan masuk.",
          });
          return data;
        } catch (err) {
          set({
            error: err.message || "Gagal melakukan registrasi admin",
            isLoading: false,
          });
          throw err;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
          error: null,
          successMessage: null,
        });
      },

      clearError: () => set({ error: null }),
      clearSuccessMessage: () => set({ successMessage: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
