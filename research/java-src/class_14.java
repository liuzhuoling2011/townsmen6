import hg.class_22;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: h
public final class class_14 {
   // $VF: renamed from: a r
   public class_4 field_313;
   // $VF: renamed from: b r
   public class_4 field_314;
   // $VF: renamed from: a v
   public class_2 field_315;
   // $VF: renamed from: e int
   private int field_316;
   // $VF: renamed from: f int
   private int field_317;
   // $VF: renamed from: a i
   private class_13 field_318 = new class_13();
   // $VF: renamed from: g int
   private int field_319;
   // $VF: renamed from: h int
   private int field_320;
   // $VF: renamed from: i int
   private int field_321;
   // $VF: renamed from: j int
   private int field_322;
   // $VF: renamed from: k int
   private int field_323;
   // $VF: renamed from: l int
   private int field_324;
   // $VF: renamed from: m int
   private int field_325;
   // $VF: renamed from: n int
   private int field_326;
   // $VF: renamed from: o int
   private int field_327;
   // $VF: renamed from: p int
   private int field_328;
   // $VF: renamed from: a int[]
   private int[] field_329;
   // $VF: renamed from: q int
   private int field_330;
   // $VF: renamed from: r int
   private int field_331;
   // $VF: renamed from: s int
   private int field_332;
   // $VF: renamed from: a int
   public int field_333;
   // $VF: renamed from: t int
   private int field_334;
   // $VF: renamed from: b int
   public int field_335;
   // $VF: renamed from: a w
   private class_1 field_336;
   // $VF: renamed from: u int
   private int field_337;
   // $VF: renamed from: v int
   private int field_338;
   // $VF: renamed from: c int
   public int field_339;
   // $VF: renamed from: d int
   int field_340;
   // $VF: renamed from: b h
   private class_14 field_341;
   // $VF: renamed from: a h
   class_14 field_342;
   // $VF: renamed from: w int
   private int field_343 = Integer.MIN_VALUE;
   // $VF: renamed from: x int
   private int field_344 = Integer.MIN_VALUE;
   // $VF: renamed from: a java.util.Vector
   public static Vector field_345 = new Vector(32, 16);
   // $VF: renamed from: b java.util.Vector
   public static Vector field_346 = new Vector(32, 16);
   // $VF: renamed from: c java.util.Vector
   public static Vector field_347 = new Vector(32, 16);
   // $VF: renamed from: d java.util.Vector
   public static Vector field_348 = new Vector(32, 16);
   // $VF: renamed from: e java.util.Vector
   public static Vector field_349 = new Vector(32, 16);
   // $VF: renamed from: f java.util.Vector
   public static Vector field_350 = new Vector(32, 16);
   // $VF: renamed from: g java.util.Vector
   public static Vector field_351 = new Vector(32, 16);
   // $VF: renamed from: h java.util.Vector
   public static Vector field_352 = new Vector(32, 16);
   // $VF: renamed from: i java.util.Vector
   public static Vector field_353 = new Vector(32, 16);
   // $VF: renamed from: j java.util.Vector
   public static Vector field_354 = new Vector(32, 16);
   // $VF: renamed from: k java.util.Vector
   public static Vector field_355 = new Vector(32, 16);
   // $VF: renamed from: l java.util.Vector
   public static Vector field_356 = new Vector(32, 16);

   // $VF: renamed from: a (int[]) void
   public final void method_315(int[] var1) {
      if (this.field_329 != var1) {
         class_14 var2 = this;
         if (class_12.method_279(this.field_332) != 587202560) {
            if (var2.field_340 != 0) {
               var2.field_332 = 587202560 | var2.field_340;
               if (var2.field_314 != null) {
                  if (var2.field_314.field_72 == null) {
                     var2.field_314.method_80();
                  }

                  var2.field_335 = 0;
                  var2.method_320(var2.field_314.field_72);
                  if (var2.field_329 != null && class_12.method_281(var2.field_329[0]) == 983040) {
                     var2.field_314.method_77(var2.field_340);
                  }
               } else {
                  var2.field_335 = 0;
                  var2.method_320(class_4.field_58.field_72);
               }
            } else {
               var2.field_332 = 0;
               var2.method_324(0);
            }
         }

         this.field_329 = var1;
         this.field_331 = 0;
         this.field_315 = null;
      }
   }

   // $VF: renamed from: h () void
   private void method_316() {
      if (this.field_335 != 0) {
         if (--this.field_335 > 0) {
            return;
         }

         this.field_335 = 0;
      }

      switch (this.field_334) {
         case 0:
         case 9:
         case 10:
            if (this.field_329 != null) {
               this.field_332 = this.field_329[this.field_331];
               this.method_317();
               return;
            }

            if (this.field_319 == this.field_313.field_68 && this.field_320 == this.field_313.field_69) {
               this.method_324(1);
               return;
            }

            this.method_320(this.field_313);
            return;
         case 1:
            if (this.field_329 != null) {
               this.method_324(0);
               this.field_332 = this.field_329[this.field_331];
               this.method_317();
               return;
            }

            return;
         case 2:
            if (!this.method_325()) {
               return;
            }
         case 3:
         case 4:
         case 5:
         case 6:
            break;
         case 7:
            if (this.method_325()) {
               if (this.field_314 != null && this.field_314.field_74 != null) {
                  this.field_314.field_74.method_523(this);
                  this.method_324(8);
                  return;
               }

               this.method_324(0);
               return;
            }

            return;
         case 8:
         default:
            return;
      }

      class_14 var1 = this;
      if (this.field_332 != 0) {
         int var2 = class_12.method_279(var1.field_332);
         int var3 = class_12.method_281(var1.field_332);
         int var4 = class_12.method_280(var1.field_332);
         if (var1.field_314 != null) {
            if (var1.field_314.field_72 == null) {
               var1.field_314.method_80();
            }

            if (var1.field_314.field_73 == null) {
               var1.field_314.method_81();
            }
         }

         switch (var2) {
            case 16777216:
               if (var1.field_314.field_72.field_68 != var1.field_319 || var1.field_314.field_72.field_69 != var1.field_320) {
                  var1.method_320(var1.field_314.field_72);
                  return;
               }
               break;
            case 83886080:
               if (var1.field_314.field_73 == null) {
                  var1.field_331 = 0;
               } else if (var1.field_314.field_73.field_68 != var1.field_319 || var1.field_314.field_73.field_69 != var1.field_320) {
                  var1.method_320(var1.field_314.field_73);
                  return;
               }
               break;
            case 268435456:
            case 285212672:
            case 301989888:
            case 805306368:
            case 822083584:
               var1.field_340 = 0;
            case 318767104:
            case 1090519040:
            default:
               break;
            case 536870912:
               if ((var2 = class_12.method_275(var3, var4)) == 0) {
                  var1.method_324(10);
                  var1.field_335 = class_15.method_352(2, 15);
                  var1.field_314.field_72.method_104(class_12.field_285[var3 >> 16], 16484);
                  return;
               }

               var1.field_340 = 0;
               if (var2 < var4) {
                  var1.field_314.field_72.method_104(class_12.field_285[var3 >> 16], 16483);
               }
               break;
            case 553648128:
            case 570425344:
               var1.field_330 = var1.field_330 - class_12.method_280(var1.field_340);
               var1.field_330 = Math.max(var1.field_330, 0);
               if ((var2 = class_12.method_275(var3, class_12.method_280(var1.field_340))) == 0) {
                  var1.field_335 = class_15.method_352(2, 15);
                  var1.field_314.field_72.method_104(class_12.field_285[var3 >> 16], 16484);
                  return;
               }

               var1.field_340 = 0;
               if (var2 < var4) {
                  var1.field_314.field_72.method_104(class_12.field_285[var3 >> 16], 16483);
               }
               break;
            case 587202560:
               class_12.method_275(var3, var4);
               var1.field_340 = 0;
               break;
            case 1073741824:
               if (var1.field_319 != var1.field_314.field_68 || var1.field_320 != var1.field_314.field_69) {
                  var1.field_319 = var1.field_314.field_68;
                  var1.field_320 = var1.field_314.field_69;
                  var1.field_323 = -2;
                  var1.field_324 = -1;
               }

               var1.field_314.field_76 = false;
               break;
            case 1107296256:
               var1.field_314.method_83(var1.field_330);
               var1.field_340 = 0;
         }
      }

      var1.method_318();
   }

   // $VF: renamed from: i () void
   private void method_317() {
      int var1 = class_12.method_279(this.field_332);
      int var2 = class_12.method_281(this.field_332);
      int var3 = class_12.method_280(this.field_332);
      if (this.field_314 != null) {
         if (this.field_314.field_72 == null) {
            this.field_314.method_80();
         }

         if (this.field_314.field_73 == null) {
            this.field_314.method_81();
         }
      }

      switch (var1) {
         case -1610612736:
            this.field_330 = var3;
            break;
         case -1593835520:
            this.field_330 += var3;
            break;
         case -1577058304:
            this.field_330 = Math.max(this.field_330 - var3, 0);
            break;
         case -1560281088:
            this.field_330 *= var3;
            break;
         case -1543503872:
            this.field_330 /= var3;
            break;
         case -1526726656:
            this.field_331 = var3;
            return;
         case -1509949440:
            if (this.field_330 != 0) {
               this.field_331 = var3;
               return;
            }

            this.method_318();
            return;
         case -1493172224:
            if (this.field_330 == 0) {
               this.field_331 = var3;
               return;
            }

            this.method_318();
            return;
         case -268435456:
            this.method_324(0);
            this.field_335 = class_15.method_352(2, 15);
            break;
         case -251658240:
            this.method_318();
            this.method_324(1);
            this.field_335 = class_15.method_352(100, 140);
            if (this.field_339 == 1) {
               var1 = 0;
               if (this.field_314.field_73 != null) {
                  var1 = 0 + class_1.method_13(this.field_314, this.field_314.field_73);
               }

               if (this.field_314.field_72 != null) {
                  var1 += class_1.method_13(this.field_314, this.field_314.field_72);
               }

               var1 <<= 1;
               this.field_335 += (10 - var1) * 10;
               return;
            }

            return;
         case -234881024:
            this.field_340 = var2 | var3;
            break;
         case 16777216:
            this.method_320(this.field_314.field_72);
            return;
         case 33554432:
            this.method_320(this.field_313);
            return;
         case 50331648:
            this.method_320(this.field_314);
            return;
         case 67108864:
            if (this.field_315 != null && this.field_315.field_13 > 0) {
               this.method_320(this.field_315);
               return;
            }

            switch (this.field_314.field_62) {
               case 9:
                  this.field_315 = class_1.method_7(this.field_314);
               default:
                  this.field_335 = class_15.method_352(2, 15);
                  return;
            }
         case 83886080:
            if (this.field_314.field_73 == null) {
               if (this.field_339 == 1) {
                  class_12.method_292(-2);
                  this.field_330 = 0;
                  this.method_318();
                  this.field_335 = class_15.method_352(2, 15) + 7;
                  this.method_324(10);
                  this.field_323 = this.field_324 = 0;
                  return;
               }

               this.field_335 = class_15.method_352(2, 15) + 40;
               return;
            }

            if (this.field_339 == 1) {
               this.field_330 = 1;
            }

            this.method_320(this.field_314.field_73);
            return;
         case 100663296:
            if (class_4.field_58 == null) {
               this.field_335 = class_15.method_352(2, 15);
               return;
            }

            this.method_320(class_4.field_58);
            return;
         case 268435456:
            if ((var1 = class_12.method_274(var2, var3)) > 0) {
               this.field_340 = var2 | var1;
               this.method_320(this.field_314);
               return;
            }

            this.method_324(10);
            this.field_314.field_72.method_104(class_12.field_285[var2 >> 16], 16486);
            if (class_12.method_281(var2) != 1114112) {
               this.field_314.method_104(class_12.field_285[var2 >> 16], 16486);
               return;
            }

            class_4.field_58.method_104(class_12.field_285[17], 16486);
            return;
         case 285212672:
            this.field_330 = class_12.method_273(var2, var3);
            if (this.field_330 <= 0) {
               this.field_314.field_72.method_104(class_12.field_285[var2 >> 16], 16486);
               this.field_314.method_104(class_12.field_285[var2 >> 16], 16486);
               this.method_324(10);
               return;
            }

            this.field_340 = var2 | this.field_330;
            this.method_320(this.field_314);
            if (this.field_330 < (var3 & 15)) {
               this.field_314.field_72.method_104(class_12.field_285[var2 >> 16], 16485);
               this.field_314.method_104(class_12.field_285[var2 >> 16], 16485);
               return;
            }

            return;
         case 301989888:
            this.field_330 = class_12.method_276(var3, this.field_315);
            if (this.field_330 > 0) {
               this.field_340 = var2 | this.field_330;
               this.method_320(this.field_314);
               return;
            }

            switch (this.field_314.field_62) {
               case 9:
                  this.field_315 = null;
                  this.field_331 = 0;
               default:
                  this.field_335 = class_15.method_352(2, 15);
                  return;
            }
         case 318767104:
            this.field_340 = this.field_314.method_78();
            if (this.field_340 > 0) {
               this.field_330 = class_12.method_280(this.field_340);
               this.method_320(this.field_314);
               return;
            }

            this.method_324(10);
            return;
         case 536870912:
            this.field_340 = var2 | var3;
            if (class_12.method_283(var2) < class_12.field_277) {
               this.method_320(this.field_314.field_72);
               return;
            }

            this.method_324(10);
            this.field_335 = class_15.method_352(2, 15) + 7;
            this.field_314.field_72.method_104(class_12.field_285[var2 >> 16], 16484);
            return;
         case 553648128:
            if (var3 == 0) {
               var3 = this.field_330;
            }

            this.field_340 = var2 | Math.min(this.field_330, var3);
            if (class_12.method_283(var2) < class_12.field_277) {
               this.method_320(this.field_314.field_72);
               return;
            }

            this.method_324(10);
            this.field_335 = class_15.method_352(2, 15) + 7;
            this.field_314.field_72.method_104(class_12.field_285[var2 >> 16], 16484);
            return;
         case 570425344:
            this.field_330 = class_12.method_276(var3, this.field_315);
            if (var3 == 0) {
               var3 = this.field_330;
            }

            this.field_340 = var2 | Math.min(this.field_330, var3);
            if (class_12.method_283(var2) < class_12.field_277) {
               this.method_320(this.field_314.field_72);
               return;
            }

            this.method_324(10);
            this.field_335 = class_15.method_352(2, 15) + 7;
            this.field_314.field_72.method_104(class_12.field_285[var2 >> 16], 16484);
            return;
         case 805306368:
            this.field_330 = class_12.method_278(var3, this.field_314.field_59);
            if (this.field_330 > 0) {
               this.field_340 = this.field_330;
               this.method_320(this.field_314);
               return;
            }

            class_12.method_292(-3);
            this.field_314.method_104(class_12.field_285[2], 16486);
            this.field_314.method_104(class_12.field_285[4], 16486);
            this.field_314.method_104(class_12.field_285[7], 16486);
            this.method_324(10);
            this.field_335 = class_15.method_352(2, 15) + 80;
            return;
         case 822083584:
            this.field_330 = class_12.method_277(var3, this.field_314.field_73, this.field_339);
            this.field_340 = 327680 | this.field_330;
            this.method_320(this.field_314);
            return;
         case 1073741824:
            this.field_335 = var3;
            this.method_324(3);
            return;
         case 1090519040:
            this.field_335 = var3;
            this.method_324(4);
            return;
         case 1107296256:
            this.method_324(5);
            this.field_335 = var3;
            return;
         case 1124073472:
            if (this.field_314.field_73 != null) {
               this.field_335 = class_21.field_572[this.field_314.field_73.field_59];
               this.method_324(6);
               return;
            }

            this.field_331 = 0;
            this.method_320(this.field_314);
            return;
         case 1342177280:
            if (this.field_314.field_67 >= class_21.method_536(this.field_314.field_62, this.field_314.field_59)) {
               this.field_335 = class_15.method_352(2, 15);
               return;
            }

            this.method_318();
            return;
         case 1358954496:
            class_14 var5;
            (var5 = method_332(2)).method_336(this.field_314);
            var5.method_324(0);
            break;
         case 1375731712:
            class_14 var4;
            (var4 = method_332(3)).method_336(this.field_314);
            var4.method_324(0);
            break;
         case 1610612736:
            if (class_12.field_259 >= class_12.field_261) {
               this.field_335 = class_15.method_352(2, 15);
               return;
            }
            break;
         case 1627389952:
            if (class_12.field_259 < class_12.field_261 && ++class_12.field_260 >= class_21.field_563[class_12.field_259]) {
               class_12.field_259++;
               class_12.field_260 = 0;
               class_21.method_545();
            }

            this.method_318();
            this.field_335 = var3;
            return;
      }

      this.method_318();
   }

   // $VF: renamed from: j () void
   private void method_318() {
      int var1;
      if (this.field_329 == null) {
         this.field_331 = 0;
         this.field_332 = 0;
         var1 = 0;
      } else {
         var1 = class_12.method_279(this.field_329[this.field_331]);
         if (++this.field_331 >= this.field_329.length) {
            this.field_331 = 0;
         }
      }

      switch (this.field_339) {
         case 0:
            if (class_12.field_284 > class_15.method_351(50)) {
               this.method_324(0);
               this.field_335 = 0;
               return;
            }

            this.method_324(9);
            return;
         case 1:
            if (var1 == 1073741824) {
               this.method_324(1);
               return;
            }
         default:
            this.method_324(0);
      }
   }

   // $VF: renamed from: c (int, int) void
   private void method_319(int var1, int var2) {
      this.field_336 = class_1.method_10(this.field_319, this.field_320, var1, var2);
      if (this.field_336 != null) {
         if (this.field_336.field_0.method_247(0) == this.field_319 && this.field_336.field_1.method_247(0) == this.field_320) {
            this.field_338 = 0;
            this.field_337 = 1;
         } else {
            this.field_338 = this.field_336.field_0.field_232 - 1;
            this.field_337 = -1;
         }
      }

      this.field_325 = 0;
      this.field_326 = 0;
      this.field_328 = 0;
      this.field_321 = this.field_319;
      this.field_322 = this.field_320;
      this.method_324(2);
   }

   // $VF: renamed from: b (s) void
   private void method_320(class_0 var1) {
      this.method_319(var1.method_2(), var1.method_3());
   }

   // $VF: renamed from: a (s) void
   public final void method_321(class_0 var1) {
      this.field_335 = class_15.method_352(2, 15);
      this.method_319(var1.method_2(), var1.method_3());
      this.method_324(7);
   }

   // $VF: renamed from: k () void
   private final void method_322() {
      this.method_327();
      this.field_316 = -1;
      this.field_317 = 0;
      this.field_340 = 0;
      this.field_318.method_308(null);
   }

   // $VF: renamed from: l () void
   private void method_323() {
      if (this.field_323 > this.field_325) {
         if (this.field_324 > this.field_326) {
            this.field_317 = 16;
            return;
         }

         if (this.field_324 < this.field_326) {
            this.field_317 = 0;
            return;
         }
      } else if (this.field_323 < this.field_325) {
         if (this.field_324 > this.field_326) {
            this.field_317 = 32;
            return;
         }

         if (this.field_324 < this.field_326) {
            this.field_317 = 48;
         }
      }
   }

   // $VF: renamed from: a (int) void
   public final void method_324(int var1) {
      this.field_334 = var1;
      switch (var1) {
         case 0:
            if (this.field_339 == 0) {
               this.method_326();
               this.field_316 = 191;
               this.field_318.method_308(class_13.field_300);
               this.field_317 = 0;
               return;
            }

            if (this.field_339 == 1) {
               this.method_326();
               this.field_316 = 201;
               this.field_318.method_308(class_13.field_300);
               this.field_317 = 0;
               return;
            }

            this.method_322();
            return;
         case 1:
            this.method_322();
            return;
         case 2:
         case 7:
            this.method_326();
            this.field_318.method_308(class_13.field_294);
            this.method_323();
            switch (this.field_339) {
               case 0:
                  this.field_316 = this.field_340 == 0 ? 192 : 193;
                  return;
               case 1:
                  this.field_316 = this.field_340 == 0 ? 202 : 203;
                  return;
               case 2:
                  this.field_316 = 206;
                  return;
               case 3:
                  this.field_316 = 207;
                  return;
               case 4:
                  this.field_316 = 208;
               default:
                  return;
            }
         case 3:
            this.method_326();
            this.field_318.method_308(class_13.field_296);
            this.field_317 = 0;
            if (this.field_339 != 0) {
               this.field_314.field_76 = true;
               this.method_322();
               return;
            }

            switch (this.field_314.field_62) {
               case 4:
                  this.method_322();
                  this.field_314.field_70[0].field_18.method_308(class_13.field_305);
                  return;
               case 5:
               case 11:
               default:
                  this.field_316 = 194;
                  return;
               case 6:
                  this.field_314.field_76 = true;
                  this.field_316 = 196;
                  this.field_323 = 10;
                  this.field_324 = -8;
                  return;
               case 7:
                  this.field_314.field_76 = true;
                  this.field_318.method_308(class_13.field_298);
                  this.field_316 = 198;
                  this.field_323 = 10;
                  this.field_324 = -9;
                  class_16.method_463(class_22.field_581, 12);
                  return;
               case 8:
                  this.method_327();
                  this.field_318.method_308(class_13.field_297);
                  this.field_316 = 197;
                  class_1.method_11(this.field_314);
                  this.field_319 = this.field_314.field_70[0].field_13;
                  this.field_320 = this.field_314.field_70[0].field_14;
                  if (this.field_319 != -1 && this.field_320 != -1) {
                     this.field_323 = class_15.method_352(-10, 10);
                     this.field_324 = -8;
                     this.method_326();
                     return;
                  }

                  return;
               case 9:
                  this.field_316 = 195;
                  class_16.method_463(class_22.field_581, 13);
                  if (this.field_314.method_64() > 1) {
                     this.method_335();
                     return;
                  }

                  return;
               case 10:
                  this.field_318.method_308(class_13.field_298);
                  this.field_316 = 198;
                  class_16.method_463(class_22.field_581, 19);
                  this.method_335();
                  return;
               case 12:
                  this.field_314.field_76 = true;
                  this.field_318.method_308(class_13.field_311);
                  this.method_322();
                  return;
               case 13:
                  this.field_314.field_76 = true;
                  this.field_316 = 194;
                  return;
            }
         case 4:
            this.method_326();
            this.field_318.method_308(class_13.field_296);
            this.field_317 = 0;
            switch (this.field_315.field_12) {
               case 16:
                  this.field_318.method_308(class_13.field_298);
                  this.field_316 = 198;
                  class_16.method_463(class_22.field_581, 24);
                  this.method_335();
                  return;
               default:
                  this.field_316 = 194;
                  return;
            }
         case 5:
            this.method_326();
            if (class_12.method_281(this.field_340) == 0) {
               this.field_318.method_308(class_13.field_296);
               this.field_316 = 195;
               class_16.method_463(class_22.field_581, 13);
            } else {
               this.field_318.method_308(class_13.field_298);
               this.field_316 = 198;
               class_16.method_463(class_22.field_581, 12);
            }

            this.method_335();
            this.field_317 = 0;
            return;
         case 6:
            this.method_326();
            if (this.field_339 == 1) {
               this.field_316 = 204;
            } else {
               this.field_316 = 194;
            }

            this.field_318.method_308(class_13.field_296);
            this.field_317 = 0;
            return;
         case 8:
         default:
            break;
         case 9:
            this.method_326();
            this.field_335 = (100 - class_12.field_284) * 30 / 100;
            if (this.field_339 == 0) {
               this.field_316 = 199;
               this.field_318.method_308(class_13.field_299);
               this.field_317 = 0;
               return;
            }

            this.method_322();
            return;
         case 10:
            this.method_326();
            this.field_335 = 7;
            this.field_318.method_308(class_13.field_295);
            this.field_317 = 0;
            this.method_335();
            if (this.field_339 == 0) {
               this.field_316 = 200;
               return;
            }

            this.field_316 = 205;
      }
   }

   // $VF: renamed from: a () boolean
   private boolean method_325() {
      this.method_327();
      if (this.field_323 == this.field_325 && this.field_324 == this.field_326) {
         class_14 var1 = this;
         boolean var10000;
         if (this.field_336 == null) {
            var10000 = true;
         } else {
            label88: {
               int var2 = var1.field_336.field_0.method_247(var1.field_338);
               int var3 = var1.field_336.field_1.method_247(var1.field_338);
               if (var1.field_321 == var2 && var1.field_322 == var3) {
                  var1.field_338 = var1.field_338 + var1.field_337;
                  if (var1.field_338 < 0 || var1.field_338 >= var1.field_336.field_3) {
                     var1.field_323 = var1.field_325 = 0;
                     var1.field_324 = var1.field_326 = 0;
                     var1.field_319 = var1.field_321;
                     var1.field_320 = var1.field_322;
                     var1.field_336 = null;
                     var10000 = true;
                     break label88;
                  }

                  var2 = var1.field_336.field_0.method_247(var1.field_338);
                  var3 = var1.field_336.field_1.method_247(var1.field_338);
               }

               var1.field_319 = var1.field_321;
               var1.field_320 = var1.field_322;
               int var4 = var2 - var1.field_319;
               int var5 = var3 - var1.field_320;
               if (var4 > 0) {
                  var1.field_321 = var2;
                  var1.field_322 = var3;
                  var1.field_323 = 0;
                  var1.field_324 = 0;
                  var1.field_325 = 32;
                  var1.field_326 = -16;
               } else if (var4 < 0) {
                  var1.field_319 = var2;
                  var1.field_320 = var3;
                  var1.field_321 = var2;
                  var1.field_322 = var3;
                  var1.field_323 = 32;
                  var1.field_324 = -16;
                  var1.field_325 = 0;
                  var1.field_326 = 0;
               } else if (var5 > 0) {
                  var1.field_319 = var2;
                  var1.field_320 = var3;
                  var1.field_321 = var2;
                  var1.field_322 = var3;
                  var1.field_323 = -32;
                  var1.field_324 = -16;
                  var1.field_325 = 0;
                  var1.field_326 = 0;
               } else if (var5 < 0) {
                  var1.field_321 = var2;
                  var1.field_322 = var3;
                  var1.field_323 = 0;
                  var1.field_324 = 0;
                  var1.field_325 = -32;
                  var1.field_326 = -16;
               }

               var1.method_323();
               var1.field_328 = !class_1.method_18(var1.field_319, var1.field_320) && !class_1.method_18(var1.field_321, var1.field_322) ? -16 : 0;
               var10000 = false;
            }
         }

         if (var10000) {
            return true;
         }
      }

      if (this.field_323 < this.field_325) {
         this.field_323 += 2;
      } else if (this.field_323 > this.field_325) {
         this.field_323 -= 2;
      }

      if (this.field_324 < this.field_326) {
         this.field_324++;
      } else if (this.field_324 > this.field_326) {
         this.field_324--;
      }

      if (this.field_327 > this.field_328) {
         this.field_327--;
      } else if (this.field_327 < this.field_328) {
         this.field_327++;
      }

      this.method_326();
      return false;
   }

   // $VF: renamed from: m () void
   private void method_326() {
      this.method_327();
      this.field_343 = this.field_319;
      this.field_344 = this.field_320;
      this.field_342 = class_12.field_238.field_27[this.field_343][this.field_344];
      this.field_341 = null;
      if (this.field_342 != null) {
         this.field_342.field_341 = this;
      }

      class_12.field_238.field_27[this.field_343][this.field_344] = this;
   }

   // $VF: renamed from: a () void
   public final void method_327() {
      if (this.field_343 != Integer.MIN_VALUE) {
         if (class_12.field_238.field_27[this.field_343][this.field_344] != null) {
            if (this.field_341 != null) {
               this.field_341.field_342 = this.field_342;
            } else {
               class_12.field_238.field_27[this.field_343][this.field_344] = this.field_342;
            }

            if (this.field_342 != null) {
               this.field_342.field_341 = this.field_341;
            }
         }

         this.field_342 = this.field_341 = null;
         this.field_343 = Integer.MIN_VALUE;
      }
   }

   // $VF: renamed from: a (h) h
   public static class_14 method_328(class_14 var0) {
      class_14 var1 = var0;
      if (var0 == null) {
         return null;
      }

      while (var0 != null) {
         if (var0.field_342 != null && var0.field_342.field_324 < var0.field_324) {
            if (var0.field_341 != null) {
               var0.field_341.field_342 = var0.field_342;
            }

            var0.field_342.field_341 = var0.field_341;
            var0.field_341 = var0.field_342;
            class_14 var2 = var0.field_342.field_342;
            var0.field_342.field_342 = var0;
            var0.field_342 = var2;
            if (var2 != null) {
               var2.field_341 = var0;
            }

            if (var0.field_341.field_341 != null) {
               var0 = var0.field_341.field_341;
            }
         } else {
            var0 = var0.field_342;
         }
      }

      while (var1.field_341 != null) {
         var1 = var1.field_341;
      }

      return var1;
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int) void
   public final void method_329(Graphics var1, int var2, int var3) {
      class_15.method_417(var1, var2 + this.field_323, var3 + this.field_324 + this.field_327, this.field_316, this.field_317 + this.field_318.field_289);
      int var4 = var3;
      var3 = var2;
      Graphics var9 = var1;
      class_14 var8 = this;
      if (this.field_340 != 0) {
         int var5 = class_12.field_285[class_12.method_281(var8.field_340) >> 16];
         int var6 = class_12.method_280(var8.field_340);
         if (class_12.method_281(var8.field_340) == 1114112) {
            var6 = Math.min(4, var6);
         }

         for (int var7 = 0; var7 < var6; var7++) {
            class_15.method_417(
               var9, var3 + var8.field_323 - var6 / 2 + (var7 << 1), var4 + var8.field_324 + var8.field_327 - class_15.method_409(var8.field_316), 110, var5
            );
         }
      }
   }

   // $VF: renamed from: b () void
   public static void method_330() {
      for (int var0 = 0; var0 < field_347.size(); var0++) {
         ((class_14)field_347.elementAt(var0)).method_316();
      }

      for (int var1 = 0; var1 < field_345.size(); var1++) {
         ((class_14)field_345.elementAt(var1)).method_316();
      }

      for (int var2 = 0; var2 < field_349.size(); var2++) {
         ((class_14)field_349.elementAt(var2)).method_316();
      }

      for (int var3 = 0; var3 < field_352.size(); var3++) {
         ((class_14)field_352.elementAt(var3)).method_316();
      }

      for (int var4 = 0; var4 < field_355.size(); var4++) {
         ((class_14)field_355.elementAt(var4)).method_316();
      }
   }

   // $VF: renamed from: c () void
   public static void method_331() {
      class_12.method_292(field_348.size() * -6);
      switch (class_12.field_247) {
         case 0:
            class_12.method_292(2);
            return;
         case 1:
            class_12.method_292(-5);
            return;
         case 2:
            class_12.method_292(-10);
      }
   }

   // $VF: renamed from: a (int) h
   public static class_14 method_332(int var0) {
      class_14 var1;
      (var1 = new class_14()).field_339 = var0;
      switch (var0) {
         case 0:
            field_347.addElement(var1);
            field_346.addElement(var1);
            var1.method_336(null);
            var1.method_334(class_4.field_58.field_68, class_4.field_58.field_69);
            class_12.method_288(1179648);
            break;
         case 1:
            field_345.addElement(var1);
            class_12.method_288(1310720);
            break;
         case 2:
            field_349.addElement(var1);
            field_351.addElement(var1);
            var1.method_336(null);
            var1.method_334(class_4.field_58.field_68, class_4.field_58.field_69);
            class_21.method_560(8);
            class_12.method_288(851968);
            break;
         case 3:
            field_352.addElement(var1);
            field_354.addElement(var1);
            var1.method_336(null);
            var1.method_334(class_4.field_58.field_68, class_4.field_58.field_69);
            class_21.method_560(9);
            class_12.method_288(786432);
            break;
         case 4:
            if (class_4.field_90.size() > 0) {
               field_355.addElement(var1);
               field_356.addElement(var1);
               var1.method_336(null);
               if (class_12.field_238.field_32 && var1.field_313 != null) {
                  var1.method_334(var1.field_313.field_68, var1.field_313.field_69);
               }

               class_12.method_288(1245184);
            }
      }

      return var1;
   }

   // $VF: renamed from: a (int, int) void
   public static void method_333(int var0, int var1) {
      for (int var2 = 0; var2 < var1; var2++) {
         method_332(var0);
      }
   }

   // $VF: renamed from: b (int, int) void
   public final void method_334(int var1, int var2) {
      this.field_319 = var1;
      this.field_320 = var2;
      this.field_323 = 0;
      this.field_324 = 0;
   }

   // $VF: renamed from: n () void
   private void method_335() {
      if (this.field_323 == 0) {
         this.field_324 = -class_15.method_352(1, 8);
         this.field_323 = (this.field_324 << 1) / 2 << 1;
         if (!class_12.field_238.field_26[this.field_319][this.field_320].method_45() && class_15.method_353()) {
            this.field_323 = -this.field_323;
         }

         if (class_12.field_238.field_26[this.field_319][this.field_320].method_46() && this.field_323 < 0) {
            this.field_323 = -this.field_323;
         }
      }
   }

   // $VF: renamed from: a (r) void
   public final void method_336(class_4 var1) {
      if (this.field_334 == 1) {
         this.method_324(0);
      }

      switch (this.field_339) {
         case 0:
            if (var1 != null) {
               this.field_313 = var1;
               field_348.removeElement(this);
               return;
            }

            if (!field_348.contains(this)) {
               field_348.addElement(this);
            }

            this.field_313 = class_4.field_58;
            return;
         case 2:
            if (var1 != null) {
               this.field_313 = var1;
               var1.field_67++;
               field_350.removeElement(this);
               return;
            }

            if (this.field_313 != null) {
               this.field_313.field_67--;
            }

            if (!field_350.contains(this)) {
               field_350.addElement(this);
            }

            this.field_313 = class_4.field_58;
            return;
         case 3:
            if (var1 != null) {
               this.field_313 = var1;
               var1.field_67++;
               field_353.removeElement(this);
               return;
            }

            if (this.field_313 != null) {
               this.field_313.field_67--;
            }

            if (!field_353.contains(this)) {
               field_353.addElement(this);
            }

            this.field_313 = class_4.field_58;
            return;
         case 4:
            if (this.field_313 != null) {
               this.field_313.field_67--;
            }

            this.field_313 = var1;
            if (var1 == null) {
               class_15.method_387(this);
               return;
            } else {
               var1.field_67++;
            }
         case 1:
      }
   }

   // $VF: renamed from: b (r) void
   public final void method_337(class_4 var1) {
      switch (this.field_339) {
         case 0:
            if (this.field_314 != null) {
               if (var1 == null) {
                  switch (this.field_334) {
                     case 3:
                        this.field_319 = this.field_314.field_68;
                        this.field_320 = this.field_314.field_69;
                        this.field_323 = 0;
                        this.field_324 = 0;
                     default:
                        field_346.addElement(this);
                        this.method_315(null);
                  }
               }
            } else if (this.field_314 == null && var1 != null) {
               field_346.removeElement(this);
            }
            break;
         case 1:
            if (var1 == null) {
               this.method_339();
            }
         case 2:
         case 3:
         default:
            break;
         case 4:
            if (var1 == null && (this.field_313.field_74 != null || this.field_313.field_61 != 1)) {
               class_15.method_387(this);
            }
      }

      this.field_314 = var1;
   }

   // $VF: renamed from: d () void
   public static void method_338() {
      field_345.removeAllElements();
      field_346.removeAllElements();
      field_347.removeAllElements();
      field_348.removeAllElements();
      field_349.removeAllElements();
      field_350.removeAllElements();
      field_351.removeAllElements();
      field_352.removeAllElements();
      field_353.removeAllElements();
      field_354.removeAllElements();
      field_355.removeAllElements();
      field_356.removeAllElements();
   }

   private class_14() {
   }

   // $VF: renamed from: e () void
   public final void method_339() {
      switch (this.field_339) {
         case 0:
            class_12.method_289(1179648);
            break;
         case 1:
            field_345.removeElement(this);
            class_12.method_289(1310720);
            break;
         case 2:
            field_349.removeElement(this);
            field_350.removeElement(this);
            field_351.removeElement(this);
            class_12.method_289(851968);
            if (this.field_313 != null && this.field_313.field_61 == 0) {
               this.field_313.field_67--;
               method_344();
            }
            break;
         case 3:
            field_352.removeElement(this);
            field_353.removeElement(this);
            field_354.removeElement(this);
            class_12.method_289(786432);
            if (this.field_313 != null && this.field_313.field_61 == 0) {
               this.field_313.field_67--;
               method_343();
            }
            break;
         case 4:
            if (this.field_313 != null && this.field_313.field_61 == 1) {
               this.field_313.field_67--;
            }

            field_355.removeElement(this);
            field_356.removeElement(this);
            if (this.field_314 != null && this.field_314.field_74 != null) {
               this.field_314.field_74.field_492.removeElement(this);
               this.field_314.field_74.field_493.removeElement(this);
            }

            class_12.method_289(1245184);
      }

      this.field_318.method_313();
      this.method_327();
   }

   // $VF: renamed from: a () int
   public final int method_340() {
      switch (this.field_339) {
         case 2:
            if (this.field_313 != null && this.field_313 != class_4.field_58) {
               if (this.field_313.method_64() == 0) {
                  return 75;
               }

               return class_21.field_575[this.field_313.field_59];
            }

            return 50;
         case 3:
            return 5;
         case 4:
            if (this.field_313 != null) {
               return class_21.field_576[this.field_313.field_59];
            }

            return 0;
         default:
            return 0;
      }
   }

   // $VF: renamed from: a (java.io.DataOutputStream) void
   public static void method_341(DataOutputStream var0) {
      int var1 = field_347.size() - field_346.size();
      var0.writeShort(var1);

      for (int var3 = 0; var3 < field_347.size(); var3++) {
         class_14 var2;
         if ((var2 = (class_14)field_347.elementAt(var3)).field_314 != null) {
            var0.writeShort(class_4.field_85.indexOf(var2.field_314));
            var0.writeByte(var2.field_333);
         }

         class_12.method_285(var2.field_340);
      }

      var0.writeShort(field_346.size());
      var0.writeShort(field_352.size());
      var0.writeShort(field_349.size());
   }

   // $VF: renamed from: a (java.io.DataInputStream) void
   public static void method_342(DataInputStream var0) {
      short var1 = var0.readShort();

      for (int var2 = 0; var2 < var1; var2++) {
         class_14 var3 = method_332(0);
         class_4 var4 = (class_4)class_4.field_85.elementAt(var0.readShort());
         var3.field_333 = var0.readByte();
         var3.method_334(var4.field_68, var4.field_69);
         var4.method_68(var3);
         var3.field_335 = var2 << 1;
      }

      method_333(0, var0.readShort());

      for (int var6 = 0; var6 < class_4.field_85.size(); var6++) {
         class_4 var7;
         if ((var7 = (class_4)class_4.field_85.elementAt(var6)).field_61 == 0) {
            if (var7.field_62 == 3 && var7.method_82()) {
               for (int var8 = 0; var8 < class_21.field_566[var7.field_59]; var8++) {
                  class_14 var5 = (class_14)field_348.firstElement();
                  field_348.removeElementAt(0);
                  var5.method_336(var7);
                  if (var5.field_314 == null) {
                     var5.method_334(var7.field_68, var7.field_69);
                  }
               }
            } else {
               var7.method_62();
            }
         }
      }

      method_333(3, var0.readShort());
      method_333(2, var0.readShort());
      method_343();
      method_344();
   }

   // $VF: renamed from: f () void
   public static void method_343() {
      for (int var0 = 0; var0 < class_4.field_85.size() && field_353.size() > 0; var0++) {
         class_4 var1;
         if ((var1 = (class_4)class_4.field_85.elementAt(var0)).field_62 == 13
            && var1.field_61 == 0
            && var1.method_82()
            && var1.field_67 < class_21.method_536(var1.field_62, var1.field_59)) {
            class_14 var2 = (class_14)field_353.firstElement();
            field_353.removeElementAt(0);
            var2.method_336(var1);
            if (class_12.field_238.field_32) {
               var2.method_334(var1.field_68, var1.field_69);
            }
         }
      }
   }

   // $VF: renamed from: g () void
   public static void method_344() {
      for (int var0 = 0; var0 < class_4.field_85.size() && field_350.size() > 0; var0++) {
         class_4 var1;
         if ((var1 = (class_4)class_4.field_85.elementAt(var0)).field_62 == 14
            && var1.field_61 == 0
            && var1.method_82()
            && var1.field_67 < class_21.method_536(var1.field_62, var1.field_59)) {
            class_14 var2 = (class_14)field_350.firstElement();
            field_350.removeElementAt(0);
            var2.method_336(var1);
            if (class_12.field_238.field_32) {
               var2.method_334(var1.field_68, var1.field_69);
            }
         }
      }
   }
}
