// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { DataInputStream, DataOutputStream } from "../runtime/io";
import { Vector, idiv } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { MapEntity } from "./MapEntity";
import { Game } from "./Game";
import { Animation } from "./Animation";
import { Engine } from "./Engine";
import { Level } from "./Level";
import { Building } from "./Building";
import { GameUi } from "./GameUi";

export class MapObject implements MapEntity {
  type: number = 0;
  auxA: number = 0;
  auxB: number = 0;
  image: number = 0;
  frame: number = 0;
  flags: number = 0;
  animation: Animation = null;
  tileX: number = -2147483648;
  tileY: number = -2147483648;
  building: Building = null;
  static growingTrees: Vector = new Vector(32, 16);
  private static grainFields: Vector = new Vector(16, 8);
  constructor() {
  }
  static tickGrowth(): void {
    for (let var0: number = 0; var0 < MapObject.growingTrees.size(); var0++) {
      let var1: MapObject = null;
      if ((var1 = MapObject.growingTrees.elementAt(var0) as MapObject).auxA < 30) {
        var1.auxA++;
      }
    }
    for (let var2: number = 0; var2 < MapObject.grainFields.size(); var2++) {
      let var3: MapObject = null;
      if ((var3 = MapObject.grainFields.elementAt(var2) as MapObject).auxA <= 0) {
        var3.auxA -= 6;
      }
      if (var3.auxA <= (-10)) {
        var3.auxA = 10;
      }
    }
  }
  drawAt(var1: Graphics, var2: number, var3: number): void {
    switch (this.type as number) {
      case 16:
        if (this.auxA < 15) {
          if (this.auxA > 8) {
            this.frame = 16396;
          } else {
            this.frame = 16397;
          }
        } else {
          this.frame = this.auxB;
        }
        Engine.drawSprite(var1, var2, var3, this.image, this.frame);
      case 80:
      case 128:
      case 160:
        break;
      case 96:
        Engine.drawSprite(var1, var2, var3, this.image, this.animation.frame);
        return;
      case 112:
        if (this.auxA < 0) {
          let var5: number = Math.min(1, idiv(Math.abs(this.auxA << 1), 10));
          Engine.drawSprite(var1, var2, var3, this.image = 33, this.frame = var5 + 16413);
          return;
        }
        if (this.auxA > 0) {
          let var4: number = Math.min(2, idiv(Math.imul(this.auxA, 3), 10));
          Engine.drawSprite(var1, var2, var3, this.image = 32, this.frame = var4 + 16410);
          return;
        }
        Engine.drawSprite(var1, var2, var3, this.image = 32, this.frame = 16409);
        return;
      case 144:
        Engine.drawImage(var1, var2, var3, 25);
        break;
      case 176:
        Engine.drawImage(var1, var2, var3, 43);
        break;
      case 192:
        Engine.drawSprite(var1, var2, var3, this.image, this.frame);
        if (this.animation !== null) {
          if (this.animation.frame === (-1)) {
            this.animation.dispose();
            this.animation = null;
            return;
          }
          Engine.drawSprite(var1, var2, var3, this.auxA, this.animation.frame);
        }
        return;
      default:
        if (this.animation !== null) {
          Engine.drawSprite(var1, var2, var3, this.image, this.animation.frame);
        } else {
          Engine.drawSprite(var1, var2, var3, this.image, this.frame);
        }
    }
    if (this.building !== null) {
      this.building.isVisible = true;
      if (!this.building.isComplete()) {
        Engine.drawSprite(var1, var2, var3, this.auxA, this.auxB);
        return;
      }
      if (this.animation !== null) {
        if (this.building.hasWorkAnimation) {
          Engine.drawSprite(var1, var2, var3, this.image, this.frame);
          this.building.drawWorkAnimation(var1, var2, var3);
          return;
        }
        Engine.drawSprite(var1, var2, var3, this.image, this.frame + this.animation.frame);
        return;
      }
      Engine.drawSprite(var1, var2, var3, this.image, this.frame);
    }
  }
  drawPlacementMarker(var1: Graphics): void {
    if (this.tileX >= (-1) && this.tileY >= (-1) && this.tileX < Game.level.width + 1 && this.tileY < Game.level.height + 1) {
      let var2: number = 0;
      if (this.setTileAndCheckPlacement(this.tileX, this.tileY)) {
        var2 = 0;
      } else {
        var2 = 16;
      }
      let var3: number = (this.tileX << 5) + (this.tileY << 5) - GameUi.cameraX;
      let var4: number = (this.tileY << 4) - (this.tileX << 4) - GameUi.cameraY;
      Engine.drawSprite(var1, var3, var4, 26, var2);
    }
  }
  addToMap(): boolean {
    Game.level.objects[this.tileX][this.tileY] = this;
    switch (this.type as number) {
      case 16:
        MapObject.growingTrees.addElement(this);
        break;
      case 80:
      case 128:
        if (Game.level.tiles[this.tileX][this.tileY].isCoast()) {
          Game.level.tiles[this.tileX][this.tileY] = Level.flatShoreTiles[Engine.randomInt(Level.flatShoreTiles.length)];
        }
        break;
      case 96:
        return this.building.addFarmPlot(this);
      case 112:
        MapObject.grainFields.addElement(this);
        return this.building.addFarmPlot(this);
    }
    return false;
  }
  removeFromMap(): void {
    Game.level.objects[this.tileX][this.tileY] = null;
    switch (this.type as number) {
      case 16:
        MapObject.growingTrees.removeElement(this);
        return;
      case 112:
        MapObject.grainFields.removeElement(this);
    }
  }
  setTileAndCheckPlacement(var1: number, var2: number): boolean {
    this.tileX = var1;
    this.tileY = var2;
    if (var1 >= 0 && var2 >= 0 && var1 < Game.level.width && var2 < Game.level.height) {
      if (!Game.level.levelStarted) {
        switch (this.type as number) {
          case 32:
          case 80:
          case 96:
          case 112:
          case 128:
          case 144:
          case 160:
            if (var1 < 1 || var2 < 1 || var1 >= Game.level.width - 1 || var2 >= Game.level.height - 1) {
              return false;
            }
            if (var1 > 0 && Game.level.objects[var1 - 1][var2] !== null && Game.level.objects[var1 - 1][var2].isTall()) {
              return false;
            }
            if (var2 < Game.level.height - 1 && Game.level.objects[var1][var2 + 1] !== null && Game.level.objects[var1][var2 + 1].isTall()) {
              return false;
            }
            if (var1 > 0 && var2 < Game.level.height - 1 && Game.level.objects[var1 - 1][var2 + 1] !== null && Game.level.objects[var1 - 1][var2 + 1].isTall()) {
              return false;
            }
        }
      }
      let var3: boolean = Game.level.objects[var1][var2] === null || Game.level.objects[var1][var2].isReplaceable();
      switch (this.type as number) {
        case 16:
        case 32:
        case 80:
        case 96:
        case 112:
        case 160:
        default:
          if (var3 && Game.level.tiles[var1][var2].method_113() && !Game.level.tiles[var1][var2].isCoast()) {
            return true;
          }
          return false;
        case 128:
          if (var3 && Game.level.tiles[var1][var2].isCoast()) {
            return true;
          }
          return false;
        case 144:
          return Game.level.objects[var1][var2] !== null && Game.level.objects[var1][var2].type === 32;
      }
    } else {
      return false;
    }
  }
  save(var1: DataOutputStream): void {
    switch (this.type as number) {
      case 16:
        var1.writeShort(this.type);
        var1.writeShort(this.auxA);
        var1.writeShort(this.auxB);
        return;
      case 32:
      case 192:
        var1.writeShort(this.type);
        return;
      case 48:
        var1.writeShort(this.type);
        var1.writeBoolean(this.frame === 16400);
        return;
      case 64:
        var1.writeShort(this.type);
        var1.writeShort(this.frame);
        return;
      default:
        var1.writeShort(-1);
    }
  }
  static load(var0: DataInputStream): MapObject {
    let var1: MapObject = null;
    switch (var0.readShort()) {
      case 16:
        (var1 = MapObject.createTree()).auxA = var0.readShort();
        var1.auxB = var0.readShort();
        break;
      case 32:
        var1 = MapObject.createRocks();
        break;
      case 48:
        var1 = MapObject.createBridge(var0.readBoolean());
        break;
      case 64:
        let var2: number = 0;
        if ((var2 = var0.readShort()) !== 16405 && var2 !== 16402) {
          var1 = MapObject.createBridgeStart(var2 === 16403);
        } else {
          var1 = MapObject.createBridgeEnd(var2 === 16405);
        }
        break;
      case 192:
        var1 = MapObject.createRubble(true);
    }
    return var1;
  }
  static createTree(): MapObject {
    let var0: MapObject = null;
    (var0 = new MapObject()).type = 16;
    var0.auxA = 30;
    var0.image = 24;
    var0.frame = Engine.randomBool() ? 16394 : 16395;
    var0.auxB = var0.frame;
    var0.flags |= 1;
    return var0;
  }
  static createRocks(): MapObject {
    let var0: MapObject = null;
    (var0 = new MapObject()).type = 32;
    var0.auxA = 2147483647;
    var0.image = 25;
    var0.frame = Engine.frameForRow(Engine.randomInt(Engine.getImageInfo(25, 3)));
    return var0;
  }
  static createMarketTile(var0: Building): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).building = var0;
    var1.type = 176;
    return var1;
  }
  static createDecoration(var0: number): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).type = 208;
    var1.flags |= 2;
    var1.image = var0;
    return var1;
  }
  static createBridge(var0: boolean): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).type = 48;
    var1.image = 28;
    var1.frame = var0 ? 16400 : 16401;
    var1.flags |= var0 ? 16 : 8;
    var1.flags |= 32;
    return var1;
  }
  static createBridgeEnd(var0: boolean): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).type = 64;
    var1.image = 29;
    var1.frame = var0 ? 16405 : 16402;
    var1.flags |= 4;
    var1.flags |= 32;
    Game.level.bridgeEnds.addElement(var1);
    return var1;
  }
  static createBridgeStart(var0: boolean): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).type = 64;
    var1.image = 29;
    var1.frame = var0 ? 16403 : 16404;
    var1.flags |= 4;
    var1.flags |= 32;
    return var1;
  }
  static createPigsty(var0: Building): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).type = 96;
    var1.image = 34;
    var1.frame = 0;
    var1.animation = new Animation().$init2(Animation.pigstyFrames);
    var1.building = var0;
    var1.auxA = 2147483647;
    return var1;
  }
  static createGrainField(var0: Building): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).building = var0;
    var1.type = 112;
    var1.auxA = 0;
    var1.image = 32;
    var1.frame = 0;
    return var1;
  }
  static createFishingHutTile(var0: Building): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).building = var0;
    var1.type = 128;
    return var1;
  }
  static createMineTile(var0: Building): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).building = var0;
    var1.type = 144;
    return var1;
  }
  static createFarmHouseTile(var0: Building): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).building = var0;
    var1.type = 160;
    return var1;
  }
  static createRubble(var0: boolean): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).type = 192;
    var1.image = 51;
    var1.flags = 2;
    var1.auxA = 50;
    var1.frame = 0;
    if (!var0) {
      var1.animation = new Animation().$init1();
      var1.animation.play(Animation.rubbleDustFrames);
    }
    return var1;
  }
  static createBuildingTile(var0: Building): MapObject {
    let var1: MapObject = null;
    (var1 = new MapObject()).type = 80;
    var1.building = var0;
    switch (var0.buildingType as number) {
      case 0:
      case 12:
        var1.flags |= 1;
      default:
        return var1;
    }
  }
  setSprite(var1: number, var2: number): void {
    this.image = var1;
    this.frame = var2;
  }
  static clearLists(): void {
    MapObject.growingTrees.removeAllElements();
    MapObject.grainFields.removeAllElements();
  }
  getTileX(): number {
    return this.tileX;
  }
  getTileY(): number {
    return this.tileY;
  }
  private isTall(): boolean {
    return (this.flags & 1) !== 0;
  }
  isElevated(): boolean {
    return (this.flags & 32) !== 0;
  }
  blocksMoveX(): boolean {
    return (this.flags & 8) !== 0;
  }
  blocksMoveY(): boolean {
    return (this.flags & 16) !== 0;
  }
  isReplaceable(): boolean {
    return (this.flags & 2) !== 0;
  }
  isOnMap(): boolean {
    return this.tileX >= 0 && this.tileX < Game.level.width && this.tileY >= 0 && this.tileY < Game.level.height ? Game.level.objects[this.tileX][this.tileY] === this : false;
  }
}
