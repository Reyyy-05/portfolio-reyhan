'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Github, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'rayhanalbar75@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative bg-bg-subtle/60 border-t border-border/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mari Terhubung & Berkolaborasi</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
          Siap Membantu Proyek Frontend Anda Berikutnya.
        </h2>

        <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
          Saya selalu terbuka untuk diskusi teknis seputar frontend development, peluang magang, proyek full-stack, maupun kolaborasi open source.
        </p>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
          
          {/* Email */}
          <div className="bg-bg-card border border-border/80 hover:border-accent/50 p-5 rounded-2xl flex flex-col items-center justify-between text-center transition-all group">
            <div className="p-3 bg-accent/10 text-accent rounded-xl mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <p className="font-mono text-xs font-semibold text-text-primary mb-1">Email Langsung</p>
            <p className="font-mono text-[11px] text-text-muted break-all mb-4">{emailAddress}</p>
            <div className="flex gap-2 w-full">
              <a
                href={`mailto:${emailAddress}`}
                className="flex-1 bg-accent text-bg hover:bg-accent-hover font-mono text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <span>Kirim</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={copyToClipboard}
                className="px-2.5 bg-bg-surface hover:bg-bg-surface/80 border border-border rounded-lg text-text-secondary transition-colors"
                title="Salin Email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-bg-card border border-border/80 hover:border-emerald-500/50 p-5 rounded-2xl flex flex-col items-center justify-between text-center transition-all group">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <p className="font-mono text-xs font-semibold text-text-primary mb-1">WhatsApp Chat</p>
            <p className="font-mono text-[11px] text-text-muted mb-4">+62 877-0018-7692</p>
            <a
              href="https://wa.me/6287700187692"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500/15 hover:bg-emerald-500 hover:text-bg text-emerald-400 border border-emerald-500/30 font-mono text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Hubungi WA</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* GitHub */}
          <div className="bg-bg-card border border-border/80 hover:border-accent-purple/50 p-5 rounded-2xl flex flex-col items-center justify-between text-center transition-all group">
            <div className="p-3 bg-accent-purple/10 text-accent-purple rounded-xl mb-3">
              <Github className="w-5 h-5" />
            </div>
            <p className="font-mono text-xs font-semibold text-text-primary mb-1">GitHub Profile</p>
            <p className="font-mono text-[11px] text-text-muted mb-4">@Reyyy-05 (10+ Repos)</p>
            <a
              href="https://github.com/Reyyy-05"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-accent-purple/15 hover:bg-accent-purple hover:text-bg text-accent-purple border border-accent-purple/30 font-mono text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Lihat Repos</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Location & Status footer note */}
        <p className="font-mono text-xs text-text-muted">
          📍 Berbasis di Sleman / D.I. Yogyakarta, Indonesia · Terbuka untuk Kerja Remote / Hybrid
        </p>

      </div>
    </section>
  );
};
