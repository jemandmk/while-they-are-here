import type { SensoryAnchorId } from "../types";

/**
 * SensoryAudioEngine
 * ------------------
 * A small, dependency-free Web Audio synthesiser. It generates the ambient
 * "Proustian" textures live in the browser — there are no audio assets to ship,
 * which keeps the bundle tiny and honours the manual's "un-digitizable" theme.
 *
 * Business logic only: this class knows nothing about React. The
 * `useSensoryAudio` hook adapts it to component lifecycle.
 */

interface ActiveVoice {
  readonly output: GainNode;
  readonly stop: () => void;
}

const MASTER_LEVEL = 0.9;

export class SensoryAudioEngine {
  #ctx: AudioContext | null = null;
  #master: GainNode | null = null;
  #voice: ActiveVoice | null = null;

  /** True when the engine is currently producing sound. */
  get isPlaying(): boolean {
    return this.#voice !== null;
  }

  /** Lazily create / resume the AudioContext (must follow a user gesture). */
  #ensureContext(): { ctx: AudioContext; master: GainNode } {
    if (this.#ctx === null || this.#master === null) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) {
        throw new Error("Web Audio API is not supported in this browser.");
      }
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      this.#ctx = ctx;
      this.#master = master;
    }
    if (this.#ctx.state === "suspended") {
      void this.#ctx.resume();
    }
    return { ctx: this.#ctx, master: this.#master };
  }

  #ramp(ctx: AudioContext, param: AudioParam, target: number, seconds: number): void {
    param.cancelScheduledValues(ctx.currentTime);
    param.setValueAtTime(param.value, ctx.currentTime);
    param.linearRampToValueAtTime(target, ctx.currentTime + seconds);
  }

  /** A soft pink-ish noise buffer used as a base texture. */
  #noiseBuffer(ctx: AudioContext): AudioBuffer {
    const length = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + 0.05 * white;
      b1 = 0.96 * b1 + 0.08 * white;
      b2 = 0.57 * b2 + 0.3 * white;
      data[i] = (b0 + b1 + b2 + white * 0.1) * 0.18;
    }
    return buffer;
  }

  #buildVoice(ctx: AudioContext, master: GainNode, anchor: SensoryAnchorId): ActiveVoice {
    const out = ctx.createGain();
    out.gain.value = 0;
    out.connect(master);

    const stoppables: Array<AudioScheduledSourceNode> = [];
    let interval: ReturnType<typeof setInterval> | null = null;

    if (anchor === "voice") {
      // Warm room murmur + periodic gentle dish "clink".
      const src = ctx.createBufferSource();
      src.buffer = this.#noiseBuffer(ctx);
      src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 760;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 180;
      src.connect(hp);
      hp.connect(lp);
      lp.connect(out);
      src.start();

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.12;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 260;
      lfo.connect(lfoGain);
      lfoGain.connect(lp.frequency);
      lfo.start();
      stoppables.push(src, lfo);

      interval = setInterval(() => {
        if (out.gain.value < 0.01) return;
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = 1400 + Math.random() * 1300;
        const gain = ctx.createGain();
        gain.gain.value = 0;
        osc.connect(gain);
        gain.connect(out);
        const t = ctx.currentTime;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.5);
        osc.start(t);
        osc.stop(t + 0.55);
      }, 1700);
    } else if (anchor === "olfactory") {
      // Breathy, drifting pads — airy and "un-digitizable".
      [196, 261.6, 329.6].forEach((freq, index) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const gain = ctx.createGain();
        gain.gain.value = index === 0 ? 0.06 : 0.035;
        const detune = ctx.createOscillator();
        detune.type = "sine";
        detune.frequency.value = 0.07 + index * 0.03;
        const detuneGain = ctx.createGain();
        detuneGain.gain.value = 2.5;
        detune.connect(detuneGain);
        detuneGain.connect(osc.frequency);
        detune.start();
        osc.connect(gain);
        gain.connect(out);
        osc.start();
        stoppables.push(osc, detune);
      });
      const air = ctx.createBufferSource();
      air.buffer = this.#noiseBuffer(ctx);
      air.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2200;
      const airGain = ctx.createGain();
      airGain.gain.value = 0.02;
      air.connect(bp);
      bp.connect(airGain);
      airGain.connect(out);
      air.start();
      stoppables.push(air);
    } else {
      // texture — a slow, mundane cadence (coffee / footsteps).
      const src = ctx.createBufferSource();
      src.buffer = this.#noiseBuffer(ctx);
      src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 420;
      const gain = ctx.createGain();
      gain.gain.value = 0.05;
      src.connect(lp);
      lp.connect(gain);
      gain.connect(out);
      src.start();
      stoppables.push(src);

      interval = setInterval(() => {
        if (out.gain.value < 0.01) return;
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = 70 + Math.random() * 16;
        const stepGain = ctx.createGain();
        stepGain.gain.value = 0;
        osc.connect(stepGain);
        stepGain.connect(out);
        const t = ctx.currentTime;
        stepGain.gain.setValueAtTime(0, t);
        stepGain.gain.linearRampToValueAtTime(0.09, t + 0.01);
        stepGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.start(t);
        osc.stop(t + 0.26);
      }, 900);
    }

    const stop = (): void => {
      this.#ramp(ctx, out.gain, 0, 0.6);
      window.setTimeout(() => {
        for (const node of stoppables) {
          try {
            node.stop();
          } catch {
            /* already stopped */
          }
        }
        if (interval !== null) clearInterval(interval);
      }, 700);
    };

    return { output: out, stop };
  }

  /** Start an anchor's ambient texture, fading out any previous voice. */
  play(anchor: SensoryAnchorId): void {
    const { ctx, master } = this.#ensureContext();
    this.stop();
    const voice = this.#buildVoice(ctx, master, anchor);
    this.#voice = voice;
    this.#ramp(ctx, master.gain, MASTER_LEVEL, 0.4);
    this.#ramp(ctx, voice.output.gain, 1, 1.2);
  }

  /** Fade out and tear down the active voice. */
  stop(): void {
    if (this.#voice) {
      this.#voice.stop();
      this.#voice = null;
    }
  }

  /** Permanently release the AudioContext (call on unmount). */
  dispose(): void {
    this.stop();
    if (this.#ctx) {
      void this.#ctx.close();
      this.#ctx = null;
      this.#master = null;
    }
  }
}
