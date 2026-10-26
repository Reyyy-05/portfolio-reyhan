export interface Project {
  slug: string;
  title: string;
  category: 'web' | 'mobile' | 'systems' | 'collab';
  categoryLabel: string;
  tagline: string;
  description: string;
  longDescription: string;
  problemStatement: string;
  solutionHighlight: string;
  engineeringHighlight: string;
  techStack: string[];
  status: 'Production' | 'MVP' | 'Collaboration' | 'Prototype';
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  coverImage: string;
  metrics?: { label: string; value: string };
  keyFeatures: string[];
}

export interface Experience {
  role: string;
  company: string;
  logo: string;
  period: string;
  type: string;
  isCurrent?: boolean;
  description: string;
  bulletPoints: string[];
  techStack: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; highlight: string }[];
}

export const personalInfo = {
  name: "Reyhan Albar Fahryan",
  shortName: "Reyhan Albar",
  roleHeadline: "Full-Stack Web Developer & IoT Solutions Builder",
  subHeadline: "Mahasiswa Informatika UNU Yogyakarta yang berfokus membangun aplikasi web performa tinggi dengan Next.js, sistem backend relasional Supabase, mobile app Expo, dan solusi data integrity.",
  email: "rayhanalbar75@gmail.com",
  phone: "+62 877-0018-7692",
  whatsappUrl: "https://wa.me/6287700187692",
  github: "https://github.com/Reyyy-05",
  githubUsername: "Reyyy-05",
  linkedin: "https://linkedin.com/in/reyhanalbar",
  location: "Sleman, D.I. Yogyakarta, Indonesia",
  availableForWork: true,
  statusNotice: "Terbuka untuk posisi Web Development Intern, Junior Full-Stack Engineer, atau Project Collaboration."
};

export const experiencesData: Experience[] = [
  {
    role: "Web Development Intern",
    company: "Creativemu Academy",
    logo: "/images/experience/creativemu.png",
    period: "Apr 2026 — Sekarang",
    type: "Internship",
    isCurrent: true,
    description: "Mengembangkan landing page agensi digital dan mendukung modernisasi arsitektur web menuju ekosistem Next.js dan Tailwind CSS.",
    bulletPoints: [
      "Mengembangkan landing page responsif dengan performa tinggi dan waktu muat awal sub-detik.",
      "Mendukung proses migrasi arsitektur antarmuka lama ke komponen modular berbasis Next.js App Router.",
      "Melakukan pelaporan pekerjaan harian serta kolaborasi aktif dengan tim kreatif dan desainer."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Git Flow", "Node.js"]
  },
  {
    role: "Full-Stack Developer (Commercial)",
    company: "IMGN Concept",
    logo: "/images/experience/unu.png",
    period: "2026",
    type: "Commercial Project",
    description: "Merancang dan membangun katalog web interaktif dengan basis data relasional untuk lini produk modifikasi motor.",
    bulletPoints: [
      "Merancang skema relasional PostgreSQL pada Supabase dengan Row Level Security (RLS) kustom.",
      "Mengimplementasikan filter kategori dinamis dan sinkronisasi inventaris secara instan (<80ms).",
      "Membangun galeri produk responsif dan alur pemesanan langsung terhubung ke admin."
    ],
    techStack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "TypeScript"]
  },
  {
    role: "Penyusun Proposal Teknologi & IoT",
    company: "Kelompok Tani Gunung Guntur 1",
    logo: "/images/experience/unu.png",
    period: "Mei 2026",
    type: "Project Consultation",
    description: "Menyusun proposal inovasi teknologi pertanian cerdas dan analisis biaya implementasi perangkat sensor IoT.",
    bulletPoints: [
      "Menghubungkan kebutuhan riil budidaya tanaman komoditas dengan otomasi telemetri sensor lingkungan.",
      "Menyusun analisis kelayakan biaya implementasi perangkat mikrokontroler dan efisiensi operasional.",
      "Merumuskan strategi adopsi teknologi ramah petani lokal berbasis data telemetri real-time."
    ],
    techStack: ["IoT Architecture", "Sensor Telemetry", "Budget Analysis", "Technical Writing"]
  },
  {
    role: "Petugas Lapangan / Pencacah Data",
    company: "Badan Pusat Statistik (BPS)",
    logo: "/images/experience/unu.png",
    period: "2026",
    type: "Field Operations",
    description: "Melakukan pengumpulan dan validasi data sensus ekonomi di lapangan melalui wawancara langsung dengan responden bisnis.",
    bulletPoints: [
      "Melakukan pendataan puluhan unit usaha dengan kepatuhan metodologi statistik yang ketat.",
      "Memahami langsung kompleksitas validasi data riil di lapangan dan potensi anomali masukan data.",
      "Pengalaman lapangan ini menjadi inspirasi utama perancangan prototipe sistem data provenance (StatProv)."
    ],
    techStack: ["Data Verification", "Field Survey", "Information Integrity"]
  },
  {
    role: "Frontend Contributor",
    company: "Kairav Studio",
    logo: "/images/projects/kairav-studio.png",
    period: "2025 — 2026",
    type: "Collaboration",
    description: "Kolaborasi pengembangan website studio kreatif berbasis Astro dengan alur kerja modern GitHub Pull Requests.",
    bulletPoints: [
      "Melakukan redesign landing page, serta membangun halaman Teams, Services, dan Works.",
      "Menerapkan animasi interaktif menggunakan GSAP dan komponen Tailwind CSS teroptimasi.",
      "Bekerja dalam alur kolaborasi tim multi-kontributor via git branches dan code review."
    ],
    techStack: ["Astro", "GSAP", "Tailwind CSS", "GitHub PR Flow"]
  }
];

export const projectsData: Project[] = [
  {
    slug: "imgn-concept-katalog",
    title: "IMGN Concept Web Catalog",
    category: "web",
    categoryLabel: "Commercial Full-Stack Web",
    tagline: "Digital Commercial Catalog & Relational Inventory System",
    description: "Katalog web komersial full-stack untuk brand part modifikasi motor dengan pencarian instan, filter kategori relasional, dan galeri responsif.",
    longDescription: "IMGN Concept Web Catalog dibangun untuk menjawab kebutuhan digitalisasi katalog produk suku cadang kustom. Platform ini menggabungkan antarmuka modern Next.js dengan arsitektur basis data relasional Supabase PostgreSQL.",
    problemStatement: "Katalog manual sebelumnya berbasis chat dan spreadsheet menyulitkan pelanggan mengecek ketersediaan varian part dan harga terkini secara akurat.",
    solutionHighlight: "Membangun web katalog dengan filter instan berbasis URL state, skema RLS Supabase untuk manajemen admin, dan antarmuka berkecepatan tinggi.",
    engineeringHighlight: "Mengoptimalkan query PostgreSQL dengan indeks komposit pada kolom kategori dan status publikasi, menghasilkan latensi respons <80ms.",
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    status: "Production",
    githubUrl: "https://github.com/Reyyy-05/imgnconsept-katalog.git",
    featured: true,
    coverImage: "/images/projects/imgn-concept.png",
    metrics: { label: "Query Latency", value: "< 80ms" },
    keyFeatures: [
      "Filter kategori instan dengan sinkronisasi state di Next.js App Router",
      "Arsitektur database relasional Supabase PostgreSQL dengan Row-Level Security",
      "Galeri gambar responsif dan modal detail spesifikasi teknis",
      "Direct WhatsApp checkout link terintegrasi dengan SKU produk"
    ]
  },
  {
    slug: "statprov",
    title: "StatProv Data Provenance",
    category: "systems",
    categoryLabel: "Data Integrity & Cryptography",
    tagline: "Cryptographic Dataset Integrity Verification Protocol",
    description: "Prototipe sistem verifikasi integritas dataset statistik melalui SHA-256 hash anchoring, pratinjau browser CSV/XLSX, dan jejak audit.",
    longDescription: "StatProv adalah prototipe sistem integritas data yang dirancang untuk mencegah manipulasi data statistik publik. Menggabungkan kalkulasi checksum SHA-256 di sisi klien dengan audit log berbasis Prisma ORM.",
    problemStatement: "Dataset statistik publik rawan mengalami perubahan data yang tidak terdeteksi saat didistribusikan antar instansi tanpa verifikasi kriptografis mandiri.",
    solutionHighlight: "Menyediakan portal upload yang langsung menghitung hash SHA-256 file di memori browser, mencocokkannya ke database ledger terverifikasi, dan menampilkan pratinjau data instan.",
    engineeringHighlight: "Menggunakan Web Crypto API SubtleCrypto untuk kalkulasi hash file besar tanpa blocking main thread dan tanpa upload file ke server semata untuk checksum.",
    techStack: ["Next.js", "TypeScript", "Prisma ORM", "SQLite", "Web Crypto API", "Tailwind CSS"],
    status: "MVP",
    githubUrl: "https://github.com/Reyyy-05/StatProv.git",
    featured: true,
    coverImage: "/images/projects/bootcamp-landing.png",
    metrics: { label: "Integrity", value: "SHA-256 Hash" },
    keyFeatures: [
      "Kalkulasi checksum SHA-256 client-side instan menggunakan Web Crypto API",
      "Parser preview file CSV & XLSX langsung di browser",
      "Pencatatan riwayat audit dan metadata dataset dengan Prisma ORM",
      "Status verifikasi visual: Valid, Mismatch, atau Unregistered"
    ]
  },
  {
    slug: "biolearn",
    title: "BioLearn EdTech Mobile App",
    category: "mobile",
    categoryLabel: "Mobile EdTech Application",
    tagline: "Interactive High School Biology Learning & Quiz Platform",
    description: "Aplikasi mobile pembelajaran biologi SMA dengan kurikulum modular (Kelas 10–12), mesin kuis interaktif, dan pelacakan skor progres belajar.",
    longDescription: "BioLearn adalah aplikasi mobile edukasi berbasis Expo React Native yang dirancang agar siswa SMA dapat mempelajari materi biologi secara terstruktur melalui modul materi, simulasi kuis latihan, dan evaluasi hasil belajar.",
    problemStatement: "Materi biologi yang sarat istilah ilmiah seringkali terasa membosankan jika hanya disampaikan lewat buku teks konvensional tanpa evaluasi interaktif mandiri.",
    solutionHighlight: "Menyajikan materi dalam micro-cards terstruktur dan gamifikasi kuis interaktif dengan umpan balik jawaban langsung dan kalkulasi nilai otomatis.",
    engineeringHighlight: "Implementasi state manajemen reaktif dan persisten menggunakan Zustand dengan alur navigasi modular berbasis file di Expo Router.",
    techStack: ["Expo React Native", "TypeScript", "Zustand", "Expo Router"],
    status: "MVP",
    githubUrl: "https://github.com/Reyyy-05/BioLearn.git",
    featured: true,
    coverImage: "/images/projects/bootcamp-landing.png",
    metrics: { label: "Kurikulum", value: "Kelas 10–12" },
    keyFeatures: [
      "Modul materi biologi terstruktur berdasarkan jenjang kelas 10, 11, dan 12",
      "Mesin kuis interaktif dengan timer dan kalkulasi skor otomatis",
      "Manajemen state reaktif menggunakan Zustand store",
      "Dukungan navigasi native yang mulus di Android via Expo Go"
    ]
  },
  {
    slug: "masjidflow",
    title: "MasjidFlow Community Management",
    category: "mobile",
    categoryLabel: "Mobile Community Platform",
    tagline: "Role-Based Mosque Event Coordination & Agenda App",
    description: "Aplikasi mobile manajemen kegiatan masjid berbasis peran untuk mempermudah pengajuan acara, persetujuan takmir, agenda, dan koordinasi panitia.",
    longDescription: "MasjidFlow dirancang untuk memodernisasi alur administrasi dan publikasi agenda kegiatan masjid dengan sistem role-based access control.",
    problemStatement: "Koordinasi panitia masjid sering tercecer di grup chat dan catatan fisik, menyebabkan tumpang tindih jadwal kegiatan dan lambatnya approval proposal.",
    solutionHighlight: "Menyediakan alur pengajuan acara digital dengan status approval berjenjang dari Takmir/Ketua, kalender agenda terpadu, dan pembagian tugas seksi panitia.",
    engineeringHighlight: "Perancangan sistem permission role guard di level route dan komponen untuk memastikan hak akses data yang aman.",
    techStack: ["Expo React Native", "TypeScript", "Zustand", "Expo Router"],
    status: "MVP",
    githubUrl: "https://github.com/Reyyy-05/masjidflow.git",
    featured: true,
    coverImage: "/images/projects/bootcamp-landing.png",
    metrics: { label: "Akses Peran", value: "3 Hak Akses" },
    keyFeatures: [
      "Role guard untuk Takmir, Panitia Kegiatan, dan Jamaah",
      "Formulir pengajuan agenda dengan alur persetujuan status reaktif",
      "Kalender kegiatan masjid terintegrasi",
      "Distribusi checklist tugas kepanitiaan acara"
    ]
  },
  {
    slug: "kairav-studio",
    title: "Kairav Studio Showcase",
    category: "collab",
    categoryLabel: "Collaborative Web Showcase",
    tagline: "Digital Studio Showcase & Creative Engineering Portfolio",
    description: "Website studio kreatif kolaboratif berbasis Astro dengan animasi interaktif GSAP, halaman Works, Services, dan tim developer.",
    longDescription: "Kairav Studio dikembangkan bersama tim developer dalam workflow kolaborasi GitHub nyata untuk memamerkan kapabilitas teknis dan portofolio proyek studio kreatif.",
    problemStatement: "Studio membutuhkan platform web representatif dengan performa tinggi, animasi modern, dan pengelolaan konten tim yang rapi.",
    solutionHighlight: "Menerapkan Astro Islands architecture untuk mempertahankan performa zero-JS di konten statis dan memuat GSAP hanya pada komponen interaktif.",
    engineeringHighlight: "Pengelolaan pull requests, branch protection, dan sinkronisasi modul komponen antar kontributor tim.",
    techStack: ["Astro", "GSAP", "Tailwind CSS", "GitHub Team PR"],
    status: "Collaboration",
    githubUrl: "https://github.com/ilhamkrnwan/kairav.studio.git",
    featured: true,
    coverImage: "/images/projects/kairav-studio.png",
    metrics: { label: "Workflow", value: "Team PRs" },
    keyFeatures: [
      "Arsitektur Astro ultra-cepat dengan CSS minimalis",
      "Choreography animasi scroll dan transisi elemen interaktif dengan GSAP",
      "Halaman direktori anggota tim dan galeri portofolio studio",
      "Standarisasi kode via review Pull Request di GitHub"
    ]
  },
  {
    slug: "landingpage-bootcamp",
    title: "High-Conversion Bootcamp Landing Page",
    category: "web",
    categoryLabel: "Frontend Marketing & UX",
    tagline: "Conversion-Focused Web Dev Bootcamp Registration Portal",
    description: "Landing page promosi bootcamp dengan hierarki CTA teruji, perbandingan paket pelatihan, dan skor performa Lighthouse 99+.",
    longDescription: "Proyek landing page yang difokuskan pada optimalisasi rasio konversi pendaftaran peserta bootcamp pemrograman web dengan tata letak visual modern.",
    problemStatement: "Landing page informasi pelatihan sering mengalami bounce rate tinggi akibat waktu loading lambat dan hirarki visual yang membingungkan.",
    solutionHighlight: "Menyusun layout berbasis F-pattern, tabel perbandingan fitur transparan, FAQ interaktif, dan validasi formulir instan.",
    engineeringHighlight: "Optimasi aset gambar dan eliminasi Cumulative Layout Shift (CLS) hingga meraih skor Lighthouse 99+.",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Lighthouse 99+"],
    status: "MVP",
    githubUrl: "https://github.com/Reyyy-05/landingpage_bootcamp.git",
    featured: false,
    coverImage: "/images/projects/bootcamp-landing.png",
    metrics: { label: "Lighthouse", value: "99/100" },
    keyFeatures: [
      "Struktur konten berbasis conversion rate optimization (CRO)",
      "Tabel perbandingan kurikulum dan paket keanggotaan",
      "Skor performa dan aksesibilitas Lighthouse nyaris sempurna",
      "Formulir registrasi dengan feedback visual seketika"
    ]
  },
  {
    slug: "kalkulator-ahliwaris",
    title: "Kalkulator Ahli Waris Islami",
    category: "web",
    categoryLabel: "Algorithm & Rule Engine",
    tagline: "Digital Islamic Inheritance (Faraidh) Share Calculator",
    description: "Aplikasi kalkulator berbasis web untuk simulasi pembagian hak waris sesuai kaidah faraidh dengan kalkulasi fraksional otomatis.",
    longDescription: "Mengubah kompleksitas aturan fikih mawaris (Ashabah, Hijab Hirman, furudhul muqaddarah) menjadi simulasi kalkulasi matematis yang ramah pengguna.",
    problemStatement: "Perhitungan pembagian waris manual rawan kesalahan hitung persentase dan kebingungan seputar hak mahjub (terhalang).",
    solutionHighlight: "Menyusun decision tree aturan faraidh dalam algoritma TypeScript yang mengevaluasi relasi keluarga dan menghasilkan breakdown porsi harta.",
    engineeringHighlight: "Implementasi aritmatika fraksi pecahan presisi tinggi untuk menghindari pembulatan floating point yang tidak adil.",
    techStack: ["JavaScript", "TypeScript", "HTML5", "Tailwind CSS"],
    status: "MVP",
    githubUrl: "https://github.com/Reyyy-05/kalkulator-ahliwaris.git",
    featured: false,
    coverImage: "/images/projects/bootcamp-landing.png",
    metrics: { label: "Rule Engine", value: "Faraidh Logic" },
    keyFeatures: [
      "Simulasi porsi ahli waris otomatis berdasarkan susunan keluarga",
      "Deteksi aturan Ashabah dan Hijab Hirman",
      "Perhitungan nominal rupiah dari total harta peninggalan",
      "Antarmuka formulir yang mudah dipahami orang awam"
    ]
  }
];

export const skillsCategories: SkillCategory[] = [
  {
    title: "Core Web Development",
    skills: [
      { name: "React & Next.js 14", highlight: "App Router, Server Actions, SSR & SSG" },
      { name: "TypeScript", highlight: "Type-safe architectures, Interfaces & Generics" },
      { name: "Tailwind CSS", highlight: "Custom design systems & responsive layouts" },
      { name: "Zustand State Store", highlight: "Lightweight reactive client state" },
      { name: "HTML5 & Modern CSS", highlight: "Semantic tags, View Transitions, Canvas" }
    ]
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Supabase & PostgreSQL", highlight: "Relational modeling, RLS policies, migrations" },
      { name: "Prisma ORM", highlight: "Schema definitions & type-safe data access" },
      { name: "REST APIs & Webhooks", highlight: "Endpoint design, JSON payloads, integration" },
      { name: "SQLite & MySQL", highlight: "Relational database administration" }
    ]
  },
  {
    title: "Mobile Development",
    skills: [
      { name: "Expo React Native", highlight: "Cross-platform Android development" },
      { name: "Expo Router", highlight: "File-based native routing & deep linking" },
      { name: "Mobile UI Design", highlight: "Thumb-friendly layout & native feedback" }
    ]
  },
  {
    title: "Systems, IoT & Craft",
    skills: [
      { name: "Data Provenance", highlight: "SHA-256 cryptographic checksums & audit logs" },
      { name: "IoT & Telemetry Concept", highlight: "Sensor data validation & hardware proposal" },
      { name: "Git & GitHub Collaboration", highlight: "Branching, Pull Requests, code reviews" },
      { name: "Vercel Deployment", highlight: "CI/CD setup, edge network, environment variables" }
    ]
  }
];
