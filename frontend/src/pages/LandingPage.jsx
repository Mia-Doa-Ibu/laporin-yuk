import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-black antialiased">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-black text-black leading-tight">
                Fasilitas umum Rusak? <br />
                Lapor Sekarang Tanpa Ribet
              </h1>
              <p className="text-lg font-bold text-black">
                Foto, tandai lokasi, dan kawal proses nya
              </p>
              <p className="text-gray-700 leading-relaxed max-w-xl text-base">
                Platform pelaporan publik yang menghubungkan keluhan Anda mengenai
                jalan berlubang, lampu padam, hingga fasilitas umum lainnya ke dinas
                terkait secara cepat, transparan, dan terpantau hingga tuntas.
              </p>
              <div>
                <a
                  href="/buat-laporan"
                  className="inline-block bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-colors text-base"
                >
                  kirim Laporan
                </a>
              </div>
            </div>
            <div className="w-full h-80 lg:h-[420px] bg-gray-300 rounded-sm"></div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="w-full h-80 lg:h-[400px] bg-gray-300 rounded-sm order-2 lg:order-1"></div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-black text-black">
                Tentang Laporin yuk!
              </h2>
              <p className="text-gray-800 leading-relaxed text-base lg:text-lg">
                Platform pelaporan publik yang menghubungkan keluhan Anda mengenai
                jalan berlubang, lampu padam, hingga fasilitas umum lainnya ke dinas
                terkait secara cepat, transparan, dan terpantau hingga tuntas.
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="p-2 border-2 border-black rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaInstagram className="w-6 h-6 text-black" />
                </a>
                <a
                  href="mailto:doaibu@gmail.com"
                  aria-label="Email"
                  className="p-2 border-2 border-black rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaEnvelope className="w-6 h-6 text-black" />
                </a>
                <a
                  href="https://wa.me/6289663263212"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="p-2 border-2 border-black rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaWhatsapp className="w-6 h-6 text-black" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <h2 className="text-3xl lg:text-4xl font-black text-center text-black mb-16 lg:mb-24 tracking-wider">
            PELAYANAN
          </h2>

          <div className="space-y-20 lg:space-y-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-black">
                  1. Laporan kerusakan FASUM
                </h3>
                <p className="text-gray-800 leading-relaxed text-base">
                  Layanan ini memfasilitasi pelaporan berbagai kendala fisik pada
                  sarana umum yang mengganggu keselamatan maupun mobilitas harian
                  warga, mulai dari jalan berlubang, lampu penerangan jalan yang mati,
                  trotoar rusak,
                </p>
              </div>
              <div className="w-full h-64 lg:h-80 bg-gray-300 rounded-sm"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="w-full h-64 lg:h-80 bg-gray-300 rounded-sm order-2 lg:order-1"></div>
              <div className="space-y-4 order-1 lg:order-2">
                <h3 className="text-2xl font-black text-black">
                  2. Dugaan Penyimpangan Dana
                </h3>
                <p className="text-gray-800 leading-relaxed text-base">
                  Saluran ini disediakan khusus untuk menampung aduan masyarakat
                  terkait indikasi ketidaksesuaian alokasi anggaran, proyek
                  infrastruktur mangkrak tanpa kejelasan, maupun penyalahgunaan dana
                  pembangunan publik.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-black">
                  3. Isu lingkungan
                </h3>
                <p className="text-gray-800 leading-relaxed text-base">
                  layanan ini ditujukan untuk merespons ancaman kelestarian
                  lingkungan dan kenyamanan tempat tinggal akibat tumpukan sampah
                  liar, pembuangan limbah berbahaya ke sungai, polusi udara, hingga
                  alih fungsi ruang terbuka hijau tanpa izin.
                </p>
              </div>
              <div className="w-full h-64 lg:h-80 bg-gray-300 rounded-sm"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}