// Hit zones for the touch layer, in game pixels. Kept free of the game runtime so
// the phone-sized targets can be checked without booting a frame.

/** CSS px of the soft-key corner. Big enough for a thumb, small enough not to swallow the buttons above it. */
export const SOFT_ZONE_CSS = 48;

/** Map pixel under a screen point. Matches GameUi.screenToTile. */
export function screenTile(x: number, y: number, cameraX: number, cameraY: number): { x: number; y: number } {
  const sx = x + cameraX + 32;
  const sy = y + cameraY + 16;
  const a = Math.trunc(sx / 2) - sy;
  const b = Math.trunc(sx / 2) + sy;
  return { x: Math.trunc(a / 32), y: Math.trunc(b / 32) };
}

export type Corner = "left" | "right" | null;
export type CarouselZone = "fire" | "left" | "right" | "up" | "down";

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Game-pixel size of a bottom corner. Never eats more than the side it sits on. */
export function softZoneGame(width: number, height: number, cssPerPixel: number, spriteW = 0, spriteH = 0): { w: number; h: number } {
  const css = Math.max(cssPerPixel, 0.01);
  const thumb = SOFT_ZONE_CSS / css;
  return {
    w: Math.min(width * 0.28, Math.max(spriteW + 6, thumb)),
    h: Math.min(height * 0.16, Math.max(spriteH + 6, thumb)),
  };
}

export function cornerKey(x: number, y: number, width: number, height: number, cssPerPixel: number, spriteW = 0, spriteH = 0): Corner {
  const zone = softZoneGame(width, height, cssPerPixel, spriteW, spriteH);
  if (y < height - zone.h) return null;
  if (x < zone.w) return "left";
  if (x > width - zone.w) return "right";
  return null;
}

/**
 * Build / attachment carousel. The middle is confirm, the two sides pick the
 * previous and next entry, and the middle column above or below changes level.
 */
export function carouselZone(x: number, y: number, width: number, height: number, cssPerPixel: number): CarouselZone {
  const box = Math.max(22, 36 / Math.max(cssPerPixel, 0.01));
  const dx = x - width / 2;
  const dy = y - height / 2;
  if (Math.abs(dx) <= box && Math.abs(dy) <= box) return "fire";
  if (Math.abs(dx) > box) return dx < 0 ? "left" : "right";
  return dy < 0 ? "up" : "down";
}

/** Confirmation screens: the bottom-right corner cancels, the rest agrees. */
export function confirmAgrees(x: number, y: number, width: number, height: number, cssPerPixel: number, spriteW = 0, spriteH = 0): boolean {
  return cornerKey(x, y, width, height, cssPerPixel, spriteW, spriteH) !== "right";
}

export function buttonFocusRect(x: number, y: number): Rect {
  return { x: x - 13, y: y - 4, w: 26, h: 26 };
}

export function rowFocusRect(x: number, y: number, w: number, h: number): Rect {
  return { x: x + 2, y: y + 1, w: Math.max(8, w - 4), h: Math.max(8, h - 2) };
}
