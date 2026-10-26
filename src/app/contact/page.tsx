'use client';

import React from 'react';
import { IdLanyard } from '@/components/IdLanyard';
import { ContactForm } from '@/components/ContactForm';
import { useLocale } from '@/context/LocaleContext';

export default function ContactPage() {
  const { locale } = useLocale();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="pt-12 md:pt-20">
        <header className="text-center">
          <h1 className="mx-auto mt-3 max-w-3xl text-h1 font-bold">
            {locale === 'id' ? 'Kontak' : 'Contact'}
          </h1>
        </header>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <IdLanyard
              hint={locale === 'id' ? 'Tarik kartu' : 'Drag card'}
              flipHint={locale === 'id' ? 'Ketuk untuk membalik' : 'Tap to flip'}
            />
          </div>

          <div className="lg:col-span-7 lg:pt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
