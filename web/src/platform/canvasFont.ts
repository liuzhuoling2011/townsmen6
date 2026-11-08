// System-font engine for the browser: metrics from measureText, glyphs rasterized
// with anti-aliasing for software targets (the game measures fonts by drawing into
// a mutable image and scanning its pixels).

import { Font, type FontEngine, type Graphics } from "../runtime/midp";

export const FONT_FAMILY = 'Verdana, "DejaVu Sans", "Segoe UI", sans-serif';

export function fontPx(f: Font): number {
  return f.size === Font.SIZE_SMALL ? 10 : f.size === Font.SIZE_LARGE ? 13 : 11;
}

export function cssFont(f: Font, scale: number): string {
  const italic = f.style & Font.STYLE_ITALIC ? "italic " : "";
  const bold = f.style & Font.STYLE_BOLD ? "bold " : "";
  return `${italic}${bold}${fontPx(f) * scale}px ${FONT_FAMILY}`;
}

export class CanvasFontEngine implements FontEngine {
  private readonly ctx: OffscreenCanvasRenderingContext2D;
  private readonly widths = new Map<string, number>();
  private readonly glyphs = new Map<string, { w: number; h: number; alpha: Uint8ClampedArray }>();

  constructor() {
    this.ctx = new OffscreenCanvas(64, 64).getContext("2d", { willReadFrequently: true })!;
  }

  height(f: Font): number {
    return Math.ceil(fontPx(f) * 1.35);
  }

  baseline(f: Font): number {
    return Math.round(fontPx(f) * 1.05);
  }

  charWidth(f: Font, c: number): number {
    const key = `${f.id()}|${c}`;
    let w = this.widths.get(key);
    if (w === undefined) {
      this.ctx.font = cssFont(f, 1);
      w = Math.max(1, Math.round(this.ctx.measureText(String.fromCharCode(c)).width));
      this.widths.set(key, w);
    }
    return w;
  }

  private glyph(f: Font, c: number) {
    const key = `${f.id()}|${c}`;
    let g = this.glyphs.get(key);
    if (!g) {
      const w = this.charWidth(f, c) + 2;
      const h = this.height(f);
      const ctx = this.ctx;
      ctx.clearRect(0, 0, 64, 64);
      ctx.font = cssFont(f, 1);
      ctx.fillStyle = "#000";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(String.fromCharCode(c), 0, this.baseline(f));
      const data = ctx.getImageData(0, 0, w, h).data;
      const alpha = new Uint8ClampedArray(w * h);
      for (let i = 0; i < w * h; i++) alpha[i] = data[i * 4 + 3];
      g = { w, h, alpha };
      this.glyphs.set(key, g);
    }
    return g;
  }

  draw(g: Graphics, f: Font, s: string, x: number, y: number, argb: number): void {
    const rgb = argb & 0xffffff;
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      if (c !== 32) {
        const gl = this.glyph(f, c);
        for (let yy = 0; yy < gl.h; yy++) {
          for (let xx = 0; xx < gl.w; xx++) {
            const a = gl.alpha[yy * gl.w + xx];
            if (a > 40) g.plot(x + xx, y + yy, ((Math.min(255, a * 1.4) << 24) | rgb) | 0);
          }
        }
      }
      x += this.charWidth(f, c);
    }
  }
}
