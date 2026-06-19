export interface SkillGroup {
  name: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    skills: ['Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Astro', 'GSAP', 'HTML', 'CSS'],
  },
  {
    name: 'Mobile',
    skills: ['Expo React Native', 'Expo Router', 'Zustand', 'React Native'],
  },
  {
    name: 'Backend & Database',
    skills: ['Supabase', 'PostgreSQL', 'MySQL', 'SQLite', 'Prisma ORM', 'Firebase', 'Node.js', 'PHP'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'GitHub', 'npm', 'VS Code', 'Expo Go', 'Vercel'],
  },
  {
    name: 'Product & Documentation',
    skills: ['README', 'PRD', 'Proposal Writing', 'Task Tracker', 'Technical Report'],
  },
  {
    name: 'Data / IoT',
    skills: ['Python', 'SQL', 'Sensor Telemetry', 'Data Validation', 'Hash Verification', 'CSV/XLSX Processing'],
  },
];
