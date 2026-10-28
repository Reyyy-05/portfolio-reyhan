import type { Metadata } from 'next';
import { Inter, Oswald, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LocaleProvider } from '@/context/LocaleContext';
import { Navbar, MobileNav } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntroNotice } from '@/components/IntroNotice';
import { PROFILE } from '@/data/portfolio';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${PROFILE.fullName} — Mahasiswa Informatika UNU Yogyakarta & Fullstack Developer`,
    template: `%s | ${PROFILE.fullName}`,
  },
  description:
    'Situs Portofolio Resmi Reyhan Albar Fahryan. Mahasiswa S1 Informatika Universitas Nahdlatul Ulama Yogyakarta, Web Development Intern di Creativemu Academy, dan Top 6 Pemenang Sayembara Desain Logo HUT ke-425 Kabupaten Tegal 2025.',
  keywords: [
    'Reyhan Albar Fahryan',
    'Reyhan Albar',
    'reyhanalbar.vercel.app',
    'Reyyy-05',
    'Informatika UNU Yogyakarta',
    'Universitas Nahdlatul Ulama Yogyakarta',
    'Creativemu Academy',
    'Fullstack Developer Indonesia',
    'IoT Builder',
    'Sayembara Logo HUT 425 Tegal',
    'Tegal Luwih Apik',
    'NIRANA IoT',
    'Next.js Portfolio',
    'Laravel Bootcamp',
  ],
  authors: [{ name: PROFILE.fullName, url: PROFILE.githubUrl }],
  creator: PROFILE.fullName,
  publisher: PROFILE.fullName,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://reyhanalbar.vercel.app'
  ),
  alternates: {
    canonical: 'https://reyhanalbar.vercel.app',
  },
  openGraph: {
    title: `${PROFILE.fullName} — Mahasiswa Informatika UNU Yogyakarta & Fullstack Developer`,
    description:
      'Portofolio resmi Reyhan Albar Fahryan: Mahasiswa Informatika UNU Yogyakarta, Web Development Intern Creativemu Academy, dan Pemenang Desain Logo HUT ke-425 Kabupaten Tegal.',
    url: 'https://reyhanalbar.vercel.app',
    siteName: 'Reyhan Albar Fahryan Official Portfolio',
    locale: 'id_ID',
    alternateLocale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/images/reyhan-portrait.png',
        width: 960,
        height: 1280,
        alt: PROFILE.fullName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.fullName} — Mahasiswa Informatika UNU Yogyakarta & Fullstack Developer`,
    description:
      'Portofolio resmi Reyhan Albar Fahryan: Mahasiswa Informatika UNU Yogyakarta, Web Development Intern Creativemu Academy, dan Top 6 Sayembara Logo HUT 425 Tegal.',
    creator: '@reyhanalbar_',
    images: ['/images/reyhan-portrait.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${oswald.variable} ${jetbrainsMono.variable}`}
      data-sound-volume="80"
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-bg font-sans text-body text-text antialiased">
        <LocaleProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
          >
            Skip to content
          </a>
          <Navbar />
          <MobileNav />
          <main id="main" className="relative isolate flex-1">
            {children}
          </main>
          <Footer />
          <IntroNotice />
        </LocaleProvider>
      </body>
    </html>
  );
}
