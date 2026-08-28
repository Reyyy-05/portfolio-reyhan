export interface ProjectView {
  id: string;
  label: string;
  description: string;
  mockupKey: string; // Identifier used in ProjectCard to render the correct mockup
}

export interface Project {
  title: string;
  category: string;
  description: string;
  whyItMatters?: string;
  techStack: string[];
  status: 'MVP' | 'In Development' | 'Academic' | 'Collaboration' | 'Internship Project' | 'Experiment' | 'Production';
  github: string;
  demo?: string;
  featured: boolean;
  type: 'web' | 'mobile' | 'data' | 'product';
  views?: ProjectView[];
}

export const featuredProjects: Project[] = [
  {
    title: 'IMGN Concept Web Catalog',
    category: 'Web / Product Catalog',
    description: 'Web catalog full-stack untuk digitalisasi katalog produk modifikasi motor dengan arsitektur Next.js dan Supabase, fitur inventaris dinamis dan database relasional kustom.',
    whyItMatters: 'Solusi digitalisasi katalog produk nyata untuk bisnis manufaktur — dari desain database hingga UI responsif.',
    techStack: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    status: 'Production',
    github: 'https://github.com/Reyyy-05/imgnconsept-katalog.git',
    featured: true,
    type: 'web',
    views: [
      {
        id: 'catalog',
        label: 'Catalog',
        description: 'Halaman utama katalog produk dengan grid layout dan filter kategori.',
        mockupKey: 'imgn-catalog',
      },
      {
        id: 'detail',
        label: 'Product Detail',
        description: 'Halaman detail produk dengan galeri foto, spesifikasi, dan deskripsi lengkap.',
        mockupKey: 'imgn-detail',
      },
      {
        id: 'admin',
        label: 'Admin Panel',
        description: 'Dashboard admin untuk mengelola inventaris, menambah produk, dan melihat statistik.',
        mockupKey: 'imgn-admin',
      },
    ],
  },
  {
    title: 'StatProv',
    category: 'Data Integrity / Web System',
    description: 'Prototipe sistem data provenance untuk memverifikasi integritas dataset melalui hash verification, metadata, preview CSV/XLSX, dan validasi administratif.',
    whyItMatters: 'Membangun kepercayaan data statistik melalui transparansi dan verifikasi integritas dataset.',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'SQLite'],
    status: 'MVP',
    github: 'https://github.com/Reyyy-05/StatProv.git',
    featured: true,
    type: 'data',
    views: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Overview sistem dengan status verifikasi dataset dan ringkasan provenance.',
        mockupKey: 'statprov-dashboard',
      },
      {
        id: 'verify',
        label: 'Verification',
        description: 'Proses hash verification SHA-256 untuk validasi integritas file dataset.',
        mockupKey: 'statprov-verify',
      },
      {
        id: 'preview',
        label: 'CSV Preview',
        description: 'Preview tabel dataset CSV/XLSX langsung di browser dengan metadata lengkap.',
        mockupKey: 'statprov-preview',
      },
    ],
  },
  {
    title: 'BioLearn',
    category: 'EdTech / Mobile App',
    description: 'Mobile learning app Biologi SMA dengan fitur modul kelas 10–12, mock video player, kuis latihan/ujian, evaluasi, dan progress tracking berbasis role.',
    whyItMatters: 'Mengubah pendekatan pembelajaran Biologi konvensional menjadi pengalaman belajar digital yang terstruktur.',
    techStack: ['Expo React Native', 'TypeScript', 'Zustand', 'Expo Router'],
    status: 'MVP',
    github: 'https://github.com/Reyyy-05/BioLearn.git',
    featured: true,
    type: 'mobile',
    views: [
      {
        id: 'home',
        label: 'Home',
        description: 'Dashboard siswa dengan daftar modul, progress belajar, dan rekomendasi materi.',
        mockupKey: 'biolearn-home',
      },
      {
        id: 'player',
        label: 'Module Player',
        description: 'Layar video player materi dengan progress bar, navigasi bab, dan catatan materi.',
        mockupKey: 'biolearn-player',
      },
      {
        id: 'quiz',
        label: 'Quiz / Eval',
        description: 'Tampilan kuis latihan dan evaluasi akhir dengan skor hasil dan review jawaban.',
        mockupKey: 'biolearn-quiz',
      },
    ],
  },
  {
    title: 'MasjidFlow',
    category: 'Community Tech / Mobile App',
    description: 'MVP aplikasi manajemen kegiatan masjid dengan fitur role login, pengajuan acara, approval, agenda, dan tugas panitia berbasis role-based access.',
    whyItMatters: 'Menyederhanakan koordinasi kegiatan masjid dengan sistem digital yang mendukung berbagai peran pengguna.',
    techStack: ['Expo React Native', 'TypeScript', 'Zustand', 'Expo Router'],
    status: 'MVP',
    github: 'https://github.com/Reyyy-05/masjidflow.git',
    featured: true,
    type: 'mobile',
    views: [
      {
        id: 'agenda',
        label: 'Agenda',
        description: 'Daftar kegiatan masjid terjadwal dengan status approval dan detail panitia.',
        mockupKey: 'masjid-agenda',
      },
      {
        id: 'submission',
        label: 'Event Form',
        description: 'Form pengajuan kegiatan oleh pengurus dengan input nama, tanggal, dan deskripsi.',
        mockupKey: 'masjid-form',
      },
      {
        id: 'approval',
        label: 'Admin Approval',
        description: 'Halaman admin untuk menyetujui atau menolak pengajuan kegiatan dari pengurus.',
        mockupKey: 'masjid-admin',
      },
    ],
  },
];

export const otherProjects: Project[] = [
  {
    title: 'Kairav Studio',
    category: 'Collaborative Portfolio',
    description: 'Website studio/portofolio tim berbasis Astro dengan redesign landing page dan workflow kolaborasi GitHub.',
    techStack: ['Astro', 'GSAP', 'GitHub'],
    status: 'Collaboration',
    github: 'https://github.com/ilhamkrnwan/kairav.studio.git',
    featured: false,
    type: 'web',
  },
  {
    title: 'Kalkulator Ahli Waris Islami',
    category: 'Web Calculator',
    description: 'Aplikasi kalkulator waris berbasis web untuk simulasi pembagian ahli waris dengan antarmuka digital.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    status: 'MVP',
    github: 'https://github.com/Reyyy-05/kalkulator-ahliwaris.git',
    featured: false,
    type: 'web',
  },
  {
    title: 'Pupukku',
    category: 'Agri-Commerce Platform',
    description: 'Platform digital bertema pertanian untuk katalog dan transaksi produk pertanian.',
    techStack: ['Firebase', 'UI/UX', 'Web'],
    status: 'Academic',
    github: 'https://github.com/Reyyy-05/Pupukku.git',
    featured: false,
    type: 'product',
  },
  {
    title: 'KafeBilyarApp',
    category: 'Booking / Management',
    description: 'Aplikasi booking dan manajemen untuk kebutuhan kafe dan bilyar.',
    techStack: ['Mobile', 'TypeScript', 'React Native'],
    status: 'Experiment',
    github: 'https://github.com/Reyyy-05/KafeBilyarApp.git',
    featured: false,
    type: 'mobile',
  },
  {
    title: 'SmartRoutine',
    category: 'Productivity App',
    description: 'Aplikasi produktivitas dan rutinitas untuk habit management dan daily planning.',
    techStack: ['Mobile', 'TypeScript', 'React Native'],
    status: 'Experiment',
    github: 'https://github.com/Reyyy-05/SmartRoutine.git',
    featured: false,
    type: 'product',
  },
  {
    title: 'Landing Page Bootcamp',
    category: 'Landing Page / Frontend',
    description: 'Landing page untuk kebutuhan bootcamp/registration dengan CTA dan struktur konten web.',
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    status: 'MVP',
    github: 'https://github.com/Reyyy-05/landingpage_bootcamp.git',
    featured: false,
    type: 'web',
  },
];
