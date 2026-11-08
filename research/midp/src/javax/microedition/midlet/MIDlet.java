package javax.microedition.midlet;

import harness.Host;

public abstract class MIDlet {
    protected MIDlet() {
    }

    protected abstract void startApp();

    protected abstract void pauseApp();

    protected abstract void destroyApp(boolean unconditional);

    public final String getAppProperty(String key) {
        return Host.appProperty(key);
    }

    public final void notifyDestroyed() {
        Host.destroyed = true;
    }

    public final boolean platformRequest(String url) {
        Host.log("platformRequest " + url);
        return false;
    }
}
