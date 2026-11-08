// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { DataInputStream, DataOutputStream } from "../runtime/io";
import { Vector, idiv } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { MapEntity } from "./MapEntity";
import { Path } from "./Path";
import { Game } from "./Game";
import { Animation } from "./Animation";
import { Engine } from "./Engine";
import { Ambience } from "./Ambience";
import { MapObject } from "./MapObject";
import { GameData } from "./GameData";
import { App } from "./App";
import { Building } from "./Building";

export class Townsman {
  home: Building = null;
  workplace: Building = null;
  targetObject: MapObject = null;
  private spriteImage: number = 0;
  private facingFrame: number = 0;
  private animation: Animation = new Animation().$init1();
  private tileX: number = 0;
  private tileY: number = 0;
  private nextTileX: number = 0;
  private nextTileY: number = 0;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private targetOffsetX: number = 0;
  private targetOffsetY: number = 0;
  private heightOffset: number = 0;
  private targetHeightOffset: number = 0;
  private script: Int32Array = null;
  private scriptRegister: number = 0;
  private scriptPos: number = 0;
  private currentOp: number = 0;
  jobSlot: number = 0;
  private state: number = 0;
  waitTicks: number = 0;
  private path: Path = null;
  private pathDirection: number = 0;
  private pathIndex: number = 0;
  kind: number = 0;
  carriedGoods: number = 0;
  private prevOnTile: Townsman = null;
  nextOnTile: Townsman = null;
  private linkedTileX: number = -2147483648;
  private linkedTileY: number = -2147483648;
  static townettes: Vector = new Vector(32, 16);
  static unemployed: Vector = new Vector(32, 16);
  static townies: Vector = new Vector(32, 16);
  static homeless: Vector = new Vector(32, 16);
  static soldiers: Vector = new Vector(32, 16);
  static soldiersWithoutCamp: Vector = new Vector(32, 16);
  static idleSoldiers: Vector = new Vector(32, 16);
  static propagandists: Vector = new Vector(32, 16);
  static propagandistsWithoutCoffeeHouse: Vector = new Vector(32, 16);
  static idlePropagandists: Vector = new Vector(32, 16);
  static enemies: Vector = new Vector(32, 16);
  static idleEnemies: Vector = new Vector(32, 16);
  constructor() {
  }
  setJobScript(var1: Int32Array): void {
    if (this.script !== var1) {
      let var2: Townsman = this;
      if (Game.packedFlags(this.currentOp) !== 587202560) {
        if (var2.carriedGoods !== 0) {
          var2.currentOp = 587202560 | var2.carriedGoods;
          if (var2.workplace !== null) {
            if (var2.workplace.nearestStorage === null) {
              var2.workplace.findNearestStorage();
            }
            var2.waitTicks = 0;
            var2.walkToEntity(var2.workplace.nearestStorage);
            if (var2.script !== null && Game.packedResource(var2.script[0]) === 983040) {
              var2.workplace.returnMaterial(var2.carriedGoods);
            }
          } else {
            var2.waitTicks = 0;
            var2.walkToEntity(Building.mainBuilding.nearestStorage);
          }
        } else {
          var2.currentOp = 0;
          var2.setState(0);
        }
      }
      this.script = var1;
      this.scriptPos = 0;
      this.targetObject = null;
    }
  }
  private update(): void {
    if (this.waitTicks !== 0) {
      if (--this.waitTicks > 0) {
        return;
      }
      this.waitTicks = 0;
    }
    switch (this.state as number) {
      case 0:
      case 9:
      case 10:
        if (this.script !== null) {
          this.currentOp = this.script[this.scriptPos];
          this.executeOp();
          return;
        }
        if (this.tileX === this.home.tileX && this.tileY === this.home.tileY) {
          this.setState(1);
          return;
        }
        this.walkToEntity(this.home);
        return;
      case 1:
        if (this.script !== null) {
          this.setState(0);
          this.currentOp = this.script[this.scriptPos];
          this.executeOp();
          return;
        }
        return;
      case 2:
        if (!this.stepAlongPath()) {
          return;
        }
      case 3:
      case 4:
      case 5:
      case 6:
        break;
      case 7:
        if (this.stepAlongPath()) {
          if (this.workplace !== null && this.workplace.battle !== null) {
            this.workplace.battle.onUnitArrived(this);
            this.setState(8);
            return;
          }
          this.setState(0);
          return;
        }
        return;
      case 8:
      default:
        return;
    }
    let var1: Townsman = this;
    if (this.currentOp !== 0) {
      let var2: number = Game.packedFlags(var1.currentOp);
      let var3: number = Game.packedResource(var1.currentOp);
      let var4: number = Game.packedAmount(var1.currentOp);
      if (var1.workplace !== null) {
        if (var1.workplace.nearestStorage === null) {
          var1.workplace.findNearestStorage();
        }
        if (var1.workplace.nearestWell === null) {
          var1.workplace.findNearestWell();
        }
      }
      switch (var2) {
        case 16777216:
          if (var1.workplace.nearestStorage.tileX !== var1.tileX || var1.workplace.nearestStorage.tileY !== var1.tileY) {
            var1.walkToEntity(var1.workplace.nearestStorage);
            return;
          }
          break;
        case 83886080:
          if (var1.workplace.nearestWell === null) {
            var1.scriptPos = 0;
          } else if (var1.workplace.nearestWell.tileX !== var1.tileX || var1.workplace.nearestWell.tileY !== var1.tileY) {
            var1.walkToEntity(var1.workplace.nearestWell);
            return;
          }
          break;
        case 268435456:
        case 285212672:
        case 301989888:
        case 805306368:
        case 822083584:
          var1.carriedGoods = 0;
        case 318767104:
        case 1090519040:
        default:
          break;
        case 536870912:
          if ((var2 = Game.deposit(var3, var4)) === 0) {
            var1.setState(10);
            var1.waitTicks = Engine.randomRange(2, 15);
            var1.workplace.nearestStorage.addStatusIcon(Game.field_285[var3 >> 16], 16484);
            return;
          }
          var1.carriedGoods = 0;
          if (var2 < var4) {
            var1.workplace.nearestStorage.addStatusIcon(Game.field_285[var3 >> 16], 16483);
          }
          break;
        case 553648128:
        case 570425344:
          var1.scriptRegister = var1.scriptRegister - Game.packedAmount(var1.carriedGoods);
          var1.scriptRegister = Math.max(var1.scriptRegister, 0);
          if ((var2 = Game.deposit(var3, Game.packedAmount(var1.carriedGoods))) === 0) {
            var1.waitTicks = Engine.randomRange(2, 15);
            var1.workplace.nearestStorage.addStatusIcon(Game.field_285[var3 >> 16], 16484);
            return;
          }
          var1.carriedGoods = 0;
          if (var2 < var4) {
            var1.workplace.nearestStorage.addStatusIcon(Game.field_285[var3 >> 16], 16483);
          }
          break;
        case 587202560:
          Game.deposit(var3, var4);
          var1.carriedGoods = 0;
          break;
        case 1073741824:
          if (var1.tileX !== var1.workplace.tileX || var1.tileY !== var1.workplace.tileY) {
            var1.tileX = var1.workplace.tileX;
            var1.tileY = var1.workplace.tileY;
            var1.offsetX = -2;
            var1.offsetY = -1;
          }
          var1.workplace.isWorking = false;
          break;
        case 1107296256:
          var1.workplace.addConstructionProgress(var1.scriptRegister);
          var1.carriedGoods = 0;
      }
    }
    var1.finishOp();
  }
  private executeOp(): void {
    let var1: number = Game.packedFlags(this.currentOp);
    let var2: number = Game.packedResource(this.currentOp);
    let var3: number = Game.packedAmount(this.currentOp);
    if (this.workplace !== null) {
      if (this.workplace.nearestStorage === null) {
        this.workplace.findNearestStorage();
      }
      if (this.workplace.nearestWell === null) {
        this.workplace.findNearestWell();
      }
    }
    switch (var1) {
      case (-1610612736):
        this.scriptRegister = var3;
        break;
      case (-1593835520):
        this.scriptRegister += var3;
        break;
      case (-1577058304):
        this.scriptRegister = Math.max(this.scriptRegister - var3, 0);
        break;
      case (-1560281088):
        this.scriptRegister = Math.imul(this.scriptRegister, var3);
        break;
      case (-1543503872):
        this.scriptRegister = idiv(this.scriptRegister, var3);
        break;
      case (-1526726656):
        this.scriptPos = var3;
        return;
      case (-1509949440):
        if (this.scriptRegister !== 0) {
          this.scriptPos = var3;
          return;
        }
        this.finishOp();
        return;
      case (-1493172224):
        if (this.scriptRegister === 0) {
          this.scriptPos = var3;
          return;
        }
        this.finishOp();
        return;
      case (-268435456):
        this.setState(0);
        this.waitTicks = Engine.randomRange(2, 15);
        break;
      case (-251658240):
        this.finishOp();
        this.setState(1);
        this.waitTicks = Engine.randomRange(100, 140);
        if (this.kind === 1) {
          var1 = 0;
          if (this.workplace.nearestWell !== null) {
            var1 = 0 + Path.distance(this.workplace, this.workplace.nearestWell);
          }
          if (this.workplace.nearestStorage !== null) {
            var1 += Path.distance(this.workplace, this.workplace.nearestStorage);
          }
          var1 <<= 1;
          this.waitTicks += Math.imul(10 - var1, 10);
          return;
        }
        return;
      case (-234881024):
        this.carriedGoods = var2 | var3;
        break;
      case 16777216:
        this.walkToEntity(this.workplace.nearestStorage);
        return;
      case 33554432:
        this.walkToEntity(this.home);
        return;
      case 50331648:
        this.walkToEntity(this.workplace);
        return;
      case 67108864:
        if (this.targetObject !== null && this.targetObject.auxA > 0) {
          this.walkToEntity(this.targetObject);
          return;
        }
        switch (this.workplace.buildingType as number) {
          case 9:
            this.targetObject = Path.findNearestTree(this.workplace);
          default:
            this.waitTicks = Engine.randomRange(2, 15);
            return;
        }
      case 83886080:
        if (this.workplace.nearestWell === null) {
          if (this.kind === 1) {
            Game.changeHappiness(-2);
            this.scriptRegister = 0;
            this.finishOp();
            this.waitTicks = Engine.randomRange(2, 15) + 7;
            this.setState(10);
            this.offsetX = this.offsetY = 0;
            return;
          }
          this.waitTicks = Engine.randomRange(2, 15) + 40;
          return;
        }
        if (this.kind === 1) {
          this.scriptRegister = 1;
        }
        this.walkToEntity(this.workplace.nearestWell);
        return;
      case 100663296:
        if (Building.mainBuilding === null) {
          this.waitTicks = Engine.randomRange(2, 15);
          return;
        }
        this.walkToEntity(Building.mainBuilding);
        return;
      case 268435456:
        if ((var1 = Game.withdrawExact(var2, var3)) > 0) {
          this.carriedGoods = var2 | var1;
          this.walkToEntity(this.workplace);
          return;
        }
        this.setState(10);
        this.workplace.nearestStorage.addStatusIcon(Game.field_285[var2 >> 16], 16486);
        if (Game.packedResource(var2) !== 1114112) {
          this.workplace.addStatusIcon(Game.field_285[var2 >> 16], 16486);
          return;
        }
        Building.mainBuilding.addStatusIcon(Game.field_285[17], 16486);
        return;
      case 285212672:
        this.scriptRegister = Game.withdrawRange(var2, var3);
        if (this.scriptRegister <= 0) {
          this.workplace.nearestStorage.addStatusIcon(Game.field_285[var2 >> 16], 16486);
          this.workplace.addStatusIcon(Game.field_285[var2 >> 16], 16486);
          this.setState(10);
          return;
        }
        this.carriedGoods = var2 | this.scriptRegister;
        this.walkToEntity(this.workplace);
        if (this.scriptRegister < (var3 & 15)) {
          this.workplace.nearestStorage.addStatusIcon(Game.field_285[var2 >> 16], 16485);
          this.workplace.addStatusIcon(Game.field_285[var2 >> 16], 16485);
          return;
        }
        return;
      case 301989888:
        this.scriptRegister = Game.harvestMapObject(var3, this.targetObject);
        if (this.scriptRegister > 0) {
          this.carriedGoods = var2 | this.scriptRegister;
          this.walkToEntity(this.workplace);
          return;
        }
        switch (this.workplace.buildingType as number) {
          case 9:
            this.targetObject = null;
            this.scriptPos = 0;
          default:
            this.waitTicks = Engine.randomRange(2, 15);
            return;
        }
      case 318767104:
        this.carriedGoods = this.workplace.takeMaterialLoad();
        if (this.carriedGoods > 0) {
          this.scriptRegister = Game.packedAmount(this.carriedGoods);
          this.walkToEntity(this.workplace);
          return;
        }
        this.setState(10);
        return;
      case 536870912:
        this.carriedGoods = var2 | var3;
        if (Game.getStock(var2) < Game.storageCapacity) {
          this.walkToEntity(this.workplace.nearestStorage);
          return;
        }
        this.setState(10);
        this.waitTicks = Engine.randomRange(2, 15) + 7;
        this.workplace.nearestStorage.addStatusIcon(Game.field_285[var2 >> 16], 16484);
        return;
      case 553648128:
        if (var3 === 0) {
          var3 = this.scriptRegister;
        }
        this.carriedGoods = var2 | Math.min(this.scriptRegister, var3);
        if (Game.getStock(var2) < Game.storageCapacity) {
          this.walkToEntity(this.workplace.nearestStorage);
          return;
        }
        this.setState(10);
        this.waitTicks = Engine.randomRange(2, 15) + 7;
        this.workplace.nearestStorage.addStatusIcon(Game.field_285[var2 >> 16], 16484);
        return;
      case 570425344:
        this.scriptRegister = Game.harvestMapObject(var3, this.targetObject);
        if (var3 === 0) {
          var3 = this.scriptRegister;
        }
        this.carriedGoods = var2 | Math.min(this.scriptRegister, var3);
        if (Game.getStock(var2) < Game.storageCapacity) {
          this.walkToEntity(this.workplace.nearestStorage);
          return;
        }
        this.setState(10);
        this.waitTicks = Engine.randomRange(2, 15) + 7;
        this.workplace.nearestStorage.addStatusIcon(Game.field_285[var2 >> 16], 16484);
        return;
      case 805306368:
        this.scriptRegister = Game.consumeFood(var3, this.workplace.level);
        if (this.scriptRegister > 0) {
          this.carriedGoods = this.scriptRegister;
          this.walkToEntity(this.workplace);
          return;
        }
        Game.changeHappiness(-3);
        this.workplace.addStatusIcon(Game.field_285[2], 16486);
        this.workplace.addStatusIcon(Game.field_285[4], 16486);
        this.workplace.addStatusIcon(Game.field_285[7], 16486);
        this.setState(10);
        this.waitTicks = Engine.randomRange(2, 15) + 80;
        return;
      case 822083584:
        this.scriptRegister = Game.method_277(var3, this.workplace.nearestWell, this.kind);
        this.carriedGoods = 327680 | this.scriptRegister;
        this.walkToEntity(this.workplace);
        return;
      case 1073741824:
        this.waitTicks = var3;
        this.setState(3);
        return;
      case 1090519040:
        this.waitTicks = var3;
        this.setState(4);
        return;
      case 1107296256:
        this.setState(5);
        this.waitTicks = var3;
        return;
      case 1124073472:
        if (this.workplace.nearestWell !== null) {
          this.waitTicks = GameData.field_572[this.workplace.nearestWell.level];
          this.setState(6);
          return;
        }
        this.scriptPos = 0;
        this.walkToEntity(this.workplace);
        return;
      case 1342177280:
        if (this.workplace.garrisonCount >= GameData.getGarrisonCapacity(this.workplace.buildingType, this.workplace.level)) {
          this.waitTicks = Engine.randomRange(2, 15);
          return;
        }
        this.finishOp();
        return;
      case 1358954496:
        let var5: Townsman = null;
        (var5 = Townsman.create(2)).setHome(this.workplace);
        var5.setState(0);
        break;
      case 1375731712:
        let var4: Townsman = null;
        (var4 = Townsman.create(3)).setHome(this.workplace);
        var4.setState(0);
        break;
      case 1610612736:
        if (Game.researchLevel >= Game.maxResearchLevel) {
          this.waitTicks = Engine.randomRange(2, 15);
          return;
        }
        break;
      case 1627389952:
        if (Game.researchLevel < Game.maxResearchLevel && ++Game.researchProgress >= GameData.researchPointsPerLevel[Game.researchLevel]) {
          Game.researchLevel++;
          Game.researchProgress = 0;
          GameData.onTechLevelUp();
        }
        this.finishOp();
        this.waitTicks = var3;
        return;
    }
    this.finishOp();
  }
  private finishOp(): void {
    let var1: number = 0;
    if (this.script === null) {
      this.scriptPos = 0;
      this.currentOp = 0;
      var1 = 0;
    } else {
      var1 = Game.packedFlags(this.script[this.scriptPos]);
      if (++this.scriptPos >= this.script.length) {
        this.scriptPos = 0;
      }
    }
    switch (this.kind as number) {
      case 0:
        if (Game.happiness > Engine.randomInt(50)) {
          this.setState(0);
          this.waitTicks = 0;
          return;
        }
        this.setState(9);
        return;
      case 1:
        if (var1 === 1073741824) {
          this.setState(1);
          return;
        }
      default:
        this.setState(0);
    }
  }
  private walkTo(var1: number, var2: number): void {
    this.path = Path.find(this.tileX, this.tileY, var1, var2);
    if (this.path !== null) {
      if (this.path.xs.get(0) === this.tileX && this.path.ys.get(0) === this.tileY) {
        this.pathIndex = 0;
        this.pathDirection = 1;
      } else {
        this.pathIndex = this.path.xs.size - 1;
        this.pathDirection = -1;
      }
    }
    this.targetOffsetX = 0;
    this.targetOffsetY = 0;
    this.targetHeightOffset = 0;
    this.nextTileX = this.tileX;
    this.nextTileY = this.tileY;
    this.setState(2);
  }
  private walkToEntity(var1: MapEntity): void {
    this.walkTo(var1.getTileX(), var1.getTileY());
  }
  marchTo(var1: MapEntity): void {
    this.waitTicks = Engine.randomRange(2, 15);
    this.walkTo(var1.getTileX(), var1.getTileY());
    this.setState(7);
  }
  private hideInBuilding(): void {
    this.unlinkFromTile();
    this.spriteImage = -1;
    this.facingFrame = 0;
    this.carriedGoods = 0;
    this.animation.play(null);
  }
  private updateFacing(): void {
    if (this.offsetX > this.targetOffsetX) {
      if (this.offsetY > this.targetOffsetY) {
        this.facingFrame = 16;
        return;
      }
      if (this.offsetY < this.targetOffsetY) {
        this.facingFrame = 0;
        return;
      }
    } else if (this.offsetX < this.targetOffsetX) {
      if (this.offsetY > this.targetOffsetY) {
        this.facingFrame = 32;
        return;
      }
      if (this.offsetY < this.targetOffsetY) {
        this.facingFrame = 48;
      }
    }
  }
  setState(var1: number): void {
    this.state = var1;
    switch (var1) {
      case 0:
        if (this.kind === 0) {
          this.linkToTile();
          this.spriteImage = 191;
          this.animation.play(Animation.lookAroundFrames);
          this.facingFrame = 0;
          return;
        }
        if (this.kind === 1) {
          this.linkToTile();
          this.spriteImage = 201;
          this.animation.play(Animation.lookAroundFrames);
          this.facingFrame = 0;
          return;
        }
        this.hideInBuilding();
        return;
      case 1:
        this.hideInBuilding();
        return;
      case 2:
      case 7:
        this.linkToTile();
        this.animation.play(Animation.walkFrames);
        this.updateFacing();
        switch (this.kind as number) {
          case 0:
            this.spriteImage = this.carriedGoods === 0 ? 192 : 193;
            return;
          case 1:
            this.spriteImage = this.carriedGoods === 0 ? 202 : 203;
            return;
          case 2:
            this.spriteImage = 206;
            return;
          case 3:
            this.spriteImage = 207;
            return;
          case 4:
            this.spriteImage = 208;
          default:
            return;
        }
      case 3:
        this.linkToTile();
        this.animation.play(Animation.workFrames);
        this.facingFrame = 0;
        if (this.kind !== 0) {
          this.workplace.isWorking = true;
          this.hideInBuilding();
          return;
        }
        switch (this.workplace.buildingType as number) {
          case 4:
            this.hideInBuilding();
            this.workplace.tiles[0].animation.play(Animation.windmillFrames);
            return;
          case 5:
          case 11:
          default:
            this.spriteImage = 194;
            return;
          case 6:
            this.workplace.isWorking = true;
            this.spriteImage = 196;
            this.offsetX = 10;
            this.offsetY = -8;
            return;
          case 7:
            this.workplace.isWorking = true;
            this.animation.play(Animation.hammerFrames);
            this.spriteImage = 198;
            this.offsetX = 10;
            this.offsetY = -9;
            Ambience.queueSound(App.tickTime, 12);
            return;
          case 8:
            this.unlinkFromTile();
            this.animation.play(Animation.fishingFrames);
            this.spriteImage = 197;
            Path.pickFishingSpot(this.workplace);
            this.tileX = this.workplace.tiles[0].auxA;
            this.tileY = this.workplace.tiles[0].auxB;
            if (this.tileX !== (-1) && this.tileY !== (-1)) {
              this.offsetX = Engine.randomRange(-10, 10);
              this.offsetY = -8;
              this.linkToTile();
              return;
            }
            return;
          case 9:
            this.spriteImage = 195;
            Ambience.queueSound(App.tickTime, 13);
            if (this.workplace.workerCount() > 1) {
              this.randomizeWorkOffset();
              return;
            }
            return;
          case 10:
            this.animation.play(Animation.hammerFrames);
            this.spriteImage = 198;
            Ambience.queueSound(App.tickTime, 19);
            this.randomizeWorkOffset();
            return;
          case 12:
            this.workplace.isWorking = true;
            this.animation.play(Animation.universityFrames);
            this.hideInBuilding();
            return;
          case 13:
            this.workplace.isWorking = true;
            this.spriteImage = 194;
            return;
        }
      case 4:
        this.linkToTile();
        this.animation.play(Animation.workFrames);
        this.facingFrame = 0;
        switch (this.targetObject.type as number) {
          case 16:
            this.animation.play(Animation.hammerFrames);
            this.spriteImage = 198;
            Ambience.queueSound(App.tickTime, 24);
            this.randomizeWorkOffset();
            return;
          default:
            this.spriteImage = 194;
            return;
        }
      case 5:
        this.linkToTile();
        if (Game.packedResource(this.carriedGoods) === 0) {
          this.animation.play(Animation.workFrames);
          this.spriteImage = 195;
          Ambience.queueSound(App.tickTime, 13);
        } else {
          this.animation.play(Animation.hammerFrames);
          this.spriteImage = 198;
          Ambience.queueSound(App.tickTime, 12);
        }
        this.randomizeWorkOffset();
        this.facingFrame = 0;
        return;
      case 6:
        this.linkToTile();
        if (this.kind === 1) {
          this.spriteImage = 204;
        } else {
          this.spriteImage = 194;
        }
        this.animation.play(Animation.workFrames);
        this.facingFrame = 0;
        return;
      case 8:
      default:
        break;
      case 9:
        this.linkToTile();
        this.waitTicks = idiv(Math.imul(100 - Game.happiness, 30), 100);
        if (this.kind === 0) {
          this.spriteImage = 199;
          this.animation.play(Animation.sulkFrames);
          this.facingFrame = 0;
          return;
        }
        this.hideInBuilding();
        return;
      case 10:
        this.linkToTile();
        this.waitTicks = 7;
        this.animation.play(Animation.complainFrames);
        this.facingFrame = 0;
        this.randomizeWorkOffset();
        if (this.kind === 0) {
          this.spriteImage = 200;
          return;
        }
        this.spriteImage = 205;
    }
  }
  private stepAlongPath(): boolean {
    this.unlinkFromTile();
    if (this.offsetX === this.targetOffsetX && this.offsetY === this.targetOffsetY) {
      let var1: Townsman = this;
      let var10000: boolean = false;
      if (this.path === null) {
        var10000 = true;
      } else {
        label88: {
          let var2: number = var1.path.xs.get(var1.pathIndex);
          let var3: number = var1.path.ys.get(var1.pathIndex);
          if (var1.nextTileX === var2 && var1.nextTileY === var3) {
            var1.pathIndex = var1.pathIndex + var1.pathDirection;
            if (var1.pathIndex < 0 || var1.pathIndex >= var1.path.pointCount) {
              var1.offsetX = var1.targetOffsetX = 0;
              var1.offsetY = var1.targetOffsetY = 0;
              var1.tileX = var1.nextTileX;
              var1.tileY = var1.nextTileY;
              var1.path = null;
              var10000 = true;
              break label88;
            }
            var2 = var1.path.xs.get(var1.pathIndex);
            var3 = var1.path.ys.get(var1.pathIndex);
          }
          var1.tileX = var1.nextTileX;
          var1.tileY = var1.nextTileY;
          let var4: number = var2 - var1.tileX;
          let var5: number = var3 - var1.tileY;
          if (var4 > 0) {
            var1.nextTileX = var2;
            var1.nextTileY = var3;
            var1.offsetX = 0;
            var1.offsetY = 0;
            var1.targetOffsetX = 32;
            var1.targetOffsetY = -16;
          } else if (var4 < 0) {
            var1.tileX = var2;
            var1.tileY = var3;
            var1.nextTileX = var2;
            var1.nextTileY = var3;
            var1.offsetX = 32;
            var1.offsetY = -16;
            var1.targetOffsetX = 0;
            var1.targetOffsetY = 0;
          } else if (var5 > 0) {
            var1.tileX = var2;
            var1.tileY = var3;
            var1.nextTileX = var2;
            var1.nextTileY = var3;
            var1.offsetX = -32;
            var1.offsetY = -16;
            var1.targetOffsetX = 0;
            var1.targetOffsetY = 0;
          } else if (var5 < 0) {
            var1.nextTileX = var2;
            var1.nextTileY = var3;
            var1.offsetX = 0;
            var1.offsetY = 0;
            var1.targetOffsetX = -32;
            var1.targetOffsetY = -16;
          }
          var1.updateFacing();
          var1.targetHeightOffset = !Path.isGroundLevel(var1.tileX, var1.tileY) && !Path.isGroundLevel(var1.nextTileX, var1.nextTileY) ? (-16) : 0;
          var10000 = false;
        }
      }
      if (var10000) {
        return true;
      }
    }
    if (this.offsetX < this.targetOffsetX) {
      this.offsetX += 2;
    } else if (this.offsetX > this.targetOffsetX) {
      this.offsetX -= 2;
    }
    if (this.offsetY < this.targetOffsetY) {
      this.offsetY++;
    } else if (this.offsetY > this.targetOffsetY) {
      this.offsetY--;
    }
    if (this.heightOffset > this.targetHeightOffset) {
      this.heightOffset--;
    } else if (this.heightOffset < this.targetHeightOffset) {
      this.heightOffset++;
    }
    this.linkToTile();
    return false;
  }
  private linkToTile(): void {
    this.unlinkFromTile();
    this.linkedTileX = this.tileX;
    this.linkedTileY = this.tileY;
    this.nextOnTile = Game.level.townsmen[this.linkedTileX][this.linkedTileY];
    this.prevOnTile = null;
    if (this.nextOnTile !== null) {
      this.nextOnTile.prevOnTile = this;
    }
    Game.level.townsmen[this.linkedTileX][this.linkedTileY] = this;
  }
  unlinkFromTile(): void {
    if (this.linkedTileX !== -2147483648) {
      if (Game.level.townsmen[this.linkedTileX][this.linkedTileY] !== null) {
        if (this.prevOnTile !== null) {
          this.prevOnTile.nextOnTile = this.nextOnTile;
        } else {
          Game.level.townsmen[this.linkedTileX][this.linkedTileY] = this.nextOnTile;
        }
        if (this.nextOnTile !== null) {
          this.nextOnTile.prevOnTile = this.prevOnTile;
        }
      }
      this.nextOnTile = this.prevOnTile = null;
      this.linkedTileX = -2147483648;
    }
  }
  static sortTileListByDepth(var0: Townsman): Townsman {
    let var1: Townsman = var0;
    if (var0 === null) {
      return null;
    }
    while (var0 !== null) {
      if (var0.nextOnTile !== null && var0.nextOnTile.offsetY < var0.offsetY) {
        if (var0.prevOnTile !== null) {
          var0.prevOnTile.nextOnTile = var0.nextOnTile;
        }
        var0.nextOnTile.prevOnTile = var0.prevOnTile;
        var0.prevOnTile = var0.nextOnTile;
        let var2: Townsman = var0.nextOnTile.nextOnTile;
        var0.nextOnTile.nextOnTile = var0;
        var0.nextOnTile = var2;
        if (var2 !== null) {
          var2.prevOnTile = var0;
        }
        if (var0.prevOnTile.prevOnTile !== null) {
          var0 = var0.prevOnTile.prevOnTile;
        }
      } else {
        var0 = var0.nextOnTile;
      }
    }
    while (var1.prevOnTile !== null) {
      var1 = var1.prevOnTile;
    }
    return var1;
  }
  draw(var1: Graphics, var2: number, var3: number): void {
    Engine.drawSprite(var1, var2 + this.offsetX, var3 + this.offsetY + this.heightOffset, this.spriteImage, this.facingFrame + this.animation.frame);
    let var4: number = var3;
    var3 = var2;
    let var9: Graphics = var1;
    let var8: Townsman = this;
    if (this.carriedGoods !== 0) {
      let var5: number = Game.field_285[Game.packedResource(var8.carriedGoods) >> 16];
      let var6: number = Game.packedAmount(var8.carriedGoods);
      if (Game.packedResource(var8.carriedGoods) === 1114112) {
        var6 = Math.min(4, var6);
      }
      for (let var7: number = 0; var7 < var6; var7++) {
        Engine.drawSprite(var9, var3 + var8.offsetX - idiv(var6, 2) + (var7 << 1), var4 + var8.offsetY + var8.heightOffset - Engine.getCellHeight(var8.spriteImage), 110, var5);
      }
    }
  }
  static updateAll(): void {
    for (let var0: number = 0; var0 < Townsman.townies.size(); var0++) {
      (Townsman.townies.elementAt(var0) as Townsman).update();
    }
    for (let var1: number = 0; var1 < Townsman.townettes.size(); var1++) {
      (Townsman.townettes.elementAt(var1) as Townsman).update();
    }
    for (let var2: number = 0; var2 < Townsman.soldiers.size(); var2++) {
      (Townsman.soldiers.elementAt(var2) as Townsman).update();
    }
    for (let var3: number = 0; var3 < Townsman.propagandists.size(); var3++) {
      (Townsman.propagandists.elementAt(var3) as Townsman).update();
    }
    for (let var4: number = 0; var4 < Townsman.enemies.size(); var4++) {
      (Townsman.enemies.elementAt(var4) as Townsman).update();
    }
  }
  static applyHappinessModifiers(): void {
    Game.changeHappiness(Math.imul(Townsman.homeless.size(), -6));
    switch (Game.weather as number) {
      case 0:
        Game.changeHappiness(2);
        return;
      case 1:
        Game.changeHappiness(-5);
        return;
      case 2:
        Game.changeHappiness(-10);
    }
  }
  static create(var0: number): Townsman {
    let var1: Townsman = null;
    (var1 = new Townsman()).kind = var0;
    switch (var0) {
      case 0:
        Townsman.townies.addElement(var1);
        Townsman.unemployed.addElement(var1);
        var1.setHome(null);
        var1.setTile(Building.mainBuilding.tileX, Building.mainBuilding.tileY);
        Game.incrementStock(1179648);
        break;
      case 1:
        Townsman.townettes.addElement(var1);
        Game.incrementStock(1310720);
        break;
      case 2:
        Townsman.soldiers.addElement(var1);
        Townsman.idleSoldiers.addElement(var1);
        var1.setHome(null);
        var1.setTile(Building.mainBuilding.tileX, Building.mainBuilding.tileY);
        GameData.showTipOnce(8);
        Game.incrementStock(851968);
        break;
      case 3:
        Townsman.propagandists.addElement(var1);
        Townsman.idlePropagandists.addElement(var1);
        var1.setHome(null);
        var1.setTile(Building.mainBuilding.tileX, Building.mainBuilding.tileY);
        GameData.showTipOnce(9);
        Game.incrementStock(786432);
        break;
      case 4:
        if (Building.enemyCamps.size() > 0) {
          Townsman.enemies.addElement(var1);
          Townsman.idleEnemies.addElement(var1);
          var1.setHome(null);
          if (Game.level.restoringSave && var1.home !== null) {
            var1.setTile(var1.home.tileX, var1.home.tileY);
          }
          Game.incrementStock(1245184);
        }
    }
    return var1;
  }
  static createMany(var0: number, var1: number): void {
    for (let var2: number = 0; var2 < var1; var2++) {
      Townsman.create(var0);
    }
  }
  setTile(var1: number, var2: number): void {
    this.tileX = var1;
    this.tileY = var2;
    this.offsetX = 0;
    this.offsetY = 0;
  }
  private randomizeWorkOffset(): void {
    if (this.offsetX === 0) {
      this.offsetY = -Engine.randomRange(1, 8);
      this.offsetX = idiv(this.offsetY << 1, 2) << 1;
      if (!Game.level.objects[this.tileX][this.tileY].blocksMoveX() && Engine.randomBool()) {
        this.offsetX = -this.offsetX;
      }
      if (Game.level.objects[this.tileX][this.tileY].blocksMoveY() && this.offsetX < 0) {
        this.offsetX = -this.offsetX;
      }
    }
  }
  setHome(var1: Building): void {
    if (this.state === 1) {
      this.setState(0);
    }
    switch (this.kind as number) {
      case 0:
        if (var1 !== null) {
          this.home = var1;
          Townsman.homeless.removeElement(this);
          return;
        }
        if (!Townsman.homeless.contains(this)) {
          Townsman.homeless.addElement(this);
        }
        this.home = Building.mainBuilding;
        return;
      case 2:
        if (var1 !== null) {
          this.home = var1;
          var1.garrisonCount++;
          Townsman.soldiersWithoutCamp.removeElement(this);
          return;
        }
        if (this.home !== null) {
          this.home.garrisonCount--;
        }
        if (!Townsman.soldiersWithoutCamp.contains(this)) {
          Townsman.soldiersWithoutCamp.addElement(this);
        }
        this.home = Building.mainBuilding;
        return;
      case 3:
        if (var1 !== null) {
          this.home = var1;
          var1.garrisonCount++;
          Townsman.propagandistsWithoutCoffeeHouse.removeElement(this);
          return;
        }
        if (this.home !== null) {
          this.home.garrisonCount--;
        }
        if (!Townsman.propagandistsWithoutCoffeeHouse.contains(this)) {
          Townsman.propagandistsWithoutCoffeeHouse.addElement(this);
        }
        this.home = Building.mainBuilding;
        return;
      case 4:
        if (this.home !== null) {
          this.home.garrisonCount--;
        }
        this.home = var1;
        if (var1 === null) {
          Engine.assignAiHome(this);
          return;
        } else {
          var1.garrisonCount++;
        }
      case 1:
    }
  }
  setWorkplace(var1: Building): void {
    switch (this.kind as number) {
      case 0:
        if (this.workplace !== null) {
          if (var1 === null) {
            switch (this.state as number) {
              case 3:
                this.tileX = this.workplace.tileX;
                this.tileY = this.workplace.tileY;
                this.offsetX = 0;
                this.offsetY = 0;
              default:
                Townsman.unemployed.addElement(this);
                this.setJobScript(null);
            }
          }
        } else if (this.workplace === null && var1 !== null) {
          Townsman.unemployed.removeElement(this);
        }
        break;
      case 1:
        if (var1 === null) {
          this.remove();
        }
      case 2:
      case 3:
      default:
        break;
      case 4:
        if (var1 === null && (this.home.battle !== null || this.home.owner !== 1)) {
          Engine.assignAiHome(this);
        }
    }
    this.workplace = var1;
  }
  static clearAll(): void {
    Townsman.townettes.removeAllElements();
    Townsman.unemployed.removeAllElements();
    Townsman.townies.removeAllElements();
    Townsman.homeless.removeAllElements();
    Townsman.soldiers.removeAllElements();
    Townsman.soldiersWithoutCamp.removeAllElements();
    Townsman.idleSoldiers.removeAllElements();
    Townsman.propagandists.removeAllElements();
    Townsman.propagandistsWithoutCoffeeHouse.removeAllElements();
    Townsman.idlePropagandists.removeAllElements();
    Townsman.enemies.removeAllElements();
    Townsman.idleEnemies.removeAllElements();
  }
  remove(): void {
    switch (this.kind as number) {
      case 0:
        Game.decrementStock(1179648);
        break;
      case 1:
        Townsman.townettes.removeElement(this);
        Game.decrementStock(1310720);
        break;
      case 2:
        Townsman.soldiers.removeElement(this);
        Townsman.soldiersWithoutCamp.removeElement(this);
        Townsman.idleSoldiers.removeElement(this);
        Game.decrementStock(851968);
        if (this.home !== null && this.home.owner === 0) {
          this.home.garrisonCount--;
          Townsman.assignSoldiersToCamps();
        }
        break;
      case 3:
        Townsman.propagandists.removeElement(this);
        Townsman.propagandistsWithoutCoffeeHouse.removeElement(this);
        Townsman.idlePropagandists.removeElement(this);
        Game.decrementStock(786432);
        if (this.home !== null && this.home.owner === 0) {
          this.home.garrisonCount--;
          Townsman.assignPropagandistsToCoffeeHouses();
        }
        break;
      case 4:
        if (this.home !== null && this.home.owner === 1) {
          this.home.garrisonCount--;
        }
        Townsman.enemies.removeElement(this);
        Townsman.idleEnemies.removeElement(this);
        if (this.workplace !== null && this.workplace.battle !== null) {
          this.workplace.battle.enemiesPresent.removeElement(this);
          this.workplace.battle.enemiesMarching.removeElement(this);
        }
        Game.decrementStock(1245184);
    }
    this.animation.dispose();
    this.unlinkFromTile();
  }
  combatStrength(): number {
    switch (this.kind as number) {
      case 2:
        if (this.home !== null && this.home !== Building.mainBuilding) {
          if (this.home.workerCount() === 0) {
            return 75;
          }
          return GameData.field_575[this.home.level];
        }
        return 50;
      case 3:
        return 5;
      case 4:
        if (this.home !== null) {
          return GameData.field_576[this.home.level];
        }
        return 0;
      default:
        return 0;
    }
  }
  static saveAll(var0: DataOutputStream): void {
    let var1: number = Townsman.townies.size() - Townsman.unemployed.size();
    var0.writeShort(var1);
    for (let var3: number = 0; var3 < Townsman.townies.size(); var3++) {
      let var2: Townsman = null;
      if ((var2 = Townsman.townies.elementAt(var3) as Townsman).workplace !== null) {
        var0.writeShort(Building.all.indexOf(var2.workplace));
        var0.writeByte(var2.jobSlot);
      }
      Game.addResource(var2.carriedGoods);
    }
    var0.writeShort(Townsman.unemployed.size());
    var0.writeShort(Townsman.propagandists.size());
    var0.writeShort(Townsman.soldiers.size());
  }
  static loadAll(var0: DataInputStream): void {
    let var1: number = var0.readShort();
    for (let var2: number = 0; var2 < var1; var2++) {
      let var3: Townsman = Townsman.create(0);
      let var4: Building = (Building.all.elementAt(var0.readShort()) as Building);
      var3.jobSlot = var0.readByte();
      var3.setTile(var4.tileX, var4.tileY);
      var4.addWorker(var3);
      var3.waitTicks = var2 << 1;
    }
    Townsman.createMany(0, var0.readShort());
    for (let var6: number = 0; var6 < Building.all.size(); var6++) {
      let var7: Building = null;
      if ((var7 = Building.all.elementAt(var6) as Building).owner === 0) {
        if (var7.buildingType === 3 && var7.isComplete()) {
          for (let var8: number = 0; var8 < GameData.houseCapacity[var7.level]; var8++) {
            let var5: Townsman = (Townsman.homeless.firstElement() as Townsman);
            Townsman.homeless.removeElementAt(0);
            var5.setHome(var7);
            if (var5.workplace === null) {
              var5.setTile(var7.tileX, var7.tileY);
            }
          }
        } else {
          var7.updateWorkerJobs();
        }
      }
    }
    Townsman.createMany(3, var0.readShort());
    Townsman.createMany(2, var0.readShort());
    Townsman.assignPropagandistsToCoffeeHouses();
    Townsman.assignSoldiersToCamps();
  }
  static assignPropagandistsToCoffeeHouses(): void {
    for (let var0: number = 0; var0 < Building.all.size() && Townsman.propagandistsWithoutCoffeeHouse.size() > 0; var0++) {
      let var1: Building = null;
      if ((var1 = Building.all.elementAt(var0) as Building).buildingType === 13 && var1.owner === 0 && var1.isComplete() && var1.garrisonCount < GameData.getGarrisonCapacity(var1.buildingType, var1.level)) {
        let var2: Townsman = (Townsman.propagandistsWithoutCoffeeHouse.firstElement() as Townsman);
        Townsman.propagandistsWithoutCoffeeHouse.removeElementAt(0);
        var2.setHome(var1);
        if (Game.level.restoringSave) {
          var2.setTile(var1.tileX, var1.tileY);
        }
      }
    }
  }
  static assignSoldiersToCamps(): void {
    for (let var0: number = 0; var0 < Building.all.size() && Townsman.soldiersWithoutCamp.size() > 0; var0++) {
      let var1: Building = null;
      if ((var1 = Building.all.elementAt(var0) as Building).buildingType === 14 && var1.owner === 0 && var1.isComplete() && var1.garrisonCount < GameData.getGarrisonCapacity(var1.buildingType, var1.level)) {
        let var2: Townsman = (Townsman.soldiersWithoutCamp.firstElement() as Townsman);
        Townsman.soldiersWithoutCamp.removeElementAt(0);
        var2.setHome(var1);
        if (Game.level.restoringSave) {
          var2.setTile(var1.tileX, var1.tileY);
        }
      }
    }
  }
}
