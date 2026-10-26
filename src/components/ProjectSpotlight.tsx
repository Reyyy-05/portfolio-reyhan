'use client';

import React, { useEffect, useRef } from 'react';
import { playProjectSpotlightSound } from '@/lib/audio';

export function ProjectSpotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLLIElement>(':scope > li'));
    if (items.length === 0) return;

    let raf = 0;
    let currentIdx = -1;
    let initialized = false;
    let lastSoundTime = 0;
    let enableTimer = 0;

    const updateFocus = () => {
      raf = 0;
      const vh = window.innerHeight;
      const center = 0.5 * vh;
      const docH = document.documentElement.scrollHeight;

      let bestIdx = 0;
      if (window.scrollY <= 8) {
        bestIdx = 0;
      } else if (window.scrollY + vh >= docH - 8) {
        bestIdx = items.length - 1;
      } else {
        let minDist = Infinity;
        items.forEach((li, idx) => {
          const rect = li.getBoundingClientRect();
          const dist =
            rect.top <= center && rect.bottom >= center
              ? 0
              : Math.min(Math.abs(rect.top - center), Math.abs(rect.bottom - center));
          if (dist < minDist) {
            minDist = dist;
            bestIdx = idx;
          }
        });
      }

      if (bestIdx === currentIdx) return;
      const prevIdx = currentIdx;
      currentIdx = bestIdx;

      items.forEach((li, idx) => {
        if (idx === bestIdx) {
          li.setAttribute('data-active', '');
        } else {
          li.removeAttribute('data-active');
        }
      });

      if (initialized && prevIdx !== -1) {
        const now = performance.now();
        if (now - lastSoundTime > 120) {
          lastSoundTime = now;
          playProjectSpotlightSound(bestIdx);
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateFocus);
    };

    list.setAttribute('data-focus', 'init');
    updateFocus();
    initialized = true;
    enableTimer = window.setTimeout(() => {
      list.setAttribute('data-focus', 'on');
    }, 50);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.clearTimeout(enableTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ul ref={listRef} className={className}>
      {children}
    </ul>
  );
}
