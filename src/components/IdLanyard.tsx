'use client';

import React, { useEffect, useRef } from 'react';
import { playLanyardSound } from '@/lib/audio';
import { PROFILE } from '@/data/portfolio';

const CARD_W = 244;
const CARD_H = 356;

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

export function IdLanyard({
  hint,
  flipHint,
}: {
  hint: string;
  flipHint: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const photoImg = new Image();
    photoImg.crossOrigin = 'anonymous';
    photoImg.src = PROFILE.profilePhoto;
    let photoLoaded = false;
    photoImg.onload = () => {
      photoLoaded = true;
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 400;
    let h = 580;
    let anchorX = w / 2;
    const ropeLen = 190;
    const numPts = 18;
    const segLen = ropeLen / (numPts - 1);

    const pts = Array.from({ length: numPts }, (_, i) => {
      const y = 8 + i * segLen;
      const xOff = reduced ? 0 : Math.sin(i * 0.25) * 18;
      return { x: anchorX + xOff, y, ox: anchorX + xOff * 0.85, oy: y };
    });

    let angle = reduced ? 0 : 0.08;
    let angVel = 0;
    let flip = 0;
    let targetFlip = 0;
    let flipVel = 0;
    let dragging = false;
    let dragOffX = 0;
    let dragOffY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let prevPointerX = 0;
    let downX = 0;
    let downY = 0;
    let downTime = 0;
    let hovering = false;
    let hintAlpha = 1;
    let interacted = false;

    const getCardCenter = () => {
      const tip = pts[numPts - 1];
      const dist = 26 + CARD_H / 2;
      return {
        cx: tip.x - Math.sin(angle) * dist,
        cy: tip.y + Math.cos(angle) * dist,
      };
    };

    const hitCard = (px: number, py: number) => {
      const { cx, cy } = getCardCenter();
      const dx = px - cx;
      const dy = py - cy;
      const c = Math.cos(-angle);
      const s = Math.sin(-angle);
      const lx = dx * c - dy * s;
      const ly = dx * s + dy * c;
      return Math.abs(lx) <= CARD_W / 2 + 12 && Math.abs(ly) <= CARD_H / 2 + 26;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(280, rect.width);
      h = Math.max(520, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const dx = w / 2 - anchorX;
      anchorX = w / 2;
      for (const p of pts) {
        p.x += dx;
        p.ox += dx;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const getLocalPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onPointerDown = (e: PointerEvent) => {
      const pos = getLocalPos(e);
      if (!hitCard(pos.x, pos.y)) return;
      dragging = true;
      interacted = true;
      playLanyardSound('grab');
      const tip = pts[numPts - 1];
      dragOffX = pos.x - tip.x;
      dragOffY = pos.y - tip.y;
      pointerX = pos.x;
      pointerY = pos.y;
      prevPointerX = pos.x;
      downX = pos.x;
      downY = pos.y;
      downTime = performance.now();
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      const pos = getLocalPos(e);
      if (dragging) {
        prevPointerX = pointerX;
        pointerX = pos.x;
        pointerY = pos.y;
        return;
      }
      const hit = hitCard(pos.x, pos.y);
      if (hit !== hovering) {
        hovering = hit;
        canvas.style.cursor = hit ? 'grab' : 'default';
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
      const pos = getLocalPos(e);
      if (
        Math.hypot(pos.x - downX, pos.y - downY) < 7 &&
        performance.now() - downTime < 320
      ) {
        targetFlip = targetFlip === 0 ? Math.PI : 0;
        playLanyardSound('flip');
      } else {
        playLanyardSound('drop');
      }
      hovering = hitCard(pos.x, pos.y);
      canvas.style.cursor = hovering ? 'grab' : 'default';
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    const drawFront = (
      c: CanvasRenderingContext2D,
      isDark: boolean,
      swingAngle: number,
      flipAngle: number
    ) => {
      const wHalf = CARD_W / 2;
      const hHalf = CARD_H / 2;
      c.save();
      roundRectPath(c, -wHalf, -hHalf, CARD_W, CARD_H, 16);
      c.clip();

      const bgGrad = c.createLinearGradient(0, -hHalf, 0, hHalf);
      if (isDark) {
        bgGrad.addColorStop(0, '#18181d');
        bgGrad.addColorStop(1, '#0e0e12');
      } else {
        bgGrad.addColorStop(0, '#ffffff');
        bgGrad.addColorStop(1, '#f3f3f6');
      }
      c.fillStyle = bgGrad;
      c.fillRect(-wHalf, -hHalf, CARD_W, CARD_H);

      c.fillStyle = isDark ? '#ffffff' : '#0a0a0c';
      c.fillRect(-wHalf, -hHalf, CARD_W, 40);

      c.fillStyle = isDark ? '#18181d' : '#ffffff';
      roundRectPath(c, -20, -hHalf + 10, 40, 7, 3.5);
      c.fill();

      c.fillStyle = isDark ? '#0a0a0c' : '#ffffff';
      c.font = '600 9px ui-monospace, SFMono-Regular, Menlo, monospace';
      c.textAlign = 'left';
      c.textBaseline = 'middle';
      c.fillText('VISITOR · PASS', -wHalf + 14, -hHalf + 26);
      c.textAlign = 'right';
      c.fillText('#01', wHalf - 14, -hHalf + 26);

      const photoSize = 158;
      const photoX = -photoSize / 2;
      const photoY = -hHalf + 54;
      c.save();
      roundRectPath(c, photoX, photoY, photoSize, photoSize, 12);
      c.clip();
      if (photoLoaded) {
        const iw = photoImg.naturalWidth || 1;
        const ih = photoImg.naturalHeight || 1;
        const scale = Math.max(photoSize / iw, photoSize / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        c.drawImage(
          photoImg,
          photoX + (photoSize - dw) / 2,
          photoY + (photoSize - dh) / 2,
          dw,
          dh
        );
      } else {
        c.fillStyle = isDark ? '#232329' : '#e5e5ea';
        c.fillRect(photoX, photoY, photoSize, photoSize);
      }
      c.restore();

      c.strokeStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
      c.lineWidth = 1;
      roundRectPath(c, photoX, photoY, photoSize, photoSize, 12);
      c.stroke();

      c.textAlign = 'center';
      c.fillStyle = isDark ? '#f5f5f7' : '#0a0a0c';
      c.font = '700 15.5px system-ui, -apple-system, sans-serif';
      c.fillText(PROFILE.fullName.toUpperCase(), 0, photoY + photoSize + 25);

      c.fillStyle = isDark ? '#9a9aa2' : '#55555c';
      c.font = '500 11px ui-monospace, SFMono-Regular, Menlo, monospace';
      c.fillText('Fullstack Developer', 0, photoY + photoSize + 45);

      c.strokeStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
      c.beginPath();
      c.moveTo(-wHalf + 20, hHalf - 52);
      c.lineTo(wHalf - 20, hHalf - 52);
      c.stroke();

      const pattern = [
        2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2,
        1, 1, 2, 3, 1, 2,
      ];
      const totalBarW = pattern.reduce((a, b) => a + b, 0) + (pattern.length - 1) * 2;
      let bx = -totalBarW / 2;
      const by = hHalf - 42;
      c.fillStyle = isDark ? 'rgba(245,245,247,0.75)' : 'rgba(10,10,12,0.75)';
      for (const bw of pattern) {
        c.fillRect(bx, by, bw, 18);
        bx += bw + 2;
      }

      c.fillStyle = isDark ? '#6e6e77' : '#8a8a92';
      c.font = '500 8.5px ui-monospace, SFMono-Regular, Menlo, monospace';
      c.fillText('ID · RAF-2026-YGY', 0, hHalf - 13);

      const sheenPos = Math.sin(swingAngle * 2.5 + flipAngle) * 70;
      const sheen = c.createLinearGradient(
        -wHalf + sheenPos - 60,
        -hHalf,
        wHalf + sheenPos - 60,
        hHalf
      );
      sheen.addColorStop(0, 'rgba(255,255,255,0)');
      sheen.addColorStop(0.5, isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.45)');
      sheen.addColorStop(1, 'rgba(255,255,255,0)');
      c.fillStyle = sheen;
      c.fillRect(-wHalf, -hHalf, CARD_W, CARD_H);
      c.restore();

      c.strokeStyle = isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.14)';
      c.lineWidth = 1.25;
      roundRectPath(c, -wHalf, -hHalf, CARD_W, CARD_H, 16);
      c.stroke();
    };

    const drawBack = (c: CanvasRenderingContext2D, isDark: boolean) => {
      const wHalf = CARD_W / 2;
      const hHalf = CARD_H / 2;
      c.save();
      roundRectPath(c, -wHalf, -hHalf, CARD_W, CARD_H, 16);
      c.clip();

      c.fillStyle = isDark ? '#121216' : '#f6f6f9';
      c.fillRect(-wHalf, -hHalf, CARD_W, CARD_H);

      c.fillStyle = isDark ? '#050507' : '#1c1c22';
      c.fillRect(-wHalf, -hHalf + 26, CARD_W, 38);

      c.fillStyle = isDark ? '#f5f5f7' : '#0a0a0c';
      c.textAlign = 'center';
      c.font = '700 11px ui-monospace, SFMono-Regular, Menlo, monospace';
      c.fillText('SCAN · PORTFOLIO', 0, -hHalf + 88);

      const qrBox = 148;
      const qx = -qrBox / 2;
      const qy = -hHalf + 102;
      c.fillStyle = '#ffffff';
      roundRectPath(c, qx, qy, qrBox, qrBox, 12);
      c.fill();
      c.strokeStyle = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.1)';
      c.lineWidth = 1;
      roundRectPath(c, qx, qy, qrBox, qrBox, 12);
      c.stroke();

      // Draw crisp deterministic QR pattern inside qrBox
      const grid = 21;
      const pad = 12;
      const cell = (qrBox - pad * 2) / grid;
      c.fillStyle = '#0a0a0c';
      const isFinder = (r: number, col: number) =>
        (r < 7 && col < 7) ||
        (r < 7 && col >= grid - 7) ||
        (r >= grid - 7 && col < 7);
      for (let r = 0; r < grid; r++) {
        for (let col = 0; col < grid; col++) {
          if (isFinder(r, col)) {
            const lr = r < 7 ? r : r - (grid - 7);
            const lc = col < 7 ? col : col - (grid - 7);
            const on =
              lr === 0 ||
              lr === 6 ||
              lc === 0 ||
              lc === 6 ||
              (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4);
            if (on) {
              c.fillRect(qx + pad + col * cell, qy + pad + r * cell, cell + 0.4, cell + 0.4);
            }
          } else if ((r * 17 + col * 31 + r * col) % 3 === 0) {
            c.fillRect(qx + pad + col * cell, qy + pad + r * cell, cell + 0.3, cell + 0.3);
          }
        }
      }

      c.fillStyle = isDark ? '#a0a0aa' : '#52525b';
      c.font = '500 10.5px ui-monospace, SFMono-Regular, Menlo, monospace';
      c.fillText('github.com/Reyyy-05', 0, qy + qrBox + 22);
      c.fillStyle = isDark ? '#70707a' : '#71717a';
      c.font = '500 9.5px ui-monospace, SFMono-Regular, Menlo, monospace';
      c.fillText(PROFILE.email, 0, qy + qrBox + 40);

      c.fillStyle = '#22c55e';
      c.beginPath();
      c.arc(-54, hHalf - 22, 4, 0, 2 * Math.PI);
      c.fill();
      c.fillStyle = isDark ? '#d4d4d8' : '#27272a';
      c.font = '600 9.5px ui-monospace, SFMono-Regular, Menlo, monospace';
      c.fillText('AVAILABLE FOR WORK', 6, hHalf - 19);
      c.restore();

      c.strokeStyle = isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.14)';
      c.lineWidth = 1.25;
      roundRectPath(c, -wHalf, -hHalf, CARD_W, CARD_H, 16);
      c.stroke();
    };

    let raf = 0;
    const step = () => {
      if (!reduced) {
        for (let i = 1; i < numPts; i++) {
          const p = pts[i];
          const vx = (p.x - p.ox) * 0.988;
          const vy = (p.y - p.oy) * 0.988;
          p.ox = p.x;
          p.oy = p.y;
          p.x += vx;
          p.y += vy + 0.55;
        }
        if (dragging) {
          const tip = pts[numPts - 1];
          const tx = Math.max(40, Math.min(w - 40, pointerX - dragOffX));
          const ty = Math.max(40, Math.min(h - CARD_H * 0.55, pointerY - dragOffY));
          tip.x += (tx - tip.x) * 0.45;
          tip.y += (ty - tip.y) * 0.45;
          angVel += (pointerX - prevPointerX) * 0.0022;
        }
        for (let iter = 0; iter < 14; iter++) {
          pts[0].x = anchorX;
          pts[0].y = 8;
          for (let i = 0; i < numPts - 1; i++) {
            const a = pts[i];
            const b = pts[i + 1];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const d = Math.hypot(dx, dy) || 0.0001;
            const diff = (d - segLen) / d;
            if (i === 0) {
              b.x -= dx * diff;
              b.y -= dy * diff;
            } else {
              a.x += dx * diff * 0.5;
              a.y += dy * diff * 0.5;
              b.x -= dx * diff * 0.5;
              b.y -= dy * diff * 0.5;
            }
          }
        }
        const tip = pts[numPts - 1];
        const prev = pts[numPts - 4];
        const ropeAngle = Math.atan2(tip.x - prev.x, tip.y - prev.y);
        angVel += (ropeAngle * 0.55 - angle) * 0.08 - angle * 0.04;
        angVel *= 0.88;
        angle = Math.max(-0.85, Math.min(0.85, angle + angVel));
      }

      flipVel += (targetFlip - flip) * 0.14;
      flipVel *= 0.76;
      flip += flipVel;
      if (interacted && hintAlpha > 0) {
        hintAlpha = Math.max(0, hintAlpha - 0.04);
      }

      const isDark = document.documentElement.classList.contains('dark');
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = isDark ? '#3a3a42' : '#c4c4cc';
      roundRectPath(ctx, anchorX - 22, 0, 44, 10, 4);
      ctx.fill();

      const drawStrap = (xOff: number, col: string) => {
        ctx.beginPath();
        ctx.moveTo(pts[0].x + xOff, pts[0].y);
        for (let i = 1; i < numPts - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2 + xOff;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x + xOff, pts[i].y, xc, yc);
        }
        const last = pts[numPts - 1];
        ctx.lineTo(last.x, last.y);
        ctx.strokeStyle = col;
        ctx.lineWidth = 11;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      };

      drawStrap(-7, isDark ? '#232329' : '#2e2e35');
      drawStrap(7, isDark ? '#2f2f37' : '#18181d');

      const tip = pts[numPts - 1];
      ctx.save();
      ctx.translate(tip.x, tip.y);
      ctx.rotate(angle);
      ctx.strokeStyle = isDark ? '#a1a1aa' : '#52525b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 4, 7, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = isDark ? '#71717a' : '#3f3f46';
      roundRectPath(ctx, -14, 9, 28, 16, 4);
      ctx.fill();

      ctx.translate(0, 26 + CARD_H / 2);
      ctx.shadowColor = isDark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.18)';
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 14;

      const cosFlip = Math.cos(flip);
      const scaleX = Math.max(0.03, Math.abs(cosFlip));
      ctx.scale(scaleX, 1);

      if (cosFlip >= 0) {
        drawFront(ctx, isDark, angle, flip);
      } else {
        drawBack(ctx, isDark);
      }
      ctx.restore();

      if (hintAlpha > 0.01) {
        ctx.save();
        ctx.globalAlpha = hintAlpha * 0.7;
        ctx.fillStyle = isDark ? '#a1a1aa' : '#52525b';
        ctx.font = '500 11px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${hint} · ${flipHint}`, w / 2, h - 10);
        ctx.restore();
      }
      ctx.restore();

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
    };
  }, [hint, flipHint]);

  return (
    <div
      ref={wrapRef}
      className="relative flex h-[540px] w-full select-none items-start justify-center overflow-hidden sm:h-[580px]"
    >
      <canvas
        ref={canvasRef}
        aria-label={`Interactive ID card of ${PROFILE.fullName}`}
        className="block touch-none"
      />
    </div>
  );
}
