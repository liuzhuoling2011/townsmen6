// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { Hashtable, Vector, arraycopy, d2i, idiv, jstr } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { MapEntity } from "./MapEntity";
import { IntList } from "./IntList";
import { Game } from "./Game";
import { Townsman } from "./Townsman";
import { Engine } from "./Engine";
import { Menu } from "./Menu";
import { MapObject } from "./MapObject";
import { Battle } from "./Battle";
import { GameData } from "./GameData";
import { App } from "./App";
import { Building } from "./Building";
import { MapTile } from "./MapTile";
import { TextBox } from "./TextBox";

export class GameUi {
  static state: number = 0;
  private static previousState: number = 0;
  static cameraX: number = 0;
  static cameraY: number = 0;
  private static messageQueue: Vector = new Vector();
  private static currentMessage: GameUi = null;
  private static cursorX: number = 0;
  private static cursorY: number = 0;
  private static cursorVelocityX: number = 0;
  private static cursorVelocityY: number = 0;
  private static cursorDirX: number = 0;
  private static cursorDirY: number = 0;
  private static cursorTileX: number = 0;
  private static cursorTileY: number = 0;
  private static buildMenuTypes: IntList = new IntList().$init2();
  private static buildMenuMaxLevels: IntList = new IntList().$init2();
  private static cameraCorner0X: number = 0;
  private static cameraCorner0Y: number = 0;
  private static cameraCorner1X: number = 0;
  private static cameraCorner1Y: number = 0;
  private static cameraCorner2X: number = 0;
  private static cameraCorner2Y: number = 0;
  private static cameraCorner3X: number = 0;
  private static cameraCorner3Y: number = 0;
  private static cameraEdge01Length: number = 0;
  private static cameraEdge12Length: number = 0;
  private static cameraEdge30Length: number = 0;
  private static cameraEdge23Length: number = 0;
  private static buildMenuIndex: number = 0;
  private static buildMenuLevel: number = 0;
  private static actionMenuChoice: number = 0;
  private static hoveredTile: MapTile = null;
  private static hoveredObject: MapObject = null;
  static selectedBuilding: Building = null;
  private static hintBox: TextBox = null;
  private static hoverInfoValid: boolean = false;
  private static placementEntity: MapEntity = null;
  private static attachmentParent: Building = null;
  private static attachmentTypes: Int32Array = null;
  private static attachmentIndex: number = 0;
  private static panelX: number = 0;
  private static panelY: number = 0;
  private static panelWidth: number = 0;
  private static panelHeight: number = 0;
  private static panelVisibleRows: number = 0;
  private static panelScrollY: number = 0;
  private static panelScrollMax: number = 0;
  static storageResources: IntList = null;
  static tradeResources: IntList = null;
  private static panelButtonIcons: IntList = new IntList().$init2();
  private static panelButtonActions: IntList = new IntList().$init2();
  private static panelFocus: number = 0;
  private static selectedButton: number = 0;
  private static selectedRow: number = 0;
  private static maxRow: number = 0;
  static visibleTileMaxX: number = 0;
  static visibleTileMinY: number = 0;
  static visibleTileMinX: number = 0;
  static visibleTileMaxY: number = 0;
  private static maxVisibleRows: number = 0;
  private static cursorMaxSpeed: number = 0;
  private static cursorAcceleration: number = 0;
  private static cursorDeceleration: number = 0;
  private static scrollStep: number = 0;
  private static cursorSpeedYFactor: number = 1;
  private static hoveredDepartment: number = (-1);
  private static hoveredDepartmentName: string = "";
  private static lastHoveredDepartment: number = (-1);
  private static departmentHoverAnim: number = 0;
  static campaignLevel: number = 0;
  static campaignStoryStep: number = 0;
  static coinFlipDone: boolean = false;
  private static coinResult: number = (-1);
  private static coinBaseY: number = 0;
  private static coinOffsetY: number = 0;
  private static coinFlipping: boolean = false;
  private static coinFrame: number = 0;
  private static coinSpinSpeed: number = 0;
  private static coinLaunchSpeed: number = 40;
  private static coinGravity: number = 2;
  private static coinVelocityY: number = 0;
  private static flashDepartment: number = (-1);
  private static flashTimer: number = 0;
  private static storyMessagesQueued: boolean = false;
  private static troopsBackup: Int8Array = null;
  private static troopPoolBackup: number = 0;
  private static actionPointsBackup: number = 0;
  private static previousBonusResource: number = 0;
  private static campaignCameraMinX: number = 0;
  private static campaignCameraMaxX: number = 0;
  private static campaignCameraMinY: number = 0;
  private static campaignCameraMaxY: number = 0;
  private static selectedBonusResource: number = 0;
  private static campaignMessageBox: TextBox = null;
  private static newMessage: GameUi = null;
  private static textKeySubstitutions: Hashtable = null;
  private textBox: TextBox = null;
  private portraitFrame: number = (-1);
  field_207: number = 0;
  private panFromX: number = (-1);
  private panFromY: number = (-1);
  private panToX: number = (-1);
  private panToY: number = (-1);
  private shownTime: number = 0;
  private panDuration: number = 0;
  private static messageBoxHeight: number = 64;
  private static defaultPanDuration: number = 1500;
  static updateCamera(): void {
    switch (GameUi.state as number) {
      case (-2):
        let var0: GameUi = GameUi.currentMessage;
        let var1: number = App.tickTime - var0.shownTime;
        GameUi.cameraX = Engine.interpolate(1, var0.panFromX, var0.panToX, var1, var0.panDuration);
        GameUi.cameraY = Engine.interpolate(1, var0.panFromY, var0.panToY, var1, var0.panDuration);
        if (var1 > var0.panDuration && var0.textBox === null) {
          GameUi.showNextMessage();
        }
        break;
      case (-1):
        return;
      case 0:
      case 1:
        if (!GameUi.messageQueue.isEmpty()) {
          GameUi.showNextMessage();
        }
    }
    let var5: number = Math.imul(GameUi.cameraY - GameUi.cameraCorner0Y, GameUi.cameraCorner1X - GameUi.cameraCorner0X) - Math.imul(GameUi.cameraX - GameUi.cameraCorner0X, GameUi.cameraCorner1Y - GameUi.cameraCorner0Y);
    let var6: number = Math.imul(GameUi.cameraY - GameUi.cameraCorner1Y, GameUi.cameraCorner2X - GameUi.cameraCorner1X) - Math.imul(GameUi.cameraX - GameUi.cameraCorner1X, GameUi.cameraCorner2Y - GameUi.cameraCorner1Y);
    let var2: number = Math.imul(GameUi.cameraY - GameUi.cameraCorner2Y, GameUi.cameraCorner3X - GameUi.cameraCorner2X) - Math.imul(GameUi.cameraX - GameUi.cameraCorner2X, GameUi.cameraCorner3Y - GameUi.cameraCorner2Y);
    let var3: number = 0;
    if ((var3 = Math.imul(GameUi.cameraY - GameUi.cameraCorner3Y, GameUi.cameraCorner0X - GameUi.cameraCorner3X) - Math.imul(GameUi.cameraX - GameUi.cameraCorner3X, GameUi.cameraCorner0Y - GameUi.cameraCorner3Y)) > 0 || var5 > 0) {
      GameUi.cursorSpeedYFactor = 3;
    } else if (var2 <= 0 && var6 <= 0) {
      GameUi.cursorSpeedYFactor = 1;
    } else {
      GameUi.cursorSpeedYFactor = 4;
    }
    let var4: boolean = false;
    if (var5 > 0 && var6 > 0) {
      var6 = d2i(var6 / GameUi.cameraEdge12Length);
      if ((var5 = d2i(var5 / GameUi.cameraEdge01Length)) > var6) {
        var6 = 0;
      } else if (var6 > var5) {
        var5 = 0;
      } else {
        GameUi.cameraX = GameUi.cameraCorner1X;
        GameUi.cameraY = GameUi.cameraCorner1Y;
        var4 = true;
      }
    } else if (var6 > 0 && var2 > 0) {
      var6 = d2i(var6 / GameUi.cameraEdge12Length);
      var2 = d2i(var2 / GameUi.cameraEdge23Length);
      if (var6 > var2) {
        var2 = 0;
      } else if (var2 > var6) {
        var6 = 0;
      } else {
        GameUi.cameraX = GameUi.cameraCorner2X;
        GameUi.cameraY = GameUi.cameraCorner2Y;
        var4 = true;
      }
    } else if (var2 > 0 && var3 > 0) {
      var3 = d2i(var3 / GameUi.cameraEdge30Length);
      if ((var2 = d2i(var2 / GameUi.cameraEdge23Length)) > var3) {
        var3 = 0;
      } else if (var3 > var2) {
        var2 = 0;
      } else {
        GameUi.cameraX = GameUi.cameraCorner3X;
        GameUi.cameraY = GameUi.cameraCorner3Y;
        var4 = true;
      }
    } else if (var3 > 0 && var5 > 0) {
      var3 = d2i(var3 / GameUi.cameraEdge30Length);
      var5 = d2i(var5 / GameUi.cameraEdge01Length);
      if (var3 > var5) {
        var5 = 0;
      } else if (var5 > var3) {
        var3 = 0;
      } else {
        GameUi.cameraX = GameUi.cameraCorner0X;
        GameUi.cameraY = GameUi.cameraCorner0Y;
        var4 = true;
      }
    }
    if (!var4) {
      if (var5 > 0) {
        GameUi.projectCameraOntoEdge(GameUi.cameraCorner0X, GameUi.cameraCorner0Y, GameUi.cameraCorner1X, GameUi.cameraCorner1Y);
        return;
      }
      if (var6 > 0) {
        GameUi.projectCameraOntoEdge(GameUi.cameraCorner1X, GameUi.cameraCorner1Y, GameUi.cameraCorner2X, GameUi.cameraCorner2Y);
        GameUi.cameraY--;
        return;
      }
      if (var2 > 0) {
        GameUi.projectCameraOntoEdge(GameUi.cameraCorner2X, GameUi.cameraCorner2Y, GameUi.cameraCorner3X, GameUi.cameraCorner3Y);
        return;
      }
      if (var3 > 0) {
        GameUi.projectCameraOntoEdge(GameUi.cameraCorner3X, GameUi.cameraCorner3Y, GameUi.cameraCorner0X, GameUi.cameraCorner0Y);
      }
    }
  }
  private static projectCameraOntoEdge(var0: number, var1: number, var2: number, var3: number): void {
    let var4: number = GameUi.cameraX;
    let var6: number = GameUi.cameraY;
    let var8: number = var2 - var0;
    let var10: number = var3 - var1;
    let var12: number = 0;
    if ((var12 = ((var4 - var0) * (var2 - var0) + (var6 - var1) * (var3 - var1)) / (var8 * var8 + var10 * var10)) < 0.0) {
      var12 = 0.0;
    }
    if (var12 > 1.0) {
      var12 = 1.0;
    }
    GameUi.cameraX = d2i(var0 + var12 * (var2 - var0));
    GameUi.cameraY = d2i(var1 + var12 * (var3 - var1));
  }
  static updateHoverInfo(): void {
    switch (GameUi.state as number) {
      case 0:
      case 1:
        break;
      case 2:
      case 3:
      case 5:
      default:
        return;
      case 4:
        if (GameUi.hintBox === null) {
          GameUi.setHint(Building.displayName(GameUi.buildMenuTypes.get(GameUi.buildMenuIndex), GameUi.buildMenuLevel));
        }
        break;
      case 6:
        if (GameUi.hintBox === null) {
          GameUi.setHint(Building.displayName(GameUi.attachmentTypes[GameUi.attachmentIndex], 0));
        }
    }
    GameUi.screenToTile(GameUi.cursorX, GameUi.cursorY);
    if (GameUi.cursorVelocityX !== 0 || GameUi.cursorVelocityY !== 0) {
      GameUi.hoverInfoValid = false;
      GameUi.hoveredObject = null;
      GameUi.selectedBuilding = null;
      GameUi.setHint(null);
      if (GameUi.state === 1) {
        GameUi.setState(0);
      }
    } else if (!GameUi.hoverInfoValid) {
      let var10000: boolean = false;
      label126: {
        GameUi.hoverInfoValid = true;
        GameUi.setHint(null);
        if (GameUi.state === 0 || GameUi.state === 1) {
          if (GameUi.cursorX < Engine.getCellWidth(107) && GameUi.cursorY < Engine.getCellHeight(107)) {
            GameUi.setHint(Engine.getText(63));
            var10000 = true;
            break label126;
          }
          if (GameUi.cursorX > Engine.screenWidth - Engine.getCellWidth(108) && GameUi.cursorY < Engine.getCellHeight(108)) {
            GameUi.setHint(Engine.getText(89));
            var10000 = true;
            break label126;
          }
          if (GameUi.cursorX > Engine.getCellWidth(107) && GameUi.cursorX < Engine.getCellWidth(107) + Engine.getCellWidth(112) && GameUi.cursorY < Engine.getCellHeight(112)) {
            switch (Game.weather as number) {
              case 0:
                GameUi.setHint(Engine.getText(72));
                var10000 = true;
                break label126;
              case 1:
                GameUi.setHint(Engine.getText(69));
                var10000 = true;
                break label126;
              case 2:
                GameUi.setHint(Engine.getText(71));
                var10000 = true;
                break label126;
              default:
                var10000 = false;
                break label126;
            }
          }
          if (Game.merchantPresent && GameUi.cursorX < Engine.getCellWidth(112) && GameUi.cursorY > Engine.getCellHeight(107) && GameUi.cursorY < Engine.getCellHeight(107) + Engine.getCellHeight(112)) {
            GameUi.setHint(Engine.getText(68));
            var10000 = true;
            break label126;
          }
          if (Townsman.townies.size() > 0 && GameUi.cursorX > Engine.screenWidth - Engine.getCellWidth(108) - Engine.getCellWidth(112) && GameUi.cursorY < Engine.getCellHeight(112)) {
            if (Game.happiness < 30) {
              GameUi.setHint(Engine.getText(70));
              var10000 = true;
            } else if (Game.happiness >= 90) {
              GameUi.setHint(Engine.getText(66));
              var10000 = true;
            } else {
              var10000 = false;
            }
            break label126;
          }
          if (Building.mainBuilding !== null) {
            if (GameUi.cursorX > Engine.screenWidth - Engine.getCellWidth(112) && GameUi.cursorY > Engine.getCellHeight(108) && GameUi.cursorY < Engine.getCellHeight(108) + Engine.getCellHeight(112)) {
              if (Townsman.homeless.size() > 0) {
                GameUi.setHint(Engine.getText(67));
                var10000 = true;
                break label126;
              }
              if (Building.wells.size() === 0) {
                GameUi.setHint(Engine.getText(73));
                var10000 = true;
                break label126;
              }
            } else if (GameUi.cursorX > Engine.screenWidth - Engine.getCellWidth(112) && GameUi.cursorY > Engine.getCellHeight(108) + Engine.getCellHeight(112) && GameUi.cursorY < Engine.getCellHeight(108) + (Engine.getCellHeight(112) << 1) && Building.wells.size() === 0) {
              GameUi.setHint(Engine.getText(73));
              var10000 = true;
              break label126;
            }
          }
        }
        var10000 = false;
      }
      if (var10000) {
        GameUi.selectedBuilding = null;
        return;
      }
      GameUi.pickObjectUnderCursor();
      if (GameUi.state === 0) {
        GameUi.setState(1);
        return;
      }
    }
  }
  static updateCursor(): void {
    if (GameUi.cursorDirX !== 0) {
      if (Math.abs(GameUi.cursorVelocityX = GameUi.cursorVelocityX + Math.imul(GameUi.cursorAcceleration, GameUi.cursorDirX)) > GameUi.cursorMaxSpeed) {
        GameUi.cursorVelocityX = Math.imul(GameUi.cursorDirX, GameUi.cursorMaxSpeed);
      }
    } else if (Math.abs(GameUi.cursorVelocityX) > GameUi.cursorDeceleration) {
      GameUi.cursorVelocityX = GameUi.cursorVelocityX - Math.imul(GameUi.cursorDeceleration, Engine.sign(GameUi.cursorVelocityX));
    } else {
      GameUi.cursorVelocityX = 0;
    }
    if (GameUi.cursorDirY !== 0) {
      if (Math.abs(GameUi.cursorVelocityY = GameUi.cursorVelocityY + Math.imul(Math.imul(GameUi.cursorAcceleration, GameUi.cursorSpeedYFactor), GameUi.cursorDirY)) > Math.imul(GameUi.cursorMaxSpeed, GameUi.cursorSpeedYFactor)) {
        GameUi.cursorVelocityY = Math.imul(Math.imul(GameUi.cursorDirY, GameUi.cursorMaxSpeed), GameUi.cursorSpeedYFactor);
      }
    } else if (Math.abs(GameUi.cursorVelocityY) > GameUi.cursorDeceleration) {
      GameUi.cursorVelocityY = GameUi.cursorVelocityY - Math.imul(GameUi.cursorDeceleration, Engine.sign(GameUi.cursorVelocityY));
    } else {
      GameUi.cursorVelocityY = 0;
    }
    GameUi.cursorX = GameUi.cursorX + GameUi.cursorVelocityX;
    GameUi.cursorY = GameUi.cursorY + GameUi.cursorVelocityY;
    if (GameUi.state >= 30) {
      if (GameUi.cursorX < idiv(Engine.screenWidth, 10)) {
        GameUi.cameraX = GameUi.cameraX - (idiv(Engine.screenWidth, 10) - GameUi.cursorX);
        GameUi.cursorX = idiv(Engine.screenWidth, 10);
      }
      if (GameUi.cursorY < idiv(Engine.screenHeight, 10)) {
        GameUi.cameraY = GameUi.cameraY - (idiv(Engine.screenHeight, 10) - GameUi.cursorY);
        GameUi.cursorY = idiv(Engine.screenHeight, 10);
      }
      if (GameUi.cursorX > Engine.screenWidth - 2 - idiv(Engine.screenWidth, 10)) {
        GameUi.cameraX = GameUi.cameraX + (GameUi.cursorX - (Engine.screenWidth - 2 - idiv(Engine.screenWidth, 10)));
        GameUi.cursorX = Engine.screenWidth - 2 - idiv(Engine.screenWidth, 10);
      }
      if (GameUi.cursorY > Engine.screenHeight - 3 - idiv(Engine.screenHeight, 10)) {
        GameUi.cameraY = GameUi.cameraY + (GameUi.cursorY - (Engine.screenHeight - 3 - idiv(Engine.screenHeight, 10)));
        GameUi.cursorY = Engine.screenHeight - 3 - idiv(Engine.screenHeight, 10);
        return;
      }
    } else {
      if (GameUi.cursorX < 0) {
        GameUi.cameraX = GameUi.cameraX + GameUi.cursorX;
        GameUi.cursorX = 0;
      }
      if (GameUi.cursorY < 0) {
        GameUi.cameraY = GameUi.cameraY + GameUi.cursorY;
        GameUi.cursorY = 0;
      }
      if (GameUi.cursorX > Engine.screenWidth - 2) {
        GameUi.cameraX = GameUi.cameraX + (GameUi.cursorX - (Engine.screenWidth - 2));
        GameUi.cursorX = Engine.screenWidth - 2;
      }
      if (GameUi.cursorY > Engine.screenHeight - 3) {
        GameUi.cameraY = GameUi.cameraY + (GameUi.cursorY - (Engine.screenHeight - 3));
        GameUi.cursorY = Engine.screenHeight - 3;
      }
    }
  }
  private static clearPanelButtons(): void {
    GameUi.panelButtonIcons.clear();
    GameUi.panelButtonActions.clear();
  }
  private static addPanelButton(var0: number, var1: number): void {
    GameUi.panelButtonIcons.add(var0);
    GameUi.panelButtonActions.add(var1);
    GameUi.selectedButton = GameUi.panelButtonIcons.size - 1;
  }
  private static drawPanelButtons(var0: Graphics, var1: number): void {
    if (GameUi.panelButtonIcons.size > 0) {
      let var2: number = 0;
      if (GameUi.panelButtonIcons.size !== 1) {
        var2 = GameUi.panelX + 15;
      } else {
        var2 = GameUi.panelX + GameUi.panelWidth - 15;
      }
      let var3: number = idiv(GameUi.panelWidth - 30, Math.max(GameUi.panelButtonIcons.size - 1, 1));
      for (let var4: number = 0; var4 < GameUi.panelButtonIcons.size; var4++) {
        Engine.drawSprite(var0, var2 + Math.imul(var3, var4), var1, GameUi.panelButtonIcons.get(var4), GameUi.panelButtonActions.get(var4));
      }
      if (GameUi.panelFocus === 3) {
        Engine.drawSprite(var0, var2 + Math.imul(var3, GameUi.selectedButton), var1, 168, 16562);
      }
    }
  }
  private static selectPrevButton(): void {
    if (GameUi.selectedButton > 0) {
      GameUi.selectedButton--;
    } else {
      GameUi.selectedButton = GameUi.panelButtonIcons.size - 1;
    }
    GameUi.setHint(GameUi.getButtonHint());
    Engine.playSound(30);
  }
  private static selectNextButton(): void {
    if (GameUi.selectedButton < GameUi.panelButtonIcons.size - 1) {
      GameUi.selectedButton++;
    } else {
      GameUi.selectedButton = 0;
    }
    GameUi.setHint(GameUi.getButtonHint());
    Engine.playSound(30);
  }
  private static getSelectedButtonAction(): number {
    return GameUi.panelButtonIcons.get(GameUi.selectedButton) === 161 ? GameUi.panelButtonActions.get(GameUi.selectedButton) : (-1);
  }
  private static getRowHint(): string {
    switch (GameUi.state as number) {
      case 10:
        if (GameUi.selectedRow === 0) {
          return Engine.getText(87);
        }
        return Engine.getText(83);
      case 21:
        if (GameUi.selectedRow === 0) {
          return Engine.getText(60);
        }
        return Engine.getText(61);
      case 26:
        return Engine.getText(81);
      default:
        return null;
    }
  }
  private static getButtonHint(): string {
    switch (GameUi.panelButtonActions.get(GameUi.selectedButton)) {
      case 0:
        return Engine.getText(85);
      case 1:
        return Engine.getText(76);
      case 2:
        return Engine.getText(82);
      case 4:
        if (GameUi.selectedBuilding !== null) {
          return Building.displayName(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level);
        }
      case 3:
      default:
        return null;
      case 5:
        if (GameUi.state === 23 || GameUi.state === 22 || GameUi.state === 29) {
          return Engine.getText(86);
        } else if (GameUi.selectedBuilding === null) {
          return null;
        } else {
          return GameUi.selectedBuilding.isComplete() ? Engine.getText(84) : Engine.getText(75);
        }
    }
  }
  private static drawHintBox(var0: Graphics): void {
    if (Game.gameSpeed >= 1 && Building.mainBuilding !== null) {
      if (GameUi.hintBox !== null) {
        let var1: number = Engine.getCellHeight(113) + Math.max(GameUi.hintBox.height, Engine.getCellHeight(113));
        let var2: number = Engine.screenHeight - var1;
        Engine.drawPanel(var0, Engine.getCellWidth(151) + 1, var2, Engine.screenWidth - Math.imul(2, Engine.getCellWidth(151)) - 2, var1, 113);
        GameUi.hintBox.draw(var0, idiv(Engine.screenWidth, 2), var2 + idiv(var1, 2), 3);
      }
    }
  }
  private static setHint(var0: string): void {
    if (var0 === null) {
      GameUi.hintBox = null;
    } else {
      (GameUi.hintBox = new TextBox().$init0(Engine.screenWidth - 26 - Math.imul(2, Engine.getCellWidth(151)) - 2, Engine.getFontHeight(1), 5)).addText(var0, Int32Array.of(17, -1, -1, 1, 0, Engine.getColor(25), Engine.getColor(25)));
      GameUi.hintBox.setScrollSpeed(2, 0);
      GameUi.hintBox.resetScrollDelay();
    }
  }
  private static drawHoverInfo(var0: Graphics): void {
    if (GameUi.selectedBuilding !== null) {
      if (GameUi.selectedBuilding.battle !== null) {
        let var31: number = GameUi.cursorX;
        let var32: number = GameUi.cursorY;
        let var33: number = 786432 | GameUi.selectedBuilding.battle.propagandistCount();
        let var34: number = 851968 | GameUi.selectedBuilding.battle.soldierCount();
        let var10005: number = 1245184 | GameUi.selectedBuilding.battle.enemyCount();
        let var8: boolean = false;
        let var30: number = var10005;
        let var29: number = var34;
        let var27: number = var33;
        let var22: number = var32;
        let var15: number = var31;
        var0 = var0;
        var15 -= 19;
        var22 -= 54;
        GameUi.drawCountBox(var0, var15, var22, var27, false, 2);
        var22 += 18;
        GameUi.drawCountBox(var0, var15, var22, var29, false, 2);
        var22 += 18;
        GameUi.drawCountBoxIconRight(var0, var15, var22, var30, false, 2);
      } else if (GameUi.selectedBuilding.owner === 0) {
        if (GameUi.selectedBuilding.isComplete()) {
          switch (GameUi.selectedBuilding.buildingType as number) {
            case 2:
              GameUi.drawCursorIcon(var0, GameUi.cursorX, GameUi.cursorY, 327681);
              return;
            case 3:
              GameUi.drawCursorCountBox(var0, GameUi.cursorX, GameUi.cursorY, 1310720 | GameUi.selectedBuilding.workerCount(), 1);
              return;
            case 4:
            case 6:
            case 8:
            case 9:
            case 12:
              if (GameUi.selectedBuilding.primaryWorkerCount() > 0) {
                GameUi.drawCursorCountIcon(var0, GameUi.cursorX, GameUi.cursorY, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.primaryJobGoods());
                return;
              } else {
                GameUi.drawCursorCountBox(var0, GameUi.cursorX, GameUi.cursorY, 1179648, 1);
              }
            case 11:
            default:
              return;
            case 5:
              switch (GameUi.hoveredObject.type as number) {
                case 96:
                  GameUi.drawCursorIcon(var0, GameUi.cursorX, GameUi.cursorY, 262145);
                  return;
                case 112:
                  GameUi.drawCursorCountBox(var0, GameUi.cursorX, GameUi.cursorY, 196608 | Math.max(0, GameUi.hoveredObject.auxA), 2);
                  return;
                case 160:
                  let var14: number = GameUi.selectedBuilding.primaryWorkerCount();
                  let var21: number = GameUi.selectedBuilding.secondaryWorkerCount();
                  if (var14 > 0 && var21 > 0) {
                    GameUi.drawCursorCountTwoIcons(var0, GameUi.cursorX, GameUi.cursorY, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.primaryJobGoods(), GameUi.selectedBuilding.secondaryJobGoods());
                    return;
                  } else if (var14 > 0) {
                    GameUi.drawCursorCountIcon(var0, GameUi.cursorX, GameUi.cursorY, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.primaryJobGoods());
                    return;
                  } else if (var21 > 0) {
                    GameUi.drawCursorCountIcon(var0, GameUi.cursorX, GameUi.cursorY, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.secondaryJobGoods());
                    return;
                  } else {
                    GameUi.drawCursorCountBox(var0, GameUi.cursorX, GameUi.cursorY, 1179648, 1);
                  }
                default:
                  return;
              }
            case 7:
            case 10:
              let var13: number = GameUi.selectedBuilding.primaryWorkerCount();
              let var20: number = GameUi.selectedBuilding.secondaryWorkerCount();
              if (var13 > 0 && var20 > 0) {
                GameUi.drawCursorCountTwoIcons(var0, GameUi.cursorX, GameUi.cursorY, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.primaryJobGoods(), GameUi.selectedBuilding.secondaryJobGoods());
                return;
              } else if (var13 > 0) {
                GameUi.drawCursorCountIcon(var0, GameUi.cursorX, GameUi.cursorY, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.primaryJobGoods());
                return;
              } else {
                if (var20 > 0) {
                  GameUi.drawCursorCountIcon(var0, GameUi.cursorX, GameUi.cursorY, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.secondaryJobGoods());
                  return;
                }
                GameUi.drawCursorCountBox(var0, GameUi.cursorX, GameUi.cursorY, 1179648, 1);
                return;
              }
            case 13:
              GameUi.drawCursorCountBox(var0, GameUi.cursorX, GameUi.cursorY, 786432 | GameUi.selectedBuilding.garrisonCount, 1);
              return;
            case 14:
              GameUi.drawCursorCountBox(var0, GameUi.cursorX, GameUi.cursorY, 851968 | GameUi.selectedBuilding.garrisonCount, 1);
          }
        } else {
          let var10001: number = GameUi.cursorX;
          let var10002: number = GameUi.cursorY;
          let var10003: number = 1179648 | GameUi.selectedBuilding.workerCount();
          let var10004: number = 983040 | GameUi.selectedBuilding.constructionTotal - GameUi.selectedBuilding.constructionRemaining;
          let var5: number = GameUi.selectedBuilding.constructionTotal;
          let var28: number = var10004;
          let var26: number = var10003;
          let var18: number = var10002;
          let var11: number = var10001;
          var0 = var0;
          var11 -= 14;
          var18 -= 37;
          GameUi.drawCountBox(var0, var11, var18, var26, false, 1);
          GameUi.drawProgressBar(var0, var11, var18 + 18 - 1, var28, var5, false, 28);
        }
      } else if (GameUi.selectedBuilding.owner === 1) {
        GameUi.drawCursorIcon(var0, GameUi.cursorX, GameUi.cursorY, 1245185);
      } else {
        GameUi.drawCursorIcon(var0, GameUi.cursorX, GameUi.cursorY, 983040);
      }
    } else if (GameUi.hoveredObject !== null) {
      switch (GameUi.hoveredObject.type as number) {
        case 16:
          GameUi.drawCursorCountBox(var0, GameUi.cursorX, GameUi.cursorY, 0 | GameUi.hoveredObject.auxA, 2);
          return;
        case 32:
          let var4: number = 524289;
          let var3: number = 65537;
          let var2: number = GameUi.cursorY;
          let var1: number = GameUi.cursorX;
          var0 = var0;
          var1 -= 18;
          var2 -= 18;
          GameUi.drawIconSlot(var0, var1, var2, var3, false);
          GameUi.drawIconSlot(var0, var1 + 18, var2, var4, false);
      }
    } else {
      if (GameUi.hoveredTile !== null && GameUi.hoveredTile.isWater()) {
        GameUi.drawCursorIcon(var0, GameUi.cursorX, GameUi.cursorY, 131073);
      }
    }
  }
  private static drawTownInfoPanel(var0: Graphics): void {
    let var1: number = GameUi.panelX + 8;
    let var2: number = GameUi.panelY;
    let var3: number = GameUi.panelY;
    let var11: number = 0;
    let var4: number = var11 = var2 + GameUi.drawPanelTop(var0, GameUi.panelX, var2, GameUi.panelWidth);
    let var5: number = var2 = var11 + GameUi.drawPanelRow(var0, GameUi.panelX, var11, GameUi.panelWidth);
    let var13: number = 0;
    let var6: number = var13 = var2 + GameUi.drawPanelRow(var0, GameUi.panelX, var2, GameUi.panelWidth);
    var2 = var13 + GameUi.drawPanelRow(var0, GameUi.panelX, var13, GameUi.panelWidth);
    if (GameUi.panelY > Math.imul(Engine.getCellHeight(113), 3)) {
      let var15: number = 0;
      let var7: number = var15 = var2 + GameUi.drawPanelDivider(var0, GameUi.panelX, var2, GameUi.panelWidth);
      let var8: number = var2 = var15 + GameUi.drawPanelRow(var0, GameUi.panelX, var15, GameUi.panelWidth);
      let var17: number = 0;
      var2 = (var17 = var2 + GameUi.drawPanelRow(var0, GameUi.panelX, var2, GameUi.panelWidth)) + GameUi.drawPanelBottom(var0, GameUi.panelX, var17, GameUi.panelWidth);
      GameUi.drawCountBox(var0, var1, var7, 786432 | Townsman.propagandists.size(), false, 2);
      GameUi.drawCountBox(var0, var1, var8, 851968 | Townsman.soldiers.size(), false, 2);
      GameUi.drawCountBoxIconRight(var0, var1 + 18 + 20 + 1, var7 + idiv(var8 - var7, 2), 1245184 | Townsman.enemies.size(), false, 2);
    } else {
      var2 += GameUi.drawPanelBottom(var0, GameUi.panelX, var2, GameUi.panelWidth);
    }
    GameUi.drawPanelTitle(var0, GameUi.panelX, var3, GameUi.panelWidth, 16532);
    GameUi.drawLevelStars(var0, GameUi.panelX + GameUi.panelWidth - 6, var3, Building.mainBuilding.level, GameData.getMaxLevel(0));
    GameUi.drawCountBox(var0, var1, var4, 1179648 | Townsman.townies.size(), false, 2);
    GameUi.drawCountBoxWithBadge(var0, var1, var5, 1179648 | Townsman.unemployed.size(), false, 2, 16, false);
    GameUi.drawIconSlotWithBadge(var0, var1, var6, 1048576, false, 16487, true);
    var1 += 39;
    GameUi.drawCountBox(var0, var1, var4, 1310720 | Townsman.townettes.size(), false, 2);
    GameUi.drawCountBoxWithBadge(var0, var1, var5, 983040 | Building.needingWorkers.size(), false, 2, 16, false);
    var1 = GameUi.panelX + 8 + 1 + 18;
    GameUi.drawProgressBar(var0, var1, var6, 1048576 | Game.happiness, 100, false, GameUi.panelWidth - (var1 - GameUi.panelX) - 6);
    GameUi.drawPanelButtons(var0, var2);
  }
  private static drawStoragePanel(var0: Graphics): void {
    let var1: number = GameUi.panelX + 8;
    let var2: number = GameUi.panelY;
    let var3: number = GameUi.panelY;
    let var12: number = 0;
    let var4: number = var12 = var2 + GameUi.drawPanelTop(var0, GameUi.panelX, var2, GameUi.panelWidth);
    let var14: number = 0;
    let var5: number = var14 = (var2 = var12 + GameUi.drawPanelRow(var0, GameUi.panelX, var12, GameUi.panelWidth)) + GameUi.drawPanelDivider(var0, GameUi.panelX, var2, GameUi.panelWidth);
    if (GameUi.panelVisibleRows === GameUi.maxVisibleRows) {
      var2 = var14 + GameUi.drawPanelRow(var0, GameUi.panelX, var14, GameUi.panelWidth);
      var14 = var2 - 9;
      for (let var6: number = 1; var6 < GameUi.panelVisibleRows; var6++) {
        var14 += GameUi.drawPanelRow(var0, GameUi.panelX, var14, GameUi.panelWidth);
      }
    } else {
      for (let var19: number = 0; var19 < GameUi.panelVisibleRows; var19++) {
        var14 += GameUi.drawPanelRow(var0, GameUi.panelX, var14, GameUi.panelWidth);
      }
    }
    let var20: number = var14;
    var2 = var14 + GameUi.drawPanelBottom(var0, GameUi.panelX, var14, GameUi.panelWidth);
    GameUi.drawPanelTitle(var0, GameUi.panelX, var3, GameUi.panelWidth, 158);
    if (GameUi.selectedBuilding !== null) {
      GameUi.drawLevelStars(var0, GameUi.panelX + GameUi.panelWidth - 6, var3, GameUi.selectedBuilding.level, GameData.getMaxLevel(GameUi.selectedBuilding.buildingType));
    }
    GameUi.drawCountBox(var0, var1, var4, Game.getStockPacked(1114112), false, 3);
    var1 += 49;
    GameUi.drawCountBox(var0, var1, var4, Game.getStockPacked(983040) | Game.storageCapacity, false, 2);
    var1 = GameUi.panelX + 8;
    Engine.saveClip(var0);
    var0.setClip(0, var5 - 1, Engine.screenWidth, var20 - var5 + 1);
    var4 = Math.min((var3 = idiv(GameUi.panelScrollY, 18)) + GameUi.panelVisibleRows + 1, GameUi.storageResources.size);
    for (let var7: number = var3; var7 < var4; var7++) {
      let var8: number = Game.getStockPacked(GameUi.storageResources.get(var7));
      GameUi.drawCountBox(var0, var1, var5 - GameUi.panelScrollY + Math.imul(var7, 18), var8, false, 2);
    }
    var1 += 39;
    for (let var21: number = var3; var21 < var4; var21++) {
      let var22: number = Game.getStockPacked(GameUi.storageResources.get(var21));
      GameUi.drawProgressBar(var0, var1, var5 - GameUi.panelScrollY + Math.imul(var21, 18), var22, Game.storageCapacity, false, GameUi.panelWidth - (var1 - GameUi.panelX) - 6);
    }
    Engine.restoreClip(var0);
    GameUi.drawScrollBar(var0, GameUi.panelX + GameUi.panelWidth, var5, var20 - var5, GameUi.panelScrollY, GameUi.panelScrollMax);
    GameUi.drawPanelButtons(var0, var2);
  }
  private static drawTradePanel(var0: Graphics): void {
    if (GameUi.selectedRow !== (-1)) {
      GameUi.panelScrollY = GameUi.panelScrollY + idiv(Math.imul(GameUi.selectedRow - idiv(GameUi.panelVisibleRows, 2), 18) - GameUi.panelScrollY, 2);
    }
    GameUi.panelScrollY = Math.max(0, Math.min(GameUi.panelScrollY, GameUi.panelScrollMax));
    let var1: number = 0;
    let var2: number = 0;
    let var26: number = 0;
    let var3: number = var26 = (var2 = GameUi.panelY) + GameUi.drawPanelTop(var0, GameUi.panelX, var2, GameUi.panelWidth);
    let var28: number = 0;
    let var4: number = var28 = (var2 = var26 + GameUi.drawPanelRow(var0, GameUi.panelX, var26, GameUi.panelWidth)) + GameUi.drawPanelDivider(var0, GameUi.panelX, var2, GameUi.panelWidth);
    if (GameUi.panelVisibleRows === GameUi.maxVisibleRows) {
      var2 = var28 + GameUi.drawPanelRow(var0, GameUi.panelX, var28, GameUi.panelWidth);
      var28 = var2 - 9;
      for (let var5: number = 1; var5 < GameUi.panelVisibleRows; var5++) {
        var28 += GameUi.drawPanelRow(var0, GameUi.panelX, var28, GameUi.panelWidth);
      }
    } else {
      for (let var31: number = 0; var31 < GameUi.panelVisibleRows; var31++) {
        var28 += GameUi.drawPanelRow(var0, GameUi.panelX, var28, GameUi.panelWidth);
      }
    }
    let var32: number = var28;
    var2 = var28 + GameUi.drawPanelBottom(var0, GameUi.panelX, var28, GameUi.panelWidth);
    var1 = GameUi.panelX + 8;
    Engine.saveClip(var0);
    var0.setClip(0, var4 - 1, Engine.screenWidth, var32 - var4 + 1);
    let var6: number = 0;
    let var7: number = Math.min((var6 = idiv(GameUi.panelScrollY, 18)) + GameUi.panelVisibleRows + 1, GameUi.tradeResources.size);
    for (let var8: number = var6; var8 < var7; var8++) {
      let var10000: number = GameUi.tradeResources.get(var8);
      let var9: boolean = false;
      let var10: number = Game.getStockPacked(var10000);
      GameUi.drawCountBox(var0, var1, var4 - GameUi.panelScrollY + Math.imul(var8, 18), var10, GameUi.selectedRow === var8, 2);
    }
    var1 += 39;
    let var33: number = 0;
    let var34: number = 0;
    let var35: number = 0;
    while (var6 < var7) {
      let var11: number = 0;
      let var12: number = Game.packedAmount(var11 = Game.getStockPacked(GameUi.tradeResources.get(var6))) - Game.getMerchantDemand(var11);
      let var13: number = Game.packedAmount(var11) + Game.getMerchantSupply(var11);
      if (GameUi.selectedRow === var6) {
        var34 = Game.packedResource(var11);
        var35 = Game.packedAmount(var11);
        var33 = Game.getMerchantPrice(var11);
        GameUi.drawTradeBar(var0, var1, var4 - GameUi.panelScrollY + Math.imul(var6, 18), var11, var12, var13, Game.storageCapacity, true, GameUi.panelWidth - (var1 - GameUi.panelX) - 6);
        GameUi.drawRowArrows(var0, GameUi.panelX, var4 - GameUi.panelScrollY + Math.imul(var6, 18), GameUi.panelWidth);
      } else {
        GameUi.drawTradeBar(var0, var1, var4 - GameUi.panelScrollY + Math.imul(var6, 18), var11, var12, var13, Game.storageCapacity, false, GameUi.panelWidth - (var1 - GameUi.panelX) - 6);
      }
      var6++;
    }
    Engine.restoreClip(var0);
    GameUi.drawScrollBar(var0, GameUi.panelX + GameUi.panelWidth, var4, var32 - var4, GameUi.panelScrollY, GameUi.panelScrollMax);
    if (GameUi.panelWidth > 121) {
      var1 = GameUi.panelX + GameUi.panelWidth - 48 - 6;
      GameUi.drawCountBox(var0, var1, var3, Game.getStockPacked(1114112), false, 3);
      if (var33 !== 0) {
        var1 = GameUi.panelX + 8;
        GameUi.drawIconSlot(var0, var1, var3, var34 | var35, false);
        var1 += 19;
        Engine.drawSprite(var0, var1, var3 + 9, 152, 0);
        var1 += Engine.getCellWidth(152) + 1;
        GameUi.drawPriceBox(var0, var1, var3, var34 | var33, false, 2);
      } else {
        var1 = GameUi.panelX + 8;
        GameUi.drawEmptyCountBox(var0, var1, var3, false, 0);
        var1 += 19;
        Engine.drawSprite(var0, var1, var3 + 9, 152, 0);
        var1 += Engine.getCellWidth(152) + 1;
        GameUi.drawEmptyCountBox(var0, var1, var3, false, 2);
      }
    } else {
      var1 = GameUi.panelX + GameUi.panelWidth - 38 - 6;
      GameUi.drawCountBox(var0, var1, var3, Game.getStockPacked(1114112), false, 2);
      if (var33 !== 0) {
        var1 = GameUi.panelX + 8;
        GameUi.drawPriceBox(var0, var1, var3, var34 | var33, false, 2);
      } else {
        var1 = GameUi.panelX + 8;
        GameUi.drawEmptyCountBox(var0, var1, var3, false, 2);
      }
    }
    GameUi.drawPanelTitle(var0, GameUi.panelX, GameUi.panelY, GameUi.panelWidth, 157);
    if (GameUi.selectedBuilding !== null) {
      GameUi.drawLevelStars(var0, GameUi.panelX + GameUi.panelWidth - 6, GameUi.panelY, GameUi.selectedBuilding.level, GameData.getMaxLevel(GameUi.selectedBuilding.buildingType));
    }
    GameUi.drawPanelButtons(var0, var2);
  }
  private static drawWorkersPanel(var0: Graphics): void {
    let var1: number = GameUi.panelX + 8;
    let var2: number = 0;
    let var3: number = GameUi.panelY;
    let var4: number = (GameUi.panelFocus === 1 && GameUi.selectedRow === 0 ? 1 : 0);
    let var5: boolean = GameUi.panelFocus === 1 && GameUi.selectedRow === 1;
    var2 = var3;
    let var29: number = 0;
    let var6: number = var29 = var3 + GameUi.drawPanelTop(var0, GameUi.panelX, var3, GameUi.panelWidth);
    let var7: number = var3 = var29 + GameUi.drawPanelRow(var0, GameUi.panelX, var29, GameUi.panelWidth);
    if (GameUi.selectedBuilding.primaryJobCapacity() > 0 && GameUi.selectedBuilding.secondaryJobCapacity() > 0) {
      var3 += GameUi.drawPanelRow(var0, GameUi.panelX, var3, GameUi.panelWidth);
    }
    if (GameData.getGarrisonCapacity(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level) > 0) {
      let var31: number = 0;
      var7 = var31 = var3 + GameUi.drawPanelDivider(var0, GameUi.panelX, var3, GameUi.panelWidth);
      var3 = var31 + GameUi.drawPanelRow(var0, GameUi.panelX, var31, GameUi.panelWidth);
    }
    var3 += GameUi.drawPanelBottom(var0, GameUi.panelX, var3, GameUi.panelWidth);
    GameUi.drawPanelTitle(var0, GameUi.panelX, var2, GameUi.panelWidth, GameUi.getPanelTitleFrame(GameUi.selectedBuilding.buildingType));
    if (GameUi.selectedBuilding !== null) {
      GameUi.drawLevelStars(var0, GameUi.panelX + GameUi.panelWidth - 6, var2, GameUi.selectedBuilding.level, GameData.getMaxLevel(GameUi.selectedBuilding.buildingType));
    }
    GameUi.drawIconSlot(var0, var1, var6, 1179648 | GameUi.selectedBuilding.workerCount(), (var4) !== 0);
    var1 += 19;
    var2 = GameUi.panelWidth - (var1 - GameUi.panelX) - 6;
    GameUi.drawSegmentedBar(var0, var1, var6, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.workerCapacity(), (var4) !== 0, var2);
    if (GameUi.selectedBuilding.primaryJobCapacity() > 0 && GameUi.selectedBuilding.secondaryJobCapacity() > 0) {
      var4 = Game.packedResource(GameUi.selectedBuilding.primaryJobGoods()) | GameUi.selectedBuilding.primaryWorkerCount();
      let var8: number = Game.packedResource(GameUi.selectedBuilding.secondaryJobGoods()) | GameUi.selectedBuilding.secondaryWorkerCount();
      var1 = GameUi.panelX + 8;
      GameUi.drawIconSlot(var0, var1, var7, var4 | 1, var5);
      var1 += 19;
      var2 = GameUi.panelWidth - (var1 - GameUi.panelX) - 6 - 18 - 1;
      let var10005: number = GameUi.selectedBuilding.workerCount();
      let var13: number = var2;
      let var12: number = (var5 ? 1 : 0);
      let var11: number = var10005;
      let var10: number = var8;
      let var9: number = var4;
      var4 = var7;
      var2 = var1;
      let var19: Graphics = var0;
      var2++;
      var4++;
      let var14: number = Math.min(Game.packedAmount(var9), var11);
      var9 = Game.packedResource(var9) >> 16;
      var10 = Game.packedResource(var10) >> 16;
      var9 = var14 > 0 ? Game.field_288[var9] : 96;
      var10 = Game.field_288[var10];
      var12 = (var12) !== 0 ? 95 : 94;
      Engine.drawHorizontalBar(var19, var2, var4, var13, var12);
      var13 -= 4;
      if (var14 === var11) {
        GameUi.drawBarFill(var19, var2, var4, var13, var9);
        for (let var43: number = 1; var43 < var14; var43++) {
          Engine.drawSprite(var19, var2 + Math.imul(var43, idiv(var13, var14)), var4, var9, 16476);
        }
      } else if (var14 <= 0) {
        GameUi.drawBarFill(var19, var2, var4, var13, var10);
        for (let var42: number = 1; var42 < var11; var42++) {
          Engine.drawSprite(var19, var2 + Math.imul(var42, idiv(var13, var11)), var4, var10, 16476);
        }
      } else {
        var12 = Math.imul(idiv(idiv(Math.imul(var14, var13), var11), var14), var14);
        GameUi.drawBarFill(var19, var2, var4, var12, var9);
        for (let var15: number = 1; var15 < var14; var15++) {
          Engine.drawSprite(var19, var2 + Math.imul(var15, idiv(var12, var14)), var4, var9, 16476);
        }
        if (var13 - var12 - 2 > 0) {
          GameUi.drawBarFill(var19, var2 + var12 + 2, var4, var13 - var12 - 2, var10);
        }
        for (let var45: number = 1; var45 < var11 - var14; var45++) {
          Engine.drawSprite(var19, var2 + var12 + Math.imul(var45, idiv(var13, var11)), var4, var10, 16476);
        }
      }
      var1 = GameUi.panelX + GameUi.panelWidth - 18 - 6;
      GameUi.drawIconSlot(var0, var1, var7, var8 | 1, var5);
    }
    if (GameData.getGarrisonCapacity(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level) > 0) {
      var1 = GameUi.panelX + 8;
      GameUi.drawIconSlot(var0, var1, var7, GameUi.selectedBuilding.garrisonGoods(), false);
      var1 += 19;
      var2 = GameUi.panelWidth - (var1 - GameUi.panelX) - 6;
      GameUi.drawSegmentedBar(var0, var1, var7, GameUi.selectedBuilding.garrisonGoods(), GameData.getGarrisonCapacity(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level), false, var2);
    }
    GameUi.drawPanelButtons(var0, var3);
    if (GameUi.panelFocus === 1) {
      if (GameUi.selectedRow === 0) {
        GameUi.drawRowArrows(var0, GameUi.panelX, var6, GameUi.panelWidth);
        return;
      }
      GameUi.drawRowArrows(var0, GameUi.panelX, var7, GameUi.panelWidth);
    }
  }
  private static drawConstructionPanel(var0: Graphics): void {
    let var1: number = GameUi.panelX + 8;
    let var2: number = 0;
    let var3: number = GameUi.panelY;
    let var4: number = (GameUi.panelFocus === 1 && GameUi.selectedRow === 0 ? 1 : 0);
    var2 = var3;
    let var15: number = 0;
    let var5: number = var15 = var3 + GameUi.drawPanelTop(var0, GameUi.panelX, var3, GameUi.panelWidth);
    let var17: number = 0;
    let var6: number = var17 = (var3 = var15 + GameUi.drawPanelRow(var0, GameUi.panelX, var15, GameUi.panelWidth)) + GameUi.drawPanelDivider(var0, GameUi.panelX, var3, GameUi.panelWidth);
    var3 = (var3 = var17 + GameUi.drawPanelRow(var0, GameUi.panelX, var17, GameUi.panelWidth)) + GameUi.drawPanelBottom(var0, GameUi.panelX, var3, GameUi.panelWidth);
    GameUi.drawPanelTitle(var0, GameUi.panelX, var2, GameUi.panelWidth, GameUi.getPanelTitleFrame(GameUi.selectedBuilding.buildingType));
    if (GameUi.selectedBuilding !== null) {
      GameUi.drawLevelStars(var0, GameUi.panelX + GameUi.panelWidth - 6, var2, GameUi.selectedBuilding.level, GameData.getMaxLevel(GameUi.selectedBuilding.buildingType));
    }
    GameUi.drawIconSlot(var0, var1, var5, 1179648 | GameUi.selectedBuilding.workerCount(), (var4) !== 0);
    var1 += 19;
    var2 = GameUi.panelWidth - (var1 - GameUi.panelX) - 6;
    GameUi.drawSegmentedBar(var0, var1, var5, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.workerCapacity(), (var4) !== 0, var2);
    var4 = GameUi.selectedBuilding.constructionTotal - GameUi.selectedBuilding.constructionRemaining;
    var1 = GameUi.panelX + 8;
    GameUi.drawIconSlot(var0, var1, var6, 983040 | var4, false);
    var1 += 19;
    let var7: number = Townsman.unemployed.size() >= 10 ? 2 : 1;
    var2 = GameUi.panelWidth - (var1 - GameUi.panelX) - 6 - 18 - Math.imul(var7, 10) - 1;
    GameUi.drawProgressBar(var0, var1, var6, 983040 | var4, GameUi.selectedBuilding.constructionTotal, false, var2);
    var1 = GameUi.panelX + GameUi.panelWidth - 6 - 18 - Math.imul(var7, 10);
    GameUi.drawCountBoxWithBadge(var0, var1, var6, 1179648 | Townsman.unemployed.size(), false, var7, 16, false);
    GameUi.drawPanelButtons(var0, var3);
    if (GameUi.panelFocus === 1 && GameUi.selectedRow === 0) {
      GameUi.drawRowArrows(var0, GameUi.panelX, var5, GameUi.panelWidth);
    }
  }
  private static drawBattlePanel(var0: Graphics): void {
    let var1: number = GameUi.panelX + 8;
    let var2: number = 0;
    let var3: number = GameUi.panelY;
    let var4: number = (GameUi.panelFocus === 1 && GameUi.selectedRow === 0 ? 1 : 0);
    let var5: number = (GameUi.panelFocus === 1 && GameUi.selectedRow === 1 ? 1 : 0);
    let var23: number = 0;
    let var6: number = var23 = var3 + GameUi.drawPanelTop(var0, GameUi.panelX, var3, GameUi.panelWidth);
    let var7: number = var3 = var23 + GameUi.drawPanelRow(var0, GameUi.panelX, var23, GameUi.panelWidth);
    let var25: number = 0;
    let var26: number = 0;
    let var8: number = var26 = (var25 = var3 + GameUi.drawPanelRow(var0, GameUi.panelX, var3, GameUi.panelWidth)) + GameUi.drawPanelDivider(var0, GameUi.panelX, var25, GameUi.panelWidth);
    var3 = (var3 = var26 + GameUi.drawPanelRow(var0, GameUi.panelX, var26, GameUi.panelWidth)) + GameUi.drawPanelBottom(var0, GameUi.panelX, var3, GameUi.panelWidth);
    GameUi.drawPanelTitle(var0, GameUi.panelX, GameUi.panelY, GameUi.panelWidth, 16532);
    GameUi.drawIconSlot(var0, var1, var6, 786432 | (GameUi.selectedBuilding.battle !== null ? GameUi.selectedBuilding.battle.propagandistCount() : 0), (var4) !== 0);
    var1 += 19;
    var2 = GameUi.panelWidth - (var1 - GameUi.panelX) - 6;
    GameUi.drawSegmentedBar(var0, var1, var6, 786432 | (GameUi.selectedBuilding.battle !== null ? GameUi.selectedBuilding.battle.propagandistCount() : 0), 5, (var4) !== 0, var2);
    var1 = GameUi.panelX + 8;
    GameUi.drawIconSlot(var0, var1, var7, 851968 | (GameUi.selectedBuilding.battle !== null ? GameUi.selectedBuilding.battle.soldierCount() : 0), (var5) !== 0);
    var1 += 19;
    var2 = GameUi.panelWidth - (var1 - GameUi.panelX) - 6;
    GameUi.drawSegmentedBar(var0, var1, var7, 851968 | (GameUi.selectedBuilding.battle !== null ? GameUi.selectedBuilding.battle.soldierCount() : 0), 5, (var5) !== 0, var2);
    var1 = GameUi.panelX + GameUi.panelWidth - 18 - 6;
    GameUi.drawIconSlot(var0, var1, var8, 1245184 | (GameUi.selectedBuilding.battle !== null ? GameUi.selectedBuilding.battle.enemyCount() : 0), false);
    var1 = GameUi.panelX + 8;
    var2 = GameUi.panelWidth - 33;
    let var10003: number = 1245184 | (GameUi.selectedBuilding.battle !== null ? GameUi.selectedBuilding.battle.enemyCount() : 0);
    let var34: number = var2;
    var5 = var10003;
    var4 = var8;
    var2 = var1;
    let var17: Graphics = var0;
    var2++;
    var4++;
    let var9: number = Math.min(Game.packedAmount(var5), 5);
    var5 = Game.packedResource(var5) >> 16;
    var5 = Game.field_288[var5];
    Engine.drawHorizontalBar(var17, var2, var4, var34, 94);
    var8 = var34 - 4;
    if (var9 === 5) {
      GameUi.drawBarFill(var17, var2, var4, var8, var5);
      for (let var10: number = 1; var10 < var9; var10++) {
        Engine.drawSprite(var17, var2 + Math.imul(var10, idiv(var8, var9)), var4, var5, 16476);
      }
    } else if (var9 > 0) {
      let var36: number = Math.imul(idiv(idiv(Math.imul(var9, var8), 5), var9), var9);
      GameUi.drawBarFill(var17, var2 + (var8 - var36), var4, var36, var5);
      for (let var11: number = 1; var11 < var9; var11++) {
        Engine.drawSprite(var17, var2 + (var8 - var36) + Math.imul(var11, idiv(var36, var9)), var4, var5, 16476);
      }
      if (var8 - var36 - 2 > 0) {
        GameUi.drawBarFill(var17, var2, var4, var8 - var36 - 2, 96);
      }
      for (let var38: number = 1; var38 < 5 - var9; var38++) {
        Engine.drawSprite(var17, var2 + Math.imul(var38, idiv(var8, 5)), var4, 96, 16476);
      }
    } else {
      GameUi.drawBarFill(var17, var2, var4, var8, 96);
      for (let var37: number = 1; var37 < 5; var37++) {
        Engine.drawSprite(var17, var2 + Math.imul(var37, idiv(var8, 5)), var4, 96, 16476);
      }
    }
    GameUi.drawPanelButtons(var0, var3);
    if (GameUi.panelFocus === 1) {
      if (GameUi.selectedRow === 0) {
        GameUi.drawRowArrows(var0, GameUi.panelX, var6, GameUi.panelWidth);
        return;
      }
      GameUi.drawRowArrows(var0, GameUi.panelX, var7, GameUi.panelWidth);
    }
  }
  private static drawUniversityPanel(var0: Graphics): void {
    let var1: number = GameUi.panelX + 8;
    let var2: number = 0;
    let var3: number = GameUi.panelY;
    let var4: number = (GameUi.panelFocus === 1 && GameUi.selectedRow === 0 ? 1 : 0);
    var2 = var3;
    let var15: number = 0;
    let var5: number = var15 = var3 + GameUi.drawPanelTop(var0, GameUi.panelX, var3, GameUi.panelWidth);
    let var17: number = 0;
    let var6: number = var17 = (var3 = var15 + GameUi.drawPanelRow(var0, GameUi.panelX, var15, GameUi.panelWidth)) + GameUi.drawPanelDivider(var0, GameUi.panelX, var3, GameUi.panelWidth);
    var3 = (var3 = var17 + GameUi.drawPanelRow(var0, GameUi.panelX, var17, GameUi.panelWidth)) + GameUi.drawPanelBottom(var0, GameUi.panelX, var3, GameUi.panelWidth);
    GameUi.drawPanelTitle(var0, GameUi.panelX, var2, GameUi.panelWidth, GameUi.getPanelTitleFrame(GameUi.selectedBuilding.buildingType));
    if (GameUi.selectedBuilding !== null) {
      GameUi.drawLevelStars(var0, GameUi.panelX + GameUi.panelWidth - 6, var2, GameUi.selectedBuilding.level, GameData.getMaxLevel(GameUi.selectedBuilding.buildingType));
    }
    GameUi.drawIconSlot(var0, var1, var5, 1179648 | GameUi.selectedBuilding.workerCount(), (var4) !== 0);
    var1 += 19;
    var2 = GameUi.panelWidth - (var1 - GameUi.panelX) - 6;
    GameUi.drawSegmentedBar(var0, var1, var5, 1179648 | GameUi.selectedBuilding.workerCount(), GameUi.selectedBuilding.workerCapacity(), (var4) !== 0, var2);
    var1 = GameUi.panelX + 8;
    GameUi.drawIconSlot(var0, var1, var6, 917504 | Game.researchProgress, false);
    var1 += 19;
    var4 = Townsman.unemployed.size() >= 10 ? 2 : 1;
    var2 = GameUi.panelWidth - (var1 - GameUi.panelX) - 6 - 18 - Math.imul(var4, 10) - 1;
    let var7: number = Math.min(GameData.researchPointsPerLevel.length - 1, Game.researchLevel);
    GameUi.drawProgressBar(var0, var1, var6, 917504 | Game.researchProgress, GameData.researchPointsPerLevel[var7], false, var2);
    var7 = Math.min(GameData.researchPointsPerLevel.length, Game.researchLevel);
    var1 = GameUi.panelX + GameUi.panelWidth - 6 - 18 - Math.imul(var4, 10);
    GameUi.drawCountBoxWithBadge(var0, var1, var6, 917504 | var7, false, var4, -1, false);
    GameUi.drawPanelButtons(var0, var3);
    if (GameUi.panelFocus === 1 && GameUi.selectedRow === 0) {
      GameUi.drawRowArrows(var0, GameUi.panelX, var5, GameUi.panelWidth);
    }
  }
  private static drawResidencePanel(var0: Graphics): void {
    let var1: number = GameUi.panelX + 8;
    let var2: number = GameUi.panelY;
    let var3: number = GameUi.panelY;
    let var6: number = 0;
    let var4: number = var6 = var2 + GameUi.drawPanelTop(var0, GameUi.panelX, var2, GameUi.panelWidth);
    var2 = (var2 = var6 + GameUi.drawPanelRow(var0, GameUi.panelX, var6, GameUi.panelWidth)) + GameUi.drawPanelBottom(var0, GameUi.panelX, var2, GameUi.panelWidth);
    GameUi.drawPanelTitle(var0, GameUi.panelX, var3, GameUi.panelWidth, GameUi.getPanelTitleFrame(GameUi.selectedBuilding.buildingType));
    if (GameUi.selectedBuilding !== null) {
      GameUi.drawLevelStars(var0, GameUi.panelX + GameUi.panelWidth - 6, var3, GameUi.selectedBuilding.level, GameData.getMaxLevel(GameUi.selectedBuilding.buildingType));
    }
    GameUi.drawCountBox(var0, var1, var4, 1179648 | GameData.houseCapacity[GameUi.selectedBuilding.level], false, 2);
    var1 += 39;
    GameUi.drawCountBox(var0, var1, var4, 1310720 | GameUi.selectedBuilding.workerCapacity(), false, 2);
    GameUi.drawPanelButtons(var0, var2);
  }
  private static drawActionMenu(var0: Graphics): void {
    switch (GameUi.actionMenuChoice as number) {
      case 1:
        Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 166, 16553);
        if (idiv(App.tickTime, 100) % 2 === 0) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16538);
          return;
        }
        break;
      case 2:
        Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 166, Game.canTrade() ? 16556 : 16555);
        if (idiv(App.tickTime, 100) % 2 === 0) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16541);
          return;
        }
        break;
      case 3:
        Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 166, 16554);
        if (idiv(App.tickTime, 100) % 2 === 0) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16540);
          return;
        }
        break;
      case 4:
        Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 166, 16557);
        if (idiv(App.tickTime, 100) % 2 === 0) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16539);
          return;
        }
        break;
      default:
        GameUi.drawActionMenuCenter(var0, GameUi.cursorX, GameUi.cursorY);
        if (Game.buildMenuEnabled && GameUi.buildMenuTypes.size > 0) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 166, 16553);
        }
        if (Building.mainBuilding !== null) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 166, 16557);
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 166, Game.canTrade() ? 16556 : 16555);
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 166, 16554);
        }
        if (Game.buildMenuEnabled && GameUi.buildMenuTypes.size > 0) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16538);
        }
        if (Building.mainBuilding !== null) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16539);
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16540);
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16541);
        }
        Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 168, 16562);
    }
  }
  private static drawCursor(var0: Graphics): void {
    switch (GameUi.state as number) {
      case 4:
      case 6:
        Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 168, 16563);
        return;
      default:
        let var1: boolean = false;
        if (GameUi.cursorX < idiv(Engine.getCellWidth(165), 2)) {
          var1 = true;
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16544);
        } else if (GameUi.cursorX > Engine.screenWidth - idiv(Engine.getCellWidth(165), 2)) {
          var1 = true;
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16545);
        } else if (GameUi.cursorY < idiv(Engine.getCellHeight(165), 2)) {
          var1 = true;
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16542);
        } else if (GameUi.cursorY > Engine.screenHeight - idiv(Engine.getCellHeight(165), 2)) {
          var1 = true;
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 165, 16543);
        }
        if (!var1) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 168, 16562);
        }
    }
  }
  static draw(var0: Graphics): void {
    let var1: Graphics = var0;
    Engine.drawImage(var0, 0, 0, 107);
    Engine.drawNumber(var1, 12, 14, Game.day % 31 + 1, 3, 114);
    Engine.drawImage(var1, Engine.screenWidth, 0, 108);
    Engine.drawNumber(var1, Engine.screenWidth + (-9), 11, Townsman.unemployed.size(), 3, 114);
    if (Building.mainBuilding !== null) {
      let var2: number = Engine.getCellHeight(108);
      if (Townsman.homeless.size() > 0) {
        Engine.drawSprite(var1, Engine.screenWidth, var2, 112, 80);
        var2 += Engine.getCellWidth(112);
      }
      if (Building.wells.size() === 0) {
        Engine.drawSprite(var1, Engine.screenWidth, var2, 112, 16488);
      }
    }
    let var12: number = Engine.screenWidth - Engine.getCellWidth(108);
    if (Townsman.townies.size() > 0 && Game.happiness < 30) {
      Engine.drawSprite(var1, var12, 0, 112, 64);
    } else if (Townsman.townies.size() > 0 && Game.happiness >= 90) {
      Engine.drawSprite(var1, var12, 0, 112, 48);
    }
    var12 = Engine.getCellWidth(107) + Engine.getCellWidth(112);
    switch (Game.weather as number) {
      case 0:
        Engine.drawSprite(var1, var12, 0, 112, 32);
        break;
      case 1:
        Engine.drawSprite(var1, var12, 0, 112, 16);
        break;
      case 2:
        Engine.drawSprite(var1, var12, 0, 112, 0);
    }
    var12 = Engine.getCellWidth(112);
    let var3: number = Engine.getCellHeight(107);
    if (Game.merchantPresent) {
      Engine.drawSprite(var1, var12, var3, 112, 96);
    }
    let var5: number = 0;
    let var6: number = 0;
    var5 = Engine.screenHeight;
    var6 = Engine.screenWidth;
    var12 = Engine.screenHeight;
    Engine.drawSprite(var1, 0, var5, 149, 0);
    Engine.drawSprite(var1, var6, var12, 149, 16516);
    switch (GameUi.state as number) {
      case (-2):
        Engine.drawSprite(var1, 0, var5, 151, 16518);
        Engine.drawSprite(var1, var6, var12, 151, 16519);
        break;
      case (-1):
      case 0:
      case 1:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      default:
        if (Game.gameSpeed < 2 || Game.gameSpeed > 1 && idiv(App.tickTime, 100) % 2 === 0) {
          Engine.drawSprite(var1, 0, var5, 151, 16522);
        }
        Engine.drawSprite(var1, var6, var12, 151, 16521);
        break;
      case 2:
      case 10:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
      case 27:
      case 28:
        Engine.drawSprite(var1, 0, var5, 151, 5);
        Engine.drawSprite(var1, var6, var12, 151, 16519);
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        Engine.drawSprite(var1, 0, var5, 151, 16518);
        Engine.drawSprite(var1, var6, var12, 151, 16517);
    }
    switch (GameUi.state as number) {
      case (-2):
        GameUi.currentMessage.drawMessage(var0);
        return;
      case 0:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      default:
        GameUi.drawHintBox(var0);
        GameUi.drawCursor(var0);
      case (-1):
        return;
      case 1:
        GameUi.drawHintBox(var0);
        GameUi.drawCursor(var0);
        GameUi.drawHoverInfo(var0);
        return;
      case 2:
        GameUi.drawActionMenu(var0);
        GameUi.drawHintBox(var0);
        return;
      case 3:
        var1 = var0;
        GameUi.drawBuildingPreview(var0, idiv(Engine.screenWidth, 2), idiv(Engine.screenHeight, 2), GameUi.buildMenuTypes.get(GameUi.buildMenuIndex), GameUi.buildMenuLevel, GameUi.buildMenuTypes.size > 1, GameUi.buildMenuMaxLevels.get(GameUi.buildMenuIndex) > 0);
        let var25: Int32Array = GameData.getTotalBuildCost(GameUi.buildMenuTypes.get(GameUi.buildMenuIndex), GameUi.buildMenuLevel);
        GameUi.drawResourceList(var1, idiv(Engine.screenWidth - GameUi.measureResourceList(var25), 2), idiv(Engine.screenHeight, 2) + 18, var25);
        GameUi.drawHintBox(var1);
        GameUi.drawHintBox(var0);
        return;
      case 4:
      case 6:
        GameUi.placementEntity.setTileAndCheckPlacement(GameUi.cursorTileX, GameUi.cursorTileY);
        GameUi.placementEntity.drawPlacementMarker(var0);
        GameUi.drawCursor(var0);
        GameUi.drawHintBox(var0);
        return;
      case 5:
        var1 = var0;
        GameUi.drawBuildingPreview(var0, idiv(Engine.screenWidth, 2), idiv(Engine.screenHeight, 2), GameUi.attachmentTypes[GameUi.attachmentIndex], 0, GameUi.attachmentTypes.length > 1, false);
        GameUi.drawHintBox(var1);
        return;
      case 7:
        var1 = var0;
        GameUi.drawBuildingPreview(var0, idiv(Engine.screenWidth, 2), idiv(Engine.screenHeight, 2), GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1, false, false);
        let var24: Int32Array = GameData.getBuildCost(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1);
        GameUi.drawResourceList(var1, idiv(Engine.screenWidth - GameUi.measureResourceList(var24), 2), idiv(Engine.screenHeight, 2) + 18, var24);
        GameUi.drawHintBox(var1);
        GameUi.drawHintBox(var0);
        return;
      case 8:
        GameUi.drawHintBox(var0);
        return;
      case 9:
        GameUi.drawHintBox(var0);
        return;
      case 10:
        GameUi.drawWorkersPanel(var0);
        GameUi.drawHintBox(var0);
        return;
      case 21:
        GameUi.drawBattlePanel(var0);
        GameUi.drawHintBox(var0);
        return;
      case 22:
        GameUi.drawStoragePanel(var0);
        GameUi.drawHintBox(var0);
        return;
      case 23:
        GameUi.drawTownInfoPanel(var0);
        GameUi.drawHintBox(var0);
        return;
      case 24:
        GameUi.drawResidencePanel(var0);
        return;
      case 25:
        GameUi.drawTradePanel(var0);
        GameUi.drawHintBox(var0);
        return;
      case 26:
        GameUi.drawConstructionPanel(var0);
        GameUi.drawHintBox(var0);
        return;
      case 27:
        GameUi.drawUniversityPanel(var0);
        GameUi.drawHintBox(var0);
        return;
      case 28:
        var1 = var0;
        var12 = GameUi.panelX + 8;
        let var38: number = GameUi.panelY;
        var5 = GameUi.panelY;
        let var39: number = 0;
        var6 = var39 = var38 + GameUi.drawPanelTop(var1, GameUi.panelX, var38, GameUi.panelWidth);
        var38 = (var38 = var39 + GameUi.drawPanelRow(var1, GameUi.panelX, var39, GameUi.panelWidth)) + GameUi.drawPanelBottom(var1, GameUi.panelX, var38, GameUi.panelWidth);
        GameUi.drawPanelTitle(var1, GameUi.panelX, var5, GameUi.panelWidth, GameUi.getPanelTitleFrame(GameUi.selectedBuilding.buildingType));
        if (GameUi.selectedBuilding !== null) {
          GameUi.drawLevelStars(var1, GameUi.panelX + GameUi.panelWidth - 6, var5, GameUi.selectedBuilding.level, GameData.getMaxLevel(GameUi.selectedBuilding.buildingType));
        }
        GameUi.drawIconSlotWithBadge(var1, var12, var6, 1048576, false, 16487, true);
        var12 += 19;
        var3 = GameUi.panelWidth - (var12 - GameUi.panelX) - 6;
        GameUi.drawProgressBar(var1, var12, var6, 1048576 | Game.happiness, 100, false, var3);
        GameUi.drawPanelButtons(var1, var38);
        if (GameUi.panelFocus === 1 && GameUi.selectedRow === 0) {
          GameUi.drawRowArrows(var1, GameUi.panelX, var6, GameUi.panelWidth);
        }
        GameUi.drawHintBox(var0);
        return;
      case 29:
        var1 = var0;
        if (GameUi.selectedBuilding.secondaryJobCapacity() === 0) {
          var12 = GameUi.panelX + 8;
          var3 = GameUi.panelWidth - 14;
          let var4: number = 0;
          let var29: number = 0;
          var5 = var29 = (var4 = GameUi.panelY) + GameUi.drawPanelTop(var1, GameUi.panelX, var4, GameUi.panelWidth);
          var4 = (var4 = var29 + GameUi.drawPanelDoubleRow(var1, GameUi.panelX, var29, GameUi.panelWidth)) + GameUi.drawPanelBottom(var1, GameUi.panelX, var4, GameUi.panelWidth);
          GameUi.drawPanelTitle(var1, GameUi.panelX, GameUi.panelY, GameUi.panelWidth, GameUi.getPanelTitleFrame(GameUi.selectedBuilding.buildingType));
          if (GameUi.selectedBuilding !== null) {
            GameUi.drawLevelStars(var1, GameUi.panelX + GameUi.panelWidth - 6, GameUi.panelY, GameUi.selectedBuilding.level, GameData.getMaxLevel(GameUi.selectedBuilding.buildingType));
          }
          if (GameUi.selectedBuilding.isComplete()) {
            var12 += idiv(var3 - GameUi.measureResourceList(GameData.getWorkerScript(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level, 0)), 2);
            GameUi.drawProductionChain(var1, var12, var5, GameData.getWorkerScript(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level, 0));
          } else {
            var12 += idiv(var3 - GameUi.measureResourceList(GameUi.selectedBuilding.pendingMaterials), 2);
            GameUi.drawResourceList(var1, var12, var5, GameUi.selectedBuilding.pendingMaterials);
          }
          GameUi.drawPanelButtons(var1, var4);
        } else {
          var12 = GameUi.panelX + 8;
          var3 = GameUi.panelWidth - 14;
          let var32: number = 0;
          let var33: number = 0;
          var5 = var33 = (var32 = GameUi.panelY) + GameUi.drawPanelTop(var1, GameUi.panelX, var32, GameUi.panelWidth);
          let var35: number = 0;
          var6 = var35 = (var32 = var33 + GameUi.drawPanelDoubleRow(var1, GameUi.panelX, var33, GameUi.panelWidth)) + GameUi.drawPanelDivider(var1, GameUi.panelX, var32, GameUi.panelWidth);
          var32 = (var32 = var35 + GameUi.drawPanelDoubleRow(var1, GameUi.panelX, var35, GameUi.panelWidth)) + GameUi.drawPanelBottom(var1, GameUi.panelX, var32, GameUi.panelWidth);
          GameUi.drawPanelTitle(var1, GameUi.panelX, GameUi.panelY, GameUi.panelWidth, GameUi.getPanelTitleFrame(GameUi.selectedBuilding.buildingType));
          if (GameUi.selectedBuilding !== null) {
            GameUi.drawLevelStars(var1, GameUi.panelX + GameUi.panelWidth - 6, GameUi.panelY, GameUi.selectedBuilding.level, GameData.getMaxLevel(GameUi.selectedBuilding.buildingType));
          }
          var12 += idiv(var3 - GameUi.measureResourceList(GameData.getWorkerScript(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level, 0)), 2);
          GameUi.drawProductionChain(var1, var12, var5, GameData.getWorkerScript(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level, 0));
          var12 = GameUi.panelX + 8 + idiv(var3 - GameUi.measureResourceList(GameData.getWorkerScript(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level, 1)), 2);
          GameUi.drawProductionChain(var1, var12, var6, GameData.getWorkerScript(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level, 1));
          GameUi.drawPanelButtons(var1, var32);
        }
        GameUi.drawHintBox(var0);
    }
  }
  private static initBuildMenu(): void {
    GameUi.buildMenuTypes.clear();
    GameUi.buildMenuMaxLevels.clear();
    for (let var0: number = 0; var0 < 15; var0++) {
      for (let var1: number = 2; var1 >= 0; var1--) {
        if (GameData.canBuild(var0, var1)) {
          GameUi.buildMenuTypes.add(var0);
          GameUi.buildMenuMaxLevels.add(var1);
          break;
        }
      }
    }
    GameUi.buildMenuIndex = 0;
    GameUi.buildMenuLevel = 0;
  }
  static setState(var0: number): void {
    GameUi.previousState = GameUi.state;
    GameUi.state = var0;
    if (var0 !== 0 && var0 !== 1) {
      Game.gameSpeed = 1;
    } else {
      Game.gameSpeed = Math.max(1, Game.gameSpeed);
    }
    if (var0 === (-2) || var0 === 25) {
      Game.gameSpeed = 0;
    }
    switch (var0) {
      case (-2):
        GameUi.hoverInfoValid = false;
        GameUi.selectedBuilding = null;
        GameUi.hoveredObject = null;
        GameUi.hoveredTile = null;
        GameUi.placementEntity = null;
        GameUi.attachmentParent = null;
        return;
      case (-1):
      case 4:
      case 6:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 30:
      case 31:
      case 32:
      case 33:
      case 34:
      default:
        break;
      case 0:
        GameUi.hoverInfoValid = false;
        GameUi.currentMessage = null;
        GameUi.placementEntity = null;
        GameUi.attachmentParent = null;
        GameUi.setHint(null);
        break;
      case 1:
        GameUi.hoverInfoValid = false;
        GameUi.currentMessage = null;
        GameUi.placementEntity = null;
        GameUi.attachmentParent = null;
        return;
      case 2:
        GameUi.actionMenuChoice = 0;
        GameUi.cursorX = Math.max(Engine.getCellWidth(115), Math.min(GameUi.cursorX, Engine.screenWidth - Engine.getCellWidth(115)));
        GameUi.cursorY = Math.max(Engine.getCellHeight(115), Math.min(GameUi.cursorY, Engine.screenHeight - Engine.getCellHeight(115) - Engine.getCellHeight(113) - (Engine.getCellHeight(113) < Engine.getFontHeight(1) ? Engine.getCellHeight(113) : 0)));
        GameUi.setHint(Engine.getText(53));
        GameUi.initBuildMenu();
        Engine.playSound(35);
        return;
      case 3:
        Engine.playSound(37);
        GameUi.initBuildMenu();
        GameUi.setHint(Building.displayName(GameUi.buildMenuTypes.get(GameUi.buildMenuIndex), GameUi.buildMenuLevel));
        if (GameUi.buildMenuTypes.size === 0) {
          GameUi.setState(0);
          return;
        }
        break;
      case 5:
        Engine.playSound(37);
        GameUi.setHint(Building.displayName(GameUi.attachmentTypes[GameUi.attachmentIndex], 0));
        return;
      case 7:
        Engine.playSound(37);
        GameUi.setHint(Building.displayName(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1));
        return;
      case 8:
        Engine.playSound(34);
        GameUi.setHint(Engine.getText(GameUi.selectedBuilding.isComplete() ? 78 : 77));
        return;
      case 9:
        Engine.playSound(34);
        GameUi.setHint(Engine.getText(80));
        return;
      case 10:
        Engine.playSound(37);
        GameUi.panelWidth = 101;
        GameUi.panelHeight = 80;
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.clearPanelButtons();
        GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 2);
        if (GameUi.selectedBuilding.level < GameData.getMaxLevel(GameUi.selectedBuilding.buildingType)) {
          GameUi.addPanelButton(GameData.isBuildingUnlocked(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1) ? 161 : 162, 0);
        }
        GameUi.addPanelButton(161, 5);
        GameUi.addPanelButton(161, 4);
        GameUi.selectedRow = 0;
        GameUi.maxRow = GameUi.selectedBuilding.primaryJobCapacity() > 0 && GameUi.selectedBuilding.secondaryJobCapacity() > 0 ? 1 : 0;
        GameUi.panelFocus = 1;
        GameUi.setHint(GameUi.getRowHint());
        return;
      case 21:
        Engine.playSound(36);
        GameUi.panelWidth = 101;
        GameUi.panelHeight = 98;
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.clearPanelButtons();
        GameUi.addPanelButton(161, 4);
        if (GameUi.previousState !== 21) {
          GameUi.selectedRow = 0;
        }
        GameUi.maxRow = 1;
        GameUi.panelFocus = 1;
        GameUi.setHint(GameUi.getRowHint());
        return;
      case 22:
        Engine.playSound(37);
        GameUi.panelVisibleRows = Math.min(GameUi.maxVisibleRows, GameUi.storageResources.size);
        GameUi.panelScrollMax = Math.imul(GameUi.storageResources.size, 18) - Math.imul(GameUi.panelVisibleRows, 18);
        if (GameUi.panelVisibleRows === GameUi.maxVisibleRows) {
          GameUi.panelScrollMax += 9;
        }
        GameUi.panelWidth = 101;
        GameUi.panelHeight = 44 + Math.imul(18, GameUi.panelVisibleRows);
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.panelScrollY = 0;
        GameUi.clearPanelButtons();
        if (GameUi.selectedBuilding !== null) {
          GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 2);
          if (GameUi.selectedBuilding.level < GameData.getMaxLevel(GameUi.selectedBuilding.buildingType)) {
            GameUi.addPanelButton(GameData.isBuildingUnlocked(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1) ? 161 : 162, 0);
          }
        } else {
          GameUi.addPanelButton(161, 5);
        }
        GameUi.panelFocus = 3;
        GameUi.addPanelButton(161, 4);
        GameUi.setHint(GameUi.getButtonHint());
        return;
      case 23:
        Engine.playSound(37);
        GameUi.panelWidth = 91;
        GameUi.panelHeight = 98;
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.clearPanelButtons();
        if (GameUi.selectedBuilding !== null) {
          if (GameUi.selectedBuilding.level < GameData.getMaxLevel(GameUi.selectedBuilding.buildingType)) {
            GameUi.addPanelButton(GameData.isBuildingUnlocked(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1) ? 161 : 162, 0);
          }
        } else {
          GameUi.addPanelButton(161, 5);
        }
        GameUi.addPanelButton(161, 4);
        GameUi.panelFocus = 3;
        GameUi.setHint(GameUi.getButtonHint());
        return;
      case 24:
        Engine.playSound(37);
        GameUi.panelWidth = 91;
        GameUi.panelHeight = 44;
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.clearPanelButtons();
        GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 2);
        if (GameUi.selectedBuilding.level < GameData.getMaxLevel(GameUi.selectedBuilding.buildingType)) {
          GameUi.addPanelButton(GameData.isBuildingUnlocked(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1) ? 161 : 162, 0);
        }
        GameUi.addPanelButton(161, 4);
        GameUi.panelFocus = 3;
        GameUi.setHint(GameUi.getButtonHint());
        return;
      case 25:
        Engine.playSound(37);
        GameUi.panelVisibleRows = Math.min(GameUi.maxVisibleRows, GameUi.storageResources.size);
        GameUi.panelScrollMax = Math.imul(GameUi.tradeResources.size, 18) - Math.imul(GameUi.panelVisibleRows, 18);
        if (GameUi.panelVisibleRows === GameUi.maxVisibleRows) {
          GameUi.panelScrollMax += 9;
        }
        GameUi.panelWidth = 135;
        if (135 > Engine.screenWidth - 36) {
          GameUi.panelWidth = Engine.screenWidth - 36;
        }
        GameUi.panelHeight = 44 + Math.imul(18, GameUi.panelVisibleRows);
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.panelScrollY = 0;
        GameUi.clearPanelButtons();
        if (GameUi.selectedBuilding !== null) {
          GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 2);
          if (GameUi.selectedBuilding.level < GameData.getMaxLevel(GameUi.selectedBuilding.buildingType)) {
            GameUi.addPanelButton(GameData.isBuildingUnlocked(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1) ? 161 : 162, 0);
          }
        }
        GameUi.addPanelButton(161, 4);
        GameUi.panelFocus = 1;
        GameUi.selectedRow = Math.min(GameUi.tradeResources.size - 1, idiv(GameUi.panelScrollY, 18) + idiv(GameUi.panelVisibleRows, 2));
        GameUi.setHint(GameUi.getRowHint());
        return;
      case 26:
        Engine.playSound(37);
        GameUi.panelWidth = 101;
        GameUi.panelHeight = 80;
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.clearPanelButtons();
        if (GameUi.selectedBuilding.level === GameUi.selectedBuilding.builtLevel) {
          GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 2);
        } else {
          GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 1);
        }
        GameUi.addPanelButton(161, 5);
        GameUi.addPanelButton(161, 4);
        GameUi.selectedRow = 0;
        GameUi.maxRow = 0;
        GameUi.panelFocus = 1;
        GameUi.setHint(GameUi.getRowHint());
        return;
      case 27:
        Engine.playSound(37);
        GameUi.panelWidth = 101;
        GameUi.panelHeight = 80;
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.clearPanelButtons();
        if (GameUi.selectedBuilding.level === GameUi.selectedBuilding.builtLevel) {
          GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 2);
        } else {
          GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 1);
        }
        GameUi.addPanelButton(161, 5);
        GameUi.addPanelButton(161, 4);
        GameUi.selectedRow = 0;
        GameUi.maxRow = 0;
        GameUi.panelFocus = 1;
        GameUi.setHint(GameUi.getRowHint());
        return;
      case 28:
        Engine.playSound(37);
        GameUi.panelWidth = 91;
        GameUi.panelHeight = 44;
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.clearPanelButtons();
        GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 2);
        if (GameUi.selectedBuilding.level < GameData.getMaxLevel(GameUi.selectedBuilding.buildingType)) {
          GameUi.addPanelButton(GameData.isBuildingUnlocked(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1) ? 161 : 162, 0);
        }
        GameUi.addPanelButton(161, 4);
        GameUi.panelFocus = 3;
        GameUi.setHint(GameUi.getButtonHint());
        return;
      case 29:
        Engine.playSound(37);
        GameUi.panelScrollMax = Math.imul(GameUi.storageResources.size, 18) - Math.imul(GameUi.panelVisibleRows, 18);
        GameUi.panelWidth = 14;
        if (GameUi.selectedBuilding.secondaryJobCapacity() === 0) {
          GameUi.panelHeight = 66;
          if (GameUi.selectedBuilding.isComplete()) {
            GameUi.panelWidth = GameUi.panelWidth + GameUi.measureResourceList(GameData.getWorkerScript(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level, 0));
          } else {
            GameUi.panelWidth = GameUi.panelWidth + GameUi.measureResourceList(GameUi.selectedBuilding.pendingMaterials);
          }
        } else {
          GameUi.panelHeight = 104;
          GameUi.panelWidth = GameUi.panelWidth + Math.max(GameUi.measureResourceList(GameData.getWorkerScript(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level, 0)), GameUi.measureResourceList(GameData.getWorkerScript(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level, 1)));
        }
        GameUi.panelWidth = Math.max(idiv(Engine.screenWidth, 2), GameUi.panelWidth);
        GameUi.panelX = idiv(Engine.screenWidth - GameUi.panelWidth, 2);
        GameUi.panelY = idiv(Engine.screenHeight - GameUi.panelHeight, 2);
        GameUi.clearPanelButtons();
        if (GameUi.selectedBuilding !== null) {
          GameUi.addPanelButton(GameUi.selectedBuilding.canDemolish() ? 161 : 162, 2);
          if (GameUi.selectedBuilding.level < GameData.getMaxLevel(GameUi.selectedBuilding.buildingType) && GameUi.selectedBuilding.isComplete()) {
            GameUi.addPanelButton(GameData.isBuildingUnlocked(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level + 1) ? 161 : 162, 0);
          }
        }
        GameUi.addPanelButton(161, 5);
        GameUi.addPanelButton(161, 4);
        GameUi.panelFocus = 3;
        GameUi.selectedButton = GameUi.panelButtonIcons.size - 2;
        GameUi.setHint(GameUi.getButtonHint());
        return;
      case 35:
        GameUi.cursorX = Math.max(Engine.getCellWidth(115), Math.min(GameUi.cursorX, Engine.screenWidth - Engine.getCellWidth(115)));
        GameUi.cursorY = Math.max(Engine.getCellHeight(115), Math.min(GameUi.cursorY, Engine.screenHeight - Engine.getCellHeight(115) - (Engine.getCellHeight(113) << 1) - (Engine.getCellHeight(113) < Engine.getFontHeight(1) ? Engine.getCellHeight(113) : 0)));
        return;
      case 36:
        if (GameUi.messageQueue.size() !== 0) {
          let var1: GameUi = null;
          (var1 = GameUi.messageQueue.elementAt(0) as GameUi).textBox.setViewHeight(var1.textBox.contentHeight - idiv(Engine.screenHeight, 4) > 40 ? idiv(Engine.screenHeight, 4) : var1.textBox.contentHeight);
          GameUi.messageQueue.setElementAt(var1, 0);
          return;
        }
    }
  }
  private static screenToTile(var0: number, var1: number): void {
    var0 += GameUi.cameraX + 32;
    var1 += GameUi.cameraY + 16;
    let var2: number = idiv(var0, 2) - var1;
    var0 = idiv(var0, 2) + var1;
    GameUi.cursorTileX = idiv(var2, 32);
    GameUi.cursorTileY = idiv(var0, 32);
  }
  static updateVisibleTileRange(): void {
    GameUi.screenToTile(Engine.screenWidth, 0);
    GameUi.visibleTileMaxX = Math.min(Math.max(GameUi.cursorTileX, 0), Game.level.width - 1);
    GameUi.screenToTile(0, 0);
    GameUi.visibleTileMinY = Math.min(Math.max(GameUi.cursorTileY, 0), Game.level.height - 1);
    GameUi.screenToTile(0, Engine.screenHeight);
    GameUi.visibleTileMinX = Math.min(Math.max(GameUi.cursorTileX - 1, 0), Game.level.width - 1);
    GameUi.screenToTile(Engine.screenWidth, Engine.screenHeight);
    GameUi.visibleTileMaxY = Math.min(Math.max(GameUi.cursorTileY + 1, 0), Game.level.height - 1);
  }
  private static pickObjectUnderCursor(): void {
    GameUi.selectedBuilding = null;
    GameUi.hoveredObject = null;
    GameUi.hoveredTile = null;
    let var0: number = GameUi.cursorTileX;
    let var1: number = GameUi.cursorTileY;
    let var2: number = GameUi.cursorTileX - 1;
    let var3: number = GameUi.cursorTileY;
    let var4: number = GameUi.cursorTileX;
    let var5: number = GameUi.cursorTileY + 1;
    let var6: number = GameUi.cursorTileX - 1;
    let var7: number = GameUi.cursorTileY + 1;
    if (GameUi.cursorTileX >= 0 && GameUi.cursorTileX < Game.level.width && GameUi.cursorTileY >= 0 && GameUi.cursorTileY < Game.level.height) {
      GameUi.hoveredTile = Game.level.tiles[GameUi.cursorTileX][GameUi.cursorTileY];
    }
    switch (GameUi.state as number) {
      default:
        if (GameUi.tryPickObjectAt(var6, var7) || GameUi.tryPickObjectAt(var4, var5) || GameUi.tryPickObjectAt(var2, var3) || GameUi.tryPickObjectAt(var0, var1)) {
          return;
        }
      case 4:
      case 6:
        if (GameUi.hoveredTile !== null && (GameUi.hoveredObject = Game.level.objects[GameUi.cursorTileX][GameUi.cursorTileY]) !== null && !GameUi.hoveredObject.isReplaceable()) {
          if (Game.level.objects[GameUi.cursorTileX][GameUi.cursorTileY].building === null) {
            GameUi.setHint(Building.displayName(GameUi.hoveredObject.type, 0));
            return;
          }
          if ((GameUi.selectedBuilding = Game.level.objects[GameUi.cursorTileX][GameUi.cursorTileY].building).buildingType === 5 && GameUi.hoveredObject.type !== 160) {
            GameUi.setHint(Building.displayName(GameUi.hoveredObject.type, 0));
            return;
          }
          GameUi.setHint(Building.displayName(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level));
        }
    }
  }
  private static tryPickObjectAt(var0: number, var1: number): boolean {
    if (var0 < Game.level.width && var0 >= 0 && var1 < Game.level.height && var1 >= 0) {
      let var2: number = (var0 << 5) + (var1 << 5) - GameUi.cameraX - GameUi.cursorX;
      let var3: number = (var1 << 4) - (var0 << 4) - GameUi.cameraY - GameUi.cursorY;
      let var4: MapObject = null;
      if ((var4 = Game.level.objects[var0][var1]) !== null && !var4.isReplaceable() && Engine.isSpritePixelOpaque(var4.image, var4.frame, var2, var3)) {
        GameUi.hoveredObject = Game.level.objects[var0][var1];
        if (Game.level.objects[var0][var1].building === null) {
          GameUi.setHint(Building.displayName(GameUi.hoveredObject.type, 0));
        } else if ((GameUi.selectedBuilding = Game.level.objects[var0][var1].building).buildingType === 5 && GameUi.hoveredObject.type !== 160) {
          GameUi.setHint(Building.displayName(GameUi.hoveredObject.type, 0));
        } else {
          GameUi.setHint(Building.displayName(GameUi.selectedBuilding.buildingType, GameUi.selectedBuilding.level));
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  private static showNextMessage(): void {
    if (GameUi.currentMessage !== null) {
      GameData.onMessageClosed(GameUi.currentMessage);
    }
    if (!GameUi.messageQueue.isEmpty()) {
      GameUi.currentMessage = GameUi.messageQueue.firstElement() as GameUi;
      GameUi.messageQueue.removeElementAt(0);
      if (GameUi.currentMessage.textBox !== null) {
        GameUi.currentMessage.textBox.setViewHeight(GameUi.currentMessage.textBox.contentHeight - idiv(Engine.screenHeight, 4) > 40 ? idiv(Engine.screenHeight, 4) : GameUi.currentMessage.textBox.contentHeight);
      }
      let var0: GameUi = GameUi.currentMessage;
      if (GameUi.currentMessage.panDuration === 0 && var0.panFromX + var0.panFromY + var0.panToX + var0.panToY !== (-4)) {
        var0.panDuration = GameUi.defaultPanDuration;
      }
      if (var0.panFromX === (-1)) {
        var0.panFromX = GameUi.cameraX;
      }
      if (var0.panFromY === (-1)) {
        var0.panFromY = GameUi.cameraY;
      }
      if (var0.panToX === (-1)) {
        var0.panToX = GameUi.cameraX;
      }
      if (var0.panToY === (-1)) {
        var0.panToY = GameUi.cameraY;
      }
      var0.shownTime = App.tickTime;
      GameUi.setState(-2);
    }
  }
  static queueMessage(var0: GameUi): void {
    GameUi.messageQueue.addElement(var0);
  }
  static keyPressed(var0: number, var1: boolean): boolean {
    GameUi.cursorDirX = 0;
    GameUi.cursorDirY = 0;
    if (var1 && App.getActionHoldTime(var0) % 200 !== 0) {
      switch (GameUi.state as number) {
        case 0:
        case 1:
        case 4:
        case 6:
        case 22:
          break;
        default:
          return false;
      }
    }
    switch (GameUi.state as number) {
      case (-2):
        return GameUi.currentMessage.messageKeyPressed(var0);
      case (-1):
        return false;
      case 0:
      case 1:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      default:
        switch (var0) {
          case 2:
            GameUi.cursorDirY = -1;
            return false;
          case 3:
            GameUi.cursorDirX = -1;
            return false;
          case 4:
            GameUi.cursorDirX = 1;
            return false;
          case 5:
            GameUi.cursorDirY = 1;
            return false;
          case 6:
            if (GameUi.cursorX < Engine.getCellWidth(107) && GameUi.cursorY < Engine.getCellHeight(107)) {
              Game.skipToNextDay();
              return true;
            }
            GameUi.stopCursor();
            GameUi.hoverInfoValid = false;
            GameUi.pickObjectUnderCursor();
            if (GameUi.hoveredObject === null || GameUi.selectedBuilding === null) {
              GameUi.setState(2);
            } else if (GameUi.selectedBuilding !== null) {
              GameUi.openBuildingPanel();
            }
            return true;
          case 7:
            if (Game.gameSpeed !== 0 && Game.gameSpeed === 1) {
              Game.gameSpeed = 3;
            } else {
              Game.gameSpeed = 1;
            }
            return true;
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          default:
            return false;
          case 19:
            Game.skipToNextDay();
            return true;
          case 20:
            if (Building.mainBuilding === null) {
              GameUi.cameraX = GameUi.cameraCorner0X;
              GameUi.cameraY = GameUi.cameraCorner3Y;
            } else {
              GameUi.cameraX = (Building.mainBuilding.tileX << 5) + (Building.mainBuilding.tileY << 5) - idiv(Engine.screenWidth, 2);
              GameUi.cameraY = (Building.mainBuilding.tileY << 4) - (Building.mainBuilding.tileX << 4) - idiv(Engine.screenHeight, 2);
            }
            return true;
        }
      case 2:
        switch (var0) {
          case 2:
            if (Game.buildMenuEnabled && GameUi.buildMenuTypes.size > 0) {
              GameUi.actionMenuChoice = 1;
            }
            return false;
          case 3:
            if (Building.mainBuilding !== null) {
              GameUi.actionMenuChoice = 3;
            }
            return false;
          case 4:
            if (Building.mainBuilding !== null) {
              GameUi.actionMenuChoice = 2;
            }
            return false;
          case 5:
            if (Building.mainBuilding !== null) {
              GameUi.actionMenuChoice = 4;
            }
            return false;
          case 6:
          case 8:
            GameUi.setState(0);
            return true;
          case 7:
            GameUi.showHelpMenu(new Menu().$init1(2));
            return true;
          default:
            return false;
        }
      case 3:
        switch (var0) {
          case 2:
            if (--GameUi.buildMenuLevel < 0) {
              GameUi.buildMenuLevel = GameUi.buildMenuMaxLevels.get(GameUi.buildMenuIndex);
            }
            GameUi.setHint(Building.displayName(GameUi.buildMenuTypes.get(GameUi.buildMenuIndex), GameUi.buildMenuLevel));
            Engine.playSound(30);
            return true;
          case 3:
            if (--GameUi.buildMenuIndex < 0) {
              GameUi.buildMenuIndex = GameUi.buildMenuIndex + GameUi.buildMenuTypes.size;
            }
            GameUi.buildMenuLevel = 0;
            GameUi.setHint(Building.displayName(GameUi.buildMenuTypes.get(GameUi.buildMenuIndex), GameUi.buildMenuLevel));
            Engine.playSound(30);
            return true;
          case 4:
            GameUi.buildMenuIndex = ++GameUi.buildMenuIndex % GameUi.buildMenuTypes.size;
            GameUi.buildMenuLevel = 0;
            GameUi.setHint(Building.displayName(GameUi.buildMenuTypes.get(GameUi.buildMenuIndex), GameUi.buildMenuLevel));
            Engine.playSound(30);
            return true;
          case 5:
            if (++GameUi.buildMenuLevel > GameUi.buildMenuMaxLevels.get(GameUi.buildMenuIndex)) {
              GameUi.buildMenuLevel = 0;
            }
            GameUi.setHint(Building.displayName(GameUi.buildMenuTypes.get(GameUi.buildMenuIndex), GameUi.buildMenuLevel));
            Engine.playSound(30);
            return true;
          case 6:
          case 7:
            GameUi.placementEntity = Building.createConstructionSite(GameUi.buildMenuTypes.get(GameUi.buildMenuIndex), GameUi.buildMenuLevel, 0, true);
            GameUi.setState(4);
            Engine.playSound(35);
            return true;
          case 8:
            GameUi.setState(0);
            return true;
          default:
            return false;
        }
      case 4:
      case 6:
        switch (var0) {
          case 2:
            GameUi.cursorDirY = -1;
            return false;
          case 3:
            GameUi.cursorDirX = -1;
            return false;
          case 4:
            GameUi.cursorDirX = 1;
            return false;
          case 5:
            GameUi.cursorDirY = 1;
            return false;
          case 6:
          case 7:
            if (GameUi.placementEntity.setTileAndCheckPlacement(GameUi.placementEntity.getTileX(), GameUi.placementEntity.getTileY())) {
              let var3: boolean = GameUi.placementEntity.addToMap();
              Engine.playSound(29);
              if (!var3) {
                if (GameUi.state === 6) {
                  GameUi.attachmentParent.addToMap();
                  GameUi.attachmentParent = null;
                } else if (GameUi.state === 4) {
                  GameUi.setState(0);
                }
              } else {
                if (GameUi.placementEntity instanceof Building) {
                  GameUi.attachmentParent = GameUi.placementEntity as Building;
                }
                GameUi.attachmentTypes = GameUi.attachmentParent.farmPlotTypes();
                GameUi.setState(5);
              }
            }
            return true;
          case 8:
            if (GameUi.attachmentParent !== null) {
              GameUi.attachmentParent.cancelConstruction();
            }
            GameUi.setState(0);
            return true;
          default:
            return false;
        }
      case 5:
        if (App.getActionHoldTime(var0) % 100 !== 0 && var1) {
          return false;
        }
        switch (var0) {
          case 3:
            if (--GameUi.attachmentIndex < 0) {
              GameUi.attachmentIndex = GameUi.attachmentIndex + GameUi.attachmentTypes.length;
            }
            GameUi.setHint(Building.displayName(GameUi.attachmentTypes[GameUi.attachmentIndex], 0));
            Engine.playSound(30);
            return true;
          case 4:
            GameUi.attachmentIndex = (GameUi.attachmentIndex + 1) % GameUi.attachmentTypes.length;
            GameUi.setHint(Building.displayName(GameUi.attachmentTypes[GameUi.attachmentIndex], 0));
            Engine.playSound(30);
            return true;
          case 5:
          default:
            return false;
          case 6:
          case 7:
            GameUi.placementEntity = GameUi.attachmentParent.createFarmPlot(GameUi.attachmentTypes[GameUi.attachmentIndex]);
            GameUi.setState(6);
            Engine.playSound(35);
            return true;
          case 8:
            GameUi.attachmentParent.cancelConstruction();
            GameUi.setState(0);
            return true;
        }
      case 7:
        switch (var0) {
          case 7:
            let var2: boolean = GameUi.selectedBuilding.startUpgrade();
            Engine.playSound(29);
            if (!var2) {
              if (GameUi.state === 6) {
                GameUi.attachmentParent.addToMap();
                GameUi.attachmentParent = null;
              }
              GameUi.setState(0);
            } else {
              if (GameUi.state !== 6) {
                GameUi.attachmentIndex = 0;
              }
              GameUi.attachmentTypes = (GameUi.attachmentParent = GameUi.selectedBuilding).farmPlotTypes();
              GameUi.setState(5);
            }
            return true;
          case 8:
            GameUi.setState(GameUi.previousState);
            return true;
          default:
            return false;
        }
      case 8:
        switch (var0) {
          case 7:
            Engine.playSound(31);
            GameUi.selectedBuilding.demolish();
            GameUi.setState(0);
            return true;
          case 8:
            GameUi.setState(GameUi.previousState);
            return true;
          default:
            return false;
        }
      case 9:
        switch (var0) {
          case 7:
            Engine.playSound(31);
            GameUi.selectedBuilding.cancelConstruction();
            GameUi.setState(0);
            return true;
          case 8:
            GameUi.setState(GameUi.previousState);
            return true;
          default:
            return false;
        }
      case 10:
      case 26:
      case 27:
        switch (var0) {
          case 7:
            GameUi.showHelpMenu(new Menu().$init1(GameUi.getHelpPage(GameUi.selectedBuilding.buildingType)));
          default:
            if (GameUi.panelFocus === 3) {
              switch (var0) {
                case 2:
                  GameUi.selectedRow = GameUi.maxRow;
                  GameUi.panelFocus = 1;
                  GameUi.setHint(GameUi.getRowHint());
                  return true;
                case 3:
                  GameUi.selectPrevButton();
                  return true;
                case 4:
                  GameUi.selectNextButton();
                  return true;
                case 5:
                  GameUi.selectedRow = 0;
                  GameUi.panelFocus = 1;
                  GameUi.setHint(GameUi.getRowHint());
                  return true;
                case 6:
                  switch (GameUi.getSelectedButtonAction()) {
                    case 0:
                      GameUi.setState(7);
                      return false;
                    case 1:
                      GameUi.setState(9);
                      return false;
                    case 2:
                      GameUi.setState(8);
                      return false;
                    case 3:
                    default:
                      return false;
                    case 4:
                      GameUi.setState(0);
                      return false;
                    case 5:
                      GameUi.setState(29);
                      return false;
                  }
              }
            } else {
              switch (var0) {
                case 2:
                  if (GameUi.selectedRow > 0) {
                    GameUi.selectedRow--;
                    GameUi.setHint(GameUi.getRowHint());
                  } else {
                    GameUi.panelFocus = 3;
                    GameUi.selectedButton = GameUi.panelButtonIcons.size - 1;
                    GameUi.setHint(GameUi.getButtonHint());
                  }
                  return true;
                case 3:
                  if (GameUi.selectedRow === 0) {
                    GameUi.selectedBuilding.removeLastWorker();
                    Engine.playSound(30);
                  } else if (GameUi.selectedBuilding.primaryWorkerCount() > 0 && GameUi.selectedBuilding.secondaryWorkerCount() < GameUi.selectedBuilding.secondaryJobCapacity()) {
                    GameUi.selectedBuilding.setJobSplit(GameUi.selectedBuilding.primaryWorkerCount() - 1, GameUi.selectedBuilding.secondaryWorkerCount() + 1);
                    Engine.playSound(30);
                  }
                  return true;
                case 4:
                  if (GameUi.selectedRow === 0) {
                    GameUi.selectedBuilding.hireUnemployed();
                    GameUi.selectedBuilding.updateWorkerJobs();
                    Engine.playSound(30);
                  } else if (GameUi.selectedBuilding.secondaryWorkerCount() > 0 && GameUi.selectedBuilding.primaryWorkerCount() < GameUi.selectedBuilding.primaryJobCapacity()) {
                    GameUi.selectedBuilding.setJobSplit(GameUi.selectedBuilding.primaryWorkerCount() + 1, GameUi.selectedBuilding.secondaryWorkerCount() - 1);
                    Engine.playSound(30);
                  }
                  return true;
                case 5:
                  if (GameUi.selectedRow < GameUi.maxRow) {
                    GameUi.selectedRow++;
                    GameUi.setHint(GameUi.getRowHint());
                  } else {
                    GameUi.panelFocus = 3;
                    GameUi.selectedButton = GameUi.panelButtonIcons.size - 1;
                    GameUi.setHint(GameUi.getButtonHint());
                  }
                  return true;
                case 6:
                  GameUi.panelFocus = 3;
                  GameUi.selectedButton = GameUi.panelButtonIcons.size - 1;
                  GameUi.setHint(GameUi.getButtonHint());
                  return true;
              }
            }
            return false;
          case 8:
            GameUi.setState(0);
            return true;
        }
      case 21:
        switch (var0) {
          case 7:
            GameUi.showHelpMenu(new Menu().$init1(19));
            return true;
          case 8:
            GameUi.setState(0);
            return true;
          default:
            if (GameUi.panelFocus === 3) {
              switch (var0) {
                case 2:
                  GameUi.selectedRow = GameUi.maxRow;
                  GameUi.panelFocus = 1;
                  GameUi.setHint(GameUi.getRowHint());
                  return true;
                case 3:
                  GameUi.selectPrevButton();
                  return true;
                case 4:
                  GameUi.selectNextButton();
                  return true;
                case 5:
                  GameUi.selectedRow = 0;
                  GameUi.panelFocus = 1;
                  GameUi.setHint(GameUi.getRowHint());
                  return true;
                case 6:
                  switch (GameUi.getSelectedButtonAction()) {
                    case 4:
                      GameUi.setState(0);
                      return false;
                    default:
                      return false;
                  }
              }
            } else {
              switch (var0) {
                case 2:
                  if (GameUi.selectedRow > 0) {
                    GameUi.selectedRow--;
                    GameUi.setHint(GameUi.getRowHint());
                  } else {
                    GameUi.panelFocus = 3;
                    GameUi.selectedButton = GameUi.panelButtonIcons.size - 1;
                    GameUi.setHint(GameUi.getButtonHint());
                  }
                  return true;
                case 3:
                  if (GameUi.selectedRow === 0) {
                    if (GameUi.selectedBuilding.battle !== null) {
                      GameUi.selectedBuilding.battle.withdrawPropagandist(false);
                      Engine.playSound(30);
                    }
                  } else if (GameUi.selectedBuilding.battle !== null) {
                    GameUi.selectedBuilding.battle.withdrawSoldier(false);
                    Engine.playSound(30);
                  }
                  return true;
                case 4:
                  if (GameUi.selectedRow === 0) {
                    if (Townsman.idlePropagandists.size() > 0) {
                      if (GameUi.selectedBuilding.battle === null) {
                        GameUi.selectedBuilding.battle = new Battle(GameUi.selectedBuilding);
                      }
                      GameUi.selectedBuilding.battle.sendPropagandist();
                      Engine.playSound(30);
                    }
                  } else if (Townsman.idleSoldiers.size() > 0) {
                    if (GameUi.selectedBuilding.battle === null) {
                      GameUi.selectedBuilding.battle = new Battle(GameUi.selectedBuilding);
                      GameUi.selectedBuilding.battle.sendSoldier();
                      Engine.playSound(30);
                      GameUi.selectedRow = 1;
                      GameUi.setHint(GameUi.getRowHint());
                    } else {
                      GameUi.selectedBuilding.battle.sendSoldier();
                    }
                  }
                  return true;
                case 5:
                  if (GameUi.selectedRow < GameUi.maxRow) {
                    GameUi.selectedRow++;
                    GameUi.setHint(GameUi.getRowHint());
                  } else {
                    GameUi.panelFocus = 3;
                    GameUi.selectedButton = GameUi.panelButtonIcons.size - 1;
                    GameUi.setHint(GameUi.getButtonHint());
                  }
                  return true;
                case 6:
                  GameUi.panelFocus = 3;
                  GameUi.selectedButton = GameUi.panelButtonIcons.size - 1;
                  GameUi.setHint(GameUi.getButtonHint());
                  return true;
              }
            }
            return false;
        }
      case 22:
        switch (var0) {
          case 2:
            GameUi.panelScrollY = Math.max(0, GameUi.panelScrollY - GameUi.scrollStep);
            return false;
          case 3:
            GameUi.selectPrevButton();
            return true;
          case 4:
            GameUi.selectNextButton();
            return true;
          case 5:
            GameUi.panelScrollY = Math.min(GameUi.panelScrollMax, GameUi.panelScrollY + GameUi.scrollStep);
            return false;
          case 6:
            switch (GameUi.getSelectedButtonAction()) {
              case 0:
                GameUi.setState(7);
                break;
              case 2:
                GameUi.setState(8);
                break;
              case 5:
                GameUi.selectedBuilding = null;
                GameUi.setState(23);
                GameUi.selectedButton = 0;
                GameUi.setHint(GameUi.getButtonHint());
                break;
              default:
                GameUi.setState(0);
            }
            return true;
          case 7:
            GameUi.showHelpMenu(new Menu().$init1(4));
            return true;
          case 8:
            GameUi.setState(0);
            return true;
          default:
            return false;
        }
      case 23:
        switch (var0) {
          case 3:
            GameUi.selectPrevButton();
            return true;
          case 4:
            GameUi.selectNextButton();
            return true;
          case 5:
          default:
            return false;
          case 6:
            if (GameUi.panelFocus === 3) {
              switch (GameUi.getSelectedButtonAction()) {
                case 0:
                  GameUi.selectedBuilding = Building.mainBuilding;
                  GameUi.setState(7);
                  break;
                case 5:
                  GameUi.selectedBuilding = null;
                  GameUi.setState(22);
                  GameUi.selectedButton = 0;
                  GameUi.setHint(GameUi.getButtonHint());
                  break;
                default:
                  GameUi.setState(0);
              }
            }
            return true;
          case 7:
            GameUi.showHelpMenu(new Menu().$init1(6));
            return false;
          case 8:
            GameUi.setState(0);
            return true;
        }
      case 24:
      case 28:
        switch (var0) {
          case 3:
            GameUi.selectPrevButton();
            return true;
          case 4:
            GameUi.selectNextButton();
            return true;
          case 5:
          default:
            return false;
          case 6:
            if (GameUi.panelFocus === 3) {
              switch (GameUi.getSelectedButtonAction()) {
                case 0:
                  GameUi.setState(7);
                  break;
                case 2:
                  GameUi.setState(8);
                  break;
                default:
                  GameUi.setState(0);
              }
            }
            return true;
          case 7:
            GameUi.showHelpMenu(new Menu().$init1(GameUi.getHelpPage(GameUi.selectedBuilding.buildingType)));
            return false;
          case 8:
            GameUi.setState(0);
            return true;
        }
      case 25:
        if (GameUi.panelFocus === 3) {
          switch (var0) {
            case 2:
              GameUi.panelFocus = 1;
              GameUi.selectedRow = Math.min(GameUi.tradeResources.size - 1, idiv(GameUi.panelScrollY, 18) + idiv(GameUi.panelVisibleRows, 2));
              GameUi.setHint(GameUi.getRowHint());
              return false;
            case 3:
              GameUi.selectPrevButton();
              return true;
            case 4:
              GameUi.selectNextButton();
              return true;
            case 5:
            default:
              return false;
            case 6:
              switch (GameUi.getSelectedButtonAction()) {
                case 2:
                  GameUi.setState(8);
                  break;
                default:
                  GameUi.setState(0);
              }
              return true;
            case 7:
              GameUi.showHelpMenu(new Menu().$init1(10));
              return true;
            case 8:
              GameUi.setState(0);
              return true;
          }
        } else {
          switch (var0) {
            case 2:
              if (--GameUi.selectedRow < 0) {
                GameUi.selectedRow = GameUi.tradeResources.size - 1;
              }
              return false;
            case 3:
              Game.sellToMerchant(GameUi.tradeResources.get(GameUi.selectedRow));
              return false;
            case 4:
              Game.buyFromMerchant(GameUi.tradeResources.get(GameUi.selectedRow));
              return false;
            case 5:
              if (++GameUi.selectedRow > GameUi.tradeResources.size - 1) {
                GameUi.selectedRow = 0;
              }
              return false;
            case 6:
              GameUi.selectedRow = -1;
              GameUi.panelFocus = 3;
              GameUi.selectedButton = GameUi.panelButtonIcons.size - 1;
              GameUi.setHint(GameUi.getButtonHint());
              return true;
            case 7:
              GameUi.showHelpMenu(new Menu().$init1(10));
              return true;
            case 8:
              GameUi.setState(0);
              return true;
            default:
              return false;
          }
        }
      case 29:
        switch (var0) {
          case 3:
            GameUi.selectPrevButton();
            return true;
          case 4:
            GameUi.selectNextButton();
            return true;
          case 5:
          default:
            break;
          case 6:
            if (GameUi.panelFocus === 3) {
              switch (GameUi.getSelectedButtonAction()) {
                case 0:
                  GameUi.setState(7);
                  break;
                case 2:
                  GameUi.setState(8);
                  break;
                case 5:
                  GameUi.openBuildingPanel();
                  GameUi.panelFocus = 3;
                  GameUi.selectedButton = GameUi.panelButtonIcons.size - 2;
                  GameUi.setHint(GameUi.getButtonHint());
                  break;
                default:
                  GameUi.setState(0);
              }
            }
            return true;
          case 7:
            GameUi.showHelpMenu(new Menu().$init1(GameUi.getHelpPage(GameUi.selectedBuilding.buildingType)));
            break;
          case 8:
            GameUi.setState(0);
            return true;
        }
    }
    return false;
  }
  static keyReleased(var0: number): boolean {
    GameUi.cursorDirX = 0;
    GameUi.cursorDirY = 0;
    switch (GameUi.state as number) {
      case (-2):
        return GameUi.currentMessage.messageKeyReleased();
      case 2:
        switch (var0) {
          case 2:
          case 3:
          case 4:
          case 5:
            switch (GameUi.actionMenuChoice as number) {
              case 1:
                GameUi.setState(3);
                break;
              case 2:
                GameUi.setState(Game.canTrade() ? 25 : 22);
                break;
              case 3:
                GameUi.setState(23);
                break;
              case 4:
                GameUi.setState(0);
                Game.showLogbook();
            }
            return true;
        }
      default:
        return false;
    }
  }
  private static showHelpMenu(var0: Menu): void {
    var0.rightSoftKeyCommand = 4101;
    var0.rightSoftKeyIcon = 16519;
    App.pushMenu(var0);
  }
  static openBuildingPanel(): void {
    if (GameUi.selectedBuilding.owner === 0 && GameUi.selectedBuilding.battle === null) {
      if (!GameUi.selectedBuilding.isComplete()) {
        GameUi.setState(26);
      } else {
        switch (GameUi.selectedBuilding.buildingType as number) {
          case 0:
            GameUi.setState(23);
            return;
          case 1:
            GameUi.setState(22);
            return;
          case 2:
            GameUi.setState(28);
            return;
          case 3:
            GameUi.setState(24);
            return;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          default:
            GameUi.setState(10);
            return;
          case 11:
            GameUi.setState(25);
            return;
          case 12:
            GameUi.setState(27);
        }
      }
    } else {
      if (Building.mainBuilding !== null) {
        GameUi.setState(21);
      }
    }
  }
  private static getPanelTitleFrame(var0: number): number {
    switch (var0) {
      case 3:
        return 16536;
      case 4:
        return 16537;
      case 5:
        return 16528;
      case 6:
        return 16530;
      case 7:
        return 16535;
      case 8:
        return 16526;
      case 9:
        return 16533;
      case 10:
        return 16534;
      case 11:
      default:
        return 16532;
      case 12:
        return 16527;
      case 13:
        return 16529;
      case 14:
        return 16532;
    }
  }
  private static getHelpPage(var0: number): number {
    switch (var0) {
      case 0:
        return 28;
      case 1:
        return 27;
      case 2:
        return 26;
      case 3:
        return 32;
      case 4:
        return 24;
      case 5:
        return 35;
      case 6:
        return 37;
      case 7:
        return 33;
      case 8:
        return 34;
      case 9:
        return 25;
      case 10:
        return 29;
      case 11:
        return 30;
      case 12:
        return 23;
      case 13:
        return 36;
      case 14:
        return 38;
      default:
        return 22;
    }
  }
  static showBuildingPanel(var0: Building): void {
    GameUi.selectedBuilding = var0;
    GameUi.openBuildingPanel();
  }
  static isPanelOpenFor(var0: Building): boolean {
    return GameUi.state === 0 || GameUi.state === 1 || GameUi.state === (-1) ? false : GameUi.selectedBuilding === var0;
  }
  static initMapView(): void {
    let var0: number = Game.level.width;
    let var1: number = Game.level.height;
    GameUi.cameraCorner0X = idiv(var0 << 6, 2);
    GameUi.cameraCorner0Y = idiv(var0 << 5, -2);
    GameUi.cameraCorner1X = 0;
    GameUi.cameraCorner1Y = 0;
    GameUi.cameraCorner2X = idiv(var1 << 6, 2);
    GameUi.cameraCorner2Y = idiv(var1 << 5, 2);
    GameUi.cameraCorner3X = GameUi.cameraCorner2X + GameUi.cameraCorner0X;
    GameUi.cameraCorner3Y = GameUi.cameraCorner2Y + GameUi.cameraCorner0Y;
    GameUi.cameraCorner0X -= 32;
    GameUi.cameraCorner0Y -= 32;
    GameUi.cameraCorner1X -= 42;
    GameUi.cameraCorner2X -= 32;
    GameUi.cameraCorner2Y -= 8;
    GameUi.cameraCorner3X -= 21;
    GameUi.cameraCorner3Y -= 16;
    if (GameUi.cameraCorner2Y - Math.max(GameUi.cameraCorner0Y, GameUi.cameraCorner1Y) < idiv(Engine.screenHeight, 2)) {
      var0 = idiv(Engine.screenHeight, 2) - (GameUi.cameraCorner2Y - Math.max(GameUi.cameraCorner1Y, GameUi.cameraCorner3Y));
      GameUi.cameraCorner0Y -= var0;
      GameUi.cameraCorner2Y += var0;
    }
    if (GameUi.cameraCorner3X - Math.max(GameUi.cameraCorner0X, GameUi.cameraCorner2X) < idiv(Engine.screenWidth, 2)) {
      var0 = idiv(Engine.screenWidth, 2) - (GameUi.cameraCorner3X - Math.max(GameUi.cameraCorner0X, GameUi.cameraCorner2X));
      GameUi.cameraCorner1X -= var0;
      GameUi.cameraCorner3X += var0;
    }
    GameUi.cameraCorner0X = GameUi.cameraCorner0X - idiv(Engine.screenWidth, 2);
    GameUi.cameraCorner1Y = GameUi.cameraCorner1Y - idiv(Engine.screenHeight, 2);
    GameUi.cameraCorner2X = GameUi.cameraCorner2X - idiv(Engine.screenWidth, 2);
    GameUi.cameraCorner2Y = GameUi.cameraCorner2Y - Engine.screenHeight;
    GameUi.cameraCorner3X = GameUi.cameraCorner3X - Engine.screenWidth;
    GameUi.cameraCorner3Y = GameUi.cameraCorner3Y - idiv(Engine.screenHeight, 2);
    GameUi.cameraEdge01Length = Math.sqrt(Math.imul(GameUi.cameraCorner0X - GameUi.cameraCorner1X, GameUi.cameraCorner0X - GameUi.cameraCorner1X) + Math.imul(GameUi.cameraCorner0Y - GameUi.cameraCorner1Y, GameUi.cameraCorner0Y - GameUi.cameraCorner1Y));
    GameUi.cameraEdge12Length = Math.sqrt(Math.imul(GameUi.cameraCorner2X - GameUi.cameraCorner1X, GameUi.cameraCorner2X - GameUi.cameraCorner1X) + Math.imul(GameUi.cameraCorner2Y - GameUi.cameraCorner1Y, GameUi.cameraCorner2Y - GameUi.cameraCorner1Y));
    GameUi.cameraEdge23Length = Math.sqrt(Math.imul(GameUi.cameraCorner2X - GameUi.cameraCorner3X, GameUi.cameraCorner2X - GameUi.cameraCorner3X) + Math.imul(GameUi.cameraCorner2Y - GameUi.cameraCorner3Y, GameUi.cameraCorner2Y - GameUi.cameraCorner3Y));
    GameUi.cameraEdge30Length = Math.sqrt(Math.imul(GameUi.cameraCorner0X - GameUi.cameraCorner3X, GameUi.cameraCorner0X - GameUi.cameraCorner3X) + Math.imul(GameUi.cameraCorner0Y - GameUi.cameraCorner3Y, GameUi.cameraCorner0Y - GameUi.cameraCorner3Y));
    GameUi.cursorX = idiv(Engine.screenWidth, 4);
    GameUi.cursorY = idiv(Engine.screenHeight, 4);
    GameUi.cursorMaxSpeed = Math.max(1, idiv(Math.imul(Math.min(Engine.screenWidth, Engine.screenHeight), 50), 750));
    GameUi.cursorAcceleration = Math.max(1, idiv(Math.imul(GameUi.cursorMaxSpeed, 50), 250));
    GameUi.cursorDeceleration = Math.max(1, idiv(Math.imul(GameUi.cursorMaxSpeed, 50), 100));
    GameUi.scrollStep = 9;
    GameUi.maxVisibleRows = Math.max(GameUi.maxVisibleRows = Math.min(GameUi.maxVisibleRows = idiv(Engine.screenHeight - (18 + (Engine.getCellHeight(107) << 1) + 36), 18), 6), 3);
    if (Building.mainBuilding === null) {
      GameUi.cameraX = GameUi.cameraCorner0X;
      GameUi.cameraY = GameUi.cameraCorner3Y;
    } else {
      GameUi.cameraX = (Building.mainBuilding.tileX << 5) + (Building.mainBuilding.tileY << 5) - idiv(Engine.screenWidth, 2);
      GameUi.cameraY = (Building.mainBuilding.tileY << 4) - (Building.mainBuilding.tileX << 4) - idiv(Engine.screenHeight, 2);
    }
  }
  private static stopCursor(): void {
    GameUi.cursorDirX = 0;
    GameUi.cursorVelocityX = 0;
    GameUi.cursorDirY = 0;
    GameUi.cursorVelocityY = 0;
  }
  static reset(): void {
    GameUi.state = 0;
    GameUi.messageQueue.removeAllElements();
    GameUi.currentMessage = null;
    GameUi.setState(0);
    GameUi.hoveredObject = null;
    GameUi.hoverInfoValid = false;
    GameUi.hoveredTile = null;
    GameUi.setHint(null);
    GameUi.storageResources = null;
  }
  private static queueCampaignStoryMessages(): boolean {
    if (GameUi.campaignStoryStep >= 0) {
      GameUi.hoveredDepartment = -1;
      if (GameUi.coinResult === (-1) && GameUi.campaignStoryStep === 1 && GameUi.messageQueue.size() === 0) {
        let var10: GameUi = GameUi.newMessage = new GameUi();
        let var7: any = null;
        var10.portraitFrame = 16512;
        GameUi.newMessage.setText(Engine.getText(65591), 1, 0, 17, Engine.getColor(25), Engine.getColor(25));
        GameUi.newMessage.panDuration = 0;
        var7 = GameUi.newMessage;
        GameUi.messageQueue.addElement(var7);
        GameUi.setState(36);
        return true;
      }
      if (GameUi.storyMessagesQueued) {
        return false;
      }
      if (GameUi.coinResult === (-1) && GameUi.campaignStoryStep === 1 && GameUi.messageQueue.size() === 1) {
        GameUi.startCoinFlip(false);
        return false;
      }
      switch (GameUi.campaignStoryStep as number) {
        case 0:
          (GameUi.newMessage = new GameUi()).setText(Engine.getText(65544), 1, 0, 17, Engine.getColor(25), Engine.getColor(25));
          let var5: any = null;
          GameUi.newMessage.panDuration = 0;
          var5 = GameUi.newMessage;
          GameUi.messageQueue.addElement(var5);
          GameUi.setState(36);
          return true;
        case 1:
          let var9: GameUi = GameUi.newMessage = new GameUi();
          let var2: any = null;
          var9.portraitFrame = 16512;
          GameUi.newMessage.setTextWithSubstitutions(Engine.getText(65592), Int32Array.of(17, -1, -1, 1, 0, Engine.getColor(25), Engine.getColor(25)), Int32Array.of(17, -1, -1, 1, 0, Engine.getColor(30), Engine.getColor(30)), GameUi.textKeySubstitutions);
          GameUi.newMessage.panDuration = 0;
          var2 = GameUi.newMessage;
          GameUi.messageQueue.addElement(var2);
          (GameUi.newMessage = new GameUi()).portraitFrame = 16512;
          GameUi.newMessage.setTextWithSubstitutions(Engine.getText(65593), Int32Array.of(17, -1, -1, 1, 0, Engine.getColor(25), Engine.getColor(25)), Int32Array.of(17, -1, -1, 1, 0, Engine.getColor(30), Engine.getColor(30)), GameUi.textKeySubstitutions);
          GameUi.newMessage.panDuration = 0;
          var2 = GameUi.newMessage;
          GameUi.messageQueue.addElement(var2);
          GameUi.setState(36);
          GameUi.storyMessagesQueued = true;
          return true;
        case 5:
          let var10000: GameUi = GameUi.newMessage = new GameUi();
          let var0: any = null;
          var10000.portraitFrame = 16514;
          GameUi.newMessage.setText(Engine.getText(65623), 1, 0, 17, Engine.getColor(25), Engine.getColor(25));
          GameUi.newMessage.panDuration = 0;
          var0 = GameUi.newMessage;
          GameUi.messageQueue.addElement(var0);
          GameUi.setState(36);
          return true;
      }
    }
    return false;
  }
  static enterCampaignMap(): void {
    GameUi.coinResult = -1;
    GameUi.storyMessagesQueued = false;
    Engine.playMusic(0);
    GameUi.setState(30);
    GameUi.campaignCameraMinX = -(idiv(Engine.screenWidth, 8));
    GameUi.campaignCameraMinY = -(idiv(Engine.screenHeight, 8));
    GameUi.campaignCameraMaxX = Engine.getImageInfo(70, 5) + idiv(Math.imul(Engine.getCellWidth(70), 3), 2) - Engine.screenWidth;
    GameUi.campaignCameraMaxY = Engine.getImageInfo(59, 6) + (Engine.getCellWidth(70) << 1) - Engine.screenHeight;
    GameUi.cursorX = Engine.screenWidth >> 1;
    GameUi.cursorY = Engine.screenHeight >> 1;
    GameUi.cursorMaxSpeed = Math.max(1, idiv(Math.imul(Math.min(Engine.screenWidth, Engine.screenHeight), 50), 750));
    GameUi.cursorAcceleration = Math.max(1, idiv(Math.imul(GameUi.cursorMaxSpeed, 50), 250));
    GameUi.cursorDeceleration = Math.max(1, idiv(Math.imul(GameUi.cursorMaxSpeed, 50), 100));
    GameUi.scrollStep = 9;
    GameUi.cursorSpeedYFactor = 1;
    GameUi.cameraX = Engine.getCellWidth(66) >> 1;
    GameUi.cameraY = 0;
    GameUi.clampCampaignCamera();
    GameUi.textKeySubstitutions = Engine.getKeyNames();
    GameUi.messageQueue.removeAllElements();
    if (GameData.isFinalRegionUnlocked()) {
      GameUi.hoveredDepartment = -1;
      Engine.playMusic(1);
      (GameUi.newMessage = new GameUi()).setText(Engine.getText(65691), 1, 0, 1, 0, 0);
      let var1: any = null;
      GameUi.newMessage.portraitFrame = 16514;
      var1 = GameUi.newMessage;
      GameUi.messageQueue.addElement(var1);
      (GameUi.newMessage = new GameUi()).setText(Engine.getText(65692), 1, 0, 1, 0, 0);
      GameUi.newMessage.portraitFrame = 16515;
      var1 = GameUi.newMessage;
      GameUi.messageQueue.addElement(var1);
      (GameUi.newMessage = new GameUi()).setText(Engine.getText(65693), 1, 0, 1, 0, 0);
      GameUi.newMessage.portraitFrame = 16513;
      var1 = GameUi.newMessage;
      GameUi.messageQueue.addElement(var1);
      (GameUi.newMessage = new GameUi()).setText(Engine.getText(65694), 1, 0, 1, 0, 0);
      GameUi.newMessage.portraitFrame = 16514;
      var1 = GameUi.newMessage;
      GameUi.messageQueue.addElement(var1);
      (GameUi.newMessage = new GameUi()).setText(Engine.getText(65695), 1, 0, 1, 0, 0);
      GameUi.newMessage.portraitFrame = 16513;
      var1 = GameUi.newMessage;
      GameUi.messageQueue.addElement(var1);
      (GameUi.newMessage = new GameUi()).setText(Engine.getText(65696), 1, 0, 1, 0, 0);
      GameUi.newMessage.portraitFrame = 16514;
      var1 = GameUi.newMessage;
      GameUi.messageQueue.addElement(var1);
      (GameUi.newMessage = new GameUi()).setText(Engine.getText(65697), 1, 0, 1, 0, 0);
      GameUi.newMessage.portraitFrame = 16513;
      var1 = GameUi.newMessage;
      GameUi.messageQueue.addElement(var1);
      GameUi.setState(36);
    } else if (!GameUi.coinFlipDone) {
      if (GameUi.queueCampaignStoryMessages()) {
        if (GameUi.messageQueue.size() !== 0) {
          let var0: GameUi = null;
          (var0 = GameUi.messageQueue.elementAt(0) as GameUi).textBox.setViewHeight(var0.textBox.contentHeight - idiv(Engine.screenHeight, 4) > 40 ? idiv(Engine.screenHeight, 4) : var0.textBox.contentHeight);
          GameUi.messageQueue.setElementAt(var0, 0);
        }
      } else {
        GameUi.startCoinFlip(false);
      }
    } else {
      GameUi.setState(30);
    }
  }
  static startCoinFlip(var0: boolean): void {
    if (var0) {
      GameUi.coinFlipDone = false;
      (Game.actionPoints = (Game.actionPoints - 1) << 24 >> 24);
    }
    GameUi.lastHoveredDepartment = -1;
    GameUi.hoveredDepartment = -1;
    GameUi.setCampaignMessage(Engine.getText(65537));
    GameUi.coinBaseY = Engine.screenHeight - Engine.getFrameHeight(72, 16470) - Math.imul(Engine.getCellHeight(113), 3);
    GameUi.coinOffsetY = 0;
    GameUi.coinLaunchSpeed = 30;
    GameUi.coinGravity = 2;
    GameUi.coinVelocityY = GameUi.coinLaunchSpeed;
    GameUi.coinFlipping = true;
    GameUi.coinFrame = 0;
    GameUi.coinSpinSpeed = 4;
    if (!GameUi.coinFlipDone) {
      GameUi.coinResult = (GameUi.coinResult = Engine.randomRange(0, 100)) <= 70 ? 1 : 0;
      GameUi.setState(33);
    } else {
      GameUi.setState(30);
    }
  }
  private static backupTroops(): void {
    if (GameUi.troopsBackup === null) {
      GameUi.troopsBackup = new Int8Array(Game.playerTroops.length);
    }
    GameUi.actionPointsBackup = Game.actionPoints;
    GameUi.troopPoolBackup = Game.troopPool;
    arraycopy(Game.playerTroops, 0, GameUi.troopsBackup, 0, Game.playerTroops.length);
  }
  private static endTroopEditing(var0: boolean): void {
    if (GameUi.troopsBackup !== null) {
      if (var0) {
        Game.actionPoints = GameUi.actionPointsBackup;
        Game.troopPool = GameUi.troopPoolBackup;
        arraycopy(GameUi.troopsBackup, 0, Game.playerTroops, 0, Game.playerTroops.length);
      } else {
        GameUi.backupTroops();
      }
    }
  }
  private static showCampaignDialog(var0: Vector, var1: number, var2: number, var3: number, var4: number, var5: number, var6: number): void {
    let var7: Menu = null;
    (var7 = new Menu().$init0()).style = 3;
    for (let var8: number = 0; var8 < var0.size(); var8++) {
      var7.addItem(var0.elementAt(var8) as Int32Array);
    }
    var7.leftSoftKeyCommand = var7.fireCommand = var1;
    var7.leftSoftKeyArg = var7.fireArg = var2;
    var7.leftSoftKeyIcon = 16518;
    var7.rightSoftKeyCommand = var4;
    if (var7.fireCommand === (-1)) {
      var7.fireCommand = var4;
      var7.fireArg = -1;
    }
    var7.rightSoftKeyArg = -1;
    var7.rightSoftKeyIcon = var6;
    GameUi.setState(30);
    App.pushMenu(var7);
  }
  private static setCampaignMessage(var0: string): void {
    GameUi.setCampaignMessageColored(var0, Engine.getColor(34));
  }
  private static setCampaignMessageColored(var0: string, var1: number): void {
    GameUi.campaignMessageBox = new TextBox().$init0(Engine.screenWidth - 26 - Math.imul(2, Engine.getCellWidth(151)) - 2, Engine.getFontHeight(1), 5);
    let var2: Hashtable = null;
    (var2 = new Hashtable(1)).put("GOLD", jstr(10));
    var0 = Engine.formatText(var0, var2);
    GameUi.campaignMessageBox.addText(var0, Int32Array.of(17, -1, -1, 1, 0, var1, var1));
    GameUi.campaignMessageBox.setScrollSpeed(2, 0);
    GameUi.campaignMessageBox.resetScrollDelay();
  }
  private static pickHoveredDepartment(): boolean {
    GameUi.hoveredDepartment = -1;
    GameUi.campaignMessageBox = null;
    for (let var0: number = 56; var0 <= 71; var0++) {
      let var1: number = 0 - GameUi.cameraY + Engine.getImageInfo(var0, 6);
      let var2: number = 0 - GameUi.cameraY + Engine.getCellHeight(var0) + Engine.getImageInfo(var0, 6);
      let var3: number = 0 - GameUi.cameraX + Engine.getImageInfo(var0, 5);
      let var4: number = 0 - GameUi.cameraX + Engine.getCellWidth(var0) + Engine.getImageInfo(var0, 5);
      if (GameUi.cursorX >= var3 && GameUi.cursorX <= var4 && GameUi.cursorY >= var1 && GameUi.cursorY <= var2 && Engine.isSpritePixelOpaque(var0, 0, 0 - (GameUi.cameraX + GameUi.cursorX), 0 - (GameUi.cameraY + GameUi.cursorY))) {
        GameUi.hoveredDepartment = var0 - 56;
        if (GameUi.lastHoveredDepartment !== GameUi.hoveredDepartment) {
          GameUi.lastHoveredDepartment = GameUi.hoveredDepartment;
          GameUi.departmentHoverAnim = 10;
        }
        GameUi.hoveredDepartmentName = Engine.getText(GameData.regionNameTextIds[GameUi.hoveredDepartment]);
        return true;
      }
    }
    GameUi.lastHoveredDepartment = -1;
    return false;
  }
  static getDepartmentAccess(var0: number): number {
    if (var0 === (-1)) {
      return (-1);
    }
    if (Game.departmentConquered[var0]) {
      return (-2);
    }
    let var1: number = 0;
    for (let var2: number = 0; var2 < Game.departmentConquered.length; var2++) {
      if (Game.departmentConquered[var2] && GameData.regionRewardOptions[var2].length > 1) {
        var1++;
      }
    }
    if (var1 < GameData.regionsRequiredToUnlock[var0]) {
      return (-3);
    }
    for (let var3: number = 0; var3 < GameData.regionAdjacency[var0].length; var3++) {
      if (GameData.regionAdjacency[var3][var0] && Game.departmentConquered[var3]) {
        return 0;
      }
    }
    return var0 === 0 ? 0 : (-4);
  }
  private static applyCoinResult(var0: number): void {
    let var1: Vector = new Vector();
    if (var0 === 0) {
      for (let var2: number = 0; var2 < Game.kingTroops.length; var2++) {
        if (Game.kingTroops[var2] >= 0) {
          var1.addElement(var2);
        }
      }
      if (!var1.isEmpty()) {
        var0 = Engine.randomInt(var1.size());
        var0 = var1.elementAt(var0);
        Game.kingTroops[var0]++;
        GameUi.flashDepartment = var0;
        GameUi.flashTimer = 50;
      }
    } else {
      Game.bonusGold += 10;
    }
  }
  static updateCampaign(): void {
    if (--GameUi.flashTimer <= 0) {
      GameUi.flashTimer = 0;
      GameUi.flashDepartment = 0;
    }
    switch (GameUi.state as number) {
      case 31:
      case 32:
      case 33:
      case 35:
      case 36:
        break;
      case 34:
        if (GameUi.coinFlipping) {
          GameUi.coinOffsetY = GameUi.coinOffsetY - GameUi.coinVelocityY;
          GameUi.coinVelocityY = GameUi.coinVelocityY - GameUi.coinGravity;
          if ((GameUi.coinFrame = GameUi.coinFrame + GameUi.coinSpinSpeed) >= 10) {
            GameUi.coinFrame -= 10;
          }
          if (GameUi.coinOffsetY >= 0) {
            GameUi.coinVelocityY = idiv(Math.imul(Math.abs(GameUi.coinVelocityY), 6), 10);
            GameUi.coinSpinSpeed--;
          }
          if (GameUi.coinSpinSpeed <= 1) {
            GameUi.coinSpinSpeed = 1;
            GameUi.coinVelocityY = 0;
            if (GameUi.coinResult === 0 && GameUi.coinFrame === 0) {
              GameUi.setCampaignMessage(Engine.getText(65689));
              GameUi.coinFlipping = false;
              GameUi.applyCoinResult(GameUi.coinResult);
              Engine.playSound(41);
            } else if (GameUi.coinResult === 1 && GameUi.coinFrame === 5) {
              GameUi.setCampaignMessage(Engine.getText(65688));
              GameUi.coinFlipping = false;
              GameUi.applyCoinResult(GameUi.coinResult);
              Engine.playSound(40);
            }
          }
        } else {
          GameUi.coinFlipDone = true;
        }
        break;
      default:
        if (GameUi.hoveredDepartment > (-1)) {
          GameUi.departmentHoverAnim = idiv(GameUi.departmentHoverAnim, 2);
        }
        GameUi.updateCursor();
        if (GameUi.cursorVelocityX === 0 && GameUi.cursorVelocityY === 0 && !GameUi.hoverInfoValid) {
          GameUi.hoverInfoValid = true;
          if (GameUi.pickHoveredDepartment()) {
            switch (GameUi.getDepartmentAccess(GameUi.hoveredDepartment)) {
              case (-2):
              case 0:
                if (GameData.regionRewardOptions[GameUi.hoveredDepartment].length <= 1) {
                  GameUi.setCampaignMessageColored(GameUi.hoveredDepartmentName, Engine.getColor(36));
                } else {
                  GameUi.setCampaignMessageColored(GameUi.hoveredDepartmentName, Engine.getColor(34));
                }
                break;
              default:
                GameUi.setCampaignMessageColored(GameUi.hoveredDepartmentName, Engine.getColor(35));
            }
          }
        }
    }
    GameUi.clampCampaignCamera();
  }
  static drawCampaign(var0: Graphics): void {
    let var1: number = idiv(Engine.screenWidth, 3);
    if (Engine.screenWidth % 3 !== 0) {
      var1++;
    }
    let var2: number = 0 - GameUi.cameraX;
    let var3: number = 0 - GameUi.cameraY;
    var0.setColor(Engine.getColor(31));
    var0.fillRect(0, 0, var1, Engine.screenHeight);
    var0.setColor(Engine.getColor(32));
    var0.fillRect(var1, 0, var1, Engine.screenHeight);
    var0.setColor(Engine.getColor(33));
    var0.fillRect(var1 << 1, 0, var1, Engine.screenHeight);
    let var4: number = 0;
    for (let var5: number = 56; var5 <= 71; var5++) {
      Engine.drawImage(var0, var2, var3, var5);
      let var6: number = 0;
      if ((var6 = var5 - 56) !== GameUi.hoveredDepartment && var5 !== 71) {
        var1 = var2 + Engine.getImageInfo(var5, 5) + (Engine.getCellWidth(var5) >> 1);
        var4 = var3 + Engine.getImageInfo(var5, 6) + (Engine.getCellHeight(var5) >> 1);
        if (var5 === 69) {
          var1 -= 10;
        }
        if (Game.departmentConquered[var6] && Game.departmentBonusChoice[var6] >= 0) {
          GameUi.drawDepartmentMarker(var0, var1, var4, GameData.regionRewardOptions[var6][Game.departmentBonusChoice[var6]], GameData.regionRewardOptions[var6].length <= 1);
          if (GameData.regionRewardOptions[var6].length > 1) {
            Engine.drawSprite(var0, var1 + 10, var4 - 2 - 10, 164, 0);
            Engine.drawSprite(var0, var1 + 10, var4 - 2 - 10, 164, 1);
          }
        } else if (Game.kingTroops[var6] > 0 && (var6 !== GameUi.flashDepartment || GameUi.flashTimer % 5 === 0 && var6 === GameUi.flashDepartment)) {
          GameUi.drawDepartmentMarker(var0, var1, var4 + 2, 153, false);
        }
        if (GameUi.getDepartmentAccess(var6) === 0) {
          Engine.drawSprite(var0, var1 + 10, var4 - 2 - 10, 164, 0);
        }
      }
    }
    if (GameUi.departmentHoverAnim < 10 && GameUi.hoveredDepartment >= 0 && GameUi.hoveredDepartment + 56 !== 71) {
      for (let var23: number = 1; var23 <= 10 - GameUi.departmentHoverAnim; var23++) {
        Engine.drawImage(var0, var2, var3 - var23, GameUi.hoveredDepartment + 56);
      }
      var1 = var2 + Engine.getImageInfo(GameUi.hoveredDepartment + 56, 5) + (Engine.getCellWidth(GameUi.hoveredDepartment + 56) >> 1);
      var4 = var3 + Engine.getImageInfo(GameUi.hoveredDepartment + 56, 6) + (Engine.getCellHeight(GameUi.hoveredDepartment + 56) >> 1);
      if (GameUi.hoveredDepartment === 13) {
        var1 -= 10;
      }
      var4 -= 10 - GameUi.departmentHoverAnim;
      if (Game.departmentConquered[GameUi.hoveredDepartment] && Game.departmentBonusChoice[GameUi.hoveredDepartment] >= 0) {
        GameUi.drawDepartmentMarker(var0, var1, var4, GameData.regionRewardOptions[GameUi.hoveredDepartment][Game.departmentBonusChoice[GameUi.hoveredDepartment]], GameData.regionRewardOptions[GameUi.hoveredDepartment].length <= 1);
        if (GameData.regionRewardOptions[GameUi.hoveredDepartment].length > 1) {
          Engine.drawSprite(var0, var1 + 10, var4 - 2 - 10, 164, 0);
          Engine.drawSprite(var0, var1 + 10, var4 - 2 - 10, 164, 1);
        }
      } else if (Game.kingTroops[GameUi.hoveredDepartment] > 0 && (GameUi.hoveredDepartment !== GameUi.flashDepartment || GameUi.flashTimer % 5 === 0 && GameUi.hoveredDepartment === GameUi.flashDepartment)) {
        GameUi.drawDepartmentMarker(var0, var1, var4 + 2, 153, false);
      }
      if (GameUi.getDepartmentAccess(GameUi.hoveredDepartment) === 0) {
        Engine.drawSprite(var0, var1 + 10, var4 - 2 - 10, 164, 0);
      }
    }
    switch (GameUi.state as number) {
      case 31:
        let var25: number = Math.imul(Engine.getCellWidth(104), GameData.regionRewardOptions[GameUi.hoveredDepartment].length);
        var25 += 16;
        let var29: number = (Engine.screenWidth >> 1) - (var25 >> 1);
        var1 = GameUi.drawPanelTop(null, (Engine.screenWidth >> 1) - (var25 >> 1), Engine.screenHeight >> 1, var25);
        var2 = GameUi.drawPanelRow(null, (Engine.screenWidth >> 1) - (var25 >> 1), Engine.screenHeight >> 1, var25);
        GameUi.drawPanelTop(var0, (Engine.screenWidth >> 1) - (var25 >> 1), (Engine.screenHeight >> 1) - var1 - idiv(var2, 2), var25);
        GameUi.drawPanelRow(var0, (Engine.screenWidth >> 1) - (var25 >> 1), (Engine.screenHeight >> 1) - idiv(var2, 2), var25);
        GameUi.drawPanelBottom(var0, (Engine.screenWidth >> 1) - (var25 >> 1), (Engine.screenHeight >> 1) + idiv(var2, 2), var25);
        for (let var22: number = 0; var22 < GameData.regionRewardOptions[GameUi.hoveredDepartment].length; var22++) {
          GameUi.drawIconSlot(var0, var29 + 10 + Math.imul(var22, Engine.getCellHeight(104)) - Engine.getImageInfo(104, 5), (Engine.screenHeight >> 1) - idiv(var2, 2) - Engine.getImageInfo(104, 6), GameData.regionRewardOptions[GameUi.hoveredDepartment][var22], GameUi.selectedBonusResource === var22);
        }
        GameUi.drawCampaignHud(var0);
        return;
      case 32:
        let var24: number = idiv(Engine.screenWidth, 12);
        let var27: number = (Engine.screenHeight >> 1) - idiv(Engine.screenWidth, 12);
        var1 = Engine.screenWidth - Math.imul(2, idiv(Engine.screenWidth, 12));
        var2 = var27;
        var3 = var24 + 8;
        var4 = Engine.screenWidth - (var3 << 1);
        let var7: number = (Math.max(Engine.getFontHeight(1), Engine.getCellHeight(113)) << 1) + (Engine.getCellHeight(113) << 1);
        if ((var7 = var27 + (Engine.getFrameHeight(115, 16493) << 2) - (Engine.screenHeight - var7)) > 0) {
          var2 = var27 -= var7;
        }
        if (var1 > 180) {
          var1 = 180;
          var3 = (var24 = idiv(Engine.screenWidth, 2) - 90) + 8;
          var4 = 164;
        }
        let var13: number = 0;
        var27 = var13 = var2 + GameUi.drawPanelTop(var0, var24, var27, var1);
        var7 = var2 = var13 + GameUi.drawPanelRow(var0, var24, var13, var1);
        var2 += GameUi.drawPanelRow(var0, var24, var2, var1);
        GameUi.drawPanelBottom(var0, var24, var2, var1);
        GameUi.drawCountBox(var0, var3, var27, 851968 | Game.troopPool, false, 2);
        GameUi.drawSegmentedBar(var0, var3, var7, Game.playerTroops[GameUi.hoveredDepartment], Math.min(GameUi.troopsBackup[GameUi.hoveredDepartment] + (GameUi.troopPoolBackup < GameUi.actionPointsBackup ? GameUi.troopPoolBackup : GameUi.actionPointsBackup), 5), true, var4);
      default:
        Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 168, 16562);
        GameUi.drawCampaignHud(var0);
        return;
      case 33:
      case 34:
        Engine.drawSpriteAnchored(var0, Engine.screenWidth >> 1, GameUi.coinBaseY + GameUi.coinOffsetY, 72, 16461 + GameUi.coinFrame, 3);
        GameUi.drawCampaignHud(var0);
        return;
      case 35:
        GameUi.drawActionMenuCenter(var0, GameUi.cursorX, GameUi.cursorY);
        Engine.drawNumber(var0, GameUi.cursorX, GameUi.cursorY, Game.actionPoints, 3, 114);
        if (GameUi.getDepartmentAccess(GameUi.hoveredDepartment) !== (-2)) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 167, 16558);
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY + 5, 165, 16539);
        }
        if (GameUi.hoveredDepartment >= 0 && Game.troopPool > 0 && Game.actionPoints > 0 && !Game.departmentConquered[GameUi.hoveredDepartment] && Game.playerTroops[GameUi.hoveredDepartment] < 5) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 167, 16559);
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY - 5, 165, 16538);
        }
        if (Game.actionPoints > 0) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 167, 16561);
          Engine.drawSprite(var0, GameUi.cursorX - 5, GameUi.cursorY, 165, 16540);
        }
        if (Game.departmentConquered[GameUi.hoveredDepartment] && Game.actionPoints > 0 && GameData.regionRewardOptions[GameUi.hoveredDepartment].length > 1) {
          Engine.drawSprite(var0, GameUi.cursorX, GameUi.cursorY, 167, 16560);
          Engine.drawSprite(var0, GameUi.cursorX + 5, GameUi.cursorY, 165, 16541);
        }
        GameUi.drawCampaignHud(var0);
        GameUi.drawCampaignMessage(var0, 1);
        return;
      case 36:
        if (GameUi.messageQueue.size() !== 0) {
          (GameUi.messageQueue.elementAt(0) as GameUi).drawMessage(var0);
        }
        GameUi.drawCampaignHud(var0);
    }
  }
  private static drawDepartmentMarker(var0: Graphics, var1: number, var2: number, var3: number, var4: boolean): void {
    if (var3 !== 153) {
      var1 -= Engine.getCellWidth(Game.resourceIcons[var3 >> 16 & 255]) >> 1;
      var2 -= Engine.getCellHeight(Game.resourceIcons[var3 >> 16 & 255]) >> 1;
      GameUi.drawIconSlot(var0, var1, var2, var3 & 16711680 | (var4 ? 1 : 0), false);
    } else {
      var1 -= Engine.getCellWidth(var3) >> 1;
      var2 -= Engine.getCellHeight(var3) >> 1;
      Engine.drawSprite(var0, var1, var2, var3, 0);
    }
  }
  private static drawCampaignMessage(var0: Graphics, var1: number): void {
    if (GameUi.campaignMessageBox !== null) {
      let var2: number = Engine.getCellHeight(113) + Math.imul(Math.max(GameUi.campaignMessageBox.height, Engine.getCellHeight(113)), var1);
      let var3: number = Engine.screenHeight - var2;
      Engine.drawPanel(var0, Engine.getCellWidth(151) + 1, var3, Engine.screenWidth - Math.imul(2, Engine.getCellWidth(151)) - 2, var2, 113);
      if (var1 === 1) {
        GameUi.campaignMessageBox.draw(var0, idiv(Engine.screenWidth, 2), var3 + idiv(var2, 2), 3);
        return;
      }
      GameUi.campaignMessageBox.draw(var0, idiv(Engine.screenWidth, 2), var3 + idiv(var2, 2), 17);
    }
  }
  private static drawCampaignHud(var0: Graphics): void {
    if (var0 !== null) {
      if (!App.hasMenu()) {
        if (GameUi.state !== 34 && GameUi.state !== 33) {
          let var1: number = Engine.screenWidth;
          let var2: number = 0;
          GameUi.drawTopCountFrame(var0, 0, 0, false, 2, 65536);
          Engine.drawSpriteAnchored(var0, 0, idiv(Engine.getFrameHeight(106, 16478), 2), 85, 0, 6);
          Engine.drawNumber(var0, Engine.getCellWidth(85) + 1, idiv(Engine.getFrameHeight(106, 16478), 2), Game.troopPool, 6, 114);
          var2 = 1;
          let var3: number = Game.bonusGold;
          do {
            var2++;
          } while ((var3 = idiv(var3, 10)) > 10);
          GameUi.drawTopCountFrame(var0, var1 - 18 - Math.imul(var2, 10) + 1, 0, false, var2, 65536);
          Engine.drawSpriteAnchored(var0, var1, idiv(Engine.getFrameHeight(106, 16478), 2), 79, 0, 10);
          Engine.drawNumber(var0, var1 - 1 - Engine.getCellWidth(79), idiv(Engine.getFrameHeight(106, 16478), 2), Game.bonusGold, 10, 114);
          var2 = 0;
          for (let var11: number = 0; var11 < Game.departmentConquered.length; var11++) {
            if (Game.departmentConquered[var11] && GameData.regionRewardOptions[var11].length > 1) {
              var2++;
            }
          }
          GameUi.drawTopCountFrame(var0, (var1 >> 1) - 19, 0, false, 2, 65536);
          Engine.drawNumber(var0, var1 >> 1, idiv(Engine.getFrameHeight(106, 16478), 2), var2, 10, 114);
          Engine.drawSpriteAnchored(var0, var1 >> 1, idiv(Engine.getFrameHeight(106, 16478), 2), 164, 0, 6);
          Engine.drawSpriteAnchored(var0, var1 >> 1, idiv(Engine.getFrameHeight(106, 16478), 2), 164, 1, 6);
        }
        switch (GameUi.state as number) {
          case 30:
          case 32:
            let var4: boolean = GameUi.hoveredDepartment >= 0 && GameUi.hoveredDepartment + 56 !== 71 && !Game.departmentConquered[GameUi.hoveredDepartment];
            GameUi.drawCampaignMessage(var0, var4 ? 2 : 1);
            if (var4) {
              let var9: number = Engine.getCellHeight(113) + Math.max(GameUi.campaignMessageBox.height, Engine.getCellHeight(113));
              Engine.drawNumber(var0, (Engine.screenWidth >> 1) - 2, Engine.screenHeight - var9, GameData.regionsRequiredToUnlock[GameUi.hoveredDepartment], 10, 114);
              Engine.drawSpriteAnchored(var0, Engine.screenWidth >> 1, Engine.screenHeight - var9, 164, 0, 6);
              Engine.drawSpriteAnchored(var0, Engine.screenWidth >> 1, Engine.screenHeight - var9, 164, 1, 6);
            }
            break;
          case 31:
            GameUi.drawCampaignMessage(var0, 1);
            break;
          case 33:
          case 34:
            GameUi.drawCampaignMessage(var0, 1);
        }
        if (GameUi.hoveredDepartment > (-1) && GameUi.hoveredDepartment + 56 !== 71 && (GameUi.state === 32 || Game.kingTroops[GameUi.hoveredDepartment] > 0 || Game.playerTroops[GameUi.hoveredDepartment] > 0) && GameUi.state !== 35 && GameUi.state !== 36) {
          let var5: number = Engine.getCellHeight(113) + (Math.max(GameUi.campaignMessageBox.height, Engine.getCellHeight(113)) << 1);
          Engine.drawSpriteAnchored(var0, Engine.getCellWidth(149) + Engine.getCellWidth(113), Engine.screenHeight - var5, 148, 16513, 36);
          Engine.drawSpriteAnchored(var0, Engine.screenWidth - Engine.getCellWidth(149) - Engine.getCellWidth(113), Engine.screenHeight - var5, 148, 16515, 40);
          Engine.drawSpriteAnchored(var0, Engine.getCellWidth(149) + Engine.getCellWidth(113), Engine.screenHeight - var5, 73, 0, 40);
          Engine.drawSpriteAnchored(var0, Engine.screenWidth - Engine.getCellWidth(149) - Engine.getCellWidth(113), Engine.screenHeight - var5, 73, 0, 36);
          Engine.drawNumber(var0, Engine.getCellWidth(149) + Engine.getCellWidth(113) - idiv(Engine.getCellWidth(73), 2), Engine.screenHeight - var5 - idiv(Engine.getCellHeight(73), 2), Game.playerTroops[GameUi.hoveredDepartment] > 0 ? Game.playerTroops[GameUi.hoveredDepartment] : 0, 3, 114);
          Engine.drawNumber(var0, Engine.screenWidth - Engine.getCellWidth(149) - Engine.getCellWidth(113) + idiv(Engine.getCellWidth(73), 2), Engine.screenHeight - var5 - idiv(Engine.getCellHeight(73), 2), Game.kingTroops[GameUi.hoveredDepartment] > 0 ? Game.kingTroops[GameUi.hoveredDepartment] : 0, 3, 114);
        }
        let var6: boolean = true;
        let var10: boolean = true;
        if (GameUi.state === 33 || GameUi.state === 34) {
          var10 = false;
        }
        if (GameUi.state === 35) {
          var6 = false;
        }
        let var12: number = 16519;
        if (GameUi.state === 30 || GameUi.state === 36) {
          var12 = 16521;
        }
        if (var10) {
          Engine.drawSprite(var0, Engine.screenWidth, Engine.screenHeight, 149, 16516);
          Engine.drawSprite(var0, Engine.screenWidth, Engine.screenHeight, 151, var12);
        }
        if (var6) {
          Engine.drawSpriteAnchored(var0, 0, Engine.screenHeight, 149, 0, 36);
          Engine.drawSpriteAnchored(var0, 0, Engine.screenHeight, 151, 16518, 36);
        }
      }
    }
  }
  private static clampCampaignCamera(): void {
    let var0: number = GameUi.campaignCameraMinY;
    let var1: number = GameUi.campaignCameraMaxY;
    let var2: number = GameUi.campaignCameraMinX;
    let var3: number = GameUi.campaignCameraMaxX;
    if (GameUi.cameraX < var2) {
      GameUi.cameraX = var2;
    }
    if (GameUi.cameraX > var3) {
      GameUi.cameraX = var3;
    }
    if (GameUi.cameraY > var1) {
      GameUi.cameraY = var1;
    }
    if (GameUi.cameraY < var0) {
      GameUi.cameraY = var0;
    }
  }
  static campaignKeyReleased(): boolean {
    GameUi.cursorDirX = 0;
    GameUi.cursorDirY = 0;
    switch (GameUi.state as number) {
      case 36:
        if (GameUi.messageQueue.isEmpty()) {
          return false;
        }
        return (GameUi.messageQueue.elementAt(0) as GameUi).messageKeyReleased();
      default:
        return false;
    }
  }
  static campaignKeyPressed(var0: number): boolean {
    GameUi.hoverInfoValid = false;
    switch (var0) {
      case 8:
        switch (GameUi.state as number) {
          case 31:
            Game.departmentBonusChoice[GameUi.hoveredDepartment] = GameUi.previousBonusResource;
            GameUi.setState(30);
            return true;
          case 32:
            GameUi.endTroopEditing(true);
            GameUi.setState(30);
            return true;
          case 33:
          case 34:
            return true;
          case 35:
            GameUi.setState(30);
            return true;
          case 36:
          default:
            App.openMenu(51);
            return true;
        }
      default:
        switch (GameUi.state as number) {
          case 31:
            switch (var0) {
              case 3:
                if (--GameUi.selectedBonusResource < 0) {
                  GameUi.selectedBonusResource = GameData.regionRewardOptions[GameUi.hoveredDepartment].length - 1;
                }
                return true;
              case 4:
                if (++GameUi.selectedBonusResource > GameData.regionRewardOptions[GameUi.hoveredDepartment].length - 1) {
                  GameUi.selectedBonusResource = 0;
                }
                return true;
              case 5:
              default:
                return false;
              case 6:
              case 7:
                Game.departmentBonusChoice[GameUi.hoveredDepartment] = (GameUi.selectedBonusResource) << 24 >> 24;
                if (GameUi.previousBonusResource !== Game.departmentBonusChoice[GameUi.hoveredDepartment]) {
                  (Game.actionPoints = (Game.actionPoints - 1) << 24 >> 24);
                }
                GameUi.setState(30);
                return true;
            }
          case 32:
            switch (var0) {
              case 3:
                if (--Game.playerTroops[GameUi.hoveredDepartment] >= GameUi.troopsBackup[GameUi.hoveredDepartment]) {
                  (Game.troopPool = (Game.troopPool + 1) << 24 >> 24);
                  (Game.actionPoints = (Game.actionPoints + 1) << 24 >> 24);
                } else {
                  Game.playerTroops[GameUi.hoveredDepartment] = GameUi.troopsBackup[GameUi.hoveredDepartment];
                }
                return true;
              case 4:
                if ((Game.troopPool = (Game.troopPool - 1) << 24 >> 24) >= 0 && (Game.actionPoints = (Game.actionPoints - 1) << 24 >> 24) >= 0 && 5 >= Game.playerTroops[GameUi.hoveredDepartment] + 1) {
                  Game.playerTroops[GameUi.hoveredDepartment]++;
                } else {
                  (Game.troopPool = (Game.troopPool + 1) << 24 >> 24);
                  (Game.actionPoints = (Game.actionPoints + 1) << 24 >> 24);
                }
                return true;
              case 5:
              default:
                return false;
              case 6:
              case 7:
                GameUi.endTroopEditing(false);
                GameUi.setState(30);
                return true;
            }
          case 33:
            switch (var0) {
              case 6:
              case 7:
                GameUi.campaignMessageBox = null;
                Engine.playSound(39);
                GameUi.setState(34);
                return true;
              default:
                return false;
            }
          case 34:
            switch (var0) {
              case 6:
              case 7:
                if (GameUi.coinFlipping) {
                  GameUi.coinOffsetY = 0;
                  GameUi.coinSpinSpeed = 1;
                  GameUi.coinVelocityY = 0;
                  if (GameUi.coinResult === 0) {
                    GameUi.coinFrame = 9;
                  } else {
                    GameUi.coinFrame = 4;
                  }
                } else {
                  if (!Engine.isDemo()) {
                    Game.saveCampaign();
                  }
                  if (GameUi.campaignStoryStep === 1 && !GameUi.storyMessagesQueued) {
                    GameUi.queueCampaignStoryMessages();
                  } else {
                    GameUi.setState(30);
                  }
                  GameUi.coinFlipDone = true;
                }
                return true;
              default:
                return false;
            }
          case 35:
            switch (var0) {
              case 2:
                if (GameUi.hoveredDepartment >= 0 && Game.troopPool > 0 && Game.actionPoints > 0 && !Game.departmentConquered[GameUi.hoveredDepartment] && Game.playerTroops[GameUi.hoveredDepartment] < 5) {
                  GameUi.backupTroops();
                  GameUi.setCampaignMessage(Engine.getText(65543));
                  GameUi.setState(32);
                }
                return true;
              case 3:
                if (Game.actionPoints > 0) {
                  let var5: Vector = null;
                  (var5 = new Vector(1)).addElement(Int32Array.of(101, 0, 0, 65538, 17));
                  GameUi.showCampaignDialog(var5, 8, -1, 16518, 4101, -1, 16519);
                }
                return true;
              case 4:
                if (Game.departmentConquered[GameUi.hoveredDepartment] && Game.actionPoints > 0 && GameData.regionRewardOptions[GameUi.hoveredDepartment].length > 1) {
                  GameUi.setState(31);
                  GameUi.previousBonusResource = Game.departmentBonusChoice[GameUi.hoveredDepartment];
                  GameUi.selectedBonusResource = Game.departmentBonusChoice[GameUi.hoveredDepartment];
                  GameUi.setCampaignMessage(Engine.getText(65542));
                }
                return true;
              case 5:
                let var4: Vector = new Vector(1);
                let var1: number = 0;
                if ((var1 = GameUi.getDepartmentAccess(GameUi.hoveredDepartment)) >= 0) {
                  GameUi.campaignLevel = GameUi.hoveredDepartment;
                  let var6: string = Engine.getText(65539);
                  let var2: Hashtable = null;
                  (var2 = new Hashtable(1)).put("level", GameUi.hoveredDepartmentName);
                  let var7: string = Engine.formatText(var6, var2);
                  var4.addElement(Int32Array.of(101, 0, 0, Engine.addTempText(var7), 17));
                  var1 = -1;
                  for (let var11: number = 0; var11 < Game.departmentConquered.length; var11++) {
                    if (Game.departmentConquered[var11]) {
                      var1++;
                    }
                  }
                  if (!Engine.isLevelInDemo(var1)) {
                    App.openMenu(50);
                    return true;
                  }
                  GameUi.showCampaignDialog(var4, 2, GameUi.hoveredDepartment, 16518, 4101, -1, 16519);
                } else if (var1 !== (-2)) {
                  if (var1 === (-4)) {
                    var4.addElement(Int32Array.of(101, 0, 0, 65541, 17));
                    GameUi.showCampaignDialog(var4, 4101, -1, 16518, -1, -1, -1);
                  } else {
                    let var9: string = Engine.getText(65540);
                    let var12: Hashtable = null;
                    (var12 = new Hashtable(1)).put("count", jstr(GameData.regionsRequiredToUnlock[GameUi.hoveredDepartment]));
                    let var10: string = Engine.formatText(var9, var12);
                    var4.addElement(Int32Array.of(101, 0, 0, Engine.addTempText(var10), 17));
                    GameUi.showCampaignDialog(var4, 4101, -1, 16518, -1, -1, -1);
                  }
                }
                return true;
              default:
                return false;
            }
          case 36:
            switch (var0) {
              case 6:
              case 7:
                if (GameUi.messageQueue.size() >= 1) {
                  GameUi.messageQueue.removeElementAt(0);
                  if (GameUi.messageQueue.size() !== 0) {
                    let var3: GameUi = null;
                    (var3 = GameUi.messageQueue.elementAt(0) as GameUi).textBox.setViewHeight(var3.textBox.contentHeight - idiv(Engine.screenHeight, 4) > 40 ? idiv(Engine.screenHeight, 4) : var3.textBox.contentHeight);
                    GameUi.messageQueue.setElementAt(var3, 0);
                  }
                  if (GameUi.coinResult === (-1) && GameUi.campaignStoryStep === 1 && GameUi.messageQueue.size() === 0) {
                    GameUi.startCoinFlip(false);
                    GameUi.setState(33);
                  } else if (GameUi.coinResult === (-1) && GameUi.campaignLevel === 5 && GameUi.messageQueue.size() === 0) {
                    GameUi.startCoinFlip(false);
                    GameUi.setState(33);
                  } else if (GameUi.messageQueue.size() === 0) {
                    if (GameData.isFinalRegionUnlocked()) {
                      App.startLoader(0, 0, 12288);
                    } else if (GameUi.campaignStoryStep === 0) {
                      App.dispatchCommand(2, 0);
                    } else {
                      GameUi.setState(30);
                    }
                  }
                }
                return true;
              default:
                if (GameUi.messageQueue.isEmpty()) {
                  return false;
                }
                return (GameUi.messageQueue.elementAt(0) as GameUi).messageKeyPressed(var0);
            }
          default:
            switch (var0) {
              case 2:
                GameUi.cursorDirY = -1;
                return false;
              case 3:
                GameUi.cursorDirX = -1;
                return false;
              case 4:
                GameUi.cursorDirX = 1;
                return false;
              case 5:
                GameUi.cursorDirY = 1;
                return false;
              case 6:
              case 7:
                if (GameUi.pickHoveredDepartment() && GameUi.hoveredDepartment >= 0 && GameUi.hoveredDepartment + 56 !== 71) {
                  GameUi.setCampaignMessage(Engine.getText(53));
                  GameUi.setState(35);
                  return true;
                }
            }
        }
        return false;
    }
  }
  private static drawCostItem(var0: Graphics, var1: number, var2: number, var3: number, var4_z: boolean): void {
    let var4: number = var4_z ? 1 : 0;
    var4 = Game.packedAmount(var3);
    var3 = Game.packedResource(var3) >> 16;
    let var5: number = Game.resourceIcons[var3];
    var3 = var4 > 0 ? Game.field_287[var3] : 106;
    let var6: number = var2;
    Engine.drawImage(var0, var1, var2, 104);
    Engine.drawImage(var0, var1, var2 + Engine.getFrameHeight(var3, 16481), 104);
    Engine.drawSprite(var0, var1, var6, var3, 16480);
    var6 += Engine.getFrameHeight(var3, 16480);
    Engine.drawSprite(var0, var1, var6, var3, 16481);
    var6 += Engine.getFrameHeight(var3, 16481);
    Engine.drawSprite(var0, var1, var6, var3, 16481);
    var6 += Engine.getFrameHeight(var3, 16481);
    Engine.drawSprite(var0, var1, var6, var3, 16482);
    Engine.drawNumber(var0, var1 + idiv(Engine.getFrameWidth(var3, 16481), 2), var6 + 1, var4, 33, 114);
    Engine.drawImage(var0, var1, var2, var5);
  }
  static drawIconSlot(var0: Graphics, var1: number, var2: number, var3: number, var4_z: boolean): void {
    let var4: number = var4_z ? 1 : 0;
    let var5: number = Game.packedAmount(var3);
    var3 = Game.packedResource(var3) >> 16;
    let var6: number = Game.resourceIcons[var3];
    var3 = var5 > 0 ? Game.field_287[var3] : 106;
    var4 = (var4) !== 0 ? 105 : 104;
    var5 = var2;
    Engine.drawImage(var0, var1, var2, var4);
    Engine.drawImage(var0, var1, var5, var3);
    Engine.drawImage(var0, var1, var2, var6);
  }
  static drawIconSlotWithBadge(var0: Graphics, var1: number, var2: number, var3: number, var4_z: boolean, var5: number, var6_z: boolean): void {
    let var6: number = var6_z ? 1 : 0;
    let var4: number = var4_z ? 1 : 0;
    var3 = Game.packedResource(var3) >> 16;
    var4 = Game.resourceIcons[var3];
    var3 = (var6) !== 0 ? Game.field_287[var3] : 106;
    var6 = var2;
    Engine.drawImage(var0, var1, var2, 104);
    Engine.drawImage(var0, var1, var6, var3);
    Engine.drawImage(var0, var1, var2, var4);
    Engine.drawSprite(var0, var1 + Engine.getCellWidth(var4) - idiv(Engine.getCellWidth(111), 2), var2 + idiv(Engine.getCellWidth(var4) << 1, 3) + 1, 111, var5);
  }
  private static drawCountBox(var0: Graphics, var1: number, var2: number, var3: number, var4_z: boolean, var5: number): void {
    let var4: number = var4_z ? 1 : 0;
    let var6: number = Game.packedAmount(var3);
    var3 = Game.packedResource(var3) >> 16;
    let var7: number = Game.resourceIcons[var3];
    var3 = var6 > 0 ? Game.field_287[var3] : 106;
    var4 = (var4) !== 0 ? 105 : 104;
    let var8: number = var1;
    let var9: number = var2;
    let var10: number = Engine.getFrameWidth(var3, 16478);
    for (let var11: number = 0; var11 < var5 + 1; var11++) {
      Engine.drawImage(var0, var1 + Math.imul(var10, var11), var2, var4);
    }
    Engine.drawSprite(var0, var1, var2, var3, 16477);
    var8 += Engine.getFrameWidth(var3, 16477);
    for (let var16: number = 0; var16 < var5 + 1; var16++) {
      Engine.drawSprite(var0, var8, var2, var3, 16478);
      var8 += var10;
    }
    Engine.drawSprite(var0, var8, var9, var3, 16479);
    Engine.drawImage(var0, var1, var2, var7);
    Engine.drawNumber(var0, var1 + idiv(Math.imul(var5, var10), 2) + var10 + Engine.getFrameWidth(var3, 16477), var2 + idiv(Engine.getFrameHeight(var3, 16478), 2), var6, 3, 114);
  }
  private static drawEmptyCountBox(var0: Graphics, var1: number, var2: number, var3_z: boolean, var4: number): void {
    let var3: number = var3_z ? 1 : 0;
    var3 = var1;
    let var5: number = var2;
    let var6: number = Engine.getFrameWidth(106, 16478);
    for (let var7: number = 0; var7 < var4 + 1; var7++) {
      Engine.drawImage(var0, var1 + Math.imul(var6, var7), var2, 104);
    }
    Engine.drawSprite(var0, var1, var2, 106, 16477);
    var3 += Engine.getFrameWidth(106, 16477);
    for (let var10: number = 0; var10 < var4 + 1; var10++) {
      Engine.drawSprite(var0, var3, var2, 106, 16478);
      var3 += var6;
    }
    Engine.drawSprite(var0, var3, var5, 106, 16479);
  }
  private static drawTopCountFrame(var0: Graphics, var1: number, var2: number, var3_z: boolean, var4: number, var5: number): void {
    let var3: number = var3_z ? 1 : 0;
    var5 = Game.packedResource(var5) >> 16;
    var2 = Game.field_287[var5];
    var3 = var1;
    var5 = Engine.getFrameWidth(var2, 16478);
    for (let var6: number = 0; var6 < var4 + 1; var6++) {
      Engine.drawImage(var0, var1 + Math.imul(var5, var6), 0, 104);
    }
    Engine.drawSprite(var0, var1, 0, var2, 16477);
    var3 += Engine.getFrameWidth(var2, 16477);
    for (let var12: number = 0; var12 < var4 + 1; var12++) {
      Engine.drawSprite(var0, var3, 0, var2, 16478);
      var3 += var5;
    }
    Engine.drawSprite(var0, var3, 0, var2, 16479);
  }
  private static drawCountBoxWithBadge(var0: Graphics, var1: number, var2: number, var3: number, var4_z: boolean, var5: number, var6: number, var7_z: boolean): void {
    let var7: number = var7_z ? 1 : 0;
    let var4: number = var4_z ? 1 : 0;
    var4 = Game.packedAmount(var3);
    var3 = Game.packedResource(var3) >> 16;
    var3 = Game.resourceIcons[var3];
    var7 = var1;
    let var8: number = var2;
    let var9: number = Engine.getFrameWidth(106, 16478);
    for (let var10: number = 0; var10 < var5 + 1; var10++) {
      Engine.drawImage(var0, var1 + Math.imul(var9, var10), var2, 104);
    }
    Engine.drawSprite(var0, var1, var2, 106, 16477);
    var7 += Engine.getFrameWidth(106, 16477);
    for (let var16: number = 0; var16 < var5 + 1; var16++) {
      Engine.drawSprite(var0, var7, var2, 106, 16478);
      var7 += var9;
    }
    Engine.drawSprite(var0, var7, var8, 106, 16479);
    Engine.drawImage(var0, var1, var2, var3);
    if (var6 !== (-1)) {
      Engine.drawSprite(var0, var1 + Engine.getCellWidth(var3) - idiv(Engine.getCellWidth(111), 2), var2 + idiv(Engine.getCellWidth(var3) << 1, 3) + 1, 111, var6);
    }
    Engine.drawNumber(var0, var1 + idiv(Math.imul(var5, var9), 2) + var9 + Engine.getFrameWidth(106, 16477), var2 + idiv(Engine.getFrameHeight(106, 16478), 2), var4, 3, 114);
  }
  private static drawCountBoxIconRight(var0: Graphics, var1: number, var2: number, var3: number, var4_z: boolean, var5: number): void {
    let var4: number = var4_z ? 1 : 0;
    var4 = Game.packedAmount(var3);
    var3 = Game.packedResource(var3) >> 16;
    var5 = Game.resourceIcons[var3];
    var3 = var4 > 0 ? Game.field_287[var3] : 106;
    let var6: number = var1;
    let var7: number = var2;
    let var8: number = Engine.getFrameWidth(var3, 16478);
    for (let var9: number = 0; var9 < 3; var9++) {
      Engine.drawImage(var0, var1 + Math.imul(var8, var9), var2, 104);
    }
    Engine.drawSprite(var0, var1, var2, var3, 16477);
    var6 += Engine.getFrameWidth(var3, 16477);
    for (let var15: number = 0; var15 < 3; var15++) {
      Engine.drawSprite(var0, var6, var2, var3, 16478);
      var6 += var8;
    }
    Engine.drawSprite(var0, var6, var7, var3, 16479);
    Engine.drawNumber(var0, var1 + idiv(var8 << 1, 2) + Engine.getFrameWidth(var3, 16477), var2 + idiv(Engine.getFrameHeight(var3, 16478), 2), var4, 3, 114);
    Engine.drawImage(var0, var1 + (var8 << 1), var2, var5);
  }
  private static drawPriceBox(var0: Graphics, var1: number, var2: number, var3: number, var4_z: boolean, var5: number): void {
    let var4: number = var4_z ? 1 : 0;
    var4 = Game.packedAmount(var3);
    var3 = Game.packedResource(var3) >> 16;
    var5 = Game.resourceIcons[17];
    var3 = var4 > 0 ? Game.field_287[var3] : 106;
    let var6: number = var1;
    let var7: number = var2;
    let var8: number = Engine.getFrameWidth(var3, 16478);
    for (let var9: number = 0; var9 < 3; var9++) {
      Engine.drawImage(var0, var1 + Math.imul(var8, var9), var2, 104);
    }
    Engine.drawSprite(var0, var1, var2, var3, 16477);
    var6 += Engine.getFrameWidth(var3, 16477);
    for (let var15: number = 0; var15 < 3; var15++) {
      Engine.drawSprite(var0, var6, var2, var3, 16478);
      var6 += var8;
    }
    Engine.drawSprite(var0, var6, var7, var3, 16479);
    Engine.drawNumber(var0, var1 + idiv(var8 << 1, 2) + Engine.getFrameWidth(var3, 16477), var2 + idiv(Engine.getFrameHeight(var3, 16478), 2), var4, 3, 114);
    Engine.drawImage(var0, var1 + (var8 << 1), var2, var5);
  }
  static drawProgressBar(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5_z: boolean, var6: number): void {
    let var5: number = var5_z ? 1 : 0;
    if (var4 !== 0) {
      var1++;
      var2++;
      let var7: number = Math.min(Game.packedAmount(var3), var4);
      var3 = Game.packedResource(var3) >> 16;
      var3 = Game.field_288[var3];
      var5 = (var5) !== 0 ? 95 : 94;
      Engine.drawHorizontalBar(var0, var1, var2, var6, var5);
      var6 -= 4;
      if ((var4 = idiv(Math.imul(var7, var6), var4)) === var6) {
        GameUi.drawBarFill(var0, var1, var2, var6, var3);
      } else {
        if (var4 > 0) {
          GameUi.drawBarFill(var0, var1, var2, var4, var3);
          if (var6 - var4 - 2 > 0) {
            GameUi.drawBarFill(var0, var1 + var4 + 2, var2, var6 - var4 - 2, 96);
            return;
          }
        } else {
          GameUi.drawBarFill(var0, var1, var2, var6, 96);
        }
      }
    }
  }
  static drawSegmentedBar(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5_z: boolean, var6: number): void {
    let var5: number = var5_z ? 1 : 0;
    var1++;
    var2++;
    let var7: number = Math.min(Game.packedAmount(var3), var4);
    var3 = Game.packedResource(var3) >> 16;
    var3 = Game.field_288[var3];
    var5 = (var5) !== 0 ? 95 : 94;
    Engine.drawHorizontalBar(var0, var1, var2, var6, var5);
    var6 -= 4;
    if (var7 === var4) {
      GameUi.drawBarFill(var0, var1, var2, var6, var3);
      for (let var16: number = 1; var16 < var7; var16++) {
        Engine.drawSprite(var0, var1 + Math.imul(var16, idiv(var6, var7)), var2, var3, 16476);
      }
    } else if (var7 > 0) {
      var5 = Math.imul(idiv(idiv(Math.imul(var7, var6), var4), var7), var7);
      GameUi.drawBarFill(var0, var1, var2, var5, var3);
      for (let var8: number = 1; var8 < var7; var8++) {
        Engine.drawSprite(var0, var1 + Math.imul(var8, idiv(var5, var7)), var2, var3, 16476);
      }
      if (var6 - var5 - 2 > 0) {
        GameUi.drawBarFill(var0, var1 + var5 + 2, var2, var6 - var5 - 2, 96);
      }
      for (let var18: number = 1; var18 < var4 - var7; var18++) {
        Engine.drawSprite(var0, var1 + var5 + Math.imul(var18, idiv(var6, var4)), var2, 96, 16476);
      }
    } else {
      GameUi.drawBarFill(var0, var1, var2, var6, 96);
      for (let var14: number = 1; var14 < var4; var14++) {
        Engine.drawSprite(var0, var1 + Math.imul(var14, idiv(var6, var4)), var2, 96, 16476);
      }
    }
  }
  private static drawTradeBar(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5: number, var6: number, var7_z: boolean, var8: number): void {
    let var7: number = var7_z ? 1 : 0;
    var1++;
    var2++;
    let var9: number = Math.min(Game.packedAmount(var3), var6);
    var3 = Game.packedResource(var3) >> 16;
    var3 = Game.field_288[var3];
    var7 = (var7) !== 0 ? 95 : 94;
    Engine.drawHorizontalBar(var0, var1, var2, var8, var7);
    var8 -= 4;
    var7 = idiv(Math.imul(var9, var8), var6);
    var4 = Math.max(0, var4);
    var5 = Math.min(var6, var5);
    var4 = idiv(Math.imul(var4, var8), var6);
    var5 = idiv(Math.imul(var5, var8), var6);
    if (var7 === var8) {
      GameUi.drawBarFill(var0, var1, var2, var8, var3);
      if (var4 < var7 && var4 !== 0) {
        Engine.drawSprite(var0, var1 + var4, var2, var3, 16476);
        return;
      }
    } else if (var7 > 0) {
      GameUi.drawBarFill(var0, var1, var2, var7, var3);
      if (var8 - var7 - 2 > 0) {
        GameUi.drawBarFill(var0, var1 + var7 + 2, var2, var8 - var7 - 2, 96);
      }
      if (var4 < var7 && var4 !== 0) {
        Engine.drawSprite(var0, var1 + var4, var2, var3, 16476);
      }
      if (var5 > var7 && var5 !== var8) {
        Engine.drawSprite(var0, var1 + var5, var2, 96, 16476);
        return;
      }
    } else {
      GameUi.drawBarFill(var0, var1, var2, var8, 96);
      if (var5 > var7 && var5 !== var8) {
        Engine.drawSprite(var0, var1 + var5, var2, 96, 16476);
      }
    }
  }
  private static drawScrollBar(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5: number): void {
    if (var5 !== 0) {
      let var6: number = Engine.getFrameHeight(163, 0);
      let var7: number = Engine.getFrameHeight(163, 16);
      let var8: number = Engine.getFrameHeight(163, 32);
      let var9: number = Engine.getFrameHeight(163, 48);
      let var10: number = var2 + var3 - var7 - var8;
      var6 = var2 + var6;
      Engine.drawSprite(var0, var1, var2, 163, 0);
      do {
        Engine.drawSprite(var0, var1, var6, 163, 16);
      } while ((var6 += var7) < var10);
      Engine.drawSprite(var0, var1, var10, 163, 16);
      Engine.drawSprite(var0, var1, var2 + var3 - var8, 163, 32);
      Engine.drawSprite(var0, var1, var2 + idiv(Math.imul(var3 - var9, var4), var5), 163, 48);
    }
  }
  private static drawRowArrows(var0: Graphics, var1: number, var2: number, var3: number): void {
    let var4: number = idiv(App.tickTime, 100) % 5;
    Engine.drawSprite(var0, var1 - var4, var2, 165, 16546);
    Engine.drawSprite(var0, var1 + var4 + var3, var2, 165, 16547);
  }
  private static drawActionMenuCenter(var0: Graphics, var1: number, var2: number): void {
    Engine.drawSprite(var0, var1, var2, 115, 16501);
    Engine.drawSprite(var0, var1, var2 + Engine.getFrameHeight(115, 16501), 115, 16502);
  }
  private static drawLevelStars(var0: Graphics, var1: number, var2: number, var3: number, var4: number): void {
    for (let var5: number = 0; var5 <= var4; var5++) {
      Engine.drawSprite(var0, var1 - Math.imul(var4, 11) + Math.imul(var5, 11), var2 + (-4), 164, 0);
      if (var3 >= var5) {
        Engine.drawSprite(var0, var1 - Math.imul(var4, 11) + Math.imul(var5, 11), var2 + (-4), 164, 1);
      }
    }
  }
  private static drawPanelTitle(var0: Graphics, var1: number, var2: number, var3: number, var4: number): void {
    if (var4 !== 157 && var4 !== 158) {
      Engine.drawImage(var0, var1 + idiv(var3, 2), var2, 159);
      Engine.drawSprite(var0, var1 + idiv(var3, 2), var2, 160, var4);
    } else {
      Engine.drawImage(var0, var1 + idiv(var3, 2), var2, var4);
    }
  }
  private static drawPanelTop(var0: Graphics, var1: number, var2: number, var3: number): number {
    if (var0 !== null) {
      GameUi.drawPanelStrip(var0, var1, var2, var3, 115, 16489, 16490, 16491);
    }
    return Engine.getFrameHeight(115, 16490);
  }
  private static drawPanelRow(var0: Graphics, var1: number, var2: number, var3: number): number {
    if (var0 !== null) {
      GameUi.drawPanelStrip(var0, var1, var2, var3, 115, 16492, 16493, 16494);
    }
    return Engine.getFrameHeight(115, 16493);
  }
  private static drawPanelDoubleRow(var0: Graphics, var1: number, var2: number, var3: number): number {
    let var4: number = Engine.getFrameHeight(115, 16504);
    GameUi.drawPanelStrip(var0, var1, var2, var3, 115, 16503, 16504, 16505);
    GameUi.drawPanelStrip(var0, var1, var2 + var4, var3, 115, 16503, 16504, 16505);
    return var4 << 1;
  }
  private static drawPanelBottom(var0: Graphics, var1: number, var2: number, var3: number): number {
    GameUi.drawPanelStrip(var0, var1, var2, var3, 115, 16495, 16496, 16497);
    return Engine.getFrameHeight(115, 16496);
  }
  private static drawPanelDivider(var0: Graphics, var1: number, var2: number, var3: number): number {
    if (var0 !== null) {
      GameUi.drawPanelStrip(var0, var1, var2, var3, 115, 16498, 16499, 16500);
    }
    return Engine.getFrameHeight(115, 16499);
  }
  private static drawCursorCountBox(var0: Graphics, var1: number, var2: number, var3: number, var4: number): void {
    var1 -= idiv(18 + Math.imul(var4, 10), 2);
    var2 -= 18;
    GameUi.drawCountBox(var0, var1, var2, var3, false, var4);
  }
  private static drawCursorIcon(var0: Graphics, var1: number, var2: number, var3: number): void {
    var1 -= 9;
    var2 -= 18;
    GameUi.drawIconSlot(var0, var1, var2, var3, false);
  }
  private static drawCursorCountTwoIcons(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5: number): void {
    var1 -= 14;
    var2 -= 36;
    GameUi.drawCountBox(var0, var1, var2, var3, false, 1);
    var1 -= 4;
    var2 += 18;
    GameUi.drawIconSlot(var0, var1, var2, var4, false);
    GameUi.drawIconSlot(var0, var1 + 18, var2, var5, false);
  }
  private static drawCursorCountIcon(var0: Graphics, var1: number, var2: number, var3: number, var4: number): void {
    var1 -= 14;
    var2 -= 36;
    GameUi.drawCountBox(var0, var1, var2, var3, false, 1);
    var1 += 5;
    var2 += 18;
    GameUi.drawIconSlot(var0, var1, var2, var4, false);
  }
  private static drawProductionChain(var0: Graphics, var1: number, var2: number, var3: Int32Array): void {
    if (var3 !== null) {
      let var4: boolean = true;
      if (var1 < 0) {
        var4 = false;
        var1 += 5;
      }
      for (let var5: number = 0; var5 < var3.length; var5++) {
        if (Game.packedFlags(var3[var5]) !== 0) {
          return;
        }
        if (var5 > 0) {
          if (var4) {
            var1++;
          }
          Engine.drawSprite(var0, var1, var2, 152, var5 === 1 ? 16524 : 16525);
          var1 += Engine.getCellWidth(152);
          if (var4) {
            var1++;
          }
        }
        GameUi.drawCostItem(var0, var1, var2, var3[var5], false);
        var1 += 18;
      }
    }
  }
  private static drawResourceList(var0: Graphics, var1: number, var2: number, var3: Int32Array): void {
    if (var3 !== null) {
      let var4: number = 0;
      let var5: boolean = true;
      if (var1 <= 0) {
        var5 = false;
        var1 += 5;
      }
      for (let var6: number = 0; var6 < var3.length; var6++) {
        if (var3[var6] !== (-1)) {
          if (var4 > 0) {
            if (var5) {
              var1++;
            }
            Engine.drawSprite(var0, var1, var2, 152, 16525);
            var1 += Engine.getCellWidth(152);
            if (var5) {
              var1++;
            }
          }
          GameUi.drawCostItem(var0, var1, var2, var3[var6], false);
          var1 += 18;
          var4++;
        }
      }
    }
  }
  private static measureResourceList(var0: Int32Array): number {
    let var1: number = 0;
    let var2: number = 0;
    for (let var3: number = 0; var3 < var0.length; var3++) {
      if (var0[var3] !== (-1) && Game.packedFlags(var0[var3]) !== 0) {
        return var1;
      }
      if (var0[var3] !== (-1)) {
        if (var2 > 0) {
          var1 += 2 + Engine.getCellWidth(152);
        }
        var1 += 18;
        var2++;
      }
    }
    return var1;
  }
  private static drawBuildingPreview(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5: boolean, var6: boolean): void {
    let var7: number = 78;
    let var8: number = 2;
    if (var3 === 0 || var3 === 1) {
      var7 = (var7 + 32) << 24 >> 24;
      var8++;
    }
    if (var3 === 11 && idiv(Math.imul(Engine.screenWidth, 10), 64) > 25) {
      var7 = (var7 + 64) << 24 >> 24;
      var8 += 2;
    }
    let var9: number = var1 - idiv(var7, 2);
    let var10: number = 0;
    var10 = (var10 = var2 - (var8 << 4) - 10) + GameUi.drawPanelTop(var0, var9, var10, var7);
    for (let var11: number = 0; var11 < var8; var11++) {
      let var14: number = var7;
      let var13: number = var10;
      let var12: number = var9;
      let var16: any = null;
      GameUi.drawPanelStrip(var0, var12, var13, var14, 115, 16509, 16510, 16511);
      var10 += Engine.getFrameHeight(115, 16510);
    }
    label55: {
      GameUi.drawPanelBottom(var0, var9, var10, var7);
      switch (var3) {
        case 0:
          Engine.drawSprite(var0, var1 - 16, var2 - 16, 16, 0);
          Engine.drawSprite(var0, var1 - 16 + 32, var2, 16, 0);
          if (var4 < 2) {
            Engine.drawSprite(var0, var1 - 16, var2 - 16, 45, var4 + 16443);
            Engine.drawSprite(var0, var1 - 16 + 32, var2, 45, var4 + 16445);
          } else {
            Engine.drawSprite(var0, var1 - 16, var2 - 16, 46, 16447);
            Engine.drawSprite(var0, var1 - 16 + 32, var2, 46, 16448);
          }
          break;
        case 1:
          Engine.drawSprite(var0, var1 + 16, var2 - 16, 16, 0);
          Engine.drawSprite(var0, var1 + 16 - 32, var2, 16, 0);
          Engine.drawSprite(var0, var1 + 16, var2 - 16, 47, var4 + 16449);
          Engine.drawSprite(var0, var1 + 16 - 32, var2, 47, var4 + 16452);
          break;
        case 2:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 48, var4 + 16455);
          break;
        case 3:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 40, var4 + 16430);
          break;
        case 4:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 30, 0);
          break;
        case 5:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 31, var4 + 16406);
          break;
        case 6:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 35, var4 + 16415);
          break;
        case 7:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 42, var4 + 16436);
          break;
        case 8:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 36, var4 + 16418);
          break;
        case 9:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 37, var4 + 16421);
          break;
        case 10:
          Engine.drawImage(var0, var1, var2, 25);
          Engine.drawSprite(var0, var1, var2, 41, var4 + 16433);
          break;
        case 11:
          if (idiv(Math.imul(Engine.screenWidth, 10), 64) > 25) {
            Engine.drawSprite(var0, var1, var2 - 32, 43, 0);
            Engine.drawSprite(var0, var1 - 32, var2 - 16, 43, 0);
            Engine.drawSprite(var0, var1 + 32, var2 - 16, 43, 0);
            Engine.drawSprite(var0, var1, var2, 43, 0);
            Engine.drawSprite(var0, var1, var2 - 32, 44, 16439);
            Engine.drawSprite(var0, var1 - 32, var2 - 16, 44, 16440);
            Engine.drawSprite(var0, var1 + 32, var2 - 16, 44, 16441);
            Engine.drawSprite(var0, var1, var2, 44, 16442);
          } else {
            Engine.drawSprite(var0, var1, var2, 43, 0);
          }
          GameUi.drawLevelStars(var0, var1 + idiv(var7, 2) - 6, var2 - (var8 << 4) - 10, var4, GameData.getMaxLevel(var3));
          break label55;
        case 12:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 49, 16458);
          break;
        case 13:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 38, var4 + 16424);
          break;
        case 14:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 39, var4 + 16427);
          break;
        case 96:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 34, 0);
          break label55;
        case 112:
          Engine.drawSprite(var0, var1, var2, 16, 0);
          Engine.drawSprite(var0, var1, var2, 32, 16412);
        default:
          break label55;
      }
      GameUi.drawLevelStars(var0, var1 + idiv(var7, 2) - 6, var2 - (var8 << 4) - 10, var4, GameData.getMaxLevel(var3));
    }
    if (var5) {
      let var17: number = idiv(App.tickTime, 100) % 5;
      Engine.drawSprite(var0, var1 - idiv(var7, 2) - var17, var2 - idiv(var8 << 4, 2), 165, 16550);
      Engine.drawSprite(var0, var1 + idiv(var7, 2) + var17, var2 - idiv(var8 << 4, 2), 165, 16551);
    }
    if (var6) {
      let var18: number = idiv(App.tickTime, 100) % 5;
      Engine.drawSprite(var0, var1, var2 - (var8 << 4) - var18, 165, 16552);
      Engine.drawSprite(var0, var1, var2 + var18, 165, 16539);
    }
    GameUi.panelX = var1 - idiv(var7, 2);
    GameUi.panelY = var2 - (var8 << 4);
    GameUi.panelWidth = var7;
    GameUi.panelHeight = var8 << 4;
  }
  private static drawPanelStrip(var0: Graphics, var1: number, var2: number, var3: number, var4: number, var5: number, var6: number, var7: number): void {
    var4 = Engine.getFrameWidth(115, var5);
    let var8: number = Engine.getFrameWidth(115, var6);
    let var9: number = Engine.getFrameWidth(115, var7);
    let var10: number = var1 + var3 - var8 - var9;
    var4 = var1 + var4;
    Engine.drawSprite(var0, var1, var2, 115, var5);
    do {
      Engine.drawSprite(var0, var4, var2, 115, var6);
    } while ((var4 += var8) < var10);
    Engine.drawSprite(var0, var10, var2, 115, var6);
    Engine.drawSprite(var0, var1 + var3 - var9, var2, 115, var7);
  }
  private static drawBarFill(var0: Graphics, var1: number, var2: number, var3: number, var4: number): void {
    let var5: number = Engine.getFrameWidth(var4, 16472);
    let var6: number = Engine.getFrameWidth(var4, 16473);
    let var7: number = var1 + var3 - var6;
    let var8: number = var1;
    if (var3 >= var5) {
      let var9: number = var1 + var3 - var5;
      do {
        Engine.drawSprite(var0, var8, var2, var4, 16472);
      } while ((var8 += var5) < var9);
      Engine.drawSprite(var0, var9, var2, var4, 16472);
    } else {
      if (var3 < var6) {
        let var12: number = Engine.getFrameWidth(var4, 16474);
        var1 = var1 + var3 - var12;
        do {
          Engine.drawSprite(var0, var8, var2, var4, 16474);
        } while ((var8 += var12) < var1);
        Engine.drawSprite(var0, var1, var2, var4, 16474);
        return;
      }
      let var11: number = var1 + var3 - var6;
      do {
        Engine.drawSprite(var0, var8, var2, var4, 16473);
      } while ((var8 += var6) < var11);
      Engine.drawSprite(var0, var11, var2, var4, 16473);
    }
    Engine.drawSprite(var0, var1, var2, var4, 16471);
    Engine.drawSprite(var0, var7, var2, var4, 16475);
  }
  setText(var1: string, var2: number, var3: number, var4: number, var5: number, var6: number): void {
    if (this.textBox === null) {
      var3 = Engine.screenWidth;
      this.textBox = new TextBox().$init0(var3 - 26 - Math.imul(2, Engine.getCellWidth(151)) - 2, GameUi.messageBoxHeight, 0);
    }
    this.textBox.addText(var1, Int32Array.of(var4, -1, -1, var2, 0, var5, var6));
  }
  setTextWithSubstitutions(var1: string, var2: Int32Array, var3: Int32Array, var4: Hashtable): void {
    if (this.textBox === null) {
      let var5: number = Engine.screenWidth;
      this.textBox = new TextBox().$init0(var5 - 26 - Math.imul(2, Engine.getCellWidth(151)) - 2, GameUi.messageBoxHeight, 0);
    }
    let var13: Hashtable = var4;
    let var12: Int32Array = var3;
    var3 = var2;
    let var9: string = var1;
    let var8: TextBox = this.textBox;
    let var10: string[] = Engine.splitPlaceholders(var9);
    for (let var6: number = 0; var6 < var10.length; var6++) {
      let var7: string = Engine.formatText(var10[var6], var13);
      if (var10[var6] === var7) {
        var8.addText(var10[var6], var3);
      } else {
        var8.addText(var7, var12);
      }
    }
  }
  setResearchUnlockText(): void {
    if (this.textBox === null) {
      this.textBox = new TextBox().$init0(Engine.screenWidth - 26 - Math.imul(2, Engine.getCellWidth(151)) - 2, GameUi.messageBoxHeight, 0);
    }
    for (let var1: number = 0; var1 < GameData.requiredTechLevels.length; var1++) {
      for (let var2: number = 0; var2 < GameData.requiredTechLevels[var1].length; var2++) {
        if (GameData.requiredTechLevels[var1][var2] === Game.researchLevel) {
          this.textBox.addText(Building.displayName(var1, var2), Int32Array.of(1, -1, -1, 2, 0, Engine.getColor(28), Engine.getColor(28)));
        }
      }
    }
  }
  setPanFrom(var1: MapEntity): void {
    if (var1 !== null) {
      this.panFromX = (var1.getTileX() << 5) + (var1.getTileY() << 5) - idiv(Engine.screenWidth, 2);
      this.panFromY = (var1.getTileY() << 4) - (var1.getTileX() << 4) - idiv(Engine.screenHeight, 2);
    }
  }
  setPanTo(var1: MapEntity): void {
    if (var1 !== null) {
      this.panToX = (var1.getTileX() << 5) + (var1.getTileY() << 5) - idiv(Engine.screenWidth, 2);
      this.panToY = (var1.getTileY() << 4) - (var1.getTileX() << 4) - idiv(Engine.screenHeight, 2);
    }
  }
  setPanDuration(var1: number): void {
    this.panDuration = var1;
  }
  setPortrait(var1: number): void {
    this.portraitFrame = var1;
  }
  private drawMessage(var1: Graphics): void {
    if (this.textBox !== null) {
      let var2: number = Engine.screenHeight - this.textBox.height - 20;
      Engine.drawPanel(var1, idiv(Engine.screenWidth, 2) - idiv(this.textBox.width, 2) - 13, var2, this.textBox.width + 26, this.textBox.height + 20, 113);
      let var3: number = Engine.screenHeight - 10 - this.textBox.height;
      if (this.textBox.contentHeight > this.textBox.height) {
        GameUi.drawScrollBar(var1, idiv(Engine.screenWidth, 2) + idiv(this.textBox.width, 2) + 10, var3, this.textBox.height, this.textBox.scrollY, this.textBox.contentHeight - this.textBox.height);
      }
      switch (this.portraitFrame as number) {
        case 16512:
        case 16513:
          Engine.drawSprite(var1, idiv(Engine.screenWidth, 2) - idiv(this.textBox.width, 3), var2, 148, this.portraitFrame);
          break;
        case 16514:
        case 16515:
          Engine.drawSprite(var1, idiv(Engine.screenWidth, 2) + idiv(this.textBox.width, 3), var2, 148, this.portraitFrame);
      }
      this.textBox.draw(var1, idiv(Engine.screenWidth, 2), var3, 17);
    }
  }
  private messageKeyPressed(var1: number): boolean {
    switch (var1) {
      case 2:
        if (this.textBox !== null) {
          this.textBox.setScrollSpeed(0, -GameUi.scrollStep);
        }
        return false;
      case 3:
      case 4:
      default:
        return false;
      case 5:
        if (this.textBox !== null) {
          this.textBox.setScrollSpeed(0, GameUi.scrollStep);
        }
        return false;
      case 6:
      case 7:
      case 8:
        if (App.tickTime - this.shownTime > this.panDuration) {
          GameUi.showNextMessage();
        }
        return true;
    }
  }
  private messageKeyReleased(): boolean {
    if (this.textBox !== null) {
      this.textBox.setScrollSpeed(0, 0);
    }
    return true;
  }
}
