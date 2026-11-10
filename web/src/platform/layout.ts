// Integer device-pixel scale so the original sprites stay crisp, with logical
// resolution capped high enough that a tall or landscape phone is not letterboxed.

export const LAYOUT_MAX_W = 640;
export const LAYOUT_MAX_H = 520;

export function chooseLayout(vw: number, vh: number, dpr: number): { w: number; h: number; scale: number } {
  vw = Math.max(1, vw);
  vh = Math.max(1, vh);
  dpr = Math.max(1, dpr);
  const cssPerPixel = Math.max(1, Math.min(vw / 180, vh / 220));
  const ideal = cssPerPixel * dpr;
  const preferred = Math.max(1, Math.round(ideal));
  const candidates = [...new Set([Math.floor(ideal), preferred, Math.ceil(ideal)].filter((scale) => scale >= 1))];
  let best: { w: number; h: number; scale: number; waste: number } | null = null;
  for (const scale of candidates) {
    const rawW = Math.floor((vw * dpr) / scale);
    const rawH = Math.floor((vh * dpr) / scale);
    if (rawW < 96 || rawH < 96) continue;
    const w = Math.min(LAYOUT_MAX_W, rawW);
    const h = Math.min(LAYOUT_MAX_H, rawH);
    const cssW = (w * scale) / dpr;
    const cssH = (h * scale) / dpr;
    if (cssW > vw + 0.5 || cssH > vh + 0.5) continue;
    const waste = vw - cssW + (vh - cssH);
    // A couple of leftover pixels should not change how big the sprites are.
    const muchBetter = best !== null && waste + 8 < best.waste;
    const similar = best !== null && Math.abs(waste - best.waste) <= 8;
    const closer = best !== null && Math.abs(scale - preferred) < Math.abs(best.scale - preferred);
    if (!best || muchBetter || (similar && closer)) {
      best = { w, h, scale, waste };
    }
  }
  if (best) return { w: best.w, h: best.h, scale: best.scale };
  return {
    w: Math.max(96, Math.min(LAYOUT_MAX_W, Math.floor((vw * dpr) / preferred))),
    h: Math.max(96, Math.min(LAYOUT_MAX_H, Math.floor((vh * dpr) / preferred))),
    scale: preferred,
  };
}
