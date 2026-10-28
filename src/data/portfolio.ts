export type Locale = 'id' | 'en';

export interface ExperienceItem {
  id: string;
  role: { id: string; en: string };
  org: { id: string; en: string };
  period: { id: string; en: string };
  duration: { id: string; en: string };
  type: 'WORK' | 'ORGANIZATION';
  current?: boolean;
  logo: string;
  photo: string;
  bullets: { id: string[]; en: string[] };
}

export interface ProjectItem {
  slug: string;
  number: string;
  title: string;
  role: { id: string; en: string };
  period: { id: string; en: string };
  summary: { id: string; en: string };
  problem: { id: string; en: string };
  solution: { id: string; en: string };
  features: { id: string[]; en: string[] };
  cover: string;
  gallery: string[];
  urlDisplay: string;
  liveUrl?: string;
  repoUrl?: string;
  tech: {
    name: string;
    icon: string;
    invertDark?: boolean;
  }[];
}

export interface SkillItem {
  name: string;
  category: { id: string; en: string };
  icon: string;
  color: string;
  invertDark?: boolean;
  desc: { id: string; en: string };
}

export interface PublicationAwardItem {
  id: string;
  title: { id: string; en: string };
  issuer: { id: string; en: string };
  year: string;
  category: { id: string; en: string };
  badge: { id: string; en: string };
  summary: { id: string; en: string };
  url?: string;
  sourceLabel?: string;
}

export const PROFILE = {
  fullName: 'Reyhan Albar Fahryan',
  firstNamePrefix: 'Rey',
  firstNameMid: '',
  firstNameSuffix: 'han',
  lastName: 'Albar Fahryan',
  handle: 'Reyyy-05',
  email: 'rayhanalbar75@gmail.com',
  whatsapp: '+62 813-9065-6354',
  whatsappUrl: 'https://wa.me/6281390656354',
  githubUrl: 'https://github.com/Reyyy-05',
  linkedinUrl: 'https://www.linkedin.com/in/reyhan-albar-fahryan',
  instagramUrl: 'https://www.instagram.com/reyhanalbar_',
  cvUrl: '/cv-reyhan.pdf',
  heroPortrait: '/images/hero-portrait.png',
  heroArmor: '/images/hero-armor.png',
  profilePhoto: '/images/reyhan-portrait.png',
  roles: {
    id: ['Fullstack Developer', 'Pengembang IoT & Mobile'],
    en: ['Fullstack Developer', 'IoT & Mobile Builder'],
  },
  status: {
    id: 'Siap Bekerja',
    en: 'Available for Work',
  },
  location: {
    id: 'Yogyakarta, ID',
    en: 'Yogyakarta, ID',
  },
  aboutLead: {
    id: 'Mahasiswa Informatika di Universitas Nahdlatul Ulama Yogyakarta yang membangun aplikasi web full-stack, ekosistem IoT, dan solusi mobile.',
    en: 'Informatics student at Universitas Nahdlatul Ulama Yogyakarta who builds full-stack web applications, IoT ecosystems, and mobile solutions.',
  },
  aboutBio: {
    id: [
      'Saya Reyhan Albar Fahryan, mahasiswa S1 Informatika di Universitas Nahdlatul Ulama Yogyakarta yang berfokus pada rekayasa perangkat lunak full-stack, integrasi perangkat keras IoT, dan arsitektur aplikasi modern.',
      'Ketertarikan saya pada dunia pemrograman berawal dari rasa penasaran tentang bagaimana kode dapat menghubungkan perangkat fisik dengan antarmuka web yang intuitif. Dari merakit mikrokontroler ESP32 hingga membangun aplikasi web skala produksi dengan Next.js, Laravel, dan Supabase, saya senang merancang sistem yang menyelesaikan masalah nyata dari ujung ke ujung.',
      'Saat ini saya aktif menjalani peran sebagai Web Development Intern di Creativemu Academy sekaligus mengembangkan NIRANA, sebuah ekosistem cerdas berbasis IoT dan aplikasi mobile Flutter. Di setiap proyek, saya selalu mengutamakan penulisan kode yang bersih, performa tinggi, dan pengalaman pengguna yang presisi.',
      'Ke depannya, saya terus mengeksplorasi arsitektur sistem terdistribusi, integritas data (data provenance), serta kolaborasi lintas disiplin untuk menciptakan produk teknologi yang berdampak luas.',
    ],
    en: [
      'I am Reyhan Albar Fahryan, an undergraduate Informatics student at Universitas Nahdlatul Ulama Yogyakarta focusing on full-stack software engineering, IoT hardware integration, and modern application architecture.',
      'My fascination with programming started from a curiosity about how code can bridge physical sensors with intuitive web interfaces. From wiring ESP32 microcontrollers to shipping production web platforms with Next.js, Laravel, and Supabase, I enjoy engineering end-to-end systems that solve real-world problems.',
      'Currently, I work as a Web Development Intern at Creativemu Academy while also building NIRANA, a smart IoT and Flutter mobile ecosystem. Across every project, I prioritize clean architecture, responsive performance, and thoughtful user experience.',
      'Looking ahead, I am actively exploring distributed systems, cryptographic data provenance, and cross-disciplinary collaborations to build impactful digital products.',
    ],
  },
  education: {
    school: 'Universitas Nahdlatul Ulama Yogyakarta',
    logo: '/images/experience/unu.png',
    degree: {
      id: 'S1 Informatika · 2023 — Sekarang',
      en: 'Bachelor of Informatics · 2023 — Present',
    },
    gpa: {
      id: 'IPK 3.75 / 4.00',
      en: 'GPA 3.75 / 4.00',
    },
    desc: {
      id: 'Mendalami Rekayasa Perangkat Lunak, Pemrograman Web & Mobile, Sistem Tertanam (IoT), Basis Data, dan Struktur Data & Algoritma. Aktif membangun proyek riset dan produk kolaboratif kampus.',
      en: 'Focusing on Software Engineering, Web & Mobile Programming, Embedded Systems (IoT), Databases, and Data Structures & Algorithms. Actively building research and collaborative campus tech products.',
    },
  },
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'creativemu',
    role: {
      id: 'Web Development Intern',
      en: 'Web Development Intern',
    },
    org: {
      id: 'Creativemu Academy · Magang',
      en: 'Creativemu Academy · Internship',
    },
    period: {
      id: 'Feb 2026 - Sekarang',
      en: 'Feb 2026 - Present',
    },
    duration: {
      id: '3 Bulan',
      en: '3 Months',
    },
    type: 'WORK',
    current: true,
    logo: '/images/experience/creativemu.png',
    photo: '/images/projects/Landingpage-LaravelBootcampt.png',
    bullets: {
      id: [
        'Mengembangkan platform web pembelajaran dan landing page interaktif untuk program Laravel Bootcamp menggunakan Laravel, Tailwind CSS, dan MySQL.',
        'Mengoptimalkan performa halaman, komponen UI responsif, dan alur pendaftaran peserta secara end-to-end.',
        'Berkolaborasi dengan tim mentor dan developer dalam code review, manajemen repositori Git, dan deployment aplikasi.',
      ],
      en: [
        'Developed the interactive learning platform and landing page for the Laravel Bootcamp program using Laravel, Tailwind CSS, and MySQL.',
        'Optimized page performance, responsive UI components, and end-to-end participant enrollment workflows.',
        'Collaborated with mentors and engineering peers on code reviews, Git repository workflows, and production deployments.',
      ],
    },
  },
  {
    id: 'nirana',
    role: {
      id: 'Fullstack & IoT Developer',
      en: 'Fullstack & IoT Developer',
    },
    org: {
      id: 'NIRANA Smart Ecosystem',
      en: 'NIRANA Smart Ecosystem',
    },
    period: {
      id: 'Sep 2025 - Sekarang',
      en: 'Sep 2025 - Present',
    },
    duration: {
      id: '8 Bulan',
      en: '8 Months',
    },
    type: 'WORK',
    logo: '/images/experience/nirana.jpg',
    photo: '/images/experience/nirana.jpg',
    bullets: {
      id: [
        'Merancang dan membangun sistem terintegrasi IoT dan aplikasi mobile lintas platform menggunakan Flutter, Firebase, dan mikrokontroler ESP32.',
        'Mengimplementasikan sinkronisasi telemetri sensor secara real-time serta kontrol perangkat jarak jauh dengan latensi rendah.',
        'Menyusun arsitektur basis data cloud dan antarmuka monitoring yang intuitif bagi pengguna akhir.',
      ],
      en: [
        'Architected and built an integrated IoT hardware and cross-platform mobile application ecosystem using Flutter, Firebase, and ESP32 microcontrollers.',
        'Implemented real-time sensor telemetry synchronization and low-latency remote device control.',
        'Designed cloud database schemas and an intuitive monitoring interface for end users.',
      ],
    },
  },
  {
    id: 'kairav-imgn',
    role: {
      id: 'Frontend & Creative Web Builder',
      en: 'Frontend & Creative Web Builder',
    },
    org: {
      id: 'Kairav Studio & IMGN Concept',
      en: 'Kairav Studio & IMGN Concept',
    },
    period: {
      id: 'Mar 2025 - Agu 2025',
      en: 'Mar 2025 - Aug 2025',
    },
    duration: {
      id: '6 Bulan',
      en: '6 Months',
    },
    type: 'WORK',
    logo: '/images/projects/kairav-studio.png',
    photo: '/images/projects/imgn-concept.png',
    bullets: {
      id: [
        'Membangun identitas web interaktif untuk agensi kreatif digital Kairav Studio dan eksplorasi konsep visual IMGN.',
        'Menerapkan animasi modern, tipografi presisi, dan arsitektur komponen React / Next.js yang ramah SEO.',
      ],
      en: [
        'Built interactive web showcases for the Kairav Studio digital agency and IMGN visual concept explorations.',
        'Applied fluid motion, editorial typography, and SEO-friendly React / Next.js component architecture.',
      ],
    },
  },
  {
    id: 'unu-jogja',
    role: {
      id: 'Mahasiswa Informatika & Pengembang Riset',
      en: 'Informatics Student & Research Builder',
    },
    org: {
      id: 'Universitas Nahdlatul Ulama Yogyakarta',
      en: 'Universitas Nahdlatul Ulama Yogyakarta',
    },
    period: {
      id: 'Sep 2023 - Sekarang',
      en: 'Sep 2023 - Present',
    },
    duration: {
      id: '2+ Tahun',
      en: '2+ Years',
    },
    type: 'ORGANIZATION',
    logo: '/images/experience/unu.png',
    photo: '/images/reyhan-portrait.png',
    bullets: {
      id: [
        'Aktif mengembangkan berbagai proyek kuliah dan riset terapan di bidang pengembangan web full-stack, mobile, dan Internet of Things (IoT).',
        'Mempertahankan capaian akademik yang kuat sembari berkolaborasi dalam komunitas pemrograman kampus.',
      ],
      en: [
        'Actively developing applied research and academic projects across full-stack web, mobile, and Internet of Things (IoT).',
        'Maintaining strong academic standing while collaborating in campus engineering communities.',
      ],
    },
  },
];

export const AWARDS_AND_PUBLICATIONS: PublicationAwardItem[] = [
  {
    id: 'hut-tegal-425',
    title: {
      id: 'Pemenang 6 Terbaik Sayembara Desain Logo HUT ke-425 Kabupaten Tegal ("Tegal Luwih Apik")',
      en: 'Top 6 Winner — 425th Tegal Regency Anniversary Logo Design Competition ("Tegal Luwih Apik")',
    },
    issuer: {
      id: 'Pemerintah Kabupaten Tegal & Dinas Kominfo Kab. Tegal',
      en: 'Government of Tegal Regency & Communications Dept.',
    },
    year: '2025',
    category: {
      id: 'Penghargaan & Sayembara Publik',
      en: 'Public Competition & Award',
    },
    badge: {
      id: 'Top 6 Finalis Nasional (UNUYO)',
      en: 'Top 6 National Winner (UNUYO)',
    },
    summary: {
      id: 'Terpilih sebagai salah satu nomine dan pemenang 6 besar karya desain logo resmi dari ratusan peserta tingkat umum nasional, mewakili identitas civitas akademika Universitas Nahdlatul Ulama Yogyakarta (UNUYO).',
      en: 'Selected as one of the top 6 national winners out of hundreds of open participants, representing the academic community of Universitas Nahdlatul Ulama Yogyakarta (UNUYO).',
    },
    url: 'https://ayotegal.com',
    sourceLabel: 'AyoTegal / Pikiran Rakyat Network & Slawi FM News',
  },
  {
    id: 'smart-iot-research',
    title: {
      id: 'Pengembangan Ekosistem NIRANA & Rekayasa Proposal IoT Pertanian',
      en: 'NIRANA Smart IoT Ecosystem & AgriTech Innovation Proposal',
    },
    issuer: {
      id: 'Riset Mandiri Informatika UNU Yogyakarta & Kelompok Tani',
      en: 'Informatics Research Initiative & AgriTech Community',
    },
    year: '2025 — 2026',
    category: {
      id: 'Inovasi Rekayasa Perangkat Keras & Lunak',
      en: 'Hardware & Software Engineering',
    },
    badge: {
      id: 'IoT & Telemetri Sensor',
      en: 'IoT & Sensor Telemetry',
    },
    summary: {
      id: 'Riset terapan mikrokontroler ESP32, sinkronisasi data cloud real-time Firebase, serta integrasi aplikasi mobile Flutter untuk automasi dan efisiensi operasional.',
      en: 'Applied ESP32 microcontroller research with real-time Firebase cloud sync and Flutter mobile integration for telemetry and field automation.',
    },
  },
  {
    id: 'creativemu-platform',
    title: {
      id: 'Pengembangan Platform Pembelajaran Web Interaktif Laravel Bootcamp',
      en: 'Interactive Laravel Bootcamp Learning Platform Engineering',
    },
    issuer: {
      id: 'Creativemu Academy',
      en: 'Creativemu Academy',
    },
    year: '2026',
    category: {
      id: 'Magang Industri Web Development',
      en: 'Industry Web Internship',
    },
    badge: {
      id: 'Active Intern',
      en: 'Active Intern',
    },
    summary: {
      id: 'Pengembangan arsitektur landing page dan modul registrasi Bootcamp berskala produksi menggunakan ekosistem Laravel, Tailwind CSS, dan Next.js.',
      en: 'Architected high-performance production landing pages and enrollment workflows for developer bootcamp programs using Laravel and Next.js.',
    },
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'nirana-iot',
    number: '01',
    title: 'NIRANA: Smart IoT & Mobile Ecosystem',
    role: { id: 'Fullstack & IoT Developer', en: 'Fullstack & IoT Developer' },
    period: { id: 'Sep 2025 — Sekarang', en: 'Sep 2025 — Present' },
    summary: {
      id: 'Ekosistem pintar berbasis IoT dan aplikasi mobile Flutter untuk pemantauan telemetri sensor secara real-time serta kendali perangkat otomatis.',
      en: 'Smart IoT and Flutter mobile ecosystem for real-time sensor telemetry monitoring and automated hardware control.',
    },
    problem: {
      id: 'Pemantauan perangkat fisik di lapangan sering kali masih dilakukan secara manual dan terpisah-pisah, sehingga menyulitkan pengguna untuk memantau kondisi lingkungan secara real-time maupun merespons anomali dengan cepat.',
      en: 'Field hardware monitoring is often fragmented and manual, making it difficult for operators to track environmental metrics in real time or respond quickly to anomalies.',
    },
    solution: {
      id: 'NIRANA mengintegrasikan node sensor berbasis ESP32 dengan cloud Firebase dan aplikasi mobile Flutter, menghadirkan dashboard telemetri instan, notifikasi cerdas, dan kendali aktuator jarak jauh dalam satu genggaman.',
      en: 'NIRANA bridges ESP32 sensor nodes with Firebase cloud sync and a Flutter mobile app, delivering instant telemetry dashboards, smart alerts, and remote actuator control in one unified interface.',
    },
    features: {
      id: [
        'Streaming data sensor real-time dari mikrokontroler ESP32 ke cloud Firebase.',
        'Antarmuka aplikasi mobile lintas platform (Android & iOS) berbasis Flutter.',
        'Kontrol aktuator jarak jauh dan penjadwalan otomatisasi perangkat.',
        'Riwayat log telemetri dan indikator status koneksi perangkat secara langsung.',
      ],
      en: [
        'Real-time sensor telemetry streaming from ESP32 microcontrollers to Firebase.',
        'Cross-platform mobile application (Android & iOS) engineered with Flutter.',
        'Low-latency remote actuator switching and automated device scheduling.',
        'Historical telemetry logs and live hardware connectivity health indicators.',
      ],
    },
    cover: '/images/experience/nirana.jpg',
    gallery: [
      '/images/experience/nirana.jpg',
      '/images/projects/imgn-concept.png',
      '/images/projects/kairav-studio.png',
    ],
    urlDisplay: 'github.com/Reyyy-05/nirana-iot',
    repoUrl: 'https://github.com/Reyyy-05',
    tech: [
      { name: 'Flutter', icon: '/skills/flutter.svg' },
      { name: 'Dart', icon: '/skills/dart.svg' },
      { name: 'Firebase', icon: '/skills/firebase.svg' },
      { name: 'ESP32', icon: '/skills/espressif.svg' },
      { name: 'C++', icon: '/skills/cplusplus.webp' },
      { name: 'Git', icon: '/skills/git.webp' },
    ],
  },
  {
    slug: 'creativemu-bootcamp',
    number: '02',
    title: 'Creativemu: Laravel Bootcamp Platform',
    role: { id: 'Web Development Intern', en: 'Web Development Intern' },
    period: { id: 'Feb 2026 — Sekarang', en: 'Feb 2026 — Present' },
    summary: {
      id: 'Platform landing page dan manajemen program intensif Laravel Bootcamp di Creativemu Academy yang dirancang untuk konversi peserta dan akses kurikulum.',
      en: 'Interactive landing page and cohort management platform for Creativemu Academy’s intensive Laravel Bootcamp program.',
    },
    problem: {
      id: 'Calon peserta bootcamp membutuhkan informasi kurikulum, jadwal, portofolio alumni, dan alur pendaftaran yang jelas serta meyakinkan tanpa harus berpindah-pindah kanal komunikasi.',
      en: 'Prospective bootcamp students needed a clear, high-converting hub to explore the curriculum, mentorship schedule, alumni outcomes, and registration flow in one place.',
    },
    solution: {
      id: 'Membangun web platform responsif menggunakan Laravel, Tailwind CSS, dan MySQL dengan struktur informasi yang terarah, komponen interaktif, dan integrasi pendaftaran langsung.',
      en: 'Engineered a responsive web platform with Laravel, Tailwind CSS, and MySQL featuring structured curriculum breakdowns, interactive FAQ modules, and streamlined enrollment.',
    },
    features: {
      id: [
        'Halaman utama berkinerja tinggi dengan rincian silabus mingguan Laravel Bootcamp.',
        'Sistem manajemen konten materi, profil mentor, dan testimoni peserta.',
        'Desain responsif mobile-first dengan Tailwind CSS dan interaksi modern.',
        'Integrasi alur pendaftaran dan konsultasi peserta langsung ke tim akademik.',
      ],
      en: [
        'High-converting landing page showcasing week-by-week Laravel Bootcamp syllabus.',
        'Dynamic modules for mentor profiles, student showcases, and program tiers.',
        'Mobile-first responsive layout crafted with Tailwind CSS and smooth transitions.',
        'Integrated registration and academic consultation flow.',
      ],
    },
    cover: '/images/projects/Landingpage-LaravelBootcampt.png',
    gallery: [
      '/images/projects/Landingpage-LaravelBootcampt.png',
      '/images/projects/kairav-studio.png',
    ],
    urlDisplay: 'creativemu.id/laravel-bootcamp',
    liveUrl: 'https://github.com/Reyyy-05',
    repoUrl: 'https://github.com/Reyyy-05',
    tech: [
      { name: 'Laravel', icon: '/skills/laravel.webp' },
      { name: 'PHP', icon: '/skills/php.svg' },
      { name: 'MySQL', icon: '/skills/mysql.webp' },
      { name: 'Tailwind CSS', icon: '/skills/tailwindcss.webp' },
      { name: 'JavaScript', icon: '/skills/javascript.webp' },
      { name: 'Git', icon: '/skills/git.webp' },
    ],
  },
  {
    slug: 'kairav-studio',
    number: '03',
    title: 'Kairav Studio: Creative Digital Agency',
    role: { id: 'Frontend Developer', en: 'Frontend Developer' },
    period: { id: 'Mei 2025 — Agu 2025', en: 'May 2025 — Aug 2025' },
    summary: {
      id: 'Website showcase agensi kreatif digital dengan pendekatan tipografi editorial, transisi halus, dan tata letak portofolio interaktif.',
      en: 'Digital creative agency showcase featuring editorial typography, fluid motion transitions, and interactive portfolio layouts.',
    },
    problem: {
      id: 'Agensi kreatif membutuhkan representasi visual di web yang tidak terasa seperti template korporat kaku, melainkan mampu menunjukkan kualitas eksekusi desain sejak detik pertama halaman dibuka.',
      en: 'Creative studios need a web presence that breaks away from rigid corporate templates and immediately demonstrates design craftsmanship upon arrival.',
    },
    solution: {
      id: 'Merancang dan mengimplementasikan pengalaman web bergaya editorial menggunakan Next.js, TypeScript, dan Tailwind CSS dengan fokus pada hirarki tipografi dan performa animasi 60fps.',
      en: 'Designed and built an editorial web experience with Next.js, TypeScript, and Tailwind CSS focused on bold typographic hierarchy and 60fps micro-interactions.',
    },
    features: {
      id: [
        'Tata letak grid editorial dengan tipografi kontras tinggi.',
        'Galeri karya interaktif dengan efek hover dan pratinjau proyek.',
        'Optimasi gambar dan skor Core Web Vitals tinggi di perangkat mobile & desktop.',
      ],
      en: [
        'Editorial grid system with high-contrast display typography.',
        'Interactive work showcase with smooth hover reveals and project previews.',
        'Optimized asset delivery and strong Core Web Vitals across desktop and mobile.',
      ],
    },
    cover: '/images/projects/kairav-studio.png',
    gallery: [
      '/images/projects/kairav-studio.png',
      '/images/projects/imgn-concept.png',
    ],
    urlDisplay: 'kairav-studio.vercel.app',
    liveUrl: 'https://github.com/Reyyy-05',
    repoUrl: 'https://github.com/Reyyy-05',
    tech: [
      { name: 'Next.js', icon: '/skills/nextdotjs.webp', invertDark: true },
      { name: 'TypeScript', icon: '/skills/typescript.webp' },
      { name: 'React', icon: '/skills/react.webp' },
      { name: 'Tailwind CSS', icon: '/skills/tailwindcss.webp' },
      { name: 'Figma', icon: '/skills/figma.webp' },
      { name: 'Vercel', icon: '/skills/vercel.webp', invertDark: true },
    ],
  },
  {
    slug: 'imgn-concept',
    number: '04',
    title: 'IMGN Concept: Interactive Visual Hub',
    role: { id: 'UI/UX & Frontend Builder', en: 'UI/UX & Frontend Builder' },
    period: { id: 'Mar 2025 — Jun 2025', en: 'Mar 2025 — Jun 2025' },
    summary: {
      id: 'Eksplorasi antarmuka web konseptual yang memadukan estetika futuristik, tata letak modular, dan komponen interaktif berbasis React.',
      en: 'Conceptual web interface exploration blending futuristic aesthetics, modular layouts, and interactive React components.',
    },
    problem: {
      id: 'Menyajikan karya visual dan eksperimen UI membutuhkan kanvas web yang imersif namun tetap ringan dan mudah dinavigasi di berbagai ukuran layar.',
      en: 'Presenting visual direction and UI experiments requires an immersive web canvas that remains lightweight and intuitive across screen sizes.',
    },
    solution: {
      id: 'Membangun IMGN Concept sebagai laboratorium visual berbasis React dan Tailwind CSS yang menonjolkan kedalaman ruang, kartu interaktif, dan transisi halaman yang mulus.',
      en: 'Built IMGN Concept as a React and Tailwind CSS visual lab emphasizing spatial depth, interactive cards, and seamless view transitions.',
    },
    features: {
      id: [
        'Eksplorasi desain antarmuka bertema gelap dan kontras tinggi.',
        'Komponen kartu dan galeri responsif dengan animasi berbasis CSS modern.',
        'Arsitektur komponen modular yang mudah dikembangkan kembali.',
      ],
      en: [
        'High-contrast dark-mode interface exploration.',
        'Responsive gallery and card primitives powered by modern CSS animations.',
        'Clean, reusable component architecture.',
      ],
    },
    cover: '/images/projects/imgn-concept.png',
    gallery: [
      '/images/projects/imgn-concept.png',
      '/images/projects/kairav-studio.png',
      '/images/projects/Landingpage-LaravelBootcampt.png',
    ],
    urlDisplay: 'imgn-concept.vercel.app',
    liveUrl: 'https://github.com/Reyyy-05',
    repoUrl: 'https://github.com/Reyyy-05',
    tech: [
      { name: 'React', icon: '/skills/react.webp' },
      { name: 'TypeScript', icon: '/skills/typescript.webp' },
      { name: 'Tailwind CSS', icon: '/skills/tailwindcss.webp' },
      { name: 'Node.js', icon: '/skills/nodedotjs.webp' },
      { name: 'Supabase', icon: '/skills/supabase.webp' },
      { name: 'Vercel', icon: '/skills/vercel.webp', invertDark: true },
    ],
  },
];

export const SKILLS: SkillItem[] = [
  {
    name: 'TypeScript',
    category: { id: 'Bahasa Pemrograman', en: 'Programming Languages' },
    icon: '/skills/typescript.webp',
    color: '#3178C6',
    desc: {
      id: 'Bahasa utama untuk membangun aplikasi web full-stack yang type-safe dengan Next.js dan Node.js.',
      en: 'Primary language for building type-safe full-stack web applications with Next.js and Node.js.',
    },
  },
  {
    name: 'JavaScript',
    category: { id: 'Bahasa Pemrograman', en: 'Programming Languages' },
    icon: '/skills/javascript.webp',
    color: '#F7DF1E',
    desc: {
      id: 'Digunakan untuk pengembangan web interaktif, manipulasi DOM, Canvas/WebGL, dan ekosistem Node.js.',
      en: 'Used across interactive web development, DOM/Canvas scripting, and the Node.js ecosystem.',
    },
  },
  {
    name: 'PHP',
    category: { id: 'Bahasa Pemrograman', en: 'Programming Languages' },
    icon: '/skills/php.svg',
    color: '#777BB4',
    desc: {
      id: 'Digunakan untuk pengembangan aplikasi backend dan platform web bersama ekosistem Laravel.',
      en: 'Used for backend web engineering and full-featured web platforms within the Laravel ecosystem.',
    },
  },
  {
    name: 'Dart',
    category: { id: 'Bahasa Pemrograman', en: 'Programming Languages' },
    icon: '/skills/dart.svg',
    color: '#0175C2',
    desc: {
      id: 'Bahasa pemrograman untuk membangun aplikasi mobile lintas platform bersama Flutter.',
      en: 'Programming language used to build cross-platform mobile applications with Flutter.',
    },
  },
  {
    name: 'Python',
    category: { id: 'Bahasa Pemrograman', en: 'Programming Languages' },
    icon: '/skills/python.webp',
    color: '#3776AB',
    desc: {
      id: 'Digunakan untuk otomasi skrip, pemrosesan data, layanan API FastAPI, dan integrasi IoT.',
      en: 'Used for scripting, data processing, FastAPI backend services, and IoT telemetry pipelines.',
    },
  },
  {
    name: 'C++',
    category: { id: 'Bahasa Pemrograman', en: 'Programming Languages' },
    icon: '/skills/cplusplus.webp',
    color: '#00599C',
    desc: {
      id: 'Digunakan untuk pemrograman firmware mikrokontroler ESP32/Arduino dan algoritma struktur data.',
      en: 'Used for programming ESP32/Arduino microcontroller firmware and core algorithms.',
    },
  },
  {
    name: 'HTML',
    category: { id: 'Frontend', en: 'Frontend' },
    icon: '/skills/html5.webp',
    color: '#E34F26',
    desc: {
      id: 'Fondasi markup semantik dan aksesibilitas (WAI-ARIA) untuk seluruh antarmuka web.',
      en: 'Semantic markup and WAI-ARIA accessibility foundation across all web interfaces.',
    },
  },
  {
    name: 'CSS',
    category: { id: 'Frontend', en: 'Frontend' },
    icon: '/skills/css.webp',
    color: '#663399',
    desc: {
      id: 'Tata letak modern dengan CSS Grid, Container Queries, View Transitions, dan animasi 3D.',
      en: 'Modern styling with CSS Grid, Container Queries, View Transitions, and 3D transforms.',
    },
  },
  {
    name: 'React',
    category: { id: 'Frontend', en: 'Frontend' },
    icon: '/skills/react.webp',
    color: '#61DAFB',
    desc: {
      id: 'Library utama untuk merancang komponen antarmuka pengguna yang deklaratif dan interaktif.',
      en: 'Core library for building declarative, interactive user interface components.',
    },
  },
  {
    name: 'Next.js',
    category: { id: 'Frontend', en: 'Frontend' },
    icon: '/skills/nextdotjs.webp',
    color: 'currentColor',
    invertDark: true,
    desc: {
      id: 'Framework produksi untuk React dengan App Router, Server Actions, dan optimasi performa.',
      en: 'Production React framework with App Router, Server Actions, and full-stack rendering.',
    },
  },
  {
    name: 'Tailwind CSS',
    category: { id: 'Frontend', en: 'Frontend' },
    icon: '/skills/tailwindcss.webp',
    color: '#06B6D4',
    desc: {
      id: 'Sistem desain utility-first untuk membangun UI responsif dengan cepat dan konsisten.',
      en: 'Utility-first styling system for crafting responsive, consistent design systems rapidly.',
    },
  },
  {
    name: 'Bootstrap',
    category: { id: 'Frontend', en: 'Frontend' },
    icon: '/skills/bootstrap.webp',
    color: '#7952B3',
    desc: {
      id: 'Toolkit CSS untuk membangun dashboard admin dan antarmuka web responsif dengan cepat.',
      en: 'CSS toolkit for rapid admin dashboards and responsive web layouts.',
    },
  },
  {
    name: 'Laravel',
    category: { id: 'Backend', en: 'Backend' },
    icon: '/skills/laravel.webp',
    color: '#FF2D20',
    desc: {
      id: 'Framework PHP andalan untuk membangun aplikasi web full-stack, autentikasi, dan REST API.',
      en: 'Go-to PHP framework for full-stack web applications, authentication, and RESTful APIs.',
    },
  },
  {
    name: 'Node.js',
    category: { id: 'Backend', en: 'Backend' },
    icon: '/skills/nodedotjs.webp',
    color: '#5FA04E',
    desc: {
      id: 'Runtime JavaScript sisi server untuk membangun API cepat dan layanan real-time.',
      en: 'Server-side JavaScript runtime for building fast APIs and real-time services.',
    },
  },
  {
    name: 'FastAPI',
    category: { id: 'Backend', en: 'Backend' },
    icon: '/skills/fastapi.webp',
    color: '#009688',
    desc: {
      id: 'Framework Python modern untuk membuat layanan REST API dan pengolahan data berkecepatan tinggi.',
      en: 'Modern Python framework for building high-performance REST APIs and data services.',
    },
  },
  {
    name: 'MySQL',
    category: { id: 'Database', en: 'Database' },
    icon: '/skills/mysql.webp',
    color: '#4479A1',
    desc: {
      id: 'Basis data relasional utama untuk aplikasi berbasis Laravel dan sistem informasi.',
      en: 'Primary relational database for Laravel applications and transactional systems.',
    },
  },
  {
    name: 'PostgreSQL',
    category: { id: 'Database', en: 'Database' },
    icon: '/skills/postgresql.webp',
    color: '#4169E1',
    desc: {
      id: 'Basis data relasional canggih untuk aplikasi skala produksi dan integrasi Supabase.',
      en: 'Advanced relational database used for production web apps and Supabase backends.',
    },
  },
  {
    name: 'Supabase',
    category: { id: 'Database', en: 'Database' },
    icon: '/skills/supabase.webp',
    color: '#3FCF8E',
    desc: {
      id: 'Platform Backend-as-a-Service berbasis Postgres dengan fitur Auth, Realtime, dan Storage.',
      en: 'Postgres-powered Backend-as-a-Service providing Auth, Realtime subscriptions, and Storage.',
    },
  },
  {
    name: 'Firebase',
    category: { id: 'Database', en: 'Database' },
    icon: '/skills/firebase.svg',
    color: '#DD2C00',
    desc: {
      id: 'Digunakan untuk sinkronisasi data real-time antara perangkat IoT ESP32 dan aplikasi Flutter.',
      en: 'Used for real-time data synchronization between ESP32 IoT devices and Flutter mobile apps.',
    },
  },
  {
    name: 'Flutter',
    category: { id: 'IoT & Mobile', en: 'IoT & Mobile' },
    icon: '/skills/flutter.svg',
    color: '#02569B',
    desc: {
      id: 'SDK UI lintas platform untuk membangun aplikasi mobile NIRANA dengan performa native.',
      en: 'Cross-platform UI toolkit used to build the NIRANA mobile application with native performance.',
    },
  },
  {
    name: 'ESP32',
    category: { id: 'IoT & Mobile', en: 'IoT & Mobile' },
    icon: '/skills/espressif.svg',
    color: '#E7352C',
    desc: {
      id: 'Mikrokontroler Wi-Fi & Bluetooth untuk node sensor pintar dan kendali perangkat keras IoT.',
      en: 'Wi-Fi & Bluetooth microcontroller powering smart sensor nodes and IoT hardware control.',
    },
  },
  {
    name: 'Arduino',
    category: { id: 'IoT & Mobile', en: 'IoT & Mobile' },
    icon: '/skills/arduino.svg',
    color: '#00878F',
    desc: {
      id: 'Ekosistem perangkat keras dan IDE untuk prototipe sistem tertanam dan pembacaan sensor.',
      en: 'Hardware ecosystem and IDE for embedded systems prototyping and sensor interfacing.',
    },
  },
  {
    name: 'Git',
    category: { id: 'Tools', en: 'Tools' },
    icon: '/skills/git.webp',
    color: '#F03C2E',
    desc: {
      id: 'Sistem kontrol versi terdistribusi untuk melacak perubahan kode dan kolaborasi tim.',
      en: 'Distributed version control system for tracking source code history and team collaboration.',
    },
  },
  {
    name: 'GitHub',
    category: { id: 'Tools', en: 'Tools' },
    icon: '/skills/github.webp',
    color: 'currentColor',
    invertDark: true,
    desc: {
      id: 'Platform hosting repositori kode, CI/CD Actions, dan kolaborasi open-source.',
      en: 'Platform for repository hosting, CI/CD workflows, code review, and open-source projects.',
    },
  },
  {
    name: 'Vercel',
    category: { id: 'Tools', en: 'Tools' },
    icon: '/skills/vercel.webp',
    color: 'currentColor',
    invertDark: true,
    desc: {
      id: 'Platform cloud untuk deployment aplikasi Next.js dan preview otomatis.',
      en: 'Cloud platform for zero-config Next.js deployments and instant preview environments.',
    },
  },
  {
    name: 'VS Code',
    category: { id: 'Tools', en: 'Tools' },
    icon: '/skills/visualstudiocode.webp',
    color: '#007ACC',
    desc: {
      id: 'Editor kode utama sehari-hari dengan ekstensi pengembangan web, Flutter, dan PlatformIO.',
      en: 'Daily driver code editor configured for full-stack web, Flutter, and embedded development.',
    },
  },
  {
    name: 'Figma',
    category: { id: 'Tools', en: 'Tools' },
    icon: '/skills/figma.webp',
    color: '#F24E1E',
    desc: {
      id: 'Alat desain kolaboratif untuk menyusun wireframe, sistem desain, dan prototipe UI/UX.',
      en: 'Collaborative interface design tool for wireframing, design systems, and UI prototyping.',
    },
  },
  {
    name: 'Postman',
    category: { id: 'Tools', en: 'Tools' },
    icon: '/skills/postman.svg',
    color: '#FF6C37',
    desc: {
      id: 'Digunakan untuk pengujian endpoint REST API, autentikasi token, dan dokumentasi API.',
      en: 'Used for testing REST API endpoints, token authentication, and API payload inspection.',
    },
  },
];
