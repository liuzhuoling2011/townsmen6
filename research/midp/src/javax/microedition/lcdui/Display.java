package javax.microedition.lcdui;

import harness.Host;
import javax.microedition.midlet.MIDlet;

public class Display {
    private static final Display INSTANCE = new Display();

    public static Display getDisplay(MIDlet midlet) {
        return INSTANCE;
    }

    public void setCurrent(Displayable d) {
        Host.current = (Canvas) d;
    }

    public void callSerially(Runnable r) {
        Host.serial.addLast(r);
    }
}
