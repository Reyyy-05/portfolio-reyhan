'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Locale } from '@/data/portfolio';
import { playLanguageSound } from '@/lib/audio';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'SVG', 'TEXTAREA', 'INPUT', 'CANVAS']);

export function scrambleVisibleText(duration = 560) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const entries: { node: Text; target: string; len: number }[] = [];
  const vh = window.innerHeight;
  const roots = document.querySelectorAll('main, footer');

  for (const root of Array.from(roots)) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const val = node.nodeValue;
        if (!val || !val.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (
          !parent ||
          SKIP_TAGS.has(parent.tagName) ||
          parent.closest('[aria-hidden="true"], .sr-only, .hero-name')
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        const rect = parent.getBoundingClientRect();
        return rect.width === 0 || rect.height === 0 || rect.bottom < 0 || rect.top > vh
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    });
    let current: Node | null;
    while ((current = walker.nextNode())) {
      const target = current.nodeValue || '';
      entries.push({ node: current as Text, target, len: target.length });
    }
  }

  if (!entries.length) return;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    if (progress >= 1) {
      for (const item of entries) {
        if (item.node.isConnected) item.node.nodeValue = item.target;
      }
      return;
    }
    const revealRatio = progress * progress;
    for (const item of entries) {
      if (!item.node.isConnected) continue;
      const { target, len } = item;
      const revealedCount = Math.floor(revealRatio * len);
      let out = '';
      for (let i = 0; i < len; i++) {
        const ch = target[i];
        if (i < revealedCount || ch <= ' ') {
          out += ch;
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      item.node.nodeValue = out;
    }
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale, withSound?: boolean) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-locale');
      if (saved === 'id' || saved === 'en') {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      }
    } catch {}
  }, []);

  const setLocale = useCallback((next: Locale, withSound = true) => {
    setLocaleState((prev) => {
      if (prev === next) return prev;
      if (withSound) {
        playLanguageSound(next === 'id');
      }
      try {
        localStorage.setItem('portfolio-locale', next);
      } catch {}
      if (typeof document !== 'undefined') {
        document.documentElement.lang = next;
      }
      setTimeout(() => {
        scrambleVisibleText(560);
      }, 25);
      return next;
    });
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
