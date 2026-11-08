import "./style.css";
import { MainMidlet, classes } from "./game/index";
import { loadJar } from "./runtime/assets";
import { RealClock, Sys } from "./runtime/io";
import { setClassRegistry } from "./runtime/java";
import { Device, type MIDlet } from "./runtime/midp";
import { CanvasFontEngine } from "./platform/canvasFont";
import { installHdScreen } from "./platform/hdGraphics";
import { installKeyboard, installSoftKeyCorners, installTouchPad, releaseAll } from "./platform/input";
import { MidiAudio, audioStatus, unlockAudio } from "./platform/midiAudio";
import { LocalRecordStorage } from "./platform/storage";

const TICK_MS = 50;
const stage = document.getElementById("stage")!;
const canvas = document.getElementById("screen") as HTMLCanvasElement;
const pad = document.getElementById("pad")!;
const status = document.getElementById("status")!;

function isTouch(): boolean {
  return document.body.classList.contains("touch");
}

/** Picks a logical resolution near the phone's scale and an integer device-pixel scale for crisp pixels. */
function layout(): { w: number; h: number; scale: number } {
  const rect = stage.getBoundingClientRect();
  const vw = Math.max(1, rect.width);
  const vh = Math.max(1, rect.height);
  const dpr = window.devicePixelRatio || 1;
  const cssPerPixel = Math.max(1, Math.min(vw / 180, vh / 220));
  const scale = Math.max(1, Math.round(cssPerPixel * dpr));
  const w = Math.max(128, Math.min(480, Math.floor((vw * dpr) / scale)));
  const h = Math.max(128, Math.min(400, Math.floor((vh * dpr) / scale)));
  return { w, h, scale };
}

function applyLayout(): void {
  const { w, h, scale } = layout();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * scale;
  canvas.height = h * scale;
  canvas.style.width = `${(w * scale) / dpr}px`;
  canvas.style.height = `${(h * scale) / dpr}px`;
  const changed = w !== Device.width || h !== Device.height;
  Device.width = w;
  Device.height = h;
  installHdScreen(canvas, scale);
  if (changed) Device.current?.dispatchSizeChanged(w, h);
  Device.repaintRequested = true;
}

async function boot(): Promise<void> {
  if (matchMedia("(pointer: coarse)").matches) document.body.classList.add("touch");
  status.textContent = "加载中…";
  const res = await fetch(`${import.meta.env.BASE_URL}game.jar`);
  if (!res.ok) throw new Error(`game.jar: ${res.status}`);
  loadJar(new Uint8Array(await res.arrayBuffer()));

  Sys.clock = new RealClock();
  Device.font = new CanvasFontEngine();
  Device.audio = new MidiAudio();
  Device.storage = new LocalRecordStorage("townsmen6.rms.v1");
  Device.stores = Device.storage.load();
  setClassRegistry(classes);
  applyLayout();

  const midlet: MIDlet = new MainMidlet();
  midlet.launch();
  status.textContent = "";
  if (import.meta.env.DEV) Object.assign(window, { __game: { Device, Sys, midlet, audioStatus } });

  const onInput = () => unlockAudio();
  installKeyboard(onInput);
  installTouchPad(pad, onInput);
  installSoftKeyCorners(canvas, onInput);
  window.addEventListener("pointerdown", onInput);
  window.addEventListener("resize", () => applyLayout());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      releaseAll();
      midlet.pause();
    }
  });

  let last = performance.now();
  let acc = 0;
  const frame = (now: number) => {
    acc = Math.min(acc + now - last, TICK_MS * 5);
    last = now;
    while (acc >= TICK_MS && !Device.destroyed) {
      Device.step();
      acc -= TICK_MS;
    }
    if (Device.destroyed) {
      status.textContent = "游戏已退出，点击这里重新开始";
      status.classList.add("action");
      status.addEventListener("click", () => location.reload(), { once: true });
      return;
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

document.getElementById("fullscreen")?.addEventListener("click", () => {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void document.documentElement.requestFullscreen?.();
});
document.getElementById("help")?.addEventListener("click", () => document.body.classList.toggle("show-help"));
document.getElementById("toggle-pad")?.addEventListener("click", () => {
  document.body.classList.toggle("touch");
  applyLayout();
});

const errors: string[] = [];
window.addEventListener("error", (e) => errors.push(String(e.error ?? e.message)));
window.addEventListener("unhandledrejection", (e) => errors.push(String(e.reason)));
if (import.meta.env.DEV) Object.assign(window, { __errors: errors });

boot().catch((e) => {
  console.error(e);
  status.textContent = `启动失败：${(e as Error).message}`;
});

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
}
