import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LaporanPage from "./pages/LaporanPage";
import StatusPage from "./pages/StatusPage";
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
        <Route
          path="/register-cabang"
          element={
            <AuthPage>
              <RegisterCabang />
            </AuthPage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}