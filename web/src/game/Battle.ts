// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { DataInputStream, DataOutputStream } from "../runtime/io";
import { Vector, bor, idiv } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { Game } from "./Game";
import { Animation } from "./Animation";
import { Townsman } from "./Townsman";
import { Engine } from "./Engine";
import { Ambience } from "./Ambience";
import { GameData } from "./GameData";
import { App } from "./App";
import { Building } from "./Building";
import { GameUi } from "./GameUi";

export class Battle {
  building: Building = null;
  private iconAnimation: Animation = new Animation().$init0((0) << 24 >> 24);
  private soldiersPresent: Vector = new Vector();
  private soldiersMarching: Vector = new Vector();
  private propagandistsPresent: Vector = new Vector();
  private propagandistsMarching: Vector = new Vector();
  enemiesPresent: Vector = new Vector();
  enemiesMarching: Vector = new Vector();
  enemiesDeployed: number = 0;
  private nextRoundTime: number = 0;
  private phase: number = 0;
  private static activeBattles: Vector = new Vector(8, 4);
  constructor(var1: Building) {
    this.building = var1;
    var1.battle = this;
    if (GameUi.selectedBuilding === var1 && GameUi.state !== 1 && GameUi.state !== 0) {
      var1.unregister();
      GameUi.showBuildingPanel(var1);
    } else {
      var1.unregister();
    }
    this.nextRoundTime = Game.gameTime + 100 + 100;
    Battle.activeBattles.addElement(this);
    if (var1.owner === 0) {
      switch (var1.buildingType as number) {
        case 13:
          while (Townsman.propagandistsWithoutCoffeeHouse.size() > 0 && this.propagandistCount() < 5) {
            let var5: Townsman = (Townsman.propagandistsWithoutCoffeeHouse.lastElement() as Townsman);
            Townsman.propagandistsWithoutCoffeeHouse.removeElement(var5);
            this.dispatchUnit(var5, Townsman.idlePropagandists, this.propagandistsMarching);
          }
          break;
        case 14:
          while (Townsman.soldiersWithoutCamp.size() > 0 && this.soldierCount() < 5) {
            let var4: Townsman = (Townsman.soldiersWithoutCamp.lastElement() as Townsman);
            Townsman.soldiersWithoutCamp.removeElement(var4);
            this.dispatchUnit(var4, Townsman.idleSoldiers, this.soldiersMarching);
          }
      }
    } else {
      if (var1.buildingType === 14) {
        for (let var2: number = 0; var2 < Townsman.idleEnemies.size(); var2++) {
          let var3: Townsman = null;
          if ((var3 = Townsman.idleEnemies.elementAt(var2) as Townsman).home === var1) {
            this.dispatchUnit(var3, Townsman.idleEnemies, this.enemiesMarching);
          }
        }
      }
    }
  }
  private static rollWins(var0: number, var1: number): boolean {
    return Engine.randomInt(var0) >= Engine.randomInt(var1);
  }
  drawIcon(var1: Graphics, var2: number, var3: number): void {
    let var10000: boolean = Math.imul(this.enemiesPresent.size(), this.soldiersPresent.size() + this.propagandistsPresent.size()) > 0;
    let var4: number = bor(bor(var10000, this.enemiesPresent.size() > 0 && this.building.owner === 0), this.soldiersPresent.size() + this.propagandistsPresent.size() > 0 && this.building.owner === 1) ? 1 : 0;
    let var5: number = this.enemiesPresent.size() + this.soldiersPresent.size();
    if (var4 === 0) {
      var4 = idiv(Math.imul(10, Engine.sin(idiv(App.tickTime, 2)) - 65536), 65536);
      Engine.drawImage(var1, var2, var3 + var4, 154);
    } else if (var5 > 0) {
      Engine.drawSprite(var1, var2, var3, 155, this.iconAnimation.frame);
    } else {
      Engine.drawSprite(var1, var2, var3, 156, this.iconAnimation.frame);
    }
  }
  soldierCount(): number {
    return this.soldiersPresent.size() + this.soldiersMarching.size();
  }
  propagandistCount(): number {
    return this.propagandistsPresent.size() + this.propagandistsMarching.size();
  }
  enemyCount(): number {
    return this.enemiesPresent.size() + this.enemiesMarching.size();
  }
  private playerUnitCount(): number {
    return this.soldierCount() + this.propagandistCount();
  }
  static updateAll(): void {
    for (let var0: number = 0; var0 < Battle.activeBattles.size(); var0++) {
      let var1: Battle = null;
      if ((var1 = Battle.activeBattles.elementAt(var0) as Battle).nextRoundTime <= Game.gameTime) {
        switch (var1.phase as number) {
          case 0:
            var1.nextRoundTime = Game.gameTime + 10000;
            var1.phase = 1;
            break;
          case 1:
            var1.enemiesPresent.size();
            var1.soldiersPresent.size();
            var1.propagandistsPresent.size();
            let var5: boolean = false;
            var1.enemiesPresent.size();
            var1.soldiersPresent.size();
            if (var1.enemiesPresent.size() > 0 && (var1.soldiersPresent.size() > 0 || var1.propagandistsPresent.size() > 0)) {
              if (var1.soldiersPresent.size() > 0) {
                let var6: Townsman = (var1.soldiersPresent.firstElement() as Townsman);
                let var3: Townsman = (var1.enemiesPresent.firstElement() as Townsman);
                let var7: Townsman = null;
                if (Battle.rollWins(Math.imul(var6.combatStrength(), var1.soldiersPresent.size()) + Math.imul(var1.propagandistsPresent.size(), 10), Math.imul(var3.combatStrength(), var1.enemiesPresent.size()))) {
                  var7 = var1.enemiesPresent.firstElement() as Townsman;
                  var1.enemiesPresent.removeElement(var7);
                  Game.changeHappiness(1);
                } else {
                  var7 = var1.soldiersPresent.firstElement() as Townsman;
                  var1.soldiersPresent.removeElement(var7);
                  Game.changeHappiness(-2);
                }
                var7.remove();
                Ambience.queueSound(App.tickTime, Engine.randomRange(25, 27));
                var1.nextRoundTime = Game.gameTime + 10000;
                var1.phase = 1;
              } else if (var1.propagandistsPresent.size() > 0) {
                let var8: Townsman = (var1.propagandistsPresent.firstElement() as Townsman);
                let var10: Townsman = (var1.enemiesPresent.firstElement() as Townsman);
                let var9: Townsman = null;
                if (Battle.rollWins(Math.imul(var8.combatStrength(), var1.propagandistsPresent.size()), Math.imul(var10.combatStrength(), var1.enemiesPresent.size()))) {
                  var9 = var1.enemiesPresent.firstElement() as Townsman;
                  var1.enemiesPresent.removeElement(var9);
                  Game.changeHappiness(5);
                } else {
                  var9 = var1.propagandistsPresent.firstElement() as Townsman;
                  var1.propagandistsPresent.removeElement(var9);
                  Game.changeHappiness(2);
                }
                var9.remove();
                Ambience.queueSound(App.tickTime, Engine.randomRange(25, 27));
                var1.nextRoundTime = Game.gameTime + 10000;
                var1.phase = 1;
              }
            } else if (var1.soldiersMarching.size() + var1.propagandistsMarching.size() + var1.enemiesMarching.size() > 0) {
              var1.nextRoundTime = Game.gameTime + 10000;
              var1.phase = 1;
            } else {
              var1.nextRoundTime = Game.gameTime + 2000;
              var1.phase = 2;
            }
            break;
          case 2:
            if (var1.enemyCount() > 0) {
              if (var1.playerUnitCount() > 0) {
                var1.nextRoundTime = Game.gameTime + 10000;
                var1.phase = 1;
              } else {
                Ambience.queueSound(App.tickTime, 9);
                var1.building.battle = null;
                let var2: number = var1.building.owner;
                var1.building.setOwner(1);
                if (GameUi.isPanelOpenFor(var1.building)) {
                  GameUi.selectedBuilding = var1.building;
                  GameUi.showBuildingPanel(var1.building);
                }
                Battle.activeBattles.removeElement(var1);
                var1.iconAnimation.dispose();
                var1.releaseAllUnits();
                Game.lostFights++;
                if (var2 !== var1.building.owner) {
                  Engine.maybeRazeCaptured(var1.building);
                  GameData.showDefeatMessage(var1.building, false);
                } else {
                  GameData.showDefeatMessage(var1.building, true);
                }
              }
            } else if (var1.playerUnitCount() > 0) {
              Ambience.queueSound(App.tickTime, 28);
              let var4: number = var1.building.owner;
              var1.building.battle = null;
              var1.building.setOwner(0);
              if (GameUi.isPanelOpenFor(var1.building)) {
                GameUi.selectedBuilding = var1.building;
                GameUi.showBuildingPanel(var1.building);
              }
              Battle.activeBattles.removeElement(var1);
              var1.iconAnimation.dispose();
              var1.releaseAllUnits();
              Game.conqueredBuildings++;
              if (var4 !== var1.building.owner) {
                GameData.showVictoryMessage(var1.building, true);
              } else {
                GameData.showVictoryMessage(var1.building, false);
              }
            } else {
              var1.building.battle = null;
              var1.building.setOwner(var1.building.owner);
              if (GameUi.isPanelOpenFor(var1.building)) {
                GameUi.selectedBuilding = var1.building;
                GameUi.showBuildingPanel(var1.building);
              }
              Battle.activeBattles.removeElement(var1);
              var1.iconAnimation.dispose();
              var1.releaseAllUnits();
            }
        }
      }
    }
  }
  static clearAll(): void {
    Battle.activeBattles.removeAllElements();
  }
  private releaseAllUnits(): void {
    while (this.propagandistCount() > 0) {
      this.withdrawPropagandist(true);
    }
    while (this.soldierCount() > 0) {
      this.withdrawSoldier(true);
    }
    while (this.enemyCount() > 0) {
      this.withdrawEnemy();
    }
  }
  sendSoldier(): void {
    if (this.soldierCount() < 5) {
      if (this.dispatchFromPool(Townsman.idleSoldiers, this.soldiersMarching)) {
        Engine.balanceAiAttackers(this);
      }
    }
  }
  withdrawSoldier(var1: boolean): void {
    if (this.withdrawUnit(this.soldiersPresent, this.soldiersMarching, Townsman.idleSoldiers) && !var1) {
      Engine.balanceAiAttackers(this);
    }
  }
  sendPropagandist(): void {
    if (this.propagandistCount() < 5) {
      if (this.dispatchFromPool(Townsman.idlePropagandists, this.propagandistsMarching)) {
        Engine.balanceAiAttackers(this);
      }
    }
  }
  withdrawPropagandist(var1: boolean): void {
    if (this.withdrawUnit(this.propagandistsPresent, this.propagandistsMarching, Townsman.idlePropagandists) && !var1) {
      Engine.balanceAiAttackers(this);
    }
  }
  sendEnemy(): void {
    if (this.enemyCount() < 5) {
      this.enemiesDeployed++;
      this.dispatchFromPool(Townsman.idleEnemies, this.enemiesMarching);
    }
  }
  withdrawEnemy(): void {
    if (this.enemyCount() > 0) {
      this.enemiesDeployed--;
    }
    this.withdrawUnit(this.enemiesPresent, this.enemiesMarching, Townsman.idleEnemies);
  }
  onUnitArrived(var1: Townsman): void {
    GameData.method_552(var1);
    if (this.soldiersMarching.removeElement(var1)) {
      this.soldiersPresent.addElement(var1);
    } else if (this.propagandistsMarching.removeElement(var1)) {
      this.propagandistsPresent.addElement(var1);
    } else if (this.enemiesMarching.removeElement(var1)) {
      this.enemiesPresent.addElement(var1);
    }
    let var2: number = this.enemiesPresent.size() + this.soldiersPresent.size() + this.propagandistsPresent.size();
    if (this.enemiesPresent.size() + this.soldiersPresent.size() > 0) {
      this.iconAnimation.play(Animation.battleFightFrames);
    } else {
      if (var2 > 0) {
        this.iconAnimation.play(Animation.battlePropagandaFrames);
      }
    }
  }
  private dispatchFromPool(var1: Vector, var2: Vector): boolean {
    if (var1.size() > 0) {
      let var3: Townsman = null;
      (var3 = var1.firstElement() as Townsman).workplace = this.building;
      var3.marchTo(this.building);
      var2.addElement(var3);
      var1.removeElementAt(0);
      return true;
    } else {
      return false;
    }
  }
  private dispatchUnit(var1: Townsman, var2: Vector, var3: Vector): void {
    var2.removeElement(var1);
    var1.workplace = this.building;
    var1.marchTo(this.building);
    var3.addElement(var1);
  }
  private withdrawUnit(var1: Vector, var2: Vector, var3: Vector): boolean {
    let var4: Townsman = null;
    if (var2.size() > 0) {
      var4 = var2.firstElement() as Townsman;
      var2.removeElementAt(0);
    } else {
      if (var1.size() <= 0) {
        return false;
      }
      var4 = var1.firstElement() as Townsman;
      var1.removeElementAt(0);
    }
    if (var4.kind === 4) {
      this.enemiesDeployed--;
    }
    if (this.enemyCount() === 0 || this.propagandistCount() + this.soldierCount() === 0) {
      this.nextRoundTime = Game.gameTime;
    }
    var4.setWorkplace(null);
    var3.addElement(var4);
    var4.setState(0);
    var4.waitTicks = Engine.randomRange(2, 15);
    return true;
  }
  static saveAll(var0: DataOutputStream): void {
    var0.writeInt(Battle.activeBattles.size());
    for (let var1: number = 0; var1 < Battle.activeBattles.size(); var1++) {
      let var2: Battle = (Battle.activeBattles.elementAt(var1) as Battle);
      var0.writeInt(Building.all.indexOf(var2.building));
      var0.writeInt(var2.propagandistCount());
      var0.writeInt(var2.soldierCount());
      var0.writeInt(var2.enemyCount());
    }
  }
  static loadAll(var0: DataInputStream): void {
    let var1: number = var0.readInt();
    for (let var2: number = 0; var2 < var1; var2++) {
      let var3: Battle = new Battle(Building.all.elementAt(var0.readInt()) as Building);
      let var4: number = var0.readInt();
      let var5: number = var0.readInt();
      let var6: number = var0.readInt();
      for (let var7: number = 0; var7 < var4; var7++) {
        var3.sendPropagandist();
      }
      for (let var8: number = 0; var8 < var5; var8++) {
        var3.sendSoldier();
      }
      for (let var9: number = 0; var9 < var6; var9++) {
        var3.sendEnemy();
      }
    }
  }
}
