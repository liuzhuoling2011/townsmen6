// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { Canvas, Graphics } from "../runtime/midp";
import { App } from "./App";

export class GameCanvas extends Canvas {
  constructor() {
    super();
    this.setFullScreenMode(true);
  }
  paint(var1: Graphics): void {
    App.paintFrame(var1);
  }
  keyPressed(var1: number): void {
    App.onKeyEvent(var1, true);
  }
  keyReleased(var1: number): void {
    App.onKeyEvent(var1, false);
  }
  pointerPressed(var1: number, var2: number): void {
  }
  pointerReleased(var1: number, var2: number): void {
  }
  pointerDragged(var1: number, var2: number): void {
  }
  hideNotify(): void {
    App.instance.pauseApp();
  }
  showNotify(): void {
    App.setScreenSize(this.getWidth(), this.getHeight());
  }
  sizeChanged(var1: number, var2: number): void {
    App.setScreenSize(var1, var2);
  }
}
