import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LaporanPage from "./pages/LaporanPage";
import StatusPage from "./pages/StatusPage";
import CabangPage from "./pages/CabangPage";
import AdminVerifikasiPage from "./pages/AdminVerifikasiPage";
import AdminDataTimPage from "./pages/AdminDataTimPage";
import AdminWilayahPage from "./pages/AdminWilayahPage";
import AuthPage from "./pages/AuthPage";
import Login from "./components/auth/Login";
import RegisterPelapor from "./components/auth/RegisterPelapor";
import RegisterCabang from "./components/auth/RegisterCabang";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/laporan" element={<LaporanPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/cabang" element={<CabangPage />} />
        <Route path="/admin/verifikasi" element={<AdminVerifikasiPage />} />
        <Route path="/admin/wilayah" element={<AdminWilayahPage />} />
        <Route path="/admin/data-tim" element={<AdminDataTimPage />} />
        <Route
          path="/login"
          element={
            <AuthPage>
              <Login />
            </AuthPage>
          }
        />
        <Route
          path="/register"
          element={
            <AuthPage>
              <RegisterPelapor />
            </AuthPage>
          }
        />
        <Route path="/register-cabang" element={<RegisterCabang />} />
      </Routes>
    </BrowserRouter>
  );
}