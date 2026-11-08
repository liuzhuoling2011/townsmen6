package jio;

import harness.Host;
import java.io.InputStream;

/** Platform hooks the prepared game source calls instead of System/Thread/Class resources. */
public final class Sys {
    private Sys() {
    }

    public static long currentTimeMillis() {
        return Host.currentTimeMillis();
    }

    public static void sleep(long ms) {
        Host.sleep(ms);
    }

    public static InputStream resource(String name) {
        return Host.resource(name);
    }
}
