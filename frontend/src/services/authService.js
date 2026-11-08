import api from "./api";

const authService = {
  // Login untuk semua role (pelapor, team_branch, admin)
  login: async ({ email, password }) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  // Registrasi generik untuk semua role (pelapor, team_branch, admin)
  register: async ({ role, email, password, confirmPassword, ...extraData }) => {
    const payload = {
      role,
      email,
      password,
      confirm_password: confirmPassword,
      ...extraData,
    };
    const response = await api.post("/auth/register", payload);
    return response.data;
  },

  // Registrasi khusus Pelapor / Masyarakat
  registerPelapor: async ({ name, email, password, confirmPassword }) => {
    const response = await api.post("/auth/register", {
      role: "pelapor",
      nama_lengkap: name,
      email,
      password,
      confirm_password: confirmPassword,
    });
    return response.data;
  },

  // Registrasi khusus Tim Cabang
  registerTeamBranch: async ({
    namaTim,
    domisili, // id_kecamatan
    noTelepon,
    email,
    password,
    confirmPassword,
  }) => {
    const response = await api.post("/auth/register", {
      role: "team_branch",
      nama_tim: namaTim,
      id_kecamatan: domisili,
      nomor_ketua: noTelepon,
      email,
      password,
      confirm_password: confirmPassword,
    });
    return response.data;
  },

  // Registrasi khusus Admin Pusat
  registerAdmin: async ({ email, password, confirmPassword }) => {
    const response = await api.post("/auth/register", {
      role: "admin",
      email,
      password,
      confirm_password: confirmPassword,
    });
    return response.data;
  },

  // Mengambil daftar kecamatan publik untuk kebutuhan dropdown registrasi cabang
  getKecamatan: async () => {
    const response = await api.get("/kecamatan");
    return response.data;
  },
};

export default authService;
