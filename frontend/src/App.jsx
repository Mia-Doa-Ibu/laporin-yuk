import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LaporanPage from "./pages/LaporanPage";
import StatusPage from "./pages/StatusPage";
import CabangPage from "./pages/CabangPage";
import AdminVerifikasiPage from "./pages/AdminVerifikasiPage";
import AdminDataTimPage from "./pages/AdminDataTimPage";
import AdminWilayahPage from "./pages/AdminWilayahPage";
import AdminLaporanPage from "./pages/AdminLaporanPage";
import AuthPage from "./pages/AuthPage";
import Login from "./components/auth/Login";
import RegisterPelapor from "./components/auth/RegisterPelapor";
import RegisterCabang from "./components/auth/RegisterCabang";

import ProtectedRoute from "./middlewares/ProtectedRoute";
import GuestRoute from "./middlewares/GuestRoute";
import AlertModal from "./components/AlertModal";

export default function App() {
  return (
    <BrowserRouter>
      <AlertModal />
      <Routes>
        
        <Route path="/" element={<LandingPage />} />

        
        <Route
          path="/laporan"
          element={
            <ProtectedRoute allowedRoles={["pelapor"]}>
              <LaporanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/status"
          element={
            <ProtectedRoute allowedRoles={["pelapor"]}>
              <StatusPage />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/cabang"
          element={
            <ProtectedRoute allowedRoles={["team_branch", "admin"]}>
              <CabangPage />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/admin/verifikasi"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminVerifikasiPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/wilayah"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminWilayahPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/data-tim"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDataTimPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/laporan"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLaporanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/laporan/:statusFilter"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLaporanPage />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/login"
          element={
            <GuestRoute>
              <AuthPage>
                <Login />
              </AuthPage>
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <AuthPage>
                <RegisterPelapor />
              </AuthPage>
            </GuestRoute>
          }
        />
        <Route
          path="/register-cabang"
          element={
            <GuestRoute>
              <RegisterCabang />
            </GuestRoute>
          }
        />

        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
