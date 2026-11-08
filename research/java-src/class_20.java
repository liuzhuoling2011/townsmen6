import hg.class_22;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: b
public final class class_20 {
   // $VF: renamed from: a r
   public class_4 field_486;
   // $VF: renamed from: a i
   private class_13 field_487 = new class_13((byte)0);
   // $VF: renamed from: c java.util.Vector
   private Vector field_488 = new Vector();
   // $VF: renamed from: d java.util.Vector
   private Vector field_489 = new Vector();
   // $VF: renamed from: e java.util.Vector
   private Vector field_490 = new Vector();
   // $VF: renamed from: f java.util.Vector
   private Vector field_491 = new Vector();
   // $VF: renamed from: a java.util.Vector
   Vector field_492 = new Vector();
   // $VF: renamed from: b java.util.Vector
   Vector field_493 = new Vector();
   // $VF: renamed from: a int
   public int field_494;
   // $VF: renamed from: b int
   private int field_495;
   // $VF: renamed from: c int
   private int field_496;
   // $VF: renamed from: g java.util.Vector
   private static Vector field_497 = new Vector(8, 4);

   // $VF: renamed from: a (int, int) boolean
   private static boolean method_508(int var0, int var1) {
      return class_15.method_351(var0) >= class_15.method_351(var1);
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int) void
   public final void method_509(Graphics var1, int var2, int var3) {
      boolean var10000 = this.field_492.size() * (this.field_488.size() + this.field_490.size()) > 0;
      int var4 = (var10000
         | (this.field_492.size() > 0 && this.field_486.field_61 == 0)
         | (this.field_488.size() + this.field_490.size() > 0 && this.field_486.field_61 == 1)) ? 1 : 0;
      int var5 = this.field_492.size() + this.field_488.size();
      if (var4 == 0) {
         var4 = 10 * (class_15.method_356(class_22.field_581 / 2) - 65536) / 65536;
         class_15.method_416(var1, var2, var3 + var4, 154);
      } else if (var5 > 0) {
         class_15.method_417(var1, var2, var3, 155, this.field_487.field_289);
      } else {
         class_15.method_417(var1, var2, var3, 156, this.field_487.field_289);
      }
   }

   // $VF: renamed from: a () int
   public final int method_510() {
      return this.field_488.size() + this.field_489.size();
   }

   // $VF: renamed from: b () int
   public final int method_511() {
      return this.field_490.size() + this.field_491.size();
   }

   // $VF: renamed from: c () int
   public final int method_512() {
      return this.field_492.size() + this.field_493.size();
   }

   // $VF: renamed from: d () int
   private int method_513() {
      return this.method_510() + this.method_511();
   }

   // $VF: renamed from: a () void
   public static void method_514() {
      for (int var0 = 0; var0 < field_497.size(); var0++) {
         class_20 var1;
         if ((var1 = (class_20)field_497.elementAt(var0)).field_495 <= class_12.field_240) {
            switch (var1.field_496) {
               case 0:
                  var1.field_495 = class_12.field_240 + 10000;
                  var1.field_496 = 1;
                  break;
               case 1:
                  var1.field_492.size();
                  var1.field_488.size();
                  var1.field_490.size();
                  boolean var5 = false;
                  var1.field_492.size();
                  var1.field_488.size();
                  if (var1.field_492.size() > 0 && (var1.field_488.size() > 0 || var1.field_490.size() > 0)) {
                     if (var1.field_488.size() > 0) {
                        class_14 var6 = (class_14)var1.field_488.firstElement();
                        class_14 var3 = (class_14)var1.field_492.firstElement();
                        class_14 var7;
                        if (method_508(var6.method_340() * var1.field_488.size() + var1.field_490.size() * 10, var3.method_340() * var1.field_492.size())) {
                           var7 = (class_14)var1.field_492.firstElement();
                           var1.field_492.removeElement(var7);
                           class_12.method_292(1);
                        } else {
                           var7 = (class_14)var1.field_488.firstElement();
                           var1.field_488.removeElement(var7);
                           class_12.method_292(-2);
                        }

                        var7.method_339();
                        class_16.method_463(class_22.field_581, class_15.method_352(25, 27));
                        var1.field_495 = class_12.field_240 + 10000;
                        var1.field_496 = 1;
                     } else if (var1.field_490.size() > 0) {
                        class_14 var8 = (class_14)var1.field_490.firstElement();
                        class_14 var10 = (class_14)var1.field_492.firstElement();
                        class_14 var9;
                        if (method_508(var8.method_340() * var1.field_490.size(), var10.method_340() * var1.field_492.size())) {
                           var9 = (class_14)var1.field_492.firstElement();
                           var1.field_492.removeElement(var9);
                           class_12.method_292(5);
                        } else {
                           var9 = (class_14)var1.field_490.firstElement();
                           var1.field_490.removeElement(var9);
                           class_12.method_292(2);
                        }

                        var9.method_339();
                        class_16.method_463(class_22.field_581, class_15.method_352(25, 27));
                        var1.field_495 = class_12.field_240 + 10000;
                        var1.field_496 = 1;
                     }
                  } else if (var1.field_489.size() + var1.field_491.size() + var1.field_493.size() > 0) {
                     var1.field_495 = class_12.field_240 + 10000;
                     var1.field_496 = 1;
                  } else {
                     var1.field_495 = class_12.field_240 + 2000;
                     var1.field_496 = 2;
                  }
                  break;
               case 2:
                  if (var1.method_512() > 0) {
                     if (var1.method_513() > 0) {
                        var1.field_495 = class_12.field_240 + 10000;
                        var1.field_496 = 1;
                     } else {
                        class_16.method_463(class_22.field_581, 9);
                        var1.field_486.field_74 = null;
                        int var2 = var1.field_486.field_61;
                        var1.field_486.method_100(1);
                        if (class_7.method_168(var1.field_486)) {
                           class_7.field_142 = var1.field_486;
                           class_7.method_167(var1.field_486);
                        }

                        field_497.removeElement(var1);
                        var1.field_487.method_313();
                        var1.method_516();
                        class_12.field_264++;
                        if (var2 != var1.field_486.field_61) {
                           class_15.method_384(var1.field_486);
                           class_21.method_555(var1.field_486, false);
                        } else {
                           class_21.method_555(var1.field_486, true);
                        }
                     }
                  } else if (var1.method_513() > 0) {
                     class_16.method_463(class_22.field_581, 28);
                     int var4 = var1.field_486.field_61;
                     var1.field_486.field_74 = null;
                     var1.field_486.method_100(0);
                     if (class_7.method_168(var1.field_486)) {
                        class_7.field_142 = var1.field_486;
                        class_7.method_167(var1.field_486);
                     }

                     field_497.removeElement(var1);
                     var1.field_487.method_313();
                     var1.method_516();
                     class_12.field_263++;
                     if (var4 != var1.field_486.field_61) {
                        class_21.method_554(var1.field_486, true);
                     } else {
                        class_21.method_554(var1.field_486, false);
                     }
                  } else {
                     var1.field_486.field_74 = null;
                     var1.field_486.method_100(var1.field_486.field_61);
                     if (class_7.method_168(var1.field_486)) {
                        class_7.field_142 = var1.field_486;
                        class_7.method_167(var1.field_486);
                     }

                     field_497.removeElement(var1);
                     var1.field_487.method_313();
                     var1.method_516();
                  }
            }
         }
      }
   }

   // $VF: renamed from: b () void
   public static void method_515() {
      field_497.removeAllElements();
   }

   // $VF: renamed from: g () void
   private void method_516() {
      while (this.method_511() > 0) {
         this.method_520(true);
      }

      while (this.method_510() > 0) {
         this.method_518(true);
      }

      while (this.method_512() > 0) {
         this.method_522();
      }
   }

   // $VF: renamed from: c () void
   public final void method_517() {
      if (this.method_510() < 5) {
         if (this.method_524(class_14.field_351, this.field_489)) {
            class_15.method_383(this);
         }
      }
   }

   // $VF: renamed from: a (boolean) void
   public final void method_518(boolean var1) {
      if (this.method_526(this.field_488, this.field_489, class_14.field_351) && !var1) {
         class_15.method_383(this);
      }
   }

   // $VF: renamed from: d () void
   public final void method_519() {
      if (this.method_511() < 5) {
         if (this.method_524(class_14.field_354, this.field_491)) {
            class_15.method_383(this);
         }
      }
   }

   // $VF: renamed from: b (boolean) void
   public final void method_520(boolean var1) {
      if (this.method_526(this.field_490, this.field_491, class_14.field_354) && !var1) {
         class_15.method_383(this);
      }
   }

   // $VF: renamed from: e () void
   public final void method_521() {
      if (this.method_512() < 5) {
         this.field_494++;
         this.method_524(class_14.field_356, this.field_493);
      }
   }

   // $VF: renamed from: f () void
   public final void method_522() {
      if (this.method_512() > 0) {
         this.field_494--;
      }

      this.method_526(this.field_492, this.field_493, class_14.field_356);
   }

   // $VF: renamed from: a (h) void
   public final void method_523(class_14 var1) {
      class_21.method_552(var1);
      if (this.field_489.removeElement(var1)) {
         this.field_488.addElement(var1);
      } else if (this.field_491.removeElement(var1)) {
         this.field_490.addElement(var1);
      } else if (this.field_493.removeElement(var1)) {
         this.field_492.addElement(var1);
      }

      int var2 = this.field_492.size() + this.field_488.size() + this.field_490.size();
      if (this.field_492.size() + this.field_488.size() > 0) {
         this.field_487.method_308(class_13.field_301);
      } else {
         if (var2 > 0) {
            this.field_487.method_308(class_13.field_302);
         }
      }
   }

   // $VF: renamed from: a (java.util.Vector, java.util.Vector) boolean
   private boolean method_524(Vector var1, Vector var2) {
      if (var1.size() > 0) {
         class_14 var3;
         (var3 = (class_14)var1.firstElement()).field_314 = this.field_486;
         var3.method_321(this.field_486);
         var2.addElement(var3);
         var1.removeElementAt(0);
         return true;
      } else {
         return false;
      }
   }

   // $VF: renamed from: a (h, java.util.Vector, java.util.Vector) void
   private void method_525(class_14 var1, Vector var2, Vector var3) {
      var2.removeElement(var1);
      var1.field_314 = this.field_486;
      var1.method_321(this.field_486);
      var3.addElement(var1);
   }

   // $VF: renamed from: a (java.util.Vector, java.util.Vector, java.util.Vector) boolean
   private boolean method_526(Vector var1, Vector var2, Vector var3) {
      class_14 var4;
      if (var2.size() > 0) {
         var4 = (class_14)var2.firstElement();
         var2.removeElementAt(0);
      } else {
         if (var1.size() <= 0) {
            return false;
         }

         var4 = (class_14)var1.firstElement();
         var1.removeElementAt(0);
      }

      if (var4.field_339 == 4) {
         this.field_494--;
      }

      if (this.method_512() == 0 || this.method_511() + this.method_510() == 0) {
         this.field_495 = class_12.field_240;
      }

      var4.method_337(null);
      var3.addElement(var4);
      var4.method_324(0);
      var4.field_335 = class_15.method_352(2, 15);
      return true;
   }

   // $VF: renamed from: a (java.io.DataOutputStream) void
   public static void method_527(DataOutputStream var0) {
      var0.writeInt(field_497.size());

      for (int var1 = 0; var1 < field_497.size(); var1++) {
         class_20 var2 = (class_20)field_497.elementAt(var1);
         var0.writeInt(class_4.field_85.indexOf(var2.field_486));
         var0.writeInt(var2.method_511());
         var0.writeInt(var2.method_510());
         var0.writeInt(var2.method_512());
      }
   }

   // $VF: renamed from: a (java.io.DataInputStream) void
   public static void method_528(DataInputStream var0) {
      int var1 = var0.readInt();

      for (int var2 = 0; var2 < var1; var2++) {
         class_20 var3 = new class_20((class_4)class_4.field_85.elementAt(var0.readInt()));
         int var4 = var0.readInt();
         int var5 = var0.readInt();
         int var6 = var0.readInt();

         for (int var7 = 0; var7 < var4; var7++) {
            var3.method_519();
         }

         for (int var8 = 0; var8 < var5; var8++) {
            var3.method_517();
         }

         for (int var9 = 0; var9 < var6; var9++) {
            var3.method_521();
         }
      }
   }

   public class_20(class_4 var1) {
      this.field_486 = var1;
      var1.field_74 = this;
      if (class_7.field_142 == var1 && class_7.field_109 != 1 && class_7.field_109 != 0) {
         var1.method_84();
         class_7.method_167(var1);
      } else {
         var1.method_84();
      }

      this.field_495 = class_12.field_240 + 100 + 100;
      field_497.addElement(this);
      if (var1.field_61 == 0) {
         switch (var1.field_62) {
            case 13:
               while (class_14.field_353.size() > 0 && this.method_511() < 5) {
                  class_14 var5 = (class_14)class_14.field_353.lastElement();
                  class_14.field_353.removeElement(var5);
                  this.method_525(var5, class_14.field_354, this.field_491);
               }
               break;
            case 14:
               while (class_14.field_350.size() > 0 && this.method_510() < 5) {
                  class_14 var4 = (class_14)class_14.field_350.lastElement();
                  class_14.field_350.removeElement(var4);
                  this.method_525(var4, class_14.field_351, this.field_489);
               }
         }
      } else {
         if (var1.field_62 == 14) {
            for (int var2 = 0; var2 < class_14.field_356.size(); var2++) {
               class_14 var3;
               if ((var3 = (class_14)class_14.field_356.elementAt(var2)).field_313 == var1) {
                  this.method_525(var3, class_14.field_356, this.field_493);
               }
            }
         }
      }
   }
}
