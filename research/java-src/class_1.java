import hg.class_22;
import java.util.Enumeration;
import java.util.Hashtable;

// $VF: renamed from: w
public final class class_1 {
   // $VF: renamed from: a l
   class_10 field_0 = new class_10();
   // $VF: renamed from: b l
   class_10 field_1 = new class_10();
   // $VF: renamed from: b int
   private int field_2;
   // $VF: renamed from: a int
   int field_3;
   // $VF: renamed from: c int
   private int field_4 = class_22.field_581;
   // $VF: renamed from: d int
   private static int field_5;
   // $VF: renamed from: e int
   private static int field_6;
   // $VF: renamed from: a boolean[][]
   private static boolean[][] field_7;
   // $VF: renamed from: a byte[][]
   private static byte[][] field_8;
   // $VF: renamed from: a int[][]
   private static int[][] field_9;
   // $VF: renamed from: b int[][]
   private static int[][] field_10;
   // $VF: renamed from: a java.util.Hashtable
   private static Hashtable field_11 = new Hashtable(100);

   // $VF: renamed from: a () void
   public static void method_5() {
      Enumeration var0 = field_11.keys();

      while (var0.hasMoreElements()) {
         Object var1 = var0.nextElement();
         class_1 var2 = (class_1)field_11.get(var1);
         if (class_22.field_581 - var2.field_4 > 120000) {
            field_11.remove(var1);
         }
      }
   }

   // $VF: renamed from: b () void
   public static void method_6() {
      field_11.clear();
   }

   // $VF: renamed from: a (r) v
   public static class_2 method_7(class_4 var0) {
      class_2 var1 = null;

      for (int var2 = 0; var2 < class_2.field_22.size(); var2++) {
         class_2 var3 = (class_2)class_2.field_22.elementAt(var2);
         if (method_12(var0, var3, var1) && var3.field_13 > 15) {
            var1 = var3;
         }
      }

      return var1;
   }

   // $VF: renamed from: a (r) r
   public static class_4 method_8(class_4 var0) {
      class_4 var1 = null;

      for (int var2 = 0; var2 < class_4.field_87.size(); var2++) {
         class_4 var3 = (class_4)class_4.field_87.elementAt(var2);
         if (method_12(var0, var3, var1)) {
            var1 = var3;
         }
      }

      return var1;
   }

   // $VF: renamed from: b (r) r
   public static class_4 method_9(class_4 var0) {
      if (class_4.field_86.size() == 0) {
         return class_4.field_58;
      }

      class_4 var1 = null;

      for (int var2 = 0; var2 < class_4.field_86.size(); var2++) {
         class_4 var3 = (class_4)class_4.field_86.elementAt(var2);
         if (method_12(var0, var3, var1)) {
            var1 = var3;
         }
      }

      return var1;
   }

   // $VF: renamed from: a (int, int, int, int) w
   public static class_1 method_10(int var0, int var1, int var2, int var3) {
      if (var0 == var2 && var1 == var3) {
         return null;
      }

      if (var0 > var2 || var0 == var2 && var1 > var3) {
         int var4 = var0;
         var0 = var2;
         var2 = var4;
         var4 = var1;
         var1 = var3;
         var3 = var4;
      }

      Integer var7 = new Integer(var0 << 24 | var1 << 16 | var2 << 8 | var3);
      class_1 var5;
      if ((var5 = (class_1)field_11.get(var7)) == null) {
         if ((var5 = method_19(var0, var1, var2, var3)) != null) {
            field_11.put(var7, var5);
         }
      } else {
         var5.field_4 = class_22.field_581;
      }

      return var5;
   }

   // $VF: renamed from: a (r) void
   public static void method_11(class_4 var0) {
      int var1 = -1;
      int var2 = -1;
      int var3 = Integer.MAX_VALUE;
      int var4 = Math.max(0, var0.field_68 - 2);
      int var5 = Math.max(0, var0.field_69 - 2);
      int var6 = Math.min(class_12.field_238.field_28, var4 + 5);
      int var7 = Math.min(class_12.field_238.field_29, var5 + 5);

      while (var4 < var6) {
         for (int var8 = var5; var8 < var7; var8++) {
            int var9;
            if (class_12.field_238.field_25[var4][var8].method_111()
               && class_12.field_238.field_26[var4][var8] == null
               && class_12.field_238.field_27[var4][var8] == null
               && (var9 = method_14(var0.field_68, var0.field_69, var4, var8)) < var3) {
               var3 = var9;
               var1 = var4;
               var2 = var8;
            }
         }

         var4++;
      }

      var0.field_70[0].field_13 = var1;
      var0.field_70[0].field_14 = var2;
   }

   // $VF: renamed from: a (s, s, s) boolean
   private static boolean method_12(class_0 var0, class_0 var1, class_0 var2) {
      if (var1 == null) {
         return false;
      }

      if (var2 == null) {
         return true;
      }

      int var4 = method_14(var1.method_2(), var1.method_3(), var0.method_2(), var0.method_3());
      int var3 = method_14(var2.method_2(), var2.method_3(), var0.method_2(), var0.method_3());
      return var4 < var3;
   }

   // $VF: renamed from: a (s, s) int
   public static final int method_13(class_0 var0, class_0 var1) {
      int var10000 = var0.method_2();
      int var10001 = var0.method_3();
      int var2 = var1.method_3();
      return method_10(var10000, var10001, var1.method_2(), var2).field_2;
   }

   // $VF: renamed from: a (int, int, int, int) int
   private static int method_14(int var0, int var1, int var2, int var3) {
      return Math.abs(var0 - var2) + Math.abs(var1 - var3);
   }

   // $VF: renamed from: c () void
   public static void method_15() {
      field_11.clear();
      field_7 = null;
      field_8 = null;
      field_9 = null;
      field_10 = null;
   }

   private class_1() {
   }

   // $VF: renamed from: a (int, int, int) boolean
   private static boolean method_16(int var0, int var1, int var2) {
      int var3 = Math.min(var0, var1);
      class_2 var4;
      if ((var4 = class_12.field_238.field_26[var3][var2]) != null && var4.method_45()) {
         return false;
      } else {
         class_2 var5;
         if ((var5 = class_12.field_238.field_26[var0][var2]) == null || var5.field_12 != 48) {
            class_2 var6;
            return (var6 = class_12.field_238.field_26[var1][var2]) == null || var6.field_12 != 48
               ? !class_12.field_238.field_25[var1][var2].method_111()
               : !var6.method_45();
         } else {
            return !var5.method_45();
         }
      }
   }

   // $VF: renamed from: b (int, int, int) boolean
   private static boolean method_17(int var0, int var1, int var2) {
      int var3 = Math.max(var0, var1);
      class_2 var4;
      if ((var4 = class_12.field_238.field_26[var2][var3]) != null && var4.method_46()) {
         return false;
      } else {
         class_2 var5;
         if ((var5 = class_12.field_238.field_26[var2][var0]) == null || var5.field_12 != 48) {
            class_2 var6;
            return (var6 = class_12.field_238.field_26[var2][var1]) == null || var6.field_12 != 48
               ? !class_12.field_238.field_25[var2][var1].method_111()
               : !var6.method_46();
         } else {
            return !var5.method_46();
         }
      }
   }

   // $VF: renamed from: a (int, int) boolean
   public static boolean method_18(int var0, int var1) {
      class_2 var2;
      return (var2 = class_12.field_238.field_26[var0][var1]) == null ? !class_12.field_238.field_25[var0][var1].method_114() : !var2.method_44();
   }

   // $VF: renamed from: b (int, int, int, int) w
   private static class_1 method_19(int var0, int var1, int var2, int var3) {
      System.currentTimeMillis();
      if (field_7 == null) {
         int var8 = class_12.field_238.field_29;
         int var7 = class_12.field_238.field_28;
         field_7 = new boolean[class_12.field_238.field_28][var8];
         field_8 = new byte[var7][var8];
         field_9 = new int[var7][var8];
         field_10 = new int[var7][var8];
      }

      for (int var4 = 0; var4 < field_7.length; var4++) {
         for (int var6 = 0; var6 < field_7[var4].length; var6++) {
            field_7[var4][var6] = false;
            field_8[var4][var6] = 0;
            field_10[var4][var6] = Integer.MAX_VALUE;
         }
      }

      field_9[var0][var1] = 0;
      field_10[var0][var1] = field_9[var0][var1];
      field_8[var0][var1] = -128;
      int var5 = 0;
      field_5 = var0;
      field_6 = var1;

      boolean var32;
      do {
         int var17 = field_5;
         var5 = field_6;
         int var30 = var3;
         int var26 = var2;
         int var22 = var5;
         if (var17 == var26 && var22 == var30) {
            System.currentTimeMillis();
            var22 = var5;
            var17 = var17;
            if (field_8[var17][var22] == -128) {
               return null;
            }

            class_1 var29 = new class_1();

            do {
               var29.field_0.method_252(var17);
               var29.field_1.method_252(var22);
               switch (Math.abs(field_8[var17][var22])) {
                  case 1:
                     var29.field_2++;
                     var22--;
                     break;
                  case 2:
                     var29.field_2++;
                     var22++;
                     break;
                  case 3:
                     var29.field_2++;
                     var17++;
                     break;
                  case 4:
                     var29.field_2++;
                     var17--;
               }
            } while (field_8[var17][var22] != -128);

            var29.field_0.method_252(var17);
            var29.field_1.method_252(var22);
            var29.field_3 = var29.field_0.field_232;
            return var29;
         }

         var30 = var3;
         var26 = var2;
         var22 = var5;
         var17 = var17;
         if (var17 + 1 < field_7.length && !method_21(var17 + 1, var22) && method_16(var17, var17 + 1, var22)) {
            var0 = field_9[var17][var22] + 1;
            if (field_8[var17][var22] != 4) {
               var0 += 2;
            }

            if (class_12.field_238.field_25[var17 + 1][var22].method_114()) {
               var0 += 3;
            }

            var1 = field_9[var17][var22] + method_14(var17 + 1, var22, var26, var30);
            method_20(var17 + 1, var22, (byte)4, var1, var0);
         }

         if (var22 - 1 >= 0 && !method_21(var17, var22 - 1) && method_17(var22, var22 - 1, var17)) {
            var0 = field_9[var17][var22] + 1;
            if (field_8[var17][var22] != 2) {
               var0 += 2;
            }

            if (class_12.field_238.field_25[var17][var22 - 1].method_114()) {
               var0 += 3;
            }

            var1 = field_9[var17][var22] + method_14(var17, var22 - 1, var26, var30);
            method_20(var17, var22 - 1, (byte)2, var1, var0);
         }

         if (var17 - 1 >= 0 && !method_21(var17 - 1, var22) && method_16(var17, var17 - 1, var22)) {
            var0 = field_9[var17][var22] + 1;
            if (field_8[var17][var22] != 3) {
               var0 += 2;
            }

            if (class_12.field_238.field_25[var17 - 1][var22].method_114()) {
               var0 += 3;
            }

            var1 = field_9[var17][var22] + method_14(var17 - 1, var22, var26, var30);
            method_20(var17 - 1, var22, (byte)3, var1, var0);
         }

         if (var22 + 1 < field_7[0].length && !method_21(var17, var22 + 1) && method_17(var22, var22 + 1, var17)) {
            var0 = field_9[var17][var22] + 1;
            if (field_8[var17][var22] != 1) {
               var0 += 2;
            }

            if (class_12.field_238.field_25[var17][var22 + 1].method_114()) {
               var0 += 3;
            }

            var1 = field_9[var17][var22] + method_14(var17, var22 + 1, var26, var30);
            method_20(var17, var22 + 1, (byte)1, var1, var0);
         }

         var17 = Integer.MAX_VALUE;

         for (int var24 = 0; var24 < field_7.length; var24++) {
            for (int var28 = 0; var28 < field_7[0].length; var28++) {
               if (field_7[var24][var28] && field_10[var24][var28] < var17) {
                  field_5 = var24;
                  field_6 = var28;
                  var17 = field_10[var24][var28];
               }
            }
         }

         if (var17 < Integer.MAX_VALUE) {
            field_7[field_5][field_6] = false;
            field_8[field_5][field_6] = (byte)(-Math.abs(field_8[field_5][field_6]));
            var32 = true;
         } else {
            var32 = false;
         }
      } while (var32);

      System.currentTimeMillis();
      return null;
   }

   // $VF: renamed from: a (int, int, byte, int, int) void
   private static void method_20(int var0, int var1, byte var2, int var3, int var4) {
      if (!field_7[var0][var1] || field_10[var0][var1] >= var3) {
         field_7[var0][var1] = true;
         field_8[var0][var1] = var2;
         field_10[var0][var1] = var3;
         field_9[var0][var1] = var4;
      }
   }

   // $VF: renamed from: b (int, int) boolean
   private static boolean method_21(int var0, int var1) {
      return field_8[var0][var1] < 0;
   }
}
