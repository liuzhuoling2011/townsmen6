// java.io subset plus the platform hooks (clock, sleep, resources) the game calls.

import { ArrayIndexOutOfBoundsException, JavaException } from "./java";

/** Stand-in for java.io.IOException (unchecked in the prepared source). */
export class IOFailure extends JavaException {}

export abstract class InputStream {
  abstract read(): number;

  readInto(b: Int8Array, off: number, len: number): number {
    if (len === 0) return 0;
    let n = 0;
    while (n < len) {
      const c = this.read();
      if (c < 0) break;
      b[off + n++] = c;
    }
    return n === 0 ? -1 : n;
  }

  skip(n: bigint): bigint {
    let skipped = 0n;
    while (skipped < n && this.read() >= 0) skipped++;
    return skipped;
  }

  close(): void {}
}

export class ByteArrayInputStream extends InputStream {
  private pos: number;
  private end: number;

  constructor(
    private buf: Int8Array,
    offset = 0,
    length = buf.length - offset,
  ) {
    super();
    this.pos = offset;
    this.end = Math.min(offset + length, buf.length);
  }

  read(): number {
    return this.pos < this.end ? this.buf[this.pos++] & 0xff : -1;
  }

  readInto(b: Int8Array, off: number, len: number): number {
    if (this.pos >= this.end) return -1;
    const n = Math.min(len, this.end - this.pos);
    b.set(this.buf.subarray(this.pos, this.pos + n), off);
    this.pos += n;
    return n;
  }

  skip(n: bigint): bigint {
    const k = Math.max(0, Math.min(Number(n), this.end - this.pos));
    this.pos += k;
    return BigInt(k);
  }

  available(): number {
    return this.end - this.pos;
  }
}

export abstract class OutputStream {
  abstract write(b: number): void;
  close(): void {}
}

export class ByteArrayOutputStream extends OutputStream {
  private buf = new Int8Array(64);
  private count = 0;

  write(b: number): void {
    if (this.count === this.buf.length) {
      const next = new Int8Array(this.buf.length * 2);
      next.set(this.buf);
      this.buf = next;
    }
    this.buf[this.count++] = b;
  }

  size(): number {
    return this.count;
  }

  reset(): void {
    this.count = 0;
  }

  toByteArray(): Int8Array {
    return this.buf.slice(0, this.count);
  }
}

export class DataInputStream {
  constructor(private input: InputStream) {}

  read(b?: Int8Array, off = 0, len?: number): number {
    if (b === undefined) return this.input.read();
    return this.input.readInto(b, off, len ?? b.length - off);
  }

  private byte(): number {
    const c = this.input.read();
    if (c < 0) throw new IOFailure("EOFException");
    return c;
  }

  readBoolean(): boolean {
    return this.byte() !== 0;
  }
  readByte(): number {
    return (this.byte() << 24) >> 24;
  }
  readUnsignedByte(): number {
    return this.byte();
  }
  readShort(): number {
    const a = this.byte();
    const b = this.byte();
    return ((a << 24) >> 16) | b;
  }
  readInt(): number {
    const a = this.byte();
    const b = this.byte();
    const c = this.byte();
    const d = this.byte();
    return (a << 24) | (b << 16) | (c << 8) | d;
  }
  readUTF(): string {
    const len = (this.byte() << 8) | this.byte();
    let s = "";
    let i = 0;
    while (i < len) {
      const a = this.byte();
      i++;
      if (a < 0x80) {
        s += String.fromCharCode(a);
      } else if ((a & 0xe0) === 0xc0) {
        const b = this.byte();
        i++;
        s += String.fromCharCode(((a & 0x1f) << 6) | (b & 0x3f));
      } else {
        const b = this.byte();
        const c = this.byte();
        i += 2;
        s += String.fromCharCode(((a & 0x0f) << 12) | ((b & 0x3f) << 6) | (c & 0x3f));
      }
    }
    return s;
  }
  skip(n: bigint): bigint {
    return this.input.skip(n);
  }
  close(): void {
    this.input.close();
  }
}

export class DataOutputStream {
  constructor(private out: OutputStream) {}

  write(b: number | Int8Array, off = 0, len?: number): void {
    if (typeof b === "number") {
      this.out.write(b);
      return;
    }
    const n = len ?? b.length;
    if (off < 0 || n < 0 || off + n > b.length) throw new ArrayIndexOutOfBoundsException(off + n);
    for (let i = 0; i < n; i++) this.out.write(b[off + i]);
  }
  writeBoolean(v: boolean): void {
    this.out.write(v ? 1 : 0);
  }
  writeByte(v: number): void {
    this.out.write(v);
  }
  writeShort(v: number): void {
    this.out.write(v >> 8);
    this.out.write(v);
  }
  writeInt(v: number): void {
    this.out.write(v >> 24);
    this.out.write(v >> 16);
    this.out.write(v >> 8);
    this.out.write(v);
  }
}

// ---------------------------------------------------------------- platform hooks

export interface Clock {
  now(): bigint;
  sleep(ms: bigint): void;
}

/** Deterministic clock used by tests: sleep advances time, matching the Java reference host. */
export class VirtualClock implements Clock {
  constructor(public time = 1240000000000n) {}
  now(): bigint {
    return this.time;
  }
  sleep(ms: bigint): void {
    if (ms > 0n) this.time += ms;
  }
}

/** Browser clock: frames are paced by the scheduler, so sleeping is a no-op. */
export class RealClock implements Clock {
  now(): bigint {
    return BigInt(Math.floor(performance.timeOrigin + performance.now()));
  }
  sleep(_ms: bigint): void {}
}

export const Sys = {
  clock: new VirtualClock() as Clock,
  resources: new Map<string, Int8Array>(),

  currentTimeMillis(): bigint {
    return Sys.clock.now();
  },
  sleep(ms: bigint): void {
    Sys.clock.sleep(ms);
  },
  resource(name: string): InputStream | null {
    const key = name.startsWith("/") ? name.slice(1) : name;
    const data = Sys.resources.get(key);
    return data ? new ByteArrayInputStream(data) : null;
  },
};
