// Adds Simplified Chinese as the first language without touching the original JAR.
// The game reads /ldf for the language list and /<code>.<group>.lng for strings.

import main from "./zh-main.json";
import campaign from "./zh-campaign.json";
import tipp from "./zh-tipp.json";
import { Sys } from "../runtime/io";

const CODE = "ZH";

/** Java modified UTF-8, which the game's encoding mode 2 decodes. */
export function modifiedUtf8(text: string): Uint8Array {
  const bytes: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c === 0) {
      bytes.push(0xc0, 0x80);
    } else if (c < 0x80) {
      bytes.push(c);
    } else if (c < 0x800) {
      bytes.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    } else {
      bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
  }
  return Uint8Array.from(bytes);
}

/** Same container the game's readLngFile consumes: skipped header, encoding 2, length deltas. */
export function encodeLng(strings: readonly string[]): Int8Array {
  const encoded = strings.map(modifiedUtf8);
  const count = encoded.length;
  const out = new Uint8Array(5 + (count + 1) * 2 + encoded.reduce((n, s) => n + s.length, 0));
  out[2] = 2;
  out[3] = count & 255;
  out[4] = (count >> 8) & 255;
  let offset = 0;
  for (let i = 0; i <= count; i++) {
    const at = 5 + i * 2;
    out[at] = offset & 255;
    out[at + 1] = (offset >> 8) & 255;
    if (i < count) {
      if (offset + encoded[i].length > 65535) throw new Error("language file exceeds 64 KiB");
      offset += encoded[i].length;
    }
  }
  let pos = 5 + (count + 1) * 2;
  for (const s of encoded) {
    out.set(s, pos);
    pos += s.length;
  }
  return new Int8Array(out.buffer);
}

function signed(bytes: Uint8Array): Int8Array {
  return new Int8Array(bytes.buffer, bytes.byteOffset, bytes.length);
}

/** Prepends 中文 to the language menu and installs the three translated string tables. */
export function installChinese(): void {
  const ldf = Sys.resources.get("ldf");
  if (!ldf || ldf[1] !== 2) throw new Error("unexpected language list");
  const name = modifiedUtf8("中文");
  const entry = new Uint8Array(3 + 2 + name.length);
  entry[0] = CODE.length;
  entry[1] = CODE.charCodeAt(0);
  entry[2] = CODE.charCodeAt(1);
  entry[3] = (name.length >> 8) & 255;
  entry[4] = name.length & 255;
  entry.set(name, 5);
  const next = new Uint8Array(2 + entry.length + (ldf.length - 2));
  next[0] = ldf[0];
  next[1] = 2;
  next.set(entry, 2);
  next.set(ldf.subarray(2), 2 + entry.length);
  Sys.resources.set("ldf", signed(next));
  Sys.resources.set("ZH.MAIN.lng", encodeLng(main));
  Sys.resources.set("ZH.CAMPAIGN.lng", encodeLng(campaign));
  Sys.resources.set("ZH.TIPP.lng", encodeLng(tipp));
}
