// Java language/library semantics needed by the ported game code.

export class JavaException extends Error {
  constructor(message: string | null = null) {
    super(message ?? undefined);
    this.name = new.target.name;
    this.javaMessage = message;
  }
  javaMessage: string | null;
}

export class ArrayIndexOutOfBoundsException extends JavaException {
  constructor(detail: number | string | null = null) {
    super(detail === null ? null : String(detail));
  }
}
export class IllegalArgumentException extends JavaException {}
export class NoSuchElementException extends JavaException {}
export class ArithmeticException extends JavaException {}
export class NumberFormatException extends JavaException {}

export function errorMessage(e: unknown): string | null {
  if (e instanceof JavaException) return e.javaMessage;
  if (e instanceof Error) return e.message;
  return null;
}

export function printStackTrace(e: unknown): void {
  console.warn(e);
}

// ---------------------------------------------------------------- integer helpers

export function idiv(a: number, b: number): number {
  if (b === 0) throw new ArithmeticException("/ by zero");
  return (a / b) | 0;
}

export function lidiv(a: bigint, b: bigint): bigint {
  if (b === 0n) throw new ArithmeticException("/ by zero");
  return BigInt.asIntN(64, a / b);
}

export function d2i(x: number): number {
  if (Number.isNaN(x)) return 0;
  if (x >= 2147483647) return 2147483647;
  if (x <= -2147483648) return -2147483648;
  return Math.trunc(x) | 0;
}

export function l2i(x: bigint): number {
  return Number(BigInt.asIntN(32, x));
}

export function lshl(a: bigint, n: number): bigint {
  return BigInt.asIntN(64, a << BigInt(n & 63));
}

export function lshr(a: bigint, n: number): bigint {
  return a >> BigInt(n & 63);
}

export function lushr(a: bigint, n: number): bigint {
  return BigInt.asIntN(64, BigInt.asUintN(64, a) >> BigInt(n & 63));
}

/** Non-short-circuit boolean operators (both operands are always evaluated). */
export function band(a: boolean, b: boolean): boolean {
  return a && b;
}
export function bor(a: boolean, b: boolean): boolean {
  return a || b;
}
export function bxor(a: boolean, b: boolean): boolean {
  return a !== b;
}

// ---------------------------------------------------------------- check mode instrumentation

export const checkReport = {
  overflow: new Map<number, number>(),
  bounds: new Map<number, number>(),
};

/** Int +/- result check: records sites whose result left the int32 range, returns the Java value. */
export function ci(v: number, site: number): number {
  const w = v | 0;
  if (w !== v) checkReport.overflow.set(site, (checkReport.overflow.get(site) ?? 0) + 1);
  return w;
}

/** Array read check: Java throws where JS would silently read undefined. */
export function ca<T>(arr: ArrayLike<T>, i: number, site: number): T {
  if (i < 0 || i >= arr.length) {
    checkReport.bounds.set(site, (checkReport.bounds.get(site) ?? 0) + 1);
    throw new ArrayIndexOutOfBoundsException(i);
  }
  return arr[i];
}

// ---------------------------------------------------------------- arrays

export function newArray<T>(n: number, make: () => T): T[] {
  const a = new Array<T>(n);
  for (let i = 0; i < n; i++) a[i] = make();
  return a;
}

type AnyArray = ArrayLike<unknown> & { length: number };

export function arraycopy(src: AnyArray, srcPos: number, dst: AnyArray, dstPos: number, length: number): void {
  if (src === null || dst === null) throw new TypeError("arraycopy null");
  if (length < 0 || srcPos < 0 || dstPos < 0 || srcPos + length > src.length || dstPos + length > dst.length) {
    throw new ArrayIndexOutOfBoundsException("arraycopy");
  }
  if (ArrayBuffer.isView(src) && ArrayBuffer.isView(dst)) {
    const s = src as unknown as Int32Array;
    (dst as unknown as Int32Array).set(s.subarray(srcPos, srcPos + length), dstPos);
    return;
  }
  const s = src as unknown[];
  const d = dst as unknown[];
  if (s === d && srcPos < dstPos) {
    for (let i = length - 1; i >= 0; i--) d[dstPos + i] = s[srcPos + i];
  } else {
    for (let i = 0; i < length; i++) d[dstPos + i] = s[srcPos + i];
  }
}

// ---------------------------------------------------------------- strings

export function charStr(c: number): string {
  return String.fromCharCode(c);
}

/** Java String.valueOf / string-concatenation conversion. */
export function jstr(v: unknown): string {
  if (v === null || v === undefined) return "null";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "bigint" || typeof v === "boolean") return String(v);
  return (v as { toString(): string }).toString();
}

export function toCharArray(s: string): Uint16Array {
  const a = new Uint16Array(s.length);
  for (let i = 0; i < s.length; i++) a[i] = s.charCodeAt(i);
  return a;
}

export function replaceChar(s: string, from: number, to: number): string {
  return s.split(String.fromCharCode(from)).join(String.fromCharCode(to));
}

const utf8 = new TextDecoder("utf-8");

/** new String(byte[]) with the platform default charset (UTF-8). */
export function bytesToString(bytes: Int8Array): string {
  return utf8.decode(new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.length));
}

export function parseInt32(s: string): number {
  if (s === null || !/^[+-]?\d+$/.test(s)) throw new NumberFormatException(`For input string: "${s}"`);
  const v = Number(s);
  if (v > 2147483647 || v < -2147483648) throw new NumberFormatException(`For input string: "${s}"`);
  return v;
}

export class StringBuffer {
  private s: string;

  constructor(init: string | number = "") {
    this.s = typeof init === "string" ? init : "";
  }

  append(v: string): StringBuffer {
    this.s += v;
    return this;
  }

  insert(offset: number, v: string): StringBuffer {
    if (offset < 0 || offset > this.s.length) throw new JavaException("StringIndexOutOfBoundsException");
    this.s = this.s.slice(0, offset) + v + this.s.slice(offset);
    return this;
  }

  delete(start: number, end: number): StringBuffer {
    if (end > this.s.length) end = this.s.length;
    if (start < 0 || start > end) throw new JavaException("StringIndexOutOfBoundsException");
    this.s = this.s.slice(0, start) + this.s.slice(end);
    return this;
  }

  charAt(i: number): number {
    if (i < 0 || i >= this.s.length) throw new JavaException("StringIndexOutOfBoundsException");
    return this.s.charCodeAt(i);
  }

  length(): number {
    return this.s.length;
  }

  toString(): string {
    return this.s;
  }
}

// ---------------------------------------------------------------- collections

export interface Enumeration {
  hasMoreElements(): boolean;
  nextElement(): any;
}

export class Vector {
  protected items: any[] = [];

  constructor(_initialCapacity?: number, _increment?: number) {}

  size(): number {
    return this.items.length;
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  addElement(o: any): void {
    this.items.push(o);
  }
  elementAt(i: number): any {
    if (i < 0 || i >= this.items.length) throw new ArrayIndexOutOfBoundsException(i);
    return this.items[i];
  }
  setElementAt(o: any, i: number): void {
    if (i < 0 || i >= this.items.length) throw new ArrayIndexOutOfBoundsException(i);
    this.items[i] = o;
  }
  insertElementAt(o: any, i: number): void {
    if (i < 0 || i > this.items.length) throw new ArrayIndexOutOfBoundsException(i);
    this.items.splice(i, 0, o);
  }
  removeElementAt(i: number): void {
    if (i < 0 || i >= this.items.length) throw new ArrayIndexOutOfBoundsException(i);
    this.items.splice(i, 1);
  }
  removeElement(o: any): boolean {
    const i = this.indexOf(o);
    if (i < 0) return false;
    this.items.splice(i, 1);
    return true;
  }
  removeAllElements(): void {
    this.items.length = 0;
  }
  indexOf(o: any): number {
    return this.items.indexOf(o);
  }
  contains(o: any): boolean {
    return this.items.indexOf(o) >= 0;
  }
  firstElement(): any {
    if (this.items.length === 0) throw new NoSuchElementException();
    return this.items[0];
  }
  lastElement(): any {
    if (this.items.length === 0) throw new NoSuchElementException();
    return this.items[this.items.length - 1];
  }
  copyInto(dst: any[]): void {
    for (let i = 0; i < this.items.length; i++) dst[i] = this.items[i];
  }
  elements(): Enumeration {
    let i = 0;
    const items = this.items;
    return {
      hasMoreElements: () => i < items.length,
      nextElement: () => {
        if (i >= items.length) throw new NoSuchElementException();
        return items[i++];
      },
    };
  }
}

export class Stack extends Vector {
  push(o: any): any {
    this.items.push(o);
    return o;
  }
  pop(): any {
    if (this.items.length === 0) throw new JavaException("EmptyStackException");
    return this.items.pop();
  }
  peek(): any {
    if (this.items.length === 0) throw new JavaException("EmptyStackException");
    return this.items[this.items.length - 1];
  }
  empty(): boolean {
    return this.items.length === 0;
  }
}

/** Keys are strings or Integers (numbers), so Map's SameValueZero equality matches Java equals(). */
export class Hashtable {
  private map = new Map<any, any>();

  constructor(_initialCapacity?: number) {}

  put(k: any, v: any): any {
    if (k === null || v === null) throw new TypeError("Hashtable null");
    const old = this.map.get(k);
    this.map.set(k, v);
    return old === undefined ? null : old;
  }
  get(k: any): any {
    const v = this.map.get(k);
    return v === undefined ? null : v;
  }
  remove(k: any): any {
    const v = this.map.get(k);
    this.map.delete(k);
    return v === undefined ? null : v;
  }
  containsKey(k: any): boolean {
    return this.map.has(k);
  }
  clear(): void {
    this.map.clear();
  }
  size(): number {
    return this.map.size;
  }
  keys(): Enumeration {
    const snapshot = [...this.map.keys()];
    let i = 0;
    return {
      hasMoreElements: () => i < snapshot.length,
      nextElement: () => {
        if (i >= snapshot.length) throw new NoSuchElementException();
        return snapshot[i++];
      },
    };
  }
}

/** java.util.Random's 48-bit LCG, computed exactly with two 24-bit halves. */
export class Random {
  private hi = 0;
  private lo = 0;

  constructor(seed: bigint) {
    const s = (BigInt.asUintN(64, seed) ^ 0x5deece66dn) & ((1n << 48n) - 1n);
    this.hi = Number(s >> 24n);
    this.lo = Number(s & 0xffffffn);
  }

  private next(bits: number): number {
    const M0 = 0xece66d;
    const M1 = 0x5de;
    const t0 = this.lo * M0 + 0xb;
    const lo = t0 % 0x1000000;
    const carry = Math.floor(t0 / 0x1000000);
    const t1 = this.hi * M0 + this.lo * M1 + carry;
    this.hi = t1 % 0x1000000;
    this.lo = lo;
    // (int)(seed >>> (48 - bits)) for bits <= 32
    const shift = 48 - bits;
    const value = Math.floor((this.hi * 0x1000000 + this.lo) / 2 ** shift);
    return value | 0;
  }

  nextInt(bound?: number): number {
    if (bound === undefined) return this.next(32);
    if (bound <= 0) throw new IllegalArgumentException("bound must be positive");
    if ((bound & -bound) === bound) return Number((BigInt(bound) * BigInt(this.next(31))) >> 31n);
    let bits: number;
    let val: number;
    do {
      bits = this.next(31);
      val = bits % bound;
    } while (bits - val + (bound - 1) < 0 || bits - val + (bound - 1) > 2147483647);
    return val;
  }
}

// ---------------------------------------------------------------- threads and reflection

export interface Runnable {
  run(): void;
}

/** The game's only worker thread finishes loading before the main loop polls it, so it runs inline. */
export class JavaThread implements Runnable {
  run(): void {}
  start(): void {
    this.run();
  }
  isAlive(): boolean {
    return false;
  }
}

export function threadYield(): void {}

let registry: Record<string, new () => any> = {};

export function setClassRegistry(classes: Record<string, new () => any>): void {
  registry = classes;
}

export function classForName(name: string): { newInstance(): any } {
  const ctor = registry[name];
  if (!ctor) throw new JavaException(`ClassNotFoundException: ${name}`);
  return { newInstance: () => new ctor() };
}
