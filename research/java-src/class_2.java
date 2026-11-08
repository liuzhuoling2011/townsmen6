import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: v
public final class class_2 implements class_0 {
   // $VF: renamed from: a int
   public int field_12;
   // $VF: renamed from: b int
   public int field_13;
   // $VF: renamed from: c int
   public int field_14;
   // $VF: renamed from: d int
   public int field_15;
   // $VF: renamed from: e int
   public int field_16;
   // $VF: renamed from: f int
   public int field_17;
   // $VF: renamed from: a i
   public class_13 field_18;
   // $VF: renamed from: g int
   public int field_19 = Integer.MIN_VALUE;
   // $VF: renamed from: h int
   public int field_20 = Integer.MIN_VALUE;
   // $VF: renamed from: a r
   public class_4 field_21;
   // $VF: renamed from: a java.util.Vector
   public static Vector field_22 = new Vector(32, 16);
   // $VF: renamed from: b java.util.Vector
   private static Vector field_23 = new Vector(16, 8);

   // $VF: renamed from: a () void
   public static void method_22() {
      for (int var0 = 0; var0 < field_22.size(); var0++) {
         class_2 var1;
         if ((var1 = (class_2)field_22.elementAt(var0)).field_13 < 30) {
            var1.field_13++;
         }
      }

      for (int var2 = 0; var2 < field_23.size(); var2++) {
         class_2 var3;
         if ((var3 = (class_2)field_23.elementAt(var2)).field_13 <= 0) {
            var3.field_13 -= 6;
         }

         if (var3.field_13 <= -10) {
            var3.field_13 = 10;
         }
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int) void
   public final void method_23(Graphics var1, int var2, int var3) {
      switch (this.field_12) {
         case 16:
            if (this.field_13 < 15) {
               if (this.field_13 > 8) {
                  this.field_16 = 16396;
               } else {
                  this.field_16 = 16397;
               }
            } else {
               this.field_16 = this.field_14;
            }

            class_15.method_417(var1, var2, var3, this.field_15, this.field_16);
         case 80:
         case 128:
         case 160:
            break;
         case 96:
            class_15.method_417(var1, var2, var3, this.field_15, this.field_18.field_289);
            return;
         case 112:
            if (this.field_13 < 0) {
               int var5 = Math.min(1, Math.abs(this.field_13 << 1) / 10);
               class_15.method_417(var1, var2, var3, this.field_15 = 33, this.field_16 = var5 + 16413);
               return;
            }

            if (this.field_13 > 0) {
               int var4 = Math.min(2, this.field_13 * 3 / 10);
               class_15.method_417(var1, var2, var3, this.field_15 = 32, this.field_16 = var4 + 16410);
               return;
            }

            class_15.method_417(var1, var2, var3, this.field_15 = 32, this.field_16 = 16409);
            return;
         case 144:
            class_15.method_416(var1, var2, var3, 25);
            break;
         case 176:
            class_15.method_416(var1, var2, var3, 43);
            break;
         case 192:
            class_15.method_417(var1, var2, var3, this.field_15, this.field_16);
            if (this.field_18 != null) {
               if (this.field_18.field_289 == -1) {
                  this.field_18.method_313();
                  this.field_18 = null;
                  return;
               }

               class_15.method_417(var1, var2, var3, this.field_13, this.field_18.field_289);
            }

            return;
         default:
            if (this.field_18 != null) {
               class_15.method_417(var1, var2, var3, this.field_15, this.field_18.field_289);
            } else {
               class_15.method_417(var1, var2, var3, this.field_15, this.field_16);
            }
      }

      if (this.field_21 != null) {
         this.field_21.field_75 = true;
         if (!this.field_21.method_82()) {
            class_15.method_417(var1, var2, var3, this.field_13, this.field_14);
            return;
         }

         if (this.field_18 != null) {
            if (this.field_21.field_77) {
               class_15.method_417(var1, var2, var3, this.field_15, this.field_16);
               this.field_21.method_101(var1, var2, var3);
               return;
            }

            class_15.method_417(var1, var2, var3, this.field_15, this.field_16 + this.field_18.field_289);
            return;
         }

         class_15.method_417(var1, var2, var3, this.field_15, this.field_16);
      }
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics) void
   public final void method_4(Graphics var1) {
      if (this.field_19 >= -1 && this.field_20 >= -1 && this.field_19 < class_12.field_238.field_28 + 1 && this.field_20 < class_12.field_238.field_29 + 1) {
         byte var2;
         if (this.method_0(this.field_19, this.field_20)) {
            var2 = 0;
         } else {
            var2 = 16;
         }

         int var3 = (this.field_19 << 5) + (this.field_20 << 5) - class_7.field_111;
         int var4 = (this.field_20 << 4) - (this.field_19 << 4) - class_7.field_112;
         class_15.method_417(var1, var3, var4, 26, var2);
      }
   }

   // $VF: renamed from: c () boolean
   public final boolean method_1() {
      class_12.field_238.field_26[this.field_19][this.field_20] = this;
      switch (this.field_12) {
         case 16:
            field_22.addElement(this);
            break;
         case 80:
         case 128:
            if (class_12.field_238.field_25[this.field_19][this.field_20].method_112()) {
               class_12.field_238.field_25[this.field_19][this.field_20] = class_3.field_51[class_15.method_351(class_3.field_51.length)];
            }
            break;
         case 96:
            return this.field_21.method_98(this);
         case 112:
            field_23.addElement(this);
            return this.field_21.method_98(this);
      }

      return false;
   }

   // $VF: renamed from: b () void
   public final void method_24() {
      class_12.field_238.field_26[this.field_19][this.field_20] = null;
      switch (this.field_12) {
         case 16:
            field_22.removeElement(this);
            return;
         case 112:
            field_23.removeElement(this);
      }
   }

   // $VF: renamed from: a (int, int) boolean
   public final boolean method_0(int var1, int var2) {
      this.field_19 = var1;
      this.field_20 = var2;
      if (var1 >= 0 && var2 >= 0 && var1 < class_12.field_238.field_28 && var2 < class_12.field_238.field_29) {
         if (!class_12.field_238.field_31) {
            switch (this.field_12) {
               case 32:
               case 80:
               case 96:
               case 112:
               case 128:
               case 144:
               case 160:
                  if (var1 < 1 || var2 < 1 || var1 >= class_12.field_238.field_28 - 1 || var2 >= class_12.field_238.field_29 - 1) {
                     return false;
                  }

                  if (var1 > 0 && class_12.field_238.field_26[var1 - 1][var2] != null && class_12.field_238.field_26[var1 - 1][var2].method_43()) {
                     return false;
                  }

                  if (var2 < class_12.field_238.field_29 - 1
                     && class_12.field_238.field_26[var1][var2 + 1] != null
                     && class_12.field_238.field_26[var1][var2 + 1].method_43()) {
                     return false;
                  }

                  if (var1 > 0
                     && var2 < class_12.field_238.field_29 - 1
                     && class_12.field_238.field_26[var1 - 1][var2 + 1] != null
                     && class_12.field_238.field_26[var1 - 1][var2 + 1].method_43()) {
                     return false;
                  }
            }
         }

         boolean var3 = class_12.field_238.field_26[var1][var2] == null || class_12.field_238.field_26[var1][var2].method_47();
         switch (this.field_12) {
            case 16:
            case 32:
            case 80:
            case 96:
            case 112:
            case 160:
            default:
               if (var3 && class_12.field_238.field_25[var1][var2].method_113() && !class_12.field_238.field_25[var1][var2].method_112()) {
                  return true;
               }

               return false;
            case 128:
               if (var3 && class_12.field_238.field_25[var1][var2].method_112()) {
                  return true;
               }

               return false;
            case 144:
               return class_12.field_238.field_26[var1][var2] != null && class_12.field_238.field_26[var1][var2].field_12 == 32;
         }
      } else {
         return false;
      }
   }

   // $VF: renamed from: a (java.io.DataOutputStream) void
   public final void method_25(DataOutputStream var1) {
      switch (this.field_12) {
         case 16:
            var1.writeShort(this.field_12);
            var1.writeShort(this.field_13);
            var1.writeShort(this.field_14);
            return;
         case 32:
         case 192:
            var1.writeShort(this.field_12);
            return;
         case 48:
            var1.writeShort(this.field_12);
            var1.writeBoolean(this.field_16 == 16400);
            return;
         case 64:
            var1.writeShort(this.field_12);
            var1.writeShort(this.field_16);
            return;
         default:
            var1.writeShort(-1);
      }
   }

   // $VF: renamed from: a (java.io.DataInputStream) v
   public static class_2 method_26(DataInputStream var0) {
      class_2 var1 = null;
      switch (var0.readShort()) {
         case 16:
            (var1 = method_27()).field_13 = var0.readShort();
            var1.field_14 = var0.readShort();
            break;
         case 32:
            var1 = method_28();
            break;
         case 48:
            var1 = method_31(var0.readBoolean());
            break;
         case 64:
            short var2;
            if ((var2 = var0.readShort()) != 16405 && var2 != 16402) {
               var1 = method_33(var2 == 16403);
            } else {
               var1 = method_32(var2 == 16405);
            }
            break;
         case 192:
            var1 = method_39(true);
      }

      return var1;
   }

   // $VF: renamed from: a () v
   public static class_2 method_27() {
      class_2 var0;
      (var0 = new class_2()).field_12 = 16;
      var0.field_13 = 30;
      var0.field_15 = 24;
      var0.field_16 = class_15.method_353() ? 16394 : 16395;
      var0.field_14 = var0.field_16;
      var0.field_17 |= 1;
      return var0;
   }

   // $VF: renamed from: b () v
   public static class_2 method_28() {
      class_2 var0;
      (var0 = new class_2()).field_12 = 32;
      var0.field_13 = Integer.MAX_VALUE;
      var0.field_15 = 25;
      var0.field_16 = class_15.method_412(class_15.method_351(class_15.method_410(25, 3)));
      return var0;
   }

   // $VF: renamed from: a (r) v
   public static class_2 method_29(class_4 var0) {
      class_2 var1;
      (var1 = new class_2()).field_21 = var0;
      var1.field_12 = 176;
      return var1;
   }

   // $VF: renamed from: a (int) v
   public static class_2 method_30(int var0) {
      class_2 var1;
      (var1 = new class_2()).field_12 = 208;
      var1.field_17 |= 2;
      var1.field_15 = var0;
      return var1;
   }

   // $VF: renamed from: a (boolean) v
   public static class_2 method_31(boolean var0) {
      class_2 var1;
      (var1 = new class_2()).field_12 = 48;
      var1.field_15 = 28;
      var1.field_16 = var0 ? 16400 : 16401;
      var1.field_17 |= var0 ? 16 : 8;
      var1.field_17 |= 32;
      return var1;
   }

   // $VF: renamed from: b (boolean) v
   public static class_2 method_32(boolean var0) {
      class_2 var1;
      (var1 = new class_2()).field_12 = 64;
      var1.field_15 = 29;
      var1.field_16 = var0 ? 16405 : 16402;
      var1.field_17 |= 4;
      var1.field_17 |= 32;
      class_12.field_238.field_24.addElement(var1);
      return var1;
   }

   // $VF: renamed from: c (boolean) v
   public static class_2 method_33(boolean var0) {
      class_2 var1;
      (var1 = new class_2()).field_12 = 64;
      var1.field_15 = 29;
      var1.field_16 = var0 ? 16403 : 16404;
      var1.field_17 |= 4;
      var1.field_17 |= 32;
      return var1;
   }

   // $VF: renamed from: b (r) v
   public static class_2 method_34(class_4 var0) {
      class_2 var1;
      (var1 = new class_2()).field_12 = 96;
      var1.field_15 = 34;
      var1.field_16 = 0;
      var1.field_18 = new class_13(class_13.field_304);
      var1.field_21 = var0;
      var1.field_13 = Integer.MAX_VALUE;
      return var1;
   }

   // $VF: renamed from: c (r) v
   public static class_2 method_35(class_4 var0) {
      class_2 var1;
      (var1 = new class_2()).field_21 = var0;
      var1.field_12 = 112;
      var1.field_13 = 0;
      var1.field_15 = 32;
      var1.field_16 = 0;
      return var1;
   }

   // $VF: renamed from: d (r) v
   public static class_2 method_36(class_4 var0) {
      class_2 var1;
      (var1 = new class_2()).field_21 = var0;
      var1.field_12 = 128;
      return var1;
   }

   // $VF: renamed from: e (r) v
   public static class_2 method_37(class_4 var0) {
      class_2 var1;
      (var1 = new class_2()).field_21 = var0;
      var1.field_12 = 144;
      return var1;
   }

   // $VF: renamed from: f (r) v
   public static class_2 method_38(class_4 var0) {
      class_2 var1;
      (var1 = new class_2()).field_21 = var0;
      var1.field_12 = 160;
      return var1;
   }

   // $VF: renamed from: d (boolean) v
   public static class_2 method_39(boolean var0) {
      class_2 var1;
      (var1 = new class_2()).field_12 = 192;
      var1.field_15 = 51;
      var1.field_17 = 2;
      var1.field_13 = 50;
      var1.field_16 = 0;
      if (!var0) {
         var1.field_18 = new class_13();
         var1.field_18.method_308(class_13.field_309);
      }

      return var1;
   }

   // $VF: renamed from: g (r) v
   public static class_2 method_40(class_4 var0) {
      class_2 var1;
      (var1 = new class_2()).field_12 = 80;
      var1.field_21 = var0;
      switch (var0.field_62) {
         case 0:
         case 12:
            var1.field_17 |= 1;
         default:
            return var1;
      }
   }

   // $VF: renamed from: a (int, int) void
   public final void method_41(int var1, int var2) {
      this.field_15 = var1;
      this.field_16 = var2;
   }

   // $VF: renamed from: c () void
   public static void method_42() {
      field_22.removeAllElements();
      field_23.removeAllElements();
   }

   // $VF: renamed from: k () int
   public final int method_2() {
      return this.field_19;
   }

   // $VF: renamed from: l () int
   public final int method_3() {
      return this.field_20;
   }

   // $VF: renamed from: g () boolean
   private boolean method_43() {
      return (this.field_17 & 1) != 0;
   }

   // $VF: renamed from: a () boolean
   public final boolean method_44() {
      return (this.field_17 & 32) != 0;
   }

   // $VF: renamed from: b () boolean
   public final boolean method_45() {
      return (this.field_17 & 8) != 0;
   }

   // $VF: renamed from: d () boolean
   public final boolean method_46() {
      return (this.field_17 & 16) != 0;
   }

   // $VF: renamed from: e () boolean
   public final boolean method_47() {
      return (this.field_17 & 2) != 0;
   }

   // $VF: renamed from: f () boolean
   public final boolean method_48() {
      return this.field_19 >= 0 && this.field_19 < class_12.field_238.field_28 && this.field_20 >= 0 && this.field_20 < class_12.field_238.field_29
         ? class_12.field_238.field_26[this.field_19][this.field_20] == this
         : false;
   }

   private class_2() {
   }
}
