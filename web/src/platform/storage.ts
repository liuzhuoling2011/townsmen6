// RMS record stores persisted in localStorage.

import type { RecordStorage } from "../runtime/midp";

function toBase64(b: Int8Array): string {
  let s = "";
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i] & 0xff);
  return btoa(s);
}

function fromBase64(s: string): Int8Array {
  const bin = atob(s);
  const out = new Int8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = (bin.charCodeAt(i) << 24) >> 24;
  return out;
}

export class LocalRecordStorage implements RecordStorage {
  constructor(private readonly key: string) {}

  load(): Map<string, (Int8Array | null)[]> {
    const map = new Map<string, (Int8Array | null)[]>();
    try {
      const raw = localStorage.getItem(this.key);
      if (!raw) return map;
      const obj = JSON.parse(raw) as Record<string, (string | null)[]>;
      for (const [name, records] of Object.entries(obj)) {
        map.set(name, records.map((r) => (r === null ? null : fromBase64(r))));
      }
    } catch (e) {
      console.warn("could not load saves", e);
    }
    return map;
  }

  save(stores: Map<string, (Int8Array | null)[]>): void {
    const obj: Record<string, (string | null)[]> = {};
    for (const [name, records] of stores) obj[name] = records.map((r) => (r === null ? null : toBase64(r)));
    try {
      localStorage.setItem(this.key, JSON.stringify(obj));
    } catch (e) {
      console.warn("could not save", e);
    }
  }
}
