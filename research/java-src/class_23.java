import hg.class_22;
import javax.microedition.lcdui.Canvas;
import javax.microedition.lcdui.Graphics;

// $VF: renamed from: t
public class class_23 extends Canvas {
   public class_23() {
      this.setFullScreenMode(true);
   }

   public void paint(Graphics var1) {
      class_22.method_582(var1);
   }

   protected void keyPressed(int var1) {
      class_22.method_587(var1, true);
   }

   protected void keyReleased(int var1) {
      class_22.method_587(var1, false);
   }

   protected void pointerPressed(int var1, int var2) {
   }

   protected void pointerReleased(int var1, int var2) {
   }

   protected void pointerDragged(int var1, int var2) {
   }

   protected void hideNotify() {
      class_22.field_580.pauseApp();
   }

   protected void showNotify() {
      class_22.method_580(this.getWidth(), this.getHeight());
   }

   protected void sizeChanged(int var1, int var2) {
      class_22.method_580(var1, var2);
   }
}
