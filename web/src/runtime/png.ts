// Synchronous PNG decoder (non-interlaced) producing ARGB ints, matching javax.imageio's getRGB values.

import { unzlibSync } from "fflate";

export interface DecodedImage {
  width: number;
  height: number;
  argb: Int32Array;
}

function u32(b: Uint8Array, o: number): number {
  return ((b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3]) >>> 0;
}

export function decodePng(data: Uint8Array): DecodedImage {
  const sig = [137, 80, 78, 71, 13, 10, 26, 10];
  for (let i = 0; i < 8; i++) if (data[i] !== sig[i]) throw new Error("not a PNG");
  let pos = 8;
  let width = 0;
  let height = 0;
  let depth = 0;
  let colorType = 0;
  let interlace = 0;
  let palette: Uint8Array | null = null;
  let trns: Uint8Array | null = null;
  const idat: Uint8Array[] = [];
  while (pos < data.length) {
    const len = u32(data, pos);
    const type = String.fromCharCode(data[pos + 4], data[pos + 5], data[pos + 6], data[pos + 7]);
    const body = data.subarray(pos + 8, pos + 8 + len);
    pos += 12 + len;
    if (type === "IHDR") {
      width = u32(body, 0);
      height = u32(body, 4);
      depth = body[8];
      colorType = body[9];
      interlace = body[12];
    } else if (type === "PLTE") {
      palette = body;
    } else if (type === "tRNS") {
      trns = body;
    } else if (type === "IDAT") {
      idat.push(body);
    } else if (type === "IEND") {
      break;
    }
  }
  if (interlace !== 0) throw new Error("interlaced PNG not supported");
  let total = 0;
  for (const c of idat) total += c.length;
  const z = new Uint8Array(total);
  let o = 0;
  for (const c of idat) {
    z.set(c, o);
    o += c.length;
  }
  const raw = unzlibSync(z);
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType as 0 | 2 | 3 | 4 | 6];
  if (!channels) throw new Error(`PNG color type ${colorType}`);
  const bitsPerPixel = channels * depth;
  const stride = Math.ceil((width * bitsPerPixel) / 8);
  const bpp = Math.max(1, bitsPerPixel >> 3);
  const lines = new Uint8Array(stride * height);
  let prev = new Uint8Array(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = lines.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let v = src[x];
      switch (filter) {
        case 1: v += a; break;
        case 2: v += b; break;
        case 3: v += (a + b) >> 1; break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          break;
        }
      }
      cur[x] = v & 0xff;
    }
    prev = cur;
  }
  const argb = new Int32Array(width * height);
  const sample = (row: Uint8Array, index: number): number => {
    if (depth === 8) return row[index];
    if (depth === 16) return row[index * 2];
    const perByte = 8 / depth;
    const byte = row[Math.floor(index / perByte)];
    const shift = (perByte - 1 - (index % perByte)) * depth;
    return (byte >> shift) & ((1 << depth) - 1);
  };
  const scale = (v: number): number => (depth === 16 ? v : depth === 8 ? v : Math.round((v * 255) / ((1 << depth) - 1)));
  for (let y = 0; y < height; y++) {
    const row = lines.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < width; x++) {
      let r: number, g: number, b: number, a = 255;
      switch (colorType) {
        case 3: {
          const i = sample(row, x);
          r = palette![i * 3];
          g = palette![i * 3 + 1];
          b = palette![i * 3 + 2];
          if (trns && i < trns.length) a = trns[i];
          break;
        }
        case 0: {
          const v = sample(row, x);
          r = g = b = scale(v);
          if (trns && v === ((trns[0] << 8) | trns[1])) a = 0;
          break;
        }
        case 2: {
          const k = x * 3;
          r = sample(row, k);
          g = sample(row, k + 1);
          b = sample(row, k + 2);
          if (trns && depth === 8 && r === trns[1] && g === trns[3] && b === trns[5]) a = 0;
          break;
        }
        case 4: {
          r = g = b = sample(row, x * 2);
          a = sample(row, x * 2 + 1);
          break;
        }
        default: {
          const k = x * 4;
          r = sample(row, k);
          g = sample(row, k + 1);
          b = sample(row, k + 2);
          a = sample(row, k + 3);
        }
      }
      argb[y * width + x] = (a << 24) | (r << 16) | (g << 8) | b;
    }
  }
  return { width, height, argb };
}
