// MIDP 2.0 / MMAPI / RMS subset with the same semantics as the Java reference host
// (research/midp), so frames can be compared pixel for pixel.

import { JavaException, type Runnable } from "./java";
import { InputStream, IOFailure, Sys } from "./io";
import { decodePng } from "./png";

// ---------------------------------------------------------------- device

export interface FontEngine {
  height(f: Font): number;
  baseline(f: Font): number;
  charWidth(f: Font, c: number): number;
  /** Draws s with its top-left at (x, y) in target coordinates, honouring the clip. */
  draw(g: Graphics, f: Font, s: string, x: number, y: number, argb: number): void;
}

export interface AudioEngine {
  create(data: Int8Array, type: string): PlayerImpl;
}

export interface RecordStorage {
  load(): Map<string, (Int8Array | null)[]>;
  save(stores: Map<string, (Int8Array | null)[]>): void;
}

export const Device = {
  width: 128,
  height: 128,
  properties: new Map<string, string>(),
  current: null as Canvas | null,
  serial: [] as Runnable[],
  repaintRequested: false,
  destroyed: false,
  nextImageId: 0,
  screen: null as Image | null,
  font: null as unknown as FontEngine,
  audio: null as unknown as AudioEngine,
  storage: null as RecordStorage | null,
  stores: new Map<string, (Int8Array | null)[]>(),
  eventLog: null as ((line: string) => void) | null,
  drawLog: null as ((line: string) => void) | null,
  platformRequest: (url: string) => console.info("platformRequest", url),

  log(line: string): void {
    Device.eventLog?.(line);
  },

  resourceBytes(name: string): Int8Array | null {
    return Sys.resources.get(name) ?? null;
  },

  ensureScreen(): Image {
    if (!Device.screen || Device.screen.width !== Device.width || Device.screen.height !== Device.height) {
      const id = Device.nextImageId;
      const img = new Image(Device.width, Device.height, true, false);
      Device.nextImageId = id;
      img.pixels.fill(0xff000000 | 0);
      Device.screen = img;
    }
    return Device.screen;
  },

  /** Replaces the software screen with another Graphics backend (e.g. the HD canvas). */
  screenGraphics: null as (() => Graphics) | null,

  paintNow(): void {
    Device.repaintRequested = false;
    if (!Device.current) return;
    const g = Device.screenGraphics ? Device.screenGraphics() : new Graphics(Device.ensureScreen(), "screen");
    Device.current.dispatchPaint(g);
    g.finish();
  },

  /** One scheduler tick: run queued serial callbacks, then paint if requested. Returns true if painted. */
  step(): boolean {
    const n = Device.serial.length;
    for (let i = 0; i < n; i++) Device.serial.shift()!.run();
    if (Device.repaintRequested) {
      Device.paintNow();
      return true;
    }
    return false;
  },

  key(code: number, down: boolean): void {
    Device.log(`key ${code} ${down ? "down" : "up"}`);
    Device.current?.dispatchKey(code, down);
  },

  persist(): void {
    Device.storage?.save(Device.stores);
  },
};

// ---------------------------------------------------------------- fonts

export class Font {
  static readonly FACE_SYSTEM = 0;
  static readonly STYLE_PLAIN = 0;
  static readonly STYLE_BOLD = 1;
  static readonly STYLE_ITALIC = 2;
  static readonly SIZE_SMALL = 8;
  static readonly SIZE_MEDIUM = 0;
  static readonly SIZE_LARGE = 16;
  private static readonly DEFAULT = new Font(0, 0, 0);

  private constructor(
    readonly face: number,
    readonly style: number,
    readonly size: number,
  ) {}

  static getDefaultFont(): Font {
    return Font.DEFAULT;
  }
  static getFont(face: number, style: number, size: number): Font {
    return new Font(face, style, size);
  }
  getHeight(): number {
    return Device.font.height(this);
  }
  getBaselinePosition(): number {
    return Device.font.baseline(this);
  }
  charWidth(c: number): number {
    return Device.font.charWidth(this, c);
  }
  stringWidth(s: string): number {
    let w = 0;
    for (let i = 0; i < s.length; i++) w += Device.font.charWidth(this, s.charCodeAt(i));
    return w;
  }
  id(): string {
    return `${this.face}/${this.style}/${this.size}`;
  }
}

/** Deterministic box glyphs identical to the Java reference host's Font/Graphics. */
export class BoxFontEngine implements FontEngine {
  height(f: Font): number {
    return f.size === Font.SIZE_SMALL ? 12 : f.size === Font.SIZE_LARGE ? 16 : 14;
  }
  baseline(f: Font): number {
    return this.height(f) - 3;
  }
  charWidth(f: Font, c: number): number {
    let base = f.size === Font.SIZE_SMALL ? 5 : f.size === Font.SIZE_LARGE ? 7 : 6;
    if (f.style & Font.STYLE_BOLD) base++;
    if (c === 32) return base - 2;
    // i l . , ! ' :
    if (c === 105 || c === 108 || c === 46 || c === 44 || c === 33 || c === 39 || c === 58) return base - 3;
    // m w M W
    if (c === 109 || c === 119 || c === 77 || c === 87) return base + 2;
    return base;
  }
  draw(g: Graphics, f: Font, s: string, x: number, y: number, argb: number): void {
    const h = this.height(f);
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      const cw = this.charWidth(f, c);
      if (c !== 32) {
        for (let yy = y + 1; yy < y + h - 1; yy++) {
          for (let xx = x; xx < x + cw - 1; xx++) g.plot(xx, yy, argb);
        }
      }
      x += cw;
    }
  }
}

// ---------------------------------------------------------------- images and graphics

export class Image {
  readonly pixels: Int32Array;
  readonly id: number;
  /** Bumped on every mutation so renderers can cache uploads. */
  version = 0;

  constructor(
    readonly width: number,
    readonly height: number,
    readonly mutable: boolean,
    white = true,
    pixels?: Int32Array,
  ) {
    this.pixels = pixels ?? new Int32Array(width * height);
    if (!pixels && white) this.pixels.fill(-1);
    this.id = Device.nextImageId++;
  }

  static createImage(a: number | string | Int8Array, b?: number, c?: number): Image {
    if (typeof a === "number") {
      const img = new Image(a, b!, true);
      Device.log(`createImage#${img.id} ${a}x${b}`);
      return img;
    }
    if (typeof a === "string") {
      const key = a.startsWith("/") ? a.slice(1) : a;
      const data = Device.resourceBytes(key);
      if (!data) throw new IOFailure(a);
      const img = Image.decode(data);
      Device.log(`createImage#${img.id} ${a}`);
      return img;
    }
    const bytes = a.subarray(b!, b! + c!);
    const img = Image.decode(bytes);
    Device.log(`createImage#${img.id} bytes ${c} ${crc32Hex(bytes)}`);
    return img;
  }

  private static decode(bytes: Int8Array): Image {
    let decoded;
    try {
      decoded = decodePng(new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.length));
    } catch (e) {
      throw new JavaException(`IllegalArgumentException: ${(e as Error).message}`);
    }
    return new Image(decoded.width, decoded.height, false, false, decoded.argb);
  }

  getGraphics(): Graphics {
    if (!this.mutable) throw new JavaException("IllegalStateException");
    return new Graphics(this, `img#${this.id}`);
  }
  getWidth(): number {
    return this.width;
  }
  getHeight(): number {
    return this.height;
  }
  isMutable(): boolean {
    return this.mutable;
  }
  getRGB(rgb: Int32Array, offset: number, scan: number, x: number, y: number, w: number, h: number): void {
    for (let row = 0; row < h; row++) {
      for (let col = 0; col < w; col++) {
        rgb[offset + row * scan + col] = this.pixels[(y + row) * this.width + x + col];
      }
    }
  }
}

export class Graphics {
  static readonly HCENTER = 1;
  static readonly VCENTER = 2;
  static readonly LEFT = 4;
  static readonly RIGHT = 8;
  static readonly TOP = 16;
  static readonly BOTTOM = 32;
  static readonly BASELINE = 64;

  protected color = 0xff000000 | 0;
  protected font = Font.getDefaultFont();
  protected clipX = 0;
  protected clipY = 0;
  protected clipW: number;
  protected clipH: number;
  protected tx = 0;
  protected ty = 0;
  protected readonly w: number;
  protected readonly h: number;
  private readonly px: Int32Array;

  constructor(
    private readonly target: Image,
    protected readonly name: string,
    width = target.width,
    height = target.height,
  ) {
    this.w = width;
    this.h = height;
    this.px = target.pixels;
    this.clipW = this.w;
    this.clipH = this.h;
  }

  /** Called once the canvas finished painting a frame. */
  finish(): void {}

  protected log(op: string): void {
    Device.drawLog?.(`${this.name} ${op}`);
  }

  setColor(rgb: number, g?: number, b?: number): void {
    if (g !== undefined) rgb = (rgb << 16) | (g << 8) | b!;
    this.color = (0xff000000 | (rgb & 0xffffff)) | 0;
  }
  getColor(): number {
    return this.color & 0xffffff;
  }
  setFont(f: Font | null): void {
    this.font = f ?? Font.getDefaultFont();
  }
  getFont(): Font {
    return this.font;
  }
  translate(x: number, y: number): void {
    this.tx += x;
    this.ty += y;
  }
  getTranslateX(): number {
    return this.tx;
  }
  getTranslateY(): number {
    return this.ty;
  }
  setClip(x: number, y: number, w: number, h: number): void {
    x += this.tx;
    y += this.ty;
    const x2 = Math.min(x + w, this.w);
    const y2 = Math.min(y + h, this.h);
    this.clipX = Math.max(x, 0);
    this.clipY = Math.max(y, 0);
    this.clipW = Math.max(x2 - this.clipX, 0);
    this.clipH = Math.max(y2 - this.clipY, 0);
  }
  clipRect(x: number, y: number, w: number, h: number): void {
    x += this.tx;
    y += this.ty;
    const x1 = Math.max(x, this.clipX);
    const y1 = Math.max(y, this.clipY);
    const x2 = Math.min(x + w, this.clipX + this.clipW);
    const y2 = Math.min(y + h, this.clipY + this.clipH);
    this.clipX = x1;
    this.clipY = y1;
    this.clipW = Math.max(x2 - x1, 0);
    this.clipH = Math.max(y2 - y1, 0);
  }
  getClipX(): number {
    return this.clipX - this.tx;
  }
  getClipY(): number {
    return this.clipY - this.ty;
  }
  getClipWidth(): number {
    return this.clipW;
  }
  getClipHeight(): number {
    return this.clipH;
  }

  plot(x: number, y: number, argb: number): void {
    if (x < this.clipX || y < this.clipY || x >= this.clipX + this.clipW || y >= this.clipY + this.clipH) return;
    const a = argb >>> 24;
    if (a === 0) return;
    const i = y * this.w + x;
    if (a === 255) {
      this.px[i] = argb;
      return;
    }
    const dst = this.px[i];
    const r = ((((argb >> 16) & 255) * a + ((dst >> 16) & 255) * (255 - a)) / 255) | 0;
    const g = ((((argb >> 8) & 255) * a + ((dst >> 8) & 255) * (255 - a)) / 255) | 0;
    const b = (((argb & 255) * a + (dst & 255) * (255 - a)) / 255) | 0;
    this.px[i] = 0xff000000 | (r << 16) | (g << 8) | b;
  }

  fillRect(x: number, y: number, w: number, h: number): void {
    this.log(`fillRect ${x} ${y} ${w} ${h} ${hex(this.color)}`);
    x += this.tx;
    y += this.ty;
    const x1 = Math.max(x, this.clipX);
    const y1 = Math.max(y, this.clipY);
    const x2 = Math.min(x + w, this.clipX + this.clipW);
    const y2 = Math.min(y + h, this.clipY + this.clipH);
    for (let yy = y1; yy < y2; yy++) {
      this.px.fill(this.color, yy * this.w + x1, yy * this.w + Math.max(x1, x2));
    }
    this.target.version++;
  }

  drawRect(x: number, y: number, w: number, h: number): void {
    this.log(`drawRect ${x} ${y} ${w} ${h} ${hex(this.color)}`);
    if (w < 0 || h < 0) return;
    x += this.tx;
    y += this.ty;
    for (let xx = x; xx <= x + w; xx++) {
      this.plot(xx, y, this.color);
      this.plot(xx, y + h, this.color);
    }
    for (let yy = y + 1; yy < y + h; yy++) {
      this.plot(x, yy, this.color);
      this.plot(x + w, yy, this.color);
    }
    this.target.version++;
  }

  drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.log(`drawLine ${x1} ${y1} ${x2} ${y2} ${hex(this.color)}`);
    x1 += this.tx;
    y1 += this.ty;
    x2 += this.tx;
    y2 += this.ty;
    const dx = Math.abs(x2 - x1);
    const dy = -Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx + dy;
    for (;;) {
      this.plot(x1, y1, this.color);
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
    this.target.version++;
  }

  drawImage(img: Image, x: number, y: number, anchor: number): void {
    this.log(`drawImage #${img.id} ${x} ${y} ${anchor}`);
    this.region(img, 0, 0, img.width, img.height, 0, x, y, anchor);
  }

  drawRegion(img: Image, sx: number, sy: number, w: number, h: number, transform: number, x: number, y: number, anchor: number): void {
    this.log(`drawRegion #${img.id} ${sx} ${sy} ${w} ${h} ${transform} ${x} ${y} ${anchor}`);
    this.region(img, sx, sy, w, h, transform, x, y, anchor);
  }

  private region(img: Image, sx: number, sy: number, w: number, h: number, transform: number, x: number, y: number, anchor: number): void {
    const swap = (transform & 4) !== 0;
    const dw = swap ? h : w;
    const dh = swap ? w : h;
    x += this.tx;
    y += this.ty;
    if (anchor & Graphics.HCENTER) x -= (dw / 2) | 0;
    else if (anchor & Graphics.RIGHT) x -= dw;
    if (anchor & Graphics.VCENTER) y -= (dh / 2) | 0;
    else if (anchor & Graphics.BOTTOM) y -= dh;
    const src = img.pixels;
    const sw = img.width;
    const y0 = Math.max(y, this.clipY);
    const y1 = Math.min(y + dh, this.clipY + this.clipH);
    const x0 = Math.max(x, this.clipX);
    const x1 = Math.min(x + dw, this.clipX + this.clipW);
    for (let py = y0; py < y1; py++) {
      const dy = py - y;
      for (let px = x0; px < x1; px++) {
        const dx = px - x;
        let u: number;
        let v: number;
        switch (transform) {
          case 0: u = dx; v = dy; break;
          case 1: u = dx; v = h - 1 - dy; break;
          case 2: u = w - 1 - dx; v = dy; break;
          case 3: u = w - 1 - dx; v = h - 1 - dy; break;
          case 4: u = dy; v = dx; break;
          case 5: u = dy; v = h - 1 - dx; break;
          case 6: u = w - 1 - dy; v = dx; break;
          default: u = w - 1 - dy; v = h - 1 - dx; break;
        }
        const p = src[(sy + v) * sw + sx + u];
        const a = p >>> 24;
        if (a === 255) this.px[py * this.w + px] = p;
        else if (a !== 0) this.plot(px, py, p);
      }
    }
    this.target.version++;
  }

  drawString(s: string, x: number, y: number, anchor: number): void {
    this.log(`drawString "${s}" ${x} ${y} ${anchor} ${this.font.id()} ${hex(this.color)}`);
    const w = this.font.stringWidth(s);
    const h = this.font.getHeight();
    x += this.tx;
    y += this.ty;
    if (anchor & Graphics.HCENTER) x -= (w / 2) | 0;
    else if (anchor & Graphics.RIGHT) x -= w;
    if (anchor & Graphics.BOTTOM) y -= h;
    else if (anchor & Graphics.BASELINE) y -= this.font.getBaselinePosition();
    else if (anchor & Graphics.VCENTER) y -= (h / 2) | 0;
    Device.font.draw(this, this.font, s, x, y, this.color);
    this.target.version++;
  }

  drawChar(c: number, x: number, y: number, anchor: number): void {
    this.drawString(String.fromCharCode(c), x, y, anchor);
  }
}

function hex(argb: number): string {
  return (argb >>> 0).toString(16);
}

// ---------------------------------------------------------------- canvas, display, midlet

export abstract class Displayable {
  getWidth(): number {
    return Device.width;
  }
  getHeight(): number {
    return Device.height;
  }
}

export abstract class Canvas extends Displayable {
  setFullScreenMode(_mode: boolean): void {}
  repaint(): void {
    Device.repaintRequested = true;
  }
  serviceRepaints(): void {
    Device.paintNow();
  }
  protected abstract paint(g: Graphics): void;
  protected keyPressed(_code: number): void {}
  protected keyReleased(_code: number): void {}
  protected pointerPressed(_x: number, _y: number): void {}
  protected pointerReleased(_x: number, _y: number): void {}
  protected pointerDragged(_x: number, _y: number): void {}
  protected hideNotify(): void {}
  protected showNotify(): void {}
  protected sizeChanged(_w: number, _h: number): void {}

  dispatchPaint(g: Graphics): void {
    this.paint(g);
  }
  dispatchKey(code: number, down: boolean): void {
    if (down) this.keyPressed(code);
    else this.keyReleased(code);
  }
  dispatchShow(): void {
    this.showNotify();
  }
  dispatchHide(): void {
    this.hideNotify();
  }
  dispatchSizeChanged(w: number, h: number): void {
    this.sizeChanged(w, h);
  }
}

export class Display {
  private static readonly INSTANCE = new Display();
  static getDisplay(_m: MIDlet): Display {
    return Display.INSTANCE;
  }
  setCurrent(d: Displayable): void {
    Device.current = d as Canvas;
  }
  callSerially(r: Runnable): void {
    Device.serial.push(r);
  }
}

export abstract class MIDlet {
  protected abstract startApp(): void;
  protected abstract pauseApp(): void;
  protected abstract destroyApp(unconditional: boolean): void;

  getAppProperty(key: string): string | null {
    return Device.properties.get(key) ?? null;
  }
  notifyDestroyed(): void {
    Device.destroyed = true;
  }
  platformRequest(url: string): boolean {
    Device.log(`platformRequest ${url}`);
    Device.platformRequest(url);
    return false;
  }
  launch(): void {
    this.startApp();
  }
  pause(): void {
    this.pauseApp();
  }
}

// ---------------------------------------------------------------- record stores

export class RecordStoreException extends JavaException {}
export class RecordStoreNotFoundException extends RecordStoreException {}
export class InvalidRecordIDException extends RecordStoreException {}

export class RecordStore {
  private constructor(
    private readonly name: string,
    private readonly records: (Int8Array | null)[],
  ) {}

  static openRecordStore(name: string, create: boolean): RecordStore {
    let records = Device.stores.get(name);
    if (!records) {
      if (!create) throw new RecordStoreNotFoundException(name);
      records = [];
      Device.stores.set(name, records);
      Device.persist();
    }
    return new RecordStore(name, records);
  }

  static deleteRecordStore(name: string): void {
    if (!Device.stores.delete(name)) throw new RecordStoreNotFoundException(name);
    Device.persist();
  }

  closeRecordStore(): void {}

  getNumRecords(): number {
    return this.records.filter((r) => r !== null).length;
  }

  getSizeAvailable(): number {
    return 1 << 20;
  }

  addRecord(data: Int8Array, offset: number, length: number): number {
    const copy = data.slice(offset, offset + length);
    this.records.push(copy);
    Device.log(`rms add ${this.name} #${this.records.length} ${length} ${crc32Hex(copy)}`);
    Device.persist();
    return this.records.length;
  }

  private check(id: number): void {
    if (id < 1 || id > this.records.length || this.records[id - 1] === null) throw new InvalidRecordIDException();
  }

  getRecord(id: number): Int8Array {
    this.check(id);
    return this.records[id - 1]!.slice();
  }

  setRecord(id: number, data: Int8Array, offset: number, length: number): void {
    this.check(id);
    const copy = data.slice(offset, offset + length);
    this.records[id - 1] = copy;
    Device.log(`rms set ${this.name} #${id} ${length} ${crc32Hex(copy)}`);
    Device.persist();
  }

  deleteRecord(id: number): void {
    this.check(id);
    this.records[id - 1] = null;
    Device.persist();
  }
}

// ---------------------------------------------------------------- media

export interface Control {}

export interface VolumeControl extends Control {
  setLevel(level: number): number;
  getLevel(): number;
}

export interface PlayerListener {
  playerUpdate(player: Player, event: string, data: any): void;
}

export interface Player {
  realize(): void;
  prefetch(): void;
  start(): void;
  stop(): void;
  deallocate(): void;
  close(): void;
  getState(): number;
  getControl(type: string): Control | null;
  addPlayerListener(l: PlayerListener): void;
  removePlayerListener(l: PlayerListener): void;
  setLoopCount(n: number): void;
}

/** Player state machine shared by silent and audible players; subclasses override the hooks. */
export class PlayerImpl implements Player, VolumeControl {
  private static nextId = 0;
  readonly id = PlayerImpl.nextId++;
  static readonly UNREALIZED = 100;
  static readonly REALIZED = 200;
  static readonly PREFETCHED = 300;
  static readonly STARTED = 400;
  static readonly CLOSED = 0;
  protected state = PlayerImpl.UNREALIZED;
  protected level = 100;
  protected loops = 1;
  protected listeners: PlayerListener[] = [];

  realize(): void {
    if (this.state === PlayerImpl.UNREALIZED) this.state = PlayerImpl.REALIZED;
  }
  prefetch(): void {
    this.realize();
    if (this.state === PlayerImpl.REALIZED) this.state = PlayerImpl.PREFETCHED;
  }
  start(): void {
    this.prefetch();
    this.state = PlayerImpl.STARTED;
    Device.log(`player#${this.id} start`);
    this.onStart();
  }
  stop(): void {
    if (this.state === PlayerImpl.STARTED) this.state = PlayerImpl.PREFETCHED;
    Device.log(`player#${this.id} stop`);
    this.onStop();
  }
  deallocate(): void {
    if (this.state >= PlayerImpl.PREFETCHED) this.state = PlayerImpl.REALIZED;
  }
  close(): void {
    this.state = PlayerImpl.CLOSED;
    Device.log(`player#${this.id} close`);
    this.onStop();
  }
  getState(): number {
    return this.state;
  }
  getControl(type: string): Control | null {
    return type.endsWith("VolumeControl") ? this : null;
  }
  addPlayerListener(l: PlayerListener): void {
    this.listeners.push(l);
  }
  removePlayerListener(l: PlayerListener): void {
    this.listeners = this.listeners.filter((x) => x !== l);
  }
  setLoopCount(n: number): void {
    this.loops = n;
  }
  setLevel(l: number): number {
    this.level = l;
    this.onVolume();
    return l;
  }
  getLevel(): number {
    return this.level;
  }

  protected onStart(): void {}
  protected onStop(): void {}
  protected onVolume(): void {}

  /** Called by audible engines when playback reaches the end. */
  protected endOfMedia(): void {
    if (this.state !== PlayerImpl.STARTED) return;
    this.state = PlayerImpl.PREFETCHED;
    for (const l of [...this.listeners]) l.playerUpdate(this, "endOfMedia", null);
  }
}

export class SilentAudio implements AudioEngine {
  create(_data: Int8Array, _type: string): PlayerImpl {
    return new PlayerImpl();
  }
}

export class Manager {
  static createPlayer(input: InputStream, type: string): Player {
    const bytes: number[] = [];
    for (let c = input.read(); c >= 0; c = input.read()) bytes.push(c);
    const data = Int8Array.from(bytes, (b) => (b << 24) >> 24);
    const p = Device.audio.create(data, type);
    Device.log(`createPlayer#${p.id} ${type} ${data.length} ${crc32Hex(data)}`);
    return p;
  }
}

// ---------------------------------------------------------------- crc32 (matches java.util.zip.CRC32)

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

export function crc32(bytes: ArrayLike<number>): number {
  let c = -1;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

export function crc32Hex(bytes: ArrayLike<number>): string {
  return crc32(bytes).toString(16);
}

/** Same hash as harness.Host.screenHash(): CRC32 over R,G,B bytes of every pixel. */
export function screenHash(img: Image): string {
  const rgb = new Uint8Array(img.pixels.length * 3);
  for (let i = 0; i < img.pixels.length; i++) {
    const p = img.pixels[i];
    rgb[i * 3] = (p >> 16) & 255;
    rgb[i * 3 + 1] = (p >> 8) & 255;
    rgb[i * 3 + 2] = p & 255;
  }
  return crc32Hex(rgb);
}
