// Copies the original JAR into public/ and derives app icons from its icon.png.
//
// usage: npx tsx tools/assets.ts [path/to/game.jar]

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { unzipSync } from "fflate";
import { decodePng } from "../src/runtime/png";
import { encodeRgbPng } from "./png";

const root = join(import.meta.dirname, "..");
const jarPath = process.argv[2] ?? join(root, "../Townsmen6-Revolution_s40v2a.jar");
const pub = join(root, "public");
mkdirSync(pub, { recursive: true });
copyFileSync(jarPath, join(pub, "game.jar"));

const files = unzipSync(new Uint8Array(readFileSync(jarPath)));
const icon = decodePng(files["icon.png"]);
const BG = 0x1b130c;

for (const size of [192, 512]) {
  const scale = Math.floor((size * 0.8) / Math.max(icon.width, icon.height));
  const ox = Math.floor((size - icon.width * scale) / 2);
  const oy = Math.floor((size - icon.height * scale) / 2);
  const png = encodeRgbPng(size, size, (x, y) => {
    const ix = Math.floor((x - ox) / scale);
    const iy = Math.floor((y - oy) / scale);
    if (ix < 0 || iy < 0 || ix >= icon.width || iy >= icon.height) return BG;
    const p = icon.argb[iy * icon.width + ix];
    const a = (p >>> 24) / 255;
    const mix = (shift: number) => Math.round(((p >> shift) & 255) * a + ((BG >> shift) & 255) * (1 - a)) << shift;
    return mix(16) | mix(8) | mix(0);
  });
  writeFileSync(join(pub, `icon-${size}.png`), png);
}
console.log("assets ready in", pub);
