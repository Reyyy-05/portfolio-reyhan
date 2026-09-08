import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curriculum Vitae — Reyhan Albar Fahryan',
  description: 'Pratinjau dan unduh berkas Curriculum Vitae (CV) resmi Reyhan Albar Fahryan (Frontend Web Developer & Informatics Student).',
};

export default function CVPage() {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col">
      {/* Top Bar Navigation */}
      <header className="bg-bg-card/90 backdrop-blur-md border-b border-border/80 sticky top-0 z-50 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portofolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="/cv-reyhan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-text-primary px-3 py-1.5 rounded-lg border border-border transition-colors"
            >
              <span>Buka Tab Baru</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="/cv-reyhan.pdf"
              download="CV_Reyhan_Albar_Fahryan.pdf"
              className="inline-flex items-center gap-2 bg-accent text-bg hover:bg-accent-hover font-mono text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Unduh PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col">
        
        {/* Info Strip */}
        <div className="bg-bg-card border border-border/70 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent/10 text-accent rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base text-text-primary">
                Curriculum Vitae — Reyhan Albar Fahryan
              </h1>
              <p className="font-mono text-xs text-text-muted mt-0.5">
                Format: PDF · Diperbarui 2026 · Terbuka untuk Peluang Magang / Frontend Developer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Dokumen Terverifikasi</span>
          </div>
        </div>

        {/* PDF Viewer Embed */}
        <div className="flex-1 w-full bg-bg-card border border-border rounded-2xl overflow-hidden shadow-sm min-h-[750px] relative">
          <iframe
            src="/cv-reyhan.pdf#toolbar=1&navpanes=0"
            className="w-full h-full min-h-[750px] border-none"
            title="Curriculum Vitae Reyhan Albar Fahryan"
          />
        </div>

      </main>
    </div>
  );
}
