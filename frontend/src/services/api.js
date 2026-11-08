import axios from "axios";

// Mengambil URL dasar API dari file .env (mendukung REACT_APP_API_URL maupun VITE_API_URL)
const envApiUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  "http://localhost:3000/api";

// Di lingkungan browser development, jika target mengarah ke localhost:3000 backend,
// gunakan relative path '/api' agar diteruskan melalui Vite proxy.
// Hal ini mencegah error CORS di browser tanpa perlu memodifikasi kode backend sama sekali.
const getBaseURL = () => {
  if (import.meta.env.DEV && envApiUrl.includes("localhost:3000")) {
    return "/api";
  }
  return envApiUrl;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Otomatis menyertakan Bearer Token jika user sudah login
api.interceptors.request.use(
  (config) => {
    let token = null;

    // Coba ambil token dari Zustand persist storage
    try {
      const persistedAuth = localStorage.getItem("auth-storage");
      if (persistedAuth) {
        const parsed = JSON.parse(persistedAuth);
        token = parsed?.state?.token;
      }
    } catch {
      token = null;
    }

    // Fallback ambil langsung dari localStorage jika disimpan terpisah
    if (!token) {
      token = localStorage.getItem("token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Format pesan error dari backend agar mudah dibaca komponen
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Terjadi kesalahan pada koneksi server";

    return Promise.reject(new Error(customMessage));
  }
);

export default api;

