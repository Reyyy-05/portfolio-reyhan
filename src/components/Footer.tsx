'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { PROFILE } from '@/data/portfolio';

interface ContactCardItem {
  key: string;
  label: string;
  href: string;
  handle: string;
  cta: { id: string; en: string };
  color: string;
  icon: React.ReactNode;
}

const CONTACT_ITEMS: ContactCardItem[] = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: PROFILE.whatsappUrl,
    handle: PROFILE.whatsapp,
    cta: { id: 'Chat di WhatsApp', en: 'Chat on WhatsApp' },
    color: '#25D366',
    icon: (
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" />
    ),
  },
  {
    key: 'email',
    label: 'Email',
    href: `mailto:${PROFILE.email}`,
    handle: PROFILE.email,
    cta: { id: 'Kirim Email', en: 'Send an Email' },
    color: '#EA4335',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: PROFILE.linkedinUrl,
    handle: 'in/reyhan-albar-fahryan',
    cta: { id: 'Terhubung di LinkedIn', en: 'Connect on LinkedIn' },
    color: '#0A66C2',
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    key: 'github',
    label: 'GitHub',
    href: PROFILE.githubUrl,
    handle: `@${PROFILE.handle}`,
    cta: { id: 'Lihat Repositori', en: 'View Repositories' },
    color: '#8B5CF6',
    icon: (
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: PROFILE.instagramUrl,
    handle: '@reyhanalbar_',
    cta: { id: 'Ikuti di Instagram', en: 'Follow on Instagram' },
    color: '#E4405F',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    key: 'cv',
    label: 'Resume CV',
    href: PROFILE.cvUrl,
    handle: 'CV_Reyhan_Albar.pdf',
    cta: { id: 'Buka Dokumen PDF', en: 'Open PDF Document' },
    color: '#3B82F6',
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </>
    ),
  },
];

export function Footer() {
  const { locale } = useLocale();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number; arrow: number } | null>(null);

  const computePos = (idx: number) => {
    const wrap = wrapRef.current;
    const link = linkRefs.current[idx];
    if (!wrap || !link) return;
    const wr = wrap.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    const center = lr.left - wr.left + lr.width / 2;
    const x = Math.max(120, Math.min(wr.width - 120, center));
    setPos({
      x,
      y: lr.top - wr.top,
      arrow: Math.max(-96, Math.min(96, center - x)),
    });
  };

  const handleEnter = (idx: number) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setClosing(false);
    setActiveIdx(idx);
    computePos(idx);
  };

  const handleLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setClosing(true);
      leaveTimerRef.current = setTimeout(() => {
        setActiveIdx(null);
        setClosing(false);
      }, 150);
    }, 90);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const currentItem = activeIdx !== null ? CONTACT_ITEMS[activeIdx] : null;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 pb-28 sm:px-6 md:py-16 md:pb-16 lg:px-8">
        <div>
          <h2 className="text-h3 font-semibold">
            {locale === 'id' ? 'Hubungi Saya' : 'Get in touch'}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {locale === 'id'
              ? 'Terbuka untuk kolaborasi proyek, magang, dan diskusi teknologi.'
              : 'Reach out anytime for collaborations, internships, or tech discussions.'}
          </p>
        </div>

        <div ref={wrapRef} className="relative mt-6">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-6">
            {CONTACT_ITEMS.map((item, idx) => {
              const isExternal = item.href.startsWith('http') || item.href.endsWith('.pdf');
              const isActive = activeIdx === idx && !closing;
              return (
                <li key={item.key}>
                  <a
                    ref={(el) => {
                      linkRefs.current[idx] = el;
                    }}
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    onMouseEnter={() => handleEnter(idx)}
                    onMouseLeave={handleLeave}
                    onFocus={() => handleEnter(idx)}
                    onBlur={handleLeave}
                    className={`group flex items-center justify-between gap-2 border-b py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-border-strong text-text'
                        : 'border-border text-text hover:border-border-strong'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`size-4 transition-colors ${
                          isActive ? 'text-text' : 'text-muted group-hover:text-text'
                        }`}
                      >
                        {item.icon}
                      </svg>
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`text-xs transition-all duration-200 ${
                        isActive
                          ? 'translate-x-0.5 -translate-y-0.5 text-text'
                          : 'text-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text'
                      }`}
                    >
                      ↗
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {currentItem && pos && (
            <div
              role="tooltip"
              onMouseEnter={() => {
                if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
                setClosing(false);
              }}
              onMouseLeave={handleLeave}
              className="pointer-events-none absolute top-0 left-0 z-30 hidden w-60 transition-[transform] duration-200 ease-out md:block"
              style={{
                transform: `translate3d(${pos.x - 120}px, ${pos.y - 12}px, 0) translateY(-100%)`,
              }}
            >
              <a
                href={currentItem.href}
                target={
                  currentItem.href.startsWith('http') || currentItem.href.endsWith('.pdf')
                    ? '_blank'
                    : undefined
                }
                rel="noopener noreferrer"
                tabIndex={-1}
                style={{ '--cc': currentItem.color } as React.CSSProperties}
                className={`${
                  closing ? 'cc-out' : 'cc-in'
                } pointer-events-auto relative block overflow-hidden rounded-xl border border-border bg-surface p-3.5 shadow-xl`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full opacity-20 blur-2xl"
                  style={{ background: 'var(--cc)' }}
                />
                <div className="relative flex items-center gap-3">
                  <span
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
                    style={{ background: 'var(--cc)' }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      {currentItem.icon}
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-semibold text-text">{currentItem.label}</p>
                      <span aria-hidden="true" className="text-xs text-muted">
                        ↗
                      </span>
                    </div>
                    <p className="truncate font-mono text-xs text-muted">{currentItem.handle}</p>
                  </div>
                </div>
                <p className="relative mt-2.5 border-t border-border pt-2 text-[11px] font-medium text-muted">
                  {currentItem.cta[locale]}
                </p>
              </a>
              <span
                aria-hidden="true"
                className="mx-auto block size-2.5 -translate-y-1 rotate-45 border-r border-b border-border bg-surface transition-transform duration-200"
                style={{ transform: `translateX(${pos.arrow}px) translateY(-4px) rotate(45deg)` }}
              />
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {PROFILE.fullName}.{' '}
            {locale === 'id' ? 'Hak cipta dilindungi.' : 'All rights reserved.'}
          </p>
          <p className="font-mono">Next.js · TypeScript · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
