// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { Sys } from "../runtime/io";
import { Enumeration, Hashtable, newArray } from "../runtime/java";
import { MapEntity } from "./MapEntity";
import { IntList } from "./IntList";
import { Game } from "./Game";
import { MapObject } from "./MapObject";
import { App } from "./App";
import { Building } from "./Building";

export class Path {
  xs: IntList = new IntList().$init2();
  ys: IntList = new IntList().$init2();
  private steps: number = 0;
  pointCount: number = 0;
  private lastUsed: number = App.tickTime;
  private static currentX: number = 0;
  private static currentY: number = 0;
  private static openSet: boolean[][] = null;
  private static cameFrom: Int8Array[] = null;
  private static costSoFar: Int32Array[] = null;
  private static estimatedCost: Int32Array[] = null;
  private static cache: Hashtable = new Hashtable(100);
  constructor() {
  }
  static expireCache(): void {
    let var0: Enumeration = Path.cache.keys();
    while (var0.hasMoreElements()) {
      let var1: any = var0.nextElement();
      let var2: Path = (Path.cache.get(var1) as Path);
      if (App.tickTime - var2.lastUsed > 120000) {
        Path.cache.remove(var1);
      }
    }
  }
  static clearCache(): void {
    Path.cache.clear();
  }
  static findNearestTree(var0: Building): MapObject {
    let var1: MapObject = null;
    for (let var2: number = 0; var2 < MapObject.growingTrees.size(); var2++) {
      let var3: MapObject = (MapObject.growingTrees.elementAt(var2) as MapObject);
      if (Path.isCloser(var0, var3, var1) && var3.auxA > 15) {
        var1 = var3;
      }
    }
    return var1;
  }
  static findNearestWell(var0: Building): Building {
    let var1: Building = null;
    for (let var2: number = 0; var2 < Building.wells.size(); var2++) {
      let var3: Building = (Building.wells.elementAt(var2) as Building);
      if (Path.isCloser(var0, var3, var1)) {
        var1 = var3;
      }
    }
    return var1;
  }
  static findNearestStorage(var0: Building): Building {
    if (Building.storages.size() === 0) {
      return Building.mainBuilding;
    }
    let var1: Building = null;
    for (let var2: number = 0; var2 < Building.storages.size(); var2++) {
      let var3: Building = (Building.storages.elementAt(var2) as Building);
      if (Path.isCloser(var0, var3, var1)) {
        var1 = var3;
      }
    }
    return var1;
  }
  static find(var0: number, var1: number, var2: number, var3: number): Path {
    if (var0 === var2 && var1 === var3) {
      return null;
    }
    if (var0 > var2 || var0 === var2 && var1 > var3) {
      let var4: number = var0;
      var0 = var2;
      var2 = var4;
      var4 = var1;
      var1 = var3;
      var3 = var4;
    }
    let var7: number = var0 << 24 | var1 << 16 | var2 << 8 | var3;
    let var5: Path = null;
    if ((var5 = Path.cache.get(var7) as Path) === null) {
      if ((var5 = Path.search(var0, var1, var2, var3)) !== null) {
        Path.cache.put(var7, var5);
      }
    } else {
      var5.lastUsed = App.tickTime;
    }
    return var5;
  }
  static pickFishingSpot(var0: Building): void {
    let var1: number = (-1);
    let var2: number = (-1);
    let var3: number = 2147483647;
    let var4: number = Math.max(0, var0.tileX - 2);
    let var5: number = Math.max(0, var0.tileY - 2);
    let var6: number = Math.min(Game.level.width, var4 + 5);
    let var7: number = Math.min(Game.level.height, var5 + 5);
    while (var4 < var6) {
      for (let var8: number = var5; var8 < var7; var8++) {
        let var9: number = 0;
        if (Game.level.tiles[var4][var8].isWater() && Game.level.objects[var4][var8] === null && Game.level.townsmen[var4][var8] === null && (var9 = Path.manhattan(var0.tileX, var0.tileY, var4, var8)) < var3) {
          var3 = var9;
          var1 = var4;
          var2 = var8;
        }
      }
      var4++;
    }
    var0.tiles[0].auxA = var1;
    var0.tiles[0].auxB = var2;
  }
  private static isCloser(var0: MapEntity, var1: MapEntity, var2: MapEntity): boolean {
    if (var1 === null) {
      return false;
    }
    if (var2 === null) {
      return true;
    }
    let var4: number = Path.manhattan(var1.getTileX(), var1.getTileY(), var0.getTileX(), var0.getTileY());
    let var3: number = Path.manhattan(var2.getTileX(), var2.getTileY(), var0.getTileX(), var0.getTileY());
    return var4 < var3;
  }
  static distance(var0: MapEntity, var1: MapEntity): number {
    let var10000: number = var0.getTileX();
    let var10001: number = var0.getTileY();
    let var2: number = var1.getTileY();
    return Path.find(var10000, var10001, var1.getTileX(), var2).steps;
  }
  private static manhattan(var0: number, var1: number, var2: number, var3: number): number {
    return Math.abs(var0 - var2) + Math.abs(var1 - var3);
  }
  static reset(): void {
    Path.cache.clear();
    Path.openSet = null;
    Path.cameFrom = null;
    Path.costSoFar = null;
    Path.estimatedCost = null;
  }
  private static canStepX(var0: number, var1: number, var2: number): boolean {
    let var3: number = Math.min(var0, var1);
    let var4: MapObject = null;
    if ((var4 = Game.level.objects[var3][var2]) !== null && var4.blocksMoveX()) {
      return false;
    } else {
      let var5: MapObject = null;
      if ((var5 = Game.level.objects[var0][var2]) === null || var5.type !== 48) {
        let var6: MapObject = null;
        return (var6 = Game.level.objects[var1][var2]) === null || var6.type !== 48 ? !Game.level.tiles[var1][var2].isWater() : !var6.blocksMoveX();
      } else {
        return !var5.blocksMoveX();
      }
    }
  }
  private static canStepY(var0: number, var1: number, var2: number): boolean {
    let var3: number = Math.max(var0, var1);
    let var4: MapObject = null;
    if ((var4 = Game.level.objects[var2][var3]) !== null && var4.blocksMoveY()) {
      return false;
    } else {
      let var5: MapObject = null;
      if ((var5 = Game.level.objects[var2][var0]) === null || var5.type !== 48) {
        let var6: MapObject = null;
        return (var6 = Game.level.objects[var2][var1]) === null || var6.type !== 48 ? !Game.level.tiles[var2][var1].isWater() : !var6.blocksMoveY();
      } else {
        return !var5.blocksMoveY();
      }
    }
  }
  static isGroundLevel(var0: number, var1: number): boolean {
    let var2: MapObject = null;
    return (var2 = Game.level.objects[var0][var1]) === null ? !Game.level.tiles[var0][var1].isElevated() : !var2.isElevated();
  }
  private static search(var0: number, var1: number, var2: number, var3: number): Path {
    Sys.currentTimeMillis();
    if (Path.openSet === null) {
      let var8: number = Game.level.height;
      let var7: number = Game.level.width;
      Path.openSet = newArray(Game.level.width, () => new Array<boolean>(var8).fill(false));
      Path.cameFrom = newArray(var7, () => new Int8Array(var8));
      Path.costSoFar = newArray(var7, () => new Int32Array(var8));
      Path.estimatedCost = newArray(var7, () => new Int32Array(var8));
    }
    for (let var4: number = 0; var4 < Path.openSet.length; var4++) {
      for (let var6: number = 0; var6 < Path.openSet[var4].length; var6++) {
        Path.openSet[var4][var6] = false;
        Path.cameFrom[var4][var6] = 0;
        Path.estimatedCost[var4][var6] = 2147483647;
      }
    }
    Path.costSoFar[var0][var1] = 0;
    Path.estimatedCost[var0][var1] = Path.costSoFar[var0][var1];
    Path.cameFrom[var0][var1] = -128;
    let var5: number = 0;
    Path.currentX = var0;
    Path.currentY = var1;
    let var32: boolean = false;
    do {
      let var17: number = Path.currentX;
      var5 = Path.currentY;
      let var30: number = var3;
      let var26: number = var2;
      let var22: number = var5;
      if (var17 === var26 && var22 === var30) {
        Sys.currentTimeMillis();
        var22 = var5;
        var17 = var17;
        if (Path.cameFrom[var17][var22] === (-128)) {
          return null;
        }
        let var29: Path = new Path();
        do {
          var29.xs.add(var17);
          var29.ys.add(var22);
          switch (Math.abs(Path.cameFrom[var17][var22])) {
            case 1:
              var29.steps++;
              var22--;
              break;
            case 2:
              var29.steps++;
              var22++;
              break;
            case 3:
              var29.steps++;
              var17++;
              break;
            case 4:
              var29.steps++;
              var17--;
          }
        } while (Path.cameFrom[var17][var22] !== (-128));
        var29.xs.add(var17);
        var29.ys.add(var22);
        var29.pointCount = var29.xs.size;
        return var29;
      }
      var30 = var3;
      var26 = var2;
      var22 = var5;
      var17 = var17;
      if (var17 + 1 < Path.openSet.length && !Path.isClosed(var17 + 1, var22) && Path.canStepX(var17, var17 + 1, var22)) {
        var0 = Path.costSoFar[var17][var22] + 1;
        if (Path.cameFrom[var17][var22] !== 4) {
          var0 += 2;
        }
        if (Game.level.tiles[var17 + 1][var22].isElevated()) {
          var0 += 3;
        }
        var1 = Path.costSoFar[var17][var22] + Path.manhattan(var17 + 1, var22, var26, var30);
        Path.openNode(var17 + 1, var22, (4) << 24 >> 24, var1, var0);
      }
      if (var22 - 1 >= 0 && !Path.isClosed(var17, var22 - 1) && Path.canStepY(var22, var22 - 1, var17)) {
        var0 = Path.costSoFar[var17][var22] + 1;
        if (Path.cameFrom[var17][var22] !== 2) {
          var0 += 2;
        }
        if (Game.level.tiles[var17][var22 - 1].isElevated()) {
          var0 += 3;
        }
        var1 = Path.costSoFar[var17][var22] + Path.manhattan(var17, var22 - 1, var26, var30);
        Path.openNode(var17, var22 - 1, (2) << 24 >> 24, var1, var0);
      }
      if (var17 - 1 >= 0 && !Path.isClosed(var17 - 1, var22) && Path.canStepX(var17, var17 - 1, var22)) {
        var0 = Path.costSoFar[var17][var22] + 1;
        if (Path.cameFrom[var17][var22] !== 3) {
          var0 += 2;
        }
        if (Game.level.tiles[var17 - 1][var22].isElevated()) {
          var0 += 3;
        }
        var1 = Path.costSoFar[var17][var22] + Path.manhattan(var17 - 1, var22, var26, var30);
        Path.openNode(var17 - 1, var22, (3) << 24 >> 24, var1, var0);
      }
      if (var22 + 1 < Path.openSet[0].length && !Path.isClosed(var17, var22 + 1) && Path.canStepY(var22, var22 + 1, var17)) {
        var0 = Path.costSoFar[var17][var22] + 1;
        if (Path.cameFrom[var17][var22] !== 1) {
          var0 += 2;
        }
        if (Game.level.tiles[var17][var22 + 1].isElevated()) {
          var0 += 3;
        }
        var1 = Path.costSoFar[var17][var22] + Path.manhattan(var17, var22 + 1, var26, var30);
        Path.openNode(var17, var22 + 1, (1) << 24 >> 24, var1, var0);
      }
      var17 = 2147483647;
      for (let var24: number = 0; var24 < Path.openSet.length; var24++) {
        for (let var28: number = 0; var28 < Path.openSet[0].length; var28++) {
          if (Path.openSet[var24][var28] && Path.estimatedCost[var24][var28] < var17) {
            Path.currentX = var24;
            Path.currentY = var28;
            var17 = Path.estimatedCost[var24][var28];
          }
        }
      }
      if (var17 < 2147483647) {
        Path.openSet[Path.currentX][Path.currentY] = false;
        Path.cameFrom[Path.currentX][Path.currentY] = (-Math.abs(Path.cameFrom[Path.currentX][Path.currentY])) << 24 >> 24;
        var32 = true;
      } else {
        var32 = false;
      }
    } while (var32);
    Sys.currentTimeMillis();
    return null;
  }
  private static openNode(var0: number, var1: number, var2: number, var3: number, var4: number): void {
    if (!Path.openSet[var0][var1] || Path.estimatedCost[var0][var1] >= var3) {
      Path.openSet[var0][var1] = true;
      Path.cameFrom[var0][var1] = var2;
      Path.estimatedCost[var0][var1] = var3;
      Path.costSoFar[var0][var1] = var4;
    }
  }
  private static isClosed(var0: number, var1: number): boolean {
    return Path.cameFrom[var0][var1] < 0;
  }
}
