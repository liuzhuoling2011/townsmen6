// Screen Graphics that draws straight onto a Canvas2D at an integer scale:
// pixel art stays nearest-neighbour (or is swapped for an upscaled art pack) while text
// is rendered with real fonts at device resolution. Game logic never reads screen
// pixels, so only the look changes.

import { Device, Graphics, Image } from "../runtime/midp";
import { cssFont } from "./canvasFont";
import { hdTexture } from "./hdArt";

type Source = HTMLCanvasElement | OffscreenCanvas;

const sources = new WeakMap<Image, { version: number; canvas: Source }>();

function sourceOf(img: Image): Source {
  const cached = sources.get(img);
  if (cached && cached.version === img.version) return cached.canvas;
  const canvas = cached?.canvas ?? new OffscreenCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
  const data = ctx.createImageData(img.width, img.height);
  const px = img.pixels;
  const out = data.data;
  for (let i = 0; i < px.length; i++) {
    const p = px[i];
    out[i * 4] = (p >> 16) & 255;
    out[i * 4 + 1] = (p >> 8) & 255;
    out[i * 4 + 2] = p & 255;
    out[i * 4 + 3] = (p >>> 24) & 255;
  }
  ctx.putImageData(data, 0, 0);
  sources.set(img, { version: img.version, canvas });
  return canvas;
}

/** Source->destination affine maps for the eight MIDP transforms (dw/dh are destination size). */
function transformMatrix(t: number, dw: number, dh: number): [number, number, number, number, number, number] {
  switch (t) {
    case 1: return [1, 0, 0, -1, 0, dh];
    case 2: return [-1, 0, 0, 1, dw, 0];
    case 3: return [-1, 0, 0, -1, dw, dh];
    case 4: return [0, 1, 1, 0, 0, 0];
    case 5: return [0, 1, -1, 0, dw, 0];
    case 6: return [0, -1, 1, 0, 0, dh];
    case 7: return [0, -1, -1, 0, dw, dh];
    default: return [1, 0, 0, 1, 0, 0];
  }
}

export class HdGraphics extends Graphics {
  private appliedClip = "";

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly scale: number,
    stub: Image,
  ) {
    super(stub, "screen", Device.width, Device.height);
    ctx.save();
    ctx.imageSmoothingEnabled = false;
  }

  finish(): void {
    this.ctx.restore();
  }

  private prepare(): void {
    const key = `${this.clipX},${this.clipY},${this.clipW},${this.clipH}`;
    if (key === this.appliedClip) return;
    const ctx = this.ctx;
    const s = this.scale;
    ctx.restore();
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.beginPath();
    ctx.rect(this.clipX * s, this.clipY * s, this.clipW * s, this.clipH * s);
    ctx.clip();
    this.appliedClip = key;
  }

  private css(argb: number): string {
    return `#${(argb & 0xffffff).toString(16).padStart(6, "0")}`;
  }

  fillRect(x: number, y: number, w: number, h: number): void {
    if (w <= 0 || h <= 0) return;
    this.prepare();
    const s = this.scale;
    this.ctx.fillStyle = this.css(this.color);
    this.ctx.fillRect((x + this.tx) * s, (y + this.ty) * s, w * s, h * s);
  }

  drawRect(x: number, y: number, w: number, h: number): void {
    if (w < 0 || h < 0) return;
    this.fillRect(x, y, w + 1, 1);
    this.fillRect(x, y + h, w + 1, 1);
    if (h > 1) {
      this.fillRect(x, y + 1, 1, h - 1);
      this.fillRect(x + w, y + 1, 1, h - 1);
    }
  }

  drawLine(x1: number, y1: number, x2: number, y2: number): void {
    if (y1 === y2) {
      this.fillRect(Math.min(x1, x2), y1, Math.abs(x2 - x1) + 1, 1);
      return;
    }
    if (x1 === x2) {
      this.fillRect(x1, Math.min(y1, y2), 1, Math.abs(y2 - y1) + 1);
      return;
    }
    const dx = Math.abs(x2 - x1);
    const dy = -Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx + dy;
    for (;;) {
      this.fillRect(x1, y1, 1, 1);
      if (x1 === x2 && y1 === y2) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x1 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y1 += sy;
      }
    }
  }

  drawImage(img: Image, x: number, y: number, anchor: number): void {
    this.drawRegion(img, 0, 0, img.width, img.height, 0, x, y, anchor);
  }

  drawRegion(img: Image, sx: number, sy: number, w: number, h: number, transform: number, x: number, y: number, anchor: number): void {
    if (w <= 0 || h <= 0) return;
    const swap = (transform & 4) !== 0;
    const dw = swap ? h : w;
    const dh = swap ? w : h;
    x += this.tx;
    y += this.ty;
    if (anchor & Graphics.HCENTER) x -= (dw / 2) | 0;
    else if (anchor & Graphics.RIGHT) x -= dw;
    if (anchor & Graphics.VCENTER) y -= (dh / 2) | 0;
    else if (anchor & Graphics.BOTTOM) y -= dh;
    this.prepare();
    const s = this.scale;
    const ctx = this.ctx;
    const [a, b, c, d, e, f] = transformMatrix(transform, dw, dh);
    const hd = hdTexture(img);
    if (hd) {
      const k = hd.scale;
      const r = s / k;
      ctx.setTransform(a * r, b * r, c * r, d * r, (x + e) * s, (y + f) * s);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(hd.source, sx * k, sy * k, w * k, h * k, 0, 0, w * k, h * k);
      ctx.imageSmoothingEnabled = false;
    } else {
      ctx.setTransform(a * s, b * s, c * s, d * s, (x + e) * s, (y + f) * s);
      ctx.drawImage(sourceOf(img), sx, sy, w, h, 0, 0, w, h);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawString(str: string, x: number, y: number, anchor: number): void {
    const font = this.font;
    const w = font.stringWidth(str);
    const h = font.getHeight();
    x += this.tx;
    y += this.ty;
    if (anchor & Graphics.HCENTER) x -= (w / 2) | 0;
    else if (anchor & Graphics.RIGHT) x -= w;
    if (anchor & Graphics.BOTTOM) y -= h;
    else if (anchor & Graphics.BASELINE) y -= font.getBaselinePosition();
    else if (anchor & Graphics.VCENTER) y -= (h / 2) | 0;
    this.prepare();
    const s = this.scale;
    const ctx = this.ctx;
    ctx.font = cssFont(font, s);
    ctx.fillStyle = this.css(this.color);
    ctx.textBaseline = "alphabetic";
    const base = (y + font.getBaselinePosition()) * s;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      if (ch !== 32) ctx.fillText(str[i], x * s, base);
      x += font.charWidth(ch);
    }
  }
}

export function installHdScreen(canvas: HTMLCanvasElement, scale: number): void {
  const ctx = canvas.getContext("2d", { alpha: false })!;
  const stub = new Image(1, 1, true, false);
  Device.screenGraphics = () => new HdGraphics(ctx, scale, stub);
}
