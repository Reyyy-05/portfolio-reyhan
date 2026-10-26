'use client';

let ctx: AudioContext | null = null;
let noiseBuf: AudioBuffer | null = null;

const SCALE = [261.63, 293.66, 329.63, 392, 440, 523.25, 587.33];

function getVolume(): number {
  if (typeof document === 'undefined') return 0;
  const raw = document.documentElement.dataset.soundVolume;
  if (raw !== undefined) {
    const n = Number(raw);
    return Number.isFinite(n) ? Math.max(0, Math.min(1, n / 100)) : 0;
  }
  return 0.8;
}

function getContext(): { c: AudioContext; v: number } | null {
  const v = getVolume();
  if (v <= 0 || typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return { c: ctx, v };
}

function getNoiseBuffer(c: AudioContext): AudioBuffer {
  if (noiseBuf && noiseBuf.sampleRate === c.sampleRate) return noiseBuf;
  const length = Math.floor(0.25 * c.sampleRate);
  const buffer = c.createBuffer(1, length, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = 2 * Math.random() - 1;
  }
  noiseBuf = buffer;
  return buffer;
}

function playTone(
  c: AudioContext,
  opts: {
    type?: OscillatorType;
    freq: number;
    freqEnd?: number;
    start: number;
    dur: number;
    gain: number;
    attack?: number;
  }
) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = opts.type ?? 'sine';
  osc.frequency.setValueAtTime(opts.freq, opts.start);
  if (opts.freqEnd && opts.freqEnd !== opts.freq) {
    osc.frequency.exponentialRampToValueAtTime(opts.freqEnd, opts.start + opts.dur);
  }
  const atk = opts.attack ?? 0.005;
  g.gain.setValueAtTime(0.0001, opts.start);
  g.gain.linearRampToValueAtTime(opts.gain, opts.start + atk);
  g.gain.exponentialRampToValueAtTime(0.0001, opts.start + opts.dur);
  osc.connect(g).connect(c.destination);
  osc.start(opts.start);
  osc.stop(opts.start + opts.dur + 0.01);
}

function playNoise(
  c: AudioContext,
  opts: {
    filterType: BiquadFilterType;
    freq: number;
    freqEnd?: number;
    q?: number;
    start: number;
    dur: number;
    gain: number;
    attack?: number;
  }
) {
  const src = c.createBufferSource();
  src.buffer = getNoiseBuffer(c);
  const filter = c.createBiquadFilter();
  filter.type = opts.filterType;
  filter.frequency.setValueAtTime(opts.freq, opts.start);
  if (opts.freqEnd && opts.freqEnd !== opts.freq) {
    filter.frequency.exponentialRampToValueAtTime(opts.freqEnd, opts.start + opts.dur);
  }
  if (opts.q !== undefined) {
    filter.Q.setValueAtTime(opts.q, opts.start);
  }
  const g = c.createGain();
  const atk = opts.attack ?? 0.004;
  g.gain.setValueAtTime(0.0001, opts.start);
  g.gain.linearRampToValueAtTime(opts.gain, opts.start + atk);
  g.gain.exponentialRampToValueAtTime(0.0001, opts.start + opts.dur);
  src.connect(filter).connect(g).connect(c.destination);
  src.start(opts.start);
  src.stop(opts.start + opts.dur + 0.01);
}

export function playNavSound(index = 0) {
  const res = getContext();
  if (!res) return;
  const { c, v } = res;
  const t = c.currentTime;
  const f = SCALE[((index % SCALE.length) + SCALE.length) % SCALE.length];
  playTone(c, { type: 'sine', freq: f, freqEnd: 1.004 * f, start: t, dur: 0.14, gain: 0.16 * v, attack: 0.004 });
  playTone(c, { type: 'triangle', freq: 2 * f, start: t, dur: 0.07, gain: 0.045 * v, attack: 0.003 });
  playTone(c, { type: 'sine', freq: 3.2 * f, freqEnd: 1.5 * f, start: t, dur: 0.018, gain: 0.04 * v, attack: 0.001 });
}

export function playThemeSound(toLight: boolean) {
  const res = getContext();
  if (!res) return;
  const { c, v } = res;
  const t = c.currentTime;
  if (toLight) {
    playNoise(c, { filterType: 'bandpass', freq: 700, freqEnd: 2400, q: 2.2, start: t, dur: 0.16, gain: 0.08 * v, attack: 0.015 });
    playTone(c, { type: 'sine', freq: 523.25, start: t + 0.01, dur: 0.14, gain: 0.11 * v, attack: 0.008 });
    playTone(c, { type: 'sine', freq: 659.25, start: t + 0.055, dur: 0.18, gain: 0.13 * v, attack: 0.008 });
    playTone(c, { type: 'triangle', freq: 1318.5, start: t + 0.06, dur: 0.12, gain: 0.035 * v, attack: 0.006 });
  } else {
    playNoise(c, { filterType: 'lowpass', freq: 1500, freqEnd: 320, q: 1.4, start: t, dur: 0.17, gain: 0.07 * v, attack: 0.01 });
    playTone(c, { type: 'sine', freq: 440, start: t, dur: 0.14, gain: 0.11 * v, attack: 0.008 });
    playTone(c, { type: 'sine', freq: 329.63, freqEnd: 326, start: t + 0.05, dur: 0.2, gain: 0.13 * v, attack: 0.008 });
  }
}

export function playExperienceToggleSound(open: boolean) {
  const res = getContext();
  if (!res) return;
  const { c, v } = res;
  const t = c.currentTime;
  if (open) {
    playNoise(c, { filterType: 'bandpass', freq: 900, freqEnd: 2200, q: 3, start: t, dur: 0.09, gain: 0.06 * v, attack: 0.006 });
    playTone(c, { type: 'triangle', freq: 329.63, freqEnd: 493.88, start: t, dur: 0.11, gain: 0.12 * v, attack: 0.005 });
    playTone(c, { type: 'sine', freq: 659.25, start: t + 0.04, dur: 0.12, gain: 0.09 * v, attack: 0.005 });
  } else {
    playNoise(c, { filterType: 'bandpass', freq: 1800, freqEnd: 650, q: 3, start: t, dur: 0.08, gain: 0.05 * v, attack: 0.005 });
    playTone(c, { type: 'triangle', freq: 440, freqEnd: 293.66, start: t, dur: 0.1, gain: 0.11 * v, attack: 0.005 });
  }
}

export function playLanguageSound(toId: boolean) {
  const res = getContext();
  if (!res) return;
  const { c, v } = res;
  const t = c.currentTime;
  const [f1, f2] = toId ? [392, 523.25] : [523.25, 392];
  playTone(c, { type: 'sine', freq: f1, start: t, dur: 0.09, gain: 0.12 * v, attack: 0.004 });
  playTone(c, { type: 'sine', freq: f2, start: t + 0.055, dur: 0.13, gain: 0.14 * v, attack: 0.004 });
  playTone(c, { type: 'triangle', freq: 2 * f2, start: t + 0.055, dur: 0.08, gain: 0.035 * v, attack: 0.003 });
}

export function playLanyardSound(kind: 'grab' | 'drop' | 'flip') {
  const res = getContext();
  if (!res) return;
  const { c, v } = res;
  const t = c.currentTime;
  if (kind === 'grab') {
    playNoise(c, { filterType: 'bandpass', freq: 1400, freqEnd: 900, q: 4, start: t, dur: 0.045, gain: 0.07 * v, attack: 0.002 });
    playTone(c, { type: 'triangle', freq: 180, freqEnd: 260, start: t, dur: 0.06, gain: 0.11 * v, attack: 0.003 });
  } else if (kind === 'drop') {
    playTone(c, { type: 'sine', freq: 240, freqEnd: 110, start: t, dur: 0.12, gain: 0.13 * v, attack: 0.003 });
    playTone(c, { type: 'triangle', freq: 392, freqEnd: 330, start: t + 0.02, dur: 0.11, gain: 0.07 * v, attack: 0.004 });
  } else {
    playNoise(c, { filterType: 'bandpass', freq: 600, freqEnd: 2600, q: 2.2, start: t, dur: 0.14, gain: 0.09 * v, attack: 0.008 });
    playTone(c, { type: 'sine', freq: 330, freqEnd: 587.33, start: t + 0.01, dur: 0.13, gain: 0.1 * v, attack: 0.006 });
  }
}

export function playPhotoShimmerSound() {
  const res = getContext();
  if (!res) return;
  const { c, v } = res;
  const t = c.currentTime;
  playNoise(c, { filterType: 'bandpass', freq: 1800, freqEnd: 4200, q: 4.5, start: t, dur: 0.14, gain: 0.045 * v, attack: 0.01 });
  playTone(c, { type: 'sine', freq: 587.33, start: t, dur: 0.16, gain: 0.08 * v, attack: 0.006 });
  playTone(c, { type: 'sine', freq: 880, start: t + 0.035, dur: 0.18, gain: 0.09 * v, attack: 0.006 });
  playTone(c, { type: 'triangle', freq: 1174.66, start: t + 0.07, dur: 0.16, gain: 0.06 * v, attack: 0.006 });
}

export function playProjectSpotlightSound(index = 0) {
  const res = getContext();
  if (!res) return;
  const { c, v } = res;
  const t = c.currentTime;
  const f = SCALE[((index % SCALE.length) + SCALE.length) % SCALE.length];
  playTone(c, { type: 'sine', freq: 0.5 * f, freqEnd: 0.5 * f * 1.01, start: t, dur: 0.11, gain: 0.07 * v, attack: 0.008 });
  playTone(c, { type: 'triangle', freq: f, start: t, dur: 0.09, gain: 0.045 * v, attack: 0.006 });
}

export function playSlideSound(direction: 1 | -1 = 1) {
  const res = getContext();
  if (!res) return;
  const { c, v } = res;
  const t = c.currentTime;
  const [f1, f2] = direction > 0 ? [392, 493.88] : [493.88, 392];
  playNoise(c, { filterType: 'bandpass', freq: direction > 0 ? 1100 : 1700, freqEnd: direction > 0 ? 1900 : 950, q: 3.5, start: t, dur: 0.07, gain: 0.05 * v, attack: 0.003 });
  playTone(c, { type: 'triangle', freq: f1, freqEnd: f2, start: t, dur: 0.085, gain: 0.11 * v, attack: 0.003 });
}

export function playTimelineStepSound(index = 0) {
  const res = getContext();
  if (!res) return;
  const { c, v } = res;
  const t = c.currentTime;
  const f = SCALE[((index % SCALE.length) + SCALE.length) % SCALE.length];
  playTone(c, { type: 'sine', freq: f, start: t, dur: 0.1, gain: 0.08 * v, attack: 0.004 });
  playTone(c, { type: 'sine', freq: 1.5 * f, start: t + 0.02, dur: 0.08, gain: 0.04 * v, attack: 0.004 });
}
