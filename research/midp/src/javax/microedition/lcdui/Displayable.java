package javax.microedition.lcdui;

public abstract class Displayable {
    public int getWidth() {
        return harness.Host.width;
    }

    public int getHeight() {
        return harness.Host.height;
    }
}
