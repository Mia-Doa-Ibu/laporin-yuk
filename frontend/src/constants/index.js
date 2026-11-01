export const KATEGORI_LAPORAN_OPTIONS = [
  { value: "fasum", label: "Laporan Kerusakan FASUM" },
  { value: "lingkungan", label: "Isu Lingkungan" },
  { value: "dana", label: "Dugaan Penyimpangan Dana" },
];

export const TIM_LAPANGAN_OPTIONS = [
  { value: "tim_a", label: "Tim Reaksi Cepat Wilayah 1" },
  { value: "tim_b", label: "Tim Patroli Infrastruktur Wilayah 2" },
  { value: "tim_c", label: "Satgas Penanganan Lingkungan" },
];

export const ALUR_PELAPORAN_STEPS = [
  {
    step: 1,
    title: "Tulis laporan",
    desc: "Masukkan detail keluhan, unggah foto bukti, dan tentukan lokasi kejadian secara jelas.",
  },
  {
    step: 2,
    title: "Verifikasi",
    desc: "Laporan diperiksa keabsahannya oleh tim dan langsung diteruskan ke instansi terkait.",
  },
  {
    step: 3,
    title: "Tindak Lanjut",
    desc: "Instansi berwenang meninjau lokasi dan mulai menjalankan tindakan penanganan.",
  },
  {
    step: 4,
    title: "Tanggapan",
    desc: "Instansi berwenang mengirimkan laporan hasil penanganan kepada pelapor.",
  },
  {
    step: 5,
    title: "Selesai",
    desc: "Penanganan diselesaikan dan laporan resmi ditutup dengan status selesai.",
  },
];

export const DUMMY_REPORTS = [
  {
    id: "LAP-001",
    judul: "JALAN RUSAK DAN BERLUBANG PARAH",
    tanggal: "14 Oktober 2026",
    kategori: "Laporan Kerusakan FASUM",
    lokasi: "Jl. Raya Kutabumi No. 45, Pasar Kemis",
    deskripsi:
      "Terdapat lubang besar dengan kedalaman 15 cm di tengah jalan utama yang sangat membahayakan pengendara sepeda motor, khususnya pada malam hari karena minim penerangan jalan.",
  },
  {
    id: "LAP-002",
    judul: "LAMPU PENERANGAN JALAN UMUM PADAM",
    tanggal: "18 Oktober 2026",
    kategori: "Laporan Kerusakan FASUM",
    lokasi: "Jl. Boulevard Utama Blok C, Tangerang",
    deskripsi:
      "Lampu PJU sepanjang kurang lebih 300 meter padam total sejak pekan lalu, memicu kerawanan kriminalitas dan kecelakaan bagi warga sekitar saat pulang malam.",
  },
  {
    id: "LAP-003",
    judul: "PEMBUANGAN SAMPAH LIAR ILEGAL",
    tanggal: "24 Oktober 2026",
    kategori: "Isu Lingkungan",
    lokasi: "Bantaran Sungai Cirarab, Pasar Kemis",
    deskripsi:
      "Tumpukan sampah liar menumpuk di sempadan saluran air dan menimbulkan aroma menyengat serta potensi penyumbatan aliran air saat musim penghujan tiba.",
  },
];