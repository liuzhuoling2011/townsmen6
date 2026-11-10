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

const EXPORT_FORMAT = "townsmen6-save";

export class LocalRecordStorage implements RecordStorage {
  constructor(private readonly key: string) {}

  /** The raw saves as a portable JSON document, or null if nothing has been saved yet. */
  exportJson(): string | null {
    const raw = localStorage.getItem(this.key);
    if (!raw) return null;
    return JSON.stringify({ format: EXPORT_FORMAT, version: 1, stores: JSON.parse(raw) });
  }

  /** Replaces all saves with an exported document; throws if the file is not one. */
  importJson(text: string): void {
    const doc = JSON.parse(text) as { format?: string; stores?: unknown };
    const stores = doc.stores;
    const valid =
      doc.format === EXPORT_FORMAT &&
      typeof stores === "object" &&
      stores !== null &&
      Object.values(stores).every((records) => Array.isArray(records) && records.every((r) => r === null || typeof r === "string"));
    if (!valid) throw new Error("不是镇民 6 的存档文件");
    for (const records of Object.values(stores as Record<string, (string | null)[]>)) {
      for (const r of records) if (r !== null) fromBase64(r);
    }
    localStorage.setItem(this.key, JSON.stringify(stores));
  }

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
