'use client';

import React, { useState, useEffect } from 'react';
import { Github, FileText, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { MinesweeperIcon } from './PixelIcons';

export const Navbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Proyek', href: '#projects' },
    { label: 'Pengalaman', href: '#experience' },
    { label: 'Keahlian', href: '#skills' },
    { label: 'Kontak', href: '#contact' },
  ];

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-bg/85 backdrop-blur-xl border-b border-border/70 py-3 shadow-md'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-accent via-accent-cyan to-accent-purple transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group font-mono text-sm tracking-wide text-text-primary"
          >
            <div className="w-7 h-7 rounded-lg bg-bg-surface border border-accent/40 flex items-center justify-center text-accent shadow-pixel group-hover:scale-110 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(94,234,212,0.4)] transition-all duration-300">
              <MinesweeperIcon size={18} />
            </div>
            <span className="font-bold text-text-primary group-hover:text-accent transition-colors">
              reyhan<span className="text-accent">.dev</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] text-text-muted bg-bg-surface px-1.5 py-0.5 rounded border border-border/50">
              v2.0
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: GitHub & Resume */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Reyyy-05"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-card rounded-lg border border-border/40 hover:border-border transition-all"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="/cv-reyhan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-accent/10 text-accent hover:bg-accent hover:text-bg font-mono text-xs font-semibold px-3.5 py-2 rounded-lg border border-accent/30 transition-all duration-200 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg border border-border/50"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-bg-card/95 backdrop-blur-xl border-b border-border px-4 py-5 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-text-secondary hover:text-accent py-1.5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-border flex items-center gap-3">
              <a
                href="https://github.com/Reyyy-05"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 border border-border py-2 rounded-lg text-sm text-text-secondary"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="/cv-reyhan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-bg font-mono text-xs font-semibold py-2 rounded-lg"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
