import hg.class_22;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: f
public final class class_16 {
   // $VF: renamed from: b boolean
   private static boolean field_407;
   // $VF: renamed from: a int
   private static int field_408;
   // $VF: renamed from: b int
   private static int field_409;
   // $VF: renamed from: a boolean
   public static boolean field_410 = false;
   // $VF: renamed from: a l
   private static class_10 field_411 = new class_10();
   // $VF: renamed from: b l
   private static class_10 field_412 = new class_10();
   // $VF: renamed from: c int
   private static int field_413;
   // $VF: renamed from: d int
   private static int field_414;
   // $VF: renamed from: e int
   private static int field_415;
   // $VF: renamed from: f int
   private static int field_416;

   // $VF: renamed from: a () void
   public static void method_459() {
      field_408 = class_22.field_581 + class_15.method_352(10000, 20000);
      field_409 = class_15.method_352(150, 550);
      field_407 = false;
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics) void
   public static void method_460(Graphics var0) {
      switch (class_12.field_247) {
         case 1:
            int var8 = 65536
               + (Integer.MAX_VALUE - class_22.field_581) / 10
               + class_15.method_355(class_22.field_581 / 113) * class_15.method_408(14) / 65536
               - class_7.field_111 * 11 / 9;
            int var15 = 65536
               + class_22.field_581 / 7
               + class_15.method_356(class_22.field_581 / 89) * class_15.method_409(14) / 65536
               - class_7.field_112 * 11 / 9;
            var8 %= class_15.method_408(14);
            var15 %= class_15.method_409(14);

            for (int var20 = -class_15.method_408(14); var20 < class_15.field_376; var20 += class_15.method_408(14)) {
               for (int var23 = -class_15.method_409(14); var23 < class_15.field_377; var23 += class_15.method_409(14)) {
                  class_15.method_417(var0, var20 + var8, var23 + var15, 14, 0);
               }
            }

            var8 = 65536
               + (Integer.MAX_VALUE - class_22.field_581) / 14
               + class_15.method_355(class_22.field_581 / 43) * class_15.method_408(14) / 65536
               - class_7.field_111 * 10 / 9;
            var15 = 65536
               + class_22.field_581 / 5
               + class_15.method_356(class_22.field_581 / 79) * class_15.method_409(14) / 65536
               - class_7.field_112 * 10 / 9;
            var8 %= class_15.method_408(14);
            var15 %= class_15.method_409(14);

            for (int var21 = -class_15.method_408(14); var21 < class_15.field_376; var21 += class_15.method_408(14)) {
               for (int var24 = -class_15.method_409(14); var24 < class_15.field_377; var24 += class_15.method_409(14)) {
                  class_15.method_417(var0, var21 + var8, var24 + var15, 14, 1);
               }
            }

            return;
         case 2:
            label96: {
               if (class_22.field_581 > field_408) {
                  if (class_22.field_581 > field_408 + field_409) {
                     field_408 = class_22.field_581 + class_15.method_352(10000, 20000);
                     field_409 = class_15.method_352(150, 550);
                     field_407 = false;
                     method_463(class_22.field_581 + class_15.method_352(350, 1000), 8);
                  }

                  if (!class_15.method_353()) {
                     field_407 = false;
                     break label96;
                  }

                  if (!field_407) {
                     class_15.method_392(var0, 16777215);
                     field_407 = true;
                     break label96;
                  }

                  class_15.method_392(var0, class_15.method_353() ? 64 : 0);
               }

               field_407 = false;
            }

            int var1 = 65536
               + (Integer.MAX_VALUE - class_22.field_581) / 10
               + class_15.method_355(class_22.field_581 / 113) * class_15.method_408(14) / 65536
               - class_7.field_111 * 11 / 9;
            int var2 = 65536
               + class_22.field_581 / 7
               + class_15.method_356(class_22.field_581 / 89) * class_15.method_409(14) / 65536
               - class_7.field_112 * 11 / 9;
            var1 %= class_15.method_408(14);
            var2 %= class_15.method_409(14);

            for (int var3 = -class_15.method_408(14); var3 < class_15.field_376; var3 += class_15.method_408(14)) {
               for (int var4 = -class_15.method_409(14); var4 < class_15.field_377; var4 += class_15.method_409(14)) {
                  class_15.method_417(var0, var3 + var1, var4 + var2, 14, 0);
               }
            }

            var1 = 65536
               + (Integer.MAX_VALUE - class_22.field_581) / 8
               + class_15.method_355(class_22.field_581 / 13) * class_15.method_408(14) / 65536
               - class_7.field_111 * 10 / 9;
            var2 = 65536 + class_22.field_581 / 4 + class_15.method_356(class_22.field_581 / 79) * class_15.method_409(14) / 65536 - class_7.field_112 * 10 / 9;
            var1 %= class_15.method_408(14);
            var2 %= class_15.method_409(14);

            for (int var19 = -class_15.method_408(14); var19 < class_15.field_376; var19 += class_15.method_408(14)) {
               for (int var22 = -class_15.method_409(14); var22 < class_15.field_377; var22 += class_15.method_409(14)) {
                  class_15.method_417(var0, var19 + var1, var22 + var2, 14, 2);
               }
            }
      }
   }

   // $VF: renamed from: b () void
   public static void method_461() {
      if (class_22.field_581 - field_414 > 10000) {
         field_414 = class_22.field_581 + 10000;
         int var0 = field_415;
         field_415 = class_22.field_581 / 10 / 1000 / 15 % 4;
         field_416 = class_22.field_581 / 10 / 1000 / 60 % 12;
         if (field_415 == 0) {
            field_415 = 4;
         }

         if (field_416 == 0) {
            field_416 = 12;
         }

         if (var0 != field_415) {
            for (int var5 = 0; var5 < field_415; var5++) {
               method_463(class_22.field_581 + var5 * 1500, 11);
            }

            if (field_415 == 4) {
               for (int var6 = 0; var6 < field_416; var6++) {
                  method_463(class_22.field_581 + var6 * 1500 + 6000, 10);
               }
            }

            return;
         }

         var0 = Math.min(1000, class_4.field_85.size());
         int var1 = class_15.method_351(class_4.field_85.size());

         for (int var2 = 0; var2 < var0; var2++) {
            class_4 var3;
            int var7;
            if ((var3 = (class_4)class_4.field_85.elementAt((var2 + var1) % class_4.field_85.size())).field_75
               && var3.method_64() > 0
               && var3.method_82()
               && (var7 = class_4.method_108(var3.field_62)) != -1) {
               method_463(class_22.field_581, var7);
               return;
            }
         }

         if (class_12.field_247 == 0) {
            method_463(class_22.field_581, class_15.method_353() ? 16 : 17);
         }
      }
   }

   // $VF: renamed from: c () void
   public static void method_462() {
      if (class_22.field_581 - field_413 > 100) {
         field_413 = class_22.field_581 + 100;
         if (field_412.field_232 > 0 && field_412.method_248() < class_22.field_581) {
            field_412.method_250(0);
            int var0 = field_411.method_248();
            field_411.method_250(0);
            if (var0 >= 0) {
               class_15.method_447(var0);
               return;
            }

            class_15.method_448(2);
            method_463(class_22.field_581 + 120000, Integer.MIN_VALUE);
         }
      }
   }

   // $VF: renamed from: a (int, int) void
   public static void method_463(int var0, int var1) {
      if (!field_410) {
         int var2 = 0;

         for (var2 = 0; var2 < field_412.field_232; var2++) {
            int var3;
            if ((var3 = field_412.method_247(var2)) < var0 && var3 + 500 > var0) {
               if (class_15.method_444(field_411.method_247(var2)) < class_15.method_444(var1)) {
                  field_412.method_249(var0, var2);
                  field_411.method_249(var1, var2);
                  return;
               }

               field_412.method_251(var0, var2);
               field_411.method_251(var1, var2);
               return;
            }

            if (var3 > var0) {
               break;
            }
         }

         field_412.method_251(var0, var2);
         field_411.method_251(var1, var2);
      }
   }

   // $VF: renamed from: d () void
   public static void method_464() {
      field_411.method_253();
      field_412.method_253();
      field_413 = class_22.field_581 + 500;
      field_414 = class_22.field_581 + 10000;
      field_415 = class_22.field_581 / 10 / 1000 / 15 % 4;
      field_416 = class_22.field_581 / 10 / 1000 / 60 % 12;
      if (field_415 == 0) {
         field_415 = 4;
      }

      if (field_416 == 0) {
         field_416 = 12;
      }
   }
}
