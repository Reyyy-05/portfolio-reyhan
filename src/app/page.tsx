'use client';

import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ExperienceAccordion } from '@/components/ExperienceAccordion';
import { SkillGlobe } from '@/components/SkillGlobe';
import { GitHubSkyline } from '@/components/GitHubSkyline';
import { useLocale } from '@/context/LocaleContext';
import { EXPERIENCES, PROJECTS, PROFILE, AWARDS_AND_PUBLICATIONS } from '@/data/portfolio';

export default function HomePage() {
  const { locale } = useLocale();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://reyhanalbar.vercel.app/#person',
        name: PROFILE.fullName,
        alternateName: ['Reyhan Albar', 'Reyhan Albar Fahryan', 'Reyyy-05'],
        url: 'https://reyhanalbar.vercel.app',
        image: 'https://reyhanalbar.vercel.app/images/reyhan-portrait.png',
        jobTitle: 'Fullstack Developer, Mobile Builder & IoT Builder',
        description:
          locale === 'id'
            ? 'Mahasiswa S1 Informatika di Universitas Nahdlatul Ulama Yogyakarta (UNU Yogyakarta), Web Development Intern di Creativemu Academy, dan Pemenang Desain Logo HUT ke-425 Kabupaten Tegal 2025.'
            : 'Informatics student at Universitas Nahdlatul Ulama Yogyakarta, Web Development Intern at Creativemu Academy, and Top 6 Winner of 425th Tegal Anniversary Logo Competition 2025.',
        sameAs: [
          PROFILE.linkedinUrl,
          PROFILE.githubUrl,
          PROFILE.instagramUrl,
          'https://ayotegal.com',
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: PROFILE.education.school,
          alternateName: 'UNU Yogyakarta',
          url: 'https://unu-jogja.ac.id',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'Creativemu Academy',
        },
        award: [
          'Top 6 Pemenang Sayembara Desain Logo HUT ke-425 Kabupaten Tegal 2025 (Kategori Umum mewakili UNU Yogyakarta)',
        ],
        knowsAbout: [
          'Fullstack Web Development',
          'Next.js',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Laravel',
          'Flutter',
          'Internet of Things (IoT)',
          'ESP32',
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Yogyakarta',
          addressCountry: 'ID',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://reyhanalbar.vercel.app/#website',
        url: 'https://reyhanalbar.vercel.app',
        name: `${PROFILE.fullName} — Official Tech Portfolio`,
        description:
          'Situs portofolio resmi Reyhan Albar Fahryan: Mahasiswa Informatika UNU Yogyakarta, Web Development Intern Creativemu Academy, Fullstack & IoT Developer.',
        publisher: {
          '@id': 'https://reyhanalbar.vercel.app/#person',
        },
        inLanguage: ['id', 'en'],
      },
    ],
  };

  // Duplicate projects for seamless infinite marquee loop
  const marqueeProjects = [...PROJECTS, ...PROJECTS];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      <section
        aria-labelledby="experience-title"
        className="home-curtain reveal border-t border-border py-16 md:py-24"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 id="experience-title" className="mb-8 text-center text-h2 font-bold">
            <span>{locale === 'id' ? 'Pengalaman' : 'Experience'}</span>
          </h2>

          <ExperienceAccordion>
            {EXPERIENCES.map((xp) => (
              <details key={xp.id} className="home-xp">
                <summary>
                  <span className="home-xp-logo" aria-hidden="true">
                    <img
                      alt=""
                      loading="lazy"
                      width={88}
                      height={88}
                      decoding="async"
                      className="size-full object-cover"
                      src={xp.logo}
                    />
                  </span>
                  <span className="home-xp-head">
                    <span className="home-xp-role">{xp.role[locale]}</span>
                    <span className="home-xp-org">{xp.org[locale]}</span>
                    <span className="home-xp-when home-xp-when-inline">
                      {xp.period[locale]}
                    </span>
                  </span>
                  <span className="home-xp-when home-xp-when-side">
                    {xp.period[locale]}
                  </span>
                </summary>
                <div className="home-xp-body flex max-w-prose flex-col gap-3 text-muted sm:max-w-none [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-4 [&_h2]:text-h3 [&_h2]:font-semibold [&_h3]:mt-2 [&_h3]:font-semibold [&_li]:ml-5 [&_li]:pl-1 [&_ol]:list-decimal [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1">
                  <ul>
                    {xp.bullets[locale].map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </ExperienceAccordion>
        </div>
      </section>

      <section
        aria-labelledby="awards-title"
        className="home-curtain reveal border-t border-border py-16 md:py-24"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {locale === 'id' ? 'Pengakuan & Prestasi Kampus' : 'Honors & Campus Recognition'}
            </span>
            <h2 id="awards-title" className="mt-3 text-h2 font-bold">
              <span>{locale === 'id' ? 'Prestasi & Liputan Publikasi' : 'Awards & Media Publications'}</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              {locale === 'id'
                ? 'Rekam jejak kompetisi nasional, riset inovasi mahasiswa UNU Yogyakarta, dan publikasi media.'
                : 'National competitions track record, UNU Yogyakarta student research innovations, and media coverage.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {AWARDS_AND_PUBLICATIONS.map((award) => (
              <div
                key={award.id}
                className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[11px] font-medium text-primary">
                      {award.badge[locale]}
                    </span>
                    <span className="font-mono text-xs text-muted">{award.year}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-text">
                    {award.title[locale]}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {award.issuer[locale]}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    {award.summary[locale]}
                  </p>
                </div>

                {award.url && (
                  <div className="mt-5 border-t border-border/50 pt-3">
                    <a
                      href={award.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>{award.sourceLabel || (locale === 'id' ? 'Lihat Berita Terbit' : 'View Publication')}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-3"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="projects-title"
        className="home-curtain reveal border-t border-border py-16 md:py-24"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 id="projects-title" className="mb-8 text-center text-h2 font-bold">
            <span>{locale === 'id' ? 'Proyek' : 'Projects'}</span>
          </h2>
        </div>

        <div className="home-marquee">
          <ul
            className="home-marquee-track"
            aria-label="Project list"
            style={{ '--n': PROJECTS.length } as React.CSSProperties}
          >
            {marqueeProjects.map((proj, idx) => {
              const isClone = idx >= PROJECTS.length;
              return (
                <li
                  key={`${proj.slug}-${idx}`}
                  aria-hidden={isClone ? 'true' : undefined}
                >
                  <Link
                    href={`/projects/${proj.slug}`}
                    tabIndex={isClone ? -1 : undefined}
                  >
                    <span className="home-marquee-cover">
                      <img
                        alt=""
                        loading="lazy"
                        decoding="async"
                        src={proj.cover}
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                        }}
                      />
                      <span className="home-marquee-hover">{proj.title}</span>
                    </span>
                    <span className="home-marquee-caption">{proj.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        id="skills"
        aria-labelledby="stack-title"
        className="home-curtain reveal scroll-mt-24 border-t border-border pt-16 pb-10 md:pt-24 md:pb-14"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 id="stack-title" className="mb-4 text-center text-h2 font-bold">
            <span>
              {locale === 'id' ? 'Keahlian Teknis' : 'Technical Skills'}
            </span>
          </h2>
          <SkillGlobe />
        </div>
      </section>

      <section
        aria-labelledby="github-title"
        className="home-curtain reveal border-t border-border pt-10 pb-16 md:pt-16 md:pb-24"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 id="github-title" className="mb-8 text-center text-h2 font-bold">
            <span>GitHub</span>
          </h2>
          <GitHubSkyline />
        </div>
      </section>
    </>
  );
}
