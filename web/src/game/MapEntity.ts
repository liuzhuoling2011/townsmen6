// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { Graphics } from "../runtime/midp";

export interface MapEntity {
  setTileAndCheckPlacement(var1: number, var2: number): boolean;
  addToMap(): boolean;
  getTileX(): number;
  getTileY(): number;
  drawPlacementMarker(var1: Graphics): void;
}
