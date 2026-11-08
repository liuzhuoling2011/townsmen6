// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { ByteArrayInputStream, ByteArrayOutputStream, DataInputStream, DataOutputStream, InputStream, Sys } from "../runtime/io";
import { Hashtable, Random, StringBuffer, Vector, arraycopy, bytesToString, charStr, classForName, idiv, jstr, l2i, lidiv, lshl, lshr, newArray, parseInt32, replaceChar, toCharArray } from "../runtime/java";
import { Font, Graphics, Image, RecordStore } from "../runtime/midp";
import { MapEntity } from "./MapEntity";
import { IntList } from "./IntList";
import { Game } from "./Game";
import { Townsman } from "./Townsman";
import { Menu } from "./Menu";
import { Battle } from "./Battle";
import { GameData } from "./GameData";
import { App } from "./App";
import { Level } from "./Level";
import { Building } from "./Building";
import { SoundPlayer } from "./SoundPlayer";

export class Engine {
  private static random: Random = new Random(Sys.currentTimeMillis());
  private static cosTable: Int32Array = null;
  private static easeTable: Int32Array = Int32Array.of(65536, 65378, 64906, 64125, 63041, 61666, 60013, 58098, 55938, 53555, 50972, 48214, 45307, 42280, 39160, 35979, 32768, 29556, 26375, 23255, 20228, 17321, 14563, 11980, 9597, 7437, 5522, 3869, 2494, 1410, 629, 157, 0);
  private static saveBuffer: ByteArrayOutputStream = null;
  static demoTimeLimit: number = 0;
  static demoGameLimit: number = 0;
  private static demoTimeLeftMs: number = 0;
  private static demoGamesLeft: number = 0;
  static demoUrl: string = "";
  static demoEnabled: boolean = false;
  private static aiAttackInterval: number = 0;
  private static aiNextAttackTime: number = 0;
  private static aiReinforcePercent: number = 0;
  private static aiAttackSize: number = 0;
  private static aiMaxAttackers: number = 0;
  private static aiRazeChance: number = 0;
  private static aiRecruitsPerTick: number = 0;
  private static aiMaxPopulation: number = 0;
  private static aiTargetTypes: IntList = new IntList().$init0(10, 20);
  static screenWidth: number = 0;
  static screenHeight: number = 0;
  private static colors: Int32Array = null;
  private static fonts: Font[] = null;
  private static fontMetrics: Int32Array[] = null;
  private static images: Image[] = null;
  private static imageInfo: Int16Array[] = null;
  private static frames: Int16Array = null;
  private static animations: Int16Array[] = null;
  private static palettes: Int32Array[] = null;
  private static savedClipX: number = 0;
  private static savedClipY: number = 0;
  private static savedClipWidth: number = 0;
  private static savedClipHeight: number = 0;
  private static pixelBuffer: Int32Array = new Int32Array(1);
  private static spaceChars: Uint16Array = Uint16Array.of(32, 32, 9);
  private static breakChars: Uint16Array = Uint16Array.of(45, 46, 44, 47);
  private static languageCodes: Vector = null;
  private static languageNames: Vector = null;
  private static languageCode: string = null;
  private static textGroups: string[][] = null;
  private static languageListFormat: number = 0;
  private static dynamicTexts: Vector = new Vector();
  private static keyNames: Hashtable = null;
  private static soundPackStream: DataInputStream = null;
  private static soundPackPosition: number = (-1);
  static soundCount: number = 0;
  static soundTable: Int32Array = null;
  private static soundPlayer: SoundPlayer = null;
  private static musicGroup: number = (-1);
  private static playingMusicGroup: number = (-1);
  static {
    Engine.cosTable = Int32Array.of(65536, 65531, 65516, 65491, 65457, 65412, 65358, 65294, 65220, 65136, 65043, 64939, 64826, 64703, 64571, 64428, 64276, 64115, 63943, 63762, 63571, 63371, 63162, 62942, 62714, 62475, 62228, 61971, 61705, 61429, 61144, 60850, 60547, 60235, 59913, 59583, 59243, 58895, 58538, 58172, 57797, 57414, 57022, 56621, 56212, 55794, 55368, 54933, 54491, 54040, 53581, 53114, 52639, 52155, 51665, 51166, 50660, 50146, 49624, 49095, 48558, 48015, 47464, 46906, 46340, 45768, 45189, 44603, 44011, 43412, 42806, 42194, 41575, 40950, 40319, 39682, 39039, 38390, 37736, 37075, 36409, 35738, 35061, 34379, 33692, 32999, 32302, 31600, 30893, 30181, 29465, 28745, 28020, 27291, 26557, 25820, 25079, 24334, 23586, 22833, 22078, 21319, 20557, 19792, 19024, 18253, 17479, 16702, 15923, 15142, 14359, 13573, 12785, 11995, 11204, 10410, 9616, 8819, 8022, 7223, 6423, 5622, 4821, 4018, 3215, 2412, 1608, 804, 0, -804, -1608, -2412, -3215, -4018, -4821, -5622, -6423, -7223, -8022, -8819, -9616, -10410, -11204, -11995, -12785, -13573, -14359, -15142, -15923, -16702, -17479, -18253, -19024, -19792, -20557, -21319, -22078, -22833, -23586, -24334, -25079, -25820, -26557, -27291, -28020, -28745, -29465, -30181, -30893, -31600, -32302, -32999, -33692, -34379, -35061, -35738, -36409, -37075, -37736, -38390, -39039, -39682, -40319, -40950, -41575, -42194, -42806, -43412, -44011, -44603, -45189, -45768, -46340, -46906, -47464, -48015, -48558, -49095, -49624, -50146, -50660, -51166, -51665, -52155, -52639, -53114, -53581, -54040, -54491, -54933, -55368, -55794, -56212, -56621, -57022, -57414, -57797, -58172, -58538, -58895, -59243, -59583, -59913, -60235, -60547, -60850, -61144, -61429, -61705, -61971, -62228, -62475, -62714, -62942, -63162, -63371, -63571, -63762, -63943, -64115, -64276, -64428, -64571, -64703, -64826, -64939, -65043, -65136, -65220, -65294, -65358, -65412, -65457, -65491, -65516, -65531, -65536, -65531, -65516, -65491, -65457, -65412, -65358, -65294, -65220, -65136, -65043, -64939, -64826, -64703, -64571, -64428, -64276, -64115, -63943, -63762, -63571, -63371, -63162, -62942, -62714, -62475, -62228, -61971, -61705, -61429, -61144, -60850, -60547, -60235, -59913, -59583, -59243, -58895, -58538, -58172, -57797, -57414, -57022, -56621, -56212, -55794, -55368, -54933, -54491, -54040, -53581, -53114, -52639, -52155, -51665, -51166, -50660, -50146, -49624, -49095, -48558, -48015, -47464, -46906, -46340, -45768, -45189, -44603, -44011, -43412, -42806, -42194, -41575, -40950, -40319, -39682, -39039, -38390, -37736, -37075, -36409, -35738, -35061, -34379, -33692, -32999, -32302, -31600, -30893, -30181, -29465, -28745, -28020, -27291, -26557, -25820, -25079, -24334, -23586, -22833, -22078, -21319, -20557, -19792, -19024, -18253, -17479, -16702, -15923, -15142, -14359, -13573, -12785, -11995, -11204, -10410, -9616, -8819, -8022, -7223, -6423, -5622, -4821, -4018, -3215, -2412, -1608, -804, 0, 804, 1608, 2412, 3215, 4018, 4821, 5622, 6423, 7223, 8022, 8819, 9616, 10410, 11204, 11995, 12785, 13573, 14359, 15142, 15923, 16702, 17479, 18253, 19024, 19792, 20557, 21319, 22078, 22833, 23586, 24334, 25079, 25820, 26557, 27291, 28020, 28745, 29465, 30181, 30893, 31600, 32302, 32999, 33692, 34379, 35061, 35738, 36409, 37075, 37736, 38390, 39039, 39682, 40319, 40950, 41575, 42194, 42806, 43412, 44011, 44603, 45189, 45768, 46340, 46906, 47464, 48015, 48558, 49095, 49624, 50146, 50660, 51166, 51665, 52155, 52639, 53114, 53581, 54040, 54491, 54933, 55368, 55794, 56212, 56621, 57022, 57414, 57797, 58172, 58538, 58895, 59243, 59583, 59913, 60235, 60547, 60850, 61144, 61429, 61705, 61971, 62228, 62475, 62714, 62942, 63162, 63371, 63571, 63762, 63943, 64115, 64276, 64428, 64571, 64703, 64826, 64939, 65043, 65136, 65220, 65294, 65358, 65412, 65457, 65491, 65516, 65531);
  }
  constructor() {
  }
  static getAppProperty(var0: string): string {
    if (var0 !== null && !(var0 === "") && !(var0 === "null")) {
      try {
        return App.instance.getAppProperty(var0);
      } catch (var1) {
        return null;
      }
    } else {
      return null;
    }
  }
  private static getAppPropertyInt(var0: string): number {
    let var1: string = null;
    return (var1 = Engine.getAppProperty(var0)) !== null ? parseInt32(var1) : 0;
  }
  static getAppPropertyBool(var0: string): boolean {
    let var1: string = null;
    return (var1 = Engine.getAppProperty(var0)) !== null ? (var1 === "true") : false;
  }
  static openResource(var0: string): InputStream {
    return Sys.resource(var0);
  }
  static writeIntArray(var0: DataOutputStream, var1: Int32Array): void {
    if (var1 === null) {
      var0.writeInt(-1);
    } else {
      var0.writeInt(var1.length);
      for (let var2: number = 0; var2 < var1.length; var2++) {
        var0.writeInt(var1[var2]);
      }
    }
  }
  static readIntArray(var0: DataInputStream): Int32Array {
    let var1: number = 0;
    if ((var1 = var0.readInt()) < 0) {
      return null;
    }
    let var3: Int32Array = new Int32Array(var1);
    for (let var2: number = 0; var2 < var3.length; var2++) {
      var3[var2] = var0.readInt();
    }
    return var3;
  }
  static randomInt(var0: number): number {
    return var0 > 1 ? (Engine.random.nextInt() & 2147483647) % var0 : 0;
  }
  static randomRange(var0: number, var1: number): number {
    if (var1 < var0) {
      let var2: number = var1;
      var1 = var0;
      var0 = var2;
    }
    return Engine.randomInt(var1 - var0 + 1) + var0;
  }
  static randomBool(): boolean {
    return Engine.random.nextInt() % 2 === 0;
  }
  static interpolate(var0: number, var1: number, var2: number, var3: number, var4: number): number {
    if (var3 <= 0) {
      return var1;
    }
    if (var3 >= var4) {
      return var2;
    }
    var3 = l2i(lidiv(lshl(BigInt(var3), 16), BigInt(var4)));
    switch (var0) {
      case 1:
        let var9: number = var3;
        let var7: number = var2;
        var0 = var1;
        var3 = Engine.easeTable.length - 2;
        var4 = Math.imul(var9, var3) % 65536;
        var2 = idiv(Math.imul(var9, var3), 65536);
        return Engine.fixedMul(Engine.fixedMul(Engine.easeTable[var2 + 1], var4) + Engine.fixedMul(Engine.easeTable[var2], 65536 - var4), var0 - var7) + var7;
      default:
        let var8: number = var3;
        let var6: number = var2;
        return idiv(Math.imul(var1, 65536 - var8) + Math.imul(var6, var8), 65536);
    }
  }
  static cos(var0: number): number {
    if ((var0 = var0 % 512) < 0) {
      var0 += 512;
    }
    return Engine.cosTable[var0];
  }
  static sin(var0: number): number {
    return Engine.cos(var0 - 128);
  }
  static clamp(var0: number, var1: number): number {
    if (0 < var1) {
      if (var0 < 0) {
        return 0;
      } else {
        return var0 > var1 ? var1 : var0;
      }
    } else {
      return 0;
    }
  }
  static sign(var0: number): number {
    if (var0 < 0) {
      return (-1);
    } else {
      return var0 > 0 ? 1 : 0;
    }
  }
  private static fixedMul(var0: number, var1: number): number {
    return l2i(lshr(BigInt.asIntN(64, BigInt(var0) * BigInt(var1)), 16));
  }
  private static makeShortLE(var0: number, var1: number): number {
    return (var1 & 255) << 8 | var0 & 255;
  }
  static saveExists(var0: number): boolean {
    let var1: RecordStore = null;
    let var2: boolean = false;
    try {
      var1 = RecordStore.openRecordStore("Townsmen6" + jstr(var0), false);
      var2 = true;
    } catch (var9) {
    } finally {
      try {
        var1.closeRecordStore();
      } catch (var8) {
      }
    }
    return var2;
  }
  static deleteSave(var0: number): void {
    if (Engine.saveExists(var0)) {
      try {
        let var1: RecordStore = null;
        if ((var1 = RecordStore.openRecordStore("Townsmen6" + jstr(var0), false)).getNumRecords() === 1) {
          var1.deleteRecord(1);
        }
        var1.closeRecordStore();
        RecordStore.deleteRecordStore("Townsmen6" + jstr(var0));
      } catch (var2) {
      }
    }
  }
  static openSaveForRead(var0: number): DataInputStream {
    let var1: RecordStore = null;
    let var2: DataInputStream = null;
    let var3: Int8Array = null;
    let var9: boolean = false;
    label90: {
      try {
        var9 = true;
        if ((var3 = (var1 = RecordStore.openRecordStore("Townsmen6" + jstr(var0), false)).getRecord(1)) !== null) {
          if (var3.length >= 4) {
            if ((var3[0] << 8 | var3[1]) === var0) {
              var0 = (var3[2] & 255) << 8 | var3[3] & 255;
              if (var3.length === var0) {
                var2 = new DataInputStream(new ByteArrayInputStream(var3, 4, var0 - 4));
                var9 = false;
              } else {
                var9 = false;
              }
            } else {
              var9 = false;
            }
          } else {
            var9 = false;
          }
        } else {
          var9 = false;
        }
        break label90;
      } catch (var13) {
        var9 = false;
      } finally {
        if (var9) {
          try {
            if (var1 !== null) {
              var1.closeRecordStore();
            }
          } catch (var10) {
          }
        }
      }
      var2 = null;
      try {
        if (var1 !== null) {
          var1.closeRecordStore();
          return var2;
        }
      } catch (var11) {
      }
      return var2;
    }
    try {
      if (var1 !== null) {
        var1.closeRecordStore();
      }
    } catch (var12) {
    }
    return var2;
  }
  static beginSave(var0: number): DataOutputStream {
    (Engine.saveBuffer = new ByteArrayOutputStream()).write(var0 >> 8 & 255);
    Engine.saveBuffer.write(var0 & 255);
    Engine.saveBuffer.write(0);
    Engine.saveBuffer.write(0);
    return new DataOutputStream(Engine.saveBuffer);
  }
  static commitSave(): boolean {
    let var0: number = 0;
    if (Engine.saveBuffer === null) {
      return false;
    }
    try {
      if (Engine.saveBuffer.size() < 4) {
        return false;
      }
      let var1: Int8Array = null;
      let var2: number = (var1 = Engine.saveBuffer.toByteArray()).length;
      var0 = var1[0] << 8 | var1[1];
      var1[2] = (var2 >> 8) << 24 >> 24;
      var1[3] = (var2) << 24 >> 24;
      Engine.saveBuffer = null;
      return Engine.writeSaveRecord(var0, var1);
    } catch (var3) {
      return false;
    }
  }
  private static writeSaveRecord(var0: number, var1: Int8Array): boolean {
    let var2: RecordStore = null;
    let var3: boolean = true;
    let var4: boolean = false;
    try {
      if ((var2 = RecordStore.openRecordStore("Townsmen6" + jstr(var0), true)).getNumRecords() < 1) {
        var2.addRecord(var1, 0, 1);
        var4 = true;
      }
      if (var2.getSizeAvailable() < var1.length << 1) {
        var3 = false;
      } else {
        var2.setRecord(1, var1, 0, var1.length);
        var4 = false;
      }
    } catch (var6) {
      var3 = false;
    }
    if (var2 !== null) {
      try {
        var2.closeRecordStore();
        if (var4) {
          Engine.deleteSave((var0) << 16 >> 16);
        }
      } catch (var5) {
      }
    }
    return var3;
  }
  static initDemo(): void {
    try {
      Engine.demoTimeLimit = Engine.getAppPropertyInt("Glu-Demo-Time-Limit");
      Engine.demoGameLimit = Engine.getAppPropertyInt("Glu-Demo-Game-Limit");
      Engine.demoUrl = Engine.getAppProperty("Glu-Demo-URL");
      Engine.demoEnabled = Engine.getAppProperty("Glu-Demo-Enabled") === "true";
      if (Engine.demoUrl === null) {
        Engine.demoEnabled = false;
      } else {
        if (Engine.demoEnabled && Engine.demoGameLimit === 0 && Engine.demoTimeLimit === 0) {
          Engine.demoGameLimit = 1;
        }
        Engine.demoTimeLeftMs = Math.imul(Engine.demoTimeLimit, 1000);
        Engine.demoGamesLeft = Engine.demoGameLimit;
      }
    } catch (var0) {
      Engine.demoTimeLimit = 0;
      Engine.demoGameLimit = 0;
      Engine.demoEnabled = false;
    }
  }
  static setupDemoMenu(var0: Menu, var1: number): Menu {
    var0.leftSoftKeyY = Engine.screenHeight;
    var0.rightSoftKeyX = Engine.screenWidth;
    var0.rightSoftKeyY = Engine.screenHeight;
    if (var1 === 49) {
      let var4: Hashtable = null;
      (var4 = new Hashtable(2)).put("expTime", jstr(Engine.demoTimeLimit));
      var4.put("expLevel", jstr(Engine.demoGameLimit));
      let var10000: string = Engine.formatText(Engine.getText(44), var4);
      let var3: number = 0;
      let var2: number = Engine.addText(var10000, true);
      var1 = Engine.addText(Engine.formatText(Engine.getText(49), var4), true);
      var0.marginLeft = var0.marginTop = var0.marginBottom = var0.marginRight = 0;
      var3 = (0) << 24 >> 24;
      let var10001: Int32Array = Int32Array.of(102, 0, 0, 50, 17);
      var3++;
      var0.insertItem(var10001, 0);
      if (Engine.demoGameLimit > 0) {
        var10001 = Int32Array.of(109, 0, 0, 10);
        var3++;
        var0.insertItem(var10001, 1);
        var10001 = Int32Array.of(102, 0, 0, var2, 17);
        var3++;
        var0.insertItem(var10001, 2);
      }
      if (Engine.demoTimeLimit > 0) {
        var0.insertItem(Int32Array.of(109, 0, 0, 10), var3++);
        var0.insertItem(Int32Array.of(102, 0, 0, var1, 17), var3);
      }
    } else {
      var0.leftSoftKeyY = Engine.screenHeight;
      var0.rightSoftKeyX = Engine.screenWidth;
      var0.rightSoftKeyY = Engine.screenHeight;
      if (Engine.demoTimeLimit > 0) {
        Engine.initDemo();
      }
    }
    return var0;
  }
  static drawDemoBanner(var0: Graphics, var1: number): void {
    if (Engine.demoEnabled && var0 !== null && var1 === 2) {
      Engine.drawText(var0, Engine.screenWidth >> 1, idiv(Engine.screenHeight, 10), Engine.getText(50), 2, 17, 0, Engine.colors[38], 0);
    }
  }
  static drawMenuBackground(var0: Graphics): void {
    var0.setColor(8421504);
    Engine.drawHatch(var0, 0, 0, Engine.screenWidth, Engine.screenHeight);
  }
  static drawMenuFrame(var0: Graphics, var1: Menu): void {
    Engine.drawPanel(var0, 0, var1.marginTop - Engine.imageInfo[113][0], Engine.screenWidth, var1.viewHeight + Engine.imageInfo[113][0], 113);
  }
  static drawSoftkeyBar(var0: Graphics, var1: Menu): void {
    var0.setColor(0);
    var0.fillRect(0, Engine.screenHeight - Engine.getFontHeight(2), Engine.screenWidth, Engine.getFontHeight(2));
    Engine.drawText(var0, 0, var1.leftSoftKeyY, var1.menuId === 50 ? Engine.getText(46) : Engine.getText(48), 2, 36, 0, 16777215, 0);
    Engine.drawText(var0, var1.rightSoftKeyX, var1.rightSoftKeyY, var1.menuId === 50 ? Engine.getText(47) : Engine.getText(45), 2, 40, 0, 16777215, 0);
  }
  static tickDemoTimer(): void {
    if (Engine.demoEnabled && Engine.demoTimeLimit > 0 && (Engine.demoTimeLeftMs -= 50) < 0) {
      App.openMenu(50);
    }
  }
  static consumeDemoGame(): void {
    if (--Engine.demoGamesLeft <= 0) {
      App.openMenu(50);
    }
  }
  static isDemo(): boolean {
    return Engine.demoEnabled;
  }
  static isDemoPlayable(): boolean {
    return !Engine.demoEnabled || Engine.demoGamesLeft > 0 || Engine.demoTimeLeftMs > 0;
  }
  static isLevelInDemo(var0: number): boolean {
    return !Engine.demoEnabled || var0 < Engine.demoGameLimit;
  }
  static configureAi(var0: number, var1: number, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number): void {
    Engine.aiTargetTypes.clear();
    Engine.aiNextAttackTime = var0;
    Engine.aiAttackInterval = var1;
    Engine.aiReinforcePercent = var2;
    Engine.aiRazeChance = var5;
    Engine.aiAttackSize = var3;
    Engine.aiMaxAttackers = var4;
    Engine.aiRecruitsPerTick = var6;
    Engine.aiMaxPopulation = var7;
  }
  static addAiTargetType(var0: number, var1: number): void {
    for (let var2: number = 0; var2 < var1; var2++) {
      Engine.aiTargetTypes.add(var0);
      Engine.launchAiAttack();
    }
  }
  static updateAi(): void {
    if (Engine.aiNextAttackTime !== (-1)) {
      if (Game.day > Engine.aiNextAttackTime) {
        Engine.aiNextAttackTime = Game.day + Engine.aiAttackInterval;
        Engine.recruitAiTownsmen();
        Engine.launchAiAttack();
      }
    }
  }
  static recruitAiTownsmen(): void {
    let var0: number = 0;
    for (let var1: number = 0; var1 < Building.enemyCamps.size(); var1++) {
      let var2: Building = (Building.enemyCamps.elementAt(var1) as Building);
      var0 += GameData.getGarrisonCapacity(var2.buildingType, var2.level);
    }
    let var3: number = 0;
    while (Townsman.enemies.size() < Math.min(Engine.aiMaxPopulation, var0) && var3++ < Engine.aiRecruitsPerTick) {
      let var4: Townsman = null;
      if ((var4 = Townsman.create(4)).home !== null) {
        var4.setTile(var4.home.tileX, var4.home.tileY);
      }
    }
  }
  private static launchAiAttack(): void {
    let var0: Building = null;
    if (Engine.aiTargetTypes.size > 0) {
      var0 = Level.randomBuildingOfType(Engine.aiTargetTypes.get(Engine.randomInt(Engine.aiTargetTypes.size)), 0);
    }
    if (var0 === null) {
      var0 = Level.randomBuildingOfType(-1, 0);
    }
    if ((var0 = var0) !== null && Townsman.idleEnemies.size() > 0) {
      if (var0.battle === null) {
        var0.battle = new Battle(var0);
      }
      for (let var1: number = 0; var1 < Engine.aiAttackSize; var1++) {
        var0.battle.sendEnemy();
      }
      GameData.showUnderAttackMessage(var0);
    }
  }
  static balanceAiAttackers(var0: Battle): void {
    if (!Game.level.restoringSave) {
      let var1: number = 0;
      if (var0.soldierCount() + var0.propagandistCount() <= 0 && var0.building.owner === 1) {
        var1 = 0;
      } else {
        var1 = Math.min(Math.max(idiv(Math.imul(var0.soldierCount(), Engine.aiReinforcePercent), 100), Engine.aiAttackSize), 5);
        if (var0.building.owner === 1) {
          var1 = Math.max(GameData.getGarrisonCapacity(var0.building.buildingType, var0.building.level), var1);
        }
      }
      if ((var1 = var1 - var0.enemyCount()) > 0) {
        var1 = Math.min(Engine.aiMaxAttackers - var0.enemiesDeployed, var1);
        for (let var5: number = 0; var5 < var1; var5++) {
          var0.sendEnemy();
        }
      } else {
        if (var1 < 0) {
          for (let var2: number = 0; var2 < Math.abs(var1); var2++) {
            var0.withdrawEnemy();
          }
        }
      }
    }
  }
  static maybeRazeCaptured(var0: Building): void {
    if (Engine.randomInt(100) < Engine.aiRazeChance) {
      var0.demolish();
    }
  }
  static setupAiSettlementDefault(): void {
    Engine.setupAiSettlement(null, 0);
  }
  static setupAiSettlement(var0: MapEntity, var1: number): void {
    let var2: number = 0;
    if (Game.level.levelIndex !== (-1)) {
      var2 = Game.getDepartmentTroops(Game.level.levelIndex, false);
    } else {
      var2 = Engine.randomRange(Engine.aiMaxPopulation, Engine.aiMaxPopulation + 3);
    }
    let var3: number = 0;
    for (let var4: number = 0; var4 < Building.enemyCamps.size(); var4++) {
      let var5: Building = (Building.enemyCamps.elementAt(var4) as Building);
      var3 += GameData.getGarrisonCapacity(var5.buildingType, var5.level);
    }
    let var8: number = var2;
    if ((var2 = Math.max(Engine.aiMaxPopulation, var2) - var3) > 0) {
      while (var2 >= GameData.getGarrisonCapacity(14, 2) << 1) {
        Game.level.placeRandomlyNear(Building.create(14, 2, 1), var1, var0);
        var2 -= GameData.getGarrisonCapacity(14, 2);
      }
      while (var2 >= GameData.getGarrisonCapacity(14, 1)) {
        Game.level.placeRandomlyNear(Building.create(14, 1, 1), var1, var0);
        var2 -= GameData.getGarrisonCapacity(14, 1);
      }
      while (var2 > 0) {
        Game.level.placeRandomlyNear(Building.create(14, 0, 1), var1, var0);
        var2 -= GameData.getGarrisonCapacity(14, 0);
      }
    }
    Townsman.createMany(4, var8);
    for (let var9: number = 0; var9 < Townsman.enemies.size(); var9++) {
      let var6: Townsman = null;
      if ((var6 = Townsman.enemies.elementAt(var9) as Townsman).home !== null) {
        var6.setTile(var6.home.tileX, var6.home.tileY);
      }
    }
  }
  static assignAiHome(var0: Townsman): void {
    if (Building.enemyCamps.size() === 0) {
      var0.remove();
    } else {
      let var1: Building = null;
      let var2: number = 2147483647;
      for (let var3: number = 0; var3 < Building.enemyCamps.size(); var3++) {
        let var4: Building = null;
        let var5: number = 0;
        if ((var5 = (var4 = Building.enemyCamps.elementAt(var3) as Building).garrisonCount - GameData.getGarrisonCapacity(var4.buildingType, var4.level)) < var2) {
          var1 = var4;
          var2 = var5;
        }
      }
      var0.setHome(var1);
    }
  }
  static saveAi(var0: DataOutputStream): void {
    var0.writeInt(Engine.aiAttackInterval);
    var0.writeInt(Engine.aiNextAttackTime);
    var0.writeInt(Engine.aiReinforcePercent);
    var0.writeInt(Engine.aiAttackSize);
    var0.writeInt(Engine.aiMaxAttackers);
    var0.writeInt(Engine.aiRazeChance);
    var0.writeInt(Engine.aiRecruitsPerTick);
    var0.writeInt(Engine.aiMaxPopulation);
    var0.writeInt(Engine.aiTargetTypes.size);
    for (let var1: number = 0; var1 < Engine.aiTargetTypes.size; var1++) {
      var0.writeInt(Engine.aiTargetTypes.get(var1));
    }
    var0.writeInt(Townsman.enemies.size());
  }
  static loadAi(var0: DataInputStream): void {
    Engine.aiAttackInterval = var0.readInt();
    Engine.aiNextAttackTime = var0.readInt();
    Engine.aiReinforcePercent = var0.readInt();
    Engine.aiAttackSize = var0.readInt();
    Engine.aiMaxAttackers = var0.readInt();
    Engine.aiRazeChance = var0.readInt();
    Engine.aiRecruitsPerTick = var0.readInt();
    Engine.aiMaxPopulation = var0.readInt();
    let var1: number = var0.readInt();
    for (let var2: number = 0; var2 < var1; var2++) {
      Engine.aiTargetTypes.add(var0.readInt());
    }
    var1 = var0.readInt();
    for (let var4: number = 0; var4 < var1; var4++) {
      Townsman.create(4);
    }
  }
  static saveClip(var0: Graphics): void {
    Engine.savedClipX = var0.getClipX();
    Engine.savedClipY = var0.getClipY();
    Engine.savedClipWidth = var0.getClipWidth();
    Engine.savedClipHeight = var0.getClipHeight();
  }
  static restoreClip(var0: Graphics): void {
    var0.setClip(Engine.savedClipX, Engine.savedClipY, Engine.savedClipWidth, Engine.savedClipHeight);
  }
  static fillScreen(var0: Graphics, var1: number): void {
    var0.setColor(var1);
    var0.fillRect(0, 0, Engine.screenWidth, Engine.screenHeight);
  }
  static resetClip(var0: Graphics): void {
    var0.setClip(0, 0, Engine.screenWidth, Engine.screenHeight);
  }
  static drawPanel(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5: number): void {
    let var19: boolean = false;
    var4 = var4;
    var3 = var3;
    var2 = var2;
    var1 = var1;
    var0 = var0;
    let var6: number = 0;
    let var25: number = Engine.imageInfo[113][0];
    var6 = Engine.imageInfo[113][1];
    let var7: number = var1 + var3 - var25;
    let var8: number = var2 + var4 - var6;
    let var9: number = var1;
    let var10: number = var2;
    let var11: number = var0.getClipX();
    let var12: number = var0.getClipY();
    let var13: number = var0.getClipWidth();
    let var14: number = var11 + var13;
    let var15: number = var0.getClipHeight();
    let var16: number = var12 + var15;
    let var17: number = var11 >= var1 ? var11 : var1;
    let var18: number = var12 >= var2 ? var12 : var2;
    var14 = var14 >= var1 + var3 ? var3 : var3 - (var1 + var3 - var14);
    var16 = var16 >= var2 + var4 ? var4 : var4 - (var2 + var4 - var16);
    var0.setClip(var17, var18, var14, var16);
    Engine.drawSprite(var0, var1, var2, 113, 0);
    var0.setClip(var17, var18, var3 === var14 ? var3 - var25 : var3 - (var3 - var14), var4 === var16 ? var4 - var6 : var4 - (var4 - var16));
    var10 += var6;
    do {
      Engine.drawSprite(var0, var9, var10, 113, 16);
    } while ((var10 += var6) < var8);
    var0.setClip(var17, var18, var14, var16);
    Engine.drawSprite(var0, var9, var8, 113, 32);
    var9 += var25;
    do {
      Engine.drawSprite(var0, var9, var2, 113, 1);
      var0.setClip(var17, var18, var3 === var14 ? var3 - var25 : var3 - (var3 - var14), var4 === var16 ? var4 - var6 : var4 - (var4 - var16));
      var10 = var2 + var6;
      do {
        Engine.drawSprite(var0, var9, var10, 113, 17);
      } while ((var10 += var6) < var8);
      var0.setClip(var17, var18, var14, var16);
      Engine.drawSprite(var0, var9, var8, 113, 33);
    } while ((var9 += var25) < var7);
    var0.setClip(var17, var18, var14, var16);
    Engine.drawSprite(var0, var7, var2, 113, 2);
    var0.setClip(var17, var18, var14, var4 === var16 ? var4 - var6 : var4 - (var4 - var16));
    var10 = var2 + var6;
    do {
      Engine.drawSprite(var0, var7, var10, 113, 18);
    } while ((var10 += var6) < var8);
    var0.setClip(var17, var18, var14, var16);
    Engine.drawSprite(var0, var7, var8, 113, 34);
    var0.setClip(var11, var12, var13, var15);
  }
  static drawHorizontalBar(var0: Graphics, var1: number, var2: number, var3: number, var4: number): void {
    let var5: number = var4;
    let var8: number = Engine.imageInfo[var5][0];
    var3 = var1 + var3 - var8;
    let var6: number = var1 + var8;
    Engine.drawSprite(var0, var1, var2, var4, 0);
    do {
      Engine.drawSprite(var0, var6, var2, var4, 1);
    } while ((var6 += var8) < var3);
    Engine.drawSprite(var0, var3, var2, var4, 2);
  }
  static drawHatch(var0: Graphics, var1: number, var2: number, var3: number, var4: number): void {
    var1 = var4;
    var2 = var3 + (var3 & 1);
    while (true) {
      var2 -= 2;
      if (var2 < 0) {
        var2 = var4 + (var3 + var4 & 1);
        while (true) {
          var2 -= 2;
          if (var2 < 0) {
            return;
          }
          let var12: number = var3;
          let var13: number = var2;
          let var14: number = 0;
          let var15: number = 0;
          if ((var15 = var2 + var3) > var1) {
            var14 = 0 + (var15 - var1);
            var15 = var1;
          }
          var0.drawLine(var12, var13, var14, var15);
        }
      }
      let var5: number = var2;
      let var6: boolean = false;
      let var7: number = 0;
      let var8: number = var2;
      if (var2 > var1) {
        var7 = 0 + (var8 - var1);
        var8 = var1;
      }
      var0.drawLine(var5, 0, var7, var8);
    }
  }
  static getColor(var0: number): number {
    return Engine.colors[var0];
  }
  static getFont(var0: number): Font {
    return Engine.fonts !== null && var0 < Engine.fonts.length && var0 >= 0 ? Engine.fonts[var0] : Font.getDefaultFont();
  }
  private static setFont(var0: Graphics, var1: number): void {
    if (Engine.fonts !== null && var1 < Engine.fonts.length && var1 >= 0) {
      var0.setFont(Engine.fonts[var1]);
    } else {
      var0.setFont(Font.getDefaultFont());
    }
  }
  static stringWidth(var0: string, var1: Font): number {
    let var2: number = 0;
    let var3: number = var0.length;
    while (--var3 >= 0) {
      var2 += var1.charWidth(var0.charCodeAt(var3));
    }
    return var2;
  }
  static getFontHeight(var0: number): number {
    return Engine.fonts !== null && var0 < Engine.fonts.length && var0 >= 0 ? Engine.fontMetrics[var0][3] : Font.getDefaultFont().getHeight();
  }
  private static calibrateFonts(): void {
    let var0: number = Engine.fonts.length;
    let var1: Image = null;
    let var2: Graphics = null;
    let var3: Int32Array = null;
    for (let var4: number = 0; var4 < var0; var4++) {
      if (Engine.fontMetrics[var4][3] === (-1)) {
        let var5: number = Engine.fonts[0].getHeight() + 14;
        let var6: number = Engine.fonts[0].stringWidth("\u00c4g)") + 14;
        if (var1 === null) {
          var3 = new Int32Array(Math.imul(var5, var6));
          var2 = (var1 = Image.createImage(var6, var5)).getGraphics();
        }
        var2.setColor(16777215);
        var2.fillRect(0, 0, var6, var5);
        var2.setFont(Engine.fonts[var4]);
        var2.setColor(0);
        var2.drawString("\u00c4g)", 7, 7, 20);
        let var7: number = (-1);
        let var8: number = (-1);
        let var9: number = (-1);
        var1.getRGB(var3, 0, var6, 0, 0, var6, var5);
        var5 = var3[0] & 16777215;
        for (let var10: number = 1; var10 < var3.length; var10++) {
          let var11: number = idiv(var10, var6);
          let var12: number = var10 % var6;
          if ((var3[var10] & 16777215) !== var5) {
            if (var12 < var7 || var7 === (-1)) {
              var7 = var12;
            }
            if (var11 < var8 || var8 === (-1)) {
              var8 = var11;
            }
            if (var11 > var9 || var9 === (-1)) {
              var9 = var11;
            }
          }
        }
        let var15: number = var9 - var8;
        let var16: number = 0;
        if (var15 < Engine.fonts[var4].getHeight()) {
          var16 = idiv(Engine.fonts[var4].getHeight() - var15, 2);
          var15 += var16 << 1;
        }
        let var17: number = 7 - var7;
        var5 = 7 - var8 + var16;
        Engine.fontMetrics[var4][0] = Engine.fontMetrics[var4][0] + var17;
        Engine.fontMetrics[var4][1] = Engine.fontMetrics[var4][1] + var5;
        Engine.fontMetrics[var4][3] = var15 + 2;
      }
      Engine.fontMetrics[var4][3] = Engine.fontMetrics[var4][3] + Engine.fontMetrics[var4][2];
    }
    void 0;
  }
  static loadConfig(var0: string): void {
    let var17: InputStream = null;
    if ((var17 = Engine.openResource(var0)) !== null) {
      try {
        let var1: DataInputStream = null;
        let var2: number = (var1 = new DataInputStream(var17)).readShort();
        let var3: number = var1.readShort();
        if (var2 !== 18260 && var3 !== 1281) {
          return;
        }
        while ((var2 = var1.readShort()) !== (-1)) {
          var3 = var1.readShort();
          switch (var2) {
            case 16718:
              Engine.animations = new Array<Int16Array>(var2 = var1.readShort()).fill(null);
              for (let var31: number = 0; var31 < var2; var31++) {
                let var36: number = var1.readShort();
                let var38: Int16Array = Engine.animations[var31] = new Int16Array(var36 + 2);
                for (let var41: number = 0; var41 < var36 + 2; var41++) {
                  var38[var41] = var1.readShort();
                }
              }
              break;
            case 17231:
              Engine.colors = new Int32Array(var2 = var1.readShort());
              for (let var30: number = 0; var30 < var2; var30++) {
                Engine.colors[var30] = var1.readInt();
              }
              break;
            case 17998:
              Engine.fonts = new Array<Font>(var2 = var1.readShort()).fill(null);
              Engine.fontMetrics = newArray(var2, () => new Int32Array(4));
              for (let var29: number = 0; var29 < var2; var29++) {
                let var35: number = 0;
                if ((var35 = var1.readByte()) === (-1)) {
                  Engine.fonts[var29] = Font.getDefaultFont();
                } else {
                  Engine.fonts[var29] = Font.getFont(var35 & 96, var35 & 7, var35 & 24);
                }
                Engine.fontMetrics[var29][0] = var1.readByte();
                Engine.fontMetrics[var29][1] = var1.readByte();
                Engine.fontMetrics[var29][2] = var1.readByte();
                Engine.fontMetrics[var29][3] = var1.readByte();
              }
              Engine.calibrateFonts();
              break;
            case 18004:
              Engine.frames = new Int16Array(Math.imul(var2 = var1.readShort(), 7));
              for (let var28: number = 0; var28 < var2; var28++) {
                let var34: number = Math.imul(var28, 7);
                Engine.frames[var34 + 2] = (var1.readUnsignedByte()) << 16 >> 16;
                Engine.frames[var34 + 3] = (var1.readUnsignedByte()) << 16 >> 16;
                Engine.frames[var34] = (var1.readUnsignedByte()) << 16 >> 16;
                Engine.frames[var34 + 1] = (var1.readUnsignedByte()) << 16 >> 16;
                Engine.frames[var34 + 4] = var1.readByte();
                Engine.frames[var34 + 5] = var1.readByte();
                Engine.frames[var34 + 6] = var1.readByte();
              }
              break;
            case 18772:
              Engine.imageInfo = new Array<Int16Array>(var2 = var1.readShort()).fill(null);
              Engine.images = new Array<Image>(var2).fill(null);
              for (let var27: number = 0; var27 < var2; var27++) {
                let var32: number = 0;
                if ((var32 = var1.readByte()) !== (-1)) {
                  let var37: Int16Array = Engine.imageInfo[var27] = new Int16Array(12);
                  if (((var32 = (var32 << 8) << 16 >> 16) & 512) !== 0) {
                    let var39: number = var1.readShort();
                    arraycopy(Engine.imageInfo[var39], 0, var37, 0, var37.length);
                    var37[7] = var37[7] | var32;
                    var37[10] = var39;
                  } else {
                    let var40: number = var1.readByte();
                    let var7: number = var1.readByte();
                    var37[7] = (var32 | var40) << 16 >> 16;
                    var37[2] = (var7 >> 4 & 15) << 16 >> 16;
                    var37[3] = (var7 & 15) << 16 >> 16;
                    var37[4] = var1.readByte();
                    var37[5] = var1.readShort();
                    var37[6] = var1.readShort();
                    var37[8] = var1.readShort();
                    if ((var32 & 256) !== 0) {
                      var37[10] = var1.readShort();
                      var37[11] = var1.readByte();
                    }
                  }
                }
              }
              break;
            case 20556:
              Engine.palettes = new Array<Int32Array>(var2 = var1.readShort()).fill(null);
              for (let var26: number = 0; var26 < var2; var26++) {
                let var4: number = var1.readShort();
                let var5: Int32Array = Engine.palettes[var26] = new Int32Array(var4);
                for (let var6: number = 0; var6 < var4; var6++) {
                  var5[var6] = var1.readInt();
                }
              }
              break;
            default:
              var1.skip(BigInt(var3));
          }
        }
      } catch (var15) {
        return;
      } finally {
        try {
          var17.close();
        } catch (var14) {
        }
      }
    }
  }
  static setImageNeeded(var0: number, var1: boolean): void {
    let var2: Int16Array = null;
    if (var0 >= 0 && (var2 = Engine.imageInfo[var0]) !== null) {
      if (var1 && Engine.images[var0] === null && (var2[7] & 768) !== 0 && var2[10] !== var0) {
        let var3: number = var2[10];
        Engine.imageInfo[var3][9] = (Engine.imageInfo[var3][9] | 2) << 16 >> 16;
        Engine.images[var3] = null;
      }
      if (var1) {
        var2[9] = (var2[9] | 1) << 16 >> 16;
        return;
      }
      var2[9] = 0;
    }
  }
  static setImageGroupNeeded(var0: number, var1: boolean): void {
    let var2: number = Engine.imageInfo.length;
    while (--var2 >= 0) {
      let var3: Int16Array = null;
      if ((var3 = Engine.imageInfo[var2]) !== null && (var3[8] & var0) !== 0) {
        Engine.setImageNeeded(var2, var1);
      }
    }
  }
  static loadImages(var0: boolean): void {
    let var30: DataInputStream = null;
    let var1: Int8Array = null;
    let var2: Int8Array = null;
    let var3: Int32Array = null;
    let var4: number = (-1);
    let var5: number = 0;
    for (let var6: number = 0; var6 < Engine.images.length; var6++) {
      let var7: Int16Array = null;
      if ((var7 = Engine.imageInfo[var6]) !== null && var7[9] === 0) {
        Engine.images[var6] = null;
      }
    }
    void 0;
    try {
      var30 = new DataInputStream(Engine.openResource("/i"));
      for (let var31: number = 0; var31 < Engine.imageInfo.length; var31++) {
        let var32: Int16Array = null;
        if ((var32 = Engine.imageInfo[var31]) !== null) {
          let var8: number = var32[7];
          if (var32[9] !== 0 && Engine.images[var31] === null) {
            let var9: Image = null;
            try {
              if ((var8 & 512) !== 0 || (var8 & 256) !== 0 && var32[11] !== (-1)) {
                if ((var8 & 512) !== 0) {
                  var9 = Engine.images[var32[10]];
                } else {
                  if (var2 === null || var2.length < var1.length) {
                    var2 = new Int8Array(var1.length);
                  }
                  arraycopy(var1, 0, var2, 0, var5);
                  var8 = 0;
                  do {
                    if (++var8 > var5) {
                      var8 = -1;
                      break;
                    }
                  } while (var1[var8] !== 80 || var1[var8 + 1] !== 76 || var1[var8 + 2] !== 84 || var1[var8 + 3] !== 69);
                  if (var8 !== (-1)) {
                    let var10: number = var32[11] & 28672;
                    let var11: number = var32[11] & 4095;
                    let var12: number = var8 + 3 + ((var1[var8 - 4] & 255) << 24 | (var1[var8 - 3] & 255) << 16 | (var1[var8 - 2] & 255) << 8 | var1[var8 - 1] & 255);
                    let var16: number = var8 + 3;
                    for (let var17: number = 0; var16 < var12; var17++) {
                      let var14: number = 0;
                      var14 = -1;
                      let var13: number = 0;
                      let var18: number = 0;
                      let var19: number = 0;
                      let var15: number = (var18 = var1[++var16] & 255) << 16 | (var19 = var1[++var16] & 255) << 8 | (var13 = var1[++var16] & 255);
                      label325: switch (var10) {
                        case 0:
                          let var38: Int32Array = null;
                          switch ((var38 = Engine.palettes[var11])[0]) {
                            case 1:
                              let var47: number = 1;
                              while (true) {
                                if (var47 >= var38.length) {
                                  break label325;
                                }
                                if (var15 === var38[var47]) {
                                  var14 = var38[var47 + 1];
                                  break label325;
                                }
                                var47 = (var47 + 2) << 24 >> 24;
                              }
                            case 2:
                              var14 = var38[var17 + 1];
                            default:
                              break label325;
                          }
                        case 4096:
                          let var37: number = ((idiv(var18 + var19 + var13, 3)) << 24 >> 24);
                          var2[var16 - 2] = var37;
                          var2[var16 - 1] = var37;
                          var2[var16] = var37;
                          break;
                        case 8192:
                          var2[var16 - 2] = (255 - var18) << 24 >> 24;
                          var2[var16 - 1] = (255 - var19) << 24 >> 24;
                          var2[var16] = (255 - var13) << 24 >> 24;
                          break;
                        case 12288:
                          var2[var16 - 2] = (idiv(var18, 2) + idiv(Math.imul(17, var11 >> 8 & 15), 2)) << 24 >> 24;
                          var2[var16 - 1] = (idiv(var19, 2) + idiv(Math.imul(17, var11 >> 4 & 15), 2)) << 24 >> 24;
                          var2[var16] = (idiv(var13, 2) + idiv(Math.imul(17, var11 & 15), 2)) << 24 >> 24;
                      }
                      if (var14 !== (-1)) {
                        var2[var16 - 2] = (var14 >> 16) << 24 >> 24;
                        var2[var16 - 1] = (var14 >> 8) << 24 >> 24;
                        var2[var16] = (var14) << 24 >> 24;
                      }
                    }
                    if (var3 === null) {
                      var3 = new Int32Array(256);
                      let var43: bigint = 0n;
                      for (let var39: number = 0; var39 < 256; var39++) {
                        let var48: bigint = BigInt(var39);
                        for (let var40: number = 0; var40 < 8; var40++) {
                          if ((var48 & 1n) === 1n) {
                            var48 = 3988292384n ^ lshr(var48, 1);
                          } else {
                            var48 = lshr(var48, 1);
                          }
                        }
                        var3[var39] = l2i(var48);
                      }
                    }
                    var16 = -1;
                    for (let var46: number = var8; var46 <= var12; var46++) {
                      var16 = var3[(var16 ^ var2[var46]) & 255] ^ (var16 >>> 8 | 0);
                    }
                    var16 = l2i(BigInt(var16) ^ 4294967295n);
                    var2[var12 + 1] = (var16 >> 24) << 24 >> 24;
                    var2[var12 + 2] = (var16 >> 16) << 24 >> 24;
                    var2[var12 + 3] = (var16 >> 8) << 24 >> 24;
                    var2[var12 + 4] = (var16) << 24 >> 24;
                  }
                  var9 = Image.createImage(var2, 0, var5);
                }
              } else {
                while (var4 < var31) {
                  var4 = var30.readShort();
                  var5 = var30.readShort();
                  if (var4 < var31) {
                    var30.skip(BigInt(var5));
                  }
                }
                if (var4 === var31) {
                  if (var1 === null || var1.length < var5) {
                    var1 = new Int8Array(var5 > 10240 ? var5 : 10240);
                  }
                  var8 = 0;
                  while (var8 < var5) {
                    var8 += var30.read(var1, var8, var5 - var8);
                  }
                  var9 = Image.createImage(var1, 0, var5);
                }
              }
            } catch (var27) {
            }
            if (var9 !== null) {
              let var10002: number = var9.getWidth();
              var8 = var31;
              var32[0] = (idiv(var10002, Engine.imageInfo[var8][2])) << 16 >> 16;
              var10002 = var9.getHeight();
              var8 = var31;
              var32[1] = (idiv(var10002, Engine.imageInfo[var8][3])) << 16 >> 16;
            }
            Engine.images[var31] = var9;
          }
          App.setLoaderProgress(idiv(Math.imul(var31, 33), Engine.images.length) + 33);
        }
      }
      return;
    } catch (var28) {
    } finally {
      try {
        var30.close();
      } catch (var26) {
      }
    }
  }
  static isImageLoaded(var0: number): boolean {
    return Engine.images[var0] !== null;
  }
  static getCellWidth(var0: number): number {
    return Engine.imageInfo[var0][0];
  }
  static getCellHeight(var0: number): number {
    return Engine.imageInfo[var0][1];
  }
  static getImageInfo(var0: number, var1: number): number {
    return Engine.imageInfo[var0][var1];
  }
  private static frameIndex(var0: number): number {
    return (var0 & 16384) === 0 ? (-1) : var0 & 16383;
  }
  static frameForRow(var0: number): number {
    return 0 | var0 << 4;
  }
  static getFrameWidth(var0: number, var1: number): number {
    var1 = Engine.frameIndex(var1);
    let var2: number = 0;
    if (var1 === (-1) || (var2 = Engine.frames[Math.imul(var1, 7)]) === 0) {
      var2 = Engine.imageInfo[var0][0];
    }
    return var2;
  }
  static getFrameHeight(var0: number, var1: number): number {
    var1 = Engine.frameIndex(var1);
    let var2: number = 0;
    if (var1 === (-1) || (var2 = Engine.frames[Math.imul(var1, 7) + 1]) === 0) {
      var2 = Engine.imageInfo[var0][1];
    }
    return var2;
  }
  static getFrameOffsetY(var0: number, var1: number): number {
    var1 = Engine.frameIndex(var0);
    let var2: number = 0;
    if (var0 !== (-1) && var1 !== (-1) && Math.imul(var1, 7) + 5 < Engine.frames.length) {
      var2 = Engine.frames[Math.imul(var1, 7) + 5];
    }
    return var2;
  }
  static drawImage(var0: Graphics, var1: number, var2: number, var3: number): void {
    let var4: Image = null;
    if ((var4 = Engine.images[var3]) !== null) {
      let var5: Int16Array = Engine.imageInfo[var3];
      var0.drawImage(var4, var5[5] + var1, var5[6] + var2, var5[4]);
    }
  }
  static drawSprite(var0: Graphics, var1: number, var2: number, var3: number, var4: number): void {
    Engine.drawSpriteAnchored(var0, var1, var2, var3, var4, 0);
  }
  static drawSpriteAnchored(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5: number): void {
    if (var3 !== (-1)) {
      let var6: Image = null;
      if ((var6 = Engine.images[var3]) !== null && var4 !== (-1)) {
        let var14: Int16Array = Engine.imageInfo[var3];
        let var11: number = Engine.frameIndex(var4);
        if (var5 === 0) {
          var5 = var14[4];
        }
        let var7: number = 0;
        let var8: number = 0;
        let var9: number = 0;
        let var10: number = 0;
        let var16: number = 0;
        if (var11 !== (-1)) {
          var11 = Math.imul(var11, 7);
          var7 = Engine.frames[var11 + 2];
          var8 = Engine.frames[var11 + 3];
          var16 = Engine.frames[var11];
          var9 = Engine.frames[var11 + 1];
          var10 = Engine.frames[var11 + 6];
          var1 += Engine.frames[var11 + 4];
          var2 += Engine.frames[var11 + 5];
          if (var16 === 0) {
            var16 = var14[0];
            var9 = var14[1];
            var7 = Math.imul(var16, var7);
            var8 = Math.imul(var9, var8);
          }
        } else {
          let var19: number = 0;
          var7 = var4 & 15;
          var19 = var4 >> 4 & 15;
          var10 = var4 >> 8 & 15;
          var16 = var14[0];
          var9 = var14[1];
          var7 = Math.imul(var16, var7);
          var8 = Math.imul(var9, var19);
        }
        if (var5 !== 0) {
          if ((var5 & 1) !== 0) {
            var1 -= var16 >> 1;
          } else if ((var5 & 8) !== 0) {
            var1 -= var16;
          }
          if ((var5 & 2) !== 0) {
            var2 -= var9 >> 1;
          } else if ((var5 & 32) !== 0) {
            var2 -= var9;
          }
        }
        var1 += var14[5];
        var2 += var14[6];
        if (var1 > Engine.screenWidth || var2 > Engine.screenHeight || var1 + var16 < 0 || var2 + var9 < 0) {
          return;
        }
        var3 = var7;
        var5 = var8;
        var0.drawRegion(var6, var3, var5, var16, var9, var10, var1, var2, 20);
      }
    }
  }
  static drawText(var0: Graphics, var1: number, var2: number, var3: string, var4: number, var5: number, var6: number, var7: number, var8: number): void {
    if (var3 !== null) {
      let var9: Font = null;
      if (var4 === (-1)) {
        var9 = Font.getDefaultFont();
      } else {
        var9 = Engine.getFont(var4);
        var1 += Engine.fontMetrics[var4][0];
        var2 += Engine.fontMetrics[var4][1];
      }
      if ((var5 & 1) !== 0) {
        var1 -= Engine.stringWidth(var3, var9) >> 1;
      } else if ((var5 & 8) !== 0) {
        var1 -= Engine.stringWidth(var3, var9);
      }
      if ((var5 & 2) !== 0) {
        var2 -= Engine.getFontHeight(var4) >> 1;
      } else if ((var5 & 32) !== 0) {
        var2 -= Engine.getFontHeight(var4);
      }
      let var10000: Graphics = null;
      let var10001: string = null;
      let var10002: number = 0;
      let var10003: number = 0;
      label35: {
        Engine.setFont(var0, var4);
        switch (var6) {
          case 1:
            var1++;
            var2++;
            var0.setColor(var8);
            var0.drawString(var3, var1 - 1, var2 - 1, 20);
            var0.drawString(var3, var1 + 1, var2 - 1, 20);
            var0.drawString(var3, var1 + 1, var2 + 1, 20);
            var0.drawString(var3, var1 - 1, var2 + 1, 20);
            var0.drawString(var3, var1, var2 - 1, 20);
            var0.drawString(var3, var1, var2 + 1, 20);
            var0.drawString(var3, var1 - 1, var2, 20);
            var0.drawString(var3, var1 + 1, var2, 20);
            var0.setColor(var7);
            var10000 = var0;
            var10001 = var3;
            var10002 = var1;
            break;
          case 2:
            var0.setColor(var8);
            var0.drawString(var3, var1 + 1, var2 + 1, 20);
            var0.setColor(var7);
            var10000 = var0;
            var10001 = var3;
            var10002 = var1;
            break;
          case 3:
            var0.setColor(var7);
            var0.drawString(var3, var1 + 1, var2 + 1, 20);
            var0.setColor(var8);
            var10000 = var0;
            var10001 = var3;
            var10002 = var1;
            break;
          default:
            var0.setColor(var7);
            var10000 = var0;
            var10001 = var3;
            var10002 = var1;
            if (var6 === 0) {
              var10003 = var2 + 1;
              break label35;
            }
        }
        var10003 = var2;
      }
      var10000.drawString(var10001, var10002, var10003, 20);
    }
  }
  static drawNumber(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5: number): number {
    let var6: number = 0;
    let var12: number = Engine.imageInfo[114][0];
    var6 = Engine.imageInfo[114][1];
    let var7: number = -var12;
    let var8: number = 2;
    let var9: boolean = false;
    if (var3 < 0) {
      var3 = 0 - var3;
      var9 = true;
    }
    if ((var4 & 8) !== 0) {
      var1 += var7;
    } else {
      let var10: number = var3;
      let var11: number = 0;
      while ((var10 = idiv(var10, 10)) > 0) {
        var11 = (var11 + var12) << 16 >> 16;
      }
      if ((var4 & 4) !== 0) {
        var1 += var11;
      } else if ((var4 & 1) !== 0) {
        var1 += idiv(var11 - var12, 2);
      }
    }
    if ((var4 & 32) !== 0) {
      var2 -= var6;
    } else if ((var4 & 2) !== 0) {
      var2 -= idiv(var6, 2);
    }
    Engine.setFont(var0, 1);
    do {
      let var14: number = var3 % 10;
      var3 = idiv(var3, 10);
      var8 = (var8 + var12) << 16 >> 16;
      Engine.drawSpriteAnchored(var0, var1, var2, 114, var14, 20);
      var1 += var7;
    } while (var3 > 0);
    if (var9) {
      Engine.drawSpriteAnchored(var0, var1, var2, 114, 10, 20);
      var8 = (var8 + var12) << 16 >> 16;
    }
    return var8;
  }
  static initTicker(var0: Int32Array, var1: string, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number): Int32Array {
    if (var0 === null) {
      var0 = new Int32Array(12);
    }
    var0[0] = var2;
    var0[1] = var3;
    var0[2] = var4;
    var0[3] = var5 > 0 ? var5 : Engine.getFontHeight(2) + 2;
    var0[4] = Engine.stringWidth(var1, Engine.getFont(2));
    var0[4] += 2;
    var0[5] = Engine.getFontHeight(2);
    var0[6] = 0;
    var0[7] = var0[4] > var4 ? 2 : 0;
    var0[8] = var0[4] > var4 ? var6 & (-10) : var6;
    var0[9] = 1;
    var0[10] = var7;
    var0[11] = var8;
    if (var0[4] <= var0[2]) {
      if ((var0[8] & 1) !== 0) {
        var0[6] = -(idiv(var0[2], 2));
      }
      if ((var0[8] & 8) !== 0) {
        var0[6] = -var0[2];
      }
    }
    return var0;
  }
  static drawTicker(var0: Graphics, var1: Int32Array, var2: string, var3: number): void {
    var3 = var1[0];
    let var4: number = var1[1];
    let var5: number = var1[2];
    let var6: number = var1[3];
    let var7: number = var1[6];
    let var8: number = var3;
    let var9: number = var4;
    if ((var1[8] & 2) !== 0) {
      var9 -= idiv(var6, 2);
    }
    var9 = Math.max(var0.getClipY(), var9);
    let var10: number = var0.getClipY() + var0.getClipHeight();
    let var11: number = var0.getClipHeight() - var0.getClipY();
    var11 = Math.max(var6, var11);
    if (var9 + var11 > var10) {
      var11 = var10 - var9;
    }
    var0.setClip(var8, var9, var5, var11);
    Engine.drawText(var0, var3 - var7, var4, var2, 2, var1[8], var1[9], var1[10], var1[11]);
    if (!App.isPaused() && (var7 += var1[7]) > var1[4]) {
      var7 = -var1[2];
    }
    var1[6] = var7;
  }
  static isSpritePixelOpaque(var0: number, var1: number, var2: number, var3: number): boolean {
    if (var0 === (-1)) {
      return false;
    }
    let var4: Image = null;
    if ((var4 = Engine.images[var0]) !== null && var1 !== (-1)) {
      let var10: Int16Array = Engine.imageInfo[var0];
      let var8: number = Engine.frameIndex(var1);
      let var9: number = var10[4];
      let var5: number = 0;
      let var6: number = 0;
      let var7: number = 0;
      if (var8 !== (-1)) {
        var8 = Math.imul(var8, 7);
        var5 = Engine.frames[var8 + 2];
        var1 = Engine.frames[var8 + 3];
        var6 = Engine.frames[var8];
        var7 = Engine.frames[var8 + 1];
        var2 += Engine.frames[var8 + 4];
        var3 += Engine.frames[var8 + 5];
        if (var6 === 0) {
          var6 = var10[0];
          var7 = var10[1];
          var5 = Math.imul(var6, var5);
          var1 = Math.imul(var7, var1);
        }
      } else {
        let var20: boolean = false;
        var5 = var1 & 15;
        var1 = var1 >> 4 & 15;
        var6 = var10[0];
        var7 = var10[1];
        var5 = Math.imul(var6, var5);
        var1 = Math.imul(var7, var1);
      }
      if (var9 !== 0) {
        if ((var9 & 1) !== 0) {
          var2 -= var6 >> 1;
        } else if ((var9 & 8) !== 0) {
          var2 -= var6;
        }
        if ((var9 & 2) !== 0) {
          var3 -= var7 >> 1;
        } else if ((var9 & 32) !== 0) {
          var3 -= var7;
        }
      }
      var2 += var10[5];
      var3 += var10[6];
      var2 = -var2;
      var3 = -var3;
      var2 += var5;
      var3 += var1;
      if (var2 >= var5 && var3 >= var1 && var2 < var5 + var6 && var3 < var1 + var7) {
        var4.getRGB(Engine.pixelBuffer, 0, 1, var2, var3, 1, 1);
        return (Engine.pixelBuffer[0] & (-16777216)) === (-16777216);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  static getText(var0: number): string {
    let var1: number = var0 & 65535;
    let var2: number = 0;
    if ((var2 = (var0 & 8323072) >> 16) === 5) {
      if (var1 >= 0 && var1 < Engine.dynamicTexts.size()) {
        let var5: string = (Engine.dynamicTexts.elementAt(var1) as string);
        if ((var0 & 8388608) !== 0) {
          let var3: number = 0;
          var2 = (var3 = var0) & 65535;
          if ((var3 & 8323072) >> 16 === 5 && var2 >= 0 && var2 < Engine.dynamicTexts.size()) {
            Engine.dynamicTexts.setElementAt(null, var2);
          }
        }
        return var5;
      } else {
        return "null";
      }
    } else {
      if (var2 < 0 || var2 >= 5) {
        return "Illegal macrogroup (" + jstr(var2) + ")";
      }
      if (Engine.textGroups[var2] === null) {
        if (App.textGroupPreload[var2] === 4) {
          Engine.loadTextGroup(var2);
          return Engine.getText(var0);
        } else {
          return "";
        }
      } else if (var1 >= 0 && var1 < Engine.textGroups[var2].length) {
        let var4: string = null;
        return (var4 = Engine.textGroups[var2][var1]) === null ? "null" : var4;
      } else {
        return "";
      }
    }
  }
  static getLanguageNames(): Vector {
    return Engine.languageNames;
  }
  static selectLanguage(var0: number): void {
    if (Engine.languageCodes !== null && !Engine.languageCodes.isEmpty() && Engine.languageCodes.size() > var0) {
      Engine.languageCode = Engine.languageCodes.elementAt(var0) as string;
    } else {
      Engine.languageCode = "EN";
    }
  }
  static loadLanguageList(): void {
    let var0: DataInputStream = null;
    try {
      let var1: Int8Array = null;
      var0 = new DataInputStream(Engine.openResource("/ldf"));
      Engine.languageCodes = new Vector();
      Engine.languageNames = new Vector();
      var0.readByte();
      switch (Engine.languageListFormat = var0.readByte()) {
        case 1:
          let var10000: number = var0.read();
          let var31: boolean = false;
          var1 = new Int8Array(var10000);
          var0.read(var1);
          Engine.languageCodes.addElement(bytesToString(var1));
          break;
        case 2:
          let var2: number = 0;
          while ((var2 = var0.read()) !== (-1)) {
            var1 = new Int8Array(var2);
            var0.read(var1);
            Engine.languageCodes.addElement(bytesToString(var1));
            Engine.languageNames.addElement(var0.readUTF());
            Engine.languageNames.lastElement();
          }
      }
      Engine.languageCode = Engine.languageCodes.elementAt(0) as string;
    } catch (var25) {
      Engine.languageCode = "EN";
    } finally {
      try {
        var0.close();
      } catch (var22) {
      }
    }
    if (Engine.languageListFormat === 2) {
      let var29: InputStream = null;
      for (let var32: number = Engine.languageCodes.size() - 1; var32 >= 0; var32--) {
        try {
          if ((var29 = Engine.openResource("/" + (Engine.languageCodes.elementAt(var32) as string) + "." + App.textGroupNames[0] + ".lng")) === null) {
            Engine.languageCodes.removeElementAt(var32);
            Engine.languageNames.removeElementAt(var32);
          }
        } catch (var23) {
          Engine.languageCodes.elementAt(var32);
          Engine.languageCodes.removeElementAt(var32);
          Engine.languageNames.removeElementAt(var32);
        } finally {
          try {
            var29.close();
          } catch (var21) {
          }
        }
      }
      if ((Engine.languageCode = Engine.getAppProperty("Glu-Locale")) !== null) {
        Engine.languageCode = Engine.languageCode.toUpperCase();
      }
      if (Engine.languageCode !== null) {
        let var33: number = Engine.languageCodes.size();
        while (--var33 >= 0) {
          if (!(Engine.languageCode === Engine.languageCodes.elementAt(var33))) {
            Engine.languageCodes.removeElementAt(var33);
            Engine.languageNames.removeElementAt(var33);
          }
        }
      }
      Engine.languageCode = Engine.languageCodes.elementAt(0) as string;
    }
  }
  static loadTexts(): void {
    if (Engine.languageListFormat !== 0) {
      Engine.textGroups = new Array<string[]>(5).fill(null);
      Engine.updateTextGroups();
      if (Engine.keyNames === null) {
        Engine.keyNames = new Hashtable(App.keyMacroTextIds.length);
      }
      for (let var0: number = 0; var0 < App.keyMacroNames.length; var0++) {
        let var1: StringBuffer = new StringBuffer();
        for (let var2: number = 0; var2 < App.keyMacroTextIds[var0].length; var2++) {
          var1 = var1.append(Engine.getText(App.keyMacroTextIds[var0][var2]));
          if (var2 + 1 < App.keyMacroTextIds[var0].length) {
            var1 = var1.append(", ");
          }
        }
        Engine.keyNames.put(App.keyMacroNames[var0], var1.toString());
      }
    }
  }
  static updateTextGroups(): void {
    if (Engine.textGroups !== null) {
      for (let var0: number = 0; var0 < 5; var0++) {
        let var1: boolean = (0 & 1 << var0) !== 0;
        if (Engine.textGroups[var0] === null) {
          if (var1 && App.textGroupPreload[var0] !== 0 || App.textGroupPreload[var0] === 1) {
            Engine.loadTextGroup(var0);
          }
        } else if (!var1 && App.textGroupPreload[var0] !== 1) {
          Engine.textGroups[var0] = null;
        }
      }
    }
  }
  private static loadTextGroup(var0: number): void {
    Engine.textGroups[var0] = Engine.readLngFile("/" + Engine.languageCode + "." + App.textGroupNames[var0] + ".lng");
  }
  private static readLngFile(var0: string): string[] {
    let var1: string[] = null;
    let var2: DataInputStream = null;
    try {
      (var2 = new DataInputStream(Engine.openResource(var0))).read();
      var2.read();
      let var16: number = var2.read();
      let var3: number = 0;
      let var4: Int32Array = new Int32Array((var3 = Engine.makeShortLE(var2.read(), var2.read())) + 1);
      var1 = new Array<string>(var3).fill(null);
      for (let var5: number = 0; var5 < var3 + 1; var5++) {
        var4[var5] = Engine.makeShortLE(var2.read(), var2.read());
      }
      for (let var17: number = 0; var17 < var3; var17++) {
        let var6: number = 0;
        let var7: Int8Array = new Int8Array(var6 = var4[var17 + 1] - var4[var17]);
        var2.read(var7, 0, var6);
        var1[var17] = Engine.decodeString(var7, var6, var16);
      }
    } catch (var14) {
    } finally {
      try {
        var2.close();
      } catch (var13) {
      }
    }
    return var1;
  }
  private static decodeString(var0: Int8Array, var1: number, var2: number): string {
    let var3: string = null;
    switch (var2) {
      case 0:
        var3 = bytesToString(var0);
        break;
      case 1:
        let var6: StringBuffer = new StringBuffer(idiv(var1, 2));
        for (let var7: number = 0; var7 < var1 - 1; var7 = (var7 + 2) << 24 >> 24) {
          var6 = var6.append(charStr((Engine.makeShortLE(var0[var7 + 1], var0[var7])) & 65535));
        }
        var3 = var6.toString();
        break;
      case 2:
        let var5: Int8Array = null;
        (var5 = new Int8Array(var0.length + 2))[0] = (var1 >>> 8 | 0) << 24 >> 24;
        var5[1] = (var1) << 24 >> 24;
        arraycopy(var0, 0, var5, 2, var1);
        try {
          var3 = new DataInputStream(new ByteArrayInputStream(var5)).readUTF();
        } catch (var4) {
        }
    }
    return replaceChar(var3, 13, 10);
  }
  static wrapText(var0: string, var1: Font, var2: number): string[] {
    let var14: Uint16Array = toCharArray(var0);
    let var3: number = 0;
    let var4: number = 0;
    let var5: number = 0;
    let var6: boolean = false;
    let var7: boolean = false;
    let var8: boolean = false;
    let var9: boolean = false;
    let var10: Vector = new Vector();
    let var11: StringBuffer = new StringBuffer();
    let var12: StringBuffer = new StringBuffer();
    while (var3 < var14.length) {
      if (var6) {
        var6 = false;
      } else {
        let var13: number = 0;
        switch (var14[var3]) {
          case 10:
            var11 = var11.append(jstr(var12));
            var10.addElement(var11.toString());
            var11 = var11.delete(0, var11.length());
            var12 = var12.delete(0, var12.length());
            var5 = 0;
            var4 = 0;
            var7 = false;
            var8 = false;
            var9 = false;
            var3++;
            continue;
          case 92:
            var6 = true;
            var3++;
            continue;
          case 124:
            var13 = var1.charWidth(45);
            if (var12.length() > 0) {
              if (var5 + var4 + var13 <= var2) {
                var11 = var11.append(jstr(var12));
                var5 += var4;
                var12 = var12.delete(0, var12.length());
                var4 = 0;
                var9 = true;
              } else if (var9) {
                var11 = var11.append(charStr(45));
                var10.addElement(var11.toString());
                var11.delete(0, var11.length());
                var5 = 0;
                var9 = false;
                continue;
              }
            }
            var3++;
            continue;
          default:
            var13 = 0;
        }
        while (var13 < Engine.spaceChars.length) {
          if (var14[var3] === Engine.spaceChars[var13]) {
            var7 = true;
            break;
          }
          var13++;
        }
        for (let var18: number = 0; var18 < Engine.breakChars.length; var18++) {
          if (var14[var3] === Engine.breakChars[var18]) {
            var8 = true;
            break;
          }
        }
      }
      let var19: number = var1.charWidth(var14[var3]);
      if (var5 + var4 + var19 > var2) {
        if (var7) {
          var11 = var11.append(jstr(var12));
          var10.addElement(var11.toString());
          var11.delete(0, var11.length());
          var12.delete(0, var12.length());
          var4 = 0;
          var5 = 0;
          var7 = false;
          var8 = false;
          var9 = false;
          var3++;
          continue;
        }
        if (var9 && (!var8 || var12.length() > 0)) {
          var11 = var11.append(charStr(45));
          var10.addElement(var11.toString());
          var11.delete(0, var11.length());
          var5 = 0;
          var9 = false;
          continue;
        }
        if (var4 + var19 <= var2) {
          var10.addElement(var11.toString());
          var11.delete(0, var11.length());
          var5 = 0;
        } else {
          if (var11.length() > 0) {
            var10.addElement(var11.toString());
            var11.delete(0, var11.length());
            var5 = 0;
          }
          if (var12.length() > 0) {
            var11 = var11.append(jstr(var12));
            var10.addElement(var11.toString());
            var11.delete(0, var11.length());
            var12.delete(0, var12.length());
            var5 = 0;
            var4 = 0;
          }
        }
      }
      var12 = var12.append(charStr(var14[var3]));
      var4 += var1.charWidth(var14[var3]);
      if (var8 || var7) {
        var11 = var11.append(jstr(var12));
        var5 += var4;
        var12.delete(0, var12.length());
        var4 = 0;
        var7 = false;
        var8 = false;
        var9 = false;
      }
      var3++;
    }
    if (var11.length() + var12.length() > 0) {
      var11 = var11.append(jstr(var12));
      var10.addElement(var11.toString());
    }
    let var15: string[] = new Array<string>(var10.size()).fill(null);
    var10.copyInto(var15);
    return var15;
  }
  static getKeyNames(): Hashtable {
    return Engine.keyNames;
  }
  static formatText(var0: string, var1: Hashtable): string {
    if (var0.indexOf(charStr(123)) !== (-1)) {
      let var2: StringBuffer = new StringBuffer(var0);
      let var3: boolean = false;
      let var4: number = var2.length();
      while (--var4 >= 0) {
        if (var2.charAt(var4) === 123) {
          let var5: number = var2.length();
          for (let var6: number = var4; var6 < var5; var6++) {
            if (var2.charAt(var6) === 125) {
              let var7: string = var0.substring(var4 + 1, var6);
              let var8: string = null;
              if ((var8 = var1.get(var7) as string) !== null) {
                var2 = var2.delete(var4, var6 + 1).insert(var4, var8);
                var3 = true;
              }
              break;
            }
          }
        }
      }
      if (var3) {
        var0 = var2.toString();
      }
    }
    return var0;
  }
  static splitPlaceholders(var0: string): string[] {
    let var1: number = 0;
    let var2: Vector = new Vector();
    var1 = 0;
    let var3: number = 0;
    if ((var3 = var0.indexOf(charStr(125), 0)) !== (-1)) {
      do {
        let var4: number = var0.indexOf(charStr(123), var1);
        var2.addElement(var0.substring(var1, var4));
        var2.addElement(var0.substring(var4, var3 + 1));
        var1 = var3 + 1;
      } while ((var3 = var0.indexOf(charStr(125), var1)) !== (-1));
      var2.addElement(var0.substring(var1, var0.length));
      let var6: string[] = new Array<string>(var2.size()).fill(null);
      let var8: number = 0;
      do {
        var6[var8++] = var2.firstElement() as string;
        var2.removeElementAt(0);
      } while (!var2.isEmpty());
      return var6;
    } else {
      let var9: string[] = null;
      (var9 = new Array<string>(1).fill(null))[0] = var0;
      return var9;
    }
  }
  static addTempText(var0: string): number {
    return Engine.addText(var0, true);
  }
  static addText(var0: string, var1: boolean): number {
    let var1i: number = var1 ? 8388608 : 0;
    let var2: number = Engine.dynamicTexts.size();
    for (let var3: number = 0; var3 < var2; var3++) {
      if (Engine.dynamicTexts.elementAt(var3) === null) {
        Engine.dynamicTexts.setElementAt(var0, var3);
        return 327680 | var1i | var3;
      }
    }
    Engine.dynamicTexts.addElement(var0);
    return 327680 | var1i | var2;
  }
  static method_439(): void {
    App.getSetting(7);
  }
  static openUrl(var0: string): void {
    let var1: boolean = false;
    if (var0 !== null && var0.length > 0) {
      try {
        App.instance.platformRequest(var0);
        var1 = true;
      } catch (var2) {
        var1 = false;
      }
    }
    if (var1) {
      App.dispatchCommand(4100, 0);
    }
  }
  static loadSoundTable(): void {
    try {
      let var0: DataInputStream = null;
      Engine.soundTable = new Int32Array(Math.imul(Engine.soundCount = (var0 = new DataInputStream(Engine.openResource("/st"))).readShort(), 11));
      for (let var1: number = 0; var1 < Engine.soundCount; var1++) {
        let var2: number = Math.imul(var1, 11);
        if ((Engine.soundTable[var2 + 1] = var0.readByte()) !== (-1)) {
          Engine.soundTable[var2 + 2] = var0.readByte();
          Engine.soundTable[var2 + 3] = var0.readByte();
          Engine.soundTable[var2 + 4] = var0.readByte();
          Engine.soundTable[var2 + 5] = var0.readByte();
          Engine.soundTable[var2 + 6] = var0.readInt();
          Engine.soundTable[var2 + 7] = var0.readByte();
          Engine.soundTable[var2 + 9] = 0;
          Engine.soundTable[var2] = -1;
          Engine.soundTable[var2 + 10] = var0.readByte();
        } else {
          Engine.soundTable[var2 + 1] = 0;
          Engine.soundTable[var2 + 2] = -1;
          Engine.soundTable[var2 + 3] = 0;
          Engine.soundTable[var2 + 4] = -1;
          Engine.soundTable[var2 + 5] = -1;
          Engine.soundTable[var2 + 6] = -1;
          Engine.soundTable[var2 + 7] = -1;
          Engine.soundTable[var2 + 9] = 0;
          Engine.soundTable[var2] = -1;
          Engine.soundTable[var2 + 10] = -1;
        }
      }
      var0.close();
    } catch (var3) {
    }
  }
  static initSoundPlayer(): void {
    try {
      Engine.soundPlayer = classForName("SoundPlayer").newInstance() as SoundPlayer;
      if (Engine.soundPackStream !== null) {
        Engine.soundPackStream.close();
        Engine.soundPackStream = null;
      }
    } catch (var0) {
    }
  }
  static openSoundStream(var0: number): InputStream {
    let var1: ByteArrayInputStream = null;
    try {
      let var2: number = (-1);
      let var3: Int8Array = null;
      if (Engine.soundPackStream === null) {
        Engine.soundPackStream = new DataInputStream(Engine.openResource("/s"));
        Engine.soundPackPosition = -1;
      }
      while (Engine.soundPackPosition < var0) {
        Engine.soundPackPosition = Engine.soundPackStream.readShort();
        var2 = Engine.soundPackStream.readShort();
        if (Engine.soundPackPosition < var0) {
          Engine.soundPackStream.skip(BigInt(var2));
        }
      }
      if (Engine.soundPackPosition === var0) {
        var3 = new Int8Array(var2);
        var0 = 0;
        while (var0 < var2) {
          var0 += Engine.soundPackStream.read(var3, var0, var2 - var0);
        }
        var1 = new ByteArrayInputStream(var3);
      }
    } catch (var4) {
    }
    return var1;
  }
  static getSoundPriority(var0: number): number {
    return var0 < 0 ? 1 : Engine.soundTable[Math.imul(var0, 11) + 3];
  }
  static playMusic(var0: number): void {
    if (Engine.playingMusicGroup === var0) {
      Engine.musicGroup = var0;
    } else {
      if (Engine.musicGroup !== var0) {
        Engine.stopAllSounds();
        Engine.musicGroup = var0;
        if (var0 === (-1)) {
          return;
        }
        if (App.getSetting(4) > 0 || App.getSetting(1) !== 0 || App.getSetting(3) !== 0) {
          Engine.playRandomInGroup(Engine.musicGroup);
        }
      }
    }
  }
  static getMusicGroup(): number {
    return Engine.musicGroup;
  }
  static playSound(var0: number): void {
    try {
      if (Engine.soundPlayer !== null) {
        let var1: number = Math.imul(var0, 11);
        if (Engine.soundTable[var1 + 10] !== (-1)) {
          var0 = Engine.soundTable[var1 + 10];
        }
        if (Engine.soundTable[Math.imul(var0, 11) + 2] === (-1)) {
          return;
        }
        if (Engine.soundTable[var1 + 7] === 4 && App.getSetting(4) <= 0) {
          return;
        }
        if (Engine.soundTable[var1 + 7] === 5 && App.getSetting(5) <= 0) {
          return;
        }
        if (Engine.soundTable[var1] === 0) {
          return;
        }
        let var2: number = Engine.soundTable[var1 + 3];
        for (let var3: number = 0; var3 < Engine.soundCount; var3++) {
          if (Engine.soundTable[Math.imul(var3, 11)] === 0) {
            let var4: number = 0;
            if ((var4 = Engine.soundTable[Math.imul(var3, 11) + 3]) >= var2) {
              return;
            }
            if (var4 < var2) {
              Engine.stopSound(var3);
            }
          }
        }
        Engine.soundPlayer.loadPlayer(var0);
        SoundPlayer.startPlayer(var0);
        if (Engine.soundPackStream !== null) {
          Engine.soundPackStream.close();
          Engine.soundPackStream = null;
        }
        Engine.playingMusicGroup = Engine.soundTable[var1 + 4];
      }
    } catch (var5) {
    }
  }
  static playRandomInGroup(var0: number): void {
    let var1: number = 0;
    for (let var2: number = 0; var2 < Engine.soundCount; var2++) {
      if (Engine.soundTable[Math.imul(var2, 11) + 4] === var0) {
        var1++;
      }
    }
    if (var1 > 0) {
      let var5: number = Engine.randomInt(var1);
      var1 = 0;
      for (let var3: number = 0; var3 < Engine.soundCount; var3++) {
        if (Engine.soundTable[Math.imul(var3, 11) + 4] === var0) {
          if (var1 === var5) {
            Engine.playSound(var3);
            return;
          }
          var1++;
        }
      }
    }
  }
  static stopSound(var0: number): void {
    if (Engine.soundPlayer !== null) {
      if (Engine.soundTable[Math.imul(var0, 11) + 10] !== (-1)) {
        var0 = Engine.soundTable[Math.imul(var0, 11) + 10];
      }
      Engine.soundPlayer.stopPlayer(var0);
      Engine.playingMusicGroup = -1;
    }
  }
  static stopAllSounds(): void {
    if (Engine.soundPlayer !== null) {
      for (let var0: number = 0; var0 < Engine.soundCount; var0++) {
        if (Engine.soundTable[Math.imul(var0, 11)] === 0) {
          Engine.soundPlayer.stopPlayer(var0);
        }
      }
      Engine.playingMusicGroup = -1;
      Engine.musicGroup = -1;
    }
  }
  static pauseSounds(): void {
    try {
      if (Engine.soundPlayer !== null) {
        SoundPlayer.pauseAll();
      }
    } catch (var0) {
    }
  }
  static resumeSounds(): void {
    try {
      if (Engine.soundPlayer !== null) {
        SoundPlayer.resumeAll();
      }
    } catch (var0) {
    }
  }
  static preloadSoundGroup(var0: number): void {
    let var1: number = 0;
    if (var0 >= 0) {
      for (let var2: number = 0; var2 < Engine.soundCount; var2++) {
        var1 = Math.imul(var2, 11);
        if (Engine.soundTable[var1 + 4] === var0) {
          Engine.preloadSound(var2);
        }
      }
    }
  }
  static preloadSound(var0: number): void {
    if ((var0 = var0) >= 0 && var0 < Engine.soundCount) {
      var0 = Math.imul(var0, 11);
      if (Engine.soundTable[var0 + 10] === (-1) && (Engine.soundTable[var0 + 1] & 1) !== 0) {
        Engine.soundTable[var0 + 9] = 1;
      }
    }
  }
  static applySoundPreloads(): void {
    try {
      Engine.soundPlayer.syncPreloadedPlayers();
      if (Engine.soundPackStream !== null) {
        Engine.soundPackStream.close();
        Engine.soundPackStream = null;
      }
    } catch (var0) {
    }
  }
  static refreshMusic(): void {
    SoundPlayer.updateMusicVolume();
  }
  static applyVolumeSetting(var0: number, var1: number): void {
    SoundPlayer.previewVolume(var0, var1);
  }
  static onSoundEnd(var0: number): void {
    let var1: number = Math.imul(var0, 11);
    Engine.stopSound(var0);
    if ((Engine.soundTable[var1 + 1] & 8) !== 0) {
      let var2: number = 0;
      if ((var2 = Engine.soundTable[var1 + 4]) !== (-1)) {
        Engine.playRandomInGroup(var2);
      } else {
        Engine.playSound(var0);
      }
    }
    if (Engine.soundTable[var1 + 5] !== (-1)) {
      Engine.playSound(Engine.soundTable[var1 + 5]);
    }
  }
}
