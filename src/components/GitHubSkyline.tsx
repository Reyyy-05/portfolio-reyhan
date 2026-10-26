'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const PALETTE = {
  light: {
    top: ['#ebebeb', '#b9d2f8', '#6e9de8', '#2f6fd6', '#1b4c9c'],
    left: ['#d8d8d8', '#96b9ee', '#4f82d4', '#2358b0', '#133978'],
    right: ['#c6c6c6', '#7aa1df', '#3c6bb8', '#1a458c', '#0d2a59'],
    baseTop: '#f3f3f4',
    baseLeft: '#e3e3e6',
    baseRight: '#d2d2d6',
    cellStroke: 'rgba(15, 23, 42, 0.06)',
    label: '#6b6b70',
    stat: '#1b4c9c',
  },
  dark: {
    top: ['#171a20', '#172e4f', '#244f8c', '#3878cf', '#5b9cf5'],
    left: ['#111318', '#11233d', '#1b3d6e', '#2b5ea6', '#467cc7'],
    right: ['#0c0e12', '#0c192c', '#132c50', '#1f467c', '#335d99'],
    baseTop: '#13161b',
    baseLeft: '#0e1014',
    baseRight: '#090b0e',
    cellStroke: 'rgba(255, 255, 255, 0.05)',
    label: '#8e929b',
    stat: '#5b9cf5',
  },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function parseRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mixHex(c1: string, c2: string, t: number) {
  const [r1, g1, b1] = parseRgb(c1);
  const [r2, g2, b2] = parseRgb(c2);
  return `rgb(${Math.round(lerp(r1, r2, t))},${Math.round(
    lerp(g1, g2, t)
  )},${Math.round(lerp(b1, b2, t))})`;
}

export function GitHubSkyline({
  days: propDays,
  total: propTotal,
}: {
  days?: ContributionDay[];
  total?: number;
}) {
  const { locale } = useLocale();
  const [mode, setMode] = useState<'2d' | '3d'>('2d');
  const [isDark, setIsDark] = useState(true);

  const scrollWrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const { weeks, total, stats } = useMemo(() => {
    let rawDays = propDays;
    if (!rawDays || rawDays.length === 0) {
      // Generate realistic 52-week contribution history for Reyhan
      const generated: ContributionDay[] = [];
      const end = new Date();
      const start = new Date(end);
      start.setDate(end.getDate() - 364);
      // Align start to Sunday
      start.setDate(start.getDate() - start.getDay());

      let seed = 42;
      const rand = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };

      const cur = new Date(start);
      while (cur <= end) {
        const iso = cur.toISOString().slice(0, 10);
        const r = rand();
        const recentBoost = (cur.getTime() - start.getTime()) / (end.getTime() - start.getTime());
        let count = 0;
        if (r > 0.25 - recentBoost * 0.15) {
          count = Math.floor(rand() * 14) + 1;
          if (rand() > 0.88) count += Math.floor(rand() * 22);
        }
        const level: 0 | 1 | 2 | 3 | 4 =
          count === 0 ? 0 : count <= 3 ? 1 : count <= 8 ? 2 : count <= 15 ? 3 : 4;
        generated.push({ date: iso, count, level });
        cur.setDate(cur.getDate() + 1);
      }
      rawDays = generated;
    }

    const groupedWeeks: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [null, null, null, null, null, null, null];
    for (const d of rawDays) {
      const dow = new Date(`${d.date}T00:00:00`).getDay();
      if (dow === 0 && currentWeek.some((x) => x !== null)) {
        groupedWeeks.push(currentWeek);
        currentWeek = [null, null, null, null, null, null, null];
      }
      currentWeek[dow] = d;
    }
    if (currentWeek.some((x) => x !== null)) groupedWeeks.push(currentWeek);

    let sum = 0;
    let busiest = { count: 0, date: '' };
    let longest = { len: 0, start: '', end: '' };
    let runLen = 0;
    let runStart = '';
    let prevDate = '';

    for (const d of rawDays) {
      sum += d.count;
      if (d.count > busiest.count) {
        busiest = { count: d.count, date: d.date };
      }
      if (d.count > 0) {
        if (runLen === 0) runStart = d.date;
        runLen++;
        prevDate = d.date;
        if (runLen > longest.len) {
          longest = { len: runLen, start: runStart, end: d.date };
        }
      } else {
        runLen = 0;
      }
    }

    let currentStreak = { len: 0, start: '', end: '' };
    for (let i = rawDays.length - 1; i >= 0; i--) {
      const d = rawDays[i];
      if (d.count === 0) {
        if (i === rawDays.length - 1) continue;
        break;
      }
      if (currentStreak.len === 0) currentStreak.end = d.date;
      currentStreak.start = d.date;
      currentStreak.len++;
    }
    void prevDate;

    return {
      weeks: groupedWeeks,
      total: propTotal ?? sum,
      stats: { busiest, longest, currentStreak },
    };
  }, [propDays, propTotal]);

  const monthFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
        month: 'short',
      }),
    [locale]
  );
  const fullDateFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    [locale]
  );
  const shortDateFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
        month: 'short',
        day: 'numeric',
      }),
    [locale]
  );

  const monthMarkers = useMemo(() => {
    const out: { w: number; text: string }[] = [];
    let lastM = -1;
    weeks.forEach((wk, wIdx) => {
      const first = wk.find((d) => d !== null);
      if (!first) return;
      const dt = new Date(`${first.date}T00:00:00`);
      const m = dt.getMonth();
      if (m !== lastM) {
        if (wIdx > 0 || dt.getDate() <= 7) {
          out.push({ w: wIdx, text: monthFmt.format(dt) });
        }
        lastM = m;
      }
    });
    return out;
  }, [weeks, monthFmt]);

  const dayMarkers = useMemo(() => {
    const base = new Date(2024, 0, 7);
    const fmt = new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
      weekday: 'short',
    });
    return [1, 3, 5].map((dow) => ({
      dow,
      text: fmt.format(new Date(2024, 0, base.getDate() + dow)),
    }));
  }, [locale]);

  const stateRef = useRef({
    t: 0,
    fromT: 0,
    toT: 0,
    animStart: 0,
    yaw: Math.PI / 6,
    pitch: 0.55,
    fromYaw: Math.PI / 6,
    fromPitch: 0.55,
    dragging: false,
    moved: false,
    lastX: 0,
    lastY: 0,
    hover: null as { w: number; d: number } | null,
    focus: null as { w: number; d: number } | null,
    tops: [] as { w: number; d: number; day: ContributionDay; poly: [number, number][] }[],
    width: 0,
    height: 180,
    dpr: 1,
    raf: 0,
    themeMix: 1,
  });

  useEffect(() => {
    const checkDark = () => {
      const root = document.documentElement;
      const dark =
        root.classList.contains('dark') ||
        (!root.classList.contains('light') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDark(dark);
      stateRef.current.themeMix = dark ? 1 : 0;
    };
    checkDark();
    const mo = new MutationObserver(checkDark);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => mo.disconnect();
  }, []);

  const drawScene = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = scrollWrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const st = stateRef.current;
    const t = st.t;
    const pal = isDark ? PALETTE.dark : PALETTE.light;
    const nWeeks = weeks.length;
    const containerW = st.width || wrap.clientWidth || 800;

    const cellPitch2D = Math.max(11, (containerW - 30 - 4) / nWeeks);
    const cellSize2D = cellPitch2D - 3;
    const totalW2D = 30 + nWeeks * cellPitch2D;
    const totalH2D = Math.round(20 + 7 * cellPitch2D + 8);
    const height3D = containerW < 640 ? 250 : 340;
    const curW = Math.round(lerp(totalW2D, containerW, t));
    const curH = Math.round(lerp(totalH2D, height3D, t));

    if (wrap.style.height !== `${curH}px`) {
      wrap.style.height = `${curH}px`;
    }

    const dpr = st.dpr;
    const targetCW = Math.max(1, Math.round(curW * dpr));
    const targetCH = Math.max(1, Math.round(curH * dpr));
    if (canvas.width !== targetCW || canvas.height !== targetCH) {
      canvas.width = targetCW;
      canvas.height = targetCH;
      canvas.style.width = `${curW}px`;
      canvas.style.height = `${curH}px`;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, curW, curH);

    const cosY = Math.cos(st.yaw);
    const sinY = Math.sin(st.yaw);
    const sinP = Math.sin(st.pitch);
    const cosP = Math.cos(st.pitch);
    const halfW = (nWeeks - 1) / 2;

    const isoBounds = (() => {
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
      for (const wx of [-halfW - 1.2, halfW + 1.2]) {
        for (const dy of [-4.2, 4.2]) {
          for (const z of [-0.32, 3.8]) {
            const x = wx * cosY - dy * sinY;
            const y = (wx * sinY + dy * cosY) * sinP - z * cosP;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      const scale = Math.min(
        (containerW - 24) / (maxX - minX),
        (height3D - 24) / (maxY - minY)
      );
      return {
        scale,
        cx: containerW / 2 - ((minX + maxX) / 2) * scale,
        cy: height3D / 2 - ((minY + maxY) / 2) * scale,
      };
    })();

    const project = (w: number, d: number, z: number): [number, number] => {
      const x2d = 30 + w * cellPitch2D;
      const y2d = 20 + d * cellPitch2D;
      const wx = w - halfW;
      const dy = d - 3;
      const rx = wx * cosY - dy * sinY;
      const ry = (wx * sinY + dy * cosY) * sinP - z * cosP;
      const x3d = isoBounds.cx + rx * isoBounds.scale;
      const y3d = isoBounds.cy + ry * isoBounds.scale;
      return [lerp(x2d, x3d, t), lerp(y2d, y3d, t)];
    };

    if (t < 0.75) {
      ctx.save();
      ctx.globalAlpha = 1 - t / 0.75;
      ctx.fillStyle = pal.label;
      ctx.font = '11px var(--font-sans), system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      for (const m of monthMarkers) {
        const [mx] = project(m.w, 0, 0);
        ctx.fillText(m.text, mx, 9);
      }
      for (const dm of dayMarkers) {
        const [, dy] = project(0, dm.dow, 0);
        ctx.fillText(dm.text, 0, dy + cellSize2D / 2);
      }
      ctx.restore();
    }

    const fillPoly = (pts: [number, number][], fill: string, stroke?: string) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    };

    if (t > 0.02) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, (t - 0.02) / 0.4);
      const wMin = -0.6,
        wMax = nWeeks - 1 + 0.6 + 0.78;
      const dMin = -0.6,
        dMax = 7.38;
      const topQuad: [number, number][] = [
        project(wMin, dMin, 0),
        project(wMax, dMin, 0),
        project(wMax, dMax, 0),
        project(wMin, dMax, 0),
      ];
      fillPoly(topQuad, pal.baseTop, pal.cellStroke);
      ctx.restore();
    }

    const cellRatio = lerp(cellSize2D / cellPitch2D, 0.78, t);
    const cells: { w: number; d: number; day: ContributionDay; depth: number }[] = [];
    for (let w = 0; w < nWeeks; w++) {
      for (let d = 0; d < 7; d++) {
        const day = weeks[w][d];
        if (!day) continue;
        cells.push({
          w,
          d,
          day,
          depth: (w - halfW) * sinY + (d - 3) * cosY,
        });
      }
    }
    if (t > 0.001) {
      cells.sort((a, b) => a.depth - b.depth);
    }

    const maxCount = Math.max(1, stats.busiest.count);
    const activeCell = st.hover ?? st.focus;
    st.tops = [];

    for (const c of cells) {
      const { w, d, day } = c;
      const lvl = day.level;
      const hVal =
        day.count === 0
          ? 0.06
          : 0.28 + Math.pow(day.count / maxCount, 0.55) * 3.52;
      const z = hVal * t;
      const isHovered = activeCell?.w === w && activeCell?.d === d;

      const topQuad: [number, number][] = [
        project(w, d, z),
        project(w + cellRatio, d, z),
        project(w + cellRatio, d + cellRatio, z),
        project(w, d + cellRatio, z),
      ];

      if (z > 0.005) {
        const xFace =
          cosY >= 0
            ? ([
                project(w, d + cellRatio, z),
                project(w + cellRatio, d + cellRatio, z),
                project(w + cellRatio, d + cellRatio, 0),
                project(w, d + cellRatio, 0),
              ] as [number, number][])
            : ([
                project(w, d, z),
                project(w + cellRatio, d, z),
                project(w + cellRatio, d, 0),
                project(w, d, 0),
              ] as [number, number][]);

        const yFace =
          sinY >= 0
            ? ([
                project(w + cellRatio, d, z),
                project(w + cellRatio, d + cellRatio, z),
                project(w + cellRatio, d + cellRatio, 0),
                project(w + cellRatio, d, 0),
              ] as [number, number][])
            : ([
                project(w, d, z),
                project(w, d + cellRatio, z),
                project(w, d + cellRatio, 0),
                project(w, d, 0),
              ] as [number, number][]);

        fillPoly(xFace, pal.left[lvl]);
        fillPoly(yFace, pal.right[lvl]);
      }

      fillPoly(
        topQuad,
        isHovered ? mixHex(pal.top[lvl], '#ffffff', 0.25) : pal.top[lvl],
        pal.cellStroke
      );
      st.tops.push({ w, d, day, poly: topQuad });
    }
  }, [weeks, isDark, monthMarkers, dayMarkers, stats.busiest.count]);

  const scheduleDraw = useCallback(() => {
    const st = stateRef.current;
    if (st.raf) return;
    const step = (now: number) => {
      st.raf = 0;
      let more = false;
      if (st.t !== st.toT) {
        const p = Math.min(1, (now - st.animStart) / 650);
        const e = easeInOutCubic(p);
        st.t = lerp(st.fromT, st.toT, e);
        if (st.toT === 0) {
          st.yaw = lerp(st.fromYaw, Math.PI / 6, e);
          st.pitch = lerp(st.fromPitch, 0.55, e);
        }
        if (p < 1) more = true;
        else st.t = st.toT;
      }
      drawScene();
      if (more) st.raf = requestAnimationFrame(step);
    };
    st.raf = requestAnimationFrame(step);
  }, [drawScene]);

  useEffect(() => {
    const wrap = scrollWrapRef.current;
    if (!wrap) return;
    const st = stateRef.current;
    const update = () => {
      st.width = wrap.clientWidth;
      st.dpr = Math.min(window.devicePixelRatio || 1, 2);
      drawScene();
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => {
      ro.disconnect();
      if (st.raf) cancelAnimationFrame(st.raf);
    };
  }, [drawScene]);

  const switchMode = (next: '2d' | '3d') => {
    if (next === mode) return;
    const st = stateRef.current;
    st.fromT = st.t;
    st.toT = next === '3d' ? 1 : 0;
    st.fromYaw = st.yaw;
    st.fromPitch = st.pitch;
    st.animStart = performance.now();
    setMode(next);
    scheduleDraw();
  };

  const updateTooltip = (cell: { w: number; d: number } | null) => {
    const tip = tooltipRef.current;
    const wrap = scrollWrapRef.current;
    if (!tip || !wrap) return;
    if (!cell) {
      tip.style.opacity = '0';
      return;
    }
    const found = stateRef.current.tops.find(
      (item) => item.w === cell.w && item.d === cell.d
    );
    if (!found) {
      tip.style.opacity = '0';
      return;
    }
    const dt = fullDateFmt.format(new Date(`${found.day.date}T00:00:00`));
    const label =
      found.day.count === 0
        ? locale === 'id'
          ? `Tidak ada kontribusi pada ${dt}`
          : `No contributions on ${dt}`
        : `${found.day.count} ${
            locale === 'id' ? 'kontribusi pada' : 'contributions on'
          } ${dt}`;

    const textNode = tip.firstChild;
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.nodeValue = label;
    }
    const cx =
      (found.poly[0][0] +
        found.poly[1][0] +
        found.poly[2][0] +
        found.poly[3][0]) /
      4;
    const topY = Math.min(
      found.poly[0][1],
      found.poly[1][1],
      found.poly[2][1],
      found.poly[3][1]
    );
    const wRect = wrap.getBoundingClientRect();
    const tW = tip.offsetWidth;
    const tH = tip.offsetHeight;
    const relX = cx - wrap.scrollLeft;
    const clampedX = Math.max(8, Math.min(wRect.width - tW - 8, relX - tW / 2));
    tip.style.transform = `translate3d(${Math.round(clampedX)}px, ${Math.round(
      topY - tH - 10
    )}px, 0)`;
    tip.style.setProperty(
      '--arrow',
      `${Math.max(10, Math.min(tW - 10, relX - clampedX))}px`
    );
    tip.style.opacity = '1';
  };

  const hitTest = (x: number, y: number) => {
    const tops = stateRef.current.tops;
    for (let i = tops.length - 1; i >= 0; i--) {
      const poly = tops[i].poly;
      let inside = false;
      for (let j = 0, k = poly.length - 1; j < poly.length; k = j++) {
        const [xi, yi] = poly[j];
        const [xk, yk] = poly[k];
        if (yi > y !== yk > y && x < ((xk - xi) * (y - yi)) / (yk - yi) + xi) {
          inside = !inside;
        }
      }
      if (inside) return { w: tops[i].w, d: tops[i].d };
    }
    return null;
  };

  const pal = isDark ? PALETTE.dark : PALETTE.light;

  return (
    <div className="relative w-full bg-bg text-text">
      <header className="mb-3 flex items-center justify-between gap-3">
        <p className="m-0 min-w-0 text-[clamp(0.75rem,3.4vw,0.9375rem)] leading-snug font-normal whitespace-nowrap sm:text-xl">
          <span className="font-semibold tabular-nums">
            {total.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US')}
          </span>{' '}
          {locale === 'id'
            ? 'kontribusi dalam setahun terakhir'
            : 'contributions in the last year'}
        </p>

        <div
          role="group"
          aria-label="Chart view"
          className="relative inline-flex shrink-0 rounded-md border border-border p-0.5"
        >
          <span
            aria-hidden="true"
            className="absolute top-0.5 bottom-0.5 left-0.5 w-8 rounded bg-text transition-transform duration-500"
            style={{
              transform: mode === '3d' ? 'translateX(100%)' : 'translateX(0)',
              transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          />
          <button
            type="button"
            aria-pressed={mode === '2d'}
            aria-label="Flat heat map"
            title="Flat heat map"
            onClick={() => switchMode('2d')}
            className={`relative z-10 grid h-7 w-8 cursor-pointer place-items-center rounded border-0 bg-transparent p-0 transition-colors duration-500 ${
              mode === '2d' ? 'text-bg' : 'text-muted hover:text-text'
            }`}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" fill="currentColor" />
              <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" fill="currentColor" />
              <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" fill="currentColor" />
              <rect x="9" y="9" width="5.5" height="5.5" rx="1" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            aria-pressed={mode === '3d'}
            aria-label="3D skyline"
            title="3D skyline"
            onClick={() => switchMode('3d')}
            className={`relative z-10 grid h-7 w-8 cursor-pointer place-items-center rounded border-0 bg-transparent p-0 transition-colors duration-500 ${
              mode === '3d' ? 'text-bg' : 'text-muted hover:text-text'
            }`}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M8 1.2 14.2 4.6v6.8L8 14.8 1.8 11.4V4.6Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M1.8 4.6 8 8l6.2-3.4M8 8v6.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="relative rounded-md p-px">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-md border border-border"
        />

        <div className="relative px-3 pt-3 sm:px-4 sm:pt-4">
          <div
            ref={scrollWrapRef}
            className={`relative w-full overflow-hidden rounded-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              mode === '2d' ? 'overflow-x-auto' : ''
            }`}
            style={{ height: 150 }}
          >
            <canvas
              ref={canvasRef}
              tabIndex={0}
              role="img"
              aria-label="GitHub contribution chart"
              onPointerDown={(e) => {
                if (stateRef.current.toT < 0.5) return;
                const st = stateRef.current;
                st.dragging = true;
                st.moved = false;
                st.lastX = e.clientX;
                st.lastY = e.clientY;
                e.currentTarget.setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                const st = stateRef.current;
                const rect = e.currentTarget.getBoundingClientRect();
                if (st.dragging) {
                  const dx = e.clientX - st.lastX;
                  const dy = e.clientY - st.lastY;
                  st.lastX = e.clientX;
                  st.lastY = e.clientY;
                  if (Math.abs(dx) + Math.abs(dy) > 2) st.moved = true;
                  st.yaw += dx * 0.009;
                  st.pitch = Math.max(0.28, Math.min(1.15, st.pitch + dy * 0.007));
                  st.hover = null;
                  updateTooltip(null);
                  scheduleDraw();
                  return;
                }
                const hit = hitTest(e.clientX - rect.left, e.clientY - rect.top);
                if (hit?.w !== st.hover?.w || hit?.d !== st.hover?.d) {
                  st.hover = hit;
                  drawScene();
                  updateTooltip(hit);
                }
              }}
              onPointerUp={(e) => {
                const st = stateRef.current;
                if (st.dragging) {
                  st.dragging = false;
                  if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                  }
                }
              }}
              onPointerLeave={() => {
                stateRef.current.hover = null;
                drawScene();
                updateTooltip(null);
              }}
              className={`absolute top-0 left-0 block outline-none ${
                mode === '3d' ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
              style={{
                maxWidth: 'none',
                touchAction: mode === '3d' ? 'none' : 'auto',
              }}
            />
          </div>

          <div
            ref={tooltipRef}
            role="tooltip"
            aria-hidden="true"
            className="pointer-events-none absolute top-3 left-3 z-20 rounded-md bg-text px-2.5 py-1.5 text-xs leading-none whitespace-nowrap text-bg shadow-lg transition-opacity duration-150 sm:top-4 sm:left-4"
            style={{ opacity: 0 }}
          >
            {' '}
            <span
              aria-hidden="true"
              className="absolute top-full h-0 w-0"
              style={{
                left: 'var(--arrow, 50%)',
                marginLeft: -5,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid var(--text)',
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-1 px-3 pt-2 pb-3 text-sm text-muted sm:px-4">
          <span className="mr-1">{locale === 'id' ? 'Sedikit' : 'Less'}</span>
          {([0, 1, 2, 3, 4] as const).map((lvl) => (
            <span
              key={lvl}
              aria-hidden="true"
              className="block size-[11px] rounded-[2px] transition-[background-color] duration-500"
              style={{
                background: pal.top[lvl],
                boxShadow: 'inset 0 0 0 1px rgba(127,127,127,0.12)',
              }}
            />
          ))}
          <span className="ml-1">{locale === 'id' ? 'Banyak' : 'More'}</span>
        </div>

        <div className="grid grid-cols-[repeat(3,auto)] gap-px overflow-hidden rounded-b-[5px] border-t border-border bg-border md:grid-cols-3">
          <div className="flex min-w-0 flex-col bg-bg px-2 py-3 sm:p-4">
            <div className="text-[clamp(0.5rem,2.3vw,0.625rem)] leading-tight font-semibold whitespace-nowrap text-muted uppercase sm:text-xs sm:tracking-wider">
              {locale === 'id' ? 'Hari Tersibuk' : 'Busiest day'}
            </div>
            <div
              className="mt-auto pt-1.5 font-display text-[2rem] leading-none font-bold tabular-nums transition-colors duration-500 sm:text-[2.6rem]"
              style={{ color: pal.stat }}
            >
              {stats.busiest.count}
            </div>
            <div className="mt-1.5 text-xs text-muted tabular-nums sm:text-sm">
              {stats.busiest.date
                ? shortDateFmt.format(new Date(`${stats.busiest.date}T00:00:00`))
                : '—'}
            </div>
          </div>

          <div className="flex min-w-0 flex-col bg-bg px-2 py-3 sm:p-4">
            <div className="text-[clamp(0.5rem,2.3vw,0.625rem)] leading-tight font-semibold whitespace-nowrap text-muted uppercase sm:text-xs sm:tracking-wider">
              {locale === 'id' ? 'Streak Terpanjang' : 'Longest streak'}
            </div>
            <div
              className="mt-auto pt-1.5 font-display text-[2rem] leading-none font-bold tabular-nums transition-colors duration-500 sm:text-[2.6rem]"
              style={{ color: pal.stat }}
            >
              {stats.longest.len}
            </div>
            <div className="mt-1.5 text-xs text-muted tabular-nums sm:text-sm">
              {stats.longest.start
                ? `${shortDateFmt.format(
                    new Date(`${stats.longest.start}T00:00:00`)
                  )} - ${shortDateFmt.format(
                    new Date(`${stats.longest.end}T00:00:00`)
                  )}`
                : '—'}
            </div>
          </div>

          <div className="flex min-w-0 flex-col bg-bg px-2 py-3 sm:p-4">
            <div className="text-[clamp(0.5rem,2.3vw,0.625rem)] leading-tight font-semibold whitespace-nowrap text-muted uppercase sm:text-xs sm:tracking-wider">
              {locale === 'id' ? 'Streak Saat Ini' : 'Current streak'}
            </div>
            <div
              className="mt-auto pt-1.5 font-display text-[2rem] leading-none font-bold tabular-nums transition-colors duration-500 sm:text-[2.6rem]"
              style={{ color: pal.stat }}
            >
              {stats.currentStreak.len}
            </div>
            <div className="mt-1.5 text-xs text-muted tabular-nums sm:text-sm">
              {stats.currentStreak.start
                ? `${shortDateFmt.format(
                    new Date(`${stats.currentStreak.start}T00:00:00`)
                  )} - ${shortDateFmt.format(
                    new Date(`${stats.currentStreak.end}T00:00:00`)
                  )}`
                : '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
