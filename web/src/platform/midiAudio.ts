// Small General-MIDI style synthesizer for the game's MIDI music and sound effects.

import { PlayerImpl, type AudioEngine } from "../runtime/midp";

interface Note {
  time: number;
  dur: number;
  ch: number;
  key: number;
  vel: number;
  program: number;
  volume: number;
}

interface Song {
  notes: Note[];
  duration: number;
}

function parseMidi(bytes: Uint8Array): Song {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let pos = 0;
  const str = (n: number) => String.fromCharCode(...bytes.subarray(pos, pos + n));
  if (str(4) !== "MThd") throw new Error("not a MIDI file");
  const headerLen = dv.getUint32(4);
  const division = dv.getInt16(12);
  pos = 8 + headerLen;
  const ppq = division > 0 ? division : 96;

  type Raw = { tick: number; order: number; kind: "on" | "off" | "tempo" | "program" | "volume"; ch: number; a: number; b: number };
  const events: Raw[] = [];
  let order = 0;
  while (pos + 8 <= bytes.length) {
    const id = str(4);
    const len = dv.getUint32(pos + 4);
    const start = pos + 8;
    const end = start + len;
    pos = end;
    if (id !== "MTrk") continue;
    let p = start;
    let tick = 0;
    let status = 0;
    const vlq = () => {
      let v = 0;
      for (;;) {
        const c = bytes[p++];
        v = (v << 7) | (c & 0x7f);
        if (!(c & 0x80)) return v;
      }
    };
    while (p < end) {
      tick += vlq();
      let s = bytes[p];
      if (s & 0x80) {
        p++;
        if (s < 0xf0) status = s;
      } else {
        s = status;
      }
      if (s === 0xff) {
        const type = bytes[p++];
        const l = vlq();
        if (type === 0x51 && l === 3) {
          const us = (bytes[p] << 16) | (bytes[p + 1] << 8) | bytes[p + 2];
          events.push({ tick, order: order++, kind: "tempo", ch: 0, a: us, b: 0 });
        }
        p += l;
        continue;
      }
      if (s === 0xf0 || s === 0xf7) {
        p += vlq();
        continue;
      }
      const ch = s & 0x0f;
      const hi = s & 0xf0;
      const a = bytes[p++];
      const b = hi === 0xc0 || hi === 0xd0 ? 0 : bytes[p++];
      if (hi === 0x90 && b > 0) events.push({ tick, order: order++, kind: "on", ch, a, b });
      else if (hi === 0x80 || (hi === 0x90 && b === 0)) events.push({ tick, order: order++, kind: "off", ch, a, b });
      else if (hi === 0xc0) events.push({ tick, order: order++, kind: "program", ch, a, b });
      else if (hi === 0xb0 && a === 7) events.push({ tick, order: order++, kind: "volume", ch, a: b, b });
    }
  }
  events.sort((x, y) => x.tick - y.tick || x.order - y.order);

  let tempo = 500000;
  let lastTick = 0;
  let time = 0;
  const program = new Array(16).fill(0);
  const volume = new Array(16).fill(100);
  const open = new Map<number, Note[]>();
  const notes: Note[] = [];
  for (const e of events) {
    time += ((e.tick - lastTick) * tempo) / ppq / 1e6;
    lastTick = e.tick;
    switch (e.kind) {
      case "tempo":
        tempo = e.a;
        break;
      case "program":
        program[e.ch] = e.a;
        break;
      case "volume":
        volume[e.ch] = e.a;
        break;
      case "on": {
        const n: Note = { time, dur: 0.25, ch: e.ch, key: e.a, vel: e.b, program: program[e.ch], volume: volume[e.ch] };
        const k = e.ch * 128 + e.a;
        if (!open.has(k)) open.set(k, []);
        open.get(k)!.push(n);
        notes.push(n);
        break;
      }
      case "off": {
        const stack = open.get(e.ch * 128 + e.a);
        const n = stack?.shift();
        if (n) n.dur = Math.max(0.02, time - n.time);
        break;
      }
    }
  }
  const duration = notes.reduce((m, n) => Math.max(m, n.time + n.dur), time);
  return { notes, duration };
}

interface Voice {
  wave: OscillatorType;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  cutoff: number;
  gain: number;
}

function voiceFor(program: number): Voice {
  switch (program >> 3) {
    case 0: return { wave: "triangle", attack: 0.004, decay: 0.5, sustain: 0.25, release: 0.15, cutoff: 5000, gain: 0.9 };
    case 1: return { wave: "sine", attack: 0.002, decay: 0.4, sustain: 0.1, release: 0.3, cutoff: 8000, gain: 0.9 };
    case 2: return { wave: "square", attack: 0.01, decay: 0.1, sustain: 0.8, release: 0.08, cutoff: 2500, gain: 0.45 };
    case 3: return { wave: "triangle", attack: 0.003, decay: 0.3, sustain: 0.2, release: 0.1, cutoff: 4000, gain: 0.9 };
    case 4: return { wave: "triangle", attack: 0.005, decay: 0.2, sustain: 0.7, release: 0.08, cutoff: 1500, gain: 1.1 };
    case 5:
    case 6: return { wave: "sawtooth", attack: 0.06, decay: 0.3, sustain: 0.7, release: 0.25, cutoff: 2200, gain: 0.4 };
    case 7: return { wave: "sawtooth", attack: 0.03, decay: 0.2, sustain: 0.7, release: 0.12, cutoff: 2800, gain: 0.45 };
    case 8: return { wave: "square", attack: 0.02, decay: 0.2, sustain: 0.7, release: 0.1, cutoff: 3000, gain: 0.4 };
    case 9: return { wave: "sine", attack: 0.03, decay: 0.2, sustain: 0.8, release: 0.12, cutoff: 6000, gain: 0.9 };
    case 10: return { wave: "square", attack: 0.005, decay: 0.2, sustain: 0.6, release: 0.08, cutoff: 3500, gain: 0.4 };
    case 11: return { wave: "sawtooth", attack: 0.15, decay: 0.4, sustain: 0.7, release: 0.4, cutoff: 1800, gain: 0.35 };
    default: return { wave: "triangle", attack: 0.01, decay: 0.3, sustain: 0.5, release: 0.15, cutoff: 4000, gain: 0.8 };
  }
}

class Synth {
  readonly ctx: AudioContext;
  readonly master: GainNode;
  private noise: AudioBuffer;

  constructor() {
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5;
    const comp = this.ctx.createDynamicsCompressor();
    this.master.connect(comp).connect(this.ctx.destination);
    this.noise = this.ctx.createBuffer(1, this.ctx.sampleRate, this.ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }

  play(n: Note, at: number, out: AudioNode, nodes: Set<AudioScheduledSourceNode>): void {
    const ctx = this.ctx;
    const amp = (n.vel / 127) * (n.volume / 127) * 0.22;
    if (amp <= 0) return;
    if (n.ch === 9) {
      this.drum(n.key, at, amp, out, nodes);
      return;
    }
    const v = voiceFor(n.program);
    const osc = ctx.createOscillator();
    osc.type = v.wave;
    osc.frequency.value = 440 * Math.pow(2, (n.key - 69) / 12);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = v.cutoff;
    const g = ctx.createGain();
    const peak = amp * v.gain;
    const end = at + n.dur;
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(peak, at + v.attack);
    g.gain.setTargetAtTime(peak * v.sustain, at + v.attack, v.decay / 3);
    g.gain.setTargetAtTime(0, Math.max(end, at + v.attack), v.release / 3);
    osc.connect(filter).connect(g).connect(out);
    osc.start(at);
    osc.stop(end + v.release * 2 + 0.05);
    this.track(osc, nodes);
  }

  private drum(key: number, at: number, amp: number, out: AudioNode, nodes: Set<AudioScheduledSourceNode>): void {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.connect(out);
    if (key === 35 || key === 36) {
      const osc = ctx.createOscillator();
      osc.frequency.setValueAtTime(140, at);
      osc.frequency.exponentialRampToValueAtTime(45, at + 0.12);
      g.gain.setValueAtTime(amp * 2.2, at);
      g.gain.exponentialRampToValueAtTime(0.001, at + 0.18);
      osc.connect(g);
      osc.start(at);
      osc.stop(at + 0.2);
      this.track(osc, nodes);
      return;
    }
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    const hat = key === 42 || key === 44 || key === 46 || key >= 49;
    filter.type = hat ? "highpass" : "bandpass";
    filter.frequency.value = hat ? 7000 : 1800;
    const len = key === 46 || key >= 49 ? 0.3 : hat ? 0.05 : 0.14;
    g.gain.setValueAtTime(amp * (hat ? 0.8 : 1.6), at);
    g.gain.exponentialRampToValueAtTime(0.001, at + len);
    src.connect(filter).connect(g);
    src.start(at);
    src.stop(at + len + 0.02);
    this.track(src, nodes);
  }

  private track(node: AudioScheduledSourceNode, nodes: Set<AudioScheduledSourceNode>): void {
    nodes.add(node);
    activeVoices++;
    node.onended = () => {
      activeVoices--;
      nodes.delete(node);
    };
  }
}

let synth: Synth | null = null;
const songs = new WeakMap<Int8Array, Song>();

export function unlockAudio(): void {
  if (!synth) synth = new Synth();
  // iOS reports "interrupted" after calls, Siri or backgrounding, and only resumes from a gesture.
  if (synth.ctx.state !== "running" && synth.ctx.state !== "closed") void synth.ctx.resume();
}

type AudioSessionType = "auto" | "ambient" | "playback";

/** Safari 16.4+: "playback" keeps sound on when the ring/silent switch is set to silent. */
export function setIgnoreSilentSwitch(on: boolean): boolean {
  const session = (navigator as Navigator & { audioSession?: { type: AudioSessionType } }).audioSession;
  if (!session) return false;
  session.type = on ? "playback" : "auto";
  return true;
}

export function hasAudioSession(): boolean {
  return "audioSession" in navigator;
}

export function audioStatus(): { state: string; voices: number } {
  return { state: synth?.ctx.state ?? "locked", voices: activeVoices };
}

let activeVoices = 0;

export function setMasterVolume(v: number): void {
  if (synth) synth.master.gain.value = v;
}

class MidiPlayer extends PlayerImpl {
  private song: Song | null = null;
  private out: GainNode | null = null;
  private nodes = new Set<AudioScheduledSourceNode>();
  private timer = 0;
  private endTimer = 0;
  private startAt = 0;
  private next = 0;

  constructor(private readonly data: Int8Array) {
    super();
  }

  private load(): Song | null {
    if (this.song) return this.song;
    let s = songs.get(this.data);
    if (!s) {
      try {
        s = parseMidi(new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.length));
      } catch {
        return null;
      }
      songs.set(this.data, s);
    }
    this.song = s;
    return s;
  }

  protected onStart(): void {
    this.halt();
    const song = this.load();
    if (!synth || synth.ctx.state !== "running" || !song) {
      // Still report completion so the game's music sequencing keeps working while muted.
      if (song) this.endTimer = window.setTimeout(() => this.endOfMedia(), song.duration * 1000);
      return;
    }
    this.out = synth.ctx.createGain();
    this.out.gain.value = this.level / 100;
    this.out.connect(synth.master);
    this.startAt = synth.ctx.currentTime + 0.03;
    this.next = 0;
    this.pump();
    this.timer = window.setInterval(() => this.pump(), 120);
    this.endTimer = window.setTimeout(() => this.endOfMedia(), (song.duration + 0.05) * 1000);
  }

  private pump(): void {
    if (!synth || !this.song || !this.out) return;
    const horizon = synth.ctx.currentTime + 0.4 - this.startAt;
    const notes = this.song.notes;
    while (this.next < notes.length && notes[this.next].time < horizon) {
      synth.play(notes[this.next], this.startAt + notes[this.next].time, this.out, this.nodes);
      this.next++;
    }
    if (this.next >= notes.length) {
      window.clearInterval(this.timer);
      this.timer = 0;
    }
  }

  private halt(): void {
    window.clearInterval(this.timer);
    window.clearTimeout(this.endTimer);
    this.timer = 0;
    this.endTimer = 0;
    for (const n of this.nodes) {
      try {
        n.stop();
      } catch {
        /* already stopped */
      }
    }
    this.nodes.clear();
    this.out?.disconnect();
    this.out = null;
  }

  protected onStop(): void {
    this.halt();
  }

  protected onVolume(): void {
    if (this.out) this.out.gain.value = this.level / 100;
  }
}

export class MidiAudio implements AudioEngine {
  create(data: Int8Array, type: string): PlayerImpl {
    return type.includes("midi") ? new MidiPlayer(data) : new PlayerImpl();
  }
}
