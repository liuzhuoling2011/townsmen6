// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { idiv, printStackTrace } from "../runtime/java";
import { Manager, Player, PlayerListener, VolumeControl } from "../runtime/midp";
import { Engine } from "./Engine";
import { App } from "./App";

export class SoundPlayer implements PlayerListener {
  private static soundTable: Int32Array = null;
  private static players: Player[] = null;
  constructor() {
    SoundPlayer.players = new Array<Player>(idiv((SoundPlayer.soundTable = Engine.soundTable).length, 11)).fill(null);
  }
  loadPlayer(var1: number): void {
    try {
      let var2: number = Math.imul(var1, 11);
      let var3: number = SoundPlayer.soundTable[var2 + 1];
      let var10000: Player = SoundPlayer.players[var1];
      let var4: Player = null;
      if (var10000 === null && var3 !== (-1)) {
        let var8: string = null;
        switch (SoundPlayer.soundTable[var2 + 2]) {
          case 1:
            var8 = "audio/midi";
            break;
          case 2:
            var8 = "audio/amr";
          case 3:
          case 5:
          default:
            break;
          case 4:
            var8 = "audio/mmf";
            break;
          case 6:
            var8 = "audio/x-wav";
            break;
          case 7:
            var8 = "audio/mpeg";
        }
        SoundPlayer.players[var1] = var4 = Manager.createPlayer(Engine.openSoundStream(var1), var8);
        if (var4 !== null) {
          try {
            var4.realize();
          } catch (var6) {
          }
          try {
            var4.prefetch();
          } catch (var5) {
          }
          var4.addPlayerListener(this);
        }
      }
    } catch (var7) {
      printStackTrace(var7);
    }
  }
  static startPlayer(var0: number): void {
    try {
      let var1: Player = SoundPlayer.players[var0];
      let var2: number = 0;
      if (var1 !== null) {
        var2 = var1.getState();
      }
      if (var1 !== null) {
        if (var2 !== 300 && var2 !== 0) {
          var1.prefetch();
        }
        var2 = Math.imul(var0, 11);
        if (SoundPlayer.soundTable[var2 + 7] !== (-1)) {
          (var1.getControl("VolumeControl") as VolumeControl).setLevel(App.getSetting(SoundPlayer.soundTable[var2 + 7]));
        }
        var1.start();
        SoundPlayer.soundTable[Math.imul(var0, 11)] = 0;
      }
    } catch (var3) {
      printStackTrace(var3);
    }
  }
  stopPlayer(var1: number): void {
    try {
      let var2: number = Math.imul(var1, 11);
      let var3: Player = SoundPlayer.players[var1];
      SoundPlayer.soundTable[var2] = 1;
      if (var3 !== null && var3.getState() !== 0) {
        if (var3.getState() === 400) {
          var3.stop();
        }
        if ((SoundPlayer.soundTable[var2 + 1] & 2) === 0) {
          try {
            var3.removePlayerListener(this);
            if (var3.getState() === 300) {
              var3.deallocate();
            }
            if (var3.getState() === 200 || var3.getState() === 100) {
              var3.close();
            }
            SoundPlayer.players[var1] = null;
            return;
          } catch (var4) {
          }
        }
      }
    } catch (var5) {
    }
  }
  static pauseAll(): void {
    for (let var0: number = 0; var0 < Engine.soundCount; var0++) {
      if (SoundPlayer.soundTable[Math.imul(var0, 11)] === 0) {
        Engine.stopSound(var0);
        SoundPlayer.soundTable[Math.imul(var0, 11)] = 3;
      }
    }
  }
  static resumeAll(): void {
    for (let var0: number = 0; var0 < Engine.soundCount; var0++) {
      if (SoundPlayer.soundTable[Math.imul(var0, 11)] === 3) {
        Engine.playSound(var0);
      }
    }
  }
  playerUpdate(var1: Player, var2: string, var3: any): void {
    try {
      let var3i: number = (-1);
      for (let var4: number = 0; var4 < Engine.soundCount; var4++) {
        if (SoundPlayer.players[var4] === var1) {
          var3i = var4;
          break;
        }
      }
      if (var3i !== (-1) && (var2 === "endOfMedia")) {
        Engine.onSoundEnd(var3i);
      }
    } catch (var5) {
    }
  }
  static previewVolume(var0: number, var1: number): void {
    let var2: number = (-1);
    if (var0 !== 4) {
      Engine.playSound(var1);
    } else {
      for (let var3: number = 0; var3 < SoundPlayer.players.length; var3++) {
        if (SoundPlayer.soundTable[Math.imul(var3, 11)] === 0 && ((SoundPlayer.soundTable[Math.imul(var3, 11) + 1] & 16) !== 0 || (SoundPlayer.soundTable[Math.imul(var3, 11) + 1] & 8) !== 0)) {
          var2 = var3;
          break;
        }
      }
      if (var2 !== (-1)) {
        var0 = Math.imul(var2, 11);
        if (SoundPlayer.soundTable[var0 + 7] !== (-1)) {
          (SoundPlayer.players[var2].getControl("VolumeControl") as VolumeControl).setLevel(App.getSetting(SoundPlayer.soundTable[var0 + 7]));
        }
      } else {
        Engine.playSound(var1);
      }
    }
  }
  syncPreloadedPlayers(): void {
    let var1: number = 0;
    for (let var2: number = 0; var2 < SoundPlayer.players.length; var2++) {
      var1 = Math.imul(var2, 11);
      if (SoundPlayer.soundTable[var1 + 9] === 0) {
        if (SoundPlayer.players[var2] !== null) {
          SoundPlayer.players[var2].close();
        }
        SoundPlayer.players[var2] = null;
      } else if (SoundPlayer.soundTable[var1 + 9] === 1 && SoundPlayer.players[var2] === null) {
        this.loadPlayer(var2);
      }
    }
  }
  static updateMusicVolume(): void {
    if (App.getSetting(4) > 0) {
      let var0: number = (-1);
      for (let var1: number = 0; var1 < SoundPlayer.players.length; var1++) {
        if (SoundPlayer.soundTable[Math.imul(var1, 11)] === 0 && ((SoundPlayer.soundTable[Math.imul(var1, 11) + 1] & 16) !== 0 || (SoundPlayer.soundTable[Math.imul(var1, 11) + 1] & 8) !== 0)) {
          var0 = var1;
          break;
        }
      }
      if (var0 !== (-1)) {
        let var2: number = Math.imul(var0, 11);
        if (SoundPlayer.soundTable[var2 + 7] !== (-1)) {
          (SoundPlayer.players[var0].getControl("VolumeControl") as VolumeControl).setLevel(App.getSetting(SoundPlayer.soundTable[var2 + 7]));
        }
      }
      Engine.playRandomInGroup(Engine.getMusicGroup());
    }
  }
}
