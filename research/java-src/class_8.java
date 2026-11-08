import hg.class_22;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: n
public final class class_8 {
   // $VF: renamed from: e int
   private int field_216;
   // $VF: renamed from: a int
   int field_217;
   // $VF: renamed from: b int
   public int field_218;
   // $VF: renamed from: f int
   private int field_219;
   // $VF: renamed from: c int
   public int field_220;
   // $VF: renamed from: g int
   private int field_221;
   // $VF: renamed from: d int
   int field_222;
   // $VF: renamed from: h int
   private int field_223;
   // $VF: renamed from: i int
   private int field_224;
   // $VF: renamed from: j int
   private int field_225;
   // $VF: renamed from: k int
   private int field_226;
   // $VF: renamed from: a java.util.Vector
   private Vector field_227;
   // $VF: renamed from: b java.util.Vector
   private Vector field_228;

   public class_8(int var1, int var2, int var3) {
      this.field_216 = var3;
      this.field_217 = var1;
      this.field_218 = var2;
      this.field_227 = new Vector(10, 10);
      this.field_228 = new Vector(10, 10);
   }

   private class_8() {
   }

   // $VF: renamed from: a (java.lang.String, int[]) void
   public final void method_233(String var1, int[] var2) {
      int var3 = class_15.method_401(var2[3]);
      int var4 = 0;
      if ((this.field_216 & 1) == 1) {
         this.field_227.addElement(var1);
         this.field_228.addElement(var2);
         var4 = class_15.method_398(var2[3]).stringWidth(var1);
         var2[1] = var4;
         var2[2] = var3;
         if ((this.field_216 & 5) == 5) {
            this.field_219 += var4;
            this.field_220 = Math.max(this.field_220, var3);
         } else {
            this.field_219 = Math.max(this.field_219, var4);
            this.field_220 += var3;
         }
      } else {
         String[] var6 = class_15.method_433(var1, class_15.method_398(var2[3]), this.field_217);
         var4 = this.field_217;
         var2[1] = this.field_217;
         var2[2] = var3;

         for (int var5 = 0; var5 < var6.length; var5++) {
            this.field_227.addElement(var6[var5]);
            this.field_228.addElement(var2);
            this.field_220 += var3;
         }

         this.field_219 = Math.max(this.field_219, var4);
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int, int) void
   public final void method_234(Graphics var1, int var2, int var3, int var4) {
      if (this.field_219 != 0 && this.field_220 != 0) {
         if (var4 != 0) {
            if ((var4 & 1) == 1) {
               var2 -= this.field_217 / 2;
            } else if ((var4 & 8) == 8) {
               var2 -= this.field_217;
            }

            if ((var4 & 2) == 2) {
               var3 -= this.field_218 / 2;
            } else if ((var4 & 32) == 32) {
               var3 -= this.field_218;
            }
         }

         if (!class_22.method_566()) {
            if (this.field_219 > this.field_217) {
               if (this.field_225 > 0) {
                  this.field_225--;
               } else {
                  this.field_221 = this.field_221 + this.field_223;
               }
            }

            if (this.field_226 > 0) {
               this.field_226--;
            } else {
               this.field_222 = this.field_222 + this.field_224;
            }

            if ((this.field_216 & 2) == 2) {
               this.field_221 = this.field_221 % this.field_219;
               this.field_222 = this.field_222 % this.field_220;
               if (this.field_221 < 0) {
                  this.field_221 = this.field_221 + this.field_219;
               }

               if (this.field_222 < 0) {
                  this.field_222 = this.field_222 + this.field_220;
               }
            } else if ((this.field_216 & 1) == 1) {
               if (this.field_221 > this.field_219) {
                  this.field_221 = -this.field_219;
               }
            } else {
               this.field_221 = class_15.method_357(this.field_221, this.field_219 - this.field_217);
               this.field_222 = class_15.method_357(this.field_222, this.field_220 - this.field_218);
            }
         }

         var4 = var1.getClipX();
         int var5 = var1.getClipY();
         int var6 = var1.getClipHeight();
         int var7 = var1.getClipWidth();
         int var8 = Math.max(var4, var2);
         int var9 = Math.max(var5, var3);
         var2 = Math.min(var5 - var2 + var7, this.field_217);
         var3 = Math.min(var5 - var3 + var6, this.field_218);
         if (var2 > 0 && var3 > 0) {
            var1.setClip(var8, var9, var2, var3);
            if (this.field_223 == 0) {
               var3 = this.field_222;
               int var10 = this.field_222 + this.field_218;
               var3 = -var3;

               for (int var11 = 0; var11 < this.field_227.size(); var11++) {
                  Object var12 = this.field_227.elementAt(var11);
                  int[] var13 = (int[])this.field_228.elementAt(var11);
                  if (var3 + var13[2] < 0) {
                     var3 += var13[2];
                  } else {
                     int var16 = var3 + var9;
                     if (var12 instanceof String) {
                        byte var14;
                        int var15;
                        switch (var13[0] & 13) {
                           case 1:
                              if (this.field_222 <= 0 && this.field_218 >= this.field_220 - this.field_222) {
                                 var15 = var8 + var2 / 2;
                              } else {
                                 var15 = var8 + var2 / 2 + 1;
                              }

                              var14 = 17;
                              break;
                           case 8:
                              if (this.field_222 <= 0 && this.field_218 >= this.field_220 - this.field_222) {
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

                        class_15.method_419(var1, var15, var16, (String)var12, var13[3], var14, var13[4], var13[5], var13[6]);
                     }

                     if ((var3 += var13[2]) > var10) {
                        break;
                     }
                  }
               }
            } else {
               var3 = this.field_221;
               int var24 = this.field_221 + this.field_217;
               var3 = -var3;

               for (int var25 = 0; var25 < this.field_227.size(); var25++) {
                  Object var26 = this.field_227.elementAt(var25);
                  int[] var27 = (int[])this.field_228.elementAt(var25);
                  if (var3 + var27[1] < 0) {
                     var3 += var27[1];
                  } else {
                     int var30 = var9;
                     if (var26 instanceof String) {
                        byte var28;
                        int var29;
                        switch (var27[0] & 13) {
                           case 1:
                              var29 = var8 + var2 / 2;
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

                        if (this.field_217 < this.field_219) {
                           var29 = var3 + var8;
                           var28 = 20;
                        }

                        class_15.method_419(var1, var29, var30, (String)var26, var27[3], var28, var27[4], var27[5], var27[6]);
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

   // $VF: renamed from: a () void
   public final void method_235() {
      this.field_225 = 30;
      this.field_226 = 0;
   }

   // $VF: renamed from: a (int, int) void
   public final void method_236(int var1, int var2) {
      this.field_223 = var1;
      this.field_224 = var2;
   }

   // $VF: renamed from: a (int) void
   public final void method_237(int var1) {
      this.field_218 = Math.min(this.field_220, var1);
      this.field_218 = Math.max(this.field_218, 0);
   }
}
