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
  title: `${PROFILE.fullName} — Fullstack Developer & IoT Builder`,
  description:
    'Portfolio of Reyhan Albar Fahryan — Informatics student at Universitas Nahdlatul Ulama Yogyakarta and Web Development Intern at Creativemu Academy.',
  keywords: [
    'Reyhan Albar Fahryan',
    'Fullstack Developer',
    'Next.js',
    'Laravel',
    'Flutter',
    'IoT',
    'UNU Yogyakarta',
    'Creativemu Academy',
  ],
  authors: [{ name: PROFILE.fullName, url: PROFILE.githubUrl }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://reyhanalbar.vercel.app'
  ),
  openGraph: {
    title: `${PROFILE.fullName} — Fullstack Developer & IoT Builder`,
    description:
      'Informatics student at UNU Yogyakarta & Web Development Intern at Creativemu Academy.',
    url: 'https://reyhanalbar.vercel.app',
    siteName: PROFILE.fullName,
    locale: 'en_US',
    type: 'website',
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
