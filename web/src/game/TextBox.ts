// Generated from the decompiled MIDlet by research/tools/src/J2TS.java.
import { Vector, idiv } from "../runtime/java";
import { Graphics } from "../runtime/midp";
import { Engine } from "./Engine";
import { App } from "./App";

export class TextBox {
  private flags: number = 0;
  width: number = 0;
  height: number = 0;
  private contentWidth: number = 0;
  contentHeight: number = 0;
  private scrollX: number = 0;
  scrollY: number = 0;
  private scrollSpeedX: number = 0;
  private scrollSpeedY: number = 0;
  private scrollDelayX: number = 0;
  private scrollDelayY: number = 0;
  private lines: Vector = null;
  private lineStyles: Vector = null;
  $init0(var1: number, var2: number, var3: number): this {
    this.flags = var3;
    this.width = var1;
    this.height = var2;
    this.lines = new Vector(10, 10);
    this.lineStyles = new Vector(10, 10);
    return this;
  }
  $init1(): this {
    return this;
  }
  addText(var1: string, var2: Int32Array): void {
    let var3: number = Engine.getFontHeight(var2[3]);
    let var4: number = 0;
    if ((this.flags & 1) === 1) {
      this.lines.addElement(var1);
      this.lineStyles.addElement(var2);
      var4 = Engine.getFont(var2[3]).stringWidth(var1);
      var2[1] = var4;
      var2[2] = var3;
      if ((this.flags & 5) === 5) {
        this.contentWidth += var4;
        this.contentHeight = Math.max(this.contentHeight, var3);
      } else {
        this.contentWidth = Math.max(this.contentWidth, var4);
        this.contentHeight += var3;
      }
    } else {
      let var6: string[] = Engine.wrapText(var1, Engine.getFont(var2[3]), this.width);
      var4 = this.width;
      var2[1] = this.width;
      var2[2] = var3;
      for (let var5: number = 0; var5 < var6.length; var5++) {
        this.lines.addElement(var6[var5]);
        this.lineStyles.addElement(var2);
        this.contentHeight += var3;
      }
      this.contentWidth = Math.max(this.contentWidth, var4);
    }
  }
  draw(var1: Graphics, var2: number, var3: number, var4: number): void {
    if (this.contentWidth !== 0 && this.contentHeight !== 0) {
      if (var4 !== 0) {
        if ((var4 & 1) === 1) {
          var2 -= idiv(this.width, 2);
        } else if ((var4 & 8) === 8) {
          var2 -= this.width;
        }
        if ((var4 & 2) === 2) {
          var3 -= idiv(this.height, 2);
        } else if ((var4 & 32) === 32) {
          var3 -= this.height;
        }
      }
      if (!App.isPaused()) {
        if (this.contentWidth > this.width) {
          if (this.scrollDelayX > 0) {
            this.scrollDelayX--;
          } else {
            this.scrollX = this.scrollX + this.scrollSpeedX;
          }
        }
        if (this.scrollDelayY > 0) {
          this.scrollDelayY--;
        } else {
          this.scrollY = this.scrollY + this.scrollSpeedY;
        }
        if ((this.flags & 2) === 2) {
          this.scrollX = this.scrollX % this.contentWidth;
          this.scrollY = this.scrollY % this.contentHeight;
          if (this.scrollX < 0) {
            this.scrollX = this.scrollX + this.contentWidth;
          }
          if (this.scrollY < 0) {
            this.scrollY = this.scrollY + this.contentHeight;
          }
        } else if ((this.flags & 1) === 1) {
          if (this.scrollX > this.contentWidth) {
            this.scrollX = -this.contentWidth;
          }
        } else {
          this.scrollX = Engine.clamp(this.scrollX, this.contentWidth - this.width);
          this.scrollY = Engine.clamp(this.scrollY, this.contentHeight - this.height);
        }
      }
      var4 = var1.getClipX();
      let var5: number = var1.getClipY();
      let var6: number = var1.getClipHeight();
      let var7: number = var1.getClipWidth();
      let var8: number = Math.max(var4, var2);
      let var9: number = Math.max(var5, var3);
      var2 = Math.min(var5 - var2 + var7, this.width);
      var3 = Math.min(var5 - var3 + var6, this.height);
      if (var2 > 0 && var3 > 0) {
        var1.setClip(var8, var9, var2, var3);
        if (this.scrollSpeedX === 0) {
          var3 = this.scrollY;
          let var10: number = this.scrollY + this.height;
          var3 = -var3;
          for (let var11: number = 0; var11 < this.lines.size(); var11++) {
            let var12: any = this.lines.elementAt(var11);
            let var13: Int32Array = (this.lineStyles.elementAt(var11) as Int32Array);
            if (var3 + var13[2] < 0) {
              var3 += var13[2];
            } else {
              let var16: number = var3 + var9;
              if (typeof var12 === "string") {
                let var14: number = 0;
                let var15: number = 0;
                switch (var13[0] & 13) {
                  case 1:
                    if (this.scrollY <= 0 && this.height >= this.contentHeight - this.scrollY) {
                      var15 = var8 + idiv(var2, 2);
                    } else {
                      var15 = var8 + idiv(var2, 2) + 1;
                    }
                    var14 = 17;
                    break;
                  case 8:
                    if (this.scrollY <= 0 && this.height >= this.contentHeight - this.scrollY) {
                      var15 = var8 + var2;
                    } else {
                      var15 = var8 + var2;
                    }
                    var14 = 24;
                    break;
                  default:
                    var15 = var8;
                    var14 = 20;
                }
                Engine.drawText(var1, var15, var16, var12 as string, var13[3], var14, var13[4], var13[5], var13[6]);
              }
              if ((var3 += var13[2]) > var10) {
                break;
              }
            }
          }
        } else {
          var3 = this.scrollX;
          let var24: number = this.scrollX + this.width;
          var3 = -var3;
          for (let var25: number = 0; var25 < this.lines.size(); var25++) {
            let var26: any = this.lines.elementAt(var25);
            let var27: Int32Array = (this.lineStyles.elementAt(var25) as Int32Array);
            if (var3 + var27[1] < 0) {
              var3 += var27[1];
            } else {
              let var30: number = var9;
              if (typeof var26 === "string") {
                let var28: number = 0;
                let var29: number = 0;
                switch (var27[0] & 13) {
                  case 1:
                    var29 = var8 + idiv(var2, 2);
                    var28 = 17;
                    break;
                  case 8:
                    var29 = var8 + var2;
                    var28 = 24;
                    break;
                  default:
                    var29 = var8;
                    var28 = 20;
                }
                if (this.width < this.contentWidth) {
                  var29 = var3 + var8;
                  var28 = 20;
                }
                Engine.drawText(var1, var29, var30, var26 as string, var27[3], var28, var27[4], var27[5], var27[6]);
              }
              if ((var3 += var27[1]) > var24) {
                break;
              }
            }
          }
        }
        var1.setClip(var4, var5, var7, var6);
      }
    }
  }
  resetScrollDelay(): void {
    this.scrollDelayX = 30;
    this.scrollDelayY = 0;
  }
  setScrollSpeed(var1: number, var2: number): void {
    this.scrollSpeedX = var1;
    this.scrollSpeedY = var2;
  }
  setViewHeight(var1: number): void {
    this.height = Math.min(this.contentHeight, var1);
    this.height = Math.max(this.height, 0);
  }
}
