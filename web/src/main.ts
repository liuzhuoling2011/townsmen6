import "./style.css";
import { MainMidlet, classes } from "./game/index";
import { installChinese } from "./i18n/chinese";
import { loadJar } from "./runtime/assets";
import { RealClock, Sys } from "./runtime/io";
import { setClassRegistry } from "./runtime/java";
import { Device, type MIDlet } from "./runtime/midp";
import { CanvasFontEngine } from "./platform/canvasFont";
import { ORIGINAL_ART, listHdPacks, missingHdKeys, selectHdPack, type HdPack } from "./platform/hdArt";
import { installHdScreen } from "./platform/hdGraphics";
import { installKeyboard, installTouchPad, releaseAll } from "./platform/input";
import { chooseLayout } from "./platform/layout";
import { MidiAudio, audioStatus, hasAudioSession, setIgnoreSilentSwitch, unlockAudio } from "./platform/midiAudio";
import { LocalRecordStorage } from "./platform/storage";
import { installTouchScreen, selectionRect, softZoneCss, touchDebug, updateTouch } from "./platform/touch";

const TICK_MS = 50;
const SAVE_KEY = "townsmen6.rms.v1";
const HD_STORAGE = "townsmen6.hd";
const PAD_STORAGE = "townsmen6.pad";
const SILENT_STORAGE = "townsmen6.ignoreSilent";
const INSTALL_TIP_STORAGE = "townsmen6.installTip";
const TOUCH_TIP_STORAGE = "townsmen6.touchTip";

const app = document.getElementById("app")!;
const stage = document.getElementById("stage")!;
const canvas = document.getElementById("screen") as HTMLCanvasElement;
const status = document.getElementById("status")!;
const sheet = document.getElementById("sheet")!;
const menuButton = document.getElementById("menu-button")!;
const storage = new LocalRecordStorage(SAVE_KEY);

const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isStandalone =
  (navigator as Navigator & { standalone?: boolean }).standalone === true ||
  matchMedia("(display-mode: standalone), (display-mode: fullscreen)").matches;

/** Keeps the game in the visible viewport when the iOS toolbar shows or hides. */
function syncViewport(): void {
  const vv = window.visualViewport;
  if (!vv) return;
  app.style.height = `${Math.round(vv.height)}px`;
  app.style.top = `${Math.round(vv.offsetTop)}px`;
}

function layout(): { w: number; h: number; scale: number } {
  syncViewport();
  const rect = stage.getBoundingClientRect();
  return chooseLayout(Math.max(1, rect.width), Math.max(1, rect.height), window.devicePixelRatio || 1);
}

/** Puts the soft-key hints and the selection ring on top of the canvas. */
function placeChrome(): void {
  const zones = document.getElementById("soft-zones")!;
  const focus = document.getElementById("touch-focus")!;
  const showZones = document.body.classList.contains("touch") && !document.body.classList.contains("pad");
  zones.hidden = !showZones;
  const stageR = stage.getBoundingClientRect();
  const canvasR = canvas.getBoundingClientRect();
  if (showZones && canvasR.width > 0 && Device.width > 0) {
    const size = softZoneCss(canvasR.width / Device.width, Device.width, Device.height);
    const left = zones.querySelector(".left") as HTMLElement;
    const right = zones.querySelector(".right") as HTMLElement;
    for (const el of [left, right]) {
      el.style.width = `${size.w}px`;
      el.style.height = `${size.h}px`;
    }
    const top = canvasR.bottom - stageR.top - size.h;
    const x = canvasR.left - stageR.left;
    left.style.transform = `translate(${x}px, ${top}px)`;
    right.style.transform = `translate(${x + canvasR.width - size.w}px, ${top}px)`;
  }
  const rect = document.body.classList.contains("touch") ? selectionRect() : null;
  if (!rect || canvasR.width <= 0 || Device.width <= 0) {
    focus.hidden = true;
    return;
  }
  const sx = canvasR.width / Device.width;
  const sy = canvasR.height / Math.max(1, Device.height);
  focus.hidden = false;
  focus.style.width = `${Math.max(8, rect.w * sx)}px`;
  focus.style.height = `${Math.max(8, rect.h * sy)}px`;
  focus.style.transform = `translate(${canvasR.left - stageR.left + rect.x * sx}px, ${canvasR.top - stageR.top + rect.y * sy}px)`;
}

let lastLayout = "";
function applyLayout(): void {
  const { w, h, scale } = layout();
  const dpr = window.devicePixelRatio || 1;
  const key = `${w}x${h}@${scale}/${dpr}`;
  if (key === lastLayout) return;
  lastLayout = key;
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
  placeChrome();
}

let toastTimer = 0;
function toast(text: string): void {
  if (status.classList.contains("action")) return;
  status.textContent = text;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    if (status.textContent === text) status.textContent = "";
  }, 1800);
}

// ---------------------------------------------------------------- art packs

let hdPacks: HdPack[] = [ORIGINAL_ART];
let hdIndex = 0;

async function applyHdPack(index: number, announce: boolean): Promise<void> {
  hdIndex = index;
  const pack = hdPacks[index];
  const ok = await selectHdPack(pack.id, (f) => {
    if (hdIndex === index && !status.classList.contains("action")) status.textContent = `加载 ${pack.label}… ${Math.round(f * 100)}%`;
  });
  if (hdIndex !== index) return;
  if (status.textContent?.startsWith("加载 ")) status.textContent = "";
  const button = document.getElementById("hd");
  if (button) {
    button.classList.toggle("on", ok && pack.id !== "");
    button.textContent = `画质：${ok ? pack.label : ORIGINAL_ART.label}`;
  }
  localStorage.setItem(HD_STORAGE, pack.id);
  Device.repaintRequested = true;
  if (announce) toast(ok ? `画质：${pack.label}` : `${pack.label} 未生成，先运行 npm run hd`);
}

function cycleHdPack(): void {
  void applyHdPack((hdIndex + 1) % hdPacks.length, true);
}

// ---------------------------------------------------------------- settings

function setPadVisible(on: boolean): void {
  document.body.classList.toggle("pad", on);
  localStorage.setItem(PAD_STORAGE, on ? "1" : "0");
  const button = document.getElementById("toggle-pad")!;
  button.classList.toggle("on", on);
  button.textContent = on ? "经典按键：开" : "经典按键：关";
  releaseAll();
  placeChrome();
}

function setIgnoreSilent(on: boolean): void {
  if (!setIgnoreSilentSwitch(on)) return;
  localStorage.setItem(SILENT_STORAGE, on ? "1" : "0");
  const button = document.getElementById("silent-switch")!;
  button.hidden = false;
  button.classList.toggle("on", on);
  button.textContent = on ? "静音键：忽略" : "静音键：跟随";
}

function openSheet(open: boolean): void {
  sheet.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  if (open) releaseAll();
}

async function exportSave(): Promise<void> {
  const json = storage.exportJson();
  if (!json) {
    toast("还没有存档");
    return;
  }
  const date = new Date().toISOString().slice(0, 10);
  const file = new File([json], `townsmen6-${date}.json`, { type: "application/json" });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "镇民 6 存档" });
      return;
    } catch (e) {
      if ((e as DOMException).name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(file);
  const a = Object.assign(document.createElement("a"), { href: url, download: file.name });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

async function importSave(file: File): Promise<void> {
  const text = await file.text();
  if (!confirm("导入会覆盖本浏览器里现有的全部进度，确定吗？")) return;
  try {
    storage.importJson(text);
  } catch (e) {
    toast(`导入失败：${(e as Error).message}`);
    return;
  }
  location.reload();
}

function installSettings(): void {
  menuButton.addEventListener("click", () => openSheet(sheet.hidden !== false));
  // A tap outside the open sheet only closes it; it must not also reach the game.
  document.addEventListener(
    "pointerdown",
    (e) => {
      if (sheet.hidden || sheet.contains(e.target as Node) || menuButton.contains(e.target as Node)) return;
      e.stopPropagation();
      e.preventDefault();
      openSheet(false);
    },
    true,
  );
  document.getElementById("hd")!.addEventListener("click", cycleHdPack);
  document.getElementById("toggle-pad")!.addEventListener("click", () => {
    setPadVisible(!document.body.classList.contains("pad"));
    applyLayout();
  });
  document.getElementById("silent-switch")!.addEventListener("click", () => {
    setIgnoreSilent(localStorage.getItem(SILENT_STORAGE) !== "1");
  });
  const fullscreen = document.getElementById("fullscreen")!;
  fullscreen.hidden = !document.fullscreenEnabled;
  fullscreen.addEventListener("click", () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.();
  });
  document.getElementById("export-save")!.addEventListener("click", () => void exportSave());
  const importFile = document.getElementById("import-file") as HTMLInputElement;
  document.getElementById("import-save")!.addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", () => {
    const file = importFile.files?.[0];
    importFile.value = "";
    if (file) void importSave(file);
  });

  setPadVisible(localStorage.getItem(PAD_STORAGE) === "1");
  if (hasAudioSession()) setIgnoreSilent(localStorage.getItem(SILENT_STORAGE) === "1");

  if (isIOS && !isStandalone) {
    document.getElementById("save-note")!.textContent =
      "进度自动保存在本浏览器中。Safari 可能会清掉长时间没打开的网页数据，建议添加到主屏幕或定期导出存档。";
    if (!localStorage.getItem(INSTALL_TIP_STORAGE)) {
      const tip = document.getElementById("install-tip")!;
      tip.hidden = false;
      document.getElementById("install-close")!.addEventListener("click", () => {
        tip.hidden = true;
        localStorage.setItem(INSTALL_TIP_STORAGE, "1");
      });
    }
  }

  const touchTip = document.getElementById("touch-tip")!;
  if (matchMedia("(pointer: coarse)").matches && !localStorage.getItem(TOUCH_TIP_STORAGE)) {
    touchTip.hidden = false;
    document.getElementById("touch-tip-close")!.addEventListener("click", () => {
      touchTip.hidden = true;
      localStorage.setItem(TOUCH_TIP_STORAGE, "1");
    });
  }
}

// ---------------------------------------------------------------- boot

async function boot(): Promise<void> {
  if (matchMedia("(pointer: coarse)").matches) document.body.classList.add("touch");
  installSettings();
  void navigator.storage?.persist?.();
  status.textContent = "加载中…";
  const res = await fetch(`${import.meta.env.BASE_URL}game.jar`);
  if (!res.ok) throw new Error(`game.jar: ${res.status}`);
  loadJar(new Uint8Array(await res.arrayBuffer()));
  installChinese();

  Sys.clock = new RealClock();
  Device.font = new CanvasFontEngine();
  Device.audio = new MidiAudio();
  Device.storage = storage;
  Device.stores = Device.storage.load();
  setClassRegistry(classes);
  hdPacks = await listHdPacks();
  document.getElementById("hd")?.toggleAttribute("hidden", hdPacks.length < 2);
  const savedHd = new URLSearchParams(location.search).get("hd") ?? localStorage.getItem(HD_STORAGE);
  const savedIndex = hdPacks.findIndex((p) => p.id === savedHd);
  await applyHdPack(savedIndex >= 0 ? savedIndex : Math.min(1, hdPacks.length - 1), false);
  applyLayout();

  const midlet: MIDlet = new MainMidlet();
  midlet.launch();
  status.textContent = "";
  if (import.meta.env.DEV) Object.assign(window, { __game: { Device, Sys, midlet, audioStatus, missingHdKeys, touch: touchDebug } });

  const onInput = () => unlockAudio();
  installKeyboard(onInput);
  installTouchPad(app, onInput);
  installTouchScreen(canvas, onInput);
  // WebKit only lets audio start from some gesture events, so try on every one of them.
  for (const type of ["pointerdown", "pointerup", "touchend", "click", "keydown"]) {
    window.addEventListener(type, onInput, { passive: true });
  }
  new ResizeObserver(() => applyLayout()).observe(stage);
  window.addEventListener("resize", () => applyLayout());
  window.visualViewport?.addEventListener("resize", () => applyLayout());
  window.visualViewport?.addEventListener("scroll", () => applyLayout());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      releaseAll();
      midlet.pause();
    }
  });

  let last = performance.now();
  let acc = 0;
  const frame = (now: number) => {
    const dt = now - last;
    acc = Math.min(acc + dt, TICK_MS * 5);
    last = now;
    updateTouch(Math.min(dt, 100));
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
    placeChrome();
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

window.addEventListener("keydown", (e) => {
  if (e.code === "KeyH" && !e.repeat && !e.metaKey && !e.ctrlKey && !e.altKey) cycleHdPack();
});
// Safari still pinch-zooms on these even with touch-action: none.
for (const type of ["gesturestart", "gesturechange", "gestureend"]) {
  document.addEventListener(type, (e) => e.preventDefault());
}

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
