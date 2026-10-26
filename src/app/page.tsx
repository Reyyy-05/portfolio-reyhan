'use client';

import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ExperienceAccordion } from '@/components/ExperienceAccordion';
import { SkillGlobe } from '@/components/SkillGlobe';
import { GitHubSkyline } from '@/components/GitHubSkyline';
import { useLocale } from '@/context/LocaleContext';
import { EXPERIENCES, PROJECTS, PROFILE } from '@/data/portfolio';

export default function HomePage() {
  const { locale } = useLocale();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.fullName,
    url: 'https://reyhanalbar.vercel.app',
    description: PROFILE.aboutLead[locale],
    jobTitle: 'Web Development Intern at Creativemu Academy',
    image: PROFILE.profilePhoto,
    sameAs: [PROFILE.linkedinUrl, PROFILE.githubUrl, PROFILE.instagramUrl],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yogyakarta',
      addressCountry: 'ID',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: PROFILE.education.school,
    },
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
