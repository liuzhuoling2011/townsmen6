// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { idiv } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { Game } from "./Game";
import { Townsman } from "./Townsman";
import { Engine } from "./Engine";
import { Menu } from "./Menu";
import { GameData } from "./GameData";
import { App } from "./App";
import { Level } from "./Level";
import { GameUi } from "./GameUi";
import { TextBox } from "./TextBox";

export class ScreenController {
  private static pauseText: TextBox = null;
  constructor() {
  }
  static updateScreen(): void {
    switch (App.getScreen()) {
      case 0:
        if (App.hasMenu()) {
          App.getTopMenu().showMainMenu();
          return;
        }
        App.pushMenu(new Menu().$init1(39));
        return;
      case 1:
        Game.update();
        Engine.tickDemoTimer();
        return;
      case 2:
        GameUi.updateCampaign();
    }
  }
  static showSoundPrompt(): void {
    App.pushMenu(new Menu().$init1(53));
  }
  static markAssetsForLoader(var0: number): number {
    switch (var0) {
      case 0:
        Engine.preloadSoundGroup(0);
        Engine.preloadSound(30);
        Engine.setImageGroupNeeded(32, false);
        Engine.setImageGroupNeeded(64, false);
        Engine.setImageGroupNeeded(8, false);
        Engine.setImageGroupNeeded(4, false);
        Engine.setImageGroupNeeded(2, false);
        Engine.setImageGroupNeeded(1, true);
        Engine.setImageGroupNeeded(128, true);
        Engine.setImageNeeded(165, true);
        Engine.setImageNeeded(151, true);
        Engine.setImageNeeded(149, true);
        Engine.setImageNeeded(150, true);
        Engine.setImageNeeded(113, true);
      case 1:
      default:
        break;
      case 2:
        Engine.setImageGroupNeeded(1, true);
        Engine.setImageGroupNeeded(128, true);
        Engine.setImageNeeded(165, true);
        Engine.setImageNeeded(151, true);
        Engine.setImageNeeded(149, true);
        Engine.setImageNeeded(150, true);
        Engine.setImageNeeded(113, true);
        break;
      case 3:
        Engine.setImageGroupNeeded(1, false);
        Engine.setImageNeeded(12, true);
        Engine.setImageNeeded(13, true);
        Engine.setImageGroupNeeded(2, false);
        Engine.setImageGroupNeeded(32, true);
        Engine.setImageGroupNeeded(64, true);
        Engine.setImageGroupNeeded(1024, true);
        Engine.setImageGroupNeeded(256, true);
        Engine.setImageGroupNeeded(512, true);
        Engine.setImageGroupNeeded(8, true);
        Engine.setImageGroupNeeded(4, true);
        Engine.setImageGroupNeeded(128, true);
        Engine.preloadSoundGroup(2);
        Engine.preloadSoundGroup(3);
        Engine.preloadSoundGroup(4);
        break;
      case 4:
        Engine.setImageGroupNeeded(32, false);
        Engine.setImageGroupNeeded(64, false);
        Engine.setImageGroupNeeded(8, false);
        Engine.setImageGroupNeeded(1, false);
        Engine.setImageNeeded(12, true);
        Engine.setImageNeeded(13, true);
        Engine.setImageGroupNeeded(2, true);
        Engine.setImageGroupNeeded(4, true);
        Engine.setImageGroupNeeded(128, true);
        Engine.preloadSoundGroup(0);
        Engine.preloadSoundGroup(5);
    }
    Engine.setImageGroupNeeded(16, true);
    return (-1);
  }
  static enterScreen(var0: number): void {
    switch (var0) {
      case 1:
        Game.beginLevel();
        return;
      case 2:
        GameUi.enterCampaignMap();
    }
  }
  static handleGameCommand(var0: number, var1: number): void {
    switch (var0) {
      case 2:
        if (var1 !== (-2)) {
          Game.resetSession();
          Game.level = new Level().$init1(var1);
        }
        App.startLoader(3, 0, 12289);
        return;
      case 4:
        Game.quitLevel(false);
        return;
      case 5:
        Game.quitLevel(true);
        return;
      case 7:
        if (Game.level !== null) {
          Game.finishLevel(false);
        }
        App.startLoader(4, 0, 12290);
        return;
      case 15:
        var1 = App.getTopMenu().selectedIndex;
        Engine.getLanguageNames().elementAt(var1);
        Engine.selectLanguage(var1);
        App.startLoader(1, 0, 6145);
        return;
      case 19:
        App.setSetting(0, 0);
        if (App.getSetting(4) === 0 && App.getSetting(5) === 0) {
          App.setSetting(4, 100);
        }
        App.getSetting(4);
        App.dispatchCommand(6147, 0);
        return;
      case 20:
        App.setSetting(4, 0);
        App.setSetting(5, 0);
        App.dispatchCommand(6147, 0);
      case 3:
      case 6:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 16:
      case 17:
      case 18:
    }
  }
  static onActionPressed(var0: number, var1: boolean, var2: boolean): boolean {
    var1 = false;
    switch (App.getScreen()) {
      case 1:
        if (!(var1 = GameUi.keyPressed(var0, var2)) && var0 === 8) {
          var1 = true;
          App.openMenu(51);
        }
        break;
      case 2:
        var1 = GameUi.campaignKeyPressed(var0);
    }
    return var1;
  }
  static onActionReleased(var0: number): boolean {
    let var1: boolean = false;
    switch (App.getScreen()) {
      case 1:
        var1 = GameUi.keyReleased(var0);
        break;
      case 2:
        var1 = GameUi.campaignKeyReleased();
    }
    return var1;
  }
  static applyCheatCode(var0: bigint): void {
    if (var0 === 1999077922n) {
      let var3: number = 300 - Townsman.enemies.size();
      for (let var1: number = 0; var1 < var3; var1++) {
        Engine.assignAiHome(Townsman.create(4));
      }
      App.setPaused(false);
    } else if (var0 !== 8118418552691n) {
      if (var0 === 493093n) {
        Game.fillStocks();
        App.setPaused(false);
      } else if (var0 === 31074n) {
        Game.addResource(720896 | Townsman.townies.size());
        App.setPaused(false);
      } else if (var0 === 468807n) {
        GameData.cheatPlaceAllBuildings(false);
        App.setPaused(false);
      } else if (var0 === 22886n) {
        GameData.cheatPlaceAllBuildings(true);
        App.setPaused(false);
      } else if (var0 === 3704947n) {
        Game.researchLevel = Math.min(++Game.researchLevel, Game.maxResearchLevel);
        App.setPaused(false);
      } else if (var0 === 5474150n) {
        Game.researchLevel = Game.maxResearchLevel;
        App.setPaused(false);
      } else if (var0 === 8939330n) {
        Game.researchLevel = Game.maxResearchLevel = GameData.researchPointsPerLevel.length;
        App.setPaused(false);
      } else if (var0 === 354438n) {
        Game.addResources(Int32Array.of(1115112));
        App.setPaused(false);
      } else if (var0 === 2564936n) {
        Townsman.createMany(0, 5);
        App.setPaused(false);
      } else if (var0 === 468518n) {
        Townsman.createMany(2, 5);
        App.setPaused(false);
      } else if (var0 === 341574n) {
        Townsman.createMany(3, 5);
        App.setPaused(false);
      } else if (var0 === 230034n) {
        Game.happiness = 0;
        App.setPaused(false);
      } else if (var0 === 402018n) {
        Game.happiness = 100;
        App.setPaused(false);
      } else if (var0 === 3351863n) {
        Game.merchantArrives();
        App.setPaused(false);
      } else if (var0 === 5457446n) {
        Game.merchantLeaves();
        App.setPaused(false);
      } else if (var0 === 9725495n) {
        App.setPaused(false);
        Game.finishLevel(true);
      } else if (var0 === 354103n) {
        App.setPaused(false);
        Game.finishLevel(false);
      } else if (var0 === 600419n) {
        Game.troopPool = (Game.troopPool + 10) << 24 >> 24;
        App.setPaused(false);
      } else if (var0 === 7751303n) {
        Game.actionPoints = (Game.actionPoints + 10) << 24 >> 24;
        App.setPaused(false);
      }
    } else {
      for (let var2: number = 0; var2 < Game.departmentConquered.length; var2++) {
        Game.departmentConquered[var2] = true;
        Game.departmentBonusChoice[var2] = 0;
      }
      App.setPaused(false);
      Game.finishLevel(true);
    }
  }
  static paintScreen(var0: Graphics): void {
    switch (App.getScreen()) {
      case 1:
        Game.draw(var0);
        return;
      case 2:
        GameUi.drawCampaign(var0);
    }
  }
  static paintFadeBars(var0: Graphics, var1: number, var2: number): void {
    var0.setColor(0);
    if (var2 === 40) {
      var0.fillRect(0, 0, Engine.screenWidth, Engine.screenHeight);
    } else {
      var1 = var2 === 0 ? 0 : idiv(idiv(Math.imul(Engine.screenHeight, var2), 40), 2);
      var0.fillRect(0, 0, Engine.screenWidth, var1);
      var0.fillRect(0, Engine.screenHeight - var1, Engine.screenWidth, var1);
    }
  }
  static paintPauseScreen(var0: Graphics): void {
    App.paintScreenAndMenus(var0);
    for (let var1: number = 0; var1 < Engine.screenWidth; var1 += Engine.getCellWidth(15)) {
      for (let var2: number = 0; var2 < Engine.screenHeight; var2 += Engine.getCellHeight(15)) {
        Engine.drawImage(var0, var1, var2, 15);
      }
    }
    if (App.textsLoaded) {
      if (ScreenController.pauseText === null) {
        let var4: number = 0 + Engine.wrapText(Engine.getText(233), Engine.getFont(2), Engine.screenWidth - 10).length + Engine.wrapText(Engine.getText(234), Engine.getFont(2), Engine.screenWidth - 10).length;
        var4++;
        (ScreenController.pauseText = new TextBox().$init0(Engine.screenWidth - 10, Math.imul(Engine.getFontHeight(2), var4), 0)).addText(Engine.getText(233), Int32Array.of(3, -1, -1, 2, 1, 16777215, 0));
        ScreenController.pauseText.addText(Engine.getText(234), Int32Array.of(3, -1, -1, 2, 1, 16777215, 0));
        ScreenController.pauseText.addText(Engine.getText(App.getResumeKeyTextId(1)), Int32Array.of(3, -1, -1, 2, 1, 16777215, 0));
        return;
      }
      if (Game.level !== null) {
        let var3: number = 0;
        let var6: number = Engine.wrapText(Engine.getText(var3 = Game.level.levelIndex >= 0 ? 65672 + Game.level.levelIndex : 126), Engine.getFont(2), Engine.screenWidth - 10).length;
        let var7: TextBox = null;
        (var7 = new TextBox().$init0(Engine.screenWidth - 10, Math.imul(Engine.getFontHeight(2), var6), 0)).addText(Engine.getText(var3), Int32Array.of(3, -1, -1, 2, 1, 16777215, 0));
        var7.draw(var0, Engine.screenWidth >> 1, 0, 17);
      }
      ScreenController.pauseText.draw(var0, Engine.screenWidth >> 1, Engine.screenHeight >> 1, 3);
    }
  }
  static paintLoadingScreen(var0: Graphics, var1: number, var2: number): void {
    let var3: number = idiv(Engine.screenHeight, 13);
    let var4: number = idiv(Engine.screenWidth << 1, 3);
    let var5: number = idiv(Engine.screenWidth - var4, 2);
    let var6: number = idiv(Engine.screenHeight << 1, 3) - var3;
    var2 = idiv(Math.imul(var4, var2), 100);
    switch (var1) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        Engine.fillScreen(var0, 0);
        var1 = idiv(var4, 3);
        var0.setColor(8037626);
        var0.drawRect(var5 - 1, var6 - 1, var1, var3 + 1);
        var0.setColor(16053492);
        var0.drawRect(var5 + var1, var6 - 1, var1, var3 + 1);
        var0.setColor(14040615);
        var0.drawRect(var5 + (var1 << 1), var6 - 1, var1, var3 + 1);
        var0.setClip(var5, var6, var2, var3);
        var0.setColor(8037626);
        var0.fillRect(var5, var6, var1, var3);
        var0.setColor(16053492);
        var0.fillRect(var5 + var1, var6, var1, var3);
        var0.setColor(14040615);
        var0.fillRect(var5 + (var1 << 1), var6, var1, var3);
        var0.setClip(0, 0, Engine.screenWidth, Engine.screenHeight);
        if (App.textsLoaded) {
          Engine.drawText(var0, idiv(Engine.screenWidth, 2), idiv(Engine.screenHeight, 2), Engine.getText(228), 1, 3, 0, 16053492, 16053492);
          return;
        }
        break;
      case 5:
        Engine.fillScreen(var0, 0);
        var0.setColor(-1);
        Engine.drawText(var0, idiv(Engine.screenWidth, 2), idiv(Engine.screenHeight, 2), Engine.getText(228), 2, 3, 0, -1, -1);
    }
  }
}
