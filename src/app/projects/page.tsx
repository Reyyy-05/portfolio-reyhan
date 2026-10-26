'use client';

import React from 'react';
import Link from 'next/link';
import { PhotoTilt } from '@/components/PhotoTilt';
import { ProjectSpotlight } from '@/components/ProjectSpotlight';
import { useLocale } from '@/context/LocaleContext';
import { PROJECTS } from '@/data/portfolio';

export default function ProjectsPage() {
  const { locale } = useLocale();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8">
      <header className="pt-12 pb-10 text-center md:pt-20">
        <h1 className="mx-auto mt-3 max-w-3xl text-h1 font-bold">
          {locale === 'id' ? 'Proyek' : 'Projects'}
        </h1>
      </header>

      <ProjectSpotlight className="pj-spot space-y-20 md:space-y-32">
        {PROJECTS.map((proj, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <li
              key={proj.slug}
              className="pj-zz grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10 lg:gap-12"
            >
              <div
                className={
                  isEven ? 'md:order-2 md:col-span-7' : 'md:col-span-7'
                }
              >
                <PhotoTilt maxDeg={6} scale={1.015} variant="project">
                  <Link
                    href={`/projects/${proj.slug}`}
                    aria-label={proj.title}
                    className="pj-browser group block"
                  >
                    <div aria-hidden="true" className="pj-browser-bar">
                      <span className="pj-browser-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="pj-browser-url">{proj.urlDisplay}</span>
                    </div>
                    <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
                      <img
                        alt={proj.title}
                        loading={idx < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        src={proj.cover}
                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </Link>
                </PhotoTilt>
              </div>

              <div
                className={`pj-zz-text relative flex flex-col ${
                  isEven ? 'md:order-1 md:col-span-5' : 'md:col-span-5'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pj-bignum absolute -top-10 select-none ${
                    isEven ? 'left-0 md:right-0 md:left-auto' : 'right-0'
                  }`}
                >
                  {proj.number}
                </span>

                <span className="pj-role">{proj.role[locale]}</span>

                <h2 className="pj-title-box mt-1 font-bold">
                  <Link
                    href={`/projects/${proj.slug}`}
                    style={
                      {
                        '--chars': Math.max(proj.title.length, 18),
                      } as React.CSSProperties
                    }
                    className="pj-row-title pj-title-fit block transition-colors hover:text-primary"
                  >
                    {proj.title}
                  </Link>
                </h2>

                <p className="mt-1 font-mono text-xs text-muted tabular-nums">
                  {proj.period[locale]}
                </p>

                <p className="mt-3 text-justify text-sm leading-relaxed text-muted">
                  {proj.summary[locale]}
                </p>

                <ul
                  aria-label="Tech stack"
                  className="mt-4 flex flex-wrap gap-1.5"
                >
                  {proj.tech.map((t) => (
                    <li key={t.name} className="pj-tech">
                      <img
                        src={t.icon}
                        alt=""
                        width={14}
                        height={14}
                        loading="lazy"
                        decoding="async"
                        data-invert-dark={t.invertDark ? '' : undefined}
                      />
                      {t.name}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-medium">
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="pj-shine inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-primary-fg transition-opacity hover:opacity-90"
                  >
                    {locale === 'id' ? 'Lihat Detail' : 'Case Study'}
                    <span aria-hidden="true">→</span>
                  </Link>
                  {proj.repoUrl && (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-2 transition-colors hover:border-border-strong"
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
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      {locale === 'id' ? 'Kode Sumber' : 'Source Code'}
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ProjectSpotlight>
    </div>
  );
}
