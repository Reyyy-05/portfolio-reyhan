'use client';

import React, { useMemo, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { sendContactEmail } from '@/app/actions/contact';
import { PROFILE } from '@/data/portfolio';

export function ContactForm() {
  const { locale } = useLocale();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentData, setSentData] = useState<{
    name: string;
    email: string;
    time: string;
  } | null>(null);

  const ticketRef = useMemo(
    () => `RAF-${Date.now().toString(36).slice(-5).toUpperCase()}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sentData]
  );

  const labels = {
    name: locale === 'id' ? 'Nama' : 'Name',
    email: 'Email',
    message: locale === 'id' ? 'Pesan' : 'Message',
    submit: locale === 'id' ? 'Kirim Pesan' : 'Send Message',
    sending: locale === 'id' ? 'Mengirim...' : 'Sending...',
    sentTitle: locale === 'id' ? 'Pesan Terkirim' : 'Message Sent',
    success:
      locale === 'id'
        ? 'Terima kasih! Pesan Anda telah diterima dan akan segera saya balas.'
        : 'Thank you! Your message has been received and I will reply shortly.',
    sendAnother: locale === 'id' ? 'Kirim pesan lain' : 'Send another message',
    errorFallback:
      locale === 'id'
        ? 'Gagal mengirim pesan. Silakan coba lagi.'
        : 'Failed to send message. Please try again.',
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage(
        locale === 'id' ? 'Harap lengkapi semua kolom.' : 'Please fill in all fields.'
      );
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await sendContactEmail(null, fd);
      if (res.success) {
        const now = new Date();
        setSentData({
          name,
          email,
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMessage(res.message || labels.errorFallback);
      }
    } catch {
      setStatus('error');
      setErrorMessage(labels.errorFallback);
    }
  }

  if (status === 'success' && sentData) {
    return (
      <div role="status" aria-live="polite" className="contact-sent">
        <div className="contact-ticket">
          <div className="flex items-center justify-between border-b border-dashed border-border px-6 py-4">
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase">
              <span className="size-2 rounded-full bg-success" />
              {locale === 'id' ? 'PESAN DITERIMA' : 'MESSAGE RECEIVED'}
            </span>
            <span className="font-mono text-xs text-muted">REF #{ticketRef}</span>
          </div>

          <div className="px-6 py-7">
            <div className="flex items-start gap-4">
              <div className="contact-check flex size-12 shrink-0 items-center justify-center rounded-full border border-success/40 bg-success/10 text-success">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-6"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-bold tracking-wide uppercase">
                  {labels.sentTitle}
                </h2>
                <p className="mt-1 text-sm text-muted">{labels.success}</p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-3 rounded-lg border border-border bg-bg/60 p-4 font-mono text-xs sm:grid-cols-2">
              <div className="min-w-0">
                <dt className="text-muted">{labels.name}</dt>
                <dd className="mt-0.5 truncate font-semibold text-text">
                  {sentData.name}
                </dd>
              </div>
              <div className="min-w-0">
                <dt className="text-muted">{labels.email}</dt>
                <dd className="mt-0.5 truncate font-semibold text-text">
                  {sentData.email}
                </dd>
              </div>
              <div>
                <dt className="text-muted"> TO</dt>
                <dd className="mt-0.5 font-semibold text-text">{PROFILE.fullName}</dd>
              </div>
              <div>
                <dt className="text-muted">TIME</dt>
                <dd className="mt-0.5 font-semibold text-text">{sentData.time}</dd>
              </div>
            </dl>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-border px-6 py-4">
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setSentData(null);
              }}
              className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold tracking-wider text-text uppercase transition-opacity hover:opacity-70"
            >
              ← {labels.sendAnother}
            </button>
            <span
              aria-hidden="true"
              className="font-mono text-[10px] tracking-[0.2em] text-muted"
            >
              |||| || ||| |||| | |||
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium">
          {labels.name}
        </label>
        <div className="field-shine mt-1.5">
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            className="w-full rounded-[7px] bg-surface px-3.5 py-2.5 text-sm text-text focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium">
          {labels.email}
        </label>
        <div className="field-shine mt-1.5">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="w-full rounded-[7px] bg-surface px-3.5 py-2.5 text-sm text-text focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium">
          {labels.message}
        </label>
        <div className="field-shine mt-1.5">
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            maxLength={4000}
            className="block w-full rounded-[7px] bg-surface px-3.5 py-2.5 text-sm text-text focus:outline-none"
          />
        </div>
      </div>

      {status === 'error' && errorMessage && (
        <p role="alert" className="text-sm text-danger">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="send-btn cursor-pointer"
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            {status === 'submitting' ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                className="animate-spin"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeOpacity="0.3"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                />
              </svg>
            )}
          </div>
        </div>
        <span>{status === 'submitting' ? labels.sending : labels.submit}</span>
      </button>
    </form>
  );
}
