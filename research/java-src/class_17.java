// $VF: renamed from: e
public final class class_17 {
   // $VF: renamed from: a c
   private static class_19 field_417 = null;
   // $VF: renamed from: a boolean
   private static boolean field_418 = false;

   // $VF: renamed from: a () boolean
   public static boolean method_465() {
      return field_417 != null ? field_418 : false;
   }

   // $VF: renamed from: a (int) void
   public static void method_466(int var0) {
      field_418 = true;
      if (field_417 != null) {
         int var1 = var0;
         class_19 var2 = field_417;
         switch (var1) {
            case 1:
               if (var2.field_484 != null && var2.field_484.length() != 0) {
                  class_15.method_440(var2.field_484);
               }
         }
      }
   }

   // $VF: renamed from: a () void
   public static void method_467() {
      try {
         class_19 var0 = field_417 = (class_19)Class.forName("c").newInstance();
         boolean var1 = class_15.method_347("Glu-Upsell-Enabled");
         var0.field_484 = class_15.method_345("Glu-Upsell-URL");
         if (var1 && var0.field_484 != null && !var0.field_484.trim().equals("") || class_15.field_366) {
            var0.field_485 = 0;
            var0.field_483 = 215;
            if (class_15.field_366) {
               var0.field_483 = 43;
               var0.field_484 = class_15.field_365;
            }
         }
      } catch (Throwable var2) {
      }
   }

   // $VF: renamed from: a (d) void
   public static void method_468(class_18 var0) {
      if (field_417 != null) {
         class_18 var1 = var0;
         class_19 var3 = field_417;
         if (var1 == null || var3.field_485 == -1) {
            return;
         }

         switch (var1.field_419) {
            case 39:
               int var2 = var1.field_452;
               if (var1.field_452 > 0) {
                  var2 = 1;
               }

               if (class_15.field_366) {
                  var2 = 0;
               }

               var1.method_481(new int[]{203, 0, 0, var3.field_483, 24577, 0}, var2);
         }
      }
   }

   // $VF: renamed from: a (int) boolean
   public static boolean method_469(int var0) {
      if (field_417 == null) {
         return false;
      }

      boolean var1 = false;
      if (field_417 != null && var0 == 8 && field_418) {
         field_418 = false;
         var1 = true;
      }

      return var1;
   }
}
