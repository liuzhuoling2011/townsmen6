import { readFileSync } from "node:fs";
import { join } from "node:path";
import { unzipSync } from "fflate";
import { describe, expect, it } from "vitest";
import { encodeLng, installChinese, modifiedUtf8 } from "../src/i18n/chinese";
import main from "../src/i18n/zh-main.json";
import campaign from "../src/i18n/zh-campaign.json";
import tipp from "../src/i18n/zh-tipp.json";
import { loadJar } from "../src/runtime/assets";
import { Sys } from "../src/runtime/io";

const jarFiles = unzipSync(new Uint8Array(readFileSync(join(import.meta.dirname, "../../Townsmen6-Revolution_s40v2a.jar"))));

function english(name: string): string[] {
  const b = new Uint8Array(jarFiles[name]);
  const count = b[3] | (b[4] << 8);
  const offs = Array.from({ length: count + 1 }, (_, i) => b[5 + 2 * i] | (b[6 + 2 * i] << 8));
  let pos = 5 + (count + 1) * 2;
  return offs.slice(0, -1).map((start, i) => {
    const chunk = b.subarray(pos, pos + (offs[i + 1] - start));
    pos += chunk.length;
    return new TextDecoder("latin1").decode(chunk);
  });
}

function decoded(file: Int8Array): string[] {
  const b = new Uint8Array(file.buffer, file.byteOffset, file.length);
  const count = b[3] | (b[4] << 8);
  const offs = Array.from({ length: count + 1 }, (_, i) => b[5 + 2 * i] | (b[6 + 2 * i] << 8));
  let pos = 5 + (count + 1) * 2;
  return offs.slice(0, -1).map((_, i) => {
    const chunk = b.subarray(pos, pos + (offs[i + 1] - offs[i]));
    pos += chunk.length;
    return new TextDecoder().decode(chunk).replaceAll("\r", "\n");
  });
}

describe("Chinese translation", () => {
  it("matches the English tables entry for entry, including placeholders", () => {
    const tables = [
      ["EN.MAIN.lng", main],
      ["EN.CAMPAIGN.lng", campaign],
      ["EN.TIPP.lng", tipp],
    ] as const;
    for (const [file, zh] of tables) {
      const en = english(file);
      expect(zh).toHaveLength(en.length);
      en.forEach((source, i) => {
        expect(zh[i].match(/\{[A-Za-z]+\}/g) ?? [], file + i).toEqual(source.match(/\{[A-Za-z]+\}/g) ?? []);
        expect(zh[i].split("\n")).toHaveLength(source.split("\n").length);
      });
    }
  });

  it("round-trips through the game's language-file format and is offered first", () => {
    expect(decoded(encodeLng(main))[0]).toBe("镇民6");
    expect(decoded(encodeLng(campaign))[152]).toContain("{GOLD}");
    const jar = readFileSync(join(import.meta.dirname, "../../Townsmen6-Revolution_s40v2a.jar"));
    loadJar(new Uint8Array(jar));
    installChinese();
    const ldf = Sys.resources.get("ldf")!;
    expect(String.fromCharCode(ldf[3], ldf[4])).toBe("ZH");
    expect(new TextDecoder().decode(modifiedUtf8("中文"))).toBe("中文");
    expect(Sys.resources.has("ZH.MAIN.lng")).toBe(true);
    expect(Sys.resources.has("ZH.CAMPAIGN.lng")).toBe(true);
    expect(Sys.resources.has("ZH.TIPP.lng")).toBe(true);
  });
});
