// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { DataInputStream, DataOutputStream } from "../runtime/io";
import { IllegalArgumentException, Vector, bor, idiv, newArray } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { MapEntity } from "./MapEntity";
import { Game } from "./Game";
import { Animation } from "./Animation";
import { Townsman } from "./Townsman";
import { Engine } from "./Engine";
import { Ambience } from "./Ambience";
import { MapObject } from "./MapObject";
import { GameData } from "./GameData";
import { Building } from "./Building";
import { MapTile } from "./MapTile";
import { GameUi } from "./GameUi";

export class Level {
  bridgeEnds: Vector = null;
  tiles: MapTile[][] = null;
  objects: MapObject[][] = null;
  townsmen: Townsman[][] = null;
  width: number = 0;
  height: number = 0;
  levelIndex: number = 0;
  levelStarted: boolean = false;
  restoringSave: boolean = false;
  genRivers: number = 0;
  genPonds: number = 0;
  genTrees: number = 0;
  genForestsGaussFactor: number = 0;
  genRocks: number = 0;
  genSeaEdges: number = 0;
  genMaxBridges: number = 0;
  genLandDecorPercent: number = 0;
  genWaterDecorPercent: number = 0;
  genMinIslandSize: number = 0;
  rainChance: number = 0;
  stormChance: number = 0;
  static openEndSize: number = 0;
  static openEndWater: number = 0;
  static openEndEnemy: number = 0;
  private static grassTiles: MapTile[] = null;
  private static waterTiles: MapTile[] = null;
  private static shoreTiles: MapTile[] = null;
  static flatShoreTiles: MapTile[] = null;
  static field_52: number = Math.max(100, 50);
  static field_53: number = Math.max(50, 50);
  static field_54: number = Math.max(50, 50);
  static field_55: number = Math.max(150, 50);
  static field_56: number = Math.max(150, 50);
  static field_57: number = Math.max(150, 50);
  $init0(var1: DataInputStream): this {
    Game.level = null;
    this.restoringSave = true;
    Game.level = this;
    this.levelIndex = var1.readByte();
    this.width = var1.readByte();
    this.height = var1.readByte();
    this.tiles = newArray(this.width, () => new Array<MapTile>(this.height).fill(null));
    this.objects = newArray(this.width, () => new Array<MapObject>(this.height).fill(null));
    this.townsmen = newArray(this.width, () => new Array<Townsman>(this.height).fill(null));
    this.bridgeEnds = new Vector();
    Level.initTileTypes();
    for (let var2: number = 0; var2 < this.width; var2++) {
      for (let var3: number = 0; var3 < this.height; var3++) {
        let var4: number = 0;
        if (((var4 = var1.readShort()) & 15) === 0) {
          if ((var4 & 64) !== 0) {
            this.tiles[var2][var3] = Level.flatShoreTiles[Engine.randomInt(Level.flatShoreTiles.length)];
          } else if ((var4 & 32) === 0) {
            this.tiles[var2][var3] = Level.grassTiles[Engine.randomInt(Level.grassTiles.length)];
          } else {
            this.tiles[var2][var3] = Level.waterTiles[Engine.randomInt(Level.waterTiles.length)];
          }
        } else {
          this.tiles[var2][var3] = Level.shoreTiles[var4 & 15];
        }
      }
    }
    for (let var5: number = 0; var5 < this.width; var5++) {
      for (let var6: number = 0; var6 < this.height; var6++) {
        let var7: MapObject = null;
        if ((var7 = MapObject.load(var1)) !== null) {
          var7.setTileAndCheckPlacement(var5, var6);
          var7.addToMap();
        }
      }
    }
    return this;
  }
  $init1(var1: number): this {
    Game.level = null;
    Game.level = this;
    this.levelIndex = var1;
    GameData.applyLevelSettings(this);
    this.genMaxBridges = Math.max(1, this.genMaxBridges);
    this.tiles = newArray(this.width, () => new Array<MapTile>(this.height).fill(null));
    this.objects = newArray(this.width, () => new Array<MapObject>(this.height).fill(null));
    this.townsmen = newArray(this.width, () => new Array<Townsman>(this.height).fill(null));
    this.bridgeEnds = new Vector();
    Level.initTileTypes();
    this.generateWater();
    this.generateBridges();
    this.generateTreesAndRocks();
    this.generateDecorations();
    GameData.placeInitialSettlements();
    return this;
  }
  private static initTileTypes(): void {
    if (Level.grassTiles === null) {
      Level.grassTiles = new Array<MapTile>(Engine.getImageInfo(16, 3)).fill(null);
      for (let var0: number = 0; var0 < Level.grassTiles.length; (var0 = (var0 + 1) << 16 >> 16)) {
        Level.grassTiles[var0] = new MapTile();
        Level.grassTiles[var0].flags = 0;
        Level.grassTiles[var0].sprite = 16;
        Level.grassTiles[var0].frame = Engine.frameForRow(var0);
      }
    }
    if (Level.waterTiles === null) {
      Level.waterTiles = new Array<MapTile>(32).fill(null);
      for (let var1: number = 0; var1 < Level.waterTiles.length; (var1 = (var1 + 1) << 16 >> 16)) {
        Level.waterTiles[var1] = new MapTile();
        Level.waterTiles[var1].flags = 48;
        Level.waterTiles[var1].overlayAnimation = new Animation().$init2(Animation.waterOverlayFrames);
        Level.waterTiles[var1].overlayAnimation.randomizeStep();
        Level.waterTiles[var1].overlayAnimation.dispose();
        Level.waterTiles[var1].animation = new Animation().$init2(Animation.waterFrames);
        Level.waterTiles[var1].animation.randomizeStep();
        Level.waterTiles[var1].animation.dispose();
      }
    }
    if (Level.shoreTiles === null) {
      (Level.shoreTiles = new Array<MapTile>(16).fill(null))[0] = null;
      Level.shoreTiles[5] = null;
      Level.shoreTiles[10] = null;
      Level.shoreTiles[15] = null;
      Level.shoreTiles[1] = new MapTile();
      Level.shoreTiles[1].flags = 128;
      Level.shoreTiles[1].frame = Engine.frameForRow(10);
      Level.shoreTiles[2] = new MapTile();
      Level.shoreTiles[2].flags = 128;
      Level.shoreTiles[2].frame = Engine.frameForRow(9);
      Level.shoreTiles[3] = new MapTile();
      Level.shoreTiles[3].flags = 128;
      Level.shoreTiles[3].frame = Engine.frameForRow(1);
      Level.shoreTiles[4] = new MapTile();
      Level.shoreTiles[4].flags = 128;
      Level.shoreTiles[4].frame = Engine.frameForRow(8);
      Level.shoreTiles[6] = new MapTile();
      Level.shoreTiles[6].flags = 128;
      Level.shoreTiles[6].frame = Engine.frameForRow(3);
      Level.shoreTiles[7] = new MapTile();
      Level.shoreTiles[7].flags = 128;
      Level.shoreTiles[7].frame = Engine.frameForRow(7);
      Level.shoreTiles[8] = new MapTile();
      Level.shoreTiles[8].flags = 128;
      Level.shoreTiles[8].frame = Engine.frameForRow(11);
      Level.shoreTiles[9] = new MapTile();
      Level.shoreTiles[9].flags = 64;
      Level.shoreTiles[9].frame = Engine.frameForRow(2);
      Level.shoreTiles[11] = new MapTile();
      Level.shoreTiles[11].flags = 64;
      Level.shoreTiles[11].frame = Engine.frameForRow(4);
      Level.shoreTiles[12] = new MapTile();
      Level.shoreTiles[12].flags = 128;
      Level.shoreTiles[12].frame = Engine.frameForRow(0);
      Level.shoreTiles[13] = new MapTile();
      Level.shoreTiles[13].flags = 128;
      Level.shoreTiles[13].frame = Engine.frameForRow(5);
      Level.shoreTiles[14] = new MapTile();
      Level.shoreTiles[14].flags = 128;
      Level.shoreTiles[14].frame = Engine.frameForRow(6);
      for (let var2: number = 0; var2 < Level.shoreTiles.length; var2++) {
        if (Level.shoreTiles[var2] !== null) {
          Level.shoreTiles[var2].sprite = 21;
          Level.shoreTiles[var2].flags |= var2;
          Level.shoreTiles[var2].flags |= 64;
          Level.shoreTiles[var2].animation = new Animation().$init2(Animation.coastFrames);
          Level.shoreTiles[var2].animation.randomizeStep();
          Level.shoreTiles[var2].animation.dispose();
        }
      }
    }
    if (Level.flatShoreTiles === null) {
      Level.flatShoreTiles = new Array<MapTile>(Engine.getImageInfo(17, 3)).fill(null);
      for (let var3: number = 0; var3 < Level.flatShoreTiles.length; (var3 = (var3 + 1) << 16 >> 16)) {
        Level.flatShoreTiles[var3] = new MapTile();
        Level.flatShoreTiles[var3].flags = 64;
        Level.flatShoreTiles[var3].sprite = 17;
        Level.flatShoreTiles[var3].frame = Engine.frameForRow(var3);
      }
    }
  }
  private generateWater(): void {
    for (let var1: number = 0; var1 < this.width; var1++) {
      for (let var2: number = 0; var2 < this.height; var2++) {
        this.tiles[var1][var2] = Level.grassTiles[Engine.randomInt(Level.grassTiles.length)];
      }
    }
    if ((this.genSeaEdges & 1) !== 0) {
      let var11: number = this.width - 1;
      for (let var14: number = 0; var14 < this.height; var14++) {
        this.tiles[var11][var14] = Level.waterTiles[0];
        if (Engine.randomBool()) {
          this.tiles[var11 - 1][var14] = Level.waterTiles[0];
          if (Engine.randomBool()) {
            this.tiles[var11 - 2][var14] = Level.waterTiles[0];
          }
        }
      }
    }
    if ((this.genSeaEdges & 4) !== 0) {
      for (let var15: number = 0; var15 < this.height; var15++) {
        this.tiles[0][var15] = Level.waterTiles[0];
        if (Engine.randomBool()) {
          this.tiles[1][var15] = Level.waterTiles[0];
          if (Engine.randomBool()) {
            this.tiles[2][var15] = Level.waterTiles[0];
          }
        }
      }
    }
    if ((this.genSeaEdges & 2) !== 0) {
      for (let var16: number = 0; var16 < this.width; var16++) {
        this.tiles[var16][0] = Level.waterTiles[0];
        if (Engine.randomBool()) {
          this.tiles[var16][1] = Level.waterTiles[0];
          if (Engine.randomBool()) {
            this.tiles[var16][2] = Level.waterTiles[0];
          }
        }
      }
    }
    if ((this.genSeaEdges & 8) !== 0) {
      let var12: number = this.height - 1;
      for (let var17: number = 0; var17 < this.width; var17++) {
        this.tiles[var17][var12] = Level.waterTiles[0];
        if (Engine.randomBool()) {
          this.tiles[var17][var12 - 1] = Level.waterTiles[0];
          if (Engine.randomBool()) {
            this.tiles[var17][var12 - 2] = Level.waterTiles[0];
          }
        }
      }
    }
    let var13: boolean = this.genRivers > 0;
    this.genRivers = Math.abs(this.genRivers);
    for (let var18: number = 0; var18 < this.genRivers; var18++) {
      let var3: number = Engine.randomRange(idiv(this.width, 3), idiv(this.width << 1, 3));
      let var4: number = Engine.randomRange(idiv(this.height, 3), idiv(this.height << 1, 3));
      if (var18 === 0) {
        var3 = idiv(this.width, 2);
        var4 = idiv(this.height, 2);
      }
      let var5: number = var3;
      let var6: number = var4;
      let var7: number = Engine.randomBool() ? 1 : (-1);
      let var8: number = Engine.randomBool() ? 1 : (-1);
      let var9: number = var7;
      let var10: number = var8;
      if (Engine.randomBool() && !var13) {
        var9 = -var9;
      }
      while (0 <= var3 && var3 < this.width && 0 <= var4 && var4 < this.height) {
        this.tiles[var3][var4] = Level.waterTiles[0];
        if (Engine.randomBool()) {
          var3 += var7;
        }
        if (Engine.randomBool()) {
          var4 += var8;
        }
      }
      while (0 <= var5 && var5 < this.width && 0 <= var6 && var6 < this.height) {
        this.tiles[var5][var6] = Level.waterTiles[0];
        if (Engine.randomBool()) {
          var5 -= var9;
        }
        if (Engine.randomBool()) {
          var6 -= var10;
        }
      }
    }
    for (let var19: number = 0; var19 < this.genPonds; var19++) {
      let var22: number = Engine.randomRange(idiv(this.width, 4), idiv(Math.imul(this.width, 3), 4));
      let var25: number = Engine.randomRange(idiv(this.height, 4), idiv(Math.imul(this.height, 3), 4));
      this.tiles[var22][var25] = Level.waterTiles[0];
      if (Engine.randomBool()) {
        this.tiles[var22 + 1][var25] = Level.waterTiles[0];
      }
      if (Engine.randomBool()) {
        this.tiles[var22][var25 + 1] = Level.waterTiles[0];
      }
      if (Engine.randomBool()) {
        this.tiles[var22][var25 - 1] = Level.waterTiles[0];
      }
      if (Engine.randomBool()) {
        this.tiles[var22 - 1][var25] = Level.waterTiles[0];
      }
    }
    for (let var20: number = 0; var20 < this.width; var20++) {
      for (let var23: number = 0; var23 < this.height; var23++) {
        if (!this.tiles[var20][var23].isWater()) {
          let var26: number = 0;
          let var27: number = Math.min(var20 + 1, this.width - 1);
          let var31: number = Math.max(var23 - 1, 0);
          if (this.tiles[var27][var31].isWater() || this.tiles[var20][var31].isWater() || this.tiles[var27][var23].isWater()) {
            var26 = 1;
          }
          var27 = Math.max(var20 - 1, 0);
          var31 = Math.max(var23 - 1, 0);
          if (this.tiles[var27][var31].isWater() || this.tiles[var20][var31].isWater() || this.tiles[var27][var23].isWater()) {
            var26 = (var26 | 2) << 24 >> 24;
          }
          var27 = Math.max(var20 - 1, 0);
          var31 = Math.min(var23 + 1, this.height - 1);
          if (this.tiles[var27][var31].isWater() || this.tiles[var20][var31].isWater() || this.tiles[var27][var23].isWater()) {
            var26 = (var26 | 4) << 24 >> 24;
          }
          var27 = Math.min(var20 + 1, this.width - 1);
          var31 = Math.min(var23 + 1, this.height - 1);
          if (this.tiles[var27][var31].isWater() || this.tiles[var20][var31].isWater() || this.tiles[var27][var23].isWater()) {
            var26 = (var26 | 8) << 24 >> 24;
          }
          if (Level.shoreTiles[var26] !== null) {
            this.tiles[var20][var23] = Level.shoreTiles[var26];
          } else if (var26 !== 0) {
            this.tiles[var20][var23] = Level.waterTiles[0];
            var20 = Math.max(var20 - 2, 0);
            var23 = Math.max(var23 - 2, 0);
          }
        }
      }
    }
    for (let var21: number = 0; var21 < this.width; var21++) {
      for (let var24: number = 0; var24 < this.height; var24++) {
        if (this.tiles[var21][var24].isWater()) {
          this.tiles[var21][var24] = Level.waterTiles[Engine.randomInt(Level.waterTiles.length)];
        }
      }
    }
  }
  private generateBridges(): void {
    let var1: Int32Array[] = newArray(this.width, () => new Int32Array(this.height));
    for (let var2: number = 0; var2 < this.width; var2++) {
      for (let var3: number = 0; var3 < this.height; var3++) {
        var1[var2][var3] = this.tiles[var2][var3].isWater() ? (-1) : 0;
      }
    }
    let var12: Vector = new Vector();
    let var19: number = 1;
    let var4: number = 1;
    for (let var5: number = 0; var5 < this.width; var5++) {
      for (let var6: number = 0; var6 < this.height; var6++) {
        if (var1[var5][var6] !== (-1)) {
          if (this.tiles[var5][var6] === Level.shoreTiles[11] || this.tiles[var5][var6] === Level.shoreTiles[7]) {
            var4 = ++var19;
          }
          if (var5 > 0 && this.tiles[var5][var6] !== Level.shoreTiles[14] && this.tiles[var5][var6] !== Level.shoreTiles[7] && var1[var5 - 1][var6] !== (-1) && var1[var5 - 1][var6] !== var4) {
            if (var4 > var1[var5 - 1][var6]) {
              var12.addElement(Int32Array.of(var4, var1[var5 - 1][var6]));
              var4 = var1[var5 - 1][var6];
            } else {
              var12.addElement(Int32Array.of(var1[var5 - 1][var6], var4));
            }
          }
          var1[var5][var6] = var4;
        } else {
          var4 = ++var19;
        }
      }
      var4 = ++var19;
    }
    var12.size();
    for (let var34: number = 0; var34 < var12.size(); var34++) {
      let var43: Int32Array = (var12.elementAt(var34) as Int32Array);
      for (let var20: number = 0; var20 < this.width; var20++) {
        for (let var26: number = 0; var26 < this.height; var26++) {
          if (var1[var20][var26] === var43[0]) {
            var1[var20][var26] = var43[1];
          }
        }
      }
    }
    for (let var35: number = var12.size() - 1; var35 >= 0; var35--) {
      let var44: Int32Array = (var12.elementAt(var35) as Int32Array);
      for (let var21: number = 0; var21 < this.width; var21++) {
        for (let var27: number = 0; var27 < this.height; var27++) {
          if (var1[var21][var27] === var44[0]) {
            var1[var21][var27] = var44[1];
          }
        }
      }
    }
    for (let var36: number = 0; var36 < this.width; var36++) {
      for (let var45: number = 0; var45 < this.height; var45++) {
        if (var1[var36][var45] === (-1)) {
          var1[var36][var45] = 0;
        } else {
          var1[var36][var45] = -var1[var36][var45];
        }
      }
    }
    let var37: number = 1;
    for (let var46: number = 0; var46 < this.width; var46++) {
      for (let var22: number = 0; var22 < this.height; var22++) {
        if (var1[var46][var22] < 0) {
          var4 = var1[var46][var22];
          for (let var13: number = 0; var13 < this.width; var13++) {
            for (let var7: number = 0; var7 < this.height; var7++) {
              if (var1[var13][var7] === var4) {
                var1[var13][var7] = var37;
              }
            }
          }
          var37++;
        }
      }
    }
    let var47: Int32Array = new Int32Array(var37);
    for (let var23: number = 0; var23 < this.width; var23++) {
      for (let var29: number = 0; var29 < this.height; var29++) {
        var47[var1[var23][var29]]++;
      }
    }
    for (let var24: number = 0; var24 < var47.length; var24++) {
      if (var47[var24] < this.genMinIslandSize) {
        for (let var30: number = 0; var30 < this.width; var30++) {
          for (let var14: number = 0; var14 < this.height; var14++) {
            if (var1[var30][var14] === var24) {
              this.tiles[var30][var14] = Level.waterTiles[0];
              var1[var30][var14] = 0;
            }
          }
        }
      }
    }
    let var25: Vector = new Vector();
    for (let var31: number = 0; var31 < this.width; var31++) {
      let var15: number = 0;
      let var52: number = 0;
      let var48: number = (-1);
      let var8: number = (-1);
      while (var15 < this.height) {
        if (var1[var31][var15] !== 0) {
          if (var52 === 0) {
            var52 = var1[var31][var15];
            var48 = var31;
            var8 = var15;
          } else if (var52 === var1[var31][var15]) {
            var48 = var31;
            var8 = var15;
          } else {
            var37 = var1[var31][var15];
            let var9: number = var31;
            let var10: number = var15;
            if (var52 > var37) {
              let var11: number = var37;
              var37 = var52;
              var52 = var11;
            }
            var25.insertElementAt(Int32Array.of(var10 - var8, var52, var37, var48, var8, var9, var10), Engine.randomInt(var25.size()));
            var52 = 0;
          }
        }
        var15++;
      }
    }
    for (let var32: number = 0; var32 < this.height; var32++) {
      let var16: number = 0;
      let var53: number = 0;
      let var49: number = (-1);
      let var56: number = (-1);
      while (var16 < this.width) {
        if (var1[var16][var32] !== 0) {
          if (var53 === 0) {
            var53 = var1[var16][var32];
            var49 = var16;
            var56 = var32;
          } else if (var53 === var1[var16][var32]) {
            var49 = var16;
            var56 = var32;
          } else {
            var37 = var1[var16][var32];
            let var59: number = var16;
            let var68: number = var32;
            if (var53 > var37) {
              let var73: number = var37;
              var37 = var53;
              var53 = var73;
            }
            var25.insertElementAt(Int32Array.of(var59 - var49, var53, var37, var49, var56, var59, var68), Engine.randomInt(var25.size()));
            var53 = 0;
          }
        }
        var16++;
      }
    }
    var25.size();
    let var33: boolean = false;
    do {
      var33 = true;
      for (let var17: number = 0; var17 < var25.size() - 1; var17++) {
        let var54: Int32Array = (var25.elementAt(var17) as Int32Array);
        let var40: Int32Array = (var25.elementAt(var17 + 1) as Int32Array);
        if (var54[0] > var40[0]) {
          var33 = false;
          var25.setElementAt(var54, var17 + 1);
          var25.setElementAt(var40, var17);
        }
      }
    } while (!var33);
    var12 = new Vector();
    while (var25.size() > 0) {
      let var55: Int32Array = (var25.firstElement() as Int32Array);
      for (let var41: number = 0; var41 < var25.size(); var41++) {
        if ((var47 = var25.elementAt(var41) as Int32Array)[1] === var55[1] && var47[2] === var55[2]) {
          var25.removeElement(var47);
          var12.addElement(var47);
          var41--;
        } else if (var47[1] === var55[2]) {
          var47[1] = var55[1];
        } else if (var47[2] === var55[2]) {
          var47[2] = var55[1];
          if (var47[1] > var47[2]) {
            let var57: number = var47[2];
            var47[2] = var47[1];
            var47[1] = var57;
          }
        }
      }
      var12.size();
      var37 = Math.min(var12.size(), this.genMaxBridges);
      for (let var51: number = 0; var51 < var37 && var12.size() > 0; var51++) {
        let var58: Int32Array = null;
        if ((var58 = var12.firstElement() as Int32Array)[3] !== var58[5]) {
          for (let var63: number = var58[3] + 1; var63 < var58[5]; var63++) {
            let var70: MapObject = null;
            (var70 = MapObject.createBridge(true)).setTileAndCheckPlacement(var63, var58[4]);
            var70.addToMap();
          }
          let var64: MapObject = null;
          (var64 = MapObject.createBridgeStart(true)).setTileAndCheckPlacement(var58[3], var58[4]);
          var64.addToMap();
          (var64 = MapObject.createBridgeEnd(true)).setTileAndCheckPlacement(var58[5], var58[6]);
          var64.addToMap();
        } else {
          for (let var60: number = var58[4] + 1; var60 < var58[6]; var60++) {
            let var69: MapObject = null;
            (var69 = MapObject.createBridge(false)).setTileAndCheckPlacement(var58[3], var60);
            var69.addToMap();
          }
          let var61: MapObject = null;
          (var61 = MapObject.createBridgeStart(false)).setTileAndCheckPlacement(var58[3], var58[4]);
          var61.addToMap();
          (var61 = MapObject.createBridgeEnd(false)).setTileAndCheckPlacement(var58[5], var58[6]);
          var61.addToMap();
        }
        var12.removeElement(var58);
        for (let var66: number = 0; var66 < var12.size(); var66++) {
          let var71: Int32Array = (var12.elementAt(var66) as Int32Array);
          if (Level.bridgesTooClose(var58, var71)) {
            var12.removeElement(var71);
            var66--;
          }
        }
        for (let var67: number = 0; var67 < var25.size(); var67++) {
          let var72: Int32Array = (var25.elementAt(var67) as Int32Array);
          if (Level.bridgesTooClose(var58, var72)) {
            var25.removeElement(var72);
            var67--;
          }
        }
      }
      var12.removeAllElements();
    }
  }
  private static bridgesTooClose(var0: Int32Array, var1: Int32Array): boolean {
    let var2: boolean = false;
    var2 = bor(bor(bor(bor(false, Math.abs(var1[3] - var0[3]) < 2 && Math.abs(var1[4] - var0[4]) < 2), Math.abs(var1[5] - var0[5]) < 2 && Math.abs(var1[6] - var0[6]) < 2), Math.abs(var1[3] - var0[5]) < 2 && Math.abs(var1[4] - var0[6]) < 2), Math.abs(var1[5] - var0[3]) < 2 && Math.abs(var1[6] - var0[4]) < 2);
    if (var0[3] === var0[5]) {
      var2 = bor(var2, var1[4] === var1[6] && var1[3] <= var0[3] && var1[5] >= var0[3]);
    } else if (var0[4] === var0[6]) {
      var2 = bor(var2, var1[3] === var1[5] && var1[4] <= var0[4] && var1[6] >= var0[4]);
    }
    return bor(bor(bor(var2, var1[3] === var0[3] && var1[4] === var0[4]), var1[3] === var0[5] && var1[4] === var0[6]), var1[5] === var0[3] && var1[6] === var0[4]);
  }
  private generateTreesAndRocks(): void {
    if (this.genForestsGaussFactor === 0) {
      throw new IllegalArgumentException("genForestsGaussFactor must not be zero!");
    }
    let var1: number = 0;
    for (let var2: number = 0; var2 < this.genTrees; var2++) {
      let var3: MapObject = MapObject.createTree();
      let var4: number = 0;
      let var5: number = 0;
      for (let var6: number = 0; var6 < Math.abs(this.genForestsGaussFactor); var6++) {
        var4 += Engine.randomInt(this.width);
        var5 += Engine.randomInt(this.height);
      }
      var4 = idiv(var4, Math.abs(this.genForestsGaussFactor));
      var5 = idiv(var5, Math.abs(this.genForestsGaussFactor));
      if (this.genForestsGaussFactor < 0) {
        var4 -= idiv(this.width, 2);
        var5 -= idiv(this.height, 2);
        if (var4 < 0) {
          var4 += this.width;
        }
        if (var5 < 0) {
          var5 += this.height;
        }
      }
      if (var3.setTileAndCheckPlacement(var4, var5)) {
        var3.setTileAndCheckPlacement(var4, var5);
        var3.addToMap();
        var1 = 0;
      } else {
        if (++var1 > 100) {
          break;
        }
        var2--;
      }
    }
    var1 = 0;
    for (let var8: number = 0; var8 < this.genRocks; var8++) {
      let var9: MapObject = MapObject.createRocks();
      let var11: number = Engine.randomInt(this.width);
      let var13: number = Engine.randomInt(this.height);
      if (var9.setTileAndCheckPlacement(var11, var13)) {
        var9.setTileAndCheckPlacement(var11, var13);
        var9.addToMap();
        var1 = 0;
      } else {
        if (++var1 > 100) {
          return;
        }
        var8--;
      }
    }
  }
  private generateDecorations(): void {
    for (let var1: number = 0; var1 < this.width; var1++) {
      for (let var2: number = 0; var2 < this.height; var2++) {
        if (this.objects[var1][var2] === null && !this.tiles[var1][var2].isWater() && this.tiles[var1][var2].method_113() && !this.tiles[var1][var2].isCoast() && Engine.randomInt(100) < this.genLandDecorPercent) {
          this.objects[var1][var2] = MapObject.createDecoration(176 + Engine.randomInt(13));
        }
      }
    }
    for (let var3: number = 0; var3 < this.width; var3++) {
      for (let var4: number = 0; var4 < this.height; var4++) {
        if (this.objects[var3][var4] === null && this.tiles[var3][var4].isWater() && Engine.randomInt(100) < this.genWaterDecorPercent) {
          this.objects[var3][var4] = MapObject.createDecoration(189 + Engine.randomInt(2));
        }
      }
    }
  }
  placeRandomly(var1: MapEntity): void {
    this.placeRandomlyNearPoint(var1, 0, 0, 0);
  }
  placeRandomlyNear(var1: MapEntity, var2: number, var3: MapEntity): void {
    if (var3 !== null) {
      this.placeRandomlyNearPoint(var1, var2, var3.getTileX(), var3.getTileY());
    } else {
      this.placeRandomly(var1);
    }
  }
  placeRandomlyNearPoint(var1: MapEntity, var2: number, var3: number, var4: number): void {
    let var5: number = 0;
    let var6: number = 0;
    do {
      var6 = Engine.randomInt(this.width);
      let var7: number = Engine.randomInt(this.height);
      for (let var8: number = 0; var8 < Math.abs(var2); var8++) {
        let var9: number = Engine.randomInt(this.width);
        let var10: number = Engine.randomInt(this.height);
        if (var1.setTileAndCheckPlacement(var9, var10) && Math.abs(var6 - var3) >= Math.abs(var9 - var3) && Math.abs(var7 - var4) >= Math.abs(var10 - var4)) {
          var6 = var9;
          var7 = var10;
        }
      }
      if (var1.setTileAndCheckPlacement(var6, var7)) {
        var1.addToMap();
        var6 = 0;
      } else {
        var5++;
        var6 = 1;
        if (var5 > 100) {
          return;
        }
      }
    } while (var6 !== 0);
  }
  draw(var1: Graphics): void {
    Building.clearVisibleFlags();
    if (GameUi.visibleTileMinY === 0) {
      for (let var2: number = GameUi.visibleTileMaxX; var2 >= GameUi.visibleTileMinX; var2--) {
        let var4: number = (var2 << 5) - GameUi.cameraX;
        let var5: number = 0 - (var2 << 4) - GameUi.cameraY;
        if (var2 === this.width - 1) {
          Engine.drawSprite(var1, var4, var5, 23, 16391);
        }
        Engine.drawSprite(var1, var4, var5, 22, 16388);
      }
    }
    if (GameUi.visibleTileMaxX === this.width - 1) {
      let var8: number = this.width - 1;
      for (let var3: number = GameUi.visibleTileMinY; var3 <= GameUi.visibleTileMaxY; var3++) {
        let var16: number = (var8 << 5) + (var3 << 5) - GameUi.cameraX;
        let var22: number = (var3 << 4) - (var8 << 4) - GameUi.cameraY;
        Engine.drawSprite(var1, var16, var22, 22, 16387);
      }
    }
    for (let var9: number = GameUi.visibleTileMaxX; var9 >= GameUi.visibleTileMinX; var9--) {
      for (let var12: number = GameUi.visibleTileMinY; var12 <= GameUi.visibleTileMaxY; var12++) {
        let var17: number = (var9 << 5) + (var12 << 5) - GameUi.cameraX;
        let var23: number = (var12 << 4) - (var9 << 4) - GameUi.cameraY;
        let var10000: MapTile = this.tiles[var9][var12];
        let var7: number = var23;
        let var6: number = var17;
        let var24: Graphics = var1;
        let var18: MapTile = var10000;
        if (var10000.isWater()) {
          Engine.drawSprite(var24, var6, var7, 18, var18.animation.frame);
          if (Game.weather === 0) {
            Engine.drawSprite(var24, var6, var7, 20, var18.overlayAnimation.frame);
          }
        } else if (var18.isCoast()) {
          if (var18.animation !== null) {
            Engine.drawSprite(var24, var6, var7, 19, var18.animation.frame);
          }
          Engine.drawSprite(var24, var6, var7, var18.sprite, var18.frame);
        } else {
          Engine.drawSprite(var24, var6, var7, var18.sprite, var18.frame);
        }
      }
    }
    for (let var10: number = GameUi.visibleTileMaxX; var10 >= GameUi.visibleTileMinX; var10--) {
      for (let var13: number = GameUi.visibleTileMinY; var13 <= GameUi.visibleTileMaxY; var13++) {
        let var19: number = (var10 << 5) + (var13 << 5) - GameUi.cameraX;
        let var25: number = (var13 << 4) - (var10 << 4) - GameUi.cameraY;
        if (this.objects[var10][var13] !== null) {
          this.objects[var10][var13].drawAt(var1, var19, var25);
        }
        this.townsmen[var10][var13] = Townsman.sortTileListByDepth(this.townsmen[var10][var13]);
        for (let var28: Townsman = this.townsmen[var10][var13]; var28 !== null; var28 = var28.nextOnTile) {
          var28.draw(var1, var19, var25);
        }
      }
    }
    if (GameUi.visibleTileMinX === 0) {
      for (let var14: number = GameUi.visibleTileMinY; var14 <= GameUi.visibleTileMaxY; var14++) {
        let var20: number = 0 + (var14 << 5) - GameUi.cameraX;
        let var26: number = (var14 << 4) - GameUi.cameraY;
        if (var14 === 0) {
          Engine.drawSprite(var1, var20, var26, 23, 16392);
        }
        Engine.drawSprite(var1, var20, var26, 22, 16389);
      }
    }
    if (GameUi.visibleTileMaxY === this.height - 1) {
      for (let var11: number = GameUi.visibleTileMaxX; var11 >= GameUi.visibleTileMinX; var11--) {
        let var15: number = this.height - 1;
        let var21: number = (var11 << 5) + (var15 << 5) - GameUi.cameraX;
        let var27: number = (var15 << 4) - (var11 << 4) - GameUi.cameraY;
        if (var11 === this.width - 1) {
          Engine.drawSprite(var1, var21, var27, 23, 16393);
        }
        Engine.drawSprite(var1, var21, var27, 22, 16390);
        if (var11 === 0) {
          Engine.drawSprite(var1, var21, var27, 23, 0);
        }
      }
    }
    Building.drawAllStatusIcons(var1);
    Ambience.drawWeather(var1);
  }
  static animateTiles(): void {
    for (let var0: number = 0; var0 < Level.shoreTiles.length; var0++) {
      if (Level.shoreTiles[var0] !== null) {
        Level.shoreTiles[var0].animation.update();
      }
    }
    for (let var1: number = 0; var1 < Level.waterTiles.length; var1++) {
      Level.waterTiles[var1].animation.update();
      Level.waterTiles[var1].overlayAnimation.update();
    }
  }
  static randomBuildingOfType(var0: number, var1: number): Building {
    let var2: Vector = new Vector();
    if (var0 !== (-1)) {
      for (let var3: number = 0; var3 < Building.all.size(); var3++) {
        let var4: Building = null;
        if ((var4 = Building.all.elementAt(var3) as Building).buildingType === var0 && var4.owner === var1 && var4.isComplete()) {
          var2.addElement(var4);
        }
      }
    } else {
      for (let var6: number = 0; var6 < Building.all.size(); var6++) {
        let var7: Building = null;
        if ((var7 = Building.all.elementAt(var6) as Building).buildingType !== 0 && var7.owner === var1 && var7.isComplete()) {
          var2.addElement(var7);
        }
      }
    }
    let var5: Vector = var2;
    return var2.size() > 0 ? (var5.elementAt(Engine.randomInt(var5.size())) as Building) : null;
  }
  write(var1: DataOutputStream): void {
    var1.writeByte(this.levelIndex);
    var1.writeByte(this.width);
    var1.writeByte(this.height);
    for (let var2: number = 0; var2 < this.tiles.length; var2++) {
      for (let var3: number = 0; var3 < this.tiles[var2].length; var3++) {
        var1.writeShort(this.tiles[var2][var3].flags);
      }
    }
    for (let var4: number = 0; var4 < this.objects.length; var4++) {
      for (let var5: number = 0; var5 < this.objects[var4].length; var5++) {
        if (this.objects[var4][var5] !== null && this.objects[var4][var5].building === null) {
          this.objects[var4][var5].save(var1);
        } else {
          var1.writeShort(-1);
        }
      }
    }
  }
}
