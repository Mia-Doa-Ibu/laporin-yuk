import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#09111e] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
        <div className="space-y-4">
          <h4 className="text-lg font-black tracking-wider uppercase">
            LAPORIN YUK!
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            Adalah platform pengaduan publik yang memudahkan warga melaporkan
            fasilitas rusak, isu lingkungan, dan dugaan penyimpangan dana
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-bold tracking-wider uppercase">
            TAUTAN UTAMA
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Beranda
              </a>
            </li>
            <li>
              <a href="/status" className="hover:text-white transition-colors">
                Status
              </a>
            </li>
            <li>
              <a href="/laporan" className="hover:text-white transition-colors">
                Laporan
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-bold tracking-wider uppercase">
            HUBUNGI KAMI
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email : doaibu@gmail.com</li>
            <li>Whatsapp : +6289663263212</li>
            <li>Whatsapp : +6289663263212</li>
            <li>Whatsapp : +6289663263212</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-bold tracking-wider uppercase">
            IKUTI KAMI
          </h4>
          <div className="flex items-center space-x-3 pt-1">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/6289663263212"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <a
              href="mailto:doaibu@gmail.com"
              aria-label="Email"
              className="p-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-400">
        © 2026 doa ibu. All rights reserved.
      </div>
    </footer>
  );
}