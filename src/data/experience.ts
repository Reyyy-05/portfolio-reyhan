export interface Experience {
  role: string;
  organization: string;
  period: string;
  description: string;
  type: 'internship' | 'project' | 'field' | 'hackathon' | 'organization';
}

export const experiences: Experience[] = [
  {
    role: 'Web Development Intern',
    organization: 'Creativemu Academy',
    period: 'April 2026 – Sekarang',
    description: 'Berkontribusi dalam pengembangan ulang landing page perusahaan menggunakan Next.js dan Tailwind CSS. Mendukung migrasi arsitektur web menuju ekosistem Node.js/Next.js untuk meningkatkan maintainability dan efisiensi pengembangan.',
    type: 'internship',
  },
  {
    role: 'Penyusun Proposal Teknologi & Inovasi Pertanian',
    organization: 'Kelompok Tani Gunung Guntur 1',
    period: 'Mei 2026',
    description: 'Menyusun proposal inovasi teknologi pertanian dan CSR dengan analisis biaya implementasi perangkat IoT untuk optimalisasi budidaya tanaman komoditas.',
    type: 'project',
  },
  {
    role: 'Petugas Lapangan / Pencacah Data',
    organization: 'Sensus Ekonomi 2026 (BPS)',
    period: '2026',
    description: 'Berperan dalam pengumpulan data lapangan dan komunikasi dengan responden. Mengembangkan pemahaman praktis mengenai validasi informasi dan kebutuhan sistem data yang akurat.',
    type: 'field',
  },
  {
    role: 'Contributor & Collaborator',
    organization: 'Kairav Studio',
    period: '2025 – 2026',
    description: 'Berkontribusi pada pengembangan website studio/portofolio berbasis Astro dengan redesign landing page dan penambahan halaman Teams, Services, dan Works menggunakan workflow kolaborasi GitHub.',
    type: 'project',
  },
  {
    role: 'Kontributor Dokumentasi & Publikasi',
    organization: 'Saka Kalpataru / Pramuka',
    period: '2023 – 2025',
    description: 'Mendukung dokumentasi dan publikasi kegiatan organisasi melalui penyusunan caption, narasi kegiatan, dan materi komunikasi publik.',
    type: 'organization',
  },
];

export interface TimelineMilestone {
  title: string;
  description: string;
  tags: string[];
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    title: 'Informatics Foundation',
    description: 'Memulai perjalanan di Informatika UNU Yogyakarta — membangun fondasi logika pemrograman, database, dan pengembangan web.',
    tags: ['Python', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'Web & Database Projects',
    description: 'Mengembangkan sistem informasi dan proyek web berbasis PHP, MySQL, dan Tailwind CSS. Mulai memahami arsitektur CRUD dan admin panel.',
    tags: ['PHP', 'MySQL', 'Tailwind CSS'],
  },
  {
    title: 'Mobile MVP Development',
    description: 'Merancang dan membangun MasjidFlow dan BioLearn — mobile app MVP dengan state management, role-based access, dan product thinking.',
    tags: ['React Native', 'Expo', 'Zustand'],
  },
  {
    title: 'Data-Oriented Systems',
    description: 'Membangun StatProv untuk data provenance dan integritas dataset. Eksplorasi IoT dan sensor telemetry melalui proyek agrotech.',
    tags: ['Prisma', 'SQLite', 'IoT', 'Python'],
  },
  {
    title: 'Portfolio & Internship Readiness',
    description: 'Magang di Creativemu Academy, proyek komersial IMGN Concept, hackathon blockchain, dan mempersiapkan portofolio profesional.',
    tags: ['Next.js', 'Supabase', 'TypeScript'],
  },
];
