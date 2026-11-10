// Minimal PNG encoders for tooling (screenshots, icons, HD art).

import { zlibSync } from "fflate";
import { crc32 } from "../src/runtime/midp";

function encode(width: number, height: number, colorType: 2 | 6, channels: number, write: (raw: Uint8Array, o: number, x: number, y: number) => void): Uint8Array {
  const stride = width * channels + 1;
  const raw = new Uint8Array(stride * height);
  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0;
    for (let x = 0; x < width; x++) write(raw, y * stride + 1 + x * channels, x, y);
  }
  const chunk = (type: string, body: Uint8Array): Uint8Array => {
    const out = new Uint8Array(12 + body.length);
    const dv = new DataView(out.buffer);
    dv.setUint32(0, body.length);
    for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
    out.set(body, 8);
    dv.setUint32(8 + body.length, crc32(out.subarray(4, 8 + body.length)));
    return out;
  };
  const ihdr = new Uint8Array(13);
  const dv = new DataView(ihdr.buffer);
  dv.setUint32(0, width);
  dv.setUint32(4, height);
  ihdr[8] = 8;
  ihdr[9] = colorType;
  const parts = [
    Uint8Array.of(137, 80, 78, 71, 13, 10, 26, 10),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlibSync(raw, { level: 9 })),
    chunk("IEND", new Uint8Array(0)),
  ];
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

export function encodeRgbPng(width: number, height: number, pixel: (x: number, y: number) => number): Uint8Array {
  return encode(width, height, 2, 3, (raw, o, x, y) => {
    const p = pixel(x, y);
    raw[o] = (p >> 16) & 255;
    raw[o + 1] = (p >> 8) & 255;
    raw[o + 2] = p & 255;
  });
}

/** Encodes ARGB ints as an RGBA PNG. */
export function encodeArgbPng(width: number, height: number, argb: Int32Array): Uint8Array {
  return encode(width, height, 6, 4, (raw, o, x, y) => {
    const p = argb[y * width + x];
    raw[o] = (p >> 16) & 255;
    raw[o + 1] = (p >> 8) & 255;
    raw[o + 2] = p & 255;
    raw[o + 3] = (p >>> 24) & 255;
  });
}
