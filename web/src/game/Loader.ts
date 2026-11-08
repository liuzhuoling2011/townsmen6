// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { JavaThread, errorMessage } from "../runtime/java";
import { Engine } from "./Engine";
import { Upsell } from "./Upsell";
import { Menu } from "./Menu";
import { App } from "./App";
import { ScreenController } from "./ScreenController";

export class Loader extends JavaThread {
  loadType: number = 0;
  commandArg: number = 0;
  nextCommand: number = 0;
  progress: number = 0;
  constructor(var1: number, var2: number, var3: number) {
    super();
    this.loadType = var1;
    this.commandArg = var2;
    this.nextCommand = var3;
  }
  run(): void {
    try {
      switch (this.loadType as number) {
        case 1:
          Engine.loadTexts();
          App.textsLoaded = true;
          break;
        case 2:
          App.initKeyBindings();
          Engine.loadLanguageList();
          if (Engine.getLanguageNames() === null || Engine.getLanguageNames().size() <= 1) {
            Engine.loadTexts();
          }
          Engine.initDemo();
          Engine.loadConfig("/gt");
          Engine.loadConfig("/c");
          Engine.loadConfig("/f");
          Engine.loadSoundTable();
          Engine.initSoundPlayer();
          Upsell.init();
      }
      ScreenController.markAssetsForLoader(this.loadType);
      let var1: boolean = false;
      Engine.loadImages(true);
      Engine.applySoundPreloads();
      Menu.loadMenuTable();
      Engine.updateTextGroups();
      if (Engine.getLanguageNames() === null || Engine.getLanguageNames().size() <= 1) {
        App.textsLoaded = true;
      }
      this.progress = 100;
      App.sleepMs(200n);
      void 0;
    } catch (var2) {
      this.nextCommand = -1;
      errorMessage(var2);
    }
  }
}
