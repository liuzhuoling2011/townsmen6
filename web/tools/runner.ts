// Runs a key script against the game headlessly with the reference host's semantics.
// Shared by tools/headless.ts and the regression tests. Game classes keep static
// state, so every run must use a fresh module graph (see test/replay.test.ts).

import { loadJar } from "../src/runtime/assets";
import { Sys, VirtualClock } from "../src/runtime/io";
import { setClassRegistry } from "../src/runtime/java";
import { BoxFontEngine, Device, SilentAudio, screenHash } from "../src/runtime/midp";
import { MainMidlet, classes } from "../src/game/index";

export interface RunOptions {
  width?: number;
  height?: number;
  drawLog?: boolean;
  onShot?: (name: string) => void;
}

export interface RunResult {
  frames: string[];
  events: string[];
  draws: string[];
  destroyed: boolean;
}

export function parseScript(text: string): string[][] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split(/\s+/));
}

export function runScript(jar: Uint8Array, scriptText: string, opts: RunOptions = {}): RunResult {
  const events: string[] = [];
  const draws: string[] = [];
  const frames: string[] = [];
  Device.width = opts.width ?? 128;
  Device.height = opts.height ?? 128;
  Sys.clock = new VirtualClock();
  Device.font = new BoxFontEngine();
  Device.audio = new SilentAudio();
  Device.eventLog = (line) => events.push(`t=${Sys.clock.now()} ${line}`);
  Device.drawLog = opts.drawLog ? (line) => draws.push(line) : null;
  loadJar(jar);
  setClassRegistry(classes);

  const script = parseScript(scriptText);
  const midlet = new MainMidlet();
  midlet.launch();

  const end = Math.max(...script.map((s) => Number(s[0])));
  let cursor = 0;
  for (let frame = 0; frame <= end && !Device.destroyed; frame++) {
    const shots: string[] = [];
    while (cursor < script.length && Number(script[cursor][0]) === frame) {
      const s = script[cursor++];
      if (s[1] === "key") Device.key(Number(s[2]), s[3] === "down");
      else if (s[1] === "shot") shots.push(s[2]);
    }
    if (opts.drawLog) draws.push(`== frame ${frame}`);
    if (Device.step()) frames.push(`${frame} t=${Sys.clock.now()} ${screenHash(Device.screen!)}`);
    for (const name of shots) opts.onShot?.(name);
  }
  return { frames, events, draws, destroyed: Device.destroyed };
}
