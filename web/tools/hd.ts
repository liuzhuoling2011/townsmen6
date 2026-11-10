// Builds 4x replacement art packs for every image the game decodes, keyed by the
// CRC32 of the original PNG bytes (Image.key). Output: public/hd/<pack>/<key>.webp,
// a manifest.json per pack, public/hd/packs.json listing the packs present, and
// side-by-side comparisons in .hd-cache/compare/.
//
// usage: npx tsx tools/hd.ts [pack ...]   (default: hd; others are for comparison)
// Real-ESRGAN packs run realesrgan-ncnn-vulkan from $REALESRGAN
// (default ~/.cache/realesrgan/realesrgan-ncnn-vulkan, models/ next to it).
//
// Each sheet is cut into pieces that the game draws independently (the source rects it
// was seen drawing while replaying the test scripts, else the engine's cell grid, then
// connected components), so upscalers never blend one frame into its neighbour. Map
// tiles and ground decorations are upscaled surrounded by the tiles they sit among in game,
// and logos are replaced by redrawn art from tools/hd-logos/.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { xbrzColorFormat, xbrzConfig, xbrzScale } from "xbrz-js";
import { Engine } from "../src/game/Engine";
import { classes } from "../src/game/index";
import { loadJar } from "../src/runtime/assets";
import { Sys, VirtualClock } from "../src/runtime/io";
import { setClassRegistry } from "../src/runtime/java";
import { BoxFontEngine, Device, Graphics, Image, SilentAudio, crc32 } from "../src/runtime/midp";
import { decodePng } from "../src/runtime/png";
import { encodeRgbPng } from "./png";
import { runScript } from "./runner";

const SCALE = 4;
/** Gutter (source pixels) around each piece so neighbours never bleed into it. */
const PAD = 8;
/** Upscaled pieces grow this many output pixels past their outline so abutting tiles overlap instead of leaving seams. */
const GROW = 1;

type Pack = { label: string; logos?: boolean } & (
  | { kind: "xbrz" }
  /** xbrz: images the model invents strokes in (tiny faded backdrops), scaled with xBRZ instead. */
  | { kind: "esrgan"; model: string; xbrz?: string[] }
);
const PACKS: Record<string, Pack> = {
  hd: { label: "高清", kind: "esrgan", model: "realesrgan-x4plus", logos: true, xbrz: ["ff6c83d9"] },
  xbrz: { label: "xBRZ", kind: "xbrz" },
  esrgan: { label: "Real-ESRGAN", kind: "esrgan", model: "realesrgan-x4plus" },
  "esrgan-anime": { label: "Real-ESRGAN 动漫", kind: "esrgan", model: "realesrgan-x4plus-anime" },
  "esrgan-video": { label: "Real-ESRGAN 动画视频", kind: "esrgan", model: "realesr-animevideov3" },
};
const DEFAULT_PACKS = ["hd"];

const USAGE_SCRIPTS = [
  { name: "monkey1", width: 128, height: 128 },
  { name: "monkey3", width: 128, height: 128 },
  { name: "wide", width: 400, height: 240 },
];

const root = join(import.meta.dirname, "..");
const cache = join(root, ".hd-cache");
const jarPath = join(root, "../Townsmen6-Revolution_s40v2a.jar");
const esrganBin = process.env.REALESRGAN ?? join(homedir(), ".cache/realesrgan/realesrgan-ncnn-vulkan");

type Rect = [number, number, number, number];

// ---------------------------------------------------------------- what the game decodes and draws

interface Sheet {
  img: Image;
  /** Engine cell grid (columns, rows). */
  grid: [number, number];
}

/** The engine's image slots, as loaded with every image needed. */
interface Slots {
  images: (Image | null)[];
  info: (Int16Array | null)[];
}

function collectImages(jar: Uint8Array): { sheets: Map<string, Sheet>; frames: Rect[]; slots: Slots } {
  Sys.clock = new VirtualClock();
  Device.font = new BoxFontEngine();
  Device.audio = new SilentAudio();
  loadJar(jar);
  setClassRegistry(classes);
  for (const name of ["/gt", "/c", "/f"]) Engine.loadConfig(name);

  const engine = Engine as unknown as { images: (Image | null)[]; imageInfo: (Int16Array | null)[]; frames: Int16Array };
  const frames: Rect[] = [];
  for (let i = 0; i < engine.frames.length; i += 7) frames.push([engine.frames[i + 2], engine.frames[i + 3], engine.frames[i], engine.frames[i + 1]]);
  const found = new Map<string, Sheet>();
  const grab = () => {
    engine.images.forEach((img, i) => {
      if (img?.key) found.set(img.key, { img, grid: [engine.imageInfo[i]![2] || 1, engine.imageInfo[i]![3] || 1] });
    });
  };
  const n = engine.imageInfo.length;
  // Palette variants are derived from whichever sheet was read last, so load each image on its own.
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) Engine.setImageNeeded(j, false);
    Engine.setImageNeeded(i, true);
    Engine.loadImages(true);
    grab();
  }
  for (let j = 0; j < n; j++) Engine.setImageNeeded(j, true);
  Engine.loadImages(true);
  grab();
  const slots = { images: [...engine.images], info: [...engine.imageInfo] };
  for (const name of ["/s0.png", "/s1.png", "/s2.png"]) {
    const img = Image.createImage(name);
    found.set(img.key!, { img, grid: [1, 1] });
  }
  return { sheets: found, frames, slots };
}

/**
 * Guesses the custom frames of a sheet the scripts never drew: a run of consecutive frame-table
 * entries that are all left- (or top-) aligned and stack edge to edge to exactly fill it.
 */
function frameRun(frames: Rect[], w: number, h: number): Rect[] | undefined {
  for (const vertical of [true, false]) {
    for (let i = 0; i < frames.length; i++) {
      for (let j = i + 1; j < Math.min(frames.length, i + 12); j++) {
        const run = frames.slice(i, j + 1);
        if (run.some(([x, y, fw]) => fw === 0 || (vertical ? x : y) !== 0)) break;
        const across = Math.max(...run.map(([, , fw, fh]) => (vertical ? fw : fh)));
        if (Math.abs(across - (vertical ? w : h)) > 2) continue;
        const spans = run.map(([x, y, fw, fh]) => (vertical ? [y, y + fh] : [x, x + fw])).sort((a, b) => a[0] - b[0]);
        let end = 0;
        const fits = spans.every(([s, e]) => {
          const ok = s >= end - 1 && s <= end + 6;
          end = e;
          return ok;
        });
        if (fits && spans[0][0] === 0 && Math.abs(end - (vertical ? h : w)) <= 2) return run;
      }
    }
  }
  return undefined;
}

/** Child-process mode: replay one script and print the source rects drawn from each image. */
function printUsage(script: string, width: number, height: number): void {
  const rects = new Map<string, Set<string>>();
  const note = (img: Image, sx: number, sy: number, w: number, h: number) => {
    if (!img.key) return;
    let set = rects.get(img.key);
    if (!set) rects.set(img.key, (set = new Set()));
    set.add(`${sx},${sy},${w},${h}`);
  };
  const proto = Graphics.prototype;
  const drawImage = proto.drawImage;
  const drawRegion = proto.drawRegion;
  proto.drawImage = function (img, x, y, anchor) {
    note(img, 0, 0, img.width, img.height);
    drawImage.call(this, img, x, y, anchor);
  };
  proto.drawRegion = function (img, sx, sy, w, h, transform, x, y, anchor) {
    note(img, sx, sy, w, h);
    drawRegion.call(this, img, sx, sy, w, h, transform, x, y, anchor);
  };
  runScript(new Uint8Array(readFileSync(jarPath)), readFileSync(script, "utf8"), { width, height });
  process.stdout.write(JSON.stringify(Object.fromEntries([...rects].map(([k, s]) => [k, [...s].map((r) => r.split(",").map(Number))]))));
}

/** Source rects per image key, from replaying the regression scripts (cached). */
function collectUsage(): Map<string, Rect[]> {
  const file = join(cache, "usage.json");
  if (!existsSync(file)) {
    const merged = new Map<string, Set<string>>();
    for (const s of USAGE_SCRIPTS) {
      console.log(`recording draws: ${s.name}…`);
      const script = join(root, "test/fixtures", s.name, "script.txt");
      const out = execFileSync("npx", ["tsx", import.meta.filename, "--usage", script, String(s.width), String(s.height)], {
        cwd: root,
        maxBuffer: 256 << 20,
        encoding: "utf8",
      });
      for (const [k, rects] of Object.entries(JSON.parse(out) as Record<string, Rect[]>)) {
        let set = merged.get(k);
        if (!set) merged.set(k, (set = new Set()));
        for (const r of rects) set.add(r.join(","));
      }
    }
    mkdirSync(cache, { recursive: true });
    writeFileSync(file, JSON.stringify(Object.fromEntries([...merged].map(([k, s]) => [k, [...s].map((r) => r.split(",").map(Number))]))));
  }
  return new Map(Object.entries(JSON.parse(readFileSync(file, "utf8")) as Record<string, Rect[]>));
}

// ---------------------------------------------------------------- map tile surroundings

const GRASS = 16;
const FLAT_SHORE = 17;
const WATER = 18;
const COAST = 19;
const WATER_SPARKLE = 20;
const SHORE = 21;
const TERRAIN = [GRASS, FLAT_SHORE, WATER, COAST, WATER_SPARKLE, SHORE];
/** Decorations Level.generateDecorations scatters over grass and over water tiles. */
const LAND_DECORATIONS = Array.from({ length: 13 }, (_, i) => 176 + i);
const WATER_DECORATIONS = [189, 190];

/** Corners of each shore sheet row that face water (1 top, 2 left, 4 bottom, 8 right), per Level.initTileTypes. */
const SHORE_ROW_CORNERS = [12, 3, 9, 6, 11, 13, 14, 7, 4, 2, 1, 8];
/** Map neighbours (dx, dy) whose water sets each corner bit, per Level.generateWater. */
const CORNER_NEIGHBOURS: [number, number[][]][] = [
  [1, [[1, -1], [0, -1], [1, 0]]],
  [2, [[-1, -1], [0, -1], [-1, 0]]],
  [4, [[-1, 1], [0, 1], [-1, 0]]],
  [8, [[1, 1], [0, 1], [1, 0]]],
];

/** Samples the surroundings of a piece in sheet coordinates (opaque ARGB, or undefined where there is none). */
type Context = (p: Piece) => (x: number, y: number) => number | undefined;

/**
 * For map tile sheets: renders each tile amid the tiles that border it on the map, the way
 * Level.draw lays them out, so the upscaler continues textures across tile edges.
 * Ground decorations get the same treatment over the tile they are scattered on.
 */
function terrainContext(slots: Slots, slot: number): Context | undefined {
  const ground = LAND_DECORATIONS.includes(slot) ? GRASS : WATER_DECORATIONS.includes(slot) ? WATER : undefined;
  if (!TERRAIN.includes(slot) && ground === undefined) return undefined;
  const cell = (s: number, col: number, row: number) => {
    const info = slots.info[s]!;
    return { img: slots.images[s]!, sx: col * info[0], sy: row * info[1], w: info[0], h: info[1], dx: info[5], dy: info[6] };
  };
  const grassRows = slots.info[GRASS]![3];
  return (p) => {
    const info = slots.info[slot]!;
    const col = Math.floor(p.x / info[0]);
    const row = Math.floor(p.y / info[1]);
    const W = 260;
    const H = 170;
    const canvas = new Int32Array(W * H);
    // Screen position of a tile (Engine.drawSprite anchors cells bottom-centre).
    const blit = (c: ReturnType<typeof cell>, x: number, y: number) => {
      const left = x - (c.w >> 1) + c.dx;
      const top = y - c.h + c.dy;
      for (let yy = 0; yy < c.h; yy++) {
        for (let xx = 0; xx < c.w; xx++) {
          const v = c.img.pixels[(c.sy + yy) * c.img.width + c.sx + xx];
          const cx = left + xx;
          const cy = top + yy;
          if (v >>> 24 && cx >= 0 && cy >= 0 && cx < W && cy < H) canvas[cy * W + cx] = v | (0xff << 24);
        }
      }
    };
    const waterCol = slot === WATER || slot === COAST || slot === WATER_SPARKLE ? col : 0;
    const water = () => cell(WATER, waterCol, 0);
    const grass = (dx: number, dy: number) => cell(GRASS, 0, (((row + 3 * dx + 2 * dy) % grassRows) + grassRows) % grassRows);
    const neighbour = (dx: number, dy: number) => {
      switch (ground ?? slot) {
        case GRASS:
          return grass(dx, dy);
        case SHORE: {
          const corners = SHORE_ROW_CORNERS[row];
          const touching = CORNER_NEIGHBOURS.filter(([, cells]) => cells.some(([x, y]) => x === dx && y === dy));
          return touching.every(([bit]) => corners & bit) ? water() : grass(dx, dy);
        }
        case FLAT_SHORE:
          return dy - dx > 0 ? water() : grass(dx, dy);
        default:
          return water();
      }
    };
    const cx = W >> 1;
    const cy = (H >> 1) + 16;
    for (let dx = 1; dx >= -1; dx--) {
      for (let dy = -1; dy <= 1; dy++) if (dx || dy) blit(neighbour(dx, dy), cx + 32 * (dx + dy), cy + 16 * (dy - dx));
    }
    if (slot === SHORE || slot === FLAT_SHORE) blit(cell(COAST, 0, 0), cx, cy);
    if (slot === WATER_SPARKLE) blit(water(), cx, cy);
    if (ground !== undefined) blit(neighbour(0, 0), cx, cy);
    blit(cell(slot, col, row), cx, cy);
    const left = cx - (info[0] >> 1) + info[5] - col * info[0];
    const top = cy - info[1] + info[6] - row * info[1];
    return (x, y) => {
      const px = x + left;
      const py = y + top;
      if (px < 0 || py < 0 || px >= W || py >= H) return undefined;
      const v = canvas[py * W + px];
      return v >>> 24 ? v : undefined;
    };
  };
}

// ---------------------------------------------------------------- split sheets into pieces

/** Partitions a sheet into areas drawn independently: by which observed rects cover each pixel, else by grid cell. */
function regionsOf(sheet: Sheet, rects: Rect[] | undefined): Int32Array {
  const { img, grid } = sheet;
  const { width: w, height: h } = img;
  const region = new Int32Array(w * h);
  if (rects?.length) {
    const ids = new Map<string, number>();
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sig = "";
        rects.forEach(([rx, ry, rw, rh], i) => {
          if (x >= rx && y >= ry && x < rx + rw && y < ry + rh) sig += `${i},`;
        });
        let id = ids.get(sig);
        if (id === undefined) ids.set(sig, (id = ids.size));
        region[y * w + x] = id;
      }
    }
  } else {
    const cw = Math.max(1, Math.floor(w / grid[0]));
    const ch = Math.max(1, Math.floor(h / grid[1]));
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) region[y * w + x] = Math.min(grid[1] - 1, Math.floor(y / ch)) * grid[0] + Math.min(grid[0] - 1, Math.floor(x / cw));
    }
  }
  return region;
}

interface Piece {
  label: number;
  region: number;
  /** Bounding box in the sheet. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Top-left of the padded tile in the atlas. */
  ax: number;
  ay: number;
}

interface Atlas {
  width: number;
  height: number;
  pieces: Piece[];
  /** Piece label per sheet pixel (-1 transparent). */
  labels: Int32Array;
  region: Int32Array;
  /** Opaque colours with every piece's gutter filled from its nearest pixel. */
  rgb: Int32Array;
  /** Original alpha per piece, as grey. */
  mask: Int32Array;
  /** Original ARGB per piece with real transparency. */
  argb: Int32Array;
  /** Keep the upscaled mask's soft falloff, for sprites whose ragged outline should blend into the ground. */
  soft?: boolean;
}

function buildAtlas(sheet: Sheet, rects: Rect[] | undefined, context?: Context): Atlas {
  const img = sheet.img;
  const { width: w, height: h, pixels } = img;
  const region = regionsOf(sheet, rects);
  const labels = new Int32Array(w * h).fill(-1);
  const pieces: Piece[] = [];
  const stack: number[] = [];
  for (let start = 0; start < w * h; start++) {
    if (labels[start] !== -1 || pixels[start] >>> 24 === 0) continue;
    const label = pieces.length;
    let x0 = w;
    let y0 = h;
    let x1 = -1;
    let y1 = -1;
    labels[start] = label;
    stack.push(start);
    while (stack.length) {
      const p = stack.pop()!;
      const px = p % w;
      const py = (p / w) | 0;
      x0 = Math.min(x0, px);
      y0 = Math.min(y0, py);
      x1 = Math.max(x1, px);
      y1 = Math.max(y1, py);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = px + dx;
          const ny = py + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const q = ny * w + nx;
          if (labels[q] === -1 && pixels[q] >>> 24 !== 0 && region[q] === region[start]) {
            labels[q] = label;
            stack.push(q);
          }
        }
      }
    }
    pieces.push({ label, region: region[start], x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1, ax: 0, ay: 0 });
  }

  // Shelf packing, tallest first.
  const width = w + 2 * PAD;
  let cx = 0;
  let cy = 0;
  let shelf = 0;
  for (const p of [...pieces].sort((a, b) => b.h - a.h)) {
    const tw = p.w + 2 * PAD;
    if (cx + tw > width) {
      cx = 0;
      cy += shelf;
      shelf = 0;
    }
    p.ax = cx;
    p.ay = cy;
    cx += tw;
    shelf = Math.max(shelf, p.h + 2 * PAD);
  }
  const height = Math.max(1, cy + shelf);
  const rgb = new Int32Array(width * height).fill(0xff808080 | 0);
  const mask = new Int32Array(width * height).fill(0xff000000 | 0);
  const argb = new Int32Array(width * height);
  const owner = new Int32Array(width * height).fill(-1);
  for (const p of pieces) {
    const tw = p.w + 2 * PAD;
    const th = p.h + 2 * PAD;
    const queue: number[] = [];
    for (let ty = 0; ty < th; ty++) {
      for (let tx = 0; tx < tw; tx++) {
        const sx = p.x - PAD + tx;
        const sy = p.y - PAD + ty;
        const a = (p.ay + ty) * width + p.ax + tx;
        if (sx >= 0 && sy >= 0 && sx < w && sy < h && labels[sy * w + sx] === p.label) {
          const c = pixels[sy * w + sx];
          const alpha = c >>> 24;
          rgb[a] = c | (0xff << 24);
          mask[a] = (0xff << 24) | (alpha << 16) | (alpha << 8) | alpha;
          argb[a] = c;
          owner[a] = p.label;
          queue.push(a);
        }
      }
    }
    const around = context?.(p);
    if (around) {
      for (let ty = 0; ty < th; ty++) {
        for (let tx = 0; tx < tw; tx++) {
          const a = (p.ay + ty) * width + p.ax + tx;
          if (owner[a] !== -1) continue;
          const c = around(p.x - PAD + tx, p.y - PAD + ty);
          if (c === undefined) continue;
          rgb[a] = c;
          owner[a] = p.label;
          queue.push(a);
        }
      }
    }
    // Breadth-first fill of the rest of the gutter from the nearest known pixel.
    for (let head = 0; head < queue.length; head++) {
      const a = queue[head];
      const ax = a % width;
      const ay = (a / width) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = ax + dx;
        const ny = ay + dy;
        if (nx < p.ax || ny < p.ay || nx >= p.ax + tw || ny >= p.ay + th) continue;
        const b = ny * width + nx;
        if (owner[b] !== -1) continue;
        owner[b] = p.label;
        rgb[b] = rgb[a];
        queue.push(b);
      }
    }
  }
  return { width, height, pieces, labels, region, rgb, mask, argb };
}

/** Max-filters alpha by GROW pixels, keeping colours (which are valid everywhere in the inputs we feed it). */
function grow(argb: Int32Array, w: number, h: number): Int32Array {
  const out = new Int32Array(argb.length);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let a = 0;
      for (let dy = -GROW; dy <= GROW; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) continue;
        for (let dx = -GROW; dx <= GROW; dx++) {
          const xx = x + dx;
          if (xx >= 0 && xx < w) a = Math.max(a, argb[yy * w + xx] >>> 24);
        }
      }
      out[y * w + x] = (a << 24) | (argb[y * w + x] & 0xffffff);
    }
  }
  return out;
}

/**
 * Copies each upscaled piece back into a SCALE× sheet. A piece may only paint its own pixels
 * and the transparent pixels of its own region, so it never spills into another frame.
 */
function unpack(img: Image, atlas: Atlas, hd: Int32Array): Int32Array {
  const W = img.width * SCALE;
  const H = img.height * SCALE;
  const aw = atlas.width * SCALE;
  const out = new Int32Array(W * H);
  for (const p of atlas.pieces) {
    const tw = (p.w + 2 * PAD) * SCALE;
    const th = (p.h + 2 * PAD) * SCALE;
    for (let ty = 0; ty < th; ty++) {
      const y = (p.y - PAD) * SCALE + ty;
      if (y < 0 || y >= H) continue;
      for (let tx = 0; tx < tw; tx++) {
        const x = (p.x - PAD) * SCALE + tx;
        if (x < 0 || x >= W) continue;
        const s = ((y / SCALE) | 0) * img.width + ((x / SCALE) | 0);
        const label = atlas.labels[s];
        if (label !== p.label && (label !== -1 || atlas.region[s] !== p.region)) continue;
        const c = hd[(p.ay * SCALE + ty) * aw + p.ax * SCALE + tx];
        if (c >>> 24 > out[y * W + x] >>> 24) out[y * W + x] = c;
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------- upscalers

function runXbrz(atlas: Atlas): Int32Array {
  const { width: w, height: h } = atlas;
  // xbrz-js wants R,G,B,A byte order in memory.
  const scale = (argb: Int32Array) => {
    const bytes = new Uint8Array(argb.length * 4);
    for (let i = 0; i < argb.length; i++) {
      const c = argb[i];
      bytes[i * 4] = (c >> 16) & 255;
      bytes[i * 4 + 1] = (c >> 8) & 255;
      bytes[i * 4 + 2] = c & 255;
      bytes[i * 4 + 3] = (c >>> 24) & 255;
    }
    const dst = new Uint32Array(w * h * SCALE * SCALE);
    xbrzScale(SCALE, new Uint32Array(bytes.buffer), dst, w, h, xbrzColorFormat.argb, xbrzConfig({ oobRead: "duplicate" }));
    return new Uint8Array(dst.buffer);
  };
  // Colours from the gutter-filled image (valid past the outline), alpha from the real one.
  const colour = scale(atlas.rgb);
  const alpha = scale(atlas.argb);
  const out = new Int32Array(w * h * SCALE * SCALE);
  for (let i = 0; i < out.length; i++) {
    out[i] = (alpha[i * 4 + 3] << 24) | (colour[i * 4] << 16) | (colour[i * 4 + 1] << 8) | colour[i * 4 + 2];
  }
  return grow(out, w * SCALE, h * SCALE);
}

/** Runs one Real-ESRGAN model over every atlas (colour and mask); results are cached by input content. */
function runEsrgan(model: string, atlases: Map<string, Atlas>): Map<string, Int32Array> {
  const inDir = join(cache, "in");
  const outDir = join(cache, "out", model);
  mkdirSync(outDir, { recursive: true });
  const inputs = new Map<string, { rgb: string; mask: string }>();
  const todo = new Map<string, Uint8Array>();
  for (const [k, a] of atlases) {
    const rgb = encodeRgbPng(a.width, a.height, (x, y) => a.rgb[y * a.width + x]);
    const mask = encodeRgbPng(a.width, a.height, (x, y) => a.mask[y * a.width + x]);
    const names = { rgb: `${crc32(rgb).toString(16).padStart(8, "0")}.png`, mask: `${crc32(mask).toString(16).padStart(8, "0")}.png` };
    inputs.set(k, names);
    if (!existsSync(join(outDir, names.rgb))) todo.set(names.rgb, rgb);
    if (!existsSync(join(outDir, names.mask))) todo.set(names.mask, mask);
  }
  if (todo.size) {
    if (!existsSync(esrganBin)) throw new Error(`realesrgan-ncnn-vulkan not found at ${esrganBin} (set REALESRGAN)`);
    rmSync(inDir, { recursive: true, force: true });
    mkdirSync(inDir, { recursive: true });
    for (const [name, png] of todo) writeFileSync(join(inDir, name), png);
    console.log(`${model}: upscaling ${todo.size} atlases…`);
    const models = join(dirname(esrganBin), "models");
    execFileSync(esrganBin, ["-i", inDir, "-o", outDir, "-m", models, "-n", model, "-s", String(SCALE), "-f", "png"], { stdio: ["ignore", "ignore", "inherit"] });
  }
  const result = new Map<string, Int32Array>();
  for (const [k, a] of atlases) {
    const names = inputs.get(k)!;
    const rgb = decodePng(readFileSync(join(outDir, names.rgb)));
    const mask = decodePng(readFileSync(join(outDir, names.mask)));
    if (rgb.width !== a.width * SCALE || mask.width !== a.width * SCALE) throw new Error(`${model} ${k}: unexpected size ${rgb.width}`);
    const hard = a.mask.every((m) => (m & 255) === 0 || (m & 255) === 255);
    const alpha = new Uint8Array(rgb.argb.length);
    for (let i = 0; i < alpha.length; i++) {
      const m = mask.argb[i] & 255;
      // Binary sources get a crisp but anti-aliased edge at the model's 50% contour.
      alpha[i] = hard ? Math.max(0, Math.min(255, Math.round(((m - 96) * 255) / 64))) : m;
    }
    const w = a.width * SCALE;
    const h = a.height * SCALE;
    if (a.soft) feather(alpha, w, h);
    const out = new Int32Array(rgb.argb.length);
    for (let i = 0; i < out.length; i++) out[i] = (alpha[i] << 24) | (rgb.argb[i] & 0xffffff);
    result.set(k, a.soft ? out : grow(out, w, h));
  }
  return result;
}

/**
 * Fades alpha out inwards over about a source pixel, so the outline reaches zero where the
 * original's did (sprites cropped flush to their sheet would otherwise end in a straight cut).
 */
function feather(alpha: Uint8Array, w: number, h: number): void {
  const r = SCALE - 1;
  const tmp = new Float32Array(alpha.length);
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sum = 0;
        for (let d = -r; d <= r; d++) sum += alpha[y * w + Math.min(w - 1, Math.max(0, x + d))];
        tmp[y * w + x] = sum / (2 * r + 1);
      }
    }
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sum = 0;
        for (let d = -r; d <= r; d++) sum += tmp[Math.min(h - 1, Math.max(0, y + d)) * w + x];
        alpha[y * w + x] = Math.round(sum / (2 * r + 1));
      }
    }
  }
  for (let i = 0; i < alpha.length; i++) alpha[i] = Math.max(0, Math.min(255, (alpha[i] - 128) * 2));
}

// ---------------------------------------------------------------- redrawn logos

type LogoArt =
  /** Redrawn art in tools/hd-logos/ on a flat background colour; crop and exclude are in its pixels. */
  | { source: string; crop?: Rect; exclude?: Rect[] }
  /** Vector art; untrimmed SVGs are rendered at the target's exact output size. */
  | { svg: (width: number, height: number) => string; trim?: false };

interface LogoPart {
  art: LogoArt;
  /** Area of the original (source pixels) whose core the art is stretched over; default the whole image. */
  target?: Rect;
  /** Core pixels in these areas belong to another part. */
  ignore?: Rect[];
}

interface Logo {
  key: string;
  /** What the redrawn art replaces: everything opaque, or the area inside the dark outline (keeping the baked-in glow around it). */
  core: "opaque" | "outlined";
  parts: LogoPart[];
}

const LOGOS: Logo[] = [
  {
    key: "f3c54619", // Glu splash
    core: "opaque",
    parts: [
      { art: { source: "glu.png" }, ignore: [[86, 15, 8, 14]] },
      { art: { svg: () => `<text font-family="Arial" font-weight="bold" font-size="40" fill="#f4ae24">TM</text>` }, target: [86, 15, 8, 14] },
    ],
  },
  { key: "69a601ff", core: "opaque", parts: [{ art: { source: "handygames.png" } }] }, // HandyGames splash
  {
    key: "ad4f1221", // menu title
    core: "outlined",
    parts: [{ art: { source: "townsmen.png", crop: [0, 130, 1280, 366], exclude: [[300, 336, 660, 30]] } }],
  },
  {
    key: "23d8bd43", // menu "révolution" banner
    core: "opaque",
    parts: [
      {
        art: {
          // Hollow bars over columns 0-24 and 79-103, rows 3-5, like the original.
          svg: (w) => {
            const s = w / 104;
            const bar = (x: number) => `<rect x="${x * s + s / 2}" y="${3.5 * s}" width="${24 * s}" height="${2 * s}"/>`;
            return `<g fill="#fff" stroke="#181e25" stroke-width="${s}">${bar(0)}${bar(79)}</g>`;
          },
          trim: false,
        },
      },
      {
        art: {
          svg: () =>
            `<text font-family="Georgia" font-weight="bold" font-size="120" fill="#fff" stroke="#181e25" stroke-width="12" stroke-linejoin="round" paint-order="stroke">révolution</text>`,
        },
        target: [28, 0, 50, 10],
      },
    ],
  },
];

/** Logos that are other logos stacked together: the splash title is the menu title over the banner. */
const LOGO_STACKS: { key: string; layers: { key: string; x: number; y: number }[] }[] = [
  {
    key: "9ce95752",
    layers: [
      { key: "ad4f1221", x: 0, y: 0 },
      { key: "23d8bd43", x: 13, y: 39 },
    ],
  },
];

const channel = (c: number, s: number) => (c >> s) & 255;

function logoCore(img: Image, mode: Logo["core"]): Uint8Array {
  const { width: w, height: h, pixels } = img;
  const core = new Uint8Array(w * h);
  if (mode === "opaque") {
    for (let i = 0; i < core.length; i++) core[i] = pixels[i] >>> 24 ? 1 : 0;
    return core;
  }
  // Outlined: whatever the border cannot reach without crossing a dark pixel.
  const dark = (c: number) => c >>> 24 !== 0 && channel(c, 16) * 0.3 + channel(c, 8) * 0.59 + channel(c, 0) * 0.11 < 90;
  const outside = new Uint8Array(w * h);
  const stack: number[] = [];
  for (let i = 0; i < w * h; i++) {
    const x = i % w;
    const y = (i / w) | 0;
    if ((x === 0 || y === 0 || x === w - 1 || y === h - 1) && !dark(pixels[i])) {
      outside[i] = 1;
      stack.push(i);
    }
  }
  while (stack.length) {
    const i = stack.pop()!;
    const x = i % w;
    for (const j of [i - w, i + w, x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1]) {
      if (j >= 0 && j < w * h && !outside[j] && !dark(pixels[j])) {
        outside[j] = 1;
        stack.push(j);
      }
    }
  }
  for (let i = 0; i < core.length; i++) core[i] = outside[i] ? 0 : 1;
  return core;
}

interface Raster {
  data: Buffer;
  width: number;
  height: number;
}

/** Trims fully transparent margins. */
async function trimRaster(r: Raster): Promise<Raster> {
  let x0 = r.width;
  let y0 = r.height;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < r.height; y++) {
    for (let x = 0; x < r.width; x++) {
      if (r.data[(y * r.width + x) * 4 + 3] < 128) continue;
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    }
  }
  const width = x1 - x0 + 1;
  const height = y1 - y0 + 1;
  const data = await sharp(r.data, { raw: { width: r.width, height: r.height, channels: 4 } }).extract({ left: x0, top: y0, width, height }).raw().toBuffer();
  return { data, width, height };
}

/** Cuts redrawn art out of its flat background colour (sampled from a corner). */
async function keyedArt(art: { source: string; crop?: Rect; exclude?: Rect[] }): Promise<Raster> {
  const { data, info } = await sharp(join(import.meta.dirname, "hd-logos", art.source)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const [cx, cy, cw, ch] = art.crop ?? [0, 0, info.width, info.height];
  const at = (x: number, y: number) => (y * info.width + x) * 4;
  const bg = [data[at(4, 4)], data[at(4, 4) + 1], data[at(4, 4) + 2]];
  const out = Buffer.alloc(cw * ch * 4);
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      if (art.exclude?.some(([ex, ey, ew, eh]) => x >= ex && y >= ey && x < ex + ew && y < ey + eh)) continue;
      const i = at(cx + x, cy + y);
      const d = Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
      const a = Math.max(0, Math.min(1, (d - 60) / 80));
      if (a === 0) continue;
      // Remove the background's share from anti-aliased edges, then the magenta that JPEG chroma
      // bled into strokes; near-black is made neutral outright since that tint is all spill.
      const rgb = [0, 1, 2].map((k) => Math.max(0, Math.min(255, (data[i + k] - (1 - a) * bg[k]) / a)));
      const spill = Math.max(0, Math.min(rgb[0], rgb[2]) - rgb[1]);
      rgb[0] -= spill;
      rgb[2] -= spill;
      if (Math.max(...rgb) < 70) rgb.fill(rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11);
      const o = (y * cw + x) * 4;
      for (let k = 0; k < 3; k++) out[o + k] = Math.round(rgb[k]);
      out[o + 3] = Math.round(a * 255);
    }
  }
  return trimRaster({ data: out, width: cw, height: ch });
}

async function renderArt(art: LogoArt, width: number, height: number): Promise<Raster> {
  if ("source" in art) return keyedArt(art);
  if (art.trim === false) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${art.svg(width, height)}</svg>`;
    const data = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();
    return { data, width, height };
  }
  // Render big with room around the baseline, then trim to the ink.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="600"><g transform="translate(100 400)">${art.svg(2400, 600)}</g></svg>`;
  const data = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();
  return trimRaster({ data, width: 2400, height: 600 });
}

/** Replaces a logo's upscaled art with redrawn parts, each stretched over the original's core within its target. */
async function applyLogo(logo: Logo, img: Image, hd: Int32Array): Promise<Int32Array> {
  const W = img.width * SCALE;
  const H = img.height * SCALE;
  const core = logoCore(img, logo.core);
  const coreBox = ([tx, ty, tw, th]: Rect, ignore: Rect[] = []): Rect => {
    let x0 = tx + tw;
    let y0 = ty + th;
    let x1 = -1;
    let y1 = -1;
    for (let y = ty; y < ty + th; y++) {
      for (let x = tx; x < tx + tw; x++) {
        if (!core[y * img.width + x] || ignore.some(([ix, iy, iw, ih]) => x >= ix && y >= iy && x < ix + iw && y < iy + ih)) continue;
        x0 = Math.min(x0, x);
        y0 = Math.min(y0, y);
        x1 = Math.max(x1, x);
        y1 = Math.max(y1, y);
      }
    }
    return [x0, y0, x1 - x0 + 1, y1 - y0 + 1];
  };
  // Keep the baked-in glow, filled in where the old logo was.
  const base = new Int32Array(hd);
  const isCore = (i: number) => core[((((i / W) | 0) / SCALE) | 0) * img.width + (((i % W) / SCALE) | 0)] === 1;
  if (logo.core === "opaque") base.fill(0);
  else {
    const queue: number[] = [];
    const filled = new Uint8Array(W * H);
    for (let i = 0; i < base.length; i++) {
      if (!isCore(i) && base[i] >>> 24) {
        filled[i] = 1;
        queue.push(i);
      }
    }
    for (let head = 0; head < queue.length; head++) {
      const i = queue[head];
      const x = i % W;
      for (const j of [i - W, i + W, x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1]) {
        if (j < 0 || j >= W * H || filled[j] || !isCore(j)) continue;
        filled[j] = 1;
        base[j] = (base[j] & (0xff << 24)) | (base[i] & 0xffffff);
        queue.push(j);
      }
    }
  }
  for (const part of logo.parts) {
    const target = part.target ?? [0, 0, img.width, img.height];
    const [x0, y0, bw, bh] = "svg" in part.art && part.art.trim === false ? target : coreBox(target, part.ignore);
    const tw = bw * SCALE;
    const th = bh * SCALE;
    const art = await renderArt(part.art, tw, th);
    const fitted = await sharp(art.data, { raw: { width: art.width, height: art.height, channels: 4 } })
      .resize(tw, th, { fit: "fill", kernel: "lanczos3" })
      .raw()
      .toBuffer();
    over(base, W, fitted, tw, th, x0 * SCALE, y0 * SCALE);
  }
  return base;
}

/** Composites straight RGBA over ARGB at (left, top). */
function over(dst: Int32Array, dw: number, src: Uint8Array, sw: number, sh: number, left: number, top: number): void {
  const dh = dst.length / dw;
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const o = (y * sw + x) * 4;
      const a = src[o + 3] / 255;
      const dx = left + x;
      const dy = top + y;
      if (a === 0 || dx < 0 || dy < 0 || dx >= dw || dy >= dh) continue;
      const i = dy * dw + dx;
      const b = dst[i];
      const ba = (b >>> 24) / 255;
      const oa = a + ba * (1 - a);
      const mix = (k: number, s: number) => Math.round((src[o + k] * a + channel(b, s) * ba * (1 - a)) / oa);
      dst[i] = (Math.round(oa * 255) << 24) | (mix(0, 16) << 16) | (mix(1, 8) << 8) | mix(2, 0);
    }
  }
}

/** Builds a stacked logo from its already-replaced layers, checking they really make up the original. */
function stackLogo(stack: (typeof LOGO_STACKS)[number], sheets: Map<string, Sheet>, out: Map<string, Int32Array>): Int32Array {
  const img = sheets.get(stack.key)!.img;
  const W = img.width * SCALE;
  const result = new Int32Array(W * img.height * SCALE);
  let matched = 0;
  for (const layer of stack.layers) {
    const part = sheets.get(layer.key)!.img;
    for (let y = 0; y < part.height; y++) {
      for (let x = 0; x < part.width; x++) {
        const c = part.pixels[y * part.width + x];
        if (c >>> 24 && img.pixels[(y + layer.y) * img.width + x + layer.x] === c) matched++;
      }
    }
    over(result, W, toRgba(out.get(layer.key)!), part.width * SCALE, part.height * SCALE, layer.x * SCALE, layer.y * SCALE);
  }
  const opaque = img.pixels.filter((c) => c >>> 24).length;
  if (matched < opaque * 0.95) throw new Error(`logo stack ${stack.key}: layers match only ${matched} of ${opaque} pixels`);
  return result;
}

// ---------------------------------------------------------------- output

function toRgba(argb: Int32Array): Buffer {
  const rgba = Buffer.alloc(argb.length * 4);
  for (let i = 0; i < argb.length; i++) {
    const c = argb[i];
    rgba[i * 4] = channel(c, 16);
    rgba[i * 4 + 1] = channel(c, 8);
    rgba[i * 4 + 2] = channel(c, 0);
    rgba[i * 4 + 3] = c >>> 24;
  }
  return rgba;
}

function encodeWebp(width: number, height: number, argb: Int32Array): Promise<Buffer> {
  return sharp(toRgba(argb), { raw: { width, height, channels: 4 } }).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toBuffer();
}

/** Lists the packs present in public/hd for the game's quality toggle. */
function writePackIndex(): void {
  const dir = join(root, "public/hd");
  const present = new Set(readdirSync(dir).filter((d) => existsSync(join(dir, d, "manifest.json"))));
  const packs = Object.entries(PACKS)
    .filter(([id]) => present.has(id))
    .map(([id, p]) => ({ id, label: p.label }));
  writeFileSync(join(dir, "packs.json"), JSON.stringify(packs));
}

// ---------------------------------------------------------------- comparison sheets

function writeComparison(key: string, img: Image, packs: Int32Array[]): void {
  const W = img.width * SCALE;
  const H = img.height * SCALE;
  const gap = 8;
  const cols = packs.length + 1;
  const total = cols * W + (cols - 1) * gap;
  const panels: Int32Array[] = [new Int32Array(W * H), ...packs];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) panels[0][y * W + x] = img.pixels[((y / SCALE) | 0) * img.width + ((x / SCALE) | 0)];
  }
  writeFileSync(
    join(cache, "compare", `${key}.png`),
    encodeRgbPng(total, H, (x, y) => {
      const col = Math.floor(x / (W + gap));
      const px = x - col * (W + gap);
      const bg = ((x >> 3) + (y >> 3)) & 1 ? 0x3a3a3a : 0x2a2a2a;
      if (px >= W) return 0x101010;
      const c = panels[col][y * W + px];
      const a = (c >>> 24) / 255;
      const mix = (s: number) => Math.round(((c >> s) & 255) * a + ((bg >> s) & 255) * (1 - a)) << s;
      return mix(16) | mix(8) | mix(0);
    }),
  );
}

// ---------------------------------------------------------------- main

async function main(wanted: string[]): Promise<void> {
  for (const id of wanted) if (!PACKS[id]) throw new Error(`unknown pack ${id}; known: ${Object.keys(PACKS).join(", ")}`);
  const usage = collectUsage();
  const { sheets, frames, slots } = collectImages(new Uint8Array(readFileSync(jarPath)));
  let observed = 0;
  let guessed = 0;
  const atlases = new Map<string, Atlas>();
  for (const [key, sheet] of sheets) {
    let rects = usage.get(key);
    if (rects) observed++;
    else if ((rects = frameRun(frames, sheet.img.width, sheet.img.height))) guessed++;
    const slot = slots.images.indexOf(sheet.img);
    const atlas = buildAtlas(sheet, rects, terrainContext(slots, slot));
    atlas.soft = LAND_DECORATIONS.includes(slot) || WATER_DECORATIONS.includes(slot);
    atlases.set(key, atlas);
  }
  console.log(`${sheets.size} distinct images: ${observed} with frames seen in test replays, ${guessed} matched to frame-table runs, rest split by cell grid`);

  const results = new Map<string, Map<string, Int32Array>>();
  for (const id of wanted) {
    const pack = PACKS[id];
    const hd = pack.kind === "xbrz" ? new Map([...atlases].map(([k, a]) => [k, runXbrz(a)])) : runEsrgan(pack.model, atlases);
    if (pack.kind === "esrgan") for (const key of pack.xbrz ?? []) hd.set(key, runXbrz(atlases.get(key)!));
    const dir = join(root, "public/hd", id);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    const out = new Map<string, Int32Array>();
    for (const [key, { img }] of sheets) {
      let sheet = unpack(img, atlases.get(key)!, hd.get(key)!);
      const logo = pack.logos ? LOGOS.find((l) => l.key === key) : undefined;
      if (logo) sheet = await applyLogo(logo, img, sheet);
      out.set(key, sheet);
    }
    if (pack.logos) for (const stack of LOGO_STACKS) out.set(stack.key, stackLogo(stack, sheets, out));
    let bytes = 0;
    for (const [key, { img }] of sheets) {
      const webp = await encodeWebp(img.width * SCALE, img.height * SCALE, out.get(key)!);
      bytes += webp.length;
      writeFileSync(join(dir, `${key}.webp`), webp);
    }
    writeFileSync(join(dir, "manifest.json"), JSON.stringify({ scale: SCALE, ext: "webp", keys: [...sheets.keys()].sort() }));
    results.set(id, out);
    console.log(`${id}: ${sheets.size} sheets, ${(bytes / 1048576).toFixed(1)} MB`);
  }
  writePackIndex();

  mkdirSync(join(cache, "compare"), { recursive: true });
  for (const [key, { img }] of sheets) writeComparison(key, img, wanted.map((id) => results.get(id)!.get(key)!));
  console.log(`comparisons in ${join(cache, "compare")}`);
}

const args = process.argv.slice(2);
if (args[0] === "--usage") printUsage(args[1], Number(args[2]), Number(args[3]));
else await main(args.length ? args : DEFAULT_PACKS);
