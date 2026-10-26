'use client';

import React, { useCallback, useRef, useState } from 'react';
import { playSlideSound } from '@/lib/audio';

export function ProjectGallery({
  images,
  title,
  urlDisplay,
}: {
  images: string[];
  title: string;
  urlDisplay: string;
}) {
  const [idx, setIdx] = useState(0);
  const startXRef = useRef<number | null>(null);
  const count = images.length;

  const step = useCallback(
    (dir: 1 | -1) => {
      playSlideSound(dir);
      setIdx((prev) => (prev + dir + count) % count);
    },
    [count]
  );

  const select = (target: number) => {
    if (target !== idx) {
      playSlideSound(target > idx ? 1 : -1);
      setIdx(target);
    }
  };

  if (count === 0) return null;

  return (
    <div
      tabIndex={count > 1 ? 0 : undefined}
      onKeyDown={
        count > 1
          ? (e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                step(-1);
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                step(1);
              }
            }
          : undefined
      }
      className="pj-browser mt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div aria-hidden="true" className="pj-browser-bar">
        <span className="pj-browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pj-browser-url">{urlDisplay}</span>
        {count > 1 && (
          <span className="font-mono text-[11px] text-muted tabular-nums">
            {idx + 1} / {count}
          </span>
        )}
      </div>

      <div
        onPointerDown={(e) => {
          startXRef.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startXRef.current === null || count < 2) return;
          const dx = e.clientX - startXRef.current;
          startXRef.current = null;
          if (Math.abs(dx) >= 40) {
            step(dx < 0 ? 1 : -1);
          }
        }}
        className="pd-stage relative aspect-video w-full overflow-hidden bg-surface-2"
      >
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${title} — ${i + 1}`}
            aria-hidden={i !== idx}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
              i === idx ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-bg/80 text-text backdrop-blur transition hover:scale-105 hover:border-border-strong active:scale-95"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-3 inline-flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-bg/80 text-text backdrop-blur transition hover:scale-105 hover:border-border-strong active:scale-95"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div
          role="tablist"
          aria-label={title}
          className="pd-thumbs flex gap-2 overflow-x-auto border-t border-border bg-surface p-2.5"
        >
          {images.map((src, i) => {
            const active = i === idx;
            return (
              <button
                key={src + i}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`${i + 1} / ${count}`}
                onClick={() => select(i)}
                className={`relative aspect-video w-20 flex-none cursor-pointer overflow-hidden rounded-md border transition ${
                  active
                    ? 'border-primary ring-2 ring-primary/30'
                    : 'border-border opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="size-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
