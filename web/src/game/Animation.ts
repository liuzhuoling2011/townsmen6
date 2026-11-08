// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { Vector, idiv } from "../runtime/java";
import { Game } from "./Game";
import { Engine } from "./Engine";
import { App } from "./App";
import { Level } from "./Level";

export class Animation {
  frame: number = 0;
  private sequence: Int32Array = null;
  private step: number = 0;
  private nextStepTime: number = 0;
  private usesGameClock: boolean = false;
  static walkFrames: Int32Array = null;
  static complainFrames: Int32Array = null;
  static workFrames: Int32Array = null;
  static fishingFrames: Int32Array = null;
  static hammerFrames: Int32Array = null;
  static sulkFrames: Int32Array = null;
  static lookAroundFrames: Int32Array = null;
  static battleFightFrames: Int32Array = null;
  static battlePropagandaFrames: Int32Array = null;
  static smokeFrames: Int32Array = null;
  static pigstyFrames: Int32Array = null;
  static windmillFrames: Int32Array = null;
  static waterFrames: Int32Array = null;
  static coastFrames: Int32Array = null;
  static waterOverlayFrames: Int32Array = null;
  static rubbleDustFrames: Int32Array = null;
  static wellCampFrames: Int32Array = null;
  static universityFrames: Int32Array = null;
  private static instances: Vector = new Vector(32, 16);
  $init0(var1: number): this {
    Animation.instances.addElement(this);
    if (Animation.walkFrames === null) {
      Animation.initSequences();
    }
    return this;
  }
  $init1(): this {
    Animation.instances.addElement(this);
    if (Animation.walkFrames === null) {
      Animation.initSequences();
    }
    this.usesGameClock = true;
    return this;
  }
  $init2(var1: Int32Array): this {
    Animation.instances.addElement(this);
    if (Animation.walkFrames === null) {
      Animation.initSequences();
    }
    this.play(var1);
    return this;
  }
  private static initSequences(): void {
    Animation.walkFrames = Int32Array.of(0, 100, 1, 100, 2, 100, 3, 100);
    Animation.complainFrames = Int32Array.of(0, 100, 1, 100, 0, 100, 1, 100, 0, 100, 1, 100, 0, 100, 1, 100, 0, -400);
    Animation.workFrames = Int32Array.of(0, 400, 1, 100, 0, 100, 2, -300, 2, 100, 1, 100, 2, -300, 2, 100, 1, 100, 0, 100, 1, 100);
    Animation.fishingFrames = Int32Array.of(0, 200, 1, 200, 0, 200, 1, 200, 0, 200, 2, 200, 0, 200, 1, 200);
    Animation.hammerFrames = Int32Array.of(0, 100, 1, 100, 0, 100, 2, -200, 2, 100, 1, 100, 2, -200, 2, 100, 1, 100, 0, 100, 1, 100);
    Animation.sulkFrames = Int32Array.of(0, 500, 1, 500, 1, 500, 2, 500, 1, 500);
    Animation.lookAroundFrames = Int32Array.of(32, 1500, 48, 1500, 0, 1500, 48, 1500, 32, 1500, 16, 1500, 0, 1500, 16, 1500);
    if (Engine.getImageInfo(155, 2) > 2) {
      Animation.battleFightFrames = Int32Array.of(0, 100, 0, -200, 1, 100, 1, -200, 2, 100, 2, -200, 3, -300, 4, 100, 4, -200, 5, 100, 5, -200);
    } else {
      Animation.battleFightFrames = Int32Array.of(0, 100, 0, -200, 1, 100, 1, -200);
    }
    Animation.battlePropagandaFrames = Int32Array.of(0, 100, 1, 100, 2, 100, 3, 100, 4, 100, 5, 100);
    if (Engine.getImageInfo(34, 2) > 1) {
      Animation.pigstyFrames = Int32Array.of(0, 100, 0, -800, 1, 100, 1, -800);
    } else {
      Animation.pigstyFrames = Int32Array.of(0, 0);
    }
    Animation.smokeFrames = Int32Array.of(0, -300, 1, -300, 2, -300, 3, -300, 4, -300, 5, -300, 6, -300);
    let var10000: Int32Array = Int32Array.of(0, 0);
    if (Engine.getImageInfo(30, 2) > 1) {
      Animation.windmillFrames = Int32Array.of(0, 500, 1, 400, 2, 300, 0, 200, 1, 200, 2, 200, 0, 100, 1, 100, 2, 100, 0, 100, 1, 100, 2, 100, 0, 100, 1, 100, 2, 100, 0, 200, 1, 200, 2, 200, 0, 300, 1, 400, 2, 500, 0, 0);
    } else {
      Animation.windmillFrames = Int32Array.of(0, 0);
    }
    Animation.waterFrames = Int32Array.of(0, -Level.field_52, 0, Level.field_53, 1, -Level.field_52, 1, Level.field_53, 2, -Level.field_52, 2, Level.field_53, 3, -Level.field_52, 3, Level.field_53);
    Animation.coastFrames = Int32Array.of(0, -Level.field_54, 0, Level.field_55, 1, -Level.field_54, 1, Level.field_55, 2, -Level.field_54, 2, Level.field_55, 3, -Level.field_54, 3, Level.field_55);
    Animation.waterOverlayFrames = Int32Array.of(0, -Level.field_56, 0, Level.field_57, 1, -Level.field_56, 1, Level.field_57, 2, -Level.field_56, 2, Level.field_57, 3, -Level.field_56, 3, Level.field_57);
    Animation.rubbleDustFrames = Int32Array.of(0, 100, 1, 100, 2, 100, 3, 100, 4, 100, 5, 100, -1, 0);
    Animation.wellCampFrames = Int32Array.of(0, 100, 1, 100, 2, 100);
    Animation.universityFrames = Int32Array.of(16459, 2000, 16459, -5000, 16460, 2000, 16460, -5000);
  }
  static updateAll(): void {
    for (let var0: number = 0; var0 < Animation.instances.size(); var0++) {
      (Animation.instances.elementAt(var0) as Animation).update();
    }
  }
  update(): void {
    if (this.sequence !== null) {
      if (this.nextStepTime < this.now()) {
        this.step = (this.step + 2) % this.sequence.length;
        this.applyStep();
      }
    }
  }
  play(var1: Int32Array): void {
    if (this.sequence !== var1 || this.nextStepTime === 2147483647) {
      this.sequence = var1;
      this.step = 0;
      this.applyStep();
    }
  }
  private applyStep(): void {
    if (this.sequence !== null) {
      this.frame = this.sequence[this.step];
      let var1: number = 0;
      if ((var1 = this.sequence[this.step + 1]) === 0) {
        this.nextStepTime = 2147483647;
      } else if (var1 > 0) {
        this.nextStepTime = this.now() + var1;
      } else {
        this.nextStepTime = this.now() + Engine.randomInt(Math.abs(var1));
      }
    } else {
      this.step = 0;
      this.frame = 0;
      this.nextStepTime = 2147483647;
    }
  }
  randomizeStep(): void {
    if (this.sequence !== null) {
      this.step = idiv(Engine.randomInt(2147483647), 2) << 1;
      this.step = this.step % this.sequence.length;
    }
    this.applyStep();
  }
  private now(): number {
    return this.usesGameClock ? Game.gameTime : App.tickTime;
  }
  freeze(): void {
    this.nextStepTime = 2147483647;
  }
  dispose(): void {
    Animation.instances.removeElement(this);
  }
  static disposeAll(): void {
    Animation.instances.removeAllElements();
  }
}
