'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ProjectGallery } from '@/components/ProjectGallery';
import { useLocale } from '@/context/LocaleContext';
import { PROJECTS } from '@/data/portfolio';

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const project = PROJECTS.find((p) => p.slug === params?.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl pt-12 md:pt-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
        >
          ← {locale === 'id' ? 'Kembali ke Proyek' : 'Back to Projects'}
        </Link>

        <header className="pd-head pj-title-box mt-6 flex flex-col items-center text-center">
          <span className="pj-role">{project.role[locale]}</span>
          <h1
            style={
              {
                '--chars': Math.max(project.title.length, 18),
              } as React.CSSProperties
            }
            className="pd-title pj-title-fit font-bold"
          >
            {project.title}
          </h1>
          <p className="mt-2 font-mono text-xs text-muted tabular-nums">
            {project.period[locale]}
          </p>
          <p className="mx-auto mt-3 max-w-prose text-justify text-lead">
            {project.summary[locale]}
          </p>

          <ul
            aria-label="Tech stack"
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            {project.tech.map((t) => (
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

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-medium">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-shine inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-primary-fg transition-opacity hover:opacity-90"
              >
                {locale === 'id' ? 'Kunjungi Situs' : 'Visit Live'} ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 transition-colors hover:border-border-strong"
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
        </header>

        <ProjectGallery
          images={project.gallery}
          title={project.title}
          urlDisplay={project.urlDisplay}
        />

        <div className="mt-10 space-y-8 border-t border-border pt-10">
          <div className="flex max-w-prose flex-col gap-3 text-justify sm:max-w-none [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-4 [&_h2]:text-h3 [&_h2]:font-semibold [&_h3]:mt-2 [&_h3]:font-semibold [&_li]:ml-5 [&_li]:pl-1 [&_ol]:list-decimal [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1">
            <h2>{locale === 'id' ? 'Masalah' : 'Problem'}</h2>
            <p>{project.problem[locale]}</p>

            <h2>{locale === 'id' ? 'Solusi' : 'Solution'}</h2>
            <p>{project.solution[locale]}</p>

            <h2>{locale === 'id' ? 'Fitur Utama' : 'Key Features'}</h2>
            <ul>
              {project.features[locale].map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
