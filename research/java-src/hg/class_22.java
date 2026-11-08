package hg;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Vector;
import javax.microedition.lcdui.Canvas;
import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import javax.microedition.midlet.MIDlet;

// $VF: renamed from: hg.HG
public class class_22 extends MIDlet implements Runnable {
   // $VF: renamed from: a hg.HG
   public static class_22 field_580 = null;
   // $VF: renamed from: a int
   public static int field_581 = 0;
   // $VF: renamed from: a javax.microedition.lcdui.Canvas
   private static Canvas field_582;
   // $VF: renamed from: a k
   private static class_11 field_583;
   // $VF: renamed from: b boolean
   private static boolean field_584;
   // $VF: renamed from: c boolean
   private static boolean field_585;
   // $VF: renamed from: b int
   private static int field_586;
   // $VF: renamed from: c int
   private static int field_587;
   // $VF: renamed from: a javax.microedition.lcdui.Image
   private static Image field_588;
   // $VF: renamed from: d int
   private static int field_589;
   // $VF: renamed from: e int
   private static int field_590;
   // $VF: renamed from: a byte
   private static byte field_591 = 0;
   // $VF: renamed from: f int
   private static int field_592 = -1;
   // $VF: renamed from: g int
   private static int field_593 = 0;
   // $VF: renamed from: h int
   private static int field_594 = 0;
   // $VF: renamed from: a d[]
   private static class_18[] field_595 = new class_18[2];
   // $VF: renamed from: b byte
   private static byte field_596 = -1;
   // $VF: renamed from: c byte
   private static byte field_597 = -1;
   // $VF: renamed from: a boolean
   public static boolean field_598;
   // $VF: renamed from: a long
   private static long field_599;
   // $VF: renamed from: i int
   private static int field_600 = -1;
   // $VF: renamed from: a byte[]
   private static byte[] field_601 = null;
   // $VF: renamed from: b byte[]
   private static byte[] field_602 = null;
   // $VF: renamed from: b long
   private long field_603 = System.currentTimeMillis();
   // $VF: renamed from: c long
   private long field_604 = System.currentTimeMillis();
   // $VF: renamed from: b int[]
   private static int[] field_605 = new int[]{
      -6,
      108,
      -7,
      109,
      -1,
      95,
      -3,
      93,
      -4,
      94,
      -2,
      92,
      -5,
      91,
      48,
      96,
      49,
      97,
      50,
      98,
      51,
      99,
      52,
      100,
      53,
      101,
      54,
      102,
      55,
      103,
      56,
      104,
      57,
      105,
      42,
      107,
      35,
      106
   };
   // $VF: renamed from: b int[][]
   private static int[][] field_606 = new int[][]{
      {0, 1, 0, -5, -6, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 42, 35},
      {1, 1, 0, 48},
      {2, 3, 0, -1, 50},
      {3, 3, 0, -3, 52},
      {4, 3, 0, -4, 54},
      {5, 3, 0, -2, 56},
      {6, 1, 0, -5, 53},
      {7, 1, 0, -6},
      {8, 1, 0, -7},
      {9, 1, 0, 48},
      {10, 1, 0, 49},
      {11, 1, 0, 50},
      {12, 1, 0, 51},
      {13, 1, 0, 52},
      {14, 1, 0, 53},
      {15, 1, 0, 54},
      {16, 1, 0, 55},
      {17, 1, 0, 56},
      {18, 1, 0, 57},
      {19, 1, 0, 42},
      {20, 1, 0, 35}
   };
   // $VF: renamed from: c int[][]
   private static int[][] field_607 = new int[][]{{95, 93, 94, 92, 98, 100, 102, 104}, {108, 91, 101}, {109}, {96}, {108}, {106}, {107}};
   // $VF: renamed from: a java.lang.String[]
   public static String[] field_608 = new String[]{"FORWARD", "ACTION", "MOVE", "MOTION"};
   // $VF: renamed from: a int[][]
   public static int[][] field_609 = new int[][]{{108}, {91, 101}, {98, 100, 102, 104, 93, 94, 95, 92}, new int[0]};
   // $VF: renamed from: b java.lang.String[]
   public static String[] field_610 = new String[]{"MAIN", "CAMPAIGN", "MOTION", "POINTER", "TIPP"};
   // $VF: renamed from: a int[]
   public static int[] field_611 = new int[]{1, 1, 0, 0, 1};
   // $VF: renamed from: j int
   private static int field_612 = 0;
   // $VF: renamed from: k int
   private static int field_613 = 0;
   // $VF: renamed from: l int
   private static int field_614 = 0;
   // $VF: renamed from: m int
   private static int field_615 = 0;
   // $VF: renamed from: n int
   private static int field_616 = 0;

   // $VF: renamed from: a (int) byte
   public static byte method_562(int var0) {
      if (field_601 == null) {
         if (class_15.method_361(0)) {
            try {
               DataInputStream var1;
               byte var2;
               field_601 = new byte[(var2 = (var1 = class_15.method_363(0)).readByte()) < 8 ? 8 : var2];
               var1.read(field_601, 0, var2);
            } catch (Throwable var3) {
               field_601 = null;
            }
         }

         if (field_601 == null) {
            field_601 = class_18.method_507();
         }
      }

      return field_601[var0];
   }

   // $VF: renamed from: a (int, int) void
   public static void method_563(int var0, int var1) {
      if (field_601 == null) {
         method_562(var0);
      }

      field_601[var0] = (byte)var1;
   }

   // $VF: renamed from: a () void
   public static void method_564() {
      if (field_602 == null) {
         field_602 = new byte[8];
      }

      System.arraycopy(field_601, 0, field_602, 0, field_601.length);
   }

   public class_22() {
      field_580 = this;
   }

   protected final void startApp() {
      if (!field_584) {
         field_584 = true;
         class_22 var1 = this;
         field_598 = false;
         field_581 = 0;
         field_582 = null;
         new Vector();
         field_583 = null;
         field_585 = false;
         field_586 = -1;
         field_587 = -1;
         field_588 = null;
         field_589 = 0;
         field_590 = -1;
         field_591 = 0;
         field_592 = -1;
         field_593 = 0;
         field_594 = 0;
         field_595 = new class_18[2];
         field_596 = -1;
         field_597 = -1;
         field_599 = 0L;

         try {
            field_582 = (Canvas)Class.forName("t").newInstance();
            Display.getDisplay(var1).setCurrent(field_582);
            class_15.field_376 = field_582.getWidth();
            class_15.field_377 = field_582.getHeight();
            class_15.field_377 = field_582.getHeight();
            class_15.field_376 = field_582.getWidth();
         } catch (Exception var2) {
            var1.destroyApp(true);
         }

         method_575(2, 0, 6146);
         this.run();
      }
   }

   protected final void destroyApp(boolean var1) {
      field_584 = false;
      this.notifyDestroyed();
   }

   public final void pauseApp() {
      method_565(true);
   }

   // $VF: renamed from: a (boolean) void
   public static void method_565(boolean var0) {
      if (field_598) {
         if (field_585 != var0) {
            field_585 = var0;
            if (var0) {
               field_586 = 2;
               class_15.method_451();
               field_599 = 0L;
               return;
            }

            class_15.method_452();
         }
      }
   }

   // $VF: renamed from: a () boolean
   public static boolean method_566() {
      return field_585;
   }

   // $VF: renamed from: a () int
   public static int method_567() {
      return field_587;
   }

   // $VF: renamed from: a (int) void
   public static final void method_568(int var0) {
      method_570(var0, -1, true);
   }

   // $VF: renamed from: b () void
   public static final void method_569() {
      method_570(47, -1, false);
   }

   // $VF: renamed from: a (int, int, boolean) void
   private static void method_570(int var0, int var1, boolean var2) {
      if (field_597 != -1) {
         field_595[field_597].method_477(var0, var1, var2);
         method_588();
      } else {
         method_571(new class_18(var0));
      }
   }

   // $VF: renamed from: a (d) void
   public static final void method_571(class_18 var0) {
      if (field_597 + 1 == field_595.length) {
         class_18[] var1 = new class_18[field_595.length + 1];
         System.arraycopy(field_595, 0, var1, 0, field_595.length);
         field_595 = var1;
      }

      field_595[++field_597] = var0;
      field_596 = field_597;

      while (!field_595[field_596].field_423 && field_596 > 0) {
         field_596--;
      }

      var0.method_473(false);
      method_588();
      field_586 = -1;
   }

   // $VF: renamed from: b () boolean
   public static final boolean method_572() {
      return field_597 > -1;
   }

   // $VF: renamed from: a () d
   public static final class_18 method_573() {
      return field_597 > -1 ? field_595[field_597] : null;
   }

   // $VF: renamed from: c () void
   public static final void method_574() {
      if (field_597 > -1) {
         field_595[field_597] = null;
         field_597--;
      }

      field_596 = field_597;

      while (field_596 > 0 && !field_595[field_596].field_423) {
         field_596--;
      }

      if (field_597 > -1) {
         field_595[field_597].method_474(false);
      }

      method_588();
      field_586 = -1;
   }

   // $VF: renamed from: a (int, int, int) void
   public static void method_575(int var0, int var1, int var2) {
      class_15.method_450();
      (field_583 = new class_11(var0, var1, var2)).start();
      field_586 = -1;
   }

   // $VF: renamed from: b (int) void
   public static void method_576(int var0) {
      if (field_583 != null) {
         field_583.field_237 = var0;
         Thread.yield();
      }
   }

   // $VF: renamed from: b (int, int) void
   public static void method_577(int var0, int var1) {
      if (var0 != -1) {
         int var2 = var0 & 61440;
         int var3 = var0 & 4095;

         try {
            switch (var2) {
               case 4096:
                  switch (var0) {
                     case 4098:
                        class_18 var10;
                        var1 = (var10 = method_573()).field_452;

                        while (--var1 >= 0) {
                           int[] var14;
                           if ((var14 = var10.method_483(var1))[0] == 205 && var14[5] != -1) {
                              method_563(var14[5], var14[6]);
                           }
                        }

                        class_15.method_456();
                        class_15.method_439();

                        try {
                           DataOutputStream var13;
                           (var13 = class_15.method_364(0)).write(8);
                           var13.write(field_601, 0, 8);
                           class_15.method_365();
                        } catch (Throwable var5) {
                        }

                        var10.method_478();
                        return;
                     case 4099:
                        System.arraycopy(field_602, 0, field_601, 0, field_602.length);
                        field_602 = null;
                        class_15.method_456();
                        class_15.method_439();
                        class_18 var10000 = method_573();
                        Object var9 = null;
                        var10000.method_478();
                        return;
                     case 4100:
                        field_580.destroyApp(false);
                        return;
                     case 4101:
                        if (field_597 != -1) {
                           field_595[field_597].method_478();
                           return;
                        }
                        break;
                     case 6145:
                        class_6.method_116();
                        return;
                     case 6146:
                        if (class_15.method_425() != null && class_15.method_425().size() > 1) {
                           method_571(new class_18(48));
                           return;
                        }

                        method_571(new class_18(53));
                        break;
                     case 6147:
                        try {
                           field_588 = Image.createImage("/s0.png");
                           field_589 = 3000;
                           field_587 = 0;
                           return;
                        } catch (Exception var4) {
                           return;
                        }
                  }

                  return;
               case 8192:
                  method_575(var3, var1, -1);
                  return;
               case 12288:
                  var1 = var3;
                  field_587 = var3;
                  class_6.method_118(var1);
                  var0 = field_595.length;

                  while (--var0 >= 0) {
                     field_595[var0] = null;
                  }

                  field_596 = -1;
                  field_597 = -1;
                  field_586 = -1;
                  return;
               case 16384:
                  method_570(var3, var1, true);
                  return;
               case 20480:
                  class_18 var7;
                  (var7 = new class_18()).method_476(var3, var1);
                  method_571(var7);
                  return;
               case 24576:
                  class_17.method_466(var3);
                  return;
               default:
                  if (method_572()) {
                     if (method_573().field_420 == 3) {
                        method_574();
                     }

                     class_18.method_500(method_573(), var0, var1);
                  }

                  class_6.method_119(var0, var1);
                  return;
            }
         } catch (Throwable var6) {
         }
      }
   }

   // $VF: renamed from: a (int, boolean, boolean) boolean
   private static boolean method_578(int var0, boolean var1, boolean var2) {
      boolean var3 = false;

      try {
         switch (field_586) {
            case 0:
               if (var0 == 1) {
                  method_565(true);
                  var3 = true;
               } else {
                  var3 = class_6.method_120(var0, var1, var2);
               }
               break;
            case 1:
               if (var0 == 1) {
                  method_565(true);
                  var3 = true;
               } else {
                  var3 = field_595[field_597].method_493(var0, var1, var2);
               }
               break;
            case 2:
               if (var0 == 1) {
                  method_565(false);
                  var3 = true;
               } else if (var0 >= 9 && var0 <= 18) {
                  class_6.method_122(field_599 = (field_599 <<= 4) | var0 - 9);
               } else if (var0 == 8) {
                  method_565(false);
                  var3 = true;
               }
               break;
            case 3:
               if (var0 == 0 && !var2) {
                  if (field_591 == 1) {
                     method_577(field_592, 0);
                  }

                  field_591 = 0;
                  var3 = true;
               }
            case 4:
            case 5:
            case 6:
            case 7:
            case 9:
            default:
               break;
            case 8:
               if (var0 == 0) {
                  field_589 = -1;
               }
               break;
            case 10:
               var3 = class_17.method_469(var0);
         }
      } catch (Throwable var4) {
      }

      return var3;
   }

   // $VF: renamed from: a (int) boolean
   private static boolean method_579(int var0) {
      boolean var1 = false;

      try {
         switch (field_586) {
            case 0:
               var1 = class_6.method_121(var0);
               break;
            case 10:
               var1 = false;
         }
      } catch (Throwable var2) {
      }

      return var1;
   }

   // $VF: renamed from: c (int, int) void
   public static void method_580(int var0, int var1) {
      class_15.field_376 = var0;
      class_15.field_377 = var1;
   }

   // $VF: renamed from: a (long) void
   public static void method_581(long var0) {
      try {
         Thread.sleep(var0);
      } catch (Exception var2) {
      }
   }

   // $VF: renamed from: run () void
   public final void run() {
      try {
         class_22 var1 = this;
         this.field_604 = System.currentTimeMillis();
         long var2;
         if ((var2 = var1.field_604 - var1.field_603) < 50L) {
            long var4 = 50L - var2;

            try {
               Thread.sleep(var4);
            } catch (Exception var6) {
            }
         }

         var1.field_603 = System.currentTimeMillis();
         if (field_600 != -1) {
            field_586 = 9;
         } else if (field_585) {
            field_586 = 2;
         } else {
            field_581 += 50;
            if (field_586 != 0 && field_586 != 6 && field_586 != 7) {
               if (field_583 != null) {
                  field_586 = 5;
               } else {
                  label94:
                  if (field_588 != null) {
                     if ((field_589 -= 50) <= 0) {
                        field_589 = 3000;

                        try {
                           field_588 = Image.createImage("/s" + ++field_587 + ".png");
                        } catch (Exception var7) {
                           field_588 = null;
                           field_587 = -1;
                           method_575(0, 0, 12288);
                           break label94;
                        }
                     }

                     field_586 = 8;
                  } else if (field_585) {
                     field_586 = 2;
                  } else if (field_591 != 0) {
                     field_586 = 3;
                  } else if (field_597 != -1) {
                     field_586 = 1;
                  } else if (class_17.method_465()) {
                     field_586 = 10;
                  } else {
                     field_586 = 0;
                  }
               }
            }
         }

         method_585();
         switch (field_586) {
            case 0:
               if (field_589 != 0 && (field_589 -= 50) <= 0) {
                  field_589 = 0;
                  method_577(field_590, 0);
               }

               class_6.method_115();
               break;
            case 1:
               if (method_572() && field_597 != -1 && field_597 < field_595.length) {
                  class_18.method_497(field_595[field_597]);
               }
            case 2:
            case 4:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            default:
               break;
            case 3:
               field_593 = field_593 + field_591;
               if (field_591 == 1) {
                  if (field_593 > field_594) {
                     method_577(field_592, 0);
                     field_592 = -1;
                     field_591 = -1;
                     field_594 = 40;
                     field_593 = 40;
                  }
               } else if (field_593 < 0) {
                  field_591 = 0;
               }
               break;
            case 5:
               if (field_583 != null && !field_583.isAlive()) {
                  method_577(field_583.field_236, field_583.field_235);
                  method_565(false);
                  field_583 = null;
               }
         }

         Thread.yield();
      } catch (Throwable var8) {
      }

      if (field_584) {
         if (field_586 != -1) {
            Display.getDisplay(this).callSerially(this);
            field_582.repaint();
            return;
         }

         this.run();
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics) void
   public static void method_582(Graphics var0) {
      try {
         switch (field_586) {
            case 0:
            case 1:
            case 3:
            case 7:
               method_583(var0);
               return;
            case 2:
               class_6.method_125(var0);
               return;
            case 4:
               return;
            case 5:
               if (field_583 != null) {
                  class_6.method_126(var0, field_583.field_234, field_583.field_237);
                  return;
               }
               break;
            case 6:
               return;
            case 8:
               if (field_588 != null) {
                  class_15.method_392(var0, class_15.method_397(0 + field_587));
                  var0.drawImage(field_588, class_15.field_376 / 2, class_15.field_377 / 2, 3);
                  class_15.method_369(var0, field_587);
                  return;
               }
               break;
            case 9:
               class_15.method_392(var0, 0);
               break;
            case 10:
               return;
         }
      } catch (Throwable var1) {
      }
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics) void
   public static void method_583(Graphics var0) {
      if (field_597 == -1) {
         class_6.method_123(var0);
      } else {
         if (field_595[field_596].field_423) {
            class_18.method_503(var0, field_595[field_596]);
         } else {
            class_6.method_123(var0);
         }

         for (int var1 = field_596; var1 <= field_597; var1++) {
            class_18.method_504(var0, field_595[var1]);
         }

         class_18.method_505(var0, field_595[field_597]);
      }

      if (field_591 != 0) {
         class_6.method_124(var0, 0, field_593);
      }
   }

   // $VF: renamed from: d () void
   public static void method_584() {
      int var0 = field_606.length;

      while (--var0 >= 0) {
         int[] var1 = field_606[var0];
         int[] var2 = new int[4];
         field_606[var0] = var2;
         System.arraycopy(var1, 0, var2, 0, 3);
         int var3 = var1.length;

         while (--var3 >= 3) {
            var2[3] |= 1 << method_586(var1[var3]);
         }
      }
   }

   // $VF: renamed from: e () void
   private static void method_585() {
      field_616 = field_615;
      field_615 = 0;
      field_612 = field_612 | field_613;
      if (field_614 != 0) {
         int var0 = (field_614 = field_614 & field_612) & ~field_613;
         field_614 &= ~var0;
         field_612 &= ~var0;
      }

      field_613 = 0;
      int var9 = field_612;
      int var1 = field_606.length;

      while (--var1 >= 0) {
         boolean var2 = false;
         boolean var3 = false;
         int var4 = (field_616 & 1 << var1) != 0 && (field_614 & 1 << var1) == 0 ? 1 : 0;
         int[] var5;
         int var6 = (var5 = field_606[var1])[1];
         if ((var5[3] & var9) != 0) {
            var3 = true;
         }

         if (var3) {
            field_615 |= 1 << var1;
            if (var4 != 0) {
               if ((var6 & 2) != 0) {
                  var2 = method_578(var5[0], false, true);
               }
            } else {
               var3 = false;
               var4 = field_581;
               if ((var6 & 4) != 0) {
                  int var7 = var5[2];
                  if (var3 = var4 - var7 <= 500) {
                     int var8 = field_606.length;

                     while (--var8 >= 0) {
                        if (field_606[var8][2] > var7 && (field_606[var8][3] & var5[3]) == 0) {
                           var3 = false;
                           break;
                        }
                     }
                  }
               }

               var5[2] = var4;
               if ((var6 & 1) != 0 || var3) {
                  var2 = method_578(var5[0], var3, false);
               }
            }
         } else if (var4 != 0) {
            var2 = method_579(var5[0]);
         }

         if (var2) {
            method_588();
            return;
         }
      }
   }

   // $VF: renamed from: c (int) int
   private static int method_586(int var0) {
      int var1 = field_605.length;

      do {
         var1 -= 2;
         if (var1 < 0) {
            return -1;
         }
      } while (field_605[var1] != var0);

      return var1 >> 1;
   }

   // $VF: renamed from: a (int, boolean) void
   public static void method_587(int var0, boolean var1) {
      var0 = method_586(var0);
      if (var1) {
         method_588();
         field_613 |= 1 << var0;
      } else {
         field_614 |= 1 << var0;
      }
   }

   // $VF: renamed from: f () void
   private static void method_588() {
      field_614 = field_614 | field_612 | field_613;
   }

   // $VF: renamed from: a (int) int
   public static int method_589(int var0) {
      return field_581 - field_606[var0][2];
   }

   // $VF: renamed from: a (int, int) java.lang.String
   public static String method_590(int var0, int var1) {
      StringBuffer var2 = new StringBuffer();
      int[] var5;
      int var3 = (var5 = field_607[var0]).length;

      for (int var4 = 0; var4 < var3; var4++) {
         var2 = var2.append(class_15.method_424(var5[var4]));
         if (var4 + 1 < var3) {
            var2 = var2.append(',').append(' ');
         }
      }

      return var2.append(':').append('\n').append(class_15.method_424(var1)).append('\n').append('\n').toString();
   }

   // $VF: renamed from: b (int) int
   public static int method_591(int var0) {
      var0 = field_606[1][3];

      for (int var1 = 0; var1 < 32; var1++) {
         if ((var0 & 1 << var1) != 0) {
            return field_605[(var1 << 1) + 1];
         }
      }

      return 0;
   }
}
