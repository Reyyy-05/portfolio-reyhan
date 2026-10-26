'use client';

import React, { useEffect, useRef, useState } from 'react';
import { NeuralVortexBackground } from './NeuralVortexBackground';
import { useLocale } from '@/context/LocaleContext';
import { playLanguageSound, playNavSound } from '@/lib/audio';
import { PROFILE } from '@/data/portfolio';

const COPY = {
  id: {
    eyebrow: 'Selamat Datang di Portofolio Saya',
    title: 'Informasi Penting',
    body1: 'Ringkasan singkat tersedia di ',
    cvBold: 'Resume CV',
    body2: ' saya. Kunjungi ',
    homeBold: 'Beranda',
    body3: ' untuk menjelajahi proyek, pengalaman, dan karya lengkap saya.',
    cvCta: 'Resume CV',
    homeCta: 'Beranda',
  },
  en: {
    eyebrow: 'Welcome to My Portfolio',
    title: 'Important Information',
    body1: 'A quick summary is available in my ',
    cvBold: 'Resume CV',
    body2: '. Visit ',
    homeBold: 'Home',
    body3: ' to explore my full projects, experience, and work.',
    cvCta: 'Resume CV',
    homeCta: 'Home',
  },
};

export function IntroNotice() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState<'cv' | 'home' | null>(null);
  const { locale, setLocale } = useLocale();
  const closingRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    try {
      const seen = sessionStorage.getItem('portfolio-intro-seen');
      if (seen === '1') return;
    } catch {}

    setOpen(true);
    if (!dialog.open) {
      try {
        dialog.showModal();
      } catch {
        dialog.setAttribute('open', '');
      }
    }
  }, []);

  const dismiss = (mode: 'cv' | 'home') => {
    if (closingRef.current) return;
    closingRef.current = true;
    playNavSound(mode === 'home' ? 0 : 3);
    try {
      sessionStorage.setItem('portfolio-intro-seen', '1');
    } catch {}
    const dialog = dialogRef.current;
    if (!dialog) {
      setOpen(false);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (dialog.open) dialog.close();
      setOpen(false);
      return;
    }
    setLeaving(mode);
    setTimeout(() => {
      if (dialog.open) dialog.close();
      setLeaving(null);
      setOpen(false);
    }, mode === 'home' ? 460 : 330);
  };

  const t = COPY[locale];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="intro-title"
      aria-describedby="intro-desc"
      data-leaving={leaving ?? undefined}
      onCancel={(e) => {
        e.preventDefault();
        dismiss('home');
      }}
      className="intro"
    >
      {open && <NeuralVortexBackground />}
      <div className="intro-card login-card">
        <div className="intro-panel">
          <div aria-hidden="true" className="intro-grain" />
          <div className="intro-box">
            <div className="flex items-center justify-between gap-2">
              <p className="intro-eyebrow font-mono font-semibold uppercase">
                {t.eyebrow}
              </p>
              <div role="group" aria-label="Language" className="intro-lang">
                {(['id', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    aria-pressed={locale === lang}
                    onClick={() => {
                      if (lang !== locale) {
                        playLanguageSound(lang === 'id');
                        setLocale(lang, false);
                      }
                    }}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <h2 id="intro-title" className="intro-title">
              {t.title}
            </h2>
            <p id="intro-desc" className="intro-body">
              {t.body1}
              <strong>{t.cvBold}</strong>
              {t.body2}
              <strong>{t.homeBold}</strong>
              {t.body3}
            </p>
            <div className="intro-actions intro-actions-2">
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => dismiss('cv')}
                className="intro-btn intro-btn-primary"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                {t.cvCta}
              </a>
              <button
                type="button"
                onClick={() => dismiss('home')}
                className="intro-btn intro-btn-secondary"
              >
                {t.homeCta}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
