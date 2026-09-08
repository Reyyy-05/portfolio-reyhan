export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'systems' | 'collab';
  categoryLabel: string;
  tagline: string;
  description: string;
  engineeringHighlight: string;
  techStack: string[];
  status: 'Production' | 'MVP' | 'Collaboration' | 'Experiment';
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  pixelBadge: string;
  metrics?: { label: string; value: string };
  codeSnippetPreview?: {
    filename: string;
    language: string;
    snippet: string;
  };
}

export const projectsData: Project[] = [
  {
    id: 'imgn-concept-katalog',
    title: 'IMGN Concept Web Catalog',
    category: 'web',
    categoryLabel: 'Commercial Full-Stack Web',
    tagline: 'Digital Commercial Catalog & Relational Inventory System',
    description: 'A full-stack commercial web catalog built for a custom motorcycle parts brand. Features instant category filtering, relational inventory synchronization, and responsive image galleries.',
    engineeringHighlight: 'Architected dynamic category filtering with Next.js App Router and Supabase PostgreSQL relational schemas with custom Row-Level Security (RLS).',
    techStack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    status: 'Production',
    githubUrl: 'https://github.com/Reyyy-05/imgnconsept-katalog.git',
    featured: true,
    pixelBadge: '📦 PROD',
    metrics: { label: 'Inventory Sync', value: '< 80ms' },
    codeSnippetPreview: {
      filename: 'useCatalogFilter.ts',
      language: 'typescript',
      snippet: `const { data: products } = await supabase
  .from('motor_parts')
  .select('id, name, price, stock, category_id')
  .eq('is_published', true)
  .order('created_at', { ascending: false });`
    }
  },
  {
    id: 'statprov',
    title: 'StatProv (Data Provenance)',
    category: 'systems',
    categoryLabel: 'Data Integrity & Systems',
    tagline: 'Cryptographic Dataset Integrity Verification Protocol',
    description: 'A specialized prototype platform designed to audit and verify statistical dataset integrity through SHA-256 hash anchoring, CSV/XLSX browser-native parsing, and administrative audit trails.',
    engineeringHighlight: 'Engineered in-browser client-side cryptographic checksum calculation coupled with Prisma ORM audit logging for zero-trust data provenance.',
    techStack: ['Next.js', 'TypeScript', 'Prisma ORM', 'SQLite', 'SHA-256', 'Tailwind CSS'],
    status: 'MVP',
    githubUrl: 'https://github.com/Reyyy-05/StatProv.git',
    featured: true,
    pixelBadge: '🔒 HASH',
    metrics: { label: 'Integrity Check', value: 'SHA-256' },
    codeSnippetPreview: {
      filename: 'verifyChecksum.ts',
      language: 'typescript',
      snippet: `export async function verifyDatasetHash(buffer: ArrayBuffer, expectedHash: string) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === expectedHash;
}`
    }
  },
  {
    id: 'biolearn',
    title: 'BioLearn EdTech Mobile App',
    category: 'mobile',
    categoryLabel: 'Mobile Application',
    tagline: 'Interactive High School Biology Learning & Quiz Platform',
    description: 'A modern mobile learning application for high school biology with curriculum modularization (Grades 10–12), interactive quiz engine with score breakdown, and persistent learning progress.',
    engineeringHighlight: 'Implemented client-side reactive state management with Zustand and structured navigation via Expo Router with offline-first caching.',
    techStack: ['Expo React Native', 'TypeScript', 'Zustand', 'Expo Router'],
    status: 'MVP',
    githubUrl: 'https://github.com/Reyyy-05/BioLearn.git',
    featured: true,
    pixelBadge: '🧬 EDTECH',
    metrics: { label: 'Curriculum Scope', value: 'Kelas 10-12' },
    codeSnippetPreview: {
      filename: 'useQuizStore.ts',
      language: 'typescript',
      snippet: `export const useQuizStore = create<QuizState>((set) => ({
  score: 0,
  currentQuestion: 0,
  submitAnswer: (isCorrect) => set((s) => ({ 
    score: isCorrect ? s.score + 10 : s.score,
    currentQuestion: s.currentQuestion + 1
  }))
}));`
    }
  },
  {
    id: 'masjidflow',
    title: 'MasjidFlow Community Management',
    category: 'mobile',
    categoryLabel: 'Mobile Community Tech',
    tagline: 'Role-Based Mosque Event Coordination & Agenda App',
    description: 'A mobile community tech platform built to organize mosque events, committee workflows, schedule approvals, and announcements with role-based access control (Admin, Pengurus, Jamaah).',
    engineeringHighlight: 'Designed modular UI components with atomic role permissions and dynamic timeline renderers for mosque agenda planning.',
    techStack: ['Expo React Native', 'TypeScript', 'Zustand', 'Expo Router', 'NativeWind'],
    status: 'MVP',
    githubUrl: 'https://github.com/Reyyy-05/masjidflow.git',
    featured: true,
    pixelBadge: '🕌 COMM',
    metrics: { label: 'User Roles', value: '3 Access Tiers' },
    codeSnippetPreview: {
      filename: 'roleGuard.tsx',
      language: 'typescript',
      snippet: `export function RoleGuard({ role, allowed, children }) {
  if (!allowed.includes(role)) {
    return <UnauthorizedNotice message="Restricted to Pengurus" />;
  }
  return <>{children}</>;
}`
    }
  },
  {
    id: 'kairav-studio',
    title: 'Kairav Studio Website',
    category: 'collab',
    categoryLabel: 'Collaborative Frontend',
    tagline: 'Digital Studio Showcase & Creative Engineering Portfolio',
    description: 'A collaborative digital agency showcase built in a team environment. Included redesign of core landing page, interactive Team members index, Services overview, and Works gallery.',
    engineeringHighlight: 'Managed structured multi-contributor Git workflow with branch protection, PR peer reviews, and interactive animation choreographies.',
    techStack: ['Astro', 'TypeScript', 'Tailwind CSS', 'GSAP', 'GitHub Team Flow'],
    status: 'Collaboration',
    githubUrl: 'https://github.com/ilhamkrnwan/kairav.studio.git',
    featured: true,
    pixelBadge: '👥 TEAM',
    metrics: { label: 'Workflow', value: 'Git Team PR' },
  },
  {
    id: 'kalkulator-ahliwaris',
    title: 'Kalkulator Ahli Waris Islami',
    category: 'web',
    categoryLabel: 'Web Logic & Algorithms',
    tagline: 'Digital Islamic Inheritance (Faraidh) Share Calculator',
    description: 'An interactive web calculator designed to simulate mathematical distributions of inheritance under Islamic jurisprudence, handling complex edge-cases like Ashabah and Hijab Hirman.',
    engineeringHighlight: 'Implemented complex conditional rule trees and fractional fraction arithmetic in pure TypeScript with instant reactive UI recalculations.',
    techStack: ['JavaScript', 'HTML5', 'Tailwind CSS', 'Faraidh Logic'],
    status: 'MVP',
    githubUrl: 'https://github.com/Reyyy-05/kalkulator-ahliwaris.git',
    featured: false,
    pixelBadge: '⚖️ LOGIC',
  },
  {
    id: 'pupukku',
    title: 'Pupukku Agri-Commerce Platform',
    category: 'web',
    categoryLabel: 'Agri-Tech Platform',
    tagline: 'Agricultural Fertilizer Catalog & Farmer Support Hub',
    description: 'A dedicated web application providing local farmers with transparent catalog pricing, fertilizer dosage recommendations, and distributor direct contact channels.',
    engineeringHighlight: 'Focused on high-accessibility UI tailored for mobile web users in rural farming communities with minimal data overhead.',
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'UI/UX'],
    status: 'Experiment',
    githubUrl: 'https://github.com/Reyyy-05/Pupukku.git',
    featured: false,
    pixelBadge: '🌱 AGRI',
  },
  {
    id: 'landingpage-bootcamp',
    title: 'High-Conversion Bootcamp Landing Page',
    category: 'web',
    categoryLabel: 'Frontend Marketing',
    tagline: 'Conversion-Focused Web Dev Bootcamp Registration Portal',
    description: 'A responsive promotion landing page engineered with strategic CTA hierarchy, pricing tier comparisons, testimonial carousels, and client-side form validation.',
    engineeringHighlight: 'Achieved 99+ Lighthouse performance scores through optimized image pipelines, semantic markup, and zero layout shift.',
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Lighthouse 100'],
    status: 'MVP',
    githubUrl: 'https://github.com/Reyyy-05/landingpage_bootcamp.git',
    featured: false,
    pixelBadge: '🚀 CONV',
  },
  {
    id: 'kafebilyar-app',
    title: 'KafeBilyar Table Booking App',
    category: 'mobile',
    categoryLabel: 'Mobile App Prototype',
    tagline: 'Cafe & Billiard Table Reservation & Slot Scheduler',
    description: 'A specialized management and reservation app concept for entertainment venues, tracking table availability, billing timers, and snack bar orders in real time.',
    engineeringHighlight: 'Time-slot collision detection algorithm and dynamic session pricing calculator implemented in mobile UI.',
    techStack: ['React Native', 'TypeScript', 'Expo', 'Mobile UI'],
    status: 'Experiment',
    githubUrl: 'https://github.com/Reyyy-05/KafeBilyarApp.git',
    featured: false,
    pixelBadge: '🎱 SLOTS',
  },
  {
    id: 'smartroutine',
    title: 'SmartRoutine Productivity Planner',
    category: 'mobile',
    categoryLabel: 'Personal Productivity',
    tagline: 'Habit Tracker & Daily Execution Matrix',
    description: 'A distraction-free habit management mobile app built around micro-reward milestones and streak maintenance to support personal engineering discipline.',
    engineeringHighlight: 'Local persistence with async storage, subpixel checkbox feedback, and progress streak analytics.',
    techStack: ['React Native', 'TypeScript', 'AsyncStorage', 'Product Thinking'],
    status: 'Experiment',
    githubUrl: 'https://github.com/Reyyy-05/SmartRoutine.git',
    featured: false,
    pixelBadge: '⚡ HABIT',
  }
];

export const experienceData = [
  {
    role: 'Web Development Intern',
    company: 'Creativemu Academy',
    period: 'April 2026 – Sekarang',
    type: 'Internship',
    badge: 'Active Internship',
    description: 'Developing high-performance company landing pages using Next.js and Tailwind CSS. Contributing to modernizing web architecture towards the Node.js/Next.js ecosystem for greater maintainability and team velocity.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Git Flow'],
    highlights: [
      'Engineered responsive landing pages with sub-second initial load times',
      'Migrated legacy UI templates into reusable Next.js components',
      'Collaborated closely with creative directors and frontend teams'
    ]
  },
  {
    role: 'Full-Stack Developer (Commercial)',
    company: 'IMGN Concept',
    period: '2026',
    type: 'Commercial Project',
    badge: 'Production',
    description: 'Designed and deployed commercial web catalog with relational database architecture, inventory tracking, and custom responsive UI for motorcycle modification products.',
    techStack: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      'Built relational data models with Supabase PostgreSQL',
      'Integrated real-time catalog search and categorization filters'
    ]
  },
  {
    role: 'Field Data Enumerator / Officer',
    company: 'Badan Pusat Statistik (BPS)',
    period: '2026',
    type: 'Data & Field Operations',
    badge: 'Field Experience',
    description: 'Conducted field data enumeration and economic census respondent interviews. Gained deep firsthand insight into data accuracy, edge cases, and the necessity of robust data verification systems.',
    techStack: ['Data Collection', 'Verification', 'Field Communication'],
    highlights: [
      'Surveyed and validated business respondents with strict compliance',
      'Directly inspired the data provenance architecture behind StatProv'
    ]
  },
  {
    role: 'Frontend Contributor',
    company: 'Kairav Studio',
    period: '2025 – 2026',
    type: 'Collaborative Studio',
    badge: 'Open Collab',
    description: 'Collaborated on agency website redesign, building dedicated Works showcase, Services breakdowns, and Team directory using structured GitHub Pull Request workflows.',
    techStack: ['Astro', 'GSAP', 'Tailwind CSS', 'GitHub PRs'],
    highlights: [
      'Participated in code reviews and branch management workflows'
    ]
  }
];

export const skillsData = {
  frontend: [
    { name: 'React / Next.js (App Router)', level: 'Advanced', highlight: 'Primary focus during internship' },
    { name: 'TypeScript', level: 'Proficient', highlight: 'Type-safe component architectures' },
    { name: 'Tailwind CSS', level: 'Advanced', highlight: 'Custom design systems & responsive layouts' },
    { name: 'State Management (Zustand)', level: 'Proficient', highlight: 'Lightweight reactive stores' },
    { name: 'Mobile (Expo React Native)', level: 'Intermediate', highlight: 'Built BioLearn & MasjidFlow MVPs' },
  ],
  backendData: [
    { name: 'Supabase & PostgreSQL', level: 'Proficient', highlight: 'RLS policies & relational schemas' },
    { name: 'Prisma ORM & SQLite', level: 'Proficient', highlight: 'Data provenance models in StatProv' },
    { name: 'REST APIs & Webhooks', level: 'Proficient', highlight: 'Client-server integration' },
    { name: 'Data Hashing & Verification', level: 'Proficient', highlight: 'SHA-256 & Perceptual Hashing' },
  ],
  engineeringCraft: [
    { name: 'Git & GitHub Collaboration', level: 'Proficient', highlight: 'Branching, PRs, review workflows' },
    { name: 'Performance & SEO (Lighthouse)', level: 'Proficient', highlight: 'Zero layout shift & Web Vitals' },
    { name: 'Pixel Art & Retro UI Craft', level: 'Passionate', highlight: 'Aseprite, limited palettes, dithering' },
    { name: 'Technical Documentation', level: 'Proficient', highlight: 'PRDs, READMEs, and IEEE/SINTA papers' },
  ]
};
