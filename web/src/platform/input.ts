// Keyboard and touch input mapped onto the phone's key codes.

import { Device } from "../runtime/midp";

export const KEY = {
  UP: -1,
  DOWN: -2,
  LEFT: -3,
  RIGHT: -4,
  FIRE: -5,
  SOFT_LEFT: -6,
  SOFT_RIGHT: -7,
  STAR: 42,
  POUND: 35,
} as const;

const KEYBOARD: Record<string, number> = {
  ArrowUp: KEY.UP,
  ArrowDown: KEY.DOWN,
  ArrowLeft: KEY.LEFT,
  ArrowRight: KEY.RIGHT,
  KeyW: KEY.UP,
  KeyS: KEY.DOWN,
  KeyA: KEY.LEFT,
  KeyD: KEY.RIGHT,
  Enter: KEY.FIRE,
  NumpadEnter: KEY.FIRE,
  Space: KEY.FIRE,
  KeyQ: KEY.SOFT_LEFT,
  BracketLeft: KEY.SOFT_LEFT,
  Tab: KEY.SOFT_LEFT,
  KeyE: KEY.SOFT_RIGHT,
  BracketRight: KEY.SOFT_RIGHT,
  Escape: KEY.SOFT_RIGHT,
  Backspace: KEY.SOFT_RIGHT,
  NumpadMultiply: KEY.STAR,
  NumpadDivide: KEY.POUND,
};

for (let d = 0; d <= 9; d++) {
  KEYBOARD[`Digit${d}`] = 48 + d;
  KEYBOARD[`Numpad${d}`] = 48 + d;
}

const held = new Set<number>();

export function capture(el: Element, pointerId: number): void {
  try {
    el.setPointerCapture(pointerId);
  } catch {
    // Synthetic or already-released pointers cannot be captured; the press still counts.
  }
}

export function press(code: number): void {
  if (held.has(code)) return;
  held.add(code);
  Device.key(code, true);
}

export function release(code: number): void {
  if (!held.delete(code)) return;
  Device.key(code, false);
}

export function releaseAll(): void {
  for (const code of [...held]) release(code);
}

/** A press and release in one go; the game still sees the key held for one tick. */
export function tapKey(code: number): void {
  press(code);
  release(code);
}

/** Short tick. iOS Safari has no vibration API and ignores this. */
export function buzz(ms = 8): void {
  try {
    navigator.vibrate?.(ms);
  } catch {
    // The call is unsupported or was blocked.
  }
}

export function installKeyboard(onAnyInput: () => void): void {
  window.addEventListener("keydown", (e) => {
    let code = KEYBOARD[e.code];
    if (code === undefined && e.key === "*") code = KEY.STAR;
    if (code === undefined && e.key === "#") code = KEY.POUND;
    if (code === undefined || e.metaKey || e.ctrlKey || e.altKey) return;
    e.preventDefault();
    onAnyInput();
    if (!e.repeat) press(code);
  });
  window.addEventListener("keyup", (e) => {
    let code = KEYBOARD[e.code];
    if (code === undefined && e.key === "*") code = KEY.STAR;
    if (code === undefined && e.key === "#") code = KEY.POUND;
    if (code === undefined) return;
    e.preventDefault();
    release(code);
  });
  window.addEventListener("blur", releaseAll);
}

/** Buttons with data-key hold their key while pressed; the d-pad follows the finger. */
export function installTouchPad(root: HTMLElement, onAnyInput: () => void): void {
  for (const el of root.querySelectorAll<HTMLElement>("[data-key]")) {
    const code = Number(el.dataset.key);
    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      capture(el, e.pointerId);
      el.classList.add("down");
      onAnyInput();
      buzz();
      press(code);
    });
    const up = () => {
      el.classList.remove("down");
      release(code);
    };
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("lostpointercapture", up);
  }

  const dpad = root.querySelector<HTMLElement>(".dpad");
  if (!dpad) return;
  let current = 0;
  const setDir = (code: number) => {
    if (code === current) return;
    if (current) release(current);
    current = code;
    dpad.dataset.dir = String(code);
    if (code) {
      buzz(6);
      press(code);
    }
  };
  const track = (e: PointerEvent) => {
    const r = dpad.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < r.width * 0.12) {
      setDir(0);
      return;
    }
    setDir(Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? KEY.LEFT : KEY.RIGHT) : dy < 0 ? KEY.UP : KEY.DOWN);
  };
  dpad.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    capture(dpad, e.pointerId);
    onAnyInput();
    track(e);
  });
  dpad.addEventListener("pointermove", (e) => {
    if (dpad.hasPointerCapture(e.pointerId)) track(e);
  });
  const end = () => setDir(0);
  dpad.addEventListener("pointerup", end);
  dpad.addEventListener("pointercancel", end);
  dpad.addEventListener("lostpointercapture", end);
}
