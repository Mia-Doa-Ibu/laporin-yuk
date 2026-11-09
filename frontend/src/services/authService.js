import api from "./api";

const authService = {
  login: async ({ email, password }) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

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

  registerTeamBranch: async ({
    namaTim,
    domisili,
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

  getKecamatan: async () => {
    const response = await api.get("/kecamatan");
    return response.data;
  },
};

export default authService;
