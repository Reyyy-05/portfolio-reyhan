'use client';

import React, { useEffect, useRef } from 'react';
import { NeuralVortexBackground } from './NeuralVortexBackground';
import { useLocale } from '@/context/LocaleContext';
import { PROFILE } from '@/data/portfolio';

const VERT_SRC = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG_HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 outColor;
uniform vec2 uTexel;
`;

const SPLAT_SRC = `${FRAG_HEAD}
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec2 uPoint;
uniform float uRadius;
uniform vec3 uValue;
uniform float uCap;
void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  vec3 add = exp(-dot(p, p) / uRadius) * uValue;
  vec3 base = texture(uTarget, vUv).xyz;
  outColor = vec4(min(base + add, vec3(uCap)), 1.0);
}`;

const ADVECT_SRC = `${FRAG_HEAD}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uSimTexel;
uniform float uDt;
uniform float uDissipation;
void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uSimTexel;
  outColor = texture(uSource, coord) / (1.0 + uDissipation * uDt);
}`;

const CURL_SRC = `${FRAG_HEAD}
uniform sampler2D uVelocity;
void main() {
  float l = texture(uVelocity, vUv - vec2(uTexel.x, 0.0)).y;
  float r = texture(uVelocity, vUv + vec2(uTexel.x, 0.0)).y;
  float b = texture(uVelocity, vUv - vec2(0.0, uTexel.y)).x;
  float t = texture(uVelocity, vUv + vec2(0.0, uTexel.y)).x;
  outColor = vec4(0.5 * (r - l - t + b), 0.0, 0.0, 1.0);
}`;

const VORTICITY_SRC = `${FRAG_HEAD}
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float uCurlStrength;
uniform float uDt;
void main() {
  float l = texture(uCurl, vUv - vec2(uTexel.x, 0.0)).x;
  float r = texture(uCurl, vUv + vec2(uTexel.x, 0.0)).x;
  float b = texture(uCurl, vUv - vec2(0.0, uTexel.y)).x;
  float t = texture(uCurl, vUv + vec2(0.0, uTexel.y)).x;
  float c = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(t) - abs(b), abs(r) - abs(l));
  force /= length(force) + 0.0001;
  force *= uCurlStrength * c;
  force.y *= -1.0;
  vec2 v = texture(uVelocity, vUv).xy + force * uDt;
  outColor = vec4(clamp(v, -1000.0, 1000.0), 0.0, 1.0);
}`;

const DIVERGENCE_SRC = `${FRAG_HEAD}
uniform sampler2D uVelocity;
void main() {
  float l = texture(uVelocity, vUv - vec2(uTexel.x, 0.0)).x;
  float r = texture(uVelocity, vUv + vec2(uTexel.x, 0.0)).x;
  float b = texture(uVelocity, vUv - vec2(0.0, uTexel.y)).y;
  float t = texture(uVelocity, vUv + vec2(0.0, uTexel.y)).y;
  outColor = vec4(0.5 * (r - l + t - b), 0.0, 0.0, 1.0);
}`;

const PRESSURE_SRC = `${FRAG_HEAD}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float l = texture(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
  float r = texture(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
  float b = texture(uPressure, vUv - vec2(0.0, uTexel.y)).x;
  float t = texture(uPressure, vUv + vec2(0.0, uTexel.y)).x;
  float d = texture(uDivergence, vUv).x;
  outColor = vec4((l + r + b + t - d) * 0.25, 0.0, 0.0, 1.0);
}`;

const GRADIENT_SRC = `${FRAG_HEAD}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float l = texture(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
  float r = texture(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
  float b = texture(uPressure, vUv - vec2(0.0, uTexel.y)).x;
  float t = texture(uPressure, vUv + vec2(0.0, uTexel.y)).x;
  vec2 v = texture(uVelocity, vUv).xy - 0.5 * vec2(r - l, t - b);
  outColor = vec4(v, 0.0, 1.0);
}`;

const FADE_SRC = `${FRAG_HEAD}
uniform sampler2D uSource;
uniform float uFactor;
void main() {
  outColor = texture(uSource, vUv) * uFactor;
}`;

const DISPLAY_SRC = `${FRAG_HEAD}
uniform sampler2D uDye;
uniform sampler2D uLayer;
uniform float uEdge;
uniform float uSoft;
uniform float uGrain;
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
void main() {
  float d = texture(uDye, vUv).x;
  float n = noise(gl_FragCoord.xy / 3.0) - 0.5;
  float e = uEdge + n * uGrain;
  float a = smoothstep(e - uSoft, e + uSoft, d);
  outColor = texture(uLayer, vUv) * a;
}`;

const SWEEP_POINTS = [
  { x: 360 / 1120, y: 372 / 1100 },
  { x: 540 / 1120, y: 380 / 1100 },
  { x: 720 / 1120, y: 372 / 1100 },
];

type FluidOptions = { life: number; swirl: number; grain: number };

function createFluidEngine(canvas: HTMLCanvasElement, initialOpts: FluidOptions) {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
  });
  if (!gl || (!gl.getExtension('EXT_color_buffer_float') && !gl.getExtension('EXT_color_buffer_half_float'))) {
    return null;
  }

  const opts = { ...initialOpts };

  const compileShader = (type: number, source: string) => {
    const sh = gl.createShader(type);
    if (!sh) throw new Error('shader');
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error('shader');
    return sh;
  };

  let vertShader: WebGLShader;
  try {
    vertShader = compileShader(gl.VERTEX_SHADER, VERT_SRC);
  } catch {
    return null;
  }

  const createProgram = (fragSrc: string) => {
    const program = gl.createProgram();
    if (!program) throw new Error('link');
    gl.attachShader(program, vertShader);
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragSrc));
    gl.bindAttribLocation(program, 0, 'aPos');
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link');
    const u: Record<string, WebGLUniformLocation | null> = {};
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) u[info.name] = gl.getUniformLocation(program, info.name);
    }
    return { program, u };
  };

  let progs: Record<string, { program: WebGLProgram; u: Record<string, WebGLUniformLocation | null> }>;
  try {
    progs = {
      splat: createProgram(SPLAT_SRC),
      advect: createProgram(ADVECT_SRC),
      curl: createProgram(CURL_SRC),
      vorticity: createProgram(VORTICITY_SRC),
      divergence: createProgram(DIVERGENCE_SRC),
      pressure: createProgram(PRESSURE_SRC),
      gradient: createProgram(GRADIENT_SRC),
      fade: createProgram(FADE_SRC),
      display: createProgram(DISPLAY_SRC),
    };
  } catch {
    return null;
  }

  const quadBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  type FBO = { tex: WebGLTexture | null; fbo: WebGLFramebuffer | null; w: number; h: number };
  type DoubleFBO = { read: FBO; write: FBO; swap: () => void };

  const createFBO = (w: number, h: number, internalFormat: number, format: number): FBO => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, gl.HALF_FLOAT, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { tex, fbo, w, h };
  };

  const createDoubleFBO = (w: number, h: number, internalFormat: number, format: number): DoubleFBO => {
    const pair: DoubleFBO = {
      read: createFBO(w, h, internalFormat, format),
      write: createFBO(w, h, internalFormat, format),
      swap() {
        const tmp = pair.read;
        pair.read = pair.write;
        pair.write = tmp;
      },
    };
    return pair;
  };

  const deleteFBO = (f: FBO) => {
    gl.deleteTexture(f.tex);
    gl.deleteFramebuffer(f.fbo);
  };

  let velocity: DoubleFBO | null = null;
  let dye: DoubleFBO | null = null;
  let pressure: DoubleFBO | null = null;
  let divergence: FBO | null = null;
  let curl: FBO | null = null;
  let viewW = 1;
  let viewH = 1;

  const layerTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, layerTex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));

  let texUnit = 0;
  const bindTex = (tex: WebGLTexture | null) => {
    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    return texUnit++;
  };

  const useProg = (
    p: { program: WebGLProgram; u: Record<string, WebGLUniformLocation | null> },
    target: FBO | null,
    texelRef?: FBO
  ) => {
    texUnit = 0;
    gl.useProgram(p.program);
    const w = target ? target.w : canvas.width;
    const h = target ? target.h : canvas.height;
    gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fbo : null);
    gl.viewport(0, 0, w, h);
    const ref = texelRef ?? target;
    if (p.u.uTexel && ref) {
      gl.uniform2f(p.u.uTexel, 1 / ref.w, 1 / ref.h);
    }
    return p.u;
  };

  const drawQuad = () => gl.drawArrays(gl.TRIANGLES, 0, 3);

  return {
    resize(w: number, h: number, dpr: number) {
      viewW = Math.max(1, w);
      viewH = Math.max(1, h);
      canvas.width = Math.max(1, Math.round(viewW * dpr));
      canvas.height = Math.max(1, Math.round(viewH * dpr));
      const minSide = Math.min(viewW, viewH);
      const simW = Math.max(16, Math.round((128 * viewW) / minSide));
      const simH = Math.max(16, Math.round((128 * viewH) / minSide));
      const dyeScale = Math.min(0.5, 1024 / Math.max(viewW, viewH));
      const dyeW = Math.max(16, Math.round(viewW * dyeScale));
      const dyeH = Math.max(16, Math.round(viewH * dyeScale));

      for (const df of [velocity, dye, pressure]) {
        if (df) {
          deleteFBO(df.read);
          deleteFBO(df.write);
        }
      }
      for (const sf of [divergence, curl]) {
        if (sf) deleteFBO(sf);
      }

      velocity = createDoubleFBO(simW, simH, gl.RG16F, gl.RG);
      pressure = createDoubleFBO(simW, simH, gl.R16F, gl.RED);
      divergence = createFBO(simW, simH, gl.R16F, gl.RED);
      curl = createFBO(simW, simH, gl.R16F, gl.RED);
      dye = createDoubleFBO(dyeW, dyeH, gl.R16F, gl.RED);
    },

    splat(x: number, y: number, radius: number, vx: number, vy: number) {
      if (!velocity || !dye) return;
      const pt: [number, number] = [x / viewW, 1 - y / viewH];
      const rNorm = radius / viewH / Math.sqrt(Math.log(5));
      const aspect = viewW / viewH;
      const sx = velocity.read.w / viewW;
      const sy = velocity.read.h / viewH;

      let u = useProg(progs.splat, velocity.write);
      gl.uniform1i(u.uTarget, bindTex(velocity.read.tex));
      gl.uniform1f(u.uAspect, aspect);
      gl.uniform2f(u.uPoint, pt[0], pt[1]);
      gl.uniform1f(u.uRadius, rNorm * rNorm);
      gl.uniform3f(u.uValue, vx * sx, -vy * sy, 0);
      gl.uniform1f(u.uCap, 1e4);
      drawQuad();
      velocity.swap();

      u = useProg(progs.splat, dye.write);
      gl.uniform1i(u.uTarget, bindTex(dye.read.tex));
      gl.uniform1f(u.uAspect, aspect);
      gl.uniform2f(u.uPoint, pt[0], pt[1]);
      gl.uniform1f(u.uRadius, rNorm * rNorm);
      gl.uniform3f(u.uValue, 1.5, 0, 0);
      gl.uniform1f(u.uCap, 1.5);
      drawQuad();
      dye.swap();
    },

    setLayer(imgCanvas: HTMLCanvasElement) {
      gl.bindTexture(gl.TEXTURE_2D, layerTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgCanvas);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    },

    step(dt: number) {
      if (!velocity || !dye || !pressure || !divergence || !curl) return;
      gl.disable(gl.BLEND);

      let u = useProg(progs.curl, curl);
      gl.uniform1i(u.uVelocity, bindTex(velocity.read.tex));
      drawQuad();

      u = useProg(progs.vorticity, velocity.write);
      gl.uniform1i(u.uVelocity, bindTex(velocity.read.tex));
      gl.uniform1i(u.uCurl, bindTex(curl.tex));
      gl.uniform1f(u.uCurlStrength, opts.swirl);
      gl.uniform1f(u.uDt, dt);
      drawQuad();
      velocity.swap();

      u = useProg(progs.divergence, divergence);
      gl.uniform1i(u.uVelocity, bindTex(velocity.read.tex));
      drawQuad();

      u = useProg(progs.fade, pressure.write);
      gl.uniform1i(u.uSource, bindTex(pressure.read.tex));
      gl.uniform1f(u.uFactor, 0.8);
      drawQuad();
      pressure.swap();

      for (let i = 0; i < 18; i++) {
        u = useProg(progs.pressure, pressure.write);
        gl.uniform1i(u.uPressure, bindTex(pressure.read.tex));
        gl.uniform1i(u.uDivergence, bindTex(divergence.tex));
        drawQuad();
        pressure.swap();
      }

      u = useProg(progs.gradient, velocity.write);
      gl.uniform1i(u.uPressure, bindTex(pressure.read.tex));
      gl.uniform1i(u.uVelocity, bindTex(velocity.read.tex));
      drawQuad();
      velocity.swap();

      u = useProg(progs.advect, velocity.write);
      gl.uniform1i(u.uVelocity, bindTex(velocity.read.tex));
      gl.uniform1i(u.uSource, bindTex(velocity.read.tex));
      gl.uniform2f(u.uSimTexel, 1 / velocity.read.w, 1 / velocity.read.h);
      gl.uniform1f(u.uDt, dt);
      gl.uniform1f(u.uDissipation, 2.5);
      drawQuad();
      velocity.swap();

      u = useProg(progs.advect, dye.write);
      gl.uniform1i(u.uVelocity, bindTex(velocity.read.tex));
      gl.uniform1i(u.uSource, bindTex(dye.read.tex));
      gl.uniform2f(u.uSimTexel, 1 / velocity.read.w, 1 / velocity.read.h);
      gl.uniform1f(u.uDt, dt);
      gl.uniform1f(u.uDissipation, Math.log(3.3333333333333335) / Math.max(0.05, opts.life));
      drawQuad();
      dye.swap();
    },

    render() {
      if (!dye) return;
      const u = useProg(progs.display, null);
      gl.uniform1i(u.uDye, bindTex(dye.read.tex));
      gl.uniform1i(u.uLayer, bindTex(layerTex));
      gl.uniform1f(u.uEdge, 0.3);
      gl.uniform1f(u.uSoft, 0.035);
      gl.uniform1f(u.uGrain, opts.grain);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      drawQuad();
    },

    clear() {
      for (const df of [velocity, dye, pressure]) {
        if (df) {
          for (const target of [df.read, df.write]) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
          }
        }
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },

    setOptions(nextOpts: FluidOptions) {
      Object.assign(opts, nextOpts);
    },

    dispose() {
      for (const df of [velocity, dye, pressure]) {
        if (df) {
          deleteFBO(df.read);
          deleteFBO(df.write);
        }
      }
      for (const sf of [divergence, curl]) {
        if (sf) deleteFBO(sf);
      }
      gl.deleteTexture(layerTex);
      gl.deleteBuffer(quadBuf);
      for (const p of Object.values(progs)) {
        gl.deleteProgram(p.program);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}

export function Hero() {
  const { locale } = useLocale();
  const maskRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const host = maskRef.current;
    let canvas = canvasRef.current;
    const portraitImg = host?.querySelector('figure img') as HTMLImageElement | null;
    if (!host || !canvas || !portraitImg) return;

    const backSrc = PROFILE.heroArmor;
    const bleed = { x: 0, top: 0 };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const layerCanvas = document.createElement('canvas');
    const layerCtx = layerCanvas.getContext('2d');
    const silhouetteCanvas = document.createElement('canvas');
    const silhouetteCtx = silhouetteCanvas.getContext('2d');
    if (!layerCtx || !silhouetteCtx) return;

    const getOptions = (): FluidOptions => ({
      life: reducedMotion.matches ? 0.3 : 2.2,
      swirl: reducedMotion.matches ? 0 : 28,
      grain: 0.05,
    });

    let fluid: ReturnType<typeof createFluidEngine> = null;
    const probeGl = document.createElement('canvas').getContext('webgl2');
    if (
      probeGl &&
      (probeGl.getExtension('EXT_color_buffer_float') || probeGl.getExtension('EXT_color_buffer_half_float'))
    ) {
      fluid = createFluidEngine(canvas, getOptions());
      if (!fluid) {
        const clone = canvas.cloneNode() as HTMLCanvasElement;
        canvas.replaceWith(clone);
        canvas = clone;
      }
    }
    probeGl?.getExtension('WEBGL_lose_context')?.loseContext();

    const targetCanvas = canvas;
    const ctx2d = fluid ? null : targetCanvas.getContext('2d');
    const mask2dCanvas = document.createElement('canvas');
    const mask2dCtx = fluid ? null : mask2dCanvas.getContext('2d');
    if (!fluid && (!ctx2d || !mask2dCtx)) return;

    let backImage: HTMLImageElement | null = null;
    let blobs: { x: number; y: number; r: number; life: number }[] = [];
    let lastPt: { x: number; y: number; t: number } | null = null;
    let viewW = 0;
    let viewH = 0;
    let dpr = 1;
    let raf = 0;
    let lastFrameTime = 0;
    let lastSplatTime = -Infinity;
    let layerDirty = true;
    let disposed = false;
    let backRequested = false;
    let pendingAutoSweep = false;

    const loadBackImage = () => {
      if (backRequested || disposed) return;
      backRequested = true;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (!disposed) {
          backImage = img;
          layerDirty = true;
          if (blobs.length > 0 || performance.now() - lastSplatTime < 3000) {
            scheduleFrame();
          }
          if (pendingAutoSweep) {
            pendingAutoSweep = false;
            runAutoSweep();
          }
        }
      };
      img.src = backSrc;
    };

    const preloadTimer = window.setTimeout(loadBackImage, 800);

    const rebuildLayer = () => {
      layerDirty = false;
      layerCtx.setTransform(1, 0, 0, 1, 0, 0);
      layerCtx.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
      if (!backImage) return;

      layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cs = getComputedStyle(host);
      const hostRect = host.getBoundingClientRect();
      const imgRect = portraitImg.getBoundingClientRect();
      const left = imgRect.left - hostRect.left;
      const top = imgRect.top - hostRect.top;

      layerCtx.save();
      layerCtx.drawImage(
        backImage,
        left - imgRect.width * bleed.x,
        top - imgRect.height * bleed.top,
        imgRect.width * (1 + 2 * bleed.x),
        imgRect.height * (1 + bleed.top)
      );

      const fadePct = parseFloat(cs.getPropertyValue('--hero-fade')) / 100 || 0;
      if (fadePct > 0) {
        const fadeStart = top + imgRect.height * (1 - fadePct);
        const grad = layerCtx.createLinearGradient(0, fadeStart, 0, top + imgRect.height);
        grad.addColorStop(0, 'rgb(0 0 0 / 0)');
        grad.addColorStop(0.5, 'rgb(0 0 0 / 0.55)');
        grad.addColorStop(0.92, 'rgb(0 0 0 / 1)');
        layerCtx.globalCompositeOperation = 'destination-out';
        layerCtx.fillStyle = grad;
        layerCtx.fillRect(
          left - imgRect.width * bleed.x,
          fadeStart,
          imgRect.width * (1 + 2 * bleed.x),
          top + imgRect.height - fadeStart
        );
        layerCtx.globalCompositeOperation = 'source-over';
      }

      const trailColor = cs.getPropertyValue('--hero-trail').trim();
      if (trailColor) {
        layerCtx.globalCompositeOperation = 'destination-over';
        layerCtx.fillStyle = trailColor;
        layerCtx.fillRect(0, 0, viewW, viewH);
      }

      silhouetteCtx.setTransform(1, 0, 0, 1, 0, 0);
      silhouetteCtx.clearRect(0, 0, silhouetteCanvas.width, silhouetteCanvas.height);
      silhouetteCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      silhouetteCtx.globalCompositeOperation = 'source-over';
      silhouetteCtx.drawImage(portraitImg, left, top, imgRect.width, imgRect.height);
      silhouetteCtx.globalCompositeOperation = 'source-in';
      silhouetteCtx.fillStyle = getComputedStyle(document.body).backgroundColor;
      silhouetteCtx.fillRect(0, 0, viewW, viewH);

      layerCtx.setTransform(1, 0, 0, 1, 0, 0);
      layerCtx.globalCompositeOperation = 'destination-over';
      layerCtx.drawImage(silhouetteCanvas, 0, 0);
      layerCtx.globalCompositeOperation = 'source-over';
      layerCtx.restore();

      fluid?.setLayer(layerCanvas);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      viewW = rect.width;
      viewH = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      for (const c of [layerCanvas, silhouetteCanvas]) {
        c.width = Math.round(viewW * dpr);
        c.height = Math.round(viewH * dpr);
      }
      if (fluid) {
        fluid.resize(viewW, viewH, dpr);
      } else {
        targetCanvas.width = Math.round(viewW * dpr);
        targetCanvas.height = Math.round(viewH * dpr);
        mask2dCanvas.width = Math.max(1, Math.round(0.5 * viewW));
        mask2dCanvas.height = Math.max(1, Math.round(0.5 * viewH));
      }
      layerDirty = true;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const mo = new MutationObserver(() => {
      layerDirty = true;
      if (fluid && performance.now() - lastSplatTime < 4000) {
        scheduleFrame();
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onMotionChange = () => fluid?.setOptions(getOptions());
    reducedMotion.addEventListener('change', onMotionChange);

    const splat = (x: number, y: number, scale = 1, vx = 0, vy = 0) => {
      const r = Math.min(30, Math.max(18, 0.045 * Math.min(viewW, viewH))) * scale;
      lastSplatTime = performance.now();
      if (fluid) {
        fluid.splat(x, y, 1.05 * r, 0.2 * vx, 0.2 * vy);
      } else {
        blobs.push({ x, y, r, life: 1 });
        if (blobs.length > 260) blobs.splice(0, blobs.length - 260);
      }
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      const lifeSec = reducedMotion.matches ? 0.3 : 2.2;

      if (fluid) {
        if (dt > 0) {
          if (layerDirty && backImage) rebuildLayer();
          fluid.step(dt);
          fluid.render();
        }
        if (now - lastSplatTime > 1000 * lifeSec * 1.6 + 400) {
          fluid.clear();
        } else {
          raf = requestAnimationFrame(tick);
        }
        return;
      }

      for (const b of blobs) {
        b.life -= dt / lifeSec;
      }
      blobs = blobs.filter((b) => b.life > 0);

      if (ctx2d && mask2dCtx) {
        ctx2d.setTransform(1, 0, 0, 1, 0, 0);
        ctx2d.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
        if (blobs.length !== 0 && backImage) {
          if (layerDirty) rebuildLayer();
          mask2dCtx.setTransform(1, 0, 0, 1, 0, 0);
          mask2dCtx.clearRect(0, 0, mask2dCanvas.width, mask2dCanvas.height);
          mask2dCtx.setTransform(0.5, 0, 0, 0.5, 0, 0);
          for (const b of blobs) {
            const rad = b.r * Math.pow(b.life, 0.6) * 1.8;
            if (rad < 0.5) continue;
            const grad = mask2dCtx.createRadialGradient(b.x, b.y, 0, b.x, b.y, rad);
            grad.addColorStop(0, 'rgb(0 0 0 / 1)');
            grad.addColorStop(0.4, 'rgb(0 0 0 / 1)');
            grad.addColorStop(0.6, 'rgb(0 0 0 / 0.45)');
            grad.addColorStop(0.8, 'rgb(0 0 0 / 0.12)');
            grad.addColorStop(1, 'rgb(0 0 0 / 0)');
            mask2dCtx.fillStyle = grad;
            mask2dCtx.fillRect(b.x - rad, b.y - rad, 2 * rad, 2 * rad);
          }
          ctx2d.drawImage(layerCanvas, 0, 0);
          ctx2d.globalCompositeOperation = 'destination-in';
          ctx2d.drawImage(mask2dCanvas, 0, 0, targetCanvas.width, targetCanvas.height);
          ctx2d.globalCompositeOperation = 'source-over';
        }
      }

      if (blobs.length > 0) {
        raf = requestAnimationFrame(tick);
      }
    };

    const scheduleFrame = () => {
      if (!raf && backImage) {
        lastFrameTime = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const getLocalPoint = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const pt = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      return pt.x >= 0 && pt.y >= 0 && pt.x <= rect.width && pt.y <= rect.height ? pt : null;
    };

    let lastInteractionTime = performance.now();

    const onPointerMove = (e: PointerEvent) => {
      const pt = getLocalPoint(e);
      if (!pt) {
        lastPt = null;
        return;
      }
      loadBackImage();
      const now = performance.now();
      lastInteractionTime = now;
      if (lastPt) {
        const dx = pt.x - lastPt.x;
        const dy = pt.y - lastPt.y;
        const dt = Math.max(0.008, (now - lastPt.t) / 1000);
        const vx = dx / dt;
        const vy = dy / dt;
        const stepDist = fluid ? 6 : 4;
        const steps = Math.max(1, Math.min(fluid ? 12 : 24, Math.floor(Math.hypot(dx, dy) / stepDist)));
        for (let i = 1; i <= steps; i++) {
          splat(lastPt.x + (dx * i) / steps, lastPt.y + (dy * i) / steps, 1, vx, vy);
        }
      } else {
        splat(pt.x, pt.y);
      }
      lastPt = { ...pt, t: now };
      scheduleFrame();
    };

    const onPointerLeave = () => {
      lastPt = null;
    };

    const onPointerDown = (e: PointerEvent) => {
      const pt = getLocalPoint(e);
      if (pt) {
        loadBackImage();
        lastInteractionTime = performance.now();
        splat(pt.x, pt.y, 1.4);
        scheduleFrame();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    let inView = true;
    const io = new IntersectionObserver(([entry]) => {
      inView = !!entry?.isIntersecting;
    });
    io.observe(host);

    const canAutoSweep = () =>
      inView &&
      !reducedMotion.matches &&
      document.visibilityState === 'visible' &&
      !(document.documentElement.hasAttribute('data-intro') || document.querySelector('.intro[open]'));

    let lastSweepTime = -Infinity;
    let sweepRaf = 0;

    const runAutoSweep = () => {
      if (!backImage || !canAutoSweep()) return;
      const hostRect = host.getBoundingClientRect();
      const imgRect = portraitImg.getBoundingClientRect();
      const pts = SWEEP_POINTS.map((p) => ({
        x: imgRect.left - hostRect.left + imgRect.width * p.x,
        y: imgRect.top - hostRect.top + imgRect.height * p.y,
      }));
      const segLens = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
      const totalLen = segLens.reduce((a, b) => a + b, 0);
      const speed = totalLen / 0.8;
      const stepDist = fluid ? 6 : 4;
      const startTime = performance.now();
      let covered = 0;

      const stepSweep = () => {
        sweepRaf = 0;
        if (disposed) return;
        const targetDist = totalLen * Math.min(1, (performance.now() - startTime) / 800);
        while (covered < targetDist) {
          let dist = (covered = Math.min(targetDist, covered + stepDist));
          let idx = 0;
          while (idx < segLens.length - 1 && dist > segLens[idx]) {
            dist -= segLens[idx];
            idx++;
          }
          const p0 = pts[idx];
          const p1 = pts[idx + 1];
          const segLen = segLens[idx] || 1;
          const t = dist / segLen;
          splat(
            p0.x + (p1.x - p0.x) * t,
            p0.y + (p1.y - p0.y) * t,
            1.3,
            ((p1.x - p0.x) / segLen) * speed,
            ((p1.y - p0.y) / segLen) * speed
          );
        }
        scheduleFrame();
        if (covered < totalLen) {
          sweepRaf = requestAnimationFrame(stepSweep);
        }
      };

      cancelAnimationFrame(sweepRaf);
      sweepRaf = requestAnimationFrame(stepSweep);
      lastInteractionTime = lastSweepTime = performance.now();
    };

    let readySince: number | null = null;
    const sweepInterval = window.setInterval(() => {
      const now = performance.now();
      if (!canAutoSweep()) {
        if (lastSweepTime === -Infinity) readySince = null;
        return;
      }
      if (lastSweepTime === -Infinity) {
        readySince ??= now;
        if (now - readySince < 1800) return;
        loadBackImage();
        if (backImage) {
          runAutoSweep();
        } else {
          pendingAutoSweep = true;
        }
        return;
      }
      if (now - lastSweepTime >= 8000 && now - lastInteractionTime >= 8000) {
        runAutoSweep();
      }
    }, 250);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(sweepRaf);
      window.clearTimeout(preloadTimer);
      window.clearInterval(sweepInterval);
      ro.disconnect();
      mo.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      fluid?.dispose();
    };
  }, []);

  const roles = PROFILE.roles[locale];

  return (
    <section aria-labelledby="hero-title" className="hero-shell">
      <div ref={maskRef} className="hero-mask">
        <NeuralVortexBackground className="pointer-events-none fixed inset-0 z-0 size-full opacity-95 hero-vortex" />
        <div className="hero">
          <div aria-hidden="true" className="hero-glow" />
          <h1 id="hero-title" className="hero-name">
            <span>
              {PROFILE.firstNamePrefix}
              <span className="hero-name-mid">{PROFILE.firstNameMid}</span>
              {PROFILE.firstNameSuffix}
            </span>
            <span> {PROFILE.lastName}</span>
          </h1>
          <figure className="hero-portrait">
            <img
              alt={`Photo of ${PROFILE.fullName}`}
              draggable={false}
              loading="eager"
              width={1120}
              height={1100}
              decoding="async"
              className="hero-portrait-img"
              src={PROFILE.heroPortrait}
            />
          </figure>
          <div aria-hidden="true" className="hero-name-front">
            <p className="hero-name">
              <span>
                {PROFILE.firstNamePrefix}
                <span className="hero-name-mid">{PROFILE.firstNameMid}</span>
                {PROFILE.firstNameSuffix}
              </span>
              <span> {PROFILE.lastName}</span>
            </p>
          </div>
          <ul className="hero-roles">
            <li>{roles[0]}</li>
            <li>{roles[1]}</li>
          </ul>
        </div>
        <canvas ref={canvasRef} aria-hidden="true" className="hero-mask-canvas" />
      </div>
    </section>
  );
}
