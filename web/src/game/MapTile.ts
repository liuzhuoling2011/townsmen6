// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { Animation } from "./Animation";

export class MapTile {
  sprite: number = 0;
  frame: number = 0;
  flags: number = 0;
  animation: Animation = null;
  overlayAnimation: Animation = null;
  isWater(): boolean {
    return (this.flags & 32) !== 0;
  }
  isCoast(): boolean {
    return (this.flags & 64) !== 0;
  }
  method_113(): boolean {
    return (this.flags & 16) === 0;
  }
  isElevated(): boolean {
    return (this.flags & 128) !== 0;
  }
}
