'use client';

import React from 'react';
import { PhotoTilt } from '@/components/PhotoTilt';
import { useLocale } from '@/context/LocaleContext';
import { PROFILE } from '@/data/portfolio';

export default function AboutPage() {
  const { locale } = useLocale();

  return (
    <div className="ab-page">
      <div className="ab-band">
        <div className="mx-auto w-full max-w-[1200px] px-4 pt-12 sm:px-6 md:pt-20 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start md:gap-10 lg:gap-14">
            <header className="ab-intro text-center md:col-span-7 md:pb-12 md:text-left">
              <h1 className="mt-3 text-h1 font-bold">{PROFILE.fullName}</h1>
              <p className="mx-auto mt-3 max-w-prose text-lead md:mx-0">
                {PROFILE.aboutLead[locale]}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs md:justify-start">
                <a
                  href={PROFILE.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ab-cv-btn inline-flex items-center gap-2 rounded-md px-3.5 py-2 font-sans text-xs font-semibold transition-opacity hover:opacity-90"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-3.5"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Resume CV
                </a>
                <span className="ab-meta inline-flex items-center gap-2">
                  <span aria-hidden="true" className="ab-dot" />
                  {PROFILE.status[locale]}
                </span>
                <span className="ab-meta inline-flex items-center gap-1.5">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-3.5"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {PROFILE.location[locale]}
                </span>
              </div>
            </header>

            <div className="ab-photo-slot mx-auto w-full max-w-[300px] md:col-span-5 md:mx-0 md:ml-auto md:max-w-[340px]">
              <PhotoTilt sound variant="about" className="w-full">
                <figure className="ab-pc">
                  <img
                    alt={`Photo of ${PROFILE.fullName}`}
                    width={960}
                    height={1280}
                    decoding="async"
                    className="ab-pc-img"
                    src={PROFILE.profilePhoto}
                  />
                  <figcaption className="ab-pc-bar">
                    <img
                      alt=""
                      aria-hidden="true"
                      width={72}
                      height={72}
                      decoding="async"
                      className="ab-pc-ava"
                      src={PROFILE.profilePhoto}
                    />
                    <div className="ab-pc-id">
                      <span className="ab-pc-handle">@{PROFILE.handle}</span>
                      <span className="ab-pc-status">
                        <span aria-hidden="true" className="ab-pc-dot" />
                        {PROFILE.status[locale]}
                      </span>
                    </div>
                    <span
                      role="img"
                      aria-label={PROFILE.location[locale]}
                      title={PROFILE.location[locale]}
                      className="ab-pc-chip"
                    >
                      <span aria-hidden="true" className="ab-pc-flag" />
                    </span>
                  </figcaption>
                </figure>
              </PhotoTilt>
            </div>
          </div>
        </div>
      </div>

      <div className="ab-body mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="space-y-12 md:col-span-7">
            <section aria-labelledby="bio-heading" className="ab-sec ab-sec-1">
              <h2 id="bio-heading" className="text-h2 font-bold">
                {locale === 'id' ? 'Tentang Saya' : 'About Me'}
              </h2>
              <div className="mt-4 max-w-prose space-y-4 text-justify leading-relaxed text-text">
                {PROFILE.aboutBio[locale].map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="edu-heading" className="ab-sec ab-sec-2">
              <h2 id="edu-heading" className="text-h2 font-bold">
                {locale === 'id' ? 'Pendidikan' : 'Education'}
              </h2>
              <div className="ab-edu-card mt-4 rounded-xl border border-border bg-surface p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <a
                    href="https://unu-jogja.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={PROFILE.education.school}
                    className="ab-edu-logo flex size-14 shrink-0 items-center justify-center rounded-lg border border-border bg-white p-1.5"
                  >
                    <img
                      alt={PROFILE.education.school}
                      loading="lazy"
                      width={96}
                      height={96}
                      decoding="async"
                      className="size-full object-contain"
                      src={PROFILE.education.logo}
                    />
                  </a>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-h3 font-semibold">
                        <a
                          href="https://unu-jogja.ac.id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {PROFILE.education.school}
                        </a>
                      </h3>
                      <span className="rounded-full border border-border bg-surface-2 px-3 py-0.5 font-mono text-xs font-medium">
                        {PROFILE.education.gpa[locale]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {PROFILE.education.degree[locale]}
                    </p>
                  </div>
                </div>
                <p className="mt-4 border-t border-border pt-4 text-justify text-sm leading-relaxed text-muted">
                  {PROFILE.education.desc[locale]}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
