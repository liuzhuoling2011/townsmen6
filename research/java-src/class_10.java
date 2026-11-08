import java.util.NoSuchElementException;

// $VF: renamed from: l
public final class class_10 {
   // $VF: renamed from: a int[]
   public int[] field_231;
   // $VF: renamed from: a int
   public int field_232;
   // $VF: renamed from: b int
   private int field_233;

   public class_10(int var1, int var2) {
      if (var1 < 0) {
         throw new IllegalArgumentException("Illegal Capacity: " + var1);
      }

      this.field_231 = new int[var1];
      this.field_233 = var2;
   }

   public class_10(int var1) {
      this(var1, 0);
   }

   public class_10() {
      this(10);
   }

   // $VF: renamed from: c (int) void
   private void method_246(int var1) {
      int var2 = this.field_231.length;
      int[] var3 = this.field_231;
      if ((var2 = this.field_233 > 0 ? var2 + this.field_233 : var2 << 1) < var1) {
         var2 = var1;
      }

      this.field_231 = new int[var2];
      System.arraycopy(var3, 0, this.field_231, 0, this.field_232);
   }

   // $VF: renamed from: a (int) int
   public final int method_247(int var1) {
      if (var1 >= this.field_232) {
         throw new ArrayIndexOutOfBoundsException(var1 + " >= " + this.field_232);
      }

      try {
         return this.field_231[var1];
      } catch (ArrayIndexOutOfBoundsException var2) {
         throw new ArrayIndexOutOfBoundsException(var1 + " < 0");
      }
   }

   // $VF: renamed from: a () int
   public final int method_248() {
      if (this.field_232 == 0) {
         throw new NoSuchElementException();
      } else {
         return this.field_231[0];
      }
   }

   // $VF: renamed from: a (int, int) void
   public final void method_249(int var1, int var2) {
      if (var2 >= this.field_232) {
         throw new ArrayIndexOutOfBoundsException(var2 + " >= " + this.field_232);
      }

      this.field_231[var2] = var1;
   }

   // $VF: renamed from: a (int) void
   public final void method_250(int var1) {
      if (var1 >= this.field_232) {
         throw new ArrayIndexOutOfBoundsException(var1 + " >= " + this.field_232);
      }

      if (var1 < 0) {
         throw new ArrayIndexOutOfBoundsException(var1);
      }

      int var2;
      if ((var2 = this.field_232 - var1 - 1) > 0) {
         System.arraycopy(this.field_231, var1 + 1, this.field_231, var1, var2);
      }

      this.field_232--;
      this.field_231[this.field_232] = 0;
   }

   // $VF: renamed from: b (int, int) void
   public final void method_251(int var1, int var2) {
      int var3 = this.field_232 + 1;
      if (var2 >= var3) {
         throw new ArrayIndexOutOfBoundsException(var2 + " > " + this.field_232);
      }

      if (var3 > this.field_231.length) {
         this.method_246(var3);
      }

      System.arraycopy(this.field_231, var2, this.field_231, var2 + 1, this.field_232 - var2);
      this.field_231[var2] = var1;
      this.field_232++;
   }

   // $VF: renamed from: b (int) void
   public final void method_252(int var1) {
      int var2;
      if ((var2 = this.field_232 + 1) > this.field_231.length) {
         this.method_246(var2);
      }

      this.field_231[this.field_232++] = var1;
   }

   // $VF: renamed from: a () void
   public final void method_253() {
      for (int var1 = 0; var1 < this.field_232; var1++) {
         this.field_231[var1] = 0;
      }

      this.field_232 = 0;
   }

   public final String toString() {
      return "";
   }
}
