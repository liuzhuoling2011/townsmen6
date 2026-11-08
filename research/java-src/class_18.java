import hg.class_22;
import java.io.DataInputStream;
import java.util.Stack;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: d
public final class class_18 {
   // $VF: renamed from: a int
   public int field_419 = -1;
   // $VF: renamed from: b int
   public int field_420 = -1;
   // $VF: renamed from: u int
   private int field_421 = -1;
   // $VF: renamed from: a java.lang.Object
   private Object field_422 = null;
   // $VF: renamed from: a boolean
   public boolean field_423 = true;
   // $VF: renamed from: v int
   private int field_424;
   // $VF: renamed from: c int
   public int field_425;
   // $VF: renamed from: d int
   public int field_426;
   // $VF: renamed from: e int
   public int field_427;
   // $VF: renamed from: f int
   public int field_428;
   // $VF: renamed from: w int
   private int field_429;
   // $VF: renamed from: x int
   private int field_430;
   // $VF: renamed from: y int
   private int field_431;
   // $VF: renamed from: z int
   private int field_432;
   // $VF: renamed from: A int
   private int field_433;
   // $VF: renamed from: g int
   public int field_434;
   // $VF: renamed from: b boolean
   private boolean field_435;
   // $VF: renamed from: c boolean
   private boolean field_436;
   // $VF: renamed from: d boolean
   private boolean field_437;
   // $VF: renamed from: h int
   public int field_438;
   // $VF: renamed from: i int
   public int field_439;
   // $VF: renamed from: j int
   public int field_440;
   // $VF: renamed from: k int
   public int field_441;
   // $VF: renamed from: l int
   public int field_442;
   // $VF: renamed from: m int
   public int field_443;
   // $VF: renamed from: n int
   public int field_444;
   // $VF: renamed from: o int
   public int field_445;
   // $VF: renamed from: p int
   public int field_446;
   // $VF: renamed from: q int
   public int field_447;
   // $VF: renamed from: r int
   public int field_448;
   // $VF: renamed from: s int
   public int field_449;
   // $VF: renamed from: B int
   private int field_450;
   // $VF: renamed from: C int
   private int field_451;
   // $VF: renamed from: t int
   public int field_452;
   // $VF: renamed from: a int[][]
   private int[][] field_453;
   // $VF: renamed from: a int[]
   private int[] field_454;
   // $VF: renamed from: a java.lang.Object[]
   private Object[] field_455;
   // $VF: renamed from: e boolean
   private boolean field_456;
   // $VF: renamed from: a java.util.Stack
   private Stack field_457 = null;
   // $VF: renamed from: D int
   private static int field_458;
   // $VF: renamed from: E int
   private static int field_459;
   // $VF: renamed from: F int
   private static int field_460;
   // $VF: renamed from: G int
   private static int field_461;
   // $VF: renamed from: H int
   private static int field_462;
   // $VF: renamed from: a int[][][]
   private static int[][][] field_463 = null;
   // $VF: renamed from: b int[]
   private static int[] field_464 = null;
   // $VF: renamed from: f boolean
   private static boolean field_465 = false;
   // $VF: renamed from: I int
   private static int field_466 = 0;
   // $VF: renamed from: J int
   private static int field_467 = 0;
   // $VF: renamed from: K int
   private static int field_468 = 0;
   // $VF: renamed from: g boolean
   private static boolean field_469 = false;
   // $VF: renamed from: L int
   private static int field_470 = 0;
   // $VF: renamed from: M int
   private static int field_471 = 0;
   // $VF: renamed from: h boolean
   private static boolean field_472 = false;
   // $VF: renamed from: N int
   private static int field_473 = 0;
   // $VF: renamed from: i boolean
   private static boolean field_474 = true;
   // $VF: renamed from: O int
   private static int field_475 = 0;
   // $VF: renamed from: P int
   private static int field_476 = 0;
   // $VF: renamed from: Q int
   private static int field_477 = 0;
   // $VF: renamed from: R int
   private static int field_478 = 0;
   // $VF: renamed from: S int
   private static int field_479 = 0;
   // $VF: renamed from: T int
   private static int field_480 = 0;
   // $VF: renamed from: U int
   private static int field_481 = 0;
   // $VF: renamed from: V int
   private static int field_482 = 0;

   // $VF: renamed from: a (int) boolean
   private static boolean method_470(int var0) {
      return var0 > 200;
   }

   // $VF: renamed from: a () void
   public static void method_471() {
      if (field_463 == null) {
         DataInputStream var0 = null;

         try {
            byte var1;
            field_463 = new int[var1 = (var0 = new DataInputStream(class_15.method_348("/mt"))).readByte()][][];

            for (int var2 = 0; var2 < var1; var2++) {
               byte var3 = var0.readByte();
               byte var4 = var0.readByte();
               field_463[var2] = new int[var4 + 1][];
               field_463[var2][0] = new int[]{var3};

               for (int var15 = 1; var15 <= var4; var15++) {
                  byte var5 = var0.readByte();
                  field_463[var2][var15] = new int[var5];
                  field_463[var2][var15][0] = var0.readByte() & 255;

                  for (int var6 = 3; var6 < var5; var6++) {
                     field_463[var2][var15][var6] = var0.readInt();
                  }
               }
            }

            return;
         } catch (Throwable var13) {
            var13.printStackTrace();
         } finally {
            try {
               var0.close();
            } catch (Throwable var12) {
            }
         }
      }
   }

   public class_18() {
      this.method_472();
   }

   public class_18(int var1) {
      this.method_477(var1, -1, false);
   }

   // $VF: renamed from: d () void
   private void method_472() {
      this.field_425 = 0;
      this.field_426 = 0;
      this.field_427 = 0;
      this.field_428 = 0;
      this.field_433 = 0;
      this.field_434 = 0;
      this.field_436 = false;
      this.field_437 = false;
      this.field_438 = 0;
      this.field_439 = -1;
      this.field_441 = 0;
      this.field_442 = -1;
      this.field_444 = -1;
      this.field_440 = -1;
      this.field_443 = -1;
      this.field_445 = -1;
      method_499(this);
      this.field_449 = -1;
      this.field_450 = 0;
      this.field_451 = 0;
      this.field_420 = 1;
      this.field_456 = false;
      this.field_452 = 0;
      this.field_453 = new int[8][];
      field_465 = false;
   }

   // $VF: renamed from: a (boolean) void
   public final void method_473(boolean var1) {
      if (!this.field_456) {
         label102: {
            this.field_455 = new Object[this.field_452];
            this.field_454 = new int[this.field_452 + 1];
            this.field_424 = 0;
            method_499(this);
            class_18 var2 = this;
            switch (this.field_420) {
               case 3:
                  var2.field_426 = var2.field_427 = 2 * class_15.method_408(113);
                  var2.field_425 = var2.field_428 = class_15.field_377 / 4;
                  var2.field_423 = false;
                  break label102;
               case 4:
                  var2.field_426 = var2.field_427 = class_15.method_408(113);
                  var2.field_425 = class_15.field_377 / 4;
                  var2.field_428 = class_15.field_377 / 4;
                  break;
               case 5:
                  int var3 = class_15.field_377 / 10;
                  var2.field_428 = var2.field_425 = var2.field_428 = var2.field_429 = var3;
                  break label102;
               default:
                  var2.field_426 = var2.field_427 = class_15.field_376 - class_15.method_408(13) >> 1;
                  var2.field_425 = class_15.method_409(12) + class_15.method_409(13);
                  if (!class_15.method_407(1) && !class_15.method_407(3)) {
                     var2.field_428 = class_15.method_409(151);
                  } else {
                     var2.field_428 = class_15.method_409(1);
                  }
            }

            var2.field_423 = true;
         }

         this.field_429 = this.field_425 + 4;
         this.field_430 = this.field_426 + 3;
         this.field_431 = class_15.field_376 - this.field_427 - 3;
         this.field_432 = class_15.field_377 - this.field_428;
         this.field_433 = this.field_431 - this.field_430;
         this.field_434 = this.field_432 - this.field_429;

         for (int var7 = 0; var7 < this.field_452; var7++) {
            Object var10002;
            label88: {
               int[] var8 = this.field_453[var7];
               int var10004 = var8[0];
               int[] var5 = var8;
               int var4 = var10004;
               int var13 = var7;
               class_18 var9 = this;
               Object var6 = null;
               switch (var4) {
                  case 101:
                  case 102:
                     var6 = var9.method_484(var13, class_15.method_424(var5[3]));
                     var5[1] = method_487(var6).length * class_15.method_401(1);
                     var10002 = var6;
                     break label88;
                  case 103:
                     var6 = var9.method_484(var13, class_22.method_590(var5[5], var5[3]));
                     var5[1] = method_487(var6).length * class_15.method_401(1);
                     var10002 = var6;
                     break label88;
                  case 104:
                     var6 = var9.method_485(var13, class_15.method_424(var5[5]), 1, var9.field_433);
                     var5[1] = method_487(var6).length * class_15.method_401(1) + class_15.method_409(var5[3]);
                     var10002 = var6;
                     break label88;
                  case 105:
                     int var11 = var5[3];
                     var5[1] = class_15.method_409(var11);
                     break;
                  case 106:
                     var5[1] = class_15.method_409(var5[3]);
                     if (var5[5] > 0) {
                        var5[1] = Math.max(var5[1], class_15.method_409(var5[5]));
                     }

                     if (var5[7] > 0) {
                        var5[1] = Math.max(var5[1], class_15.method_409(var5[7]));
                     }
                     break;
                  case 107:
                     var5[1] = 18;
                     break;
                  case 108:
                     int var10 = var5[3];
                     var13 = var5[4];
                     var4 = var5[5];
                     if (var10 == 43) {
                        var5[1] = (class_15.method_414(var10, var13) << 1) + Math.abs(class_15.method_415(var13, 5)) + Math.abs(class_15.method_410(var10, 6));
                     } else if (var10 == 41) {
                        var5[1] = class_15.method_409(25);
                     } else {
                        var5[1] = class_15.method_414(var10, var13)
                           + (var4 > 0 ? class_15.method_414(var10, var4) : 0)
                           + Math.abs(class_15.method_415(var13, 5))
                           + Math.abs(class_15.method_410(var10, 6));
                     }
                     break;
                  case 109:
                     var5[1] = var5[3];
                     break;
                  case 201:
                  case 203:
                     var5[1] = Math.max(class_15.method_401(2), class_15.method_409(165));
                     var5[1] = var5[1];
                     break;
                  case 202:
                     var5[1] = Math.max(class_15.method_401(2), class_15.method_409(165));
                     var5[1] = var5[1];
                     if (class_7.method_181(var5[5]) == 0) {
                        var5[6] = 1;
                        var5[4] = 2;
                     } else {
                        var5[4] = -1;
                     }
                     break;
                  case 205:
                     var5[1] = class_15.method_401(2);
                     var5[1] = var5[1];
                     if (var5[5] != -1) {
                        var5[6] = class_22.method_562(var5[5]);
                     }
                     break;
                  case 206:
                     var5[1] = class_15.method_401(2);
                     var5[1] = var5[1];
                     var5[1] += class_15.method_401(2);
                     var5[5] = class_22.method_562(var5[6]);
                     if (var5[9] == 0) {
                        var5[9] = (var5[4] - var5[3]) / var5[8];
                     } else {
                        var5[8] = (var5[4] - var5[3]) / var5[9];
                     }
                     break;
                  case 207:
                     var5[1] = class_15.method_409(104);
                     var5[1] = var5[1];
               }

               var10002 = null;
            }

            this.field_455[var7] = var10002;
         }

         if (this.field_442 == -1) {
            class_18 var12 = this;
            if (this.field_457 != null && var12.field_457.size() > 0) {
               this.field_442 = 4101;
               this.field_441 = 16519;
            }
         }

         this.method_492();
         if (this.field_424 > this.field_434) {
            this.field_436 = true;
            this.field_437 = false;
         }

         if (this.field_449 == -1) {
            this.field_449 = this.method_489();
         }

         this.method_490(this.field_449, -1);
         this.field_451 = this.field_450;
         this.field_456 = true;
      }
   }

   // $VF: renamed from: b (boolean) void
   public final void method_474(boolean var1x) {
      int var1 = this.field_449;
      int var2 = this.field_451;
      if (this.field_419 == -1) {
         boolean var3 = false;
         class_18 var5 = this;
         this.field_456 = false;
         var5.method_473(false);
      } else {
         this.method_477(this.field_419, -1, false);
      }

      this.method_490(var1, -1);
      this.field_451 = var2;
   }

   // $VF: renamed from: b () void
   public final void method_475() {
      this.method_477(39, -1, false);
   }

   // $VF: renamed from: a (int, int) void
   public final void method_476(int var1, int var2) {
      this.method_477(var1, var2, true);
   }

   // $VF: renamed from: a (int, int, boolean) void
   public final void method_477(int var1, int var2, boolean var3) {
      try {
         int var4 = this.field_419;
         if (var3 && var4 != -1) {
            class_18 var7 = this;
            if (this.field_457 == null) {
               var7.field_457 = new Stack();
            }

            var7.field_457.push(new Object[]{new Integer(var7.field_419), new Integer(var7.field_421), new Integer(var7.field_449), var7.field_422});
         }

         this.method_472();
         int[][] var8 = null;
         this.field_419 = var1;
         this.field_421 = var2;
         if (var1 != -1 && (var8 = field_463[var1]) != null) {
            this.field_420 = var8[0][0];

            for (int var6 = 1; var6 < var8.length; var6++) {
               int[] var10;
               if ((var10 = var8[var6])[0] >= 100) {
                  this.method_480(var10);
               } else {
                  switch (var10[0]) {
                     case 1:
                        this.field_439 = var10[3];
                        this.field_438 = var10[4];
                        break;
                     case 2:
                        this.field_442 = var10[3];
                        this.field_441 = var10[4];
                  }
               }
            }
         }

         method_498(this, var1);
         this.method_473(false);
      } catch (Exception var5) {
      }
   }

   // $VF: renamed from: c () void
   public final void method_478() {
      if (this.field_457 != null && this.field_457.size() > 0) {
         Object[] var1 = (Object[])this.field_457.pop();
         this.method_477((Integer)var1[0], (Integer)var1[1], false);
         this.method_490((Integer)var1[2], -1);
         this.field_422 = var1[3];
         this.field_451 = this.field_450;
      } else {
         class_22.method_574();
      }
   }

   // $VF: renamed from: a (int, int, int) void
   private void method_479(int var1, int var2, int var3) {
      if (var1 >= 0 && var1 < this.field_453.length && var2 >= 0 && var2 < this.field_453[var1].length) {
         this.field_453[var1][var2] = var3;
      }
   }

   // $VF: renamed from: a (int[]) void
   public final void method_480(int[] var1) {
      if (this.field_452 >= this.field_453.length) {
         int[][] var2 = new int[this.field_453.length + 4][];
         System.arraycopy(this.field_453, 0, var2, 0, this.field_453.length);
         this.field_453 = var2;
      }

      this.field_453[this.field_452] = var1;
      this.field_452++;
   }

   // $VF: renamed from: a (int[], int) void
   public final void method_481(int[] var1, int var2) {
      if (this.field_452 >= this.field_453.length) {
         int[][] var3 = new int[this.field_453.length + 4][];
         System.arraycopy(this.field_453, 0, var3, 0, this.field_453.length);
         this.field_453 = var3;
      }

      int var4 = this.field_452++;

      while (var4 > var2) {
         this.field_453[var4--] = this.field_453[var4];
      }

      this.field_453[var2] = var1;
   }

   // $VF: renamed from: a (int) void
   private void method_482(int var1) {
      this.field_452--;

      while (var1 < this.field_452) {
         this.field_453[var1++] = this.field_453[var1];
      }
   }

   // $VF: renamed from: a (int) int[]
   public final int[] method_483(int var1) {
      return this.field_453[var1];
   }

   // $VF: renamed from: a (int, java.lang.String) java.lang.Object
   private Object method_484(int var1, String var2) {
      return this.method_485(var1, var2, 1, this.field_433);
   }

   // $VF: renamed from: a (int, java.lang.String, int, int) java.lang.Object
   private Object method_485(int var1, String var2, int var3, int var4) {
      var3 = var1;
      Object var5 = null;
      if ((var5 = (Object[])this.field_455[var3]) == null) {
         var5 = new Object[2];
      }

      if (var2 == null && ((Object[])var5)[0] == null) {
         ((Object[])var5)[0] = null;
         ((Object[])var5)[1] = new String[0];
         return var5;
      }

      if (((Object[])var5)[0] != null) {
         ((Object[])var5)[1] = class_15.method_433((String)((Object[])var5)[0], class_15.method_398(1), var4);
      } else {
         ((Object[])var5)[0] = var2;
         ((Object[])var5)[1] = class_15.method_433(var2, class_15.method_398(1), var4);
      }

      return var5;
   }

   // $VF: renamed from: a (int) java.lang.String[]
   private String[] method_486(int var1) {
      return this.field_455[var1] == null ? null : (String[])((Object[])this.field_455[var1])[1];
   }

   // $VF: renamed from: a (java.lang.Object) java.lang.String[]
   private static String[] method_487(Object var0) {
      return var0 == null ? null : (String[])((Object[])var0)[1];
   }

   // $VF: renamed from: b (int) boolean
   private boolean method_488(int var1) {
      return method_470(this.field_453[var1][0]) || this.field_453[var1][1] > this.field_434 / 3 && this.field_424 > this.field_434;
   }

   // $VF: renamed from: a () int
   private int method_489() {
      int var1 = 0;

      for (int var2 = 0; var2 < this.field_452; var2++) {
         var1 += this.field_453[var2][1];
         if (this.method_488(var2) || var1 > this.field_434 / 3 && this.field_424 > this.field_434) {
            return var2;
         }
      }

      return 0;
   }

   // $VF: renamed from: b (int, int) void
   private void method_490(int var1, int var2) {
      if (this.field_452 > 0 && var1 < this.field_452) {
         int var3 = this.method_489();
         class_18 var4 = this;
         int var5 = 0;
         int var6 = var4.field_452 - 1;

         int var10000;
         while (true) {
            if (var6 < 0) {
               var10000 = var4.field_452 - 1;
               break;
            }

            var5 += var4.field_453[var6][1];
            if (var4.method_488(var6) || var5 > var4.field_434 / 3 && var4.field_424 > var4.field_434) {
               var10000 = var6;
               break;
            }

            var6--;
         }

         int var9 = var10000;
         if (var1 < var3) {
            var1 = var3;
         }

         if (var1 >= var9) {
            var1 = var9;
         }

         int[] var8 = this.field_453[this.field_449];
         int[] var10 = this.field_453[var1];
         var5 = var8[0];
         var6 = var10[0];
         int var7 = this.field_449;
         this.field_449 = var1;
         if (this.field_439 == -1 && method_470(var6)) {
            this.field_439 = 4102;
            this.field_438 = 16518;
         } else if (this.field_439 == 4102 && !method_470(var6)) {
            this.field_439 = -1;
         }

         method_501(var5, var8, false);
         method_501(var6, var10, true);
         this.method_492();
         if (method_470(var6)) {
            this.field_450 = this.field_454[var1] + var10[1] / 2;
         } else if (method_470(var5)) {
            this.field_450 = this.field_454[var1];
            if (var7 == var1 + 1 && var2 == 2) {
               this.field_450 = this.field_450 + var10[1];
            }
         }

         if (this.field_450 > this.field_424 - this.field_434 / 2) {
            this.field_450 = this.field_424 - this.field_434 / 2;
         }

         if (this.field_450 < this.field_434 / 2) {
            this.field_450 = this.field_434 / 2;
         }

         field_465 = false;
      }
   }

   // $VF: renamed from: c (int) boolean
   private boolean method_491(int var1) {
      int[] var2;
      if (((var2 = this.field_453[var1])[2] & 1) != 0) {
         return true;
      }

      switch (var2[0]) {
         case 201:
         case 202:
         case 203:
            class_22.method_577(var2[4], var2[5]);
            break;
         case 204:
         default:
            return method_502(var2[0], var2);
         case 205:
            int var3;
            if ((var3 = var2[4]) == 0) {
               var2[6] = 1 - var2[6];
               method_502(var2[0], var2);
            } else if (var2[6] == 0) {
               for (int var4 = 0; var4 < this.field_452; var4++) {
                  int[] var5 = this.field_453[var4];
                  if (var4 != var1 && var5[0] == 205 && var5[4] == var3) {
                     var5[6] = 0;
                     method_502(var2[0], var5);
                  }
               }

               var2[6] = 1;
               method_502(var2[0], var2);
            }
      }

      return true;
   }

   // $VF: renamed from: e () void
   private void method_492() {
      this.field_424 = 0;

      for (int var1 = 0; var1 < this.field_452; var1++) {
         int[] var2;
         if ((var2 = this.field_453[var1]) != null) {
            this.field_454[var1] = this.field_424;
            this.field_424 = this.field_424 + var2[1];
         }
      }

      this.field_454[this.field_452] = this.field_424;
   }

   // $VF: renamed from: a (int, boolean, boolean) boolean
   public final boolean method_493(int var1, boolean var2, boolean var3) {
      int[] row = this.field_453[this.field_449];
      boolean handled = false;
      switch (row[0]) {
         case 206:
            if (var1 == 3 || var1 == 4) {
               int value;
               if (var1 == 3) {
                  value = class_22.method_562(row[6]) - row[8];
                  if (value < row[3]) {
                     value = row[3];
                  }
               } else {
                  value = class_22.method_562(row[6]) + row[8];
                  if (value > row[4]) {
                     value = row[4];
                  }
               }

               row[5] = value;
               int partner = row[6] == 4 ? 5 : 4;

               for (int i = 0; i < this.field_452; i++) {
                  int[] other = this.field_453[i];
                  if (other[0] == 206 && other[6] == partner) {
                     class_22.method_563(other[6], other[3]);
                     other[5] = other[3];
                     break;
                  }
               }

               class_22.method_563(row[6], value);
               if (row[6] == 4) {
                  if (class_12.field_238 != null) {
                     class_15.method_457(row[6], class_15.method_352(2, 7));
                  } else {
                     class_15.method_457(row[6], 0);
                  }
               } else {
                  class_15.method_450();
                  class_15.method_457(row[6], 30);
               }

               handled = true;
            }
            break;
         case 207:
            if (var1 == 3) {
               if (--row[5] < 0) {
                  row[5] = 0;
               }

               handled = true;
            } else if (var1 == 4) {
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

      boolean result = false;
      switch (var1) {
         case 2:
            field_465 = false;
            if (this.field_452 != 0) {
               if (method_470(this.field_453[this.field_449][0])) {
                  if (!var3) {
                     int target = this.field_449 - 1;
                     if (target >= 0) {
                        int found = target;

                        for (int k = target; k > 0; k--) {
                           if (this.method_488(k)) {
                              found = k;
                              break;
                           }
                        }

                        target = found;
                     }

                     if (target < 0 || target < this.method_489()) {
                        target = this.field_452 - 1;
                     }

                     this.method_490(target, var1);
                  }
               } else {
                  this.field_450 -= 16;
                  if (this.field_434 > this.field_424) {
                     this.field_450 = this.field_434 / 2;
                     return true;
                  }

                  if (this.field_450 < this.field_454[this.field_449] || this.field_450 < this.field_434 / 2) {
                     if (this.field_449 > 0 && this.field_449 > this.method_489()) {
                        this.method_490(this.field_449 - 1, var1);
                     } else {
                        this.field_450 = this.field_434 / 2;
                     }
                  }
               }
            }
            break;
         case 5:
            field_465 = false;
            if (this.field_452 != 0) {
               if (method_470(this.field_453[this.field_449][0])) {
                  if (!var3) {
                     int target = this.field_449 + 1;
                     if (target < this.field_452) {
                        int found = target;

                        for (int k = target; k < this.field_452; k++) {
                           if (this.method_488(k)) {
                              found = k;
                              break;
                           }
                        }

                        target = found;
                     }

                     if (target >= this.field_452) {
                        target = 0;
                     }

                     this.method_490(target, var1);
                     return true;
                  }
               } else {
                  this.field_450 += 16;
                  if (this.field_434 > this.field_424) {
                     this.field_450 = this.field_434 / 2;
                     return true;
                  }

                  if (this.field_450 >= this.field_454[this.field_449 + 1] || this.field_450 > this.field_424 - this.field_434 / 2) {
                     if (this.field_449 < this.field_452 - 1) {
                        this.method_490(this.field_449 + 1, var1);
                     } else {
                        this.field_450 = this.field_424 - this.field_434 / 2;
                     }
                  }
               }
            }
            break;
         case 6:
            if (this.field_444 != -1 && !var3) {
               class_22.method_577(this.field_444, this.field_445);
               result = true;
            } else if (this.field_452 != 0 && !var3) {
               result = this.method_491(this.field_449);
            }
            break;
         case 7:
            if (this.field_439 == 4102) {
               if (!var3) {
                  this.method_491(this.field_449);
               }
            } else if (this.field_439 != -1) {
               class_22.method_577(this.field_439, this.field_440);
            }

            result = true;
            break;
         case 8:
            class_22.method_577(this.field_442, this.field_443);
            result = true;
            break;
      }

      return result;
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, java.lang.String, int, int, int, boolean) void
   private void method_494(Graphics var1, String var2, int var3, int var4, int var5, boolean var6) {
      if (var6 && !this.field_435 && class_22.method_573() == this) {
         if (!field_465) {
            field_465 = true;
            field_464 = class_15.method_421(field_464, var2, field_458, field_460, field_461, field_462, var3, var4, var5);
         }

         class_15.method_422(var1, field_464, var2, 2);
         class_15.method_393(var1);
      } else {
         var1.setClip(field_458, this.field_429, field_461, this.field_434);
         if (class_15.method_400(var2, class_15.method_398(2)) < field_461) {
            class_15.method_419(var1, field_458 + ((var3 & 1) != 0 ? field_461 / 2 : 0), field_460, var2, 2, var3, 1, var4, var5);
         } else {
            class_15.method_419(var1, field_458, field_460, var2, 2, var3 & -14 | 4, 1, var4, var5);
         }
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, java.lang.String, int, int, int, int, int, int) void
   private void method_495(Graphics var1, String var2, int var3, int var4, int var5, int var6, int var7, int var8) {
      String[] var12;
      (var12 = new String[1])[0] = var2;
      var4 = var8;
      var8 = var7;
      var7 = var6;
      String[] var13 = var12;
      Graphics var11 = var1;
      class_18 var9 = this;
      class_15.method_401(2);
      var5 = (var9.field_430 + var9.field_431) / 2;

      for (int var10 = 0; var10 < var13.length; var10++) {
         class_15.method_419(var11, var5, var4 + var10 * class_15.method_401(2), var13[var10], 2, 17, 1, var7, var8);
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, java.lang.String[], int, int, int, int, int) void
   private void method_496(Graphics var1, String[] var2, int var3, int var4, int var5, int var6, int var7) {
      var3 = class_15.method_401(1);
      var5 = field_458;
      var7 = field_459;
      if ((var4 & 1) != 0) {
         var5 = (this.field_430 + this.field_431) / 2;
      } else if ((var4 & 8) != 0) {
         var5 = this.field_431;
      }

      var1.setClip(var1.getClipX(), this.field_429, var1.getClipWidth(), this.field_434);

      for (int var8 = 0; var8 < var2.length; var8++) {
         if (var7 + var3 > this.field_429) {
            class_15.method_419(var1, var5, var7, var2[var8], 1, var4, 0, var6, 0);
         }

         if ((var7 += var3) > this.field_432) {
            return;
         }
      }
   }

   // $VF: renamed from: a (d) void
   public static void method_497(class_18 var0) {
      if (var0 != null) {
         switch (var0.field_420) {
            case 2:
               if (class_15.method_407(6)) {
                  int var1 = class_15.method_408(8) - var0.field_426;
                  if (field_481 < var1) {
                     field_482 = field_481 += 2;
                  }
               }
            default:
               if (class_15.method_407(6)) {
                  if (var0.field_420 != 2) {
                     int var2 = class_15.method_408(8) - var0.field_426;
                     if (field_481 > 0 && var2 > 0) {
                        field_482 = field_481 -= 2;
                     }
                  }

                  field_479 = class_15.field_376 + class_15.method_408(10);
                  field_480 = class_15.field_376 + class_15.method_408(11);
                  field_477 = class_15.field_376 - class_15.method_354(0, 0, field_479, class_22.field_581 % 6500, 6500);
                  field_478 = class_15.field_376 - class_15.method_354(0, 0, field_480, class_22.field_581 % 6000, 6000);
                  int var3 = class_15.method_410(8, 2);
                  if (field_468 >= 0) {
                     if (--field_467 <= 0) {
                        field_468--;
                        field_467 = class_15.method_352(3, 5);
                        if (++field_466 >= var3) {
                           field_466 = 0;
                        }
                     }
                  } else {
                     field_468 = class_15.method_352(5, 10);
                     field_467 = -1;
                  }

                  field_469 = false;
                  if (field_471 > 0) {
                     if (--field_470 <= 0) {
                        field_470 = class_15.method_352(5, 15);
                        field_471--;
                     }

                     if (field_471 % 2 == 0) {
                        field_469 = false;
                     } else {
                        field_469 = true;
                     }
                  }

                  if (--field_473 <= 0) {
                     field_473 = class_15.method_352(50, 100);
                     field_472 = !field_472;
                  }

                  if (--field_476 <= 0) {
                     if (field_474) {
                        field_476 = class_15.method_352(12, 25);
                     } else {
                        field_476 = class_15.method_352(200, 300);
                     }

                     field_474 = !field_474;
                     if (!field_472) {
                        field_475 += 2;
                     }

                     if (++field_475 >= class_15.method_410(5, 2)) {
                        field_475 = field_475 - class_15.method_410(5, 2);
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

   // $VF: renamed from: a (d, int) void
   private static void method_498(class_18 var0, int var1) {
      class_17.method_468(var0);
      switch (var1) {
         case 39:
            if (class_15.field_366) {
               var0.method_479(1, 3, 50);
               var0.method_479(1, 4, 16433);
            }

            class_15.method_445(0);
            return;
         case 40:
            var0.method_482(2);
            if (class_15.method_361(1)) {
               var0.method_479(0, 4, 16428);
            } else {
               var0.method_479(0, 4, 7);
               class_12.method_270();
            }

            if (class_15.method_361(3)) {
               var0.method_479(1, 4, 16427);
            } else {
               var0.method_479(1, 4, 16431);
            }

            if (class_15.field_366 && class_15.field_361 <= 0) {
               var0.method_482(1);
            }

            if (class_15.field_366 && class_15.field_362 <= 0) {
               var0.method_482(0);
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
            Vector var4;
            if ((var4 = class_15.method_425()) == null || var4.isEmpty()) {
               return;
            }

            for (int var2 = 0; var2 < var4.size(); var2++) {
               var0.method_480(new int[]{201, 0, 0, class_15.method_438((String)var4.elementAt(var2), false), 15, var2});
            }
            break;
         case 49:
            class_15.method_368(var0, 49);
            return;
         case 50:
            class_15.method_368(var0, 50);
            return;
         case 51:
            if (class_15.field_366) {
               var0.method_479(2, 4, 20530);
            } else if (class_22.method_567() == 2) {
               var0.method_479(2, 4, 20537);
            } else {
               var0.method_479(2, 4, 20536);
            }

            if (class_12.field_238 == null || class_12.field_238.field_30 == -1 || class_12.field_238.field_30 == 0) {
               var0.method_482(1);
               return;
            }
            break;
         case 54:
            class_22.method_564();
            return;
         case 55:
            var0.method_481(new int[]{101, 0, 0, class_15.method_437("(c) " + "29-04-2009 15:22:47".substring(6, 10)), 20}, 0);
            String var3 = class_22.field_580.getAppProperty("MIDlet-Version");
            var0.method_481(new int[]{101, 0, 0, class_15.method_437(class_15.method_424(263) + " " + var3), 20}, 3);
            var0.method_481(new int[]{109, 0, 0, 10}, 4);
            var0.method_481(new int[]{101, 0, 0, class_15.method_437(class_15.method_424(235)), 20}, 5);
            return;
      }
   }

   // $VF: renamed from: b (d) void
   private static void method_499(class_18 var0) {
      var0.field_446 = class_15.field_377;
      var0.field_447 = class_15.field_376;
      var0.field_448 = class_15.field_377;
   }

   // $VF: renamed from: a (d, int, int) void
   public static void method_500(class_18 var0, int var1, int var2) {
      switch (var1) {
         case 8:
            class_7.method_174(true);
            return;
         case 10:
            class_15.method_362(1);
            class_15.method_362(2);
            class_12.method_270();
            class_22.method_575(4, 0, 12290);
            return;
         case 11:
            class_15.method_362(3);
            class_22.method_569();
            class_22.method_573().field_442 = 16423;
            class_22.method_573().field_441 = 16519;
            return;
         case 12:
            class_12.method_256();
            class_12.method_263(3);
            class_22.method_577(2, -2);
            return;
         case 13:
            class_12.method_264();
            return;
         case 14:
            var1 = var0.field_452;
            for (var2 = 0; var2 < var1; ++var2) {
               int[] var4 = var0.field_453[var2];
               if (var4[0] != 207) {
                  continue;
               }
               switch (var4[3]) {
                  case 0:
                     class_3.field_45 = var4[5];
                     break;
                  case 1:
                     class_3.field_46 = var4[5];
                     break;
                  case 2:
                     class_3.field_47 = var4[5];
                     break;
               }
            }
            class_12.method_256();
            class_12.field_238 = new class_3(-1);
            class_22.method_575(3, 0, 12289);
            return;
         case 16:
            var0.method_477(40, -1, false);
            return;
         case 17:
            class_22.method_575(0, 0, 12288);
            return;
         case 18:
            class_22.method_577(24577, var2);
            return;
         default:
            return;
      }
   }

   // $VF: renamed from: a (int, int[], boolean) void
   private static void method_501(int var0, int[] var1, boolean var2) {
      switch (var0) {
         case 201:
         case 202:
         case 203:
            if (var2) {
               field_471 = class_15.method_424(var1[3]).length();
               field_470 = 0;
            }
         case 204:
         case 205:
         default:
            return;
         case 206:
      }
   }

   // $VF: renamed from: a (int, int[]) boolean
   private static boolean method_502(int var0, int[] var1) {
      switch (var0) {
         case 205:
            class_22.method_563(var1[5], var1[6]);
            class_15.method_456();
         default:
            return false;
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, d) void
   public static void method_503(Graphics var0, class_18 var1) {
      switch (var1.field_420) {
         case 4:
            class_15.method_370(var0);
            return;
         case 5:
            class_15.method_392(var0, 16777215);
            return;
         default:
            class_15.method_392(var0, class_15.method_397(9));
            int var2 = 0;
            int var3 = 0;
            var2 = class_15.method_409(12);
            if ((var3 = var1.field_433 + 3 + 3) < class_15.method_408(13)) {
               var3 = class_15.method_408(13) + 3 + 3;
            }

            var0.setColor(class_15.method_397(10));
            var0.fillRect((class_15.field_376 - var3) / 2, var2, var3, class_15.field_377 - var2);
            var0.setColor(class_15.method_397(11));
            var0.drawLine((class_15.field_376 - var3) / 2, var2, (class_15.field_376 - var3) / 2, class_15.field_377);
            var0.drawLine(
               class_15.field_376 - (class_15.field_376 - var3) / 2 - 1, var2, class_15.field_376 - (class_15.field_376 - var3) / 2 - 1, class_15.field_377
            );
            if (class_15.method_407(1)) {
               class_15.method_416(var0, class_15.field_376 >> 1, class_15.field_377, 9);
            }

            if (class_15.method_407(10)) {
               class_15.method_416(var0, field_477, class_15.field_377 / 3, 10);
               class_15.method_416(var0, field_478, class_15.field_377 / 5 + class_15.field_377 / 2, 11);
            }

            if (class_15.method_407(1)) {
               class_15.method_416(var0, 0, class_15.field_377, 1);
               class_15.method_416(var0, class_15.field_376, class_15.field_377, 3);
            }

            class_15.method_416(var0, class_15.field_376 >> 1, 0, 12);
            class_15.method_416(var0, class_15.field_376 >> 1, var2, 13);
            if (var3 > class_15.method_408(13)) {
               int var4 = var3 - class_15.method_408(13) >> 1;
               int var5 = class_15.method_413(13, 16385);

               for (int var6 = var1.field_430 - 3; var6 < var1.field_426 + var4 + var5; var6 += var5) {
                  class_15.method_418(var0, var6, var2, 13, 16385, 6);
                  class_15.method_418(var0, class_15.field_376 - var6 - 3 + 3, var2, 13, 16385, 10);
               }

               class_15.method_418(var0, var1.field_430 - 3, var2, 13, 16384, 6);
               class_15.method_418(var0, var1.field_430 + var3 - 3, var2, 13, 16386, 10);
            }

            if (class_15.method_407(6)) {
               class_15.method_416(var0, class_15.field_376, class_15.field_377, 4);
               class_15.method_417(var0, class_15.field_376, class_15.field_377, 5, field_475);
               class_15.method_416(var0, 0 - field_481, class_15.field_377 + field_482, 6);
               if (field_469) {
                  class_15.method_416(var0, 0 - field_481, class_15.field_377 + field_482, 7);
               }

               class_15.method_417(var0, 0 - field_481, class_15.field_377 + field_482, 8, field_466);
            }
      }
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics, d) void
   public static void method_504(Graphics var0, class_18 var1) {
      switch (var1.field_420) {
         case 3:
            var0.setColor(8421504);
            class_15.method_396(var0, 0, 0, class_15.field_376, class_15.field_377);
            class_15.method_394(
               var0,
               var1.field_430 - class_15.method_408(113),
               var1.field_429 - class_15.method_409(113),
               var1.field_433 + 2 * class_15.method_408(113),
               var1.field_434 + 2 * class_15.method_409(113),
               113
            );
            break;
         case 4:
            class_15.method_371(var0, var1);
      }

      Graphics var7 = var0;
      class_18 var6 = var1;
      class_18 var2 = var1;
      int var3 = var1.field_450;
      if (var2.field_451 - var3 == 1) {
         var2.field_451--;
      }

      if (var2.field_451 - var3 == -1) {
         var2.field_451++;
      }

      var2.field_451 = var2.field_451 + (var3 - var2.field_451) / 2;
      if (var2.field_435 = var2.field_451 != var2.field_450) {
         field_465 = false;
      }

      var2.field_437 = true;
      var2.field_436 = true;
      if (var2.field_451 <= var2.field_434 / 2) {
         var2.field_437 = false;
      }

      if (var2.field_451 >= var2.field_424 - var2.field_434 / 2 || var2.field_434 > var2.field_424) {
         var2.field_436 = false;
      }

      int var8 = var6.field_429 + var6.field_434 / 2 - var6.field_451;

      for (int var9 = 0; var9 < var6.field_452; var9++) {
         int[] var4;
         int var5 = (var4 = var6.field_453[var9])[1];
         if (var8 + var5 > var6.field_425) {
            field_458 = var6.field_430;
            field_459 = var8;
            field_460 = var8 + var5 / 2;
            field_461 = var6.field_433;
            field_462 = var5;
            var7.setClip(field_458, var8 < var6.field_429 ? var6.field_429 : var8, field_461, field_462);
            method_506(var7, var6, var8, var9, var4[0], (var4[2] & 1) == 0, var6.field_449 == var9, var4);
         }

         if ((var8 += var5) > var6.field_432) {
            break;
         }
      }

      var7.setClip(0, 0, class_15.field_376, class_15.field_377);
   }

   // $VF: renamed from: c (javax.microedition.lcdui.Graphics, d) void
   public static void method_505(Graphics var0, class_18 var1) {
      class_15.method_393(var0);
      switch (var1.field_420) {
         case 4:
            class_15.method_372(var0, var1);
            return;
         default:
            if (var1.field_436) {
               class_15.method_418(var0, class_15.field_376 / 2 + 2, class_15.field_377, 165, 2, 36);
            }

            if (var1.field_437) {
               class_15.method_418(var0, class_15.field_376 / 2 - 2, class_15.field_377, 165, 0, 40);
            }

            if (var1.field_439 != -1) {
               class_15.method_417(var0, 0, var1.field_446, 151, var1.field_438);
            }

            if (var1.field_442 != -1) {
               class_15.method_417(var0, var1.field_447, var1.field_448, 151, var1.field_441);
            }
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, d, int, int, int, boolean, boolean, int[]) void
   private static void method_506(Graphics var0, class_18 var1, int var2, int var3, int var4, boolean var5, boolean var6, int[] var7) {
      var0.setClip(var0.getClipX(), var1.field_429, var0.getClipWidth(), var1.field_434);
      switch (var4) {
         case 101:
         case 103:
            var1.method_496(var0, var1.method_486(var3), 1, var7[4], 0, class_15.method_397(15), 0);
            return;
         case 102:
            var1.method_496(var0, var1.method_486(var3), 1, var7[4], 0, 0, 0);
            return;
         case 104:
            int var39 = var7[3];
            int var46 = var7[4];
            field_458 = field_458 + (var1.field_433 - var1.field_430 >> 1);
            class_15.method_418(var0, (var1.field_430 + var1.field_431) / 2, var2, var39, var46, 17);
            field_459 = field_459 + class_15.method_409(var39);
            var1.method_496(var0, var1.method_486(var3), 1, 17, 0, class_15.method_397(15), 0);
            break;
         case 105:
            int var38 = var7[3];
            int var45 = var7[4];
            class_15.method_417(var0, var1.field_430, var2, var38, var45);
            return;
         case 106:
            int var36 = var1.field_430 + (var1.field_433 >> 1);
            int var44 = 0;
            if (var7[9] >= 1) {
               var3 = 3;

               while (--var3 >= 0) {
                  if (var7[3 + (var3 << 1)] > 0) {
                     var44 += class_15.method_408(var7[3 + (var3 << 1)]) + 2;
                  }
               }
            }

            var36 += var44 >> 1;
            var3 = 3;

            while (--var3 >= 0) {
               if (var7[3 + (var3 << 1)] > 0) {
                  if (var7[9] >= 1) {
                     var36 -= class_15.method_408(var7[3 + (var3 << 1)]) + 2;
                  }

                  class_15.method_418(var0, var36, var2, var7[3 + (var3 << 1)], var7[4 + (var3 << 1)], 20);
               }
            }

            return;
         case 107:
            int var34 = var1.field_430 + (var1.field_433 >> 1);
            byte var43 = 0;
            var3 = 3;

            while (--var3 >= 0) {
               if (var7[3 + (var3 << 1)] > 0) {
                  var43 += 18;
               }
            }

            var34 += var43 >> 1;
            var3 = 3;

            while (--var3 >= 0) {
               if (var7[3 + (var3 << 1)] > 0) {
                  var34 -= 18;
                  if (var7[3 + (var3 << 1)] != 1048576 && var7[3 + (var3 << 1)] != 983040) {
                     class_7.method_192(var0, var34, var2, var7[3 + (var3 << 1)] | 1, false);
                  } else {
                     class_7.method_193(
                        var0,
                        var34 + (var7[4 + (var3 << 1)] == 16487 ? -18 : 0),
                        var2,
                        var7[3 + (var3 << 1)],
                        false,
                        var7[4 + (var3 << 1)],
                        var7[4 + (var3 << 1)] == 16487
                     );
                     if (var7[4 + (var3 << 1)] == 16487) {
                        class_7.method_200(var0, var34 + 9, var2, 1048577, 2, (boolean)var5, 18);
                     }
                  }
               }
            }

            return;
         case 108:
            int var33 = var7[3];
            int var42 = var7[4];
            var3 = var7[5];
            int var12 = var1.field_430 + (var1.field_433 >> 1);
            var2 += var7[1];
            if (var3 > 0) {
               var2 -= 16;
               if (var33 == 47) {
                  var12 += 16;
               } else {
                  var2 -= 10;
                  var12 -= 16;
               }
            }

            if (var33 == 43) {
               class_15.method_417(var0, var12 + (class_15.method_408(43) >> 1), var2 - (class_15.method_409(43) >> 1), var33, var42);
               class_15.method_417(var0, var12 - (class_15.method_408(43) >> 1), var2 - (class_15.method_409(43) >> 1), var33, var42);
               class_15.method_417(var0, var12, var2 - class_15.method_409(43), var33, var42);
               class_15.method_417(var0, var12, var2, var33, var42);
               class_15.method_417(var0, var12 + (class_15.method_408(43) >> 1), var2 - (class_15.method_409(43) >> 1), 44, 16441);
               class_15.method_417(var0, var12 - (class_15.method_408(43) >> 1), var2 - (class_15.method_409(43) >> 1), 44, 16440);
               class_15.method_417(var0, var12, var2 - class_15.method_409(43), 44, 16439);
               class_15.method_417(var0, var12, var2, 44, 16442);
               return;
            }

            if (var33 == 41) {
               class_15.method_416(var0, var12, var2, 25);
               class_15.method_417(var0, var12, var2, var33, var42);
               return;
            }

            class_15.method_417(var0, var12, var2, var33, var42);
            if (var7[5] > 0) {
               int var10001 = var12 + (var33 == 47 ? -32 : 32);
               var2 += 16;
               class_15.method_417(var0, var10001, var2, var33, var3);
               return;
            }
            break;
         case 201:
         case 203:
         case 205:
            if (var4 == 205) {
               int var26 = class_15.method_408(151);
               class_15.method_418(var0, field_458, field_460, 0, var7[6] == 0 ? 1 : 0, 6);
               field_458 += var26 + 5;
               field_461 -= var26 + 5;
            } else if (var6) {
               int var27 = class_15.method_408(165);
               field_458 += var27;
               field_461 -= var27 << 1;
            }

            int var41;
            if (var5) {
               if (var6) {
                  if (var4 == 203) {
                     boolean var28 = false;
                     var41 = class_15.method_397(7);
                     var3 = class_15.method_397(8);
                  } else {
                     boolean var29 = false;
                     var41 = class_15.method_397(16);
                     var3 = class_15.method_397(17);
                  }
               } else if (var4 == 203) {
                  boolean var30 = false;
                  var41 = class_15.method_397(5);
                  var3 = class_15.method_397(6);
               } else {
                  boolean var31 = false;
                  var41 = class_15.method_397(12);
                  var3 = class_15.method_397(13);
               }
            } else {
               boolean var32 = false;
               var41 = class_15.method_397(12);
               var3 = class_15.method_397(13);
            }

            var1.method_494(var0, class_15.method_424(var7[3]), var4 != 205 ? 3 : 6, var41, var3, var6);
            if (var6) {
               int var10000 = class_15.method_400(class_15.method_424(var7[3]), class_15.method_398(2));
               boolean var10 = false;
               int var11;
               if ((var11 = var10000 / 2) > field_461 / 2) {
                  var11 = field_461 / 2 - 2;
               }

               var3 = class_22.field_581 / 100 % 5;
               int var5i = var7[1] - class_15.method_414(165, 3) >> 1;
               if (var4 != 205) {
                  class_15.method_418(var0, field_458 + field_461 / 2 - var11 - 5 + var3, var2 + var5i, 165, 1, 24);
                  class_15.method_418(var0, field_458 + field_461 / 2 + var11 + 5 - var3, var2 + var5i, 165, 3, 20);
               }

               return;
            }
            break;
         case 202:
            int var24 = var7[6] > 0 ? class_15.method_397(37) : class_15.method_397(35);
            var24 = var7[6] > 0 && class_12.field_255[var7[5]] ? class_15.method_397(34) : var24;
            var1.method_494(var0, class_15.method_424(var7[3]), 6, !var6 ? var24 : class_15.method_397(16), !var6 ? 16777215 : class_15.method_397(17), var6);
            return;
         case 206:
            field_460 = var2;
            int var23 = var7[5] * 100 / var7[4];
            var1.method_495(var0, var23 + "%", 2, 17, 1, class_15.method_397(var6 ? 16 : 12), class_15.method_397(var6 ? 17 : 13), field_460);
            field_459 = field_459 + class_15.method_401(2);
            int var40 = class_15.method_408(165);
            class_7.method_201(var0, var1.field_430 + var40, field_459, 0 | var23 / var7[9], var7[9], var6, var1.field_433 - (var40 << 1));
            if (var6) {
               if (var7[5] > var7[3]) {
                  class_15.method_418(var0, var1.field_430, field_459, 165, 3, 20);
               }

               if (var7[5] < var7[4]) {
                  class_15.method_418(var0, var1.field_430 + var1.field_433, field_459, 165, 16518, 24);
                  return;
               }
            }
            break;
         case 207:
            int var8 = class_15.method_408(var7[8]);
            class_15.method_416(var0, var1.field_430, field_459, var7[8]);
            class_15.method_416(var0, var1.field_430, field_459, var7[6]);
            class_15.method_418(var0, var1.field_431, field_459, var7[9], 0, 24);
            class_15.method_418(var0, var1.field_431, field_459, var7[7], 0, 24);
            int var9 = 0;
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

            class_7.method_201(var0, var1.field_430 + var8 + 2, field_459, var9 | var7[5], var7[4], var6, var1.field_433 - (var8 << 1) - 4);
            return;
      }
   }

   // $VF: renamed from: a () byte[]
   public static byte[] method_507() {
      byte[] var0;
      (var0 = new byte[8])[6] = 0;
      var0[7] = 0;
      var0[1] = 1;
      var0[2] = 0;
      var0[0] = 0;
      return var0;
   }
}
