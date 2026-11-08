import hg.class_22;

// $VF: renamed from: k
public final class class_11 extends Thread {
   // $VF: renamed from: a int
   public int field_234;
   // $VF: renamed from: b int
   public int field_235;
   // $VF: renamed from: c int
   public int field_236;
   // $VF: renamed from: d int
   public int field_237 = 0;

   public class_11(int var1, int var2, int var3) {
      this.field_234 = var1;
      this.field_235 = var2;
      this.field_236 = var3;
   }

   // $VF: renamed from: run () void
   public final void run() {
      try {
         switch (this.field_234) {
            case 1:
               class_15.method_428();
               class_22.field_598 = true;
               break;
            case 2:
               class_22.method_584();
               class_15.method_427();
               if (class_15.method_425() == null || class_15.method_425().size() <= 1) {
                  class_15.method_428();
               }

               class_15.method_367();
               class_15.method_403("/gt");
               class_15.method_403("/c");
               class_15.method_403("/f");
               class_15.method_441();
               class_15.method_442();
               class_17.method_467();
         }

         class_6.method_117(this.field_234);
         boolean var1 = false;
         class_15.method_406(true);
         class_15.method_455();
         class_18.method_471();
         class_15.method_429();
         if (class_15.method_425() == null || class_15.method_425().size() <= 1) {
            class_22.field_598 = true;
         }

         this.field_237 = 100;
         class_22.method_581(200L);
         System.gc();
      } catch (Throwable var2) {
         this.field_236 = -1;
         var2.getMessage();
      }
   }
}
