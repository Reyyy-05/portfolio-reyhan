import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reyhan Albar Fahryan — Frontend Web Developer Intern & Informatics Student',
  description:
    'Website Portofolio Reyhan Albar Fahryan. Web Development Intern di Creativemu Academy & Mahasiswa Informatika UNU Yogyakarta. Membangun produk digital berbasis Next.js, React, TypeScript, Supabase, dan Expo.',
  keywords: [
    'Reyhan Albar Fahryan',
    'Frontend Developer',
    'Next.js Portfolio',
    'Creativemu Academy Intern',
    'React Developer Indonesia',
    'UNU Yogyakarta Informatika'
  ],
  authors: [{ name: 'Reyhan Albar Fahryan', url: 'https://github.com/Reyyy-05' }],
  openGraph: {
    title: 'Reyhan Albar Fahryan — Frontend Web Developer',
    description:
      'Koleksi 10+ proyek nyata, repositori GitHub teruji, dan rekam jejak magang web development berbasis Next.js & React.',
    url: 'https://reyhanalbar.vercel.app',
    siteName: 'Reyhan Albar Portfolio',
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text-primary min-h-screen flex flex-col font-sans selection:bg-accent/25 selection:text-accent">
        {children}
      </body>
    </html>
  );
}
