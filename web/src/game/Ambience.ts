// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { idiv } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { IntList } from "./IntList";
import { Game } from "./Game";
import { Engine } from "./Engine";
import { App } from "./App";
import { Building } from "./Building";
import { GameUi } from "./GameUi";

export class Ambience {
  private static flashShown: boolean = false;
  private static nextLightningTime: number = 0;
  private static lightningDuration: number = 0;
  static skippingTime: boolean = false;
  private static queuedSounds: IntList = new IntList().$init2();
  private static queuedSoundTimes: IntList = new IntList().$init2();
  private static nextQueueCheck: number = 0;
  private static nextAmbientCheck: number = 0;
  private static chimeQuarter: number = 0;
  private static chimeHour: number = 0;
  static scheduleLightning(): void {
    Ambience.nextLightningTime = App.tickTime + Engine.randomRange(10000, 20000);
    Ambience.lightningDuration = Engine.randomRange(150, 550);
    Ambience.flashShown = false;
  }
  static drawWeather(var0: Graphics): void {
    switch (Game.weather as number) {
      case 1:
        let var8: number = 65536 + idiv(2147483647 - App.tickTime, 10) + idiv(Math.imul(Engine.cos(idiv(App.tickTime, 113)), Engine.getCellWidth(14)), 65536) - idiv(Math.imul(GameUi.cameraX, 11), 9);
        let var15: number = 65536 + idiv(App.tickTime, 7) + idiv(Math.imul(Engine.sin(idiv(App.tickTime, 89)), Engine.getCellHeight(14)), 65536) - idiv(Math.imul(GameUi.cameraY, 11), 9);
        var8 = var8 % Engine.getCellWidth(14);
        var15 = var15 % Engine.getCellHeight(14);
        for (let var20: number = -Engine.getCellWidth(14); var20 < Engine.screenWidth; var20 += Engine.getCellWidth(14)) {
          for (let var23: number = -Engine.getCellHeight(14); var23 < Engine.screenHeight; var23 += Engine.getCellHeight(14)) {
            Engine.drawSprite(var0, var20 + var8, var23 + var15, 14, 0);
          }
        }
        var8 = 65536 + idiv(2147483647 - App.tickTime, 14) + idiv(Math.imul(Engine.cos(idiv(App.tickTime, 43)), Engine.getCellWidth(14)), 65536) - idiv(Math.imul(GameUi.cameraX, 10), 9);
        var15 = 65536 + idiv(App.tickTime, 5) + idiv(Math.imul(Engine.sin(idiv(App.tickTime, 79)), Engine.getCellHeight(14)), 65536) - idiv(Math.imul(GameUi.cameraY, 10), 9);
        var8 = var8 % Engine.getCellWidth(14);
        var15 = var15 % Engine.getCellHeight(14);
        for (let var21: number = -Engine.getCellWidth(14); var21 < Engine.screenWidth; var21 += Engine.getCellWidth(14)) {
          for (let var24: number = -Engine.getCellHeight(14); var24 < Engine.screenHeight; var24 += Engine.getCellHeight(14)) {
            Engine.drawSprite(var0, var21 + var8, var24 + var15, 14, 1);
          }
        }
        return;
      case 2:
        label96: {
          if (App.tickTime > Ambience.nextLightningTime) {
            if (App.tickTime > Ambience.nextLightningTime + Ambience.lightningDuration) {
              Ambience.nextLightningTime = App.tickTime + Engine.randomRange(10000, 20000);
              Ambience.lightningDuration = Engine.randomRange(150, 550);
              Ambience.flashShown = false;
              Ambience.queueSound(App.tickTime + Engine.randomRange(350, 1000), 8);
            }
            if (!Engine.randomBool()) {
              Ambience.flashShown = false;
              break label96;
            }
            if (!Ambience.flashShown) {
              Engine.fillScreen(var0, 16777215);
              Ambience.flashShown = true;
              break label96;
            }
            Engine.fillScreen(var0, Engine.randomBool() ? 64 : 0);
          }
          Ambience.flashShown = false;
        }
        let var1: number = 65536 + idiv(2147483647 - App.tickTime, 10) + idiv(Math.imul(Engine.cos(idiv(App.tickTime, 113)), Engine.getCellWidth(14)), 65536) - idiv(Math.imul(GameUi.cameraX, 11), 9);
        let var2: number = 65536 + idiv(App.tickTime, 7) + idiv(Math.imul(Engine.sin(idiv(App.tickTime, 89)), Engine.getCellHeight(14)), 65536) - idiv(Math.imul(GameUi.cameraY, 11), 9);
        var1 = var1 % Engine.getCellWidth(14);
        var2 = var2 % Engine.getCellHeight(14);
        for (let var3: number = -Engine.getCellWidth(14); var3 < Engine.screenWidth; var3 += Engine.getCellWidth(14)) {
          for (let var4: number = -Engine.getCellHeight(14); var4 < Engine.screenHeight; var4 += Engine.getCellHeight(14)) {
            Engine.drawSprite(var0, var3 + var1, var4 + var2, 14, 0);
          }
        }
        var1 = 65536 + idiv(2147483647 - App.tickTime, 8) + idiv(Math.imul(Engine.cos(idiv(App.tickTime, 13)), Engine.getCellWidth(14)), 65536) - idiv(Math.imul(GameUi.cameraX, 10), 9);
        var2 = 65536 + idiv(App.tickTime, 4) + idiv(Math.imul(Engine.sin(idiv(App.tickTime, 79)), Engine.getCellHeight(14)), 65536) - idiv(Math.imul(GameUi.cameraY, 10), 9);
        var1 = var1 % Engine.getCellWidth(14);
        var2 = var2 % Engine.getCellHeight(14);
        for (let var19: number = -Engine.getCellWidth(14); var19 < Engine.screenWidth; var19 += Engine.getCellWidth(14)) {
          for (let var22: number = -Engine.getCellHeight(14); var22 < Engine.screenHeight; var22 += Engine.getCellHeight(14)) {
            Engine.drawSprite(var0, var19 + var1, var22 + var2, 14, 2);
          }
        }
    }
  }
  static updateAmbientSounds(): void {
    if (App.tickTime - Ambience.nextAmbientCheck > 10000) {
      Ambience.nextAmbientCheck = App.tickTime + 10000;
      let var0: number = Ambience.chimeQuarter;
      Ambience.chimeQuarter = idiv(idiv(idiv(App.tickTime, 10), 1000), 15) % 4;
      Ambience.chimeHour = idiv(idiv(idiv(App.tickTime, 10), 1000), 60) % 12;
      if (Ambience.chimeQuarter === 0) {
        Ambience.chimeQuarter = 4;
      }
      if (Ambience.chimeHour === 0) {
        Ambience.chimeHour = 12;
      }
      if (var0 !== Ambience.chimeQuarter) {
        for (let var5: number = 0; var5 < Ambience.chimeQuarter; var5++) {
          Ambience.queueSound(App.tickTime + Math.imul(var5, 1500), 11);
        }
        if (Ambience.chimeQuarter === 4) {
          for (let var6: number = 0; var6 < Ambience.chimeHour; var6++) {
            Ambience.queueSound(App.tickTime + Math.imul(var6, 1500) + 6000, 10);
          }
        }
        return;
      }
      var0 = Math.min(1000, Building.all.size());
      let var1: number = Engine.randomInt(Building.all.size());
      for (let var2: number = 0; var2 < var0; var2++) {
        let var3: Building = null;
        let var7: number = 0;
        if ((var3 = Building.all.elementAt((var2 + var1) % Building.all.size()) as Building).isVisible && var3.workerCount() > 0 && var3.isComplete() && (var7 = Building.ambientSoundFor(var3.buildingType)) !== (-1)) {
          Ambience.queueSound(App.tickTime, var7);
          return;
        }
      }
      if (Game.weather === 0) {
        Ambience.queueSound(App.tickTime, Engine.randomBool() ? 16 : 17);
      }
    }
  }
  static playDueSounds(): void {
    if (App.tickTime - Ambience.nextQueueCheck > 100) {
      Ambience.nextQueueCheck = App.tickTime + 100;
      if (Ambience.queuedSoundTimes.size > 0 && Ambience.queuedSoundTimes.first() < App.tickTime) {
        Ambience.queuedSoundTimes.removeAt(0);
        let var0: number = Ambience.queuedSounds.first();
        Ambience.queuedSounds.removeAt(0);
        if (var0 >= 0) {
          Engine.playSound(var0);
          return;
        }
        Engine.playRandomInGroup(2);
        Ambience.queueSound(App.tickTime + 120000, -2147483648);
      }
    }
  }
  static queueSound(var0: number, var1: number): void {
    if (!Ambience.skippingTime) {
      let var2: number = 0;
      for (var2 = 0; var2 < Ambience.queuedSoundTimes.size; var2++) {
        let var3: number = 0;
        if ((var3 = Ambience.queuedSoundTimes.get(var2)) < var0 && var3 + 500 > var0) {
          if (Engine.getSoundPriority(Ambience.queuedSounds.get(var2)) < Engine.getSoundPriority(var1)) {
            Ambience.queuedSoundTimes.set(var0, var2);
            Ambience.queuedSounds.set(var1, var2);
            return;
          }
          Ambience.queuedSoundTimes.insertAt(var0, var2);
          Ambience.queuedSounds.insertAt(var1, var2);
          return;
        }
        if (var3 > var0) {
          break;
        }
      }
      Ambience.queuedSoundTimes.insertAt(var0, var2);
      Ambience.queuedSounds.insertAt(var1, var2);
    }
  }
  static reset(): void {
    Ambience.queuedSounds.clear();
    Ambience.queuedSoundTimes.clear();
    Ambience.nextQueueCheck = App.tickTime + 500;
    Ambience.nextAmbientCheck = App.tickTime + 10000;
    Ambience.chimeQuarter = idiv(idiv(idiv(App.tickTime, 10), 1000), 15) % 4;
    Ambience.chimeHour = idiv(idiv(idiv(App.tickTime, 10), 1000), 60) % 12;
    if (Ambience.chimeQuarter === 0) {
      Ambience.chimeQuarter = 4;
    }
    if (Ambience.chimeHour === 0) {
      Ambience.chimeHour = 12;
    }
  }
}
