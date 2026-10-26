'use client';

import React, { useEffect, useRef } from 'react';
import { playPhotoShimmerSound } from '@/lib/audio';

const CLASSES = {
  about: {
    wrap: 'ab-tilt',
    inner: 'ab-tilt-in',
    glare: 'ab-glare',
  },
  project: {
    wrap: 'pj-tilt',
    inner: 'pj-tilt-in',
    glare: 'pj-glare',
  },
};

export function PhotoTilt({
  children,
  className,
  maxDeg = 10,
  scale = 1.03,
  sound = false,
  variant = 'about',
}: {
  children: React.ReactNode;
  className?: string;
  maxDeg?: number;
  scale?: number;
  sound?: boolean;
  variant?: 'about' | 'project';
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const updatePointer = (clientX: number, clientY: number) => {
    const el = wrapRef.current;
    if (!el || reducedRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const nx = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const ny = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      const rx = (0.5 - ny) * 2 * maxDeg;
      const ry = (nx - 0.5) * 2 * maxDeg;
      el.dataset.tilt = 'on';
      el.style.setProperty('--tilt-x', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${ry.toFixed(2)}deg`);
      el.style.setProperty('--tilt-s', String(scale));
      el.style.setProperty('--glare-x', `${(100 * nx).toFixed(1)}%`);
      el.style.setProperty('--glare-y', `${(100 * ny).toFixed(1)}%`);
      el.style.setProperty('--glare-o', '1');
    });
  };

  const resetTilt = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    delete el.dataset.tilt;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.setProperty('--tilt-s', '1');
    el.style.setProperty('--glare-o', '0');
  };

  const cls = CLASSES[variant];

  return (
    <div
      ref={wrapRef}
      onPointerEnter={(e) => {
        if (sound && e.pointerType === 'mouse') {
          playPhotoShimmerSound();
        }
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') {
          if (sound) playPhotoShimmerSound();
          updatePointer(e.clientX, e.clientY);
        }
      }}
      onPointerMove={(e) => updatePointer(e.clientX, e.clientY)}
      onPointerUp={(e) => {
        if (e.pointerType !== 'mouse') resetTilt();
      }}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      className={className ? `${cls.wrap} ${className}` : cls.wrap}
    >
      <div className={cls.inner}>
        {children}
        <span aria-hidden="true" className={cls.glare} />
      </div>
    </div>
  );
}
