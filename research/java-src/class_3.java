import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: u
public final class class_3 {
   // $VF: renamed from: a java.util.Vector
   public Vector field_24;
   // $VF: renamed from: a q[][]
   public class_5[][] field_25;
   // $VF: renamed from: a v[][]
   public class_2[][] field_26;
   // $VF: renamed from: a h[][]
   public class_14[][] field_27;
   // $VF: renamed from: a int
   public int field_28;
   // $VF: renamed from: b int
   public int field_29;
   // $VF: renamed from: c int
   public int field_30;
   // $VF: renamed from: a boolean
   public boolean field_31 = false;
   // $VF: renamed from: b boolean
   public boolean field_32 = false;
   // $VF: renamed from: d int
   public int field_33;
   // $VF: renamed from: e int
   public int field_34;
   // $VF: renamed from: f int
   public int field_35;
   // $VF: renamed from: g int
   public int field_36;
   // $VF: renamed from: h int
   public int field_37;
   // $VF: renamed from: i int
   public int field_38;
   // $VF: renamed from: j int
   public int field_39;
   // $VF: renamed from: k int
   public int field_40;
   // $VF: renamed from: l int
   public int field_41;
   // $VF: renamed from: m int
   public int field_42;
   // $VF: renamed from: n int
   public int field_43;
   // $VF: renamed from: o int
   public int field_44;
   // $VF: renamed from: p int
   public static int field_45;
   // $VF: renamed from: q int
   public static int field_46;
   // $VF: renamed from: r int
   public static int field_47;
   // $VF: renamed from: b q[]
   private static class_5[] field_48;
   // $VF: renamed from: c q[]
   private static class_5[] field_49;
   // $VF: renamed from: d q[]
   private static class_5[] field_50;
   // $VF: renamed from: a q[]
   public static class_5[] field_51;
   // $VF: renamed from: s int
   public static final int field_52 = Math.max(100, 50);
   // $VF: renamed from: t int
   public static final int field_53 = Math.max(50, 50);
   // $VF: renamed from: u int
   public static final int field_54 = Math.max(50, 50);
   // $VF: renamed from: v int
   public static final int field_55 = Math.max(150, 50);
   // $VF: renamed from: w int
   public static final int field_56 = Math.max(150, 50);
   // $VF: renamed from: x int
   public static final int field_57 = Math.max(150, 50);

   // $VF: renamed from: b () void
   private static void method_49() {
      if (field_48 == null) {
         field_48 = new class_5[class_15.method_410(16, 3)];

         for (short var0 = 0; var0 < field_48.length; var0++) {
            field_48[var0] = new class_5();
            field_48[var0].field_105 = 0;
            field_48[var0].field_103 = 16;
            field_48[var0].field_104 = class_15.method_412(var0);
         }
      }

      if (field_49 == null) {
         field_49 = new class_5[32];

         for (short var1 = 0; var1 < field_49.length; var1++) {
            field_49[var1] = new class_5();
            field_49[var1].field_105 = 48;
            field_49[var1].field_107 = new class_13(class_13.field_308);
            field_49[var1].field_107.method_310();
            field_49[var1].field_107.method_313();
            field_49[var1].field_106 = new class_13(class_13.field_306);
            field_49[var1].field_106.method_310();
            field_49[var1].field_106.method_313();
         }
      }

      if (field_50 == null) {
         (field_50 = new class_5[16])[0] = null;
         field_50[5] = null;
         field_50[10] = null;
         field_50[15] = null;
         field_50[1] = new class_5();
         field_50[1].field_105 = 128;
         field_50[1].field_104 = class_15.method_412(10);
         field_50[2] = new class_5();
         field_50[2].field_105 = 128;
         field_50[2].field_104 = class_15.method_412(9);
         field_50[3] = new class_5();
         field_50[3].field_105 = 128;
         field_50[3].field_104 = class_15.method_412(1);
         field_50[4] = new class_5();
         field_50[4].field_105 = 128;
         field_50[4].field_104 = class_15.method_412(8);
         field_50[6] = new class_5();
         field_50[6].field_105 = 128;
         field_50[6].field_104 = class_15.method_412(3);
         field_50[7] = new class_5();
         field_50[7].field_105 = 128;
         field_50[7].field_104 = class_15.method_412(7);
         field_50[8] = new class_5();
         field_50[8].field_105 = 128;
         field_50[8].field_104 = class_15.method_412(11);
         field_50[9] = new class_5();
         field_50[9].field_105 = 64;
         field_50[9].field_104 = class_15.method_412(2);
         field_50[11] = new class_5();
         field_50[11].field_105 = 64;
         field_50[11].field_104 = class_15.method_412(4);
         field_50[12] = new class_5();
         field_50[12].field_105 = 128;
         field_50[12].field_104 = class_15.method_412(0);
         field_50[13] = new class_5();
         field_50[13].field_105 = 128;
         field_50[13].field_104 = class_15.method_412(5);
         field_50[14] = new class_5();
         field_50[14].field_105 = 128;
         field_50[14].field_104 = class_15.method_412(6);

         for (int var2 = 0; var2 < field_50.length; var2++) {
            if (field_50[var2] != null) {
               field_50[var2].field_103 = 21;
               field_50[var2].field_105 |= var2;
               field_50[var2].field_105 |= 64;
               field_50[var2].field_106 = new class_13(class_13.field_307);
               field_50[var2].field_106.method_310();
               field_50[var2].field_106.method_313();
            }
         }
      }

      if (field_51 == null) {
         field_51 = new class_5[class_15.method_410(17, 3)];

         for (short var3 = 0; var3 < field_51.length; var3++) {
            field_51[var3] = new class_5();
            field_51[var3].field_105 = 64;
            field_51[var3].field_103 = 17;
            field_51[var3].field_104 = class_15.method_412(var3);
         }
      }
   }

   // $VF: renamed from: c () void
   private void method_50() {
      for (int var1 = 0; var1 < this.field_28; var1++) {
         for (int var2 = 0; var2 < this.field_29; var2++) {
            this.field_25[var1][var2] = field_48[class_15.method_351(field_48.length)];
         }
      }

      if ((this.field_38 & 1) != 0) {
         int var11 = this.field_28 - 1;

         for (int var14 = 0; var14 < this.field_29; var14++) {
            this.field_25[var11][var14] = field_49[0];
            if (class_15.method_353()) {
               this.field_25[var11 - 1][var14] = field_49[0];
               if (class_15.method_353()) {
                  this.field_25[var11 - 2][var14] = field_49[0];
               }
            }
         }
      }

      if ((this.field_38 & 4) != 0) {
         for (int var15 = 0; var15 < this.field_29; var15++) {
            this.field_25[0][var15] = field_49[0];
            if (class_15.method_353()) {
               this.field_25[1][var15] = field_49[0];
               if (class_15.method_353()) {
                  this.field_25[2][var15] = field_49[0];
               }
            }
         }
      }

      if ((this.field_38 & 2) != 0) {
         for (int var16 = 0; var16 < this.field_28; var16++) {
            this.field_25[var16][0] = field_49[0];
            if (class_15.method_353()) {
               this.field_25[var16][1] = field_49[0];
               if (class_15.method_353()) {
                  this.field_25[var16][2] = field_49[0];
               }
            }
         }
      }

      if ((this.field_38 & 8) != 0) {
         int var12 = this.field_29 - 1;

         for (int var17 = 0; var17 < this.field_28; var17++) {
            this.field_25[var17][var12] = field_49[0];
            if (class_15.method_353()) {
               this.field_25[var17][var12 - 1] = field_49[0];
               if (class_15.method_353()) {
                  this.field_25[var17][var12 - 2] = field_49[0];
               }
            }
         }
      }

      boolean var13 = this.field_33 > 0;
      this.field_33 = Math.abs(this.field_33);

      for (int var18 = 0; var18 < this.field_33; var18++) {
         int var3 = class_15.method_352(this.field_28 / 3, (this.field_28 << 1) / 3);
         int var4 = class_15.method_352(this.field_29 / 3, (this.field_29 << 1) / 3);
         if (var18 == 0) {
            var3 = this.field_28 / 2;
            var4 = this.field_29 / 2;
         }

         int var5 = var3;
         int var6 = var4;
         int var7 = class_15.method_353() ? 1 : -1;
         int var8 = class_15.method_353() ? 1 : -1;
         int var9 = var7;
         int var10 = var8;
         if (class_15.method_353() && !var13) {
            var9 = -var9;
         }

         while (0 <= var3 && var3 < this.field_28 && 0 <= var4 && var4 < this.field_29) {
            this.field_25[var3][var4] = field_49[0];
            if (class_15.method_353()) {
               var3 += var7;
            }

            if (class_15.method_353()) {
               var4 += var8;
            }
         }

         while (0 <= var5 && var5 < this.field_28 && 0 <= var6 && var6 < this.field_29) {
            this.field_25[var5][var6] = field_49[0];
            if (class_15.method_353()) {
               var5 -= var9;
            }

            if (class_15.method_353()) {
               var6 -= var10;
            }
         }
      }

      for (int var19 = 0; var19 < this.field_34; var19++) {
         int var22 = class_15.method_352(this.field_28 / 4, this.field_28 * 3 / 4);
         int var25 = class_15.method_352(this.field_29 / 4, this.field_29 * 3 / 4);
         this.field_25[var22][var25] = field_49[0];
         if (class_15.method_353()) {
            this.field_25[var22 + 1][var25] = field_49[0];
         }

         if (class_15.method_353()) {
            this.field_25[var22][var25 + 1] = field_49[0];
         }

         if (class_15.method_353()) {
            this.field_25[var22][var25 - 1] = field_49[0];
         }

         if (class_15.method_353()) {
            this.field_25[var22 - 1][var25] = field_49[0];
         }
      }

      for (int var20 = 0; var20 < this.field_28; var20++) {
         for (int var23 = 0; var23 < this.field_29; var23++) {
            if (!this.field_25[var20][var23].method_111()) {
               byte var26 = 0;
               int var27 = Math.min(var20 + 1, this.field_28 - 1);
               int var31 = Math.max(var23 - 1, 0);
               if (this.field_25[var27][var31].method_111() || this.field_25[var20][var31].method_111() || this.field_25[var27][var23].method_111()) {
                  var26 = 1;
               }

               var27 = Math.max(var20 - 1, 0);
               var31 = Math.max(var23 - 1, 0);
               if (this.field_25[var27][var31].method_111() || this.field_25[var20][var31].method_111() || this.field_25[var27][var23].method_111()) {
                  var26 |= 2;
               }

               var27 = Math.max(var20 - 1, 0);
               var31 = Math.min(var23 + 1, this.field_29 - 1);
               if (this.field_25[var27][var31].method_111() || this.field_25[var20][var31].method_111() || this.field_25[var27][var23].method_111()) {
                  var26 |= 4;
               }

               var27 = Math.min(var20 + 1, this.field_28 - 1);
               var31 = Math.min(var23 + 1, this.field_29 - 1);
               if (this.field_25[var27][var31].method_111() || this.field_25[var20][var31].method_111() || this.field_25[var27][var23].method_111()) {
                  var26 |= 8;
               }

               if (field_50[var26] != null) {
                  this.field_25[var20][var23] = field_50[var26];
               } else if (var26 != 0) {
                  this.field_25[var20][var23] = field_49[0];
                  var20 = Math.max(var20 - 2, 0);
                  var23 = Math.max(var23 - 2, 0);
               }
            }
         }
      }

      for (int var21 = 0; var21 < this.field_28; var21++) {
         for (int var24 = 0; var24 < this.field_29; var24++) {
            if (this.field_25[var21][var24].method_111()) {
               this.field_25[var21][var24] = field_49[class_15.method_351(field_49.length)];
            }
         }
      }
   }

   // $VF: renamed from: d () void
   private void method_51() {
      int[][] var1 = new int[this.field_28][this.field_29];

      for (int var2 = 0; var2 < this.field_28; var2++) {
         for (int var3 = 0; var3 < this.field_29; var3++) {
            var1[var2][var3] = this.field_25[var2][var3].method_111() ? -1 : 0;
         }
      }

      Vector var12 = new Vector();
      int var19 = 1;
      int var4 = 1;

      for (int var5 = 0; var5 < this.field_28; var5++) {
         for (int var6 = 0; var6 < this.field_29; var6++) {
            if (var1[var5][var6] != -1) {
               if (this.field_25[var5][var6] == field_50[11] || this.field_25[var5][var6] == field_50[7]) {
                  var4 = ++var19;
               }

               if (var5 > 0
                  && this.field_25[var5][var6] != field_50[14]
                  && this.field_25[var5][var6] != field_50[7]
                  && var1[var5 - 1][var6] != -1
                  && var1[var5 - 1][var6] != var4) {
                  if (var4 > var1[var5 - 1][var6]) {
                     var12.addElement(new int[]{var4, var1[var5 - 1][var6]});
                     var4 = var1[var5 - 1][var6];
                  } else {
                     var12.addElement(new int[]{var1[var5 - 1][var6], var4});
                  }
               }

               var1[var5][var6] = var4;
            } else {
               var4 = ++var19;
            }
         }

         var4 = ++var19;
      }

      var12.size();

      for (int var34 = 0; var34 < var12.size(); var34++) {
         int[] var43 = (int[])var12.elementAt(var34);

         for (int var20 = 0; var20 < this.field_28; var20++) {
            for (int var26 = 0; var26 < this.field_29; var26++) {
               if (var1[var20][var26] == var43[0]) {
                  var1[var20][var26] = var43[1];
               }
            }
         }
      }

      for (int var35 = var12.size() - 1; var35 >= 0; var35--) {
         int[] var44 = (int[])var12.elementAt(var35);

         for (int var21 = 0; var21 < this.field_28; var21++) {
            for (int var27 = 0; var27 < this.field_29; var27++) {
               if (var1[var21][var27] == var44[0]) {
                  var1[var21][var27] = var44[1];
               }
            }
         }
      }

      for (int var36 = 0; var36 < this.field_28; var36++) {
         for (int var45 = 0; var45 < this.field_29; var45++) {
            if (var1[var36][var45] == -1) {
               var1[var36][var45] = 0;
            } else {
               var1[var36][var45] = -var1[var36][var45];
            }
         }
      }

      int var37 = 1;

      for (int var46 = 0; var46 < this.field_28; var46++) {
         for (int var22 = 0; var22 < this.field_29; var22++) {
            if (var1[var46][var22] < 0) {
               var4 = var1[var46][var22];

               for (int var13 = 0; var13 < this.field_28; var13++) {
                  for (int var7 = 0; var7 < this.field_29; var7++) {
                     if (var1[var13][var7] == var4) {
                        var1[var13][var7] = var37;
                     }
                  }
               }

               var37++;
            }
         }
      }

      int[] var47 = new int[var37];

      for (int var23 = 0; var23 < this.field_28; var23++) {
         for (int var29 = 0; var29 < this.field_29; var29++) {
            var47[var1[var23][var29]]++;
         }
      }

      for (int var24 = 0; var24 < var47.length; var24++) {
         if (var47[var24] < this.field_42) {
            for (int var30 = 0; var30 < this.field_28; var30++) {
               for (int var14 = 0; var14 < this.field_29; var14++) {
                  if (var1[var30][var14] == var24) {
                     this.field_25[var30][var14] = field_49[0];
                     var1[var30][var14] = 0;
                  }
               }
            }
         }
      }

      Vector var25 = new Vector();

      for (int var31 = 0; var31 < this.field_28; var31++) {
         int var15 = 0;
         int var52 = 0;
         int var48 = -1;
         int var8 = -1;

         while (var15 < this.field_29) {
            if (var1[var31][var15] != 0) {
               if (var52 == 0) {
                  var52 = var1[var31][var15];
                  var48 = var31;
                  var8 = var15;
               } else if (var52 == var1[var31][var15]) {
                  var48 = var31;
                  var8 = var15;
               } else {
                  var37 = var1[var31][var15];
                  int var9 = var31;
                  int var10 = var15;
                  if (var52 > var37) {
                     int var11 = var37;
                     var37 = var52;
                     var52 = var11;
                  }

                  var25.insertElementAt(new int[]{var10 - var8, var52, var37, var48, var8, var9, var10}, class_15.method_351(var25.size()));
                  var52 = 0;
               }
            }

            var15++;
         }
      }

      for (int var32 = 0; var32 < this.field_29; var32++) {
         int var16 = 0;
         int var53 = 0;
         int var49 = -1;
         int var56 = -1;

         while (var16 < this.field_28) {
            if (var1[var16][var32] != 0) {
               if (var53 == 0) {
                  var53 = var1[var16][var32];
                  var49 = var16;
                  var56 = var32;
               } else if (var53 == var1[var16][var32]) {
                  var49 = var16;
                  var56 = var32;
               } else {
                  var37 = var1[var16][var32];
                  int var59 = var16;
                  int var68 = var32;
                  if (var53 > var37) {
                     int var73 = var37;
                     var37 = var53;
                     var53 = var73;
                  }

                  var25.insertElementAt(new int[]{var59 - var49, var53, var37, var49, var56, var59, var68}, class_15.method_351(var25.size()));
                  var53 = 0;
               }
            }

            var16++;
         }
      }

      var25.size();

      boolean var33;
      do {
         var33 = true;

         for (int var17 = 0; var17 < var25.size() - 1; var17++) {
            int[] var54 = (int[])var25.elementAt(var17);
            int[] var40 = (int[])var25.elementAt(var17 + 1);
            if (var54[0] > var40[0]) {
               var33 = false;
               var25.setElementAt(var54, var17 + 1);
               var25.setElementAt(var40, var17);
            }
         }
      } while (!var33);

      var12 = new Vector();

      while (var25.size() > 0) {
         int[] var55 = (int[])var25.firstElement();

         for (int var41 = 0; var41 < var25.size(); var41++) {
            if ((var47 = (int[])var25.elementAt(var41))[1] == var55[1] && var47[2] == var55[2]) {
               var25.removeElement(var47);
               var12.addElement(var47);
               var41--;
            } else if (var47[1] == var55[2]) {
               var47[1] = var55[1];
            } else if (var47[2] == var55[2]) {
               var47[2] = var55[1];
               if (var47[1] > var47[2]) {
                  int var57 = var47[2];
                  var47[2] = var47[1];
                  var47[1] = var57;
               }
            }
         }

         var12.size();
         var37 = Math.min(var12.size(), this.field_39);

         for (int var51 = 0; var51 < var37 && var12.size() > 0; var51++) {
            int[] var58;
            if ((var58 = (int[])var12.firstElement())[3] != var58[5]) {
               for (int var63 = var58[3] + 1; var63 < var58[5]; var63++) {
                  class_2 var70;
                  (var70 = class_2.method_31(true)).method_0(var63, var58[4]);
                  var70.method_1();
               }

               class_2 var64;
               (var64 = class_2.method_33(true)).method_0(var58[3], var58[4]);
               var64.method_1();
               (var64 = class_2.method_32(true)).method_0(var58[5], var58[6]);
               var64.method_1();
            } else {
               for (int var60 = var58[4] + 1; var60 < var58[6]; var60++) {
                  class_2 var69;
                  (var69 = class_2.method_31(false)).method_0(var58[3], var60);
                  var69.method_1();
               }

               class_2 var61;
               (var61 = class_2.method_33(false)).method_0(var58[3], var58[4]);
               var61.method_1();
               (var61 = class_2.method_32(false)).method_0(var58[5], var58[6]);
               var61.method_1();
            }

            var12.removeElement(var58);

            for (int var66 = 0; var66 < var12.size(); var66++) {
               int[] var71 = (int[])var12.elementAt(var66);
               if (method_52(var58, var71)) {
                  var12.removeElement(var71);
                  var66--;
               }
            }

            for (int var67 = 0; var67 < var25.size(); var67++) {
               int[] var72 = (int[])var25.elementAt(var67);
               if (method_52(var58, var72)) {
                  var25.removeElement(var72);
                  var67--;
               }
            }
         }

         var12.removeAllElements();
      }
   }

   // $VF: renamed from: a (int[], int[]) boolean
   private static boolean method_52(int[] var0, int[] var1) {
      boolean var2 = false;
      var2 = false
         | (Math.abs(var1[3] - var0[3]) < 2 && Math.abs(var1[4] - var0[4]) < 2)
         | (Math.abs(var1[5] - var0[5]) < 2 && Math.abs(var1[6] - var0[6]) < 2)
         | (Math.abs(var1[3] - var0[5]) < 2 && Math.abs(var1[4] - var0[6]) < 2)
         | (Math.abs(var1[5] - var0[3]) < 2 && Math.abs(var1[6] - var0[4]) < 2);
      if (var0[3] == var0[5]) {
         var2 |= var1[4] == var1[6] && var1[3] <= var0[3] && var1[5] >= var0[3];
      } else if (var0[4] == var0[6]) {
         var2 |= var1[3] == var1[5] && var1[4] <= var0[4] && var1[6] >= var0[4];
      }

      return var2 | (var1[3] == var0[3] && var1[4] == var0[4]) | (var1[3] == var0[5] && var1[4] == var0[6]) | (var1[5] == var0[3] && var1[6] == var0[4]);
   }

   // $VF: renamed from: e () void
   private void method_53() {
      if (this.field_36 == 0) {
         throw new IllegalArgumentException("genForestsGaussFactor must not be zero!");
      }

      int var1 = 0;

      for (int var2 = 0; var2 < this.field_35; var2++) {
         class_2 var3 = class_2.method_27();
         int var4 = 0;
         int var5 = 0;

         for (int var6 = 0; var6 < Math.abs(this.field_36); var6++) {
            var4 += class_15.method_351(this.field_28);
            var5 += class_15.method_351(this.field_29);
         }

         var4 /= Math.abs(this.field_36);
         var5 /= Math.abs(this.field_36);
         if (this.field_36 < 0) {
            var4 -= this.field_28 / 2;
            var5 -= this.field_29 / 2;
            if (var4 < 0) {
               var4 += this.field_28;
            }

            if (var5 < 0) {
               var5 += this.field_29;
            }
         }

         if (var3.method_0(var4, var5)) {
            var3.method_0(var4, var5);
            var3.method_1();
            var1 = 0;
         } else {
            if (++var1 > 100) {
               break;
            }

            var2--;
         }
      }

      var1 = 0;

      for (int var8 = 0; var8 < this.field_37; var8++) {
         class_2 var9 = class_2.method_28();
         int var11 = class_15.method_351(this.field_28);
         int var13 = class_15.method_351(this.field_29);
         if (var9.method_0(var11, var13)) {
            var9.method_0(var11, var13);
            var9.method_1();
            var1 = 0;
         } else {
            if (++var1 > 100) {
               return;
            }

            var8--;
         }
      }
   }

   // $VF: renamed from: f () void
   private void method_54() {
      for (int var1 = 0; var1 < this.field_28; var1++) {
         for (int var2 = 0; var2 < this.field_29; var2++) {
            if (this.field_26[var1][var2] == null
               && !this.field_25[var1][var2].method_111()
               && this.field_25[var1][var2].method_113()
               && !this.field_25[var1][var2].method_112()
               && class_15.method_351(100) < this.field_40) {
               this.field_26[var1][var2] = class_2.method_30(176 + class_15.method_351(13));
            }
         }
      }

      for (int var3 = 0; var3 < this.field_28; var3++) {
         for (int var4 = 0; var4 < this.field_29; var4++) {
            if (this.field_26[var3][var4] == null && this.field_25[var3][var4].method_111() && class_15.method_351(100) < this.field_41) {
               this.field_26[var3][var4] = class_2.method_30(189 + class_15.method_351(2));
            }
         }
      }
   }

   // $VF: renamed from: a (s) void
   public final void method_55(class_0 var1) {
      this.method_57(var1, 0, 0, 0);
   }

   // $VF: renamed from: a (s, int, s) void
   public final void method_56(class_0 var1, int var2, class_0 var3) {
      if (var3 != null) {
         this.method_57(var1, var2, var3.method_2(), var3.method_3());
      } else {
         this.method_55(var1);
      }
   }

   // $VF: renamed from: a (s, int, int, int) void
   public final void method_57(class_0 var1, int var2, int var3, int var4) {
      int var5 = 0;
      int var6 = 0;

      do {
         var6 = class_15.method_351(this.field_28);
         int var7 = class_15.method_351(this.field_29);

         for (int var8 = 0; var8 < Math.abs(var2); var8++) {
            int var9 = class_15.method_351(this.field_28);
            int var10 = class_15.method_351(this.field_29);
            if (var1.method_0(var9, var10) && Math.abs(var6 - var3) >= Math.abs(var9 - var3) && Math.abs(var7 - var4) >= Math.abs(var10 - var4)) {
               var6 = var9;
               var7 = var10;
            }
         }

         if (var1.method_0(var6, var7)) {
            var1.method_1();
            var6 = 0;
         } else {
            var5++;
            var6 = 1;
            if (var5 > 100) {
               return;
            }
         }
      } while (var6 != 0);
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics) void
   public final void method_58(Graphics var1) {
      class_4.method_91();
      if (class_7.field_165 == 0) {
         for (int var2 = class_7.field_164; var2 >= class_7.field_166; var2--) {
            int var4 = (var2 << 5) - class_7.field_111;
            int var5 = 0 - (var2 << 4) - class_7.field_112;
            if (var2 == this.field_28 - 1) {
               class_15.method_417(var1, var4, var5, 23, 16391);
            }

            class_15.method_417(var1, var4, var5, 22, 16388);
         }
      }

      if (class_7.field_164 == this.field_28 - 1) {
         int var8 = this.field_28 - 1;

         for (int var3 = class_7.field_165; var3 <= class_7.field_167; var3++) {
            int var16 = (var8 << 5) + (var3 << 5) - class_7.field_111;
            int var22 = (var3 << 4) - (var8 << 4) - class_7.field_112;
            class_15.method_417(var1, var16, var22, 22, 16387);
         }
      }

      for (int var9 = class_7.field_164; var9 >= class_7.field_166; var9--) {
         for (int var12 = class_7.field_165; var12 <= class_7.field_167; var12++) {
            int var17 = (var9 << 5) + (var12 << 5) - class_7.field_111;
            int var23 = (var12 << 4) - (var9 << 4) - class_7.field_112;
            class_5 var10000 = this.field_25[var9][var12];
            int var7 = var23;
            int var6 = var17;
            Graphics var24 = var1;
            class_5 var18 = var10000;
            if (var10000.method_111()) {
               class_15.method_417(var24, var6, var7, 18, var18.field_106.field_289);
               if (class_12.field_247 == 0) {
                  class_15.method_417(var24, var6, var7, 20, var18.field_107.field_289);
               }
            } else if (var18.method_112()) {
               if (var18.field_106 != null) {
                  class_15.method_417(var24, var6, var7, 19, var18.field_106.field_289);
               }

               class_15.method_417(var24, var6, var7, var18.field_103, var18.field_104);
            } else {
               class_15.method_417(var24, var6, var7, var18.field_103, var18.field_104);
            }
         }
      }

      for (int var10 = class_7.field_164; var10 >= class_7.field_166; var10--) {
         for (int var13 = class_7.field_165; var13 <= class_7.field_167; var13++) {
            int var19 = (var10 << 5) + (var13 << 5) - class_7.field_111;
            int var25 = (var13 << 4) - (var10 << 4) - class_7.field_112;
            if (this.field_26[var10][var13] != null) {
               this.field_26[var10][var13].method_23(var1, var19, var25);
            }

            this.field_27[var10][var13] = class_14.method_328(this.field_27[var10][var13]);

            for (class_14 var28 = this.field_27[var10][var13]; var28 != null; var28 = var28.field_342) {
               var28.method_329(var1, var19, var25);
            }
         }
      }

      if (class_7.field_166 == 0) {
         for (int var14 = class_7.field_165; var14 <= class_7.field_167; var14++) {
            int var20 = 0 + (var14 << 5) - class_7.field_111;
            int var26 = (var14 << 4) - class_7.field_112;
            if (var14 == 0) {
               class_15.method_417(var1, var20, var26, 23, 16392);
            }

            class_15.method_417(var1, var20, var26, 22, 16389);
         }
      }

      if (class_7.field_167 == this.field_29 - 1) {
         for (int var11 = class_7.field_164; var11 >= class_7.field_166; var11--) {
            int var15 = this.field_29 - 1;
            int var21 = (var11 << 5) + (var15 << 5) - class_7.field_111;
            int var27 = (var15 << 4) - (var11 << 4) - class_7.field_112;
            if (var11 == this.field_28 - 1) {
               class_15.method_417(var1, var21, var27, 23, 16393);
            }

            class_15.method_417(var1, var21, var27, 22, 16390);
            if (var11 == 0) {
               class_15.method_417(var1, var21, var27, 23, 0);
            }
         }
      }

      class_4.method_102(var1);
      class_16.method_460(var1);
   }

   // $VF: renamed from: a () void
   public static void method_59() {
      for (int var0 = 0; var0 < field_50.length; var0++) {
         if (field_50[var0] != null) {
            field_50[var0].field_106.method_307();
         }
      }

      for (int var1 = 0; var1 < field_49.length; var1++) {
         field_49[var1].field_106.method_307();
         field_49[var1].field_107.method_307();
      }
   }

   // $VF: renamed from: a (int, int) r
   public static class_4 method_60(int var0, int var1) {
      Vector var2 = new Vector();
      if (var0 != -1) {
         for (int var3 = 0; var3 < class_4.field_85.size(); var3++) {
            class_4 var4;
            if ((var4 = (class_4)class_4.field_85.elementAt(var3)).field_62 == var0 && var4.field_61 == var1 && var4.method_82()) {
               var2.addElement(var4);
            }
         }
      } else {
         for (int var6 = 0; var6 < class_4.field_85.size(); var6++) {
            class_4 var7;
            if ((var7 = (class_4)class_4.field_85.elementAt(var6)).field_62 != 0 && var7.field_61 == var1 && var7.method_82()) {
               var2.addElement(var7);
            }
         }
      }

      Vector var5 = var2;
      return var2.size() > 0 ? (class_4)var5.elementAt(class_15.method_351(var5.size())) : null;
   }

   // $VF: renamed from: a (java.io.DataOutputStream) void
   public final void method_61(DataOutputStream var1) {
      var1.writeByte(this.field_30);
      var1.writeByte(this.field_28);
      var1.writeByte(this.field_29);

      for (int var2 = 0; var2 < this.field_25.length; var2++) {
         for (int var3 = 0; var3 < this.field_25[var2].length; var3++) {
            var1.writeShort(this.field_25[var2][var3].field_105);
         }
      }

      for (int var4 = 0; var4 < this.field_26.length; var4++) {
         for (int var5 = 0; var5 < this.field_26[var4].length; var5++) {
            if (this.field_26[var4][var5] != null && this.field_26[var4][var5].field_21 == null) {
               this.field_26[var4][var5].method_25(var1);
            } else {
               var1.writeShort(-1);
            }
         }
      }
   }

   public class_3(DataInputStream var1) {
      class_12.field_238 = null;
      this.field_32 = true;
      class_12.field_238 = this;
      this.field_30 = var1.readByte();
      this.field_28 = var1.readByte();
      this.field_29 = var1.readByte();
      this.field_25 = new class_5[this.field_28][this.field_29];
      this.field_26 = new class_2[this.field_28][this.field_29];
      this.field_27 = new class_14[this.field_28][this.field_29];
      this.field_24 = new Vector();
      method_49();

      for (int var2 = 0; var2 < this.field_28; var2++) {
         for (int var3 = 0; var3 < this.field_29; var3++) {
            short var4;
            if (((var4 = var1.readShort()) & 15) == 0) {
               if ((var4 & 64) != 0) {
                  this.field_25[var2][var3] = field_51[class_15.method_351(field_51.length)];
               } else if ((var4 & 32) == 0) {
                  this.field_25[var2][var3] = field_48[class_15.method_351(field_48.length)];
               } else {
                  this.field_25[var2][var3] = field_49[class_15.method_351(field_49.length)];
               }
            } else {
               this.field_25[var2][var3] = field_50[var4 & 15];
            }
         }
      }

      for (int var5 = 0; var5 < this.field_28; var5++) {
         for (int var6 = 0; var6 < this.field_29; var6++) {
            class_2 var7;
            if ((var7 = class_2.method_26(var1)) != null) {
               var7.method_0(var5, var6);
               var7.method_1();
            }
         }
      }
   }

   public class_3(int var1) {
      class_12.field_238 = null;
      class_12.field_238 = this;
      this.field_30 = var1;
      class_21.method_529(this);
      this.field_39 = Math.max(1, this.field_39);
      this.field_25 = new class_5[this.field_28][this.field_29];
      this.field_26 = new class_2[this.field_28][this.field_29];
      this.field_27 = new class_14[this.field_28][this.field_29];
      this.field_24 = new Vector();
      method_49();
      this.method_50();
      this.method_51();
      this.method_53();
      this.method_54();
      class_21.method_557();
   }
}
