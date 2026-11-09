import axios from "axios";

const envApiUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  "http://localhost:3000/api";

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

api.interceptors.request.use(
  (config) => {
    let token = null;

    try {
      const persistedAuth = localStorage.getItem("auth-storage");
      if (persistedAuth) {
        const parsed = JSON.parse(persistedAuth);
        token = parsed?.state?.token;
      }
    } catch {
      token = null;
    }

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

