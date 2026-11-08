// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { DataInputStream, DataOutputStream, IOFailure } from "../runtime/io";
import { StringBuffer, Vector, arraycopy, bor, charStr, errorMessage, idiv, jstr } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { MapEntity } from "./MapEntity";
import { Path } from "./Path";
import { Animation } from "./Animation";
import { Townsman } from "./Townsman";
import { Engine } from "./Engine";
import { Ambience } from "./Ambience";
import { MapObject } from "./MapObject";
import { Battle } from "./Battle";
import { GameData } from "./GameData";
import { App } from "./App";
import { Level } from "./Level";
import { Building } from "./Building";
import { GameUi } from "./GameUi";

export class Game {
  static level: Level = null;
  private static frameClock: number = 0;
  static gameTime: number = 0;
  private static simClock: number = 0;
  private static skipProgress: number = 0;
  private static skipTotal: number = 0;
  static gameSpeed: number = 0;
  static day: number = 0;
  static buildMenuEnabled: boolean = false;
  static weather: number = 0;
  private goalType: number = 0;
  private goalTextId: number = 0;
  private goalTarget: number = 0;
  private goalParam: number = 0;
  static kingTroops: Int8Array = Int8Array.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  static playerTroops: Int8Array = Int8Array.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  static departmentBonusChoice: Int8Array = Int8Array.of(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
  static departmentConquered: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  static bonusGold: number = 0;
  static actionPoints: number = 0;
  static troopPool: number = 0;
  static researchLevel: number = 0;
  static researchProgress: number = 0;
  static maxResearchLevel: number = 0;
  private static campaignResearchLevel: number = 0;
  static conqueredBuildings: number = 0;
  static lostFights: number = 0;
  private static field_265: number = 0;
  static scriptStep: number = 0;
  static missionTitleTextId: number = 0;
  static objectives: Vector = new Vector();
  private static field_269: Vector = new Vector();
  static constraints: Vector = new Vector();
  private static stock: Int32Array = new Int32Array(21);
  private static merchantDemand: Int32Array = new Int32Array(21);
  private static merchantSupply: Int32Array = new Int32Array(21);
  private static merchantPrices: Int32Array = new Int32Array(21);
  private static merchantSupplyTemplate: Int32Array = null;
  private static merchantDemandTemplate: Int32Array = null;
  static storageCapacity: number = 0;
  static merchantPresent: boolean = false;
  private static merchantStayMin: number = 0;
  private static merchantStayMax: number = 0;
  private static merchantAbsenceMin: number = 0;
  private static merchantAbsenceMax: number = 0;
  private static nextMerchantDay: number = 0;
  static happiness: number = 0;
  static field_285: Int32Array = Int32Array.of(32, 48, 96, 16, 144, 80, 112, 128, 64, 192, 176, 160, -1, -1, -1, -1, -1, 0, -1, -1, -1);
  static resourceIcons: Int32Array = Int32Array.of(80, 87, 75, 78, 76, 91, 83, 74, 86, 90, 92, 81, 84, 85, 77, 93, 89, 79, 89, 82, 88);
  static field_287: Int32Array = Int32Array.of(101, 142, 133, 136, 134, 146, 139, 132, 103, 145, 147, 138, 140, 141, 135, 135, 103, 137, 144, 102, 143);
  static field_288: Int32Array = Int32Array.of(98, 126, 117, 120, 118, 130, 97, 116, 100, 129, 131, 122, 124, 125, 119, 119, 100, 121, 128, 99, 127);
  $init0(): this {
    return this;
  }
  $init1(var1: DataInputStream): this {
    this.goalType = var1.readInt();
    this.goalTextId = var1.readInt();
    this.goalTarget = var1.readInt();
    if (var1.readBoolean()) {
      this.goalParam = var1.readInt();
    }
    return this;
  }
  $init2(var1: number, var2: number, var3: number, var4: number): this {
    this.goalType = var1;
    this.goalTextId = var2;
    this.goalTarget = var3;
    this.goalParam = var4;
    return this;
  }
  static setWeather(var0: number): void {
    Game.weather = var0;
    switch (var0) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        Ambience.scheduleLightning();
    }
  }
  private static clearLevel(): void {
    Game.level = null;
    Building.resetAll();
    MapObject.clearLists();
    Animation.disposeAll();
    Path.reset();
    Townsman.clearAll();
    Battle.clearAll();
    Game.objectives.removeAllElements();
    Game.field_269.removeAllElements();
    Game.constraints.removeAllElements();
    Game.missionTitleTextId = 0;
    Ambience.reset();
    GameUi.reset();
    void 0;
  }
  static resetSession(): void {
    Game.clearLevel();
    Game.happiness = 110;
    Game.storageCapacity = 0;
    Game.lostFights = 0;
    Game.conqueredBuildings = 0;
    GameData.setAllBuildingsAllowed(true);
    for (let var0: number = 0; var0 < Game.stock.length; var0++) {
      Game.stock[var0] = 0;
    }
    Game.merchantPresent = false;
    for (let var1: number = 0; var1 < Game.stock.length; var1++) {
      Game.merchantPrices[var1] = 0;
      Game.merchantSupply[var1] = 0;
      Game.merchantDemand[var1] = 0;
    }
    Game.merchantSupplyTemplate = null;
    Game.merchantDemandTemplate = null;
    Game.setMerchantSchedule(-1, 0, 0, 0, 0);
    Engine.configureAi(-1, 0, 0, 0, 5, 0, 0, 0);
    Game.buildMenuEnabled = true;
  }
  static beginLevel(): void {
    GameUi.storageResources = GameData.method_558();
    GameUi.tradeResources = GameData.method_559();
    GameUi.initMapView();
    if (!Game.level.restoringSave) {
      Game.gameTime = 0;
      Game.day = 0;
      Game.simClock = 0;
      Game.frameClock = 0;
      Game.weather = 0;
      GameData.initLevelScript();
    }
    Game.gameSpeed = 1;
    Ambience.queueSound(-2147483648, -2147483648);
    Game.level.levelStarted = true;
    Game.level.restoringSave = false;
  }
  static skipToNextDay(): void {
    if (!Ambience.skippingTime) {
      Ambience.skippingTime = true;
      GameUi.setState(-1);
      Game.gameSpeed = 1;
      Game.skipProgress = Game.frameClock;
      if (Building.mainBuilding !== null) {
        Game.frameClock = Game.frameClock + (Math.imul(Game.day + 1, 90000) - Game.gameTime);
      }
      Game.skipTotal = idiv(Game.frameClock - Game.skipProgress, 100);
      Game.skipProgress = 0;
    }
  }
  static update(): void {
    Game.frameClock += 50;
    Animation.updateAll();
    Level.animateTiles();
    Ambience.playDueSounds();
    Ambience.updateAmbientSounds();
    while (Game.frameClock - Game.simClock > 100) {
      if (Building.mainBuilding !== null) {
        for (let var0: number = 0; var0 < Game.gameSpeed; var0++) {
          Townsman.updateAll();
          Battle.updateAll();
          Game.gameTime += 100;
        }
      }
      Game.simClock += 100;
      if (Game.frameClock - Game.simClock <= 100) {
        for (let var1: number = 0; var1 < Game.constraints.size(); var1++) {
          if (!(Game.constraints.elementAt(var1) as Game).isGoalMet()) {
            GameData.onLevelFailed();
          }
        }
        if (Game.objectives.size() > 0) {
          let var2: number = 0;
          while (true) {
            if (var2 >= Game.objectives.size()) {
              GameData.onObjectivesCompleted();
              break;
            }
            if (!(Game.objectives.elementAt(var2) as Game).isGoalMet()) {
              break;
            }
            var2++;
          }
        }
      }
      if (Game.skipProgress++ % 30 === 0) {
        return;
      }
    }
    let var3: number = Game.day;
    if ((Game.day = idiv(Game.gameTime, 90000)) > var3) {
      MapObject.tickGrowth();
      if (Game.level !== null && Game.level.rainChance >= 0) {
        if (Engine.randomInt(100) < Game.level.rainChance) {
          Game.setWeather(1);
        } else if (Engine.randomInt(100) < Game.level.stormChance) {
          Game.setWeather(2);
        } else {
          Game.setWeather(0);
        }
      }
      Townsman.applyHappinessModifiers();
      GameData.onNewDay();
      if (Game.nextMerchantDay !== (-1)) {
        if (Game.merchantPresent) {
          if (Game.day >= Game.nextMerchantDay) {
            Game.nextMerchantDay = Game.day + Engine.randomRange(Game.merchantStayMin, Game.merchantStayMax);
            Game.merchantLeaves();
          }
        } else if (Game.day >= Game.nextMerchantDay) {
          Game.nextMerchantDay = Game.day + Engine.randomRange(Game.merchantAbsenceMin, Game.merchantAbsenceMax);
          Game.merchantArrives();
        }
      }
      Engine.updateAi();
      Path.expireCache();
    }
    if (Game.level !== null) {
      GameUi.updateCursor();
      GameUi.updateCamera();
      if (Game.level !== null) {
        GameUi.updateVisibleTileRange();
        GameUi.updateHoverInfo();
        if (Ambience.skippingTime) {
          Ambience.skippingTime = false;
          GameUi.setState(0);
        }
      }
    }
  }
  static quitLevel(var0: boolean): void {
    if (var0) {
      if (App.getScreen() === 2) {
        if (!Engine.isDemo()) {
          Game.saveCampaign();
        }
      } else {
        if (Game.level !== null && Game.level.levelIndex !== (-1) && !Engine.isDemo()) {
          Game.saveCampaign();
        }
        Engine.deleteSave(Game.level.levelIndex === (-1) ? 3 : 2);
        try {
          let var4: DataOutputStream = Engine.beginSave(Game.level.levelIndex === (-1) ? 3 : 2);
          Game.level.write(var4);
          Building.saveAll(var4);
          Townsman.saveAll(var4);
          let var1: DataOutputStream = var4;
          Game.clampStocks();
          Engine.writeIntArray(var1, Game.stock);
          Engine.writeIntArray(var1, Game.merchantDemand);
          Engine.writeIntArray(var1, Game.merchantSupply);
          var1.writeInt(Game.storageCapacity);
          var1.writeInt(Game.happiness);
          var1.writeBoolean(Game.merchantPresent);
          var1.writeInt(Game.nextMerchantDay);
          var1.writeInt(Game.merchantStayMin);
          var1.writeInt(Game.merchantStayMax);
          var1.writeInt(Game.merchantAbsenceMin);
          var1.writeInt(Game.merchantAbsenceMax);
          Engine.writeIntArray(var1, Game.merchantDemandTemplate);
          Engine.writeIntArray(var1, Game.merchantSupplyTemplate);
          var1.writeInt(Game.researchLevel);
          var1.writeInt(Game.researchProgress);
          var1.writeInt(Game.maxResearchLevel);
          Engine.saveAi(var4);
          var1 = var4;
          var4.writeInt(Game.field_265);
          var1.writeInt(Game.scriptStep);
          var1.writeInt(Game.missionTitleTextId);
          var1.writeInt(Game.objectives.size());
          for (let var2: number = 0; var2 < Game.objectives.size(); var2++) {
            (Game.objectives.elementAt(var2) as Game).writeGoal(var1);
          }
          var1.writeInt(Game.field_269.size());
          for (let var6: number = 0; var6 < Game.field_269.size(); var6++) {
            (Game.field_269.elementAt(var6) as Game).writeGoal(var1);
          }
          var1.writeInt(Game.constraints.size());
          for (let var7: number = 0; var7 < Game.constraints.size(); var7++) {
            (Game.constraints.elementAt(var7) as Game).writeGoal(var1);
          }
          for (let var8: number = 0; var8 < GameData.buildingAllowed.length; var8++) {
            var1.writeBoolean(GameData.buildingAllowed[var8]);
          }
          var1.writeBoolean(Game.buildMenuEnabled);
          Battle.saveAll(var4);
          var4.writeInt(Game.gameTime);
          var4.writeInt(Game.day);
          var4.writeInt(Game.frameClock);
          var4.writeInt(Game.weather);
          Engine.commitSave();
        } catch ($e0) {
          if ($e0 instanceof IOFailure) {
            const var3 = $e0;
            errorMessage(var3);
            Engine.deleteSave(Game.level.levelIndex === (-1) ? 3 : 2);
          } else {
            throw $e0;
          }
        }
      }
    }
    Game.clearLevel();
    App.startLoader(0, 0, 12288);
  }
  static finishLevel(var0: boolean): void {
    if (Game.level.levelIndex !== (-1)) {
      Engine.deleteSave(2);
    }
    label34: {
      let var1: number = Game.level.levelIndex;
      if (var0) {
        if (var1 < 0 || var1 >= Game.departmentConquered.length) {
          App.startLoader(0, 0, 12288);
          break label34;
        }
        if (!GameData.isFinalRegionUnlocked()) {
          Engine.consumeDemoGame();
          let var0i: number = var1;
          GameUi.coinFlipDone = false;
          GameUi.campaignLevel = var0i + 1;
          GameUi.campaignStoryStep = var0i + 1;
          Game.kingTroops[var0i] = 0;
          Game.departmentConquered[var0i] = true;
          Game.departmentBonusChoice[var0i] = 0;
          Game.campaignResearchLevel = Game.researchLevel;
          if (++Game.maxResearchLevel >= GameData.requiredTechLevels.length) {
            Game.maxResearchLevel = GameData.requiredTechLevels.length;
          }
          Game.actionPoints = (Game.actionPoints + GameData.field_501[var0i]) << 24 >> 24;
          Game.troopPool = (Game.troopPool + Math.min(Townsman.soldiers.size(), 3)) << 24 >> 24;
          if (!Engine.isDemo()) {
            Game.saveCampaign();
          }
        } else {
          Engine.deleteSave(1);
        }
        if (!Engine.isDemoPlayable()) {
          App.openMenu(50);
          break label34;
        }
      }
      App.startLoader(4, 0, 12290);
    }
    Game.clearLevel();
  }
  static draw(var0: Graphics): void {
    Engine.fillScreen(var0, 3158016);
    Game.level.draw(var0);
    GameUi.draw(var0);
    if (Ambience.skippingTime) {
      for (let var1: number = 0; var1 < Engine.screenWidth; var1 += Engine.getCellWidth(15)) {
        for (let var2: number = 0; var2 < Engine.screenHeight; var2 += Engine.getCellHeight(15)) {
          Engine.drawImage(var0, var1, var2, 15);
        }
      }
      GameUi.drawProgressBar(var0, idiv(Engine.screenWidth, 5), idiv(Engine.screenHeight << 1, 3), Game.skipProgress, Game.skipTotal, true, Math.imul(idiv(Engine.screenWidth, 5), 3));
    }
  }
  static loadGame(var0: number): void {
    try {
      let var5: DataInputStream = Engine.openSaveForRead(var0);
      Game.level = new Level().$init0(var5);
      Building.loadAll(var5);
      Townsman.loadAll(var5);
      let var1: DataInputStream = var5;
      Game.stock = Engine.readIntArray(var5);
      Game.merchantDemand = Engine.readIntArray(var1);
      Game.merchantSupply = Engine.readIntArray(var1);
      Game.storageCapacity = var1.readInt();
      Game.happiness = var1.readInt();
      Game.merchantPresent = var1.readBoolean();
      Game.nextMerchantDay = var1.readInt();
      Game.merchantStayMin = var1.readInt();
      Game.merchantStayMax = var1.readInt();
      Game.merchantAbsenceMin = var1.readInt();
      Game.merchantAbsenceMax = var1.readInt();
      Game.merchantDemandTemplate = Engine.readIntArray(var1);
      Game.merchantSupplyTemplate = Engine.readIntArray(var1);
      Game.researchLevel = var1.readInt();
      Game.researchProgress = var1.readInt();
      Game.maxResearchLevel = var1.readInt();
      Engine.loadAi(var5);
      var1 = var5;
      Game.field_265 = var5.readInt();
      Game.scriptStep = var1.readInt();
      Game.missionTitleTextId = var1.readInt();
      let var2: number = var1.readInt();
      for (let var3: number = 0; var3 < var2; var3++) {
        Game.objectives.addElement(new Game().$init1(var1));
      }
      var2 = var1.readInt();
      for (let var9: number = 0; var9 < var2; var9++) {
        Game.field_269.addElement(new Game().$init1(var1));
      }
      var2 = var1.readInt();
      for (let var10: number = 0; var10 < var2; var10++) {
        Game.constraints.addElement(new Game().$init1(var1));
      }
      for (let var11: number = 0; var11 < GameData.buildingAllowed.length; var11++) {
        GameData.buildingAllowed[var11] = var1.readBoolean();
      }
      Game.buildMenuEnabled = var1.readBoolean();
      Battle.loadAll(var5);
      Game.gameTime = var5.readInt();
      Game.day = var5.readInt();
      Game.simClock = Game.frameClock = var5.readInt();
      Game.weather = var5.readInt();
    } catch (var4) {
    }
  }
  static loadCampaign(): void {
    let var0: DataInputStream = Engine.openSaveForRead(1);
    try {
      var0.read(Game.departmentBonusChoice);
      var0.read(Game.playerTroops);
      Game.troopPool = var0.readByte();
      Game.bonusGold = var0.readInt();
      Game.actionPoints = var0.readByte();
      GameUi.campaignStoryStep = var0.readInt();
      GameUi.campaignLevel = var0.readInt();
      GameUi.coinFlipDone = var0.readBoolean();
      for (let var1: number = 0; var1 < Game.departmentConquered.length; var1++) {
        Game.departmentConquered[var1] = var0.readBoolean();
      }
      var0.read(Game.kingTroops);
      Game.researchLevel = Game.campaignResearchLevel = var0.readInt();
      Game.researchProgress = var0.readInt();
      Game.maxResearchLevel = var0.readInt();
      for (let var4: number = 0; var4 < GameData.tipShown.length; var4++) {
        GameData.tipShown[var4] = var0.readBoolean();
      }
    } catch (var3) {
    }
    try {
      var0.close();
    } catch (var2) {
    }
    if (Engine.saveExists(2)) {
      Game.loadGame(2);
      App.dispatchCommand(2, -2);
    } else {
      App.startLoader(4, 0, 12290);
    }
  }
  private appendGoalText(var1: GameUi): void {
    let var2: number = 0;
    if (this.isGoalMet()) {
      var2 = Engine.getColor(23);
    } else {
      var2 = Engine.getColor(24);
    }
    switch (this.goalType as number) {
      case 0:
        let var41: StringBuffer = new StringBuffer();
        let var28: StringBuffer = null;
        var41 = var41.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32));
        let var10001: number = Game.getStockPacked(this.goalTarget);
        var28 = var41.append(jstr(Math.min(var10001 & 65535, this.goalTarget & 65535))).append(Engine.getText(65562)).append(jstr(this.goalTarget & 65535));
        var1.setText(var28.toString(), 2, 0, 1, var2, var2);
        return;
      case 4096:
        let var40: StringBuffer = new StringBuffer();
        let var26: StringBuffer = null;
        var26 = var40.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32)).append(jstr(Math.min(Townsman.townies.size(), this.goalTarget))).append(Engine.getText(65562)).append(jstr(this.goalTarget));
        var1.setText(var26.toString(), 2, 0, 1, var2, var2);
        return;
      case 8192:
        let var39: StringBuffer = new StringBuffer();
        let var24: StringBuffer = null;
        var24 = var39.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32)).append(jstr(Math.min(Game.researchLevel, this.goalTarget))).append(Engine.getText(65562)).append(jstr(this.goalTarget));
        var1.setText(var24.toString(), 2, 0, 1, var2, var2);
        return;
      case 12288:
        let var38: StringBuffer = new StringBuffer();
        let var22: StringBuffer = null;
        var22 = var38.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32)).append(jstr(Math.min(Game.happiness, this.goalTarget))).append(Engine.getText(65562)).append(jstr(this.goalTarget));
        var1.setText(var22.toString(), 2, 0, 1, var2, var2);
        return;
      case 16384:
        let var37: StringBuffer = new StringBuffer();
        let var19: StringBuffer = null;
        var19 = var37.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32));
        if (this.goalParam !== null) {
          var19 = var19.append(jstr(Building.completedByTypeLevel[this.goalTarget][this.goalParam])).append(Engine.getText(65562)).append(jstr(1));
        } else {
          var19 = var19.append(jstr(Building.completedByTypeLevel[this.goalTarget][0] + Building.completedByTypeLevel[this.goalTarget][1] + Building.completedByTypeLevel[this.goalTarget][2])).append(Engine.getText(65562)).append(jstr(1));
        }
        var1.setText(var19.toString(), 2, 0, 1, var2, var2);
        return;
      case 20480:
        let var36: StringBuffer = new StringBuffer();
        let var16: StringBuffer = null;
        var16 = var36.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32));
        if (this.goalParam !== null) {
          var16 = var16.append(jstr(Building.countByTypeLevel[this.goalTarget][this.goalParam])).append(Engine.getText(65562)).append(jstr(1));
        } else {
          var16 = var16.append(jstr(Building.countByTypeLevel[this.goalTarget][0] + Building.countByTypeLevel[this.goalTarget][1] + Building.countByTypeLevel[this.goalTarget][2])).append(Engine.getText(65562)).append(jstr(1));
        }
        var1.setText(var16.toString(), 2, 0, 1, var2, var2);
        return;
      case 24576:
        let var35: StringBuffer = new StringBuffer();
        let var14: StringBuffer = null;
        var14 = var35.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32)).append(jstr(Math.min(Building.completedByTypeLevel[this.goalTarget][0] + Building.completedByTypeLevel[this.goalTarget][1] + Building.completedByTypeLevel[this.goalTarget][2], this.goalParam))).append(Engine.getText(65562)).append(jstr(this.goalParam));
        var1.setText(var14.toString(), 2, 0, 1, var2, var2);
        return;
      case 36864:
        let var34: StringBuffer = new StringBuffer();
        let var12: StringBuffer = null;
        var12 = var34.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32)).append(jstr(Math.min(Game.conqueredBuildings, this.goalTarget))).append(Engine.getText(65562)).append(jstr(this.goalTarget));
        var1.setText(var12.toString(), 2, 0, 1, var2, var2);
        return;
      case 40960:
        let var33: StringBuffer = new StringBuffer();
        let var10: StringBuffer = null;
        var10 = var33.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32)).append(jstr(Math.min(Game.lostFights, this.goalTarget))).append(Engine.getText(65562)).append(jstr(this.goalTarget));
        var1.setText(var10.toString(), 2, 0, 1, var2, var2);
        return;
      case 45056:
        let var32: StringBuffer = new StringBuffer();
        let var8: StringBuffer = null;
        var8 = var32.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32)).append(jstr(Townsman.enemies.size()));
        var1.setText(var8.toString(), 2, 0, 1, var2, var2);
        return;
      case 49152:
        let var31: StringBuffer = new StringBuffer();
        let var6: StringBuffer = null;
        var6 = var31.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32)).append(jstr(this.goalTarget - Game.day));
        var1.setText(var6.toString(), 2, 0, 1, var2, var2);
        return;
      case 53248:
        let var10000: StringBuffer = new StringBuffer();
        let var3: StringBuffer = null;
        var3 = var10000.append(Engine.getText(this.goalTextId)).append(Engine.getText(65559)).append(charStr(32)).append(jstr(this.goalTarget - Game.day));
        var1.setText(var3.toString(), 2, 0, 1, var2, var2);
        return;
    }
  }
  private isGoalMet(): boolean {
    switch (this.goalType as number) {
      case 0:
        if ((Game.getStockPacked(this.goalTarget) & 65535) >= (this.goalTarget & 65535)) {
          return true;
        }
        return false;
      case 4096:
        if (Townsman.townies.size() >= this.goalTarget) {
          return true;
        }
        return false;
      case 8192:
        if (Game.researchLevel >= this.goalTarget) {
          return true;
        }
        return false;
      case 12288:
        if (Game.happiness >= this.goalTarget) {
          return true;
        }
        return false;
      case 16384:
        if (this.goalParam !== null) {
          if (Building.completedByTypeLevel[this.goalTarget][this.goalParam] > 0) {
            return true;
          }
          return false;
        } else {
          if (Building.completedByTypeLevel[this.goalTarget][0] + Building.completedByTypeLevel[this.goalTarget][1] + Building.completedByTypeLevel[this.goalTarget][2] > 0) {
            return true;
          }
          return false;
        }
      case 20480:
        if (this.goalParam !== null) {
          if (Building.countByTypeLevel[this.goalTarget][this.goalParam] > 0) {
            return true;
          }
          return false;
        } else {
          if (Building.countByTypeLevel[this.goalTarget][0] + Building.countByTypeLevel[this.goalTarget][1] + Building.countByTypeLevel[this.goalTarget][2] > 0) {
            return true;
          }
          return false;
        }
      case 24576:
        if (Building.completedByTypeLevel[this.goalTarget][0] + Building.completedByTypeLevel[this.goalTarget][1] + Building.completedByTypeLevel[this.goalTarget][2] >= this.goalParam) {
          return true;
        }
        return false;
      case 36864:
        if (Game.conqueredBuildings >= this.goalTarget) {
          return true;
        }
        return false;
      case 40960:
        if (Game.lostFights < this.goalTarget) {
          return true;
        }
        return false;
      case 45056:
        if (Townsman.enemies.size() === 0) {
          return true;
        }
        return false;
      case 49152:
        if (Game.day > this.goalTarget) {
          return true;
        }
        return false;
      case 53248:
        if (Game.day < this.goalTarget) {
          return true;
        }
        return false;
      default:
        return false;
    }
  }
  private writeGoal(var1: DataOutputStream): void {
    var1.writeInt(this.goalType);
    var1.writeInt(this.goalTextId);
    var1.writeInt(this.goalTarget);
    var1.writeBoolean(this.goalParam !== null);
    if (this.goalParam !== null) {
      var1.writeInt(this.goalParam);
    }
  }
  static getDepartmentTroops(var0: number, var1: boolean): number {
    if (var1) {
      return var0 >= 0 && var0 < Game.playerTroops.length ? Game.playerTroops[var0] : 0;
    } else {
      return var0 >= 0 && var0 < Game.kingTroops.length ? Game.kingTroops[var0] : 0;
    }
  }
  static applyDepartmentBonuses(var0: number): void {
    if (var0 >= 0 && var0 < Game.departmentBonusChoice.length) {
      for (let var1: number = 0; var1 < Game.departmentBonusChoice.length; var1++) {
        if (Game.departmentBonusChoice[var1] >= 0) {
          Game.addResource(GameData.regionRewardOptions[var1][Game.departmentBonusChoice[var1]]);
        }
      }
      Game.addResource(1114112 | Game.bonusGold);
      Game.researchLevel = Game.campaignResearchLevel;
    }
  }
  static resetCampaign(): void {
    for (let var0: number = 0; var0 < Game.departmentBonusChoice.length; var0++) {
      Game.departmentBonusChoice[var0] = -1;
      Game.playerTroops[var0] = 0;
      Game.departmentConquered[var0] = false;
    }
    arraycopy(GameData.field_500, 0, Game.kingTroops, 0, GameData.field_500.length);
    Game.bonusGold = 0;
    Game.actionPoints = 0;
    Game.troopPool = 0;
    GameUi.coinFlipDone = false;
    GameUi.campaignLevel = 0;
    GameUi.campaignStoryStep = 0;
    Game.researchLevel = 0;
    Game.campaignResearchLevel = 0;
    Game.researchProgress = 0;
    Game.maxResearchLevel = 0;
  }
  static saveCampaign(): void {
    let var0: DataOutputStream = null;
    try {
      Engine.deleteSave(1);
      (var0 = Engine.beginSave(1)).write(Game.departmentBonusChoice);
      var0.write(Game.playerTroops);
      var0.writeByte(Game.troopPool);
      var0.writeInt(Game.bonusGold);
      var0.writeByte(Game.actionPoints);
      var0.writeInt(GameUi.campaignStoryStep);
      var0.writeInt(GameUi.campaignLevel);
      var0.writeBoolean(GameUi.coinFlipDone);
      for (let var1: number = 0; var1 < Game.departmentConquered.length; var1++) {
        var0.writeBoolean(Game.departmentConquered[var1]);
      }
      var0.write(Game.kingTroops);
      var0.writeInt(Game.researchLevel);
      var0.writeInt(Game.researchProgress);
      var0.writeInt(Game.maxResearchLevel);
      for (let var4: number = 0; var4 < GameData.tipShown.length; var4++) {
        var0.writeBoolean(GameData.tipShown[var4]);
      }
      Engine.commitSave();
    } catch (var2) {
    }
  }
  static showLogbook(): void {
    let var0: GameUi = null;
    (var0 = new GameUi()).setPortrait(16512);
    if (Game.level.levelIndex !== (-1)) {
      var0.setText(Engine.getText(Game.missionTitleTextId), 2, 0, 1, Engine.getColor(22), Engine.getColor(22));
      for (let var1: number = 0; var1 < Game.objectives.size(); var1++) {
        let var10000: Game = (Game.objectives.elementAt(var1) as Game);
        let var2: any = null;
        var10000.appendGoalText(var0);
      }
      for (let var5: number = 0; var5 < Game.field_269.size(); var5++) {
        let var11: Game = (Game.field_269.elementAt(var5) as Game);
        let var8: any = null;
        var11.appendGoalText(var0);
      }
      for (let var6: number = 0; var6 < Game.constraints.size(); var6++) {
        let var12: Game = (Game.constraints.elementAt(var6) as Game);
        let var9: any = null;
        var12.appendGoalText(var0);
      }
    } else {
      var0.setText(Engine.getText(126), 1, 0, 1, Engine.getColor(21), Engine.getColor(21));
      var0.setText(Engine.getText(259), 2, 0, 1, Engine.getColor(22), Engine.getColor(22));
      let var7: StringBuffer = new StringBuffer();
      let var10: number = Game.day % 31;
      let var3: number = idiv(Game.day % 372, 31);
      let var4: number = 0;
      if ((var4 = idiv(Game.day, 372)) > 0) {
        var7 = var7.append(jstr(var4)).append(charStr(32)).append(var4 !== 1 ? Engine.getText(261) : Engine.getText(260));
      }
      if (var3 > 0) {
        if (var7.length() > 0) {
          var7 = var7.append(charStr(44)).append(charStr(32));
        }
        var7 = var7.append(jstr(var3)).append(charStr(32)).append(var3 !== 1 ? Engine.getText(258) : Engine.getText(257));
      }
      if (var10 !== 0 || Game.day === 0) {
        if (var7.length() > 0) {
          var7 = var7.append(charStr(44)).append(charStr(32));
        }
        var7 = var7.append(jstr(var10)).append(charStr(32)).append(var10 !== 1 ? Engine.getText(256) : Engine.getText(255));
      }
      var0.setText(var7.toString(), 1, 0, 1, Engine.getColor(25), Engine.getColor(25));
    }
    GameUi.queueMessage(var0);
  }
  static withdrawRange(var0: number, var1: number): number {
    var0 >>= 16;
    let var2: number = var1 >> 8 & 255;
    if ((var1 = Math.min(var1 & 255, Game.stock[var0])) < var2) {
      return 0;
    }
    Game.stock[var0] = Game.stock[var0] - var1;
    return var1;
  }
  static withdrawExact(var0: number, var1: number): number {
    var0 >>= 16;
    if (var1 <= Game.stock[var0]) {
      Game.stock[var0] = Game.stock[var0] - var1;
      return var1;
    } else {
      return 0;
    }
  }
  static deposit(var0: number, var1: number): number {
    var0 >>= 16;
    var1 = Math.min(Game.storageCapacity - Game.stock[var0], var1);
    var1 = Math.max(0, var1);
    Game.stock[var0] = Game.stock[var0] + var1;
    return var1;
  }
  static harvestMapObject(var0: number, var1: MapObject): number {
    if (var1.type === 96) {
      return var0;
    }
    var1.auxA = Math.max(0, var1.auxA - var0);
    return var0;
  }
  static method_277(var0: number, var1: MapEntity, var2: number): number {
    if (var2 === 1) {
      var2 = 0;
      if (var1 instanceof Building) {
        var2 = (var1 as Building).level;
      }
      Game.changeHappiness(GameData.field_574[var2]);
    }
    return var0;
  }
  static consumeFood(var0: number, var1: number): number {
    switch (var1) {
      case 0:
        if (Game.stock[2] >= var0) {
          Game.stock[2] = Game.stock[2] - var0;
          Game.changeHappiness(GameData.getFoodHappinessDelta(131072, var1));
          return var0 | 131072;
        }
        if (Game.stock[4] >= var0) {
          Game.stock[4] = Game.stock[4] - var0;
          Game.changeHappiness(GameData.getFoodHappinessDelta(262144, var1));
          return var0 | 262144;
        }
        if (Game.stock[7] >= var0) {
          Game.stock[7] = Game.stock[7] - var0;
          Game.changeHappiness(GameData.getFoodHappinessDelta(458752, var1));
          return var0 | 458752;
        }
        break;
      case 1:
        if (Game.stock[4] >= var0) {
          Game.stock[4] = Game.stock[4] - var0;
          Game.changeHappiness(GameData.getFoodHappinessDelta(262144, var1));
          return var0 | 262144;
        }
        if (Game.stock[2] >= var0) {
          Game.stock[2] = Game.stock[2] - var0;
          Game.changeHappiness(GameData.getFoodHappinessDelta(131072, var1));
          return var0 | 131072;
        }
        if (Game.stock[7] >= var0) {
          Game.stock[7] = Game.stock[7] - var0;
          Game.changeHappiness(GameData.getFoodHappinessDelta(458752, var1));
          return var0 | 458752;
        }
        break;
      case 2:
        if (Game.stock[7] >= var0) {
          Game.stock[7] = Game.stock[7] - var0;
          Game.changeHappiness(GameData.getFoodHappinessDelta(458752, var1));
          return var0 | 458752;
        }
        if (Game.stock[4] >= var0) {
          Game.stock[4] = Game.stock[4] - var0;
          Game.changeHappiness(GameData.getFoodHappinessDelta(262144, var1));
          return var0 | 262144;
        }
        if (Game.stock[2] >= var0) {
          Game.stock[2] = Game.stock[2] - var0;
          Game.changeHappiness(GameData.getFoodHappinessDelta(131072, var1));
          return var0 | 131072;
        }
    }
    return 0;
  }
  static packedFlags(var0: number): number {
    return var0 & (-16777216);
  }
  static packedAmount(var0: number): number {
    return var0 & 65535;
  }
  static packedResource(var0: number): number {
    return var0 & 16711680;
  }
  static getStockPacked(var0: number): number {
    let var2: number = 0;
    let var1: number = (var2 = var0 & 16711680) >> 16;
    return Game.stock[var1] | var2;
  }
  static getStock(var0: number): number {
    var0 = var0 >> 16 & 255;
    return Game.stock[var0];
  }
  static setStocks(var0: Int32Array): void {
    for (let var1: number = 0; var1 < var0.length; var1++) {
      let var2: number = var0[var1] >> 16 & 255;
      let var10000: number = var0[var1];
      let var3: number = 0;
      var3 = var10000 & 65535;
      Game.stock[var2] = var3;
    }
  }
  static addResource(var0: number): void {
    let var1: number = var0 >> 16 & 255;
    var0 &= 65535;
    Game.stock[var1] = Game.stock[var1] + var0;
  }
  static addResources(var0: Int32Array): void {
    for (let var1: number = 0; var1 < var0.length; var1++) {
      let var10000: number = var0[var1];
      let var3: number = 0;
      let var2: number = var10000 >> 16 & 255;
      var3 = var0[var1] & 65535;
      Game.stock[var2] = Game.stock[var2] + var3;
    }
  }
  static removeResources(var0: Int32Array): void {
    for (let var1: number = 0; var1 < var0.length; var1++) {
      if (var0[var1] !== (-1)) {
        let var10000: number = var0[var1];
        let var3: number = 0;
        let var2: number = var10000 >> 16 & 255;
        var3 = var0[var1] & 65535;
        Game.stock[var2] = Game.stock[var2] - var3;
      }
    }
  }
  static incrementStock(var0: number): void {
    Game.stock[var0 >> 16]++;
  }
  static decrementStock(var0: number): void {
    Game.stock[var0 >> 16]--;
  }
  static clampStocks(): void {
    for (let var0: number = 0; var0 < Game.stock.length; var0++) {
      if (var0 === 17) {
        Game.stock[var0] = Math.min(Game.stock[var0], 9999);
        Game.stock[var0] = Math.max(Game.stock[var0], 0);
      } else {
        Game.stock[var0] = Math.min(Game.stock[var0], Game.storageCapacity);
        Game.stock[var0] = Math.max(Game.stock[var0], 0);
      }
    }
  }
  static fillStocks(): void {
    for (let var0: number = 0; var0 < Game.stock.length; var0++) {
      if (var0 << 16 !== 851968 && var0 << 16 !== 786432 && var0 << 16 !== 1310720 && var0 << 16 !== 1245184 && var0 << 16 !== 1114112) {
        Game.stock[var0] = Game.storageCapacity;
      }
    }
  }
  static changeHappiness(var0: number): void {
    Game.happiness = Math.max(0, Math.min(100, Game.happiness + var0));
    Game.stock[16] = Game.happiness;
  }
  static getMerchantDemand(var0: number): number {
    var0 = var0 >> 16 & 255;
    return Game.merchantDemand[var0];
  }
  static getMerchantSupply(var0: number): number {
    var0 = var0 >> 16 & 255;
    return Game.merchantSupply[var0];
  }
  static getMerchantPrice(var0: number): number {
    var0 = var0 >> 16 & 255;
    return Game.merchantPrices[var0];
  }
  static setMerchantDemand(var0: Int32Array): void {
    Game.merchantDemandTemplate = var0;
  }
  static setMerchantPrices(var0: Int32Array): void {
    for (let var1: number = 0; var1 < var0.length; var1++) {
      let var2: number = var0[var1] >> 16 & 255;
      let var10000: number = var0[var1];
      let var3: number = 0;
      var3 = var10000 & 65535;
      Game.merchantPrices[var2] = var3;
    }
  }
  static setMerchantSupply(var0: Int32Array): void {
    Game.merchantSupplyTemplate = var0;
  }
  static sellToMerchant(var0: number): boolean {
    var0 >>= 16;
    if (Game.merchantDemand[var0] > 0 && Game.stock[var0] > 0) {
      Game.merchantDemand[var0]--;
      Game.merchantSupply[var0]++;
      Game.stock[17] = Game.stock[17] + Game.merchantPrices[var0];
      Game.stock[var0]--;
      Engine.playSound(33);
      return true;
    } else {
      return false;
    }
  }
  static buyFromMerchant(var0: number): boolean {
    let var10000: number = Game.getStockPacked(1114112);
    let var1: number = 0;
    var1 = var10000 & 65535;
    var0 >>= 16;
    if (var1 >= Game.merchantPrices[var0] && Game.merchantSupply[var0] > 0 && Game.stock[var0] < Game.storageCapacity) {
      Game.merchantDemand[var0]++;
      Game.merchantSupply[var0]--;
      Game.stock[17] = Game.stock[17] - Game.merchantPrices[var0];
      Game.stock[var0]++;
      Engine.playSound(33);
      return true;
    } else {
      return false;
    }
  }
  static canTrade(): boolean {
    return bor(Game.merchantPresent, Building.completedByTypeLevel[11][0] + Building.completedByTypeLevel[11][1] + Building.completedByTypeLevel[11][2] > 0);
  }
  static merchantArrives(): void {
    Game.merchantPresent = true;
    let var0: Int32Array = Game.merchantSupplyTemplate;
    if (Game.merchantSupplyTemplate !== null) {
      for (let var1: number = 0; var1 < Game.merchantSupply.length; var1++) {
        Game.merchantSupply[var1] = 0;
      }
      for (let var5: number = 0; var5 < var0.length; var5++) {
        let var2: number = var0[var5] >> 16 & 255;
        let var10000: number = var0[var5];
        let var3: number = 0;
        var3 = var10000 & 65535;
        Game.merchantSupply[var2] = var3;
      }
    }
    var0 = Game.merchantDemandTemplate;
    if (Game.merchantDemandTemplate !== null) {
      for (let var6: number = 0; var6 < Game.merchantDemand.length; var6++) {
        Game.merchantDemand[var6] = 0;
      }
      for (let var7: number = 0; var7 < var0.length; var7++) {
        let var8: number = var0[var7] >> 16 & 255;
        let var12: number = var0[var7];
        let var10: number = 0;
        var10 = var12 & 65535;
        Game.merchantDemand[var8] = var10;
      }
    }
    GameData.showFirstTip();
    Engine.playSound(18);
  }
  static merchantLeaves(): void {
    Game.merchantPresent = false;
    GameData.showFirstTip();
    Engine.playSound(18);
  }
  static setMerchantSchedule(var0: number, var1: number, var2: number, var3: number, var4: number): void {
    Game.nextMerchantDay = var0;
    Game.merchantStayMin = var1;
    Game.merchantStayMax = var2;
    Game.merchantAbsenceMin = var3;
    Game.merchantAbsenceMax = var4;
  }
}
