// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { DataInputStream } from "../runtime/io";
import { Stack, Vector, arraycopy, idiv, jstr, printStackTrace } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { Game } from "./Game";
import { Engine } from "./Engine";
import { Upsell } from "./Upsell";
import { App } from "./App";
import { Level } from "./Level";
import { GameUi } from "./GameUi";

export class Menu {
  menuId: number = (-1);
  style: number = (-1);
  private menuArg: number = (-1);
  private userData: any = null;
  opaque: boolean = true;
  private contentHeight: number = 0;
  marginTop: number = 0;
  marginLeft: number = 0;
  marginRight: number = 0;
  marginBottom: number = 0;
  private viewTop: number = 0;
  private viewLeft: number = 0;
  private viewRight: number = 0;
  private viewBottom: number = 0;
  private viewWidth: number = 0;
  viewHeight: number = 0;
  private scrolling: boolean = false;
  private canScrollDown: boolean = false;
  private canScrollUp: boolean = false;
  leftSoftKeyIcon: number = 0;
  leftSoftKeyCommand: number = 0;
  leftSoftKeyArg: number = 0;
  rightSoftKeyIcon: number = 0;
  rightSoftKeyCommand: number = 0;
  rightSoftKeyArg: number = 0;
  fireCommand: number = 0;
  fireArg: number = 0;
  leftSoftKeyY: number = 0;
  rightSoftKeyX: number = 0;
  rightSoftKeyY: number = 0;
  selectedIndex: number = 0;
  private scrollTarget: number = 0;
  private scrollPos: number = 0;
  itemCount: number = 0;
  private items: Int32Array[] = null;
  private itemOffsets: Int32Array = null;
  private itemTextCache: any[] = null;
  private laidOut: boolean = false;
  private history: Stack = null;
  private static itemX: number = 0;
  private static itemY: number = 0;
  private static itemCenterY: number = 0;
  private static itemWidth: number = 0;
  private static itemHeight: number = 0;
  private static menuTable: Int32Array[][] = null;
  private static tickerState: Int32Array = null;
  private static tickerValid: boolean = false;
  private static mascotAnimFrame: number = 0;
  private static mascotAnimDelay: number = 0;
  private static mascotAnimLoops: number = 0;
  private static mascotTalkFrame: boolean = false;
  private static mascotTalkTimer: number = 0;
  private static mascotTalkTicks: number = 0;
  private static field_472: boolean = false;
  private static field_473: number = 0;
  private static field_474: boolean = true;
  private static cornerAnimFrame: number = 0;
  private static cornerAnimTimer: number = 0;
  private static driftSpriteAX: number = 0;
  private static driftSpriteBX: number = 0;
  private static driftSpriteARange: number = 0;
  private static driftSpriteBRange: number = 0;
  private static mascotSlideX: number = 0;
  private static mascotSlideY: number = 0;
  $init0(): this {
    this.reset();
    return this;
  }
  $init1(var1: number): this {
    this.loadMenu(var1, -1, false);
    return this;
  }
  private static isSelectableType(var0: number): boolean {
    return var0 > 200;
  }
  static loadMenuTable(): void {
    if (Menu.menuTable === null) {
      let var0: DataInputStream = null;
      try {
        let var1: number = 0;
        Menu.menuTable = new Array<Int32Array[]>(var1 = (var0 = new DataInputStream(Engine.openResource("/mt"))).readByte()).fill(null);
        for (let var2: number = 0; var2 < var1; var2++) {
          let var3: number = var0.readByte();
          let var4: number = var0.readByte();
          Menu.menuTable[var2] = new Array<Int32Array>(var4 + 1).fill(null);
          Menu.menuTable[var2][0] = Int32Array.of(var3);
          for (let var15: number = 1; var15 <= var4; var15++) {
            let var5: number = var0.readByte();
            Menu.menuTable[var2][var15] = new Int32Array(var5);
            Menu.menuTable[var2][var15][0] = var0.readByte() & 255;
            for (let var6: number = 3; var6 < var5; var6++) {
              Menu.menuTable[var2][var15][var6] = var0.readInt();
            }
          }
        }
        return;
      } catch (var13) {
        printStackTrace(var13);
      } finally {
        try {
          var0.close();
        } catch (var12) {
        }
      }
    }
  }
  private reset(): void {
    this.marginTop = 0;
    this.marginLeft = 0;
    this.marginRight = 0;
    this.marginBottom = 0;
    this.viewWidth = 0;
    this.viewHeight = 0;
    this.canScrollDown = false;
    this.canScrollUp = false;
    this.leftSoftKeyIcon = 0;
    this.leftSoftKeyCommand = -1;
    this.rightSoftKeyIcon = 0;
    this.rightSoftKeyCommand = -1;
    this.fireCommand = -1;
    this.leftSoftKeyArg = -1;
    this.rightSoftKeyArg = -1;
    this.fireArg = -1;
    Menu.resetSoftKeyPositions(this);
    this.selectedIndex = -1;
    this.scrollTarget = 0;
    this.scrollPos = 0;
    this.style = 1;
    this.laidOut = false;
    this.itemCount = 0;
    this.items = new Array<Int32Array>(8).fill(null);
    Menu.tickerValid = false;
  }
  layout(var1: boolean): void {
    if (!this.laidOut) {
      label102: {
        this.itemTextCache = new Array<any>(this.itemCount).fill(null);
        this.itemOffsets = new Int32Array(this.itemCount + 1);
        this.contentHeight = 0;
        Menu.resetSoftKeyPositions(this);
        let var2: Menu = this;
        switch (this.style as number) {
          case 3:
            var2.marginLeft = var2.marginRight = Math.imul(2, Engine.getCellWidth(113));
            var2.marginTop = var2.marginBottom = idiv(Engine.screenHeight, 4);
            var2.opaque = false;
            break label102;
          case 4:
            var2.marginLeft = var2.marginRight = Engine.getCellWidth(113);
            var2.marginTop = idiv(Engine.screenHeight, 4);
            var2.marginBottom = idiv(Engine.screenHeight, 4);
            break;
          case 5:
            let var3: number = idiv(Engine.screenHeight, 10);
            var2.marginBottom = var2.marginTop = var2.marginBottom = var2.viewTop = var3;
            break label102;
          default:
            var2.marginLeft = var2.marginRight = Engine.screenWidth - Engine.getCellWidth(13) >> 1;
            var2.marginTop = Engine.getCellHeight(12) + Engine.getCellHeight(13);
            if (!Engine.isImageLoaded(1) && !Engine.isImageLoaded(3)) {
              var2.marginBottom = Engine.getCellHeight(151);
            } else {
              var2.marginBottom = Engine.getCellHeight(1);
            }
        }
        var2.opaque = true;
      }
      this.viewTop = this.marginTop + 4;
      this.viewLeft = this.marginLeft + 3;
      this.viewRight = Engine.screenWidth - this.marginRight - 3;
      this.viewBottom = Engine.screenHeight - this.marginBottom;
      this.viewWidth = this.viewRight - this.viewLeft;
      this.viewHeight = this.viewBottom - this.viewTop;
      for (let var7: number = 0; var7 < this.itemCount; var7++) {
        let var10002: any = null;
        label88: {
          let var8: Int32Array = this.items[var7];
          let var10004: number = var8[0];
          let var5: Int32Array = var8;
          let var4: number = var10004;
          let var13: number = var7;
          let var9: Menu = this;
          let var6: any = null;
          switch (var4) {
            case 101:
            case 102:
              var6 = var9.wrapItemText(var13, Engine.getText(var5[3]));
              var5[1] = Math.imul(Menu.getCachedLines(var6).length, Engine.getFontHeight(1));
              var10002 = var6;
              break label88;
            case 103:
              var6 = var9.wrapItemText(var13, App.buildKeyHelpText(var5[5], var5[3]));
              var5[1] = Math.imul(Menu.getCachedLines(var6).length, Engine.getFontHeight(1));
              var10002 = var6;
              break label88;
            case 104:
              var6 = var9.wrapItemTextToWidth(var13, Engine.getText(var5[5]), 1, var9.viewWidth);
              var5[1] = Math.imul(Menu.getCachedLines(var6).length, Engine.getFontHeight(1)) + Engine.getCellHeight(var5[3]);
              var10002 = var6;
              break label88;
            case 105:
              let var11: number = var5[3];
              var5[1] = Engine.getCellHeight(var11);
              break;
            case 106:
              var5[1] = Engine.getCellHeight(var5[3]);
              if (var5[5] > 0) {
                var5[1] = Math.max(var5[1], Engine.getCellHeight(var5[5]));
              }
              if (var5[7] > 0) {
                var5[1] = Math.max(var5[1], Engine.getCellHeight(var5[7]));
              }
              break;
            case 107:
              var5[1] = 18;
              break;
            case 108:
              let var10: number = var5[3];
              var13 = var5[4];
              var4 = var5[5];
              if (var10 === 43) {
                var5[1] = (Engine.getFrameHeight(var10, var13) << 1) + Math.abs(Engine.getFrameOffsetY(var13, 5)) + Math.abs(Engine.getImageInfo(var10, 6));
              } else if (var10 === 41) {
                var5[1] = Engine.getCellHeight(25);
              } else {
                var5[1] = Engine.getFrameHeight(var10, var13) + (var4 > 0 ? Engine.getFrameHeight(var10, var4) : 0) + Math.abs(Engine.getFrameOffsetY(var13, 5)) + Math.abs(Engine.getImageInfo(var10, 6));
              }
              break;
            case 109:
              var5[1] = var5[3];
              break;
            case 201:
            case 203:
              var5[1] = Math.max(Engine.getFontHeight(2), Engine.getCellHeight(165));
              var5[1] = var5[1];
              break;
            case 202:
              var5[1] = Math.max(Engine.getFontHeight(2), Engine.getCellHeight(165));
              var5[1] = var5[1];
              if (GameUi.getDepartmentAccess(var5[5]) === 0) {
                var5[6] = 1;
                var5[4] = 2;
              } else {
                var5[4] = -1;
              }
              break;
            case 205:
              var5[1] = Engine.getFontHeight(2);
              var5[1] = var5[1];
              if (var5[5] !== (-1)) {
                var5[6] = App.getSetting(var5[5]);
              }
              break;
            case 206:
              var5[1] = Engine.getFontHeight(2);
              var5[1] = var5[1];
              var5[1] += Engine.getFontHeight(2);
              var5[5] = App.getSetting(var5[6]);
              if (var5[9] === 0) {
                var5[9] = idiv(var5[4] - var5[3], var5[8]);
              } else {
                var5[8] = idiv(var5[4] - var5[3], var5[9]);
              }
              break;
            case 207:
              var5[1] = Engine.getCellHeight(104);
              var5[1] = var5[1];
          }
          var10002 = null;
        }
        this.itemTextCache[var7] = var10002;
      }
      if (this.rightSoftKeyCommand === (-1)) {
        let var12: Menu = this;
        if (this.history !== null && var12.history.size() > 0) {
          this.rightSoftKeyCommand = 4101;
          this.rightSoftKeyIcon = 16519;
        }
      }
      this.computeItemOffsets();
      if (this.contentHeight > this.viewHeight) {
        this.canScrollDown = true;
        this.canScrollUp = false;
      }
      if (this.selectedIndex === (-1)) {
        this.selectedIndex = this.getFirstFocusIndex();
      }
      this.selectItem(this.selectedIndex, -1);
      this.scrollPos = this.scrollTarget;
      this.laidOut = true;
    }
  }
  relayout(var1x: boolean): void {
    let var1: number = this.selectedIndex;
    let var2: number = this.scrollPos;
    if (this.menuId === (-1)) {
      let var3: boolean = false;
      let var5: Menu = this;
      this.laidOut = false;
      var5.layout(false);
    } else {
      this.loadMenu(this.menuId, -1, false);
    }
    this.selectItem(var1, -1);
    this.scrollPos = var2;
  }
  showMainMenu(): void {
    this.loadMenu(39, -1, false);
  }
  openSubmenu(var1: number, var2: number): void {
    this.loadMenu(var1, var2, true);
  }
  loadMenu(var1: number, var2: number, var3: boolean): void {
    try {
      let var4: number = this.menuId;
      if (var3 && var4 !== (-1)) {
        let var7: Menu = this;
        if (this.history === null) {
          var7.history = new Stack();
        }
        var7.history.push([var7.menuId, var7.menuArg, var7.selectedIndex, var7.userData]);
      }
      this.reset();
      let var8: Int32Array[] = null;
      this.menuId = var1;
      this.menuArg = var2;
      if (var1 !== (-1) && (var8 = Menu.menuTable[var1]) !== null) {
        this.style = var8[0][0];
        for (let var6: number = 1; var6 < var8.length; var6++) {
          let var10: Int32Array = null;
          if ((var10 = var8[var6])[0] >= 100) {
            this.addItem(var10);
          } else {
            switch (var10[0]) {
              case 1:
                this.leftSoftKeyCommand = var10[3];
                this.leftSoftKeyIcon = var10[4];
                break;
              case 2:
                this.rightSoftKeyCommand = var10[3];
                this.rightSoftKeyIcon = var10[4];
            }
          }
        }
      }
      Menu.customizeMenu(this, var1);
      this.layout(false);
    } catch (var5) {
    }
  }
  goBack(): void {
    if (this.history !== null && this.history.size() > 0) {
      let var1: any[] = (this.history.pop() as any[]);
      this.loadMenu(var1[0], var1[1], false);
      this.selectItem(var1[2], -1);
      this.userData = var1[3];
      this.scrollPos = this.scrollTarget;
    } else {
      App.popMenu();
    }
  }
  private setItemField(var1: number, var2: number, var3: number): void {
    if (var1 >= 0 && var1 < this.items.length && var2 >= 0 && var2 < this.items[var1].length) {
      this.items[var1][var2] = var3;
    }
  }
  addItem(var1: Int32Array): void {
    if (this.itemCount >= this.items.length) {
      let var2: Int32Array[] = new Array<Int32Array>(this.items.length + 4).fill(null);
      arraycopy(this.items, 0, var2, 0, this.items.length);
      this.items = var2;
    }
    this.items[this.itemCount] = var1;
    this.itemCount++;
  }
  insertItem(var1: Int32Array, var2: number): void {
    if (this.itemCount >= this.items.length) {
      let var3: Int32Array[] = new Array<Int32Array>(this.items.length + 4).fill(null);
      arraycopy(this.items, 0, var3, 0, this.items.length);
      this.items = var3;
    }
    let var4: number = this.itemCount++;
    while (var4 > var2) {
      this.items[var4--] = this.items[var4];
    }
    this.items[var2] = var1;
  }
  private removeItem(var1: number): void {
    this.itemCount--;
    while (var1 < this.itemCount) {
      this.items[var1++] = this.items[var1];
    }
  }
  getItem(var1: number): Int32Array {
    return this.items[var1];
  }
  private wrapItemText(var1: number, var2: string): any {
    return this.wrapItemTextToWidth(var1, var2, 1, this.viewWidth);
  }
  private wrapItemTextToWidth(var1: number, var2: string, var3: number, var4: number): any {
    var3 = var1;
    let var5: any = null;
    if ((var5 = this.itemTextCache[var3] as any[]) === null) {
      var5 = new Array<any>(2).fill(null);
    }
    if (var2 === null && (var5 as any[])[0] === null) {
      (var5 as any[])[0] = null;
      (var5 as any[])[1] = new Array<string>(0).fill(null);
      return var5;
    }
    if ((var5 as any[])[0] !== null) {
      (var5 as any[])[1] = Engine.wrapText((var5 as any[])[0] as string, Engine.getFont(1), var4);
    } else {
      (var5 as any[])[0] = var2;
      (var5 as any[])[1] = Engine.wrapText(var2, Engine.getFont(1), var4);
    }
    return var5;
  }
  private getItemLines(var1: number): string[] {
    return this.itemTextCache[var1] === null ? null : ((this.itemTextCache[var1] as any[])[1] as string[]);
  }
  private static getCachedLines(var0: any): string[] {
    return var0 === null ? null : ((var0 as any[])[1] as string[]);
  }
  private isFocusStop(var1: number): boolean {
    return Menu.isSelectableType(this.items[var1][0]) || this.items[var1][1] > idiv(this.viewHeight, 3) && this.contentHeight > this.viewHeight;
  }
  private getFirstFocusIndex(): number {
    let var1: number = 0;
    for (let var2: number = 0; var2 < this.itemCount; var2++) {
      var1 += this.items[var2][1];
      if (this.isFocusStop(var2) || var1 > idiv(this.viewHeight, 3) && this.contentHeight > this.viewHeight) {
        return var2;
      }
    }
    return 0;
  }
  private selectItem(var1: number, var2: number): void {
    if (this.itemCount > 0 && var1 < this.itemCount) {
      let var3: number = this.getFirstFocusIndex();
      let var4: Menu = this;
      let var5: number = 0;
      let var6: number = var4.itemCount - 1;
      let var10000: number = 0;
      while (true) {
        if (var6 < 0) {
          var10000 = var4.itemCount - 1;
          break;
        }
        var5 += var4.items[var6][1];
        if (var4.isFocusStop(var6) || var5 > idiv(var4.viewHeight, 3) && var4.contentHeight > var4.viewHeight) {
          var10000 = var6;
          break;
        }
        var6--;
      }
      let var9: number = var10000;
      if (var1 < var3) {
        var1 = var3;
      }
      if (var1 >= var9) {
        var1 = var9;
      }
      let var8: Int32Array = this.items[this.selectedIndex];
      let var10: Int32Array = this.items[var1];
      var5 = var8[0];
      var6 = var10[0];
      let var7: number = this.selectedIndex;
      this.selectedIndex = var1;
      if (this.leftSoftKeyCommand === (-1) && Menu.isSelectableType(var6)) {
        this.leftSoftKeyCommand = 4102;
        this.leftSoftKeyIcon = 16518;
      } else if (this.leftSoftKeyCommand === 4102 && !Menu.isSelectableType(var6)) {
        this.leftSoftKeyCommand = -1;
      }
      Menu.onItemFocusChanged(var5, var8, false);
      Menu.onItemFocusChanged(var6, var10, true);
      this.computeItemOffsets();
      if (Menu.isSelectableType(var6)) {
        this.scrollTarget = this.itemOffsets[var1] + idiv(var10[1], 2);
      } else if (Menu.isSelectableType(var5)) {
        this.scrollTarget = this.itemOffsets[var1];
        if (var7 === var1 + 1 && var2 === 2) {
          this.scrollTarget = this.scrollTarget + var10[1];
        }
      }
      if (this.scrollTarget > this.contentHeight - idiv(this.viewHeight, 2)) {
        this.scrollTarget = this.contentHeight - idiv(this.viewHeight, 2);
      }
      if (this.scrollTarget < idiv(this.viewHeight, 2)) {
        this.scrollTarget = idiv(this.viewHeight, 2);
      }
      Menu.tickerValid = false;
    }
  }
  private activateItem(var1: number): boolean {
    let var2: Int32Array = null;
    if (((var2 = this.items[var1])[2] & 1) !== 0) {
      return true;
    }
    switch (var2[0]) {
      case 201:
      case 202:
      case 203:
        App.dispatchCommand(var2[4], var2[5]);
        break;
      case 204:
      default:
        return Menu.onItemValueChanged(var2[0], var2);
      case 205:
        let var3: number = 0;
        if ((var3 = var2[4]) === 0) {
          var2[6] = 1 - var2[6];
          Menu.onItemValueChanged(var2[0], var2);
        } else if (var2[6] === 0) {
          for (let var4: number = 0; var4 < this.itemCount; var4++) {
            let var5: Int32Array = this.items[var4];
            if (var4 !== var1 && var5[0] === 205 && var5[4] === var3) {
              var5[6] = 0;
              Menu.onItemValueChanged(var2[0], var5);
            }
          }
          var2[6] = 1;
          Menu.onItemValueChanged(var2[0], var2);
        }
    }
    return true;
  }
  private computeItemOffsets(): void {
    this.contentHeight = 0;
    for (let var1: number = 0; var1 < this.itemCount; var1++) {
      let var2: Int32Array = null;
      if ((var2 = this.items[var1]) !== null) {
        this.itemOffsets[var1] = this.contentHeight;
        this.contentHeight = this.contentHeight + var2[1];
      }
    }
    this.itemOffsets[this.itemCount] = this.contentHeight;
  }
  handleAction(var1: number, var2: boolean, var3: boolean): boolean {
    let row: Int32Array = this.items[this.selectedIndex];
    let handled: boolean = false;
    switch (row[0]) {
      case 206:
        if (var1 === 3 || var1 === 4) {
          let value: number = 0;
          if (var1 === 3) {
            value = App.getSetting(row[6]) - row[8];
            if (value < row[3]) {
              value = row[3];
            }
          } else {
            value = App.getSetting(row[6]) + row[8];
            if (value > row[4]) {
              value = row[4];
            }
          }
          row[5] = value;
          let partner: number = row[6] === 4 ? 5 : 4;
          for (let i: number = 0; i < this.itemCount; i++) {
            let other: Int32Array = this.items[i];
            if (other[0] === 206 && other[6] === partner) {
              App.setSetting(other[6], other[3]);
              other[5] = other[3];
              break;
            }
          }
          App.setSetting(row[6], value);
          if (row[6] === 4) {
            if (Game.level !== null) {
              Engine.applyVolumeSetting(row[6], Engine.randomRange(2, 7));
            } else {
              Engine.applyVolumeSetting(row[6], 0);
            }
          } else {
            Engine.stopAllSounds();
            Engine.applyVolumeSetting(row[6], 30);
          }
          handled = true;
        }
        break;
      case 207:
        if (var1 === 3) {
          if (--row[5] < 0) {
            row[5] = 0;
          }
          handled = true;
        } else if (var1 === 4) {
          if (++row[5] > row[4]) {
            row[5] = row[4];
          }
          handled = true;
        }
        break;
    }
    if (handled) {
      return true;
    }
    let result: boolean = false;
    switch (var1) {
      case 2:
        Menu.tickerValid = false;
        if (this.itemCount !== 0) {
          if (Menu.isSelectableType(this.items[this.selectedIndex][0])) {
            if (!var3) {
              let target: number = this.selectedIndex - 1;
              if (target >= 0) {
                let found: number = target;
                for (let k: number = target; k > 0; k--) {
                  if (this.isFocusStop(k)) {
                    found = k;
                    break;
                  }
                }
                target = found;
              }
              if (target < 0 || target < this.getFirstFocusIndex()) {
                target = this.itemCount - 1;
              }
              this.selectItem(target, var1);
            }
          } else {
            this.scrollTarget -= 16;
            if (this.viewHeight > this.contentHeight) {
              this.scrollTarget = idiv(this.viewHeight, 2);
              return true;
            }
            if (this.scrollTarget < this.itemOffsets[this.selectedIndex] || this.scrollTarget < idiv(this.viewHeight, 2)) {
              if (this.selectedIndex > 0 && this.selectedIndex > this.getFirstFocusIndex()) {
                this.selectItem(this.selectedIndex - 1, var1);
              } else {
                this.scrollTarget = idiv(this.viewHeight, 2);
              }
            }
          }
        }
        break;
      case 5:
        Menu.tickerValid = false;
        if (this.itemCount !== 0) {
          if (Menu.isSelectableType(this.items[this.selectedIndex][0])) {
            if (!var3) {
              let target: number = this.selectedIndex + 1;
              if (target < this.itemCount) {
                let found: number = target;
                for (let k: number = target; k < this.itemCount; k++) {
                  if (this.isFocusStop(k)) {
                    found = k;
                    break;
                  }
                }
                target = found;
              }
              if (target >= this.itemCount) {
                target = 0;
              }
              this.selectItem(target, var1);
              return true;
            }
          } else {
            this.scrollTarget += 16;
            if (this.viewHeight > this.contentHeight) {
              this.scrollTarget = idiv(this.viewHeight, 2);
              return true;
            }
            if (this.scrollTarget >= this.itemOffsets[this.selectedIndex + 1] || this.scrollTarget > this.contentHeight - idiv(this.viewHeight, 2)) {
              if (this.selectedIndex < this.itemCount - 1) {
                this.selectItem(this.selectedIndex + 1, var1);
              } else {
                this.scrollTarget = this.contentHeight - idiv(this.viewHeight, 2);
              }
            }
          }
        }
        break;
      case 6:
        if (this.fireCommand !== (-1) && !var3) {
          App.dispatchCommand(this.fireCommand, this.fireArg);
          result = true;
        } else if (this.itemCount !== 0 && !var3) {
          result = this.activateItem(this.selectedIndex);
        }
        break;
      case 7:
        if (this.leftSoftKeyCommand === 4102) {
          if (!var3) {
            this.activateItem(this.selectedIndex);
          }
        } else if (this.leftSoftKeyCommand !== (-1)) {
          App.dispatchCommand(this.leftSoftKeyCommand, this.leftSoftKeyArg);
        }
        result = true;
        break;
      case 8:
        App.dispatchCommand(this.rightSoftKeyCommand, this.rightSoftKeyArg);
        result = true;
        break;
    }
    return result;
  }
  private drawItemLabel(var1: Graphics, var2: string, var3: number, var4: number, var5: number, var6: boolean): void {
    if (var6 && !this.scrolling && App.getTopMenu() === this) {
      if (!Menu.tickerValid) {
        Menu.tickerValid = true;
        Menu.tickerState = Engine.initTicker(Menu.tickerState, var2, Menu.itemX, Menu.itemCenterY, Menu.itemWidth, Menu.itemHeight, var3, var4, var5);
      }
      Engine.drawTicker(var1, Menu.tickerState, var2, 2);
      Engine.resetClip(var1);
    } else {
      var1.setClip(Menu.itemX, this.viewTop, Menu.itemWidth, this.viewHeight);
      if (Engine.stringWidth(var2, Engine.getFont(2)) < Menu.itemWidth) {
        Engine.drawText(var1, Menu.itemX + ((var3 & 1) !== 0 ? idiv(Menu.itemWidth, 2) : 0), Menu.itemCenterY, var2, 2, var3, 1, var4, var5);
      } else {
        Engine.drawText(var1, Menu.itemX, Menu.itemCenterY, var2, 2, var3 & (-14) | 4, 1, var4, var5);
      }
    }
  }
  private drawCenteredLabel(var1: Graphics, var2: string, var3: number, var4: number, var5: number, var6: number, var7: number, var8: number): void {
    let var12: string[] = null;
    (var12 = new Array<string>(1).fill(null))[0] = var2;
    var4 = var8;
    var8 = var7;
    var7 = var6;
    let var13: string[] = var12;
    let var11: Graphics = var1;
    let var9: Menu = this;
    Engine.getFontHeight(2);
    var5 = idiv(var9.viewLeft + var9.viewRight, 2);
    for (let var10: number = 0; var10 < var13.length; var10++) {
      Engine.drawText(var11, var5, var4 + Math.imul(var10, Engine.getFontHeight(2)), var13[var10], 2, 17, 1, var7, var8);
    }
  }
  private drawLines(var1: Graphics, var2: string[], var3: number, var4: number, var5: number, var6: number, var7: number): void {
    var3 = Engine.getFontHeight(1);
    var5 = Menu.itemX;
    var7 = Menu.itemY;
    if ((var4 & 1) !== 0) {
      var5 = idiv(this.viewLeft + this.viewRight, 2);
    } else if ((var4 & 8) !== 0) {
      var5 = this.viewRight;
    }
    var1.setClip(var1.getClipX(), this.viewTop, var1.getClipWidth(), this.viewHeight);
    for (let var8: number = 0; var8 < var2.length; var8++) {
      if (var7 + var3 > this.viewTop) {
        Engine.drawText(var1, var5, var7, var2[var8], 1, var4, 0, var6, 0);
      }
      if ((var7 += var3) > this.viewBottom) {
        return;
      }
    }
  }
  static update(var0: Menu): void {
    if (var0 !== null) {
      switch (var0.style as number) {
        case 2:
          if (Engine.isImageLoaded(6)) {
            let var1: number = Engine.getCellWidth(8) - var0.marginLeft;
            if (Menu.mascotSlideX < var1) {
              Menu.mascotSlideY = Menu.mascotSlideX += 2;
            }
          }
        default:
          if (Engine.isImageLoaded(6)) {
            if (var0.style !== 2) {
              let var2: number = Engine.getCellWidth(8) - var0.marginLeft;
              if (Menu.mascotSlideX > 0 && var2 > 0) {
                Menu.mascotSlideY = Menu.mascotSlideX -= 2;
              }
            }
            Menu.driftSpriteARange = Engine.screenWidth + Engine.getCellWidth(10);
            Menu.driftSpriteBRange = Engine.screenWidth + Engine.getCellWidth(11);
            Menu.driftSpriteAX = Engine.screenWidth - Engine.interpolate(0, 0, Menu.driftSpriteARange, App.tickTime % 6500, 6500);
            Menu.driftSpriteBX = Engine.screenWidth - Engine.interpolate(0, 0, Menu.driftSpriteBRange, App.tickTime % 6000, 6000);
            let var3: number = Engine.getImageInfo(8, 2);
            if (Menu.mascotAnimLoops >= 0) {
              if (--Menu.mascotAnimDelay <= 0) {
                Menu.mascotAnimLoops--;
                Menu.mascotAnimDelay = Engine.randomRange(3, 5);
                if (++Menu.mascotAnimFrame >= var3) {
                  Menu.mascotAnimFrame = 0;
                }
              }
            } else {
              Menu.mascotAnimLoops = Engine.randomRange(5, 10);
              Menu.mascotAnimDelay = -1;
            }
            Menu.mascotTalkFrame = false;
            if (Menu.mascotTalkTicks > 0) {
              if (--Menu.mascotTalkTimer <= 0) {
                Menu.mascotTalkTimer = Engine.randomRange(5, 15);
                Menu.mascotTalkTicks--;
              }
              if (Menu.mascotTalkTicks % 2 === 0) {
                Menu.mascotTalkFrame = false;
              } else {
                Menu.mascotTalkFrame = true;
              }
            }
            if (--Menu.field_473 <= 0) {
              Menu.field_473 = Engine.randomRange(50, 100);
              Menu.field_472 = !Menu.field_472;
            }
            if (--Menu.cornerAnimTimer <= 0) {
              if (Menu.field_474) {
                Menu.cornerAnimTimer = Engine.randomRange(12, 25);
              } else {
                Menu.cornerAnimTimer = Engine.randomRange(200, 300);
              }
              Menu.field_474 = !Menu.field_474;
              if (!Menu.field_472) {
                Menu.cornerAnimFrame += 2;
              }
              if (++Menu.cornerAnimFrame >= Engine.getImageInfo(5, 2)) {
                Menu.cornerAnimFrame = Menu.cornerAnimFrame - Engine.getImageInfo(5, 2);
              }
            }
          }
          break;
        case 3:
          return;
        case 4:
          return;
      }
    }
  }
  private static customizeMenu(var0: Menu, var1: number): void {
    Upsell.addMenuItem(var0);
    switch (var1) {
      case 39:
        if (Engine.demoEnabled) {
          var0.setItemField(1, 3, 50);
          var0.setItemField(1, 4, 16433);
        }
        Engine.playMusic(0);
        return;
      case 40:
        var0.removeItem(2);
        if (Engine.saveExists(1)) {
          var0.setItemField(0, 4, 16428);
        } else {
          var0.setItemField(0, 4, 7);
          Game.resetCampaign();
        }
        if (Engine.saveExists(3)) {
          var0.setItemField(1, 4, 16427);
        } else {
          var0.setItemField(1, 4, 16431);
        }
        if (Engine.demoEnabled && Engine.demoTimeLimit <= 0) {
          var0.removeItem(1);
        }
        if (Engine.demoEnabled && Engine.demoGameLimit <= 0) {
          var0.removeItem(0);
          return;
        }
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 52:
      case 53:
      default:
        break;
      case 48:
        let var4: Vector = null;
        if ((var4 = Engine.getLanguageNames()) === null || var4.isEmpty()) {
          return;
        }
        for (let var2: number = 0; var2 < var4.size(); var2++) {
          var0.addItem(Int32Array.of(201, 0, 0, Engine.addText(var4.elementAt(var2) as string, false), 15, var2));
        }
        break;
      case 49:
        Engine.setupDemoMenu(var0, 49);
        return;
      case 50:
        Engine.setupDemoMenu(var0, 50);
        return;
      case 51:
        if (Engine.demoEnabled) {
          var0.setItemField(2, 4, 20530);
        } else if (App.getScreen() === 2) {
          var0.setItemField(2, 4, 20537);
        } else {
          var0.setItemField(2, 4, 20536);
        }
        if (Game.level === null || Game.level.levelIndex === (-1) || Game.level.levelIndex === 0) {
          var0.removeItem(1);
          return;
        }
        break;
      case 54:
        App.backupSettings();
        return;
      case 55:
        var0.insertItem(Int32Array.of(101, 0, 0, Engine.addTempText("(c) " + "29-04-2009 15:22:47".substring(6, 10)), 20), 0);
        let var3: string = App.instance.getAppProperty("MIDlet-Version");
        var0.insertItem(Int32Array.of(101, 0, 0, Engine.addTempText(Engine.getText(263) + " " + var3), 20), 3);
        var0.insertItem(Int32Array.of(109, 0, 0, 10), 4);
        var0.insertItem(Int32Array.of(101, 0, 0, Engine.addTempText(Engine.getText(235)), 20), 5);
        return;
    }
  }
  private static resetSoftKeyPositions(var0: Menu): void {
    var0.leftSoftKeyY = Engine.screenHeight;
    var0.rightSoftKeyX = Engine.screenWidth;
    var0.rightSoftKeyY = Engine.screenHeight;
  }
  static handleMenuCommand(var0: Menu, var1: number, var2: number): void {
    switch (var1) {
      case 8:
        GameUi.startCoinFlip(true);
        return;
      case 10:
        Engine.deleteSave(1);
        Engine.deleteSave(2);
        Game.resetCampaign();
        App.startLoader(4, 0, 12290);
        return;
      case 11:
        Engine.deleteSave(3);
        App.openMapGeneratorMenu();
        App.getTopMenu().rightSoftKeyCommand = 16423;
        App.getTopMenu().rightSoftKeyIcon = 16519;
        return;
      case 12:
        Game.resetSession();
        Game.loadGame(3);
        App.dispatchCommand(2, -2);
        return;
      case 13:
        Game.loadCampaign();
        return;
      case 14:
        var1 = var0.itemCount;
        for (var2 = 0; var2 < var1; ++var2) {
          let var4: Int32Array = var0.items[var2];
          if (var4[0] !== 207) {
            continue;
          }
          switch (var4[3]) {
            case 0:
              Level.openEndSize = var4[5];
              break;
            case 1:
              Level.openEndWater = var4[5];
              break;
            case 2:
              Level.openEndEnemy = var4[5];
              break;
          }
        }
        Game.resetSession();
        Game.level = new Level().$init1(-1);
        App.startLoader(3, 0, 12289);
        return;
      case 16:
        var0.loadMenu(40, -1, false);
        return;
      case 17:
        App.startLoader(0, 0, 12288);
        return;
      case 18:
        App.dispatchCommand(24577, var2);
        return;
      default:
        return;
    }
  }
  private static onItemFocusChanged(var0: number, var1: Int32Array, var2: boolean): void {
    switch (var0) {
      case 201:
      case 202:
      case 203:
        if (var2) {
          Menu.mascotTalkTicks = Engine.getText(var1[3]).length;
          Menu.mascotTalkTimer = 0;
        }
      case 204:
      case 205:
      default:
        return;
      case 206:
    }
  }
  private static onItemValueChanged(var0: number, var1: Int32Array): boolean {
    switch (var0) {
      case 205:
        App.setSetting(var1[5], var1[6]);
        Engine.refreshMusic();
      default:
        return false;
    }
  }
  static drawBackground(var0: Graphics, var1: Menu): void {
    switch (var1.style as number) {
      case 4:
        Engine.drawMenuBackground(var0);
        return;
      case 5:
        Engine.fillScreen(var0, 16777215);
        return;
      default:
        Engine.fillScreen(var0, Engine.getColor(9));
        let var2: number = 0;
        let var3: number = 0;
        var2 = Engine.getCellHeight(12);
        if ((var3 = var1.viewWidth + 3 + 3) < Engine.getCellWidth(13)) {
          var3 = Engine.getCellWidth(13) + 3 + 3;
        }
        var0.setColor(Engine.getColor(10));
        var0.fillRect(idiv(Engine.screenWidth - var3, 2), var2, var3, Engine.screenHeight - var2);
        var0.setColor(Engine.getColor(11));
        var0.drawLine(idiv(Engine.screenWidth - var3, 2), var2, idiv(Engine.screenWidth - var3, 2), Engine.screenHeight);
        var0.drawLine(Engine.screenWidth - idiv(Engine.screenWidth - var3, 2) - 1, var2, Engine.screenWidth - idiv(Engine.screenWidth - var3, 2) - 1, Engine.screenHeight);
        if (Engine.isImageLoaded(1)) {
          Engine.drawImage(var0, Engine.screenWidth >> 1, Engine.screenHeight, 9);
        }
        if (Engine.isImageLoaded(10)) {
          Engine.drawImage(var0, Menu.driftSpriteAX, idiv(Engine.screenHeight, 3), 10);
          Engine.drawImage(var0, Menu.driftSpriteBX, idiv(Engine.screenHeight, 5) + idiv(Engine.screenHeight, 2), 11);
        }
        if (Engine.isImageLoaded(1)) {
          Engine.drawImage(var0, 0, Engine.screenHeight, 1);
          Engine.drawImage(var0, Engine.screenWidth, Engine.screenHeight, 3);
        }
        Engine.drawImage(var0, Engine.screenWidth >> 1, 0, 12);
        Engine.drawImage(var0, Engine.screenWidth >> 1, var2, 13);
        if (var3 > Engine.getCellWidth(13)) {
          let var4: number = var3 - Engine.getCellWidth(13) >> 1;
          let var5: number = Engine.getFrameWidth(13, 16385);
          for (let var6: number = var1.viewLeft - 3; var6 < var1.marginLeft + var4 + var5; var6 += var5) {
            Engine.drawSpriteAnchored(var0, var6, var2, 13, 16385, 6);
            Engine.drawSpriteAnchored(var0, Engine.screenWidth - var6 - 3 + 3, var2, 13, 16385, 10);
          }
          Engine.drawSpriteAnchored(var0, var1.viewLeft - 3, var2, 13, 16384, 6);
          Engine.drawSpriteAnchored(var0, var1.viewLeft + var3 - 3, var2, 13, 16386, 10);
        }
        if (Engine.isImageLoaded(6)) {
          Engine.drawImage(var0, Engine.screenWidth, Engine.screenHeight, 4);
          Engine.drawSprite(var0, Engine.screenWidth, Engine.screenHeight, 5, Menu.cornerAnimFrame);
          Engine.drawImage(var0, 0 - Menu.mascotSlideX, Engine.screenHeight + Menu.mascotSlideY, 6);
          if (Menu.mascotTalkFrame) {
            Engine.drawImage(var0, 0 - Menu.mascotSlideX, Engine.screenHeight + Menu.mascotSlideY, 7);
          }
          Engine.drawSprite(var0, 0 - Menu.mascotSlideX, Engine.screenHeight + Menu.mascotSlideY, 8, Menu.mascotAnimFrame);
        }
    }
  }
  static drawItems(var0: Graphics, var1: Menu): void {
    switch (var1.style as number) {
      case 3:
        var0.setColor(8421504);
        Engine.drawHatch(var0, 0, 0, Engine.screenWidth, Engine.screenHeight);
        Engine.drawPanel(var0, var1.viewLeft - Engine.getCellWidth(113), var1.viewTop - Engine.getCellHeight(113), var1.viewWidth + Math.imul(2, Engine.getCellWidth(113)), var1.viewHeight + Math.imul(2, Engine.getCellHeight(113)), 113);
        break;
      case 4:
        Engine.drawMenuFrame(var0, var1);
    }
    let var7: Graphics = var0;
    let var6: Menu = var1;
    let var2: Menu = var1;
    let var3: number = var1.scrollTarget;
    if (var2.scrollPos - var3 === 1) {
      var2.scrollPos--;
    }
    if (var2.scrollPos - var3 === (-1)) {
      var2.scrollPos++;
    }
    var2.scrollPos = var2.scrollPos + idiv(var3 - var2.scrollPos, 2);
    if (var2.scrolling = var2.scrollPos !== var2.scrollTarget) {
      Menu.tickerValid = false;
    }
    var2.canScrollUp = true;
    var2.canScrollDown = true;
    if (var2.scrollPos <= idiv(var2.viewHeight, 2)) {
      var2.canScrollUp = false;
    }
    if (var2.scrollPos >= var2.contentHeight - idiv(var2.viewHeight, 2) || var2.viewHeight > var2.contentHeight) {
      var2.canScrollDown = false;
    }
    let var8: number = var6.viewTop + idiv(var6.viewHeight, 2) - var6.scrollPos;
    for (let var9: number = 0; var9 < var6.itemCount; var9++) {
      let var4: Int32Array = null;
      let var5: number = (var4 = var6.items[var9])[1];
      if (var8 + var5 > var6.marginTop) {
        Menu.itemX = var6.viewLeft;
        Menu.itemY = var8;
        Menu.itemCenterY = var8 + idiv(var5, 2);
        Menu.itemWidth = var6.viewWidth;
        Menu.itemHeight = var5;
        var7.setClip(Menu.itemX, var8 < var6.viewTop ? var6.viewTop : var8, Menu.itemWidth, Menu.itemHeight);
        Menu.drawItem(var7, var6, var8, var9, var4[0], (var4[2] & 1) === 0, var6.selectedIndex === var9, var4);
      }
      if ((var8 += var5) > var6.viewBottom) {
        break;
      }
    }
    var7.setClip(0, 0, Engine.screenWidth, Engine.screenHeight);
  }
  static drawOverlay(var0: Graphics, var1: Menu): void {
    Engine.resetClip(var0);
    switch (var1.style as number) {
      case 4:
        Engine.drawSoftkeyBar(var0, var1);
        return;
      default:
        if (var1.canScrollDown) {
          Engine.drawSpriteAnchored(var0, idiv(Engine.screenWidth, 2) + 2, Engine.screenHeight, 165, 2, 36);
        }
        if (var1.canScrollUp) {
          Engine.drawSpriteAnchored(var0, idiv(Engine.screenWidth, 2) - 2, Engine.screenHeight, 165, 0, 40);
        }
        if (var1.leftSoftKeyCommand !== (-1)) {
          Engine.drawSprite(var0, 0, var1.leftSoftKeyY, 151, var1.leftSoftKeyIcon);
        }
        if (var1.rightSoftKeyCommand !== (-1)) {
          Engine.drawSprite(var0, var1.rightSoftKeyX, var1.rightSoftKeyY, 151, var1.rightSoftKeyIcon);
        }
    }
  }
  private static drawItem(var0: Graphics, var1: Menu, var2: number, var3: number, var4: number, var5: boolean, var6: boolean, var7: Int32Array): void {
    var0.setClip(var0.getClipX(), var1.viewTop, var0.getClipWidth(), var1.viewHeight);
    switch (var4) {
      case 101:
      case 103:
        var1.drawLines(var0, var1.getItemLines(var3), 1, var7[4], 0, Engine.getColor(15), 0);
        return;
      case 102:
        var1.drawLines(var0, var1.getItemLines(var3), 1, var7[4], 0, 0, 0);
        return;
      case 104:
        let var39: number = var7[3];
        let var46: number = var7[4];
        Menu.itemX = Menu.itemX + (var1.viewWidth - var1.viewLeft >> 1);
        Engine.drawSpriteAnchored(var0, idiv(var1.viewLeft + var1.viewRight, 2), var2, var39, var46, 17);
        Menu.itemY = Menu.itemY + Engine.getCellHeight(var39);
        var1.drawLines(var0, var1.getItemLines(var3), 1, 17, 0, Engine.getColor(15), 0);
        break;
      case 105:
        let var38: number = var7[3];
        let var45: number = var7[4];
        Engine.drawSprite(var0, var1.viewLeft, var2, var38, var45);
        return;
      case 106:
        let var36: number = var1.viewLeft + (var1.viewWidth >> 1);
        let var44: number = 0;
        if (var7[9] >= 1) {
          var3 = 3;
          while (--var3 >= 0) {
            if (var7[3 + (var3 << 1)] > 0) {
              var44 += Engine.getCellWidth(var7[3 + (var3 << 1)]) + 2;
            }
          }
        }
        var36 += var44 >> 1;
        var3 = 3;
        while (--var3 >= 0) {
          if (var7[3 + (var3 << 1)] > 0) {
            if (var7[9] >= 1) {
              var36 -= Engine.getCellWidth(var7[3 + (var3 << 1)]) + 2;
            }
            Engine.drawSpriteAnchored(var0, var36, var2, var7[3 + (var3 << 1)], var7[4 + (var3 << 1)], 20);
          }
        }
        return;
      case 107:
        let var34: number = var1.viewLeft + (var1.viewWidth >> 1);
        let var43: number = 0;
        var3 = 3;
        while (--var3 >= 0) {
          if (var7[3 + (var3 << 1)] > 0) {
            var43 = (var43 + 18) << 24 >> 24;
          }
        }
        var34 += var43 >> 1;
        var3 = 3;
        while (--var3 >= 0) {
          if (var7[3 + (var3 << 1)] > 0) {
            var34 -= 18;
            if (var7[3 + (var3 << 1)] !== 1048576 && var7[3 + (var3 << 1)] !== 983040) {
              GameUi.drawIconSlot(var0, var34, var2, var7[3 + (var3 << 1)] | 1, false);
            } else {
              GameUi.drawIconSlotWithBadge(var0, var34 + (var7[4 + (var3 << 1)] === 16487 ? (-18) : 0), var2, var7[3 + (var3 << 1)], false, var7[4 + (var3 << 1)], var7[4 + (var3 << 1)] === 16487);
              if (var7[4 + (var3 << 1)] === 16487) {
                GameUi.drawProgressBar(var0, var34 + 9, var2, 1048577, 2, var5, 18);
              }
            }
          }
        }
        return;
      case 108:
        let var33: number = var7[3];
        let var42: number = var7[4];
        var3 = var7[5];
        let var12: number = var1.viewLeft + (var1.viewWidth >> 1);
        var2 += var7[1];
        if (var3 > 0) {
          var2 -= 16;
          if (var33 === 47) {
            var12 += 16;
          } else {
            var2 -= 10;
            var12 -= 16;
          }
        }
        if (var33 === 43) {
          Engine.drawSprite(var0, var12 + (Engine.getCellWidth(43) >> 1), var2 - (Engine.getCellHeight(43) >> 1), var33, var42);
          Engine.drawSprite(var0, var12 - (Engine.getCellWidth(43) >> 1), var2 - (Engine.getCellHeight(43) >> 1), var33, var42);
          Engine.drawSprite(var0, var12, var2 - Engine.getCellHeight(43), var33, var42);
          Engine.drawSprite(var0, var12, var2, var33, var42);
          Engine.drawSprite(var0, var12 + (Engine.getCellWidth(43) >> 1), var2 - (Engine.getCellHeight(43) >> 1), 44, 16441);
          Engine.drawSprite(var0, var12 - (Engine.getCellWidth(43) >> 1), var2 - (Engine.getCellHeight(43) >> 1), 44, 16440);
          Engine.drawSprite(var0, var12, var2 - Engine.getCellHeight(43), 44, 16439);
          Engine.drawSprite(var0, var12, var2, 44, 16442);
          return;
        }
        if (var33 === 41) {
          Engine.drawImage(var0, var12, var2, 25);
          Engine.drawSprite(var0, var12, var2, var33, var42);
          return;
        }
        Engine.drawSprite(var0, var12, var2, var33, var42);
        if (var7[5] > 0) {
          let var10001: number = var12 + (var33 === 47 ? (-32) : 32);
          var2 += 16;
          Engine.drawSprite(var0, var10001, var2, var33, var3);
          return;
        }
        break;
      case 201:
      case 203:
      case 205:
        if (var4 === 205) {
          let var26: number = Engine.getCellWidth(151);
          Engine.drawSpriteAnchored(var0, Menu.itemX, Menu.itemCenterY, 0, var7[6] === 0 ? 1 : 0, 6);
          Menu.itemX += var26 + 5;
          Menu.itemWidth -= var26 + 5;
        } else if (var6) {
          let var27: number = Engine.getCellWidth(165);
          Menu.itemX += var27;
          Menu.itemWidth -= var27 << 1;
        }
        let var41: number = 0;
        if (var5) {
          if (var6) {
            if (var4 === 203) {
              let var28: boolean = false;
              var41 = Engine.getColor(7);
              var3 = Engine.getColor(8);
            } else {
              let var29: boolean = false;
              var41 = Engine.getColor(16);
              var3 = Engine.getColor(17);
            }
          } else if (var4 === 203) {
            let var30: boolean = false;
            var41 = Engine.getColor(5);
            var3 = Engine.getColor(6);
          } else {
            let var31: boolean = false;
            var41 = Engine.getColor(12);
            var3 = Engine.getColor(13);
          }
        } else {
          let var32: boolean = false;
          var41 = Engine.getColor(12);
          var3 = Engine.getColor(13);
        }
        var1.drawItemLabel(var0, Engine.getText(var7[3]), var4 !== 205 ? 3 : 6, var41, var3, var6);
        if (var6) {
          let var10000: number = Engine.stringWidth(Engine.getText(var7[3]), Engine.getFont(2));
          let var10: boolean = false;
          let var11: number = 0;
          if ((var11 = idiv(var10000, 2)) > idiv(Menu.itemWidth, 2)) {
            var11 = idiv(Menu.itemWidth, 2) - 2;
          }
          var3 = idiv(App.tickTime, 100) % 5;
          let var5i: number = var7[1] - Engine.getFrameHeight(165, 3) >> 1;
          if (var4 !== 205) {
            Engine.drawSpriteAnchored(var0, Menu.itemX + idiv(Menu.itemWidth, 2) - var11 - 5 + var3, var2 + var5i, 165, 1, 24);
            Engine.drawSpriteAnchored(var0, Menu.itemX + idiv(Menu.itemWidth, 2) + var11 + 5 - var3, var2 + var5i, 165, 3, 20);
          }
          return;
        }
        break;
      case 202:
        let var24: number = var7[6] > 0 ? Engine.getColor(37) : Engine.getColor(35);
        var24 = var7[6] > 0 && Game.departmentConquered[var7[5]] ? Engine.getColor(34) : var24;
        var1.drawItemLabel(var0, Engine.getText(var7[3]), 6, !var6 ? var24 : Engine.getColor(16), !var6 ? 16777215 : Engine.getColor(17), var6);
        return;
      case 206:
        Menu.itemCenterY = var2;
        let var23: number = idiv(Math.imul(var7[5], 100), var7[4]);
        var1.drawCenteredLabel(var0, jstr(var23) + "%", 2, 17, 1, Engine.getColor(var6 ? 16 : 12), Engine.getColor(var6 ? 17 : 13), Menu.itemCenterY);
        Menu.itemY = Menu.itemY + Engine.getFontHeight(2);
        let var40: number = Engine.getCellWidth(165);
        GameUi.drawSegmentedBar(var0, var1.viewLeft + var40, Menu.itemY, 0 | idiv(var23, var7[9]), var7[9], var6, var1.viewWidth - (var40 << 1));
        if (var6) {
          if (var7[5] > var7[3]) {
            Engine.drawSpriteAnchored(var0, var1.viewLeft, Menu.itemY, 165, 3, 20);
          }
          if (var7[5] < var7[4]) {
            Engine.drawSpriteAnchored(var0, var1.viewLeft + var1.viewWidth, Menu.itemY, 165, 16518, 24);
            return;
          }
        }
        break;
      case 207:
        let var8: number = Engine.getCellWidth(var7[8]);
        Engine.drawImage(var0, var1.viewLeft, Menu.itemY, var7[8]);
        Engine.drawImage(var0, var1.viewLeft, Menu.itemY, var7[6]);
        Engine.drawSpriteAnchored(var0, var1.viewRight, Menu.itemY, var7[9], 0, 24);
        Engine.drawSpriteAnchored(var0, var1.viewRight, Menu.itemY, var7[7], 0, 24);
        let var9: number = 0;
        switch (var7[3]) {
          case 0:
            var9 = 0;
            break;
          case 1:
            var9 = 524288;
            break;
          case 2:
            var9 = 1245184;
        }
        GameUi.drawSegmentedBar(var0, var1.viewLeft + var8 + 2, Menu.itemY, var9 | var7[5], var7[4], var6, var1.viewWidth - (var8 << 1) - 4);
        return;
    }
  }
  static createDefaultSettings(): Int8Array {
    let var0: Int8Array = null;
    (var0 = new Int8Array(8))[6] = 0;
    var0[7] = 0;
    var0[1] = 1;
    var0[2] = 0;
    var0[0] = 0;
    return var0;
  }
}
