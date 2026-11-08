import hg.class_22;
import javax.microedition.media.Manager;
import javax.microedition.media.Player;
import javax.microedition.media.PlayerListener;
import javax.microedition.media.control.VolumeControl;

// $VF: renamed from: m
public final class class_9 implements PlayerListener {
   // $VF: renamed from: a int[]
   private static int[] field_229 = null;
   // $VF: renamed from: a javax.microedition.media.Player[]
   private static Player[] field_230 = null;

   public class_9() {
      field_230 = new Player[(field_229 = class_15.field_403).length / 11];
   }

   // $VF: renamed from: a (int) void
   public final void method_238(int var1) {
      try {
         int var2 = var1 * 11;
         int var3 = field_229[var2 + 1];
         Player var10000 = field_230[var1];
         Player var4 = null;
         if (var10000 == null && var3 != -1) {
            String var8 = null;
            switch (field_229[var2 + 2]) {
               case 1:
                  var8 = "audio/midi";
                  break;
               case 2:
                  var8 = "audio/amr";
               case 3:
               case 5:
               default:
                  break;
               case 4:
                  var8 = "audio/mmf";
                  break;
               case 6:
                  var8 = "audio/x-wav";
                  break;
               case 7:
                  var8 = "audio/mpeg";
            }

            field_230[var1] = var4 = Manager.createPlayer(class_15.method_443(var1), var8);
            if (var4 != null) {
               try {
                  var4.realize();
               } catch (Throwable var6) {
               }

               try {
                  var4.prefetch();
               } catch (Throwable var5) {
               }

               var4.addPlayerListener(this);
            }
         }
      } catch (Throwable var7) {
         var7.printStackTrace();
      }
   }

   // $VF: renamed from: b (int) void
   public static void method_239(int var0) {
      try {
         Player var1 = field_230[var0];
         int var2 = 0;
         if (var1 != null) {
            var2 = var1.getState();
         }

         if (var1 != null) {
            if (var2 != 300 && var2 != 0) {
               var1.prefetch();
            }

            var2 = var0 * 11;
            if (field_229[var2 + 7] != -1) {
               ((VolumeControl)var1.getControl("VolumeControl")).setLevel(class_22.method_562(field_229[var2 + 7]));
            }

            var1.start();
            field_229[var0 * 11] = 0;
         }
      } catch (Throwable var3) {
         var3.printStackTrace();
      }
   }

   // $VF: renamed from: c (int) void
   public final void method_240(int var1) {
      try {
         int var2 = var1 * 11;
         Player var3 = field_230[var1];
         field_229[var2] = 1;
         if (var3 != null && var3.getState() != 0) {
            if (var3.getState() == 400) {
               var3.stop();
            }

            if ((field_229[var2 + 1] & 2) == 0) {
               try {
                  var3.removePlayerListener(this);
                  if (var3.getState() == 300) {
                     var3.deallocate();
                  }

                  if (var3.getState() == 200 || var3.getState() == 100) {
                     var3.close();
                  }

                  field_230[var1] = null;
                  return;
               } catch (Throwable var4) {
               }
            }
         }
      } catch (Throwable var5) {
      }
   }

   // $VF: renamed from: a () void
   public static void method_241() {
      for (int var0 = 0; var0 < class_15.field_402; var0++) {
         if (field_229[var0 * 11] == 0) {
            class_15.method_449(var0);
            field_229[var0 * 11] = 3;
         }
      }
   }

   // $VF: renamed from: b () void
   public static void method_242() {
      for (int var0 = 0; var0 < class_15.field_402; var0++) {
         if (field_229[var0 * 11] == 3) {
            class_15.method_447(var0);
         }
      }
   }

   public final void playerUpdate(Player var1, String var2, Object var3) {
      try {
         int var3i = -1;

         for (int var4 = 0; var4 < class_15.field_402; var4++) {
            if (field_230[var4] == var1) {
               var3i = var4;
               break;
            }
         }

         if (var3i != -1 && var2.equals("endOfMedia")) {
            class_15.method_458(var3i);
         }
      } catch (Throwable var5) {
      }
   }

   // $VF: renamed from: a (int, int) void
   public static void method_243(int var0, int var1) {
      int var2 = -1;
      if (var0 != 4) {
         class_15.method_447(var1);
      } else {
         for (int var3 = 0; var3 < field_230.length; var3++) {
            if (field_229[var3 * 11] == 0 && ((field_229[var3 * 11 + 1] & 16) != 0 || (field_229[var3 * 11 + 1] & 8) != 0)) {
               var2 = var3;
               break;
            }
         }

         if (var2 != -1) {
            var0 = var2 * 11;
            if (field_229[var0 + 7] != -1) {
               ((VolumeControl)field_230[var2].getControl("VolumeControl")).setLevel(class_22.method_562(field_229[var0 + 7]));
            }
         } else {
            class_15.method_447(var1);
         }
      }
   }

   // $VF: renamed from: c () void
   public final void method_244() {
      int var1 = 0;

      for (int var2 = 0; var2 < field_230.length; var2++) {
         var1 = var2 * 11;
         if (field_229[var1 + 9] == 0) {
            if (field_230[var2] != null) {
               field_230[var2].close();
            }

            field_230[var2] = null;
         } else if (field_229[var1 + 9] == 1 && field_230[var2] == null) {
            this.method_238(var2);
         }
      }
   }

   // $VF: renamed from: d () void
   public static void method_245() {
      if (class_22.method_562(4) > 0) {
         int var0 = -1;

         for (int var1 = 0; var1 < field_230.length; var1++) {
            if (field_229[var1 * 11] == 0 && ((field_229[var1 * 11 + 1] & 16) != 0 || (field_229[var1 * 11 + 1] & 8) != 0)) {
               var0 = var1;
               break;
            }
         }

         if (var0 != -1) {
            int var2 = var0 * 11;
            if (field_229[var2 + 7] != -1) {
               ((VolumeControl)field_230[var0].getControl("VolumeControl")).setLevel(class_22.method_562(field_229[var2 + 7]));
            }
         }

         class_15.method_448(class_15.method_446());
      }
   }
}
