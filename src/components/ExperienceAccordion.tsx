'use client';

import React, { useEffect, useRef } from 'react';
import { playExperienceToggleSound } from '@/lib/audio';

export function ExperienceAccordion({
  children,
}: {
  children: React.ReactNode;
}) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animMap = new WeakMap<HTMLDetailsElement, Animation>();

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const summary = target?.closest('summary');
      if (!summary || !list.contains(summary)) return;
      const details = summary.parentElement as HTMLDetailsElement | null;
      if (!details || details.tagName !== 'DETAILS') return;

      e.preventDefault();
      animMap.get(details)?.cancel();
      const willOpen = !details.open;
      playExperienceToggleSound(willOpen);

      if (reduced) {
        details.open = willOpen;
        return;
      }

      const startH = details.offsetHeight;
      if (willOpen) details.open = true;
      const endH = willOpen ? details.offsetHeight : summary.offsetHeight;

      details.style.overflow = 'hidden';
      const anim = details.animate(
        { height: [`${startH}px`, `${endH}px`] },
        {
          duration: 320,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }
      );
      animMap.set(details, anim);
      anim.onfinish = () => {
        if (!willOpen) details.open = false;
        details.style.overflow = '';
        animMap.delete(details);
      };
      anim.oncancel = () => {
        details.style.overflow = '';
      };
    };

    list.addEventListener('click', handleClick);
    return () => list.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={listRef} className="home-xp-list">
      {children}
    </div>
  );
}
