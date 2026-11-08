// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { DataInputStream, DataOutputStream } from "../runtime/io";
import { Vector, arraycopy, idiv, newArray } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { MapEntity } from "./MapEntity";
import { Path } from "./Path";
import { IntList } from "./IntList";
import { Game } from "./Game";
import { Animation } from "./Animation";
import { Townsman } from "./Townsman";
import { Engine } from "./Engine";
import { Ambience } from "./Ambience";
import { MapObject } from "./MapObject";
import { Battle } from "./Battle";
import { GameData } from "./GameData";
import { App } from "./App";
import { GameUi } from "./GameUi";

export class Building implements MapEntity {
  static mainBuilding: Building = null;
  level: number = 0;
  builtLevel: number = 0;
  owner: number = 0;
  buildingType: number = 0;
  private isScenarioBuilding: boolean = false;
  constructionRemaining: number = 0;
  constructionTotal: number = 0;
  pendingMaterials: Int32Array = null;
  garrisonCount: number = 0;
  tileX: number = -2147483648;
  tileY: number = -2147483648;
  tiles: MapObject[] = null;
  private workers: Townsman[] = null;
  nearestStorage: Building = null;
  nearestWell: Building = null;
  battle: Battle = null;
  isVisible: boolean = false;
  isWorking: boolean = false;
  hasWorkAnimation: boolean = false;
  private alwaysAnimated: boolean = false;
  private statusGoods: IntList = new IntList().$init1(5);
  private statusIcons: IntList = new IntList().$init1(5);
  private statusTimes: IntList = new IntList().$init1(5);
  private alertIcon: number = (-1);
  private alertExpiry: number = 0;
  private static nameStringBase: Int32Array = Int32Array.of(28, 32, 35, 20, 38, 10, 1, 17, 14, 39, 25, 23, 31, 7, 4);
  static all: Vector = new Vector(32, 16);
  static storages: Vector = new Vector(8, 4);
  static wells: Vector = new Vector(8, 4);
  private static militaryCamps: Vector = new Vector(8, 4);
  private static coffeeHouses: Vector = new Vector(8, 4);
  static enemyCamps: Vector = new Vector(8, 4);
  private static neutralBuildings: Vector = new Vector(8, 4);
  static needingWorkers: Vector = new Vector(32, 16);
  static countByTypeLevel: Int32Array[] = newArray(15, () => new Int32Array(3));
  static completedByTypeLevel: Int32Array[] = newArray(15, () => new Int32Array(3));
  private static bakeryChimneyX: Int32Array = Int32Array.of(19, 19, 19);
  private static bakeryChimneyY: Int32Array = Int32Array.of(-28, -28, -33);
  private static forgeChimneyX: Int32Array = Int32Array.of(12, 12, 13);
  private static forgeChimneyY: Int32Array = Int32Array.of(-37, -39, -40);
  private static houseChimneyX: Int32Array = Int32Array.of(14, -11, 14);
  private static houseChimneyY: Int32Array = Int32Array.of(-23, -41, -33);
  private static coffeeHouseChimneyX: Int32Array = Int32Array.of(-2, -2, -2);
  private static coffeeHouseChimneyY: Int32Array = Int32Array.of(-35, -40, 5);
  constructor() {
  }
  updateWorkerJobs(): void {
    if (this.workers !== null) {
      if (this.isComplete()) {
        for (let var4: number = 0; var4 < this.workers.length; var4++) {
          if (this.workers[var4] !== null) {
            this.workers[var4].setJobScript(GameData.getWorkerScript(this.buildingType, this.level, this.workers[var4].jobSlot));
          }
        }
        switch (this.buildingType as number) {
          case 5:
            let var5: number = 0;
            do {
              var5 = 0;
              for (let var2: number = 1; var2 < this.tiles.length - 1; var2++) {
                if (this.tiles[var2].type > this.tiles[var2 + 1].type) {
                  let var6: MapObject = this.tiles[var2];
                  this.tiles[var2] = this.tiles[var2 + 1];
                  this.tiles[var2 + 1] = var6;
                  var5 = 1;
                }
              }
            } while (var5 !== 0);
            let var9: number = 1;
            for (let var7: number = 0; var7 < this.workers.length && this.workers[var7] !== null; var7++) {
              if (this.workers[var7].jobSlot === 0) {
                this.workers[var7].targetObject = this.tiles[var9++];
              }
            }
            var5 = this.tiles.length - 1;
            for (let var10: number = this.workers.length - 1; var10 >= 0; var10--) {
              if (this.workers[var10] !== null && this.workers[var10].jobSlot === 1) {
                this.workers[var10].targetObject = this.tiles[var5--];
              }
            }
        }
      } else {
        switch (this.buildingType as number) {
          case 9:
            for (let var3: number = 0; var3 < this.workers.length && this.workers[var3] !== null; var3++) {
              this.workers[var3].jobSlot = 0;
              if (this.level === 0) {
                this.workers[var3].setJobScript(GameData.method_532());
              } else {
                this.workers[var3].setJobScript(GameData.getConstructionScript());
              }
            }
            return;
          default:
            for (let var1: number = 0; var1 < this.workers.length && this.workers[var1] !== null; var1++) {
              this.workers[var1].jobSlot = 0;
              this.workers[var1].setJobScript(GameData.getConstructionScript());
            }
        }
      }
    }
  }
  setJobSplit(var1: number, var2: number): void {
    for (let var3: number = 0; var3 < var1; var3++) {
      if (this.workers[var3] === null) {
        return;
      }
      this.workers[var3].jobSlot = 0;
    }
    for (let var4: number = var1; var4 < var1 + var2; var4++) {
      if (this.workers[var4] === null) {
        return;
      }
      this.workers[var4].jobSlot = 1;
    }
    this.updateWorkerJobs();
  }
  workerCount(): number {
    if (this.workers === null) {
      return 0;
    }
    for (let var1: number = 0; var1 < this.workers.length; var1++) {
      if (this.workers[var1] === null) {
        return var1;
      }
    }
    return this.workers.length;
  }
  workerCapacity(): number {
    return this.workers === null ? 0 : this.workers.length;
  }
  private resizeWorkerSlots(): void {
    let var1: number = GameData.getWorkerSlotCount(this.buildingType, this.level);
    if (this.workers === null) {
      this.workers = new Array<Townsman>(var1).fill(null);
    } else {
      if (this.buildingType === 3) {
        for (let var2: number = 0; var2 < this.workers.length; var2++) {
          if (this.workers[var2] !== null) {
            this.workers[var2].setWorkplace(null);
            if (this.workers[var2].kind === 1) {
              Townsman.townettes.removeElement(this.workers[var2]);
              this.workers[var2].unlinkFromTile();
            }
            this.workers[var2] = null;
          }
        }
      }
      if (var1 > this.workers.length) {
        let var4: Townsman[] = this.workers;
        this.workers = new Array<Townsman>(var1).fill(null);
        arraycopy(var4, 0, this.workers, 0, var4.length);
      } else if (var1 < this.workers.length) {
        let var5: Townsman[] = this.workers;
        this.workers = new Array<Townsman>(var1).fill(null);
        arraycopy(var5, 0, this.workers, 0, this.workers.length);
        for (let var3: number = this.workers.length; var3 < var5.length; var3++) {
          if (var5[var3] !== null) {
            var5[var3].setWorkplace(null);
          }
        }
      }
    }
    if (!Game.level.restoringSave) {
      if (Game.day !== 0 || Game.getStockPacked(589824) <= 0 || this.buildingType !== 14) {
        if (Game.day !== 0 || Game.getStockPacked(720896) <= 0 || this.buildingType !== 13 && this.buildingType !== 12) {
          if (Townsman.unemployed.size() > 0 && this.workers !== null && this.workers.length > 0 && this.workers[0] === null) {
            this.hireUnemployed();
          }
        }
      }
    }
  }
  hireUnemployed(): void {
    if (Townsman.unemployed.size() > 0) {
      let var1: Townsman = (Townsman.unemployed.firstElement() as Townsman);
      let var2: number = this.primaryWorkerCount();
      for (let var3: number = 0; var3 < this.workers.length; var3++) {
        if (this.workers[var3] === null) {
          while (Building.needingWorkers.removeElement(this)) {
          }
          this.workers[var3] = var1;
          this.workers[var3].setWorkplace(this);
          if (var2 < this.primaryJobCapacity()) {
            this.workers[var3].jobSlot = 0;
            return;
          }
          this.workers[var3].jobSlot = 1;
          return;
        }
      }
    }
  }
  addWorker(var1: Townsman): void {
    if (Townsman.unemployed.size() > 0) {
      for (let var2: number = 0; var2 < this.workers.length; var2++) {
        if (this.workers[var2] === null) {
          while (Building.needingWorkers.removeElement(this)) {
          }
          this.workers[var2] = var1;
          this.workers[var2].setWorkplace(this);
          return;
        }
      }
    }
  }
  removeLastWorker(): void {
    for (let var1: number = this.workers.length - 1; var1 >= 0; var1--) {
      if (this.workers[var1] !== null) {
        this.workers[var1].setWorkplace(null);
        this.workers[var1] = null;
        if (var1 === 0 && !Building.needingWorkers.contains(this)) {
          Building.needingWorkers.addElement(this);
        }
        return;
      }
    }
  }
  private removeAllWorkers(): void {
    let var1: number = this.workerCount();
    for (let var2: number = 0; var2 < var1; var2++) {
      this.removeLastWorker();
    }
  }
  primaryJobCapacity(): number {
    if (!this.isComplete()) {
      return this.workers.length;
    }
    switch (this.buildingType as number) {
      case 5:
        let var1: number = 0;
        for (let var2: number = 1; var2 < this.tiles.length; var2++) {
          if (this.tiles[var2].type === 96) {
            var1++;
          }
        }
        return var1;
      default:
        return this.workers.length;
    }
  }
  secondaryJobCapacity(): number {
    if (!this.isComplete()) {
      return 0;
    }
    switch (this.buildingType as number) {
      case 5:
        let var1: number = 0;
        for (let var2: number = 1; var2 < this.tiles.length; var2++) {
          if (this.tiles[var2].type === 112) {
            var1++;
          }
        }
        return var1;
      case 7:
        return this.workers.length;
      case 10:
        if (this.level === 0) {
          return 0;
        }
        return this.workers.length;
      default:
        return 0;
    }
  }
  primaryWorkerCount(): number {
    if (this.workers === null) {
      return 0;
    }
    let var1: number = 0;
    for (let var2: number = 0; var2 < this.workers.length; var2++) {
      if (this.workers[var2] !== null && this.workers[var2].jobSlot === 0) {
        var1++;
      }
    }
    return var1;
  }
  secondaryWorkerCount(): number {
    if (this.workers === null) {
      return 0;
    }
    let var1: number = 0;
    for (let var2: number = 0; var2 < this.workers.length; var2++) {
      if (this.workers[var2] !== null && this.workers[var2].jobSlot === 1) {
        var1++;
      }
    }
    return var1;
  }
  primaryJobGoods(): number {
    let var1: Int32Array = null;
    return (var1 = GameData.getWorkerScript(this.buildingType, this.level, 0)) === null ? (-1) : var1[0];
  }
  secondaryJobGoods(): number {
    let var1: Int32Array = null;
    return (var1 = GameData.getWorkerScript(this.buildingType, this.level, 1)) === null ? (-1) : var1[0];
  }
  returnMaterial(var1: number): void {
    for (let var2: number = 0; var2 < this.pendingMaterials.length; var2++) {
      if (this.pendingMaterials[var2] > 0 && Game.packedResource(this.pendingMaterials[var2]) === Game.packedResource(var1)) {
        this.pendingMaterials[var2] = this.pendingMaterials[var2] + Game.packedAmount(var1);
        return;
      }
    }
    for (let var3: number = 0; var3 < this.pendingMaterials.length; var3++) {
      if (this.pendingMaterials[var3] === (-1)) {
        this.pendingMaterials[var3] = var1;
        return;
      }
    }
  }
  takeMaterialLoad(): number {
    let var1: number = 0;
    let var2: number = var1 = Engine.randomInt(this.pendingMaterials.length);
    do {
      var1 = (var1 + 1) % this.pendingMaterials.length;
      if (Game.packedAmount(this.pendingMaterials[var1]) === 0) {
        this.pendingMaterials[var1] = -1;
      }
    } while (this.pendingMaterials[var1] === (-1) && var1 !== var2);
    if (this.pendingMaterials[var1] === (-1)) {
      return 0;
    }
    let var3: number = 0;
    if (Game.packedResource(var2 = this.pendingMaterials[var1]) !== 1114112) {
      let var4: number = Math.min(Game.packedAmount(var2), 2);
      if ((var3 = Game.withdrawRange(var2, var4)) < var4) {
        this.addStatusIcon(Game.field_285[var2 >> 16], 16485);
      }
    } else {
      let var7: number = Game.packedAmount(var2);
      if ((var3 = Game.withdrawRange(var2, var7)) < var7) {
        this.addStatusIcon(Game.field_285[var2 >> 16], 16485);
      }
    }
    if (var3 === 0) {
      this.addStatusIcon(Game.field_285[var2 >> 16], 16486);
      if (this.nearestStorage !== null) {
        this.nearestStorage.addStatusIcon(Game.field_285[var2 >> 16], 16486);
      }
    }
    if (var3 !== 0) {
      if (Game.packedAmount(var2 = var2 - var3) === 0) {
        this.pendingMaterials[var1] = -1;
      } else {
        this.pendingMaterials[var1] = var2;
      }
      return Game.packedResource(var2) | var3;
    } else {
      return 0;
    }
  }
  garrisonGoods(): number {
    switch (this.buildingType as number) {
      case 13:
        return this.garrisonCount | 786432;
      case 14:
        return this.garrisonCount | 851968;
      default:
        return (-1);
    }
  }
  findNearestStorage(): void {
    this.nearestStorage = Path.findNearestStorage(this);
  }
  findNearestWell(): void {
    this.nearestWell = Path.findNearestWell(this);
  }
  isComplete(): boolean {
    return this.constructionRemaining === 0;
  }
  addConstructionProgress(var1: number): void {
    this.constructionRemaining = Math.max(this.constructionRemaining - var1, 0);
    if (this.constructionRemaining === 0) {
      Building.countByTypeLevel[this.buildingType][this.level]--;
      this.register();
      Ambience.queueSound(App.tickTime, 32);
      if (GameUi.isPanelOpenFor(this)) {
        GameUi.showBuildingPanel(this);
      }
    }
  }
  unregister(): void {
    this.isWorking = false;
    this.garrisonCount = 0;
    if (GameUi.selectedBuilding === this) {
      GameUi.setState(0);
    }
    if (this.owner === 1) {
      if (this.buildingType === 14) {
        Building.enemyCamps.removeElement(this);
      }
    } else if (this.owner === 2) {
      Building.neutralBuildings.removeElement(this);
    } else {
      Building.countByTypeLevel[this.buildingType][this.level]--;
      if (this.isComplete()) {
        Building.completedByTypeLevel[this.buildingType][this.level]--;
      }
      this.removeAllWorkers();
      while (Building.needingWorkers.removeElement(this)) {
      }
      switch (this.buildingType as number) {
        case 1:
          if (this.isComplete()) {
            Building.storages.removeElement(this);
            Building.invalidateStorageLinks();
            Game.storageCapacity = Game.storageCapacity - GameData.storageCapacity[this.level];
            Game.clampStocks();
            return;
          }
          break;
        case 2:
          Building.wells.removeElement(this);
          Building.invalidateWellLinks();
          return;
        case 3:
          for (let var4: number = 0; var4 < Townsman.townies.size(); var4++) {
            let var6: Townsman = null;
            if ((var6 = Townsman.townies.elementAt(var4) as Townsman).home === this) {
              var6.setHome(null);
            }
          }
          return;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 12:
        default:
          break;
        case 11:
          return;
        case 13:
          for (let var3: number = 0; var3 < Townsman.propagandists.size(); var3++) {
            let var5: Townsman = null;
            if ((var5 = Townsman.propagandists.elementAt(var3) as Townsman).home === this) {
              var5.setHome(null);
            }
          }
          this.garrisonCount = 0;
          Townsman.assignPropagandistsToCoffeeHouses();
          break;
        case 14:
          for (let var1: number = 0; var1 < Townsman.soldiers.size(); var1++) {
            let var2: Townsman = null;
            if ((var2 = Townsman.soldiers.elementAt(var1) as Townsman).home === this) {
              var2.setHome(null);
            }
          }
          this.garrisonCount = 0;
          Townsman.assignSoldiersToCamps();
          return;
      }
    }
  }
  private register(): void {
    this.updateTileSprites();
    if (this.owner === 2) {
      Building.neutralBuildings.addElement(this);
    } else if (this.owner === 1) {
      if (this.buildingType === 14) {
        Building.enemyCamps.addElement(this);
      }
    } else {
      this.resizeWorkerSlots();
      if (this.isComplete()) {
        Building.countByTypeLevel[this.buildingType][this.level]++;
        Building.completedByTypeLevel[this.buildingType][this.level]++;
        label145: switch (this.buildingType as number) {
          case 0:
            if (this.level === 1) {
              GameData.showTipOnce(3);
            }
            this.removeAllWorkers();
            this.workers = new Array<Townsman>(0).fill(null);
            while (true) {
              if (Building.needingWorkers.removeElement(this)) {
                continue;
              }
              break label145;
            }
          case 1:
            this.removeAllWorkers();
            this.workers = new Array<Townsman>(0).fill(null);
            while (Building.needingWorkers.removeElement(this)) {
            }
            Building.storages.addElement(this);
            Building.invalidateStorageLinks();
            Game.storageCapacity = Game.storageCapacity + GameData.storageCapacity[this.level];
            break;
          case 2:
            this.removeAllWorkers();
            this.workers = new Array<Townsman>(0).fill(null);
            while (Building.needingWorkers.removeElement(this)) {
            }
            Building.invalidateWellLinks();
            Building.wells.addElement(this);
            break;
          case 3:
            this.removeAllWorkers();
            while (Building.needingWorkers.removeElement(this)) {
            }
            let var7: number = 0;
            for (let var10: number = 0; var10 < Townsman.townettes.size() && var7 < this.workers.length; var10++) {
              let var14: Townsman = null;
              if ((var14 = Townsman.townettes.elementAt(var10) as Townsman).workplace === this) {
                this.workers[var7] = var14;
                var7++;
              }
            }
            for (let var11: number = 0; var11 < this.workers.length; var11++) {
              this.workers[var11] = Townsman.create(1);
              this.workers[var11].setHome(this);
              this.workers[var11].setWorkplace(this);
              this.workers[var11].setTile(this.tileX, this.tileY);
              this.workers[var11].setJobScript(GameData.getWorkerScript(this.buildingType, this.level, 0));
              this.workers[var11].waitTicks = Engine.randomRange(2, 15) + Math.imul(var11, 50);
            }
            if (!Game.level.restoringSave) {
              let var12: number = GameData.houseCapacity[this.level];
              for (let var15: number = 0; var15 < var12; var15++) {
                let var8: Townsman = null;
                if (!Townsman.homeless.isEmpty()) {
                  var8 = Townsman.homeless.firstElement() as Townsman;
                } else {
                  var8 = Townsman.create(0);
                }
                var8.setHome(this);
              }
            }
          case 4:
          case 6:
          case 7:
          case 9:
          case 10:
          case 12:
          default:
            break;
          case 5:
            this.setJobSplit(this.primaryJobCapacity(), this.secondaryJobCapacity());
            break;
          case 8:
            Path.pickFishingSpot(this);
            break;
          case 11:
            this.removeAllWorkers();
            this.workers = new Array<Townsman>(0).fill(null);
            while (true) {
              if (Building.needingWorkers.removeElement(this)) {
                continue;
              }
              break label145;
            }
          case 13:
            let var5: boolean = this.workerCount() > 0;
            this.removeAllWorkers();
            this.workers = new Array<Townsman>(1).fill(null);
            if (var5) {
              this.hireUnemployed();
            }
            let var9: number = GameData.getGarrisonCapacity(this.buildingType, this.level);
            for (let var13: number = 0; var13 < var9; var13++) {
              if (!Townsman.propagandistsWithoutCoffeeHouse.isEmpty()) {
                let var6: Townsman = null;
                (var6 = Townsman.propagandistsWithoutCoffeeHouse.firstElement() as Townsman).setHome(this);
                var6.waitTicks = Engine.randomRange(2, 15) + Math.imul(var13, 50);
              }
            }
            Building.coffeeHouses.addElement(this);
            break;
          case 14:
            let var1: boolean = this.workerCount() > 0;
            this.removeAllWorkers();
            this.workers = new Array<Townsman>(1).fill(null);
            if (var1) {
              this.hireUnemployed();
            }
            let var2: number = GameData.getGarrisonCapacity(this.buildingType, this.level);
            for (let var3: number = 0; var3 < var2; var3++) {
              if (!Townsman.soldiersWithoutCamp.isEmpty()) {
                let var4: Townsman = null;
                (var4 = Townsman.soldiersWithoutCamp.firstElement() as Townsman).setHome(this);
                var4.waitTicks = Engine.randomRange(2, 15) + Math.imul(var3, 50);
              }
            }
            Building.militaryCamps.addElement(this);
        }
      }
      this.updateWorkerJobs();
    }
  }
  startUpgrade(): boolean {
    this.unregister();
    this.level++;
    this.constructionRemaining = -2;
    switch (this.buildingType as number) {
      case 5:
        let var1: MapObject[] = this.tiles;
        this.tiles = new Array<MapObject>(GameData.getWorkerSlotCount(this.buildingType, this.level) + 1).fill(null);
        arraycopy(var1, 0, this.tiles, 0, var1.length);
      default:
        this.updateTileSprites();
        return this.addToMap();
    }
  }
  static create(var0: number, var1: number, var2: number): Building {
    let var3: Building = null;
    (var3 = new Building()).owner = var2;
    var3.level = var1;
    var3.builtLevel = var1;
    var3.buildingType = var0;
    switch (var0) {
      case 0:
        var3.tiles = [MapObject.createBuildingTile(var3), MapObject.createBuildingTile(var3)];
        var3.tiles[0].flags |= 8;
        break;
      case 1:
        var3.tiles = [MapObject.createBuildingTile(var3), MapObject.createBuildingTile(var3)];
        var3.tiles[0].flags |= 16;
        break;
      case 2:
        var3.tiles = [MapObject.createBuildingTile(var3)];
        var3.hasWorkAnimation = true;
        var3.alwaysAnimated = true;
        var3.isWorking = true;
        var3.tiles[0].animation = new Animation().$init1();
        var3.tiles[0].animation.play(Animation.wellCampFrames);
        break;
      case 3:
        var3.tiles = [MapObject.createBuildingTile(var3)];
        var3.hasWorkAnimation = true;
        var3.tiles[0].animation = new Animation().$init2(Animation.smokeFrames);
        break;
      case 4:
        var3.tiles = [MapObject.createBuildingTile(var3)];
        var3.tiles[0].animation = new Animation().$init2(Animation.windmillFrames);
        var3.tiles[0].animation.freeze();
        break;
      case 5:
        var3.tiles = new Array<MapObject>(GameData.getWorkerSlotCount(var0, var1) + 1).fill(null);
        var3.tiles[0] = MapObject.createFarmHouseTile(var3);
        if (var2 !== 0) {
          for (let var4: number = 1; var4 < var3.tiles.length; var4++) {
            var3.tiles[var4] = var4 % 2 === 0 ? MapObject.createGrainField(var3) : MapObject.createPigsty(var3);
          }
        }
        break;
      case 6:
        var3.tiles = [MapObject.createBuildingTile(var3)];
        var3.hasWorkAnimation = true;
        var3.tiles[0].animation = new Animation().$init2(Animation.smokeFrames);
        break;
      case 7:
        var3.tiles = [MapObject.createBuildingTile(var3)];
        var3.hasWorkAnimation = true;
        var3.tiles[0].animation = new Animation().$init2(Animation.smokeFrames);
        break;
      case 8:
        var3.tiles = [MapObject.createFishingHutTile(var3)];
        break;
      case 9:
        var3.tiles = [MapObject.createBuildingTile(var3)];
        break;
      case 10:
        var3.tiles = [MapObject.createMineTile(var3)];
        break;
      case 11:
        var3.tiles = [MapObject.createMarketTile(var3), MapObject.createMarketTile(var3), MapObject.createMarketTile(var3), MapObject.createMarketTile(var3)];
        break;
      case 12:
        var3.tiles = [MapObject.createBuildingTile(var3)];
        var3.hasWorkAnimation = true;
        var3.tiles[0].animation = new Animation().$init1();
        var3.tiles[0].animation.play(Animation.universityFrames);
        break;
      case 13:
        var3.tiles = [MapObject.createBuildingTile(var3)];
        var3.hasWorkAnimation = true;
        var3.tiles[0].animation = new Animation().$init2(Animation.smokeFrames);
        break;
      case 14:
        var3.tiles = [MapObject.createBuildingTile(var3)];
        var3.hasWorkAnimation = true;
        var3.alwaysAnimated = true;
        var3.isWorking = true;
        var3.tiles[0].animation = new Animation().$init1();
        var3.tiles[0].animation.play(Animation.wellCampFrames);
    }
    var3.updateTileSprites();
    return var3;
  }
  static createConstructionSite(var0: number, var1: number, var2: number, var3: boolean): Building {
    let var4: Building = Building.create(var0, var1, var2);
    if (var0 !== 0 && var3) {
      var4.constructionRemaining = -1;
      var4.updateTileSprites();
    }
    return var4;
  }
  static createScenarioBuilding(var0: number): Building {
    let var1: Building = null;
    (var1 = Building.create(var0, 1, 2)).isScenarioBuilding = true;
    return var1;
  }
  demolish(): void {
    if (this.owner === 0) {
      Game.addResources(GameData.getTotalBuildCost(this.buildingType, this.level));
      if (!this.isComplete() && this.pendingMaterials !== null) {
        Game.removeResources(this.pendingMaterials);
      }
      Game.clampStocks();
    }
    this.unregister();
    switch (this.buildingType as number) {
      case 10:
        this.tiles[0].removeFromMap();
        let var5: MapObject = null;
        (var5 = MapObject.createRocks()).setTileAndCheckPlacement(this.tileX, this.tileY);
        var5.addToMap();
        Building.all.removeElement(this);
        return;
      case 14:
        for (let var1: number = 0; var1 < Townsman.enemies.size(); var1++) {
          let var2: Townsman = null;
          if ((var2 = Townsman.enemies.elementAt(var1) as Townsman).home === this) {
            Engine.assignAiHome(var2);
          }
        }
      default:
        for (let var4: number = 0; var4 < this.tiles.length; var4++) {
          if (this.tiles[var4] !== null) {
            let var6: number = this.tiles[var4].tileX;
            let var3: number = this.tiles[var4].tileY;
            this.tiles[var4].removeFromMap();
            this.tiles[var4] = MapObject.createRubble(false);
            this.tiles[var4].setTileAndCheckPlacement(var6, var3);
            this.tiles[var4].addToMap();
          }
        }
        Building.all.removeElement(this);
    }
  }
  static clearVisibleFlags(): void {
    for (let var0: number = 0; var0 < Building.all.size(); var0++) {
      (Building.all.elementAt(var0) as Building).isVisible = false;
    }
  }
  static resetAll(): void {
    Building.mainBuilding = null;
    Building.wells.removeAllElements();
    Building.storages.removeAllElements();
    Building.all.removeAllElements();
    Building.militaryCamps.removeAllElements();
    Building.coffeeHouses.removeAllElements();
    Building.enemyCamps.removeAllElements();
    Building.neutralBuildings.removeAllElements();
    Building.needingWorkers.removeAllElements();
    for (let var0: number = 0; var0 < Building.countByTypeLevel.length; var0++) {
      Building.countByTypeLevel[var0][0] = 0;
      Building.countByTypeLevel[var0][1] = 0;
      Building.countByTypeLevel[var0][2] = 0;
    }
    for (let var1: number = 0; var1 < Building.completedByTypeLevel.length; var1++) {
      Building.completedByTypeLevel[var1][0] = 0;
      Building.completedByTypeLevel[var1][1] = 0;
      Building.completedByTypeLevel[var1][2] = 0;
    }
  }
  private static invalidateStorageLinks(): void {
    for (let var0: number = 0; var0 < Building.all.size(); var0++) {
      (Building.all.elementAt(var0) as Building).nearestStorage = null;
    }
  }
  private static invalidateWellLinks(): void {
    for (let var0: number = 0; var0 < Building.all.size(); var0++) {
      (Building.all.elementAt(var0) as Building).nearestWell = null;
    }
  }
  createFarmPlot(var1: number): MapEntity {
    switch (var1) {
      case 96:
        return MapObject.createPigsty(this);
      case 112:
        return MapObject.createGrainField(this);
      default:
        return null;
    }
  }
  farmPlotTypes(): Int32Array {
    return this.buildingType === 5 ? Int32Array.of(96, 112) : null;
  }
  cancelConstruction(): void {
    if (this.level === this.builtLevel) {
      Building.completedByTypeLevel[this.buildingType][this.level]++;
      this.demolish();
    } else {
      let var1: number = this.workerCount();
      this.unregister();
      if (this.pendingMaterials !== null) {
        Game.addResources(GameData.getBuildCost(this.buildingType, this.level));
        if (!this.isComplete()) {
          Game.removeResources(this.pendingMaterials);
        }
        Game.clampStocks();
      }
      this.level--;
      this.constructionRemaining = 0;
      this.pendingMaterials = null;
      switch (this.buildingType as number) {
        case 5:
          let var2: MapObject[] = this.tiles;
          this.tiles = new Array<MapObject>(GameData.getWorkerSlotCount(this.buildingType, this.level) + 1).fill(null);
          arraycopy(var2, 0, this.tiles, 0, this.tiles.length);
          for (let var3: number = this.tiles.length; var3 < var2.length; var3++) {
            if (var2[var3] !== null) {
              var2[var3].removeFromMap();
            }
          }
          this.updateTileSprites();
          break;
        case 8:
          this.updateTileSprites();
          Path.pickFishingSpot(this);
          break;
        default:
          this.updateTileSprites();
      }
      this.register();
      for (let var4: number = 0; var4 < var1 && var4 < GameData.getWorkerSlotCount(this.buildingType, this.level); var4++) {
        this.hireUnemployed();
      }
    }
  }
  addFarmPlot(var1: MapObject): boolean {
    for (let var2: number = 1; var2 < this.tiles.length; var2++) {
      if (this.tiles[var2] === null) {
        this.tiles[var2] = var1;
        if (var2 < this.tiles.length - 1) {
          return true;
        }
        return false;
      }
    }
    return false;
  }
  private updateTileSprites(): void {
    switch (this.buildingType as number) {
      case 0:
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16399;
        this.tiles[1].auxA = 27;
        this.tiles[1].auxB = 16399;
        if (this.level !== 2) {
          this.tiles[0].setSprite(45, 16443 + this.level);
          this.tiles[1].setSprite(45, 16445 + this.level);
        } else {
          this.tiles[0].setSprite(46, 16447);
          this.tiles[1].setSprite(46, 16448);
        }
        break;
      case 1:
        this.tiles[0].setSprite(47, 16449 + this.level);
        this.tiles[1].setSprite(47, 16452 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16399;
        this.tiles[1].auxA = 27;
        this.tiles[1].auxB = this.level === 0 ? 16398 : 16399;
        break;
      case 2:
        this.tiles[0].setSprite(48, 16455 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16398;
        break;
      case 3:
        this.tiles[0].setSprite(40, 16430 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = this.level === 0 ? 16398 : 16399;
        break;
      case 4:
        this.tiles[0].setSprite(30, 0);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16399;
        break;
      case 5:
        this.tiles[0].setSprite(31, 16406 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16399;
        break;
      case 6:
        this.tiles[0].setSprite(35, 16415 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = this.level === 0 ? 16398 : 16399;
        break;
      case 7:
        this.tiles[0].setSprite(42, 16436 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16399;
        break;
      case 8:
        this.tiles[0].setSprite(36, 16418 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = this.level === 0 ? 16398 : 16399;
        break;
      case 9:
        this.tiles[0].setSprite(37, 16421 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16398;
        break;
      case 10:
        this.tiles[0].setSprite(41, 16433 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = this.level === 0 ? 16398 : 16399;
        break;
      case 11:
        this.tiles[0].setSprite(44, 16439);
        this.tiles[1].setSprite(44, 16441);
        this.tiles[2].setSprite(44, 16442);
        this.tiles[3].setSprite(44, 16440);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16398;
        this.tiles[1].auxA = 27;
        this.tiles[1].auxB = 16398;
        this.tiles[2].auxA = 27;
        this.tiles[2].auxB = 16398;
        this.tiles[3].auxA = 27;
        this.tiles[3].auxB = 16398;
        break;
      case 12:
        this.tiles[0].setSprite(49, 16458 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16399;
        break;
      case 13:
        this.tiles[0].setSprite(38, 16424 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = 16399;
        break;
      case 14:
        this.tiles[0].setSprite(39, 16427 + this.level);
        this.tiles[0].auxA = 27;
        this.tiles[0].auxB = this.level === 0 ? 16398 : 16399;
    }
    if (this.isComplete()) {
      this.tiles[0].auxA = 0;
      this.tiles[0].auxB = 0;
    }
  }
  setOwner(var1: number): void {
    if (this.owner !== var1) {
      this.garrisonCount = 0;
    }
    this.owner = var1;
    this.register();
  }
  addToMap(): boolean {
    switch (this.buildingType as number) {
      case 0:
        for (let var9: number = 0; var9 < this.tiles.length; var9++) {
          this.tiles[var9].addToMap();
        }
        if (this.owner === 0 && Building.mainBuilding !== this) {
          Building.mainBuilding = this;
          if (!Game.level.restoringSave) {
            GameData.onMainBuildingCompleted();
          }
          while (Building.neutralBuildings.size() > 0) {
            let var10: Building = null;
            (var10 = Building.neutralBuildings.firstElement() as Building).unregister();
            var10.setOwner(0);
          }
        }
        break;
      case 1:
        Path.clearCache();
        for (let var8: number = 0; var8 < this.tiles.length; var8++) {
          this.tiles[var8].addToMap();
        }
        break;
      case 2:
        for (let var7: number = 0; var7 < this.tiles.length; var7++) {
          this.tiles[var7].addToMap();
        }
        break;
      case 3:
      case 4:
      default:
        for (let var6: number = 0; var6 < this.tiles.length; var6++) {
          this.tiles[var6].addToMap();
        }
        break;
      case 5:
        this.tiles[0].addToMap();
        if (this.owner !== 0) {
          for (let var1: number = 1; var1 < this.tiles.length; var1++) {
            Game.level.placeRandomlyNear(this.tiles[var1], 128, this);
          }
          for (let var3: number = 0; var3 < this.tiles.length; var3++) {
            if (!this.tiles[var3].isOnMap()) {
              for (let var4: number = 0; var4 < this.tiles.length; var4++) {
                this.tiles[var4].removeFromMap();
              }
              return false;
            }
          }
        } else {
          for (let var5: number = 0; var5 < this.tiles.length; var5++) {
            if (this.tiles[var5] === null) {
              return true;
            }
          }
        }
    }
    if (this.isComplete()) {
      this.register();
    } else if (!Game.level.restoringSave) {
      let var11: Building = this;
      if (this.constructionRemaining === (-1)) {
        var11.pendingMaterials = GameData.getTotalBuildCost(var11.buildingType, var11.level);
        var11.constructionRemaining = 0;
        for (let var13: number = 0; var13 < var11.pendingMaterials.length; var13++) {
          var11.constructionRemaining = var11.constructionRemaining + Game.packedAmount(var11.pendingMaterials[var13]);
        }
        var11.constructionTotal = var11.constructionRemaining;
      } else {
        var11.pendingMaterials = GameData.getBuildCost(var11.buildingType, var11.level);
        var11.constructionRemaining = 0;
        for (let var2: number = 0; var2 < var11.pendingMaterials.length; var2++) {
          var11.constructionRemaining = var11.constructionRemaining + Game.packedAmount(var11.pendingMaterials[var2]);
        }
        var11.constructionTotal = var11.constructionRemaining;
      }
      if (!Building.needingWorkers.contains(var11)) {
        Building.needingWorkers.addElement(var11);
      }
      var11.resizeWorkerSlots();
      var11.updateWorkerJobs();
      Building.countByTypeLevel[var11.buildingType][var11.level]++;
      GameUi.selectedBuilding = var11;
      GameUi.openBuildingPanel();
    } else {
      let var12: Building = this;
      if (!Building.needingWorkers.contains(var12)) {
        Building.needingWorkers.addElement(var12);
      }
      var12.resizeWorkerSlots();
      var12.updateWorkerJobs();
      Building.countByTypeLevel[var12.buildingType][var12.level]++;
    }
    if (!Building.all.contains(this)) {
      Building.all.addElement(this);
    }
    return false;
  }
  setTileAndCheckPlacement(var1: number, var2: number): boolean {
    this.tileX = var1;
    this.tileY = var2;
    if (this.owner !== 1 || var1 >= 1 && var1 < Game.level.width - 1 && var2 >= 1 && var2 < Game.level.height - 1) {
      let var3: boolean = false;
      switch (this.buildingType as number) {
        case 0:
          var3 = this.tiles[0].setTileAndCheckPlacement(var1, var2);
          if (this.tiles[1].setTileAndCheckPlacement(var1, var2 + 1) && var3) {
            return true;
          }
          return false;
        case 1:
          var3 = this.tiles[0].setTileAndCheckPlacement(var1, var2);
          if (this.tiles[1].setTileAndCheckPlacement(var1 - 1, var2) && var3) {
            return true;
          }
          return false;
        case 11:
          var3 = this.tiles[0].setTileAndCheckPlacement(var1, var2);
          var3 = this.tiles[1].setTileAndCheckPlacement(var1, var2 + 1) && var3;
          var3 = this.tiles[2].setTileAndCheckPlacement(var1 - 1, var2 + 1) && var3;
          if (this.tiles[3].setTileAndCheckPlacement(var1 - 1, var2) && var3) {
            return true;
          }
          return false;
        default:
          return this.tiles[0].setTileAndCheckPlacement(var1, var2);
      }
    } else {
      return false;
    }
  }
  drawWorkAnimation(var1: Graphics, var2: number, var3: number): void {
    if (this.isWorking || this.alwaysAnimated) {
      switch (this.buildingType as number) {
        case 2:
          if (this.level === 1) {
            Engine.drawSprite(var1, var2, var3 + (-18), 54, this.tiles[0].animation.frame);
            return;
          }
          break;
        case 3:
          Engine.drawSprite(var1, var2 + Building.houseChimneyX[this.level], var3 + Building.houseChimneyY[this.level], 52, this.tiles[0].animation.frame);
          return;
        case 4:
        case 5:
        case 8:
        case 9:
        case 10:
        case 11:
        default:
          break;
        case 6:
          Engine.drawSprite(var1, var2 + Building.bakeryChimneyX[this.level], var3 + Building.bakeryChimneyY[this.level], 52, this.tiles[0].animation.frame);
          return;
        case 7:
          Engine.drawSprite(var1, var2 + Building.forgeChimneyX[this.level], var3 + Building.forgeChimneyY[this.level], 52, this.tiles[0].animation.frame);
          return;
        case 12:
          Engine.drawSprite(var1, var2, var3, 55, this.tiles[0].animation.frame);
          break;
        case 13:
          Engine.drawSprite(var1, var2 + Building.coffeeHouseChimneyX[this.level], var3 + Building.coffeeHouseChimneyY[this.level], 52, this.tiles[0].animation.frame);
          return;
        case 14:
          if (this.level === 0 && this.garrisonCount > 0) {
            Engine.drawSprite(var1, var2, var3 + (-15), 53, this.tiles[0].animation.frame);
            return;
          }
      }
    }
  }
  static drawAllStatusIcons(var0: Graphics): void {
    for (let var1: number = 0; var1 < Building.all.size(); var1++) {
      let var2: Building = null;
      if ((var2 = Building.all.elementAt(var1) as Building).isVisible) {
        let var3: Building = var2;
        if (var2.statusIcons.size > 0) {
          for (let var4: number = 0; var4 < var3.statusTimes.size; var4++) {
            if (Game.gameTime - var3.statusTimes.get(var4) > 5000) {
              var3.statusGoods.removeAt(var4);
              var3.statusIcons.removeAt(var4);
              var3.statusTimes.removeAt(var4);
              var4--;
            }
          }
        }
        let var16: number = (var2.tileX << 5) + (var2.tileY << 5) - GameUi.cameraX;
        let var18: number = (var2.tileY << 4) - (var2.tileX << 4) - GameUi.cameraY;
        let var5: number = var18;
        let var14: number = var16;
        let var19: Graphics = var0;
        var3 = var2;
        switch (var2.buildingType as number) {
          case 0:
            var14 += 26;
            var5 -= 26;
            break;
          case 1:
            var5 -= 26;
          case 11:
            break;
          default:
            var5 -= 30;
        }
        if (var3.alertIcon !== (-1)) {
          let var6: number = idiv(Math.imul(18, Engine.sin(idiv(App.tickTime, 2) + idiv(Math.imul(var3.tileX, 205887), 5) + idiv(Math.imul(var3.tileY, 205887), 3)) - 65536), 65536);
          Engine.drawSpriteAnchored(var19, var14, var5 + var6, 169, var3.alertIcon, 33);
          if (var3.alertExpiry < Game.gameTime) {
            var3.alertIcon = -1;
          }
        }
        if (var3.battle !== null) {
          var3.battle.drawIcon(var19, var14, var5);
        } else if (var3.owner === 1) {
          let var24: number = idiv(Math.imul(3, Engine.sin(idiv(App.tickTime, 4)) - 65536), 65536);
          Engine.drawSpriteAnchored(var19, var14 + var24, var5, 153, 0, 33);
        } else {
          let var22: number = Engine.sin(App.tickTime + idiv(Math.imul(var3.tileX, 205887), 5) + idiv(Math.imul(var3.tileY, 205887), 3));
          let var7: number = Engine.cos(App.tickTime + idiv(Math.imul(var3.tileX, 205887), 5) + idiv(Math.imul(var3.tileY, 205887), 3));
          let var15: number = var14 + idiv(var7 << 1, 65536);
          var5 += idiv(Math.imul(var22, 3), 65536);
          if (var3.workerCapacity() !== 0 && var3.workerCount() === 0) {
            var3.isWorking = false;
            Engine.drawSprite(var19, var15, var5, 111, 16);
          } else {
            var22 = idiv(var3.statusIcons.size, 3) + (var3.statusIcons.size % 3 !== 0 ? 1 : 0);
            var7 = 0;
            var5 = var5 - Math.imul(var22, Engine.getCellHeight(111)) - (var22 << 1);
            for (let var8: number = 0; var8 < var22; var8++) {
              let var9: number = Math.min(3, var3.statusIcons.size - var7);
              let var10: number = var15 - idiv(Math.imul(var9, Engine.getCellWidth(111) + 2), 2);
              for (let var11: number = var7; var7 < var11 + var9; var7++) {
                let var12: number = var3.statusGoods.get(var7);
                let var13: number = var3.statusIcons.get(var7);
                if (var12 !== (-1)) {
                  Engine.drawSprite(var19, var10, var5, 110, var12);
                }
                Engine.drawSprite(var19, var10, var5, 111, var13);
                var10 += Engine.getCellWidth(111) + 2;
              }
              var5 += Engine.getCellHeight(111) + 2;
            }
          }
        }
      }
    }
  }
  drawPlacementMarker(var1: Graphics): void {
    for (let var2: number = 0; var2 < this.tiles.length; var2++) {
      if (this.tiles[var2] !== null) {
        this.tiles[var2].drawPlacementMarker(var1);
      }
    }
  }
  showAlertIcon(var1: number): void {
    this.alertExpiry = Game.gameTime + 4000;
    this.alertIcon = var1;
  }
  addStatusIcon(var1: number, var2: number): void {
    let var4: number = var1;
    let var3: number = var4;
    let var8: IntList = this.statusGoods;
    let var5: number = 0;
    let var10000: number = 0;
    while (true) {
      if (var5 >= var8.size) {
        var10000 = -1;
        break;
      }
      if (var3 === var8.data[var5]) {
        var10000 = var5;
        break;
      }
      var5++;
    }
    var3 = var10000;
    if (var10000 !== (-1)) {
      this.statusIcons.set(var2, var3);
      this.statusTimes.set(Game.gameTime, var3);
    } else {
      this.statusGoods.add(var1);
      this.statusIcons.add(var2);
      this.statusTimes.add(Game.gameTime);
    }
  }
  getTileX(): number {
    return this.tileX;
  }
  getTileY(): number {
    return this.tileY;
  }
  isFullyOnMap(): boolean {
    for (let var1: number = 0; var1 < this.tiles.length; var1++) {
      if (this.tiles[var1] === null || !this.tiles[var1].isOnMap()) {
        return false;
      }
    }
    return true;
  }
  canDemolish(): boolean {
    return !this.isScenarioBuilding && Game.buildMenuEnabled && GameData.buildingAllowed[this.buildingType];
  }
  static displayName(var0: number, var1: number): string {
    switch (var0) {
      case 16:
        return Engine.getText(74);
      case 32:
        return Engine.getText(88);
      case 96:
        return Engine.getText(24);
      case 112:
        return Engine.getText(13);
      default:
        return var0 < 15 ? Engine.getText(Building.nameStringBase[var0] + var1) : null;
    }
  }
  static ambientSoundFor(var0: number): number {
    switch (var0) {
      case 5:
        switch (Engine.randomInt(3)) {
          case 0:
            return 14;
          case 1:
            return 15;
          case 2:
            return 20;
        }
      case 14:
        return 38;
      default:
        return (-1);
    }
  }
  static saveAll(var0: DataOutputStream): void {
    var0.writeInt(Building.all.size());
    for (let var1: number = 0; var1 < Building.all.size(); var1++) {
      let var10000: Building = (Building.all.elementAt(var1) as Building);
      let var3: DataOutputStream = var0;
      let var2: Building = var10000;
      var3.writeByte(var2.buildingType);
      var3.writeByte(var2.level);
      var3.writeByte(var2.builtLevel);
      var3.writeByte(var2.owner);
      var3.writeByte(var2.tileX);
      var3.writeByte(var2.tileY);
      switch (var2.buildingType as number) {
        case 5:
          for (let var4: number = 1; var4 < var2.tiles.length; var4++) {
            var3.writeShort(var2.tiles[var4].type);
            var3.writeByte(var2.tiles[var4].tileX);
            var3.writeByte(var2.tiles[var4].tileY);
            var3.writeInt(var2.tiles[var4].auxA);
            var3.writeInt(var2.tiles[var4].auxB);
          }
      }
      var3.writeByte(var2.constructionRemaining);
      var3.writeByte(var2.constructionTotal);
      if (!var2.isComplete()) {
        if (var2.buildingType !== 9 || var2.level !== 0) {
          for (let var5: number = 0; var5 < var2.workers.length; var5++) {
            if (var2.workers[var5] !== null) {
              var2.returnMaterial(var2.workers[var5].carriedGoods);
            }
          }
        }
        Engine.writeIntArray(var3, var2.pendingMaterials);
      }
    }
  }
  static loadAll(var0: DataInputStream): void {
    let var1: number = var0.readInt();
    for (let var2: number = 0; var2 < var1; var2++) {
      let var3: DataInputStream = var0;
      let var4: number = var0.readByte();
      let var5: number = var3.readByte();
      let var6: number = var3.readByte();
      let var7: number = var3.readByte();
      let var8: Building = null;
      (var8 = Building.create(var4, var5, var7)).builtLevel = var6;
      var8.setTileAndCheckPlacement(var3.readByte(), var3.readByte());
      switch (var8.buildingType as number) {
        case 5:
          for (let var9: number = 1; var9 < var8.tiles.length; var9++) {
            var8.tiles[var9] = var3.readShort() === 112 ? MapObject.createGrainField(var8) : MapObject.createPigsty(var8);
            var8.tiles[var9].setTileAndCheckPlacement(var3.readByte(), var3.readByte());
            var8.tiles[var9].addToMap();
            var8.tiles[var9].auxA = var3.readInt();
            var8.tiles[var9].auxB = var3.readInt();
          }
      }
      var8.constructionRemaining = var3.readByte();
      var8.constructionTotal = var3.readByte();
      if (!var8.isComplete()) {
        var8.pendingMaterials = Engine.readIntArray(var3);
      }
      var8.addToMap();
      var8.updateTileSprites();
    }
  }
}
