'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';
import { playNavSound, playThemeSound } from '@/lib/audio';
import { PROFILE } from '@/data/portfolio';

const NAV_ITEMS = [
  {
    key: 'home',
    href: '/',
    label: { id: 'Beranda', en: 'Home' },
    icon: (
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
    ),
  },
  {
    key: 'about',
    href: '/about',
    label: { id: 'Tentang', en: 'About' },
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
      </>
    ),
  },
  {
    key: 'experience',
    href: '/experience',
    label: { id: 'Pengalaman', en: 'Experience' },
    icon: (
      <>
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </>
    ),
  },
  {
    key: 'projects',
    href: '/projects',
    label: { id: 'Proyek', en: 'Projects' },
    icon: (
      <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" />
    ),
  },
  {
    key: 'contact',
    href: '/contact',
    label: { id: 'Kontak', en: 'Contact' },
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
  },
];

function isRouteActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname() || '/';
  const { locale, setLocale } = useLocale();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        root.classList.remove('light', 'dark');
        root.classList.add(saved);
        setTheme(saved);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = prefersDark ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(initial);
        setTheme(initial);
      }
    } catch {}
  }, []);

  // Reveal observer matching reference site
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-in)');
    if (!els.length) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    playThemeSound(next === 'light');

    const apply = () => {
      root.classList.remove('light', 'dark');
      root.classList.add(next);
      setTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch {}
    };

    const docWithVT = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };

    if (
      !docWithVT.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      apply();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxR = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    root.setAttribute('data-theme-transition', '');
    const vt = docWithVT.startViewTransition(apply);
    vt.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${cx}px ${cy}px)`,
              `circle(${maxR}px at ${cx}px ${cy}px)`,
            ],
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {});
    vt.finished.finally(() => {
      root.removeAttribute('data-theme-transition');
    });
  };

  return (
    <header className="site-bar sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => playNavSound(0)}
          className="inline-flex items-center font-display text-xl font-bold tracking-wider uppercase sm:text-2xl"
        >
          {PROFILE.fullName}
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="relative hidden items-center gap-1 rounded-full border border-border bg-surface/80 px-1.5 py-1 shadow-lg backdrop-blur-lg md:flex">
            {NAV_ITEMS.map((item, idx) => {
              const active = isRouteActive(pathname, item.href);
              return (
                <li key={item.key} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => playNavSound(idx)}
                    className={`relative flex items-center justify-center rounded-full px-5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                      active ? 'bg-surface-2 text-text' : 'text-muted hover:text-text'
                    }`}
                  >
                    <span>{item.label[locale]}</span>
                    {active && <span aria-hidden="true" className="nav-lamp-top" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Language"
            className="inline-flex items-center rounded-md border border-border bg-surface p-0.5 text-xs"
          >
            {(['id', 'en'] as const).map((lang) => {
              const active = locale === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLocale(lang, true)}
                  className={`cursor-pointer rounded px-2 py-1 font-medium uppercase transition-colors ${
                    active ? 'bg-primary text-primary-fg' : 'text-muted hover:text-text'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md border border-border bg-surface text-text transition-colors hover:border-border-strong"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              {theme === 'dark' ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </>
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  const pathname = usePathname() || '/';
  const { locale } = useLocale();

  return (
    <nav
      aria-label="Main navigation"
      className="site-bar pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <ul className="pointer-events-auto relative grid w-full max-w-md grid-cols-5 items-center gap-0.5 rounded-full border border-border bg-surface/80 p-1 shadow-lg backdrop-blur-lg">
        {NAV_ITEMS.map((item, idx) => {
          const active = isRouteActive(pathname, item.href);
          return (
            <li key={item.key} className="relative min-w-0">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => playNavSound(idx)}
                className={`relative flex flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1.5 text-[10px] leading-tight font-semibold transition-colors ${
                  active ? 'bg-surface-2 text-text' : 'text-muted hover:text-text'
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 shrink-0"
                >
                  {item.icon}
                </svg>
                <span className="max-w-full truncate">{item.label[locale]}</span>
                {active && <span aria-hidden="true" className="nav-lamp-top" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
