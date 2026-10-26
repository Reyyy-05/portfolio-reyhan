'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { SKILLS, type SkillItem } from '@/data/portfolio';
import { useLocale } from '@/context/LocaleContext';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const PERSPECTIVE = 2.6;

function normalizeAngle(rad: number) {
  const twoPi = 2 * Math.PI;
  return ((((rad + Math.PI) % twoPi) + twoPi) % twoPi) - Math.PI;
}

function fibonacciSphere(n: number) {
  if (n === 1) return [{ x: 0, y: 0, z: 1 }];
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
}

function rotatePoint(
  p: { x: number; y: number; z: number },
  rx: number,
  ry: number
) {
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x1 = p.x * cy + p.z * sy;
  const z1 = -p.x * sy + p.z * cy;
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  return {
    x: x1,
    y: p.y * cx - z1 * sx,
    z: p.y * sx + z1 * cx,
  };
}

export function SkillGlobe() {
  const { locale } = useLocale();
  const baseId = useId();
  const detailId = `${baseId}-detail`;
  const menuId = `${baseId}-menu`;

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of SKILLS) {
      const cat = s.category[locale];
      map.set(cat, (map.get(cat) ?? 0) + 1);
    }
    return Array.from(map, ([name, count]) => ({ name, count }));
  }, [locale]);

  // Reset activeCategory if locale changes and category name no longer matches
  useEffect(() => {
    setActiveCategory(null);
  }, [locale]);

  const visibleItems = useMemo(() => {
    const list: { item: SkillItem; index: number }[] = [];
    SKILLS.forEach((item, index) => {
      if (activeCategory === null || item.category[locale] === activeCategory) {
        list.push({ item, index });
      }
    });
    return list;
  }, [activeCategory, locale]);

  const spherePoints = useMemo(() => {
    const pts = fibonacciSphere(visibleItems.length);
    const map = new Map<number, { x: number; y: number; z: number }>();
    visibleItems.forEach((v, i) => {
      map.set(v.index, pts[i]);
    });
    return map;
  }, [visibleItems]);

  const edges = useMemo(() => {
    const pts = visibleItems.map((v) => spherePoints.get(v.index)!);
    const n = pts.length;
    if (n < 2) return [];
    const k = Math.min(3, n - 1);
    const set = new Set<string>();
    const res: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const dists: { j: number; d: number }[] = [];
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dz = pts[i].z - pts[j].z;
        dists.push({ j, d: dx * dx + dy * dy + dz * dz });
      }
      dists.sort((a, b) => a.d - b.d);
      for (let m = 0; m < k; m++) {
        const j = dists[m].j;
        const a = Math.min(i, j);
        const b = Math.max(i, j);
        const key = `${a}-${b}`;
        if (!set.has(key)) {
          set.add(key);
          res.push([a, b]);
        }
      }
    }
    return res;
  }, [visibleItems, spherePoints]);

  const stateRef = useRef({
    rx: 0.25,
    ry: 0,
    vx: 0,
    vy: 0.0035,
    target: null as { rx: number; ry: number } | null,
    dragging: false,
    moved: false,
    hovering: false,
    reduced: false,
    visible: true,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const focusSkill = (skillName: string) => {
    const idx = SKILLS.findIndex((s) => s.name === skillName);
    const pt = spherePoints.get(idx);
    if (!pt) return;
    const ry = Math.atan2(-pt.x, pt.z);
    const zRot = -pt.x * Math.sin(ry) + pt.z * Math.cos(ry);
    const rx = Math.atan2(pt.y, zRot);
    const st = stateRef.current;
    st.target = {
      rx,
      ry: st.ry + normalizeAngle(ry - st.ry),
    };
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext('2d');
    const st = stateRef.current;
    st.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let strokeRgb = '160, 160, 160';

    const updateSize = () => {
      const rect = stage.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
    };

    const updateStrokeColor = () => {
      const probe = document.createElement('span');
      probe.style.color = 'var(--border-strong)';
      document.body.appendChild(probe);
      const m = getComputedStyle(probe).color.match(/\d+/g);
      probe.remove();
      if (m && m.length >= 3) {
        strokeRgb = `${m[0]}, ${m[1]}, ${m[2]}`;
      }
    };

    updateSize();
    updateStrokeColor();

    const ro = new ResizeObserver(updateSize);
    ro.observe(stage);

    const mo = new MutationObserver(updateStrokeColor);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        st.visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(stage);

    const projected: { sx: number; sy: number; z: number }[] = [];
    let raf = 0;

    const renderFrame = () => {
      if (st.visible) {
        if (!st.dragging) {
          if (st.target) {
            const dx = st.target.rx - st.rx;
            const dy = normalizeAngle(st.target.ry - st.ry);
            st.rx += 0.12 * dx;
            st.ry += 0.12 * dy;
            if (Math.abs(dx) < 0.002 && Math.abs(dy) < 0.002) {
              st.rx = st.target.rx;
              st.ry = st.target.ry;
              st.target = null;
              st.vx = 0;
              st.vy = st.reduced ? 0 : 0.0035;
            }
          } else if (!st.reduced) {
            const targetVy = st.hovering ? 0.000875 : 0.0035;
            st.vy += (targetVy - st.vy) * 0.05;
            st.vx *= 0.94;
            st.rx = Math.max(-1.2, Math.min(1.2, st.rx + st.vx));
            st.ry += st.vy;
          }
        }

        const nVis = visibleItems.length;
        const boost =
          nVis <= 4 ? 1.25 : nVis <= 8 ? 1.12 : 1;

        for (let i = 0; i < SKILLS.length; i++) {
          const btn = itemRefs.current[i];
          if (!btn) continue;
          const pt = spherePoints.get(i);
          if (!pt) {
            btn.style.setProperty('--x', '0');
            btn.style.setProperty('--y', '0');
            btn.style.setProperty('--s', '0');
            btn.style.setProperty('--o', '0');
            btn.style.setProperty('--lo', '0');
            btn.style.zIndex = '0';
            btn.inert = true;
            continue;
          }
          const rot = rotatePoint(pt, st.rx, st.ry);
          const persp = PERSPECTIVE / (PERSPECTIVE - rot.z);
          const depth = (rot.z + 1) / 2;
          const scale = (0.44 + 0.52 * depth) * boost;
          const opacity = 0.18 + 0.82 * depth;
          const isFront = rot.z > -0.15;

          btn.style.setProperty('--x', (rot.x * persp).toFixed(4));
          btn.style.setProperty('--y', (rot.y * persp).toFixed(4));
          btn.style.setProperty('--s', scale.toFixed(3));
          btn.style.setProperty('--o', opacity.toFixed(3));
          btn.style.setProperty('--lo', depth > 0.62 ? '1' : '0');
          btn.style.zIndex = String(Math.round(100 * depth));
          btn.inert = !isFront;
        }

        if (ctx && w > 0) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, w, h);
          const cx = w / 2;
          const cy = h / 2;
          const radius = 0.37 * w;

          projected.length = visibleItems.length;
          for (let i = 0; i < visibleItems.length; i++) {
            const pt = spherePoints.get(visibleItems[i].index)!;
            const rot = rotatePoint(pt, st.rx, st.ry);
            const persp = PERSPECTIVE / (PERSPECTIVE - rot.z);
            projected[i] = {
              sx: cx + rot.x * persp * radius,
              sy: cy + rot.y * persp * radius,
              z: rot.z,
            };
          }

          ctx.lineWidth = 1;
          for (let i = 0; i < edges.length; i++) {
            const [aIdx, bIdx] = edges[i];
            const a = projected[aIdx];
            const b = projected[bIdx];
            if (!a || !b) continue;
            const avgZ = (a.z + b.z) * 0.5;
            if (avgZ < -0.55) continue;
            const alpha = ((avgZ + 0.55) / 1.55) * 0.32;
            ctx.strokeStyle = `rgba(${strokeRgb}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(renderFrame);
    };

    raf = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
    };
  }, [spherePoints, visibleItems, edges]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const st = stateRef.current;
    st.dragging = true;
    st.moved = false;
    st.target = null;
    st.startX = e.clientX;
    st.startY = e.clientY;
    st.lastX = e.clientX;
    st.lastY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = stateRef.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    const dy = e.clientY - st.lastY;
    st.lastX = e.clientX;
    st.lastY = e.clientY;
    if (
      !st.moved &&
      Math.hypot(e.clientX - st.startX, e.clientY - st.startY) > 6
    ) {
      st.moved = true;
      stageRef.current?.setAttribute('data-dragging', '');
    }
    if (st.moved) {
      st.vy = dx * 0.006;
      st.vx = -dy * 0.006;
      st.ry += st.vy;
      st.rx = Math.max(-1.2, Math.min(1.2, st.rx + st.vx));
    }
  };

  const handlePointerUp = () => {
    const st = stateRef.current;
    if (st.dragging) {
      st.dragging = false;
      stageRef.current?.removeAttribute('data-dragging');
    }
  };

  const activeSkillItem = selectedSkill
    ? SKILLS.find((s) => s.name === selectedSkill)
    : null;

  const allLabel = locale === 'id' ? 'Semua' : 'All';
  const categoryLabel = locale === 'id' ? 'Kategori' : 'Category';

  return (
    <div className="flex flex-col items-center">
      <div
        ref={stageRef}
        role="group"
        aria-label="Skill globe"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => {
          stateRef.current.hovering = true;
        }}
        onPointerLeave={() => {
          stateRef.current.hovering = false;
          handlePointerUp();
        }}
        className="globe-stage"
      >
        <canvas ref={canvasRef} aria-hidden="true" className="globe-canvas" />
        {SKILLS.map((skill, idx) => {
          const isSelected = selectedSkill === skill.name;
          return (
            <button
              key={skill.name}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              type="button"
              className="globe-item"
              aria-pressed={isSelected}
              aria-controls={detailId}
              style={
                {
                  '--cat': 'var(--note)',
                  '--logo': skill.color,
                } as React.CSSProperties
              }
              onClick={() => {
                if (stateRef.current.moved) {
                  stateRef.current.moved = false;
                  return;
                }
                const next = isSelected ? null : skill.name;
                setSelectedSkill(next);
                if (next) focusSkill(next);
              }}
            >
              <span className="globe-logo">
                <img
                  src={skill.icon}
                  alt=""
                  width={32}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  data-invert-dark={skill.invertDark ? '' : undefined}
                />
              </span>
              <span className="globe-name" aria-hidden="true">
                {skill.name}
              </span>
              <span className="sr-only">
                {skill.name}, {skill.category[locale]}
              </span>
            </button>
          );
        })}
      </div>

      <div ref={filterRef} className="globe-filter">
        <button
          type="button"
          className="globe-filter-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="globe-filter-label">{categoryLabel}</span>
          {activeCategory ?? allLabel}
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M2 4l4 4 4-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </button>

        <div
          id={menuId}
          role="group"
          aria-label="Skill categories"
          data-open={menuOpen ? '' : undefined}
          className="globe-filter-menu"
        >
          <button
            type="button"
            aria-pressed={activeCategory === null}
            onClick={() => {
              setActiveCategory(null);
              setSelectedSkill(null);
              setMenuOpen(false);
              stateRef.current.target = null;
            }}
          >
            {allLabel}
            <span className="globe-filter-count">{SKILLS.length}</span>
          </button>
          {categories.map((cat) => {
            const isPressed = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                aria-pressed={isPressed}
                onClick={() => {
                  const next = isPressed ? null : cat.name;
                  setActiveCategory(next);
                  setSelectedSkill(null);
                  setMenuOpen(false);
                  stateRef.current.target = null;
                }}
              >
                {cat.name}
                <span className="globe-filter-count">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div id={detailId} className="mt-6 min-h-36 text-center md:min-h-32">
        {activeSkillItem && (
          <div
            key={activeSkillItem.name}
            className="globe-detail mx-auto max-w-md rounded-xl border border-border bg-surface px-5 py-4"
          >
            <div className="flex items-center justify-center gap-2.5">
              <img
                src={activeSkillItem.icon}
                alt=""
                width={20}
                height={20}
                decoding="async"
                data-invert-dark={activeSkillItem.invertDark ? '' : undefined}
                className="globe-detail-logo size-5 shrink-0 object-contain"
              />
              <p className="font-semibold text-text">{activeSkillItem.name}</p>
              <span className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-muted">
                {activeSkillItem.category[locale]}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">
              {activeSkillItem.desc[locale]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
