'use client';

import React, { useEffect, useRef } from 'react';
import { playTimelineStepSound } from '@/lib/audio';

export function FocusTimeline({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  const listRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLLIElement>(':scope > li'));
    if (items.length === 0) return;

    const nodes = items.map((li) => li.querySelector<HTMLElement>('.xp-node'));
    let raf = 0;
    let currentIdx = -1;
    let initialized = false;
    let lastSoundTime = 0;

    const updateTimeline = () => {
      raf = 0;
      const vh = window.innerHeight;
      const focusY = 0.45 * vh;
      const listRect = list.getBoundingClientRect();
      const fillRatio = Math.max(
        0,
        Math.min(1, (focusY - listRect.top) / Math.max(1, listRect.height))
      );
      list.style.setProperty('--xp-fill', fillRatio.toFixed(4));

      const docH = document.documentElement.scrollHeight;
      let bestIdx = 0;
      if (window.scrollY <= 8) {
        bestIdx = 0;
      } else if (window.scrollY + vh >= docH - 8) {
        bestIdx = items.length - 1;
      } else {
        let minDist = Infinity;
        nodes.forEach((node, idx) => {
          const target = node ?? items[idx];
          const r = target.getBoundingClientRect();
          const dist = Math.abs(r.top + 0.5 * r.height - focusY);
          if (dist < minDist) {
            minDist = dist;
            bestIdx = idx;
          }
        });
      }

      const changed = bestIdx !== currentIdx;
      currentIdx = bestIdx;

      items.forEach((li, idx) => {
        if (idx === bestIdx) {
          li.setAttribute('data-active', '');
        } else {
          li.removeAttribute('data-active');
        }
        if (idx <= bestIdx) {
          li.setAttribute('data-passed', '');
        } else {
          li.removeAttribute('data-passed');
        }
      });

      if (initialized && changed) {
        const now = performance.now();
        if (now - lastSoundTime > 120) {
          lastSoundTime = now;
          playTimelineStepSound(bestIdx);
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateTimeline);
    };

    list.setAttribute('data-focus', '');
    updateTimeline();
    initialized = true;

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={listRef} aria-label={ariaLabel} className="xp-tl">
      {children}
    </ol>
  );
}
