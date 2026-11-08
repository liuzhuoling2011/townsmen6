package javax.microedition.lcdui;

import harness.Host;

public abstract class Canvas extends Displayable {
    protected Canvas() {
    }

    public void setFullScreenMode(boolean mode) {
    }

    public final void repaint() {
        Host.repaintRequested = true;
    }

    public final void serviceRepaints() {
        Host.paintNow();
    }

    protected abstract void paint(Graphics g);

    protected void keyPressed(int keyCode) {
    }

    protected void keyReleased(int keyCode) {
    }

    protected void pointerPressed(int x, int y) {
    }

    protected void pointerReleased(int x, int y) {
    }

    protected void pointerDragged(int x, int y) {
    }

    protected void hideNotify() {
    }

    protected void showNotify() {
    }

    protected void sizeChanged(int w, int h) {
    }

    public final void dispatchPaint(Graphics g) {
        paint(g);
    }

    public final void dispatchKey(int keyCode, boolean pressed) {
        if (pressed) {
            keyPressed(keyCode);
        } else {
            keyReleased(keyCode);
        }
    }

    public final void dispatchShow() {
        showNotify();
    }
}
