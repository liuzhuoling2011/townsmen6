import hg.class_22;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: r
public final class class_4 implements class_0 {
   // $VF: renamed from: a r
   public static class_4 field_58;
   // $VF: renamed from: a int
   public int field_59;
   // $VF: renamed from: b int
   public int field_60;
   // $VF: renamed from: c int
   public int field_61;
   // $VF: renamed from: d int
   public int field_62;
   // $VF: renamed from: d boolean
   private boolean field_63 = false;
   // $VF: renamed from: e int
   public int field_64;
   // $VF: renamed from: f int
   public int field_65;
   // $VF: renamed from: a int[]
   public int[] field_66;
   // $VF: renamed from: g int
   public int field_67;
   // $VF: renamed from: h int
   public int field_68 = Integer.MIN_VALUE;
   // $VF: renamed from: i int
   public int field_69 = Integer.MIN_VALUE;
   // $VF: renamed from: a v[]
   public class_2[] field_70;
   // $VF: renamed from: a h[]
   private class_14[] field_71;
   // $VF: renamed from: b r
   public class_4 field_72;
   // $VF: renamed from: c r
   public class_4 field_73;
   // $VF: renamed from: a b
   public class_20 field_74;
   // $VF: renamed from: a boolean
   public boolean field_75;
   // $VF: renamed from: b boolean
   public boolean field_76;
   // $VF: renamed from: c boolean
   public boolean field_77;
   // $VF: renamed from: e boolean
   private boolean field_78;
   // $VF: renamed from: a l
   private class_10 field_79 = new class_10(5);
   // $VF: renamed from: b l
   private class_10 field_80 = new class_10(5);
   // $VF: renamed from: c l
   private class_10 field_81 = new class_10(5);
   // $VF: renamed from: j int
   private int field_82 = -1;
   // $VF: renamed from: k int
   private int field_83 = 0;
   // $VF: renamed from: b int[]
   private static int[] field_84 = new int[]{28, 32, 35, 20, 38, 10, 1, 17, 14, 39, 25, 23, 31, 7, 4};
   // $VF: renamed from: a java.util.Vector
   protected static Vector field_85 = new Vector(32, 16);
   // $VF: renamed from: b java.util.Vector
   public static Vector field_86 = new Vector(8, 4);
   // $VF: renamed from: c java.util.Vector
   public static Vector field_87 = new Vector(8, 4);
   // $VF: renamed from: f java.util.Vector
   private static Vector field_88 = new Vector(8, 4);
   // $VF: renamed from: g java.util.Vector
   private static Vector field_89 = new Vector(8, 4);
   // $VF: renamed from: d java.util.Vector
   public static Vector field_90 = new Vector(8, 4);
   // $VF: renamed from: h java.util.Vector
   private static Vector field_91 = new Vector(8, 4);
   // $VF: renamed from: e java.util.Vector
   public static Vector field_92 = new Vector(32, 16);
   // $VF: renamed from: a int[][]
   public static int[][] field_93 = new int[15][3];
   // $VF: renamed from: b int[][]
   public static int[][] field_94 = new int[15][3];
   // $VF: renamed from: c int[]
   private static int[] field_95 = new int[]{19, 19, 19};
   // $VF: renamed from: d int[]
   private static int[] field_96 = new int[]{-28, -28, -33};
   // $VF: renamed from: e int[]
   private static int[] field_97 = new int[]{12, 12, 13};
   // $VF: renamed from: f int[]
   private static int[] field_98 = new int[]{-37, -39, -40};
   // $VF: renamed from: g int[]
   private static int[] field_99 = new int[]{14, -11, 14};
   // $VF: renamed from: h int[]
   private static int[] field_100 = new int[]{-23, -41, -33};
   // $VF: renamed from: i int[]
   private static int[] field_101 = new int[]{-2, -2, -2};
   // $VF: renamed from: j int[]
   private static int[] field_102 = new int[]{-35, -40, 5};

   // $VF: renamed from: a () void
   public final void method_62() {
      if (this.field_71 != null) {
         if (this.method_82()) {
            for (int var4 = 0; var4 < this.field_71.length; var4++) {
               if (this.field_71[var4] != null) {
                  this.field_71[var4].method_315(class_21.method_530(this.field_62, this.field_59, this.field_71[var4].field_333));
               }
            }

            switch (this.field_62) {
               case 5:
                  int var5;
                  do {
                     var5 = 0;

                     for (int var2 = 1; var2 < this.field_70.length - 1; var2++) {
                        if (this.field_70[var2].field_12 > this.field_70[var2 + 1].field_12) {
                           class_2 var6 = this.field_70[var2];
                           this.field_70[var2] = this.field_70[var2 + 1];
                           this.field_70[var2 + 1] = var6;
                           var5 = 1;
                        }
                     }
                  } while (var5 != 0);

                  int var9 = 1;

                  for (int var7 = 0; var7 < this.field_71.length && this.field_71[var7] != null; var7++) {
                     if (this.field_71[var7].field_333 == 0) {
                        this.field_71[var7].field_315 = this.field_70[var9++];
                     }
                  }

                  var5 = this.field_70.length - 1;

                  for (int var10 = this.field_71.length - 1; var10 >= 0; var10--) {
                     if (this.field_71[var10] != null && this.field_71[var10].field_333 == 1) {
                        this.field_71[var10].field_315 = this.field_70[var5--];
                     }
                  }
            }
         } else {
            switch (this.field_62) {
               case 9:
                  for (int var3 = 0; var3 < this.field_71.length && this.field_71[var3] != null; var3++) {
                     this.field_71[var3].field_333 = 0;
                     if (this.field_59 == 0) {
                        this.field_71[var3].method_315(class_21.method_532());
                     } else {
                        this.field_71[var3].method_315(class_21.method_531());
                     }
                  }

                  return;
               default:
                  for (int var1 = 0; var1 < this.field_71.length && this.field_71[var1] != null; var1++) {
                     this.field_71[var1].field_333 = 0;
                     this.field_71[var1].method_315(class_21.method_531());
                  }
            }
         }
      }
   }

   // $VF: renamed from: a (int, int) void
   public final void method_63(int var1, int var2) {
      for (int var3 = 0; var3 < var1; var3++) {
         if (this.field_71[var3] == null) {
            return;
         }

         this.field_71[var3].field_333 = 0;
      }

      for (int var4 = var1; var4 < var1 + var2; var4++) {
         if (this.field_71[var4] == null) {
            return;
         }

         this.field_71[var4].field_333 = 1;
      }

      this.method_62();
   }

   // $VF: renamed from: a () int
   public final int method_64() {
      if (this.field_71 == null) {
         return 0;
      }

      for (int var1 = 0; var1 < this.field_71.length; var1++) {
         if (this.field_71[var1] == null) {
            return var1;
         }
      }

      return this.field_71.length;
   }

   // $VF: renamed from: b () int
   public final int method_65() {
      return this.field_71 == null ? 0 : this.field_71.length;
   }

   // $VF: renamed from: k () void
   private void method_66() {
      int var1 = class_21.method_533(this.field_62, this.field_59);
      if (this.field_71 == null) {
         this.field_71 = new class_14[var1];
      } else {
         if (this.field_62 == 3) {
            for (int var2 = 0; var2 < this.field_71.length; var2++) {
               if (this.field_71[var2] != null) {
                  this.field_71[var2].method_337(null);
                  if (this.field_71[var2].field_339 == 1) {
                     class_14.field_345.removeElement(this.field_71[var2]);
                     this.field_71[var2].method_327();
                  }

                  this.field_71[var2] = null;
               }
            }
         }

         if (var1 > this.field_71.length) {
            class_14[] var4 = this.field_71;
            this.field_71 = new class_14[var1];
            System.arraycopy(var4, 0, this.field_71, 0, var4.length);
         } else if (var1 < this.field_71.length) {
            class_14[] var5 = this.field_71;
            this.field_71 = new class_14[var1];
            System.arraycopy(var5, 0, this.field_71, 0, this.field_71.length);

            for (int var3 = this.field_71.length; var3 < var5.length; var3++) {
               if (var5[var3] != null) {
                  var5[var3].method_337(null);
               }
            }
         }
      }

      if (!class_12.field_238.field_32) {
         if (class_12.field_245 != 0 || class_12.method_282(589824) <= 0 || this.field_62 != 14) {
            if (class_12.field_245 != 0 || class_12.method_282(720896) <= 0 || this.field_62 != 13 && this.field_62 != 12) {
               if (class_14.field_346.size() > 0 && this.field_71 != null && this.field_71.length > 0 && this.field_71[0] == null) {
                  this.method_67();
               }
            }
         }
      }
   }

   // $VF: renamed from: b () void
   public final void method_67() {
      if (class_14.field_346.size() > 0) {
         class_14 var1 = (class_14)class_14.field_346.firstElement();
         int var2 = this.method_73();

         for (int var3 = 0; var3 < this.field_71.length; var3++) {
            if (this.field_71[var3] == null) {
               while (field_92.removeElement(this)) {
               }

               this.field_71[var3] = var1;
               this.field_71[var3].method_337(this);
               if (var2 < this.method_71()) {
                  this.field_71[var3].field_333 = 0;
                  return;
               }

               this.field_71[var3].field_333 = 1;
               return;
            }
         }
      }
   }

   // $VF: renamed from: a (h) void
   public final void method_68(class_14 var1) {
      if (class_14.field_346.size() > 0) {
         for (int var2 = 0; var2 < this.field_71.length; var2++) {
            if (this.field_71[var2] == null) {
               while (field_92.removeElement(this)) {
               }

               this.field_71[var2] = var1;
               this.field_71[var2].method_337(this);
               return;
            }
         }
      }
   }

   // $VF: renamed from: c () void
   public final void method_69() {
      for (int var1 = this.field_71.length - 1; var1 >= 0; var1--) {
         if (this.field_71[var1] != null) {
            this.field_71[var1].method_337(null);
            this.field_71[var1] = null;
            if (var1 == 0 && !field_92.contains(this)) {
               field_92.addElement(this);
            }

            return;
         }
      }
   }

   // $VF: renamed from: l () void
   private void method_70() {
      int var1 = this.method_64();

      for (int var2 = 0; var2 < var1; var2++) {
         this.method_69();
      }
   }

   // $VF: renamed from: c () int
   public final int method_71() {
      if (!this.method_82()) {
         return this.field_71.length;
      }

      switch (this.field_62) {
         case 5:
            int var1 = 0;

            for (int var2 = 1; var2 < this.field_70.length; var2++) {
               if (this.field_70[var2].field_12 == 96) {
                  var1++;
               }
            }

            return var1;
         default:
            return this.field_71.length;
      }
   }

   // $VF: renamed from: d () int
   public final int method_72() {
      if (!this.method_82()) {
         return 0;
      }

      switch (this.field_62) {
         case 5:
            int var1 = 0;

            for (int var2 = 1; var2 < this.field_70.length; var2++) {
               if (this.field_70[var2].field_12 == 112) {
                  var1++;
               }
            }

            return var1;
         case 7:
            return this.field_71.length;
         case 10:
            if (this.field_59 == 0) {
               return 0;
            }

            return this.field_71.length;
         default:
            return 0;
      }
   }

   // $VF: renamed from: e () int
   public final int method_73() {
      if (this.field_71 == null) {
         return 0;
      }

      int var1 = 0;

      for (int var2 = 0; var2 < this.field_71.length; var2++) {
         if (this.field_71[var2] != null && this.field_71[var2].field_333 == 0) {
            var1++;
         }
      }

      return var1;
   }

   // $VF: renamed from: f () int
   public final int method_74() {
      if (this.field_71 == null) {
         return 0;
      }

      int var1 = 0;

      for (int var2 = 0; var2 < this.field_71.length; var2++) {
         if (this.field_71[var2] != null && this.field_71[var2].field_333 == 1) {
            var1++;
         }
      }

      return var1;
   }

   // $VF: renamed from: g () int
   public final int method_75() {
      int[] var1;
      return (var1 = class_21.method_530(this.field_62, this.field_59, 0)) == null ? -1 : var1[0];
   }

   // $VF: renamed from: h () int
   public final int method_76() {
      int[] var1;
      return (var1 = class_21.method_530(this.field_62, this.field_59, 1)) == null ? -1 : var1[0];
   }

   // $VF: renamed from: a (int) void
   public final void method_77(int var1) {
      for (int var2 = 0; var2 < this.field_66.length; var2++) {
         if (this.field_66[var2] > 0 && class_12.method_281(this.field_66[var2]) == class_12.method_281(var1)) {
            this.field_66[var2] = this.field_66[var2] + class_12.method_280(var1);
            return;
         }
      }

      for (int var3 = 0; var3 < this.field_66.length; var3++) {
         if (this.field_66[var3] == -1) {
            this.field_66[var3] = var1;
            return;
         }
      }
   }

   // $VF: renamed from: i () int
   public final int method_78() {
      int var1;
      int var2 = var1 = class_15.method_351(this.field_66.length);

      do {
         var1 = (var1 + 1) % this.field_66.length;
         if (class_12.method_280(this.field_66[var1]) == 0) {
            this.field_66[var1] = -1;
         }
      } while (this.field_66[var1] == -1 && var1 != var2);

      if (this.field_66[var1] == -1) {
         return 0;
      }

      int var3;
      if (class_12.method_281(var2 = this.field_66[var1]) != 1114112) {
         int var4 = Math.min(class_12.method_280(var2), 2);
         if ((var3 = class_12.method_273(var2, var4)) < var4) {
            this.method_104(class_12.field_285[var2 >> 16], 16485);
         }
      } else {
         int var7 = class_12.method_280(var2);
         if ((var3 = class_12.method_273(var2, var7)) < var7) {
            this.method_104(class_12.field_285[var2 >> 16], 16485);
         }
      }

      if (var3 == 0) {
         this.method_104(class_12.field_285[var2 >> 16], 16486);
         if (this.field_72 != null) {
            this.field_72.method_104(class_12.field_285[var2 >> 16], 16486);
         }
      }

      if (var3 != 0) {
         if (class_12.method_280(var2 = var2 - var3) == 0) {
            this.field_66[var1] = -1;
         } else {
            this.field_66[var1] = var2;
         }

         return class_12.method_281(var2) | var3;
      } else {
         return 0;
      }
   }

   // $VF: renamed from: j () int
   public final int method_79() {
      switch (this.field_62) {
         case 13:
            return this.field_67 | 786432;
         case 14:
            return this.field_67 | 851968;
         default:
            return -1;
      }
   }

   // $VF: renamed from: d () void
   public final void method_80() {
      this.field_72 = class_1.method_9(this);
   }

   // $VF: renamed from: e () void
   public final void method_81() {
      this.field_73 = class_1.method_8(this);
   }

   // $VF: renamed from: a () boolean
   public final boolean method_82() {
      return this.field_64 == 0;
   }

   // $VF: renamed from: b (int) void
   public final void method_83(int var1) {
      this.field_64 = Math.max(this.field_64 - var1, 0);
      if (this.field_64 == 0) {
         field_93[this.field_62][this.field_59]--;
         this.method_85();
         class_16.method_463(class_22.field_581, 32);
         if (class_7.method_168(this)) {
            class_7.method_167(this);
         }
      }
   }

   // $VF: renamed from: f () void
   public final void method_84() {
      this.field_76 = false;
      this.field_67 = 0;
      if (class_7.field_142 == this) {
         class_7.method_154(0);
      }

      if (this.field_61 == 1) {
         if (this.field_62 == 14) {
            field_90.removeElement(this);
         }
      } else if (this.field_61 == 2) {
         field_91.removeElement(this);
      } else {
         field_93[this.field_62][this.field_59]--;
         if (this.method_82()) {
            field_94[this.field_62][this.field_59]--;
         }

         this.method_70();

         while (field_92.removeElement(this)) {
         }

         switch (this.field_62) {
            case 1:
               if (this.method_82()) {
                  field_86.removeElement(this);
                  method_93();
                  class_12.field_277 = class_12.field_277 - class_21.field_573[this.field_59];
                  class_12.method_290();
                  return;
               }
               break;
            case 2:
               field_87.removeElement(this);
               method_94();
               return;
            case 3:
               for (int var4 = 0; var4 < class_14.field_347.size(); var4++) {
                  class_14 var6;
                  if ((var6 = (class_14)class_14.field_347.elementAt(var4)).field_313 == this) {
                     var6.method_336(null);
                  }
               }

               return;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 12:
            default:
               break;
            case 11:
               return;
            case 13:
               for (int var3 = 0; var3 < class_14.field_352.size(); var3++) {
                  class_14 var5;
                  if ((var5 = (class_14)class_14.field_352.elementAt(var3)).field_313 == this) {
                     var5.method_336(null);
                  }
               }

               this.field_67 = 0;
               class_14.method_343();
               break;
            case 14:
               for (int var1 = 0; var1 < class_14.field_349.size(); var1++) {
                  class_14 var2;
                  if ((var2 = (class_14)class_14.field_349.elementAt(var1)).field_313 == this) {
                     var2.method_336(null);
                  }
               }

               this.field_67 = 0;
               class_14.method_344();
               return;
         }
      }
   }

   // $VF: renamed from: m () void
   private void method_85() {
      this.method_99();
      if (this.field_61 == 2) {
         field_91.addElement(this);
      } else if (this.field_61 == 1) {
         if (this.field_62 == 14) {
            field_90.addElement(this);
         }
      } else {
         this.method_66();
         if (this.method_82()) {
            field_93[this.field_62][this.field_59]++;
            field_94[this.field_62][this.field_59]++;
            label145:
            switch (this.field_62) {
               case 0:
                  if (this.field_59 == 1) {
                     class_21.method_560(3);
                  }

                  this.method_70();
                  this.field_71 = new class_14[0];

                  while (true) {
                     if (field_92.removeElement(this)) {
                        continue;
                     }
                     break label145;
                  }
               case 1:
                  this.method_70();
                  this.field_71 = new class_14[0];

                  while (field_92.removeElement(this)) {
                  }

                  field_86.addElement(this);
                  method_93();
                  class_12.field_277 = class_12.field_277 + class_21.field_573[this.field_59];
                  break;
               case 2:
                  this.method_70();
                  this.field_71 = new class_14[0];

                  while (field_92.removeElement(this)) {
                  }

                  method_94();
                  field_87.addElement(this);
                  break;
               case 3:
                  this.method_70();

                  while (field_92.removeElement(this)) {
                  }

                  int var7 = 0;

                  for (int var10 = 0; var10 < class_14.field_345.size() && var7 < this.field_71.length; var10++) {
                     class_14 var14;
                     if ((var14 = (class_14)class_14.field_345.elementAt(var10)).field_314 == this) {
                        this.field_71[var7] = var14;
                        var7++;
                     }
                  }

                  for (int var11 = 0; var11 < this.field_71.length; var11++) {
                     this.field_71[var11] = class_14.method_332(1);
                     this.field_71[var11].method_336(this);
                     this.field_71[var11].method_337(this);
                     this.field_71[var11].method_334(this.field_68, this.field_69);
                     this.field_71[var11].method_315(class_21.method_530(this.field_62, this.field_59, 0));
                     this.field_71[var11].field_335 = class_15.method_352(2, 15) + var11 * 50;
                  }

                  if (!class_12.field_238.field_32) {
                     int var12 = class_21.field_566[this.field_59];

                     for (int var15 = 0; var15 < var12; var15++) {
                        class_14 var8;
                        if (!class_14.field_348.isEmpty()) {
                           var8 = (class_14)class_14.field_348.firstElement();
                        } else {
                           var8 = class_14.method_332(0);
                        }

                        var8.method_336(this);
                     }
                  }
               case 4:
               case 6:
               case 7:
               case 9:
               case 10:
               case 12:
               default:
                  break;
               case 5:
                  this.method_63(this.method_71(), this.method_72());
                  break;
               case 8:
                  class_1.method_11(this);
                  break;
               case 11:
                  this.method_70();
                  this.field_71 = new class_14[0];

                  while (true) {
                     if (field_92.removeElement(this)) {
                        continue;
                     }
                     break label145;
                  }
               case 13:
                  boolean var5 = this.method_64() > 0;
                  this.method_70();
                  this.field_71 = new class_14[1];
                  if (var5) {
                     this.method_67();
                  }

                  int var9 = class_21.method_536(this.field_62, this.field_59);

                  for (int var13 = 0; var13 < var9; var13++) {
                     if (!class_14.field_353.isEmpty()) {
                        class_14 var6;
                        (var6 = (class_14)class_14.field_353.firstElement()).method_336(this);
                        var6.field_335 = class_15.method_352(2, 15) + var13 * 50;
                     }
                  }

                  field_89.addElement(this);
                  break;
               case 14:
                  boolean var1 = this.method_64() > 0;
                  this.method_70();
                  this.field_71 = new class_14[1];
                  if (var1) {
                     this.method_67();
                  }

                  int var2 = class_21.method_536(this.field_62, this.field_59);

                  for (int var3 = 0; var3 < var2; var3++) {
                     if (!class_14.field_350.isEmpty()) {
                        class_14 var4;
                        (var4 = (class_14)class_14.field_350.firstElement()).method_336(this);
                        var4.field_335 = class_15.method_352(2, 15) + var3 * 50;
                     }
                  }

                  field_88.addElement(this);
            }
         }

         this.method_62();
      }
   }

   // $VF: renamed from: b () boolean
   public final boolean method_86() {
      this.method_84();
      this.field_59++;
      this.field_64 = -2;
      switch (this.field_62) {
         case 5:
            class_2[] var1 = this.field_70;
            this.field_70 = new class_2[class_21.method_533(this.field_62, this.field_59) + 1];
            System.arraycopy(var1, 0, this.field_70, 0, var1.length);
         default:
            this.method_99();
            return this.method_1();
      }
   }

   // $VF: renamed from: a (int, int, int) r
   public static class_4 method_87(int var0, int var1, int var2) {
      class_4 var3;
      (var3 = new class_4()).field_61 = var2;
      var3.field_59 = var1;
      var3.field_60 = var1;
      var3.field_62 = var0;
      switch (var0) {
         case 0:
            var3.field_70 = new class_2[]{class_2.method_40(var3), class_2.method_40(var3)};
            var3.field_70[0].field_17 |= 8;
            break;
         case 1:
            var3.field_70 = new class_2[]{class_2.method_40(var3), class_2.method_40(var3)};
            var3.field_70[0].field_17 |= 16;
            break;
         case 2:
            var3.field_70 = new class_2[]{class_2.method_40(var3)};
            var3.field_77 = true;
            var3.field_78 = true;
            var3.field_76 = true;
            var3.field_70[0].field_18 = new class_13();
            var3.field_70[0].field_18.method_308(class_13.field_310);
            break;
         case 3:
            var3.field_70 = new class_2[]{class_2.method_40(var3)};
            var3.field_77 = true;
            var3.field_70[0].field_18 = new class_13(class_13.field_303);
            break;
         case 4:
            var3.field_70 = new class_2[]{class_2.method_40(var3)};
            var3.field_70[0].field_18 = new class_13(class_13.field_305);
            var3.field_70[0].field_18.method_312();
            break;
         case 5:
            var3.field_70 = new class_2[class_21.method_533(var0, var1) + 1];
            var3.field_70[0] = class_2.method_38(var3);
            if (var2 != 0) {
               for (int var4 = 1; var4 < var3.field_70.length; var4++) {
                  var3.field_70[var4] = var4 % 2 == 0 ? class_2.method_35(var3) : class_2.method_34(var3);
               }
            }
            break;
         case 6:
            var3.field_70 = new class_2[]{class_2.method_40(var3)};
            var3.field_77 = true;
            var3.field_70[0].field_18 = new class_13(class_13.field_303);
            break;
         case 7:
            var3.field_70 = new class_2[]{class_2.method_40(var3)};
            var3.field_77 = true;
            var3.field_70[0].field_18 = new class_13(class_13.field_303);
            break;
         case 8:
            var3.field_70 = new class_2[]{class_2.method_36(var3)};
            break;
         case 9:
            var3.field_70 = new class_2[]{class_2.method_40(var3)};
            break;
         case 10:
            var3.field_70 = new class_2[]{class_2.method_37(var3)};
            break;
         case 11:
            var3.field_70 = new class_2[]{class_2.method_29(var3), class_2.method_29(var3), class_2.method_29(var3), class_2.method_29(var3)};
            break;
         case 12:
            var3.field_70 = new class_2[]{class_2.method_40(var3)};
            var3.field_77 = true;
            var3.field_70[0].field_18 = new class_13();
            var3.field_70[0].field_18.method_308(class_13.field_311);
            break;
         case 13:
            var3.field_70 = new class_2[]{class_2.method_40(var3)};
            var3.field_77 = true;
            var3.field_70[0].field_18 = new class_13(class_13.field_303);
            break;
         case 14:
            var3.field_70 = new class_2[]{class_2.method_40(var3)};
            var3.field_77 = true;
            var3.field_78 = true;
            var3.field_76 = true;
            var3.field_70[0].field_18 = new class_13();
            var3.field_70[0].field_18.method_308(class_13.field_310);
      }

      var3.method_99();
      return var3;
   }

   // $VF: renamed from: a (int, int, int, boolean) r
   public static class_4 method_88(int var0, int var1, int var2, boolean var3) {
      class_4 var4 = method_87(var0, var1, var2);
      if (var0 != 0 && var3) {
         var4.field_64 = -1;
         var4.method_99();
      }

      return var4;
   }

   // $VF: renamed from: a (int) r
   public static class_4 method_89(int var0) {
      class_4 var1;
      (var1 = method_87(var0, 1, 2)).field_63 = true;
      return var1;
   }

   // $VF: renamed from: g () void
   public final void method_90() {
      if (this.field_61 == 0) {
         class_12.method_286(class_21.method_538(this.field_62, this.field_59));
         if (!this.method_82() && this.field_66 != null) {
            class_12.method_287(this.field_66);
         }

         class_12.method_290();
      }

      this.method_84();
      switch (this.field_62) {
         case 10:
            this.field_70[0].method_24();
            class_2 var5;
            (var5 = class_2.method_28()).method_0(this.field_68, this.field_69);
            var5.method_1();
            field_85.removeElement(this);
            return;
         case 14:
            for (int var1 = 0; var1 < class_14.field_355.size(); var1++) {
               class_14 var2;
               if ((var2 = (class_14)class_14.field_355.elementAt(var1)).field_313 == this) {
                  class_15.method_387(var2);
               }
            }
         default:
            for (int var4 = 0; var4 < this.field_70.length; var4++) {
               if (this.field_70[var4] != null) {
                  int var6 = this.field_70[var4].field_19;
                  int var3 = this.field_70[var4].field_20;
                  this.field_70[var4].method_24();
                  this.field_70[var4] = class_2.method_39(false);
                  this.field_70[var4].method_0(var6, var3);
                  this.field_70[var4].method_1();
               }
            }

            field_85.removeElement(this);
      }
   }

   // $VF: renamed from: h () void
   public static void method_91() {
      for (int var0 = 0; var0 < field_85.size(); var0++) {
         ((class_4)field_85.elementAt(var0)).field_75 = false;
      }
   }

   // $VF: renamed from: i () void
   public static void method_92() {
      field_58 = null;
      field_87.removeAllElements();
      field_86.removeAllElements();
      field_85.removeAllElements();
      field_88.removeAllElements();
      field_89.removeAllElements();
      field_90.removeAllElements();
      field_91.removeAllElements();
      field_92.removeAllElements();

      for (int var0 = 0; var0 < field_93.length; var0++) {
         field_93[var0][0] = 0;
         field_93[var0][1] = 0;
         field_93[var0][2] = 0;
      }

      for (int var1 = 0; var1 < field_94.length; var1++) {
         field_94[var1][0] = 0;
         field_94[var1][1] = 0;
         field_94[var1][2] = 0;
      }
   }

   // $VF: renamed from: n () void
   private static void method_93() {
      for (int var0 = 0; var0 < field_85.size(); var0++) {
         ((class_4)field_85.elementAt(var0)).field_72 = null;
      }
   }

   // $VF: renamed from: o () void
   private static void method_94() {
      for (int var0 = 0; var0 < field_85.size(); var0++) {
         ((class_4)field_85.elementAt(var0)).field_73 = null;
      }
   }

   // $VF: renamed from: a (int) s
   public final class_0 method_95(int var1) {
      switch (var1) {
         case 96:
            return class_2.method_34(this);
         case 112:
            return class_2.method_35(this);
         default:
            return null;
      }
   }

   // $VF: renamed from: a () int[]
   public final int[] method_96() {
      return this.field_62 == 5 ? new int[]{96, 112} : null;
   }

   // $VF: renamed from: j () void
   public final void method_97() {
      if (this.field_59 == this.field_60) {
         field_94[this.field_62][this.field_59]++;
         this.method_90();
      } else {
         int var1 = this.method_64();
         this.method_84();
         if (this.field_66 != null) {
            class_12.method_286(class_21.method_537(this.field_62, this.field_59));
            if (!this.method_82()) {
               class_12.method_287(this.field_66);
            }

            class_12.method_290();
         }

         this.field_59--;
         this.field_64 = 0;
         this.field_66 = null;
         switch (this.field_62) {
            case 5:
               class_2[] var2 = this.field_70;
               this.field_70 = new class_2[class_21.method_533(this.field_62, this.field_59) + 1];
               System.arraycopy(var2, 0, this.field_70, 0, this.field_70.length);

               for (int var3 = this.field_70.length; var3 < var2.length; var3++) {
                  if (var2[var3] != null) {
                     var2[var3].method_24();
                  }
               }

               this.method_99();
               break;
            case 8:
               this.method_99();
               class_1.method_11(this);
               break;
            default:
               this.method_99();
         }

         this.method_85();

         for (int var4 = 0; var4 < var1 && var4 < class_21.method_533(this.field_62, this.field_59); var4++) {
            this.method_67();
         }
      }
   }

   // $VF: renamed from: a (v) boolean
   public final boolean method_98(class_2 var1) {
      for (int var2 = 1; var2 < this.field_70.length; var2++) {
         if (this.field_70[var2] == null) {
            this.field_70[var2] = var1;
            if (var2 < this.field_70.length - 1) {
               return true;
            }

            return false;
         }
      }

      return false;
   }

   // $VF: renamed from: p () void
   private void method_99() {
      switch (this.field_62) {
         case 0:
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16399;
            this.field_70[1].field_13 = 27;
            this.field_70[1].field_14 = 16399;
            if (this.field_59 != 2) {
               this.field_70[0].method_41(45, 16443 + this.field_59);
               this.field_70[1].method_41(45, 16445 + this.field_59);
            } else {
               this.field_70[0].method_41(46, 16447);
               this.field_70[1].method_41(46, 16448);
            }
            break;
         case 1:
            this.field_70[0].method_41(47, 16449 + this.field_59);
            this.field_70[1].method_41(47, 16452 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16399;
            this.field_70[1].field_13 = 27;
            this.field_70[1].field_14 = this.field_59 == 0 ? 16398 : 16399;
            break;
         case 2:
            this.field_70[0].method_41(48, 16455 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16398;
            break;
         case 3:
            this.field_70[0].method_41(40, 16430 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = this.field_59 == 0 ? 16398 : 16399;
            break;
         case 4:
            this.field_70[0].method_41(30, 0);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16399;
            break;
         case 5:
            this.field_70[0].method_41(31, 16406 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16399;
            break;
         case 6:
            this.field_70[0].method_41(35, 16415 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = this.field_59 == 0 ? 16398 : 16399;
            break;
         case 7:
            this.field_70[0].method_41(42, 16436 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16399;
            break;
         case 8:
            this.field_70[0].method_41(36, 16418 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = this.field_59 == 0 ? 16398 : 16399;
            break;
         case 9:
            this.field_70[0].method_41(37, 16421 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16398;
            break;
         case 10:
            this.field_70[0].method_41(41, 16433 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = this.field_59 == 0 ? 16398 : 16399;
            break;
         case 11:
            this.field_70[0].method_41(44, 16439);
            this.field_70[1].method_41(44, 16441);
            this.field_70[2].method_41(44, 16442);
            this.field_70[3].method_41(44, 16440);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16398;
            this.field_70[1].field_13 = 27;
            this.field_70[1].field_14 = 16398;
            this.field_70[2].field_13 = 27;
            this.field_70[2].field_14 = 16398;
            this.field_70[3].field_13 = 27;
            this.field_70[3].field_14 = 16398;
            break;
         case 12:
            this.field_70[0].method_41(49, 16458 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16399;
            break;
         case 13:
            this.field_70[0].method_41(38, 16424 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = 16399;
            break;
         case 14:
            this.field_70[0].method_41(39, 16427 + this.field_59);
            this.field_70[0].field_13 = 27;
            this.field_70[0].field_14 = this.field_59 == 0 ? 16398 : 16399;
      }

      if (this.method_82()) {
         this.field_70[0].field_13 = 0;
         this.field_70[0].field_14 = 0;
      }
   }

   // $VF: renamed from: c (int) void
   public final void method_100(int var1) {
      if (this.field_61 != var1) {
         this.field_67 = 0;
      }

      this.field_61 = var1;
      this.method_85();
   }

   // $VF: renamed from: c () boolean
   public final boolean method_1() {
      switch (this.field_62) {
         case 0:
            for (int var9 = 0; var9 < this.field_70.length; var9++) {
               this.field_70[var9].method_1();
            }

            if (this.field_61 == 0 && field_58 != this) {
               field_58 = this;
               if (!class_12.field_238.field_32) {
                  class_21.method_550();
               }

               while (field_91.size() > 0) {
                  class_4 var10;
                  (var10 = (class_4)field_91.firstElement()).method_84();
                  var10.method_100(0);
               }
            }
            break;
         case 1:
            class_1.method_6();

            for (int var8 = 0; var8 < this.field_70.length; var8++) {
               this.field_70[var8].method_1();
            }
            break;
         case 2:
            for (int var7 = 0; var7 < this.field_70.length; var7++) {
               this.field_70[var7].method_1();
            }
            break;
         case 3:
         case 4:
         default:
            for (int var6 = 0; var6 < this.field_70.length; var6++) {
               this.field_70[var6].method_1();
            }
            break;
         case 5:
            this.field_70[0].method_1();
            if (this.field_61 != 0) {
               for (int var1 = 1; var1 < this.field_70.length; var1++) {
                  class_12.field_238.method_56(this.field_70[var1], 128, this);
               }

               for (int var3 = 0; var3 < this.field_70.length; var3++) {
                  if (!this.field_70[var3].method_48()) {
                     for (int var4 = 0; var4 < this.field_70.length; var4++) {
                        this.field_70[var4].method_24();
                     }

                     return false;
                  }
               }
            } else {
               for (int var5 = 0; var5 < this.field_70.length; var5++) {
                  if (this.field_70[var5] == null) {
                     return true;
                  }
               }
            }
      }

      if (this.method_82()) {
         this.method_85();
      } else if (!class_12.field_238.field_32) {
         class_4 var11 = this;
         if (this.field_64 == -1) {
            var11.field_66 = class_21.method_538(var11.field_62, var11.field_59);
            var11.field_64 = 0;

            for (int var13 = 0; var13 < var11.field_66.length; var13++) {
               var11.field_64 = var11.field_64 + class_12.method_280(var11.field_66[var13]);
            }

            var11.field_65 = var11.field_64;
         } else {
            var11.field_66 = class_21.method_537(var11.field_62, var11.field_59);
            var11.field_64 = 0;

            for (int var2 = 0; var2 < var11.field_66.length; var2++) {
               var11.field_64 = var11.field_64 + class_12.method_280(var11.field_66[var2]);
            }

            var11.field_65 = var11.field_64;
         }

         if (!field_92.contains(var11)) {
            field_92.addElement(var11);
         }

         var11.method_66();
         var11.method_62();
         field_93[var11.field_62][var11.field_59]++;
         class_7.field_142 = var11;
         class_7.method_164();
      } else {
         class_4 var12 = this;
         if (!field_92.contains(var12)) {
            field_92.addElement(var12);
         }

         var12.method_66();
         var12.method_62();
         field_93[var12.field_62][var12.field_59]++;
      }

      if (!field_85.contains(this)) {
         field_85.addElement(this);
      }

      return false;
   }

   // $VF: renamed from: a (int, int) boolean
   public final boolean method_0(int var1, int var2) {
      this.field_68 = var1;
      this.field_69 = var2;
      if (this.field_61 != 1 || var1 >= 1 && var1 < class_12.field_238.field_28 - 1 && var2 >= 1 && var2 < class_12.field_238.field_29 - 1) {
         boolean var3 = false;
         switch (this.field_62) {
            case 0:
               var3 = this.field_70[0].method_0(var1, var2);
               if (this.field_70[1].method_0(var1, var2 + 1) && var3) {
                  return true;
               }

               return false;
            case 1:
               var3 = this.field_70[0].method_0(var1, var2);
               if (this.field_70[1].method_0(var1 - 1, var2) && var3) {
                  return true;
               }

               return false;
            case 11:
               var3 = this.field_70[0].method_0(var1, var2);
               var3 = this.field_70[1].method_0(var1, var2 + 1) && var3;
               var3 = this.field_70[2].method_0(var1 - 1, var2 + 1) && var3;
               if (this.field_70[3].method_0(var1 - 1, var2) && var3) {
                  return true;
               }

               return false;
            default:
               return this.field_70[0].method_0(var1, var2);
         }
      } else {
         return false;
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int) void
   public final void method_101(Graphics var1, int var2, int var3) {
      if (this.field_76 || this.field_78) {
         switch (this.field_62) {
            case 2:
               if (this.field_59 == 1) {
                  class_15.method_417(var1, var2, var3 + -18, 54, this.field_70[0].field_18.field_289);
                  return;
               }
               break;
            case 3:
               class_15.method_417(var1, var2 + field_99[this.field_59], var3 + field_100[this.field_59], 52, this.field_70[0].field_18.field_289);
               return;
            case 4:
            case 5:
            case 8:
            case 9:
            case 10:
            case 11:
            default:
               break;
            case 6:
               class_15.method_417(var1, var2 + field_95[this.field_59], var3 + field_96[this.field_59], 52, this.field_70[0].field_18.field_289);
               return;
            case 7:
               class_15.method_417(var1, var2 + field_97[this.field_59], var3 + field_98[this.field_59], 52, this.field_70[0].field_18.field_289);
               return;
            case 12:
               class_15.method_417(var1, var2, var3, 55, this.field_70[0].field_18.field_289);
               break;
            case 13:
               class_15.method_417(var1, var2 + field_101[this.field_59], var3 + field_102[this.field_59], 52, this.field_70[0].field_18.field_289);
               return;
            case 14:
               if (this.field_59 == 0 && this.field_67 > 0) {
                  class_15.method_417(var1, var2, var3 + -15, 53, this.field_70[0].field_18.field_289);
                  return;
               }
         }
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics) void
   public static void method_102(Graphics var0) {
      for (int var1 = 0; var1 < field_85.size(); var1++) {
         class_4 var2;
         if ((var2 = (class_4)field_85.elementAt(var1)).field_75) {
            class_4 var3 = var2;
            if (var2.field_80.field_232 > 0) {
               for (int var4 = 0; var4 < var3.field_81.field_232; var4++) {
                  if (class_12.field_240 - var3.field_81.method_247(var4) > 5000) {
                     var3.field_79.method_250(var4);
                     var3.field_80.method_250(var4);
                     var3.field_81.method_250(var4);
                     var4--;
                  }
               }
            }

            int var16 = (var2.field_68 << 5) + (var2.field_69 << 5) - class_7.field_111;
            int var18 = (var2.field_69 << 4) - (var2.field_68 << 4) - class_7.field_112;
            int var5 = var18;
            int var14 = var16;
            Graphics var19 = var0;
            var3 = var2;
            switch (var2.field_62) {
               case 0:
                  var14 += 26;
                  var5 -= 26;
                  break;
               case 1:
                  var5 -= 26;
               case 11:
                  break;
               default:
                  var5 -= 30;
            }

            if (var3.field_82 != -1) {
               int var6 = 18 * (class_15.method_356(class_22.field_581 / 2 + var3.field_68 * 205887 / 5 + var3.field_69 * 205887 / 3) - 65536) / 65536;
               class_15.method_418(var19, var14, var5 + var6, 169, var3.field_82, 33);
               if (var3.field_83 < class_12.field_240) {
                  var3.field_82 = -1;
               }
            }

            if (var3.field_74 != null) {
               var3.field_74.method_509(var19, var14, var5);
            } else if (var3.field_61 == 1) {
               int var24 = 3 * (class_15.method_356(class_22.field_581 / 4) - 65536) / 65536;
               class_15.method_418(var19, var14 + var24, var5, 153, 0, 33);
            } else {
               int var22 = class_15.method_356(class_22.field_581 + var3.field_68 * 205887 / 5 + var3.field_69 * 205887 / 3);
               int var7 = class_15.method_355(class_22.field_581 + var3.field_68 * 205887 / 5 + var3.field_69 * 205887 / 3);
               int var15 = var14 + (var7 << 1) / 65536;
               var5 += var22 * 3 / 65536;
               if (var3.method_65() != 0 && var3.method_64() == 0) {
                  var3.field_76 = false;
                  class_15.method_417(var19, var15, var5, 111, 16);
               } else {
                  var22 = var3.field_80.field_232 / 3 + (var3.field_80.field_232 % 3 != 0 ? 1 : 0);
                  var7 = 0;
                  var5 = var5 - var22 * class_15.method_409(111) - (var22 << 1);

                  for (int var8 = 0; var8 < var22; var8++) {
                     int var9 = Math.min(3, var3.field_80.field_232 - var7);
                     int var10 = var15 - var9 * (class_15.method_408(111) + 2) / 2;

                     for (int var11 = var7; var7 < var11 + var9; var7++) {
                        int var12 = var3.field_79.method_247(var7);
                        int var13 = var3.field_80.method_247(var7);
                        if (var12 != -1) {
                           class_15.method_417(var19, var10, var5, 110, var12);
                        }

                        class_15.method_417(var19, var10, var5, 111, var13);
                        var10 += class_15.method_408(111) + 2;
                     }

                     var5 += class_15.method_409(111) + 2;
                  }
               }
            }
         }
      }
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics) void
   public final void method_4(Graphics var1) {
      for (int var2 = 0; var2 < this.field_70.length; var2++) {
         if (this.field_70[var2] != null) {
            this.field_70[var2].method_4(var1);
         }
      }
   }

   // $VF: renamed from: d (int) void
   public final void method_103(int var1) {
      this.field_83 = class_12.field_240 + 4000;
      this.field_82 = var1;
   }

   // $VF: renamed from: b (int, int) void
   public final void method_104(int var1, int var2) {
      int var4 = var1;
      int var3 = var4;
      class_10 var8 = this.field_79;
      int var5 = 0;

      int var10000;
      while (true) {
         if (var5 >= var8.field_232) {
            var10000 = -1;
            break;
         }

         if (var3 == var8.field_231[var5]) {
            var10000 = var5;
            break;
         }

         var5++;
      }

      var3 = var10000;
      if (var10000 != -1) {
         this.field_80.method_249(var2, var3);
         this.field_81.method_249(class_12.field_240, var3);
      } else {
         this.field_79.method_252(var1);
         this.field_80.method_252(var2);
         this.field_81.method_252(class_12.field_240);
      }
   }

   // $VF: renamed from: k () int
   public final int method_2() {
      return this.field_68;
   }

   // $VF: renamed from: l () int
   public final int method_3() {
      return this.field_69;
   }

   // $VF: renamed from: d () boolean
   public final boolean method_105() {
      for (int var1 = 0; var1 < this.field_70.length; var1++) {
         if (this.field_70[var1] == null || !this.field_70[var1].method_48()) {
            return false;
         }
      }

      return true;
   }

   // $VF: renamed from: e () boolean
   public final boolean method_106() {
      return !this.field_63 && class_12.field_246 && class_21.field_564[this.field_62];
   }

   // $VF: renamed from: a (int, int) java.lang.String
   public static String method_107(int var0, int var1) {
      switch (var0) {
         case 16:
            return class_15.method_424(74);
         case 32:
            return class_15.method_424(88);
         case 96:
            return class_15.method_424(24);
         case 112:
            return class_15.method_424(13);
         default:
            return var0 < 15 ? class_15.method_424(field_84[var0] + var1) : null;
      }
   }

   // $VF: renamed from: a (int) int
   public static int method_108(int var0) {
      switch (var0) {
         case 5:
            switch (class_15.method_351(3)) {
               case 0:
                  return 14;
               case 1:
                  return 15;
               case 2:
                  return 20;
            }
         case 14:
            return 38;
         default:
            return -1;
      }
   }

   private class_4() {
   }

   // $VF: renamed from: a (java.io.DataOutputStream) void
   public static void method_109(DataOutputStream var0) {
      var0.writeInt(field_85.size());

      for (int var1 = 0; var1 < field_85.size(); var1++) {
         class_4 var10000 = (class_4)field_85.elementAt(var1);
         DataOutputStream var3 = var0;
         class_4 var2 = var10000;
         var3.writeByte(var2.field_62);
         var3.writeByte(var2.field_59);
         var3.writeByte(var2.field_60);
         var3.writeByte(var2.field_61);
         var3.writeByte(var2.field_68);
         var3.writeByte(var2.field_69);
         switch (var2.field_62) {
            case 5:
               for (int var4 = 1; var4 < var2.field_70.length; var4++) {
                  var3.writeShort(var2.field_70[var4].field_12);
                  var3.writeByte(var2.field_70[var4].field_19);
                  var3.writeByte(var2.field_70[var4].field_20);
                  var3.writeInt(var2.field_70[var4].field_13);
                  var3.writeInt(var2.field_70[var4].field_14);
               }
         }

         var3.writeByte(var2.field_64);
         var3.writeByte(var2.field_65);
         if (!var2.method_82()) {
            if (var2.field_62 != 9 || var2.field_59 != 0) {
               for (int var5 = 0; var5 < var2.field_71.length; var5++) {
                  if (var2.field_71[var5] != null) {
                     var2.method_77(var2.field_71[var5].field_340);
                  }
               }
            }

            class_15.method_349(var3, var2.field_66);
         }
      }
   }

   // $VF: renamed from: a (java.io.DataInputStream) void
   public static void method_110(DataInputStream var0) {
      int var1 = var0.readInt();

      for (int var2 = 0; var2 < var1; var2++) {
         DataInputStream var3 = var0;
         byte var4 = var0.readByte();
         byte var5 = var3.readByte();
         byte var6 = var3.readByte();
         byte var7 = var3.readByte();
         class_4 var8;
         (var8 = method_87(var4, var5, var7)).field_60 = var6;
         var8.method_0(var3.readByte(), var3.readByte());
         switch (var8.field_62) {
            case 5:
               for (int var9 = 1; var9 < var8.field_70.length; var9++) {
                  var8.field_70[var9] = var3.readShort() == 112 ? class_2.method_35(var8) : class_2.method_34(var8);
                  var8.field_70[var9].method_0(var3.readByte(), var3.readByte());
                  var8.field_70[var9].method_1();
                  var8.field_70[var9].field_13 = var3.readInt();
                  var8.field_70[var9].field_14 = var3.readInt();
               }
         }

         var8.field_64 = var3.readByte();
         var8.field_65 = var3.readByte();
         if (!var8.method_82()) {
            var8.field_66 = class_15.method_350(var3);
         }

         var8.method_1();
         var8.method_99();
      }
   }
}
