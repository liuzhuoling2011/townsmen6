import { describe, expect, it } from "vitest";
import { chooseLayout } from "../src/platform/layout";
import { carouselZone, confirmAgrees, cornerKey, screenTile, softZoneGame } from "../src/platform/zones";

function coverage(vw: number, vh: number, dpr: number): { w: number; h: number; scale: number; cssW: number; cssH: number } {
  const layout = chooseLayout(vw, vh, dpr);
  return { ...layout, cssW: (layout.w * layout.scale) / dpr, cssH: (layout.h * layout.scale) / dpr };
}

describe("chooseLayout", () => {
  const phones = [
    ["iPhone 14 portrait", 390, 844, 3],
    ["iPhone 14 landscape", 844, 390, 3],
    ["iPhone 14 logical 2x", 390, 844, 2],
    ["iPhone SE", 320, 568, 2],
    ["tall narrow", 360, 800, 3],
    ["desktop", 1280, 800, 1],
  ] as const;

  it.each(phones)("%s stays inside the stage and covers it", (_name, vw, vh, dpr) => {
    const box = coverage(vw, vh, dpr);
    expect(box.scale).toBeGreaterThanOrEqual(1);
    expect(Number.isInteger(box.scale)).toBe(true);
    expect(box.cssW).toBeLessThanOrEqual(vw + 0.5);
    expect(box.cssH).toBeLessThanOrEqual(vh + 0.5);
    expect(box.cssW / vw).toBeGreaterThan(0.97);
    expect(box.cssH / vh).toBeGreaterThan(0.97);
    expect(box.w).toBeGreaterThanOrEqual(96);
    expect(box.h).toBeGreaterThanOrEqual(96);
    expect(box.w).toBeLessThanOrEqual(640);
    expect(box.h).toBeLessThanOrEqual(520);
  });

  it("uses the extra height on a phone where the old 400px cap letterboxed", () => {
    const box = coverage(390, 844, 2);
    expect(box.h).toBeGreaterThan(400);
    expect(box.cssH).toBeGreaterThan(830);
  });
});

describe("touch zones", () => {
  const w = 240;
  const h = 320;
  const css = 2;

  it("gives the bottom corners a thumb-sized soft key and leaves the middle alone", () => {
    const zone = softZoneGame(w, h, css);
    expect(zone.w * css).toBeGreaterThanOrEqual(48);
    expect(zone.h * css).toBeGreaterThanOrEqual(48);
    expect(zone.w).toBeLessThan(w * 0.3);
    expect(zone.h).toBeLessThan(h * 0.2);
    expect(cornerKey(8, h - 8, w, h, css)).toBe("left");
    expect(cornerKey(w - 8, h - 8, w, h, css)).toBe("right");
    expect(cornerKey(w / 2, h - 8, w, h, css)).toBeNull();
    expect(cornerKey(8, h / 2, w, h, css)).toBeNull();
  });

  it("confirms a dialog everywhere except the bottom-right corner", () => {
    expect(confirmAgrees(w / 2, h / 2, w, h, css)).toBe(true);
    expect(confirmAgrees(12, h - 12, w, h, css)).toBe(true);
    expect(confirmAgrees(w - 8, h - 8, w, h, css)).toBe(false);
  });

  it("maps a screen point onto the same isometric tile the game uses", () => {
    expect(screenTile(0, 0, 0, 0)).toEqual({ x: 0, y: 1 });
    expect(screenTile(10, 4, 64, 32)).toEqual(screenTile(10, 4, 64, 32));
    const a = screenTile(40, 20, 100, 50);
    const b = screenTile(50, 24, 100, 50);
    expect(a).toEqual(b);
  });

  it("splits the carousel into sides, a center confirm, and a level column", () => {
    expect(carouselZone(w / 2, h / 2, w, h, css)).toBe("fire");
    expect(carouselZone(16, h / 2, w, h, css)).toBe("left");
    expect(carouselZone(w - 16, h / 2, w, h, css)).toBe("right");
    expect(carouselZone(w / 2, 20, w, h, css)).toBe("up");
    expect(carouselZone(w / 2, h - 20, w, h, css)).toBe("down");
  });
});
