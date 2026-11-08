import hg.class_22;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: j
public final class class_12 {
   // $VF: renamed from: a u
   public static class_3 field_238;
   // $VF: renamed from: o int
   private static int field_239;
   // $VF: renamed from: a int
   public static int field_240;
   // $VF: renamed from: p int
   private static int field_241;
   // $VF: renamed from: q int
   private static int field_242;
   // $VF: renamed from: r int
   private static int field_243;
   // $VF: renamed from: b int
   public static int field_244;
   // $VF: renamed from: c int
   public static int field_245;
   // $VF: renamed from: a boolean
   public static boolean field_246;
   // $VF: renamed from: d int
   public static int field_247;
   // $VF: renamed from: s int
   private int field_248;
   // $VF: renamed from: t int
   private int field_249;
   // $VF: renamed from: u int
   private int field_250;
   // $VF: renamed from: a java.lang.Integer
   private Integer field_251;
   // $VF: renamed from: a byte[]
   public static byte[] field_252 = new byte[]{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
   // $VF: renamed from: b byte[]
   public static byte[] field_253 = new byte[]{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
   // $VF: renamed from: c byte[]
   public static byte[] field_254 = new byte[]{-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1};
   // $VF: renamed from: a boolean[]
   public static boolean[] field_255 = new boolean[]{
      false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false
   };
   // $VF: renamed from: e int
   public static int field_256 = 0;
   // $VF: renamed from: a byte
   public static byte field_257 = 0;
   // $VF: renamed from: b byte
   public static byte field_258 = 0;
   // $VF: renamed from: f int
   public static int field_259 = 0;
   // $VF: renamed from: g int
   public static int field_260 = 0;
   // $VF: renamed from: h int
   public static int field_261 = 0;
   // $VF: renamed from: v int
   private static int field_262 = 0;
   // $VF: renamed from: i int
   public static int field_263;
   // $VF: renamed from: j int
   public static int field_264;
   // $VF: renamed from: w int
   private static int field_265;
   // $VF: renamed from: k int
   public static int field_266;
   // $VF: renamed from: l int
   public static int field_267;
   // $VF: renamed from: a java.util.Vector
   public static Vector field_268 = new Vector();
   // $VF: renamed from: c java.util.Vector
   private static Vector field_269 = new Vector();
   // $VF: renamed from: b java.util.Vector
   public static Vector field_270 = new Vector();
   // $VF: renamed from: e int[]
   private static int[] field_271 = new int[21];
   // $VF: renamed from: f int[]
   private static int[] field_272 = new int[21];
   // $VF: renamed from: g int[]
   private static int[] field_273 = new int[21];
   // $VF: renamed from: h int[]
   private static int[] field_274 = new int[21];
   // $VF: renamed from: i int[]
   private static int[] field_275;
   // $VF: renamed from: j int[]
   private static int[] field_276;
   // $VF: renamed from: m int
   public static int field_277;
   // $VF: renamed from: b boolean
   public static boolean field_278 = false;
   // $VF: renamed from: x int
   private static int field_279;
   // $VF: renamed from: y int
   private static int field_280;
   // $VF: renamed from: z int
   private static int field_281;
   // $VF: renamed from: A int
   private static int field_282;
   // $VF: renamed from: B int
   private static int field_283;
   // $VF: renamed from: n int
   public static int field_284;
   // $VF: renamed from: a int[]
   public static int[] field_285 = new int[]{32, 48, 96, 16, 144, 80, 112, 128, 64, 192, 176, 160, -1, -1, -1, -1, -1, 0, -1, -1, -1};
   // $VF: renamed from: b int[]
   public static int[] field_286 = new int[]{80, 87, 75, 78, 76, 91, 83, 74, 86, 90, 92, 81, 84, 85, 77, 93, 89, 79, 89, 82, 88};
   // $VF: renamed from: c int[]
   public static int[] field_287 = new int[]{101, 142, 133, 136, 134, 146, 139, 132, 103, 145, 147, 138, 140, 141, 135, 135, 103, 137, 144, 102, 143};
   // $VF: renamed from: d int[]
   public static int[] field_288 = new int[]{98, 126, 117, 120, 118, 130, 97, 116, 100, 129, 131, 122, 124, 125, 119, 119, 100, 121, 128, 99, 127};

   // $VF: renamed from: a (int) void
   public static void method_254(int var0) {
      field_247 = var0;
      switch (var0) {
         case 0:
            return;
         case 1:
            return;
         case 2:
            class_16.method_459();
      }
   }

   // $VF: renamed from: m () void
   private static void method_255() {
      field_238 = null;
      class_4.method_92();
      class_2.method_42();
      class_13.method_314();
      class_1.method_15();
      class_14.method_338();
      class_20.method_515();
      field_268.removeAllElements();
      field_269.removeAllElements();
      field_270.removeAllElements();
      field_267 = 0;
      class_16.method_464();
      class_7.method_171();
      System.gc();
   }

   // $VF: renamed from: a () void
   public static void method_256() {
      method_255();
      field_284 = 110;
      field_277 = 0;
      field_264 = 0;
      field_263 = 0;
      class_21.method_539(true);

      for (int var0 = 0; var0 < field_271.length; var0++) {
         field_271[var0] = 0;
      }

      field_278 = false;

      for (int var1 = 0; var1 < field_271.length; var1++) {
         field_274[var1] = 0;
         field_273[var1] = 0;
         field_272[var1] = 0;
      }

      field_275 = null;
      field_276 = null;
      method_304(-1, 0, 0, 0, 0);
      class_15.method_378(-1, 0, 0, 0, 5, 0, 0, 0);
      field_246 = true;
   }

   // $VF: renamed from: b () void
   public static void method_257() {
      class_7.field_156 = class_21.method_558();
      class_7.field_157 = class_21.method_559();
      class_7.method_169();
      if (!field_238.field_32) {
         field_240 = 0;
         field_245 = 0;
         field_241 = 0;
         field_239 = 0;
         field_247 = 0;
         class_21.method_547();
      }

      field_244 = 1;
      class_16.method_463(Integer.MIN_VALUE, Integer.MIN_VALUE);
      field_238.field_31 = true;
      field_238.field_32 = false;
   }

   // $VF: renamed from: c () void
   public static void method_258() {
      if (!class_16.field_410) {
         class_16.field_410 = true;
         class_7.method_154(-1);
         field_244 = 1;
         field_242 = field_239;
         if (class_4.field_58 != null) {
            field_239 = field_239 + ((field_245 + 1) * 90000 - field_240);
         }

         field_243 = (field_239 - field_242) / 100;
         field_242 = 0;
      }
   }

   // $VF: renamed from: d () void
   public static void method_259() {
      field_239 += 50;
      class_13.method_306();
      class_3.method_59();
      class_16.method_462();
      class_16.method_461();

      while (field_239 - field_241 > 100) {
         if (class_4.field_58 != null) {
            for (int var0 = 0; var0 < field_244; var0++) {
               class_14.method_330();
               class_20.method_514();
               field_240 += 100;
            }
         }

         field_241 += 100;
         if (field_239 - field_241 <= 100) {
            for (int var1 = 0; var1 < field_270.size(); var1++) {
               if (!((class_12)field_270.elementAt(var1)).method_266()) {
                  class_21.method_549();
               }
            }

            if (field_268.size() > 0) {
               int var2 = 0;

               while (true) {
                  if (var2 >= field_268.size()) {
                     class_21.method_548();
                     break;
                  }

                  if (!((class_12)field_268.elementAt(var2)).method_266()) {
                     break;
                  }

                  var2++;
               }
            }
         }

         if (field_242++ % 30 == 0) {
            return;
         }
      }

      int var3 = field_245;
      if ((field_245 = field_240 / 90000) > var3) {
         class_2.method_22();
         if (field_238 != null && field_238.field_43 >= 0) {
            if (class_15.method_351(100) < field_238.field_43) {
               method_254(1);
            } else if (class_15.method_351(100) < field_238.field_44) {
               method_254(2);
            } else {
               method_254(0);
            }
         }

         class_14.method_331();
         class_21.method_551();
         if (field_283 != -1) {
            if (field_278) {
               if (field_245 >= field_283) {
                  field_283 = field_245 + class_15.method_352(field_279, field_280);
                  method_303();
               }
            } else if (field_245 >= field_283) {
               field_283 = field_245 + class_15.method_352(field_281, field_282);
               method_302();
            }
         }

         class_15.method_380();
         class_1.method_5();
      }

      if (field_238 != null) {
         class_7.method_130();
         class_7.method_127();
         if (field_238 != null) {
            class_7.method_156();
            class_7.method_129();
            if (class_16.field_410) {
               class_16.field_410 = false;
               class_7.method_154(0);
            }
         }
      }
   }

   // $VF: renamed from: a (boolean) void
   public static void method_260(boolean var0) {
      if (var0) {
         if (class_22.method_567() == 2) {
            if (!class_15.method_375()) {
               method_271();
            }
         } else {
            if (field_238 != null && field_238.field_30 != -1 && !class_15.method_375()) {
               method_271();
            }

            class_15.method_362(field_238.field_30 == -1 ? 3 : 2);

            try {
               DataOutputStream var4 = class_15.method_364(field_238.field_30 == -1 ? 3 : 2);
               field_238.method_61(var4);
               class_4.method_109(var4);
               class_14.method_341(var4);
               DataOutputStream var1 = var4;
               method_290();
               class_15.method_349(var1, field_271);
               class_15.method_349(var1, field_272);
               class_15.method_349(var1, field_273);
               var1.writeInt(field_277);
               var1.writeInt(field_284);
               var1.writeBoolean(field_278);
               var1.writeInt(field_283);
               var1.writeInt(field_279);
               var1.writeInt(field_280);
               var1.writeInt(field_281);
               var1.writeInt(field_282);
               class_15.method_349(var1, field_276);
               class_15.method_349(var1, field_275);
               var1.writeInt(field_259);
               var1.writeInt(field_260);
               var1.writeInt(field_261);
               class_15.method_388(var4);
               var1 = var4;
               var4.writeInt(field_265);
               var1.writeInt(field_266);
               var1.writeInt(field_267);
               var1.writeInt(field_268.size());

               for (int var2 = 0; var2 < field_268.size(); var2++) {
                  ((class_12)field_268.elementAt(var2)).method_267(var1);
               }

               var1.writeInt(field_269.size());

               for (int var6 = 0; var6 < field_269.size(); var6++) {
                  ((class_12)field_269.elementAt(var6)).method_267(var1);
               }

               var1.writeInt(field_270.size());

               for (int var7 = 0; var7 < field_270.size(); var7++) {
                  ((class_12)field_270.elementAt(var7)).method_267(var1);
               }

               for (int var8 = 0; var8 < class_21.field_564.length; var8++) {
                  var1.writeBoolean(class_21.field_564[var8]);
               }

               var1.writeBoolean(field_246);
               class_20.method_527(var4);
               var4.writeInt(field_240);
               var4.writeInt(field_245);
               var4.writeInt(field_239);
               var4.writeInt(field_247);
               class_15.method_365();
            } catch (IOException var3) {
               var3.getMessage();
               class_15.method_362(field_238.field_30 == -1 ? 3 : 2);
            }
         }
      }

      method_255();
      class_22.method_575(0, 0, 12288);
   }

   // $VF: renamed from: b (boolean) void
   public static void method_261(boolean var0) {
      if (field_238.field_30 != -1) {
         class_15.method_362(2);
      }

      label34: {
         int var1 = field_238.field_30;
         if (var0) {
            if (var1 < 0 || var1 >= field_255.length) {
               class_22.method_575(0, 0, 12288);
               break label34;
            }

            if (!class_21.method_543()) {
               class_15.method_374();
               int var0i = var1;
               class_7.field_180 = false;
               class_7.field_178 = var0i + 1;
               class_7.field_179 = var0i + 1;
               field_252[var0i] = 0;
               field_255[var0i] = true;
               field_254[var0i] = 0;
               field_262 = field_259;
               if (++field_261 >= class_21.field_562.length) {
                  field_261 = class_21.field_562.length;
               }

               field_257 = (byte)(field_257 + class_21.field_501[var0i]);
               field_258 = (byte)(field_258 + Math.min(class_14.field_349.size(), 3));
               if (!class_15.method_375()) {
                  method_271();
               }
            } else {
               class_15.method_362(1);
            }

            if (!class_15.method_376()) {
               class_22.method_568(50);
               break label34;
            }
         }

         class_22.method_575(4, 0, 12290);
      }

      method_255();
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics) void
   public static void method_262(Graphics var0) {
      class_15.method_392(var0, 3158016);
      field_238.method_58(var0);
      class_7.method_152(var0);
      if (class_16.field_410) {
         for (int var1 = 0; var1 < class_15.field_376; var1 += class_15.method_408(15)) {
            for (int var2 = 0; var2 < class_15.field_377; var2 += class_15.method_409(15)) {
               class_15.method_416(var0, var1, var2, 15);
            }
         }

         class_7.method_200(var0, class_15.field_376 / 5, (class_15.field_377 << 1) / 3, field_242, field_243, true, class_15.field_376 / 5 * 3);
      }
   }

   // $VF: renamed from: b (int) void
   public static void method_263(int var0) {
      try {
         DataInputStream var5 = class_15.method_363(var0);
         field_238 = new class_3(var5);
         class_4.method_110(var5);
         class_14.method_342(var5);
         DataInputStream var1 = var5;
         field_271 = class_15.method_350(var5);
         field_272 = class_15.method_350(var1);
         field_273 = class_15.method_350(var1);
         field_277 = var1.readInt();
         field_284 = var1.readInt();
         field_278 = var1.readBoolean();
         field_283 = var1.readInt();
         field_279 = var1.readInt();
         field_280 = var1.readInt();
         field_281 = var1.readInt();
         field_282 = var1.readInt();
         field_276 = class_15.method_350(var1);
         field_275 = class_15.method_350(var1);
         field_259 = var1.readInt();
         field_260 = var1.readInt();
         field_261 = var1.readInt();
         class_15.method_389(var5);
         var1 = var5;
         field_265 = var5.readInt();
         field_266 = var1.readInt();
         field_267 = var1.readInt();
         int var2 = var1.readInt();

         for (int var3 = 0; var3 < var2; var3++) {
            field_268.addElement(new class_12(var1));
         }

         var2 = var1.readInt();

         for (int var9 = 0; var9 < var2; var9++) {
            field_269.addElement(new class_12(var1));
         }

         var2 = var1.readInt();

         for (int var10 = 0; var10 < var2; var10++) {
            field_270.addElement(new class_12(var1));
         }

         for (int var11 = 0; var11 < class_21.field_564.length; var11++) {
            class_21.field_564[var11] = var1.readBoolean();
         }

         field_246 = var1.readBoolean();
         class_20.method_528(var5);
         field_240 = var5.readInt();
         field_245 = var5.readInt();
         field_241 = field_239 = var5.readInt();
         field_247 = var5.readInt();
      } catch (Throwable var4) {
      }
   }

   // $VF: renamed from: e () void
   public static void method_264() {
      DataInputStream var0 = class_15.method_363(1);

      try {
         var0.read(field_254);
         var0.read(field_253);
         field_258 = var0.readByte();
         field_256 = var0.readInt();
         field_257 = var0.readByte();
         class_7.field_179 = var0.readInt();
         class_7.field_178 = var0.readInt();
         class_7.field_180 = var0.readBoolean();

         for (int var1 = 0; var1 < field_255.length; var1++) {
            field_255[var1] = var0.readBoolean();
         }

         var0.read(field_252);
         field_259 = field_262 = var0.readInt();
         field_260 = var0.readInt();
         field_261 = var0.readInt();

         for (int var4 = 0; var4 < class_21.field_579.length; var4++) {
            class_21.field_579[var4] = var0.readBoolean();
         }
      } catch (Exception var3) {
      }

      try {
         var0.close();
      } catch (Exception var2) {
      }

      if (class_15.method_361(2)) {
         method_263(2);
         class_22.method_577(2, -2);
      } else {
         class_22.method_575(4, 0, 12290);
      }
   }

   private class_12() {
   }

   // $VF: renamed from: a (o) void
   private void method_265(class_7 var1) {
      int var2 = 0;
      if (this.method_266()) {
         var2 = class_15.method_397(23);
      } else {
         var2 = class_15.method_397(24);
      }

      switch (this.field_248) {
         case 0:
            StringBuffer var41 = new StringBuffer();
            StringBuffer var28 = null;
            var41 = var41.append(class_15.method_424(this.field_249)).append(class_15.method_424(65559)).append(' ');
            int var10001 = method_282(this.field_250);
            var28 = var41.append(Math.min(var10001 & 65535, this.field_250 & 65535)).append(class_15.method_424(65562)).append(this.field_250 & 65535);
            var1.method_223(var28.toString(), 2, 0, 1, var2, var2);
            return;
         case 4096:
            StringBuffer var40 = new StringBuffer();
            StringBuffer var26 = null;
            var26 = var40.append(class_15.method_424(this.field_249))
               .append(class_15.method_424(65559))
               .append(' ')
               .append(Math.min(class_14.field_347.size(), this.field_250))
               .append(class_15.method_424(65562))
               .append(this.field_250);
            var1.method_223(var26.toString(), 2, 0, 1, var2, var2);
            return;
         case 8192:
            StringBuffer var39 = new StringBuffer();
            StringBuffer var24 = null;
            var24 = var39.append(class_15.method_424(this.field_249))
               .append(class_15.method_424(65559))
               .append(' ')
               .append(Math.min(field_259, this.field_250))
               .append(class_15.method_424(65562))
               .append(this.field_250);
            var1.method_223(var24.toString(), 2, 0, 1, var2, var2);
            return;
         case 12288:
            StringBuffer var38 = new StringBuffer();
            StringBuffer var22 = null;
            var22 = var38.append(class_15.method_424(this.field_249))
               .append(class_15.method_424(65559))
               .append(' ')
               .append(Math.min(field_284, this.field_250))
               .append(class_15.method_424(65562))
               .append(this.field_250);
            var1.method_223(var22.toString(), 2, 0, 1, var2, var2);
            return;
         case 16384:
            StringBuffer var37 = new StringBuffer();
            StringBuffer var19 = null;
            var19 = var37.append(class_15.method_424(this.field_249)).append(class_15.method_424(65559)).append(' ');
            if (this.field_251 != null) {
               var19 = var19.append(class_4.field_94[this.field_250][this.field_251]).append(class_15.method_424(65562)).append(1);
            } else {
               var19 = var19.append(class_4.field_94[this.field_250][0] + class_4.field_94[this.field_250][1] + class_4.field_94[this.field_250][2])
                  .append(class_15.method_424(65562))
                  .append(1);
            }

            var1.method_223(var19.toString(), 2, 0, 1, var2, var2);
            return;
         case 20480:
            StringBuffer var36 = new StringBuffer();
            StringBuffer var16 = null;
            var16 = var36.append(class_15.method_424(this.field_249)).append(class_15.method_424(65559)).append(' ');
            if (this.field_251 != null) {
               var16 = var16.append(class_4.field_93[this.field_250][this.field_251]).append(class_15.method_424(65562)).append(1);
            } else {
               var16 = var16.append(class_4.field_93[this.field_250][0] + class_4.field_93[this.field_250][1] + class_4.field_93[this.field_250][2])
                  .append(class_15.method_424(65562))
                  .append(1);
            }

            var1.method_223(var16.toString(), 2, 0, 1, var2, var2);
            return;
         case 24576:
            StringBuffer var35 = new StringBuffer();
            StringBuffer var14 = null;
            var14 = var35.append(class_15.method_424(this.field_249))
               .append(class_15.method_424(65559))
               .append(' ')
               .append(
                  Math.min(class_4.field_94[this.field_250][0] + class_4.field_94[this.field_250][1] + class_4.field_94[this.field_250][2], this.field_251)
               )
               .append(class_15.method_424(65562))
               .append(this.field_251.intValue());
            var1.method_223(var14.toString(), 2, 0, 1, var2, var2);
            return;
         case 36864:
            StringBuffer var34 = new StringBuffer();
            StringBuffer var12 = null;
            var12 = var34.append(class_15.method_424(this.field_249))
               .append(class_15.method_424(65559))
               .append(' ')
               .append(Math.min(field_263, this.field_250))
               .append(class_15.method_424(65562))
               .append(this.field_250);
            var1.method_223(var12.toString(), 2, 0, 1, var2, var2);
            return;
         case 40960:
            StringBuffer var33 = new StringBuffer();
            StringBuffer var10 = null;
            var10 = var33.append(class_15.method_424(this.field_249))
               .append(class_15.method_424(65559))
               .append(' ')
               .append(Math.min(field_264, this.field_250))
               .append(class_15.method_424(65562))
               .append(this.field_250);
            var1.method_223(var10.toString(), 2, 0, 1, var2, var2);
            return;
         case 45056:
            StringBuffer var32 = new StringBuffer();
            StringBuffer var8 = null;
            var8 = var32.append(class_15.method_424(this.field_249)).append(class_15.method_424(65559)).append(' ').append(class_14.field_355.size());
            var1.method_223(var8.toString(), 2, 0, 1, var2, var2);
            return;
         case 49152:
            StringBuffer var31 = new StringBuffer();
            StringBuffer var6 = null;
            var6 = var31.append(class_15.method_424(this.field_249)).append(class_15.method_424(65559)).append(' ').append(this.field_250 - field_245);
            var1.method_223(var6.toString(), 2, 0, 1, var2, var2);
            return;
         case 53248:
            StringBuffer var10000 = new StringBuffer();
            StringBuffer var3 = null;
            var3 = var10000.append(class_15.method_424(this.field_249)).append(class_15.method_424(65559)).append(' ').append(this.field_250 - field_245);
            var1.method_223(var3.toString(), 2, 0, 1, var2, var2);
            return;
      }
   }

   // $VF: renamed from: b () boolean
   private boolean method_266() {
      switch (this.field_248) {
         case 0:
            if ((method_282(this.field_250) & 65535) >= (this.field_250 & 65535)) {
               return true;
            }

            return false;
         case 4096:
            if (class_14.field_347.size() >= this.field_250) {
               return true;
            }

            return false;
         case 8192:
            if (field_259 >= this.field_250) {
               return true;
            }

            return false;
         case 12288:
            if (field_284 >= this.field_250) {
               return true;
            }

            return false;
         case 16384:
            if (this.field_251 != null) {
               if (class_4.field_94[this.field_250][this.field_251] > 0) {
                  return true;
               }

               return false;
            } else {
               if (class_4.field_94[this.field_250][0] + class_4.field_94[this.field_250][1] + class_4.field_94[this.field_250][2] > 0) {
                  return true;
               }

               return false;
            }
         case 20480:
            if (this.field_251 != null) {
               if (class_4.field_93[this.field_250][this.field_251] > 0) {
                  return true;
               }

               return false;
            } else {
               if (class_4.field_93[this.field_250][0] + class_4.field_93[this.field_250][1] + class_4.field_93[this.field_250][2] > 0) {
                  return true;
               }

               return false;
            }
         case 24576:
            if (class_4.field_94[this.field_250][0] + class_4.field_94[this.field_250][1] + class_4.field_94[this.field_250][2] >= this.field_251) {
               return true;
            }

            return false;
         case 36864:
            if (field_263 >= this.field_250) {
               return true;
            }

            return false;
         case 40960:
            if (field_264 < this.field_250) {
               return true;
            }

            return false;
         case 45056:
            if (class_14.field_355.size() == 0) {
               return true;
            }

            return false;
         case 49152:
            if (field_245 > this.field_250) {
               return true;
            }

            return false;
         case 53248:
            if (field_245 < this.field_250) {
               return true;
            }

            return false;
         default:
            return false;
      }
   }

   // $VF: renamed from: a (java.io.DataOutputStream) void
   private void method_267(DataOutputStream var1) {
      var1.writeInt(this.field_248);
      var1.writeInt(this.field_249);
      var1.writeInt(this.field_250);
      var1.writeBoolean(this.field_251 != null);
      if (this.field_251 != null) {
         var1.writeInt(this.field_251);
      }
   }

   private class_12(DataInputStream var1) {
      this.field_248 = var1.readInt();
      this.field_249 = var1.readInt();
      this.field_250 = var1.readInt();
      if (var1.readBoolean()) {
         this.field_251 = new Integer(var1.readInt());
      }
   }

   public class_12(int var1, int var2, int var3, Integer var4) {
      this.field_248 = var1;
      this.field_249 = var2;
      this.field_250 = var3;
      this.field_251 = var4;
   }

   // $VF: renamed from: a (int, boolean) int
   public static int method_268(int var0, boolean var1) {
      if (var1) {
         return var0 >= 0 && var0 < field_253.length ? field_253[var0] : 0;
      } else {
         return var0 >= 0 && var0 < field_252.length ? field_252[var0] : 0;
      }
   }

   // $VF: renamed from: c (int) void
   public static void method_269(int var0) {
      if (var0 >= 0 && var0 < field_254.length) {
         for (int var1 = 0; var1 < field_254.length; var1++) {
            if (field_254[var1] >= 0) {
               method_285(class_21.field_502[var1][field_254[var1]]);
            }
         }

         method_285(1114112 | field_256);
         field_259 = field_262;
      }
   }

   // $VF: renamed from: f () void
   public static void method_270() {
      for (int var0 = 0; var0 < field_254.length; var0++) {
         field_254[var0] = -1;
         field_253[var0] = 0;
         field_255[var0] = false;
      }

      System.arraycopy(class_21.field_500, 0, field_252, 0, class_21.field_500.length);
      field_256 = 0;
      field_257 = 0;
      field_258 = 0;
      class_7.field_180 = false;
      class_7.field_178 = 0;
      class_7.field_179 = 0;
      field_259 = 0;
      field_262 = 0;
      field_260 = 0;
      field_261 = 0;
   }

   // $VF: renamed from: g () void
   public static void method_271() {
      DataOutputStream var0 = null;

      try {
         class_15.method_362(1);
         (var0 = class_15.method_364(1)).write(field_254);
         var0.write(field_253);
         var0.writeByte(field_258);
         var0.writeInt(field_256);
         var0.writeByte(field_257);
         var0.writeInt(class_7.field_179);
         var0.writeInt(class_7.field_178);
         var0.writeBoolean(class_7.field_180);

         for (int var1 = 0; var1 < field_255.length; var1++) {
            var0.writeBoolean(field_255[var1]);
         }

         var0.write(field_252);
         var0.writeInt(field_259);
         var0.writeInt(field_260);
         var0.writeInt(field_261);

         for (int var4 = 0; var4 < class_21.field_579.length; var4++) {
            var0.writeBoolean(class_21.field_579[var4]);
         }

         class_15.method_365();
      } catch (Exception var2) {
      }
   }

   // $VF: renamed from: h () void
   public static void method_272() {
      class_7 var0;
      (var0 = new class_7()).method_229(16512);
      if (field_238.field_30 != -1) {
         var0.method_223(class_15.method_424(field_267), 2, 0, 1, class_15.method_397(22), class_15.method_397(22));

         for (int var1 = 0; var1 < field_268.size(); var1++) {
            class_12 var10000 = (class_12)field_268.elementAt(var1);
            Object var2 = null;
            var10000.method_265(var0);
         }

         for (int var5 = 0; var5 < field_269.size(); var5++) {
            class_12 var11 = (class_12)field_269.elementAt(var5);
            Object var8 = null;
            var11.method_265(var0);
         }

         for (int var6 = 0; var6 < field_270.size(); var6++) {
            class_12 var12 = (class_12)field_270.elementAt(var6);
            Object var9 = null;
            var12.method_265(var0);
         }
      } else {
         var0.method_223(class_15.method_424(126), 1, 0, 1, class_15.method_397(21), class_15.method_397(21));
         var0.method_223(class_15.method_424(259), 2, 0, 1, class_15.method_397(22), class_15.method_397(22));
         StringBuffer var7 = new StringBuffer();
         int var10 = field_245 % 31;
         int var3 = field_245 % 372 / 31;
         int var4;
         if ((var4 = field_245 / 372) > 0) {
            var7 = var7.append(var4).append(' ').append(var4 != 1 ? class_15.method_424(261) : class_15.method_424(260));
         }

         if (var3 > 0) {
            if (var7.length() > 0) {
               var7 = var7.append(',').append(' ');
            }

            var7 = var7.append(var3).append(' ').append(var3 != 1 ? class_15.method_424(258) : class_15.method_424(257));
         }

         if (var10 != 0 || field_245 == 0) {
            if (var7.length() > 0) {
               var7 = var7.append(',').append(' ');
            }

            var7 = var7.append(var10).append(' ').append(var10 != 1 ? class_15.method_424(256) : class_15.method_424(255));
         }

         var0.method_223(var7.toString(), 1, 0, 1, class_15.method_397(25), class_15.method_397(25));
      }

      class_7.method_160(var0);
   }

   // $VF: renamed from: a (int, int) int
   public static int method_273(int var0, int var1) {
      var0 >>= 16;
      int var2 = var1 >> 8 & 0xFF;
      if ((var1 = Math.min(var1 & 0xFF, field_271[var0])) < var2) {
         return 0;
      }

      field_271[var0] = field_271[var0] - var1;
      return var1;
   }

   // $VF: renamed from: b (int, int) int
   public static int method_274(int var0, int var1) {
      var0 >>= 16;
      if (var1 <= field_271[var0]) {
         field_271[var0] = field_271[var0] - var1;
         return var1;
      } else {
         return 0;
      }
   }

   // $VF: renamed from: c (int, int) int
   public static int method_275(int var0, int var1) {
      var0 >>= 16;
      var1 = Math.min(field_277 - field_271[var0], var1);
      var1 = Math.max(0, var1);
      field_271[var0] = field_271[var0] + var1;
      return var1;
   }

   // $VF: renamed from: a (int, v) int
   public static int method_276(int var0, class_2 var1) {
      if (var1.field_12 == 96) {
         return var0;
      }

      var1.field_13 = Math.max(0, var1.field_13 - var0);
      return var0;
   }

   // $VF: renamed from: a (int, s, int) int
   public static int method_277(int var0, class_0 var1, int var2) {
      if (var2 == 1) {
         var2 = 0;
         if (var1 instanceof class_4) {
            var2 = ((class_4)var1).field_59;
         }

         method_292(class_21.field_574[var2]);
      }

      return var0;
   }

   // $VF: renamed from: d (int, int) int
   public static int method_278(int var0, int var1) {
      switch (var1) {
         case 0:
            if (field_271[2] >= var0) {
               field_271[2] = field_271[2] - var0;
               method_292(class_21.method_544(131072, var1));
               return var0 | 131072;
            }

            if (field_271[4] >= var0) {
               field_271[4] = field_271[4] - var0;
               method_292(class_21.method_544(262144, var1));
               return var0 | 262144;
            }

            if (field_271[7] >= var0) {
               field_271[7] = field_271[7] - var0;
               method_292(class_21.method_544(458752, var1));
               return var0 | 458752;
            }
            break;
         case 1:
            if (field_271[4] >= var0) {
               field_271[4] = field_271[4] - var0;
               method_292(class_21.method_544(262144, var1));
               return var0 | 262144;
            }

            if (field_271[2] >= var0) {
               field_271[2] = field_271[2] - var0;
               method_292(class_21.method_544(131072, var1));
               return var0 | 131072;
            }

            if (field_271[7] >= var0) {
               field_271[7] = field_271[7] - var0;
               method_292(class_21.method_544(458752, var1));
               return var0 | 458752;
            }
            break;
         case 2:
            if (field_271[7] >= var0) {
               field_271[7] = field_271[7] - var0;
               method_292(class_21.method_544(458752, var1));
               return var0 | 458752;
            }

            if (field_271[4] >= var0) {
               field_271[4] = field_271[4] - var0;
               method_292(class_21.method_544(262144, var1));
               return var0 | 262144;
            }

            if (field_271[2] >= var0) {
               field_271[2] = field_271[2] - var0;
               method_292(class_21.method_544(131072, var1));
               return var0 | 131072;
            }
      }

      return 0;
   }

   // $VF: renamed from: a (int) int
   public static int method_279(int var0) {
      return var0 & 0xFF000000;
   }

   // $VF: renamed from: b (int) int
   public static int method_280(int var0) {
      return var0 & 65535;
   }

   // $VF: renamed from: c (int) int
   public static int method_281(int var0) {
      return var0 & 0xFF0000;
   }

   // $VF: renamed from: d (int) int
   public static int method_282(int var0) {
      int var2;
      int var1 = (var2 = var0 & 0xFF0000) >> 16;
      return field_271[var1] | var2;
   }

   // $VF: renamed from: e (int) int
   public static int method_283(int var0) {
      var0 = var0 >> 16 & 0xFF;
      return field_271[var0];
   }

   // $VF: renamed from: a (int[]) void
   public static void method_284(int[] var0) {
      for (int var1 = 0; var1 < var0.length; var1++) {
         int var2 = var0[var1] >> 16 & 0xFF;
         int var10000 = var0[var1];
         int var3 = 0;
         var3 = var10000 & 65535;
         field_271[var2] = var3;
      }
   }

   // $VF: renamed from: d (int) void
   public static void method_285(int var0) {
      int var1 = var0 >> 16 & 0xFF;
      var0 &= 65535;
      field_271[var1] = field_271[var1] + var0;
   }

   // $VF: renamed from: b (int[]) void
   public static void method_286(int[] var0) {
      for (int var1 = 0; var1 < var0.length; var1++) {
         int var10000 = var0[var1];
         int var3 = 0;
         int var2 = var10000 >> 16 & 0xFF;
         var3 = var0[var1] & 65535;
         field_271[var2] = field_271[var2] + var3;
      }
   }

   // $VF: renamed from: c (int[]) void
   public static void method_287(int[] var0) {
      for (int var1 = 0; var1 < var0.length; var1++) {
         if (var0[var1] != -1) {
            int var10000 = var0[var1];
            int var3 = 0;
            int var2 = var10000 >> 16 & 0xFF;
            var3 = var0[var1] & 65535;
            field_271[var2] = field_271[var2] - var3;
         }
      }
   }

   // $VF: renamed from: e (int) void
   public static void method_288(int var0) {
      field_271[var0 >> 16]++;
   }

   // $VF: renamed from: f (int) void
   public static void method_289(int var0) {
      field_271[var0 >> 16]--;
   }

   // $VF: renamed from: i () void
   public static void method_290() {
      for (int var0 = 0; var0 < field_271.length; var0++) {
         if (var0 == 17) {
            field_271[var0] = Math.min(field_271[var0], 9999);
            field_271[var0] = Math.max(field_271[var0], 0);
         } else {
            field_271[var0] = Math.min(field_271[var0], field_277);
            field_271[var0] = Math.max(field_271[var0], 0);
         }
      }
   }

   // $VF: renamed from: j () void
   public static void method_291() {
      for (int var0 = 0; var0 < field_271.length; var0++) {
         if (var0 << 16 != 851968 && var0 << 16 != 786432 && var0 << 16 != 1310720 && var0 << 16 != 1245184 && var0 << 16 != 1114112) {
            field_271[var0] = field_277;
         }
      }
   }

   // $VF: renamed from: g (int) void
   public static void method_292(int var0) {
      field_284 = Math.max(0, Math.min(100, field_284 + var0));
      field_271[16] = field_284;
   }

   // $VF: renamed from: f (int) int
   public static int method_293(int var0) {
      var0 = var0 >> 16 & 0xFF;
      return field_272[var0];
   }

   // $VF: renamed from: g (int) int
   public static int method_294(int var0) {
      var0 = var0 >> 16 & 0xFF;
      return field_273[var0];
   }

   // $VF: renamed from: h (int) int
   public static int method_295(int var0) {
      var0 = var0 >> 16 & 0xFF;
      return field_274[var0];
   }

   // $VF: renamed from: d (int[]) void
   public static void method_296(int[] var0) {
      field_276 = var0;
   }

   // $VF: renamed from: e (int[]) void
   public static void method_297(int[] var0) {
      for (int var1 = 0; var1 < var0.length; var1++) {
         int var2 = var0[var1] >> 16 & 0xFF;
         int var10000 = var0[var1];
         int var3 = 0;
         var3 = var10000 & 65535;
         field_274[var2] = var3;
      }
   }

   // $VF: renamed from: f (int[]) void
   public static void method_298(int[] var0) {
      field_275 = var0;
   }

   // $VF: renamed from: a (int) boolean
   public static boolean method_299(int var0) {
      var0 >>= 16;
      if (field_272[var0] > 0 && field_271[var0] > 0) {
         field_272[var0]--;
         field_273[var0]++;
         field_271[17] = field_271[17] + field_274[var0];
         field_271[var0]--;
         class_15.method_447(33);
         return true;
      } else {
         return false;
      }
   }

   // $VF: renamed from: b (int) boolean
   public static boolean method_300(int var0) {
      int var10000 = method_282(1114112);
      int var1 = 0;
      var1 = var10000 & 65535;
      var0 >>= 16;
      if (var1 >= field_274[var0] && field_273[var0] > 0 && field_271[var0] < field_277) {
         field_272[var0]++;
         field_273[var0]--;
         field_271[17] = field_271[17] - field_274[var0];
         field_271[var0]++;
         class_15.method_447(33);
         return true;
      } else {
         return false;
      }
   }

   // $VF: renamed from: a () boolean
   public static boolean method_301() {
      return field_278 | class_4.field_94[11][0] + class_4.field_94[11][1] + class_4.field_94[11][2] > 0;
   }

   // $VF: renamed from: k () void
   public static void method_302() {
      field_278 = true;
      int[] var0 = field_275;
      if (field_275 != null) {
         for (int var1 = 0; var1 < field_273.length; var1++) {
            field_273[var1] = 0;
         }

         for (int var5 = 0; var5 < var0.length; var5++) {
            int var2 = var0[var5] >> 16 & 0xFF;
            int var10000 = var0[var5];
            int var3 = 0;
            var3 = var10000 & 65535;
            field_273[var2] = var3;
         }
      }

      var0 = field_276;
      if (field_276 != null) {
         for (int var6 = 0; var6 < field_272.length; var6++) {
            field_272[var6] = 0;
         }

         for (int var7 = 0; var7 < var0.length; var7++) {
            int var8 = var0[var7] >> 16 & 0xFF;
            int var12 = var0[var7];
            int var10 = 0;
            var10 = var12 & 65535;
            field_272[var8] = var10;
         }
      }

      class_21.method_546();
      class_15.method_447(18);
   }

   // $VF: renamed from: l () void
   public static void method_303() {
      field_278 = false;
      class_21.method_546();
      class_15.method_447(18);
   }

   // $VF: renamed from: a (int, int, int, int, int) void
   public static void method_304(int var0, int var1, int var2, int var3, int var4) {
      field_283 = var0;
      field_279 = var1;
      field_280 = var2;
      field_281 = var3;
      field_282 = var4;
   }
}
