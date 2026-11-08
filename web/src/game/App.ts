// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { DataInputStream, DataOutputStream, Sys } from "../runtime/io";
import { Runnable, StringBuffer, Vector, arraycopy, charStr, classForName, idiv, jstr, lshl, threadYield } from "../runtime/java";
import { Canvas, Display, Graphics, Image, MIDlet } from "../runtime/midp";
import { Loader } from "./Loader";
import { Engine } from "./Engine";
import { Upsell } from "./Upsell";
import { Menu } from "./Menu";
import { ScreenController } from "./ScreenController";

export class App extends MIDlet implements Runnable {
  static instance: App = null;
  static tickTime: number = 0;
  private static canvas: Canvas = null;
  private static loader: Loader = null;
  private static running: boolean = false;
  private static paused: boolean = false;
  private static state: number = 0;
  private static screen: number = 0;
  private static splashImage: Image = null;
  private static splashTimer: number = 0;
  private static timerCommand: number = 0;
  private static fadeDirection: number = 0;
  private static fadeCommand: number = (-1);
  private static fadeProgress: number = 0;
  private static fadeLength: number = 0;
  private static menuStack: Menu[] = new Array<Menu>(2).fill(null);
  private static firstVisibleMenu: number = (-1);
  private static topMenuIndex: number = (-1);
  static textsLoaded: boolean = false;
  private static cheatCode: bigint = 0n;
  private static field_600: number = (-1);
  private static settings: Int8Array = null;
  private static settingsBackup: Int8Array = null;
  private lastFrameTime: bigint = Sys.currentTimeMillis();
  private frameStartTime: bigint = Sys.currentTimeMillis();
  private static keyCodeTextIds: Int32Array = Int32Array.of(-6, 108, -7, 109, -1, 95, -3, 93, -4, 94, -2, 92, -5, 91, 48, 96, 49, 97, 50, 98, 51, 99, 52, 100, 53, 101, 54, 102, 55, 103, 56, 104, 57, 105, 42, 107, 35, 106);
  private static actionBindings: Int32Array[] = [Int32Array.of(0, 1, 0, -5, -6, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 42, 35), Int32Array.of(1, 1, 0, 48), Int32Array.of(2, 3, 0, -1, 50), Int32Array.of(3, 3, 0, -3, 52), Int32Array.of(4, 3, 0, -4, 54), Int32Array.of(5, 3, 0, -2, 56), Int32Array.of(6, 1, 0, -5, 53), Int32Array.of(7, 1, 0, -6), Int32Array.of(8, 1, 0, -7), Int32Array.of(9, 1, 0, 48), Int32Array.of(10, 1, 0, 49), Int32Array.of(11, 1, 0, 50), Int32Array.of(12, 1, 0, 51), Int32Array.of(13, 1, 0, 52), Int32Array.of(14, 1, 0, 53), Int32Array.of(15, 1, 0, 54), Int32Array.of(16, 1, 0, 55), Int32Array.of(17, 1, 0, 56), Int32Array.of(18, 1, 0, 57), Int32Array.of(19, 1, 0, 42), Int32Array.of(20, 1, 0, 35)];
  private static keyHelpGroups: Int32Array[] = [Int32Array.of(95, 93, 94, 92, 98, 100, 102, 104), Int32Array.of(108, 91, 101), Int32Array.of(109), Int32Array.of(96), Int32Array.of(108), Int32Array.of(106), Int32Array.of(107)];
  static keyMacroNames: string[] = ["FORWARD", "ACTION", "MOVE", "MOTION"];
  static keyMacroTextIds: Int32Array[] = [Int32Array.of(108), Int32Array.of(91, 101), Int32Array.of(98, 100, 102, 104, 93, 94, 95, 92), new Int32Array(0)];
  static textGroupNames: string[] = ["MAIN", "CAMPAIGN", "MOTION", "POINTER", "TIPP"];
  static textGroupPreload: Int32Array = Int32Array.of(1, 1, 0, 0, 1);
  private static heldKeys: number = 0;
  private static newlyPressedKeys: number = 0;
  private static releasedKeys: number = 0;
  private static activeActions: number = 0;
  private static prevActiveActions: number = 0;
  constructor() {
    super();
    App.instance = this;
  }
  static getSetting(var0: number): number {
    if (App.settings === null) {
      if (Engine.saveExists(0)) {
        try {
          let var1: DataInputStream = null;
          let var2: number = 0;
          App.settings = new Int8Array((var2 = (var1 = Engine.openSaveForRead(0)).readByte()) < 8 ? 8 : var2);
          var1.read(App.settings, 0, var2);
        } catch (var3) {
          App.settings = null;
        }
      }
      if (App.settings === null) {
        App.settings = Menu.createDefaultSettings();
      }
    }
    return App.settings[var0];
  }
  static setSetting(var0: number, var1: number): void {
    if (App.settings === null) {
      App.getSetting(var0);
    }
    App.settings[var0] = (var1) << 24 >> 24;
  }
  static backupSettings(): void {
    if (App.settingsBackup === null) {
      App.settingsBackup = new Int8Array(8);
    }
    arraycopy(App.settings, 0, App.settingsBackup, 0, App.settings.length);
  }
  startApp(): void {
    if (!App.running) {
      App.running = true;
      let var1: App = this;
      App.textsLoaded = false;
      App.tickTime = 0;
      App.canvas = null;
      new Vector();
      App.loader = null;
      App.paused = false;
      App.state = -1;
      App.screen = -1;
      App.splashImage = null;
      App.splashTimer = 0;
      App.timerCommand = -1;
      App.fadeDirection = 0;
      App.fadeCommand = -1;
      App.fadeProgress = 0;
      App.fadeLength = 0;
      App.menuStack = new Array<Menu>(2).fill(null);
      App.firstVisibleMenu = -1;
      App.topMenuIndex = -1;
      App.cheatCode = 0n;
      try {
        App.canvas = classForName("GameCanvas").newInstance() as Canvas;
        Display.getDisplay(var1).setCurrent(App.canvas);
        Engine.screenWidth = App.canvas.getWidth();
        Engine.screenHeight = App.canvas.getHeight();
        Engine.screenHeight = App.canvas.getHeight();
        Engine.screenWidth = App.canvas.getWidth();
      } catch (var2) {
        var1.destroyApp(true);
      }
      App.startLoader(2, 0, 6146);
      this.run();
    }
  }
  destroyApp(var1: boolean): void {
    App.running = false;
    this.notifyDestroyed();
  }
  pauseApp(): void {
    App.setPaused(true);
  }
  static setPaused(var0: boolean): void {
    if (App.textsLoaded) {
      if (App.paused !== var0) {
        App.paused = var0;
        if (var0) {
          App.state = 2;
          Engine.pauseSounds();
          App.cheatCode = 0n;
          return;
        }
        Engine.resumeSounds();
      }
    }
  }
  static isPaused(): boolean {
    return App.paused;
  }
  static getScreen(): number {
    return App.screen;
  }
  static openMenu(var0: number): void {
    App.loadMenu(var0, -1, true);
  }
  static openMapGeneratorMenu(): void {
    App.loadMenu(47, -1, false);
  }
  private static loadMenu(var0: number, var1: number, var2: boolean): void {
    if (App.topMenuIndex !== (-1)) {
      App.menuStack[App.topMenuIndex].loadMenu(var0, var1, var2);
      App.releaseAllKeys();
    } else {
      App.pushMenu(new Menu().$init1(var0));
    }
  }
  static pushMenu(var0: Menu): void {
    if (App.topMenuIndex + 1 === App.menuStack.length) {
      let var1: Menu[] = new Array<Menu>(App.menuStack.length + 1).fill(null);
      arraycopy(App.menuStack, 0, var1, 0, App.menuStack.length);
      App.menuStack = var1;
    }
    App.menuStack[App.topMenuIndex = (App.topMenuIndex + 1) << 24 >> 24] = var0;
    App.firstVisibleMenu = App.topMenuIndex;
    while (!App.menuStack[App.firstVisibleMenu].opaque && App.firstVisibleMenu > 0) {
      (App.firstVisibleMenu = (App.firstVisibleMenu - 1) << 24 >> 24);
    }
    var0.layout(false);
    App.releaseAllKeys();
    App.state = -1;
  }
  static hasMenu(): boolean {
    return App.topMenuIndex > (-1);
  }
  static getTopMenu(): Menu {
    return App.topMenuIndex > (-1) ? App.menuStack[App.topMenuIndex] : null;
  }
  static popMenu(): void {
    if (App.topMenuIndex > (-1)) {
      App.menuStack[App.topMenuIndex] = null;
      (App.topMenuIndex = (App.topMenuIndex - 1) << 24 >> 24);
    }
    App.firstVisibleMenu = App.topMenuIndex;
    while (App.firstVisibleMenu > 0 && !App.menuStack[App.firstVisibleMenu].opaque) {
      (App.firstVisibleMenu = (App.firstVisibleMenu - 1) << 24 >> 24);
    }
    if (App.topMenuIndex > (-1)) {
      App.menuStack[App.topMenuIndex].relayout(false);
    }
    App.releaseAllKeys();
    App.state = -1;
  }
  static startLoader(var0: number, var1: number, var2: number): void {
    Engine.stopAllSounds();
    (App.loader = new Loader(var0, var1, var2)).run();
    App.state = -1;
  }
  static setLoaderProgress(var0: number): void {
    if (App.loader !== null) {
      App.loader.progress = var0;
      threadYield();
    }
  }
  static dispatchCommand(var0: number, var1: number): void {
    if (var0 !== (-1)) {
      let var2: number = var0 & 61440;
      let var3: number = var0 & 4095;
      try {
        switch (var2) {
          case 4096:
            switch (var0) {
              case 4098:
                let var10: Menu = null;
                var1 = (var10 = App.getTopMenu()).itemCount;
                while (--var1 >= 0) {
                  let var14: Int32Array = null;
                  if ((var14 = var10.getItem(var1))[0] === 205 && var14[5] !== (-1)) {
                    App.setSetting(var14[5], var14[6]);
                  }
                }
                Engine.refreshMusic();
                Engine.method_439();
                try {
                  let var13: DataOutputStream = null;
                  (var13 = Engine.beginSave(0)).write(8);
                  var13.write(App.settings, 0, 8);
                  Engine.commitSave();
                } catch (var5) {
                }
                var10.goBack();
                return;
              case 4099:
                arraycopy(App.settingsBackup, 0, App.settings, 0, App.settingsBackup.length);
                App.settingsBackup = null;
                Engine.refreshMusic();
                Engine.method_439();
                let var10000: Menu = App.getTopMenu();
                let var9: any = null;
                var10000.goBack();
                return;
              case 4100:
                App.instance.destroyApp(false);
                return;
              case 4101:
                if (App.topMenuIndex !== (-1)) {
                  App.menuStack[App.topMenuIndex].goBack();
                  return;
                }
                break;
              case 6145:
                ScreenController.showSoundPrompt();
                return;
              case 6146:
                if (Engine.getLanguageNames() !== null && Engine.getLanguageNames().size() > 1) {
                  App.pushMenu(new Menu().$init1(48));
                  return;
                }
                App.pushMenu(new Menu().$init1(53));
                break;
              case 6147:
                try {
                  App.splashImage = Image.createImage("/s0.png");
                  App.splashTimer = 3000;
                  App.screen = 0;
                  return;
                } catch (var4) {
                  return;
                }
            }
            return;
          case 8192:
            App.startLoader(var3, var1, -1);
            return;
          case 12288:
            var1 = var3;
            App.screen = var3;
            ScreenController.enterScreen(var1);
            var0 = App.menuStack.length;
            while (--var0 >= 0) {
              App.menuStack[var0] = null;
            }
            App.firstVisibleMenu = -1;
            App.topMenuIndex = -1;
            App.state = -1;
            return;
          case 16384:
            App.loadMenu(var3, var1, true);
            return;
          case 20480:
            let var7: Menu = null;
            (var7 = new Menu().$init0()).openSubmenu(var3, var1);
            App.pushMenu(var7);
            return;
          case 24576:
            Upsell.openUpsellUrl(var3);
            return;
          default:
            if (App.hasMenu()) {
              if (App.getTopMenu().style === 3) {
                App.popMenu();
              }
              Menu.handleMenuCommand(App.getTopMenu(), var0, var1);
            }
            ScreenController.handleGameCommand(var0, var1);
            return;
        }
      } catch (var6) {
      }
    }
  }
  private static onActionPressed(var0: number, var1: boolean, var2: boolean): boolean {
    let var3: boolean = false;
    try {
      switch (App.state as number) {
        case 0:
          if (var0 === 1) {
            App.setPaused(true);
            var3 = true;
          } else {
            var3 = ScreenController.onActionPressed(var0, var1, var2);
          }
          break;
        case 1:
          if (var0 === 1) {
            App.setPaused(true);
            var3 = true;
          } else {
            var3 = App.menuStack[App.topMenuIndex].handleAction(var0, var1, var2);
          }
          break;
        case 2:
          if (var0 === 1) {
            App.setPaused(false);
            var3 = true;
          } else if (var0 >= 9 && var0 <= 18) {
            ScreenController.applyCheatCode(App.cheatCode = (App.cheatCode = lshl(App.cheatCode, 4)) | BigInt(var0 - 9));
          } else if (var0 === 8) {
            App.setPaused(false);
            var3 = true;
          }
          break;
        case 3:
          if (var0 === 0 && !var2) {
            if (App.fadeDirection === 1) {
              App.dispatchCommand(App.fadeCommand, 0);
            }
            App.fadeDirection = 0;
            var3 = true;
          }
        case 4:
        case 5:
        case 6:
        case 7:
        case 9:
        default:
          break;
        case 8:
          if (var0 === 0) {
            App.splashTimer = -1;
          }
          break;
        case 10:
          var3 = Upsell.handleAction(var0);
      }
    } catch (var4) {
    }
    return var3;
  }
  private static onActionReleased(var0: number): boolean {
    let var1: boolean = false;
    try {
      switch (App.state as number) {
        case 0:
          var1 = ScreenController.onActionReleased(var0);
          break;
        case 10:
          var1 = false;
      }
    } catch (var2) {
    }
    return var1;
  }
  static setScreenSize(var0: number, var1: number): void {
    Engine.screenWidth = var0;
    Engine.screenHeight = var1;
  }
  static sleepMs(var0: bigint): void {
    try {
      Sys.sleep(var0);
    } catch (var2) {
    }
  }
  run(): void {
    try {
      let var1: App = this;
      this.frameStartTime = Sys.currentTimeMillis();
      let var2: bigint = 0n;
      if ((var2 = BigInt.asIntN(64, var1.frameStartTime - var1.lastFrameTime)) < 50n) {
        let var4: bigint = BigInt.asIntN(64, 50n - var2);
        try {
          Sys.sleep(var4);
        } catch (var6) {
        }
      }
      var1.lastFrameTime = Sys.currentTimeMillis();
      if (App.field_600 !== (-1)) {
        App.state = 9;
      } else if (App.paused) {
        App.state = 2;
      } else {
        App.tickTime += 50;
        if (App.state !== 0 && App.state !== 6 && App.state !== 7) {
          if (App.loader !== null) {
            App.state = 5;
          } else {
            label94: if (App.splashImage !== null) {
              if ((App.splashTimer -= 50) <= 0) {
                App.splashTimer = 3000;
                try {
                  App.splashImage = Image.createImage("/s" + jstr(++App.screen) + ".png");
                } catch (var7) {
                  App.splashImage = null;
                  App.screen = -1;
                  App.startLoader(0, 0, 12288);
                  break label94;
                }
              }
              App.state = 8;
            } else if (App.paused) {
              App.state = 2;
            } else if (App.fadeDirection !== 0) {
              App.state = 3;
            } else if (App.topMenuIndex !== (-1)) {
              App.state = 1;
            } else if (Upsell.isActive()) {
              App.state = 10;
            } else {
              App.state = 0;
            }
          }
        }
      }
      App.pollInput();
      switch (App.state as number) {
        case 0:
          if (App.splashTimer !== 0 && (App.splashTimer -= 50) <= 0) {
            App.splashTimer = 0;
            App.dispatchCommand(App.timerCommand, 0);
          }
          ScreenController.updateScreen();
          break;
        case 1:
          if (App.hasMenu() && App.topMenuIndex !== (-1) && App.topMenuIndex < App.menuStack.length) {
            Menu.update(App.menuStack[App.topMenuIndex]);
          }
        case 2:
        case 4:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        default:
          break;
        case 3:
          App.fadeProgress = App.fadeProgress + App.fadeDirection;
          if (App.fadeDirection === 1) {
            if (App.fadeProgress > App.fadeLength) {
              App.dispatchCommand(App.fadeCommand, 0);
              App.fadeCommand = -1;
              App.fadeDirection = -1;
              App.fadeLength = 40;
              App.fadeProgress = 40;
            }
          } else if (App.fadeProgress < 0) {
            App.fadeDirection = 0;
          }
          break;
        case 5:
          if (App.loader !== null && !App.loader.isAlive()) {
            App.dispatchCommand(App.loader.nextCommand, App.loader.commandArg);
            App.setPaused(false);
            App.loader = null;
          }
      }
      threadYield();
    } catch (var8) {
    }
    if (App.running) {
      if (App.state !== (-1)) {
        Display.getDisplay(this).callSerially(this);
        App.canvas.repaint();
        return;
      }
      this.run();
    }
  }
  static paintFrame(var0: Graphics): void {
    try {
      switch (App.state as number) {
        case 0:
        case 1:
        case 3:
        case 7:
          App.paintScreenAndMenus(var0);
          return;
        case 2:
          ScreenController.paintPauseScreen(var0);
          return;
        case 4:
          return;
        case 5:
          if (App.loader !== null) {
            ScreenController.paintLoadingScreen(var0, App.loader.loadType, App.loader.progress);
            return;
          }
          break;
        case 6:
          return;
        case 8:
          if (App.splashImage !== null) {
            Engine.fillScreen(var0, Engine.getColor(0 + App.screen));
            var0.drawImage(App.splashImage, idiv(Engine.screenWidth, 2), idiv(Engine.screenHeight, 2), 3);
            Engine.drawDemoBanner(var0, App.screen);
            return;
          }
          break;
        case 9:
          Engine.fillScreen(var0, 0);
          break;
        case 10:
          return;
      }
    } catch (var1) {
    }
  }
  static paintScreenAndMenus(var0: Graphics): void {
    if (App.topMenuIndex === (-1)) {
      ScreenController.paintScreen(var0);
    } else {
      if (App.menuStack[App.firstVisibleMenu].opaque) {
        Menu.drawBackground(var0, App.menuStack[App.firstVisibleMenu]);
      } else {
        ScreenController.paintScreen(var0);
      }
      for (let var1: number = App.firstVisibleMenu; var1 <= App.topMenuIndex; var1++) {
        Menu.drawItems(var0, App.menuStack[var1]);
      }
      Menu.drawOverlay(var0, App.menuStack[App.topMenuIndex]);
    }
    if (App.fadeDirection !== 0) {
      ScreenController.paintFadeBars(var0, 0, App.fadeProgress);
    }
  }
  static initKeyBindings(): void {
    let var0: number = App.actionBindings.length;
    while (--var0 >= 0) {
      let var1: Int32Array = App.actionBindings[var0];
      let var2: Int32Array = new Int32Array(4);
      App.actionBindings[var0] = var2;
      arraycopy(var1, 0, var2, 0, 3);
      let var3: number = var1.length;
      while (--var3 >= 3) {
        var2[3] |= 1 << App.keyCodeToSlot(var1[var3]);
      }
    }
  }
  private static pollInput(): void {
    App.prevActiveActions = App.activeActions;
    App.activeActions = 0;
    App.heldKeys = App.heldKeys | App.newlyPressedKeys;
    if (App.releasedKeys !== 0) {
      let var0: number = (App.releasedKeys = App.releasedKeys & App.heldKeys) & ~App.newlyPressedKeys;
      App.releasedKeys &= ~var0;
      App.heldKeys &= ~var0;
    }
    App.newlyPressedKeys = 0;
    let var9: number = App.heldKeys;
    let var1: number = App.actionBindings.length;
    while (--var1 >= 0) {
      let var2: boolean = false;
      let var3: boolean = false;
      let var4: number = (App.prevActiveActions & 1 << var1) !== 0 && (App.releasedKeys & 1 << var1) === 0 ? 1 : 0;
      let var5: Int32Array = null;
      let var6: number = (var5 = App.actionBindings[var1])[1];
      if ((var5[3] & var9) !== 0) {
        var3 = true;
      }
      if (var3) {
        App.activeActions |= 1 << var1;
        if (var4 !== 0) {
          if ((var6 & 2) !== 0) {
            var2 = App.onActionPressed(var5[0], false, true);
          }
        } else {
          var3 = false;
          var4 = App.tickTime;
          if ((var6 & 4) !== 0) {
            let var7: number = var5[2];
            if (var3 = var4 - var7 <= 500) {
              let var8: number = App.actionBindings.length;
              while (--var8 >= 0) {
                if (App.actionBindings[var8][2] > var7 && (App.actionBindings[var8][3] & var5[3]) === 0) {
                  var3 = false;
                  break;
                }
              }
            }
          }
          var5[2] = var4;
          if ((var6 & 1) !== 0 || var3) {
            var2 = App.onActionPressed(var5[0], var3, false);
          }
        }
      } else if (var4 !== 0) {
        var2 = App.onActionReleased(var5[0]);
      }
      if (var2) {
        App.releaseAllKeys();
        return;
      }
    }
  }
  private static keyCodeToSlot(var0: number): number {
    let var1: number = App.keyCodeTextIds.length;
    do {
      var1 -= 2;
      if (var1 < 0) {
        return (-1);
      }
    } while (App.keyCodeTextIds[var1] !== var0);
    return var1 >> 1;
  }
  static onKeyEvent(var0: number, var1: boolean): void {
    var0 = App.keyCodeToSlot(var0);
    if (var1) {
      App.releaseAllKeys();
      App.newlyPressedKeys |= 1 << var0;
    } else {
      App.releasedKeys |= 1 << var0;
    }
  }
  private static releaseAllKeys(): void {
    App.releasedKeys = App.releasedKeys | App.heldKeys | App.newlyPressedKeys;
  }
  static getActionHoldTime(var0: number): number {
    return App.tickTime - App.actionBindings[var0][2];
  }
  static buildKeyHelpText(var0: number, var1: number): string {
    let var2: StringBuffer = new StringBuffer();
    let var5: Int32Array = null;
    let var3: number = (var5 = App.keyHelpGroups[var0]).length;
    for (let var4: number = 0; var4 < var3; var4++) {
      var2 = var2.append(Engine.getText(var5[var4]));
      if (var4 + 1 < var3) {
        var2 = var2.append(charStr(44)).append(charStr(32));
      }
    }
    return var2.append(charStr(58)).append(charStr(10)).append(Engine.getText(var1)).append(charStr(10)).append(charStr(10)).toString();
  }
  static getResumeKeyTextId(var0: number): number {
    var0 = App.actionBindings[1][3];
    for (let var1: number = 0; var1 < 32; var1++) {
      if ((var0 & 1 << var1) !== 0) {
        return App.keyCodeTextIds[(var1 << 1) + 1];
      }
    }
    return 0;
  }
}
