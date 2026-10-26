'use client';

import React from 'react';
import { FocusTimeline } from '@/components/FocusTimeline';
import { useLocale } from '@/context/LocaleContext';
import { EXPERIENCES } from '@/data/portfolio';

export default function ExperiencePage() {
  const { locale } = useLocale();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8">
      <header className="pt-12 pb-10 text-center md:pt-20">
        <h1 className="mx-auto mt-3 max-w-3xl text-h1 font-bold">
          {locale === 'id' ? 'Pengalaman' : 'Experience'}
        </h1>
      </header>

      <FocusTimeline
        ariaLabel={locale === 'id' ? 'Riwayat pengalaman' : 'Experience history'}
      >
        {EXPERIENCES.map((xp) => (
          <li
            key={xp.id}
            data-type={xp.type}
            data-current={xp.current ? '' : undefined}
          >
            <div className="xp-node">
              <img
                alt={xp.org[locale]}
                loading="lazy"
                width={112}
                height={112}
                decoding="async"
                className="size-full object-cover"
                src={xp.logo}
              />
            </div>

            <div className="xp-main">
              <h2 className="text-h3 font-semibold">{xp.role[locale]}</h2>
              <p className="mt-1">{xp.org[locale]}</p>
              <p className="mt-1 text-sm text-muted tabular-nums">
                {xp.period[locale]} · {xp.duration[locale]}
              </p>
              <div className="xp-desc mt-3 flex max-w-prose flex-col gap-3 text-muted [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-4 [&_h2]:text-h3 [&_h2]:font-semibold [&_h3]:mt-2 [&_h3]:font-semibold [&_li]:ml-5 [&_li]:pl-1 [&_ol]:list-decimal [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1">
                <ul>
                  {xp.bullets[locale].map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="xp-side">
              <span className="xp-frame">
                <img
                  alt={xp.role[locale]}
                  loading="lazy"
                  width={960}
                  height={720}
                  decoding="async"
                  className="xp-photo"
                  src={xp.photo}
                />
              </span>
            </div>
          </li>
        ))}
      </FocusTimeline>
    </div>
  );
}
