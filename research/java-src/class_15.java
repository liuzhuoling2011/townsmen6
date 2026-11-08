import hg.class_22;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.util.Hashtable;
import java.util.Random;
import java.util.Vector;
import javax.microedition.lcdui.Font;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import javax.microedition.rms.RecordStore;

// $VF: renamed from: g
public final class class_15 {
   // $VF: renamed from: a java.util.Random
   private static final Random field_357 = new Random(System.currentTimeMillis());
   // $VF: renamed from: b int[]
   private static int[] field_358 = null;
   // $VF: renamed from: c int[]
   private static final int[] field_359 = new int[]{
      65536,
      65378,
      64906,
      64125,
      63041,
      61666,
      60013,
      58098,
      55938,
      53555,
      50972,
      48214,
      45307,
      42280,
      39160,
      35979,
      32768,
      29556,
      26375,
      23255,
      20228,
      17321,
      14563,
      11980,
      9597,
      7437,
      5522,
      3869,
      2494,
      1410,
      629,
      157,
      0
   };
   // $VF: renamed from: a java.io.ByteArrayOutputStream
   private static ByteArrayOutputStream field_360 = null;
   // $VF: renamed from: a int
   public static int field_361 = 0;
   // $VF: renamed from: b int
   public static int field_362 = 0;
   // $VF: renamed from: f int
   private static int field_363 = 0;
   // $VF: renamed from: g int
   private static int field_364 = 0;
   // $VF: renamed from: a java.lang.String
   public static String field_365 = "";
   // $VF: renamed from: a boolean
   public static boolean field_366 = false;
   // $VF: renamed from: h int
   private static int field_367;
   // $VF: renamed from: i int
   private static int field_368;
   // $VF: renamed from: j int
   private static int field_369;
   // $VF: renamed from: k int
   private static int field_370;
   // $VF: renamed from: l int
   private static int field_371;
   // $VF: renamed from: m int
   private static int field_372;
   // $VF: renamed from: n int
   private static int field_373;
   // $VF: renamed from: o int
   private static int field_374;
   // $VF: renamed from: a l
   private static class_10 field_375 = new class_10(10, 20);
   // $VF: renamed from: c int
   public static int field_376 = 0;
   // $VF: renamed from: d int
   public static int field_377 = 0;
   // $VF: renamed from: d int[]
   private static int[] field_378 = null;
   // $VF: renamed from: a javax.microedition.lcdui.Font[]
   private static Font[] field_379 = null;
   // $VF: renamed from: a int[][]
   private static int[][] field_380 = null;
   // $VF: renamed from: a javax.microedition.lcdui.Image[]
   private static Image[] field_381 = null;
   // $VF: renamed from: a short[][]
   private static short[][] field_382 = null;
   // $VF: renamed from: a short[]
   private static short[] field_383 = null;
   // $VF: renamed from: b short[][]
   private static short[][] field_384 = null;
   // $VF: renamed from: b int[][]
   private static int[][] field_385 = null;
   // $VF: renamed from: p int
   private static int field_386;
   // $VF: renamed from: q int
   private static int field_387;
   // $VF: renamed from: r int
   private static int field_388;
   // $VF: renamed from: s int
   private static int field_389;
   // $VF: renamed from: e int[]
   private static int[] field_390 = new int[1];
   // $VF: renamed from: a char[]
   private static char[] field_391 = new char[]{' ', ' ', '\t'};
   // $VF: renamed from: b char[]
   private static char[] field_392 = new char[]{'-', '.', ',', '/'};
   // $VF: renamed from: a java.util.Vector
   private static Vector field_393;
   // $VF: renamed from: b java.util.Vector
   private static Vector field_394;
   // $VF: renamed from: b java.lang.String
   private static String field_395;
   // $VF: renamed from: a java.lang.String[][]
   private static String[][] field_396 = null;
   // $VF: renamed from: a byte
   private static byte field_397;
   // $VF: renamed from: c java.util.Vector
   private static Vector field_398 = new Vector();
   // $VF: renamed from: a java.util.Hashtable
   private static Hashtable field_399 = null;
   // $VF: renamed from: a java.io.DataInputStream
   private static DataInputStream field_400 = null;
   // $VF: renamed from: t int
   private static int field_401 = -1;
   // $VF: renamed from: e int
   public static int field_402 = 0;
   // $VF: renamed from: a int[]
   public static int[] field_403 = null;
   // $VF: renamed from: a m
   private static class_9 field_404 = null;
   // $VF: renamed from: u int
   private static int field_405 = -1;
   // $VF: renamed from: v int
   private static int field_406 = -1;

   // $VF: renamed from: a (java.lang.String) java.lang.String
   public static String method_345(String var0) {
      if (var0 != null && !var0.equals("") && !var0.equals("null")) {
         try {
            return class_22.field_580.getAppProperty(var0);
         } catch (Exception var1) {
            return null;
         }
      } else {
         return null;
      }
   }

   // $VF: renamed from: b (java.lang.String) int
   private static int method_346(String var0) {
      String var1 = null;
      return (var1 = method_345(var0)) != null ? Integer.parseInt(var1) : 0;
   }

   // $VF: renamed from: a (java.lang.String) boolean
   public static boolean method_347(String var0) {
      String var1 = null;
      return (var1 = method_345(var0)) != null ? var1.equals("true") : false;
   }

   // $VF: renamed from: a (java.lang.String) java.io.InputStream
   public static InputStream method_348(String var0) {
      return Runtime.getRuntime().getClass().getResourceAsStream(var0);
   }

   // $VF: renamed from: a (java.io.DataOutputStream, int[]) void
   public static void method_349(DataOutputStream var0, int[] var1) {
      if (var1 == null) {
         var0.writeInt(-1);
      } else {
         var0.writeInt(var1.length);

         for (int var2 = 0; var2 < var1.length; var2++) {
            var0.writeInt(var1[var2]);
         }
      }
   }

   // $VF: renamed from: a (java.io.DataInputStream) int[]
   public static int[] method_350(DataInputStream var0) {
      int var1;
      if ((var1 = var0.readInt()) < 0) {
         return null;
      }

      int[] var3 = new int[var1];

      for (int var2 = 0; var2 < var3.length; var2++) {
         var3[var2] = var0.readInt();
      }

      return var3;
   }

   // $VF: renamed from: a (int) int
   public static final int method_351(int var0) {
      return var0 > 1 ? (field_357.nextInt() & 2147483647) % var0 : 0;
   }

   // $VF: renamed from: a (int, int) int
   public static final int method_352(int var0, int var1) {
      if (var1 < var0) {
         int var2 = var1;
         var1 = var0;
         var0 = var2;
      }

      return method_351(var1 - var0 + 1) + var0;
   }

   // $VF: renamed from: a () boolean
   public static final boolean method_353() {
      return field_357.nextInt() % 2 == 0;
   }

   // $VF: renamed from: a (int, int, int, int, int) int
   public static final int method_354(int var0, int var1, int var2, int var3, int var4) {
      if (var3 <= 0) {
         return var1;
      }

      if (var3 >= var4) {
         return var2;
      }

      var3 = (int)(((long)var3 << 16) / var4);
      switch (var0) {
         case 1:
            int var9 = var3;
            int var7 = var2;
            var0 = var1;
            var3 = field_359.length - 2;
            var4 = var9 * var3 % 65536;
            var2 = var9 * var3 / 65536;
            return method_359(method_359(field_359[var2 + 1], var4) + method_359(field_359[var2], 65536 - var4), var0 - var7) + var7;
         default:
            int var8 = var3;
            int var6 = var2;
            return (var1 * (65536 - var8) + var6 * var8) / 65536;
      }
   }

   // $VF: renamed from: b (int) int
   public static final int method_355(int var0) {
      if ((var0 = var0 % 512) < 0) {
         var0 += 512;
      }

      return field_358[var0];
   }

   // $VF: renamed from: c (int) int
   public static final int method_356(int var0) {
      return method_355(var0 - 128);
   }

   // $VF: renamed from: b (int, int) int
   public static final int method_357(int var0, int var1) {
      if (0 < var1) {
         if (var0 < 0) {
            return 0;
         } else {
            return var0 > var1 ? var1 : var0;
         }
      } else {
         return 0;
      }
   }

   // $VF: renamed from: d (int) int
   public static final int method_358(int var0) {
      if (var0 < 0) {
         return -1;
      } else {
         return var0 > 0 ? 1 : 0;
      }
   }

   // $VF: renamed from: g (int, int) int
   private static int method_359(int var0, int var1) {
      return (int)((long)var0 * var1 >> 16);
   }

   // $VF: renamed from: h (int, int) int
   private static int method_360(int var0, int var1) {
      return (var1 & 0xFF) << 8 | var0 & 0xFF;
   }

   // $VF: renamed from: a (int) boolean
   public static boolean method_361(int var0) {
      RecordStore var1 = null;
      boolean var2 = false;

      try {
         var1 = RecordStore.openRecordStore("Townsmen6" + var0, false);
         var2 = true;
      } catch (Exception var9) {
      } finally {
         try {
            var1.closeRecordStore();
         } catch (Exception var8) {
         }
      }

      return var2;
   }

   // $VF: renamed from: a (int) void
   public static final void method_362(int var0) {
      if (method_361(var0)) {
         try {
            RecordStore var1 = null;
            if ((var1 = RecordStore.openRecordStore("Townsmen6" + var0, false)).getNumRecords() == 1) {
               var1.deleteRecord(1);
            }

            var1.closeRecordStore();
            RecordStore.deleteRecordStore("Townsmen6" + var0);
         } catch (Throwable var2) {
         }
      }
   }

   // $VF: renamed from: a (int) java.io.DataInputStream
   // $VF: Could not verify finally blocks. A semaphore variable has been added to preserve control flow.
   // Please report this to the Vineflower issue tracker, at https://github.com/Vineflower/vineflower/issues with a copy of the class file (if you have the rights to distribute it!)
   public static DataInputStream method_363(int var0) {
      RecordStore var1 = null;
      DataInputStream var2 = null;
      byte[] var3 = null;
      boolean var9 = false /* VF: Semaphore variable */;

      label90: {
         try {
            var9 = true;
            if ((var3 = (var1 = RecordStore.openRecordStore("Townsmen6" + var0, false)).getRecord(1)) != null) {
               if (var3.length >= 4) {
                  if ((var3[0] << 8 | var3[1]) == var0) {
                     var0 = (var3[2] & 255) << 8 | var3[3] & 255;
                     if (var3.length == var0) {
                        var2 = new DataInputStream(new ByteArrayInputStream(var3, 4, var0 - 4));
                        var9 = false;
                     } else {
                        var9 = false;
                     }
                  } else {
                     var9 = false;
                  }
               } else {
                  var9 = false;
               }
            } else {
               var9 = false;
            }
            break label90;
         } catch (Exception var13) {
            var9 = false;
         } finally {
            if (var9) {
               try {
                  if (var1 != null) {
                     var1.closeRecordStore();
                  }
               } catch (Exception var10) {
               }
            }
         }

         var2 = null;

         try {
            if (var1 != null) {
               var1.closeRecordStore();
               return var2;
            }
         } catch (Exception var11) {
         }

         return var2;
      }

      try {
         if (var1 != null) {
            var1.closeRecordStore();
         }
      } catch (Exception var12) {
      }

      return var2;
   }

   // $VF: renamed from: a (int) java.io.DataOutputStream
   public static DataOutputStream method_364(int var0) {
      (field_360 = new ByteArrayOutputStream()).write(var0 >> 8 & 0xFF);
      field_360.write(var0 & 0xFF);
      field_360.write(0);
      field_360.write(0);
      return new DataOutputStream(field_360);
   }

   // $VF: renamed from: b () boolean
   public static boolean method_365() {
      int var0 = 0;
      if (field_360 == null) {
         return false;
      }

      try {
         if (field_360.size() < 4) {
            return false;
         }

         byte[] var1;
         int var2 = (var1 = field_360.toByteArray()).length;
         var0 = var1[0] << 8 | var1[1];
         var1[2] = (byte)(var2 >> 8);
         var1[3] = (byte)var2;
         field_360 = null;
         return method_366(var0, var1);
      } catch (Throwable var3) {
         return false;
      }
   }

   // $VF: renamed from: a (int, byte[]) boolean
   private static boolean method_366(int var0, byte[] var1) {
      RecordStore var2 = null;
      boolean var3 = true;
      boolean var4 = false;

      try {
         if ((var2 = RecordStore.openRecordStore("Townsmen6" + var0, true)).getNumRecords() < 1) {
            var2.addRecord(var1, 0, 1);
            var4 = true;
         }

         if (var2.getSizeAvailable() < var1.length << 1) {
            var3 = false;
         } else {
            var2.setRecord(1, var1, 0, var1.length);
            var4 = false;
         }
      } catch (Exception var6) {
         var3 = false;
      }

      if (var2 != null) {
         try {
            var2.closeRecordStore();
            if (var4) {
               method_362((short)var0);
            }
         } catch (Exception var5) {
         }
      }

      return var3;
   }

   private class_15() {
   }

   static {
      field_358 = new int[]{
         65536,
         65531,
         65516,
         65491,
         65457,
         65412,
         65358,
         65294,
         65220,
         65136,
         65043,
         64939,
         64826,
         64703,
         64571,
         64428,
         64276,
         64115,
         63943,
         63762,
         63571,
         63371,
         63162,
         62942,
         62714,
         62475,
         62228,
         61971,
         61705,
         61429,
         61144,
         60850,
         60547,
         60235,
         59913,
         59583,
         59243,
         58895,
         58538,
         58172,
         57797,
         57414,
         57022,
         56621,
         56212,
         55794,
         55368,
         54933,
         54491,
         54040,
         53581,
         53114,
         52639,
         52155,
         51665,
         51166,
         50660,
         50146,
         49624,
         49095,
         48558,
         48015,
         47464,
         46906,
         46340,
         45768,
         45189,
         44603,
         44011,
         43412,
         42806,
         42194,
         41575,
         40950,
         40319,
         39682,
         39039,
         38390,
         37736,
         37075,
         36409,
         35738,
         35061,
         34379,
         33692,
         32999,
         32302,
         31600,
         30893,
         30181,
         29465,
         28745,
         28020,
         27291,
         26557,
         25820,
         25079,
         24334,
         23586,
         22833,
         22078,
         21319,
         20557,
         19792,
         19024,
         18253,
         17479,
         16702,
         15923,
         15142,
         14359,
         13573,
         12785,
         11995,
         11204,
         10410,
         9616,
         8819,
         8022,
         7223,
         6423,
         5622,
         4821,
         4018,
         3215,
         2412,
         1608,
         804,
         0,
         -804,
         -1608,
         -2412,
         -3215,
         -4018,
         -4821,
         -5622,
         -6423,
         -7223,
         -8022,
         -8819,
         -9616,
         -10410,
         -11204,
         -11995,
         -12785,
         -13573,
         -14359,
         -15142,
         -15923,
         -16702,
         -17479,
         -18253,
         -19024,
         -19792,
         -20557,
         -21319,
         -22078,
         -22833,
         -23586,
         -24334,
         -25079,
         -25820,
         -26557,
         -27291,
         -28020,
         -28745,
         -29465,
         -30181,
         -30893,
         -31600,
         -32302,
         -32999,
         -33692,
         -34379,
         -35061,
         -35738,
         -36409,
         -37075,
         -37736,
         -38390,
         -39039,
         -39682,
         -40319,
         -40950,
         -41575,
         -42194,
         -42806,
         -43412,
         -44011,
         -44603,
         -45189,
         -45768,
         -46340,
         -46906,
         -47464,
         -48015,
         -48558,
         -49095,
         -49624,
         -50146,
         -50660,
         -51166,
         -51665,
         -52155,
         -52639,
         -53114,
         -53581,
         -54040,
         -54491,
         -54933,
         -55368,
         -55794,
         -56212,
         -56621,
         -57022,
         -57414,
         -57797,
         -58172,
         -58538,
         -58895,
         -59243,
         -59583,
         -59913,
         -60235,
         -60547,
         -60850,
         -61144,
         -61429,
         -61705,
         -61971,
         -62228,
         -62475,
         -62714,
         -62942,
         -63162,
         -63371,
         -63571,
         -63762,
         -63943,
         -64115,
         -64276,
         -64428,
         -64571,
         -64703,
         -64826,
         -64939,
         -65043,
         -65136,
         -65220,
         -65294,
         -65358,
         -65412,
         -65457,
         -65491,
         -65516,
         -65531,
         -65536,
         -65531,
         -65516,
         -65491,
         -65457,
         -65412,
         -65358,
         -65294,
         -65220,
         -65136,
         -65043,
         -64939,
         -64826,
         -64703,
         -64571,
         -64428,
         -64276,
         -64115,
         -63943,
         -63762,
         -63571,
         -63371,
         -63162,
         -62942,
         -62714,
         -62475,
         -62228,
         -61971,
         -61705,
         -61429,
         -61144,
         -60850,
         -60547,
         -60235,
         -59913,
         -59583,
         -59243,
         -58895,
         -58538,
         -58172,
         -57797,
         -57414,
         -57022,
         -56621,
         -56212,
         -55794,
         -55368,
         -54933,
         -54491,
         -54040,
         -53581,
         -53114,
         -52639,
         -52155,
         -51665,
         -51166,
         -50660,
         -50146,
         -49624,
         -49095,
         -48558,
         -48015,
         -47464,
         -46906,
         -46340,
         -45768,
         -45189,
         -44603,
         -44011,
         -43412,
         -42806,
         -42194,
         -41575,
         -40950,
         -40319,
         -39682,
         -39039,
         -38390,
         -37736,
         -37075,
         -36409,
         -35738,
         -35061,
         -34379,
         -33692,
         -32999,
         -32302,
         -31600,
         -30893,
         -30181,
         -29465,
         -28745,
         -28020,
         -27291,
         -26557,
         -25820,
         -25079,
         -24334,
         -23586,
         -22833,
         -22078,
         -21319,
         -20557,
         -19792,
         -19024,
         -18253,
         -17479,
         -16702,
         -15923,
         -15142,
         -14359,
         -13573,
         -12785,
         -11995,
         -11204,
         -10410,
         -9616,
         -8819,
         -8022,
         -7223,
         -6423,
         -5622,
         -4821,
         -4018,
         -3215,
         -2412,
         -1608,
         -804,
         0,
         804,
         1608,
         2412,
         3215,
         4018,
         4821,
         5622,
         6423,
         7223,
         8022,
         8819,
         9616,
         10410,
         11204,
         11995,
         12785,
         13573,
         14359,
         15142,
         15923,
         16702,
         17479,
         18253,
         19024,
         19792,
         20557,
         21319,
         22078,
         22833,
         23586,
         24334,
         25079,
         25820,
         26557,
         27291,
         28020,
         28745,
         29465,
         30181,
         30893,
         31600,
         32302,
         32999,
         33692,
         34379,
         35061,
         35738,
         36409,
         37075,
         37736,
         38390,
         39039,
         39682,
         40319,
         40950,
         41575,
         42194,
         42806,
         43412,
         44011,
         44603,
         45189,
         45768,
         46340,
         46906,
         47464,
         48015,
         48558,
         49095,
         49624,
         50146,
         50660,
         51166,
         51665,
         52155,
         52639,
         53114,
         53581,
         54040,
         54491,
         54933,
         55368,
         55794,
         56212,
         56621,
         57022,
         57414,
         57797,
         58172,
         58538,
         58895,
         59243,
         59583,
         59913,
         60235,
         60547,
         60850,
         61144,
         61429,
         61705,
         61971,
         62228,
         62475,
         62714,
         62942,
         63162,
         63371,
         63571,
         63762,
         63943,
         64115,
         64276,
         64428,
         64571,
         64703,
         64826,
         64939,
         65043,
         65136,
         65220,
         65294,
         65358,
         65412,
         65457,
         65491,
         65516,
         65531
      };
   }

   // $VF: renamed from: a () void
   public static void method_367() {
      try {
         field_361 = method_346("Glu-Demo-Time-Limit");
         field_362 = method_346("Glu-Demo-Game-Limit");
         field_365 = method_345("Glu-Demo-URL");
         field_366 = method_345("Glu-Demo-Enabled").equals("true");
         if (field_365 == null) {
            field_366 = false;
         } else {
            if (field_366 && field_362 == 0 && field_361 == 0) {
               field_362 = 1;
            }

            field_363 = field_361 * 1000;
            field_364 = field_362;
         }
      } catch (Exception var0) {
         field_361 = 0;
         field_362 = 0;
         field_366 = false;
      }
   }

   // $VF: renamed from: a (d, int) d
   public static class_18 method_368(class_18 var0, int var1) {
      var0.field_446 = field_377;
      var0.field_447 = field_376;
      var0.field_448 = field_377;
      if (var1 == 49) {
         Hashtable var4;
         (var4 = new Hashtable(2)).put("expTime", String.valueOf(field_361));
         var4.put("expLevel", String.valueOf(field_362));
         String var10000 = method_435(method_424(44), var4);
         int var3 = 0;
         int var2 = method_438(var10000, true);
         var1 = method_438(method_435(method_424(49), var4), true);
         var0.field_426 = var0.field_425 = var0.field_428 = var0.field_427 = 0;
         var3 = (byte)0;
         int[] var10001 = new int[]{102, 0, 0, 50, 17};
         var3++;
         var0.method_481(var10001, 0);
         if (field_362 > 0) {
            var10001 = new int[]{109, 0, 0, 10};
            var3++;
            var0.method_481(var10001, 1);
            var10001 = new int[]{102, 0, 0, var2, 17};
            var3++;
            var0.method_481(var10001, 2);
         }

         if (field_361 > 0) {
            var0.method_481(new int[]{109, 0, 0, 10}, var3++);
            var0.method_481(new int[]{102, 0, 0, var1, 17}, var3);
         }
      } else {
         var0.field_446 = field_377;
         var0.field_447 = field_376;
         var0.field_448 = field_377;
         if (field_361 > 0) {
            method_367();
         }
      }

      return var0;
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int) void
   public static void method_369(Graphics var0, int var1) {
      if (field_366 && var0 != null && var1 == 2) {
         method_419(var0, field_376 >> 1, field_377 / 10, method_424(50), 2, 17, 0, field_378[38], 0);
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics) void
   public static void method_370(Graphics var0) {
      var0.setColor(8421504);
      method_396(var0, 0, 0, field_376, field_377);
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, d) void
   public static void method_371(Graphics var0, class_18 var1) {
      method_394(var0, 0, var1.field_425 - field_382[113][0], field_376, var1.field_434 + field_382[113][0], 113);
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics, d) void
   public static void method_372(Graphics var0, class_18 var1) {
      var0.setColor(0);
      var0.fillRect(0, field_377 - method_401(2), field_376, method_401(2));
      method_419(var0, 0, var1.field_446, var1.field_419 == 50 ? method_424(46) : method_424(48), 2, 36, 0, 16777215, 0);
      method_419(var0, var1.field_447, var1.field_448, var1.field_419 == 50 ? method_424(47) : method_424(45), 2, 40, 0, 16777215, 0);
   }

   // $VF: renamed from: b () void
   public static void method_373() {
      if (field_366 && field_361 > 0 && (field_363 -= 50) < 0) {
         class_22.method_568(50);
      }
   }

   // $VF: renamed from: c () void
   public static void method_374() {
      if (--field_364 <= 0) {
         class_22.method_568(50);
      }
   }

   // $VF: renamed from: c () boolean
   public static boolean method_375() {
      return field_366;
   }

   // $VF: renamed from: d () boolean
   public static boolean method_376() {
      return !field_366 || field_364 > 0 || field_363 > 0;
   }

   // $VF: renamed from: b (int) boolean
   public static boolean method_377(int var0) {
      return !field_366 || var0 < field_362;
   }

   // $VF: renamed from: a (int, int, int, int, int, int, int, int) void
   public static void method_378(int var0, int var1, int var2, int var3, int var4, int var5, int var6, int var7) {
      field_375.method_253();
      field_368 = var0;
      field_367 = var1;
      field_369 = var2;
      field_372 = var5;
      field_370 = var3;
      field_371 = var4;
      field_373 = var6;
      field_374 = var7;
   }

   // $VF: renamed from: a (int, int) void
   public static void method_379(int var0, int var1) {
      for (int var2 = 0; var2 < var1; var2++) {
         field_375.method_252(var0);
         method_382();
      }
   }

   // $VF: renamed from: d () void
   public static void method_380() {
      if (field_368 != -1) {
         if (class_12.field_245 > field_368) {
            field_368 = class_12.field_245 + field_367;
            method_381();
            method_382();
         }
      }
   }

   // $VF: renamed from: e () void
   public static void method_381() {
      int var0 = 0;

      for (int var1 = 0; var1 < class_4.field_90.size(); var1++) {
         class_4 var2 = (class_4)class_4.field_90.elementAt(var1);
         var0 += class_21.method_536(var2.field_62, var2.field_59);
      }

      int var3 = 0;

      while (class_14.field_355.size() < Math.min(field_374, var0) && var3++ < field_373) {
         class_14 var4;
         if ((var4 = class_14.method_332(4)).field_313 != null) {
            var4.method_334(var4.field_313.field_68, var4.field_313.field_69);
         }
      }
   }

   // $VF: renamed from: r () void
   private static void method_382() {
      class_4 var0 = null;
      if (field_375.field_232 > 0) {
         var0 = class_3.method_60(field_375.method_247(method_351(field_375.field_232)), 0);
      }

      if (var0 == null) {
         var0 = class_3.method_60(-1, 0);
      }

      if ((var0 = var0) != null && class_14.field_356.size() > 0) {
         if (var0.field_74 == null) {
            var0.field_74 = new class_20(var0);
         }

         for (int var1 = 0; var1 < field_370; var1++) {
            var0.field_74.method_521();
         }

         class_21.method_553(var0);
      }
   }

   // $VF: renamed from: a (b) void
   public static void method_383(class_20 var0) {
      if (!class_12.field_238.field_32) {
         int var1;
         if (var0.method_510() + var0.method_511() <= 0 && var0.field_486.field_61 == 1) {
            var1 = 0;
         } else {
            var1 = Math.min(Math.max(var0.method_510() * field_369 / 100, field_370), 5);
            if (var0.field_486.field_61 == 1) {
               var1 = Math.max(class_21.method_536(var0.field_486.field_62, var0.field_486.field_59), var1);
            }
         }

         if ((var1 = var1 - var0.method_512()) > 0) {
            var1 = Math.min(field_371 - var0.field_494, var1);

            for (int var5 = 0; var5 < var1; var5++) {
               var0.method_521();
            }
         } else {
            if (var1 < 0) {
               for (int var2 = 0; var2 < Math.abs(var1); var2++) {
                  var0.method_522();
               }
            }
         }
      }
   }

   // $VF: renamed from: a (r) void
   public static void method_384(class_4 var0) {
      if (method_351(100) < field_372) {
         var0.method_90();
      }
   }

   // $VF: renamed from: f () void
   public static void method_385() {
      method_386(null, 0);
   }

   // $VF: renamed from: a (s, int) void
   public static void method_386(class_0 var0, int var1) {
      int var2;
      if (class_12.field_238.field_30 != -1) {
         var2 = class_12.method_268(class_12.field_238.field_30, false);
      } else {
         var2 = method_352(field_374, field_374 + 3);
      }

      int var3 = 0;

      for (int var4 = 0; var4 < class_4.field_90.size(); var4++) {
         class_4 var5 = (class_4)class_4.field_90.elementAt(var4);
         var3 += class_21.method_536(var5.field_62, var5.field_59);
      }

      int var8 = var2;
      if ((var2 = Math.max(field_374, var2) - var3) > 0) {
         while (var2 >= class_21.method_536(14, 2) << 1) {
            class_12.field_238.method_56(class_4.method_87(14, 2, 1), var1, var0);
            var2 -= class_21.method_536(14, 2);
         }

         while (var2 >= class_21.method_536(14, 1)) {
            class_12.field_238.method_56(class_4.method_87(14, 1, 1), var1, var0);
            var2 -= class_21.method_536(14, 1);
         }

         while (var2 > 0) {
            class_12.field_238.method_56(class_4.method_87(14, 0, 1), var1, var0);
            var2 -= class_21.method_536(14, 0);
         }
      }

      class_14.method_333(4, var8);

      for (int var9 = 0; var9 < class_14.field_355.size(); var9++) {
         class_14 var6;
         if ((var6 = (class_14)class_14.field_355.elementAt(var9)).field_313 != null) {
            var6.method_334(var6.field_313.field_68, var6.field_313.field_69);
         }
      }
   }

   // $VF: renamed from: a (h) void
   public static void method_387(class_14 var0) {
      if (class_4.field_90.size() == 0) {
         var0.method_339();
      } else {
         class_4 var1 = null;
         int var2 = Integer.MAX_VALUE;

         for (int var3 = 0; var3 < class_4.field_90.size(); var3++) {
            class_4 var4;
            int var5;
            if ((var5 = (var4 = (class_4)class_4.field_90.elementAt(var3)).field_67 - class_21.method_536(var4.field_62, var4.field_59)) < var2) {
               var1 = var4;
               var2 = var5;
            }
         }

         var0.method_336(var1);
      }
   }

   // $VF: renamed from: a (java.io.DataOutputStream) void
   public static void method_388(DataOutputStream var0) {
      var0.writeInt(field_367);
      var0.writeInt(field_368);
      var0.writeInt(field_369);
      var0.writeInt(field_370);
      var0.writeInt(field_371);
      var0.writeInt(field_372);
      var0.writeInt(field_373);
      var0.writeInt(field_374);
      var0.writeInt(field_375.field_232);

      for (int var1 = 0; var1 < field_375.field_232; var1++) {
         var0.writeInt(field_375.method_247(var1));
      }

      var0.writeInt(class_14.field_355.size());
   }

   // $VF: renamed from: a (java.io.DataInputStream) void
   public static void method_389(DataInputStream var0) {
      field_367 = var0.readInt();
      field_368 = var0.readInt();
      field_369 = var0.readInt();
      field_370 = var0.readInt();
      field_371 = var0.readInt();
      field_372 = var0.readInt();
      field_373 = var0.readInt();
      field_374 = var0.readInt();
      int var1 = var0.readInt();

      for (int var2 = 0; var2 < var1; var2++) {
         field_375.method_252(var0.readInt());
      }

      var1 = var0.readInt();

      for (int var4 = 0; var4 < var1; var4++) {
         class_14.method_332(4);
      }
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics) void
   public static void method_390(Graphics var0) {
      field_386 = var0.getClipX();
      field_387 = var0.getClipY();
      field_388 = var0.getClipWidth();
      field_389 = var0.getClipHeight();
   }

   // $VF: renamed from: c (javax.microedition.lcdui.Graphics) void
   public static void method_391(Graphics var0) {
      var0.setClip(field_386, field_387, field_388, field_389);
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics, int) void
   public static void method_392(Graphics var0, int var1) {
      var0.setColor(var1);
      var0.fillRect(0, 0, field_376, field_377);
   }

   // $VF: renamed from: d (javax.microedition.lcdui.Graphics) void
   public static void method_393(Graphics var0) {
      var0.setClip(0, 0, field_376, field_377);
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int, int, int, int) void
   public static void method_394(Graphics var0, int var1, int var2, int var3, int var4, int var5) {
      boolean var19 = false;
      var4 = var4;
      var3 = var3;
      var2 = var2;
      var1 = var1;
      var0 = var0;
      short var6 = 0;
      short var25 = field_382[113][0];
      var6 = field_382[113][1];
      int var7 = var1 + var3 - var25;
      int var8 = var2 + var4 - var6;
      int var9 = var1;
      int var10 = var2;
      int var11 = var0.getClipX();
      int var12 = var0.getClipY();
      int var13 = var0.getClipWidth();
      int var14 = var11 + var13;
      int var15 = var0.getClipHeight();
      int var16 = var12 + var15;
      int var17 = var11 >= var1 ? var11 : var1;
      int var18 = var12 >= var2 ? var12 : var2;
      var14 = var14 >= var1 + var3 ? var3 : var3 - (var1 + var3 - var14);
      var16 = var16 >= var2 + var4 ? var4 : var4 - (var2 + var4 - var16);
      var0.setClip(var17, var18, var14, var16);
      method_417(var0, var1, var2, 113, 0);
      var0.setClip(var17, var18, var3 == var14 ? var3 - var25 : var3 - (var3 - var14), var4 == var16 ? var4 - var6 : var4 - (var4 - var16));
      var10 += var6;

      do {
         method_417(var0, var9, var10, 113, 16);
      } while ((var10 += var6) < var8);

      var0.setClip(var17, var18, var14, var16);
      method_417(var0, var9, var8, 113, 32);
      var9 += var25;

      do {
         method_417(var0, var9, var2, 113, 1);
         var0.setClip(var17, var18, var3 == var14 ? var3 - var25 : var3 - (var3 - var14), var4 == var16 ? var4 - var6 : var4 - (var4 - var16));
         var10 = var2 + var6;

         do {
            method_417(var0, var9, var10, 113, 17);
         } while ((var10 += var6) < var8);

         var0.setClip(var17, var18, var14, var16);
         method_417(var0, var9, var8, 113, 33);
      } while ((var9 += var25) < var7);

      var0.setClip(var17, var18, var14, var16);
      method_417(var0, var7, var2, 113, 2);
      var0.setClip(var17, var18, var14, var4 == var16 ? var4 - var6 : var4 - (var4 - var16));
      var10 = var2 + var6;

      do {
         method_417(var0, var7, var10, 113, 18);
      } while ((var10 += var6) < var8);

      var0.setClip(var17, var18, var14, var16);
      method_417(var0, var7, var8, 113, 34);
      var0.setClip(var11, var12, var13, var15);
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int, int, int) void
   public static void method_395(Graphics var0, int var1, int var2, int var3, int var4) {
      int var5 = var4;
      short var8 = field_382[var5][0];
      var3 = var1 + var3 - var8;
      int var6 = var1 + var8;
      method_417(var0, var1, var2, var4, 0);

      do {
         method_417(var0, var6, var2, var4, 1);
      } while ((var6 += var8) < var3);

      method_417(var0, var3, var2, var4, 2);
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics, int, int, int, int) void
   public static void method_396(Graphics var0, int var1, int var2, int var3, int var4) {
      var1 = var4;
      var2 = var3 + (var3 & 1);

      while (true) {
         var2 -= 2;
         if (var2 < 0) {
            var2 = var4 + (var3 + var4 & 1);

            while (true) {
               var2 -= 2;
               if (var2 < 0) {
                  return;
               }

               int var12 = var3;
               int var13 = var2;
               int var14 = 0;
               int var15;
               if ((var15 = var2 + var3) > var1) {
                  var14 = 0 + (var15 - var1);
                  var15 = var1;
               }

               var0.drawLine(var12, var13, var14, var15);
            }
         }

         int var5 = var2;
         boolean var6 = false;
         int var7 = 0;
         int var8 = var2;
         if (var2 > var1) {
            var7 = 0 + (var8 - var1);
            var8 = var1;
         }

         var0.drawLine(var5, 0, var7, var8);
      }
   }

   // $VF: renamed from: e (int) int
   public static int method_397(int var0) {
      return field_378[var0];
   }

   // $VF: renamed from: a (int) javax.microedition.lcdui.Font
   public static Font method_398(int var0) {
      return field_379 != null && var0 < field_379.length && var0 >= 0 ? field_379[var0] : Font.getDefaultFont();
   }

   // $VF: renamed from: c (javax.microedition.lcdui.Graphics, int) void
   private static void method_399(Graphics var0, int var1) {
      if (field_379 != null && var1 < field_379.length && var1 >= 0) {
         var0.setFont(field_379[var1]);
      } else {
         var0.setFont(Font.getDefaultFont());
      }
   }

   // $VF: renamed from: a (java.lang.String, javax.microedition.lcdui.Font) int
   public static int method_400(String var0, Font var1) {
      int var2 = 0;
      int var3 = var0.length();

      while (--var3 >= 0) {
         var2 += var1.charWidth(var0.charAt(var3));
      }

      return var2;
   }

   // $VF: renamed from: f (int) int
   public static int method_401(int var0) {
      return field_379 != null && var0 < field_379.length && var0 >= 0 ? field_380[var0][3] : Font.getDefaultFont().getHeight();
   }

   // $VF: renamed from: s () void
   private static void method_402() {
      int var0 = field_379.length;
      Image var1 = null;
      Graphics var2 = null;
      int[] var3 = null;

      for (int var4 = 0; var4 < var0; var4++) {
         if (field_380[var4][3] == -1) {
            int var5 = field_379[0].getHeight() + 14;
            int var6 = field_379[0].stringWidth("Äg)") + 14;
            if (var1 == null) {
               var3 = new int[var5 * var6];
               var2 = (var1 = Image.createImage(var6, var5)).getGraphics();
            }

            var2.setColor(16777215);
            var2.fillRect(0, 0, var6, var5);
            var2.setFont(field_379[var4]);
            var2.setColor(0);
            var2.drawString("Äg)", 7, 7, 20);
            int var7 = -1;
            int var8 = -1;
            int var9 = -1;
            var1.getRGB(var3, 0, var6, 0, 0, var6, var5);
            var5 = var3[0] & 16777215;

            for (int var10 = 1; var10 < var3.length; var10++) {
               int var11 = var10 / var6;
               int var12 = var10 % var6;
               if ((var3[var10] & 16777215) != var5) {
                  if (var12 < var7 || var7 == -1) {
                     var7 = var12;
                  }

                  if (var11 < var8 || var8 == -1) {
                     var8 = var11;
                  }

                  if (var11 > var9 || var9 == -1) {
                     var9 = var11;
                  }
               }
            }

            int var15 = var9 - var8;
            int var16 = 0;
            if (var15 < field_379[var4].getHeight()) {
               var16 = (field_379[var4].getHeight() - var15) / 2;
               var15 += var16 << 1;
            }

            int var17 = 7 - var7;
            var5 = 7 - var8 + var16;
            field_380[var4][0] = field_380[var4][0] + var17;
            field_380[var4][1] = field_380[var4][1] + var5;
            field_380[var4][3] = var15 + 2;
         }

         field_380[var4][3] = field_380[var4][3] + field_380[var4][2];
      }

      System.gc();
   }

   // $VF: renamed from: a (java.lang.String) void
   public static void method_403(String var0) {
      InputStream var17;
      if ((var17 = method_348(var0)) != null) {
         try {
            DataInputStream var1;
            short var2 = (var1 = new DataInputStream(var17)).readShort();
            short var3 = var1.readShort();
            if (var2 != 18260 && var3 != 1281) {
               return;
            }

            while ((var2 = var1.readShort()) != -1) {
               var3 = var1.readShort();
               switch (var2) {
                  case 16718:
                     field_384 = new short[var2 = var1.readShort()][];

                     for (int var31 = 0; var31 < var2; var31++) {
                        short var36 = var1.readShort();
                        short[] var38 = field_384[var31] = new short[var36 + 2];

                        for (int var41 = 0; var41 < var36 + 2; var41++) {
                           var38[var41] = var1.readShort();
                        }
                     }
                     break;
                  case 17231:
                     field_378 = new int[var2 = var1.readShort()];

                     for (int var30 = 0; var30 < var2; var30++) {
                        field_378[var30] = var1.readInt();
                     }
                     break;
                  case 17998:
                     field_379 = new Font[var2 = var1.readShort()];
                     field_380 = new int[var2][4];

                     for (int var29 = 0; var29 < var2; var29++) {
                        byte var35;
                        if ((var35 = var1.readByte()) == -1) {
                           field_379[var29] = Font.getDefaultFont();
                        } else {
                           field_379[var29] = Font.getFont(var35 & 96, var35 & 7, var35 & 24);
                        }

                        field_380[var29][0] = var1.readByte();
                        field_380[var29][1] = var1.readByte();
                        field_380[var29][2] = var1.readByte();
                        field_380[var29][3] = var1.readByte();
                     }

                     method_402();
                     break;
                  case 18004:
                     field_383 = new short[(var2 = var1.readShort()) * 7];

                     for (int var28 = 0; var28 < var2; var28++) {
                        int var34 = var28 * 7;
                        field_383[var34 + 2] = (short)var1.readUnsignedByte();
                        field_383[var34 + 3] = (short)var1.readUnsignedByte();
                        field_383[var34] = (short)var1.readUnsignedByte();
                        field_383[var34 + 1] = (short)var1.readUnsignedByte();
                        field_383[var34 + 4] = var1.readByte();
                        field_383[var34 + 5] = var1.readByte();
                        field_383[var34 + 6] = var1.readByte();
                     }
                     break;
                  case 18772:
                     field_382 = new short[var2 = var1.readShort()][];
                     field_381 = new Image[var2];

                     for (int var27 = 0; var27 < var2; var27++) {
                        short var32;
                        if ((var32 = var1.readByte()) != -1) {
                           short[] var37 = field_382[var27] = new short[12];
                           if (((var32 = (short)(var32 << 8)) & 512) != 0) {
                              short var39 = var1.readShort();
                              System.arraycopy(field_382[var39], 0, var37, 0, var37.length);
                              var37[7] |= var32;
                              var37[10] = var39;
                           } else {
                              byte var40 = var1.readByte();
                              byte var7 = var1.readByte();
                              var37[7] = (short)(var32 | var40);
                              var37[2] = (short)(var7 >> 4 & 15);
                              var37[3] = (short)(var7 & 15);
                              var37[4] = var1.readByte();
                              var37[5] = var1.readShort();
                              var37[6] = var1.readShort();
                              var37[8] = var1.readShort();
                              if ((var32 & 256) != 0) {
                                 var37[10] = var1.readShort();
                                 var37[11] = var1.readByte();
                              }
                           }
                        }
                     }
                     break;
                  case 20556:
                     field_385 = new int[var2 = var1.readShort()][];

                     for (int var26 = 0; var26 < var2; var26++) {
                        short var4 = var1.readShort();
                        int[] var5 = field_385[var26] = new int[var4];

                        for (int var6 = 0; var6 < var4; var6++) {
                           var5[var6] = var1.readInt();
                        }
                     }
                     break;
                  default:
                     var1.skip(var3);
               }
            }
         } catch (Throwable var15) {
            return;
         } finally {
            try {
               var17.close();
            } catch (Throwable var14) {
            }
         }
      }
   }

   // $VF: renamed from: a (int, boolean) void
   public static void method_404(int var0, boolean var1) {
      short[] var2;
      if (var0 >= 0 && (var2 = field_382[var0]) != null) {
         if (var1 && field_381[var0] == null && (var2[7] & 768) != 0 && var2[10] != var0) {
            short var3 = var2[10];
            field_382[var3][9] = (short)(field_382[var3][9] | 2);
            field_381[var3] = null;
         }

         if (var1) {
            var2[9] = (short)(var2[9] | 1);
            return;
         }

         var2[9] = 0;
      }
   }

   // $VF: renamed from: b (int, boolean) void
   public static void method_405(int var0, boolean var1) {
      int var2 = field_382.length;

      while (--var2 >= 0) {
         short[] var3;
         if ((var3 = field_382[var2]) != null && (var3[8] & var0) != 0) {
            method_404(var2, var1);
         }
      }
   }

   // $VF: renamed from: a (boolean) void
   public static void method_406(boolean var0) {
      DataInputStream var30 = null;
      byte[] var1 = null;
      byte[] var2 = null;
      int[] var3 = null;
      short var4 = -1;
      short var5 = 0;

      for (int var6 = 0; var6 < field_381.length; var6++) {
         short[] var7;
         if ((var7 = field_382[var6]) != null && var7[9] == 0) {
            field_381[var6] = null;
         }
      }

      System.gc();

      try {
         var30 = new DataInputStream(method_348("/i"));

         for (int var31 = 0; var31 < field_382.length; var31++) {
            short[] var32;
            if ((var32 = field_382[var31]) != null) {
               int var8 = var32[7];
               if (var32[9] != 0 && field_381[var31] == null) {
                  Image var9 = null;

                  try {
                     if ((var8 & 512) != 0 || (var8 & 256) != 0 && var32[11] != -1) {
                        if ((var8 & 512) != 0) {
                           var9 = field_381[var32[10]];
                        } else {
                           if (var2 == null || var2.length < var1.length) {
                              var2 = new byte[var1.length];
                           }

                           System.arraycopy(var1, 0, var2, 0, var5);
                           var8 = 0;

                           do {
                              if (++var8 > var5) {
                                 var8 = -1;
                                 break;
                              }
                           } while (var1[var8] != 80 || var1[var8 + 1] != 76 || var1[var8 + 2] != 84 || var1[var8 + 3] != 69);

                           if (var8 != -1) {
                              int var10 = var32[11] & 28672;
                              int var11 = var32[11] & 4095;
                              int var12 = var8
                                 + 3
                                 + ((var1[var8 - 4] & 255) << 24 | (var1[var8 - 3] & 255) << 16 | (var1[var8 - 2] & 255) << 8 | var1[var8 - 1] & 255);
                              int var16 = var8 + 3;

                              for (int var17 = 0; var16 < var12; var17++) {
                                 int var14;
                                 var14 = -1;
                                 int var13;
                                 int var18;
                                 int var19;
                                 int var15 = (var18 = var1[++var16] & 255) << 16 | (var19 = var1[++var16] & 255) << 8 | (var13 = var1[++var16] & 255);
                                 label325:
                                 switch (var10) {
                                    case 0:
                                       int[] var38;
                                       switch ((var38 = field_385[var11])[0]) {
                                          case 1:
                                             byte var47 = 1;

                                             while (true) {
                                                if (var47 >= var38.length) {
                                                   break label325;
                                                }

                                                if (var15 == var38[var47]) {
                                                   var14 = var38[var47 + 1];
                                                   break label325;
                                                }

                                                var47 += 2;
                                             }
                                          case 2:
                                             var14 = var38[var17 + 1];
                                          default:
                                             break label325;
                                       }
                                    case 4096:
                                       byte var37 = (byte)((var18 + var19 + var13) / 3);
                                       var2[var16 - 2] = var37;
                                       var2[var16 - 1] = var37;
                                       var2[var16] = var37;
                                       break;
                                    case 8192:
                                       var2[var16 - 2] = (byte)(255 - var18);
                                       var2[var16 - 1] = (byte)(255 - var19);
                                       var2[var16] = (byte)(255 - var13);
                                       break;
                                    case 12288:
                                       var2[var16 - 2] = (byte)(var18 / 2 + 17 * (var11 >> 8 & 15) / 2);
                                       var2[var16 - 1] = (byte)(var19 / 2 + 17 * (var11 >> 4 & 15) / 2);
                                       var2[var16] = (byte)(var13 / 2 + 17 * (var11 & 15) / 2);
                                 }

                                 if (var14 != -1) {
                                    var2[var16 - 2] = (byte)(var14 >> 16);
                                    var2[var16 - 1] = (byte)(var14 >> 8);
                                    var2[var16] = (byte)var14;
                                 }
                              }

                              if (var3 == null) {
                                 var3 = new int[256];
                                 long var43 = 0L;

                                 for (int var39 = 0; var39 < 256; var39++) {
                                    long var48 = var39;

                                    for (int var40 = 0; var40 < 8; var40++) {
                                       if ((var48 & 1L) == 1L) {
                                          var48 = 3988292384L ^ var48 >> 1;
                                       } else {
                                          var48 >>= 1;
                                       }
                                    }

                                    var3[var39] = (int)var48;
                                 }
                              }

                              var16 = -1;

                              for (int var46 = var8; var46 <= var12; var46++) {
                                 var16 = var3[(var16 ^ var2[var46]) & 0xFF] ^ var16 >>> 8;
                              }

                              var16 = (int)(var16 ^ 4294967295L);
                              var2[var12 + 1] = (byte)(var16 >> 24);
                              var2[var12 + 2] = (byte)(var16 >> 16);
                              var2[var12 + 3] = (byte)(var16 >> 8);
                              var2[var12 + 4] = (byte)var16;
                           }

                           var9 = Image.createImage(var2, 0, var5);
                        }
                     } else {
                        while (var4 < var31) {
                           var4 = var30.readShort();
                           var5 = var30.readShort();
                           if (var4 < var31) {
                              var30.skip(var5);
                           }
                        }

                        if (var4 == var31) {
                           if (var1 == null || var1.length < var5) {
                              var1 = new byte[var5 > 10240 ? var5 : 10240];
                           }

                           var8 = 0;

                           while (var8 < var5) {
                              var8 += var30.read(var1, var8, var5 - var8);
                           }

                           var9 = Image.createImage(var1, 0, var5);
                        }
                     }
                  } catch (Throwable var27) {
                  }

                  if (var9 != null) {
                     int var10002 = var9.getWidth();
                     var8 = var31;
                     var32[0] = (short)(var10002 / field_382[var8][2]);
                     var10002 = var9.getHeight();
                     var8 = var31;
                     var32[1] = (short)(var10002 / field_382[var8][3]);
                  }

                  field_381[var31] = var9;
               }

               class_22.method_576(var31 * 33 / field_381.length + 33);
            }
         }

         return;
      } catch (Throwable var28) {
      } finally {
         try {
            var30.close();
         } catch (Throwable var26) {
         }
      }
   }

   // $VF: renamed from: c (int) boolean
   public static boolean method_407(int var0) {
      return field_381[var0] != null;
   }

   // $VF: renamed from: g (int) int
   public static int method_408(int var0) {
      return field_382[var0][0];
   }

   // $VF: renamed from: h (int) int
   public static int method_409(int var0) {
      return field_382[var0][1];
   }

   // $VF: renamed from: c (int, int) int
   public static int method_410(int var0, int var1) {
      return field_382[var0][var1];
   }

   // $VF: renamed from: k (int) int
   private static int method_411(int var0) {
      return (var0 & 16384) == 0 ? -1 : var0 & 16383;
   }

   // $VF: renamed from: i (int) int
   public static int method_412(int var0) {
      return 0 | var0 << 4;
   }

   // $VF: renamed from: d (int, int) int
   public static int method_413(int var0, int var1) {
      var1 = method_411(var1);
      short var2 = 0;
      if (var1 == -1 || (var2 = field_383[var1 * 7]) == 0) {
         var2 = field_382[var0][0];
      }

      return var2;
   }

   // $VF: renamed from: e (int, int) int
   public static int method_414(int var0, int var1) {
      var1 = method_411(var1);
      short var2 = 0;
      if (var1 == -1 || (var2 = field_383[var1 * 7 + 1]) == 0) {
         var2 = field_382[var0][1];
      }

      return var2;
   }

   // $VF: renamed from: f (int, int) int
   public static int method_415(int var0, int var1) {
      var1 = method_411(var0);
      short var2 = 0;
      if (var0 != -1 && var1 != -1 && var1 * 7 + 5 < field_383.length) {
         var2 = field_383[var1 * 7 + 5];
      }

      return var2;
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int, int) void
   public static void method_416(Graphics var0, int var1, int var2, int var3) {
      Image var4;
      if ((var4 = field_381[var3]) != null) {
         short[] var5 = field_382[var3];
         var0.drawImage(var4, var5[5] + var1, var5[6] + var2, var5[4]);
      }
   }

   // $VF: renamed from: c (javax.microedition.lcdui.Graphics, int, int, int, int) void
   public static void method_417(Graphics var0, int var1, int var2, int var3, int var4) {
      method_418(var0, var1, var2, var3, var4, 0);
   }

   // $VF: renamed from: b (javax.microedition.lcdui.Graphics, int, int, int, int, int) void
   public static void method_418(Graphics var0, int var1, int var2, int var3, int var4, int var5) {
      if (var3 != -1) {
         Image var6;
         if ((var6 = field_381[var3]) != null && var4 != -1) {
            short[] var14 = field_382[var3];
            int var11 = method_411(var4);
            if (var5 == 0) {
               var5 = var14[4];
            }

            int var7;
            int var8;
            short var9;
            int var10;
            short var16;
            if (var11 != -1) {
               var11 *= 7;
               var7 = field_383[var11 + 2];
               var8 = field_383[var11 + 3];
               var16 = field_383[var11];
               var9 = field_383[var11 + 1];
               var10 = field_383[var11 + 6];
               var1 += field_383[var11 + 4];
               var2 += field_383[var11 + 5];
               if (var16 == 0) {
                  var16 = var14[0];
                  var9 = var14[1];
                  var7 = var16 * var7;
                  var8 = var9 * var8;
               }
            } else {
               int var19 = 0;
               var7 = var4 & 15;
               var19 = var4 >> 4 & 15;
               var10 = var4 >> 8 & 15;
               var16 = var14[0];
               var9 = var14[1];
               var7 = var16 * var7;
               var8 = var9 * var19;
            }

            if (var5 != 0) {
               if ((var5 & 1) != 0) {
                  var1 -= var16 >> 1;
               } else if ((var5 & 8) != 0) {
                  var1 -= var16;
               }

               if ((var5 & 2) != 0) {
                  var2 -= var9 >> 1;
               } else if ((var5 & 32) != 0) {
                  var2 -= var9;
               }
            }

            var1 += var14[5];
            var2 += var14[6];
            if (var1 > field_376 || var2 > field_377 || var1 + var16 < 0 || var2 + var9 < 0) {
               return;
            }

            var3 = var7;
            var5 = var8;
            var0.drawRegion(var6, var3, var5, var16, var9, var10, var1, var2, 20);
         }
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int, java.lang.String, int, int, int, int, int) void
   public static void method_419(Graphics var0, int var1, int var2, String var3, int var4, int var5, int var6, int var7, int var8) {
      if (var3 != null) {
         Font var9 = null;
         if (var4 == -1) {
            var9 = Font.getDefaultFont();
         } else {
            var9 = method_398(var4);
            var1 += field_380[var4][0];
            var2 += field_380[var4][1];
         }

         if ((var5 & 1) != 0) {
            var1 -= method_400(var3, var9) >> 1;
         } else if ((var5 & 8) != 0) {
            var1 -= method_400(var3, var9);
         }

         if ((var5 & 2) != 0) {
            var2 -= method_401(var4) >> 1;
         } else if ((var5 & 32) != 0) {
            var2 -= method_401(var4);
         }

         Graphics var10000;
         String var10001;
         int var10002;
         int var10003;
         label35: {
            method_399(var0, var4);
            switch (var6) {
               case 1:
                  var1++;
                  var2++;
                  var0.setColor(var8);
                  var0.drawString(var3, var1 - 1, var2 - 1, 20);
                  var0.drawString(var3, var1 + 1, var2 - 1, 20);
                  var0.drawString(var3, var1 + 1, var2 + 1, 20);
                  var0.drawString(var3, var1 - 1, var2 + 1, 20);
                  var0.drawString(var3, var1, var2 - 1, 20);
                  var0.drawString(var3, var1, var2 + 1, 20);
                  var0.drawString(var3, var1 - 1, var2, 20);
                  var0.drawString(var3, var1 + 1, var2, 20);
                  var0.setColor(var7);
                  var10000 = var0;
                  var10001 = var3;
                  var10002 = var1;
                  break;
               case 2:
                  var0.setColor(var8);
                  var0.drawString(var3, var1 + 1, var2 + 1, 20);
                  var0.setColor(var7);
                  var10000 = var0;
                  var10001 = var3;
                  var10002 = var1;
                  break;
               case 3:
                  var0.setColor(var7);
                  var0.drawString(var3, var1 + 1, var2 + 1, 20);
                  var0.setColor(var8);
                  var10000 = var0;
                  var10001 = var3;
                  var10002 = var1;
                  break;
               default:
                  var0.setColor(var7);
                  var10000 = var0;
                  var10001 = var3;
                  var10002 = var1;
                  if (var6 == 0) {
                     var10003 = var2 + 1;
                     break label35;
                  }
            }

            var10003 = var2;
         }

         var10000.drawString(var10001, var10002, var10003, 20);
      }
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int, int, int, int, int) int
   public static int method_420(Graphics var0, int var1, int var2, int var3, int var4, int var5) {
      short var6 = 0;
      short var12 = field_382[114][0];
      var6 = field_382[114][1];
      int var7 = -var12;
      short var8 = 2;
      boolean var9 = false;
      if (var3 < 0) {
         var3 = 0 - var3;
         var9 = true;
      }

      if ((var4 & 8) != 0) {
         var1 += var7;
      } else {
         int var10 = var3;
         short var11 = 0;

         while ((var10 /= 10) > 0) {
            var11 += var12;
         }

         if ((var4 & 4) != 0) {
            var1 += var11;
         } else if ((var4 & 1) != 0) {
            var1 += (var11 - var12) / 2;
         }
      }

      if ((var4 & 32) != 0) {
         var2 -= var6;
      } else if ((var4 & 2) != 0) {
         var2 -= var6 / 2;
      }

      method_399(var0, 1);

      do {
         int var14 = var3 % 10;
         var3 /= 10;
         var8 += var12;
         method_418(var0, var1, var2, 114, var14, 20);
         var1 += var7;
      } while (var3 > 0);

      if (var9) {
         method_418(var0, var1, var2, 114, 10, 20);
         var8 += var12;
      }

      return var8;
   }

   // $VF: renamed from: a (int[], java.lang.String, int, int, int, int, int, int, int) int[]
   public static int[] method_421(int[] var0, String var1, int var2, int var3, int var4, int var5, int var6, int var7, int var8) {
      if (var0 == null) {
         var0 = new int[12];
      }

      var0[0] = var2;
      var0[1] = var3;
      var0[2] = var4;
      var0[3] = var5 > 0 ? var5 : method_401(2) + 2;
      var0[4] = method_400(var1, method_398(2));
      var0[4] += 2;
      var0[5] = method_401(2);
      var0[6] = 0;
      var0[7] = var0[4] > var4 ? 2 : 0;
      var0[8] = var0[4] > var4 ? var6 & -10 : var6;
      var0[9] = 1;
      var0[10] = var7;
      var0[11] = var8;
      if (var0[4] <= var0[2]) {
         if ((var0[8] & 1) != 0) {
            var0[6] = -(var0[2] / 2);
         }

         if ((var0[8] & 8) != 0) {
            var0[6] = -var0[2];
         }
      }

      return var0;
   }

   // $VF: renamed from: a (javax.microedition.lcdui.Graphics, int[], java.lang.String, int) void
   public static void method_422(Graphics var0, int[] var1, String var2, int var3) {
      var3 = var1[0];
      int var4 = var1[1];
      int var5 = var1[2];
      int var6 = var1[3];
      int var7 = var1[6];
      int var8 = var3;
      int var9 = var4;
      if ((var1[8] & 2) != 0) {
         var9 -= var6 / 2;
      }

      var9 = Math.max(var0.getClipY(), var9);
      int var10 = var0.getClipY() + var0.getClipHeight();
      int var11 = var0.getClipHeight() - var0.getClipY();
      var11 = Math.max(var6, var11);
      if (var9 + var11 > var10) {
         var11 = var10 - var9;
      }

      var0.setClip(var8, var9, var5, var11);
      method_419(var0, var3 - var7, var4, var2, 2, var1[8], var1[9], var1[10], var1[11]);
      if (!class_22.method_566() && (var7 += var1[7]) > var1[4]) {
         var7 = -var1[2];
      }

      var1[6] = var7;
   }

   // $VF: renamed from: a (int, int, int, int) boolean
   public static boolean method_423(int var0, int var1, int var2, int var3) {
      if (var0 == -1) {
         return false;
      }

      Image var4;
      if ((var4 = field_381[var0]) != null && var1 != -1) {
         short[] var10 = field_382[var0];
         int var8 = method_411(var1);
         short var9 = var10[4];
         int var5;
         short var6;
         short var7;
         if (var8 != -1) {
            var8 *= 7;
            var5 = field_383[var8 + 2];
            var1 = field_383[var8 + 3];
            var6 = field_383[var8];
            var7 = field_383[var8 + 1];
            var2 += field_383[var8 + 4];
            var3 += field_383[var8 + 5];
            if (var6 == 0) {
               var6 = var10[0];
               var7 = var10[1];
               var5 = var6 * var5;
               var1 = var7 * var1;
            }
         } else {
            boolean var20 = false;
            var5 = var1 & 15;
            var1 = var1 >> 4 & 15;
            var6 = var10[0];
            var7 = var10[1];
            var5 = var6 * var5;
            var1 = var7 * var1;
         }

         if (var9 != 0) {
            if ((var9 & 1) != 0) {
               var2 -= var6 >> 1;
            } else if ((var9 & 8) != 0) {
               var2 -= var6;
            }

            if ((var9 & 2) != 0) {
               var3 -= var7 >> 1;
            } else if ((var9 & 32) != 0) {
               var3 -= var7;
            }
         }

         var2 += var10[5];
         var3 += var10[6];
         var2 = -var2;
         var3 = -var3;
         var2 += var5;
         var3 += var1;
         if (var2 >= var5 && var3 >= var1 && var2 < var5 + var6 && var3 < var1 + var7) {
            var4.getRGB(field_390, 0, 1, var2, var3, 1, 1);
            return (field_390[0] & 0xFF000000) == -16777216;
         } else {
            return false;
         }
      } else {
         return false;
      }
   }

   // $VF: renamed from: a (int) java.lang.String
   public static String method_424(int var0) {
      int var1 = var0 & 65535;
      int var2;
      if ((var2 = (var0 & 8323072) >> 16) == 5) {
         if (var1 >= 0 && var1 < field_398.size()) {
            String var5 = (String)field_398.elementAt(var1);
            if ((var0 & 8388608) != 0) {
               int var3;
               var2 = (var3 = var0) & 65535;
               if ((var3 & 8323072) >> 16 == 5 && var2 >= 0 && var2 < field_398.size()) {
                  field_398.setElementAt(null, var2);
               }
            }

            return var5;
         } else {
            return "null";
         }
      } else {
         if (var2 < 0 || var2 >= 5) {
            return "Illegal macrogroup (" + var2 + ")";
         }

         if (field_396[var2] == null) {
            if (class_22.field_611[var2] == 4) {
               method_430(var2);
               return method_424(var0);
            } else {
               return "";
            }
         } else if (var1 >= 0 && var1 < field_396[var2].length) {
            String var4;
            return (var4 = field_396[var2][var1]) == null ? "null" : var4;
         } else {
            return "";
         }
      }
   }

   // $VF: renamed from: a () java.util.Vector
   public static Vector method_425() {
      return field_394;
   }

   // $VF: renamed from: b (int) void
   public static void method_426(int var0) {
      if (field_393 != null && !field_393.isEmpty() && field_393.size() > var0) {
         field_395 = (String)field_393.elementAt(var0);
      } else {
         field_395 = "EN";
      }
   }

   // $VF: renamed from: g () void
   public static void method_427() {
      DataInputStream var0 = null;

      try {
         byte[] var1 = null;
         var0 = new DataInputStream(method_348("/ldf"));
         field_393 = new Vector();
         field_394 = new Vector();
         var0.readByte();
         switch (field_397 = var0.readByte()) {
            case 1:
               int var10000 = var0.read();
               boolean var31 = false;
               var1 = new byte[var10000];
               var0.read(var1);
               field_393.addElement(new String(var1));
               break;
            case 2:
               int var2 = 0;

               while ((var2 = var0.read()) != -1) {
                  var1 = new byte[var2];
                  var0.read(var1);
                  field_393.addElement(new String(var1));
                  field_394.addElement(var0.readUTF());
                  field_394.lastElement();
               }
         }

         field_395 = (String)field_393.elementAt(0);
      } catch (Exception var25) {
         field_395 = "EN";
      } finally {
         try {
            var0.close();
         } catch (Exception var22) {
         }
      }

      if (field_397 == 2) {
         InputStream var29 = null;

         for (int var32 = field_393.size() - 1; var32 >= 0; var32--) {
            try {
               if ((var29 = method_348("/" + (String)field_393.elementAt(var32) + "." + class_22.field_610[0] + ".lng")) == null) {
                  field_393.removeElementAt(var32);
                  field_394.removeElementAt(var32);
               }
            } catch (Exception var23) {
               field_393.elementAt(var32);
               field_393.removeElementAt(var32);
               field_394.removeElementAt(var32);
            } finally {
               try {
                  var29.close();
               } catch (Exception var21) {
               }
            }
         }

         if ((field_395 = method_345("Glu-Locale")) != null) {
            field_395 = field_395.toUpperCase();
         }

         if (field_395 != null) {
            int var33 = field_393.size();

            while (--var33 >= 0) {
               if (!field_395.equals(field_393.elementAt(var33))) {
                  field_393.removeElementAt(var33);
                  field_394.removeElementAt(var33);
               }
            }
         }

         field_395 = (String)field_393.elementAt(0);
      }
   }

   // $VF: renamed from: h () void
   public static void method_428() {
      if (field_397 != 0) {
         field_396 = new String[5][];
         method_429();
         if (field_399 == null) {
            field_399 = new Hashtable(class_22.field_609.length);
         }

         for (int var0 = 0; var0 < class_22.field_608.length; var0++) {
            StringBuffer var1 = new StringBuffer();

            for (int var2 = 0; var2 < class_22.field_609[var0].length; var2++) {
               var1 = var1.append(method_424(class_22.field_609[var0][var2]));
               if (var2 + 1 < class_22.field_609[var0].length) {
                  var1 = var1.append(", ");
               }
            }

            field_399.put(class_22.field_608[var0], var1.toString());
         }
      }
   }

   // $VF: renamed from: i () void
   public static void method_429() {
      if (field_396 != null) {
         for (int var0 = 0; var0 < 5; var0++) {
            boolean var1 = (0 & 1 << var0) != 0;
            if (field_396[var0] == null) {
               if (var1 && class_22.field_611[var0] != 0 || class_22.field_611[var0] == 1) {
                  method_430(var0);
               }
            } else if (!var1 && class_22.field_611[var0] != 1) {
               field_396[var0] = null;
            }
         }
      }
   }

   // $VF: renamed from: j (int) void
   private static void method_430(int var0) {
      field_396[var0] = method_431("/" + field_395 + "." + class_22.field_610[var0] + ".lng");
   }

   // $VF: renamed from: b (java.lang.String) java.lang.String[]
   private static String[] method_431(String var0) {
      String[] var1 = null;
      DataInputStream var2 = null;

      try {
         (var2 = new DataInputStream(method_348(var0))).read();
         var2.read();
         int var16 = var2.read();
         int var3;
         int[] var4 = new int[(var3 = method_360(var2.read(), var2.read())) + 1];
         var1 = new String[var3];

         for (int var5 = 0; var5 < var3 + 1; var5++) {
            var4[var5] = method_360(var2.read(), var2.read());
         }

         for (int var17 = 0; var17 < var3; var17++) {
            int var6;
            byte[] var7 = new byte[var6 = var4[var17 + 1] - var4[var17]];
            var2.read(var7, 0, var6);
            var1[var17] = method_432(var7, var6, var16);
         }
      } catch (Exception var14) {
      } finally {
         try {
            var2.close();
         } catch (Exception var13) {
         }
      }

      return var1;
   }

   // $VF: renamed from: a (byte[], int, int) java.lang.String
   private static String method_432(byte[] var0, int var1, int var2) {
      String var3 = null;
      switch (var2) {
         case 0:
            var3 = new String(var0);
            break;
         case 1:
            StringBuffer var6 = new StringBuffer(var1 / 2);

            for (byte var7 = 0; var7 < var1 - 1; var7 += 2) {
               var6 = var6.append((char)method_360(var0[var7 + 1], var0[var7]));
            }

            var3 = var6.toString();
            break;
         case 2:
            byte[] var5;
            (var5 = new byte[var0.length + 2])[0] = (byte)(var1 >>> 8);
            var5[1] = (byte)var1;
            System.arraycopy(var0, 0, var5, 2, var1);

            try {
               var3 = new DataInputStream(new ByteArrayInputStream(var5)).readUTF();
            } catch (Exception var4) {
            }
      }

      return var3.replace('\r', '\n');
   }

   // $VF: renamed from: a (java.lang.String, javax.microedition.lcdui.Font, int) java.lang.String[]
   public static String[] method_433(String var0, Font var1, int var2) {
      char[] var14 = var0.toCharArray();
      int var3 = 0;
      int var4 = 0;
      int var5 = 0;
      boolean var6 = false;
      boolean var7 = false;
      boolean var8 = false;
      boolean var9 = false;
      Vector var10 = new Vector();
      StringBuffer var11 = new StringBuffer();
      StringBuffer var12 = new StringBuffer();

      while (var3 < var14.length) {
         if (var6) {
            var6 = false;
         } else {
            int var13;
            switch (var14[var3]) {
               case '\n':
                  var11 = var11.append((Object)var12);
                  var10.addElement(var11.toString());
                  var11 = var11.delete(0, var11.length());
                  var12 = var12.delete(0, var12.length());
                  var5 = 0;
                  var4 = 0;
                  var7 = false;
                  var8 = false;
                  var9 = false;
                  var3++;
                  continue;
               case '\\':
                  var6 = true;
                  var3++;
                  continue;
               case '|':
                  var13 = var1.charWidth('-');
                  if (var12.length() > 0) {
                     if (var5 + var4 + var13 <= var2) {
                        var11 = var11.append((Object)var12);
                        var5 += var4;
                        var12 = var12.delete(0, var12.length());
                        var4 = 0;
                        var9 = true;
                     } else if (var9) {
                        var11 = var11.append('-');
                        var10.addElement(var11.toString());
                        var11.delete(0, var11.length());
                        var5 = 0;
                        var9 = false;
                        continue;
                     }
                  }

                  var3++;
                  continue;
               default:
                  var13 = 0;
            }

            while (var13 < field_391.length) {
               if (var14[var3] == field_391[var13]) {
                  var7 = true;
                  break;
               }

               var13++;
            }

            for (int var18 = 0; var18 < field_392.length; var18++) {
               if (var14[var3] == field_392[var18]) {
                  var8 = true;
                  break;
               }
            }

            // CJK and fullwidth punctuation break after the character, so Chinese wraps without spaces.
            if (var14[var3] >= 0x2E80 && var14[var3] <= 0x9FFF
               || var14[var3] >= 0x3000 && var14[var3] <= 0x303F
               || var14[var3] >= 0xFF01 && var14[var3] <= 0xFF60
               || var14[var3] == 0x2026) {
               var8 = true;
            }
         }

         int var19 = var1.charWidth(var14[var3]);
         if (var5 + var4 + var19 > var2) {
            if (var7) {
               var11 = var11.append((Object)var12);
               var10.addElement(var11.toString());
               var11.delete(0, var11.length());
               var12.delete(0, var12.length());
               var4 = 0;
               var5 = 0;
               var7 = false;
               var8 = false;
               var9 = false;
               var3++;
               continue;
            }

            if (var9 && (!var8 || var12.length() > 0)) {
               var11 = var11.append('-');
               var10.addElement(var11.toString());
               var11.delete(0, var11.length());
               var5 = 0;
               var9 = false;
               continue;
            }

            if (var4 + var19 <= var2) {
               var10.addElement(var11.toString());
               var11.delete(0, var11.length());
               var5 = 0;
            } else {
               if (var11.length() > 0) {
                  var10.addElement(var11.toString());
                  var11.delete(0, var11.length());
                  var5 = 0;
               }

               if (var12.length() > 0) {
                  var11 = var11.append((Object)var12);
                  var10.addElement(var11.toString());
                  var11.delete(0, var11.length());
                  var12.delete(0, var12.length());
                  var5 = 0;
                  var4 = 0;
               }
            }
         }

         var12 = var12.append(var14[var3]);
         var4 += var1.charWidth(var14[var3]);
         if (var8 || var7) {
            var11 = var11.append((Object)var12);
            var5 += var4;
            var12.delete(0, var12.length());
            var4 = 0;
            var7 = false;
            var8 = false;
            var9 = false;
         }

         var3++;
      }

      if (var11.length() + var12.length() > 0) {
         var11 = var11.append((Object)var12);
         var10.addElement(var11.toString());
      }

      String[] var15 = new String[var10.size()];
      var10.copyInto(var15);
      return var15;
   }

   // $VF: renamed from: a () java.util.Hashtable
   public static Hashtable method_434() {
      return field_399;
   }

   // $VF: renamed from: a (java.lang.String, java.util.Hashtable) java.lang.String
   public static String method_435(String var0, Hashtable var1) {
      if (var0.indexOf(123) != -1) {
         StringBuffer var2 = new StringBuffer(var0);
         boolean var3 = false;
         int var4 = var2.length();

         while (--var4 >= 0) {
            if (var2.charAt(var4) == '{') {
               int var5 = var2.length();

               for (int var6 = var4; var6 < var5; var6++) {
                  if (var2.charAt(var6) == '}') {
                     String var7 = var0.substring(var4 + 1, var6);
                     String var8;
                     if ((var8 = (String)var1.get(var7)) != null) {
                        var2 = var2.delete(var4, var6 + 1).insert(var4, var8);
                        var3 = true;
                     }
                     break;
                  }
               }
            }
         }

         if (var3) {
            var0 = var2.toString();
         }
      }

      return var0;
   }

   // $VF: renamed from: a (java.lang.String) java.lang.String[]
   public static String[] method_436(String var0) {
      int var1 = 0;
      Vector var2 = new Vector();
      var1 = 0;
      int var3 = 0;
      if ((var3 = var0.indexOf(125, 0)) != -1) {
         do {
            int var4 = var0.indexOf(123, var1);
            var2.addElement(var0.substring(var1, var4));
            var2.addElement(var0.substring(var4, var3 + 1));
            var1 = var3 + 1;
         } while ((var3 = var0.indexOf(125, var1)) != -1);

         var2.addElement(var0.substring(var1, var0.length()));
         String[] var6 = new String[var2.size()];
         int var8 = 0;

         do {
            var6[var8++] = (String)var2.firstElement();
            var2.removeElementAt(0);
         } while (!var2.isEmpty());

         return var6;
      } else {
         String[] var9;
         (var9 = new String[1])[0] = var0;
         return var9;
      }
   }

   // $VF: renamed from: a (java.lang.String) int
   public static int method_437(String var0) {
      return method_438(var0, true);
   }

   // $VF: renamed from: a (java.lang.String, boolean) int
   public static int method_438(String var0, boolean var1) {
      int var1i = var1 ? 8388608 : 0;
      int var2 = field_398.size();

      for (int var3 = 0; var3 < var2; var3++) {
         if (field_398.elementAt(var3) == null) {
            field_398.setElementAt(var0, var3);
            return 327680 | var1i | var3;
         }
      }

      field_398.addElement(var0);
      return 327680 | var1i | var2;
   }

   // $VF: renamed from: j () void
   public static void method_439() {
      class_22.method_562(7);
   }

   // $VF: renamed from: b (java.lang.String) void
   public static void method_440(String var0) {
      boolean var1 = false;
      if (var0 != null && var0.length() > 0) {
         try {
            class_22.field_580.platformRequest(var0);
            var1 = true;
         } catch (Exception var2) {
            var1 = false;
         }
      }

      if (var1) {
         class_22.method_577(4100, 0);
      }
   }

   // $VF: renamed from: k () void
   public static void method_441() {
      try {
         DataInputStream var0;
         field_403 = new int[(field_402 = (var0 = new DataInputStream(method_348("/st"))).readShort()) * 11];

         for (int var1 = 0; var1 < field_402; var1++) {
            int var2 = var1 * 11;
            if ((field_403[var2 + 1] = var0.readByte()) != -1) {
               field_403[var2 + 2] = var0.readByte();
               field_403[var2 + 3] = var0.readByte();
               field_403[var2 + 4] = var0.readByte();
               field_403[var2 + 5] = var0.readByte();
               field_403[var2 + 6] = var0.readInt();
               field_403[var2 + 7] = var0.readByte();
               field_403[var2 + 9] = 0;
               field_403[var2] = -1;
               field_403[var2 + 10] = var0.readByte();
            } else {
               field_403[var2 + 1] = 0;
               field_403[var2 + 2] = -1;
               field_403[var2 + 3] = 0;
               field_403[var2 + 4] = -1;
               field_403[var2 + 5] = -1;
               field_403[var2 + 6] = -1;
               field_403[var2 + 7] = -1;
               field_403[var2 + 9] = 0;
               field_403[var2] = -1;
               field_403[var2 + 10] = -1;
            }
         }

         var0.close();
      } catch (Throwable var3) {
      }
   }

   // $VF: renamed from: l () void
   public static void method_442() {
      try {
         field_404 = (class_9)Class.forName("m").newInstance();
         if (field_400 != null) {
            field_400.close();
            field_400 = null;
         }
      } catch (Throwable var0) {
      }
   }

   // $VF: renamed from: a (int) java.io.InputStream
   public static InputStream method_443(int var0) {
      ByteArrayInputStream var1 = null;

      try {
         short var2 = -1;
         byte[] var3 = null;
         if (field_400 == null) {
            field_400 = new DataInputStream(method_348("/s"));
            field_401 = -1;
         }

         while (field_401 < var0) {
            field_401 = field_400.readShort();
            var2 = field_400.readShort();
            if (field_401 < var0) {
               field_400.skip(var2);
            }
         }

         if (field_401 == var0) {
            var3 = new byte[var2];
            var0 = 0;

            while (var0 < var2) {
               var0 += field_400.read(var3, var0, var2 - var0);
            }

            var1 = new ByteArrayInputStream(var3);
         }
      } catch (Throwable var4) {
      }

      return var1;
   }

   // $VF: renamed from: j (int) int
   public static int method_444(int var0) {
      return var0 < 0 ? 1 : field_403[var0 * 11 + 3];
   }

   // $VF: renamed from: c (int) void
   public static void method_445(int var0) {
      if (field_406 == var0) {
         field_405 = var0;
      } else {
         if (field_405 != var0) {
            method_450();
            field_405 = var0;
            if (var0 == -1) {
               return;
            }

            if (class_22.method_562(4) > 0 || class_22.method_562(1) != 0 || class_22.method_562(3) != 0) {
               method_448(field_405);
            }
         }
      }
   }

   // $VF: renamed from: a () int
   public static int method_446() {
      return field_405;
   }

   // $VF: renamed from: d (int) void
   public static void method_447(int var0) {
      try {
         if (field_404 != null) {
            int var1 = var0 * 11;
            if (field_403[var1 + 10] != -1) {
               var0 = field_403[var1 + 10];
            }

            if (field_403[var0 * 11 + 2] == -1) {
               return;
            }

            if (field_403[var1 + 7] == 4 && class_22.method_562(4) <= 0) {
               return;
            }

            if (field_403[var1 + 7] == 5 && class_22.method_562(5) <= 0) {
               return;
            }

            if (field_403[var1] == 0) {
               return;
            }

            int var2 = field_403[var1 + 3];

            for (int var3 = 0; var3 < field_402; var3++) {
               if (field_403[var3 * 11] == 0) {
                  int var4;
                  if ((var4 = field_403[var3 * 11 + 3]) >= var2) {
                     return;
                  }

                  if (var4 < var2) {
                     method_449(var3);
                  }
               }
            }

            field_404.method_238(var0);
            class_9.method_239(var0);
            if (field_400 != null) {
               field_400.close();
               field_400 = null;
            }

            field_406 = field_403[var1 + 4];
         }
      } catch (Throwable var5) {
      }
   }

   // $VF: renamed from: e (int) void
   public static void method_448(int var0) {
      int var1 = 0;

      for (int var2 = 0; var2 < field_402; var2++) {
         if (field_403[var2 * 11 + 4] == var0) {
            var1++;
         }
      }

      if (var1 > 0) {
         int var5 = method_351(var1);
         var1 = 0;

         for (int var3 = 0; var3 < field_402; var3++) {
            if (field_403[var3 * 11 + 4] == var0) {
               if (var1 == var5) {
                  method_447(var3);
                  return;
               }

               var1++;
            }
         }
      }
   }

   // $VF: renamed from: f (int) void
   public static void method_449(int var0) {
      if (field_404 != null) {
         if (field_403[var0 * 11 + 10] != -1) {
            var0 = field_403[var0 * 11 + 10];
         }

         field_404.method_240(var0);
         field_406 = -1;
      }
   }

   // $VF: renamed from: m () void
   public static void method_450() {
      if (field_404 != null) {
         for (int var0 = 0; var0 < field_402; var0++) {
            if (field_403[var0 * 11] == 0) {
               field_404.method_240(var0);
            }
         }

         field_406 = -1;
         field_405 = -1;
      }
   }

   // $VF: renamed from: n () void
   public static void method_451() {
      try {
         if (field_404 != null) {
            class_9.method_241();
         }
      } catch (Throwable var0) {
      }
   }

   // $VF: renamed from: o () void
   public static void method_452() {
      try {
         if (field_404 != null) {
            class_9.method_242();
         }
      } catch (Throwable var0) {
      }
   }

   // $VF: renamed from: g (int) void
   public static void method_453(int var0) {
      int var1 = 0;
      if (var0 >= 0) {
         for (int var2 = 0; var2 < field_402; var2++) {
            var1 = var2 * 11;
            if (field_403[var1 + 4] == var0) {
               method_454(var2);
            }
         }
      }
   }

   // $VF: renamed from: h (int) void
   public static void method_454(int var0) {
      if ((var0 = var0) >= 0 && var0 < field_402) {
         var0 *= 11;
         if (field_403[var0 + 10] == -1 && (field_403[var0 + 1] & 1) != 0) {
            field_403[var0 + 9] = 1;
         }
      }
   }

   // $VF: renamed from: p () void
   public static void method_455() {
      try {
         field_404.method_244();
         if (field_400 != null) {
            field_400.close();
            field_400 = null;
         }
      } catch (Throwable var0) {
      }
   }

   // $VF: renamed from: q () void
   public static void method_456() {
      class_9.method_245();
   }

   // $VF: renamed from: b (int, int) void
   public static void method_457(int var0, int var1) {
      class_9.method_243(var0, var1);
   }

   // $VF: renamed from: i (int) void
   public static void method_458(int var0) {
      int var1 = var0 * 11;
      method_449(var0);
      if ((field_403[var1 + 1] & 8) != 0) {
         int var2;
         if ((var2 = field_403[var1 + 4]) != -1) {
            method_448(var2);
         } else {
            method_447(var0);
         }
      }

      if (field_403[var1 + 5] != -1) {
         method_447(field_403[var1 + 5]);
      }
   }
}
