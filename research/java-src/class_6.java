import hg.class_22;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: p
public final class class_6 {
   // $VF: renamed from: a n
   private static class_8 field_108 = null;

   // $VF: renamed from: a () void
   public static void method_115() {
      switch (class_22.method_567()) {
         case 0:
            if (class_22.method_572()) {
               class_22.method_573().method_475();
               return;
            }

            class_22.method_571(new class_18(39));
            return;
         case 1:
            class_12.method_259();
            class_15.method_373();
            return;
         case 2:
            class_7.method_183();
      }
   }

   // $VF: renamed from: b () void
   public static void method_116() {
      class_22.method_571(new class_18(53));
   }

   // $VF: renamed from: a (int) int
   public static int method_117(int var0) {
      switch (var0) {
         case 0:
            class_15.method_453(0);
            class_15.method_454(30);
            class_15.method_405(32, false);
            class_15.method_405(64, false);
            class_15.method_405(8, false);
            class_15.method_405(4, false);
            class_15.method_405(2, false);
            class_15.method_405(1, true);
            class_15.method_405(128, true);
            class_15.method_404(165, true);
            class_15.method_404(151, true);
            class_15.method_404(149, true);
            class_15.method_404(150, true);
            class_15.method_404(113, true);
         case 1:
         default:
            break;
         case 2:
            class_15.method_405(1, true);
            class_15.method_405(128, true);
            class_15.method_404(165, true);
            class_15.method_404(151, true);
            class_15.method_404(149, true);
            class_15.method_404(150, true);
            class_15.method_404(113, true);
            break;
         case 3:
            class_15.method_405(1, false);
            class_15.method_404(12, true);
            class_15.method_404(13, true);
            class_15.method_405(2, false);
            class_15.method_405(32, true);
            class_15.method_405(64, true);
            class_15.method_405(1024, true);
            class_15.method_405(256, true);
            class_15.method_405(512, true);
            class_15.method_405(8, true);
            class_15.method_405(4, true);
            class_15.method_405(128, true);
            class_15.method_453(2);
            class_15.method_453(3);
            class_15.method_453(4);
            break;
         case 4:
            class_15.method_405(32, false);
            class_15.method_405(64, false);
            class_15.method_405(8, false);
            class_15.method_405(1, false);
            class_15.method_404(12, true);
            class_15.method_404(13, true);
            class_15.method_405(2, true);
            class_15.method_405(4, true);
            class_15.method_405(128, true);
            class_15.method_453(0);
            class_15.method_453(5);
      }

      class_15.method_405(16, true);
      return -1;
   }

   // $VF: renamed from: a (int) void
   public static void method_118(int var0) {
      switch (var0) {
         case 1:
            class_12.method_257();
            return;
         case 2:
            class_7.method_173();
      }
   }

   // $VF: renamed from: a (int, int) void
   public static void method_119(int var0, int var1) {
      switch (var0) {
         case 2:
            if (var1 != -2) {
               class_12.method_256();
               class_12.field_238 = new class_3(var1);
            }

            class_22.method_575(3, 0, 12289);
            return;
         case 4:
            class_12.method_260(false);
            return;
         case 5:
            class_12.method_260(true);
            return;
         case 7:
            if (class_12.field_238 != null) {
               class_12.method_261(false);
            }

            class_22.method_575(4, 0, 12290);
            return;
         case 15:
            var1 = class_22.method_573().field_449;
            class_15.method_425().elementAt(var1);
            class_15.method_426(var1);
            class_22.method_575(1, 0, 6145);
            return;
         case 19:
            class_22.method_563(0, 0);
            if (class_22.method_562(4) == 0 && class_22.method_562(5) == 0) {
               class_22.method_563(4, 100);
            }

            class_22.method_562(4);
            class_22.method_577(6147, 0);
            return;
         case 20:
            class_22.method_563(4, 0);
            class_22.method_563(5, 0);
            class_22.method_577(6147, 0);
         case 3:
         case 6:
         case 8:
         case 9:
         case 10:
         case 11:
         case 12:
         case 13:
         case 14:
         case 16:
         case 17:
         case 18:
      }
   }

   // $VF: renamed from: a (int, boolean, boolean) boolean
   public static boolean method_120(int var0, boolean var1, boolean var2) {
      var1 = false;
      switch (class_22.method_567()) {
         case 1:
            if (!(var1 = class_7.method_161(var0, var2)) && var0 == 8) {
               var1 = true;
               class_22.method_568(51);
            }
            break;
         case 2:
            var1 = class_7.method_190(var0);
      }

      return var1;
   }

   // $VF: renamed from: a (int) boolean
   public static boolean method_121(int var0) {
      boolean var1 = false;
      switch (class_22.method_567()) {
         case 1:
            var1 = class_7.method_162(var0);
            break;
         case 2:
            var1 = class_7.method_189();
      }

      return var1;
   }

   // $VF: renamed from: a (long) void
   public static void method_122(long var0) {
      if (var0 == 1999077922L) {
         int var3 = 300 - class_14.field_355.size();

         for (int var1 = 0; var1 < var3; var1++) {
            class_15.method_387(class_14.method_332(4));
         }

         class_22.method_565(false);
      } else if (var0 != 8118418552691L) {
         if (var0 == 493093L) {
            class_12.method_291();
            class_22.method_565(false);
         } else if (var0 == 31074L) {
            class_12.method_285(720896 | class_14.field_347.size());
            class_22.method_565(false);
         } else if (var0 == 468807L) {
            class_21.method_561(false);
            class_22.method_565(false);
         } else if (var0 == 22886L) {
            class_21.method_561(true);
            class_22.method_565(false);
         } else if (var0 == 3704947L) {
            class_12.field_259 = Math.min(++class_12.field_259, class_12.field_261);
            class_22.method_565(false);
         } else if (var0 == 5474150L) {
            class_12.field_259 = class_12.field_261;
            class_22.method_565(false);
         } else if (var0 == 8939330L) {
            class_12.field_259 = class_12.field_261 = class_21.field_563.length;
            class_22.method_565(false);
         } else if (var0 == 354438L) {
            class_12.method_286(new int[]{1115112});
            class_22.method_565(false);
         } else if (var0 == 2564936L) {
            class_14.method_333(0, 5);
            class_22.method_565(false);
         } else if (var0 == 468518L) {
            class_14.method_333(2, 5);
            class_22.method_565(false);
         } else if (var0 == 341574L) {
            class_14.method_333(3, 5);
            class_22.method_565(false);
         } else if (var0 == 230034L) {
            class_12.field_284 = 0;
            class_22.method_565(false);
         } else if (var0 == 402018L) {
            class_12.field_284 = 100;
            class_22.method_565(false);
         } else if (var0 == 3351863L) {
            class_12.method_302();
            class_22.method_565(false);
         } else if (var0 == 5457446L) {
            class_12.method_303();
            class_22.method_565(false);
         } else if (var0 == 9725495L) {
            class_22.method_565(false);
            class_12.method_261(true);
         } else if (var0 == 354103L) {
            class_22.method_565(false);
            class_12.method_261(false);
         } else if (var0 == 600419L) {
            class_12.field_258 = (byte)(class_12.field_258 + 10);
            class_22.method_565(false);
         } else if (var0 == 7751303L) {
            class_12.field_257 = (byte)(class_12.field_257 + 10);
            class_22.method_565(false);
         }
      } else {
         for (int var2 = 0; var2 < class_12.field_255.length; var2++) {
            class_12.field_255[var2] = true;
            class_12.field_254[var2] = 0;
         }

         class_22.method_565(false);
         class_12.method_261(true);
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics) void
   public static void method_123(Graphics var0) {
      switch (class_22.method_567()) {
         case 1:
            class_12.method_262(var0);
            return;
         case 2:
            class_7.method_184(var0);
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int) void
   public static void method_124(Graphics var0, int var1, int var2) {
      var0.setColor(0);
      if (var2 == 40) {
         var0.fillRect(0, 0, class_15.field_376, class_15.field_377);
      } else {
         var1 = var2 == 0 ? 0 : class_15.field_377 * var2 / 40 / 2;
         var0.fillRect(0, 0, class_15.field_376, var1);
         var0.fillRect(0, class_15.field_377 - var1, class_15.field_376, var1);
      }
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics) void
   public static void method_125(Graphics var0) {
      class_22.method_583(var0);

      for (int var1 = 0; var1 < class_15.field_376; var1 += class_15.method_408(15)) {
         for (int var2 = 0; var2 < class_15.field_377; var2 += class_15.method_409(15)) {
            class_15.method_416(var0, var1, var2, 15);
         }
      }

      if (class_22.field_598) {
         if (field_108 == null) {
            int var4 = 0
               + class_15.method_433(class_15.method_424(233), class_15.method_398(2), class_15.field_376 - 10).length
               + class_15.method_433(class_15.method_424(234), class_15.method_398(2), class_15.field_376 - 10).length;
            var4++;
            (field_108 = new class_8(class_15.field_376 - 10, class_15.method_401(2) * var4, 0))
               .method_233(class_15.method_424(233), new int[]{3, -1, -1, 2, 1, 16777215, 0});
            field_108.method_233(class_15.method_424(234), new int[]{3, -1, -1, 2, 1, 16777215, 0});
            field_108.method_233(class_15.method_424(class_22.method_591(1)), new int[]{3, -1, -1, 2, 1, 16777215, 0});
            return;
         }

         if (class_12.field_238 != null) {
            int var3;
            int var6 = class_15.method_433(
               class_15.method_424(var3 = class_12.field_238.field_30 >= 0 ? 65672 + class_12.field_238.field_30 : 126),
               class_15.method_398(2),
               class_15.field_376 - 10
            ).length;
            class_8 var7;
            (var7 = new class_8(class_15.field_376 - 10, class_15.method_401(2) * var6, 0))
               .method_233(class_15.method_424(var3), new int[]{3, -1, -1, 2, 1, 16777215, 0});
            var7.method_234(var0, class_15.field_376 >> 1, 0, 17);
         }

         field_108.method_234(var0, class_15.field_376 >> 1, class_15.field_377 >> 1, 3);
      }
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics, int, int) void
   public static void method_126(Graphics var0, int var1, int var2) {
      int var3 = class_15.field_377 / 13;
      int var4 = (class_15.field_376 << 1) / 3;
      int var5 = (class_15.field_376 - var4) / 2;
      int var6 = (class_15.field_377 << 1) / 3 - var3;
      var2 = var4 * var2 / 100;
      switch (var1) {
         case 0:
         case 1:
         case 2:
         case 3:
         case 4:
            class_15.method_392(var0, 0);
            var1 = var4 / 3;
            var0.setColor(8037626);
            var0.drawRect(var5 - 1, var6 - 1, var1, var3 + 1);
            var0.setColor(16053492);
            var0.drawRect(var5 + var1, var6 - 1, var1, var3 + 1);
            var0.setColor(14040615);
            var0.drawRect(var5 + (var1 << 1), var6 - 1, var1, var3 + 1);
            var0.setClip(var5, var6, var2, var3);
            var0.setColor(8037626);
            var0.fillRect(var5, var6, var1, var3);
            var0.setColor(16053492);
            var0.fillRect(var5 + var1, var6, var1, var3);
            var0.setColor(14040615);
            var0.fillRect(var5 + (var1 << 1), var6, var1, var3);
            var0.setClip(0, 0, class_15.field_376, class_15.field_377);
            if (class_22.field_598) {
               class_15.method_419(var0, class_15.field_376 / 2, class_15.field_377 / 2, class_15.method_424(228), 1, 3, 0, 16053492, 16053492);
               return;
            }
            break;
         case 5:
            class_15.method_392(var0, 0);
            var0.setColor(-1);
            class_15.method_419(var0, class_15.field_376 / 2, class_15.field_377 / 2, class_15.method_424(228), 2, 3, 0, -1, -1);
      }
   }

   private class_6() {
   }
}
