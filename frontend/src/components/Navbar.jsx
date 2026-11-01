import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-black tracking-tight text-black">
          LAPORIN YUK!
        </Link>
        <nav className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-semibold tracking-wide text-black hover:text-sky-600 transition-colors"
          >
            BERANDA
          </Link>
          <Link
            to="/laporan"
            className="text-sm font-semibold tracking-wide text-black hover:text-sky-600 transition-colors"
          >
            LAPORAN
          </Link>
          <Link
            to="/status"
            className="text-sm font-semibold tracking-wide text-black hover:text-sky-600 transition-colors"
          >
            STATUS
          </Link>
          <Link
            to="/login"
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors"
          >
            LOGIN
          </Link>
        </nav>
      </div>
    </header>
  );
}