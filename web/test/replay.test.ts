// Replays key scripts and requires frame-for-frame identical screens and event
// logs to the Java reference host running the decompiled original
// (fixtures recorded with research/oracle.py).

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";

const here = import.meta.dirname;
const jar = new Uint8Array(readFileSync(join(here, "../../Townsmen6-Revolution_s40v2a.jar")));

function lines(path: string): string[] {
  return readFileSync(path, "utf8").split("\n").filter(Boolean);
}

const cases = [
  { name: "monkey1", width: 128, height: 128 },
  { name: "monkey3", width: 128, height: 128 },
  { name: "wide", width: 400, height: 240 },
];

describe("replay matches the Java reference", () => {
  for (const c of cases) {
    it(`${c.name} (${c.width}x${c.height})`, { timeout: 120_000 }, async () => {
      vi.resetModules();
      const { runScript } = await import("../tools/runner");
      const dir = join(here, "fixtures", c.name);
      const result = runScript(jar, readFileSync(join(dir, "script.txt"), "utf8"), { width: c.width, height: c.height });
      const frames = lines(join(dir, "frames.log"));
      const firstDiff = frames.findIndex((f, i) => result.frames[i] !== f);
      expect(firstDiff, `first differing frame: ${frames[firstDiff]} vs ${result.frames[firstDiff]}`).toBe(-1);
      expect(result.frames.length).toBe(frames.length);
      expect(result.events).toEqual(lines(join(dir, "events.log")));
    });
  }
});
