// Optional replacement art packs built by tools/hd.ts: upscaled copies of the original
// sprite sheets, keyed by the CRC of the PNG bytes they replace (Image.key). Only the
// screen renderer uses them; game logic keeps reading the original pixels.

import type { Image } from "../runtime/midp";

export interface HdPack {
  id: string;
  label: string;
}

export const ORIGINAL_ART: HdPack = { id: "", label: "原始像素" };

/** The original art followed by whatever packs have been built (public/hd/packs.json). */
export async function listHdPacks(): Promise<HdPack[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}hd/packs.json`);
    if (!res.ok) return [ORIGINAL_ART];
    return [ORIGINAL_ART, ...((await res.json()) as HdPack[])];
  } catch {
    return [ORIGINAL_ART];
  }
}

export interface HdTexture {
  source: ImageBitmap;
  scale: number;
}

let active = "";
let requested = "";
let scale = 1;
let textures: Map<string, ImageBitmap> | null = null;
const reportedMissing = new Set<string>();

export function activeHdPack(): string {
  return active;
}

/** Images drawn while a pack was active that the pack has no art for (dev diagnostics). */
export function missingHdKeys(): string[] {
  return [...reportedMissing];
}

/**
 * Loads a whole pack before switching to it: the game skips redrawing parts of the screen
 * that did not change (e.g. the map behind a dialog), so art arriving later could stay unseen.
 * Resolves false if the pack is missing or another switch superseded this one.
 */
export async function selectHdPack(id: string, onProgress?: (fraction: number) => void): Promise<boolean> {
  requested = id;
  if (!id) {
    active = "";
    textures = null;
    return true;
  }
  try {
    const base = `${import.meta.env.BASE_URL}hd/${id}/`;
    const res = await fetch(`${base}manifest.json`);
    if (!res.ok) throw new Error(String(res.status));
    const manifest = (await res.json()) as { scale: number; ext?: string; keys: string[] };
    const loaded = new Map<string, ImageBitmap>();
    const queue = [...manifest.keys];
    const worker = async () => {
      for (let key = queue.shift(); key && requested === id; key = queue.shift()) {
        const file = await fetch(`${base}${key}.${manifest.ext ?? "png"}`);
        if (!file.ok) throw new Error(`${key}: ${file.status}`);
        loaded.set(key, await createImageBitmap(await file.blob()));
        onProgress?.(loaded.size / manifest.keys.length);
      }
    };
    await Promise.all(Array.from({ length: 8 }, worker));
    if (requested !== id) return false;
    active = id;
    scale = manifest.scale;
    textures = loaded;
    return true;
  } catch {
    if (requested === id) {
      active = "";
      textures = null;
    }
    return false;
  }
}

/** The replacement for an image, or null to draw the original. */
export function hdTexture(img: Image): HdTexture | null {
  if (!textures || !img.key) return null;
  const source = textures.get(img.key);
  if (source) return { source, scale };
  if (!reportedMissing.has(img.key)) {
    reportedMissing.add(img.key);
    if (import.meta.env.DEV) console.warn(`hd pack ${active} has no art for ${img.key} (${img.width}x${img.height})`);
  }
  return null;
}
