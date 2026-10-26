'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

export default function NotFound() {
  const { locale } = useLocale();

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="g404">
        <div className="flex items-center justify-center gap-3 font-display text-7xl font-bold sm:text-8xl">
          <span className="g404-num g404-num-l">4</span>
          <span className="g404-ghost">
            <span className="g404-float">👻</span>
          </span>
          <span className="g404-num g404-num-r">4</span>
        </div>
        <h1
          style={{ '--i': 1 } as React.CSSProperties}
          className="g404-item mt-4 text-h2 font-bold"
        >
          {locale === 'id' ? 'Halaman Tidak Ditemukan' : 'Page Not Found'}
        </h1>
        <p
          style={{ '--i': 2 } as React.CSSProperties}
          className="g404-item mx-auto mt-2 max-w-md text-sm text-muted"
        >
          {locale === 'id'
            ? 'Halaman yang Anda cari tidak tersedia atau telah dipindahkan.'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>
        <div
          style={{ '--i': 3 } as React.CSSProperties}
          className="g404-item mt-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg transition-opacity hover:opacity-90"
          >
            ← {locale === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
