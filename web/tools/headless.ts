// Headless runner with the same script format and outputs as research/midp/src/harness/Run.java.
//
// usage: npx tsx tools/headless.ts <jar> <script> <outdir> [--size WxH] [--drawlog] [--check]

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { checkReport } from "../src/runtime/java";
import { Device } from "../src/runtime/midp";
import { encodeRgbPng } from "./png";
import { runScript } from "./runner";

const args = process.argv.slice(2);
const [jarPath, scriptPath, outDir] = args;
const sizeArg = args.indexOf("--size");
const [width, height] = sizeArg >= 0 ? args[sizeArg + 1].split("x").map(Number) : [128, 128];
mkdirSync(outDir, { recursive: true });

const result = runScript(new Uint8Array(readFileSync(jarPath)), readFileSync(scriptPath, "utf8"), {
  width,
  height,
  drawLog: args.includes("--drawlog"),
  onShot: (name) => {
    const img = Device.ensureScreen();
    const scale = 3;
    writeFileSync(
      join(outDir, `${name}.png`),
      encodeRgbPng(img.width * scale, img.height * scale, (x, y) => img.pixels[Math.floor(y / scale) * img.width + Math.floor(x / scale)]),
    );
  },
});

writeFileSync(join(outDir, "frames.log"), result.frames.join("\n") + "\n");
writeFileSync(join(outDir, "events.log"), result.events.join("\n") + "\n");
if (result.draws.length) writeFileSync(join(outDir, "draw.log"), result.draws.join("\n") + "\n");
if (args.includes("--check")) {
  const sites = readFileSync(join(import.meta.dirname, "../src/game/check-sites.txt"), "utf8").split("\n");
  const report = [
    ...[...checkReport.overflow].map(([s, n]) => `overflow ${sites[s]} x${n}`),
    ...[...checkReport.bounds].map(([s, n]) => `bounds ${sites[s]} x${n}`),
  ];
  writeFileSync(join(outDir, "check.log"), report.join("\n") + "\n");
  console.log(`check: ${report.length} sites`);
}
console.log(`done frames=${result.frames.length} destroyed=${result.destroyed}`);
